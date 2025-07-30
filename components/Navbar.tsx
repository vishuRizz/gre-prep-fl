"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from '@/components/AuthContext';
import { Link, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight - 100;
      setIsScrolled(scrollPosition > viewportHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if we're on the home page
  const isHomePage = pathname === '/';

  // Get text color based on page and scroll state
  const getTextColor = () => {
    if (isHomePage) {
      return 'text-white'; // Always white on home page
    } else {
      return isScrolled ? 'text-white' : 'text-gray-600'; // Gray when not scrolled, white when scrolled on other pages
    }
  };

  // Get hover text color
  const getHoverTextColor = () => {
    if (isHomePage) {
      return 'hover:text-emerald-400';
    } else {
      return isScrolled ? 'hover:text-emerald-400' : 'hover:text-emerald-600';
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
    ? 'bg-gray-200/90 backdrop-blur-md border-b border-gray-300 shadow-md'
    : 'bg-transparent'
}`}>
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex flex-col">
              <a href="/" className="flex items-center">
                {/* Arrow Logo */}
                <div className="mr-2 sm:mr-3">
                  <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-7 sm:h-7">
                    <path d="M2 14L12 4V8H20V10H22V8H24L26 10V18L24 20H22V18H20V20H12V16L2 14Z" fill="#10B981"/>
                    <path d="M12 8H20V10H12V8Z" fill="#10B981"/>
                    <path d="M12 16H20V18H12V16Z" fill="#10B981"/>
                  </svg>
                </div>
                <div className="flex items-center">
                  <span className={`font-bold text-xl sm:text-xl transition-colors ${isHomePage ? 'text-white' : (isScrolled ? 'text-white' : 'text-gray-700')}`}>Gre</span>
                  <span className={`font-normal text-lg sm:text-xl transition-colors ${isHomePage ? 'text-white' : (isScrolled ? 'text-white' : 'text-gray-700')}`}>TestPrep</span>
                  <span className="ml-2 bg-[#7AC86B] text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded font-bold">GRE</span>
                </div>
              </a>
              <div className={`text-xs mt-0.5 ml-8 sm:ml-10 transition-colors hidden sm:block ${isHomePage ? 'text-white' : (isScrolled ? 'text-gray-300' : 'text-gray-500')}`}>
                Prepare with the best. Rock the test.™
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-8 lg:space-x-10">
              <a href="/pricing" className={`text-sm lg:text-base font-medium transition-colors ${getTextColor()} ${getHoverTextColor()}`}>
                PLANS
              </a>
              <a href="/courses" className={`text-sm lg:text-base font-medium transition-colors ${getTextColor()} ${getHoverTextColor()}`}>
                COURSES
              </a>
              {/* Our Locations Dropdown */}
              <div className="relative group">
                <button className={`text-sm lg:text-base font-medium transition-colors ${getTextColor()} ${getHoverTextColor()} flex items-center`}>
                  OUR LOCATIONS
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4 grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Atlanta (Georgia)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in New York (New York)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Los Angeles (California)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in San Francisco (California)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in San Diego (California)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Jacksonville (Florida)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Philadelphia (Pennsylvania)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Miami (Florida)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Seattle (Washington)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Dallas (Texas)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Virginia Beach City (Virginia)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Chicago (Illinois)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Charlotte (North Carolina)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Austin (Texas)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Houston (Texas)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Boston (Massachusetts)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Newark (New Jersey)</a>
                    <a href="#" className="text-sm text-gray-700 hover:text-[#7AC86B] hover:bg-gray-50 px-3 py-2 rounded transition-colors">GRE Prep in Detroit (Michigan)</a>
                  </div>
                </div>
              </div>
              {isAdmin && (
                <a href="/admin/users" className={`text-sm lg:text-base font-medium transition-colors ${getTextColor()} ${getHoverTextColor()}`}>
                  USERS
                </a>
              )}
              {isAdmin && (
                <a href="/admin/add-course" className={`text-sm lg:text-base font-medium transition-colors ${getTextColor()} ${getHoverTextColor()}`}>
                  ADD-COURSE
                </a>
              )}
              <a href="/testimonial" className={`text-sm lg:text-base font-medium transition-colors ${getTextColor()} ${getHoverTextColor()}`}>
                TESTIMONIALS
              </a>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              {!isLoggedIn && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`transition-all duration-300 ${
                      isScrolled 
                        ? 'border-gray-600 text-black hover:bg-gray-800 hover:text-white' 
                        : (isHomePage 
                            ? 'border-white/30 text-black hover:bg-white/10 hover:text-white'
                            : 'border-gray-400 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          )
                    }`}
                    asChild
                  >
                    <a href="/user/auth">LOGIN</a>
                  </Button>
                  <Button 
                    size="sm"
                    className="px-4 lg:px-6 py-2 text-sm font-semibold transition-all duration-300 bg-[#7AC86B] hover:bg-emerald-600 text-white"
                    asChild
                  >
                    <a href="/contact">Try for Free</a>
                  </Button>
                </>
              )}
             
              {isLoggedIn && !isAdmin && (
                <>
                  <Button 
                    size="sm"
                    className="px-4 lg:px-6 py-2 text-sm font-semibold transition-all duration-300 bg-[#7AC86B] hover:bg-emerald-600 text-white"
                    asChild
                  >
                    <a href="/contact">Try for Free</a>
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-green-500 hover:bg-emerald-700 text-white"
                    asChild
                  >
                    <a href="/user/profile" className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                      </svg>
                    </a>
                  </Button>
                </>
              )}

              {isLoggedIn && isAdmin && (
                <>
                  <Button 
                    size="sm"
                    className="px-4 lg:px-6 py-2 text-sm font-semibold transition-all duration-300 bg-[#7AC86B] hover:bg-emerald-600 text-white"
                    asChild
                  >
                    <a href="/contact">Try for Free</a>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleLogout}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Logout
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="xl:hidden">
              <button 
                onClick={toggleMobileMenu}
                className={`p-2 transition-colors ${getTextColor()} ${getHoverTextColor()}`}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 left-0 z-50 h-full w-80 max-w-[85vw] bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out xl:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center">
              <div className="mr-3">
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 14L12 4V8H20V10H22V8H24L26 10V18L24 20H22V18H20V20H12V16L2 14Z" fill="#10B981"/>
                  <path d="M12 8H20V10H12V8Z" fill="#10B981"/>
                  <path d="M12 16H20V18H12V16Z" fill="#10B981"/>
                </svg>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-lg text-white">Gre</span>
                <span className="font-normal text-lg text-white">TestPrep</span>
                <span className="ml-2 bg-[#7AC86B] text-white text-xs px-2 py-1 rounded font-bold">GRE</span>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto py-6">
            {/* Navigation Links */}
            <div className="px-4 space-y-2">
              <a 
                href="/pricing" 
                className="block px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                PLANS
              </a>
              <a 
                href="/courses" 
                className="block px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                COURSES
              </a>
              {/* Mobile Our Locations - Expandable */}
              <div className="block">
                <details className="group">
                  <summary className="block px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors font-medium cursor-pointer list-none">
                    <div className="flex items-center justify-between">
                      OUR LOCATIONS
                      <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="mt-2 pl-4 space-y-1 max-h-60 overflow-y-auto">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Atlanta (Georgia)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in New York (New York)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Los Angeles (California)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in San Francisco (California)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in San Diego (California)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Jacksonville (Florida)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Philadelphia (Pennsylvania)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Miami (Florida)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Seattle (Washington)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Dallas (Texas)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Virginia Beach City (Virginia)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Chicago (Illinois)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Charlotte (North Carolina)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Austin (Texas)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Houston (Texas)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Boston (Massachusetts)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Newark (New Jersey)</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors" onClick={() => setIsMobileMenuOpen(false)}>GRE Prep in Detroit (Michigan)</a>
                  </div>
                </details>
              </div>
              {isAdmin && (
                <a 
                  href="/admin/users" 
                  className="block px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  USERS
                </a>
              )}
              {isAdmin && (
                <a 
                  href="/admin/add-course" 
                  className="block px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ADD COURSE
                </a>
              )}
              <a 
                href="/testimonial" 
                className="block px-4 py-3 text-white hover:bg-gray-700 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                TESTIMONIALS
              </a>
            </div>

            {/* Divider */}
            <div className="my-6 px-4">
              <div className="border-t border-gray-700"></div>
            </div>

            {/* Auth Section */}
            <div className="px-4 space-y-3">
              {!isLoggedIn && (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent border-gray-600 text-white hover:bg-gray-700"
                    asChild
                  >
                    <a href="/user/auth" onClick={() => setIsMobileMenuOpen(false)}>
                      LOGIN
                    </a>
                  </Button>
                  <Button 
                    className="w-full bg-[#7AC86B] hover:bg-emerald-600 text-white"
                    asChild
                  >
                    <a href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Try for Free
                    </a>
                  </Button>
                </>
              )}

              {isLoggedIn && !isAdmin && (
                <>
                  <Button 
                    className="w-full bg-[#7AC86B] hover:bg-emerald-600 text-white"
                    asChild
                  >
                    <a href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Try for Free
                    </a>
                  </Button>
                  <Button
                    variant="default"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    asChild
                  >
                    <a href="/user/profile" className="flex items-center justify-center" onClick={() => setIsMobileMenuOpen(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                      </svg>
                      PROFILE
                    </a>
                  </Button>
                </>
              )}

              {isLoggedIn && isAdmin && (
                <>
                  <Button 
                    className="w-full bg-[#7AC86B] hover:bg-emerald-600 text-white"
                    asChild
                  >
                    <a href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Try for Free
                    </a>
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={handleLogout}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    LOGOUT
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-700">
            <p className="text-xs text-gray-400 text-center">
              Prepare with the best. Rock the test.™
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;