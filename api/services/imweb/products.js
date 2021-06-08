import axios from "axios";
import { accessToken } from "./accessToken";

const interval = parseInt(process.env.IMWEB_API_CALL_INTERVAL_MILSEC);

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const getProductOption = async (productNumber, productName) => {
    return new Promise(async (resolve, reject) => {
        const accessTokenInstance = await accessToken.getInstance();
        const token = await accessTokenInstance.getToken();
        let result = [];
        const axiosConfig = {
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                "access-token": token,
            },
        };

        try {
            const optionRes = await axios.get(
                `${process.env.IMWEB_API_BASEURL}/shop/products/${productNumber}/options`,
                axiosConfig,
            );
            await sleep(interval);
            const optionDetailRes = await axios.get(
                `${process.env.IMWEB_API_BASEURL}/shop/products/${productNumber}/options-details`,
                axiosConfig,
            );

            if (optionRes.status == 200 && optionDetailRes.status == 200) {
                if (
                    optionRes.data.data.list &&
                    optionRes.data.data.list.length == 1 &&
                    //
                    optionDetailRes.data.data.list &&
                    optionDetailRes.data.data.list.length ==
                        optionRes.data.data.list[0].value_list.length
                ) {
                    let options = [];
                    const option = optionRes.data.data.list[0];
                    const optionName = option.name;
                    const valueList = option.value_list;
                    const detailList = optionRes.data.data.list;
                    for (let i = 0; i < valueList.length; i++) {
                        detailList.forEach((e) => {
                            if (e.value_code_list[0] === valueList[i].code) {
                                options[i] = {
                                    name: `${productName} (${optionName}:${valueList[i].name})`,
                                    code: valueList[i].code,
                                    sku: e.stock_sku,
                                };
                            }
                        });
                    }
                } else {
                    console.log("Not only the one option");
                }
            } else {
            }
        } catch (error) {}
    });
};

const getProductByPagination = async (pageNumer) => {
    const accessTokenInstance = await accessToken.getInstance();
    const token = await accessTokenInstance.getToken();

    const data = {
        limit: 100,
        offset: pageNumer,
        // "prod_status" : "sale"
    };

    const axiosConfig = {
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "access-token": token,
        },
        data: data,
    };

    return new Promise(async (resolve, reject) => {
        try {
            let currentIndex = 0;
            const res = await axios.get(
                process.env.IMWEB_API_BASEURL + "/shop/products",
                axiosConfig,
            );
            const start = Date.now();
            if (
                res.status == 200 &&
                res.data &&
                res.data.code == 200 &&
                res.data.data &&
                res.data.data.list
            ) {
                const list = res.data.data.list;
                let results = [];
                for (let i = 0; i < list.length; i++) {
                    results[currentIndex] = {
                        prodNo: list[i].no,
                        prodName: list[i].name,
                        prodSKU: list[i].stock.sku_no_option,
                    };

                    // getProductOption(productNumber, productName)

                    if (list[i].stock.stock_no_option == 0) {
                        results[currentIndex] = {
                            prodNo: list[i].no,
                            prodName: list[i].name,
                            prodSKU: list[i].stock.sku_no_option,
                            hasOption: false,
                        };
                    } else {
                        const sleepMillisec = Date.now() - start + interval;
                        if (sleepMillisec > 0) await sleep(sleepMillisec);
                        // TODO : get option
                        const optionRes = await getProductOption(
                            list[i].no,
                            list[i].name,
                        );
                        console.log("here");
                    }
                    currentIndex++;
                }
                if (pageNumer != 1) {
                    resolve(results);
                } else {
                    resolve({
                        list: results,
                        totalPage: res.data.data.pagenation.total_page,
                    });
                }
            } else reject();
        } catch (error) {
            reject();
        }
    });
};

const getAllProducts = async () => {
    const accessTokenInstance = await accessToken.getInstance();
    const token = await accessTokenInstance.getToken();
    let totalPage = 1;
    let currentIndex = 0;
    let prodList = [];

    const axiosConfig = {
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "access-token": token,
        },
        data: {
            limit: 100,
            //prod_status: "sale"
        },
    };
    try {
        let start = Date.now() - interval;
        for (let i = 0; i < totalPage; i++) {
            // sleeping control
            const sleepMillisec = start - Date.now() + interval;
            // console.log(sleepMillisec);
            if (i != 0 && sleepMillisec > 0) await sleep(sleepMillisec);
            const res = await getProductByPagination(i + 1);
            start = Date.now();

            let pageRes;
            if (currentIndex == 0 && res.totalPage) {
                totalPage = res.totalPage;
                pageRes = res.list;
            } else {
                pageRes = res;
            }
            for (let j = 0; j < pageRes.length; j++) {
                prodList[currentIndex] = pageRes[j];
                currentIndex++;
            }
            // console.log(`Sec1 : ${(Date.now() - start1) / 1000}`);
        }
    } catch (error) {
        console.log(error);
    }
    // console.log(`total : ${(Date.now() - start) / 1000}`);
    return prodList;
};

export { getAllProducts };
