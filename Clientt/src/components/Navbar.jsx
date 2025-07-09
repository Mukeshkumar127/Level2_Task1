import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-gray-950 text-white px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-500 hover:text-indigo-400">
          JobBoard
        </Link>

        <div className="flex gap-4 items-center">
          {!token ? (
            <>
              <Link to="/login" className="hover:text-indigo-400 transition">Login</Link>
              <Link to="/register" className="hover:text-indigo-400 transition">Register</Link>
            </>
          ) : (
            <>
              {user?.role === 'employer' && (
                <Link to="/employer" className="hover:text-indigo-400 transition">Employer Dashboard</Link>
              )}
              {user?.role === 'candidate' && (
                <Link to="/candidate" className="hover:text-indigo-400 transition">Candidate Dashboard</Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
