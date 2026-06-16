import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Link2, Globe, Mail, ArrowUp, Heart } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/subrat-acharya",
    icon: GitBranch,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/subrat-acharya",
    icon: Link2,
  },
  {
    label: "Globe",
    href: "https://twitter.com/subrat_acharya",
    icon: Globe,
  },
  {
    label: "Email",
    href: "mailto:subrat.acharya@gmail.com",
    icon: Mail,
  },
];

const techStack = [
  "Flutter",
  "Dart",
  "React",
  "TypeScript",
  "Firebase",
  "Node.js",
  "AWS",
  "Kotlin",
  "Swift",
  "Git",
];

function smoothScrollTo(target: string) {
  const el = document.querySelector(target);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else if (target === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "rgba(10,10,15,0.98)" }}
    >
      {/* Gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60" />

      {/* Subtle glass background */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top section: Logo + tagline */}
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-extrabold text-white shadow-lg shadow-blue-500/30">
            SKA
          </div>
          <p className="text-base text-gray-400 italic">
            Building the future, one app at a time.
          </p>
        </div>

        {/* Grid: Quick Links | Social Links | Tech Stack */}
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => smoothScrollTo(href)}
                    className="text-gray-400 transition-colors duration-200 hover:text-white focus:outline-none"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Connect
            </h4>
            <ul className="space-y-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400 transition-colors duration-200 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="flex flex-wrap items-center justify-center gap-1 text-sm text-gray-500 sm:justify-start">
            <span>© 2024 Subrat K. Acharya.</span>
            <span className="mx-1">Crafted with</span>
            <Heart className="inline h-4 w-4 fill-red-500 text-red-500" />
            <span>using React &amp; Framer Motion</span>
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>All rights reserved</span>
          </div>
        </div>
      </div>

      {/* Back to Top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={handleBackToTop}
            className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/40 transition-transform duration-200 hover:scale-110 focus:outline-none"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
