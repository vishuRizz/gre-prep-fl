"use client";
import React, { useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  experience: string;
  specialties: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Victoria Dunn",
    title: "Director, quality coaching, innovation and impact",
    image: "/inst1.png",
    bio: "Victoria brings over 15 years of experience in educational innovation and quality coaching. She has helped thousands of students achieve their academic goals through personalized learning strategies.",
    experience: "15+ years in education",
    specialties: ["Quality Coaching", "Innovation", "Student Impact", "Curriculum Design"]
  },
  {
    id: 2,
    name: "Marcus Kolb",
    title: "Director, quality coaching, educational and career pathways",
    image: "/inst2.png",
    bio: "Marcus specializes in bridging the gap between academic preparation and career success. His expertise lies in creating comprehensive pathways that align with students' professional aspirations.",
    experience: "12+ years in career counseling",
    specialties: ["Career Pathways", "Educational Guidance", "Professional Development", "Strategic Planning"]
  },
  {
    id: 3,
    name: "Melissa Leavitt",
    title: "Vice president, quality coaching, postsecondary education",
    image: "/inst3.png",
    bio: "Melissa leads our postsecondary education initiatives with a focus on quality coaching and student success. She has transformed learning outcomes for countless students pursuing higher education.",
    experience: "18+ years in higher education",
    specialties: ["Postsecondary Education", "Quality Coaching", "Student Success", "Leadership"]
  },
  {
    id: 4,
    name: "Craig Robinson",
    title: "Senior vice president, quality coaching",
    image: "/inst4.png",
    bio: "Craig oversees our quality coaching programs and sets the strategic direction for educational excellence. His leadership has been instrumental in developing innovative teaching methodologies.",
    experience: "20+ years in educational leadership",
    specialties: ["Strategic Leadership", "Quality Coaching", "Educational Excellence", "Team Development"]
  }
];

const TeamComponent: React.FC = () => {
  const [hoveredMember, setHoveredMember] = useState<TeamMember | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (member: TeamMember, event: React.MouseEvent) => {
    setHoveredMember(member);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (hoveredMember) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseLeave = () => {
    setHoveredMember(null);
  };

  return (
    <div className="bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className=" font-playfair text-5xl md:text-6xl font-light text-gray-900 mb-16">
          Our team
        </h2>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(member, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Member Photo */}
              <div className="mb-6 overflow-hidden rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Member Info */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hover Card */}
        {hoveredMember && (
          <div
            className="fixed z-50 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 w-80 pointer-events-none"
            style={{
              left: mousePosition.x + 20,
              top: mousePosition.y - 100,
              transform: 'translateY(-50%)'
            }}
          >
            <div className="flex items-start space-x-4">
              <img
                src={hoveredMember.image}
                alt={hoveredMember.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-lg mb-1">
                  {hoveredMember.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {hoveredMember.title}
                </p>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <p className="text-sm text-gray-700 leading-relaxed">
                {hoveredMember.bio}
              </p>
              
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-900 mb-1">
                  {hoveredMember.experience}
                </p>
                <div className="flex flex-wrap gap-1">
                  {hoveredMember.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamComponent;