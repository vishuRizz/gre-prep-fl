import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PricingSection from '../components/PricingSection';
// import ComparisonTable from '../components/ComparisonTable';
import CoachingContentExplorer from '../components/CoachingContentExplorer';
import GREStats from '../components/GREStats';
import TeamComponent from '../components/TeamComponent';
import TTPTestimonialSection from '../components/TTPTestimonialSection';
import Footer from '../components/Footer';
export default function Home() {
  return (
    <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <PricingSection/>
    <GREStats/>
    <TeamComponent/>
    <CoachingContentExplorer/>
    <TTPTestimonialSection/>
    <Footer/>
    {/* <ComparisonTable/> */}
  </div>
);
};
