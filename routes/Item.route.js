const express = require("express");
const { Item } = require("../models");
const router = express.Router();
// const jwt = require("jsonwebtoken");
// const authMiddleware = require("../middlewares/auth-middleware");
const { Transaction } = require("sequelize");

class ProductRouter {
  constructor() {
    this.router = express.Router();
    // Bind the route handlers
    this.router.post("/addProduct", this.addProduct.bind(this));
  }

  async addProduct(req, res) {
    const { name, price, type } = req.body;

    // 요청 본문에서 이름과 가격을 제공하는지 확인
    if (!name || !price) {
      return res.status(400).json({ errorMessage: "{name}을 입력해주세요." });
    }

    try {
      // 지정된 유형의 제품이 이미 있는지 확인
      const validTypes = ["coffee", "juice", "food"]; // 유효한 유형 추가
      if (!validTypes.includes(type)) {
        return res
          .status(400)
          .json({ errorMessage: "알맞은 타입을 지정해주세요." });
      }

      // 상품 생성
      const newProduct = await Item.create({
        name,
        price,
        type,
      });

      return res.status(201).json({
        message: "상품이 성공적으로 추가되었습니다.",
        product: newProduct,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: "서버 오류가 발생하였습니다." });
    }
  }
}

module.exports = new ProductRouter().router;
