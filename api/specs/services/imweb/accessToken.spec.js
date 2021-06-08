import { expect } from "chai";
import { accessToken } from "../../../services/imweb/accessToken";
// const accessToken = require("../../../services/imweb/AccessToken");

describe("service/imweb/accessToekn", () => {
    let accessToken1;
    let accessToken2;
    before("", async () => {
        accessToken1 = await accessToken.getInstance();
        accessToken2 = await accessToken.getInstance();
    });
    it("Should be singleton instance", () => {
        // const token1 = accessToken1.getToken();
        // const token2 = accessToken2.getToken();
        // expect(token1).not.to.be.a.null;
        // expect(token1 === token2).to.be.a.true;
        expect(accessToken1 === accessToken2).to.be.a.true;
    });
    // it("Should get a new token after expire", async () => {
    //     let oldToken = await accessToken1.getToken();
    //     accessToken1.expTime = Date.now();
    //     let newToken = await accessToken1.getToken();
    //     expect(oldToken).not.to.be.equal(newToken);
    // });
});
