import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import StudyPlanner from './pages/StudyPlanner';
import Resources from './pages/Resources';
import HelpCenter from './pages/HelpCenter';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="planner" element={<StudyPlanner />} />
          <Route path="resources" element={<Resources />} />
          <Route path="help" element={<HelpCenter />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
