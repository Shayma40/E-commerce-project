import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';



const Footer = () => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter your email.');
      return;
    }

    console.log('Sending email to backend:', email);

    try {
      const response = await axios.post('http://localhost:7800/api/subscribers/subscribe', {email});
      if (response.data.message) {
        setMessage(response.data.message);
        setEmail('');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Subscription failed. Please try again.';
      setMessage(errorMessage);
      console.error('Error subscribing:', error);
    }
  };


  return (
    <Box
      sx={{
        backgroundColor: '#2C332F',
        color: '#EFECEC',
        padding: '2rem 0',
      }}
    >
      <Container maxWidth="Ig">
        <Grid container spacing={4}>
          {/* Links Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {['About Us', 'Contact', 'Terms & Conditions', 'Privacy Policy'].map((text, index) => (
                <Link 
                  key={index} 
                  href={`/${text.toLowerCase().replace(/ & /, '-').replace(/ /g, '-')}`} 
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    marginBottom: '0.5rem', 
                    transition: 'all 0.3s', 
                    '&:hover': { 
                      textDecoration: 'underline', 
                      transform: 'scale(1.05)', 
                      fontWeight: 'bold' 
                    },
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              {[ 
                { icon: <Facebook fontSize="large" />, link: "https://www.facebook.com" },
                { icon: <Twitter fontSize="large" />, link: "https://www.twitter.com" },
                { icon: <Instagram fontSize="large" />, link: "https://www.instagram.com" }
              ].map((social, index) => (
                <Link 
                  key={index} 
                  href={social.link} 
                  target="_blank" 
                  color="inherit" 
                  sx={{ 
                    '&:hover': { 
                      transform: 'scale(1.2)', 
                      transition: 'transform 0.3s' 
                    }, 
                  }}
                >
                  {social.icon}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Newsletter Subscription */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Subscribe to our Newsletter
            </Typography>
            <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TextField
                variant="outlined"
                placeholder="Enter your email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#EFECEC',
                    },
                    '&:hover fieldset': {
                      borderColor: '#EFECEC',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#EFECEC',
                    },
                  },
                  '& input': {
                    color: '#EFECEC',
                  },
                }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ 
                  backgroundColor: '#505655', 
                  '&:hover': { backgroundColor: '#414b47', boxShadow: '0px 2px 5px rgba(0,0,0,0.2)' },
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                }}
              >
                Subscribe
              </Button>
            </Box>
            {message && <Typography variant="body2" color="inherit">{message}</Typography>}
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} E-commerce. All rights reserved.
          </Typography>
        </Box>
        </Container>
    </Box>
  );
};

export default Footer;