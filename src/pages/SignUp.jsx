import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import { BsFillHandbagFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import MobileloginCristina from '../assets/Mobile-login-Cristina.jpg';
import { useAuth } from '../context/AuthContext'; // Changed from authAPI

const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuth(); // Using AuthContext instead of direct API call
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "sub-admin" // Fixed role for sub-admin
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }

      const { confirmPassword, ...registerData } = formData;
      const result = await register(registerData);

      if (result?.success) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } else {
        toast.error(result?.error || 'Registration failed');
      }
    } catch (error) {
      toast.error(error?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-blue-50">
        <div className="w-full flex items-center justify-center p-8">
          <img src={MobileloginCristina} alt="Farm Tools" className="max-w-full h-auto rounded-2xl shadow-2xl" />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <BsFillHandbagFill className="mx-auto h-12 w-12 text-[#00922F]" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#00922F] hover:text-[#007d28]">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>Sub-admin accounts have the following permissions:</p>
                <ul className="list-disc ml-5 mt-2">
                  <li>View all data</li>
                  <li>Create and edit entries</li>
                  <li>Cannot delete data</li>
                </ul>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#00922F] hover:bg-[#007d28] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
