import React, { useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollTo } from '../smoothScroll';

const BackToTop = () => {
  const btnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (btnRef.current) {
        btnRef.current.classList.toggle('visible', window.scrollY > 600);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      ref={btnRef}
      className="back-to-top"
      onClick={() => scrollTo(0)}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default BackToTop;
