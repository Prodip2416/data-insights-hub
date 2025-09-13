import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const USERS = [
  {
    id: 'admin',
    username: 'admin',
    password: 'admin123',
    hint: 'Username: admin | Password: admin123'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('dashboardUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('dashboardUser');
      }
    }
  }, []);

  const login = (username, password) => {
    const foundUser = USERS.find(u => u.username === username && u.password === password);
    if (foundUser) {
      const userData = { id: foundUser.id, username: foundUser.username };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('dashboardUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('dashboardUser');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
