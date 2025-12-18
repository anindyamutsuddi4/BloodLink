import React from 'react';
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router";

const Errorpage = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#17483d] to-[#3a7b6d]  px-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-20 max-w-lg text-center relative overflow-hidden">
        <FaExclamationTriangle className="text-red-500 text-6xl mx-auto mb-6 animate-bounce" />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Oops!</h1>
        <p className="text-gray-600 mb-6">
          Something went wrong. The page you’re looking for might not exist, or
          an error occurred.
        </p>
        <Link
          to="/"
          className="inline-block  text-black font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
        >
          Go Back Home
        </Link>
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-300 rounded-full opacity-30 animate-pulse"></div>
      </div>
    </div>
    );
};

export default Errorpage;