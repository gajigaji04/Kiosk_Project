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
  findItemById = async (id) => {
    return Item.findOne({
      where: { id },
    });
  };

  deleteItem = async (id) => {
    return Item.destroy({
      where: { id },
    });
  };
}

module.exports = new ItemRepository();
