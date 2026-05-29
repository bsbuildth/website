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

const MainSite = () => (
  <>
    <Header />
    <main>
      <Hero />
      <BeforeAfter />
      <FeaturedProjects />
      <Reference />
      <Calculator />
      <AboutUs />
      <Services />
      <Testimonials />
      <Footer />
    </main>
    <LineButton />
  </>
);

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
