const express = require("express");
const connectDB = require("./config/connectDB");

const user = require("./routes/user");
const product = require("./routes/product");
const cart = require("./routes/cart");
const order = require("./routes/order");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", user);
app.use("/product", product);
app.use("/cart", cart);
app.use("/order", order);
connectDB();

app.listen(5000, (error) =>
  error
    ? console.error(error)
    : console.log(`server is runing in the port 5000`)
);
