import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Smartphone,
  Eye,
  X,
  Dumbbell,
  Briefcase,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import { projects } from "../data/projects";
import type { PortfolioProject } from "../data/projects";
import "./Projects.css";


// Extended list for seamless continuous forward auto-slide (no jarring rewind jumps)
const EXTENDED_PROJECTS = [...projects, ...projects, ...projects];
const N = projects.length;

// ─────────────────────────────────────────────────────────────
// PROJECT CARD (Exact Match to Image 4 & Squarespace Multi-Card Reel)
// ─────────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: PortfolioProject;
  number: number;
  isActive: boolean;
  cardWidth: number;
  onOpenLiveScreens: () => void;
  onClickCard?: () => void;
}

function ProjectCard({
  project,
  number,
  isActive,
  cardWidth,
  onOpenLiveScreens,
  onClickCard,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const featuredScreen = project.screenshots[project.initialScreenshot] || project.screenshots[0];

  const getNoteIcon = () => {
    switch (project.note.icon) {
      case "training":
        return <Dumbbell size={20} className="text-orange-400" />;
      case "care":
        return <HeartPulse size={20} className="text-emerald-400" />;
      case "business":
        return <Briefcase size={20} className="text-blue-400" />;
      default:
        return <Sparkles size={20} className="text-orange-400" />;
    }
  };

  return (
    <article
      id={`project-${project.id}-${number}`}
      onClick={!isActive ? onClickCard : undefined}
      style={{ width: `${cardWidth}px` }}
      className={`kare-project relative flex-shrink-0 overflow-hidden rounded-[28px] sm:rounded-[32px] border transition-all duration-500 text-white select-none ${
        isActive
          ? "border-white/25 bg-[#0B0B0E] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/15 opacity-100 scale-100"
          : "border-white/10 bg-[#0B0B0E]/85 shadow-xl opacity-75 hover:opacity-95 hover:border-white/20 cursor-pointer scale-[0.985]"
      }`}
      aria-labelledby={`${project.id}-${number}-heading`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_1fr] h-full">
        {/* Left Column: Project Details (Exact Match to Image 4) */}
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Top Meta Line: Number + Live Status Badge */}
            <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-white/10">
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-neutral-400">
                0{number} / PRODUCTION APPLICATION
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE • {project.storeLinks.appStore ? "Android & iOS" : "Android"}</span>
              </span>
            </div>

            {/* Brand Header: Logo + Name + Category */}
            <div className="flex items-center gap-4 mb-3.5">
              <img
                src={project.icon}
                alt={`${project.name} app icon`}
                width="64"
                height="64"
                className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl border border-white/20 bg-white object-cover shadow-lg flex-shrink-0"
                loading="lazy"
                decoding="async"
              />
              <div className="min-w-0">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-orange-400 block mb-0.5">
                  {project.category}
                </span>
                <h3 id={`${project.id}-${number}-heading`} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  {project.name}
                </h3>
              </div>
            </div>

            {/* Subheading / Title */}
            <h4 className="text-base sm:text-lg font-bold text-white mt-1 mb-2.5 leading-snug">
              {project.subtitle}
            </h4>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Highlight Callout Box (e.g. Your rounds. Your rhythm.) */}
            <div className="my-4 p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                {getNoteIcon()}
              </div>
              <div className="min-w-0">
                <strong className="block text-xs sm:text-sm font-bold text-white mb-0.5">
                  {project.note.title}
                </strong>
                <span className="text-[11px] sm:text-xs text-neutral-300 font-sans leading-relaxed">
                  {project.note.description}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Actions: Store Badges + Architecture Tags */}
          <div className="mt-4">
            {/* Store Badges */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2.5">
              {project.storeLinks.googlePlay && (
                <motion.a
                  href={project.storeLinks.googlePlay}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  className="store-btn-google inline-flex items-center gap-2 px-3.5 py-2 rounded-xl cursor-pointer text-xs font-medium transition-all group"
                >
                  <Play size={15} fill="#000000" className="text-black flex-shrink-0" />
                  <div className="text-left leading-tight">
                    <span className="block text-[8px] font-mono uppercase tracking-wider font-semibold opacity-70">EXPLORE IT ON</span>
                    <span className="font-extrabold text-xs block">Google Play</span>
                  </div>
                  <ArrowUpRight size={13} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>
              )}

              {project.storeLinks.appStore && (
                <motion.a
                  href={project.storeLinks.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  className="store-btn-apple inline-flex items-center gap-2 px-3.5 py-2 rounded-xl cursor-pointer text-xs font-medium transition-all group"
                >
                  <Smartphone size={15} className="text-blue-400 flex-shrink-0" />
                  <div className="text-left leading-tight">
                    <span className="block text-[8px] font-mono text-neutral-400 uppercase tracking-wider">EXPLORE IT ON</span>
                    <span className="font-extrabold text-white text-xs block">App Store</span>
                  </div>
                  <ArrowUpRight size={13} className="text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>
              )}
            </div>

            {/* Build Architecture & Tags */}
            <div className="mt-3.5 pt-2.5 border-t border-white/10">
              <span className="text-[11px] font-mono font-bold text-orange-400 mb-1.5 inline-flex items-center gap-1 tracking-wide">
                <span>Build Architecture</span>
                <span className="text-xs">↓</span>
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 font-mono text-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Single Polished Project Screen Mockup + "View Project Images" CTA */}
        <div className="relative p-6 sm:p-8 flex flex-col items-center justify-between bg-gradient-to-b from-[#13131A] via-[#0E0E14] to-[#0A0A0E] border-t lg:border-t-0 lg:border-l border-white/10 min-h-[440px]">
          {/* Top Eyebrow */}
          <div className="w-full flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] font-bold text-neutral-400 tracking-wider uppercase">
              A LOOK INSIDE
            </span>
            <span className="font-mono text-[10px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Production Screen
            </span>
          </div>

          {/* Central Realistic Smartphone Mockup */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onOpenLiveScreens();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpenLiveScreens();
              }
            }}
            className="group/phone relative my-auto cursor-pointer select-none flex flex-col items-center"
            aria-label={`View all ${project.screenshots.length} screens for ${project.name}`}
          >
            {/* Ambient Glow */}
            <div
              className={`absolute inset-0 blur-3xl opacity-30 group-hover/phone:opacity-60 transition-opacity pointer-events-none rounded-full ${
                project.id === "hitnmove"
                  ? "bg-orange-500/40"
                  : project.id === "karespecial"
                  ? "bg-emerald-500/40"
                  : project.id === "meditwin"
                  ? "bg-teal-500/40"
                  : "bg-indigo-500/40"
              }`}
            />

            {/* Smartphone Frame */}
            <div className="relative w-[190px] sm:w-[220px] aspect-[9/18.5] rounded-[36px] p-2 bg-[#1A1A22] border-[3px] border-neutral-700 shadow-2xl shadow-black transition-transform duration-300 group-hover/phone:scale-[1.03] group-hover/phone:-translate-y-1">
              {/* Speaker Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black rounded-full z-20 flex items-center justify-end pr-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 border border-neutral-800" />
              </div>

              {/* Display Screen */}
              <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-black">
                <img
                  src={featuredScreen.src}
                  alt={featuredScreen.alt}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />

                {/* Hover Overlay Hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover/phone:opacity-100 transition-opacity flex flex-col items-center justify-end pb-3.5 px-3 text-center">
                  <span className="text-[10px] font-mono font-bold text-white bg-black/80 px-3 py-1.5 rounded-full border border-white/25 shadow-lg flex items-center gap-1.5">
                    <Eye size={12} className="text-orange-400" />
                    <span>View All {project.screenshots.length} Screens ↗</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* View Project Images Button Section */}
          <div className="w-full flex flex-col items-center gap-1.5 pt-3.5 border-t border-white/10 mt-3">
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenLiveScreens();
              }}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="btn-live-screens w-full max-w-xs inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-sans font-bold text-xs hover:bg-neutral-200 transition-all shadow-xl cursor-pointer group"
            >
              <Eye size={15} className="text-black group-hover:scale-110 transition-transform" />
              <span>View Project Images ({project.screenshots.length})</span>
              <ArrowUpRight size={14} className="text-neutral-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
            <span className="text-[10px] font-mono text-neutral-400">
              Click to open interactive gallery
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PROJECTS COMPONENT
// ─────────────────────────────────────────────────────────────
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Multi-card auto-slide reel state
  const [currentIndex, setCurrentIndex] = useState<number>(N); // Start at middle segment (index 3 = project 0)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [autoProgress, setAutoProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Modal Screen Viewer state
  const [isScreenViewerOpen, setIsScreenViewerOpen] = useState(false);
  const [modalProject, setModalProject] = useState<PortfolioProject>(projects[0]);
  const [modalScreenIndex, setModalScreenIndex] = useState(0);

  // Responsive card metrics for horizontal reel
  const [cardMetrics, setCardMetrics] = useState({ width: 760, gap: 28 });

  const SLIDE_DURATION = 4600; // 4.6 seconds per project auto-slide

  // Calculate card width and gap so 2 cards sit side-by-side on desktop (Squarespace style)
  useEffect(() => {
    const updateMetrics = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;

      if (window.innerWidth >= 1200) {
        // Wide Desktop: 2 cards clearly visible side-by-side (like AGENCY and BOTANICA)
        const gap = 32;
        const width = Math.min(820, Math.floor((containerWidth - gap) * 0.53));
        setCardMetrics({ width, gap });
      } else if (window.innerWidth >= 1024) {
        const gap = 24;
        const width = Math.floor((containerWidth - gap) * 0.55);
        setCardMetrics({ width, gap });
      } else if (window.innerWidth >= 640) {
        // Tablet: 1 prominent card + peeking adjacent card
        const gap = 20;
        const width = Math.min(640, Math.floor(containerWidth * 0.84));
        setCardMetrics({ width, gap });
      } else {
        // Mobile: 1 responsive card filling ~88vw
        const gap = 16;
        const width = Math.floor(containerWidth * 0.90);
        setCardMetrics({ width, gap });
      }
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  const goToNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    setAutoProgress(0);
  };

  const goToPrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    setAutoProgress(0);
  };

  const goToProject = (projectIndex: number) => {
    setIsTransitioning(true);
    const currentProjectIndex = ((currentIndex % N) + N) % N;
    const delta = projectIndex - currentProjectIndex;
    setCurrentIndex((prev) => prev + delta);
    setAutoProgress(0);
  };

  // Continuous forward auto-slide loop
  useEffect(() => {
    if (isScreenViewerOpen || isHovered) return;

    const intervalTime = 40;
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setAutoProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isScreenViewerOpen, isHovered, currentIndex]);

  // Seamless infinite loop normalization (never jumps backward)
  const handleAnimationComplete = () => {
    if (currentIndex >= N * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => (prev % N) + N);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    } else if (currentIndex < N) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => (prev % N) + N);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  };

  const activeProjectIdx = ((currentIndex % N) + N) % N;

  // Calculated sliding track offset
  const trackOffset = -(currentIndex * (cardMetrics.width + cardMetrics.gap));

  return (
    <section
      id="projects"
      aria-label="Flagship Projects Showcase"
      className="projects-section relative z-10 px-3 sm:px-6 lg:px-8 max-w-[1520px] mx-auto overflow-hidden text-white"
    >
      {/* ───────────────────────────────────────────────────────
          MULTI-CARD AUTO-SLIDE REEL (Exact Match to Squarespace Reference)
      ─────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative my-4 sm:my-6 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating Left Arrow */}
        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous project"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/80 hover:bg-black border border-white/20 shadow-2xl flex items-center justify-center text-white hover:text-orange-400 hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Floating Right Arrow */}
        <button
          type="button"
          onClick={goToNext}
          aria-label="Next project"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/80 hover:bg-black border border-white/20 shadow-2xl flex items-center justify-center text-white hover:text-orange-400 hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
        >
          <ChevronRight size={22} />
        </button>

        {/* Sliding Multi-Card Track */}
        <div className="py-2">
          <motion.div
            className="flex items-stretch"
            style={{ gap: `${cardMetrics.gap}px` }}
            animate={{ x: trackOffset }}
            transition={
              isTransitioning
                ? reduceMotion
                  ? { duration: 0.3 }
                  : { type: "spring", stiffness: 175, damping: 24, mass: 0.85 }
                : { duration: 0 }
            }
            onAnimationComplete={handleAnimationComplete}
          >
            {EXTENDED_PROJECTS.map((proj, idx) => {
              const isActive = idx === currentIndex;
              const projectNumber = (idx % N) + 1;
              return (
                <ProjectCard
                  key={`${proj.id}-${idx}`}
                  project={proj}
                  number={projectNumber}
                  isActive={isActive}
                  cardWidth={cardMetrics.width}
                  onClickCard={() => {
                    setIsTransitioning(true);
                    setCurrentIndex(idx);
                    setAutoProgress(0);
                  }}
                  onOpenLiveScreens={() => {
                    setModalProject(proj);
                    setModalScreenIndex(0);
                    setIsScreenViewerOpen(true);
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────
          SQUARESPACE SIGNATURE CAPSULE AUTO-SLIDE INDICATOR
      ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center justify-center gap-2 mt-4 mb-10">
        <div className="flex items-center justify-center gap-2.5 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg">
          {projects.map((p, idx) => {
            const isActive = idx === activeProjectIdx;
            return (
              <button
                key={p.id}
                onClick={() => goToProject(idx)}
                aria-label={`Go to project 0${idx + 1}: ${p.name}`}
                className="relative h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  width: isActive ? "64px" : "20px",
                  backgroundColor: isActive ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.10)",
                }}
              >
                {isActive && (
                  <div
                    className="h-full bg-white rounded-full transition-all duration-75 ease-linear shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                    style={{ width: `${autoProgress}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────
          PROJECT SWITCHER TABS
      ─────────────────────────────────────────────────────── */}
      <div className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-6xl mx-auto" role="tablist" aria-label="Projects Showcase Selector">
        {projects.map((project, idx) => {
          const isActive = idx === activeProjectIdx;
          return (
            <button
              key={project.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => goToProject(idx)}
              className={`relative overflow-hidden p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? "border-white bg-[#14141A] shadow-lg ring-1 ring-white/30"
                  : "border-white/10 bg-[#0B0B0E]/70 hover:border-white/25 hover:bg-[#0B0B0E]"
              }`}
            >
              {/* Animated Progress Bar on Active Tab */}
              {isActive && (
                <div
                  className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-75 ease-linear"
                  style={{ width: `${autoProgress}%` }}
                />
              )}

              <div className="flex items-center gap-3">
                <img
                  src={project.icon}
                  alt={`${project.name} logo`}
                  className="w-10 h-10 rounded-xl border border-white/15 bg-white object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-orange-400">
                      0{idx + 1}
                    </span>
                    <h3 className={`text-base font-bold truncate ${isActive ? "text-white" : "text-neutral-300"}`}>
                      {project.name}
                    </h3>
                  </div>
                  <span className="block text-xs text-neutral-400 truncate mt-0.5">
                    {project.category}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ───────────────────────────────────────────────────────
          SQUARESPACE-STYLE LEAD STATEMENT ("JOIN MILLIONS...")
      ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mt-16 mb-12 px-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-orange-400 mb-4">
          <Sparkles size={13} />
          <span>PRODUCTION-READY MOBILE SPECIALIST</span>
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-white tracking-tight leading-snug">
          Partner with me to build, scale, and launch your mobile app.
        </h3>
        <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-3 uppercase tracking-widest">
          Cross-Platform Flutter &amp; Dart Architecture • 60 FPS Native Performance • Global Enterprise Reach
        </p>
      </motion.div>

      {/* ───────────────────────────────────────────────────────
          TWO MONUMENTAL METRICS (Squarespace 14M+ / 200+ Style)
      ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 max-w-4xl mx-auto text-center border-t border-b border-white/10 py-16 sm:py-20 mb-14"
      >
        {/* Column 1: How Many Apps Built & Shipped */}
        <div className="flex flex-col items-center">
          <div className="text-7xl sm:text-8xl lg:text-9xl font-sans font-extrabold tracking-tight text-white leading-none">
            15+
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-white mt-5 tracking-tight font-sans">
            Production Mobile Apps Shipped
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xs font-sans leading-relaxed">
            Full-lifecycle Android and iOS applications architected from concept to App Store &amp; Google Play, powered by Flutter, BLE sensors, and cloud systems.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[11px] font-mono font-medium text-neutral-200">
            <span>HitnMove • KareSpecial • MediTwin • MAGAS</span>
          </div>
        </div>

        {/* Column 2: Where Apps Are Being Used / Where Clients Belong From */}
        <div className="flex flex-col items-center">
          <div className="text-7xl sm:text-8xl lg:text-9xl font-sans font-extrabold tracking-tight text-white leading-none">
            5+
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-white mt-5 tracking-tight font-sans">
            Global Client Markets Worldwide
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xs font-sans leading-relaxed">
            Engineered bespoke mobile apps for clients and founders across North America, Europe, the Middle East, and Asia.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-950/40 border border-orange-500/30 text-[11px] font-mono font-bold text-orange-300">
            <span>🇺🇸 USA • 🇮🇳 India • 🇪🇺 Europe • 🇦🇪 UAE / GCC</span>
          </div>
        </div>
      </motion.div>


      {/* ───────────────────────────────────────────────────────
          FULL-SCREEN INTERACTIVE LIVE PRODUCTION SCREENS MODAL
      ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isScreenViewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setIsScreenViewerOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl bg-[#0E0E12] border border-white/15 rounded-3xl p-5 sm:p-8 flex flex-col shadow-2xl text-white my-auto max-h-[95vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={modalProject.icon}
                    alt=""
                    className="w-10 h-10 rounded-xl border border-white/15 bg-white object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-lg text-white">
                        {modalProject.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                        LIVE PRODUCTION SCREEN
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400 font-sans">
                      {modalProject.screenshots[modalScreenIndex]?.title || "Application Screen"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {modalProject.storeLinks.googlePlay && (
                    <a
                      href={modalProject.storeLinks.googlePlay}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-medium text-white transition-colors"
                    >
                      <span>Google Play</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                  {modalProject.storeLinks.appStore && (
                    <a
                      href={modalProject.storeLinks.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-medium text-white transition-colors"
                    >
                      <span>App Store</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}

                  <button
                    onClick={() => setIsScreenViewerOpen(false)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Center Screen View */}
              <div className="relative flex-1 min-h-[380px] sm:min-h-[460px] py-4 flex items-center justify-center overflow-hidden">
                <button
                  onClick={() =>
                    setModalScreenIndex((prev) =>
                      (prev - 1 + modalProject.screenshots.length) % modalProject.screenshots.length
                    )
                  }
                  className="absolute left-2 sm:left-4 z-10 w-11 h-11 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all cursor-pointer backdrop-blur-md"
                  aria-label="Previous screen"
                >
                  <ChevronLeft size={22} />
                </button>

                <div className="relative h-[360px] sm:h-[440px] aspect-[9/16] rounded-2xl sm:rounded-3xl border-4 sm:border-8 border-neutral-800 bg-black overflow-hidden shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={modalProject.screenshots[modalScreenIndex]?.src}
                      src={modalProject.screenshots[modalScreenIndex]?.src}
                      alt={modalProject.screenshots[modalScreenIndex]?.alt}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full object-contain"
                    />
                  </AnimatePresence>
                </div>

                <button
                  onClick={() =>
                    setModalScreenIndex((prev) =>
                      (prev + 1) % modalProject.screenshots.length
                    )
                  }
                  className="absolute right-2 sm:right-4 z-10 w-11 h-11 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all cursor-pointer backdrop-blur-md"
                  aria-label="Next screen"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Modal Footer: Screen selector pills */}
              <div className="pt-3 border-t border-white/10 flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
                  {modalProject.screenshots.map((screen, idx) => (
                    <button
                      key={screen.src}
                      onClick={() => setModalScreenIndex(idx)}
                      className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer flex-shrink-0 ${
                        idx === modalScreenIndex
                          ? "bg-white text-black font-bold border-white shadow-sm"
                          : "bg-white/5 text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  Screen {modalScreenIndex + 1} of {modalProject.screenshots.length}:{" "}
                  <span className="text-white font-medium">
                    {modalProject.screenshots[modalScreenIndex]?.title}
                  </span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
