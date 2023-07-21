const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

// a cart belongs to one user but might have multuple pdts
const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
