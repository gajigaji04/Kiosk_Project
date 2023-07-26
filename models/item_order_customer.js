"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ItemOrderCustomer extends Model {
    static associate(models) {
      // item_order_customer : item (1:1)
      ItemOrderCustomer.hasOne(models.Item, {
        foreignKey: "item_order_customer_Id",
      });
    }
  }
  ItemOrderCustomer.init(
    {
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "item_order_customer",
    }
  );

  return ItemOrderCustomer;
};

module.exports = item_order_customer;
