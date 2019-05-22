const express = require('express');
const ProductService = require('../../services/products');

const router = express.Router();

const productService = new ProductService();

router.get('/', async (req, res, next) => {
  const { tags } = req.query;

  try {
    // throw new Error('This is an error.');
    const products = await productService.getProducts({ tags });
  
    res.render('products', { products })
  } catch (error) {
    next(error)
  }
});

module.exports = router;
