const express = require("express");
const { Item, OrderCustomer, ItemOrderCustomer, sequelize } = require("../models");
const router = express.Router();
const { Transaction } = require("sequelize");

class OrderCustomerRouter {
  constructor() {
    this.router = express.Router();
    // 상품 주문
    this.router.post("/orderCustomer", this.orderCustomer.bind(this));
    // 상품 주문 수정
    this.router.post("/putCustomer/:orderCustomerId", this.putCustomer.bind(this));
  }

  // 고유 주문 ID를 생성하는 함수
  generateOrderID() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000);
    const orderID = `${timestamp}-${randomNum}`;
    return orderID;
  }

  // 고객 주문 처리 방법
  async orderCustomer(req, res) {
    // 주문 처리 로직
    const orderID = this.generateOrderID();
    console.log("생성된 주문 ID:", orderID);

    const { itemIds } = req.body;

    const t = await sequelize.transaction();
    
    try {
      const orderedItems = await Item.findAll({
        where: { id: itemIds },
        transaction: t,
      });

      let totalPrice = 0;
      for (const item of orderedItems) {
        totalPrice += item.price;
      }

      const orderDetails = await OrderCustomer.create(
        {
          orderID,
          totalPrice,
          state: false, // 주문이 아직 완료되지 않았기 때문에 초기에 상태를 false로 설정
        },
        { transaction: t }
      );

      // ItemOrderCustomer 테이블에 항목을 만들어 항목을 주문과 연결
      for (const item of orderedItems) {
        await ItemOrderCustomer.create(
          {
            orderId: orderDetails.id,
            itemId: item.id,
          },
          { transaction: t }
        );
      }

      await t.commit();

      return res.status(200).json({
        orderID,
        totalPrice,
        message: "주문이 성공적으로 완료되었습니다.",
      });
    } catch (error) {
      console.error(error);
      await t.rollback();
      return res.status(500).json({ errorMessage: "주문에 실패했습니다." });
    }
  }

  // 상품 주문 수정
  async putCustomer(req, res) {
    const { orderCustomerId } = req.params;

    const t = await sequelize.transaction();

    try {
      const order = await OrderCustomer.findOne({
        where: { id: orderCustomerId },
        transaction: t,
        include: { model: Item },
      });

      if (!order) {
        await t.rollback();
        return res.status(404).json({ errorMessage: "주문을 찾을 수 없습니다." });
      }

      // 주문이 이미 완료된 경우(상태 === true) 오류 메시지를 반환합니다.
      if (order.state === true) {
        await t.rollback();
        return res
          .status(400)
          .json({ errorMessage: "완료된 주문은 취소할 수 없습니다." });
      }

      // 상태를 true로 업데이트하여 주문을 완료된 것으로 표시
      order.state = true;
      await order.save({ transaction: t });

      // 주문 수량만큼 재고 수량 줄이기
      for (const item of order.Items) {
        const itemOrder = await ItemOrderCustomer.findOne({
          where: { orderId: order.id, itemId: item.id },
          transaction: t,
        });

        if (itemOrder) {
          item.amount -= itemOrder.quantity;
          await item.save({ transaction: t });
        }
      }

      await t.commit();

      return res.status(200).json({
        orderID: order.orderID,
        totalPrice: order.totalPrice,
        message: "주문이 수정되었습니다.",
      });
    } catch (error) {
      console.error(error);
      await t.rollback();
      return res.status(500).json({ errorMessage: "주문 수정에 실패했습니다." });
    }
  }
}

module.exports = new OrderCustomerRouter().router;
