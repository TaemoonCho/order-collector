import { expect } from "chai";
import { koreanToDeliveryTime } from "../../util/deliveryTime";

describe("util/deliveryTime", () => {
    it("Should success to extract dates from string", () => {
        const str = "(김치 기무치) 12월 20일 (목) 13:00 - 14:30 (스시 스으시)";
        const res = koreanToDeliveryTime(str);
        expect(res).not.to.be.null;
        expect(res).to.be.an("object");
        expect(res).haveOwnProperty("startTimestamp");
        // expect(res).haveOwnProperty("endTimestamp");
        expect(res).haveOwnProperty("keyString");
        expect(res.startTimestamp).to.be.a("number");
        // expect(res.endTimestamp).to.be.a("number");
        expect(res.keyString).to.be.a("string");
        expect(res.startTimestamp).to.be.equal(1639980000);
        // expect(res.endTimestamp).to.be.equal(1624174200000);
        expect(res.keyString).to.be.equal("2021-12-20 13:00~14:30");
    });
    it("Should success to extract dates from string", () => {
        const str = "12월 11일(금) 17:00 - 19:30";
        const res = koreanToDeliveryTime(str);
        expect(res).not.to.be.null;
        expect(res).to.be.an("object");
        expect(res).haveOwnProperty("startTimestamp");
        // expect(res).haveOwnProperty("endTimestamp");
        expect(res).haveOwnProperty("keyString");
        expect(res.startTimestamp).to.be.a("number");
        // expect(res.endTimestamp).to.be.a("number");
        expect(res.keyString).to.be.a("string");
        expect(res.startTimestamp).to.be.equal(1639216800);
        // expect(res.endTimestamp).to.be.equal(1624174200000);
        expect(res.keyString).to.be.equal("2021-12-11 17:00~19:30");
    });

    it("Should fail to extract dates from string", () => {
        let str = "(김치 기무치) 13월 20일 (목) 13:00 - 14:30 (스시 스으시)";
        let res = koreanToDeliveryTime(str);
        expect(res).to.be.a.null;

        str = "(김치 기무치) 13월 00일 (목) 13:00 - 14:30 (스시 스으시)";
        res = koreanToDeliveryTime(str);
        expect(res).to.be.a.null;

        str = "(김치 기무치) 01월 11일 (가) 13:00 - 14:30 (스시 스으시)";
        res = koreanToDeliveryTime(str);
        expect(res).to.be.a.null;

        str = "(김치 기무치) 01월 11일 (가) 88:00 - 14:30 (스시 스으시)";
        res = koreanToDeliveryTime(str);
        expect(res).to.be.a.null;
    });
    it("", () => {
        let str = "6월 22일(화) 9:30 - 11:00";
        let res = koreanToDeliveryTime(str);
        expect(res).not.to.be.a.null;
    });
});
