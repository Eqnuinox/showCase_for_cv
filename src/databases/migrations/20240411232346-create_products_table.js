'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            title: {
                type: DataTypes.STRING(50),
                allowNull: false
            },

            description: {
                type: DataTypes.STRING(255),
                allowNull: true
            },

            count: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            price: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
        })

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('products');
    }
};
