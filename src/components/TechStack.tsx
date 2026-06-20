import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Tech {
  name: string;
  icon: string;
  glow: string;
  isYellow: boolean;
}

const row1: Tech[] = [
  { name: "Flutter",      icon: "🐦", glow: "#F5D000", isYellow: true  },
  { name: "Dart",         icon: "🎯", glow: "#39D353", isYellow: false },
  { name: "Kotlin",       icon: "K",  glow: "#F5D000", isYellow: true  },
  { name: "Swift",        icon: "🦅", glow: "#39D353", isYellow: false },
  { name: "Android",      icon: "🤖", glow: "#F5D000", isYellow: true  },
  { name: "iOS",          icon: "🍎", glow: "#39D353", isYellow: false },
  { name: "React Native", icon: "⚛",  glow: "#F5D000", isYellow: true  },
  { name: "TypeScript",   icon: "TS", glow: "#39D353", isYellow: false },
];

const row2: Tech[] = [
  { name: "Firebase",  icon: "🔥", glow: "#39D353", isYellow: false },
  { name: "Node.js",   icon: "⬡",  glow: "#F5D000", isYellow: true  },
  { name: "REST API",  icon: "🔗", glow: "#39D353", isYellow: false },
  { name: "GraphQL",   icon: "◈",  glow: "#F5D000", isYellow: true  },
  { name: "Git",       icon: "⑂",  glow: "#39D353", isYellow: false },
  { name: "Docker",    icon: "🐳", glow: "#F5D000", isYellow: true  },
  { name: "AWS",       icon: "☁",  glow: "#39D353", isYellow: false },
  { name: "Figma",     icon: "✦",  glow: "#F5D000", isYellow: true  },
];

const doubled1 = [...row1, ...row1];
const doubled2 = [...row2, ...row2];

interface SkillCategory {
  label: string;
  percent: number;
  icon: string;
  isYellow: boolean;
}

const skills: SkillCategory[] = [
  { label: "Mobile",  percent: 95, icon: "📱", isYellow: true  },
  { label: "Backend", percent: 80, icon: "⚙️", isYellow: false },
  { label: "DevOps",  percent: 70, icon: "🛠️", isYellow: true  },
  { label: "UI/UX",   percent: 85, icon: "🎨", isYellow: false },
];

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function circumferenceOffset(percent: number): number {
  return CIRCUMFERENCE * (1 - percent / 100);
}

function ProgressRing({ skill }: { skill: SkillCategory }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });

  const color      = skill.isYellow ? "#F5D000" : "#39D353";
  const trackColor = skill.isYellow ? "rgba(245,208,0,0.10)" : "rgba(57,211,83,0.10)";

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90 absolute inset-0" aria-hidden="true">
          <circle cx="64" cy="64" r={RADIUS} fill="none" strokeWidth="8" stroke={trackColor} />
          <motion.circle
            cx="64" cy="64" r={RADIUS}
            fill="none" strokeWidth="8"
            stroke={color}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={inView ? { strokeDashoffset: circumferenceOffset(skill.percent) } : { strokeDashoffset: CIRCUMFERENCE }}
            transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.2 }}
            style={{ filter: `drop-shadow(0 0 6px ${color}99)` }}
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          <span className="text-xl mb-0.5">{skill.icon}</span>
          <motion.span
            className="text-xl font-bold tabular-nums"
            style={{ color: "#D4E8D4" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {inView ? `${skill.percent}%` : "0%"}
          </motion.span>
        </div>
      </div>

      <div className="text-center">
        <p className="font-semibold text-sm" style={{ color: "#D4E8D4" }}>{skill.label}</p>
        <p className="text-xs mt-0.5 font-mono" style={{ color: "#2A3A28" }}>Proficiency</p>
      </div>
    </div>
  );
}

function TechBadge({ tech }: { tech: Tech }) {
  const textColor  = tech.isYellow ? "#D4A800" : "#2DB345";
  const borderBase = tech.isYellow ? "rgba(245,208,0,0.18)" : "rgba(57,211,83,0.18)";

  return (
    <motion.div
      className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full mx-2 cursor-default select-none border"
      style={{ background: "rgba(13,20,12,0.70)", backdropFilter: "blur(8px)", borderColor: borderBase }}
      whileHover={{
        scale: 1.08,
        boxShadow: `0 0 18px ${tech.glow}44`,
        borderColor: `${tech.glow}55`,
      }}
      transition={{ duration: 0.18 }}
    >
      <span
        className={`font-bold ${tech.icon.length <= 2 ? "text-sm" : "text-base"}`}
        style={{ color: textColor }}
        aria-hidden="true"
      >
        {tech.icon}
      </span>
      <span className="text-sm font-medium whitespace-nowrap" style={{ color: textColor }}>
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="relative py-24 overflow-hidden"
      style={{ background: "#0B0B0B" }}
    >
      {/* Background orb */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(245,208,0,0.03), transparent)" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "#39D353" }}>
            Technologies
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: "#D4E8D4", fontFamily: "Space Grotesk, sans-serif" }}>
            My Tech{" "}
            <span style={{
              background: "linear-gradient(135deg, #F5D000, #39D353)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Arsenal
            </span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg" style={{ color: "#5A7A57" }}>
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Marquee rows */}
        <div className="space-y-4 mb-16 overflow-hidden">
          {/* Row 1: scrolls left */}
          <div className="relative flex">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, #0B0B0B, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(-90deg, #0B0B0B, transparent)" }} />

            <motion.div
              className="flex"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 28, ease: "linear" as const }}
            >
              {doubled1.map((tech, i) => (
                <TechBadge key={`r1-${tech.name}-${i}`} tech={tech} />
              ))}
            </motion.div>
          </div>

          {/* Row 2: scrolls right */}
          <div className="relative flex">
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, #0B0B0B, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(-90deg, #0B0B0B, transparent)" }} />

            <motion.div
              className="flex"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 32, ease: "linear" as const }}
            >
              {doubled2.map((tech, i) => (
                <TechBadge key={`r2-${tech.name}-${i}`} tech={tech} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-16"
          style={{ background: "linear-gradient(90deg, transparent, rgba(245,208,0,0.18), transparent)" }}
        />

        {/* Skill rings */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold" style={{ color: "#D4E8D4" }}>
            Skill{" "}
            <span style={{
              background: "linear-gradient(135deg, #F5D000, #39D353)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Proficiency
            </span>
          </h3>
          <p className="mt-2 text-sm font-mono" style={{ color: "#2A3A28" }}>
            Self-assessed expertise across domains
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <ProgressRing skill={skill} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
