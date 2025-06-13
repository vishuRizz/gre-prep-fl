"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface StudentTestimonial {
  id: number;
  name: string;
  previousScore: string;
  currentScore: string;
  image: string;
  testimonial: string;
  rating: number;
}

const testimonials: StudentTestimonial[] = [
  {
    id: 1,
    name: "Adrianna",
    previousScore: "Q155",
    currentScore: "Q163",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    testimonial: "I studied with two other GRE courses and tutors without getting the improvement I experienced using this one. Target Test Prep was hands down better than any of the other classes or online courses I used.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael",
    previousScore: "Q150",
    currentScore: "Q168",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    testimonial: "TTP's systematic approach and detailed explanations helped me understand concepts I had been struggling with for months. The practice questions were incredibly similar to the actual test.",
    rating: 5
  },
  {
    id: 3,
    name: "Sarah",
    previousScore: "Q145",
    currentScore: "Q160",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    testimonial: "The comprehensive curriculum and adaptive learning system made all the difference. I went from feeling overwhelmed to confident in just 3 months of consistent study.",
    rating: 5
  }
];

const studentAvatars = [
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1519389950473-47ba0277a8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
];

const TTPTestimonialSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-light text-gray-900 mb-4">
            See how TTP helps students{' '}
            <span className="font-playfair text-green-600 font-medium">maximize</span> their{' '}
            <span className="font-playfair font-medium">GRE scores</span>
          </h2>
          <div className="w-16 h-1 bg-green-600"></div>
        </div>

        {/* Main Content - Single Row */}
        <div className="flex items-center justify-between">
          {/* Left Navigation Arrow */}
          <button
            onClick={prevTestimonial}
            className="w-12 h-16 bg-white rounded-full border-2 border-green-200 flex items-center justify-center hover:bg-green-50 transition-colors flex-shrink-0 mr-8"
          >
            <ChevronLeft className="w-6 h-6 text-green-600" />
          </button>

          {/* Student Testimonial */}
          <div className="flex items-start space-x-6 max-w-3xl">
            <div className="flex-shrink-0">
              <img
                src={current.image}
                alt={current.name}
                className="w-54 h-54 rounded-lg object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {current.name}
              </h3>
              <div className="mb-3">
                <span className="text-green-600 font-medium">
                  Improved From {current.previousScore} to {current.currentScore}
                </span>
              </div>
              <div className="flex space-x-1 mb-4">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                {current.testimonial}
              </p>
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={nextTestimonial}
            className="w-12 h-16 bg-white rounded-full border-2 border-[#7AC86B] flex items-center justify-center hover:bg-green-50 transition-colors flex-shrink-0 ml-8"
          >
            <ChevronRight className="w-6 h-6 text-[#7AC86B]" />
          </button>

          {/* Right Side - Statistics with Floating Avatars */}
          <div className="flex-shrink-0 ml-16 w-96">
            <div className="relative">
              {/* TTP Logo and Students */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="text-blue-500 text-2xl font-bold transform rotate-12">≫</div>
                  <div className="text-blue-500 text-xl font-bold">TTP</div>
                  <sup className="text-blue-400 text-xs">™</sup>
                </div>
                <span className="text-gray-600 font-medium">Students</span>
              </div>

              {/* Floating Student Avatars */}
             

              {/* Stats Card */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-left">
                {/* Main Score */}
                <div className="mb-6">
                  <div className="text-5xl font-bold text-[#7AC86B] mb-2">324</div>
                  <div className="text-gray-600 text-sm">
                    Average reported GRE<sup>®</sup> Score
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">Q163</div>
                    <div className="text-gray-600 text-sm">
                      Average reported Quant Score
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">V161</div>
                    <div className="text-gray-600 text-sm">
                      Average reported Verbal Score
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center mt-8">
          {/* Carousel Indicators */}
          <div className="flex space-x-2 mb-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-[#7AC86B]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* CTA Button */}
          <button className="bg-[#7AC86B] hover:bg-[#7AC86B] text-white font-semibold py-4 px-12 rounded-lg text-lg transition-colors">
            TRY THE COURSE FOR FREE
          </button>
        </div>
      </div>
    </div>
  );
};

export default TTPTestimonialSection;
