import { motion } from "framer-motion";
import { Sparkles, Video, Compass, Heart, BookOpen } from "lucide-react";

interface EducationItem {
  degree: string;
  period: string;
  institution: string;
  field: string;
}

const EDUCATION: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    period: "NOV 2022 - NOV 2024",
    institution: "Silicon Institute of Technology (SIT), Bhubaneswar",
    field: "Computer Software Engineering",
  },
  {
    degree: "Bachelor's Degree in Computer Science (B.Sc)",
    period: "JULY 2019 - JULY 2022",
    institution: "Utkal University, Odisha, India",
    field: "Computer Science",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <span className="text-xs font-mono font-bold tracking-widest uppercase block mb-2" style={{ color: "var(--accent)" }}>
          ABOUT ME
        </span>
        <h2 className="text-3xl sm:text-5xl font-sans tracking-tight text-slate-800 dark:text-slate-100">
          Crafting Code &amp; <span className="font-bold">Embracing the Journey</span>
        </h2>
      </motion.div>

      {/* Main Bio Content */}
      <div className="grid lg:grid-cols-12 gap-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 space-y-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
        >
          <p>
            I’m a <strong>Mobile App Developer</strong> who loves turning real-world problems into simple, meaningful software solutions. My journey in technology started with curiosity — understanding how an idea can be transformed into something people can actually use in their everyday lives.
          </p>
          <p>
            Today, I work across both <strong>Android and iOS</strong>, building cross-platform applications with <strong>Flutter, Dart, Firebase, and modern REST APIs</strong>. What I enjoy most isn’t just writing code — it’s understanding a business problem, finding the right solution, and watching that solution evolve into a seamless product.
          </p>
          <p>
            I hold a <strong>Master of Computer Applications (MCA)</strong> from <strong>SIT Bhubaneswar</strong>, and have developed expertise in end-to-end mobile architecture, payment solutions (Razorpay, RevenueCat, In-App Purchases), and production deployment on the Google Play Console.
          </p>
        </motion.div>

        {/* Philosophy Card & Personal Touch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm"
        >
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-mono font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
              <Sparkles className="w-4 h-4" />
              <span>Core Philosophy</span>
            </div>
            <blockquote className="text-lg sm:text-xl font-medium italic text-slate-800 dark:text-slate-100 border-l-4 pl-4 mb-6" style={{ borderColor: "var(--accent)" }}>
              &ldquo;Code is what I build. Curiosity is what drives me. People and experiences are what inspire me.&rdquo;
            </blockquote>
          </div>

          {/* Beyond the Screen Badges */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 block mb-3">
              BEYOND THE SCREEN
            </span>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                <Video className="w-3.5 h-3.5 text-red-500" /> Vlogger &amp; Creator
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                <Compass className="w-3.5 h-3.5 text-blue-500" /> Travel &amp; Exploring
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                <Heart className="w-3.5 h-3.5 text-pink-500" /> Dancing &amp; Expressing
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" /> Mindset &amp; Reading
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Education Timeline Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-slate-100">
          Education &amp; Background
        </h3>

        <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-6 sm:pl-8 space-y-10">
          {EDUCATION.map((item, index) => (
            <div key={index} className="relative">
              {/* Dot indicator */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full"
                style={{ background: "var(--accent)" }}
              />

              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {item.degree}
              </h4>
              <span className="text-xs font-mono font-bold block mt-0.5 mb-2" style={{ color: "var(--accent)" }}>
                {item.period}
              </span>
              <p className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200 mb-1">
                {item.institution}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.field}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
