"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Item.belongsTo(models.Order, {
                foreignKey: "orderId",
                as: "order",
            });
        }
    }
    Item.init(
        {
            orderNumber: DataTypes.STRING(20),
            productNumber: DataTypes.INTEGER,
            productName: DataTypes.STRING(255),
            sku: DataTypes.STRING(20),
            quantity: DataTypes.INTEGER,
            orderId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Orders",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "Item",
        },
    );
    return Item;
};
