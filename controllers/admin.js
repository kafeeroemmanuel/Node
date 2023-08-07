const Product = require("../models/product"); //Import model obj, begins with caps
// const mongodb = require("mongodb");

//const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  //console.log(req.body); // by default req. doesn't parse incoming requests that's why we get undefined. A 3rd party lib has to be used here(body-parser)
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    userId: req.user, // returns the entire object bt mongoose conveniently pulls out the id
  }); // left side is the key defined in schema & right side is the req received from user
  product
    .save()
    .then((result) => {
      console.log("created product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then((product) => {
      //Js object fetched from db
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDesc;
      return product.save();
    })
    .then((result) => {
      console.log("updated product");
      res.redirect("/admin/products");
      //  updates product and succesfully saves into the db
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    //.select("price title -_id") // includes and excludes data fetched from the db
    //.populate("userId") brings up all other fields
    .then((products) => {
      console.log(products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "All Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log("Deleted successfully");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
  // Product.findByPk(prodId)
  //   .then((product) => {
  //     return product.destroy();
  //   })
  //   .then((result) => {
  //     console.log("destroyed product");
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => console.log(err));
};
