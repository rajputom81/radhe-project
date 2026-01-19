import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import UpdatesSliderSection from '@/components/UpdatesSliderSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Radhe Online Services Center - Aadhaar, PAN Card & Government Services</title>
        <meta name="description" content="Your trusted partner for Aadhaar updates, PAN card applications, Voter ID registration, and all government services. Fast, secure, and reliable assistance." />
      </Helmet>
      <div className="relative min-h-screen bg-white overflow-x-hidden" id="home">
        <Navbar />
        <HeroSection />
        <UpdatesSliderSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;