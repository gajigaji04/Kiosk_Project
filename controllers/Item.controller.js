const { where } = require("sequelize");
const itemService = require("../services/item.service");

class ItemController {
  constructor() {
    this.itemService = new itemService();
  }

  // 상품 추가
  async addProduct(req, res) {
    const { name, price, type } = req.body;

    // 유효성 검사 및 오류 처리 코드

    try {
      const newProduct = await this.itemService.addProduct(name, price, type);
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

  // 상품 삭제
  async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      const result = await this.itemService.deleteProduct(id);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: "상품 삭제에 실패하였습니다." });
    }
  }

  // 상품 삭제 확인
  async confirmDelete(req, res) {
    const { id, answer } = req.body;

    if (answer === "예") {
      try {
        const result = await this.itemService.confirmDelete(id);
        return res.status(200).json(result);
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ errorMessage: "상품 삭제에 실패하였습니다." });
      }
    } else {
      return res.status(200).json({ message: "상품 삭제를 취소하였습니다." });
    }
  }

  // 상품 수정
  async putProduct(req, res) {
    const { id } = req.params;

    try {
      const result = await this.itemService.putProduct(id);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: "상품 수정에 실패하였습니다." });
    }
  }
}

const itemController = new ItemController();

module.exports = itemController;
