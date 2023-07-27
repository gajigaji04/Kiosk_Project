const { where } = require("sequelize");
const { item } = require("../models");
const itemService = require("../services/Item.service");

const productService = new ProductService();

// 상품 추가
async function addProduct(req, res) {
  const { name, price, type } = req.body;

  // V유효성 검사 및 오류 처리 코드

  try {
    const newProduct = await productService.addProduct(name, price, type);
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

module.exports = {
  addProduct,
};

// 상품 조회
router.get("/api/getProduct", async (req, res) => {
  try {
    const products = await Products.findAll({
      attributes: ["name", "price", "type"],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ data: products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = {
  getProduct,
};

module.exports = itemController;
