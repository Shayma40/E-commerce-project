import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ConfirmSubscription = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmSubscription = async () => {
    try {
        const response = await axios.get(`http://localhost:7800/api/subscribers/confirm-subscription/${token}`);
        // setMessage('Subscription confirmed successfully!');
        console.log('Subscription confirmed:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            setMessage(error.response.data.message || 'Failed to confirm subscription.');
        } else {
            console.error('Error confirming subscription:', error);
            setMessage('Failed to confirm subscription. Please try again.');
        }
    }
    };


    confirmSubscription();
}, [token]);

  return (
    <div>
      <h2>{message || 'Confirming your subscription...'}</h2>
    </div>
  );
};

export default ConfirmSubscription;