'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('categories', [
            {id: 1, name: 'hot_dishes'},
            {id: 2, name: 'alcohol'},
            {id: 3, name: 'cold_dishes'},
            {id: 4, name: 'snacks'},
            {id: 5, name: 'soft_drinks'},
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {});
    }
};
