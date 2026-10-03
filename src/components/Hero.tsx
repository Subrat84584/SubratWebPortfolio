import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Smartphone,
  Cpu,
  HeartPulse,
  ShoppingBag,
  Award,
} from 'lucide-react';
import sqsHeroBg from '../assets/sqs-hero-bg.webp';
import stageCertImg from '../assets/convocation-stage-cert.jpg';
import familyOutdoorImg from '../assets/convocation-family-outdoor.jpg';

interface HeroProps {
  onOpenGetStarted: () => void;
}

export default function Hero({ onOpenGetStarted }: HeroProps) {
  const [appIdeaPrompt, setAppIdeaPrompt] = useState('');

  const quickPrompts = ['IoT & BLE Boxing', 'Autism Healthcare', 'FinTech SuperApp', 'E-Commerce'];

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="relative w-full bg-black text-white overflow-hidden select-none">
      {/* ───────────────────────────────────────────────────────────
          HERO SECTION: AUTHENTIC LIGHT-TO-DARK CANVAS (SQUARESPACE STYLE)
          - Background: Light Alabaster (#FAF9F7) + Warm Champagne/Sepia Haze
          - Headline: PITCH BLACK (#000000)
          - Subtitle: CHARCOAL GREY (#444444)
          - Dual Cards: PITCH BLACK (#0B0B0E) with PURE WHITE TEXT (#FFFFFF)
      ─────────────────────────────────────────────────────────── */}
      <div className="relative w-full bg-[#FAF9F7] pt-32 sm:pt-36 pb-20 overflow-hidden">
        
        {/* Authentic Squarespace Atmospheric Canvas (Warm Champagne & Sepia Vignette) */}
        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <img
            src={sqsHeroBg}
            alt=""
            className="w-full h-full object-cover object-top opacity-95"
            loading="eager"
          />
        </picture>

        {/* Seamless Bottom Gradient Fade into Deep Pitch Black (#000000) */}
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent via-black/60 to-black z-1 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center text-center">
          

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
            className="text-base sm:text-lg text-neutral-700 font-normal tracking-wide mt-4 mb-14"
          >
            No complex overhead required. From architecture to production-grade mobile deployment.
          </motion.p>

          {/* ───────────────────────────────────────────────────────
              DUAL BLACK SHOWCASE CARDS (FLOATING ON LIGHT/WARM CANVAS)
          ─────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl text-left">
            
            {/* ── CARD 1: BLUEPRINT AI & CUSTOM APP BUILDER (DEEP BLACK) ── */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-2xl bg-[#0B0B0E] border border-white/10 hover:border-white/25 transition-all duration-300 p-7 sm:p-9 flex flex-col justify-between min-h-[480px] overflow-hidden group shadow-2xl text-white"
            >
              {/* Red TIME 2025-style Badge */}
              <div className="flex items-center justify-between w-full">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#D83B2B] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-lg">
                  <Award size={13} className="text-white" />
                  <span>MCA GOLD '24 • FLUTTER SPECIALIST</span>
                </div>
              </div>

              {/* Center Interactive App Idea Capsule */}
              <div className="my-auto py-8 w-full flex flex-col items-center">
                <div className="relative w-full max-w-sm rounded-full bg-white/10 border border-white/20 px-4 py-3.5 backdrop-blur-md shadow-2xl flex items-center gap-3 focus-within:border-white/60 transition-all">
                  <Sparkles size={16} className="text-white flex-shrink-0 animate-pulse" />
                  <input
                    type="text"
                    value={appIdeaPrompt}
                    onChange={(e) => setAppIdeaPrompt(e.target.value)}
                    placeholder="What's your mobile app called?"
                    className="w-full bg-transparent text-sm text-white placeholder-neutral-400 focus:outline-none font-sans"
                  />
                  {appIdeaPrompt && (
                    <button
                      onClick={onOpenGetStarted}
                      className="px-2.5 py-1 rounded-full bg-white text-black text-[11px] font-bold uppercase hover:bg-neutral-200 transition-colors"
                    >
                      Start
                    </button>
                  )}
                </div>

                {/* Quick suggestions pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        setAppIdeaPrompt(prompt);
                        onOpenGetStarted();
                      }}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-white/15 bg-white/5 text-neutral-300 hover:text-white hover:border-white/40 transition-all cursor-pointer"
                    >
                      +{prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Information & Action */}
              <div className="flex flex-col gap-2 pt-6 border-t border-white/10">
                <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
                  Custom Mobile Engineering
                </span>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  Answer a few questions and let our production-grade Flutter architecture do the rest.
                </p>
                <button
                  onClick={onOpenGetStarted}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-sans font-bold text-white hover:text-neutral-300 transition-colors cursor-pointer group/link w-fit"
                >
                  <span>Build with Subrat</span>
                  <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* ── CARD 2: PRODUCTION WORKS MONTAGE (DEEP BLACK) ── */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative rounded-2xl bg-[#0B0B0E] border border-white/10 hover:border-white/25 transition-all duration-300 p-7 sm:p-9 flex flex-col justify-between min-h-[480px] overflow-hidden group shadow-2xl text-white"
            >
              {/* Grid Montage of Real Projects & Convocation (Squarespace Multi-Tile Style) */}
              <div className="grid grid-cols-3 gap-2.5 my-auto py-2 w-full">
                
                {/* Tile 1: HitnMove Boxing IoT */}
                <div
                  onClick={scrollToProjects}
                  className="group/tile relative aspect-[4/3] rounded-lg bg-neutral-900 border border-white/15 overflow-hidden flex flex-col items-center justify-center p-2 text-center cursor-pointer hover:border-white/35 transition-all"
                >
                  <Cpu size={18} className="text-neutral-300 mb-1 group-hover/tile:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">HitnMove</span>
                  <span className="text-[8px] text-neutral-400">IoT &amp; BLE Sensors</span>
                </div>

                {/* Tile 2: KareSpecial Healthcare */}
                <div
                  onClick={scrollToProjects}
                  className="group/tile relative aspect-[4/3] rounded-lg bg-neutral-900 border border-white/15 overflow-hidden flex flex-col items-center justify-center p-2 text-center cursor-pointer hover:border-white/35 transition-all"
                >
                  <HeartPulse size={18} className="text-neutral-300 mb-1 group-hover/tile:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">KareSpecial</span>
                  <span className="text-[8px] text-neutral-400">Autism Healthcare</span>
                </div>

                {/* Tile 3: MAGAS SuperApp */}
                <div
                  onClick={scrollToProjects}
                  className="group/tile relative aspect-[4/3] rounded-lg bg-neutral-900 border border-white/15 overflow-hidden flex flex-col items-center justify-center p-2 text-center cursor-pointer hover:border-white/35 transition-all"
                >
                  <ShoppingBag size={18} className="text-neutral-300 mb-1 group-hover/tile:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">MAGAS</span>
                  <span className="text-[8px] text-neutral-400">B2B Super App</span>
                </div>

                {/* Tile 4: Convocation Stage Photo */}
                <div
                  onClick={scrollToProjects}
                  className="group/tile relative aspect-[4/3] rounded-lg bg-neutral-900 border border-white/15 overflow-hidden cursor-pointer hover:border-white/35 transition-all"
                >
                  <img
                    src={stageCertImg}
                    alt="Silicon University Convocation"
                    className="w-full h-full object-cover group-hover/tile:scale-105 transition-transform duration-300 brightness-90"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-1.5">
                    <span className="text-[9px] font-mono font-bold text-white">MCA Stage '24</span>
                  </div>
                </div>

                {/* Tile 5: Native 60fps Flutter Architecture */}
                <div
                  onClick={scrollToProjects}
                  className="group/tile relative aspect-[4/3] rounded-lg bg-neutral-900 border border-white/15 overflow-hidden flex flex-col items-center justify-center p-2 text-center cursor-pointer hover:border-white/35 transition-all"
                >
                  <Smartphone size={18} className="text-neutral-300 mb-1 group-hover/tile:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">iOS &amp; Android</span>
                  <span className="text-[8px] text-neutral-400">60 FPS Native</span>
                </div>

                {/* Tile 6: Convocation Outdoor Photo */}
                <div
                  onClick={scrollToProjects}
                  className="group/tile relative aspect-[4/3] rounded-lg bg-neutral-900 border border-white/15 overflow-hidden cursor-pointer hover:border-white/35 transition-all"
                >
                  <img
                    src={familyOutdoorImg}
                    alt="Convocation Celebration"
                    className="w-full h-full object-cover group-hover/tile:scale-105 transition-transform duration-300 brightness-90"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-1.5">
                    <span className="text-[9px] font-mono font-bold text-white">Silicon Univ</span>
                  </div>
                </div>
              </div>

              {/* Bottom Information & Action */}
              <div className="flex flex-col gap-2 pt-6 border-t border-white/10">
                <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
                  Production Works &amp; Architecture
                </span>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                  Crafted by Subrat Kumar Acharya, optimized by AI—just for your mobile business.
                </p>
                <button
                  onClick={scrollToProjects}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-sans font-bold text-white hover:text-neutral-300 transition-colors cursor-pointer group/link w-fit"
                >
                  <span>Browse mobile apps &amp; works</span>
                  <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Clean Footnote on the Darkening Gradient Base */}
          <p className="mt-14 text-xs font-mono tracking-wider text-neutral-400 uppercase z-10">
            Cross-Platform Flutter &amp; Dart Architecture • Powering live client apps in USA, Europe &amp; India*
          </p>
        </div>
      </div>
    </section>
  );
}
