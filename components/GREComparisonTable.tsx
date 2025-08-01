"use client";
import React from 'react';
import { Check, X, Info, ArrowRight } from 'lucide-react';

interface FeatureItem {
  name: string;
  description?: string;
  personal: boolean | string | number;
  team: boolean | string | number;
  enterprise: boolean | string | number;
  hasTooltip?: boolean;
}

interface FeatureSection {
  title: string;
  features: FeatureItem[];
}

const GREComparisonTable: React.FC = () => {
  const featureSections: FeatureSection[] = [
    {
      title: "Learner experience",
      features: [
        {
          name: "Top-rated courses",
          personal: "50,000+",
          team: "75,000+",
          enterprise: "100,000+",
          hasTooltip: true
        },
        {
          name: "GRE practice tests and question banks",
          personal: true,
          team: true,
          enterprise: true,
          hasTooltip: true
        },
        {
          name: "AI-powered question analysis",
          personal: true,
          team: true,
          enterprise: true
        },
        {
          name: "Goal-aligned recommendations",
          personal: true,
          team: true,
          enterprise: true
        },
        {
          name: "Instructor Q&A",
          personal: true,
          team: true,
          enterprise: true
        },
        {
          name: "Mobile app access",
          personal: true,
          team: true,
          enterprise: true
        }
      ]
    },
    {
      title: "Admin experience",
      features: [
        {
          name: "User adoption and engagement reports",
          personal: false,
          team: true,
          enterprise: true
        },
        {
          name: "24/7 customer support",
          personal: false,
          team: true,
          enterprise: true
        },
        {
          name: "Custom learning paths, content, and user groups",
          personal: false,
          team: false,
          enterprise: true,
          hasTooltip: true
        },
        {
          name: "User activity, learning trends, and benchmark insights",
          personal: false,
          team: false,
          enterprise: true,
          hasTooltip: true
        },
        {
          name: "Integration capabilities",
          personal: false,
          team: false,
          enterprise: true,
          hasTooltip: true
        }
      ]
    },
    {
      title: "GRE Pro add-on for tech learners",
      features: [
        {
          name: "Skills assessments",
          personal: false,
          team: false,
          enterprise: true,
          hasTooltip: true
        },
        {
          name: "Labs and technical workspaces",
          personal: false,
          team: false,
          enterprise: true,
          hasTooltip: true
        },
        {
          name: "Pre-built paths",
          personal: false,
          team: false,
          enterprise: true,
          hasTooltip: true
        },
        {
          name: "Advanced Insights",
          personal: false,
          team: false,
          enterprise: true,
          hasTooltip: true
        }
      ]
    }
  ];

  const renderFeatureValue = (value: boolean | string | number) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-300 mx-auto" />
      );
    }
    return <span className="text-sm font-medium text-gray-900">{value}</span>;
  };

  return (
    <div className="max-w-8xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black mb-2">Compare plans and features</h2>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
          <div className="p-6">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">Included in plan</span>
            </div>
            <div className="flex items-center mt-2">
              <X className="w-4 h-4 text-gray-300 mr-2" />
              <span className="text-sm font-medium text-gray-600">Available with add-on</span>
            </div>
          </div>
          
          {/* Plan Headers */}
          <div className="p-6 text-center border-l border-gray-200">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg mb-3">
              <h3 className="font-bold text-sm">Personal Plan</h3>
            </div>
            <p className="text-xs text-gray-600 mb-3">Starting at ₹2500 per month</p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors duration-300 flex items-center mx-auto">
              Start subscription
              <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          </div>

          <div className="p-6 text-center border-l border-gray-200">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg mb-3">
              <h3 className="font-bold text-sm">Team Plan</h3>
            </div>
            <p className="text-xs text-gray-600 mb-1">₹1,800 a month per user</p>
            <p className="text-xs text-gray-500 mb-3">2-10 people</p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors duration-300 flex items-center mx-auto">
              Start subscription
              <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          </div>

          <div className="p-6 text-center border-l border-gray-200">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg mb-3">
              <h3 className="font-bold text-sm">Enterprise Plan</h3>
            </div>
            <p className="text-xs text-gray-600 mb-1">Contact sales for pricing</p>
            <p className="text-xs text-gray-500 mb-3">More than 10 people</p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors duration-300 flex items-center mx-auto">
              Request a demo
              <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          </div>
        </div>

        {/* Feature Sections */}
        {featureSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {/* Section Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h4 className="font-bold text-gray-900">{section.title}</h4>
            </div>

            {/* Features */}
            {section.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="grid grid-cols-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                <div className="p-4 flex items-center">
                  <span className="text-sm text-gray-700 flex items-center">
                    {feature.name}
                    {feature.hasTooltip && (
                      <Info className="w-4 h-4 text-gray-400 ml-2 cursor-help" />
                    )}
                  </span>
                </div>
                
                <div className="p-4 text-center flex items-center justify-center border-l border-gray-100">
                  {renderFeatureValue(feature.personal)}
                </div>
                
                <div className="p-4 text-center flex items-center justify-center border-l border-gray-100">
                  {renderFeatureValue(feature.team)}
                </div>
                
                <div className="p-4 text-center flex items-center justify-center border-l border-gray-100">
                  {renderFeatureValue(feature.enterprise)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Ready to get started? Choose the plan that's right for you.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300">
            Start Free Trial
          </button>
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors duration-300">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default GREComparisonTable;