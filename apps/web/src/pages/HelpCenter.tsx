import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "How do I track my progress?",
    answer: "Your progress is automatically tracked in the Dashboard. You can view detailed statistics, completion rates, and performance metrics for each subject and course."
  },
  {
    question: "Can I customize my study schedule?",
    answer: "Yes! Use the Study Planner to create a personalized schedule. You can add, edit, or remove study sessions and set reminders for important tasks and deadlines."
  },
  {
    question: "How do I access course materials?",
    answer: "All course materials are available in the Resources section. You can filter by subject, type (video, document, quiz), and use the search function to find specific content."
  },
  {
    question: "What if I need help with a specific topic?",
    answer: "You can use the chat feature to connect with tutors, join study groups, or post questions in the community forum. Our AI assistant is also available 24/7 for immediate help."
  },
];

const supportOptions = [
  {
    title: "Chat Support",
    description: "Connect with our support team instantly",
    buttonText: "Start Chat",
    availability: "24/7",
  },
  {
    title: "Email Support",
    description: "Get detailed assistance via email",
    buttonText: "Send Email",
    availability: "Response within 24 hours",
  },
  {
    title: "Video Call",
    description: "Schedule a one-on-one tutoring session",
    buttonText: "Book Session",
    availability: "By appointment",
  },
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-red-500 mb-8">Help Center</h1>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full md:w-96 px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700 focus:outline-none focus:border-red-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {supportOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-red-400 mb-2">{option.title}</h3>
              <p className="text-gray-300 mb-4">{option.description}</p>
              <p className="text-sm text-gray-400 mb-4">Available: {option.availability}</p>
              <button className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                {option.buttonText}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-red-400 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-700/50 px-4 py-3 text-left text-sm font-medium text-gray-200 hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-red-500">
                      <span>{faq.question}</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-red-400`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-300">
                      {faq.answer}
                    </Disclosure.Panel>
                  </motion.div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-red-400 mb-6">Still Need Help?</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 border border-gray-600 focus:outline-none focus:border-red-500"
                placeholder="Enter subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 border border-gray-600 focus:outline-none focus:border-red-500"
                placeholder="Describe your issue"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
} 