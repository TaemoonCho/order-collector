import { expect } from "chai";
import { login } from "../../../services/ecount/login";

describe("services/ecount/login", () => {
    it("Should success to loging for Ecount", async () => {
        const res = await login();
        expect(res).not.to.be.a.null;
        expect(res).to.be.a("string");
        // expect(res.status).to.be.equal(200);
        // expect(res).to.haveOwnPropertyDescriptor("data");
        // expect(res.data).to.haveOwnPropertyDescriptor("Data");
        // expect(res.data).to.haveOwnPropertyDescriptor("Status");
        // expect(res.data.Data).to.haveOwnPropertyDescriptor("Datas");
        // expect(res.data.Data.Datas).to.haveOwnPropertyDescriptor("SESSION_ID");
        // expect(res.data.Status).to.be.equal("200");
    });
});
