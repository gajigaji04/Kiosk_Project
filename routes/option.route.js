const express = require("express");
const { OrderOption, OrderCustomer, sequelize } = require("../models");
const router = express.Router();
const { Transaction } = require("sequelize");

const { Option } = require("../models");

let cachedOptions = [];

class OptionRouter {
  constructor() {
    this.router = express.Router();
    // 상품 옵션 추가
    this.router.post("/addOption", this.addOption.bind(this));
    this.initializeOptionCache(); // Call the function to initialize option cache when the server starts
  }

  generateOrderID() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000);
    const orderID = `${timestamp}-${randomNum}`;
    return orderID;
  }

  async addOption(req, res) {
    // 주문 처리 로직
    const orderID = this.generateOrderID();
    console.log("생성된 주문 ID:", orderID);

    const { itemIds, options } = req.body; // 요청 본문에 옵션 포함

    const t = await sequelize.transaction();

    try {
      let totalPrice = 0;

      // 제공된 옵션을 사용하여 주문 작성
      const orderDetails = await OrderCustomer.create(
        {
          orderID,
          totalPrice,
          state: false,
        },
        { transaction: t }
      );

      // 주문과 연결된 옵션 생성
      if (options && options.length > 0) {
        for (const option of options) {
          await OrderOption.create(
            {
              name: option.name,
              value: option.value,
              orderCustomerId: orderDetails.id,
            },
            { transaction: t }
          );
        }
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

  // 서버가 실행될때 DB에 option 데이터를 요청해 모두 서버 메모리에 캐싱
  async initializeOptionCache() {
    try {
      // 데이터베이스에서 모든 옵션 데이터 검색
      const options = await Option.findAll();

      // 메모리의 옵션 캐시
      cachedOptions = options;

      console.log("옵션 데이터가 캐시되었습니다.");
    } catch (error) {
      console.error("옵션 데이터 캐싱 오류:", error);
    }
  }

  getOptionsFromCache() {
    return cachedOptions;
  }
}

module.exports = new OptionRouter().router;
