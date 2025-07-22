"use client";
import React, { useState } from 'react';
import { Check, Star, Play } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const GREPricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const logos = [
    { name: 'Princeton', text: 'Princeton' },
    { name: 'Kaplan', text: 'Kaplan' },
    { name: 'Manhattan', text: 'Manhattan' },
    { name: 'Barrons', text: "Barron's" },
    { name: 'Magoosh', text: 'Magoosh' },
    { name: 'ETS', text: 'ETS' }
  ];

  const getPrice = (basePrice: number) => {
    return billingCycle === 'yearly' ? Math.floor(basePrice * 0.8) : basePrice;
  };

  const FeatureItem: React.FC<{ text: string; included?: boolean; beta?: boolean }> = ({ 
    text, 
    included = true, 
    beta = false 
  }) => (
    <div className="flex items-center space-x-2 text-sm">
      <Check className={`h-4 w-4 ${included ? 'text-green-500' : 'text-gray-300'}`} />
      <span className={included ? 'text-gray-700' : 'text-gray-400'}>
        {text}
        {beta && <span className="ml-1 text-xs bg-green-100 text-green-600 px-1 rounded">Beta</span>}
      </span>
    </div>
  );

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight hidden sm:block">
          One tool for your GRE success.
          <br />
          Free for students to try.
        </h1>
        
        {/* Trusted by section - Hidden on mobile */}
        <div className="mt-12 mb-8 hidden md:block">
          <p className="text-sm text-gray-500 mb-4">Trusted by students at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {logos.map((logo, index) => (
              <div key={index} className="text-gray-400 font-medium text-lg">
                {logo.text}
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Pricing Header */}
        <div className="md:hidden mt-8">
          <h2 className="text-5xl font-bold text-gray-900">Pricing</h2>
        </div>
      </div>

      {/* Pricing Toggle */}
    <div className="max-w-6xl mx-auto px-4 mb-8">
  <div className="flex justify-center items-center space-x-1">
    <div className="flex bg-gray-100 p-1 rounded-full">
      <button
        onClick={() => setBillingCycle('monthly')}
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          billingCycle === 'monthly' ? 'bg-white text-gray-900 shadow' : 'text-gray-500'
        }`}
      >
        Pay monthly
      </button>
      <button
        onClick={() => setBillingCycle('yearly')}
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          billingCycle === 'yearly' ? 'bg-white text-gray-900 shadow' : 'text-gray-500'
        }`}
      >
        Pay yearly
      </button>
    </div>
    <span className="text-sm text-green-600 font-medium ml-4">
      Save up to 20% with yearly
    </span>
    <span className="text-sm text-gray-500 ml-auto hidden md:block">
      Price in USD
    </span>
  </div>
</div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4">
          
          {/* Free Plan */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-sm mx-auto lg:max-w-none lg:mx-0">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">$0</span>
                <span className="text-sm text-gray-500 ml-1">per student / month</span>
              </div>
              <p className="text-sm text-gray-600">
                For individual students to organize study materials and track progress.
              </p>
            </div>
            
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mb-6">
              Sign up
            </button>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-900 mb-3">Free for individual usage</p>
              <FeatureItem text="Basic practice tests" />
              <FeatureItem text="Basic study plans" />
              <FeatureItem text="Progress tracking" />
              <FeatureItem text="Vocabulary flashcards" />
              <FeatureItem text="Basic math review including algebra, geometry, and data analysis" />
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">GRE AI</span>
                </div>
                <div className="text-sm text-gray-600 ml-6">Trial of GRE AI</div>
              </div>
            </div>
          </div>

          {/* Plus Plan */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-sm mx-auto lg:max-w-none lg:mx-0">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Plus</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">${getPrice(15)}</span>
                <span className="text-sm text-gray-500 ml-1">per student / month</span>
              </div>
              <p className="text-sm text-gray-600">
                For dedicated students and tutors to enhance preparation.
              </p>
            </div>
            
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mb-6">
              Get started
            </button>

            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-3">Everything in Free</p>
              <FeatureItem text="Unlimited practice tests" />
              <FeatureItem text="Unlimited essay reviews" />
              <FeatureItem text="Unlimited explanations" />
              <FeatureItem text="Custom study plans" />
              <FeatureItem text="Advanced analytics" />
              <FeatureItem text="Basic tutoring sessions" />
              
              <div className="flex space-x-1 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">GRE AI</span>
                </div>
                <div className="text-sm text-gray-600 ml-6">Trial of GRE AI</div>
              </div>
            </div>
          </div>

          {/* Business Plan - Highlighted */}
          <div className="bg-white border-2 border-green-500 rounded-lg p-6 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Recommended
              </span>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">${getPrice(35)}</span>
                <span className="text-sm text-gray-500 ml-1">per student / month</span>
              </div>
              <p className="text-sm text-gray-600">
                For serious test-takers to maximize their GRE scores.
              </p>
            </div>
            
            <button className="w-full py-2 px-4 bg-[#7AC86B] text-white rounded-md text-sm font-medium hover:bg-green-700 mb-6">
              Get started
            </button>

            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-3">Everything in Plus</p>
              <FeatureItem text="Advanced test prep" />
              <FeatureItem text="Personalized tutoring" />
              <FeatureItem text="1-on-1 coaching sessions" />
              <FeatureItem text="Advanced analytics" />
              <FeatureItem text="Priority support" />
              <FeatureItem text="Score guarantee" />
              <FeatureItem text="Premium study materials" />
              
              <div className="flex space-x-1 mt-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 mb-3">
                  <Star className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">GRE AI</span>
                </div>
                <div className="space-y-2 ml-6">
                  <div className="text-sm text-gray-700">GRE AI included</div>
                  <div className="text-sm text-gray-700">Advanced analytics</div>
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500 ml-1">Beta</span>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-600">AI scoring assistant <span className="text-xs bg-green-100 text-green-600 px-1 rounded">Beta</span></div>
                  <div className="text-sm text-gray-600">Predictive modeling <span className="text-xs bg-green-100 text-green-600 px-1 rounded">Beta</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Testimonial Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">ETS</h2>
          <blockquote className="text-lg text-gray-700 italic mb-6">
            "There's power in a single platform where you can do all your test prep out of. 
            GREPrep is that single place."
          </blockquote>
          <div className="text-sm text-gray-600">
            <div className="font-medium">Sarah Johnson</div>
            <div>Test Prep Director</div>
            <div className="flex items-center justify-center mt-2">
              <Play className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">Watch video →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default GREPricingPage;