import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AuthContext from '../context/AuthContext';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Form fields
  const [contactName, setContactName] = useState(user?.name || '');
  const [contactNumber, setContactNumber] = useState(user?.contact_number || '');
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || '');
  
  // For adding new items
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
    
    // Check if we have product and quantity from URL params
    const params = new URLSearchParams(location.search);
    const productId = params.get('product');
    const quantity = params.get('quantity');
    
    if (productId && quantity) {
      // We'll add this product once the products are loaded
      const timer = setInterval(() => {
        if (products.length > 0) {
          const product = products.find(p => p.product_id.toString() === productId);
          if (product) {
            handleAddItem({
              product_id: product.product_id,
              name: product.name,
              price: product.price,
              quantity: parseInt(quantity)
            });
            clearInterval(timer);
          }
        }
      }, 100);
      
      return () => clearInterval(timer);
    }
  }, [location.search, products.length]);

  const handleAddItem = (item) => {
    // Check if item already exists
    const existingItemIndex = orderItems.findIndex(i => i.product_id === item.product_id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedItems = [...orderItems];
      updatedItems[existingItemIndex].quantity += item.quantity;
      setOrderItems(updatedItems);
    } else {
      // Add new item
      setOrderItems([...orderItems, item]);
    }
    
    // Reset selection
    setSelectedProduct('');
    setSelectedQuantity(1);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...orderItems];
    updatedItems.splice(index, 1);
    setOrderItems(updatedItems);
  };

  const handleAddNewItem = () => {
    if (!selectedProduct) return;
    
    const product = products.find(p => p.product_id.toString() === selectedProduct);
    if (product) {
      handleAddItem({
        product_id: product.product_id,
        name: product.name,
        price: product.price,
        quantity: selectedQuantity
      });
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (orderItems.length === 0) {
      setError('Please add at least one item to your order');
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      const orderData = {
        contact_name: contactName,
        contact_number: contactNumber,
        delivery_address: deliveryAddress,
        items: orderItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity
        }))
      };
      
      await axios.post('http://localhost:5000/api/orders', orderData);
      setSuccess(true);
      setOrderItems([]);
      
      // Redirect to orders page after 2 seconds
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/products')}
        sx={{ mb: 2 }}
      >
        Back to Products
      </Button>
      
      <Typography variant="h4" component="h1" gutterBottom>
        Place Bulk Order
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Order placed successfully! Redirecting to your orders...</Alert>}
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            
            {orderItems.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Subtotal</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell align="right">
                          <IconButton color="error" onClick={() => handleRemoveItem(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} align="right"><strong>Total:</strong></TableCell>
                      <TableCell align="right"><strong>${calculateTotal().toFixed(2)}</strong></TableCell>
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Alert severity="info" sx={{ mt: 2 }}>
                No items added to your order yet. Add items below.
              </Alert>
            )}
            
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'flex-end' }}>
              <TextField
                select
                label="Select Product"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                sx={{ minWidth: 200, mr: 2 }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.product_id} value={product.product_id}>
                    {product.name} - ${product.price.toFixed(2)}
                  </option>
                ))}
              </TextField>
              
              <TextField
                label="Quantity"
                type="number"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                InputProps={{ inputProps: { min: 1 } }}
                sx={{ width: 100, mr: 2 }}
              />
              
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddNewItem}
                disabled={!selectedProduct}
              >
                Add Item
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Delivery Details
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <TextField
                label="Contact Name"
                fullWidth
                margin="normal"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              
              <TextField
                label="Contact Number"
                fullWidth
                margin="normal"
                required
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
              
              <TextField
                label="Delivery Address"
                fullWidth
                margin="normal"
                required
                multiline
                rows={4}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                disabled={submitting || orderItems.length === 0}
              >
                {submitting ? <CircularProgress size={24} /> : 'Place Order'}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceOrder;