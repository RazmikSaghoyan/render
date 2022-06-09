'use strict';

module.exports = {
  up: async queryInterface => {
    const category = await queryInterface.rawSelect(
      'categories',
      {
        where: {
          title: 'Car',
        },
      },
      ['id'],
    );

    if (!category) {
      await queryInterface.bulkInsert('categories', [
        { id: 1, title: 'Car' },
        { id: 2, title: 'Sedan', parentId: 1 },
        { id: 3, title: 'Crossover', parentId: 1 },
        { id: 4, title: 'Bus', parentId: 1 },
        { id: 5, title: 'Flat' },
        { id: 6, title: 'Rent', parentId: 5 },
        { id: 7, title: 'Sale', parentId: 5 },
        { id: 8, title: 'Work' },
        { id: 9, title: 'It', parentId: 8 },
        { id: 10, title: 'Accounted', parentId: 8 },
      ]);
    }
  },
  down: async queryInterface => await queryInterface.bulkInsert('categories', null, {}),
};
