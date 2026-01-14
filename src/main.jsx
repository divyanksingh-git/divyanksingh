import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PortfolioProvider } from './context/PortfolioContext';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'; // <--- THIS ONE
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider 
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);