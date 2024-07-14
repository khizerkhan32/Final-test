import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';

import Login from './views/Login';
import Dashboard from './views/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUser({ id: userId });
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
      <Routes>
        {user?.id ? (
          <Route path="/">
            <Route path="/" index element={<Dashboard />} />
            <Route path="/Dash" element={<Dashboard />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Login />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
