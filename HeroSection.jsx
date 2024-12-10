import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <div id="hero-section" className="hero-section">
            <div className="top-row">
                <a href="/women" className="image small" style={{ backgroundImage: 'url(https://images.stockcake.com/public/8/5/b/85b863a6-aafe-490e-aab9-1e2384422fb9_large/vintage-style-portrait-stockcake.jpg)' }}>
                    <span className="label">Women</span>
                </a>
                <a href="/men" className="image large" style={{ backgroundImage: 'url(https://images.stockcake.com/public/8/6/6/866c3e8b-04e0-44b1-9601-85ac69e4702d_large/urban-style-pose-stockcake.jpg)' }}>
                    <span className="label">Men</span>
                </a>
            </div>
            <div className="bottom-row">
                <a href="/kids" className="image" style={{ backgroundImage: 'url(https://images.stockcake.com/public/3/7/a/37a8506f-97c1-4859-ac9c-24c643199c0c_large/joyful-baby-smiling-stockcake.jpg)' }}>
                    <span className="label">Kids</span>
                </a>
                <a href="/beauty" className="image" style={{ backgroundImage: 'url(https://images.stockcake.com/public/1/3/3/13364745-c8e1-4b5e-9079-e179917a70c9_large/floral-beauty-essentials-stockcake.jpg)' }}>
                    <span className="label">Beauty</span>
                </a>
                <a href="/accessories" className="image" style={{ backgroundImage: 'url(https://images.stockcake.com/public/1/8/8/1881e2dd-e875-4313-b13d-2b1527222077_large/luxurious-fashion-accessories-stockcake.jpg)' }}>
                    <span className="label">Accessories</span>
                </a>
            </div>
        </div>
    );
};

export default HeroSection;
