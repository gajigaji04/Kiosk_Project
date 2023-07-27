const { Item } = require("../models");

class ItemRepository {
  // 상품 추가
  createItem = async (name, price, type) => {
    const createItemData = await Item.create({
      name,
      price,
      type,
    });

    return createItemData;
  };

  // 상품 조회
  findAllItem = async () => {
    const items = await Item.findAll();
    return items; // 조회된 상품 목록을 반환하도록 수정
  };
}

module.exports = ItemRepository;
