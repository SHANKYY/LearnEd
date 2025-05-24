import { useState } from 'react';

export default function HomePage() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 text-white">
      <header className="flex items-center justify-between p-6 shadow-md bg-gray-900">
        <h1 className="text-3xl font-bold text-red-500">LearnEd</h1>
        <nav className="space-x-6">
          <a href="#features" className="hover:text-red-400">Features</a>
          <a href="#courses" className="hover:text-red-400">Courses</a>
          <a href="#about" className="hover:text-red-400">About</a>
          <a href="#contact" className="hover:text-red-400">Contact</a>
        </nav>
      </header>

      <section className="flex flex-col items-center justify-center text-center py-32 px-6">
        <h2 className="text-5xl font-extrabold leading-tight mb-6 text-red-500 drop-shadow-xl">
          Master the Curriculum with LearnEd
        </h2>
        <p className="max-w-2xl text-lg text-gray-300 mb-10">
          AI-powered personalized learning tailored to the Australian school curriculum. Engaging, interactive and just for you.
        </p>
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="bg-red-600 px-8 py-4 rounded-full text-white font-semibold shadow-lg transform transition hover:scale-105"
        >
          {hovered ? "Let's Go!" : "Start Learning"}
        </button>
      </section>

      <section id="features" className="py-20 px-6 bg-black text-center">
        <h3 className="text-4xl font-bold text-red-400 mb-12">Why LearnEd?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h4 className="text-2xl font-semibold text-red-300 mb-4">Smart Study Plans</h4>
            <p>AI-generated daily plans that adapt to your performance and schedule.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h4 className="text-2xl font-semibold text-red-300 mb-4">Gamified Learning</h4>
            <p>Quests, levels and badges make revision fun and motivating.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h4 className="text-2xl font-semibold text-red-300 mb-4">Multi-Format Content</h4>
            <p>Videos, notes, flashcards and practice tests – learn your way.</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-6 text-center text-gray-400 text-sm">
        © 2025 LearnEd. Built with ❤️ in Australia.
      </footer>
    </div>
  );
}
