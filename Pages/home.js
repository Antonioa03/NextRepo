import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!user) {
      router.push('/'); // Redirigir a la página de inicio de sesión si no hay usuario
    }
  }, [user]);

  const navigateTo = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null; // No renderizar nada mientras rediriges
  }

  return (
    <div style={styles.container}>
      <div style={styles.welcomeSection}>
        <h1 style={styles.title}>Bienvenido, {user ? user.username : 'Usuario'}</h1>
        <p style={styles.subtitle}>Explora y disfruta de nuestras características sorprendentes.</p>
      </div>
      <div style={styles.menu}>
        <div style={styles.menuItem} onClick={() => navigateTo('/animecharacters')}>
          <h2 style={styles.menuTitle}>Personajes de Anime</h2>
          <p style={styles.menuDescription}>Descubre y explora personajes de tus animes favoritos.</p>
        </div>
        {/* Agrega más elementos de menú según sea necesario */}
      </div>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Cerrar Sesión
      </button>
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2025 Nuestra Aplicación. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#ffffff',
    padding: '20px',
  },
  welcomeSection: {
    textAlign: 'center',
    marginTop: '50px',
  },
  title: {
    fontSize: '36px',
    marginBottom: '10px',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '40px',
    color: '#aaaaaa',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
  },
  menuItem: {
    width: '100%',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    backgroundColor: '#1e1e1e',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, background-color 0.2s',
  },
  menuItemHover: {
    backgroundColor: '#333333',
  },
  menuTitle: {
    fontSize: '24px',
    marginBottom: '5px',
    color: '#ffffff',
  },
  menuDescription: {
    fontSize: '16px',
    color: '#aaaaaa',
  },
  logoutButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#6200ea',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background 0.3s',
  },
  footer: {
    padding: '20px 0',
    backgroundColor: '#1e1e1e',
    width: '100%',
    textAlign: 'center',
    marginTop: 'auto',
  },
  footerText: {
    color: '#aaaaaa',
  },
};