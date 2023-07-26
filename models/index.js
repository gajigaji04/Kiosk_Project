"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const Option = require("./option")(sequelize, Sequelize.DataTypes);
const Item = require("./item")(sequelize, Sequelize.DataTypes);
const OrderItem = require("./order_item")(sequelize, Sequelize.DataTypes);
const ItemOrderCustomer = require("./item_order_customer")(
  sequelize,
  Sequelize.DataTypes
);
const OrderCustomer = require("./order_customer")(
  sequelize,
  Sequelize.DataTypes
);

db.Option = Option;
db.Item = Item;
db.OrderItem = OrderItem;
db.ItemOrderCustomer = ItemOrderCustomer;
db.OrderCustomer = OrderCustomer;

// 모델 간의 관계 설정
Option.hasMany(Item, { foreignKey: "option_Id" });
Item.belongsTo(Option, { foreignKey: "option_Id" });

Item.hasMany(OrderItem, { foreignKey: "item_Id" });
OrderItem.belongsTo(Item, { foreignKey: "item_Id" });

Item.hasOne(ItemOrderCustomer, { foreignKey: "item_Id" });
ItemOrderCustomer.belongsTo(Item, { foreignKey: "item_Id" });

OrderCustomer.hasOne(ItemOrderCustomer, { foreignKey: "order_customer_Id" });
ItemOrderCustomer.belongsTo(OrderCustomer, { foreignKey: "order_customer_Id" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
