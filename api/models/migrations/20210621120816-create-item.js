"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Items", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            orderNumber: {
                type: Sequelize.STRING(20),
            },
            productNumber: {
                type: Sequelize.INTEGER,
            },
            productName: {
                type: Sequelize.STRING(255),
            },
            sku: {
                type: Sequelize.STRING(20),
            },
            quantity: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("Items");
    },
};
// sequelize model:generate --name Item --attributes orderNumber:string,productNumber:integer,productName:string,sku:string,quantity:integer
