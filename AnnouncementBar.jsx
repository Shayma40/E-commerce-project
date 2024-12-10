import React, { useState, useEffect } from 'react';
import './AnnouncementBar.css';

const AnnouncementBar = () => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const messages = [
        'Welcome to our store!',
        'Free shipping on orders over $50',
        'Check out our latest collections'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);

        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <div className="announcement-bar">
            {messages[currentMessageIndex] === 'Check out our latest collections' ? (
                <p>
                    <a href="/latest-collections" className="announcement-link">
                        Check out our latest collections
                    </a>
                </p>
            ) : (
                <p>{messages[currentMessageIndex]}</p>
            )}
        </div>
    );
};

export default AnnouncementBar;