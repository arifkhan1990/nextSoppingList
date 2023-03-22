import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Toaster } from 'react-hot-toast';
import NavbarSection from '../components/NavbarSection';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <NavbarSection />
        <Component {...pageProps} />
        <Toaster position="top-right" reverseOrder={false} />
        <Footer />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
