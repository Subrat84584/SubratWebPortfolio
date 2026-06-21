import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TERMINAL_LINES = [
  { text: '$ ./launch-portfolio.sh', delay: 0,    color: 'var(--accent-2)' },
  { text: '> Initializing Subrat K. Acharya...', delay: 380,  color: 'var(--accent)' },
  { text: '> Stack: Flutter · Android · iOS · Firebase', delay: 760,  color: 'var(--text)' },
  { text: '> 5 apps · 50K+ users · 2+ years', delay: 1100, color: 'var(--text)' },
  { text: '> ✓ All systems go.', delay: 1600, color: 'var(--accent)' },
];

const Loader: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    TERMINAL_LINES.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, TERMINAL_LINES[i].delay);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, ease: 'easeInOut' as const }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8"
      style={{ backgroundColor: 'var(--ground)' }}
    >
      {/* Monogram */}
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
            style={{ color: 'var(--accent-2)', fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}
          >
            S
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: 'backOut' as const }}
            style={{ color: 'var(--text)', fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}
          >
            K
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: 'backOut' as const }}
            style={{ color: 'var(--accent)', fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}
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
            background: 'linear-gradient(90deg, var(--accent-2), var(--accent))',
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
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          boxShadow: '0 8px 32px var(--border)',
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: 'var(--border)', background: 'rgba(99, 102, 241, 0.03)' }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: 'var(--accent-2)' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: 'var(--accent)' }} />
          <span className="ml-3 text-xs font-mono" style={{ color: 'var(--muted)' }}>portfolio.sh</span>
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
                      style={{ background: 'var(--accent)' }}
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
