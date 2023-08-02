const { where } = require("sequelize");
const orderCustomerService = require("../services/order_customer.service");

class OrderCustomerController {
  // 상품 주문 ID 발급
  constructor() {
    this.router = express.Router();
    this.orderCustomerService = OrderCustomerService;

    this.router.post("/orderCustomer", this.orderCustomer.bind(this));
    this.router.post(
      "/putCustomer/:orderCustomerId",
      this.putCustomer.bind(this)
    );
  }

  async orderCustomer(req, res) {
    try {
      const result = await this.orderCustomerService.orderCustomer(req.body);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errorMessage: "주문에 실패했습니다." });
    }
  }

  async putCustomer(req, res) {
    const { orderCustomerId } = req.params;

    try {
      const result = await this.orderCustomerService.putCustomer(
        orderCustomerId
      );
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ errorMessage: "주문 수정에 실패했습니다." });
    }
  }
}

module.exports = {
  orderCustomer,
  putCustomer,
};

const orderCustomerController = new OrderCustomerController();

module.exports = orderCustomerController;
