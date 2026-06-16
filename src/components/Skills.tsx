import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Skill = {
  name: string;
  emoji: string;
  percent: number;
};

type Category = {
  id: string;
  label: string;
  skills: Skill[];
};

const CATEGORIES: Category[] = [
  {
    id: "mobile",
    label: "Mobile Development",
    skills: [
      { name: "Flutter", emoji: "🐦", percent: 95 },
      { name: "Dart", emoji: "🎯", percent: 92 },
      { name: "Android SDK", emoji: "🤖", percent: 88 },
      { name: "Kotlin", emoji: "🔷", percent: 85 },
      { name: "Swift", emoji: "🦅", percent: 80 },
      { name: "SwiftUI", emoji: "🎨", percent: 75 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Firebase", emoji: "🔥", percent: 90 },
      { name: "REST APIs", emoji: "🔗", percent: 88 },
      { name: "Node.js", emoji: "🟢", percent: 75 },
      { name: "Express", emoji: "⚡", percent: 70 },
    ],
  },
  {
    id: "database",
    label: "Database",
    skills: [
      { name: "Firebase Firestore", emoji: "📦", percent: 90 },
      { name: "SQLite", emoji: "🗄️", percent: 82 },
      { name: "MySQL", emoji: "🐬", percent: 78 },
    ],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    skills: [
      { name: "Git", emoji: "🌳", percent: 92 },
      { name: "GitHub", emoji: "🐙", percent: 90 },
      { name: "Android Studio", emoji: "🤖", percent: 88 },
      { name: "Xcode", emoji: "🔨", percent: 80 },
      { name: "VS Code", emoji: "💻", percent: 88 },
      { name: "Postman", emoji: "📬", percent: 85 },
    ],
  },
];

const LEARNING = [
  { name: "Rust", emoji: "🦀" },
  { name: "Jetpack Compose", emoji: "🎭" },
  { name: "SwiftUI Advanced", emoji: "✨" },
];

function getBarColor(percent: number): string {
  if (percent >= 90) return "linear-gradient(90deg, #38bdf8, #0ea5e9)";
  if (percent >= 80) return "linear-gradient(90deg, #818cf8, #6366f1)";
  if (percent >= 70) return "linear-gradient(90deg, #a78bfa, #8b5cf6)";
  return "linear-gradient(90deg, #c084fc, #a855f7)";
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" as const }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative rounded-2xl p-5 border border-white/10 overflow-hidden cursor-default"
      style={{ background: "rgba(15,15,26,0.75)", backdropFilter: "blur(16px)" }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(56,189,248,0.1), transparent 70%)" }}
      />

      <div className="relative z-10">
        {/* Icon + Name + % row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none">{skill.emoji}</span>
            <span className="text-white font-semibold text-sm sm:text-base">{skill.name}</span>
          </div>
          <span className="text-xs font-mono font-bold" style={{ color: "#38bdf8" }}>
            {skill.percent}%
          </span>
        </div>

        {/* Progress track */}
        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: getBarColor(skill.percent) }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.percent}%` }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, delay: index * 0.06 + 0.2, ease: "easeOut" as const }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("mobile");

  const activeCategory = CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <section id="skills" className="relative bg-[#0a0a0f] py-24 sm:py-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[400px] bg-sky-900/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[350px] bg-purple-900/12 blur-[110px] rounded-full" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Skills & Expertise
          </h2>
          <div
            className="mx-auto h-1 w-24 rounded-full"
            style={{ background: "linear-gradient(90deg, #38bdf8, #8b5cf6)" }}
          />
          <p className="mt-4 text-slate-500 text-sm uppercase tracking-widest font-mono">
            Technologies I work with
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 outline-none"
                style={{
                  color: isActive ? "#fff" : "#64748b",
                  border: isActive ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(14,165,233,0.25), rgba(139,92,246,0.25))"
                    : "rgba(255,255,255,0.04)",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-highlight"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(14,165,233,0.18), rgba(139,92,246,0.18))",
                      border: "1px solid rgba(56,189,248,0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeCategory.skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All skills summary strip */}
        <motion.div
          className="mt-12 p-6 rounded-2xl border border-white/10"
          style={{ background: "rgba(15,15,26,0.6)", backdropFilter: "blur(16px)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-center text-xs text-slate-600 uppercase tracking-widest font-mono mb-5">
            All technologies
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.flatMap((c) =>
              c.skills.map((s) => (
                <span
                  key={`${c.id}-${s.name}`}
                  className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-slate-400
                             hover:border-sky-500/30 hover:text-sky-400 hover:bg-sky-500/10 transition-all duration-200 cursor-default"
                >
                  {s.emoji} {s.name}
                </span>
              ))
            )}
          </div>
        </motion.div>

        {/* Currently Learning */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="rounded-2xl p-6 border overflow-hidden relative"
            style={{
              borderColor: "rgba(139,92,246,0.25)",
              background: "linear-gradient(135deg, rgba(139,92,246,0.07), rgba(56,189,248,0.05))",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Decorative corner glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="text-xl">📚</span>
                <span className="text-white font-semibold text-sm whitespace-nowrap">Currently Learning</span>
                <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                  2026
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {LEARNING.map((item, i) => (
                  <motion.span
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.06 }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
                               border border-purple-500/30 bg-purple-500/15 text-purple-200 cursor-default"
                  >
                    <span>{item.emoji}</span>
                    {item.name}
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
