'use client'

import React, { useEffect, useState } from 'react';

type Course = {
  courseName: string;
  courseDescription: string;
  courseSubjects: string[];
  courseDuration: number;
  price: number;
  createdAt: string;
};

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:8080/public/getAllCourses');
        console.log('Response status:', res.status);
        
        if (res.status === 204) {
          // No content - empty course list
          setCourses([]);
        } else if (res.ok) {
          const data = await res.json();
          console.log('Fetched data:', data);
          // Handle cases where courseSubjects might be null or undefined
          const processedData = data.map((course: any) => ({
            ...course,
            courseSubjects: course.courseSubjects || []
          }));
          setCourses(processedData);
        } else {
          console.error('Failed to fetch courses, status:', res.status);
          setCourses([]);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Available Courses</h1>
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        courses.map((course, index) => (
          <div key={index} style={{ marginBottom: '1.5rem', border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
            <h2>{course.courseName}</h2>
            <p>{course.courseDescription}</p>
            <p><strong>Subjects:</strong> {course.courseSubjects?.length > 0 ? course.courseSubjects.join(', ') : 'No subjects specified'}</p>
            <p><strong>Duration:</strong> {course.courseDuration} hours</p>
            <p><strong>Price:</strong> ₹{course.price}</p>
            <p><strong>Created At:</strong> {new Date(course.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CoursesPage;
