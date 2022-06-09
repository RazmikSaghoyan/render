'use strict';

module.exports = {
  up: async queryInterface => {
    const product = await queryInterface.rawSelect(
      'announcements',
      {
        where: {
          title: 'Ford',
        },
      },
      ['id'],
    );

    if (!product) {
      await queryInterface.bulkInsert('announcements', [
        { id: 1, categoryId: 3, userId: 1, title: 'Ford', description: '4x4'},
        { id: 2, categoryId: 1, userId: 2, title: 'Camry', description: '2012'},
        { id: 3, categoryId: 5, userId: 3, title: 'Flat in Sevak street', description: '$70K'},
      ]);
    }
  },
  down: async queryInterface => await queryInterface.bulkInsert('announcements', null, {}),
};
