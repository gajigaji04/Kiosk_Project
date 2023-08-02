const express = require("express");
const { OrderItem, Item, sequelize } = require("../models");
const OrderItemController = require("../controllers/order_item.controller");
const router = express.Router();

class OrderItemRouter {
  constructor() {
    this.router = express.Router();
    this.router.post("/addOrder/:productId", this.addOrder.bind(this));
    this.router.put(
      "/putOrder/:orderItemId",
      this.markOrderAsCompleted.bind(this)
    );
  }

  // 상품 발주
  async addOrder(req, res) {
    const { productId } = req.params;

    try {
      // 기본 상태가 'Pending'인 데이터베이스에 주문 추가
      const newOrder = await OrderItem.create({
        item_id: productId,
        state: "Pending",
        amount: "1",
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

  // 상품 발주 수정
  async markOrderAsCompleted(req, res) {
    const { orderItemId } = req.params;

    console.log("orderItemId:", orderItemId);

    try {
      // 트랜잭션 시작
      await sequelize.transaction(async (transaction) => {
        // 지정된 ID 및 "보류 중" 상태의 주문 항목을 찾음
        const orderItem = await OrderItem.findOne({
          where: {
            id: orderItemId,
            state: "Pending", //Ordered → Pending
          },
          transaction,
        });

        console.log("orderItem:", orderItem); // Log the retrieved orderItem

        if (!orderItem) {
          throw new Error(
            "주문 항목을 찾을 수 없거나 상태가 '보류 중'이 아닙니다"
          );
        }

        // 주문 상태를 "완료됨"으로 업데이트
        orderItem.state = "Completed"; // Ordered or Pending → Completed
        await orderItem.save({ transaction });

        // 제품의 양을 주문한 수량만큼 줄임
        const product = await Item.findOne({
          where: {
            id: orderItem.item_id,
          },
          transaction,
        });

        if (!product) {
          throw new Error("상품을 찾을 수 없습니다.");
        }

        // 주문한 수량보다 현재 수량이 적을 경우 에러메세지 반환
        if (orderItem.amount > product.amount) {
          throw new Error(
            "현재 수량이 발주 수량보다 적어 발주 취소가 불가능합니다."
          );
        }

        // 주문한 수량만큼 제품의 양을 줄임
        product.amount -= orderItem.amount;
        await product.save({ transaction });
      });

      // 트랜잭션이 성공적으로 커밋
      return res.json({ message: "주문이 완료되었습니다." });
    } catch (error) {
      // 트랜잭션이 실패하거나 오류 발생
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: "서버 오류가 발생하였습니다." });
    }
  }
}

module.exports = new OrderItemRouter().router;
