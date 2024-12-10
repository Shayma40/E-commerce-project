import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Grid, List, ListItem, ListItemText, Snackbar, Accordion, AccordionSummary, AccordionDetails, TextField, MenuItem, Select, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import apiClient, { fetchProducts, addProductApi } from '../../api';
import NewsletterForm from './NewsletterForm';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    image: '',
  });
  // eslint-disable-next-line no-unused-vars
  const [productId, setProductId] = useState('');
  const [products, setProducts] = useState([]);
  const [newsletterHistory, setNewsletterHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  // Fetch users and stats
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error("No token found in localStorage.");
        }
        const response = await apiClient.get('http://localhost:7800/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUsers(response.data.users);
        setOrders(response.data.orders);
        setStats(response.data.stats);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 403) {
          navigate('/');
        } else if (error.message === "No token found in localStorage.") {
          console.error("Authentication token missing. Please log in.");
        }
      }
    };

    const fetchNewsletterHistory = async () => {
      setLoadingHistory(true);
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:7800/api/admin/newsletter/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNewsletterHistory(response.data); // Assuming response.data is an array of newsletters
      } catch (error) {
        console.error('Error fetching newsletter history:', error);
        setSnackbar({ open: true, message: 'Failed to load newsletter history.', severity: 'error' });
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchAdminData();
    fetchNewsletterHistory();
  }, [navigate]);

  const filteredNewsletters = newsletterHistory.filter((newsletter) =>
    newsletter.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    newsletter.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredNewsletters.length / ITEMS_PER_PAGE);
  const currentNewsletters = filteredNewsletters.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  // Fetch products
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setSnackbar({ open: true, message: 'Failed to fetch products', severity: 'error' });
      }
    };

    fetchProductsData();
  }, []);

  // Define columns for datagrid
  const productColumns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'stock', headerName: 'Stock', type: 'number', width: 100 },
    { field: 'color', headerName: 'Color', width: 150 },
    { field: 'price', headerName: 'Price', type: 'number', width: 100 }
  ];

  // Handle input changes for product data 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    setProductData((prevdata) => ({
      ...prevdata,
      image: e.target.files[0],
    }));
  };

  // Add product 
  const addProduct = async () => {
    try {
      await addProductApi(productData);
      setSnackbar({ open: true, message: 'Product added successfully!', severity: 'success'});
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to add product', severity: 'error'});
    }
  };

  // Update Product 
  const updateProduct = async () => {
    if (!productId) {
      setSnackbar({ open: true, message: 'Please enter a product ID to update', severity: 'warning'});
      return;
    }
    try {
      await apiClient.put(`/products/${productId}`, productData);
      setSnackbar({ open: true, message: 'Product updated successfully!', severity: 'success'});
    } catch (error) {
      console.error('Error updating product:', error);
      setSnackbar({ open: true, message: 'Failed to update product', severity: 'error'});
    }
  };

  // Delete Product 
  const deleteProduct = async () => {
    if (!productId) {
      setSnackbar({ open: true, message: 'Please enter a product ID to delete', severity: 'warning'});
      return;
    }
    try {
      await axios.delete(`/api/products/${productId}`);
      setSnackbar({ open: true, message: 'Product deleted successfully!', severity: 'success'});
    } catch (error) {
      console.error('Error deleting product:', error);
      setSnackbar({ open: true, message: 'Failed to delete product', severity: 'error'});
    }
  };

  const handleOrderStatusChange = async (orderId, status) => {
    try {
      await apiClient.put(`/orders/${orderId}`, { status: status });
      setSnackbar({ open: true, message: 'Order status updated successfully!', severity: 'success'});
    } catch (error) {
      console.error('Error updating order status:', error);
      setSnackbar({ open: true, message: 'Failed to update order status', severity: 'error'});
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:7800/api/admin/user-action',
        { userId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbar({ open: true, message: response.data.message, severity: 'success' });
      setUsers(users.map(user => user.id === userId ? response.data.user : user));
    } catch (error) {
      console.error('Error performing action:', error);
      setSnackbar({ open: true, message: 'Action failed', severity: 'error'});
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#EFECEC', color: '#2C332F', minHeight: '100vh' }}>
      <Typography variant="h3" gutterBottom>Admin Dashboard</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        style={{ marginBottom: '20px' }}
      >
        Go Back to Home
      </Button>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Accordion style={{ backgroundColor: '#EFECEC', border: '1px solid #EFECEC', borderRadius: '10px'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Total Users</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h4">{stats.totalUsers}</Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} md={4}>
          <Accordion style={{ backgroundColor: '#EFECEC', border: '1px solid #EFECEC', borderRadius: '10px'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Total Orders</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h4">{stats.totalOrders}</Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} md={4}>
          <Accordion style={{ backgroundColor: '#EFECEC', border: '1px solid #EFECEC', borderRadius: '10px'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Total Products</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h4">{stats.totalProducts}</Typography>
              <DataGrid
                rows={products.map(product => ({ id: product._id, ...product }))}
                columns={productColumns}
                autoHeight
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      <Accordion style={{ marginTop: '20px', backgroundColor: '#EFECEC', marginBottom: '15px', border: '1px solid #EFECEC', borderRadius: '10px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" gutterBottom>User Management</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {users.map(user => (
              <ListItem key={user._id} divider>
                <ListItemText primary={`${user.name} - ${user.email} - ${user.isAdmin ? 'Admin' : 'User'}`} />
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#505655', color: '#EFECEC' }}
                  onClick={() => handleUserAction(user._id, user.isAdmin ? 'demote' : 'promote')}
                >
                  {user.isAdmin ? 'Demote' : 'Promote'}
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#505655', color: '#EFECEC', marginLeft: '10px' }}
                  onClick={() => handleUserAction(user._id, 'block')}
                >
                  Block
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleUserAction(user._id, 'delete')}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ marginTop: '20px', backgroundColor: '#EFECEC', marginBottom: '15px', border: '1px solid #EFECEC', borderRadius: '10px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Orders Management</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DataGrid 
            rows={orders.map(order => ({ id: order._id, customer: order.customer, total: order.total, status: order.status }))} 
            columns={[
              { field: 'id', headerName: 'Order ID' },
              { field: 'customer', headerName: 'Customer' },
              { field: 'total', headerName: 'Total Amount', type: 'number' },
              { 
                field: 'status', 
                headerName: 'Status', 
                editable: true, 
                renderCell: (params) => {
                  const status = params.row.status || 'unknown';
                  const displayStatus = status ? status.toLowerCase() : '';
                  return (
                    <Select
                      value={displayStatus}
                      onChange={(e) => handleOrderStatusChange(params.row.id, e.target.value)}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Canceled">Canceled</MenuItem>
                  </Select>
                );
              }
            }
            ]}
            autoHeight 
          />
        </AccordionDetails>
      </Accordion>

      {/* Product Management Section */}
      <Accordion style={{ marginTop: '20px', backgroundColor: '#EFECEC', marginBottom: '15px', border: '1px solid #EFECEC', borderRadius: '10px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Product Management</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField label="Name" name="name" value={productData.name} onChange={handleInputChange} />
            <TextField label="Category" name="category" value={productData.category} onChange={handleInputChange} />
            <TextField label="Price" name="price" type="number" value={productData.price} onChange={handleInputChange} />
            <TextField label="Stock" name="stock" type="number" value={productData.stock} onChange={handleInputChange} />
            <Button variant="contained" component="label">
              Upload Image
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
            <Button variant="contained" color="primary" onClick={addProduct}>Add Product</Button>
            <Button variant="contained" color="secondary" onClick={updateProduct}>Update Product</Button>
            <Button variant="contained" color="error" onClick={deleteProduct}>Delete Product</Button>
          </form>
        </AccordionDetails>
      </Accordion>

      {/*Newsletter Section*/}
      <Accordion style={{ marginTop: '20px', backgroundColor: '#EFECEC', marginBottom: '15px', border: '1px solid #EFECEC', borderRadius: '10px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Newsletter Managment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NewsletterForm  setSnackbar={setSnackbar}/>
        </AccordionDetails>
      </Accordion>

      {/* Newsletter History Section */}
      <Accordion style={{ marginTop: '20px', backgroundColor: '#EFECEC', marginBottom: '15px', border: '1px solid #EFECEC', borderRadius: '10px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Newsletter History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Search Newsletters"
            variant='outlined'
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {loadingHistory ? (
            <CircularProgress /> // Show loading spinner while loading history
          ) : (
            <List>
              {currentNewsletters.map((newsletter, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={newsletter.subject}
                    secondary={`Sent on: ${new Date(newsletter.sentAt).toLocaleDateString()} - ${newsletter.content}`}
                  />
                </ListItem>
              ))}
            </List>
          )}

          {/* Pagination Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <Typography>Page {currentPage} of {totalPages}</Typography>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ open: false, message: '', severity: '' })}
        message={snackbar.message}
      />
    </div>
  );
};

export default AdminDashboard;
