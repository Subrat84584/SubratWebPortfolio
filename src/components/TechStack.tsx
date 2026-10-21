import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Code,
  Settings,
  Database,
  Layers,
  Monitor,
  ShieldCheck,
  Terminal,
  Cpu,
  Server,
  Network,
  CheckCircle2,
  GitBranch,
  Flame,
  Globe,
  Radio,
  Workflow,
  Boxes,
  CreditCard,
  Sparkles,
  Zap,
} from "lucide-react";

interface AutoSkill {
  name: string;
  role: string;
  icon: typeof Smartphone;
}

const AUTO_SKILLS_ROW_1: AutoSkill[] = [
  { name: "Flutter", role: "Primary Framework", icon: Smartphone },
  { name: "Dart", role: "Core OOP Language", icon: Terminal },
  { name: "BLoC Architecture", role: "Reactive State Mgmt", icon: Layers },
  { name: "Android Studio", role: "Native Android & NDK", icon: Boxes },
  { name: "iOS Deployment", role: "Xcode & App Store", icon: ShieldCheck },
  { name: "Spring Boot", role: "Microservices & Java", icon: Server },
  { name: "RESTful APIs", role: "JSON Schema & Bus", icon: Network },
  { name: "Firebase Firestore", role: "Real-time Cloud NoSQL", icon: Flame },
  { name: "Provider Pattern", role: "Dependency Injection", icon: Zap },
  { name: "BLE Sensors", role: "Bluetooth Telemetry", icon: Radio },
];

const AUTO_SKILLS_ROW_2: AutoSkill[] = [
  { name: "Postman Automated", role: "API Endpoint Testing", icon: Workflow },
  { name: "Swagger / OpenAPI", role: "Schema Validation", icon: Code },
  { name: "MySQL & SQLite", role: "Relational Modeling", icon: Database },
  { name: "RevenueCat SDK", role: "In-App Purchases", icon: CreditCard },
  { name: "Razorpay Gateway", role: "Payment Orchestration", icon: ShieldCheck },
  { name: "Git & GitHub", role: "Version Control & CI/CD", icon: GitBranch },
  { name: "React.js & Next.js", role: "Modern Web Frontends", icon: Globe },
  { name: "TypeScript", role: "Strict Type Safety", icon: Code },
  { name: "Play Console", role: "Track Release Signing", icon: Monitor },
  { name: "Node.js & Express", role: "Micro-Service Bus", icon: Cpu },
];

interface Discipline {
  id: string;
  category: "all" | "mobile" | "backend" | "api" | "database" | "monetization" | "tools";
  number: string;
  title: string;
  icon: typeof Smartphone;
  focus: string;
  metric: string;
  skills: { name: string; tag: string }[];
}

