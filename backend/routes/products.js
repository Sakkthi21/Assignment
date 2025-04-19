const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const mockData = require('../mockData/data');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
    try {
        res.json(mockData.products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = mockData.products.find(p => p.product_id === parseInt(id));
        
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/products
// @desc    Create a product
// @access  Private/Admin
router.post('/', [auth, admin], async (req, res) => {
    const { name, price, description, image_url } = req.body;

    try {
        const newProduct = {
            product_id: mockData.products.length + 1,
            name,
            price,
            description,
            image_url
        };

        mockData.products.push(newProduct);
        res.json(newProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', [auth, admin], async (req, res) => {
    const { name, price, description, image_url } = req.body;
    const { id } = req.params;

    try {
        const productIndex = mockData.products.findIndex(p => p.product_id === parseInt(id));
        
        if (productIndex === -1) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        mockData.products[productIndex] = {
            ...mockData.products[productIndex],
            name,
            price,
            description,
            image_url
        };

        res.json(mockData.products[productIndex]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const { id } = req.params;
        const productIndex = mockData.products.findIndex(p => p.product_id === parseInt(id));
        
        if (productIndex === -1) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        mockData.products.splice(productIndex, 1);
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;