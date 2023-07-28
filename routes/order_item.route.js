const express = require("express");
const { order_item } = require("../models");
const router = express.Router();
const { Transaction } = require("sequelize");

class OrderItemRouter {
  constructor() {
    this.router = express.Router();
    this.router.post("/addOrder/:productId", this.addOrder.bind(this));
  }

  async addOrder(req, res) {
    const { productId } = req.params;

    try {
      // 기본 상태가 0인 데이터베이스에 주문 추가
      const newOrder = await order_item.create({
        productId: productId,
        state: 0,
      });

      return res.status(201).json({
        message: "상품 발주 내역이 성공적으로 추가되었습니다.",
        order: newOrder,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: "서버 오류가 발생하였습니다." });
    }
  }
}

module.exports = new OrderItemRouter().router;
