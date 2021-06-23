import { login } from "./login";

const sessionId = (() => {
    // --- DO NOT HANDLE ATTRIBUTE FROM OUTSIDE OF OBJECT!
    let sessionId;
    let instance;
    let expTime;
    const expiry = parseInt(process.env.ECOUNT_SESSION_EXPIRY_HOUR);
    // --- DO NOT HANDLE ATTRIBUTE FROM OUTSIDE OF OBJECT!

    async function init() {
        return {
            getSessionId: async () => {
                if (!sessionId || expTime < Date.now()) {
                    sessionId = await login();
                    expTime = new Date(Date.now() + expiry * 3595000).getTime();
                }
                return sessionId;
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
export { sessionId };