const DISCIPLINES: Discipline[] = [
  {
    id: "mobile",
    category: "mobile",
    number: "01",
    title: "Mobile App Development",
    icon: Smartphone,
    focus: "Primary Specialization",
    metric: "60 FPS Native Performance",
    skills: [
      { name: "Flutter", tag: "Engine" },
      { name: "Dart", tag: "Language" },
      { name: "Android Studio", tag: "IDE" },
      { name: "Android & iOS", tag: "Platforms" },
      { name: "BLoC", tag: "State" },
      { name: "Provider", tag: "DI" },
    ],
  },
  {
    id: "backend",
    category: "backend",
    number: "02",
    title: "Backend & Microservices",
    icon: Server,
    focus: "Distributed Cloud Systems",
    metric: "Resilient API Endpoints",
    skills: [
      { name: "Spring Boot", tag: "Java" },
      { name: "Java Enterprise", tag: "Core" },
      { name: "Firebase", tag: "Cloud" },
      { name: "REST APIs", tag: "Bus" },
      { name: "Node.js", tag: "Runtime" },
    ],
  },
  {
    id: "api-testing",
    category: "api",
    number: "03",
    title: "API & Test Automation",
    icon: Settings,
    focus: "Contract & Payload Validation",
    metric: "Automated Regression Suites",
    skills: [
      { name: "Postman", tag: "Test Runner" },
      { name: "Swagger", tag: "Doc Specs" },
      { name: "OpenAPI 3.0", tag: "Standard" },
      { name: "JSON Schema", tag: "Validation" },
      { name: "RESTful Bus", tag: "Protocol" },
    ],
  },
  {
    id: "database",
    category: "database",
    number: "04",
    title: "Database & Cloud Storage",
    icon: Database,
    focus: "Relational & NoSQL Engineering",
    metric: "Offline Sync & Caching",
    skills: [
      { name: "Firestore", tag: "NoSQL" },
      { name: "MySQL", tag: "Relational" },
      { name: "SQLite", tag: "Local Cache" },
      { name: "Cloud Storage", tag: "Media" },
      { name: "Schema Modeling", tag: "Indexes" },
    ],
  },
  {
    id: "monetization",
    category: "monetization",
    number: "05",
    title: "Payments & Store Ops",
    icon: CreditCard,
    focus: "In-App Monetization Systems",
    metric: "PCI-DSS & Store Compliant",
    skills: [
      { name: "Razorpay", tag: "Gateway" },
      { name: "RevenueCat", tag: "IAP/Subs" },
      { name: "Play Console", tag: "Releases" },
      { name: "App Store Connect", tag: "Review" },
      { name: "AOT Signing", tag: "Keystore" },
    ],
  },
  {
    id: "web-tooling",
    category: "tools",
    number: "06",
    title: "Web & Engineering Tools",
    icon: Monitor,
    focus: "Web Apps & Version Workflows",
    metric: "Production CI/CD Pipelines",
    skills: [
      { name: "React.js", tag: "SPA" },
      { name: "Next.js", tag: "SSR" },
      { name: "TypeScript", tag: "Typing" },
      { name: "Git & GitHub", tag: "VCS" },
      { name: "CI/CD Actions", tag: "DevOps" },
    ],
  },
];

