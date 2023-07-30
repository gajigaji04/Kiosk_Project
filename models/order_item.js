"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // order_item : item (1:N)
      OrderItem.hasMany(models.Item, { foreignKey: "order_item_Id" });
    }
  }

  OrderItem.init(
    {
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
      tableName: "order_items", // 사용자 지정 테이블 이름 지정
    }
  );

  return OrderItem;
};
