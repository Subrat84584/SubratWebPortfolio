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
  Award,
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

        <h2 className="text-3xl sm:text-5xl font-sans tracking-tight font-extrabold text-neutral-900">
          About Subrat &amp; Verified Bio
        </h2>
        <p className="mt-2.5 text-sm sm:text-base text-neutral-600 font-sans leading-relaxed">
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
          <div className="slate-card p-6 sm:p-8 rounded-3xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-400">
                [PROFESSIONAL OBJECTIVE &amp; BIO]
              </span>
            </div>

            <p className="text-base sm:text-lg text-neutral-100 leading-relaxed font-sans font-medium">
              Experienced mobile application developer specializing in <strong className="text-white font-bold underline decoration-orange-500/60 underline-offset-4">Flutter and Dart</strong>, with a passion for creating high-quality, cross-platform apps. Proficient in building intuitive user interfaces, integrating RESTful APIs, and implementing robust state management solutions.
            </p>

            <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              Experienced in the full mobile development lifecycle, including analysis, design, development, testing, and deployment. Skilled in debugging and optimizing applications to ensure seamless performance and user satisfaction. Dedicated to leveraging cutting-edge technologies to deliver scalable and user-friendly mobile applications.
            </p>

            {/* Direct Contact Metadata from Resume */}
            <div className="slate-inner-box mt-6 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-neutral-200">
                <Phone size={14} className="text-orange-400 flex-shrink-0" />
                <span>+91 9330126807</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200">
                <Mail size={14} className="text-orange-400 flex-shrink-0" />
                <span className="truncate">subratkumaracharya1@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200">
                <MapPin size={14} className="text-orange-400 flex-shrink-0" />
                <span>Kolkata, WB, India</span>
              </div>
            </div>
          </div>

          {/* Awards & Achievements Card */}
          <div className="slate-card p-6 sm:p-8 rounded-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-4">
              [INDUSTRY RECOGNITION &amp; AWARDS]
            </span>
            <div className="space-y-3">
              {AWARDS.map((award, i) => (
                <div key={i} className="slate-inner-box flex items-start gap-3.5 p-4 rounded-2xl">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Trophy size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{award.title}</h4>
                    <span className="text-xs font-mono text-neutral-400 mt-0.5 block">{award.company} • {award.year}</span>
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
          className="slate-card lg:col-span-5 p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
        >
          <div>
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-orange-400">
                VERIFIED CURRICULUM VITAE
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-neutral-200 border border-white/15">
                LATEST 2026
              </span>
            </div>

            {/* Document Emblem & Title */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center flex-shrink-0">
                <FileText size={28} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Subrat Kumar Acharya
                </h3>
                <span className="font-mono text-xs text-neutral-400 block mt-0.5">
                  Software Engineer (Mobile Apps)
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans mb-6">
              Official one-page resume detailing production achievements at Technovate &amp; Mohs10, technical skills matrix, MCA degree conferment, and contact credentials.
            </p>

            {/* Key Resume Highlights Checklist */}
            <div className="slate-inner-box p-4 rounded-2xl space-y-2.5 mb-8 font-mono text-xs text-neutral-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-orange-400 flex-shrink-0" />
                <span>MCA Post-Graduate Degree (Silicon University)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-orange-400 flex-shrink-0" />
                <span>Flutter, Dart, Firebase, REST APIs &amp; Java</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-orange-400 flex-shrink-0" />
                <span>3+ Shipped Production Mobile Apps</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-orange-400 flex-shrink-0" />
                <span>3x Best Employee of the Month Awardee</span>
              </div>
            </div>
          </div>

          {/* Download & Preview Actions */}
          <div className="space-y-3 pt-5 border-t border-white/10">
            {/* Direct Download Button */}
            <a
              href="/Subrat_Kumar_Acharya_Resume.pdf"
              download="Subrat_Kumar_Acharya_Resume.pdf"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-sm bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Download size={17} className="text-orange-600" />
              <span>Download Official Resume (PDF)</span>
            </a>

            {/* View in Browser Button */}
            <a
              href="/Subrat_Kumar_Acharya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-xs text-neutral-200 hover:text-white border border-white/15 hover:border-white/30 bg-white/5 transition-all duration-200 cursor-pointer"
            >
              <span>Preview PDF Document in Browser</span>
              <ExternalLink size={13} />
            </a>

            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-400" />
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
