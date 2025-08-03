import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TeacherDashboardProps {
  user: any;
  token: string;
}

export default function TeacherDashboard({ user, token }: TeacherDashboardProps) {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/teachers/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-300">Loading teacher dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-red-500 mb-8">Teacher Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Students */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-red-400 mb-4">Total Students</h2>
            <div className="text-3xl font-bold text-white mb-2">
              {dashboardData?.totalStudents || 0}
            </div>
            <p className="text-gray-300">Across all your courses</p>
          </div>

          {/* Total Courses */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-red-400 mb-4">My Courses</h2>
            <div className="text-3xl font-bold text-white mb-2">
              {dashboardData?.totalCourses || 0}
            </div>
            <p className="text-gray-300">Active courses</p>
          </div>

          {/* Department */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-red-400 mb-4">Department</h2>
            <div className="text-2xl font-bold text-white mb-2">
              {dashboardData?.teacher?.department || 'N/A'}
            </div>
            <p className="text-gray-300">Your teaching department</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Create Assessment
            </button>
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              View Student Progress
            </button>
            <button className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Generate Reports
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-gray-300">New student enrolled in Mathematics Advanced</p>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-gray-300">Assessment submissions pending review</p>
                <p className="text-sm text-gray-400">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-gray-300">Parent meeting scheduled for tomorrow</p>
                <p className="text-sm text-gray-400">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}