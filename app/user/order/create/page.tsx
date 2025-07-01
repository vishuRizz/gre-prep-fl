'use client';

import { useState, useEffect } from 'react';

interface Course {
  id: string;
  courseName: string;
  price: number;
  courseDescription?: string;
}

export default function CreateOrderPage() {
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [amount, setAmount] = useState('');
  const [paymentId, setPaymentId] = useState('');

  useEffect(() => {
    // Fetch all available courses
    fetch('http://localhost:8080/public/getAllCourses')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCourses(data);
          if (data.length > 0) {
            const first = data[0];
            setCourseId(first.id);
            setAmount(first.price.toString());
            generatePaymentId(); // Generate payment ID once
          }
        } else {
          console.error('Unexpected response:', data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch courses:', err);
      });
  }, []);

  const generatePaymentId = () => {
    const timestamp = Date.now();
    setPaymentId(`PAY-${timestamp}`);
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setCourseId(selectedId);
    const selectedCourse = courses.find(c => c.id === selectedId);
    if (selectedCourse) {
      setAmount(selectedCourse.price.toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('⚠️ Please log in first');
      return;
    }

    const res = await fetch('http://localhost:8080/user/api/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        paymentId,
        amount: Number(amount),
        coursesId: [courseId],
      }),
    });

    const result = await res.text();
    if (res.ok) {
      alert('✅ Order created successfully: ' + result);
    } else {
      alert('❌ Failed: ' + result);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course:</label>
          <select value={courseId} onChange={handleCourseChange} required>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Amount (from DB):</label>
          <input type="number" value={amount} readOnly />
        </div>

        <div>
          <label>Payment ID (generated):</label>
          <input value={paymentId} readOnly />
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}
