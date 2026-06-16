import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Star,
  Award,
  Code2,
  Trophy,
  Users,
} from "lucide-react";

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
  { label: "Technical Club Lead", icon: Users },
  { label: "Hackathon Winner (2x)", icon: Trophy },
  { label: "Open Source Club Founder", icon: Code2 },
];

interface Certification {
  name: string;
  issuer: string;
  year: string;
  initials: string;
  color: string;
}

const certifications: Certification[] = [
  {
    name: "Associate Android Developer",
    issuer: "Google",
    year: "2022",
    initials: "G",
    color: "from-blue-500 to-green-500",
  },
  {
    name: "Flutter & Dart – The Complete Guide",
    issuer: "Udemy",
    year: "2022",
    initials: "U",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Firebase in a Weekend: Android",
    issuer: "Google",
    year: "2021",
    initials: "G",
    color: "from-orange-500 to-yellow-500",
  },
  {
    name: "iOS & Swift – Complete iOS App Development",
    issuer: "Udemy",
    year: "2023",
    initials: "U",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon",
    year: "2023",
    initials: "A",
    color: "from-orange-400 to-amber-500",
  },
];

function CertCard({
  cert,
  index,
}: {
  cert: Certification;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/8"
    >
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cert.color} text-lg font-bold text-white shadow-lg`}
      >
        {cert.initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate font-semibold text-white">{cert.name}</p>
        <p className="text-sm text-gray-400">{cert.issuer}</p>
      </div>
      <span className="flex-shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
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
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ background: "#0a0a0f" }}
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400">
            Background
          </span>
          <h2 className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
            Education &{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Learning
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            A strong academic foundation combined with continuous self-learning.
          </p>
        </motion.div>

        {/* Education card with timeline dot */}
        <div className="relative mb-20">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-indigo-500/60 via-purple-500/40 to-transparent sm:block" />

          <div className="sm:pl-16">
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={cardInView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute left-[18px] top-8 hidden h-4 w-4 rounded-full border-2 border-indigo-400 bg-indigo-500 shadow-lg shadow-indigo-500/50 sm:block"
            />

            {/* Main card */}
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, x: -30 }}
              animate={cardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.05) 100%)",
                boxShadow:
                  "0 0 0 1px rgba(99,102,241,0.2), 0 20px 40px rgba(0,0,0,0.4)",
              }}
            >
              {/* Gradient border top line */}
              <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                    <GraduationCap className="h-7 w-7 text-indigo-400" />
                  </div>
                  <div>
                    <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-0.5 text-xs font-medium text-indigo-300">
                      <Award className="h-3 w-3" />
                      Bachelor of Technology
                    </div>
                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                      Computer Science & Engineering
                    </h3>
                    <p className="mt-1 text-base text-gray-300">
                      Silicon Institute of Technology, Bhubaneswar
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 text-right">
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300">
                    <Calendar className="h-4 w-4 text-indigo-400" />
                    2019 – 2023
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-sm font-semibold text-yellow-300">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    8.2 CGPA
                  </div>
                </div>
              </div>

              {/* Coursework */}
              <div className="mt-8">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course) => (
                    <span
                      key={course}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300 transition-colors duration-200 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="mt-8">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Activities & Achievements
                </h4>
                <div className="flex flex-wrap gap-3">
                  {activities.map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Certifications section */}
        <motion.div
          ref={certRef}
          initial={{ opacity: 0, y: 20 }}
          animate={certInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Certifications &{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Courses
              </span>
            </h3>
            <p className="mt-2 text-gray-400">
              Continuous learning through structured programs
            </p>
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
