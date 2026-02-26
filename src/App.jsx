import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Marquee from './components/Marquee';
import BackToTop from './components/BackToTop';
import { initLenis, destroyLenis } from './smoothScroll';

/* Lazy load below-fold sections for faster initial paint */
const About = lazy(() => import('./components/About'));
const Achievements = lazy(() => import('./components/Achievements'));
const Team = lazy(() => import('./components/Team'));
const Projects = lazy(() => import('./components/Projects'));
const Innovation = lazy(() => import('./components/Innovation'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const SectionFallback = () => (
  <div className="section-fallback">
    <div className="section-loader">
      <div className="section-loader-dot" />
      <div className="section-loader-dot" />
      <div className="section-loader-dot" />
    </div>
  </div>
);

function App() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  /* Initialize smooth scrolling after preloader */
  useEffect(() => {
    if (loaded) {
      initLenis();
    }
    return () => destroyLenis();
  }, [loaded]);

  /* 3D tilt effect for cards — desktop only */
  useEffect(() => {
    if (!loaded) return;
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 1024) return;

    const onMouseMove = (e) => {
      const card = e.target.closest('.tilt-card');
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const onMouseLeave = (e) => {
      const card = e.target.closest('.tilt-card');
      if (card) {
        card.style.transform = '';
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave, true);
    };
  }, [loaded]);

  return (
    <>
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}
      {loaded && (
        <div className="app">
          <CustomCursor />
          <ScrollProgress />
          <Background />
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <Suspense fallback={<SectionFallback />}>
              <About />
            </Suspense>
            <Marquee reverse />
            <Suspense fallback={<SectionFallback />}>
              <Achievements />
            </Suspense>
            <Marquee />
            <Suspense fallback={<SectionFallback />}>
              <Team />
            </Suspense>
            <Marquee reverse />
            <Suspense fallback={<SectionFallback />}>
              <Projects />
            </Suspense>
            <Marquee />
            <Suspense fallback={<SectionFallback />}>
              <Innovation />
            </Suspense>
            <Marquee reverse />
            <Suspense fallback={<SectionFallback />}>
              <Contact />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          <BackToTop />
        </div>
      )}
    </>
  );
}

export default App;
