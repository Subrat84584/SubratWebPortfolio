import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Link2, Globe, Mail, ArrowUp, Heart } from "lucide-react";

const quickLinks = [
  { label: "Home",     href: "#hero" },
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

const socialLinks = [
  { label: "GitHub",   href: "https://github.com/subrat-acharya",          icon: GitBranch },
  { label: "LinkedIn", href: "https://linkedin.com/in/subrat-acharya",     icon: Link2 },
  { label: "Twitter",  href: "https://twitter.com/subrat_acharya",         icon: Globe },
  { label: "Email",    href: "mailto:subrat.acharya@gmail.com",            icon: Mail },
];

const techStack = [
  "Flutter", "Dart", "React", "TypeScript",
  "Firebase", "Node.js", "AWS", "Kotlin", "Swift", "Git",
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
    <footer
      className="relative overflow-hidden z-10"
      style={{ background: "var(--card-bg)", backdropFilter: "blur(20px)" }}
    >
      {/* Top gradient bar */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, var(--accent-2), var(--accent), var(--accent-2))" }}
      />

      {/* Subtle glass */}
      <div className="absolute inset-0" style={{ background: "rgba(99, 102, 241, 0.01)" }} />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Logo + tagline */}
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-extrabold select-none text-white border border-white/10"
            style={{
              background: "linear-gradient(135deg, var(--accent-2), var(--accent))",
              boxShadow: "0 4px 14px rgba(16, 185, 129, 0.15)",
            }}
          >
            SKA
          </div>
          <p className="text-base italic" style={{ color: "var(--muted)" }}>
            Building the future, one app at a time.
          </p>
        </div>

        {/* Grid: Quick Links | Connect | Tech Stack */}
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-mono uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => smoothScrollTo(href)}
                    className="text-sm transition-colors duration-200 focus:outline-none"
                    style={{ color: "var(--muted)" }}
                    onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.color = "var(--text)")}
                    onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.color = "var(--muted)")}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-4 text-xs font-mono uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Connect
            </h4>
            <ul className="space-y-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: "var(--muted)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent-2)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; }}
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
            <h4 className="mb-4 text-xs font-mono uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <motion.span
                  key={tech}
                  className="rounded-full px-3 py-1 text-xs border cursor-default transition-all duration-200"
                  style={{
                    borderColor: "var(--border)",
                    background: "rgba(99, 102, 241, 0.03)",
                    color: "var(--text)",
                  }}
                  whileHover={{
                    borderColor: "var(--accent)",
                    background: "rgba(16, 185, 129, 0.08)",
                    color: "var(--accent)",
                    scale: 1.05,
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="flex flex-wrap items-center justify-center gap-1 text-sm sm:justify-start"
            style={{ color: "var(--muted)" }}
          >
            <span>© 2026 Subrat K. Acharya.</span>
            <span className="mx-1">Crafted with</span>
            <Heart className="inline h-4 w-4 fill-[var(--accent-2)]" style={{ color: "var(--accent-2)" }} />
            <span>using React &amp; Framer Motion</span>
          </p>

          <div className="flex items-center gap-4 text-xs font-mono" style={{ color: "var(--muted)" }}>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none text-white border border-white/10"
            style={{
              background: "var(--accent)",
              boxShadow: "0 4px 14px rgba(16, 185, 129, 0.25)",
            }}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
