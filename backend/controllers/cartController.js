const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
        if (!cart || cart.products.length === 0) {
            return res.status(200).json({ message: 'Cart is empty', cart: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};

// Add product to cart and calculate total
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    if (quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be greater than zero.' });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found.' });

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, products: [{ productId, quantity }] });
        } else {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }
        const updatedCart = await cart.save();
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.products = cart.products.filter(p => p.productId.toString() !== req.params.id);
        const updatedCart = await cart.save();
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const userId = req.user.id; 
        await Cart.deleteMany({ userId }); 

        res.status(200).json({ message: 'Cart cleared successfully', cart: [] });
    } catch (error) {
        res.status(500).json({ message: 'Failed to clear cart', error: error.message });
    }
};


module.exports = { getCart, addToCart, removeFromCart, clearCart };