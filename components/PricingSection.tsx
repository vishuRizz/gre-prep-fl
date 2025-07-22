// components/PricingSection.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface Course {
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

const PricingSection: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://greprepcoach-service-177259961249.asia-south1.run.app/public/getAllCourses');
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(
          data
            .map((course: any) => ({
              ...course,
              id: course.id,
              status: course.status ?? 'ACTIVE',
            }))
            .sort((a: Course, b: Course) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        );
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const latestCourses = courses.slice(0, 3);

  return (
    <div className="py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        <h2 className=" font-playfair text-4xl font-bold text-center text-gray-700 mb-12">
          GRE Prep for Your Best Score
        </h2>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading latest courses...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {latestCourses.map((course) => (
              <Card key={course.id} className="rounded-3xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200 pt-8 h-full w-full max-w-sm">
                <CardHeader className="text-center pb-2">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-emerald-600 text-sm font-medium">{course.status === 'ACTIVE' ? 'LiveOnline' : course.status}</span>
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">{course.courseName}</CardTitle>
                  <CardDescription className="text-gray-600 text-center px-4">
                    {course.courseDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex-1 flex flex-col">
                  <div className="border-t border-gray-200 pt-6 mb-6 flex-1">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-left">{course.courseSubjects?.[0] || 'Comprehensive GRE Preparation'}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-left">{course.courseDuration} hours of content</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-gray-400 line-through text-lg">₹{Math.round((course.price || 0) * 1.6)}</span>
                      <span className="text-3xl font-bold text-gray-900">₹{course.price}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      One-time payment • Lifetime access
                    </p>
                  </div>
                  <Button className="w-full bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-[#7AC86B] hover:text-white font-semibold py-3 rounded-full" asChild>
                    <a href={`/courses/${course.id}`}>Learn More</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingSection;