import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  driftX: number;
  driftY: number;
  parallaxSpeed: number;
  colorType: 'purple' | 'indigo' | 'green';
}

const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 140;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const getColors = (isDark: boolean) => {
      if (isDark) {
        return {
          purple: 'rgba(139, 92, 246, ',
          indigo: 'rgba(99, 102, 241, ',
          green: 'rgba(52, 211, 153, ',
        };
      } else {
        return {
          purple: 'rgba(99, 102, 241, ',
          indigo: 'rgba(79, 70, 229, ',
          green: 'rgba(16, 185, 129, ',
        };
      }
    };

    let colors = getColors(document.documentElement.classList.contains('dark'));

    // Observe HTML class changes to update colors instantly
    const observer = new MutationObserver(() => {
      colors = getColors(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        // Deterministic-ish spread
        const seed = i * 497.3;
        const colorRand = (seed * 1.7) % 10;
        let colorType: 'purple' | 'indigo' | 'green' = 'purple';
        if (colorRand > 7) colorType = 'indigo';
        else if (colorRand > 8.5) colorType = 'green';

        particles.push({
          x: (seed * 3.1) % canvas.width,
          y: (seed * 7.9) % canvas.height,
          size: 1 + ((seed * 11.3) % 1.8), // 1px to 2.8px
          baseOpacity: 0.15 + ((seed * 13.7) % 0.45), // 0.15 to 0.6 opacity
          opacity: 0,
          driftX: (((seed * 2.3) % 2) - 1) * 0.05,
          driftY: (((seed * 5.9) % 2) - 1) * 0.05,
          parallaxSpeed: 0.02 + ((seed * 17.3) % 0.15),
          colorType,
        });
      }
    };

    window.addEventListener('resize', resize);
    resize();

    let animId: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      const scrollY = window.scrollY;

      particles.forEach((p) => {
        // Slow float
        p.x += p.driftX;
        p.y += p.driftY;

        // Wrap around bounds
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Calculate y coordinate based on scroll parallax
        const scrolledY = (p.y + scrollY * p.parallaxSpeed) % canvas.height;
        
        // Pulse opacity slightly for twinkle effect
        const pulse = 0.8 + 0.25 * Math.sin(time * 3 + p.x * 0.05 + p.y * 0.05);
        p.opacity = p.baseOpacity * pulse;

        const baseColor = colors[p.colorType];
        ctx.beginPath();
        ctx.arc(p.x, scrolledY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${baseColor}${p.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default BackgroundParticles;
