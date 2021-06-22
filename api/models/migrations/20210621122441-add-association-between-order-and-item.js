"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("Items", "orderId", {
            type: Sequelize.INTEGER,
            references: {
                model: "Orders",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            allowNull: false,
        });
        await queryInterface.addIndex("Items", ["orderId"], {
            name: "idx_orderId",
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeIndex("Items", "idx_orderId");
        await queryInterface.removeColumn("Items", "orderId");
    },
};
