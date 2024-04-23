'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('loyaltyRoles', [
            {id: 1, title: 'Broker', loyal_ratio: 1, upgrade_condition: 5, next_loyalty_role: 2},
            {id: 2, title: 'Expired trader', loyal_ratio: .9, upgrade_condition: 10, next_loyalty_role: 3},
            {id: 3, title: 'God of numbers', loyal_ratio: .8, upgrade_condition: null, next_loyalty_role: null},
            {id: 4, title: 'Guest', loyal_ratio: 1, upgrade_condition: 1, next_loyalty_role: 1},
        ], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('loyaltyRoles', null, {});
    }
};
