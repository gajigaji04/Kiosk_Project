const { where } = require("sequelize");
const { itmem } = require("../models");
const itemService = require("../services/Item.service");

class ItemController {
  itemService = new itemService();
}

module.exports = ItemController;
