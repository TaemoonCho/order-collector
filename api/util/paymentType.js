const PaymentType = {
    Cash: "cash", //"10",
    CardOnDelivery: "cardOD", //"13",
    Transfer: "transfer", //"14",
    PointInFull: "point", //"15",
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

const paymentTypeStringToEcountPaymentType = (paymentType) => {
    switch (paymentType) {
        case PaymentType.Cash:
            return "10";
        case PaymentType.Transfer:
            return "14";
        case PaymentType.CardOnDelivery:
            return "13";
        case PaymentType.PointInFull:
            return "15";
        default:
            return "Unkown";
    }
};

export {
    PaymentType,
    koreanToPaymentType,
    paymentTypeStringToEcountPaymentType,
};
