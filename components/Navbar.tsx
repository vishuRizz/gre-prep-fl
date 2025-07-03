"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from '@/components/AuthContext';
import { Link } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight -100;
      setIsScrolled(scrollPosition > viewportHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Check if we're on the home page
  const isHomePage = pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHomePage 
        ? (isScrolled 
            ? 'bg-gray-700 backdrop-blur-md border-b border-gray-800' 
            : 'bg-transparent')
        : 'bg-gray-800 backdrop-blur-md border-b border-gray-700'
    }`}>
      <div className="max-w-[1450px] mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
        
          <div className="flex flex-col">
  <a href="/" className="flex items-center">
    {/* Arrow Logo */}
    <div className="mr-3">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 14L12 4V8H20V10H22V8H24L26 10V18L24 20H22V18H20V20H12V16L2 14Z" fill="#10B981"/>
        <path d="M12 8H20V10H12V8Z" fill="#10B981"/>
        <path d="M12 16H20V18H12V16Z" fill="#10B981"/>
      </svg>
    </div>
    <div className="flex items-center">
      <span className={`font-bold text-xl transition-colors ${isScrolled ? 'text-white' : 'text-white'}`}>Gre</span>
      <span className={`font-normal text-xl transition-colors ${isScrolled ? 'text-white' : 'text-white'}`}>TestPrep</span>
      <span className="ml-2 bg-[#7AC86B] text-white text-xs px-2 py-1 rounded font-bold">GRE</span>
    </div>
  </a>
  <div className={`text-xs mt-0.5 ml-10 transition-colors ${isScrolled ? 'text-gray-300' : 'text-white'}`}>
    Prepare with the best. Rock the test.™
  </div>
</div>

        

          {/* Navigation Links */}
          <div className="hidden xl:flex items-center space-x-10">
           
            <a href="#" className={`text-base font-medium transition-colors ${
              isScrolled 
                ? 'text-gray-200 hover:text-emerald-400' 
                : 'text-white hover:text-emerald-400'
            }`}>
               Plans
            </a>
            <a href="/courses" className={`text-base font-medium transition-colors ${
              isScrolled 
                ? 'text-gray-200 hover:text-emerald-400' 
                : 'text-white hover:text-emerald-400'
            }`}>
              Courses
            </a>
            {isAdmin && (
              <a href="/admin/users" className={`text-base font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-200 hover:text-emerald-400' 
                  : 'text-white hover:text-emerald-400'
              }`}>
                Users
              </a>
            )}
            {isAdmin && (
              <a href="/admin/add-course" className={`text-base font-medium transition-colors ${
                isScrolled 
                  ? 'text-gray-200 hover:text-emerald-400' 
                  : 'text-white hover:text-emerald-400'
              }`}>
                Add-course
              </a>
            )}
            <a href="/testimonial" className={`text-base font-medium transition-colors ${
              isScrolled 
                ? 'text-gray-200 hover:text-emerald-400' 
                : 'text-white hover:text-emerald-400'
            }`}>
              Testimonials
            </a>
           
           
            
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className={`transition-all duration-300 ${
                isScrolled 
                  ? 'border-gray-600 text-black hover:bg-gray-800 hover:text-white' 
                  : 'border-white/30 text-black hover:bg-white/10 hover:text-white'
              }`}
              asChild
            >
              <a href="/user/auth">Login</a>
            </Button>
            <Button 
              variant="outline" 
              className={`px-6 py-2.5 text-sm rounded font-semibold transition-all duration-300 ${
              isScrolled 
                ? 'bg-[#7AC86B] text-white hover:bg-emerald-600 shadow-lg' 
                : 'bg-[#7AC86B] text-white hover:bg-emerald-600'
            }`}
              asChild
            >
              <a href="/contact">Enquire Now</a>
            </Button>
           
            {isLoggedIn && !isAdmin && (
              <a
                href="/user/profile"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded transition-colors mr-2 flex items-center"
                style={{ display: 'flex', alignItems: 'center' }}
                title="Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                </svg>
                Profile
              </a>
            )}
            {isLoggedIn && (
              <button
                onClick={() => { logout(); router.push("/"); }}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <button className={`p-2 transition-colors ${
              isScrolled 
                ? 'text-gray-200 hover:text-emerald-400' 
                : 'text-white hover:text-emerald-400'
            }`}>
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