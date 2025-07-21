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
  courseDuration: number;
  price: number;
  createdAt: string;
  enrolledUsers?: any[];
  originalPrice?: number;
}

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

      const response: Response = await fetch("http://localhost:8080/public/getAllCourses");
      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.status}`);
      }

      const data: any[] = await response.json();
      setCourses(
        data.map((course: any) => ({
          ...course,
          id: course.id,
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
  const filteredCourses: Course[] = courses.filter((course: Course) => {
    const matchesSearch: boolean = [
      course.courseName,
      course.courseDescription,
      ...course.courseSubjects,
    ].some((text: string) => (text ?? "").toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  // Utility functions
  const formatDuration = (duration: number): string => {
    if (duration >= 1) {
      const hours: number = Math.floor(duration);
      const minutes: number = Math.round((duration - hours) * 60);
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
    return `${Math.round(duration * 60)}m`;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Loading component
  const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center py-20">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
        <div className="w-12 h-12 rounded-full border-4 border-[#7AC86B] border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-sm">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchCourses}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#7AC86B] via-green-500 to-green-500 text-white relative overflow-hidden mt-10">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Discover Our Courses</h1>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore comprehensive learning experiences designed to help you achieve your goals
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm pb-7">
              <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Expert Instruction</span>
              <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Flexible Learning</span>
              <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">Quality Content</span>
            </div>
          </div>
        </div>
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </div>
      {/* Search Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg shadow-sm"
                placeholder="Search courses by name, description, or subject..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
            </div>
            {searchTerm && (
              <p className="mt-3 text-sm text-gray-600 text-center">
                Found {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} matching "{searchTerm}"
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">
              {searchTerm ? "Try adjusting your search criteria or browse all available courses." : "No courses are available at the moment. Please check back later."}
            </p>
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="mt-4 text-green-600 hover:text-green-800 font-medium">
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCourses.map((course: Course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden group hover:-translate-y-1">
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    {course.enrolledUsers && course.enrolledUsers.length > 0 && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{course.enrolledUsers.length} enrolled</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors">{course.courseName}</h3>

                  {course.courseDescription && <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{course.courseDescription}</p>}
                </div>
                {/* Course Details */}
                <div className="px-6 pb-4 space-y-3">
                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Duration: {formatDuration(course.courseDuration)}</span>
                  </div>
                  {/* Created Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Created: {formatDate(course.createdAt)}</span>
                  </div>
                  {/* Subjects */}
                  {course.courseSubjects && course.courseSubjects.length > 0 && (
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <div className="flex flex-wrap gap-1">
                        {course.courseSubjects.slice(0, 3).map((subject: string, index: number) => (
                          <span key={index} className="inline-block text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                            {subject}
                          </span>
                        ))}
                        {course.courseSubjects.length > 3 && (
                          <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">+{course.courseSubjects.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* Pricing & CTA */}
                <div className="p-6 pt-4 border-t border-gray-100 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        {course.originalPrice && course.originalPrice > course.price && (
                          <span className="text-gray-400 line-through text-sm">{formatPrice(course.originalPrice)}</span>
                        )}
                        <span className="text-2xl font-bold text-gray-900">{formatPrice(course.price)}</span>
                      </div>
                      {course.originalPrice && course.originalPrice > course.price && (
                        <div className="text-xs text-green-600 font-medium">Save {formatPrice(course.originalPrice - course.price)}</div>
                      )}
                    </div>
                  </div>

                  <Link href={`/courses/${course.id}`} className="block">
                    <button className="w-full bg-[#7AC86B] text-white py-3 rounded-lg font-medium hover:bg-green-500 transition-colors shadow-sm hover:shadow-md">
                      View Course Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;