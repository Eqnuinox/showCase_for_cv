'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('statuses', [
      {
        id: 1,
        code: 'SRA',
        name: 'SUPER_ADMIN',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        code: 'STF',
        name: 'STUFF',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        code: 'CLT',
        name: 'CLIENT',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        code: 'USR',
        name: 'USER',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        code: 'GUT',
        name: 'GUEST',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('statuses', null, {});
  }
};
