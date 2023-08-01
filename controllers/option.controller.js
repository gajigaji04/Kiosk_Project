const OptionService = require("../services/option.service");
const optionService = new OptionService();

async function addOption(req, res) {
  try {
    await optionService.addOption(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: "주문에 실패했습니다." });
  }
}

module.exports = {
  addOption,
};
