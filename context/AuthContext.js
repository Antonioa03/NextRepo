import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Verificar si el usuario está autenticado al cargar la página
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    if (username === 'admin' && password === 'password') {
      const userData = { username };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      router.push('/home');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/index');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);