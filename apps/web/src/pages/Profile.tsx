import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon, AcademicCapIcon, CogIcon, BellIcon } from '@heroicons/react/24/outline';

const initialProfile = {
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  grade: 'Year 10',
  school: 'Melbourne High School',
  subjects: ['Mathematics', 'Science', 'English'],
  avatar: '👨‍🎓',
};

const settings = {
  notifications: {
    email: true,
    push: true,
    reminders: true,
  },
  preferences: {
    darkMode: true,
    language: 'English',
    timezone: 'Australia/Melbourne',
  },
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-8">
          <div className="text-6xl mr-4">{profile.avatar}</div>
          <div>
            <h1 className="text-4xl font-bold text-red-500">{profile.name}</h1>
            <p className="text-gray-400">{profile.grade} • {profile.school}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'profile'
                ? 'bg-red-500 text-white'
                : 'bg-gray-800/50 text-gray-300 hover:bg-red-500/20'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <UserCircleIcon className="w-5 h-5 mr-2" />
            Profile
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'academic'
                ? 'bg-red-500 text-white'
                : 'bg-gray-800/50 text-gray-300 hover:bg-red-500/20'
            }`}
            onClick={() => setActiveTab('academic')}
          >
            <AcademicCapIcon className="w-5 h-5 mr-2" />
            Academic
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'settings'
                ? 'bg-red-500 text-white'
                : 'bg-gray-800/50 text-gray-300 hover:bg-red-500/20'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <CogIcon className="w-5 h-5 mr-2" />
            Settings
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-red-400">Personal Information</h2>
              <button
                className="text-gray-300 hover:text-red-400"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 border border-gray-600 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 border border-gray-600 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    School
                  </label>
                  <input
                    type="text"
                    value={editedProfile.school}
                    onChange={(e) => setEditedProfile({ ...editedProfile, school: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 border border-gray-600 focus:outline-none focus:border-red-500"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Full Name</label>
                  <p className="text-gray-300">{profile.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Email</label>
                  <p className="text-gray-300">{profile.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">School</label>
                  <p className="text-gray-300">{profile.school}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Academic Tab */}
        {activeTab === 'academic' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-red-400 mb-4">Current Subjects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between"
                  >
                    <span className="text-gray-300">{subject}</span>
                    <button className="text-red-400 hover:text-red-500">View Progress</button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-red-400 mb-6">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-300 font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-400">Receive updates via email</p>
                  </div>
                  <button className={`w-12 h-6 rounded-full transition-colors ${
                    settings.notifications.email ? 'bg-red-500' : 'bg-gray-600'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.notifications.email ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-300 font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-400">Receive instant updates</p>
                  </div>
                  <button className={`w-12 h-6 rounded-full transition-colors ${
                    settings.notifications.push ? 'bg-red-500' : 'bg-gray-600'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.notifications.push ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-red-400 mb-6">Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Language
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 border border-gray-600 focus:outline-none focus:border-red-500">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Timezone
                  </label>
                  <select className="w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 border border-gray-600 focus:outline-none focus:border-red-500">
                    <option value="Australia/Melbourne">Melbourne</option>
                    <option value="Australia/Sydney">Sydney</option>
                    <option value="Australia/Perth">Perth</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 