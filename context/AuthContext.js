import { createContext, useState, useContext, useEffect } from 'react';

// Create the auth context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('animeApp_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Simple login function with hardcoded credentials
  const login = (username, password) => {
    // Only accept admin/password credentials
    if (username === 'admin' && password === 'password') {
      const userObj = { username: 'admin' };
      setUser(userObj);
      localStorage.setItem('animeApp_user', JSON.stringify(userObj));
      return true;
    }
    return false;
  };

  // Simple logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('animeApp_user');
  };

  // Value object to be provided to consumers
  const value = {
    user,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for using the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}