const PaymentType = {
    Cash: "10",
    Transfer: "14",
    CardOnDelivery: "13",
    PointInFull: "15",
    Uknown: "Unkown",
};

const koreanToPaymentType = (str) => {
    if (str.includes("현금결제")) {
        return PaymentType.Cash;
    } else if (str.includes("계좌이체")) {
        return PaymentType.Transfer;
    } else if (str.includes("현장 카드결제")) {
        return PaymentType.CardOnDelivery;
    } else if (str.includes("포인트 결제")) {
        return PaymentType.PointInFull;
    } else {
        return PaymentType.Uknown;
    }
};

export { PaymentType, koreanToPaymentType };
