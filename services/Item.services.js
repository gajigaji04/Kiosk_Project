const ItemRepository = require("../repositories/item.repository");
const ItemService = require("../controllers/item.controller");

class ProductService {
  constructor() {
    this.itemRepository = new ItemRepository();
  }

  // 상품 추가
  async addProduct(name, price, type, options) {
    // 유효성 검사 및 오류 처리 코드

    try {
      const newProduct = await this.itemRepository.createItem(
        name,
        price,
        type
      );

      // amount를 0으로 고정 (상품 발주시 amount 증가)
      newProduct.amount = 0;
      await newProduct.save();

      // 옵션을 추가로 받아와서 상품과 연결
      if (options && options.length > 0) {
        for (const option of options) {
          await ProductOption.create({
            name: option.name,
            value: option.value,
            itemId: newProduct.id,
          });
        }
      }

      // 상품이 성공적으로 추가되었으므로 amount를 1로 증가시킴
      newProduct.amount += 1;
      await newProduct.save();

      return newProduct;
    } catch (error) {
      console.error(error);
      throw new Error("서버 오류가 발생하였습니다.");
    }
  }

  // 상품 리스트 조회
  async getProduct() {
    try {
      const products = await this.itemRepository.findAllItems();
      return products;
    } catch (error) {
      console.error(error);
      throw new Error("서버 오류");
    }
  }

  // 상품 타입별 조회
  async getProductByType(type) {
    try {
      const products = await this.itemRepository.findItemsByType(type);
      return products;
    } catch (error) {
      console.error(error);
      throw new Error("서버 오류");
    }
  }

  // 상품 삭제
  async deleteProduct(id) {
    try {
      const product = await this.itemRepository.findItemByIdForDelete(id);

      if (!product) {
        return { message: "상품을 찾을 수 없습니다." };
      }

      if (product.amount > 0) {
        // 제품의 양이 0보다 크면 확인을 요청
        return { message: "현재 수량이 남아있습니다. 삭제하시겠습니까?" };
      } else {
        // 상품의 양이 0 또는 마이너스인 경우 즉시 상품을 삭제
        await this.itemRepository.deleteItem(id);
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
        const product = await this.itemRepository.findItemByIdForDelete(id);

        if (!product) {
          return { message: "상품을 찾을 수 없습니다." };
        }

        // 상품 삭제 실행
        await this.itemRepository.deleteItem(id);
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
      const result = await this.itemRepository.updateItem(
        id,
        name,
        price,
        type
      );

      if (!product) {
        return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
      }

      // 빈칸일 경우 ‘이름을 입력해주세요’ 메세지 반환
      if (!name || !price || !type) {
        return res.status(400).json({ errorMessage: "이름을 입력해주세요." });
      }

      // 음수일 경우 ‘알맞은 가격을 입력해주세요’ 에러메시지 반환
      if (price < 0) {
        return res
          .status(400)
          .json({ errorMessage: "알맞은 가격을 입력해주세요." });
      }

      // 옵션을 사용하여 총 가격 계산
      let totalPrice = price;
      if (options && Array.isArray(options)) {
        options.forEach((option) => {
          if (option.type === "extra_size") {
            totalPrice += option.price;
          } else if (option.type === "shot_addition") {
            totalPrice += option.price;
          }
          // 다른 유형의 옵션에 대한 조건 추가
        });
      }

      return result;
    } catch (error) {
      console.error(error);
      return { errorMessage: "상품 수정에 실패하였습니다." };
    }
  }
}

module.exports = itemService;
