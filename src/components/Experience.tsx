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

const dotVariants = {
  hidden:  { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring" as const, stiffness: 200, damping: 15, delay: 0.2 } },
};

const cardVariants = {
  hidden:  (isLeft: boolean) => ({ opacity: 0, x: isLeft ? -80 : 80 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 18, duration: 0.6 },
  },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
      style={{ background: "transparent" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(99, 102, 241, 0.03)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(16, 185, 129, 0.03)" }} />
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
          <span className="inline-block text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
            Career Journey
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ color: "var(--text)" }}
          >
            <WordReveal>Work Experience</WordReveal>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg" style={{ color: "var(--muted)" }}>
            Building impactful mobile experiences across industries
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-0">
            <div className="h-full w-full timeline-line opacity-30" />
          </div>

          {/* Left line — mobile */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px z-0">
            <div className="h-full w-full timeline-line opacity-25" />
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={exp.id} className="relative flex items-start md:items-center">
                  {/* Timeline dot — desktop */}
                  <motion.div
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-5 h-5 rounded-full items-center justify-center border border-white/10"
                    style={{
                      background: "var(--accent-2)",
                      boxShadow: "0 0 16px rgba(99,102,241,0.4)",
                    }}
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: "var(--ground)" }} />
                  </motion.div>

                  {/* Timeline dot — mobile */}
                  <motion.div
                    className="md:hidden flex-shrink-0 mt-1 ml-3.5 -translate-x-1/2 z-10 w-5 h-5 rounded-full flex items-center justify-center border border-white/10"
                    style={{ background: "var(--accent-2)", boxShadow: "0 0 12px rgba(99,102,241,0.3)" }}
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: "var(--ground)" }} />
                  </motion.div>

                  {/* Card layout */}
                  <div className="flex w-full md:grid md:grid-cols-2 md:gap-8 pl-8 md:pl-0">
                    <div className={`hidden md:flex md:justify-end md:pr-10 ${isLeft ? "md:col-start-1" : "md:col-start-2 md:row-start-1"}`}>
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

                    <div className={`hidden md:flex md:justify-start md:pl-10 ${!isLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}`}>
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

                    {/* Mobile card */}
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
      className="group relative rounded-2xl border p-6 cursor-default overflow-hidden"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--border)",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 10px 30px var(--border)",
        borderColor: "var(--border-hover)",
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: "linear-gradient(90deg, var(--accent-2), var(--accent))" }}
      />

      {/* Role badge */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <span
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
          style={{
            background: "rgba(99, 102, 241, 0.06)",
            borderColor: "var(--border)",
            color: "var(--accent-2)",
          }}
        >
          <Briefcase size={12} />
          {exp.role}
        </span>
      </div>

      {/* Company */}
      {exp.company && (
        <h3
          className="text-xl font-bold mb-2 transition-colors group-hover:text-[var(--accent)]"
          style={{ color: "var(--text)" }}
        >
          {exp.company}
        </h3>
      )}

      {/* Period & Location */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--muted)" }}>
          <Calendar size={13} style={{ color: "var(--accent-2)" }} />
          {exp.period}
        </span>
        {exp.location && (
          <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--muted)" }}>
            <MapPin size={13} style={{ color: "var(--accent)" }} />
            {exp.location}
          </span>
        )}
      </div>

      {/* Bullet points */}
      <ul className="space-y-2 mb-5">
        {exp.bullets.map((bullet, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <span
              className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            {bullet}
          </motion.li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-xs font-medium border"
            style={{
              borderColor: "var(--border)",
              background: "rgba(99, 102, 241, 0.05)",
              color: "var(--text)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
