const { where } = require("sequelize");
const itemOrderCustomerService = require("../services/item_order_customer.service");

class ItemOrderCustomerController {
  constructor() {
    this.itemOrderCustomerService = new itemOrderCustomerService();
  }

  // 상품 주문 고객 반환
  async addOrderForCustomer(requestBody) {
    const orderID = generateOrderID();
    console.log("생성된 주문 ID:", orderID);

    const { itemIds } = requestBody;

    try {
      const orderedItems = await Item.findAll({
        where: { id: itemIds },
      });

      let totalPrice = 0;
      for (const item of orderedItems) {
        totalPrice += item.price;

        // item_order_customer 테이블에 항목 생성
        await ItemOrderCustomer.create({
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
}

const itemOrderCustomerController = new ItemOrderCustomerController();

module.exports = itemOrderCustomerController;
