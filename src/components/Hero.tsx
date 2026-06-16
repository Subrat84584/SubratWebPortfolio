import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, GitBranch, Link2 } from "lucide-react";

const ROLES = [
  "Software Development Engineer",
  "Mobile App Developer",
  "Android & iOS Developer",
  "Flutter Developer",
];

const TECH_BADGES = [
  { label: "Flutter", emoji: "🐦", angle: 45 },
  { label: "Android", emoji: "🤖", angle: 120 },
  { label: "iOS", emoji: "🍎", angle: 200 },
  { label: "Firebase", emoji: "🔥", angle: 275 },
  { label: "Kotlin", emoji: "🎯", angle: 340 },
];

const STATS = [
  { value: "5+", label: "Projects" },
  { value: "2+", label: "Years Exp" },
  { value: "2", label: "Platforms" },
];

// Typewriter hook
function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pauseTime);
      }
    } else if (phase === "pausing") {
      setPhase("deleting");
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return displayed;
}

// Particle canvas background
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
}

// Floating tech badge
function TechBadge({ label, emoji, angle, delay }: { label: string; emoji: string; angle: number; delay: number }) {
  const rad = (angle * Math.PI) / 180;
  const radius = 165;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <motion.div
      className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                 bg-[#0f0f1a]/80 border border-white/10 backdrop-blur-md text-white shadow-lg shadow-black/40 cursor-default select-none"
      style={{ left: `calc(50% + ${x}px - 48px)`, top: `calc(50% + ${y}px - 16px)` }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -6, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: { delay, duration: 3, repeat: Infinity, ease: "easeInOut" as const },
      }}
    >
      <span>{emoji}</span>
      <span className="text-slate-300">{label}</span>
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  const typewritten = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0f]"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Particles */}
      <ParticleCanvas />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600 opacity-10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600 opacity-10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── LEFT COLUMN ── */}
          <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Available badge */}
            <motion.div variants={itemVariants} className="flex">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Available for Work
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #38bdf8 0%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Subrat K. Acharya
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={itemVariants} className="h-8 flex items-center">
              <span className="text-xl sm:text-2xl text-slate-300 font-mono">
                {typewritten}
                <span className="inline-block w-0.5 h-6 bg-sky-400 ml-0.5 animate-pulse" />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Building scalable, high-performance mobile applications for Android and iOS.
              Crafting experiences that merge excellent engineering with beautiful design.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {/* Primary */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm
                           shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:scale-105 active:scale-95
                           transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)" }}
              >
                View Projects <ArrowRight size={16} />
              </a>

              {/* Secondary */}
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm
                           border border-white/20 bg-white/5 text-white backdrop-blur-sm
                           hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95
                           transition-all duration-200"
              >
                <Download size={16} /> Download Resume
              </a>

              {/* Ghost */}
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-slate-400
                           hover:text-sky-400 transition-colors duration-200 group"
              >
                <Mail size={15} />
                Contact Me
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-white/10 bg-white/5 text-slate-400
                           hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-200"
                aria-label="GitHub"
              >
                <GitBranch size={18} />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-white/10 bg-white/5 text-slate-400
                           hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Link2 size={18} />
              </a>
              <span className="h-px flex-1 max-w-[60px] bg-white/10" />
              <span className="text-xs text-slate-600 font-mono">v2.0</span>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex gap-3 flex-wrap">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm
                             flex flex-col items-center min-w-[80px]"
                >
                  <span className="text-xl font-bold text-white">{s.value}</span>
                  <span className="text-xs text-slate-500 mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN — hidden on very small phones, shown sm+ ── */}
          <motion.div
            className="hidden sm:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
          >
            <div className="relative w-[260px] h-[260px] xs:w-[300px] xs:h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px]">
              {/* Background glow */}
              <div className="absolute inset-[-20px] rounded-full bg-gradient-to-br from-sky-600/20 to-purple-600/20 blur-2xl" />

              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-sky-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" as const }}
              />

              {/* Gradient border circle */}
              <div
                className="absolute inset-2 rounded-full"
                style={{ padding: "3px", background: "linear-gradient(135deg, #38bdf8, #8b5cf6, #38bdf8)" }}
              >
                <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center">
                  {/* Monogram */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" as const }}
                    className="flex flex-col items-center select-none"
                  >
                    <span
                      className="text-5xl sm:text-6xl font-bold tracking-tight"
                      style={{
                        background: "linear-gradient(135deg, #38bdf8, #8b5cf6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      SKA
                    </span>
                    <span className="text-xs text-slate-600 mt-1 font-mono tracking-widest uppercase">
                      Developer
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Floating tech badges */}
              {TECH_BADGES.map((badge, i) => (
                <TechBadge key={badge.label} {...badge} delay={0.8 + i * 0.12} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-xs text-slate-600 tracking-widest uppercase font-mono">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-sky-500/60 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
        />
      </motion.div>
    </section>
  );
}
