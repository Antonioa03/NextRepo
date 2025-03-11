import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function AnimeCharacters() {
  const { user } = useAuth();
  const router = useRouter();
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Lista fija de IDs de personajes
  const fixedCharacterIds = [
    1, 2, 3, 5, 6,           // Primera página 
    7, 8, 11, 12, 13,        // Segunda página
    14, 16, 17, 20, 22,      // Tercera página
    25, 34, 35, 40, 45,      // Cuarta página
    62, 80, 94, 112, 127     // Quinta página
  ];

  useEffect(() => {
    // agregamos un delay para una verificación de autenticación
    const checkAuth = setTimeout(() => {
      setIsAuthChecking(false);
    }, 100);

    return () => clearTimeout(checkAuth);
  }, []);

  useEffect(() => {
    if (!isAuthChecking) {
      if (!user) {
        router.push('/'); // Redireccionar a la página de inicio de sesion si no hay usuario
      } else {
        fetchCharacters();
      }
    }
  }, [user, router, isAuthChecking]);

  // Aseguramos que permita scroll
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      // Usamos los IDs fijos para obtener siempre los mismos personajes
      const characterPromises = fixedCharacterIds.map(id => 
        fetch(`https://api.jikan.moe/v4/characters/${id}`).then(res => res.json())
      );
      
      // Usamos Promise.all para esperar todas las solicitudes
      const responses = await Promise.all(characterPromises);
      
      // Extraemos los datos de cada respuesta
      const characterData = responses.map(response => response.data);
      
      // Filtramos cualquier resultado nulo (por si algún ID no existe)
      const validCharacters = characterData.filter(char => char !== null);
      
      if (validCharacters.length === fixedCharacterIds.length) {
        setCharacters(validCharacters);
      } else {
        console.error('Error: No se pudieron cargar todos los personajes.');
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || isAuthChecking) {
    return null; // no renderizar nada mientras se verifica la autenticación 
  }

  const filteredCharacters = characters.filter((char) =>
    char?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedCharacters = filteredCharacters.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  // Función para generar los números de página para la paginación inspirado en paginas de tiendas e commerce
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtonsToShow = 5;
    
    if (totalPages <= maxPageButtonsToShow) {
      // Si hay 5 o menos páginas, se muestran todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Lógica para mostrar páginas alrededor de la actual
      let startPage = Math.max(1, page - Math.floor(maxPageButtonsToShow / 2));
      let endPage = startPage + maxPageButtonsToShow - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPageButtonsToShow + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.headerSpace}></div>
        <h1 style={styles.title}>Personajes de Anime</h1>
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={styles.searchBox}
        />
        <h2 style={styles.subtitle}>Lista de Personajes</h2>
        
        {loading ? (
          <div style={styles.loading}>Cargando personajes...</div>
        ) : (
          <>
            <div style={styles.gridContainer}>
              {paginatedCharacters.map((item) => (
                <div key={item.mal_id} style={styles.card}>
                  <div style={styles.cardContent}>
                    <img 
                      src={item.images?.jpg?.image_url} 
                      alt={item.name} 
                      style={styles.image} 
                    />
                    <div style={styles.textContent}>
                      <h3 style={styles.characterName}>{item.name}</h3>
                      <div style={styles.description}>
                        {item.about 
                          ? item.about.substring(0, 150) + (item.about.length > 150 ? '...' : '') 
                          : 'Descripción no disponible'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button 
                  onClick={() => setPage(1)} 
                  disabled={page === 1} 
                  style={{...styles.button, ...styles.paginationButton}}
                >
                  «
                </button>
                
                <button 
                  onClick={() => setPage(page - 1)} 
                  disabled={page === 1} 
                  style={{...styles.button, ...styles.paginationButton}}
                >
                  ‹
                </button>
                
                {getPageNumbers().map(num => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    style={{
                      ...styles.button,
                      ...styles.paginationButton,
                      ...(page === num ? styles.activePageButton : {})
                    }}
                  >
                    {num}
                  </button>
                ))}
                
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages}
                  style={{...styles.button, ...styles.paginationButton}}
                >
                  ›
                </button>
                
                <button
                  onClick={() => setPage(totalPages)}
                  disabled={page >= totalPages}
                  style={{...styles.button, ...styles.paginationButton}}
                >
                  »
                </button>
              </div>
            )}
            
            <div style={styles.pageInfo}>
              Mostrando {((page - 1) * itemsPerPage) + 1} - {Math.min(page * itemsPerPage, filteredCharacters.length)} de {filteredCharacters.length} personajes
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#ffffff',
    overflowY: 'auto', 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    paddingTop: '0',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  headerSpace: {
    height: '80px', 
    width: '100%',
  },
  title: {
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: '32px',
    textAlign: 'center',
  },
  searchBox: {
    padding: '12px',
    marginBottom: '20px',
    width: '80%',
    maxWidth: '500px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
  },
  subtitle: {
    marginTop: '10px',
    marginBottom: '20px',
    fontSize: '24px',
    textAlign: 'center',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    maxWidth: '800px',
    gap: '20px',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
  },
  image: {
    width: '120px',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginRight: '15px',
  },
  textContent: {
    flex: 1,
    overflow: 'hidden',
  },
  characterName: {
    marginTop: '0',
    marginBottom: '10px',
    fontSize: '20px',
    color: '#f0f0f0',
  },
  description: {
    fontSize: '14px',
    color: '#bbbbbb',
    lineHeight: '1.4',
    height: '105px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    whiteSpace: 'normal',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '10px',
    gap: '5px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s',
  },
  paginationButton: {
    padding: '8px 12px',
    minWidth: '40px',
    textAlign: 'center',
    backgroundColor: '#333333',
  },
  activePageButton: {
    backgroundColor: '#007bff',
    fontWeight: 'bold',
  },
  pageInfo: {
    margin: '15px 0 30px 0',
    fontSize: '14px',
    color: '#aaaaaa',
    textAlign: 'center',
  },
  loading: {
    fontSize: '20px',
    margin: '40px 0',
    textAlign: 'center',
  }
};