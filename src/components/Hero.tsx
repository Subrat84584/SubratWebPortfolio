import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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

// Terminal build panel
const BUILD_LINES = [
  { text: "$ flutter build apk --release", color: "var(--accent-2)", delay: 0.4 },
  { text: "Compiling lib/main.dart...", color: "var(--muted)", delay: 0.9 },
  { text: "Running Gradle task: :app:bundleRelease", color: "var(--muted)", delay: 1.3 },
  { text: "✓ Compiled in 1.84s", color: "var(--accent)", delay: 1.7 },
  { text: "✓ APK size: 18.2 MB", color: "var(--accent)", delay: 2.0 },
  { text: "✓ Ready for deployment", color: "var(--accent)", delay: 2.3 },
  { text: "", color: "", delay: 2.5 },
  { text: "$ Performance audit", color: "var(--accent-2)", delay: 2.7 },
  { text: "✓ Startup: 310ms", color: "var(--accent)", delay: 3.0 },
  { text: "✓ Frame rate: 60fps steady", color: "var(--accent)", delay: 3.2 },
  { text: "✓ Memory: 48MB peak", color: "var(--accent)", delay: 3.4 },
];

function TerminalPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" as const }}
      className="relative w-full max-w-[430px] rounded-2xl overflow-hidden"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        boxShadow: "0 10px 40px var(--border)",
      }}
    >
      {/* Chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "var(--accent-2)" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "var(--accent)" }} />
        <span className="ml-3 text-xs font-mono" style={{ color: "var(--muted)" }}>build.log</span>

        {/* Live indicator */}
        <span className="ml-auto flex items-center gap-1.5 text-xs font-mono" style={{ color: "var(--accent)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
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
          style={{ color: "var(--muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6 }}
        >
          <span>$</span>
          <motion.span
            className="inline-block w-2 h-4 rounded-sm"
            style={{ background: "var(--accent-2)" }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-4 py-2 text-xs font-mono border-t"
        style={{ borderColor: "var(--border)", color: "var(--muted)" }}
      >
        <span>Flutter 3.22 · Dart 3.4</span>
        <span style={{ color: "var(--accent)" }}>✓ Build successful</span>
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
      style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
    >
      <span className="text-2xl font-bold" style={{ color: "var(--accent-2)" }}>
        {count}{suffix}
      </span>
      <span className="text-xs mt-0.5 font-mono" style={{ color: "var(--muted)" }}>{label}</span>
    </div>
  );
}

// Assembled name
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
            style={{ fontWeight: 800 }}
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
      className="relative min-h-screen flex items-center overflow-hidden z-10"
      style={{ background: "transparent" }}
    >
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
                  border: "1px solid var(--border)",
                  background: "rgba(16, 185, 129, 0.08)",
                  color: "var(--accent)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
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
                  className="text-[var(--text)]"
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
                  className="text-[var(--text)]"
                />
              </div>
            </motion.div>

            {/* Typewriter role */}
            <motion.div variants={itemVariants} className="h-8 flex items-center">
              <span className="text-lg sm:text-xl font-mono font-medium" style={{ color: "var(--accent)" }}>
                {typewritten}
                <span
                  className="inline-block w-0.5 h-5 ml-0.5 align-middle"
                  style={{ background: "var(--accent-2)", animation: "pulse 1s ease-in-out infinite" }}
                />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--muted)" }}
            >
              Building scalable, high-performance mobile applications for Android and iOS.
              Crafting experiences that merge excellent engineering with beautiful design.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 4px 20px rgba(16, 185, 129, 0.2)",
                }}
              >
                View Projects <ArrowRight size={15} />
              </a>

              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--card-bg)",
                  color: "var(--text)",
                }}
              >
                <Download size={15} /> Resume
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors duration-200 group"
                style={{ color: "var(--muted)" }}
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
                style={{ border: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--muted)" }}
                aria-label="GitHub"
              >
                <GitBranch size={17} />
              </a>
              <a
                href="https://linkedin.com/in/subrat-acharya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-all duration-200"
                style={{ border: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--muted)" }}
                aria-label="LinkedIn"
              >
                <Link2 size={17} />
              </a>
              <span className="h-px flex-1 max-w-[60px]" style={{ background: "var(--border)" }} />
              <span className="text-xs font-mono" style={{ color: "var(--border)" }}>v3.0</span>
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
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted)" }}>
          Keep Scrolling
        </span>
        <motion.div
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
        />
      </motion.div>
    </section>
  );
}
