import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Link2, Mail, ArrowUp } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Technical Stack", href: "#tech-stack" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/subrat-k-acharya-a29681188/",
    icon: Link2,
  },
  {
    label: "subratkumaracharya1@gmail.com",
    href: "mailto:subratkumaracharya1@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub Profile",
    href: "https://github.com/Subrat84584",
    icon: GitBranch,
  },
];

const techStack = [
  "Flutter",
  "Dart",
  "Firebase",
  "Spring Boot",
  "REST APIs",
  "Razorpay",
  "RevenueCat",
  "Android & iOS",
  "Google Play Console",
  "React.js",
  "TypeScript",
  "Postman",
];

function smoothScrollTo(target: string) {
  const el = document.querySelector(target);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else if (target === "#hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative border-t border-white/10 bg-black text-white z-10">
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-12 lg:px-20">
        {/* Brand and Editorial Tagline */}
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <span className="text-2xl font-sans font-extrabold tracking-tight text-white">
            Buildwth<span style={{ color: 'var(--accent)' }}>Subrat</span>
          </span>
          <p className="font-serif italic text-base text-neutral-400">
            &ldquo;Building purposeful mobile applications with architectural precision.&rdquo;
          </p>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Quick Links */}
          <div>
            <span className="mb-4 block text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
              [INDEX // SECTIONS]
            </span>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => smoothScrollTo(href)}
                    className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-150 cursor-pointer focus:outline-none"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <span className="mb-4 block text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
              [NETWORK // CHANNELS]
            </span>
            <ul className="space-y-2.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-orange-400 transition-colors duration-150"
                  >
                    <Icon className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <span className="truncate">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Keywords */}
          <div>
            <span className="mb-4 block text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
              [INDEX // EXPERTISE]
            </span>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md px-2.5 py-1 text-xs font-mono font-medium border border-white/10 bg-white/5 text-neutral-300 hover:border-orange-500/40 hover:text-white transition-all duration-150 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Editorial Colophon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-neutral-400">
          <p className="flex flex-wrap items-center justify-center gap-1.5 font-sans text-neutral-300">
            <span>© 2026 Developed by Subrat Kumar Acharya</span>
            <span className="text-neutral-600">•</span>
            <a
              href="mailto:subratkumaracharya1@gmail.com"
              className="text-orange-400 hover:text-orange-300 transition-colors underline decoration-orange-500/40 underline-offset-2"
            >
              subratkumaracharya1@gmail.com
            </a>
          </p>

          <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500">
            <span>KOLKATA, WB, INDIA</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-7 right-7 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-md border border-slate-800 transition-transform hover:-translate-y-0.5 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
