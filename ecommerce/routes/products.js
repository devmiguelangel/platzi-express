const express = require('express');
const router = express.Router();

const products = [
  {
    name: 'Red Shoes',
    price: 75,
    image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80'
  },
  {
    name: 'Black bike',
    price: 300,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
  }
];

router.get('/', (req, res) => {
  res.render('products', { products })
});

module.exports = router;
