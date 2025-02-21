import { motion } from 'framer-motion';
import React from 'react';
import { BsFillHandbagFill } from "react-icons/bs"; // Add this import
import { Link } from 'react-router-dom';
import deliveryImg from '../assets/delivery.png';
import tractorPartsImg from '../assets/farm-tools.jpg'; // Add this image to assets

const OnBoarding = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with lighter gradient overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.3), rgba(255,255,255,0.2)), url(${tractorPartsImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="p-5 flex justify-between items-center">
          {/* Logo - Added this section */}
          <Link to="/" className="items-center flex gap-3 text-[#00922F] font-extrabold text-xl">
            <BsFillHandbagFill /> 
            <span>KisanMart Tools</span>
          </Link>

          {/* Auth Buttons */}
          <div className="flex gap-4">
            <Link 
              to="/login"
              className="px-6 py-2 rounded-full bg-[#00922F] text-white hover:bg-[#007d28] transition-colors duration-300"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="px-6 py-2 rounded-full border-2 border-[#00922F] text-[#00922F] hover:bg-[#00922F] hover:text-white transition-colors duration-300"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Section with semi-transparent white background */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh] gap-8">
            {/* Text Content with backdrop blur */}
            <div className="lg:w-1/2 space-y-6  backdrop-blur-sm p-8 rounded-xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 ">
                  Agricultural Spare Parts
                  <span className="text-[#00922F] block mt-2">Delivered</span>{' '}
                  to Your Doorstep
                </h1>
                <p className="text-xl text-gray-700 mt-6">
                  Quality parts for all your farming machinery needs. Fast delivery and expert support for every purchase.
                </p>
                <Link
                  to="/login"
                  className="inline-block px-8 py-4 mt-8 bg-[#00922F] text-white rounded-lg hover:bg-[#007d28] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>

            {/* Image Section with Road */}
            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                <motion.img
                  drag
                  dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                  src={deliveryImg}
                  alt="Farm Equipment Parts"
                  className="w-full max-w-xl mx-auto drop-shadow-2xl"
                />
                {/* Road Line */}
<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full">
  {/* Main road line - made wider */}
  <div className="h-3 bg-gray-800 rounded-full shadow-lg w-full max-w-2xl mx-auto"></div>
  
  {/* Road Dashes - increased width and spacing */}
  <div className="relative h-2 w-full max-w-2xl mx-auto -mt-2.5" bg-gray-800>
    <div className="absolute inset-0 flex justify-center items-center"></div>
  </div>
</div>
              </motion.div>
              {/* Decorative circle */}
              <div className="absolute inset-0 bg-[#DFF1E6] rounded-full filter blur-3xl opacity-50 z-0"></div>
            </div>
          </div>
        </div>

        {/* Features Section with clearer background */}
        <div className="bg-white/60 backdrop-blur-sm py-16">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-3">Quality Parts</h3>
              <p className="text-gray-600">Genuine spare parts for all major brands</p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Quick delivery to your location</p>
            </div>
            <div className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-gray-600">24/7 technical support available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;