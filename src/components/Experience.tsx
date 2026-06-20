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
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "#0B0B0B" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(245,208,0,0.04)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(57,211,83,0.04)" }} />
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
          <span className="inline-block text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "#39D353" }}>
            Career Journey
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ color: "#D4E8D4", fontFamily: "Space Grotesk, sans-serif" }}
          >
            <WordReveal>Work Experience</WordReveal>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg" style={{ color: "#5A7A57" }}>
            Building impactful mobile experiences across industries
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-0">
            <div className="h-full w-full timeline-line opacity-50" />
          </div>

          {/* Left line — mobile */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px z-0">
            <div className="h-full w-full timeline-line opacity-40" />
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={exp.id} className="relative flex items-start md:items-center">
                  {/* Timeline dot — desktop */}
                  <motion.div
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-5 h-5 rounded-full items-center justify-center"
                    style={{
                      background: "#F5D000",
                      boxShadow: "0 0 16px rgba(245,208,0,0.6)",
                    }}
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: "#0B0B0B" }} />
                  </motion.div>

                  {/* Timeline dot — mobile */}
                  <motion.div
                    className="md:hidden flex-shrink-0 mt-1 ml-3.5 -translate-x-1/2 z-10 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "#F5D000", boxShadow: "0 0 12px rgba(245,208,0,0.5)" }}
                    variants={dotVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: "#0B0B0B" }} />
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
        background: "rgba(13, 20, 12, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderColor: "rgba(245,208,0,0.10)",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 60px rgba(57,211,83,0.10)",
        borderColor: "rgba(57,211,83,0.30)",
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: "linear-gradient(90deg, #F5D000, #39D353)" }}
      />

      {/* Role badge */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <span
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(245,208,0,0.10)",
            border: "1px solid rgba(245,208,0,0.20)",
            color: "#F5D000",
          }}
        >
          <Briefcase size={12} />
          {exp.role}
        </span>
      </div>

      {/* Company */}
      {exp.company && (
        <h3
          className="text-xl font-bold mb-2 transition-colors group-hover:text-[#39D353]"
          style={{ color: "#D4E8D4" }}
        >
          {exp.company}
        </h3>
      )}

      {/* Period & Location */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: "#3A5A37" }}>
          <Calendar size={13} style={{ color: "#F5D000" }} />
          {exp.period}
        </span>
        {exp.location && (
          <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: "#3A5A37" }}>
            <MapPin size={13} style={{ color: "#39D353" }} />
            {exp.location}
          </span>
        )}
      </div>

      {/* Bullet points — each line appears on scroll */}
      <ul className="space-y-2 mb-5">
        {exp.bullets.map((bullet, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed"
            style={{ color: "#5A7A57" }}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <span
              className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
              style={{ background: "#39D353" }}
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
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              background: "rgba(57,211,83,0.08)",
              border: "1px solid rgba(57,211,83,0.18)",
              color: "#39D353",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
