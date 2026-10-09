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

  // 모든 상품 조회
  findAllItems = async () => {
    const items = await Item.findAll();
    return items;
  };

  // 타입별 상품 조회
  findItemsByType = async (type) => {
    const items = await Item.findAll({
      where: {
        type: type,
      },
    });
    return items;
  };

  // 상품 삭제
  findItemByIdForDelete = async (id) => {
    return Item.findOne({
      where: { id },
    });
  };

  deleteItem = async (id) => {
    return Item.destroy({
      where: { id },
    });
  };

  // 상품 수정
  findItemByIdForUpdate = async (id) => {
    return Item.findOne({
      where: { id },
    });
  };

  updateItem = async (id, name, price, type) => {
    const item = await Item.findOne({
      where: { id },
    });

    // 상품 정보 업데이트
    item.name = name;
    item.price = price;
    item.type = type;
    await item.save();

    return { message: "상품 수정을 완료하였습니다." };
  };
}

module.exports = itemRepository;
