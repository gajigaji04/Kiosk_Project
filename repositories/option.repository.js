const { OrderOption, OrderCustomer } = require("../models");

class OptionRepository {
  // 상품 주문 옵션 추가
  async addOption({ itemIds, options }) {
    return {
      orderID: "some-order-id",
      totalPrice: 0,
      message: "주문이 성공적으로 완료되었습니다.",
    };
  }
}

module.exports = optionRepository;
