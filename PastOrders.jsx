import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PastOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:7800/api/orders', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Response data:', response.data);
                setOrders(response.data);
            } catch (err) {
                console.error('Error loading orders:', err);
                setError('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Past Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        <p>Order ID: {order._id}</p>
                        <p>Total: ${order.total}</p>
                        <p>Status: {order.status}</p>
                        <a href={`/track-order/${order._id}`}>Track Order</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PastOrders;
