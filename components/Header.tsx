import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface GREHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

const GREHeader: React.FC<GREHeaderProps> = ({ 
  breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'GRE Prep Courses' }
  ]
}) => {
  return (
    <>
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[350px] bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80')`
      }}>
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 py-12 text-center">
          
          {/* Main Title */}
          <h1 className="text-2xl md:text-2xl lg:text-2xl pt-30  text-yellow-400 mb-8 tracking-wider">
            COURSES AND PRICING
          </h1>
          
          {/* Subtitle Text */}
          <p className="text-white text-base md:text-lg lg:text-xl max-w-5xl leading-relaxed font-light mb-8">
            We offer fantastic Personalized GRE Prep Programs which are extremely successful & 
            popular with busy working professionals (and with a fantastic Success Rate of over 92%)
          </p>
          
          {/* Breadcrumb Navigation */}
          <div className="bg-white rounded-full px-8 py-3 mt-20px shadow-lg">
            <nav className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {crumb.href ? (
                    <Link 
                      href={crumb.href}
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-blue-600 font-medium">
                      {crumb.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-blue-500 mx-2 font-bold">•</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* White Section with Course Information */}
      <div className="bg-gray-50 pt-16">
        <div className="container mx-auto px-6 text-center">
          
          {/* Our Courses Label with Yellow Line */}
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-blue-400 text-lg font-normal mb-2 tracking-wide">
              Our Courses
            </h2>
            <div className="w-16 h-0.5 bg-yellow-400"></div>
          </div>
          
          {/* Main Heading */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 mb-6 leading-tight font-serif">
            Our Exclusively Designed <span className="font-semibold">GRE Prep Courses</span> are<br/>
            Perfect for Busy Working Professionals
          </h3>
          
          {/* Description Text */}
          <p className="text-gray-700 text-base md:text-lg max-w-4xl mx-auto leading-relaxed mb-12 font-normal">
            'The GRE Coach' offers perfectly designed Prep Courses that seamlessly align into your busy schedules. It focuses on Personalized Care, 
            Learning & Development into all Sections of the GRE Test.
          </p>
          
        </div>
      </div>
    </>
  );
};

export default GREHeader;