const { order_item } = require("../models");

class OrderItemRepository {
  async createOrderItem(productId) {
    return await order_item.create({
      productId: productId,
      state: 0,
    });
  }
}

module.exports = new OrderItemRepository();
