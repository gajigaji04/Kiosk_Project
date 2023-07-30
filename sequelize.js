const Sequelize = require("sequelize");
const sequelize = new Sequelize("database_name", "username", "password", {
  // 데이터베이스 구성 옵션
});

const order_item = require("../models/order_item")(sequelize);

// 모델을 데이터베이스와 동기화
(async () => {
  try {
    await sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

module.exports = {
  sequelize,
  order_item,
};
