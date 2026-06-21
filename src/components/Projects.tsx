import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, ExternalLink, Star } from "lucide-react";

type Category = "All" | "Mobile" | "Web" | "AI";

interface Project {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  tech: string[];
  category: Exclude<Category, "All">;
  stars: number;
  metrics: string;
  accent: string;
  cardBg: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    name: "ShopSwift",
    subtitle: "E-Commerce Mobile App",
    description: "A full-featured e-commerce platform with product browsing, cart, secure payments, and real-time order tracking",
    tech: ["Flutter", "Firebase", "Stripe", "REST API"],
    category: "Mobile",
    stars: 128,
    metrics: "50K+ Users · 4.8★ Rating",
    accent: "var(--accent-2)",
    cardBg: "rgba(99, 102, 241, 0.08)",
  },
  {
    id: 2,
    name: "FoodDash",
    subtitle: "Food Delivery App",
    description: "Real-time food ordering app with live driver tracking, restaurant discovery, and seamless payment flow",
    tech: ["Flutter", "Google Maps", "Firebase", "Dart"],
    category: "Mobile",
    stars: 94,
    metrics: "Real-time tracking · 99.9% Uptime",
    accent: "var(--accent)",
    cardBg: "rgba(16, 185, 129, 0.08)",
  },
  {
    id: 3,
    name: "SpendSmart",
    subtitle: "Expense Tracker",
    description: "AI-powered personal finance tracker with smart categorization, budget goals, and beautiful analytics charts",
    tech: ["Flutter", "SQLite", "Charts", "ML Kit"],
    category: "Mobile",
    stars: 76,
    metrics: "10K+ Downloads · 4.9★",
    accent: "var(--accent-2)",
    cardBg: "rgba(99, 102, 241, 0.08)",
  },
  {
    id: 4,
    name: "ChatFlow",
    subtitle: "Real-Time Chat",
    description: "End-to-end encrypted messaging app with group chats, media sharing, voice messages, and status updates",
    tech: ["Flutter", "Firebase", "WebRTC", "Dart"],
    category: "Mobile",
    stars: 112,
    metrics: "E2E Encrypted · <100ms latency",
    accent: "var(--accent)",
    cardBg: "rgba(16, 185, 129, 0.08)",
  },
  {
    id: 5,
    name: "FitTrack Pro",
    subtitle: "Fitness App",
    description: "Comprehensive fitness tracking with workout plans, nutrition logging, progress photos, and Apple Health integration",
    tech: ["Flutter", "HealthKit", "SQLite", "Charts"],
    category: "Mobile",
    stars: 89,
    metrics: "Apple Health Sync · 5K Users",
    accent: "var(--accent-2)",
    cardBg: "rgba(99, 102, 241, 0.08)",
  },
  {
    id: 6,
    name: "TaskAI",
    subtitle: "AI Productivity App",
    description: "AI-powered task manager with smart scheduling, natural language input, and productivity insights powered by ML",
    tech: ["Flutter", "TensorFlow Lite", "Firebase", "Dart"],
    category: "AI",
    stars: 143,
    metrics: "AI-Powered · 98% Accuracy",
    accent: "var(--accent)",
    cardBg: "rgba(16, 185, 129, 0.08)",
    featured: true,
  },
];

const FILTERS: Category[] = ["All", "Mobile", "Web", "AI"];

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 18 } },
  exit:    { opacity: 0, scale: 0.88, y: -10, transition: { duration: 0.2 } },
};

const projectIcons: Record<number, string> = {
  1: "🛒", 2: "🍕", 3: "💸", 4: "💬", 5: "🏋️", 6: "🤖",
};

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

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
      style={{ background: "transparent" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "rgba(99, 102, 241, 0.03)" }} />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "rgba(16, 185, 129, 0.03)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
            Portfolio
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold"
            style={{ color: "var(--text)" }}
          >
            <WordReveal>Featured Projects</WordReveal>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg" style={{ color: "var(--muted)" }}>
            Handpicked work that showcases design, performance, and engineering craft
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex justify-center gap-2 mb-10 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                color: activeFilter === filter ? "#FFFFFF" : "var(--muted)",
                background: activeFilter === filter ? "var(--accent)" : "rgba(99, 102, 241, 0.04)",
                border: activeFilter === filter ? "1px solid var(--accent)" : "1px solid var(--border)",
                boxShadow: activeFilter === filter ? "0 4px 12px rgba(16, 185, 129, 0.15)" : "none",
              }}
            >
              {activeFilter === filter && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--accent)", zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            className="text-center mt-16 text-lg"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects in this category yet.
          </motion.p>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="group relative flex flex-col rounded-2xl border overflow-hidden h-full cursor-default"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--border)",
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 10px 30px var(--border)`,
        borderColor: "var(--border-hover)",
      }}
      transition={{ duration: 0.25 }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity z-10"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
      />

      {/* Card header */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{ background: project.cardBg }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, var(--accent) 1px, transparent 1px)`,
            backgroundSize: "22px 22px",
          }}
        />

        {/* Scan line on hover */}
        <div
          className="absolute left-0 right-0 h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `linear-gradient(90deg, transparent, var(--accent), transparent)`,
            animation: "scanLine 3s linear infinite",
            top: "50%",
          }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10 text-6xl select-none"
          whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          {projectIcons[project.id]}
        </motion.div>

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide z-10 border border-white/10"
            style={{
              background: "var(--accent)",
              color: "#FFFFFF",
              boxShadow: "0 2px 10px rgba(16, 185, 129, 0.2)",
            }}
          >
            Featured
          </div>
        )}

        {/* Stars */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium z-10 border"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border)",
            color: "var(--accent-2)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Star size={11} className="fill-[var(--accent-2)]" style={{ color: "var(--accent-2)" }} />
          {project.stars}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3
            className="text-lg font-bold leading-tight transition-colors group-hover:text-[var(--accent-2)]"
            style={{ color: "var(--text)" }}
          >
            {project.name}
          </h3>
          <p className="text-xs font-medium mt-0.5" style={{ color: project.accent }}>
            {project.subtitle}
          </p>
        </div>

        <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
          {project.description}
        </p>

        {/* Metrics */}
        <div
          className="inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-medium border"
          style={{
            background: "rgba(16, 185, 129, 0.08)",
            borderColor: "var(--border)",
            color: "var(--accent)",
          }}
        >
          {project.metrics}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md text-xs font-medium border"
              style={{
                background: "rgba(99, 102, 241, 0.05)",
                borderColor: "var(--border)",
                color: "var(--muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          <motion.a
            href="#"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border"
            style={{
              background: "rgba(99, 102, 241, 0.05)",
              borderColor: "var(--border)",
              color: "var(--muted)",
            }}
            whileHover={{ scale: 1.03, color: "var(--text)", borderColor: "var(--border-hover)" }}
            whileTap={{ scale: 0.97 }}
            aria-label={`GitHub for ${project.name}`}
          >
            <GitBranch size={13} />
            GitHub
          </motion.a>
          <motion.a
            href="#"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-white"
            style={{
              background: "var(--accent)",
              boxShadow: "0 2px 12px rgba(16, 185, 129, 0.2)",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 4px 16px rgba(16, 185, 129, 0.3)" }}
            whileTap={{ scale: 0.97 }}
            aria-label={`Live demo for ${project.name}`}
          >
            <ExternalLink size={13} />
            Live Demo
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}
