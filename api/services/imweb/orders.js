import axios from "axios";
import { accessToken } from "./accessToken";
import { sleep } from "../../util/sleep";
import { koreanToPaymentType } from "../../util/paymentType";
import { koreanToDeliveryTime } from "../../util/deliveryTime";
import { chunkenizeArray } from "../../util/array";
import { isEmptyObject } from "../../util/object";

const intervalToGetOrder = process.env.IMWEB_GET_ORDER_FROM_DAYS * 86400;
const getProductsFromMultipleOrder = async (orderNumbers) => {
    const accessTokenInstance = await accessToken.getInstance();
    const token = await accessTokenInstance.getToken();

    const axiosConfig = {
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "access-token": token,
        },
        data: { order_no: orderNumbers },
    };
    try {
        const list = [];
        let orderIndex = 0;
        const res = await axios.get(
            `${process.env.IMWEB_API_BASEURL}/shop/prod-orders`,
            axiosConfig,
        );
        // console.log("/shop/prod-orders");
        // console.log(res.data.data);
        orderNumbers.forEach((orderNo) => {
            const aOrderProducts = [];
            const aOrderInfo = res.data.data[orderNo];
            let itemIndex = 0;
            // console.log(aOrderInfo);
            if (typeof aOrderInfo === "object") {
                Object.entries(aOrderInfo).forEach((entry) => {
                    const [key, value] = entry;

                    value.items.forEach((item) => {
                        const aItem = {
                            productNo: item.prod_no,
                            productName: item.prod_name,
                            sku: item.prod_sku_no,
                            unitPrice: item.payment.price / item.payment.count,
                            quantity: item.payment.count,
                        };
                        if (item.options && item.options.length > 0) {
                            item.options[0].forEach((option) => {
                                aItem.productName = `${aItem.productName} (${option.option_name_list[0]}:${option.value_name_list[0]})`;
                                if (
                                    option.stock_sku_no &&
                                    option.stock_sku_no.length > 0
                                ) {
                                    aItem.sku = option.stock_sku_no[0];
                                }
                                aItem.quantity = option.payment.count;
                                aItem.unitPrice =
                                    option.payment.price / option.payment.count;
                            });
                        }
                        aOrderProducts[itemIndex] = aItem;
                        itemIndex++;
                    });
                    // console.log(entry);
                });
            } else {
                // ?????? ????????? ???????????? ??? ??? ????????? ?????? ??????.
            }
            list[orderIndex] = aOrderProducts;
            orderIndex++;
        });
        return list;
    } catch (error) {
        // console.log(error);
        return null;
    }
    return res.data.data;
};

const parseInfoFromOrder = (aOrder) => {
    const error = {};
    const phone = aOrder.delivery.address.phone2
        ? `${aOrder.delivery.address.phone}(${aOrder.delivery.address.phone2})`
        : aOrder.delivery.address.phone;
    const address = `${aOrder.delivery.address.address} ${aOrder.delivery.address.address_detail}`;

    const develiveryTime = koreanToDeliveryTime(aOrder.form[0].value);
    if (!develiveryTime)
        error.develiveryTime = `Invalid deliveryTime (${aOrder.form[0].value})`;

    const payType = koreanToPaymentType(aOrder.form[1].value);
    if (!payType) error.payType = `Invalid payType (${aOrder.form[1].value})`;

    const point = aOrder.payment.point ? aOrder.payment.point : 0;
    const ret = {
        orderNo: aOrder.order_no,
        orderTime: aOrder.order_time,
        recipientName: aOrder.delivery.address.name,
        recipientPhone: phone,
        recipientAddress: address,
        deliveryMemo: aOrder.deliveryMemo,
        buyerName: aOrder.orderer.name,
        buyerEmail: aOrder.orderer.email,
        depositorName: "Imweb", // ?????? ????????? TODO
        paymentType: payType,
        pointUsed: point,
        totalPrice: aOrder.payment.total_price,
        error: error,
    };
    if (develiveryTime) {
        ret.deliveryTimeString = develiveryTime.keyString;
        ret.deliveryStartTime = develiveryTime.startTimestamp;
    }
    return ret;
};

