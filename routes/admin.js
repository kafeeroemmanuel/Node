const path = require("path");

const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

//whenever a request reaches this route, the fn is fired and executes, //admin/add-product - GET
router.get("/add-product", adminController.getAddProduct);

router.get("/products", adminController.getProducts);

//Another way of filtering for only get and post requests is by using the CRUD methods for that particular action.
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct); // one needs the id of the pdt & info for editing the pdt

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
