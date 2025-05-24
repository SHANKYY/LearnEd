import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentTextIcon, VideoCameraIcon, BookOpenIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const resources = [
  {
    id: 1,
    title: 'Algebra Fundamentals',
    type: 'Video',
    subject: 'Mathematics',
    duration: '45 min',
    icon: VideoCameraIcon,
  },
  {
    id: 2,
    title: 'Chemical Reactions Guide',
    type: 'Document',
    subject: 'Science',
    pages: 12,
    icon: DocumentTextIcon,
  },
  {
    id: 3,
    title: 'Shakespeare Analysis',
    type: 'Interactive',
    subject: 'English',
    duration: '30 min',
    icon: BookOpenIcon,
  },
  {
    id: 4,
    title: 'Biology Practice Quiz',
    type: 'Quiz',
    subject: 'Science',
    questions: 20,
    icon: AcademicCapIcon,
  },
];

const categories = ['All', 'Video', 'Document', 'Interactive', 'Quiz'];
const subjects = ['All', 'Mathematics', 'Science', 'English'];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.type === selectedCategory;
    const matchesSubject = selectedSubject === 'All' || resource.subject === selectedSubject;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSubject && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-red-500 mb-8">Learning Resources</h1>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full md:w-96 px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700 focus:outline-none focus:border-red-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex flex-wrap gap-4">
            <div className="space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === category
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-red-500/20'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
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
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <motion.div
              key={resource.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <resource.icon className="w-6 h-6 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-red-400 mb-2">{resource.title}</h3>
                  <p className="text-gray-400 mb-4">{resource.subject}</p>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>{resource.type}</span>
                    <span>
                      {resource.duration || resource.pages ? 
                        `${resource.duration || `${resource.pages} pages`}` :
                        `${resource.questions} questions`}
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                Access Resource
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 