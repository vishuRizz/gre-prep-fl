"use client"
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Play, HelpCircle } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  number: string;
  description: string;
  isVisible: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ icon, number, description, isVisible }) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const targetNumber = parseInt(number.replace(/,/g, ''));
  
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const startValue = 0;
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (targetNumber - startValue) * easeOutQuart);
      
      setDisplayNumber(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, targetNumber]);
  
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };
  
  return (
    <div className="flex flex-col items-center text-center text-white space-y-2">
      <div className="w-12 h-8 rounded-full border-2 border-white/30 flex items-center justify-center mb-2">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold tracking-tight">
        {formatNumber(displayNumber)}
      </div>
      <div className="text-sm md:text-base font-medium uppercase tracking-wide opacity-90 max-w-32">
        {description}
      </div>
    </div>
  );
};

const GREStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the component is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before fully visible
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);
  
  // Decorative dots pattern
  const DotsPattern = ({ className }: { className?: string }) => (
    <div className={`absolute ${className}`}>
      <div className="grid grid-cols-6 gap-2 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="w-2 h-2 bg-white rounded-full" />
        ))}
      </div>
    </div>
  );

  return (
    <div ref={sectionRef} className="relative bg-[#7AC86B] py-14 px-8 overflow-hidden">
      {/* Decorative background dots */}
      <DotsPattern className="top-8 left-8" />
      <DotsPattern className="bottom-8 right-8" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Join over 190,000 students who have
            <br />
            chosen us for their GRE prep
          </h2>
          <div className="w-16 h-1 bg-white mx-auto mt-6"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <StatItem
            icon={<BookOpen className="w-6 h-6" />}
            number="6,183,777"
            description="Practice Questions Answered"
            isVisible={isVisible}
          />
          <StatItem
            icon={<Play className="w-6 h-6" />}
            number="9,773,908"
            description="Minutes of Video Watched"
            isVisible={isVisible}
          />
          <StatItem
            icon={<HelpCircle className="w-6 h-6" />}
            number="440,334"
            description="Quizzes Completed"
            isVisible={isVisible}
          />
        </div>
      </div>
    </div>
  );
};

export default GREStats;