const express = require("express");
const { Item } = require("../models");

// class 메소드
class ItemRouter {
  constructor() {
    this.router = express.Router();
    // 경로 핸들러 바인딩
    this.router.post("/addProduct", this.addProduct.bind(this));
    this.router.get("/getProduct", this.getProduct.bind(this));
  }

  async addProduct(req, res) {
    const { name, price, type } = req.body;

    // 이름, 가격이 없을 경우 ‘{name}을 입력해주세요’라는 메세지 반환
    // 요청 본문에서 이름과 가격을 제공하는지 확인
    if (!name || !price) {
      return res.status(400).json({ errorMessage: "{name}을 입력해주세요." });
    }

    try {
      // 알맞은 타입이 아닐 경우 ‘알맞은 타입을 지정해주세요’라는 메세지 반환
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
        amount: 1, // Set the initial amount to 1
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

  // 상품 조회
  // 리스트 조회
  async getProduct(req, res) {
    try {
      const products = await Item.findAll({
        attributes: ["id", "name", "price", "type", "createdAt", "updatedAt"],
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({ data: products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류" });
    }
  }
}

// Create an instance of ItemRouter
// Remove ".router" from the export
module.exports = new ItemRouter();
