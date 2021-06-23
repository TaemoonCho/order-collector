import { assert, expect } from "chai";
import { putOrdersToEcount } from "../../../services/ecount/orders";

describe("services/ecount/orders", async () => {
    it("Should push all order", async () => {
        const ordersString = `[{"orderNo": "20210623342301","orderTime": 1624429034,"recipientName": "TEST","recipientPhone": "0961122564","recipientAddress": "1606, Thap B, Đường Nguyễn Hữu Thọ, Xã Phước Kiên Quận Nhà","deliveryMemo": "배송 메모 1","buyerName": "TEST","buyerEmail": "jake@xod.vn","paymentType": "transfer","depositorName": null,"pointUsed": 145000,"totalPrice": 900000,"error": null,"deliveryTimeString": "2021-06-23 17:00~19:30","deliveryStartTime": 1624442400,"products": [{"productNo": 1689,"productName": "테스트용 등록하지마세요 (사이즈:XL)","sku": "TEST1689XL","unitPrice": 100000,"quantity": 4},{"productNo": 1689,"productName": "테스트용 등록하지마세요 (사이즈:L)","sku": "TEST1689L","unitPrice": 100000,"quantity": 3},{"productNo": 1689,"productName": "테스트용 등록하지마세요 (사이즈:M)","sku": "TEST1689M","unitPrice": 100000,"quantity": 2},{"productNo": 0,"productName": "포인트 사용","unitPrice": -145000,"sku": "Method0002","quantity": 1}]},{"orderNo": "20210623342302","orderTime": 1624429034,"recipientName": "TEST","recipientPhone": "0961122564","recipientAddress": "1606, Thap B, Đường Nguyễn Hữu Thọ, Xã Phước Kiên Quận Nhà","deliveryMemo": "배송 메모 2","buyerName": "TEST","buyerEmail": "jake@xod.vn","paymentType": "cardOD","depositorName": null,"pointUsed": 0,"totalPrice": 900000,"error": {	"products": "Could not get products from Imweb(/shop/prod-orders).","develiveryTime": "Invalid deliveryTime (13월 06분 (목) 24:70)"},"products": []}]`;
        const orders = JSON.parse(ordersString);
        // let res;
        // try {
        //     res = await putOrdersToEcount(orders);
        // } catch (error) {
        //     console.log(error);
        //     assert.fail(error);
        // }
        try {
            const res = await putOrdersToEcount(orders);
            console(res);
        } catch (err) {
            console.log(err.response);
            assert.fail(err.response);
        }

        expect(res).to.be.an("object");
        // expect(res).to.have.lengthOf.at.least(1);
    });
});
