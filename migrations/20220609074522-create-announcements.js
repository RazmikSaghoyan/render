'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, TEXT, DATE, literal } = Sequelize;

    await queryInterface.createTable('announcements', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      userId: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: 'users',
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
      description: {
        type: TEXT,
      },
      image: {
        type: STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('announcements');
  }
};