import axios from "axios";

const login = async () => {
    const param = {
        COM_CODE: process.env.ECOUNT_COM_CODE,
        USER_ID: process.env.ECOUNT_USER_ID,
        API_CERT_KEY: process.env.ECOUNT_API_CERT_KEY,
        LAN_TYPE: "ko-KR",
        ZONE: "IA",
    };

    const axiosConfig = {
        baseURL: process.env.ECOUNT_API_BASEURL,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
    };

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post("/OAPILogin", param, axiosConfig);
            if (
                res.status == 200 &&
                res.data.Data.Code === "00" &&
                res.data.Data.Datas.SESSION_ID
            )
                resolve(res.data.Data.Datas.SESSION_ID);
            else reject();
        } catch (error) {
            reject();
        }
    });
};

export { login };
