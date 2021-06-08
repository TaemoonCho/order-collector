// // This is singleton object.
import { getAccessToken } from "./auth";

const accessToken = (() => {
    // --- DO NOT HANDLE ATTRIBUTE FROM OUTSIDE OF OBJECT!
    let token;
    let instance;
    let expTime;
    const expiry = parseInt(process.env.IMWEB_TOKEN_EXPIRY_MIN);
    // --- DO NOT HANDLE ATTRIBUTE FROM OUTSIDE OF OBJECT!

    async function init() {
        return {
            getToken: async () => {
                if (!token || expTime < Date.now()) {
                    token = await getAccessToken();
                    expTime = new Date(Date.now() + expiry * 60000).getTime();
                }
                return token;
            },
        };
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = init();
            }
            return instance;
        },
    };
})();

// module.exports = accessToken;
export { accessToken };
