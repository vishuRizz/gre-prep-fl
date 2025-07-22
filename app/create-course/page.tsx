'use client';
import { useState } from 'react';

export default function CreateCoursePage() {
  const [course, setCourse] = useState({
    courseName: '',
    courseDescription: '',
    courseSubjects: '',
    courseDuration: '',
    price: '',
    status: 'active'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...course,
      courseSubjects: course.courseSubjects.split(',').map((s) => s.trim()),
      courseDuration: parseFloat(course.courseDuration),
      price: parseFloat(course.price)
    };

    try {
      const res = await fetch('https://greprepcoach-service-177259961249.asia-south1.run.app/public/createCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      setMessage(text);
      if (res.ok) {
        setCourse({
          courseName: '',
          courseDescription: '',
          courseSubjects: '',
          courseDuration: '',
          price: '',
          status: 'active'
        });
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to create course.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="courseName" value={course.courseName} onChange={handleChange} placeholder="Course Name" className="w-full p-2 border" required />
        <textarea name="courseDescription" value={course.courseDescription} onChange={handleChange} placeholder="Description" className="w-full p-2 border" required />
        <input name="courseSubjects" value={course.courseSubjects} onChange={handleChange} placeholder="Subjects (comma separated)" className="w-full p-2 border" required />
        <input name="courseDuration" value={course.courseDuration} onChange={handleChange} placeholder="Duration (in hours)" className="w-full p-2 border" required />
        <input name="price" value={course.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Course</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
