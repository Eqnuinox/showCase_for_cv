'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            id: {
                type: DataTypes.INTEGER,
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

            current_price: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            max_price: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            min_price: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            orders_count: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            favorite_count: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            created_at: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },

            updated_at: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        })

    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('products');
    }
};
