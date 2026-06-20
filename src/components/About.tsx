import { motion } from "framer-motion";
import { Puzzle, Code2, Heart, BookOpen } from "lucide-react";

const CODE_LINES = [
  { type: "keyword", text: "const " },
  { type: "var",     text: "subrat" },
  { type: "plain",   text: " = {" },
  null,
  { indent: true, parts: [{ type: "key", text: "  name" },    { type: "plain", text: ": " }, { type: "string", text: '"Subrat K. Acharya"' },                { type: "plain", text: "," }] },
  { indent: true, parts: [{ type: "key", text: "  role" },    { type: "plain", text: ": " }, { type: "string", text: '"Software Development Engineer"' },    { type: "plain", text: "," }] },
  { indent: true, parts: [{ type: "key", text: "  focus" },   { type: "plain", text: ": [" }, { type: "string", text: '"Mobile"' }, { type: "plain", text: ", " }, { type: "string", text: '"Android"' }, { type: "plain", text: ", " }, { type: "string", text: '"iOS"' }, { type: "plain", text: "]," }] },
  { indent: true, parts: [{ type: "key", text: "  passion" }, { type: "plain", text: ": " }, { type: "string", text: '"Building impactful products"' },      { type: "plain", text: "," }] },
  { indent: true, parts: [{ type: "key", text: "  learning" },{ type: "plain", text: ": " }, { type: "bool",   text: "true" },                                { type: "plain", text: "," }] },
  { type: "plain", text: "}" },
];

const COLOR_MAP: Record<string, string> = {
  keyword: "#F5D000",
  var:     "#39D353",
  key:     "#86efac",
  string:  "#D4E8D4",
  bool:    "#F5D000",
  plain:   "#5A7A57",
};

const VALUES = [
  { icon: Puzzle,   title: "Problem Solver",  desc: "Breaking complex challenges into elegant, manageable solutions." },
  { icon: Code2,    title: "Clean Code",      desc: "Writing readable, maintainable code that others enjoy working with." },
  { icon: Heart,    title: "User-First",      desc: "Designing experiences with empathy for the end user at every step." },
  { icon: BookOpen, title: "Always Learning", desc: "Staying current with the latest tools, patterns, and best practices." },
];

const STORY = [
  "My journey in software engineering began with a fascination for creating things that people actually use every day. That curiosity grew into a passion for mobile development — where code meets design, and apps become daily companions for millions.",
  "I specialize in mobile application development, crafting high-performance apps for Android and iOS using Flutter, Kotlin, and Swift. I love the challenge of building silky-smooth interfaces that feel native and respond to users' intent instantly.",
  "I believe in writing clean, maintainable code and following best practices — not because rules say so, but because great engineering enables great products. Every line I write is a craft decision, not just a technical one.",
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
          transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fromLeft  = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } } };
const fromRight = { hidden: { opacity: 0, x:  40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } } };
const fromBottom = { hidden: { opacity: 0, y: 30 },  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } } };

function CodeLine({ line }: { line: (typeof CODE_LINES)[number] }) {
  if (line === null) return <div className="h-3" />;
  if ("parts" in line && line.parts) {
    return (
      <div className="flex flex-wrap items-center leading-6">
        {line.parts.map((p, i) => (
          <span key={i} style={{ color: COLOR_MAP[p.type] ?? "#5A7A57" }}>{p.text}</span>
        ))}
      </div>
    );
  }
  if ("type" in line && line.type) {
    return (
      <div className="leading-6">
        <span style={{ color: COLOR_MAP[line.type] ?? "#5A7A57" }}>{line.text}</span>
      </div>
    );
  }
  return null;
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: "#0B0B0B" }}>
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full blur-[130px]"
          style={{ background: "rgba(245,208,0,0.04)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full blur-[100px]"
          style={{ background: "rgba(57,211,83,0.04)" }} />
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
          <span className="inline-block text-xs font-mono tracking-widest uppercase mb-4" style={{ color: "#39D353" }}>
            Who I am
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "#D4E8D4", fontFamily: "Space Grotesk, sans-serif" }}
          >
            <WordReveal>About Me</WordReveal>
          </h2>
          <div
            className="mx-auto h-px w-24 rounded-full"
            style={{ background: "linear-gradient(90deg, #F5D000, #39D353)" }}
          />
          <p className="mt-4 text-sm uppercase tracking-widest font-mono" style={{ color: "#2A3A28" }}>
            Engineer · Builder · Learner
          </p>
        </motion.div>

        {/* Two-column block */}
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
              className="rounded-2xl overflow-hidden border"
              style={{
                background: "rgba(13, 20, 12, 0.90)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(245, 208, 0, 0.12)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
              }}
            >
              {/* Window chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3 border-b"
                style={{ borderColor: "rgba(245,208,0,0.08)", background: "rgba(13,20,12,0.7)" }}
              >
                <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#F5D000" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#39D353" }} />
                <span className="ml-3 text-xs font-mono" style={{ color: "#2A4A27" }}>subrat.ts</span>
              </div>

              {/* Code content */}
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <div className="flex gap-6">
                  {/* Line numbers */}
                  <div className="flex flex-col text-right select-none min-w-[1.5rem]" style={{ color: "#1A3A18" }}>
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
              <div
                className="px-4 py-2 border-t flex items-center justify-between"
                style={{ borderColor: "rgba(245,208,0,0.06)", background: "rgba(13,20,12,0.5)" }}
              >
                <span className="text-xs font-mono" style={{ color: "#2A4A27" }}>TypeScript</span>
                <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "#39D353" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39D353] animate-pulse" />
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
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "#5A7A57" }}
                variants={fromBottom}
              >
                {para}
              </motion.p>
            ))}

            {/* Quick fact tags */}
            <motion.div className="mt-2 flex flex-wrap gap-2" variants={fromBottom}>
              {["Flutter", "Kotlin", "Swift", "Firebase", "REST APIs", "Git"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    border: "1px solid rgba(57,211,83,0.25)",
                    background: "rgba(57,211,83,0.07)",
                    color: "#39D353",
                  }}
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
                className="group relative rounded-2xl p-6 border overflow-hidden cursor-default"
                style={{
                  background: "rgba(13, 20, 12, 0.75)",
                  backdropFilter: "blur(16px)",
                  borderColor: "rgba(245,208,0,0.10)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(245,208,0,0.07), transparent 70%)" }}
                />

                {/* Left border accent on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to bottom, #F5D000, #39D353)" }}
                />

                <div className="relative z-10">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(245,208,0,0.10)" }}
                  >
                    <Icon size={20} style={{ color: "#F5D000" }} />
                  </div>
                  <h3 className="font-semibold text-base mb-2" style={{ color: "#D4E8D4" }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#3A5A37" }}>{v.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
