'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('statuses', [
      { id: 1, status: 'Admin' },
      { id: 2, status: 'Stuff' },
      { id: 3, status: 'Client' },
      { id: 4, status: 'User' },
      { id: 5, status: 'Guest' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('statuses', null, {});
  }
};
