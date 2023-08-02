const { order_customer } = require("../models");

class ItemRepository {
  // 상품 주문 ID 발급
  async findAllItemsByIds(itemIds, transaction) {
    return Item.findAll({
      where: { id: itemIds },
      transaction,
    });
  }
}

module.exports = order_customerRepository;
