'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, TEXT } = DataTypes;

  class Announcement extends Model {
    static associate(models) {
      Announcement.hasOne(models.User, {as:'user', sourceKey: 'userId', foreignKey: 'id'});
      Announcement.hasOne(models.Category, {as: 'category', sourceKey: 'userId', foreignKey: 'id'} );
    }
  }

  Announcement.init({
    categoryId: INTEGER,
    userId: INTEGER,
    title: STRING,
    description: TEXT,
    image: TEXT
  }, {
    sequelize,
    modelName: 'Announcement',
    tableName: 'announcements'
  });

  return Announcement;
};