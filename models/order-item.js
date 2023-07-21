const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../util/database");

// Each Order-item  is a combination of a product and has an id of the Order it belongs to.
const OrderItem = sequelize.define("orderItem", {
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

module.exports = OrderItem;
