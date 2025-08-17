"use client";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  hours: string;
  features: string[];
  isHighlighted?: boolean;
  hasPaymentPlans?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  hours, 
  features, 
  isHighlighted = false, // Gold Package will have this as true
  hasPaymentPlans = false // Silver, Gold, Diamond packages have payment plans
}) => {
  const [isBuyNowHovered, setIsBuyNowHovered] = useState(false);

  return (
    <div className={`
      group relative flex flex-col h-full p-6 rounded-lg overflow-hidden
      ${isHighlighted 
        ? 'bg-emerald-400 hover:bg-[#7AC86B] transform scale-105 shadow-2xl'  // Gold Package: Gray background, turns green on hover
        : 'bg-white shadow-xl hover:shadow-2xl'                            // Regular Cards: White background, hover shadow effect
      }
      ${isHighlighted ? 'lg:scale-110' : 'hover:scale-102'}        // Desktop scaling: Gold stays larger, others scale slightly on hover
      transition-all duration-500 cursor-pointer                   // Smooth transitions for all effects with longer duration
    `}>
      {/* Header Section - Package title, price, and hours */}
      <div className="text-center mb-6">
        {/* Package Title - White text for Gold Package, dark for others */}
        <h3 className={`
          text-lg font-bold mb-3 uppercase tracking-wide transition-colors duration-500
          ${isHighlighted ? 'text-gray-900 group-hover:text-white' : 'text-gray-900'}
        `}>
          {title}
        </h3>
        
        {/* Package Price - Large prominent display */}
        <div className={`
          text-4xl font-bold mb-2 transition-colors duration-500
          ${isHighlighted ? 'text-gray-900 group-hover:text-white' : 'text-gray-900'}
        `}>
          {price}
        </div>
        
        {/* Hours Information - Green accent for regular cards, white for Gold */}
        <div className={`
          text-base font-medium transition-colors duration-500
          ${isHighlighted ? 'text-gray-700 group-hover:text-white' : 'text-green-600'}
        `}>
          {hours}
        </div>
      </div>

      {/* Features List - Package benefits with bullet points */}
      <div className="flex-grow space-y-3 min-h-0">
        {/* Map through each feature and display with triangle bullet points */}
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            {/* Triangle Bullet Point - Green for regular cards, white for Gold */}
            <div className={`
              w-0 h-0 mr-3 mt-2 flex-shrink-0 transition-colors duration-500
              border-l-[5px] border-r-[5px] border-b-[7px]
              border-l-transparent border-r-transparent
              ${isHighlighted ? 'border-b-gray-600 group-hover:border-b-white' : 'border-b-green-500'}
            `}></div>
            
            {/* Feature Text - Responsive text that wraps properly */}
            <p className={`
              text-sm leading-relaxed break-words transition-colors duration-500
              ${isHighlighted ? 'text-gray-700 group-hover:text-white' : 'text-gray-700'}
            `}>
              {feature}
            </p>
          </div>
        ))}
        
        {/* Payment Plans Feature - Only shows for Silver, Gold, Diamond packages */}
        {hasPaymentPlans && (
          <div className="flex items-start">
            {/* Triangle Bullet Point for Payment Plans */}
            <div className={`
              w-0 h-0 mr-3 mt-2 flex-shrink-0 transition-colors duration-500
              border-l-[5px] border-r-[5px] border-b-[7px]
              border-l-transparent border-r-transparent
              ${isHighlighted ? 'border-b-gray-600 group-hover:border-b-white' : 'border-b-green-500'}
            `}></div>
            
            {/* Payment Plans Text */}
            <p className={`
              text-sm leading-relaxed break-words transition-colors duration-500
              ${isHighlighted ? 'text-gray-700 group-hover:text-white' : 'text-gray-700'}
            `}>
              With 2 Types of Payment Plans
            </p>
          </div>
        )}
      </div>

      {/* Buttons - Enhanced with click animations */}
      <div className="mt-6 space-y-3 flex-shrink-0">
        {/* Try Free Session Button - Different styling for each card type */}
        <button className={`
          w-full font-bold py-3 px-4 rounded-lg transition-all duration-500 uppercase tracking-wide flex items-center justify-center text-sm
          transform active:scale-95 active:bg-black active:text-white
          ${isBuyNowHovered 
            ? 'bg-gray-200 text-gray-800'  // When Buy Now is hovered, Try Free Session goes to original state
            : 'bg-gray-200 text-gray-800 group-hover:bg-black group-hover:text-white'  // Normal behavior
          } hover:shadow-lg
        `}>
          Try Free Session
          {/* Arrow icon - Shows when card is hovered but hides when Buy Now is hovered */}
          <svg className={`ml-2 w-4 h-4 flex-shrink-0 transition-all duration-500 ${
            isBuyNowHovered 
              ? 'opacity-0 transform -translate-x-2'  // Hide when Buy Now is hovered
              : 'opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'  // Show on card hover
          }`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Buy Now Button - Different styling for each card type */}
        <button 
          className={`
            w-full font-bold py-3 px-4 rounded-lg transition-all duration-500 uppercase tracking-wide text-sm flex items-center justify-center
            transform active:scale-95 active:bg-black active:text-white
            bg-gray-200 text-gray-800 hover:bg-black hover:text-white hover:shadow-lg
          `}
          onMouseEnter={() => setIsBuyNowHovered(true)}
          onMouseLeave={() => setIsBuyNowHovered(false)}
        >
          Buy Now
          {/* Arrow icon - Shows with smooth animation when Buy Now button is hovered */}
          <svg className={`ml-2 w-4 h-4 flex-shrink-0 transition-all duration-500 ${
            isBuyNowHovered 
              ? 'opacity-100 transform translate-x-0'  // Show arrow when Buy Now is hovered
              : 'opacity-0 transform -translate-x-2'   // Hide arrow by default
          }`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const GMATPricingPage: React.FC = () => {
  const pricingData = [
    {
      title: "Basic Package",
      price: "$899",
      hours: "(10 Hours)",
      features: [
        "10 Hours of Personalized One-on-One Tutoring",
        "GMAT Official Guide 2021 Book",
        "Unlimited Tutor support by E-mail, Phone & Online Meetings all through your Test Date",
        '200 "Master-Level GMAT Questions" with Solutions ($99 Value)',
        "Thorough Review of 1 Practice Test",
        "FREE Trial Session # 1 (1 Hour) to Discuss & Prepare a Personalized Action Plan and Strategy"
      ]
    },
    {
      title: "Silver Package",
      price: "$1,299",
      hours: "(15 Hours)",
      features: [
        "15 Hours of Personalized One-on-One Tutoring",
        "GMAT Official Guide 2021 Book",
        "Unlimited Tutor support by E-mail, Phone & Online Meetings all through your Test Date",
        '300 "Master-Level GMAT Questions" with Solutions ($149 Value)',
        "Thorough Review of 2 Practice Tests",
        "FREE Trial Session # 1 (1.5 Hour) to Discuss & Prepare a Personalized Action Plan and Strategy"
      ],
      hasPaymentPlans: true
    },
    {
      title: "Gold Package",
      price: "$1,699",
      hours: "(20 Hours)",
      features: [
        "20 Hours of Personalized One-on-One Tutoring",
        "GMAT Official Guide 2021 Book",
        "Unlimited Tutor support by E-mail, Phone & Online Meetings all through your Test Date",
        '400 "Master-Level GMAT Questions" with Solutions ($199 Value)',
        "Thorough Review of 3 Practice Tests",
        "FREE Trial Session # 1 (1.5 Hour) to Discuss & Prepare a Personalized Action Plan and Strategy"
      ],
      isHighlighted: true,
      hasPaymentPlans: true
    },
    {
      title: "Diamond Package",
      price: "$1,999",
      hours: "(25 Hours)",
      features: [
        "25 Hours of Personalized One-on-One Tutoring",
        "GMAT Official Guide 2021 Book",
        "Unlimited Tutor support by E-mail, Phone & Online Meetings all through your Test Date",
        '500 "Master-Level GMAT Questions" with Solutions ($249 Value)',
        "Thorough Review of 4/5 Practice Tests",
        "FREE Trial Session # 1 (1.5 Hour) to Discuss & Prepare a Personalized Action Plan and Strategy"
      ],
      hasPaymentPlans: true
    }
  ];

  return (
    <div>
      <Navbar/>
      <Header/>
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Text */}
       
        
        {/* Cards Container - Tight spacing for seamless look */}
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-2 lg:gap-1">
          {/* Map through pricing data and create cards */}
          {pricingData.map((pkg, index) => (
            <div 
              key={index} 
              className={`
                ${index === 2 ? 'lg:flex-[1.1] lg:z-10' : 'lg:flex-[1.05]'}  // Gold Package (index 2) gets more width and higher z-index
                flex-1 max-w-sm lg:max-w-none                                   // Responsive width handling
                ${index === 2 ? 'lg:mx-1' : ''}                                // Gold Package gets horizontal margins for spacing
              `}
            >
              {/* Render individual pricing card */}
              <PricingCard
                title={pkg.title}           // Package name (Basic, Silver, Gold, Diamond)
                price={pkg.price}           // Package price ($899, $1,299, etc.)
                hours={pkg.hours}           // Hours included ((10 Hours), (15 Hours), etc.)
                features={pkg.features}     // Array of package features
                isHighlighted={pkg.isHighlighted}  // true for Gold Package only
                hasPaymentPlans={pkg.hasPaymentPlans} // true for Silver, Gold, Diamond
              />
            </div>
          ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default GMATPricingPage;