import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Mail, GitBranch, Link2 } from "lucide-react";

const ROLES = [
  "Software Development Engineer",
  "Mobile App Developer",
  "Android & iOS Developer",
  "Flutter Developer",
];

const STATS = [
  { value: 5,    suffix: "+", label: "Projects" },
  { value: 2,    suffix: "+", label: "Years Exp" },
  { value: 50,   suffix: "K+", label: "Users" },
];

// Pre-computed per-character animation offsets — deterministic, no Math.random()
const NAME_FIRST = "SUBRAT K.";
const NAME_SECOND = "ACHARYA";

const FIRST_OFFSETS = [
  { y: -70, x: -15 }, { y: 55, x: 10 }, { y: -45, x: -20 },
  { y: 80, x: 15 },   { y: -60, x: 5 }, { y: 65, x: -10 },
  { y: -40, x: 20 },  { y: 50, x: -5 }, { y: -80, x: 12 },
];

const SECOND_OFFSETS = [
  { y: 60, x: -18 }, { y: -55, x: 8 }, { y: 75, x: -12 },
  { y: -65, x: 15 }, { y: 45, x: -8 }, { y: -50, x: 18 },
  { y: 85, x: -6 },
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

// Firefly canvas — yellow/green pulsing particles
function FireflyCanvas() {
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

    // Fireflies: mix of yellow and green
    const flies: {
      x: number; y: number; vx: number; vy: number;
      r: number; phase: number; speed: number; isGreen: boolean;
    }[] = [];

    for (let i = 0; i < 60; i++) {
      flies.push({
        x: (i * 73 + 17) % canvas.width || 100,
        y: (i * 137 + 43) % canvas.height || 200,
        vx: ((i % 5) - 2) * 0.15,
        vy: ((i % 7) - 3) * 0.12,
        r: (i % 4) * 0.5 + 0.8,
        phase: (i * 1.1) % (Math.PI * 2),
        speed: 0.015 + (i % 8) * 0.005,
        isGreen: i % 3 === 0,
      });
    }

    let animId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      flies.forEach((f) => {
        f.x += f.vx;
        f.y += f.vy;
        if (f.x < 0) f.x = canvas.width;
        if (f.x > canvas.width) f.x = 0;
        if (f.y < 0) f.y = canvas.height;
        if (f.y > canvas.height) f.y = 0;

        const pulse = 0.25 + 0.75 * Math.abs(Math.sin(t * f.speed * 20 + f.phase));
        const color = f.isGreen ? `rgba(57,211,83,${pulse * 0.6})` : `rgba(245,208,0,${pulse * 0.55})`;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Soft halo
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 3.5 * pulse);
        grad.addColorStop(0, f.isGreen ? `rgba(57,211,83,${pulse * 0.2})` : `rgba(245,208,0,${pulse * 0.18})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * 3.5 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = grad;
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
      style={{ opacity: 0.7 }}
    />
  );
}

// Terminal build panel
const BUILD_LINES = [
  { text: "$ flutter build apk --release", color: "#F5D000", delay: 0.4 },
  { text: "Compiling lib/main.dart...", color: "#5A7A57", delay: 0.9 },
  { text: "Running Gradle task: :app:bundleRelease", color: "#5A7A57", delay: 1.3 },
  { text: "✓ Compiled in 1.84s", color: "#39D353", delay: 1.7 },
  { text: "✓ APK size: 18.2 MB", color: "#39D353", delay: 2.0 },
  { text: "✓ Ready for deployment", color: "#39D353", delay: 2.3 },
  { text: "", color: "", delay: 2.5 },
  { text: "$ Performance audit", color: "#F5D000", delay: 2.7 },
  { text: "✓ Startup: 310ms", color: "#39D353", delay: 3.0 },
  { text: "✓ Frame rate: 60fps steady", color: "#39D353", delay: 3.2 },
  { text: "✓ Memory: 48MB peak", color: "#39D353", delay: 3.4 },
];

function TerminalPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" as const }}
      className="relative w-full max-w-[430px] rounded-2xl overflow-hidden"
      style={{
        background: "rgba(13, 20, 12, 0.92)",
        border: "1px solid rgba(245, 208, 0, 0.15)",
        boxShadow: "0 0 60px rgba(57, 211, 83, 0.06), 0 24px 80px rgba(0,0,0,0.6)",
      }}
    >
      {/* Chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: "rgba(245, 208, 0, 0.10)" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#F5D000" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#39D353" }} />
        <span className="ml-3 text-xs font-mono" style={{ color: "#3A5A37" }}>build.log</span>

        {/* Live indicator */}
        <span className="ml-auto flex items-center gap-1.5 text-xs font-mono" style={{ color: "#39D353" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#39D353] animate-pulse" />
          live
        </span>
      </div>

      {/* Build output */}
      <div className="p-5 font-mono text-xs space-y-1 overflow-hidden" style={{ minHeight: "220px" }}>
        {BUILD_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: line.delay, duration: 0.3 }}
            style={{ color: line.color || "transparent", lineHeight: 1.8 }}
          >
            {line.text}
          </motion.div>
        ))}

        {/* Blinking cursor */}
        <motion.div
          className="flex items-center gap-1 font-mono text-xs"
          style={{ color: "#5A7A57" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6 }}
        >
          <span>$</span>
          <motion.span
            className="inline-block w-2 h-4 rounded-sm"
            style={{ background: "#F5D000" }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-2 text-xs font-mono border-t"
        style={{ borderColor: "rgba(245, 208, 0, 0.08)", color: "#3A5A37" }}
      >
        <span>Flutter 3.22 · Dart 3.4</span>
        <span style={{ color: "#39D353" }}>✓ Build successful</span>
      </div>
    </motion.div>
  );
}

// Count-up stat
function StatChip({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1200;
        const startTime = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center px-5 py-3 rounded-xl border"
      style={{ background: "rgba(13,20,12,0.7)", borderColor: "rgba(245,208,0,0.12)" }}
    >
      <span className="text-2xl font-bold" style={{ color: "#F5D000", fontFamily: "Space Grotesk, sans-serif" }}>
        {count}{suffix}
      </span>
      <span className="text-xs mt-0.5 font-mono" style={{ color: "#5A7A57" }}>{label}</span>
    </div>
  );
}

// Assembled name — each char springs from random-ish starting position
function AssembledLine({
  text,
  offsets,
  baseDelay = 0,
  className = "",
}: {
  text: string;
  offsets: { y: number; x: number }[];
  baseDelay?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex flex-wrap leading-none ${className}`}>
      {text.split("").map((char, i) => {
        const off = offsets[i] ?? { y: -40, x: 0 };
        return (
          <motion.span
            key={i}
            className="inline-block"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
            initial={{ opacity: 0, y: off.y, x: off.x, scale: 0.6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 18,
              delay: baseDelay + i * 0.045,
            }}
          >
            {char === " " ? " " : char}
          </motion.span>
        );
      })}
    </span>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Hero() {
  const typewritten = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0B0B0B" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(245,208,0,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Firefly particles */}
      <FireflyCanvas />

      {/* Scan line */}
      <div className="scan-line" />

      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,208,0,0.07), transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(57,211,83,0.07), transparent 70%)" }} />

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
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  border: "1px solid rgba(57,211,83,0.30)",
                  background: "rgba(57,211,83,0.08)",
                  color: "#39D353",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39D353] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39D353]" />
                </span>
                Available for Work
              </span>
            </motion.div>

            {/* Assembled name */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <div
                className="text-5xl sm:text-6xl lg:text-7xl tracking-tight"
                style={{ lineHeight: 1.05 }}
              >
                <AssembledLine
                  text={NAME_FIRST}
                  offsets={FIRST_OFFSETS}
                  baseDelay={0.15}
                  className="text-[#F5D000]"
                />
              </div>
              <div
                className="text-5xl sm:text-6xl lg:text-7xl tracking-tight"
                style={{ lineHeight: 1.05 }}
              >
                <AssembledLine
                  text={NAME_SECOND}
                  offsets={SECOND_OFFSETS}
                  baseDelay={0.55}
                  className="text-[#D4E8D4]"
                />
              </div>
            </motion.div>

            {/* Typewriter role */}
            <motion.div variants={itemVariants} className="h-8 flex items-center">
              <span className="text-lg sm:text-xl font-mono" style={{ color: "#39D353" }}>
                {typewritten}
                <span
                  className="inline-block w-0.5 h-5 ml-0.5 align-middle"
                  style={{ background: "#F5D000", animation: "pulse 1s ease-in-out infinite" }}
                />
              </span>
            </motion.div>

            {/* Description — word by word */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ color: "#5A7A57" }}
            >
              Building scalable, high-performance mobile applications for Android and iOS.
              Crafting experiences that merge excellent engineering with beautiful design.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-black transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "#F5D000",
                  boxShadow: "0 4px 24px rgba(245,208,0,0.25)",
                }}
              >
                View Projects <ArrowRight size={15} />
              </a>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  border: "1px solid rgba(57,211,83,0.30)",
                  background: "rgba(57,211,83,0.06)",
                  color: "#39D353",
                }}
              >
                <Download size={15} /> Resume
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors duration-200 group"
                style={{ color: "#5A7A57" }}
              >
                <Mail size={14} />
                Contact
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <a
                href="https://github.com/subrat-acharya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200"
                style={{ border: "1px solid rgba(245,208,0,0.12)", background: "rgba(245,208,0,0.04)", color: "#5A7A57" }}
                aria-label="GitHub"
              >
                <GitBranch size={17} />
              </a>
              <a
                href="https://linkedin.com/in/subrat-acharya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200"
                style={{ border: "1px solid rgba(245,208,0,0.12)", background: "rgba(245,208,0,0.04)", color: "#5A7A57" }}
                aria-label="LinkedIn"
              >
                <Link2 size={17} />
              </a>
              <span className="h-px flex-1 max-w-[60px]" style={{ background: "rgba(245,208,0,0.12)" }} />
              <span className="text-xs font-mono" style={{ color: "#2A3A28" }}>v3.0</span>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex gap-3 flex-wrap">
              {STATS.map((s) => (
                <StatChip key={s.label} {...s} />
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN — terminal panel ── */}
          <div className="hidden sm:flex items-center justify-center">
            <TerminalPanel />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.6 }}
      >
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "#2A3A28" }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, #F5D000, transparent)" }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
        />
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0B0B0B)" }}
      />
    </section>
  );
}
