import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TERMINAL_LINES = [
  { text: '$ ./launch-portfolio.sh', delay: 0,    color: '#F5D000' },
  { text: '> Initializing Subrat K. Acharya...', delay: 380,  color: '#39D353' },
  { text: '> Stack: Flutter · Android · iOS · Firebase', delay: 760,  color: '#D4E8D4' },
  { text: '> 5 apps · 50K+ users · 2+ years', delay: 1100, color: '#D4E8D4' },
  { text: '> ✓ All systems go.', delay: 1600, color: '#39D353' },
];

const Loader: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, ease: 'easeInOut' as const }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8"
      style={{ backgroundColor: '#0B0B0B' }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,208,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245,208,0,0.025) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      {/* SKA monogram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'backOut' as const }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="flex items-baseline gap-0.5 select-none">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: 'backOut' as const }}
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F5D000', fontSize: '3.5rem', fontWeight: 700, lineHeight: 1 }}
          >
            S
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: 'backOut' as const }}
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#D4E8D4', fontSize: '3.5rem', fontWeight: 700, lineHeight: 1 }}
          >
            K
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: 'backOut' as const }}
            style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#39D353', fontSize: '3.5rem', fontWeight: 700, lineHeight: 1 }}
          >
            A
          </motion.span>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' as const }}
          className="mt-2 h-px w-20"
          style={{
            background: 'linear-gradient(90deg, #F5D000, #39D353)',
            transformOrigin: 'left',
          }}
        />
      </motion.div>

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' as const }}
        className="relative z-10 w-[300px] sm:w-[400px] rounded-xl overflow-hidden"
        style={{
          background: 'rgba(13, 20, 12, 0.95)',
          border: '1px solid rgba(245, 208, 0, 0.18)',
          boxShadow: '0 0 40px rgba(245, 208, 0, 0.05)',
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: 'rgba(245, 208, 0, 0.1)', background: 'rgba(13, 20, 12, 0.8)' }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#F5D000' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#39D353' }} />
          <span className="ml-3 text-xs font-mono" style={{ color: '#3A5A37' }}>portfolio.sh</span>
        </div>

        {/* Terminal output */}
        <div className="p-5 font-mono text-sm space-y-1.5" style={{ minHeight: '148px' }}>
          {TERMINAL_LINES.map((line, i) => (
            <AnimatePresence key={i}>
              {visibleLines.includes(i) && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ color: line.color, lineHeight: 1.6 }}
                >
                  {line.text}
                  {i === TERMINAL_LINES.length - 1 && (
                    <motion.span
                      className="inline-block w-2 h-4 ml-1 align-middle rounded-sm"
                      style={{ background: '#39D353' }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
