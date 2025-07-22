'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function AddCoursePage() {
  const [courseName, setCourseName] = useState<string>('');
  const [courseDescription, setCourseDescription] = useState<string>('');
  const [courseDuration, setCourseDuration] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const token = localStorage.getItem('token');
    console.log({
      courseName,
      courseDescription,
      courseDuration: Number(courseDuration),
      price: Number(price)
    });
    
    try {
      const res = await fetch('https://greprepcoach-service-177259961249.asia-south1.run.app/admin/api/add-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          courseName,
          courseDescription,
          courseDuration: Number(courseDuration),
          price: Number(price)
        })
      });

      if (res.ok) {
        alert('Course Created');
        // router.push('/admin/dashboard');
      } else {
        const data = await res.text();
        alert('Failed to create course: ' + data);
      }
    } catch (error) {
      alert('Network error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar/>
      
      {/* Full Screen Layout */}
      <div className="min-h-screen pt-20 flex flex-col">
        {/* Header */}
       
        {/* Main Content - Full Width */}
        <div className="flex-1 px-8 py-8">
          <div className="h-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-[#7AC86B] to-emerald-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Course Information</h2>
              <p className="text-emerald-100 mt-1">Fill in the details to create your course</p>
            </div>

            {/* Form Content - Horizontal Layout */}
            <form onSubmit={handleSubmit} className="p-8 h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
                
                {/* Left Column - Form Fields */}
                <div className="space-y-8">
                  {/* Course Name */}
                  <div className="space-y-2">
                    <label htmlFor="courseName" className="block text-sm font-semibold text-gray-900">
                      Course Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="courseName"
                      type="text"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      placeholder="e.g., Advanced Product Design Masterclass"
                      required
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>

                  {/* Course Description */}
                  <div className="space-y-2">
                    <label htmlFor="courseDescription" className="block text-sm font-semibold text-gray-900">
                      Course Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="courseDescription"
                      value={courseDescription}
                      onChange={(e) => setCourseDescription(e.target.value)}
                      placeholder="Describe what students will learn, the key topics covered, and the skills they'll gain from this course..."
                      required
                      rows={8}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-vertical"
                    />
                  </div>

                  {/* Duration and Price Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="courseDuration" className="block text-sm font-semibold text-gray-900">
                        Duration (Hours) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="courseDuration"
                          type="number"
                          min="1"
                          value={courseDuration}
                          onChange={(e) => setCourseDuration(e.target.value)}
                          placeholder="24"
                          required
                          className="w-full px-4 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm">hrs</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="price" className="block text-sm font-semibold text-gray-900">
                        Price (USD) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-lg">$</span>
                        </div>
                        <input
                          id="price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="299.00"
                          required
                          className="w-full pl-8 pr-4 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7AC86B] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Course Preview & Additional Info */}
                <div className="space-y-8">
                  {/* Course Preview */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200 h-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Preview</h3>
                    
                    {/* Course Card Preview */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                      <div className="bg-gradient-to-r from-[#7AC86B] to-emerald-600 h-32 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-6xl mb-2">📚</div>
                          <div className="text-sm opacity-90">Course Thumbnail</div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {courseName || 'Course Name'}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {courseDescription || 'Course description will appear here...'}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-[#7AC86B]">
                            ${price || '0.00'}
                          </span>
                          <span className="text-sm text-gray-500">
                            {courseDuration || '0'} hours
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-[#7AC86B]">
                          {courseName ? '✓' : '○'}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Name</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">
                          {courseDuration || '0'}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Hours</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-emerald-600">
                          ${price || '0'}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">Price</div>
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Completion Progress</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${courseName ? 'bg-[#7AC86B]' : 'bg-gray-300'}`}></div>
                          <span className="text-sm text-gray-600">Course Name</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${courseDescription ? 'bg-[#7AC86B]' : 'bg-gray-300'}`}></div>
                          <span className="text-sm text-gray-600">Course Description</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${courseDuration ? 'bg-[#7AC86B]' : 'bg-gray-300'}`}></div>
                          <span className="text-sm text-gray-600">Duration</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${price ? 'bg-[#7AC86B]' : 'bg-gray-300'}`}></div>
                          <span className="text-sm text-gray-600">Price</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Fixed at Bottom */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end mt-12 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gradient-to-r from-[#7AC86B] to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7AC86B] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Course...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Course
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}