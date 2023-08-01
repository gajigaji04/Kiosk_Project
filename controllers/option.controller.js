const OptionService = require("../services/option.service");
const optionService = new OptionService();

// 상품 주문 옵션 추가
async function addOption(req, res) {
    try {
      const result = await optionService.addOption(req.body);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errorMessage: "주문에 실패했습니다." });
    }
  }

// 상품 주문 옵션 수정
async function putOption(req, res) {
   try{
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

module.exports = {
  addOption,
  putOption,
};

module.exports = optionController;module.exports = new OptionController();