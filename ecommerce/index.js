const express = require("express");
const path = require("path");
const productsRouter = require("./routes/products");

const app = express();

const port = 3000;

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res, next) => res.send({ hello: "World!!!" }));

app.use("/products", productsRouter);

const server = app.listen(port, () => {
  console.log(`Listening: http://127.0.0.1:${server.address().port}`);
});
