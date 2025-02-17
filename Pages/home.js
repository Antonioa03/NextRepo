// pages/home.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '/context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/'); // Redirige al login si no hay usuario autenticado
    }
  }, [user]);

  if (!user) {
    return null; // No renderices nada mientras rediriges
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido a la Página de Inicio</h1>
      <p style={styles.text}>Esta es la página de inicio después del login.</p>
      <button onClick={() => router.push('/')} style={styles.button}>
        Cerrar Sesión
      </button>
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
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#6200ea',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};