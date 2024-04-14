'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('categories', [
            {id: 1, name: 'wine'},
            {id: 2, name: 'beer'},
            {id: 3, name: 'hot_dishes'},
            {id: 4, name: 'snacks'},
            {id: 5, name: 'soft_drinks'},
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {});
    }
};
