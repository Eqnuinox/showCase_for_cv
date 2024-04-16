'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('loyaltyRoles', [
            {id: 1, title: 'Broker', loyal_ratio: 1},
            {id: 2, title: 'Expired trader', loyal_ratio: .9},
            {id: 3, title: 'God of numbers', loyal_ratio: .8},
        ], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('loyaltyRoles', null, {});
    }
};
