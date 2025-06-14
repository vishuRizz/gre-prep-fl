"use client"
import React, { useState } from 'react';
import { Check, X, Info, Star, Award, Zap } from 'lucide-react';

const GREComparisonTable: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'practice-questions',
      name: 'Practice Questions',
      tooltip: 'Total number of practice questions available across all GRE topics with detailed explanations.',
      us: '5,000+',
      kaplan: '3,000+',
      princeton: '2,500+',
      magoosh: '4,000+',
      manhattan: '2,000+'
    },
    {
      id: 'full-length-tests',
      name: 'Full-Length Practice Tests',
      tooltip: 'Complete GRE practice tests that simulate the actual exam experience.',
      us: '12 Tests',
      kaplan: '8 Tests',
      princeton: '6 Tests',
      magoosh: '10 Tests',
      manhattan: '4 Tests'
    },
    {
      id: 'video-lessons',
      name: 'Video Instruction Hours',
      tooltip: 'Total hours of high-quality instructional video content by expert teachers.',
      us: '120+ Hours',
      kaplan: '80 Hours',
      princeton: '60 Hours',
      magoosh: '90 Hours',
      manhattan: '70 Hours'
    },
    {
      id: 'adaptive-learning',
      name: 'AI-Powered Adaptive Learning',
      tooltip: 'Smart technology that personalizes your study path based on your performance and learning patterns.',
      us: true,
      kaplan: false,
      princeton: false,
      magoosh: true,
      manhattan: false
    },
    {
      id: 'mobile-app',
      name: 'Mobile App Available',
      tooltip: 'Dedicated mobile application for studying anywhere, anytime with offline capabilities.',
      us: true,
      kaplan: true,
      princeton: false,
      magoosh: true,
      manhattan: false
    },
    {
      id: 'live-tutoring',
      name: 'Live 1-on-1 Tutoring',
      tooltip: 'Access to live tutoring sessions with certified GRE experts for personalized guidance.',
      us: true,
      kaplan: true,
      princeton: false,
      magoosh: false,
      manhattan: true
    },
    {
      id: 'score-guarantee',
      name: 'Score Improvement Guarantee',
      tooltip: 'Money-back guarantee if you don\'t achieve the promised score improvement.',
      us: '+7 Points',
      kaplan: '+4 Points',
      princeton: 'None',
      magoosh: '+5 Points',
      manhattan: 'None'
    },
    {
      id: 'pricing',
      name: 'Starting Price',
      tooltip: 'Most affordable plan pricing for accessing the core features of the service.',
      us: '$199',
      kaplan: '$299',
      princeton: '$399',
      magoosh: '$179',
      manhattan: '$449'
    }
  ];

  const companies = [
    {
      key: 'us',
      name: 'GREPrep Pro',
      subtitle: 'Our Platform',
      highlight: true,
      rating: 4.9,
      bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50',
      borderColor: 'border-emerald-300',
      textColor: 'text-emerald-700'
    },
    {
      key: 'kaplan',
      name: 'Kaplan Test Prep',
      subtitle: 'Established Leader',
      highlight: false,
      rating: 4.2,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-800'
    },
    {
      key: 'princeton',
      name: 'Princeton Review',
      subtitle: 'Premium Option',
      highlight: false,
      rating: 4.0,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-800'
    },
    {
      key: 'magoosh',
      name: 'Magoosh GRE',
      subtitle: 'Online Focused',
      highlight: false,
      rating: 4.3,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-800'
    },
    {
      key: 'manhattan',
      name: 'Manhattan Prep',
      subtitle: 'Strategy Experts',
      highlight: false,
      rating: 4.1,
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      textColor: 'text-gray-800'
    }
  ];

  const renderFeatureValue = (value: any, isHighlighted: boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm ${
          isHighlighted ? 'bg-emerald-600' : 'bg-emerald-500'
        }`}>
          <Check className="w-4 h-4 text-white stroke-2" />
        </div>
      ) : (
        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
          <X className="w-4 h-4 text-gray-400" />
        </div>
      );
    }
    return (
      <span className={`text-base font-semibold ${
        isHighlighted ? 'text-emerald-700' : 'text-gray-700'
      }`}>
        {value}
      </span>
    );
  };

  return (
    <div className="w-full max-w-none mx-auto p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen" style={{ transform: 'scale(0.9)', transformOrigin: 'center' }}>
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Award className="w-8 h-8 text-emerald-600" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            GRE Prep Comparison
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Compare the leading GRE preparation services and see why students choose us
        </p>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative" style={{ borderRadius: '20px' }}>
          <div className="grid grid-cols-6 gap-0">
            {/* Feature Column */}
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-l-2xl">
              <div className="p-6 h-32 flex items-center border-b border-gray-700">
                <div className="text-lg font-bold text-white flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Features</span>
                </div>
              </div>

              {features.map((feature) => (
                <div key={feature.id} className="p-6 border-b border-gray-700 relative min-h-[80px] flex items-center">
                  <div className="flex items-center space-x-3 w-full">
                    <Info
                      className="w-5 h-5 text-gray-300 cursor-pointer hover:text-white transition-colors flex-shrink-0"
                      onMouseEnter={() => setHoveredFeature(feature.id)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    />
                    <span className="text-base font-medium text-white leading-tight">{feature.name}</span>
                  </div>

                  {/* Tooltip */}
                  {hoveredFeature === feature.id && (
                    <div className="absolute left-full ml-4 top-4 w-72 p-4 bg-gray-900 text-white text-sm rounded-xl shadow-2xl z-20 border border-gray-700">
                      {feature.tooltip}
                      <div className="absolute left-0 top-6 w-3 h-3 bg-gray-900 transform rotate-45 -translate-x-1.5 border-l border-t border-gray-700"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Company Columns */}
            {companies.map((company) => (
              <div key={company.key} className={`${company.bgColor} ${company.borderColor} border-r relative`}>
                {company.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-50">
                    {/* <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1 relative">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Best Choice</span>
                    </div> */}
                  </div>
                )}

                <div className="p-6 h-32 flex flex-col justify-center items-center border-b border-gray-200">
                  <h3 className={`text-lg font-bold text-center mb-1 ${company.textColor}`}>
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{company.subtitle}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">{company.rating}/5</span>
                  </div>
                </div>

                {features.map((feature) => (
                  <div key={feature.id} className="p-6 border-b border-gray-200 min-h-[80px] flex items-center justify-center">
                    {renderFeatureValue(feature[company.key as keyof typeof feature], company.highlight)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-6">
        {companies.map((company) => (
          <div key={company.key} className={`${company.bgColor} rounded-2xl overflow-hidden shadow-xl border-2 ${company.borderColor} relative`} style={{ borderRadius: '20px' }}>
            {company.highlight && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1 relative">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Best Choice</span>
                </div>
              </div>
            )}

            <div className="p-6 border-b border-gray-200 text-center">
              <h3 className={`text-xl font-bold mb-1 ${company.textColor}`}>
                {company.name}
              </h3>
              <p className="text-gray-500 mb-3">{company.subtitle}</p>
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-600">{company.rating}/5</span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between py-2">
                  <span className="text-base font-medium text-gray-700 flex-1">{feature.name}</span>
                  <div className="flex items-center ml-4">
                    {renderFeatureValue(feature[company.key as keyof typeof feature], company.highlight)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
          Get Started Today
        </button>
      </div>
    </div>
  );
};

export default GREComparisonTable;
