import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo or Brand */}
        <div style={styles.logoContainer}>
          <Link href="/home" style={styles.logo}>
            MyApp
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div style={styles.mobileMenuToggle} onClick={toggleMenu}>
          <span style={styles.menuIcon}>☰</span>
        </div>

        {/* Navigation Links */}
        <nav 
          style={{
            ...styles.nav,
            ...(isMenuOpen ? styles.navMobileOpen : styles.navMobileClosed)
          }}
        >
          <Link href="/home" style={styles.link}>
            Home
          </Link>
          <Link href="/AnimeCharacters" style={styles.link}>
            Anime Characters
          </Link>
          
          {user ? (
            <button onClick={logout} style={styles.button}>
              Logout
            </button>
          ) : (
            <Link href="/" style={styles.link}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '15px 20px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    background: 'linear-gradient(135deg, #6200ea, #3700b3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '16px',
    position: 'relative',
    transition: 'color 0.3s ease',
    padding: '5px 10px',
  },
  button: {
    backgroundColor: '#6200ea',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  mobileMenuToggle: {
    display: 'none',
    cursor: 'pointer',
  },
  menuIcon: {
    color: '#ffffff',
    fontSize: '24px',
  },
  navMobileOpen: {
    display: 'flex',
  },
  navMobileClosed: {
    display: 'flex',
  },
};

// Add hover and focus styles
Object.assign(styles.link, {
  ':hover': {
    color: '#6200ea',
  },
  ':after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: '-5px',
    left: '50%',
    backgroundColor: '#6200ea',
    transition: 'all 0.3s ease',
  },
  ':hover::after': {
    width: '100%',
    left: '0',
  },
});

Object.assign(styles.button, {
  ':hover': {
    backgroundColor: '#3700b3',
    transform: 'translateY(-2px)',
  },
  ':active': {
    transform: 'translateY(1px)',
  },
});

// Media query for responsiveness (you'd typically use CSS or Tailwind for this)
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  
  const handleMediaQuery = (e) => {
    if (e.matches) {
      styles.nav = {
        ...styles.nav,
        position: 'fixed',
        top: '70px',
        left: 0,
        right: 0,
        flexDirection: 'column',
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        display: 'none',
        padding: '20px',
      };
      
      styles.mobileMenuToggle.display = 'block';
    } else {
      styles.nav = {
        ...styles.nav,
        position: 'static',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        display: 'flex',
      };
      
      styles.mobileMenuToggle.display = 'none';
    }
  };

  mediaQuery.addListener(handleMediaQuery);
  handleMediaQuery(mediaQuery);
}

export default Header;