import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Sun, Moon, Clock, Hourglass } from 'lucide-react';

const KnowYourPrahar = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push('/quiz'); // Navigate to the quiz page
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-blue-900 via-purple-600 to-orange-300 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center flex-col space-y-4">
        <div className="flex space-x-4">
          <Sun className="w-12 h-12 text-yellow-400" />
          <Clock className="w-12 h-12 text-white" />
          <Hourglass className="w-12 h-12 text-amber-500" />
          <Moon className="w-12 h-12 text-indigo-400" />
        </div>
        <h1 className="text-4xl font-bold text-white">KNOW YOUR PRAHAR</h1>
        <p className="text-lg text-white">Every Hour Has a Story. What’s Yours?</p>
        <motion.button
          className="px-6 py-2 text-lg font-semibold text-black bg-blue-200 rounded-full shadow-md hover:bg-blue-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
        >
          START
        </motion.button>
      </div>
    </div>
  );
};

export default KnowYourPrahar;
