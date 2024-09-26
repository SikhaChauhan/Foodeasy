import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(result.message || 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      setStatus('Error sending message. Please try again later.');
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-r from-orange-50 via-red-100 to-orange-50">
      <div
        className="absolute inset-0 bg-gradient-to-r from-orange-50 via-red-100 to-orange-50 opacity-30 animate-gradient"
        style={{ boxShadow: '0 4px 15px rgba(0.5,0.5,0.5,0.5)' }}
      />
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover animate-background"
        style={{ boxShadow: '0 4px 15px rgba(0.5,0.5,0.5,0.5)' }}
      />

      <h1 className="mb-8 text-5xl font-extrabold text-center text-black">
        Contact Us
      </h1>
      <div className="relative z-10 w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg"
           style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }}> {/* Stronger shadow */}
        <h2 className="mb-6 text-4xl font-bold text-center text-gray-800">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 transition duration-200 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 transition duration-200 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
              className="w-full p-4 transition duration-200 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="flex items-center justify-center">
            <button className="px-10 py-3 text-lg font-bold text-white transition duration-300 rounded-lg shadow-lg bg-gradient-to-br from-black via-gray-900 to-pink-700 hover:bg-pink-700" type="submit">
              Send Mail
            </button>
          </div>
          {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
