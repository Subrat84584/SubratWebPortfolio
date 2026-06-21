import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Calendar, Star, Award, Code2, Trophy, Users } from "lucide-react";

const coursework = [
  "Data Structures & Algorithms",
  "Mobile Computing",
  "Software Engineering",
  "Database Management",
  "Operating Systems",
  "Computer Networks",
  "Object-Oriented Programming",
  "Machine Learning",
];

const activities = [
  { label: "Technical Club Lead",      icon: Users  },
  { label: "Hackathon Winner (2x)",    icon: Trophy },
  { label: "Open Source Club Founder", icon: Code2  },
];

interface Certification {
  name: string;
  issuer: string;
  year: string;
  initials: string;
  isYellow: boolean;
}

const certifications: Certification[] = [
  { name: "Associate Android Developer",               issuer: "Google", year: "2022", initials: "G", isYellow: true  },
  { name: "Flutter & Dart – The Complete Guide",       issuer: "Udemy",  year: "2022", initials: "U", isYellow: false },
  { name: "Firebase in a Weekend: Android",            issuer: "Google", year: "2021", initials: "G", isYellow: true  },
  { name: "iOS & Swift – Complete iOS App Dev",        issuer: "Udemy",  year: "2023", initials: "U", isYellow: false },
  { name: "AWS Cloud Practitioner Essentials",         issuer: "Amazon", year: "2023", initials: "A", isYellow: true  },
];

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const accentColor  = cert.isYellow ? "var(--accent-2)" : "var(--accent)";
  const accentBg     = cert.isYellow ? "rgba(99, 102, 241, 0.06)"  : "rgba(16, 185, 129, 0.06)";
  const accentBorder = "var(--border-hover)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex items-center gap-4 rounded-xl border p-4 transition-all duration-300"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--border)",
      }}
      whileHover={{ borderColor: accentBorder, x: 4 }}
    >
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-lg font-bold"
        style={{ background: accentBg, color: accentColor }}
      >
        {cert.initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate font-semibold text-sm" style={{ color: "var(--text)" }}>{cert.name}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{cert.issuer}</p>
      </div>
      <span
        className="flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium font-mono border"
        style={{ background: "rgba(99, 102, 241, 0.03)", borderColor: "var(--border)", color: "var(--muted)" }}
      >
        {cert.year}
      </span>
    </motion.div>
  );
}

export default function Education() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-50px" });
  const certRef = useRef(null);
  const certInView = useInView(certRef, { once: true, margin: "-50px" });

  return (
    <section
      id="education"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 z-10"
      style={{ background: "transparent" }}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(99, 102, 241, 0.03)" }} />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(16, 185, 129, 0.03)" }} />

      <div className="relative mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span
            className="mb-3 inline-block rounded-full border px-4 py-1.5 text-sm font-medium"
            style={{ borderColor: "var(--border)", background: "rgba(16, 185, 129, 0.08)", color: "var(--accent)" }}
          >
            Background
          </span>
          <h2
            className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold"
            style={{ color: "var(--text)" }}
          >
            Education &{" "}
            <span style={{
              background: "linear-gradient(135deg, var(--accent-2), var(--accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Learning
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: "var(--muted)" }}>
            A strong academic foundation combined with continuous self-learning.
          </p>
        </motion.div>

        {/* Education card */}
        <div className="relative mb-20">
          <div
            className="absolute left-6 top-0 hidden h-full w-px sm:block"
            style={{ background: "linear-gradient(to bottom, var(--accent-2) 0%, var(--accent) 60%, transparent 100%)", opacity: 0.3 }}
          />

          <div className="sm:pl-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={cardInView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute left-[18px] top-8 hidden h-4 w-4 rounded-full sm:block border border-white/10"
              style={{ background: "var(--accent-2)", boxShadow: "0 0 14px rgba(99,102,241,0.4)" }}
            />

            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, x: -30 }}
              animate={cardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl border p-8"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--border)",
              }}
            >
              {/* Top accent */}
              <div
                className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                style={{ background: "linear-gradient(90deg, var(--accent-2), var(--accent))" }}
              />

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "rgba(99, 102, 241, 0.06)" }}
                  >
                    <GraduationCap className="h-7 w-7" style={{ color: "var(--accent-2)" }} />
                  </div>
                  <div>
                    <div
                      className="mb-1 inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-medium"
                      style={{ borderColor: "var(--border)", background: "rgba(99, 102, 241, 0.05)", color: "var(--accent-2)" }}
                    >
                      <Award className="h-3 w-3" />
                      Bachelor of Technology
                    </div>
                    <h3 className="text-xl font-bold sm:text-2xl" style={{ color: "var(--text)" }}>
                      Computer Science & Engineering
                    </h3>
                    <p className="mt-1 text-base" style={{ color: "var(--muted)" }}>
                      Silicon Institute of Technology, Bhubaneswar
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm border"
                    style={{ borderColor: "var(--border)", background: "rgba(99, 102, 241, 0.03)", color: "var(--muted)" }}
                  >
                    <Calendar className="h-4 w-4" style={{ color: "var(--accent-2)" }} />
                    2019 – 2023
                  </div>
                  <div
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold border"
                    style={{ borderColor: "var(--border)", background: "rgba(99, 102, 241, 0.06)", color: "var(--accent-2)" }}
                  >
                    <Star className="h-4 w-4 fill-[var(--accent-2)]" style={{ color: "var(--accent-2)" }} />
                    8.2 CGPA
                  </div>
                </div>
              </div>

              {/* Coursework */}
              <div className="mt-8">
                <h4 className="mb-3 text-xs font-mono uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course) => (
                    <motion.span
                      key={course}
                      className="rounded-full px-3 py-1 text-sm border cursor-default transition-all duration-200"
                      style={{
                        borderColor: "var(--border)",
                        background: "rgba(99, 102, 241, 0.03)",
                        color: "var(--text)",
                      }}
                      whileHover={{ borderColor: "var(--accent)", color: "var(--accent)", background: "rgba(16, 185, 129, 0.08)" }}
                    >
                      {course}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="mt-8">
                <h4 className="mb-3 text-xs font-mono uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                  Activities & Achievements
                </h4>
                <div className="flex flex-wrap gap-3">
                  {activities.map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium border"
                      style={{
                        borderColor: "var(--border)",
                        background: "rgba(16, 185, 129, 0.08)",
                        color: "var(--text)",
                      }}
                    >
                      <Icon className="h-4 w-4 text-[var(--accent)]" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          ref={certRef}
          initial={{ opacity: 0, y: 20 }}
          animate={certInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text)" }}>
              Certifications &{" "}
              <span style={{
                background: "linear-gradient(135deg, var(--accent-2), var(--accent))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Courses
              </span>
            </h3>
            <p className="mt-2" style={{ color: "var(--muted)" }}>Continuous learning through structured programs</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert, index) => (
              <CertCard key={cert.name} cert={cert} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
