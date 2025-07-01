"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface ContactFormFields {
  name: string;
  email: string;
  phone: string;
  // message?: string; // Uncomment if you want a message field
}

const initialFormState: ContactFormFields = {
  name: "",
  email: "",
  phone: "",
  // message: "",
};

const ContactPage: React.FC = () => {
  const [form, setForm] = useState<ContactFormFields>(initialFormState);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // If you want a textarea for message, add this:
  // const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/public/Contact-Us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const text = await res.text();
      if (res.ok) {
        setStatus("✅ " + text);
        setForm(initialFormState);
      } else {
        setStatus("❌ " + text);
      }
    } catch (err) {
      setStatus("❌ Error sending request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full mx-auto p-6 bg-white rounded shadow-md border"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
        <label className="block mb-2 font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="block w-full mb-4 p-2 border rounded"
          required
          type="text"
        />
        <label className="block mb-2 font-medium">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="block w-full mb-4 p-2 border rounded"
          required
          type="email"
        />
        <label className="block mb-2 font-medium">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Your Phone"
          className="block w-full mb-4 p-2 border rounded"
          required
          type="tel"
        />
        {/*
        <label className="block mb-2 font-medium">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleTextAreaChange}
          placeholder="Your Message"
          className="block w-full mb-4 p-2 border rounded"
        />
        */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded font-semibold disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
        {status && <div className="mt-4 text-center">{status}</div>}
      </form>
    </div>
  );
};

export default ContactPage;