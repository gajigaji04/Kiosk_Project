const orderCustomerRepository = require("../repositories/order_customer.repository");
const orderCustomerService = require("../controllers/order_customer.controller");

class orderCustomerService {
  // 상품 주문 ID 발급
  async getCustomerOrders(customerId) {
    return await OrderCustomer.findAll({
      where: { customerId: customerId },
    });
  }
}

module.exports = orderCustomerService;
