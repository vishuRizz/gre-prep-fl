'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
export default function AddCoursePage() {
  const [courseName, setCourseName] = useState<string>('');
  const [courseDescription, setCourseDescription] = useState<string>('');
  const [courseDuration, setCourseDuration] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      const res = await fetch('http://localhost:8080/admin/api/add-course', {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar/>
      <div className="bg-white px-8 py-6 mt-18 border-b border-gray-200">
        <div className="flex items-center">
          <button 
            onClick={() => router.back()}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#7AC86B]">Courses</h1>
            <p className="text-gray-600 mt-1">Create your courses and manage the settings</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white min-h-[calc(100vh-120px)]">
        <form onSubmit={handleSubmit} className="px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            
            {/* Left Column - Form Fields */}
            <div className="space-y-8">
              {/* Course Name */}
              <div>
                <label htmlFor="courseName" className="block text-sm font-medium text-gray-900 mb-3">
                  Course Name
                </label>
                <input
                  id="courseName"
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Product design"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Course Description */}
              <div>
                <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-900 mb-3">
                  Course Description
                </label>
                <textarea
                  id="courseDescription"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="Product design"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-vertical"
                />
              </div>

              {/* Duration and Price Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="courseDuration" className="block text-sm font-medium text-gray-900 mb-3">
                    Duration (Hours)
                  </label>
                  <input
                    id="courseDuration"
                    type="number"
                    min="1"
                    value={courseDuration}
                    onChange={(e) => setCourseDuration(e.target.value)}
                    placeholder="0"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-900 mb-3">
                    Price ($)
                  </label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Thumbnail Upload */}
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Upload Thumbnail PNG,JPG,JPEG
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-80 flex items-center justify-center hover:border-gray-400 transition-colors">
                  {thumbnailPreview ? (
                    <div className="text-center space-y-4">
                      <img 
                        src={thumbnailPreview} 
                        alt="Thumbnail preview" 
                        className="mx-auto max-h-56 rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setThumbnail(null);
                          setThumbnailPreview('');
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove image
                      </button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium mb-4">Browse and chose the files you want to upload from your computer</p>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpg,image/jpeg"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Full Width at Bottom */}
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#7AC86B] text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create course'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}