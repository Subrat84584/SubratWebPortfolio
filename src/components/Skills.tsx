import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Skill = { name: string; emoji: string; percent: number };
type Category = { id: string; label: string; skills: Skill[] };

const CATEGORIES: Category[] = [
  {
    id: "mobile",
    label: "Mobile Dev",
    skills: [
      { name: "Flutter",    emoji: "🐦", percent: 95 },
      { name: "Dart",       emoji: "🎯", percent: 92 },
      { name: "Android SDK",emoji: "🤖", percent: 88 },
      { name: "Kotlin",     emoji: "🔷", percent: 85 },
      { name: "Swift",      emoji: "🦅", percent: 80 },
      { name: "SwiftUI",    emoji: "🎨", percent: 75 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Firebase",  emoji: "🔥", percent: 90 },
      { name: "REST APIs", emoji: "🔗", percent: 88 },
      { name: "Node.js",   emoji: "🟢", percent: 75 },
      { name: "Express",   emoji: "⚡", percent: 70 },
    ],
  },
  {
    id: "database",
    label: "Database",
    skills: [
      { name: "Firestore", emoji: "📦", percent: 90 },
      { name: "SQLite",    emoji: "🗄️", percent: 82 },
      { name: "MySQL",     emoji: "🐬", percent: 78 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git",            emoji: "🌳", percent: 92 },
      { name: "GitHub",         emoji: "🐙", percent: 90 },
      { name: "Android Studio", emoji: "🤖", percent: 88 },
      { name: "Xcode",          emoji: "🔨", percent: 80 },
      { name: "VS Code",        emoji: "💻", percent: 88 },
      { name: "Postman",        emoji: "📬", percent: 85 },
    ],
  },
];

const LEARNING = [
  { name: "Rust",              emoji: "🦀" },
  { name: "Jetpack Compose",   emoji: "🎭" },
  { name: "SwiftUI Advanced",  emoji: "✨" },
];

// Word-by-word animated heading
function WordReveal({ children }: { children: string }) {
  const words = children.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.28em]"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: i * 0.09, duration: 0.5, ease: "easeOut" as const }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" as const }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative rounded-2xl p-5 border overflow-hidden cursor-default"
      style={{
        background: "rgba(13, 20, 12, 0.80)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(245,208,0,0.10)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(57,211,83,0.10), transparent 70%)" }}
      />
      {/* Hover left bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to bottom, #F5D000, #39D353)" }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none">{skill.emoji}</span>
            <span className="font-semibold text-sm sm:text-base" style={{ color: "#D4E8D4" }}>{skill.name}</span>
          </div>
          <span className="text-xs font-mono font-bold" style={{ color: "#F5D000" }}>
            {skill.percent}%
          </span>
        </div>

        {/* Progress track */}
        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(245,208,0,0.07)" }}>
          <motion.div
            className="h-full rounded-full skill-bar"
            style={{ background: "linear-gradient(90deg, #F5D000 0%, #39D353 100%)" }}
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
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: "#0B0B0B" }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[400px] rounded-full blur-[130px]"
          style={{ background: "rgba(245,208,0,0.04)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[350px] rounded-full blur-[110px]"
          style={{ background: "rgba(57,211,83,0.04)" }} />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(245,208,0,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
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
          <span className="inline-block text-xs font-mono tracking-widest uppercase mb-4" style={{ color: "#39D353" }}>
            Expertise
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "#D4E8D4", fontFamily: "Space Grotesk, sans-serif" }}
          >
            <WordReveal>Skills & Expertise</WordReveal>
          </h2>
          <div className="mx-auto h-px w-24 rounded-full" style={{ background: "linear-gradient(90deg, #F5D000, #39D353)" }} />
          <p className="mt-4 text-sm uppercase tracking-widest font-mono" style={{ color: "#2A3A28" }}>
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
                  color: isActive ? "#0B0B0B" : "#5A7A57",
                  background: isActive ? "#F5D000" : "rgba(245,208,0,0.05)",
                  border: isActive ? "1px solid #F5D000" : "1px solid rgba(245,208,0,0.12)",
                  boxShadow: isActive ? "0 0 20px rgba(245,208,0,0.20)" : "none",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-highlight"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "#F5D000", zIndex: -1 }}
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

        {/* All skills strip */}
        <motion.div
          className="mt-12 p-6 rounded-2xl border"
          style={{ background: "rgba(13, 20, 12, 0.65)", backdropFilter: "blur(16px)", borderColor: "rgba(245,208,0,0.08)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-center text-xs font-mono mb-5 uppercase tracking-widest" style={{ color: "#2A3A28" }}>
            All technologies
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.flatMap((c) =>
              c.skills.map((s) => (
                <motion.span
                  key={`${c.id}-${s.name}`}
                  className="px-3 py-1 rounded-full text-xs font-medium cursor-default transition-all duration-200"
                  style={{
                    border: "1px solid rgba(245,208,0,0.10)",
                    background: "rgba(245,208,0,0.03)",
                    color: "#3A5A37",
                  }}
                  whileHover={{
                    borderColor: "rgba(57,211,83,0.35)",
                    color: "#39D353",
                    background: "rgba(57,211,83,0.08)",
                    scale: 1.04,
                  }}
                >
                  {s.emoji} {s.name}
                </motion.span>
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
              borderColor: "rgba(57,211,83,0.20)",
              background: "linear-gradient(135deg, rgba(57,211,83,0.06), rgba(245,208,0,0.04))",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none blur-3xl"
              style={{ background: "rgba(57,211,83,0.08)" }} />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="text-xl">📚</span>
                <span className="font-semibold text-sm whitespace-nowrap" style={{ color: "#D4E8D4" }}>
                  Currently Learning
                </span>
                <span
                  className="ml-1 px-2 py-0.5 rounded-full text-xs font-mono"
                  style={{ background: "rgba(57,211,83,0.15)", color: "#39D353", border: "1px solid rgba(57,211,83,0.25)" }}
                >
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium cursor-default"
                    style={{
                      border: "1px solid rgba(57,211,83,0.28)",
                      background: "rgba(57,211,83,0.10)",
                      color: "#39D353",
                    }}
                  >
                    <span>{item.emoji}</span>
                    {item.name}
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39D353] animate-pulse" />
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
