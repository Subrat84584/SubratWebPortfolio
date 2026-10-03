import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Smartphone,
  Layers,
  Rocket,
  ShieldCheck,
  CreditCard,
  Server,
  ArrowUpRight,
} from "lucide-react";
import "./Experience.css";

interface ExperienceRole {
  id: string;
  role: string;
  company: string;
  companyInitials: string;
  companyGradient: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  isCurrent: boolean;
  statusBadge: string;
  overview: string;
  logo: React.ReactNode;
  phoneMoment: {
    title: string;
    appName: string;
    screenshot: string;
    metrics: string;
    description: string;
  };
  impactMetrics: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    description: string;
  }[];
  deliverables: string[];
  skills: {
    category: string;
    items: string[];
  }[];
  relatedProjectName: string;
  relatedProjectId: string;
}

const experiences: ExperienceRole[] = [
  {
    id: "technovate",
    role: "Mobile Application Specialist & Flutter Lead",
    company: "Technovate Solutions",
    companyInitials: "TS",
    companyGradient: "from-orange-600 to-amber-600",
    type: "Full-time",
    period: "Nov 2025 – Present",
    duration: "Current Position",
    location: "Kolkata, WB, India",
    isCurrent: true,
    statusBadge: "Current Role",
    overview:
      "Leading mobile engineering for flagship cross-platform applications across Android and iOS using Flutter & Dart. Architecting scalable client-side component trees, integrating real-time Bluetooth Low Energy (BLE) sensor telemetry, optimizing native 60fps rendering, and managing production Google Play Console and App Store distribution pipelines.",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#111317" />
        <path d="M12 14H28M20 14V28M15 28H25" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="14" r="2.5" fill="#F97316" />
      </svg>
    ),
    phoneMoment: {
      title: "Production Mobile Moment",
      appName: "HitnMove Boxing Suite & IoT Telemetry",
      screenshot: "/projects/hitnmove/screenshot-1.webp",
      metrics: "60 FPS • Real-time BLE Sensors",
      description: "Delivering real-time punch velocity tracking, instant device pairing, and synchronized cloud dashboards for elite athletes.",
    },
    impactMetrics: [
      {
        icon: Smartphone,
        title: "Cross-Platform Delivery",
        subtitle: "Android & iOS Native-Grade",
        description:
          "Developing seamless cross-platform client architectures with optimized widget trees and smooth 60 FPS performance.",
      },
      {
        icon: Rocket,
        title: "Release Lifecycle",
        subtitle: "Google Play Console",
        description:
          "Orchestrating production release tracks, internal testing distribution channels, and compliance deployments.",
      },
      {
        icon: Layers,
        title: "Architecture & State",
        subtitle: "BLoC & Clean Architecture",
        description:
          "Implementing clean state management architectures, offline caching, and real-time REST backend synchronization.",
      },
    ],
    deliverables: [
      "Architecting enterprise-grade Android and iOS applications with Flutter & Dart, emphasizing maintainability and testability",
      "Integrating Bluetooth Low Energy (BLE) sensor streaming with custom chart renderers and sub-100ms response latencies",
      "Managing end-to-end mobile release lifecycles, version tagging, bundle signing, and Google Play Console deployments",
      "Optimizing rendering performance, memory footprint, and network consumption for seamless native-grade experience",
    ],
    skills: [
      {
        category: "Core Mobile",
        items: ["Flutter", "Dart", "Android", "iOS", "BLoC"],
      },
      {
        category: "Services & Tooling",
        items: ["REST APIs", "BLE Integration", "Google Play Console", "Git", "Postman"],
      },
    ],
    relatedProjectName: "HitnMove Boxing App",
    relatedProjectId: "hitnmove",
  },
  {
    id: "mohs10",
    role: "Mobile & Backend Application Developer",
    company: "Mohs10 Technologies",
    companyInitials: "M10",
    companyGradient: "from-blue-600 to-indigo-600",
    type: "Full-time",
    period: "Mar 2024 – Nov 2025",
    duration: "1 yr 9 mos",
    location: "Bhubaneswar, Odisha, India",
    isCurrent: false,
    statusBadge: "Engineering Tenure",
    overview:
      "Engineered production mobile applications in Flutter alongside Java & Spring Boot backend microservices. Built end-to-end multi-role healthcare and caregiver platforms, integrated RevenueCat in-app subscriptions, Razorpay payment gateways, and modeled optimized relational schemas in MySQL.",
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#1E293B" />
        <path d="M12 28L12 12L20 20L28 12L28 28" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="24" r="2" fill="#F97316" />
      </svg>
    ),
    phoneMoment: {
      title: "Production Mobile Moment",
      appName: "Kare Special Healthcare Ecosystem",
      screenshot: "/projects/karespecial/screenshot-1.webp",
      metrics: "Multi-Role • RevenueCat & Razorpay",
      description: "Spearheaded multi-tenant healthcare consultation modules, sensory games for special needs, and recurring subscription monetization.",
    },
    impactMetrics: [
      {
        icon: CreditCard,
        title: "Monetization Suite",
        subtitle: "RevenueCat & Razorpay",
        description:
          "Implemented robust in-app purchases, auto-renewing subscriptions, receipt validation, and payment gateways.",
      },
      {
        icon: Server,
        title: "Backend Services",
        subtitle: "Spring Boot & Java",
        description:
          "Constructed modular REST endpoints, relational schemas in MySQL, and secured API service layers.",
      },
      {
        icon: ShieldCheck,
        title: "Quality & Testing",
        subtitle: "Android Studio & Postman",
        description:
          "Executed comprehensive payload validation, stress tests, edge-case testing, and memory leak profiling.",
      },
    ],
    deliverables: [
      "Built high-performance Android and iOS mobile applications using Flutter & Dart across consumer and enterprise healthcare use cases",
      "Integrated monetization solutions including Razorpay, RevenueCat subscriptions, and Apple/Google In-App Purchases",
      "Architected backend microservices and relational database schemas with Java, Spring Boot, and MySQL",
      "Partnered with cross-functional teams to translate business requirements into sleek mobile UI with high test coverage",
    ],
    skills: [
      {
        category: "Mobile & Monetization",
        items: ["Flutter", "Dart", "RevenueCat", "Razorpay", "In-App Purchases"],
      },
      {
        category: "Backend & Database",
        items: ["Spring Boot", "Java", "REST APIs", "MySQL", "Postman", "Swagger"],
      },
    ],
    relatedProjectName: "Kare Mobile Experience",
    relatedProjectId: "karespecial",
  },
];

