import { motion } from "framer-motion";
import { Puzzle, Code2, Heart, BookOpen } from "lucide-react";

const CODE_LINES = [
  { type: "keyword", text: "const " },
  { type: "var", text: "subrat" },
  { type: "plain", text: " = {" },
  null,
  { indent: true, parts: [{ type: "key", text: "  name" }, { type: "plain", text: ": " }, { type: "string", text: '"Subrat K. Acharya"' }, { type: "plain", text: "," }] },
  { indent: true, parts: [{ type: "key", text: "  role" }, { type: "plain", text: ": " }, { type: "string", text: '"Software Development Engineer"' }, { type: "plain", text: "," }] },
  { indent: true, parts: [{ type: "key", text: "  focus" }, { type: "plain", text: ": [" }, { type: "string", text: '"Mobile Development"' }, { type: "plain", text: ", " }, { type: "string", text: '"Android"' }, { type: "plain", text: ", " }, { type: "string", text: '"iOS"' }, { type: "plain", text: "]," }] },
  { indent: true, parts: [{ type: "key", text: "  passion" }, { type: "plain", text: ": " }, { type: "string", text: '"Building impactful products"' }, { type: "plain", text: "," }] },
  { indent: true, parts: [{ type: "key", text: "  learning" }, { type: "plain", text: ": " }, { type: "bool", text: "true" }, { type: "plain", text: "," }] },
  { type: "plain", text: "}" },
];

const COLOR_MAP: Record<string, string> = {
  keyword: "#c084fc",
  var: "#38bdf8",
  key: "#7dd3fc",
  string: "#86efac",
  bool: "#fb923c",
  plain: "#94a3b8",
};

const VALUES = [
  {
    icon: Puzzle,
    title: "Problem Solver",
    desc: "Breaking complex challenges into elegant, manageable solutions.",
  },
  {
    icon: Code2,
    title: "Clean Code",
    desc: "Writing readable, maintainable code that others enjoy working with.",
  },
  {
    icon: Heart,
    title: "User-First",
    desc: "Designing experiences with empathy for the end user at every step.",
  },
  {
    icon: BookOpen,
    title: "Always Learning",
    desc: "Staying current with the latest tools, patterns, and best practices.",
  },
];

const STORY = [
  "My journey in software engineering began with a fascination for creating things that people actually use every day. That curiosity grew into a passion for mobile development — where code meets design, and apps become daily companions for millions.",
  "I specialize in mobile application development, crafting high-performance apps for Android and iOS platforms using Flutter, Kotlin, and Swift. I love the challenge of building silky-smooth interfaces that feel native and respond to users' intent instantly.",
  "I believe in writing clean, maintainable code and following best practices — not because rules say so, but because great engineering enables great products. Every line I write is a craft decision, not just a technical one.",
];

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const fromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const fromBottom = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function CodeLine({ line }: { line: (typeof CODE_LINES)[number] }) {
  if (line === null) return <div className="h-3" />;
  if ("parts" in line && line.parts) {
    return (
      <div className="flex flex-wrap items-center leading-6">
        {line.parts.map((p, i) => (
          <span key={i} style={{ color: COLOR_MAP[p.type] ?? "#94a3b8" }}>
            {p.text}
          </span>
        ))}
      </div>
    );
  }
  if ("type" in line && line.type) {
    return (
      <div className="leading-6">
        <span style={{ color: COLOR_MAP[line.type] ?? "#94a3b8" }}>{line.text}</span>
      </div>
    );
  }
  return null;
}

export default function About() {
  return (
    <section id="about" className="relative bg-[#0a0a0f] py-24 sm:py-32 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-sky-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full" style={{ background: "linear-gradient(90deg, #38bdf8, #8b5cf6)" }} />
          <p className="mt-4 text-slate-500 text-sm uppercase tracking-widest font-mono">
            Who I am & what I do
          </p>
        </motion.div>

        {/* Main two-column block */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Code block */}
          <motion.div variants={fromLeft}>
            <div
              className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
              style={{ background: "rgba(15,15,26,0.85)", backdropFilter: "blur(20px)" }}
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-slate-500 font-mono">subrat.ts</span>
              </div>

              {/* Code content */}
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <div className="flex gap-6">
                  {/* Line numbers */}
                  <div className="flex flex-col text-slate-700 text-right select-none min-w-[1.5rem]">
                    {CODE_LINES.map((_, i) => (
                      <span key={i} className="leading-6">{i + 1}</span>
                    ))}
                  </div>
                  {/* Code */}
                  <div className="flex flex-col">
                    {CODE_LINES.map((line, i) => (
                      <CodeLine key={i} line={line} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="px-4 py-2 border-t border-white/5 bg-white/3 flex items-center justify-between">
                <span className="text-xs text-slate-600 font-mono">TypeScript</span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  No issues
                </span>
              </div>
            </div>
          </motion.div>

          {/* Story paragraphs */}
          <motion.div variants={fromRight} className="flex flex-col gap-6">
            {STORY.map((para, i) => (
              <motion.p
                key={i}
                className="text-slate-400 text-base sm:text-lg leading-relaxed"
                variants={fromBottom}
              >
                {para}
              </motion.p>
            ))}

            {/* Quick facts */}
            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              variants={fromBottom}
            >
              {["Flutter", "Kotlin", "Swift", "Firebase", "REST APIs", "Git"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium border border-sky-500/25
                             bg-sky-500/10 text-sky-400"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Value cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                variants={fromBottom}
                custom={i}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative rounded-2xl p-6 border border-white/10 overflow-hidden cursor-default"
                style={{ background: "rgba(15,15,26,0.7)", backdropFilter: "blur(16px)" }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(56,189,248,0.08), transparent 70%)" }}
                />

                <div className="relative z-10">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(139,92,246,0.2))" }}
                  >
                    <Icon size={20} className="text-sky-400" />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
