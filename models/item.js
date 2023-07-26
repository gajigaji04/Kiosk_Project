"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      // option : item (1:N)
      Item.hasMany(models.Option, { foreignKey: "item_Id" });
      // item : order_item (1:N)
      Item.hasMany(models.OrderItem, { foreignKey: "item_Id" });
      // item : item_order_customer(1:1)
      Item.hasOne(models.ItemOrderCustomer, { foreignKey: "item_Id" });
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      option_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "default_option_id", // option_id에 대한 기본값 설정
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "0", // 기본값 설정: 0
      },
    },
    {
      sequelize,
      modelName: "item",
    }
  );

  return Item;
};
