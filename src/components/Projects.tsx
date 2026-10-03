import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BellRing,
  BookOpen,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  FileText,
  Handshake,
  HeartHandshake,
  Languages,
  Layers,
  Megaphone,
  Pause,
  Play,
  Share2,
  ShoppingBag,
  Smartphone,
  Timer,
  Users,
  Volume2,
  Zap,
} from "lucide-react";
import { projects } from "../data/projects";
import type { PortfolioProject } from "../data/projects";
import "./Projects.css";

const highlightIcons = {
  users: Users,
  file: FileText,
  languages: Languages,
  shopping: ShoppingBag,
  bell: BellRing,
  timer: Timer,
  presets: Bookmark,
  chart: ChartNoAxesCombined,
  share: Share2,
  audio: Volume2,
  business: Building2,
  opportunities: BriefcaseBusiness,
  services: Handshake,
  advertising: Megaphone,
  insights: BookOpen,
};

const noteIcons = { care: HeartHandshake, training: Dumbbell, business: Building2 };

const CLIENT_COUNTRIES = [
  { code: "US", name: "USA", flag: "🇺🇸", region: "North America", focus: "HitnMove IoT Smart Boxing Sensors & BLE Telemetry" },
  { code: "IN", name: "India", flag: "🇮🇳", region: "Domestic Enterprise", focus: "KareSpecial Autism Care & Enterprise Healthcare Platforms" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", region: "South Asia", focus: "Consumer Mobile Utilities, UI/UX & Scalable Architecture" },
  { code: "CN", name: "China", flag: "🇨🇳", region: "East Asia", focus: "Hardware Integration & Real-Time BLE Sensor Sync" },
  { code: "EU", name: "Europe", flag: "🇪🇺", region: "Continental Markets", focus: "MAGAS Super App, B2B Marketplace & Global Monetization" },
];

function ScreenshotGallery({ project }: { project: PortfolioProject }) {
  const [activeIndex, setActiveIndex] = useState(project.initialScreenshot);
  const reduceMotion = useReducedMotion();
  const screenshots = project.screenshots;
  const activeScreenshot = screenshots[activeIndex];
  const previousScreenshot = screenshots[(activeIndex - 1 + screenshots.length) % screenshots.length];
  const nextScreenshot = screenshots[(activeIndex + 1) % screenshots.length];

  function moveScreenshot(direction: number) {
    setActiveIndex((current) => (current + direction + screenshots.length) % screenshots.length);
  }

  return (
    <section
      className="kare-gallery"
      aria-label={`${project.name} app screenshots`}
      aria-roledescription="carousel"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          moveScreenshot(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div className="kare-gallery-heading">
        <span className="kare-eyebrow">A LOOK INSIDE</span>
        <span className="kare-gallery-source font-mono text-[10px] text-slate-500">Live Production Screens</span>
      </div>

      <div className="kare-screens">
        <div className="kare-orbit kare-orbit-outer" aria-hidden="true" />
        <div className="kare-orbit kare-orbit-inner" aria-hidden="true" />
        <div className="kare-side-screen kare-side-screen-left" aria-hidden="true">
          <img
            src={previousScreenshot.src}
            alt=""
            width={previousScreenshot.width}
            height={previousScreenshot.height}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="kare-side-screen kare-side-screen-right" aria-hidden="true">
          <img
            src={nextScreenshot.src}
            alt=""
            width={nextScreenshot.width}
            height={nextScreenshot.height}
            loading="lazy"
            decoding="async"
          />
        </div>
        <motion.div
          className="kare-main-screen"
          role="group"
          aria-roledescription="slide"
          aria-label={`${activeIndex + 1} of ${screenshots.length}`}
          whileHover={reduceMotion ? undefined : { y: -5 }}
          drag={reduceMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 40) moveScreenshot(info.offset.x > 0 ? -1 : 1);
          }}
          style={{ touchAction: "pan-y" }}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={activeScreenshot.src}
              src={activeScreenshot.src}
              alt={activeScreenshot.alt}
              width={activeScreenshot.width}
              height={activeScreenshot.height}
              loading="lazy"
              decoding="async"
              draggable={false}
              initial={reduceMotion ? false : { opacity: 0, x: 18, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: reduceMotion ? 0 : -18 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
            />
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="kare-gallery-controls">
        <button
          type="button"
          className="kare-arrow"
          aria-label="Previous screenshot"
          onClick={() => moveScreenshot(-1)}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <div className="kare-screen-caption" aria-live="polite" aria-atomic="true">
          <span>
            {String(activeIndex + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
          </span>
          <p>{activeScreenshot.title}</p>
        </div>
        <button
          type="button"
          className="kare-arrow"
          aria-label="Next screenshot"
          onClick={() => moveScreenshot(1)}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-3" role="group" aria-label="Choose an app screenshot">
        {screenshots.map((screenshot, index) => (
          <button
            type="button"
            key={screenshot.src}
            aria-label={`Show screenshot ${index + 1}: ${screenshot.title}`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-colors cursor-pointer ${
              index === activeIndex
                ? "bg-slate-900 text-white font-bold border-slate-900 shadow-xs"
                : "text-slate-600 bg-white border-slate-200 hover:border-slate-400"
            }`}
          >
            0{index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, number }: { project: PortfolioProject; number: number }) {
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reduceMotion ? 0 : 0.5 },
  };

  const NoteIcon = noteIcons[project.note.icon];
  const platformLabel = project.storeLinks.appStore ? "Android & iOS" : "On Google Play";

  return (
    <motion.article
      {...reveal}
      viewport={{ once: true, amount: "some" }}
      id={project.id}
      className={`kare-project project-${project.id}`}
      aria-labelledby={`${project.id}-heading`}
    >
      <div className="kare-showcase">
        <div className="kare-intro">
          <div className="kare-project-meta">
            <span className="kare-eyebrow font-mono text-xs font-bold text-orange-600">
              0{number} / PRODUCTION APPLICATION
            </span>
            <span className="kare-live font-mono text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              LIVE • {platformLabel}
            </span>
          </div>
          <div className="kare-brand">
            <img
              src={project.icon}
              alt={`${project.name} app icon`}
              width="72"
              height="72"
              loading="lazy"
              decoding="async"
            />
            <div>
              <span className="kare-category font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                {project.category}
              </span>
              <h3 id={`${project.id}-heading`} className="text-3xl font-extrabold text-slate-900">
                {project.name}
              </h3>
            </div>
          </div>
          <p className="kare-subtitle font-sans font-semibold text-slate-800">{project.subtitle}</p>
          <p className="kare-description font-sans text-slate-600 leading-relaxed">{project.description}</p>

          <div className="kare-care-note border-y border-slate-200 py-4 my-5 flex items-center gap-3">
            <span className="kare-care-icon w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center flex-shrink-0">
              <NoteIcon size={20} aria-hidden="true" />
            </span>
            <div>
              <strong className="text-slate-900 text-sm block">{project.note.title}</strong>
              <p className="text-slate-600 text-xs mt-0.5">{project.note.description}</p>
            </div>
          </div>

          <div className="kare-store-links flex flex-wrap items-center gap-3">
            <motion.a
              href={project.storeLinks.googlePlay}
              target="_blank"
              rel="noopener noreferrer"
              className="kare-store-button bg-slate-900 text-white rounded-xl px-4 py-2.5 font-semibold inline-flex items-center gap-2.5 shadow-sm hover:bg-slate-800 transition-colors"
              aria-label={`View ${project.name} on Google Play (opens in a new tab)`}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <Play size={18} fill="currentColor" aria-hidden="true" />
              <span className="text-left leading-tight">
                <small className="block text-[9px] font-mono tracking-widest text-slate-300">EXPLORE IT ON</small>
                <strong className="text-sm font-bold text-white">Google Play</strong>
              </span>
              <ArrowUpRight size={16} aria-hidden="true" className="ml-1" />
            </motion.a>
            {project.storeLinks.appStore && (
              <motion.a
                href={project.storeLinks.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="kare-store-button border border-slate-300 bg-white text-slate-900 rounded-xl px-4 py-2.5 font-semibold inline-flex items-center gap-2.5 shadow-sm hover:border-slate-900 transition-colors"
                aria-label={`View ${project.name} on the App Store (opens in a new tab)`}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                <Smartphone size={18} aria-hidden="true" />
                <span className="text-left leading-tight">
                  <small className="block text-[9px] font-mono tracking-widest text-slate-500">EXPLORE IT ON</small>
                  <strong className="text-sm font-bold text-slate-900">App Store</strong>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" className="ml-1" />
              </motion.a>
            )}
            <a
              href={`#${project.id}-story`}
              className="kare-secondary-link font-mono text-xs font-semibold text-orange-700 hover:text-orange-800 inline-flex items-center gap-1.5"
            >
              <span>Build Architecture</span>
              <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="kare-technologies flex flex-wrap gap-1.5 mt-5" aria-label={project.tagsLabel}>
            {project.tags.map((technology) => (
              <span
                key={technology}
                className="px-2 py-0.5 text-[11px] font-mono font-medium rounded bg-slate-100 text-slate-700 border border-slate-200"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
        <ScreenshotGallery project={project} />
      </div>

      <div id={`${project.id}-story`} className="kare-story border-t border-slate-200">
        <motion.div {...reveal} className="kare-story-block p-6 sm:p-8">
          <span className="kare-eyebrow font-mono text-xs font-bold text-orange-600 block mb-2">
            <span className="kare-story-number">[01]</span> THE PROBLEM
          </span>
          <h4 className="text-lg font-bold text-slate-900">{project.problemHeading}</h4>
          <p className="text-sm text-slate-600 leading-relaxed mt-2">{project.problem}</p>
        </motion.div>
        <motion.div {...reveal} className="kare-story-block kare-solution p-6 sm:p-8 border-l border-slate-200 bg-slate-50/50">
          <span className="kare-eyebrow font-mono text-xs font-bold text-orange-600 block mb-2">
            <span className="kare-story-number">[02]</span> THE ARCHITECTURE &amp; SOLUTION
          </span>
          <h4 className="text-lg font-bold text-slate-900">{project.solutionHeading}</h4>
          <p className="text-sm text-slate-600 leading-relaxed mt-2">{project.solution}</p>
        </motion.div>
      </div>

      <div className="kare-engineering p-6 sm:p-8 border-t border-slate-200">
        <motion.div {...reveal} className="kare-engineering-heading flex items-center justify-between mb-5">
          <div>
            <span className="kare-eyebrow font-mono text-xs font-bold text-orange-600 block mb-1">
              ENGINEERING HIGHLIGHTS
            </span>
            <h4 className="text-xl font-bold text-slate-900">{project.highlightsTitle}</h4>
          </div>
          <span className="font-mono text-xs text-slate-500">
            0{project.highlights.length} / MODULES
          </span>
        </motion.div>
        <ul className="kare-achievements grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 list-none p-0 m-0">
          {project.highlights.map(({ icon, title, description, tag }, index) => {
            const Icon = highlightIcons[icon];
            return (
              <motion.li
                key={title}
                {...reveal}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.04 }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
                      <Icon size={16} aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">0{index + 1}</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">{title}</h5>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{description}</p>
                </div>
                <span className="mt-3 inline-block font-mono text-[11px] font-semibold text-orange-700">
                  {tag}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.article>
  );
}

function SidePeekingCard({
  project,
  position,
  onClick,
}: {
  project: PortfolioProject;
  position: "left" | "right";
  onClick: () => void;
}) {
  const isLeft = position === "left";
  return (
    <motion.aside
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={{ opacity: 0.65, x: 0 }}
      whileHover={{ opacity: 0.98, scale: 1.02 }}
      transition={{ duration: 0.35 }}
      className={`hidden xl:flex flex-col justify-between absolute top-6 h-[580px] ${
        isLeft ? "-left-56 2xl:-left-64 w-72 2xl:w-80" : "-right-56 2xl:-right-64 w-72 2xl:w-80"
      } p-6 rounded-3xl border border-slate-300/80 bg-white/90 backdrop-blur-md shadow-2xl transition-all duration-300 text-left cursor-pointer z-0 overflow-hidden group select-none`}
      style={{
        transform: isLeft
          ? "perspective(1200px) rotateY(15deg)"
          : "perspective(1200px) rotateY(-15deg)",
      }}
      aria-label={`Switch to ${project.name}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
            {isLeft ? "← PREV APP" : "NEXT APP →"}
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            0{projects.findIndex((p) => p.id === project.id) + 1} / 03
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <img
            src={project.icon}
            alt=""
            className="w-12 h-12 rounded-2xl border border-slate-200 object-cover shadow-sm flex-shrink-0"
          />
          <div className="min-w-0">
            <h4 className="font-extrabold text-lg text-slate-900 group-hover:text-orange-600 transition-colors truncate">
              {project.name}
            </h4>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block truncate">
              {project.category}
            </span>
          </div>
        </div>
      </div>

      <div className="relative my-3 rounded-2xl overflow-hidden border border-slate-200/90 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-3 h-64 shadow-inner">
        <img
          src={project.screenshots[0]?.src}
          alt={project.name}
          className="h-full w-auto object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-xs font-mono font-bold text-white bg-slate-950/90 px-3 py-1.5 rounded-full backdrop-blur-xs shadow-lg">
            Click to View {isLeft ? "←" : "→"}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-slate-900">
        <span className="truncate">{project.subtitle.slice(0, 26)}...</span>
        <span className="text-orange-600 font-bold ml-2">{isLeft ? "←" : "→"}</span>
      </div>
    </motion.aside>
  );
}

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0].id);
  const [isPaused, setIsPaused] = useState(false);
  const [autoProgress, setAutoProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const SLIDE_DURATION = 6000; // 6 seconds per slide

  // Auto-Slide Timer
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 100;
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setAutoProgress((prev) => {
        if (prev >= 100) {
          // Switch to next project
          setActiveProjectId((currentId) => {
            const currentIndex = projects.findIndex((p) => p.id === currentId);
            const nextIndex = (currentIndex + 1) % projects.length;
            return projects[nextIndex].id;
          });
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, activeProjectId]);

  // Reset progress when project manually selected
  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
    setAutoProgress(0);
  };

  const activeIndex = projects.findIndex((p) => p.id === activeProjectId);
  const activeProject = projects[activeIndex >= 0 ? activeIndex : 0];
  const prevProject = projects[(activeIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(activeIndex + 1) % projects.length];

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="projects-section relative z-10 px-4 py-20 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-x-clip"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Header */}
      <motion.div
        className="projects-heading mb-10"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: reduceMotion ? 0 : 0.5 }}
      >
        <div className="max-w-3xl">
          <span className="text-xs font-mono font-bold tracking-widest uppercase block mb-2 text-orange-600">
            [FLAGSHIP PORTFOLIO // 01]
          </span>
          <h2 id="projects-heading" className="text-3xl sm:text-5xl font-sans tracking-tight font-extrabold text-slate-900">
            From concept <span className="text-slate-500 font-normal">to the real world.</span>
          </h2>
          <p className="mt-2 text-base text-slate-600 leading-relaxed font-sans">
            Explore 3 flagship production mobile apps engineered for international clients — featuring 3D peeking cards, live store links, and architectural dossiers.
          </p>
        </div>

        {/* Auto-Slide Pause / Play Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-mono text-xs text-slate-500 shadow-xs">
          {isPaused ? (
            <>
              <Pause size={12} className="text-orange-600" />
              <span>PAUSED (HOVERING)</span>
            </>
          ) : (
            <>
              <Play size={12} className="text-emerald-600 fill-emerald-600" />
              <span>AUTO-SLIDING</span>
            </>
          )}
        </div>
      </motion.div>

      {/* Auto-Slide Tab Selector with Visual Progress Bar */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3" role="tablist" aria-label="Projects Showcase Tabs">
        {projects.map((project, idx) => {
          const isActive = project.id === activeProjectId;
          return (
            <button
              key={project.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelectProject(project.id)}
              className={`relative overflow-hidden p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? "border-slate-900 bg-white shadow-md ring-1 ring-slate-900"
                  : "border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white"
              }`}
            >
              {/* Animated Progress Bar on Active Tab */}
              {isActive && (
                <div
                  className="absolute top-0 left-0 h-[3px] bg-orange-600 transition-all duration-100 ease-linear"
                  style={{ width: `${autoProgress}%` }}
                />
              )}

              <div className="flex items-center gap-3">
                <img
                  src={project.icon}
                  alt={`${project.name} logo`}
                  className="w-10 h-10 rounded-xl border border-slate-200 object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-orange-600">
                      0{idx + 1}
                    </span>
                    <h3 className={`text-base font-bold truncate ${isActive ? "text-slate-900" : "text-slate-700"}`}>
                      {project.name}
                    </h3>
                  </div>
                  <span className="block text-xs text-slate-500 truncate mt-0.5">
                    {project.category}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modern 3D Peeking Carousel Stage (Squarespace BOTANICA / Balance Style) */}
      <div className="relative my-6">
        {/* Left Side Peeking Card */}
        <SidePeekingCard
          project={prevProject}
          position="left"
          onClick={() => handleSelectProject(prevProject.id)}
        />

        {/* Center Active Project Card */}
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              role="tabpanel"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
            >
              <ProjectCard project={activeProject} number={activeIndex + 1} />

              {/* Quick Navigation Bar */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-xs">
                <button
                  type="button"
                  onClick={() => handleSelectProject(prevProject.id)}
                  className="group flex items-center gap-3 text-left w-full sm:w-auto p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-orange-600 group-hover:border-orange-600 transition-colors">
                    <ChevronLeft size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-slate-400">Previous Project</span>
                    <span className="block text-sm font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                      {prevProject.name}
                    </span>
                  </div>
                </button>

                <div className="text-center hidden md:block">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    <Layers size={13} className="text-orange-600" />
                    [0{activeIndex + 1} / 0{projects.length}] Card-Wise Auto-Slide
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectProject(nextProject.id)}
                  className="group flex items-center justify-end gap-3 text-right w-full sm:w-auto p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-slate-400">Next Project</span>
                    <span className="block text-sm font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                      {nextProject.name}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-orange-600 group-hover:border-orange-600 transition-colors">
                    <ChevronRight size={18} />
                  </div>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side Peeking Card */}
        <SidePeekingCard
          project={nextProject}
          position="right"
          onClick={() => handleSelectProject(nextProject.id)}
        />

        {/* Floating Left & Right Arrows for Desktop / Tablet */}
        <button
          type="button"
          onClick={() => handleSelectProject(prevProject.id)}
          aria-label="Previous project"
          className="hidden sm:flex absolute -left-3 sm:-left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 border border-slate-200 shadow-xl items-center justify-center text-slate-700 hover:text-orange-600 hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={() => handleSelectProject(nextProject.id)}
          aria-label="Next project"
          className="hidden sm:flex absolute -right-3 sm:-right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 border border-slate-200 shadow-xl items-center justify-center text-slate-700 hover:text-orange-600 hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Squarespace Style Lead Statement */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mt-16 mb-12 px-4"
      >
        <p className="text-xl sm:text-2xl lg:text-3xl font-sans font-medium text-slate-900 tracking-tight leading-snug">
          Join forward-thinking founders and teams building high-impact mobile apps.
        </p>
        <p className="text-xs sm:text-sm font-mono text-slate-500 mt-2.5 uppercase tracking-widest">
          Production Flutter Architecture • Cross-Platform iOS &amp; Android • Global Reliability
        </p>
      </motion.div>

      {/* 3 MONUMENTAL METRIC COLUMNS (Exact Squarespace 14M+ / $36B+ / 200+ Style) */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 max-w-5xl mx-auto text-center border-t border-b border-slate-200 py-12 sm:py-16 mb-14"
      >
        {/* Column 1: Total Apps Completed */}
        <div className="flex flex-col items-center">
          <div className="text-6xl sm:text-7xl lg:text-8xl font-sans font-extrabold tracking-tight text-slate-900 leading-none">
            3+
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-4 tracking-tight">
            Total Apps Completed
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs font-sans">
            Full-lifecycle Android &amp; iOS production apps shipped with Flutter, Firebase, and payment suites.
          </p>
          <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-mono font-medium text-slate-700">
            <span>KareSpecial • HitnMove • MAGAS</span>
          </div>
        </div>

        {/* Column 2: Client Countries & Territories */}
        <div className="flex flex-col items-center">
          <div className="text-6xl sm:text-7xl lg:text-8xl font-sans font-extrabold tracking-tight text-slate-900 leading-none">
            5+
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-4 tracking-tight">
            Countries &amp; Territories
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs font-sans">
            Partnered with founders &amp; clients across USA, India, Pakistan, China, and Europe.
          </p>
          <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[11px] font-mono font-bold text-orange-700">
            <span>🇺🇸 USA • 🇮🇳 India • 🇵🇰 PK • 🇨🇳 CN • 🇪🇺 EU</span>
          </div>
        </div>

        {/* Column 3: Active Users & Production Reliability */}
        <div className="flex flex-col items-center">
          <div className="text-6xl sm:text-7xl lg:text-8xl font-sans font-extrabold tracking-tight text-slate-900 leading-none">
            50K+
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-4 tracking-tight">
            Active Users Served
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs font-sans">
            Healthcare coordination, IoT sports sensor telemetry, and business marketplace transactions.
          </p>
          <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono font-bold text-emerald-700">
            <Zap size={12} className="fill-emerald-600" />
            <span>99.9% Production Stability</span>
          </div>
        </div>
      </motion.div>

      {/* VERIFIED CLIENT COUNTRIES SHOWCASE */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-orange-600 block mb-1">
              [INTERNATIONAL CLIENTS // VERIFIED REACH]
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900">
              Countries &amp; Regions I've Engineered Mobile Apps For
            </h4>
          </div>
          <span className="font-mono text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 self-start sm:self-auto font-medium">
            5 International Markets
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {CLIENT_COUNTRIES.map((country) => (
            <div
              key={country.code}
              className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-orange-50/60 hover:border-orange-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="text-2xl filter drop-shadow-xs" role="img" aria-label={country.name}>
                    {country.flag}
                  </span>
                  <div>
                    <strong className="block text-sm font-bold text-slate-900 group-hover:text-orange-900 transition-colors leading-tight">
                      {country.name}
                    </strong>
                    <span className="text-[10px] font-mono text-slate-500 block">
                      {country.region}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-snug font-sans">
                  {country.focus}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-400 group-hover:text-orange-700">
                <span>Verified Client</span>
                <span>✓</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
