import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Briefcase,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
} from "lucide-react";
import "./Experience.css";

export default function Experience() {
  const [activeTab, setActiveTab] = useState<"both" | "technovate" | "mohs10">("both");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };

  return (
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-20 text-neutral-900">
      {/* ───────────────────────────────────────────────────────
          SECTION HEADER WITH LINKEDIN BUTTON & HORIZONTAL CONTROLS
      ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-neutral-200">
        <div>

          <h2 className="text-3xl sm:text-5xl font-sans tracking-tight font-extrabold text-neutral-900">
            Work Experience
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-neutral-600 font-sans max-w-xl leading-relaxed">
            Full-time mobile engineering tenures at Technovate and Mohs10 Technologies displayed side by side.
          </p>
        </div>

        {/* Action Controls: View Selector & LinkedIn Link */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Company View Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-neutral-100 border border-neutral-200">
            <button
              type="button"
              onClick={() => setActiveTab("both")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === "both"
                  ? "bg-neutral-900 text-white shadow-xs font-extrabold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Side-by-Side
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("technovate")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === "technovate"
                  ? "bg-neutral-900 text-white shadow-xs font-extrabold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              01 Technovate
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("mohs10")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeTab === "mohs10"
                  ? "bg-neutral-900 text-white shadow-xs font-extrabold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              02 Mohs10
            </button>
          </div>

          {/* LinkedIn Verified Outbound Pill Button */}
          <a
            href="https://www.linkedin.com/in/subrat-k-acharya-a29681188/?isSelfProfile=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 text-xs font-mono font-bold transition-all shadow-xs group cursor-pointer"
          >
            <Briefcase size={14} className="text-blue-600" />
            <span>LinkedIn Profile</span>
            <ArrowUpRight size={13} className="text-neutral-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────
          HORIZONTAL SIDE-WISE STAGE (No Vertical Scrolling)
      ─────────────────────────────────────────────────────── */}
      <div className="relative">
        {/* Mobile Horizontal Scroll Cue & Arrows */}
        <div className="flex lg:hidden items-center justify-between pb-3 text-xs font-mono text-neutral-500">
          <span className="flex items-center gap-1.5">
            <span>Swipe side-wise horizontally</span>
            <span>↔</span>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={scrollLeft}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center bg-white text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer shadow-xs"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center bg-white text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer shadow-xs"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal Container: Side-by-Side 2 Columns on Desktop, Horizontal Reel on Mobile */}
        <div
          ref={scrollContainerRef}
          className={`flex overflow-x-auto snap-x snap-mandatory lg:overflow-visible gap-6 lg:gap-8 pb-4 items-stretch ${
            activeTab === "both"
              ? "lg:grid lg:grid-cols-2"
              : "lg:block"
          }`}
        >
          {/* ─────────────────────────────────────────────────────
              CARD 1: TECHNOVATE (Software Engineer - Mobile Applications)
          ───────────────────────────────────────────────────── */}
          {(activeTab === "both" || activeTab === "technovate") && (
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="exp-slate-card w-[88vw] sm:w-[580px] lg:w-auto shrink-0 snap-start flex flex-col justify-between rounded-3xl p-6 sm:p-8"
            >
              <div>
                {/* Header: Logo, Company & Live Badge */}
                <div className="flex items-start justify-between gap-3 pb-5 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl p-1 bg-white/5 border border-white/10 shadow-xs flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src="/technovate-logo.png"
                        alt="Technovate logo"
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-extrabold text-white tracking-tight">
                          Technovate
                        </h3>
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/15">
                          Full-time
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 mt-0.5">
                        <MapPin size={12} className="text-orange-400" />
                        <span>Kolkata, West Bengal, India · On-site</span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold flex-shrink-0 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Present · 10 mos</span>
                  </span>
                </div>

                {/* Role Title Line */}
                <div className="mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 block mb-1">
                    CURRENT PRIMARY ROLE
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    Software Engineer – Mobile Applications
                  </h4>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-400 mt-1">
                    <Calendar size={12} className="text-orange-400" />
                    <span>Jan 2026 – Present · 10 mos</span>
                  </div>
                </div>

                {/* Role Summary */}
                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mb-4">
                  Mobile Application Developer specializing in Flutter for Android &amp; iOS. Spearheading client-side architecture, native 60 FPS performance profiling, and production release pipelines.
                </p>

                {/* Key Deliverables Bullet Points */}
                <div className="exp-scope-box my-4 p-4 rounded-2xl">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-2.5">
                    Engineering Scope &amp; Responsibilities
                  </span>
                  <ul className="space-y-2.5 list-none p-0 m-0">
                    {[
                      "Architecting cross-platform applications in Flutter & Dart with responsive native rendering.",
                      "Implementing clean state management architectures (BLoC & Provider) with offline caching.",
                      "Integrating real-time Bluetooth Low Energy (BLE) sensor telemetry and background threads.",
                      "Managing release tracks, bundle signing, and store deployments on Google Play Console and App Store.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-200 font-sans leading-relaxed">
                        <span className="font-mono text-xs font-bold text-orange-400 flex-shrink-0 mt-0.5">
                          —
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies Badges */}
              <div className="pt-3 border-t border-white/10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Skills &amp; Tooling (9+ Skills)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Flutter",
                    "Dart",
                    "Android Studio",
                    "iOS Deployment",
                    "BLoC",
                    "REST APIs",
                    "BLE Sensors",
                    "Play Console",
                    "Git",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="exp-skill-tag px-2.5 py-1 rounded-lg text-[11px] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─────────────────────────────────────────────────────
              CARD 2: MOHS10 TECHNOLOGIES (Software Specialist & Intern)
          ───────────────────────────────────────────────────── */}
          {(activeTab === "both" || activeTab === "mohs10") && (
            <motion.div
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="exp-slate-card w-[88vw] sm:w-[580px] lg:w-auto shrink-0 snap-start flex flex-col justify-between rounded-3xl p-6 sm:p-8"
            >
              <div>
                {/* Header: Logo, Company & Total Duration */}
                <div className="flex items-start justify-between gap-3 pb-5 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl p-1 bg-white/5 border border-white/10 shadow-xs flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src="/mohs10-logo.png"
                        alt="Mohs10 Technologies logo"
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-extrabold text-white tracking-tight">
                          Mohs10 Technologies
                        </h3>
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/15">
                          Full-time
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 mt-0.5">
                        <MapPin size={12} className="text-orange-400" />
                        <span>Bhubaneshwar, Odisha, India · On-site</span>
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-neutral-200 px-3 py-1 rounded-full bg-white/10 border border-white/15 flex-shrink-0">
                    1 yr 9 mos
                  </span>
                </div>

                {/* Connected Internal Career Progression (2 Roles) */}
                <div className="space-y-6">
                  {/* Sub-Role 1: Software Engineer Specialist (Promotion) */}
                  <div className="relative pl-5 border-l-2 border-orange-500">
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-orange-950/60" />
                    
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 mb-0.5">
                      <TrendingUp size={12} />
                      <span>PROMOTION // SPECIALIST ROLE</span>
                    </div>

                    <h4 className="text-lg font-bold text-white">
                      Software Engineer Specialist
                    </h4>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-400 mt-0.5 mb-2">
                      <Calendar size={11} className="text-orange-400" />
                      <span>Sep 2024 – Nov 2025 · 1 yr 3 mos</span>
                    </div>

                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      Specialized in building Android and iOS applications using Flutter and Dart. Used Android Studio IDE and Postman API to create and test user-friendly, high-quality mobile solutions.
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {["Flutter", "Dart", "Android Studio", "Postman", "REST APIs", "UI/UX"].map((s) => (
                        <span key={s} className="exp-skill-tag px-2 py-0.5 rounded text-[10px] font-mono">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sub-Role 2: Backend & Mobile application developer (Internship) */}
                  <div className="relative pl-5 border-l-2 border-neutral-600">
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-neutral-500 ring-2 ring-neutral-700" />

                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-0.5">
                      FOUNDATIONAL TENURE // INTERNSHIP
                    </div>

                    <h4 className="text-lg font-bold text-white">
                      Backend &amp; Mobile application developer
                    </h4>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-400 mt-0.5 mb-2">
                      <Calendar size={11} className="text-orange-400" />
                      <span>Mar 2024 – Aug 2024 · 6 mos</span>
                    </div>

                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      Worked as back-end and mobile application developer intern on technologies like Spring Boot, Java, SQL, Flutter, Dart, Firebase, Android Studio, and MySQL.
                    </p>

                    {/* Verified Internship Certificate Card */}
                    <div className="exp-cert-card my-3 p-3.5 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-14 h-9 rounded-md overflow-hidden border border-white/20 bg-neutral-900 shadow-xs flex-shrink-0">
                          <img
                            src="/mohs10-internship-cert.png"
                            alt="MOHS10 Internship Certificate"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-white truncate">
                            <FileText size={13} className="text-orange-400 flex-shrink-0" />
                            <span>Internship Certificate.pdf</span>
                          </div>
                          <span className="text-[10px] text-neutral-400 block truncate font-mono">
                            MOHS10 Technologies · Mar–Aug 2024
                          </span>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold flex-shrink-0">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        <span>Verified</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {["Spring Boot", "Java", "SQL", "MySQL", "Flutter", "Firebase"].map((s) => (
                        <span key={s} className="exp-skill-tag px-2 py-0.5 rounded text-[10px] font-mono">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Technologies Bottom Pill */}
              <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                  <Award size={13} className="text-orange-400" />
                  <span>15+ Core Technical Skills</span>
                </span>
                <span className="font-mono text-xs text-orange-400 font-bold">
                  2 Connected Roles
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
