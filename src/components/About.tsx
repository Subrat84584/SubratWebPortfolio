import { motion } from "framer-motion";
import {
  Download,
  FileText,
  ExternalLink,
  ShieldCheck,
  Trophy,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const AWARDS = [
  { title: "Best Employee of the Month (Awarded 3 Times)", company: "Technovate, Kolkata", year: "2026" },
  { title: "Award for Exceptional Learner", company: "Mohs10 Technologies", year: "2024 – 2025" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center max-w-3xl mx-auto"
      >
        <span className="text-xs font-mono font-bold tracking-widest uppercase block mb-2 text-orange-600">
          [EXECUTIVE PROFILE &amp; CREDENTIALS // 04]
        </span>
        <h2 className="text-3xl sm:text-5xl font-sans tracking-tight font-extrabold text-slate-900">
          About Subrat &amp; Verified Bio
        </h2>
        <p className="mt-3 text-base text-slate-600 font-sans leading-relaxed">
          Full professional bio, industry awards, direct communication credentials, and verified official resume download center.
        </p>
      </motion.div>

      {/* Grid: Left Bio & Quick Info + Right Resume Download Hero Card */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Official Bio / Objective */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Objective Statement Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-600">
                [PROFESSIONAL OBJECTIVE &amp; BIO]
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-sans font-medium">
              Experienced mobile application developer specializing in <strong className="text-slate-950 font-bold">Flutter and Dart</strong>, with a passion for creating high-quality, cross-platform apps. Proficient in building intuitive user interfaces, integrating RESTful APIs, and implementing robust state management solutions.
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              Experienced in the full mobile development lifecycle, including analysis, design, development, testing, and deployment. Skilled in debugging and optimizing applications to ensure seamless performance and user satisfaction. Dedicated to leveraging cutting-edge technologies to deliver scalable and user-friendly mobile applications.
            </p>

            {/* Direct Contact Metadata from Resume */}
            <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone size={14} className="text-orange-600 flex-shrink-0" />
                <span>+91 9330126807</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail size={14} className="text-orange-600 flex-shrink-0" />
                <span className="truncate">subratkumaracharya1@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin size={14} className="text-orange-600 flex-shrink-0" />
                <span>Bhubaneswar, India</span>
              </div>
            </div>
          </div>

          {/* Awards & Achievements Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-xs">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400 block mb-4">
              [INDUSTRY RECOGNITION &amp; AWARDS]
            </span>
            <div className="space-y-3">
              {AWARDS.map((award, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Trophy size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{award.title}</h4>
                    <span className="text-xs font-mono text-slate-500">{award.company} • {award.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: DEDICATED RESUME DOWNLOAD SECTION */}
        <motion.div
          id="resume"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border-2 border-slate-900 bg-slate-900 text-white shadow-xl flex flex-col justify-between"
        >
          <div>
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-orange-400">
                VERIFIED CURRICULUM VITAE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-slate-300">
                LATEST 2026
              </span>
            </div>

            {/* Document Emblem & Title */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-orange-600/20 border border-orange-500/30 text-orange-400 flex items-center justify-center flex-shrink-0">
                <FileText size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Subrat Kumar Acharya
                </h3>
                <span className="font-mono text-xs text-slate-400 block mt-0.5">
                  Software Engineer (Mobile Apps)
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6">
              Official one-page resume detailing production achievements at Technovate &amp; Mohs10, technical skills matrix, MCA degree conferment, and contact credentials.
            </p>

            {/* Key Resume Highlights Checklist */}
            <div className="space-y-2 mb-8 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-orange-400" />
                <span>MCA Post-Graduate Degree (Silicon University)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-orange-400" />
                <span>Flutter, Dart, Firebase, REST APIs &amp; Java</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-orange-400" />
                <span>3+ Shipped Production Mobile Apps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-orange-400" />
                <span>3x Best Employee of the Month Awardee</span>
              </div>
            </div>
          </div>

          {/* Download & Preview Actions */}
          <div className="space-y-3 pt-5 border-t border-slate-800">
            {/* Direct Download Button */}
            <a
              href="/Subrat_Kumar_Acharya_Resume.pdf"
              download="Subrat_Kumar_Acharya_Resume.pdf"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-sm bg-white text-slate-950 hover:bg-slate-100 transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Download size={17} className="text-orange-600" />
              <span>Download Official Resume (PDF)</span>
            </a>

            {/* View in Browser Button */}
            <a
              href="/Subrat_Kumar_Acharya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-xs text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-white/5 transition-all duration-200 cursor-pointer"
            >
              <span>Preview PDF Document in Browser</span>
              <ExternalLink size={13} />
            </a>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span>Verified PDF</span>
              </span>
              <span>Size: ~120 KB</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
