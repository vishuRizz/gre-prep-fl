import React from 'react';
import Navbar from '../components/Navbar';
import PricingSection from '../components/PricingSection';
import CoachingContentExplorer from '../components/CoachingContentExplorer';
import GREStats from '../components/GREStats';
import TeamComponent from '../components/TeamComponent';
import TTPTestimonialSection from '../components/TTPTestimonialSection';
import Footer from '../components/Footer';
import HeroSection from '@/components/HeroSection';
import BusinessSchoolsCarousel from '@/components/BusinessSchoolsCarousel';
import GREPricingTable from '@/components/ComparisionTable';
export default function Home() {
  return (
    <div className="min-h-screen">
    <Navbar />
   <HeroSection/>
    <PricingSection/>
    <GREStats/>
    <TeamComponent/>
    <CoachingContentExplorer/>
    <TTPTestimonialSection/>
    <BusinessSchoolsCarousel/>
    <GREPricingTable/>
    <Footer/>
    {/* <ComparisonTable/> */}
  </div>
);
};
