const order_itemRepository = require("../repositories/order_item.repository");

class OrderItemService {
  async addOrder(productId) {
    try {
      const newOrder = await OrderItemRepository.createOrderItem(productId);
      return newOrder;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add order item.");
    }
  }
}

module.exports = new OrderItemService();

module.exports = order_itemService;
