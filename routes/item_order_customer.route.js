const express = require("express");
const { Item } = require("../models");
const router = express.Router();
const { Transaction } = require("sequelize");

class ItemRouter {
  constructor() {
    this.router = express.Router();
    this.router.post("/itemOrderCustomer", this.itemOrderCustomer.bind(this));
  }

  generateOrderID() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000);
    const orderID = `${timestamp}-${randomNum}`;
    return orderID;
  }

  async itemOrderCustomer(req, res) {
    const orderID = this.generateOrderID();
    console.log("생성된 주문 ID:", orderID);

    const { itemIds } = req.body;

    try {
      const orderedItems = await Item.findAll({
        where: { id: itemIds },
      });

      let totalPrice = 0;
      for (const item of orderedItems) {
        totalPrice += item.price;
      }

      return res.status(200).json({
        orderID,
        totalPrice,
        message: "주문이 성공적으로 완료되었습니다.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errorMessage: "주문에 실패했습니다." });
    }
  }
}

module.exports = new ItemRouter().router;
