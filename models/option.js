"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    static associate(models) {
      // option : item (1:N)
      Option.hasMany(models.Item, { foreignKey: "option_Id" });
    }
  }

  Option.init(
    {
      extrs_price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shot_price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hot: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "option",
    }
  );

  return Option;
};

module.exports = option;
