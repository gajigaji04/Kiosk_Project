const ItemRepository = require("../repositories/Item.repository");

// 상품 추가
class ProductService {
  async addProduct(name, price, type) {
    // Business logic and validation code...

    // Check if the product with the specified type already exists
    const validTypes = ["coffee", "juice", "food"]; // 유효한 유형 추가
    if (!validTypes.includes(type)) {
      return res
        .status(400)
        .json({ errorMessage: "알맞은 타입을 지정해주세요." });
    }

    // Create the new product
    const newProduct = await Item.create({ name, price, type });
    return newProduct;
  }
}

module.exports = ItemService;
