import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PricingSection from '../components/PricingSection';
// import ComparisonTable from '../components/ComparisonTable';
import CoachingContentExplorer from '../components/CoachingContentExplorer';
export default function Home() {
  return (
    <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <PricingSection/>
    <CoachingContentExplorer/>
    {/* <ComparisonTable/> */}
  </div>
);
};
