const express = require("express");
const { order_item } = require("../models");
const router = express.Router();
const OrderItemController = require("../controllers/order_item.controller"); // Correct the file path

class OrderItemController {
  async addOrder(req, res) {
    const { productId } = req.params;

    try {
      const newOrder = await OrderItemService.addOrder(productId);
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

module.exports = new OrderItemController();
