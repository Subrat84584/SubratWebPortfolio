import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Tech {
  name: string;
  icon: string;
  color: string;
  border: string;
  glow: string;
}

const row1: Tech[] = [
  { name: "Flutter", icon: "🐦", color: "text-blue-300", border: "border-blue-500/30", glow: "#3b82f6" },
  { name: "Dart", icon: "🎯", color: "text-cyan-300", border: "border-cyan-500/30", glow: "#06b6d4" },
  { name: "Kotlin", icon: "K", color: "text-purple-300", border: "border-purple-500/30", glow: "#a855f7" },
  { name: "Swift", icon: "🦅", color: "text-orange-300", border: "border-orange-500/30", glow: "#f97316" },
  { name: "Android", icon: "🤖", color: "text-green-300", border: "border-green-500/30", glow: "#22c55e" },
  { name: "iOS", icon: "🍎", color: "text-gray-300", border: "border-gray-500/30", glow: "#6b7280" },
  { name: "React Native", icon: "⚛", color: "text-sky-300", border: "border-sky-500/30", glow: "#0ea5e9" },
  { name: "TypeScript", icon: "TS", color: "text-blue-400", border: "border-blue-400/30", glow: "#60a5fa" },
];

const row2: Tech[] = [
  { name: "Firebase", icon: "🔥", color: "text-yellow-300", border: "border-yellow-500/30", glow: "#eab308" },
  { name: "Node.js", icon: "⬡", color: "text-green-400", border: "border-green-400/30", glow: "#4ade80" },
  { name: "REST API", icon: "🔗", color: "text-teal-300", border: "border-teal-500/30", glow: "#14b8a6" },
  { name: "GraphQL", icon: "◈", color: "text-pink-300", border: "border-pink-500/30", glow: "#ec4899" },
  { name: "Git", icon: "⑂", color: "text-red-300", border: "border-red-500/30", glow: "#ef4444" },
  { name: "Docker", icon: "🐳", color: "text-blue-300", border: "border-blue-400/30", glow: "#3b82f6" },
  { name: "AWS", icon: "☁", color: "text-amber-300", border: "border-amber-500/30", glow: "#f59e0b" },
  { name: "Figma", icon: "✦", color: "text-purple-300", border: "border-purple-400/30", glow: "#a855f7" },
];

// Duplicate for seamless infinite marquee
const doubled1 = [...row1, ...row1];
const doubled2 = [...row2, ...row2];

interface SkillCategory {
  label: string;
  percent: number;
  color: string;
  trackColor: string;
  icon: string;
}

const skills: SkillCategory[] = [
  { label: "Mobile", percent: 95, color: "#3b82f6", trackColor: "#1e3a5f", icon: "📱" },
  { label: "Backend", percent: 80, color: "#a855f7", trackColor: "#2d1b4e", icon: "⚙️" },
  { label: "DevOps", percent: 70, color: "#22c55e", trackColor: "#0f2d1a", icon: "🛠️" },
  { label: "UI/UX", percent: 85, color: "#f97316", trackColor: "#3d1f0d", icon: "🎨" },
];

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function circumferenceOffset(percent: number): number {
  return CIRCUMFERENCE * (1 - percent / 100);
}

function ProgressRing({ skill }: { skill: SkillCategory }) {
  const ref = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          className="-rotate-90 absolute inset-0"
          aria-hidden="true"
        >
          {/* Track circle */}
          <circle
            cx="64"
            cy="64"
            r={RADIUS}
            fill="none"
            strokeWidth="8"
            stroke={skill.trackColor}
          />
          {/* Progress circle */}
          <motion.circle
            ref={ref}
            cx="64"
            cy="64"
            r={RADIUS}
            fill="none"
            strokeWidth="8"
            stroke={skill.color}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={
              inView
                ? { strokeDashoffset: circumferenceOffset(skill.percent) }
                : { strokeDashoffset: CIRCUMFERENCE }
            }
            transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.2 }}
            style={{
              filter: `drop-shadow(0 0 6px ${skill.color}99)`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-xl mb-0.5">{skill.icon}</span>
          <motion.span
            className="text-xl font-bold text-white tabular-nums"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {inView ? `${skill.percent}%` : "0%"}
          </motion.span>
        </div>
      </div>

      <div className="text-center">
        <p className="font-semibold text-white text-sm">{skill.label}</p>
        <p className="text-xs text-gray-500 mt-0.5">Proficiency</p>
      </div>
    </div>
  );
}

function TechBadge({ tech }: { tech: Tech }) {
  return (
    <motion.div
      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border ${tech.border} mx-2 cursor-default select-none`}
      style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)" }}
      whileHover={{
        scale: 1.08,
        boxShadow: `0 0 18px ${tech.glow}55`,
        borderColor: `${tech.glow}66`,
      }}
      transition={{ duration: 0.18 }}
    >
      <span
        className={`text-base font-bold ${
          tech.icon.length <= 2 ? `text-sm ${tech.color}` : ""
        }`}
        aria-hidden="true"
      >
        {tech.icon}
      </span>
      <span className={`text-sm font-medium whitespace-nowrap ${tech.color}`}>
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
      style={{ background: "#0a0a0f" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-blue-400 mb-3">
            Technologies
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            My Tech{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Arsenal
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg">
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Marquee rows */}
        <div className="space-y-4 mb-16 overflow-hidden">
          {/* Row 1: scrolls left */}
          <div className="relative flex">
            {/* Fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(90deg, #0a0a0f, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(-90deg, #0a0a0f, transparent)" }} />

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
              style={{ background: "linear-gradient(90deg, #0a0a0f, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(-90deg, #0a0a0f, transparent)" }} />

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
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        {/* Skill proficiency rings */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white">
            Skill{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Proficiency
            </span>
          </h3>
          <p className="text-gray-400 mt-2 text-sm">Self-assessed expertise across domains</p>
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
