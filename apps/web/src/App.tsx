import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Import pages
import Login from './pages/Login';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import StudyPlanner from './pages/StudyPlanner';
import Resources from './pages/Resources';
import HelpCenter from './pages/HelpCenter';
import Profile from './pages/Profile';
import TeacherDashboard from './pages/TeacherDashboard';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  avatar?: string;
  profile?: any;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app start
    const savedToken = localStorage.getItem('learned_token');
    const savedUser = localStorage.getItem('learned_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('learned_token', authToken);
    localStorage.setItem('learned_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('learned_token');
    localStorage.removeItem('learned_user');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">Loading LearnEd...</div>
      </div>
    );
  }

  if (!user || !token) {
    return <Login onLogin={handleLogin} />;
  }

  // Role-based routing
  const isStudent = user.role === 'STUDENT';
  const isTeacher = user.role === 'TEACHER';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
          <Route index element={<Navigate to={isStudent ? "/dashboard" : "/teacher-dashboard"} replace />} />
          
          {/* Student Routes */}
          {isStudent && (
            <>
              <Route path="dashboard" element={<Dashboard user={user} token={token} />} />
              <Route path="courses" element={<Courses user={user} token={token} />} />
              <Route path="planner" element={<StudyPlanner user={user} token={token} />} />
              <Route path="resources" element={<Resources />} />
              <Route path="help" element={<HelpCenter />} />
              <Route path="profile" element={<Profile user={user} token={token} />} />
            </>
          )}

          {/* Teacher Routes */}
          {isTeacher && (
            <>
              <Route path="teacher-dashboard" element={<TeacherDashboard user={user} token={token} />} />
              <Route path="courses" element={<Courses user={user} token={token} />} />
              <Route path="help" element={<HelpCenter />} />
              <Route path="profile" element={<Profile user={user} token={token} />} />
            </>
          )}

          {/* Public route */}
          <Route path="home" element={<HomePage />} />
          
          {/* Catch all - redirect based on role */}
          <Route path="*" element={<Navigate to={isStudent ? "/dashboard" : "/teacher-dashboard"} replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
