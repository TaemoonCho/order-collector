import axios from "axios";

const getAccessToken = async () => {
    const data = {
        key: process.env.IMWEB_APIKEY,
        secret: process.env.IMWEB_SECRETKEY,
    };

    const axiosConfig = {
        headers: {
            "Content-type": "application/json",
        },
        data: data,
    };

    let token;
    try {
        const res = await axios.get(
            process.env.IMWEB_API_BASEURL + "/auth",
            axiosConfig,
        );
        if (res.status == 200 && res.data.access_token) {
            token = res.data.access_token;
        }
    } catch (error) {}

    return token;
};

export { getAccessToken };
