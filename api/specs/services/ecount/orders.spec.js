import { assert, expect } from "chai";
import { putOrdersToEcount } from "../../../services/ecount/orders";

describe("services/ecount/orders", () => {
    const ordersString =
        '[{"orderNo":"2021062165084","orderTime":1624263465,"recipientName":"TEST","recipientPhone":"0961122564","recipientAddress":"1606, Thap B, Đường Nguyễn Hữu Thọ, Xã Phước Kiên Quận Nhà","buyerName":"TEST","buyerEmail":"jake@xod.vn","paymentType":"14","pointUsed":105000,"totalPrice":900000,"deliveryTimeKeyString":"2021-06-23 17:00~19:30","eliveryStartTimestamp":1624442400,"products":[{"productNo":1689,"productName":"테스트용 등록하지마세요 (사이즈:XL)","sku":"SKU_NO_OPTION","price":200000,"quantity":2},{"productNo":1689,"productName":"테스트용 등록하지마세요 (사이즈:L)","sku":"SKU_NO_OPTION","price":300000,"quantity":3},{"productNo":1689,"productName":"테스트용 등록하지마세요 (사이즈:M)","sku":"SKU_NO_OPTION","price":400000,"quantity":4}]}]';
    const orders = JSON.parse(ordersString);
    it("Should push all order", async () => {
        let res;
        try {
            res = await putOrdersToEcount(orders);
        } catch (error) {
            console.log(error);
            assert.fail(error);
        }

        expect(res).to.be.an("array");
        // expect(res).to.have.lengthOf.at.least(1);
    });
});
