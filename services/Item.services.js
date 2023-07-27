const ItemRepository = require("../repositories/Item.repository");

class ProductService {
  // 상품 추가
  async addProduct(name, price, type, res) {
    // 비즈니스 로직 및 유효성 검사 코드

    // 지정된 유형의 제품이 이미 있는지 확인
    const validTypes = ["coffee", "juice", "food"]; // 유효한 유형 추가
    if (!validTypes.includes(type)) {
      return res
        .status(400)
        .json({ errorMessage: "알맞은 타입을 지정해주세요." });
    }

    // 상품 생성
    const newProduct = await Item.create({ name, price, type });

    // amount를 0으로 고정 (상품 발주시 amount 증가)
    newProduct.amount = 0;
    await newProduct.save();

    // 상품이 성공적으로 추가되었으므로 amount를 1로 증가시킴
    newProduct.amount += 1;
    await newProduct.save();

    return newProduct;
  }

  // 상품 조회
  // 리스트 조회
  async getProduct() {
    try {
      const products = await Products.findAll({
        attributes: ["name", "price", "type"],
        order: [["createdAt", "DESC"]],
      });
      console.log(products);

      return products;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = ItemService;
