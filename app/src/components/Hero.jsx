import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import './Hero.css';

const Hero = () => {
  const [heroContent, setHeroContent] = useState({
    title: 'EXCEPTIONAL CRAFTSMANSHIP',
    subtitle: 'Cormorant Garamond',
    description: 'ทีมงาน | ประสบการณ์ 30+ ปี'
  });
  const [heroBg, setHeroBg] = useState('/hero_bg.png');
  const [heroMediaType, setHeroMediaType] = useState('image');
  const apiUrl = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    // Fetch hero background (image or video)
    fetch(`${apiUrl}/api/images?category=hero`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch hero background: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const bg = Array.isArray(data) ? data.find(i => i.image_key === 'hero_background') : null;
        if (bg?.image_path) {
          setHeroBg(bg.image_path);
          setHeroMediaType(bg.media_type || 'image');
        }
      })
      .catch(err => console.error('Error fetching hero background:', err));

    const fetchHeroContent = async () => {
      try {

        const responses = await Promise.all([
          fetch(`${apiUrl}/api/content/hero_title`),
          fetch(`${apiUrl}/api/content/hero_subtitle`),
          fetch(`${apiUrl}/api/content/hero_description`)
        ]);

        const [titleRes, subtitleRes, descRes] = responses;
        if (!titleRes.ok) throw new Error(`Failed to fetch hero title: ${titleRes.status}`);
        if (!subtitleRes.ok) throw new Error(`Failed to fetch hero subtitle: ${subtitleRes.status}`);
        if (!descRes.ok) throw new Error(`Failed to fetch hero description: ${descRes.status}`);

        const [titleData, subtitleData, descData] = await Promise.all([
          titleRes.json(),
          subtitleRes.json(),
          descRes.json()
        ]);

        setHeroContent({
          title: titleData.thai_content || heroContent.title,
          subtitle: subtitleData.thai_content || heroContent.subtitle,
          description: descData.thai_content || heroContent.description
        });
      } catch (err) {
        console.error('Error fetching hero content:', err);
      }
    };
    fetchHeroContent();
  }, []);

  return (
    <section className="hero" id="home">
      {heroMediaType === 'video' ? (
        <video
          key={heroBg}
          className="hero-bg-media"
          src={heroBg.startsWith('http') ? heroBg : apiUrl + heroBg}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      ) : (
        <div
          key={heroBg}
          className="hero-bg-media hero-bg-image"
          style={{ backgroundImage: `url(${heroBg.startsWith('http') ? heroBg : apiUrl + heroBg})` }}
          aria-hidden="true"
        />
      )}
      <div className="hero-overlay"></div>
      <div className="container hero-content" data-aos="fade-up">
        <h2 className="hero-subtitle" data-aos="fade-down" data-aos-delay="200">
          <TypeAnimation
            sequence={[
              heroContent.subtitle,
              3000,
              'LUXURY & PREMIUM DESIGN',
              3000,
              'EXCELLENCE IN EVERY DETAIL',
              3000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h2>
        <h1 className="hero-title heading-xl text-gold" data-aos="zoom-in" data-aos-delay="400">{heroContent.title}</h1>
        <p className="hero-description">{heroContent.description}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-outline">ดูผลงาน</a>
          <a href="#contact" className="btn btn-solid">ขอใบเสนอราคา</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

