import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import AnnouncementBar from '../Header/AnnouncementBar';
import Header from '../Header/Header';
import Footer from './Footer';


const AboutUs = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <Box
        sx={{
          backgroundImage: 'url(https://images.stockcake.com/public/d/e/5/de523b26-f889-4f3e-95ea-b0f11c64279c_large/designer-s-creative-space-stockcake.jpg)',
          backgroundPosition: 'center',
          color: '#EFECEC',
          padding: '5rem 0',
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'transparent',
            padding: '2rem',
          }}
        >
          <Container>
            <Typography variant="h2" gutterBottom sx={{color: 'black'}}>
              About Us
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '3rem', color:'black', fontWeight:'bold' }}>
              Welcome to our store! We are committed to providing you with the best products and services.
            </Typography>
            <Typography variant="h4" gutterBottom sx={{color:'black'}}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{color: 'black', fontWeight: 'bold'}}>
              We strive to bring you the latest trends and high-quality products with a focus on sustainability and customer satisfaction.
            </Typography>
          </Container>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default AboutUs;