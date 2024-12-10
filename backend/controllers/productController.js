const Product = require('../models/Product');
const express = require('express');


// Controller to search products 
const searchProducts = async (req, res) => {
    try{
        const searchTerm = req.query.q;
        if (!searchTerm) {
            return res.status(400).json({ message: 'Search term is required' });
        }

        const products = await Product.find({ 
            name: { $regex: searchTerm, $options: 'i' },
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error searching for products', error });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    console.log(`Fetching products for category: ${category}`); // Add this to log the category
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};


// Get a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  searchProducts,
};
