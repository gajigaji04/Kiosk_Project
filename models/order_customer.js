"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderCustomer extends Model {
    static associate(models) {
      // item_order_customer : order_customer (1:1)
      OrderCustomer.hasOne(models.ItemOrderCustomer, {
        foreignKey: "order_customer_Id",
      });
    }
  }

  OrderCustomer.init(
    {
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "order_customer",
    }
  );

  return OrderCustomer;
};
