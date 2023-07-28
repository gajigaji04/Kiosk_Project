const ItemRepository = require("../../repositories/Item.repository");

class ProductService {
  // 상품 추가
  async addProduct(name, price, type, res) {
    // 비즈니스 로직 및 유효성 검사 코드

    // 지정된 유형의 제품이 이미 있는지 확인
    const validTypes = ["coffee", "juice", "food"]; // 유효한 유형 추가
    if (!validTypes.includes(type)) {
      return res
        .status(400)
        .json({ errorMessage: "알맞은 타입을 지정해주세요." });
    }

    // 상품 생성
    const newProduct = await Item.create({ name, price, type });

    // amount를 0으로 고정 (상품 발주시 amount 증가)
    newProduct.amount = 0;
    await newProduct.save();

    // 상품이 성공적으로 추가되었으므로 amount를 1로 증가시킴
    newProduct.amount += 1;
    await newProduct.save();

    return newProduct;
  }

  // 상품 리스트 조회
  async getProduct() {
    try {
      const products = await Item.findAll({
        attributes: ["name", "price", "type"],
        order: [["createdAt", "DESC"]],
      });

      return products;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // 상품 조회(타입별)
  async getProductByType(type) {
    try {
      const products = await Item.findAll({
        attributes: ["name", "price", "type"],
        where: { type },
      });

      return products;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // 상품 삭제
  async deleteProduct(id) {
    try {
      const product = await Item.findOne({
        where: { id },
      });

      if (!product) {
        return { message: "상품을 찾을 수 없습니다." };
      }

      if (product.amount > 0) {
        // 제품의 양이 0보다 크면 확인을 요청
        return { message: "현재 수량이 남아있습니다. 삭제하시겠습니까?" };
      } else {
        // 상품의 양이 0 또는 마이너스인 경우 즉시 상품을 삭제
        await product.destroy();
        return { message: "상품 삭제를 완료하였습니다." };
      }
    } catch (error) {
      console.error(error);
      return { errorMessage: "상품 삭제에 실패하였습니다." };
    }
  }

  // 상품 삭제 확인
  async confirmDelete(id, answer) {
    if (answer === "예") {
      try {
        const product = await Item.findOne({
          where: { id },
        });

        if (!product) {
          return { message: "상품을 찾을 수 없습니다." };
        }

        // 상품 삭제 실행
        await product.destroy();
        return { message: "상품 삭제를 완료하였습니다." };
      } catch (error) {
        console.error(error);
        return { errorMessage: "상품 삭제에 실패하였습니다." };
      }
    } else {
      // user가 '예'가 아닌 다른 것으로 응답할 경우 제품을 유지함
      return { message: "상품 삭제를 취소하였습니다." };
    }
  }

  // 상품 수정
  async putProduct(id, name, price, type) {
    try {
      const product = await Item.findOne({
        where: { id },
      });

      if (!product) {
        return { message: "상품을 찾을 수 없습니다." };
      }

      // 빈칸일 경우 ‘이름을 입력해주세요’ 메세지 반환
      if (!name || !price || !type) {
        return { errorMessage: "이름을 입력해주세요." };
      }

      // 음수일 경우 ‘알맞은 가격을 입력해주세요’ 에러메시지 반환
      if (price < 0) {
        return { errorMessage: "알맞은 가격을 입력해주세요." };
      }

      // 상품 정보 업데이트
      product.name = name;
      product.price = price;
      product.type = type;
      await product.save();

      return { message: "상품 수정을 완료하였습니다." };
    } catch (error) {
      console.error(error);
      return { errorMessage: "상품 수정에 실패하였습니다." };
    }
  }
}

module.exports = ItemService;
