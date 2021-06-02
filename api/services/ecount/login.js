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
        baseURL: ECOUNT_API_BASEURL,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
        data: data,
    };

    return axios.post("/OAPILogin", param, axiosConfig);
};

export { login };
