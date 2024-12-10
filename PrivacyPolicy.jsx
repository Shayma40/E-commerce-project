import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import AnnouncementBar from '../Header/AnnouncementBar';
import Header from '../Header/Header';
import Footer from './Footer';


const PrivacyPolicy = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <Box sx={{ padding: '4rem 2rem', backgroundColor: '#EFECEC' }}>
        <Container>
          <Typography variant="h2" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="body1" sx={{ color:'#252525',marginBottom: '1rem' }}>
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Data Collection
          </Typography>
          <Typography variant="body1" sx={{ color:'#252525', marginBottom: '2rem' }}>
            We collect personal data when you interact with our website.
          </Typography>
          <Typography variant="h6" gutterBottom>
            How We Use Your Data
          </Typography>
          <Typography variant="body1" sx={{ color: '#252525', marginBottom: '1rem' }}>
            We use your data to improve your experience on our website,...
          </Typography>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
