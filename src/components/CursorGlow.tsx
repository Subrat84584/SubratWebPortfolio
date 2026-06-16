import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorGlow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Raw mouse position
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Dot follows mouse quickly
  const dotX = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.3 });
  const dotY = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.3 });

  // Ring follows slower (lagging feel)
  const ringX = useSpring(rawX, { stiffness: 180, damping: 25, mass: 0.6 });
  const ringY = useSpring(rawY, { stiffness: 180, damping: 25, mass: 0.6 });

  useEffect(() => {
    // Detect touch device — hide on touch
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(touch);
    if (touch) return;

    const onMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    // Hide default cursor on desktop
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.body.style.cursor = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Don't render on touch devices
  if (isTouch) return null;

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(14, 165, 233, 0.5)',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Inner dot — snappy */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: '#0ea5e9',
          pointerEvents: 'none',
          zIndex: 10001,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
          boxShadow:
            '0 0 10px rgba(14, 165, 233, 0.9), 0 0 20px rgba(14, 165, 233, 0.5), 0 0 40px rgba(14, 165, 233, 0.2)',
        }}
      />
    </>
  );
};

export default CursorGlow;
