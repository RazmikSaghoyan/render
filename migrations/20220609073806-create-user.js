'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE, literal } = Sequelize;

    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      firstName: {
        type: STRING,
        allowNull: false
      },
      lastName: {
        type: STRING,
        allowNull: false
      },
      password: {
        type: STRING,
        allowNull: false
      },
      email: {
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
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};