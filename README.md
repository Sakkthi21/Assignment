# Bulk Vegetable/Fruit Ordering Platform

## Project Overview
A full-stack web application for ordering vegetables and fruits in bulk, featuring user authentication, product management, and order tracking.

## Project Working

### User Features

1. **Authentication**
   - Register with username, email, password, name, contact number, and address
   - Login using email and password
   - JWT-based authentication with 5-day token expiry

2. **Product Browsing**
   - View all available products with details (name, price, description, image)
   - Public access to product catalog
   - Detailed view of individual products

3. **Order Management**
   - Place new orders with delivery details
   - View order history
   - Track order status (Pending, Delivered, etc.)
   - View detailed order information including items and quantities

### Admin Features

1. **Product Management**
   - Add new products with details
   - Update existing product information
   - Remove products from catalog
   - View all products

2. **Order Management**
   - View all customer orders
   - Update order status
   - Access customer details for each order

### Technical Implementation

1. **Backend API Endpoints**
   - Authentication:
     - POST /api/auth/register - User registration
     - POST /api/auth/login - User login
     - GET /api/auth/user - Get user profile
   
   - Products:
     - GET /api/products - List all products
     - GET /api/products/:id - Get product details
     - POST /api/products - Add new product (Admin)
     - PUT /api/products/:id - Update product (Admin)
     - DELETE /api/products/:id - Remove product (Admin)
   
   - Orders:
     - GET /api/orders - List user's orders (or all orders for admin)
     - GET /api/orders/:id - Get order details
     - POST /api/orders - Create new order
     - PUT /api/orders/:id/status - Update order status (Admin)

2. **Data Models**
   - Users: user_id, username, email, password, name, contact_number, address, is_admin
   - Products: product_id, name, price, description, image_url
   - Orders: order_id, user_id, status, delivery_address, contact_name, contact_number, created_at
   - Order Items: order_item_id, order_id, product_id, quantity, price_per_unit

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation
1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

### Running the Application
1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

Access the application at http://localhost:3000
