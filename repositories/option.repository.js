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

  // 서버가 실행될때 DB에 option 데이터를 요청해 모두 서버 메모리에 캐싱
  async initializeOptionCache() {
    return {
      getOptionsFromCache() {
        return cachedOptions;
      },
    };
  }
}

module.exports = optionRepository;
