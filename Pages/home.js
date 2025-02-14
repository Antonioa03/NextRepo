export default function Home() {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Página de Inicio</h1>
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