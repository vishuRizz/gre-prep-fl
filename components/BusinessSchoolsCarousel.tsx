"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BusinessSchoolsCarousel: React.FC = () => {
  const [currentTranslate, setCurrentTranslate] = useState(0);

  // Placeholder data - you can replace with actual university data and images
  const universities = [
    {
      id: 1,
      name: "IU Kelley School of Business",
      image: "https://yt3.googleusercontent.com/E7_r1ZkFNY1dXb9qK7dx5MhPz2kmtqiBtk5Hxw7MTWwQDb1PHH3vSiCVuvJ90VajjEI-D8nc=s900-c-k-c0x00ffffff-no-rj", // Replace with actual image path
      alt: "IU Kelley School of Business"
    },
    {
      id: 2,
      name: "Chicago Booth",
      image: "https://www.chicagobooth.edu/-/media/enterprise/chicagoboothlogo.png", // Replace with actual image path
      alt: "University of Chicago Booth School of Business"
    },
    {
      id: 3,
      name: "Columbia Business School",
      image: "https://d2lk14jtvqry1q.cloudfront.net/media/small_Columbia_Business_School_a8385c7d11_18e20321d5_238bd28000_912bf86554.png", // Replace with actual image path
      alt: "Columbia Business School"
    },
    {
      id: 4,
      name: "Johnson Cornell SC Johnson College of Business",
      image: "https://business.cornell.edu/wp-content/uploads/sites/2/2020/11/Johnson-logo-rgb-1024x220.png", // Replace with actual image path
      alt: "Johnson Cornell SC Johnson College of Business"
    },
    {
      id: 5,
      name: "Wharton School",
      image: "https://standards.wharton.upenn.edu/wp-content/plugins/martech-chupacabra/includes/images/Wharton-Logo-RGB.png", // Replace with actual image path
      alt: "Wharton School"
    },
    {
      id: 6,
      name: "Stanford Graduate School of Business",
      image: "https://keystoneacademic-res.cloudinary.com/image/upload/element/14/141550_stanfordbusiness.jpg", // Replace with actual image path
      alt: "Stanford Graduate School of Business"
    }
  ];

  // Create infinite loop by duplicating items
  const extendedUniversities = [...universities, ...universities, ...universities];
  const itemWidth = 100 / 3; // 3 items visible at once

  // Continuous auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTranslate(prev => {
        const newTranslate = prev - 0.1; // Smooth continuous movement
        
        // Reset to middle section when reaching end to create infinite loop
        if (Math.abs(newTranslate) >= (universities.length * itemWidth)) {
          return -(universities.length * itemWidth) / 3;
        }
        
        return newTranslate;
      });
    }, 50); // Very smooth 20fps animation

    return () => clearInterval(interval);
  }, [universities.length, itemWidth]);

  const goToPrevious = () => {
    setCurrentTranslate(prev => prev + itemWidth);
  };

  const goToNext = () => {
    setCurrentTranslate(prev => prev - itemWidth);
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-blue-500 uppercase tracking-wide text-sm font-semibold mb-4">
            Top Business Schools
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Our students have been enrolled into the following
            <br />
            <span className="block mt-2">B-Schools for their Executive MBA Programs</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-100 ease-linear"
              style={{
                transform: `translateX(${currentTranslate}%)`
              }}
            >
              {extendedUniversities.map((university, index) => (
                <div
                  key={`${university.id}-${index}`}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / 3}%` }}
                >
                  <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                    <div className="aspect-[3/2] overflow-hidden">
                      <img
                        src={university.image}
                        alt={university.alt}
                        className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSchoolsCarousel;