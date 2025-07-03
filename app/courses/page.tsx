"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Types
export interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  courseSubjects: string[];
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED' | 'DRAFT';
  courseDuration: number;
  price: number;
  createdAt: string;
  enrolledUsers?: any[];
  originalPrice?: number;
}

// Constants
const API_BASE_URL = "http://localhost:8080/public/getAllCourses";

const CoursesPage: React.FC = () => {
  // State
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch courses
  const fetchCourses = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.status}`);
      }
      
      const data = await response.json();
      setCourses(
        data.map((course: any) => ({
          ...course,
          id: course.id,
          status: course.status ?? "ACTIVE",
        }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Filter courses based on search
  const filteredCourses = courses.filter((course: Course) => {
    const matchesSearch = [
      course.courseName,
      course.courseDescription,
      ...course.courseSubjects
    ].some(text => (text ?? "").toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  // Utility functions
  const STATUS_CONFIG = {
    ACTIVE: { 
      label: "Live Online", 
      color: "text-green-700 bg-green-100 border-green-200",
      dot: "text-green-500",
    },
    UPCOMING: { 
      label: "Self-Led", 
      color: "text-orange-700 bg-orange-100 border-orange-200",
      dot: "text-orange-500",
    },
    COMPLETED: { 
      label: "In Person", 
      color: "text-blue-700 bg-blue-100 border-blue-200",
      dot: "text-blue-500",
    },
    DRAFT: { 
      label: "Private Tutoring", 
      color: "text-purple-700 bg-purple-100 border-purple-200",
      dot: "text-purple-500",
    },
  };

  const formatDuration = (duration: number): string => {
    return duration >= 1 
      ? `${Math.floor(duration)} hours of 1:1 tutoring`
      : `${Math.round(duration * 60)} minutes of content`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen ">
        <Navbar />
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col ">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center max-w-md">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchCourses}
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <Navbar />

  {/* Hero Section */}
  <div className="bg-gradient-to-r mt-12 from-green-400 via-green-200 to-green-900 text-white relative overflow-hidden">
        {/* Background Image */}
        <img 
          src="/background.jpg" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none" 
          style={{ zIndex: 0 }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="text-sm font-medium text-green-300 mt-14 mb-2 tracking-wide uppercase">GRE PREP COURSES</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Top Scores Take Top Teachers
            </h1>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              A full course leaves nothing to chance. Get the structure and guidance you need—with customizable online resources.
            </p>
          </div>
        </div>
      </div>


      
      {/* Header Section */}
      <div className="bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl  font-bold text-gray-900 mb-4">Courses</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive collection of courses designed to help you achieve your learning goals.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? "Try adjusting your search criteria."
                : "No courses are available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course: Course) => {
              if (!STATUS_CONFIG[course.status]) {
                return null;
              }
              
              const keyFeature = course.courseSubjects && course.courseSubjects.length > 0
                ? course.courseSubjects[0]
                : "Expert instruction included";
                
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col justify-between min-h-[480px] group"
                >
                  {/* Status Badge */}
                  <div className="flex items-center gap-2 px-6 pt-6">
                    <span className={`text-xl ${STATUS_CONFIG[course.status].dot}`}>●</span>
                    <span className={`font-semibold text-sm px-3 py-1 rounded-full ${STATUS_CONFIG[course.status].color}`}>
                      {STATUS_CONFIG[course.status].label}
                    </span>
                  </div>
                  
                  {/* Title & Subtitle */}
                  <div className="px-6 pt-4 pb-2 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                      {course.courseName}
                    </h3>
                    <p className="text-gray-600 text-base mb-4 min-h-[48px] leading-relaxed">
                      {course.courseDescription || "Flexible prep designed to boost your score"}
                    </p>
                  </div>
                  
                  <hr className="mx-6 border-gray-200" />
                  
                  {/* Key Feature */}
                  <div className="flex items-center gap-2 px-6 py-4 text-green-700 font-medium">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{keyFeature}</span>
                  </div>
                  
                  {/* Duration Info */}
                  <div className="px-6 pb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{formatDuration(course.courseDuration)}</span>
                    </div>
                  </div>
                  
                  {/* Pricing */}
                  <div className="px-6 pb-2 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {course.originalPrice && course.originalPrice > course.price && (
                        <span className="text-gray-400 line-through text-lg">${course.originalPrice}</span>
                      )}
                      <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      4 interest-free payments or as low as 
                      <span className="text-green-700 font-semibold"> ${Math.round(course.price/12)}/mo</span> with financing
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="px-6 pb-6 mt-auto">
                    <Link href={`/courses/${course.id}`} className="block">
                      <button className="w-full border-2 border-green-600 text-green-700 py-3 rounded-lg font-semibold bg-white hover:bg-green-50 hover:text-green-800 hover:border-green-700 transition-all duration-200 shadow-sm hover:shadow-md">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <Footer/>
    </div>
  );
};

export default CoursesPage;