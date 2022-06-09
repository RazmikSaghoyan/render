'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const { STRING } = DataTypes;

  class User extends Model {
    static associate(models) {
      User.hasMany(models.Announcement, {as: 'announcements', foreignKey: 'userId', sourceKey: 'id'});
    }
  }

  User.init({
    firstName: {
      type: STRING,
      allowNull: false
    },
    lastName: {
      type: STRING,
      allowNull: false
    },
    email: {
      type: STRING,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });

  return User;
};