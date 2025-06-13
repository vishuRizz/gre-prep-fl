// components/PricingSection.tsx
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

const PricingSection: React.FC = () => {
  return (
    <div className="py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-700 mb-12">
          GRE Prep for Your Best Score
        </h2>
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 justify-items-center">
          {/* First row - Top 3 cards */}
          {/* GRE 162+ Card */}
          <div className="relative w-full max-w-sm lg:col-span-2">
            <div className="absolute -top-4 left-0 right-0 z-10">
              <div className="bg-gray-800 text-yellow-400 font-semibold px-6 py-2 rounded-t-3xl text-center text-sm">
                Most Popular
              </div>
            </div>
            <Card className="rounded-3xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200 pt-8 h-full ">
              <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-emerald-600 text-sm font-medium">LiveOnline</span>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">GRE 162+</CardTitle>
                <CardDescription className="text-gray-600 text-center px-4">
                  Target a 162+ score with expert-led prep
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-8 flex-1 flex flex-col">
                <div className="border-t border-gray-200 pt-6 mb-6 flex-1">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-left">45 hours of live instruction</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-left">Score a 162+, guaranteed or your money back*</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-gray-400 line-through text-lg">$2,399</span>
                    <span className="text-3xl font-bold text-gray-900">$2,099</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    As low as $88/mo or 0% APR <span className="underline">with Affirm</span>
                  </p>
                </div>
                
                <Button className="w-full bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-[#2f835d] hover:text-white font-semibold py-3 rounded-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* GRE 165+ Tutoring Card */}
          <div className="w-full max-w-sm lg:col-span-2">
            <Card className="rounded-3xl shadow-lg hover:shadow-xl transition-shadow border-2  h-full">
              <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-emerald-600 text-sm font-medium">LiveOnline</span>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">GRE 165+ Tutoring</CardTitle>
                <CardDescription className="text-gray-600 text-center px-4">
                  Elite tutoring for top GRE results
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-8 flex-1 flex flex-col">
                <div className="border-t border-gray-200 pt-6 mb-6 flex-1">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-left">32 hours of 1:1 tutoring</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-left">Score a 165+, guaranteed or your money back*</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">$156/hr</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    As low as $209/mo or 0% APR <span className="underline">with Affirm</span>
                  </p>
                </div>
                
                <Button className="w-full bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-[#2f835d]  hover:text-white font-semibold py-3 rounded-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* GRE 10 Points+ Card */}
          <div className="w-full max-w-sm lg:col-span-2">
            <Card className="rounded-3xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200 h-full">
              <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-600 text-sm font-medium">Self-Led</span>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">GRE 10 Points+</CardTitle>
                <CardDescription className="text-gray-600 text-center px-4">
                  A structured plan to add 10 points to your score in 1-3 months
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-8 flex-1 flex flex-col">
                <div className="border-t border-gray-200 pt-6 mb-6 flex-1">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-left">Improve your score by 10 points, or your money back*</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-gray-400 line-through text-lg">$999</span>
                    <span className="text-3xl font-bold text-gray-900">$699</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    As low as $59/mo or 0% APR <span className="underline">with Affirm</span>
                  </p>
                </div>
                
                <Button className="w-full bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-[#2f835d]  hover:text-white font-semibold py-3 rounded-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Self-Paced Card */}
          <div className="w-full max-w-sm md:col-start-1 lg:col-start-2 lg:col-span-2">
            <Card className="rounded-3xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200 h-full">
              <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-600 text-sm font-medium">Self-Led</span>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Self-Paced</CardTitle>
                <CardDescription className="text-gray-600 text-center px-4">
                  Flexible prep designed to boost your score
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-8 flex-1 flex flex-col">
                <div className="border-t border-gray-200 pt-6 mb-6 flex-1">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-left">On-the-go access to drills and video-based lessons</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-gray-400 line-through text-lg">$499</span>
                    <span className="text-3xl font-bold text-gray-900">$399</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    4 interest-free payments or as low as $34/mo <span className="underline">with Affirm</span>
                  </p>
                </div>
                
                <Button className="w-full bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-[#2f835d] hover:text-white font-semibold py-3 rounded-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Fundamentals Card */}
          <div className="w-full max-w-sm md:col-start-2 lg:col-start-4 lg:col-span-2">
            <Card className="rounded-3xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200 h-full">
              <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-emerald-600 text-sm font-medium">LiveOnline</span>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Fundamentals</CardTitle>
                <CardDescription className="text-gray-600 text-center px-4">
                  Focused prep with essential strategies and content to boost your score
                </CardDescription>
              </CardHeader>
              
              <CardContent className="px-8 pb-8 flex-1 flex flex-col">
                <div className="border-t border-gray-200 pt-6 mb-6 flex-1">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-left">24 hours of expert-led live instruction</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-gray-400 line-through text-lg">$1,199</span>
                    <span className="text-3xl font-bold text-gray-900">$1,099</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    As low as $62/mo or 0% APR <span className="underline">with Affirm</span>
                  </p>
                </div>
                
                <Button className="w-full bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-[#2f835d] hover:text-white font-semibold py-3 rounded-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;