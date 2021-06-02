import { expect } from "chai";
import { getAccessToken } from "../../../services/imweb/auth";

describe("services/imweb/auth", () => {
    it("Should get the access token from Imweb", async () => {
        const res = await getAccessToken();
        expect(res).not.to.be.a.null;
        expect(res).to.be.a("string");
        expect(res).has.lengthOf.at.least(14);
    });
});
