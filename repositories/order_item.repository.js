const { order_item } = require("../models");

class OrderItemRepository {
  // 상품 발주
  async createOrderItem(productId) {
    return await order_item.create({
      productId: productId,
      state: 0,
    });
  }

  // 상품 발주 수정
  async createOrderItem(productId) {
    return await order_item.create({
      item_id: productId,
      state: "0",
      amount: "1",
    });
  }
}

module.exports = order_itemRepository;
