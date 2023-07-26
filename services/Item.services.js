const ItemRepository = require("../repositories/Item.repository");

// 상품 추가
class ProductService {
  async addProduct(name, price, type) {
    // Business logic and validation code...

    // Check if the product with the specified type already exists
    const existingProduct = await Item.findOne({ where: { type } });
    if (existingProduct) {
      throw new Error("이미 해당 타입의 상품이 존재합니다.");
    }

    // Create the new product
    const newProduct = await Item.create({ name, price, type });
    return newProduct;
  }
}

module.exports = ItemService;
