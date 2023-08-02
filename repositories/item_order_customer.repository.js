const { ItemOrderCustomer } = require("../models");

class ItemOrderCustomerRepository {
  // 상품 주문 고객 반환
  async createItemOrderCustomer(data) {
    return ItemOrderCustomer.create(data);
  }
}

module.exports = new ItemOrderCustomerRepository();
