import { AuthProvider } from '/context/AuthContext';
import '/styles/globals.css';
import Header from '/components/Header';


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
export default MyApp;