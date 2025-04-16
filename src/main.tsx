import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

function Root() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <StrictMode>
      <Auth0Provider
        domain="topsoundupgrade.eu.auth0.com"
        clientId="LTCPh4oMv06vogNjg1BC2AuyvxqepV1B"
        authorizationParams={{
          redirect_uri: `${window.location.origin}/admin-access-92kl4`,
          audience: "https://topsoundupgrade.eu.auth0.com/api/v2/",
          scope: "openid profile email"
        }}
      >
        <ErrorBoundary>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ErrorBoundary>
      </Auth0Provider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);