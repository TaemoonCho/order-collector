import { expect } from "chai";
import { getAllProducts } from "../../../services/imweb/products";

describe("services/imweb/products", () => {
    it("Should get all the product number and name", async () => {
        const res = await getAllProducts();
        expect(res).to.be.an("array");
        expect(res).to.have.lengthOf.at.least(1000);
    });
});
