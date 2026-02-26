import React, { useRef, useCallback } from 'react';

/*  MagneticButton — Premium hover effect
    - Desktop only (disabled on touch devices)
    - Uses translate3d for GPU compositing
    - Smooth return on mouse leave
    - Zero overhead when not hovered             */

const MagneticButton = ({ children, className = '', style = {}, strength = 0.3, ...props }) => {
  const btnRef = useRef(null);
  const isTouch = typeof window !== 'undefined' && (
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024
  );

  const onMouseMove = useCallback((e) => {
    if (isTouch) return;
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, [strength, isTouch]);

  const onMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (btn) btn.style.transform = 'translate3d(0, 0, 0)';
  }, []);

  return (
    <button
      ref={btnRef}
      className={className}
      style={{ ...style, transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)', willChange: 'transform' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
