// pages/login.js
import { useState } from 'react';
import { useAuth } from '/context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={styles.button}>
          Sign In
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#121212',
    color: '#ffffff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#1e1e1e',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#333',
    color: '#ffffff',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#6200ea',
    color: '#ffffff',
    cursor: 'pointer',
  },
};