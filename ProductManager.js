const Product = require("./Product.js");

class ProductManager {
  #products = [];
  #idNumber = 0;

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
}

const test = new ProductManager();

test._addProduct(["zapatillas", "rojas", 150, "http://", "123abc", 20]);
test._addProduct(["zapatillas", "negras", 130, "http://", "456abc", 20]);
test._addProduct(["zapatillas", "azules", 110, "http://", "789abc", 30]);
test._addProduct(["zapatillas", "azules", 110, "http://", "123abc", 20]);
test._addProduct(["zapatillas", , 110, "http://", "phtabc"]); 
test._addProduct(["zapatillas", "azules", 110, "", "kyhabc"]);
test._getProducts();
test._getProductById(1);
test._getProductById(5);