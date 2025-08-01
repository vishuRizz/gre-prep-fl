"use client";
import React from 'react';
import { Check, User, Users, Building2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  userType: string;
  userCount: string;
  price: string;
  billing: string;
  buttonText: string;
  buttonAction: 'subscription' | 'demo';
  features: PlanFeature[];
  icon: React.ReactNode;
  highlighted?: boolean;
}

const GRECoursesPage: React.FC = () => {
  const plans: Plan[] = [
    {
      name: "Personal Plan",
      description: "For you",
      userType: "Individual",
      userCount: "1 student",
      price: "₹2,500 per month",
      billing: "Billed monthly or annually. Cancel anytime.",
      buttonText: "Start subscription",
      buttonAction: "subscription",
      icon: <User className="w-5 h-5" />,
      features: [
        { text: "Access to 50+ GRE practice tests", included: true },
        { text: "Verbal and Quantitative prep modules", included: true },
        { text: "Personalized study recommendations", included: true },
        { text: "AI-powered question analysis", included: true },
        { text: "Performance tracking dashboard", included: true },
        { text: "Mobile app access", included: true }
      ]
    },
    {
      name: "Team Plan",
      description: "For your team",
      userType: "Small Groups",
      userCount: "2 to 10 students",
      price: "₹1,800 per month per user",
      billing: "Billed annually. Cancel anytime.",
      buttonText: "Start subscription",
      buttonAction: "subscription",
      icon: <Users className="w-5 h-5" />,
      highlighted: true,
      features: [
        { text: "Access to 75+ GRE practice tests", included: true },
        { text: "Verbal and Quantitative prep modules", included: true },
        { text: "Personalized study recommendations", included: true },
        { text: "AI-powered question analysis", included: true },
        { text: "Group progress analytics and reports", included: true },
        { text: "Collaborative study features", included: true },
        { text: "Priority email support", included: true }
      ]
    },
    {
      name: "Enterprise Plan",
      description: "For your whole organization",
      userType: "Large Organizations",
      userCount: "More than 10 students",
      price: "Contact sales for pricing",
      billing: "",
      buttonText: "Request a demo",
      buttonAction: "demo",
      icon: <Building2 className="w-5 h-5" />,
      features: [
        { text: "Access to 100+ GRE practice tests", included: true },
        { text: "Verbal and Quantitative prep modules", included: true },
        { text: "Personalized study recommendations", included: true },
        { text: "AI-powered question analysis", included: true },
        { text: "Advanced analytics and insights", included: true },
        { text: "Dedicated customer success manager", included: true },
        { text: "Custom content and branding", included: true },
        { text: "Integration with LMS platforms", included: true },
        { text: "On-site training sessions with add-on", included: true },
        { text: "24/7 priority support", included: true }
      ]
    }
  ];

  return (
    <div>
      <Navbar/>

    <div className="min-h-screen bg-white py-12 pt-24 px-4">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Choose a plan for success
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Don't want to buy courses one by one? Pick a plan to help you, your team, or your organization achieve GRE success faster.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl ${
                plan.highlighted 
                  ? 'border-green-500 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-black mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-3">{plan.description}</p>
                
                <div className="flex items-center text-gray-500 mb-4">
                  {plan.icon}
                  <span className="ml-2">{plan.userCount}</span>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bold text-black mb-1">
                    {plan.price}
                  </div>
                  {plan.billing && (
                    <p className="text-sm text-gray-500">{plan.billing}</p>
                  )}
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 flex items-center justify-center group ${
                    plan.highlighted
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-black hover:bg-gray-800 text-white'
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="ml-3 text-gray-700 text-sm leading-relaxed">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      

        {/* FAQ Section */}
        <div className="mt-12 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-black text-center mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h4 className="text-base font-semibold text-black mb-2">
                Can I switch plans anytime?
              </h4>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h4 className="text-base font-semibold text-black mb-2">
                Is there a free trial available?
              </h4>
              <p className="text-gray-600 text-sm">
                We offer a 7-day free trial for all plans so you can experience our GRE prep platform before committing.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h4 className="text-base font-semibold text-black mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600 text-sm">
                We accept all major credit cards, debit cards, UPI, and net banking for Indian customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default GRECoursesPage;