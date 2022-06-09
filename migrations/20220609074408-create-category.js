'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, literal } = Sequelize;

    await queryInterface.createTable('categories', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      parentId: {
        type: INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      title: {
        type: STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('categories');
  },
};