const CATEGORY_TABS = [
  { id: "all", label: "All Disciplines (6)" },
  { id: "mobile", label: "01 Mobile" },
  { id: "backend", label: "02 Backend" },
  { id: "api", label: "03 APIs" },
  { id: "database", label: "04 Database" },
  { id: "monetization", label: "05 Payments" },
  { id: "tools", label: "06 Web & Tools" },
] as const;

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredDisciplines =
    activeCategory === "all"
      ? DISCIPLINES
      : DISCIPLINES.filter((d) => d.category === activeCategory);

  return (
    <section id="tech-stack" className="py-24 sm:py-28 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-20">
      {/* ───────────────────────────────────────────────────────
          SECTION HEADER
      ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center max-w-3xl mx-auto"
      >

        <h2 className="text-3xl sm:text-5xl font-sans tracking-tight font-extrabold text-neutral-900">
          Core Disciplines &amp; Technical Stack
        </h2>
        <p className="mt-2.5 text-sm sm:text-base text-neutral-600 font-sans leading-relaxed">
          A curated ecosystem of mobile technologies, backend architectures, payment infrastructure, and developer tooling utilized in production environments.
        </p>
      </motion.div>

      {/* ───────────────────────────────────────────────────────
          AUTO-SLIDING UNIFORM SKILL BOXES (CYCLE-WISE CAROUSEL)
          "all the skill name need to be wrap in a box and show
          left to right with same size and auto slide , cycle wise."
      ─────────────────────────────────────────────────────── */}
      <div className="mb-16">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-700">
              PRODUCTION TOOLING ARSENAL // CONTINUOUS CYCLE
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-500 hidden sm:inline">
            Hover to pause • 20+ Shipped Technologies
          </span>
        </div>

        {/* Outer Ribbon with edge fades */}
        <div className="relative overflow-hidden rounded-3xl p-3 sm:p-5 bg-neutral-100/70 border border-neutral-200/80 shadow-xs space-y-3.5 marquee-pause">
          {/* Gradient Edge Masks for soft fade */}
          <div className="pointer-events-none absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-neutral-100 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-neutral-100 to-transparent z-10" />

          {/* Row 1: Left to Right Continuous Auto-Slide Cycle */}
          <div className="overflow-hidden w-full flex">
            <div className="animate-marquee-left flex gap-3.5">
              {[...AUTO_SKILLS_ROW_1, ...AUTO_SKILLS_ROW_1, ...AUTO_SKILLS_ROW_1].map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={`r1-${idx}`}
                    className="slate-marquee-box w-56 h-[76px] shrink-0 p-3 rounded-2xl flex items-center gap-3 select-none"
                  >
                    <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-white tracking-tight truncate">
                        {skill.name}
                      </h4>
                      <p className="text-[11px] font-mono text-neutral-400 truncate mt-0.5">
                        {skill.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Right to Left Continuous Auto-Slide Cycle */}
          <div className="overflow-hidden w-full flex">
            <div className="animate-marquee-right flex gap-3.5">
              {[...AUTO_SKILLS_ROW_2, ...AUTO_SKILLS_ROW_2, ...AUTO_SKILLS_ROW_2].map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={`r2-${idx}`}
                    className="slate-marquee-box w-56 h-[76px] shrink-0 p-3 rounded-2xl flex items-center gap-3 select-none"
                  >
                    <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-white tracking-tight truncate">
                        {skill.name}
                      </h4>
                      <p className="text-[11px] font-mono text-neutral-400 truncate mt-0.5">
                        {skill.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────
          DISCIPLINE FILTER SELECTOR (Take More Space & Interactivity)
      ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
            EXPLORE BY DISCIPLINE
          </span>
          <h3 className="text-2xl font-bold text-neutral-900">
            Architectural Domains &amp; Specifications
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex flex-wrap items-center p-1 rounded-xl bg-neutral-100 border border-neutral-200 gap-1">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-neutral-900 text-white shadow-xs font-extrabold"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────
          MAIN ARCHITECTURAL GRID: SPEC SHEET + 6 DISCIPLINE CARDS
      ─────────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Side: Swiss Architectural Technical Spec Sheet */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="slate-card lg:col-span-5 p-6 sm:p-7 rounded-3xl flex flex-col gap-6"
        >
          {/* Header of Spec Sheet */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Terminal size={17} className="text-orange-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                SYS_SPEC // ARCHITECTURE
              </span>
            </div>
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-neutral-200 border border-white/15">
              REV. 2026
            </span>
          </div>

          {/* Stack Hierarchy Graphic / Blueprint */}
          <div className="space-y-3 font-mono text-xs">
            <div className="slate-inner-box p-3.5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-[2px] bg-orange-400 inline-block" />
                <span className="text-neutral-400 font-bold">L1: PRESENTATION</span>
              </div>
              <span className="font-bold text-white">Flutter / Dart (Android &amp; iOS)</span>
            </div>

            <div className="slate-inner-box p-3.5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-[2px] bg-neutral-400 inline-block" />
                <span className="text-neutral-400 font-bold">L2: STATE &amp; LOGIC</span>
              </div>
              <span className="font-bold text-white">BLoC / Provider / Clean Arch</span>
            </div>

            <div className="slate-inner-box p-3.5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-[2px] bg-neutral-400 inline-block" />
                <span className="text-neutral-400 font-bold">L3: SERVICE BUS</span>
              </div>
              <span className="font-bold text-white">RESTful APIs / Spring Boot</span>
            </div>

            <div className="slate-inner-box p-3.5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-[2px] bg-neutral-400 inline-block" />
                <span className="text-neutral-400 font-bold">L4: PERSISTENCE</span>
              </div>
              <span className="font-bold text-white">Firebase Firestore / MySQL</span>
            </div>
          </div>

          {/* Key Engineering Standards List */}
          <div className="pt-2 border-t border-white/10 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
              PRODUCTION STANDARDS
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-start justify-between py-1.5 border-b border-white/10">
                <span className="text-neutral-400 font-medium">Compilation:</span>
                <span className="font-mono font-semibold text-white">Ahead-Of-Time (AOT) Release</span>
              </div>
              <div className="flex items-start justify-between py-1.5 border-b border-white/10">
                <span className="text-neutral-400 font-medium">Deployment Target:</span>
                <span className="font-mono font-semibold text-white">Google Play Store &amp; App Store</span>
              </div>
              <div className="flex items-start justify-between py-1.5 border-b border-white/10">
                <span className="text-neutral-400 font-medium">Monetization:</span>
                <span className="font-mono font-semibold text-white">RevenueCat &amp; Razorpay SDKs</span>
              </div>
              <div className="flex items-start justify-between py-1.5">
                <span className="text-neutral-400 font-medium">API Validation:</span>
                <span className="font-mono font-semibold text-white">Postman Automated Suites</span>
              </div>
            </div>
          </div>

          {/* Architectural Quote / Signature Callout */}
          <div className="slate-inner-box p-4 rounded-2xl border border-orange-500/30 text-xs text-neutral-200 flex items-center gap-3">
            <ShieldCheck size={22} className="text-orange-400 flex-shrink-0" />
            <p className="leading-relaxed">
              Every application is built with testable architecture, smooth 60fps animations, and hardened exception handling.
            </p>
          </div>
        </motion.div>

        {/* Right Side: Discipline Cards Grid */}
        <motion.div
          layout
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-7 grid sm:grid-cols-2 gap-5"
        >
          <AnimatePresence>
            {filteredDisciplines.map((discipline) => {
              const Icon = discipline.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={discipline.id}
                  className="slate-card group p-6 rounded-3xl flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Icon & Category Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-white transition-colors">
                        {discipline.number}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors tracking-tight">
                      {discipline.title}
                    </h3>

                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mt-1 mb-4">
                      <span>{discipline.focus}</span>
                    </div>
                  </div>

                  {/* Skills wrapped in uniform boxes */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-2.5">
                      Tooling Stack:
                    </span>
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
                      {discipline.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="slate-inner-box px-2.5 py-1.5 rounded-xl flex items-center justify-between gap-1.5 text-[11px]"
                        >
                          <span className="font-mono font-medium text-white truncate">{skill.name}</span>
                          <span className="text-[9px] font-mono text-neutral-400 bg-white/5 px-1 rounded shrink-0">
                            {skill.tag}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Metric Footer Line */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>Standard:</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        {discipline.metric}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ───────────────────────────────────────────────────────
          BOTTOM ASSURANCE BAR (Takes More Space & Enhances Section)
      ─────────────────────────────────────────────────────── */}
      <div className="slate-card p-6 sm:p-8 rounded-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">60 FPS</div>
          <p className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">Smooth Native Profiling</p>
          <p className="text-xs text-neutral-300 font-sans">Zero jank with Flutter Impeller &amp; skia optimization</p>
        </div>

        <div className="space-y-1 sm:border-l sm:border-white/10 sm:pl-6">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Clean Arch</div>
          <p className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">BLoC &amp; Provider Core</p>
          <p className="text-xs text-neutral-300 font-sans">Strict decoupled domain &amp; data layer abstractions</p>
        </div>

        <div className="space-y-1 lg:border-l lg:border-white/10 lg:pl-6">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">AOT Release</div>
          <p className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">Signed Store Bundles</p>
          <p className="text-xs text-neutral-300 font-sans">Hardened App Store Connect &amp; Google Play signing</p>
        </div>

        <div className="space-y-1 sm:border-l sm:border-white/10 sm:pl-6">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Automated</div>
          <p className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">Postman REST Testing</p>
          <p className="text-xs text-neutral-300 font-sans">Payload contracts verified before build deployments</p>
        </div>
      </div>
    </section>
  );
}
