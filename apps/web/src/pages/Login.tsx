import { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginProps {
  onLogin: (user: any, token: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user, data.token);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sampleCredentials = [
    { type: 'Student', email: 'alexander.smith1@student.learned.edu.au', password: 'student123' },
    { type: 'Student', email: 'emily.johnson2@student.learned.edu.au', password: 'student123' },
    { type: 'Teacher', email: 'drsarahchen@learned.edu.au', password: 'teacher123' },
    { type: 'Teacher', email: 'mrdavidthompson@learned.edu.au', password: 'teacher123' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-red-500 mb-2">LearnEd</h2>
          <p className="text-gray-300">Sign in to your account</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-red-400 mb-4">Demo Credentials</h3>
            <div className="space-y-3">
              {sampleCredentials.map((cred, index) => (
                <div key={index} className="bg-gray-700/50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-300">{cred.type}</p>
                      <p className="text-xs text-gray-400">{cred.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setEmail(cred.email);
                        setPassword(cred.password);
                      }}
                      className="text-red-400 text-sm hover:text-red-300"
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>🎓 Welcome to the Australian EdTech Prototype</p>
          <p>100 students • 10 teachers • University pathways ready</p>
        </div>
      </motion.div>
    </div>
  );
}