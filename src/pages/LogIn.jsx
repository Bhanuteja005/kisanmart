import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import { BsFillHandbagFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import MobileloginCristina from '../assets/Mobile-login-Cristina.jpg';
import { useAuth } from '../context/AuthContext';
import '../index.css';

const LogIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const loginResult = await login(credentials);
      
      if (loginResult.success) {
        toast.success('Login successful');
        navigate('/dashboard');
      } else {
        setError(loginResult.error);
        toast.error(loginResult.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('Server connection failed. Please try again later.');
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Image Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-50">
        <div className="w-full flex items-center justify-center p-8">
          <img 
            src={MobileloginCristina} 
            alt="Farm Tools" 
            className="max-w-full h-auto rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo for mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <BsFillHandbagFill className="text-4xl text-[#00922F]" />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
              Welcome to KisanMart
            </h1>
            <p className="text-center text-gray-600">
              Admin Dashboard Login
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="admin@example.com"
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
                  value={credentials.password}
                  onChange={handleChange}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button 
                  onClick={() => {/* Add forgot password handler */}} 
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <div className="text-center text-sm text-gray-600">
            Need help? Contact support
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
