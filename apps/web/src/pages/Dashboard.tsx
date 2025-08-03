import React from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-red-500 mb-8">My Learning Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Progress Overview */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-red-400 mb-4">Progress Overview</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Mathematics</span>
                  <span className="text-red-400">75%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div className="h-2 bg-red-500 rounded-full w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Science</span>
                  <span className="text-red-400">60%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div className="h-2 bg-red-500 rounded-full w-3/5"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-red-400 mb-4">Upcoming Tasks</h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300">Math Quiz</p>
                  <p className="text-sm text-gray-400">Algebra Chapter 4</p>
                </div>
                <span className="text-sm text-red-400">Tomorrow</span>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300">Science Report</p>
                  <p className="text-sm text-gray-400">Chemical Reactions</p>
                </div>
                <span className="text-sm text-red-400">In 3 days</span>
              </li>
            </ul>
          </div>

          {/* Study Streak */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-red-400 mb-4">Study Streak</h2>
            <div className="text-center">
              <p className="text-4xl font-bold text-red-500 mb-2">7 Days</p>
              <p className="text-gray-300">Keep up the great work!</p>
              <div className="flex justify-center space-x-2 mt-4">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center"
                  >
                    <div className="w-6 h-6 rounded-full bg-red-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-gray-300">Completed Practice Test</p>
                <p className="text-sm text-gray-400">Mathematics - Algebra</p>
              </div>
              <span className="ml-auto text-sm text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-gray-300">Watched Video Lesson</p>
                <p className="text-sm text-gray-400">Science - Chemical Bonds</p>
              </div>
              <span className="ml-auto text-sm text-gray-400">Yesterday</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 