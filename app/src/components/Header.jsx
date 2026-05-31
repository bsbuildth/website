import React, { useState, useEffect } from 'react';
import { getMenus } from '../firebase/api';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const [lang, setLang] = useState('th');

  useEffect(() => {
    const savedLang = localStorage.getItem('website_lang');
    if (savedLang) setLang(savedLang);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    getMenus()
      .then(data => setMenus(data))
      .catch(err => console.error('Error fetching menus:', err));
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  const toggleLang = () => {
    const newLang = lang === 'th' ? 'en' : 'th';
    setLang(newLang);
    localStorage.setItem('website_lang', newLang);
  };

  const regularMenus = menus.filter(m => !m.is_cta);
  const ctaMenu = menus.find(m => m.is_cta);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a
          href="#"
          className="logo"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}
          style={{ cursor: 'pointer', textDecoration: 'none' }}
          title="กลับหน้าหลัก"
        >
          <span className="logo-text">BSBuildTh</span>
          <span className="logo-subtext">Professional Construction</span>
        </a>
        
        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {menus.length === 0 ? (
            <>
              <a href="#services" className="nav-link" onClick={closeMenu}>บริการ</a>
              <a href="#calculator" className="nav-link" onClick={closeMenu}>ประเมินราคา</a>
              <a href="#projects" className="nav-link" onClick={closeMenu}>ผลงาน</a>
              <a href="#contact" className="btn btn-solid nav-btn" onClick={closeMenu}>ขอใบเสนอราคา</a>
            </>
          ) : (
            <>
              {regularMenus.map(menu => (
                <a key={menu.id} href={menu.link_url} className="nav-link" onClick={closeMenu}>
                  {lang === 'th' ? menu.label_thai : menu.label_english}
                </a>
              ))}
              {ctaMenu && (
                <a href={ctaMenu.link_url} className="btn btn-solid nav-btn" onClick={closeMenu}>
                  {lang === 'th' ? ctaMenu.label_thai : ctaMenu.label_english}
                </a>
              )}
            </>
          )}
          
          <button onClick={toggleLang} className="lang-toggle-btn" title="Switch Language">
            {lang === 'th' ? 'EN' : 'TH'}
          </button>
        </nav>

        <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
