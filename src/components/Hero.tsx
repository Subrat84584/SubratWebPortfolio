import { motion } from 'framer-motion';

interface HeroProps {
  onOpenGetStarted?: () => void;
}

export default function Hero(_props: HeroProps) {
  return (
    <div id="hero" className="relative w-full pt-28 sm:pt-36 pb-6 sm:pb-8 overflow-hidden select-none z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Central High-Impact Headline: PITCH BLACK TEXT (#000000) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-sans tracking-tight font-medium text-black max-w-4xl leading-[1.08]"
        >
          Getting started has never been easier with Flutter &amp; AI
        </motion.h1>

        {/* Subtitle: CHARCOAL GREY TEXT (#444444) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-neutral-700 font-normal tracking-wide mt-4 mb-2 max-w-2xl"
        >
          No complex overhead required. From architecture to production-grade mobile deployment.
        </motion.p>
      </div>
    </div>
  );
}


