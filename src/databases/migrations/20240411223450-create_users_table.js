'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            account_number: {
                type: Sequelize.DataTypes.STRING(9)
            },


            first_name: {
                type: Sequelize.DataTypes.STRING(50),
                allowNull: true
            },

            last_name: {
                type: Sequelize.DataTypes.STRING(50),
                allowNull: true,
            },

            email: {
                type: Sequelize.DataTypes.STRING(100),
                allowNull: true,
                unique: true
            },

            status_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "statuses",
                    key: 'id'
                }
            },

            phone: {
                type: Sequelize.DataTypes.STRING(20),
                allowNull: true
            },

            is_verified: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },

            is_blocked: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
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
        await queryInterface.dropTable('users');
    }
};
