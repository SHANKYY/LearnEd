import React, { useState } from 'react';
import { motion } from 'framer-motion';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

const initialSchedule = {
  Monday: ['Math - Algebra', '', 'Science Lab', '', '', '', '', '', '', '', '', ''],
  Tuesday: ['English Literature', 'Chemistry', '', '', 'Study Group', '', '', '', '', '', '', ''],
  Wednesday: ['Biology', '', '', 'Math Practice', '', '', '', '', '', '', '', ''],
  Thursday: ['Chemistry Lab', 'English Essay', '', '', '', '', '', '', '', '', '', ''],
  Friday: ['Math Quiz', '', 'Science Review', '', '', '', '', '', '', '', '', ''],
  Saturday: ['Study Group', '', '', '', '', '', '', '', '', '', '', ''],
  Sunday: ['Weekly Review', '', '', '', '', '', '', '', '', '', '', ''],
};

export default function StudyPlanner() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: number } | null>(null);
  const [newTask, setNewTask] = useState('');

  const handleSlotClick = (day: string, timeIndex: number) => {
    setSelectedSlot({ day, time: timeIndex });
    setNewTask(schedule[day][timeIndex] || '');
  };

  const handleTaskSave = () => {
    if (selectedSlot) {
      setSchedule(prev => ({
        ...prev,
        [selectedSlot.day]: prev[selectedSlot.day].map((task, i) =>
          i === selectedSlot.time ? newTask : task
        ),
      }));
      setSelectedSlot(null);
      setNewTask('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-red-500 mb-8">Study Planner</h1>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-red-400">Time</th>
                {daysOfWeek.map(day => (
                  <th key={day} className="px-4 py-2 text-red-400">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, timeIndex) => (
                <tr key={time} className="border-t border-gray-700">
                  <td className="px-4 py-2 text-gray-400 text-center">
                    {time}:00
                  </td>
                  {daysOfWeek.map(day => (
                    <td
                      key={`${day}-${time}`}
                      className={`px-4 py-2 border-l border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors ${
                        schedule[day][timeIndex] ? 'bg-gray-700/30' : ''
                      }`}
                      onClick={() => handleSlotClick(day, timeIndex)}
                    >
                      <div className="text-sm text-gray-300">{schedule[day][timeIndex]}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedSlot && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            onClick={(e) => e.target === e.currentTarget && setSelectedSlot(null)}
          >
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-red-400 mb-4">
                Add Task for {selectedSlot.day} at {selectedSlot.time}:00
              </h3>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:border-red-500 mb-4"
                placeholder="Enter task description"
              />
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setSelectedSlot(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={handleTaskSave}
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 