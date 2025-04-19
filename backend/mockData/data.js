const mockData = {
    users: [
        {
            user_id: 1,
            username: 'admin',
            password: '$2b$10$YourHashedPasswordHere',  // admin123
            email: 'admin@example.com',
            is_admin: true,
            name: 'Admin User',
            contact_number: '1234567890',
            address: '123 Admin Street'
        },
        {
            user_id: 2,
            username: 'user1',
            password: '$2b$10$YourHashedPasswordHere',  // user123
            email: 'user1@example.com',
            is_admin: false,
            name: 'Regular User',
            contact_number: '9876543210',
            address: '456 User Avenue'
        }
    ],
    products: [
        {
            product_id: 1,
            name: 'Fresh Tomatoes',
            price: 2.99,
            description: 'Ripe and juicy tomatoes, perfect for salads',
            image_url: '/images/tomatoes.svg'
        },
        {
            product_id: 2,
            name: 'Organic Potatoes',
            price: 3.99,
            description: 'Farm-fresh organic potatoes',
            image_url: '/images/potatoes.svg'
        },
        {
            product_id: 3,
            name: 'Green Apples',
            price: 4.99,
            description: 'Crisp and sweet green apples',
            image_url: '/images/apples.svg'
        },
        {
            product_id: 4,
            name: 'Fresh Carrots',
            price: 1.99,
            description: 'Crunchy and nutritious carrots',
            image_url: '/images/carrots.svg'
        }
    ],
    orders: [
        {
            order_id: 1,
            user_id: 2,
            status: 'Delivered',
            delivery_address: '456 User Avenue',
            contact_name: 'Regular User',
            contact_number: '9876543210',
            created_at: '2024-01-15T10:00:00Z',
            order_items: [
                {
                    order_item_id: 1,
                    order_id: 1,
                    product_id: 1,
                    quantity: 5,
                    price_per_unit: 2.99
                },
                {
                    order_item_id: 2,
                    order_id: 1,
                    product_id: 2,
                    quantity: 10,
                    price_per_unit: 3.99
                }
            ]
        }
    ]
};

module.exports = mockData;