export default function Experience() {
  const [activeId, setActiveId] = useState<string>(experiences[0].id);
  const activeRole = experiences.find((e) => e.id === activeId) || experiences[0];

  return (
    <section id="experience" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-mono font-bold tracking-widest uppercase block mb-2 text-orange-600">
          [CAREER CHRONOLOGY // 02]
        </span>
        <h2 className="text-3xl sm:text-5xl font-sans tracking-tight font-extrabold text-slate-900">
          Proven Industry Experience
        </h2>
        <p className="mt-3 text-base text-slate-600 font-sans leading-relaxed">
          Production engineering tenures delivering mobile client architectures, native device performance, and cloud microservices.
        </p>
      </div>

      {/* Two Company Selector Tabs with Brand Logos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
        {experiences.map((exp, idx) => {
          const isActive = exp.id === activeId;
          return (
            <button
              key={exp.id}
              onClick={() => setActiveId(exp.id)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                isActive
                  ? "border-slate-900 bg-white shadow-md ring-1 ring-slate-900"
                  : "border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex-shrink-0">{exp.logo}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-base font-bold truncate ${isActive ? "text-slate-900" : "text-slate-700"}`}>
                      {exp.company}
                    </h3>
                    {exp.isCurrent && (
                      <span className="font-mono text-[10px] font-bold text-orange-700 bg-orange-50 border border-orange-200 px-1.5 py-0.2 rounded">
                        CURRENT
                      </span>
                    )}
                  </div>
                  <span className="block text-xs text-slate-500 truncate mt-0.5 font-sans">
                    {exp.role}
                  </span>
                  <span className="block font-mono text-[11px] text-slate-400 mt-1">
                    {exp.period} • {exp.duration}
                  </span>
                </div>
              </div>

              <span className="font-mono text-xs font-bold text-slate-400">
                0{idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detailed Experience Dossier Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRole.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-9 shadow-sm"
        >
          {/* Header Row: Company, Role & Meta */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0">{activeRole.logo}</div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {activeRole.company}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {activeRole.type}
                  </span>
                  {activeRole.isCurrent && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-orange-50 text-orange-700 border border-orange-200">
                      [ACTIVE ROLE]
                    </span>
                  )}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-orange-700">
                  {activeRole.role}
                </h4>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-500">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50">
                <Calendar size={13} className="text-orange-600" />
                {activeRole.period} ({activeRole.duration})
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50">
                <MapPin size={13} className="text-slate-400" />
                {activeRole.location}
              </span>
            </div>
          </div>

          {/* Grid: Role Synopsis + Phone Moment Showcase */}
          <div className="grid lg:grid-cols-12 gap-8 py-8 items-center border-b border-slate-200">
            {/* Left: Role Overview */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block">
                ROLE SYNOPSIS &amp; IMPACT
              </span>
              <p className="text-base sm:text-lg leading-relaxed text-slate-700 font-sans">
                {activeRole.overview}
              </p>

              {/* High-Impact Engineering Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                {activeRole.impactMetrics.map((metric, i) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 flex flex-col justify-between"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-100 text-orange-700 mb-2">
                        <Icon size={16} />
                      </div>
                      <strong className="block text-xs font-bold text-slate-900 leading-snug">
                        {metric.subtitle}
                      </strong>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {metric.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Phone Moment Showcase (User requested: photo/moment where i show some phone with that company) */}
            <div className="lg:col-span-5 p-5 rounded-2xl border border-orange-200 bg-orange-50/30 flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-orange-200/60">
                <span className="text-xs font-mono font-bold text-orange-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Smartphone size={14} />
                  <span>{activeRole.phoneMoment.title}</span>
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white text-slate-700 border border-orange-200">
                  {activeRole.phoneMoment.metrics}
                </span>
              </div>

              {/* Phone Frame Device Mockup */}
              <div className="relative w-44 sm:w-48 aspect-[9/16] rounded-2xl overflow-hidden border-4 border-slate-900 bg-slate-950 shadow-xl my-2">
                <img
                  src={activeRole.phoneMoment.screenshot}
                  alt={activeRole.phoneMoment.appName}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent text-white">
                  <span className="block text-[10px] font-mono text-orange-400 font-bold truncate">
                    {activeRole.company}
                  </span>
                  <p className="text-[11px] font-bold leading-tight truncate">
                    {activeRole.phoneMoment.appName}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 text-center font-sans mt-3 px-2 leading-relaxed">
                {activeRole.phoneMoment.description}
              </p>
            </div>
          </div>

          {/* Key Deliverables & Responsibilities */}
          <div className="py-6 border-b border-slate-200">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
              Key Contributions &amp; Engineering Deliverables
            </h4>
            <ul className="space-y-3 list-none p-0 m-0">
              {activeRole.deliverables.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-slate-700">
                  <span className="font-mono text-sm font-bold text-orange-600 select-none flex-shrink-0 mt-0.5">
                    —
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Group Matrix */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
                Technologies &amp; Tooling Matrix
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeRole.skills.flatMap((s) => s.items).map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-700 hover:text-orange-800 transition-colors self-start sm:self-auto"
            >
              <span>View Related Project ({activeRole.relatedProjectName})</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
