const express = require("express");
const { Item_order_customer } = require("../models");
const router = express.Router();
const { Transaction } = require("sequelize");

class ItemRouter {
  constructor() {
    this.router = express.Router();
    // 상품 주문 고객 반환
    this.router.post("/addOrderCustomer", this.itemOrderCustomer.bind(this));
  }

  generateOrderID() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000);
    const orderID = `${timestamp}-${randomNum}`;
    return orderID;
  }

  // 상품 주문 고객 반환
async addOrderCustomer(req, res) {
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

      // item_order_customer 테이블에 항목 생성
      await ItemOrderCustomer.create({
        item_id: item.id, // item_id 필드에 item의 id 값을 지정
        order_customer_id: orderID, // order_customer_id 필드에 주문 ID를 지정
        amount: 1, // 주문 수량은 1로 가정하고 amount 필드에 1을 지정
      });
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
