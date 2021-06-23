import axios from "axios";
import { sessionId } from "./sessionId";
import { YYYYMMDDFromSeconds } from "../../util/date";
import { paymentTypeStringToEcountPaymentType } from "../../util/paymentType";
const WH_CD = "100";

const makeBodyToRequestFromOrders = (orders) => {
    const orderList = [];
    let index = 0;
    // orders.forEach((order) => {
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        if (order.error) continue;
        const orderDateString = YYYYMMDDFromSeconds(order.orderTime);
        const deadlineString = YYYYMMDDFromSeconds(order.deliveryStartTime);
        const io_type = paymentTypeStringToEcountPaymentType(order.paymentType);
        order.products.forEach((product) => {
            const supply_amount = Math.round(
                (product.unitPrice * product.quantity) / 1.1,
            );
            const vat_amount =
                product.unitPrice * product.quantity - supply_amount;
            orderList[index] = {
                BulkDatas: {
                    IO_DATE: orderDateString,
                    WH_CD: WH_CD,
                    IO_TYPE: io_type,
                    DOC_NO: order.orderNo,
                    AGREE_TERM: order.deliveryTimeString,
                    TIME_DATE: deadlineString,
                    U_MEMO1: order.recipientAddress,
                    U_MEMO2: order.recipientPhone,
                    U_MEMO3: order.recipientName,
                    U_MEMO4: order.deliveryMemo,
                    PROD_CD: product.sku,
                    PROD_DES: product.productName,
                    QTY: product.quantity,
                    USER_PRICE_VAT: product.unitPrice,
                    SUPPLY_AMT: supply_amount,
                    VAT_AMT: vat_amount,
                    ADD_TXT_01_T: order.depositorName, // 현재 Imweb에서 미지원
                },
            };
            index++;
        });
    }
    // });
    return {
        SaleOrderList: orderList,
    };
};

const putOrdersToEcount = async (orders) => {
    const body = makeBodyToRequestFromOrders(orders);
    const sessionIdInstance = await sessionId.getInstance();
    const session = await sessionIdInstance.getSessionId();
    const axiosConfig = {
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
    };
    const url =
        process.env.ECOUNT_API_BASEURL +
        "/SaleOrder/SaveSaleOrder?SESSION_ID=" +
        session;
    return axios.post(url, body, axiosConfig);
};

export { putOrdersToEcount };
