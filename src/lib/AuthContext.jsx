/**
 * AuthContext.jsx
 * 
 * Team 19 - Make It All System
 * 
 * Purpose: Manages user authentication state and login/logout logic
 * Features:
 * - Handles login with credential validation
 * - Supports both pre-registered users (users.json) and dynamically registered users
 * - Manages user session with localStorage and cookies
 * - Provides auth context to protected routes
 */
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
    
    // FIRST: Check localStorage for registered users (array form persisted by RegisterPage)
    try {
      const ru = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      if (Array.isArray(ru)) {
        const u = ru.find(x => x.username === username.trim() && x.password === password);
        if (u) {
          const userData = { username: u.username, email: u.email, role: u.role || 'Employee' };
          setUser(userData);
          localStorage.setItem('currentUser', JSON.stringify(userData));
          try {
            const maxAge = 60 * 60 * 24 * 7; // 7 days
            document.cookie = `auth=1; path=/; max-age=${maxAge}`;
            document.cookie = `role=${encodeURIComponent(userData.role)}; path=/; max-age=${maxAge}`;
          } catch {}
          return {
            success: true,
            user: userData,
            dashboardPath: userData.role === 'Manager' ? '/dashboard/manager' : '/dashboard/employee'
          };
        }
      }
    } catch {}
    
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
      try {
        const maxAge = 60 * 60 * 24 * 7; // 7 days
        document.cookie = `auth=1; path=/; max-age=${maxAge}`;
        document.cookie = `role=${encodeURIComponent(foundUser.role)}; path=/; max-age=${maxAge}`;
      } catch {}
      
      // Determine which dashboard to redirect to
      const dashboardPath = foundUser.role === 'Manager' ? '/dashboard/manager' : '/dashboard/employee';
      
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
    try {
      document.cookie = 'auth=; path=/; max-age=0';
      document.cookie = 'role=; path=/; max-age=0';
    } catch {}
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