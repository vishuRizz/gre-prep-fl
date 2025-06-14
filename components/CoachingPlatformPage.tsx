import React, { useState, useEffect } from 'react';
import { Users, BarChart3, TrendingUp, Play, Calendar, MessageSquare, Target, Award, Globe, Star } from 'lucide-react';

const CoachingPlatformPage = () => {
  const [activeSection, setActiveSection] = useState(0);

  // Content for each section - now with 4 sections
  const sections = [
    {
      id: 'develop',
      icon: <Award className="w-8 h-8" />,
      title: 'Develop Your Coaching',
      description: 'Join thousands of coaches live each week as industry thought leaders explore the leading edge of coaching. Take part in facilitated practice sessions and discussions and become part of this network of professional coaches.',
      buttonText: 'Read More',
      images: {
        main: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        top: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        right: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        video: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      features: ['Connect', 'Learn', 'Practice']
    },
    {
      id: 'manage',
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Manage Your Coaching',
      description: 'Spend less time managing your business and more time coaching your clients. Manage, track and measure your entire business in one simple to use software.',
      buttonText: 'Read More',
      images: {
        main: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        top: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        right: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        video: 'https://images.unsplash.com/photo-1590402494756-d9544e2ff0e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      features: ['Manage', 'Report', 'Track']
    },
    {
      id: 'scale',
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Scale Your Coaching',
      description: 'Grow your coaching business with an exclusive listing on the world\'s largest directory of professional coaches. Create and sell coaching packages complete with integrated payments and booking.',
      buttonText: 'Read More',
      images: {
        main: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        top: 'https://images.unsplash.com/photo-1552664688-cf412ec27db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        right: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        video: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      features: ['Directory', 'Packages', 'Payments']
    },
    {
      id: 'analytics',
      icon: <Globe className="w-8 h-8" />,
      title: 'Analytics & Insights',
      description: 'Get deep insights into your coaching performance with advanced analytics. Track client progress, measure success rates, and optimize your coaching strategies with data-driven decisions.',
      buttonText: 'Read More',
      images: {
        main: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        top: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        right: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        video: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      features: ['Analytics', 'Insights', 'Optimize']
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.content-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;

        if (scrollPosition >= top && scrollPosition <= bottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentSection = sections[activeSection];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left Side - Scrolling Content */}
          <div className="lg:w-1/2 space-y-16 pt-8">
            {sections.map((section, index) => (
              <div 
                key={section.id}
                className="content-section min-h-[70vh] flex flex-col justify-center py-12"
              >
                <div className="space-y-8">
                  {/* Icon and Title */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#7AC86B] rounded-2xl p-4 text-white flex-shrink-0">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                    {section.description}
                  </p>

                  {/* Read More Button */}
                  <button className="text-[#7AC86B] font-semibold hover:text-[#68B15A] transition-colors">
                    {section.buttonText} →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Sticky Visual Content */}
          <div className="lg:w-1/2 lg:sticky lg:top-8 lg:h-screen flex items-center pt-8">
            <div className="w-full max-w-2xl mx-auto relative overflow-visible">
              <div className="relative overflow-visible">
                {/* Browser Window Frame */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-visible border border-gray-200 relative z-10">
                  {/* Browser Header */}
                  <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-white rounded mx-4 px-3 py-1 text-sm text-gray-500">
                      CoachingPlatform.com
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="relative bg-gradient-to-br from-green-100 to-green-50 p-6 overflow-visible">
                    {/* Main Central Image */}
                    <div className="flex justify-center items-center py-8">
                      <div className="relative">
                        <img 
                          key={currentSection.id + '-main'}
                          src={currentSection.images.main} 
                          alt="Main interface" 
                          className="w-80 h-48 object-cover rounded-xl shadow-xl transition-all duration-1000 ease-in-out opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Floating Card - Positioned outside browser window */}
                <div className="absolute -top-6 left-4 z-30">
                  <div className="bg-[#7AC86B] rounded-lg p-3 shadow-xl transform -rotate-3 hover:rotate-0 transition-all duration-1000 ease-in-out hover:scale-105">
                    <img 
                      key={currentSection.id + '-top'}
                      src={currentSection.images.top} 
                      alt="Team" 
                      className="w-36 h-24 object-cover rounded transition-all duration-1000 ease-in-out"
                    />
                  </div>
                </div>

                {/* Right Side Features - Positioned outside browser window */}
                <div className="absolute top-4 -right-6 z-30 space-y-3">
                  {currentSection.features.map((feature, index) => (
                    <div 
                      key={feature + currentSection.id} 
                      className="bg-white rounded-lg px-4 py-3 shadow-xl flex items-center space-x-2 transform hover:scale-105 transition-all duration-1000 ease-in-out opacity-100"
                      style={{
                        transitionDelay: `${index * 150}ms`,
                        animation: `fadeInSlide 1s ease-out ${index * 150}ms both`
                      }}
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        {index === 0 && <Users className="w-4 h-4 text-[#7AC86B]" />}
                        {index === 1 && <BarChart3 className="w-4 h-4 text-[#7AC86B]" />}
                        {index === 2 && <Target className="w-4 h-4 text-[#7AC86B]" />}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Video/Content - Positioned outside browser window */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-30">
                  <div className="bg-white rounded-lg p-2 shadow-xl transform hover:scale-105 transition-all duration-1000 ease-in-out">
                    <div className="relative">
                      <img 
                        key={currentSection.id + '-video'}
                        src={currentSection.images.video} 
                        alt="Video content" 
                        className="w-52 h-32 object-cover rounded transition-all duration-1000 ease-in-out"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-[#7AC86B] rounded-full flex items-center justify-center shadow-lg hover:bg-[#68B15A] transition-colors duration-300">
                          <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Elements - Positioned outside browser window */}
                <div className="absolute bottom-16 -right-8 z-20">
                  <div className="bg-white rounded-lg p-3 shadow-xl transform hover:scale-105 transition-all duration-1000 ease-in-out">
                    <div className="text-2xl font-bold text-[#7AC86B]">$14,026.98</div>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                </div>

                {/* Additional UI Elements - Positioned outside browser window */}
                <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-20">
                  <div className="bg-[#7AC86B] rounded-lg p-4 w-12 space-y-2 shadow-xl">
                    <div className="w-4 h-1 bg-white/60 rounded transition-all duration-300"></div>
                    <div className="w-4 h-1 bg-white rounded transition-all duration-300"></div>
                    <div className="w-4 h-1 bg-white/60 rounded transition-all duration-300"></div>
                    <div className="w-4 h-1 bg-white/60 rounded transition-all duration-300"></div>
                  </div>
                </div>

                {/* Star Rating - Positioned outside browser window */}
                <div className="absolute -top-4 -right-10 z-20">
                  <div className="bg-yellow-400 rounded-full p-2 shadow-xl transform rotate-12 hover:rotate-0 transition-all duration-1000 ease-in-out">
                    <Star className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                </div>

                {/* Floating Elements Animation */}
                <div className="absolute -top-8 -right-8 w-8 h-8 bg-green-200 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute -bottom-4 -left-6 w-6 h-6 bg-pink-200 rounded-full animate-bounce opacity-70"></div>
                <div className="absolute top-1/4 -right-12 w-4 h-4 bg-blue-200 rounded-full animate-ping opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="w-14 h-14 bg-[#7AC86B] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#68B15A] transition-colors duration-300 hover:scale-110 transform">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CoachingPlatformPage;