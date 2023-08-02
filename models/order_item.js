"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // order_item : item (N:1)
      OrderItem.belongsTo(models.Item, { foreignKey: "item_id" });
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
