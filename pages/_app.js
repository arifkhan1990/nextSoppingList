import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarSection from '../components/NavbarSection';
import Footer from '../components/Footer';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NavbarSection />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
