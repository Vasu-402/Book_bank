import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import useAuthStore from '../store/useAuthStore';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', address: ''
  });
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', formData);
      setAuth(response.data, response.data.token);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8 bg-white/95 p-8 rounded-2xl shadow-xl ring-1 ring-slate-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">Create an account</h2>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input name="name" type="text" required placeholder="Full Name" onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-slate-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-slate-900 placeholder-slate-400" />
          <input name="email" type="email" required placeholder="Email address" onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-slate-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-slate-900 placeholder-slate-400" />
          <input name="password" type="password" required placeholder="Password" onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-slate-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-slate-900 placeholder-slate-400" />
          <input name="phone" type="text" required placeholder="Phone Number" onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-slate-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-slate-900 placeholder-slate-400" />
          <textarea name="address" required placeholder="Address" onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-slate-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-slate-900 placeholder-slate-400" />
          
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-primary-700 hover:text-primary-600 font-medium">
            Already have an account? Sign in.
          </Link>
        </div>
      </div>
    </div>
  );
}
