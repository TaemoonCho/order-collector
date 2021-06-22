"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order.init(
        {
            orderNumber: DataTypes.STRING(30),
            buyerEmail: DataTypes.STRING(255),
            buyerName: DataTypes.STRING(100),
            deliveryTimeString: DataTypes.STRING(30),
            deliveryStartTime: DataTypes.DATE,
            orderNo: DataTypes.STRING(20),
            orderTime: DataTypes.DATE,
            paymentType: DataTypes.STRING(10),
            pointUsed: DataTypes.INTEGER,
            recipientAddress: DataTypes.STRING(255),
            recipientName: DataTypes.STRING(100),
            recipientPhone: DataTypes.STRING(15),
            totalPrice: DataTypes.INTEGER,
            status: DataTypes.STRING(10),
            error: DataTypes.STRING(255),
        },
        {
            sequelize,
            modelName: "Order",
        },
    );
    return Order;
};
