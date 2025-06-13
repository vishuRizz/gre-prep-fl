// components/Navbar.tsx
import React from 'react';
import { Button } from "@/components/ui/button"

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex flex-col">
            <div className="flex items-center">
              {/* Arrow Logo */}
              <div className="mr-3">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 14L12 4V8H20V10H22V8H24L26 10V18L24 20H22V18H20V20H12V16L2 14Z" fill="#10B981"/>
                  <path d="M12 8H20V10H12V8Z" fill="#10B981"/>
                  <path d="M12 16H20V18H12V16Z" fill="#10B981"/>
                </svg>
              </div>
              <div className="flex items-center">
                <span className="text-white font-bold text-xl">Gre</span>
                <span className="text-white font-normal text-xl">TestPrep</span>
                <span className="ml-2 bg-[#7AC86B] text-white text-xs px-2 py-1 rounded font-bold">GRE</span>
              </div>
            </div>
            <div className="text-white text-xs mt-0.5 ml-10">
              Prepare with the best. Rock the test.™
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden xl:flex items-center space-x-10">
            <a href="#" className="text-white hover:text-emerald-400 text-base font-small transition-colors">
              Pricing
            </a>
            <a href="#" className="text-white hover:text-emerald-400 text-base font-small transition-colors">
              Reviews
            </a>
            <a href="#" className="text-white hover:text-emerald-400 text-base font-small transition-colors">
              Guarantee
            </a>
            <a href="#" className="text-white hover:text-emerald-400 text-base font-small transition-colors">
              MBA Admissions
            </a>
            <a href="#" className="text-white hover:text-emerald-400 text-base font-small transition-colors">
              Live Classes
            </a>
            <a href="#" className="text-white hover:text-emerald-400 text-base font-small transition-colors">
              Tutoring
            </a>
            <a href="#" className="text-white hover:text-emerald-400 text-base font-small transition-colors">
              Blog
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
           <Button  variant="outline">Login</Button>
            <Button className="bg-[#7AC86B] text-white px-6 py-2.5 text-sm rounded hover:bg-emerald-600 transition-colors">
              TRY FOR FREE
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <button className="text-white hover:text-emerald-400 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

//#2f835d