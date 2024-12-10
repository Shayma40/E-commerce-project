const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductsByCategory,
    getProductById,
    searchProducts,
} = require('../controllers/productController');
const Product = require('../models/Product');


router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

router.post('/products', async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).send(product);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Update a product by ID
  router.put('/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) return res.status(404).send();
      res.send(product);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Delete a product by ID
  router.delete('/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).send();
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  });



module.exports = router;
