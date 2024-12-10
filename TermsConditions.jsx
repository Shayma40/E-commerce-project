import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import AnnouncementBar from '../Header/AnnouncementBar';
import Header from '../Header/Header';
import Footer from './Footer';

const TermsConditions = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <Box sx={{ padding: '5rem 2rem', backgroundColor: '#EFECEC' }}>
        <Container>
          <Typography variant="h2" gutterBottom>
            Terms & Conditions
          </Typography>
          <Divider sx={{ marginBottom: '2rem' }} />

          {/* General Terms Section */}
          <Typography variant="h6" gutterBottom sx={{ color: '#252525'}}>
            Section 1: General Terms
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem', color:'#252525' }}>
            These general terms of service apply to all users. By accessing or using our website, you agree to comply with these terms. If you do not agree with any part of these terms, please discontinue using the website.
          </Typography>
          
          {/* Use of Our Website */}
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color:'#2C332F' }}>
            1. Use of Our Website
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            Our website and its content are intended for personal, non-commercial use only. You may not copy, reproduce, distribute, or create derivative works from our content without obtaining prior written consent from us.
          </Typography>

          {/* Accuracy of Information */}
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color:'#2C332F' }}>
            2. Accuracy of Information
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            We make every effort to ensure that the information on our website is accurate and up-to-date. However, we do not guarantee the accuracy or completeness of any information, including product descriptions and pricing. We reserve the right to correct any errors or omissions and update content without prior notice.
          </Typography>

          {/* User Accounts */}
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold',color:'#2C332F' }}>
            3. User Accounts
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            If you create an account on our website, you are responsible for maintaining the confidentiality of your account information, including your password. You agree to accept responsibility for all activities that occur under your account. We reserve the right to terminate accounts, refuse service, or cancel orders at our discretion.
          </Typography>

          {/* Prohibited Conduct */}
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold',color:'#2C332F' }}>
            4. Prohibited Conduct
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            You agree not to engage in the following prohibited activities:
          </Typography>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Using the website for any unlawful purposes or soliciting others to engage in unlawful activities.</li><br></br>
            <li>Violating any applicable laws or regulations.</li><br></br>
            <li>Interfering with the website's security or attempting to gain unauthorized access to our systems.</li>
          </ul>

          {/* Privacy Policy Section */}
          <Divider sx={{ margin: '2rem 0' }} />
          <Typography variant="h6" gutterBottom sx={{ color: '#252525' }}>
            Section 2: Privacy Policy
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem', color: '#252525' }}>
            Your data privacy is our top priority. We handle your information with care and in accordance with our Privacy Policy...
          </Typography>
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default TermsConditions;
