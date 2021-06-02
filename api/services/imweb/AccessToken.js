// // This is singleton object.
import { getAccessToken } from "./auth";

const accessToken = (() => {
    let token;
    let instance;

    async function init() {
        return {
            getToken: () => {
                if (!token) {
                    token = getAccessToken();
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
