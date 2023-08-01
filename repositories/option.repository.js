const { OrderOption, OrderCustomer } = require("../models");

class OptionRepository {
  async addOption({ itemIds, options }) {

    return { orderID: "some-order-id", totalPrice: 0, message: "주문이 성공적으로 완료되었습니다." };
  }
}

module.exports = new OptionRepository();
