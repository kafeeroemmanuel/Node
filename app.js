//require keyword is the same as import in react

//const routes = require("./routes"); // ./ since the file is stored on the loacal directory i.e internally

//2 methods POST(Sending a request to a server and GET is used to request data from a server.)  // In Nodejs, functions are executed on incoming requests and also on responses

// creating our own server to handle requests, use() is for all http requests
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express(); //calls the express function and now i can use it

//const db = require("./util/database");

const productsController = require("./controllers/error");

//express easily imports and uses templating engines by using the set method
app.set("view engine", "ejs");
app.set("views", "views");

// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log(result);
//     //console.log(result[0] );
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); //using static method on express to get into the public folder and access files like css, images etc

//starting route
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(productsController.get404);

// app.use((req, res) => {
//   res.render("404", { pageTitle: "Error Page" });
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html")); //adding an error page, no '../' since we are already in the project folder
// });

app.listen(3000);
