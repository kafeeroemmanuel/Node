//require keyword is the same as import in react

//const routes = require("./routes"); // ./ since the file is stored on the loacal directory i.e internally

//2 methods POST(Sending a request to a server and GET is used to request data from a server.)  // In Nodejs, functions are executed on incoming requests and also on responses

// creating our own server to handle requests, use() is for all http requests
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express(); //calls the express function and now i can use it
//const Product = require("./models/product");
const User = require("./models/user");

const productsController = require("./controllers/error");

//express easily imports and uses templating engines by using the set method
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); //using static method on express to get into the public folder and access files like css, images etc

app.use((req, res, next) => {
  //register middleware for upcoming requests
  User.findById("64d0a91bb571eec3ea1f4b1d")
    .then((user) => {
      req.user = user; // storing a user in the req, add a new field to our existing request. the user is a mongoose model with mongoose methods
      next();
    })
    .catch((err) => console.log(err));
});

//starting route
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(productsController.get404);

//mongoose connects to the db, no need of util fns to do so.
mongoose
  .connect(
    "mongodb+srv://emzpipi:JW2t6jvLnXcNCbaT@cluster0.ragolna.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Ema",
          email: "emzpipi@gmail.com",
          cart: { items: [] },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
