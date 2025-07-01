'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCoursePage() {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log({
      courseName,
      courseDescription,
      courseDuration: Number(courseDuration),
      price: Number(price)
    });
    
    const res = await fetch('http://localhost:8080/admin/api/add-course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        courseName,
        courseDescription,           // ✅ fixed key name
        courseDuration: Number(courseDuration), // ✅ ensure number type
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
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name:</label>
          <input
            value={courseName}
            onChange={e => setCourseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            value={courseDescription}
            onChange={e => setCourseDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Duration (in hours):</label>
          <input
            type="number"
            value={courseDuration}
            onChange={e => setCourseDuration(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
}
