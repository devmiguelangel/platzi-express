const express = require("express");

const { config } = require("../../config");
const cacheResponse = require("../../utils/cacheResponse");
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require("../../utils/time");
const ProductService = require("../../services/products");

const router = express.Router();

const productService = new ProductService();

router.get("/", async (req, res, next) => {
  cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

  const { tags } = req.query;

  try {
    // throw new Error('This is an error.');
    const products = await productService.getProducts({ tags });

    res.render("products", { products, dev: config.dev });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
