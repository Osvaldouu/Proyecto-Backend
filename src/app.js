import express  from "express"
import ProductManager from "./ProductManager"
import Product from "./Product"


const PORT = 3001

const app = express()

app.get("/home", (req, res) => {
    res.status(200).send("Petizo Man")
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto ${PORT}`);
})