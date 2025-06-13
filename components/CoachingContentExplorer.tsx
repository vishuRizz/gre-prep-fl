import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ContentCard {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const CoachingContentExplorer: React.FC = () => {
  const contentCards: ContentCard[] = [
    {
      id: 'blog',
      title: 'Coaching World Blog',
      description: 'Dive into the pulse of coaching! Explore the latest breakthroughs, trends, and innovations in this dynamic industry.',
      image: '/image1.jpg',
      alt: 'Two professionals having a coaching conversation in a modern office setting'
    },
    {
      id: 'thought-leadership',
      title: 'Thought Leadership',
      description: 'Stay ahead of the curve. Immerse yourself in expert insights on topics that impact our future world.',
      image: '/image2.jpg',
      alt: 'Professional woman presenting to an audience in a conference room'
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      description: 'Unlock inspiration with these real-life coaching success stories that reached remarkable transformative results.',
      image: '/image3.jpg',
      alt: 'Two women collaborating on a laptop in a professional setting'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 ">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
        <div className="max-w-2xl">
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Explore the Coaching{' '}
            <span className="text-[#7AC86B]">
              Content You Need
            </span>
          </h1>
          <p className=" text-lg text-slate-600 leading-relaxed">
            Maximize your impact with actionable tips, the latest coaching trends, 
            thought leadership insights, and much more.
          </p>
        </div>
        
        <Button 
          size="lg"
          className="bg-[#7AC86B] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
        >
          Explore Our Resource Library
        </Button>
      </div>

      {/* Content Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contentCards.map((card) => (
          <div
            key={card.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden h-64">
              <img 
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#7AC86B] transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                {card.description}
              </p>
              
              {/* Arrow Button */}
              <button className="group/arrow inline-flex items-center justify-center w-12 h-12 bg-slate-100 hover:bg-[#7AC86B] rounded-full transition-all duration-300 hover:shadow-lg">
                <ArrowRight 
                  className="w-5 h-5 text-slate-600 group-hover/arrow:text-white transition-colors duration-300 group-hover/arrow:translate-x-1" 
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl animate-pulse delay-1000" />
    </div>
  );
};

export default CoachingContentExplorer;