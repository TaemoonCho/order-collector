// // This is singleton object.
import { getAccessToken } from "./auth";

// class AccessToken {
//     token;
//     constructor() {}

//     async getToken() {
//         token = await this.renew();
//         return token;
//     }

//     renew() {
//         return new Promise((resolve, reject) => {
//             getAccessToken()
//                 .then((res) => {
//                     if (
//                         res &&
//                         res.status == 200 &&
//                         res.data &&
//                         res.data.access_token
//                     ) {
//                         resolve(res.data.access_token);
//                     }
//                 })
//                 .catch((err) => {
//                     reject("Couldn't get access token form Imweb.");
//                 });
//         });
//     }
// }

// const obj = new AccessToken();
// Object.freeze(obj);

// module.exports = obj;

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
