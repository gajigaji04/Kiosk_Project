const { where } = require("sequelize");
const itemOrderCustomerService = require("../services/item_order_customer.service");

module.exports = {
  async addOrderCustomer(req, res) {
    try {
      // 주문 로직을 처리하려면 서비스에서 addOrder 함수를 호출
      const result = await item_order_customerService.addOrder(req.body);

      return res.status(200).json({
        orderID: result.orderID,
        totalPrice: result.totalPrice,
        message: "주문이 성공적으로 완료되었습니다.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errorMessage: "주문에 실패했습니다." });
    }
  },
};

module.exports = {
  addOrderCustomer,
};

module.exports = itemOrderCustomerController;
