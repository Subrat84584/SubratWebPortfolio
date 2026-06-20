import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorGlow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const dotX = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.3 });
  const dotY = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.3 });

  const ringX = useSpring(rawX, { stiffness: 180, damping: 25, mass: 0.6 });
  const ringY = useSpring(rawY, { stiffness: 180, damping: 25, mass: 0.6 });

  useEffect(() => {
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
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.body.style.cursor = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          width: 34,
          height: 34,
          borderRadius: '50%',
          border: '1.5px solid rgba(245, 208, 0, 0.55)',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Inner dot — snappy, yellow with green glow */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#F5D000',
          pointerEvents: 'none',
          zIndex: 10001,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
          boxShadow:
            '0 0 8px rgba(245, 208, 0, 0.95), 0 0 18px rgba(57, 211, 83, 0.5), 0 0 36px rgba(245, 208, 0, 0.15)',
        }}
      />
    </>
  );
};

export default CursorGlow;
