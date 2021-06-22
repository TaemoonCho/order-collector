"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            orderNumber: {
                type: Sequelize.STRING(30),
            },
            buyerEmail: {
                type: Sequelize.STRING(255),
            },
            buyerName: {
                type: Sequelize.STRING(100),
            },
            deliveryTimeString: {
                type: Sequelize.STRING(30),
            },
            deliveryStartTime: {
                type: Sequelize.DATE,
            },
            orderNo: {
                type: Sequelize.STRING(20),
            },
            orderTime: {
                type: Sequelize.DATE,
            },
            paymentType: {
                type: Sequelize.STRING(10),
            },
            pointUsed: {
                type: Sequelize.INTEGER,
            },
            recipientAddress: {
                type: Sequelize.STRING(255),
            },
            recipientName: {
                type: Sequelize.STRING(100),
            },
            recipientPhone: {
                type: Sequelize.STRING(15),
            },
            totalPrice: {
                type: Sequelize.INTEGER,
            },
            status: {
                type: Sequelize.STRING(10),
            },
            error: {
                type: Sequelize.STRING(255),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Orders");
    },
};
// sequelize model:generate --name Order --attributes orderNumber:string,buyerEmail:string,buyerName:string,deliveryTimeString:string,\
// deliveryStartTime:date,orderNo:string,orderTime:date,paymentType:string,pointUsed:integer,recipientAddress:string,recipientName:string,\
// recipientPhone:string,totalPrice:integer,status:string
