"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ItemOrderCustomer extends Model {
    static associate(models) {
      // item_order_customer : item (다대다)
      ItemOrderCustomer.belongsToMany(models.Item, {
        through: "ItemOrder", // 중간 테이블 이름을 지정해야 합니다.
        foreignKey: "item_order_customer_id", // 중간 테이블의 주문 항목 외래 키
        otherKey: "item_id", // 중간 테이블의 상품 외래 키
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
        type: DataTypes.INTEGER,
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
