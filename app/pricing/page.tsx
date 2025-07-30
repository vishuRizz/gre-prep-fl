"use client";
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless. The intuitive design allows for quick access to all essential tools, and the support team is always responsive and helpful. I highly recommend DIGIS for anyone looking for a reliable and user-friendly solution in the insurtech and fintech space!",
      author: "Mary Arshani",
      position: "@Assistant manager",
      avatar: "/api/placeholder/40/40",
      rating: null
    },
    {
      id: 2,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless. The intuitive design allows for quick access to all essential tools, and the support team is always responsive and helpful. I highly recommend DIGIS for anyone looking for a reliable and user-friendly solution in the insurtech and fintech space!",
      author: "Mary Arshani",
      position: "@Assistant manager at Insureme",
      avatar: "/api/placeholder/40/40",
      rating: 4.8
    },
    {
      id: 3,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless. The intuitive design allows for quick access to all essential tools, and the support team is always responsive and helpful. I highly recommend DIGIS for anyone looking for a reliable and user-friendly solution in the insurtech and fintech space!",
      author: "Mary Arshani",
      position: "@Assistant manager",
      avatar: "/api/placeholder/40/40",
      rating: null
    },
    {
      id: 4,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless. The intuitive design allows for quick access to all essential tools, and the support team is always responsive and helpful. I highly recommend DIGIS for anyone looking for a reliable and user-friendly solution in the insurtech and fintech space!",
      author: "Mary Arshani",
      position: "@Assistant manager at Insureme",
      avatar: "/api/placeholder/40/40",
      rating: 4.8
    },
    {
      id: 5,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless. The intuitive design allows for quick access to all essential tools, and the support team is always responsive and helpful. I highly recommend DIGIS for anyone looking for a reliable and user-friendly solution in the insurtech and fintech space!",
      author: "Mary Arshani",
      position: "@Assistant manager",
      avatar: "/api/placeholder/40/40",
      rating: null
    },
    {
      id: 6,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless. The intuitive design allows for quick access to all essential tools, and the support team is always responsive and helpful. I highly recommend DIGIS for anyone looking for a reliable and user-friendly solution in the insurtech and fintech space!",
      author: "Mary Arshani",
      position: "@Assistant manager",
      avatar: "/api/placeholder/40/40",
      rating: null
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating) 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'fill-gray-300 text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-900">{rating}</span>
      </div>
    );
  };

  const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0]; className?: string }> = ({ 
    testimonial, 
    className = "" 
  }) => (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        "{testimonial.text}"
      </p>
      
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          </div>
          <div>
            <div className="font-medium text-gray-900 text-sm">{testimonial.author}</div>
            <div className="text-xs text-gray-500">{testimonial.position}</div>
          </div>
        </div>
        
        {testimonial.rating && (
          <div className="flex-shrink-0">
            {renderStars(testimonial.rating)}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-sm font-medium text-blue-600 mb-2 tracking-wide uppercase">
            TESTIMONIALS
          </div>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            We have worked with<br />
            thousands of amazing people
          </h2>
        </div>

        {/* Desktop Layout - 3 columns */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-6">
            {/* Column 1 */}
            <div className="space-y-6">
              <TestimonialCard testimonial={testimonials[0]} />
              <TestimonialCard testimonial={testimonials[3]} />
            </div>
            
            {/* Column 2 */}
            <div className="space-y-6">
              <TestimonialCard testimonial={testimonials[1]} />
              <TestimonialCard testimonial={testimonials[4]} />
            </div>
            
            {/* Column 3 */}
            <div className="space-y-6">
              <TestimonialCard testimonial={testimonials[2]} />
              <TestimonialCard testimonial={testimonials[5]} />
            </div>
          </div>
        </div>

        {/* Medium Screen Layout - 2 columns */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="space-y-6">
              <TestimonialCard testimonial={testimonials[0]} />
              <TestimonialCard testimonial={testimonials[2]} />
              <TestimonialCard testimonial={testimonials[4]} />
            </div>
            
            {/* Column 2 */}
            <div className="space-y-6">
              <TestimonialCard testimonial={testimonials[1]} />
              <TestimonialCard testimonial={testimonials[3]} />
              <TestimonialCard testimonial={testimonials[5]} />
            </div>
          </div>
        </div>

        {/* Mobile Layout - 1 column */}
        <div className="md:hidden">
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;