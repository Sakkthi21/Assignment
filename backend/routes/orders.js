const express = require('express');
const router = express.Router();
const mockData = require('../mockData/data');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET api/orders
// @desc    Get all orders (admin) or user's orders
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        let orders = mockData.orders;
        if (!req.user.is_admin) {
            orders = orders.filter(order => order.user_id === req.user.id);
        }
        // Add user details for admin view
        if (req.user.is_admin) {
            orders = orders.map(order => {
                const user = mockData.users.find(u => u.user_id === order.user_id);
                return { ...order, username: user.username, email: user.email };
            });
        }
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const order = mockData.orders.find(o => o.order_id === parseInt(id));

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Check if user is admin or if the order belongs to the user
        if (!req.user.is_admin && order.user_id !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Add product names to order items
        const orderWithProducts = {
            ...order,
            order_items: order.order_items.map(item => {
                const product = mockData.products.find(p => p.product_id === item.product_id);
                return { ...item, product_name: product.name };
            })
        };

        res.json(orderWithProducts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/orders
// @desc    Create an order
// @access  Private
router.post('/', auth, async (req, res) => {
    const { delivery_address, contact_name, contact_number, items } = req.body;

    try {
        // Create new order
        const newOrder = {
            order_id: mockData.orders.length + 1,
            user_id: req.user.id,
            status: 'Pending',
            delivery_address,
            contact_name,
            contact_number,
            created_at: new Date().toISOString(),
            order_items: items.map((item, index) => ({
                order_item_id: (mockData.orders.reduce((acc, order) => 
                    acc + order.order_items.length, 0)) + index + 1,
                order_id: mockData.orders.length + 1,
                product_id: item.product_id,
                quantity: item.quantity,
                price_per_unit: item.price
            }))
        };

        // Add to mock data
        mockData.orders.push(newOrder);

        res.json(newOrder);
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.put('/:id/status', [auth, admin], async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        const orderIndex = mockData.orders.findIndex(o => o.order_id === parseInt(id));
        
        if (orderIndex === -1) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Update order status
        mockData.orders[orderIndex].status = status;

        res.json(mockData.orders[orderIndex]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;