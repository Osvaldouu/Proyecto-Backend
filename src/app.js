import express  from "express"
import ProductManager from "./ProductManager"
import Product from "./Product"
//const products = require("products.json")

const PORT = 3001

const app = express()

app.get("/products", (req, res) => {
    res.status(200).json(products)
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto ${PORT}`);
})