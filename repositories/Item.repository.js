const { Item } = require("../models");

class ItemRepository {
  // 상품 추가
  findAllItem = async () => {
    const items = await Items.findAll();

    return Items;
  };

  createItem = async (UserId, nickname, password, title, content) => {
    const createItemData = await Items.create({
      name,
      price,
      type,
    });

    return createItemData;
  };
}

module.exports = ItemRepository;
