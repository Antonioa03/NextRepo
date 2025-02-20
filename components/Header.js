import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link href="/home" style={styles.link}>
          Home
        </Link>
        {user ? (
          <button onClick={logout} style={styles.button}>
            Cerrar Sesión
          </button>
        ) : (
          <Link href="/" style={styles.link}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#1e1e1e',
    padding: '10px 20px',
    borderBottom: '1px solid #333',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    margin: '0 10px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#6200ea',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Header;