import { assert, expect } from "chai";
import { getAllOrders } from "../../../services/imweb/orders";

describe("services/imweb/orders", () => {
    it("Should get all order", async () => {
        let res;
        try {
            res = await getAllOrders();
        } catch (error) {
            console.log(error);
            assert.fail(error);
        }

        expect(res).to.be.an("array");
        // expect(res).to.have.lengthOf.at.least(1);
    });
});
