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

type FilterType = 'ALL' | 'ACTIVE' | 'UPCOMING' | 'COMPLETED' | 'DRAFT';

interface Tab {
  name: string;
  value: string;
  icon: string;
}

// Constants
const API_BASE_URL = "http://localhost:8080/public/getAllCourses";

const TABS: Tab[] = [
  { name: "All Courses", value: "all", icon: "🎯" },
  { name: "Live Online", value: "live", icon: "🟢" },
  { name: "Self-Led", value: "self", icon: "🟠" },
  { name: "In Person", value: "person", icon: "👥" },
  { name: "Private Tutoring", value: "private", icon: "⭐" },
];

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

const CoursesPage: React.FC = () => {
  // State
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");

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

  // Filter courses
  const filteredCourses = courses.filter((course: Course) => {
    const matchesFilter = filter === "ALL" || course.status === filter;
    const matchesSearch = [
      course.courseName,
      course.courseDescription,
      ...course.courseSubjects
    ].some(text => (text ?? "").toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  // Utility functions
  const formatPrice = (price: number): string => {
    return `$${price}`;
  };

  const formatOriginalPrice = (price: number): string => {
    const originalPrice = Math.round(price * 1.4); // Simulating original price
    return `$${originalPrice}`;
  };

  const formatDuration = (duration: number): string => {
    return duration >= 1 
      ? `${Math.floor(duration)} hours of 1:1 tutoring`
      : `${Math.round(duration * 60)} minutes of content`;
  };

  const getMonthlyPrice = (price: number): string => {
    const monthlyPrice = Math.round(price / 12);
    return `$${monthlyPrice}/mo`;
  };

  const getGuaranteeText = (status: Course['status']): string => {
    switch(status) {
      case 'ACTIVE':
        return 'Score a 165+, guaranteed or your money back*';
      case 'UPCOMING':
        return 'Improve your score by 10 points, or your money back*';
      case 'COMPLETED':
        return 'Expert-led instruction, guaranteed results*';
      case 'DRAFT':
        return 'Personalized tutoring, guaranteed improvement*';
      default:
        return 'Quality guaranteed or your money back*';
    }
  };

  const getHourlyRate = (price: number, duration: number): string => {
    if (duration > 0) {
      return `$${Math.round(price / duration)}/hr`;
    }
    return `$${Math.round(price / 32)}/hr`; // Default assumption
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-green-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white relative overflow-hidden">
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
            <p className="text-sm font-medium text-green-300 mb-2 tracking-wide uppercase">GRE PREP COURSES</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Top Scores Take Top Teachers
            </h1>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              A full course leaves nothing to chance. Get the structure and guidance you need—with customizable online resources.
            </p>
          </div>
        </div>
      </div>

      {/* Course Selection Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Choose the Course That Suits Your Needs
          </h2>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={filter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value as FilterType)}
              >
                <option value="ALL">All Types</option>
                <option value="ACTIVE">Live Online</option>
                <option value="UPCOMING">Self-Led</option>
                <option value="COMPLETED">In Person</option>
                <option value="DRAFT">Private Tutoring</option>
              </select>
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
              {searchTerm || filter !== "ALL"
                ? "Try adjusting your search or filter criteria."
                : "No courses are available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course: Course) => {
              if (!STATUS_CONFIG[course.status]) {
                // Optionally skip rendering this course
                return null;
              }
              // Pricing logic
              const hasDiscount = course.originalPrice && course.originalPrice > course.price;
              // Key feature logic
              const keyFeature = course.courseSubjects && course.courseSubjects.length > 0
                ? course.courseSubjects[0]
                : "Expert instruction included";
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col justify-between min-h-[480px]"
                >
                  {/* Status Badge */}
                  <div className="flex items-center gap-2 px-6 pt-6">
                    <span className={`text-xl ${STATUS_CONFIG[course.status].dot}`}>●</span>
                    <span className={`font-semibold text-sm ${STATUS_CONFIG[course.status].color}`}>{STATUS_CONFIG[course.status].label}</span>
                  </div>
                  {/* Title & Subtitle */}
                  <div className="px-6 pt-4 pb-2 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.courseName}</h3>
                    <p className="text-gray-600 text-base mb-4 min-h-[48px]">{course.courseDescription || "Flexible prep designed to boost your score"}</p>
                  </div>
                  <hr className="mx-6 border-gray-200" />
                  {/* Key Feature */}
                  <div className="flex items-center gap-2 px-6 py-4 text-green-700 font-medium">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>{keyFeature}</span>
                  </div>
                  {/* Pricing */}
                  <div className="px-6 pb-2 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      {course.originalPrice && course.originalPrice > course.price && (
                        <span className="text-gray-400 line-through text-lg">${course.originalPrice}</span>
                      )}
                      <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      4 interest-free payments or as low as <span className="text-green-700 font-semibold">${Math.round(course.price/12)}/mo</span> with <a href="#" className="underline">Affirm</a>
                    </div>
                  </div>
                  {/* CTA Button */}
                  <div className="px-6 pb-6 mt-auto">
                    <Link href={`/courses/${course.id}`} className="block">
                      <button className="w-full border-2 border-green-600 text-green-700 py-3 rounded-lg font-semibold bg-white hover:bg-green-50 hover:text-green-900 transition-colors">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              "How to study for the GRE",
              "How hard is the GRE?",
              "How long to study for GRE?",
              "When to take the GRE?",
              "What is considered a good score on the GRE?",
              "I am eligible for GI Bill Benefits. Is GRE prep approved for VA reimbursement?"
            ].map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">{question}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CoursesPage;