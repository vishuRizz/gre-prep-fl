import React, { useState, useEffect } from 'react';
import { Users, BarChart3, TrendingUp, Play, Calendar, MessageSquare, Target, Award, Globe, Star, BookOpen, Brain } from 'lucide-react';

const GREPrepPlatform = () => {
  const [activeSection, setActiveSection] = useState(0);

  // Content for each section - GRE prep student success steps
  const sections = [
    {
      id: 'assess',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Step 1: Assess & Diagnose',
      description: 'We start by understanding exactly where you stand. Our comprehensive diagnostic test identifies your strengths and weaknesses across all GRE sections - Verbal Reasoning, Quantitative Reasoning, and Analytical Writing. This isn\'t just about finding gaps; it\'s about creating a personalized roadmap that maximizes your score improvement potential.',
      buttonText: 'Take Diagnostic Test',
      images: {
        main: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        top: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        right: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        video: 'https://www.coaching.com/wp-content/themes/coaching-com/assets/img/pages/home24/animation/animation_1_bottom.mp4?v2'
      },
      features: ['Diagnostic Test', 'Skill Analysis', 'Goal Setting']
    },
    {
      id: 'plan',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Step 2: Personalized Study Plan',
      description: 'Based on your diagnostic results, we create a customized study plan that adapts to your pace and progress. Our algorithm considers your current skill level, target score, available study time, and preferred learning methods to design the most efficient path forward. The plan includes daily study schedules, weekly milestones, and strategic practice sessions that focus on high-impact areas.',
      buttonText: 'View Sample Plan',
      images: {
        main: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        top: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        right: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        video: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      features: ['Custom Schedule', 'Adaptive Learning', 'Progress Tracking']
    },
    {
      id: 'practice',
      icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Step 3: Intensive Practice & Mastery',
      description: 'This is where transformation happens. Our extensive question bank contains over 5,000 practice questions that mirror the actual GRE format and difficulty levels. Each practice session is strategically designed to reinforce weak areas while maintaining your strengths. We use advanced analytics to track your performance patterns, identify recurring mistakes, and adjust the difficulty level.',
      buttonText: 'Start Practice',
      images: {
        main: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        top: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        right: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        video: 'https://images.unsplash.com/photo-1596496181848-3091d4878b24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      features: ['5000+ Questions', 'Mock Tests', 'Performance Analytics']
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 lg:gap-16 items-start">
          {/* Left Side - Scrolling Content */}
          <div className="w-full lg:w-1/2 space-y-8 sm:space-y-12 lg:space-y-16 pt-8 sm:pt-12 lg:pt-16">
            {sections.map((section, index) => (
              <div 
                key={section.id}
                className="content-section min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex flex-col justify-center py-8 sm:py-12 lg:py-16"
              >
                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                  {/* Icon and Title */}
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-[#7AC86B] rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 text-white flex-shrink-0">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {section.description}
                  </p>

                  {/* Read More Button */}
                  <button className="bg-[#7AC86B] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#68B15A] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base">
                    {section.buttonText} →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Sticky Visual Content */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-8 lg:h-screen flex items-center pt-8 sm:pt-12 lg:pt-16 order-first lg:order-last">
            <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto relative overflow-visible">
              <div className="relative overflow-visible">
                {/* Browser Window Frame */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-visible border border-gray-200 sm:border-2 relative z-10">
                  {/* Browser Header */}
                  <div className="bg-gray-100 px-2 sm:px-4 py-2 sm:py-3 flex items-center space-x-1 sm:space-x-2 border-b border-gray-200">
                    <div className="flex space-x-1 sm:space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-white rounded mx-2 sm:mx-4 px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-500">
                      GREPrep.com/dashboard
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="relative bg-gradient-to-br from-green-100 to-green-50 overflow-visible">
                    {/* Main Central Image */}
                    <div className="flex justify-center items-center py-4 sm:py-6 lg:py-8 px-2 sm:px-4">
                      <div className="relative">
                        <img 
                          key={currentSection.id + '-main'}
                          src={currentSection.images.main} 
                          alt="GRE Prep Dashboard" 
                          className="w-64 h-40 sm:w-80 sm:h-52 lg:w-100 lg:h-68 object-cover rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl transition-all duration-1000 ease-in-out opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-lg sm:rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Floating Card - Responsive positioning */}
                <div className="absolute top-8 sm:top-12 -left-6 sm:-left-8 lg:-left-12 z-30">
                  <div className="bg-[#7AC86B] rounded-md sm:rounded-lg p-1.5 sm:p-2 shadow-lg sm:shadow-xl transform -rotate-3 hover:rotate-0 transition-all duration-1000 ease-in-out hover:scale-105">
                    <img 
                      key={currentSection.id + '-top'}
                      src={currentSection.images.top} 
                      alt="Study Materials" 
                      className="w-20 h-12 sm:w-28 sm:h-16 lg:w-36 lg:h-24 object-cover rounded transition-all duration-1000 ease-in-out transform"
                      style={{
                        animation: `slideInFromLeft 1s ease-out`
                      }}
                    />
                  </div>
                </div>

                {/* Right Side Features - Responsive positioning and sizing */}
                <div className="absolute top-2 sm:top-4 -right-8 sm:-right-10 lg:-right-12 z-30 space-y-1.5 sm:space-y-2 lg:space-y-3">
                  {currentSection.features.map((feature, index) => (
                    <div 
                      key={feature + currentSection.id} 
                      className="bg-white rounded-md sm:rounded-lg px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 shadow-lg sm:shadow-xl flex items-center space-x-1.5 sm:space-x-2 transform hover:scale-105 transition-all duration-1000 ease-in-out opacity-100"
                      style={{
                        transitionDelay: `${index * 150}ms`,
                        animation: `slideInFromRight 1s ease-out ${index * 150}ms both`
                      }}
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-md sm:rounded-lg flex items-center justify-center">
                        {index === 0 && <Users className="w-3 h-3 sm:w-4 sm:h-4 text-[#7AC86B]" />}
                        {index === 1 && <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-[#7AC86B]" />}
                        {index === 2 && <Target className="w-3 h-3 sm:w-4 sm:h-4 text-[#7AC86B]" />}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Video/Content - Responsive positioning */}
                <div className="absolute -bottom-8 sm:-bottom-10 lg:-bottom-12 left-1/2 transform -translate-x-1/2 z-30">
                  <div className="bg-white rounded-md sm:rounded-lg p-1.5 sm:p-2 shadow-lg sm:shadow-xl transform hover:scale-105 transition-all duration-1000 ease-in-out">
                    <div className="relative">
                      <img 
                        key={currentSection.id + '-video'}
                        src={currentSection.images.video} 
                        alt="Video Lessons" 
                        className="w-32 h-20 sm:w-40 sm:h-24 lg:w-52 lg:h-32 object-cover rounded transition-all duration-1000 ease-in-out transform"
                        style={{
                          animation: `slideInFromBottom 1s ease-out`
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#7AC86B] rounded-full flex items-center justify-center shadow-lg hover:bg-[#68B15A] transition-colors duration-300">
                          <Play className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white ml-0.5 sm:ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Elements - Students count - Responsive */}
                <div className="absolute bottom-12 sm:bottom-14 lg:bottom-16 -right-4 sm:-right-6 lg:-right-8 z-20">
                  <div className="bg-white rounded-md sm:rounded-lg p-2 sm:p-3 shadow-lg sm:shadow-xl transform hover:scale-105 transition-all duration-1000 ease-in-out">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#7AC86B]">12,847</div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                </div>

                {/* Additional UI Elements - Responsive */}
                <div className="absolute top-1/2 -left-2 sm:-left-3 lg:-left-4 transform -translate-y-1/2 z-20">
                  <div className="bg-[#7AC86B] rounded-md sm:rounded-lg p-2 sm:p-3 lg:p-4 w-8 sm:w-10 lg:w-12 space-y-1 sm:space-y-2 shadow-lg sm:shadow-xl">
                    <div className="w-3 sm:w-4 h-0.5 sm:h-1 bg-white/60 rounded transition-all duration-300"></div>
                    <div className="w-3 sm:w-4 h-0.5 sm:h-1 bg-white rounded transition-all duration-300"></div>
                    <div className="w-3 sm:w-4 h-0.5 sm:h-1 bg-white/60 rounded transition-all duration-300"></div>
                    <div className="w-3 sm:w-4 h-0.5 sm:h-1 bg-white/60 rounded transition-all duration-300"></div>
                  </div>
                </div>

                {/* Star Rating - Responsive */}
                <div className="absolute -top-1 sm:-top-2 -right-6 sm:-right-8 lg:-right-10 z-20">
                  <div className="bg-yellow-400 rounded-full p-1.5 sm:p-2 shadow-lg sm:shadow-xl transform rotate-12 hover:rotate-0 transition-all duration-1000 ease-in-out">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" />
                  </div>
                </div>

                {/* Floating Elements Animation - Responsive sizes */}
                <div className="absolute -top-4 sm:-top-6 lg:-top-8 -right-4 sm:-right-6 lg:-right-8 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-green-200 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute -bottom-2 sm:-bottom-3 lg:-bottom-4 -left-3 sm:-left-4 lg:-left-6 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-pink-200 rounded-full animate-bounce opacity-70"></div>
                <div className="absolute top-1/4 -right-6 sm:-right-8 lg:-right-12 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-blue-200 rounded-full animate-ping opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget - Responsive */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#7AC86B] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#68B15A] transition-colors duration-300 hover:scale-110 transform">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default GREPrepPlatform;