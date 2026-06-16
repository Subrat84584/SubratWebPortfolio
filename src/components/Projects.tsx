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
  gradientFrom: string;
  gradientTo: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    name: "ShopSwift",
    subtitle: "E-Commerce Mobile App",
    description:
      "A full-featured e-commerce platform with product browsing, cart, secure payments, and real-time order tracking",
    tech: ["Flutter", "Firebase", "Stripe", "REST API"],
    category: "Mobile",
    stars: 128,
    metrics: "50K+ Users • 4.8★ Rating",
    accent: "#3b82f6",
    gradientFrom: "#1e3a5f",
    gradientTo: "#0a0a1f",
  },
  {
    id: 2,
    name: "FoodDash",
    subtitle: "Food Delivery Application",
    description:
      "Real-time food ordering app with live driver tracking, restaurant discovery, and seamless payment flow",
    tech: ["Flutter", "Google Maps", "Firebase", "Dart"],
    category: "Mobile",
    stars: 94,
    metrics: "Real-time tracking • 99.9% Uptime",
    accent: "#f97316",
    gradientFrom: "#3d1f0d",
    gradientTo: "#0a0a0f",
  },
  {
    id: 3,
    name: "SpendSmart",
    subtitle: "Expense Tracker",
    description:
      "AI-powered personal finance tracker with smart categorization, budget goals, and beautiful analytics charts",
    tech: ["Flutter", "SQLite", "Charts", "ML Kit"],
    category: "Mobile",
    stars: 76,
    metrics: "10K+ Downloads • 4.9★",
    accent: "#22c55e",
    gradientFrom: "#0f2d1a",
    gradientTo: "#0a0a0f",
  },
  {
    id: 4,
    name: "ChatFlow",
    subtitle: "Real-Time Chat",
    description:
      "End-to-end encrypted messaging app with group chats, media sharing, voice messages, and status updates",
    tech: ["Flutter", "Firebase", "WebRTC", "Dart"],
    category: "Mobile",
    stars: 112,
    metrics: "E2E Encrypted • <100ms latency",
    accent: "#a855f7",
    gradientFrom: "#2d1b4e",
    gradientTo: "#0a0a0f",
  },
  {
    id: 5,
    name: "FitTrack Pro",
    subtitle: "Fitness App",
    description:
      "Comprehensive fitness tracking with workout plans, nutrition logging, progress photos, and Apple Health integration",
    tech: ["Flutter", "HealthKit", "SQLite", "Charts"],
    category: "Mobile",
    stars: 89,
    metrics: "Apple Health Sync • 5K Users",
    accent: "#ef4444",
    gradientFrom: "#3d0f0f",
    gradientTo: "#0a0a0f",
  },
  {
    id: 6,
    name: "TaskAI",
    subtitle: "AI Productivity App",
    description:
      "AI-powered task manager with smart scheduling, natural language input, and productivity insights powered by ML",
    tech: ["Flutter", "TensorFlow Lite", "Firebase", "Dart"],
    category: "AI",
    stars: 143,
    metrics: "AI-Powered • 98% Accuracy",
    accent: "#eab308",
    gradientFrom: "#2d2300",
    gradientTo: "#0a0a0f",
    featured: true,
  },
];

const FILTERS: Category[] = ["All", "Mobile", "Web", "AI"];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 18 },
  },
  exit: { opacity: 0, scale: 0.88, y: -10, transition: { duration: 0.2 } },
};

// Decorative icon pattern per project
const projectIcons: Record<number, string> = {
  1: "🛒",
  2: "🍕",
  3: "💸",
  4: "💬",
  5: "🏋️",
  6: "🤖",
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
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
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-purple-400 mb-3">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg">
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
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeFilter === filter
                  ? "text-white border-transparent"
                  : "text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
              }`}
              style={
                activeFilter === filter
                  ? {
                      background: "linear-gradient(135deg, #3b82f6, #a855f7)",
                      boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
                    }
                  : { background: "rgba(255,255,255,0.04)" }
              }
            >
              {filter}
              {activeFilter === filter && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #a855f7)",
                    zIndex: -1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
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
            className="text-center text-gray-500 mt-16 text-lg"
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
      className="group relative flex flex-col rounded-2xl border border-white/10 overflow-hidden h-full cursor-default"
      style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)" }}
      whileHover={{
        y: -6,
        boxShadow: `0 24px 60px ${project.accent}22`,
        borderColor: `${project.accent}44`,
      }}
      transition={{ duration: 0.25 }}
    >
      {/* Colored top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-70 group-hover:opacity-100 transition-opacity z-10"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
      />

      {/* Image placeholder / gradient header */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{
          background: `linear-gradient(160deg, ${project.gradientFrom}, ${project.gradientTo})`,
        }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${project.accent}33 1px, transparent 1px), linear-gradient(90deg, ${project.accent}33 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Central icon */}
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
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide z-10"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(239,68,68,0.4)",
            }}
          >
            Featured
          </div>
        )}

        {/* Stars badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium z-10"
          style={{
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fbbf24",
            backdropFilter: "blur(8px)",
          }}
        >
          <Star size={11} fill="#fbbf24" />
          {project.stars}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">
            {project.name}
          </h3>
          <p className="text-xs font-medium mt-0.5" style={{ color: project.accent }}>
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed flex-1">{project.description}</p>

        {/* Metrics chip */}
        <div
          className="inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}33`,
            color: project.accent,
          }}
        >
          {project.metrics}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-md text-xs font-medium text-gray-300 border border-white/10"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-1">
          <motion.a
            href="#"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 border border-white/10 hover:border-white/25 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.05)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label={`GitHub for ${project.name}`}
          >
            <GitBranch size={13} />
            GitHub
          </motion.a>
          <motion.a
            href="#"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all"
            style={{
              background: `linear-gradient(135deg, ${project.accent}cc, ${project.accent}88)`,
              boxShadow: `0 2px 12px ${project.accent}33`,
            }}
            whileHover={{ scale: 1.03, boxShadow: `0 4px 20px ${project.accent}55` }}
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
