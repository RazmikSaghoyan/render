'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Announcement, {as: 'announcements', foreignKey: 'categoryId', sourceKey: 'id'});
      Category.hasMany(models.Category, {as: 'children', foreignKey: 'parentId', sourceKey: 'id'});
    }
  }
  Category.init({
    parentId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories'
  });
  return Category;
};