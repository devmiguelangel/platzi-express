const express = require('express');
const ProductService = require('../../services/products');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { tags } = req.query;

  try {
    const products = await ProductService.getProducts({ tags });
  
    res.render('products', { products })
  } catch (error) {
    next(error)
  }
});

module.exports = router;
