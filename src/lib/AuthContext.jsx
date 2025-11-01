// src/lib/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import usersData from '../data/users.json';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // FIRST: Check localStorage for registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    if (registeredUsers[username] && registeredUsers[username].password === password) {
      const userData = {
        username: username,
        email: registeredUsers[username].email,
        role: registeredUsers[username].role || 'Employee'
      };
      
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      return { 
        success: true, 
        user: userData,
        dashboardPath: userData.role === 'Manager' ? '/manager' : '/app'
      };
    }
    
    // SECOND: Check original users.json (for pre-registered users)
    const foundUser = usersData.find(
      user => user.username === username.trim() && user.password === password
    );

    if (foundUser) {
      // Don't store password in localStorage
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      // Determine which dashboard to redirect to
      const dashboardPath = foundUser.role === 'Manager' ? '/manager' : '/app';
      
      return { 
        success: true, 
        user: userWithoutPassword,
        dashboardPath: dashboardPath
      };
    } else {
      throw new Error('Invalid username or password');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isManager: user?.role === 'Manager',
    isEmployee: user?.role === 'Employee'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;