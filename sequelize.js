// sequelize.js
const Sequelize = require("sequelize");
const sequelize = new Sequelize("database_name", "username", "password", {
  // Your database configuration options here
});

const order_item = require("../models/order_item")(sequelize);

// Define model relationships or associations here, if any
// For example:
// order_item.belongsTo(someOtherModel);

// Sync the model with the database
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
