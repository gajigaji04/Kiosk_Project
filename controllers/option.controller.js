const { where } = require("sequelize");
const optionService = require("../services/option.service");

class OptionController {
  // 상품 주문 옵션 추가
  async addOption(req, res) {
    try {
      const result = await optionService.addOption(req.body);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errorMessage: "주문에 실패했습니다." });
    }
  }
}

module.exports = {
  addOption,
};

const optionController = new OptionController();

module.exports = optionController;
