import { motion } from "framer-motion";
import {
  Smartphone,
  Code,
  Settings,
  Database,
  Layers,
  Monitor,
  ShieldCheck,
  Terminal,
} from "lucide-react";

interface Discipline {
  id: string;
  number: string;
  title: string;
  icon: typeof Smartphone;
  skills: string[];
  focus: string;
}

const DISCIPLINES: Discipline[] = [
  {
    id: "mobile",
    number: "01",
    title: "Mobile App Development",
    icon: Smartphone,
    focus: "Primary Specialization",
    skills: ["Flutter", "Dart", "Android Studio", "Android & iOS", "State Management (BLoC/Provider)"],
  },
  {
    id: "backend",
    number: "02",
    title: "Backend & Cloud",
    icon: Code,
    focus: "Microservices & Cloud",
    skills: ["Spring Boot", "Java", "Firebase", "REST APIs", "Node.js"],
  },
  {
    id: "api-testing",
    number: "03",
    title: "API & Testing",
    icon: Settings,
    focus: "Payload & Endpoint Validation",
    skills: ["Postman", "Swagger", "OpenAPI", "RESTful Architecture", "JSON Schema"],
  },
  {
    id: "database",
    number: "04",
    title: "Database & Storage",
    icon: Database,
    focus: "Relational & NoSQL",
    skills: ["Firebase Firestore", "MySQL", "Relational Modeling", "Cloud Storage"],
  },
  {
    id: "monetization",
    number: "05",
    title: "Payments & Store Ops",
    icon: Layers,
    focus: "Monetization Systems",
    skills: ["Razorpay", "RevenueCat", "In-App Purchases", "Google Play Console"],
  },
  {
    id: "web-tooling",
    number: "06",
    title: "Web & Engineering Tools",
    icon: Monitor,
    focus: "Web Apps & Collaboration",
    skills: ["React.js", "Next.js", "TypeScript", "Git", "GitHub", "Asana", "Project Planning"],
  },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-24 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <span
          className="text-xs font-mono font-bold tracking-widest uppercase block mb-2"
          style={{ color: "var(--accent)" }}
        >
          [TOOLING ARSENAL // 04]
        </span>
        <h2 className="text-3xl sm:text-5xl font-sans tracking-tight text-slate-900">
          Core Disciplines &amp; <span className="font-extrabold">Technical Stack</span>
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600 leading-relaxed font-sans">
          A curated ecosystem of mobile technologies, backend architectures, payment infrastructure, and developer tooling utilized in production environments.
        </p>
      </motion.div>

      {/* Main Grid: Left Spec Sheet + Right Category Cards */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Swiss Architectural Technical Spec Sheet */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-5 p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col gap-6"
        >
          {/* Header of Spec Sheet */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-orange-600" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900">
                SYS_SPEC // ARCHITECTURE
              </span>
            </div>
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              REV. 2026
            </span>
          </div>

          {/* Stack Hierarchy Graphic / Blueprint */}
          <div className="space-y-2.5 font-mono text-xs">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-[2px] bg-orange-600 inline-block" />
                <span className="text-slate-500 font-bold">L1: PRESENTATION</span>
              </div>
              <span className="font-bold text-slate-800">Flutter / Dart (Android &amp; iOS)</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-[2px] bg-slate-400 inline-block" />
                <span className="text-slate-500 font-bold">L2: STATE &amp; LOGIC</span>
              </div>
              <span className="font-bold text-slate-800">BLoC / Provider / Clean Arch</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-[2px] bg-slate-400 inline-block" />
                <span className="text-slate-500 font-bold">L3: SERVICE BUS</span>
              </div>
              <span className="font-bold text-slate-800">RESTful APIs / Spring Boot</span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-[2px] bg-slate-400 inline-block" />
                <span className="text-slate-500 font-bold">L4: PERSISTENCE</span>
              </div>
              <span className="font-bold text-slate-800">Firebase Firestore / MySQL</span>
            </div>
          </div>

          {/* Key Engineering Standards List */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block">
              Production Standards
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-start justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Compilation:</span>
                <span className="font-mono font-semibold text-slate-800">Ahead-Of-Time (AOT) Release</span>
              </div>
              <div className="flex items-start justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Deployment Target:</span>
                <span className="font-mono font-semibold text-slate-800">Google Play Store &amp; App Store</span>
              </div>
              <div className="flex items-start justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Monetization:</span>
                <span className="font-mono font-semibold text-slate-800">RevenueCat &amp; Razorpay SDKs</span>
              </div>
              <div className="flex items-start justify-between py-1">
                <span className="text-slate-500 font-medium">API Validation:</span>
                <span className="font-mono font-semibold text-slate-800">Postman Automated Suites</span>
              </div>
            </div>
          </div>

          {/* Architectural Quote / Signature */}
          <div className="p-3.5 rounded-xl border border-orange-200/60 bg-orange-50/50 text-xs text-orange-950 flex items-center gap-3">
            <ShieldCheck size={20} className="text-orange-600 flex-shrink-0" />
            <p className="leading-snug">
              Every application is built with testable architecture, smooth 60fps animations, and hardened exception handling.
            </p>
          </div>
        </motion.div>

        {/* Right Side: 6 Discipline Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-7 grid sm:grid-cols-2 gap-4"
        >
          {DISCIPLINES.map((discipline) => {
            const Icon = discipline.icon;
            return (
              <div
                key={discipline.id}
                className="group p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200/70 text-orange-700 flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                      {discipline.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-700 transition-colors">
                    {discipline.title}
                  </h3>

                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5 mb-3">
                    {discipline.focus}
                  </span>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {discipline.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
