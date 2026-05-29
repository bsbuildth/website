import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import './premium.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

const RootApp = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });

    // Data now comes from Firestore — unregister the old API-caching service
    // worker so it can't serve stale /api responses from a previous deploy.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations()
        .then(regs => regs.forEach(reg => reg.unregister()))
        .catch(() => {});
    }
  }, []);

  return (
    <BrowserRouter basename="/website/">
      <App />
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>,
)
