import React, { useState, useContext } from 'react';
import { Search, Person, ShoppingBag, Close } from '@mui/icons-material';
import './Header.css'; 
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';
import axios from 'axios';

const Header = ({ products }) => {
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]); // State for search results
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);

    const handleCatalogClick = () => {
        navigate('/');
        setTimeout(() => {
            const heroSection = document.getElementById('hero-section');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const handleSearchClick = () => {
        setShowSearchBox(true);
    };

    const handleCloseClick = () => {
        setShowSearchBox(false);
        setSearchQuery('');
        setShowDropdown(false);
    };

    const handleAccountClick = () => {
        navigate('/Login');
    };

    const handleSearchInput = async (e) => {
        setSearchQuery(e.target.value);

        if (e.target.value.length > 2) { // Fetch products after user types 3 or more characters
            try {
                const response = await axios.get(`http://localhost:7800/api/products/search?q=${e.target.value}`);
                setSearchResults(response.data); // Update search results
                setShowDropdown(true); // Show dropdown list
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setShowDropdown(false); // Hide dropdown if less than 3 characters
        }
    };

    const handleProductClick = (productId) => {
        setShowDropdown(false); // Hide dropdown when a product is clicked
        navigate(`/product/${productId}`); // Navigate to the product page
    };

    const cartItemCount = Array.isArray(cartItems) ? cartItems.length : 0;

    return (
        <header className="header">
            <div className="search-icon" onClick={handleSearchClick}>
                <Search style={{ color: '#505655' }} />
            </div>


            <div className="logo">
                <img 
                    src='https://theme-craft-demo.myshopify.com/cdn/shop/files/Header_Logo_100x.png?v=1637171080'
                    alt='Logo'
                />
            </div>


            <nav className="nav-menu">
                <a href="/" className="nav-link">Home</a>
                <a href="#hero-section"onClick={handleCatalogClick} className="nav-link">Catalog</a> {/* Use onClick instead of href */}
                <a href="/contact" className="nav-link">Contact</a>
            </nav>


            <div className="icons">
                <Person className="icon" style={{ color: '#505655' }} onClick={handleAccountClick} />
                <ShoppingBag className="icon" style={{ color: '#505655' }} onClick={() => navigate('/Cart')} />
                {cartItemCount > 0 && <span className='cart-count'>{cartItemCount}</span>}
            </div>


            {showSearchBox && (
                <div className="search-box">
                    <input 
                        type="text" 
                        placeholder="Search for products..."
                        value={searchQuery} 
                        onChange={handleSearchInput}
                    />
                    <Search className="search-icon-inside" />
                    <Close className="close-icon" onClick={handleCloseClick} />

                    {showDropdown && searchResults.length > 0 && (
                        <div className="dropdown">
                            {searchResults.map((product) => (
                                <div 
                                    key={product._id} 
                                    className="dropdown-item" 
                                    onClick={() => handleProductClick(product._id)}
                                >
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="dropdown-image" 
                                    />
                                    <div className="search-dropdown-details">
                                        <span className="dropdown-product-name">{product.name}</span>
                                        <span className="dropdown-product-price">${product.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
