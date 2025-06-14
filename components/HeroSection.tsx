"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

export default function HeroSection () {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      text: "Increased my score from 310 to 332 in just 2 months!",
      author: "Sarah M. • Stanford Admit"
    },
    {
      text: "Perfect 340 score! The adaptive practice was incredible.",
      author: "Michael R. • MIT Admit"
    },
    {
      text: "Went from 305 to 328. Best investment I ever made!",
      author: "Jessica L. • Harvard Admit"
    }
  ];


  return (
    <section className="relative h-[750px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-50"
        style={{
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
        }}
      >
        <source src="/video1.mp4" type="video/mp4" />
        <source src="/video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70 z-10"></div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 h-full flex items-center pt-6">
        
        {/* Left Side - Main Content */}
        <div className="w-full lg:w-3/5 space-y-6">
          
          {/* Badge */}
          {/* <div className="inline-flex items-center bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-300 font-medium text-sm tracking-wide">
                #1 RATED GRE PREP PLATFORM
              </span>
            </div>
          </div> */}

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="font-playfair text-4xl lg:text-6xl text-white leading-tight">
              Master the
              <span className="block text-transparent bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text">
                NEW GRE
              </span>
              <span className="block text-2xl lg:text-3xl font-light text-gray-200 mt-2">
                with confidence
              </span>
            </h1>
          </div>

          {/* Value Proposition */}
          <div className="space-y-3">
            <p className="text-lg lg:text-xl text-gray-200 font-light leading-relaxed">
              Join thousands of students who've achieved their dream scores with our 
              <span className="text-emerald-400 font-medium"> comprehensive prep system</span>
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-base">95% Success Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-base">50,000+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-base">330+ Average Score</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-3 pt-2">
            <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-4 px-8 text-base rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
              START YOUR FREE TRIAL
            </Button>
            
            <p className="text-gray-300 text-sm">
              No credit card required • 7-day full access • Cancel anytime
            </p>
          </div>

          {/* Guarantee */}
          <div className="pt-4 border-t border-gray-600/30">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold text-base">
                  Score 320+ or Get Your Money Back
                </p>
                <p className="text-gray-300 text-sm">
                  Our proven methodology guarantees results
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Simplified Stats & Testimonials */}
        <div className="hidden lg:block w-2/5 pl-12">
          <div className="space-y-8">
            
            {/* Success Metrics - Plain Text */}
            <div className="text-center">
              <h3 className="text-white font-semibold text-xl mb-6">
                Student Success Metrics
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-300 text-sm">Average Score Improvement</p>
                  <p className="text-emerald-400 font-bold text-2xl">+15 pts</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-300 text-sm">Quant Section</p>
                  <p className="text-blue-400 font-bold text-2xl">168</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-300 text-sm">Verbal Section</p>
                  <p className="text-purple-400 font-bold text-2xl">165</p>
                </div>
              </div>
            </div>

            {/* Rotating Testimonials */}
            <div className="text-center">
              <div className="h-32 flex items-center justify-center">
                <div className="transition-all duration-1000 ease-in-out">
                  <p className="text-white text-lg mb-3">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <p className="text-emerald-300 font-medium">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <div className="flex justify-center text-yellow-400 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 text-center py-3">
          <p className="text-gray-900 text-lg font-semibold">
            Join 50,000+ students who chose our platform for the{" "}
            <span className="font-bold">NEW GRE 2024!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

