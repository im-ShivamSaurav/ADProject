import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/LandingPage.css';
import TrustSection from '../components/TrustSection';
import caseStudy from '../assets/homePageCaseStudy2.png';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <header className="hero-section">

        <img src={caseStudy} alt="Zerodha dashboard" className="hero-image mb-2" />
        <h1>Invest in everything</h1>
        <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
        
      </header>
      <TrustSection/>

    </div>
  );
};

export default LandingPage;
