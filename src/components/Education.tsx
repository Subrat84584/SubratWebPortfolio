import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Maximize2,
  X,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import stageCertImg from "../assets/convocation-stage-cert.jpg";
import familyOutdoorImg from "../assets/convocation-family-outdoor.jpg";
import familyIndoorImg from "../assets/convocation-family-indoor.jpg";

interface EducationItem {
  degree: string;
  period: string;
  institution: string;
  field: string;
  highlight?: string;
  isLatest?: boolean;
}

const EDUCATION: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    period: "2022 – 2024",
    institution: "Silicon University (SIT), Bhubaneswar",
    field: "Computer Software Engineering",
    highlight: "Conferred at Convocation 2024 — Advanced Mobile Computing & Software Architecture",
    isLatest: true,
  },
  {
    degree: "Bachelor of Computer Science (B.Sc)",
    period: "2019 – 2022",
    institution: "Utkal University, Bhubaneswar, India",
    field: "Computer Science",
    highlight: "Core Computing Foundations, Data Structures & Algorithms",
    isLatest: false,
  },
];

const CERTIFICATIONS = [
  { title: "Flutter & Dart Specialist", issuer: "Udemy", location: "Online / Credential" },
  { title: "C++, DSA & IoT Architecture", issuer: "iNeuron", location: "Online" },
  { title: "Cyber Security and Privacy", issuer: "IIT Madras", location: "Premier Institute" },
];

const GALLERY_PHOTOS = [
  {
    id: "stage-cert",
    title: "Stage Degree Conferment",
    caption: "Receiving Master of Computer Applications (MCA) Degree certificate on stage under the Convocation 2024 banner.",
    src: stageCertImg,
    badge: "Official Ceremony",
  },
  {
    id: "family-outdoor",
    title: "Convocation Celebration with Parents",
    caption: "Celebrating academic milestone with parents at Silicon University Convocation 2024.",
    src: familyOutdoorImg,
    badge: "Milestone Celebration",
  },
  {
    id: "family-indoor",
    title: "Convocation Hall Portrait",
    caption: "Family graduation portrait at Silicon Tech / Silicon University ceremony.",
    src: familyIndoorImg,
    badge: "Family Milestone",
  },
];

export default function Education() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof GALLERY_PHOTOS)[0] | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    if (selectedPhoto) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedPhoto]);

  return (
    <section id="education" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center max-w-3xl mx-auto"
      >

        <h2 className="text-3xl sm:text-5xl font-sans tracking-tight font-extrabold text-neutral-900">
          Education &amp; Professional Certifications
        </h2>
        <p className="mt-2.5 text-sm sm:text-base text-neutral-600 font-sans leading-relaxed">
          Master of Computer Applications from Silicon University, Bachelor of Computer Science from Utkal University, and official convocation milestone gallery.
        </p>
      </motion.div>

      {/* Academic Foundation & Degrees */}
      <div className="mb-16">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Degree Timeline Cards */}
          <div className="space-y-5 flex flex-col justify-between">
            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="slate-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-white/10 text-neutral-200 border border-white/15">
                      {edu.period}
                    </span>
                    {edu.isLatest && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>CONVOCATION 2024</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-start gap-3.5 mt-2">
                    <div className="w-11 h-11 rounded-2xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <GraduationCap size={22} />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {edu.degree}
                      </h4>
                      <p className="text-sm font-semibold text-neutral-300 mt-0.5">
                        {edu.institution}
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5 font-mono">
                        {edu.field}
                      </p>
                    </div>
                  </div>
                </div>
                {edu.highlight && (
                  <div className="slate-inner-box mt-4 p-3.5 rounded-2xl flex items-start gap-2">
                    <span className="font-mono text-xs font-bold text-orange-400 flex-shrink-0 mt-0.5">—</span>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      {edu.highlight}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Professional Certifications List */}
          <div className="slate-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
                  TECHNICAL CERTIFICATIONS
                </span>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/15">
                  Verified
                </span>
              </div>
              <div className="space-y-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="slate-inner-box p-3.5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center flex-shrink-0">
                        <Award size={18} />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white">{cert.title}</h5>
                        <span className="text-xs font-mono text-neutral-400">{cert.issuer} • {cert.location}</span>
                      </div>
                    </div>
                    <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Silicon University &amp; IIT Madras Accredited</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} className="text-emerald-400" />
                Verified Credentials
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CONVOCATION 2024 PHOTO GALLERY */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200 mb-8">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
              CONVOCATION 2024 MILESTONE ARCHIVE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Silicon University Ceremony Moments
            </h3>
          </div>
          <span className="font-mono text-xs text-neutral-500">
            Click any photo to view in high-resolution
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="slate-card group rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[16/11] overflow-hidden bg-neutral-950">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                  <Maximize2 size={14} />
                </div>

                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-neutral-950">
                  {photo.badge}
                </span>
              </div>

              {/* Photo Info */}
              <div className="p-5">
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                  {photo.title}
                </h4>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed font-sans">
                  {photo.caption}
                </p>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Silicon University 2024</span>
                  <span className="text-orange-400 font-semibold group-hover:underline">
                    View Fullscreen →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal for Convocation Photos */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl text-left"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="relative bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full max-h-[75vh] object-contain"
                />
              </div>

              <div className="p-5 sm:p-6 bg-slate-900 border-t border-slate-800">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-600 text-white">
                    {selectedPhoto.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Silicon University, Convocation 2024
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {selectedPhoto.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
