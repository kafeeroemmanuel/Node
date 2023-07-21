const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

// Each cart-item  is a combination of a product and has an id of the cart it belongs to.
const CartItem = sequelize.define("cartItem", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});

module.exports = CartItem;
