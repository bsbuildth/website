import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import BeforeAfter from './components/BeforeAfter';
import Calculator from './components/Calculator';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Reference from './components/Reference';
import LineButton from './components/LineButton';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import { getSettings } from './firebase/api';

const MainSite = () => {
  const [show, setShow] = useState({});

  useEffect(() => {
    getSettings()
      .then(data => {
        const obj = {};
        data.forEach(s => { obj[s.setting_key] = s.setting_value; });
        setShow(obj);
      })
      .catch(err => console.error('Error fetching section settings:', err));
  }, []);

  // default visible: only hide when the flag is explicitly false
  const on = (key) => show[key] !== false;

  return (
    <>
      <Header />
      <main>
        {on('show_hero') && <Hero />}
        {on('show_beforeafter') && <BeforeAfter />}
        {on('show_projects') && <FeaturedProjects />}
        {on('show_reference') && <Reference />}
        {on('show_calculator') && <Calculator />}
        {on('show_about') && <AboutUs />}
        {on('show_services') && <Services />}
        {on('show_reviews') && <Testimonials />}
        <Footer />
      </main>
      <LineButton />
    </>
  );
};

const ProtectedRoute = ({ isAuthenticated, element }) => {
  return isAuthenticated ? element : <Navigate to="/admin/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<MainSite />} />
      <Route path="/admin/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
      <Route
        path="/admin"
        element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Admin setIsAuthenticated={setIsAuthenticated} />} />}
      />
    </Routes>
  );
}

export default App;
