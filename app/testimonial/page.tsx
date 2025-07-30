"use client";
import React from 'react';
import { Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    // Row 1: Square - Rectangle - Square
    {
      id: 1,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless.",
      author: "Mary Arshani",
      position: "@Assistant manager",
      avatar: "https://tse2.mm.bing.net/th/id/OIP.g5eVyrDL5dJ7zHaEIxsGOAAAAA?r=0&pid=ImgDet&w=206&h=206&c=7&dpr=1.3&o=7&rm=3",
      rating: null
    },
    {
      id: 2,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless. The intuitive design allows for quick access to all essential tools, and the support team is always responsive and helpful. I highly recommend DIGIS for anyone looking for a reliable and user-friendly solution in the insurtech and fintech space!",
      author: "Mary Arshani",
      position: "@Assistant manager at Insureme",
      avatar: "https://tse3.mm.bing.net/th/id/OIP.zS-ejKVl66lMt7fHjNXHuAAAAA?r=0&pid=ImgDet&w=206&h=263&c=7&dpr=1.3&o=7&rm=3",
      rating: 4.8
    },
    {
      id: 3,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless.",
      author: "Mary Arshani",
      position: "@Assistant manager",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: null
    },
    // Row 2: Rectangle - Square - Square
    {
      id: 4,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless. The intuitive design allows for quick access to all essential tools, and the support team is always responsive and helpful. I highly recommend DIGIS for anyone looking for a reliable and user-friendly solution in the insurtech and fintech space!",
      author: "Sarah Johnson",
      position: "@Assistant manager at Insureme",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.8
    },
    {
      id: 5,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless.",
      author: "John Smith",
      position: "@Product manager",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: null
    },
    {
      id: 6,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless.",
      author: "Emily Davis",
      position: "@Operations lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      rating: null
    },
    // Row 3: Square - Rectangle - Square
    {
      id: 7,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless.",
      author: "Michael Brown",
      position: "@Finance director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: null
    },
    {
      id: 8,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless. The intuitive design allows for quick access to all essential tools, and the support team is always responsive and helpful. I highly recommend DIGIS for anyone looking for a reliable and user-friendly solution in the insurtech and fintech space!",
      author: "Lisa Wilson",
      position: "@Tech lead at FinanceCorp",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      rating: 4.9
    },
    {
      id: 9,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless.",
      author: "David Lee",
      position: "@Business analyst",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      rating: null
    },
    // Row 4: Rectangle - Square - Square
    {
      id: 10,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless. The intuitive design allows for quick access to all essential tools, and the support team is always responsive and helpful. I highly recommend DIGIS for anyone looking for a reliable and user-friendly solution in the insurtech and fintech space!",
      author: "Amanda Taylor",
      position: "@VP of Operations at SecureLife",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      rating: 4.7
    },
    {
      id: 11,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless.",
      author: "Robert Garcia",
      position: "@Senior advisor",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: null
    },
    {
      id: 12,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless.",
      author: "Jennifer White",
      position: "@Customer success",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: null
    },
    // Row 5: Square - Rectangle - Square
    {
      id: 13,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless.",
      author: "Chris Martinez",
      position: "@Data scientist",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      rating: null
    },
    {
      id: 14,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless. The intuitive design allows for quick access to all essential tools, and the support team is always responsive and helpful. I highly recommend DIGIS for anyone looking for a reliable and user-friendly solution in the insurtech and fintech space!",
      author: "Rachel Anderson",
      position: "@Head of Innovation at TechInsure",
      avatar: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=face",
      rating: 4.8
    },
    {
      id: 15,
      text: "DIGIS has transformed the way we approach insurance and financial services. With its seamless user interface and innovative features, it has made managing policies and investments effortless.",
      author: "Kevin Thompson",
      position: "@Strategy consultant",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
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
    <div className={`bg-white border border-gray-200 rounded-lg p-6 h-full flex flex-col ${className}`}>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
        "{testimonial.text}"
      </p>
      
      <div className="flex items-start justify-between mt-auto">
        <div className="flex items-center space-x-3">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.author}
            className="w-10 h-10 rounded-full object-cover"
          />
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
        <Navbar/>
        <div className="mb-12 pt-8">
          <div className="text-sm font-medium text-blue-600 mb-2 tracking-wide uppercase">
            TESTIMONIALS
          </div>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            We have worked with<br />
            thousands of amazing people
          </h2>
        </div>

        {/* Desktop Layout - Exact Structure */}
        <div className="hidden lg:block pb-4">
          <div className="space-y-6">
            {/* Row 1: Square - Rectangle - Square */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-3">
                <TestimonialCard testimonial={testimonials[0]} />
              </div>
              <div className="col-span-6">
                <TestimonialCard testimonial={testimonials[1]} />
              </div>
              <div className="col-span-3">
                <TestimonialCard testimonial={testimonials[2]} />
              </div>
            </div>
            
            {/* Row 2: Rectangle - Square - Square */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <TestimonialCard testimonial={testimonials[3]} />
              </div>
              <div className="col-span-3">
                <TestimonialCard testimonial={testimonials[4]} />
              </div>
              <div className="col-span-3">
                <TestimonialCard testimonial={testimonials[5]} />
              </div>
            </div>

            {/* Row 3: Square - Rectangle - Square */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-3">
                <TestimonialCard testimonial={testimonials[6]} />
              </div>
              <div className="col-span-6">
                <TestimonialCard testimonial={testimonials[7]} />
              </div>
              <div className="col-span-3">
                <TestimonialCard testimonial={testimonials[8]} />
              </div>
            </div>

            {/* Row 4: Rectangle - Square - Square */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6">
                <TestimonialCard testimonial={testimonials[9]} />
              </div>
              <div className="col-span-3">
                <TestimonialCard testimonial={testimonials[10]} />
              </div>
              <div className="col-span-3">
                <TestimonialCard testimonial={testimonials[11]} />
              </div>
            </div>

            {/* Row 5: Square - Rectangle - Square */}
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-3">
                <TestimonialCard testimonial={testimonials[12]} />
              </div>
              <div className="col-span-6">
                <TestimonialCard testimonial={testimonials[13]} />
              </div>
              <div className="col-span-3">
                <TestimonialCard testimonial={testimonials[14]} />
              </div>
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
              <TestimonialCard testimonial={testimonials[6]} />
              <TestimonialCard testimonial={testimonials[8]} />
              <TestimonialCard testimonial={testimonials[10]} />
              <TestimonialCard testimonial={testimonials[12]} />
              <TestimonialCard testimonial={testimonials[14]} />
            </div>
            
            {/* Column 2 */}
            <div className="space-y-6">
              <TestimonialCard testimonial={testimonials[1]} />
              <TestimonialCard testimonial={testimonials[3]} />
              <TestimonialCard testimonial={testimonials[5]} />
              <TestimonialCard testimonial={testimonials[7]} />
              <TestimonialCard testimonial={testimonials[9]} />
              <TestimonialCard testimonial={testimonials[11]} />
              <TestimonialCard testimonial={testimonials[13]} />
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
      <Footer/>
    </div>
  );
};

export default TestimonialsSection;