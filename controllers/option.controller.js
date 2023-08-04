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

  // 서버가 실행될때 DB에 option 데이터를 요청해 모두 서버 메모리에 캐싱
  async initializeOptionCache() {
    try {
      console.log("옵션 데이터가 캐시되었습니다.");
    } catch (error) {
      console.error("옵션 데이터 캐싱 오류:", error);
    }
  }
}

module.exports = {
  addOption,
};

const optionController = new OptionController();

module.exports = optionController;
