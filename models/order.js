const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

// a Order(in-btn table btn user and many pdts)
const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // cd have an address OF THE USER
});

module.exports = Order;
