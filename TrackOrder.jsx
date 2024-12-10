import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TrackOrder = () => {
    const { orderId } = useParams();
    const [trackingInfo, setTrackingInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrackingInfo = async () => {
            if (!orderId) {
                setError('Order ID is required');
                setLoading(false);
                return;
            }
            try {
                const token = localStorage.getItem('authToken');
                console.log('Token:', token);
                const response = await axios.get(`http://localhost:7800/api/orders/${orderId}/track`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Fetching tracking info for orderId:', orderId);
                console.log('Response data:', response.data);
                setTrackingInfo(response.data);
            } catch (err) {
                console.error('Error fetching tracking information:', err);
                setError('Failed to fetch tracking information');
            } finally {
                setLoading(false);
            }
        };
        fetchTrackingInfo();
    }, [orderId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Tracking Information for Order {orderId}</h1>
            <p>Status: {trackingInfo.status}</p>
            <p>Estimated Delivery: {trackingInfo.estimatedDelivery}</p>
            <p>Last Updated: {trackingInfo.lastUpdated}</p>
        </div>
    );
};

export default TrackOrder;
