import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";

interface ExperienceEntry {
  id: number;
  role: string;
  company?: string;
  period: string;
  location?: string;
  bullets: string[];
  tags: string[];
}

const experiences: ExperienceEntry[] = [
  {
    id: 1,
    role: "Software Development Engineer (Mobile)",
    company: "Tech Innovations Pvt. Ltd.",
    period: "Jan 2023 – Present",
    location: "Bhubaneswar, India",
    bullets: [
      "Developed and maintained 3 production-grade Android and iOS apps using Flutter, serving 50,000+ active users",
      "Reduced app load time by 40% through performance profiling and optimization",
      "Integrated Firebase Authentication, Firestore, and Cloud Messaging for real-time features",
      "Led API integration of 15+ RESTful endpoints with offline-first architecture",
      "Collaborated with cross-functional teams in Agile sprints with 2-week cycles",
    ],
    tags: ["Flutter", "Dart", "Firebase", "REST API", "Android", "iOS"],
  },
  {
    id: 2,
    role: "Junior Mobile Developer (Intern → Full-time)",
    company: "Pixel Code Studios",
    period: "Jun 2022 – Dec 2022",
    bullets: [
      "Built and shipped 2 Android applications with 10,000+ downloads on Google Play Store",
      "Implemented MVVM architecture pattern reducing codebase complexity by 30%",
      "Wrote unit and widget tests achieving 80% code coverage",
      "Mentored 2 intern developers on Flutter best practices",
    ],
    tags: ["Flutter", "Kotlin", "Android SDK", "SQLite", "MVVM"],
  },
  {
    id: 3,
    role: "Open Source Contributor & Freelancer",
    period: "2021 – 2022",
    bullets: [
      "Contributed to 5+ open source Flutter packages on pub.dev",
      "Delivered 4 freelance mobile app projects for clients across e-commerce and health domains",
      "Maintained 100% client satisfaction with timely deliveries",
    ],
    tags: ["Flutter", "Dart", "Firebase", "Git"],
  },
];

const tagColors: Record<string, string> = {
  Flutter: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Dart: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Firebase: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "REST API": "bg-green-500/20 text-green-300 border-green-500/30",
  Android: "bg-green-600/20 text-green-400 border-green-600/30",
  iOS: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  Kotlin: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Android SDK": "bg-lime-500/20 text-lime-300 border-lime-500/30",
  SQLite: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  MVVM: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Git: "bg-red-500/20 text-red-300 border-red-500/30",
};

const cardVariants = {
  hidden: (isLeft: boolean) => ({
    opacity: 0,
    x: isLeft ? -80 : 80,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 18,
      duration: 0.6,
    },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 15, delay: 0.2 },
  },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-blue-400 mb-3">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Work{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg">
            Building impactful mobile experiences across industries
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical gradient line — hidden on mobile, shown md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-0">
            <div className="h-full w-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-40" />
          </div>

          {/* Mobile left line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px z-0">
            <div className="h-full w-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-40" />
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={exp.id} className="relative flex items-start md:items-center">
                  {/* Timeline dot — desktop centered */}
                  <motion.div
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-5 h-5 rounded-full items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #a855f7)",
                      boxShadow: "0 0 12px rgba(99,102,241,0.6)",
                    }}
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </motion.div>

                  {/* Mobile dot */}
                  <motion.div
                    className="md:hidden flex-shrink-0 mt-1 ml-3.5 -translate-x-1/2 z-10 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #a855f7)",
                      boxShadow: "0 0 12px rgba(99,102,241,0.6)",
                    }}
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </motion.div>

                  {/* Card layout: desktop alternating, mobile all left */}
                  <div className="flex w-full md:grid md:grid-cols-2 md:gap-8 pl-8 md:pl-0">
                    {/* Left slot */}
                    <div
                      className={`hidden md:flex md:justify-end md:pr-10 ${
                        isLeft ? "md:col-start-1" : "md:col-start-2 md:row-start-1"
                      }`}
                    >
                      {isLeft && (
                        <motion.div
                          className="w-full max-w-lg"
                          custom={true}
                          variants={cardVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.3 }}
                        >
                          <ExperienceCard exp={exp} />
                        </motion.div>
                      )}
                    </div>

                    {/* Right slot */}
                    <div
                      className={`hidden md:flex md:justify-start md:pl-10 ${
                        !isLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
                      }`}
                    >
                      {!isLeft && (
                        <motion.div
                          className="w-full max-w-lg"
                          custom={false}
                          variants={cardVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.3 }}
                        >
                          <ExperienceCard exp={exp} />
                        </motion.div>
                      )}
                    </div>

                    {/* Mobile: single column card */}
                    <motion.div
                      className="md:hidden w-full"
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ type: "spring", stiffness: 80, damping: 18 }}
                    >
                      <ExperienceCard exp={exp} />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp }: { exp: ExperienceEntry }) {
  return (
    <motion.div
      className="group relative rounded-2xl border border-white/10 p-6 cursor-default overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 60px rgba(99,102,241,0.15)",
        borderColor: "rgba(99,102,241,0.4)",
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Role badge */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <span
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(168,85,247,0.25))",
            border: "1px solid rgba(99,102,241,0.35)",
            color: "#c4b5fd",
          }}
        >
          <Briefcase size={12} />
          {exp.role}
        </span>
      </div>

      {/* Company */}
      {exp.company && (
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
          {exp.company}
        </h3>
      )}

      {/* Period & Location */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
          <Calendar size={13} className="text-blue-400" />
          {exp.period}
        </span>
        {exp.location && (
          <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
            <MapPin size={13} className="text-purple-400" />
            {exp.location}
          </span>
        )}
      </div>

      {/* Bullet points */}
      <ul className="space-y-2 mb-5">
        {exp.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed">
            <span
              className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
              style={{ background: "linear-gradient(135deg, #3b82f6, #a855f7)" }}
            />
            {bullet}
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
              tagColors[tag] ?? "bg-white/10 text-gray-300 border-white/20"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
