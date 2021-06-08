import axios from "axios";

const getAccessToken = () => {
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

    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(
                process.env.IMWEB_API_BASEURL + "/auth",
                axiosConfig,
            );
            if (res.status == 200 && res.data.access_token)
                resolve(res.data.access_token);
            else reject();
        } catch (error) {
            reject();
        }
    });
    // return axios
    //     .get(process.env.IMWEB_API_BASEURL + "/auth", axiosConfig)
    //     .then((res) => {
    //         if (res.status == 200 && res.data.access_token)
    //             return res.data.access_token;
    //         else return null;
    //     })
    //     .catch((error) => {
    //         return null;
    //     });
};

export { getAccessToken };
