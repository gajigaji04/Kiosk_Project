const itemOrderCustomerRepository = require("../repositories/item_order_customer.repository");
const itemOrderCustomerService = require("../controllers/item_order_customer.controller");

// 상품 주문 고객 반환
async function addOrderForCustomer(requestData) {
  const orderID = generateOrderID();
  console.log("생성된 주문 ID:", orderID);

  const { itemIds } = requestData;

  try {
    const orderedItems = await itemRepository.getItemsByIds(itemIds);

    let totalPrice = 0;
    for (const item of orderedItems) {
      totalPrice += item.price;

      // item_order_customer 테이블에 항목 생성
      await itemOrderCustomerRepository.createItemOrderCustomer({
        item_id: item.id,
        order_customer_id: orderID,
        amount: 1,
      });
    }

    return {
      orderID,
      totalPrice,
      message: "주문이 성공적으로 완료되었습니다.",
    };
  } catch (error) {
    throw new Error("주문에 실패했습니다.");
  }
}

module.exports = {
  addOrderForCustomer,
};

module.exports = itemOrderCustomerService;
