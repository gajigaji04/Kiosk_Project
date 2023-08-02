const OptionRepository = require("../repositories/option.repository");
const OptionService = require("../controllers/option.controller");

class OptionService {
  generateOrderID() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000);
    const orderID = `${timestamp}-${randomNum}`;
    return orderID;
  }

  // 상품 주문 옵션 추가
  async addOption(req, res) {
    const orderID = this.generateOrderID();
    console.log("생성된 주문 ID:", orderID);

    const { itemIds, options, totalPrice } = req.body;

    const t = await sequelize.transaction();

    try {
      // 제공된 옵션을 사용하여 주문 작성
      const orderDetails = await OrderCustomer.create(
        {
          orderID,
          totalPrice,
          state: false,
        },
        { transaction: t }
      );

      // 주문과 연결된 옵션 생성
      if (options && options.length > 0) {
        for (const option of options) {
          await OrderOption.create(
            {
              name: option.name,
              value: option.value,
              orderCustomerId: orderDetails.id,
            },
            { transaction: t }
          );
        }
      }

      await t.commit();

      return res.status(200).json({
        orderID,
        totalPrice,
        message: "주문이 성공적으로 완료되었습니다.",
      });
    } catch (error) {
      console.error(error);
      await t.rollback();
      return res.status(500).json({ errorMessage: "주문에 실패했습니다." });
    }
  }
}

module.exports = OptionService;
