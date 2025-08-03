import React, { useState } from 'react';
import { motion } from 'framer-motion';

const courses = [
  {
    id: 1,
    title: 'Mathematics',
    subject: 'Math',
    level: 'Year 10',
    progress: 75,
    image: '🔢',
    description: 'Master algebra, geometry, and calculus fundamentals',
  },
  {
    id: 2,
    title: 'Chemistry',
    subject: 'Science',
    level: 'Year 10',
    progress: 60,
    image: '⚗️',
    description: 'Explore chemical reactions and molecular structures',
  },
  {
    id: 3,
    title: 'English Literature',
    subject: 'English',
    level: 'Year 10',
    progress: 85,
    image: '📚',
    description: 'Analyze classic literature and improve writing skills',
  },
  {
    id: 4,
    title: 'Biology',
    subject: 'Science',
    level: 'Year 10',
    progress: 40,
    image: '🧬',
    description: 'Study living organisms and ecological systems',
  },
];

const subjects = ['All', 'Math', 'Science', 'English'];
const levels = ['All', 'Year 9', 'Year 10', 'Year 11', 'Year 12'];

export default function Courses() {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesSubject = selectedSubject === 'All' || course.subject === selectedSubject;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesLevel && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-red-500 mb-8">My Courses</h1>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full md:w-96 px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700 focus:outline-none focus:border-red-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className="flex flex-wrap gap-4">
            <div className="space-x-2">
              {subjects.map(subject => (
                <button
                  key={subject}
                  className={`px-4 py-2 rounded-full ${
                    selectedSubject === subject
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-red-500/20'
                  }`}
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject}
                </button>
              ))}
            </div>
            <div className="space-x-2">
              {levels.map(level => (
                <button
                  key={level}
                  className={`px-4 py-2 rounded-full ${
                    selectedLevel === level
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-red-500/20'
                  }`}
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <motion.div
              key={course.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{course.image}</div>
                <h3 className="text-xl font-semibold text-red-400 mb-2">{course.title}</h3>
                <p className="text-gray-300 mb-4">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-400">{course.level}</span>
                  <span className="text-sm text-red-400">{course.progress}% Complete</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-2 bg-red-500 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              <button className="w-full py-3 bg-gray-700/50 text-gray-300 hover:bg-red-500 hover:text-white transition-colors">
                Continue Learning
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 