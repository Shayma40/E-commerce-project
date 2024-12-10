import { CssBaseline } from '@mui/material';
import React from 'react';
import AnnouncementBar from './Components/Header/AnnouncementBar';
import Header from './Components/Header/Header';
import RichText from './Components/Header/RichText';
import HeroSection from './Components/Hero/HeroSection';
import Footer from './Components/Footer/Footer';
import BestSeller from './Components/Hero/BestSeller';



const Home = () => {
    return (
        <div style={{
            backgroundColor: '#EFECEC',
        }}>
            <CssBaseline />
            <AnnouncementBar />
            <Header />
            <RichText />
            <HeroSection />
            <BestSeller />
            <Footer />
        </div>
    );
};

export default Home;