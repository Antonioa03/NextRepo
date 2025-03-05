import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    // Add a slight delay to ensure localStorage check completes
    const checkAuth = setTimeout(() => {
      setIsAuthChecking(false);
    }, 100);

    return () => clearTimeout(checkAuth);
  }, []);

  useEffect(() => {
    if (!isAuthChecking) {
      if (!user) {
        router.push('/'); // Redirect to login if no user
      }
    }
  }, [user, router, isAuthChecking]);

  if (!user || isAuthChecking) {
    return null; // Don't render anything while checking or redirecting
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido a la Página de Inicio</h1>
      <p style={styles.text}>Esta es la página de inicio después del login.</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#121212',
    color: '#ffffff',
  },
  title: {
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
  },
};