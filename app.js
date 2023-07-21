//require keyword is the same as import in react

//const routes = require("./routes"); // ./ since the file is stored on the loacal directory i.e internally

//2 methods POST(Sending a request to a server and GET is used to request data from a server.)  // In Nodejs, functions are executed on incoming requests and also on responses

// creating our own server to handle requests, use() is for all http requests
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express(); //calls the express function and now i can use it
const Product = require("./models/product");
const User = require("./models/user");

const sequelize = require("./util/database");

const productsController = require("./controllers/error");

//express easily imports and uses templating engines by using the set method
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); //using static method on express to get into the public folder and access files like css, images etc

app.use((req, res, next) => {
  // register middleware for upcoming requests
  User.findByPk(1)
    .then((user) => {
      req.user = user; // storing a user in the req, add a new field to our existing request. the user is a sequelized obj with db methods
      next();
    })
    .catch((err) => console.log(err));
});

//starting route
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(productsController.get404);

//creating an association, relating our models
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // A user created this product, (optional)ondeleting user any related pdt will be deleted
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User); // one-direction is enough, this line isn't necessary
Cart.belongsToMany(Product, { through: CartItem }); // tells sequelize where the connections will be stored.
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order); // A user can have mny orders
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  //.sync({ force: true })
  .sync()
  .then((result) => {
    //console.log(result);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Ema", email: "emzpipi@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  }); // sync our models with the db and creates a table for us
