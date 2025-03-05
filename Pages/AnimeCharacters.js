import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function AnimeCharacters() {
  const { user } = useAuth();
  const router = useRouter();
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      if (user === null) {
        router.push('/');
      } else if (user) {
        fetchCharacters();
      }
    }
  }, [user, router, isAuthChecking]);

  const fetchCharacters = async () => {
    try {
      setIsLoading(true);
      const characterPromises = Array.from({ length: 3 }, () => 
        fetch('https://api.jikan.moe/v4/random/characters').then(res => res.json())
      );
      
      const results = await Promise.all(characterPromises);
      const charactersData = results.map(result => result.data);
      
      setCharacters(charactersData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setIsLoading(false);
    }
  };

  // Prevent rendering if not authenticated, still loading, or checking auth
  if (!user || isLoading || isAuthChecking) {
    return null;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Character Page</h1>
      
      <div style={styles.grid}>
        {characters.map((character) => (
          <div key={character.mal_id} style={styles.card}>
            <img 
              src={character.images.jpg.image_url} 
              alt={character.name} 
              style={{
                ...styles.image,
                maxHeight: '300px',
                width: 'auto',
                objectFit: 'contain'
              }} 
            />
            
            <div style={styles.content}>
              <h2 style={styles.characterName}>{character.name}</h2>
              <p style={styles.description}>
                {character.about 
                  ? character.about.length > 200 
                    ? character.about.substring(0, 200) + '...' 
                    : character.about
                  : 'No description available'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    width: '100%',
    maxWidth: '1000px',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    objectFit: 'contain',
    borderBottom: '1px solid #333',
  },
  content: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  characterName: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    fontSize: '14px',
    color: '#bbbbbb',
    maxHeight: '100px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};
