import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' as const }}
      style={{ backgroundColor: '#0a0a0f' }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      {/* Outer pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute w-32 h-32 rounded-full border border-blue-500/30"
      />

      {/* Middle pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.4 }}
        className="absolute w-28 h-28 rounded-full border border-purple-500/30"
      />

      <div className="flex flex-col items-center gap-6 z-10">
        {/* Monogram circle */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'backOut' as const }}
          className="relative w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)',
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.5), 0 0 80px rgba(14, 165, 233, 0.3)',
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-white font-bold text-4xl select-none"
            style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            S
          </motion.span>

          {/* Shine sweep */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '200%', opacity: [0, 0.6, 0] }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeInOut' as const }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' as const }}
          className="flex flex-col items-center gap-1"
        >
          <span
            className="text-white text-2xl font-semibold tracking-widest"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.15em' }}
          >
            Subrat K. Acharya
          </span>

          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase font-medium"
            style={{
              background: 'linear-gradient(90deg, #0ea5e9, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Software Development Engineer
          </motion.span>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="w-40 h-[2px] rounded-full overflow-hidden"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ delay: 1.2, duration: 1.0, ease: 'easeInOut' as const, repeat: Infinity }}
            className="w-full h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #0ea5e9, #8b5cf6, #ec4899)',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