const getAllOrdersByPagination = async (
    orderDateFrom,
    orderDateTo,
    status,
    page = 1,
) => {
    const accessTokenInstance = await accessToken.getInstance();
    const token = await accessTokenInstance.getToken();

    const data = {
        version: "latest",
        type: "normal",
        status: status,
        order_date_from: orderDateFrom,
        order_date_to: orderDateTo,
        limit: 100,
        offset: page,
    };
    const axiosConfig = {
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "access-token": token,
        },
        data: data,
    };

    let result = {};
    let list = [];
    let listToGetProduct = [];
    // let transactionStartTime = Date.now();
    const res = await axios.get(
        `${process.env.IMWEB_API_BASEURL}/shop/orders`,
        axiosConfig,
    );
    // console.log("/shop/orders");
    // console.log(res.data.data);
    if (
        res.status == 200 &&
        res.data.code == 200 &&
        res.data.data &&
        res.data.data.list &&
        res.data.data.pagenation
    ) {
        const dataList = res.data.data.list;
        for (let i = 0; i < dataList.length; i++) {
            list[i] = parseInfoFromOrder(dataList[i]);
            listToGetProduct[i] = list[i].orderNo;
        }
        result.totalPage = res.data.data.pagenation.total_page;

        // Get products in order.

        let currentProductIndex = 0;
        const chunkenizedListToGetProduct = chunkenizeArray(
            listToGetProduct,
            25,
        );
        for (
            let productPage = 1;
            productPage <= chunkenizedListToGetProduct.length;
            productPage++
        ) {
            // console.log(chunkenizedListToGetProduct[productPage - 1]);
            const products = await getProductsFromMultipleOrder(
                chunkenizedListToGetProduct[productPage - 1],
            );
            for (let k = 0; k < products.length; k++) {
                if (products[k].length == 0) {
                    list[currentProductIndex].error.products =
                        "Could not get products from Imweb(/shop/prod-orders).";
                } else {
                    let noSKUmessage = "";
                    products[k].forEach((product) => {
                        if (
                            !product.sku ||
                            typeof product.sku != "string" ||
                            product.sku.length > 0
                        ) {
                            if (noSKUmessage.length > 0) {
                                noSKUmessage += "\n";
                            }
                            noSKUmessage += `No SKU (${product.productName})`;
                        }
                    });
                    if (noSKUmessage.length > 0) {
                        list[currentProductIndex].error.products = noSKUmessage;
                    }
                }

                if (isEmptyObject(list[currentProductIndex].error)) {
                    list[currentProductIndex].error = null;
                }
                // ????????? ???????????? ?????????
                if (list[currentProductIndex].pointUsed > 0) {
                    products[k][products[k].length] = {
                        productNo: 0,
                        productName: "????????? ??????",
                        unitPrice: -1 * list[currentProductIndex].pointUsed,
                        sku: "Method0002",
                        quantity: 1,
                    };
                }
                list[currentProductIndex].products = products[k];
                currentProductIndex++;
            }
        }
        result.list = list;
        return result;
    } else {
        return { error: res };
    }
};

const getAllOrders = async (
    orderDateFrom = 0, // default is 3 days ago
    orderDateTo = 0, // default is now
    status = "PAY_WAIT",
) => {
    return new Promise(async (resolve, reject) => {
        const now = Date.now();
        let dateFrom =
            orderDateFrom == 0
                ? Math.floor(now / 1000) - intervalToGetOrder
                : orderDateFrom;
        let dateTo = orderDateTo == 0 ? Math.floor(now / 1000) : orderDateTo;
        let totalPage = 1;
        let currentIndex = 0;
        const list = [];

        try {
            let transactionStartTime;
            let transactionEndTime;
            for (let page = 1; page <= totalPage; page++) {
                transactionStartTime = Date.now();
                const res = await getAllOrdersByPagination(
                    dateFrom,
                    dateTo,
                    status,
                );
                transactionEndTime = Date.now();
                totalPage = res.totalPage;
                for (let i = 0; i < res.list.length; i++) {
                    list[currentIndex] = res.list[i];
                    currentIndex++;
                }
                const restTime =
                    process.env.IMWEB_API_CALL_INTERVAL_MILSEC -
                    (transactionEndTime - transactionStartTime);

                if (page <= totalPage && restTime > 0) await sleep(restTime);
            }
            resolve(list);
        } catch (error) {
            reject(error);
        }
    });
};

export { getAllOrders };
