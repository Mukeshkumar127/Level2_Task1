import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobDetail from './pages/JobDetail';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import ApplyJob from './pages/ApplyJob';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job/:id" element={<JobDetail />} />
        {/* <Route path="/employer" element={<EmployerDashboard />} /> */}
        <Route path="/employer" element={<ProtectedRoute> <EmployerDashboard /> </ProtectedRoute>}
/>
        <Route path="/candidate" element={<CandidateDashboard />} />
        <Route path="/apply/:id" element={<ApplyJob />} />
      </Routes>
    </Router>
  );
}

export default App;
