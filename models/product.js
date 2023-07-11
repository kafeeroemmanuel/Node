//this represents a single entity or data that we represent/use

const fs = require("fs");
const path = require("path");

const Cart = require("./cart");

const rootDir = require("../util/path");
const p = path.join(rootDir, "data", "products.json"); //data is the file in the root directory

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    //always use arrow fns to point to this.object
    getProductsFromFile((products) => {
      if (this.id) {
        // if we have a new id save sh'd update an existing one
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        //save it back to the file, using the same path
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  //call fn directly on the created obj and not on an instance of it by using static
  static fetchAll(cb) {
    //fetchAll is an async fn that should return data hence an err, fix it
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    // in a db, no need to read all pdts, just query i pdt by id
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
