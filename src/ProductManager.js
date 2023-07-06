import fs from "fs";
const Product = require("./Product.js");

class ProductManager {
  #products = [];
  #idNumber = 0;
  #filePath = "products.json";

  constructor() {
    this._loadProducts();
  }

  _addProduct(data) {
    if (this._validateCode(data[4])) {
      console.error("Ingrese un código único");
      return;
    }

    if (this._validateObject(data)) {
      console.error("Complete todos los campos");
      return;
    }

    this._generateID();
    const product = new Product(this.#idNumber, ...data);
    this.#products.push(product);
    console.log(product);

    this._saveProducts();
  }
  _deleteProduct(id) {
    const productIndex = this.#products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      console.error("Product not found");
      return;
    }

    const deletedProduct = this.#products.splice(productIndex, 1)[0];
    console.log("Product deleted:", deletedProduct);

    this._saveProducts();
  }
  _getProducts() {
    console.table(this.#products);
    return this.#products;
  }

  _getProductById(id) {
    const product = this.#products.find((p) => p.id === id);
    if (!product) {
      console.error("Not found");
      return;
    }
    console.log(product);
    return product;
  }

  _generateID() {
    if (this.#idNumber === 0) {
      this.#idNumber = 1;
      return;
    }
    this.#idNumber++;
  }

  _validateCode(code) {
    if (this.#products.find((p) => p.code === code)) {
      return true;
    }
  }

  _validateObject(data) {
    if (data.length !== 6) return true;
    data.map((el) => {
      if (el === "" || el === undefined || el === null) return true;
    });
  }

  _loadProducts() {
    try {
      const data = fs.readFileSync(this.#filePath, "utf8");
      this.#products = JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  }

  _saveProducts() {
    try {
      const data = JSON.stringify(this.#products);
      fs.writeFileSync(this.#filePath, data, "utf8");
      console.log("Productos guardados correctamente.");
    } catch (error) {
      console.error("Error al guardar los productos:", error);
    }
  }
}

const test = new ProductManager();

test._addProduct(["remeras", "negras", 110, "http://", "boca"]);
test._getProducts();
test._getProductById(1);
test._getProductById(5);


module.exports = ProductManager