const express = require("express");
const { Item, Option } = require("../models");
const router = express.Router();
const { Transaction } = require("sequelize");

// 메모리 내 옵션 개체가 있다고 가정
const optionsData = {
  // 샘플 옵션 데이터
  extra_size: {
    price: 2.0,
  },
  shot_addition: {
    price: 1.0,
  },
  // 필요에 따라 다른 옵션 유형 추가
};

class ItemRouter {
  constructor() {
    this.router = express.Router();
    // 상품 추가
    this.router.post("/addProduct", this.addProduct.bind(this));
    // 상품 조회
    this.router.get("/getProduct", this.getProduct.bind(this));
    // 상품 타입별 조회
    this.router.get(
      "/getProductByType/:type",
      this.getProductByType.bind(this)
    );
    // 상품 삭제
    this.router.delete("/deleteProduct/:id", this.deleteProduct.bind(this));
    // 상품 삭제 확인
    this.router.post("/confirmDelete", this.confirmDelete.bind(this));
    // 상품 수정
    this.router.put("/putProduct/:id", this.putProduct.bind(this));
  }

  // 상품 추가
  async addProduct(req, res) {
    const { name, price, type, options } = req.body;

    // 이름, 가격이 없을 경우 ‘{name}을 입력해주세요’라는 메세지 반환
    if (!name || !price) {
      return res.status(400).json({ errorMessage: "{name}을 입력해주세요." });
    }

    try {
      // 알맞은 타입이 아닐 경우 ‘알맞은 타입을 지정해주세요’라는 메세지 반환
      const validTypes = ["coffee", "juice", "food"];
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

      // amount를 0으로 고정 (상품 발주시 amount 증가)
      newProduct.amount = 0;
      await newProduct.save();

      // 옵션을 추가로 받아와서 상품과 연결
      if (options && options.length > 0) {
        for (const option of options) {
          await ProductOption.create({
            name: option.name,
            value: option.value,
            itemId: newProduct.id,
          });
        }
      }

      // 상품이 성공적으로 추가되었으므로 amount를 1로 증가시킴
      newProduct.amount += 1;
      await newProduct.save();

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

  // 상품 리스트 조회
  async getProduct(req, res) {
    try {
      const products = await Item.findAll({
        attributes: ["id", "name", "price", "type", "createdAt", "updatedAt"],
        order: [["createdAt", "DESC"]],
      });

      // 각 제품에 옵션 가져오기 및 첨부
      const productsWithOptions = await Promise.all(
        products.map(async (product) => {
          const options = await ProductOption.findAll({
            where: { itemId: product.id },
            attributes: ["name", "value"],
          });
          return { ...product.toJSON(), options };
        })
      );

      return res.status(200).json({ data: productsWithOptions });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류" });
    }
  }

  // 상품 타입별 조회
  async getProductByType(req, res) {
    const { type } = req.params;

    try {
      const products = await Item.findAll({
        attributes: ["id", "name", "price", "type", "createdAt", "updatedAt"],
        where: { type },
      });
      console.log(products);

      return res.status(200).json({ data: products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "서버 오류" });
    }
  }

  // 상품 삭제
  async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      const product = await Item.findOne({
        where: { id },
      });

      if (!product) {
        return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
      }

      if (product.amount > 0) {
        // 제품의 양이 0보다 크면 확인을 요청
        return res
          .status(200)
          .json({ message: "현재 수량이 남아있습니다. 삭제하시겠습니까?" });
      } else {
        //상품의 양이 0 또는 마이너스인 경우 즉시 상품을 삭제
        await product.destroy();
        return res.status(200).json({ message: "상품 삭제를 완료하였습니다." });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: "상품 삭제에 실패하였습니다." });
    }
  }

  // 2차 API (user의 응답을 처리함)
  async confirmDelete(req, res) {
    const { id, answer } = req.body;

    if (answer === "예" || answer === "네") {
      try {
        const product = await Item.findOne({
          where: { id },
        });

        if (!product) {
          return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
        }

        // 상품 삭제 실행
        await product.destroy();
        return res.status(200).json({ message: "상품 삭제를 완료하였습니다." });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ errorMessage: "상품 삭제에 실패하였습니다." });
      }
    } else {
      // user가 '예'가 아닌 다른 것으로 응답할 경우 제품을 유지함
      return res.status(200).json({ message: "상품 삭제를 취소하였습니다." });
    }
  }

  // 상품 추가 수정
  async putProduct(req, res) {
    const { id } = req.params;
    const { name, price, type, options } = req.body;

    try {
      const product = await Item.findOne({
        where: { id },
      });

      if (!product) {
        return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
      }

      // 빈칸일 경우 ‘이름을 입력해주세요’ 메세지 반환
      if (!name || !price || !type) {
        return res.status(400).json({ errorMessage: "이름을 입력해주세요." });
      }

      // 음수일 경우 ‘알맞은 가격을 입력해주세요’ 에러메시지 반환
      if (price < 0) {
        return res
          .status(400)
          .json({ errorMessage: "알맞은 가격을 입력해주세요." });
      }

      // Calculate the total price with options
      let totalPrice = price;
      if (options && Array.isArray(options)) {
        options.forEach((option) => {
          const optionData = optionsData[option.name];
          if (optionData) {
            totalPrice += optionData.price * option.quantity; // 각 옵션에 수량 필드가 있다고 가정
          }
        });
      }

      // 상품 정보 업데이트
      product.name = name;
      product.price = price;
      product.type = type;
      await product.save();

      // 주문 ID 및 계산된 총 가격 반환
      const orderId = generateOrderId(); // 주문 ID를 생성하는 함수로 대체
      return res.status(200).json({
        message: "상품 수정을 완료하였습니다.",
        orderId,
        totalPrice,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: "상품 수정에 실패하였습니다." });
    }
  }
}

module.exports = new ItemRouter().router;
