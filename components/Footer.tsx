import React from 'react';
import { ChevronRight, MapPin, Mail, Phone } from 'lucide-react';
import Link  from  'next/link';
const Footer: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-50 via-green-100 to-[#7AC86B] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Icon */}
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl shadow-lg">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#7AC86B] rounded-md sm:rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">G</span>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className=" font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 sm:mb-8 leading-tight px-2">
            Get started with<br />
            GRE Prep today!
          </h1>

          {/* Feature Points */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 text-xs sm:text-sm px-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#7AC86B] rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-gray-700 font-medium">Personalized Study Plans</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#7AC86B] rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-gray-700 font-medium">Expert GRE Instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-gray-700 font-medium">Score Improvement Guarantee</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <Link href="/contact">
            <button className="w-full sm:w-auto bg-[#7AC86B] hover:bg-green-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
             Contact Us
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            </Link>
            <Link href="/courses">
            <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium border border-gray-200 transition-colors text-sm sm:text-base">
              Learn More
            </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Footer Section */}  
      <div className="bg-white py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Side - Company Info */}
            <div className="space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#7AC86B] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">GRE Prep</span>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>123 Education St, Learning City, LC 12345</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>info@greprep.co</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>1-800-GRE-PREP</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3 pt-4">
                <div className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-gray-600 font-medium">X</span>
                </div>
                <div className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-gray-600 font-medium">in</span>
                </div>
                <div className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-gray-600 font-medium">ig</span>
                </div>
                <div className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-gray-600 font-medium">fb</span>
                </div>
              </div>
            </div>

            {/* Right Side - Footer Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Courses */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Courses</h3>
                <ul className="space-y-3 text-gray-600">
                  <li><a href="#" className="hover:text-gray-900 transition-colors">GRE General</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Quantitative</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Verbal</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Writing</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
                <ul className="space-y-3 text-gray-600">
                  <li><a href="#" className="hover:text-gray-900 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Why GRE Prep</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Success Stories</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Testimonials</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                <ul className="space-y-3 text-gray-600">
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Help Center</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;