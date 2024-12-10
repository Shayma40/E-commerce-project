const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');
const subRoutes = require('./routes/subRoutes');
const helmet = require('helmet');



require('dotenv').config();
const app = express();
connectDB();


app.use(cors({
    //in vars
    origin: ['http://localhost:3002', 'http://192.168.1.16:3002'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: [ 'Authorization', 'Content-Type' ],
}));


app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"]
        },
    },
}));


app.use(express.json());
app.use(bodyParser.json());

//Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/paypal', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/subscribers', subRoutes);



const PORT = process.env.PORT || 7800;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});