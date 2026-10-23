import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Bio', href: '#about', id: 'about' },
  { label: 'Skills', href: '#tech-stack', id: 'tech-stack' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

interface NavbarProps {
  onOpenGetStarted?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isAtExperience, setIsAtExperience] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<number | null>(null);

  // Reliable scroll tracking for active section underline & experience section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      // Track whether scroll position has reached the Experience section
      const expEl = document.getElementById('experience');
      if (expEl) {
        const rect = expEl.getBoundingClientRect();
        // Transition to black navbar as soon as Experience section reaches navbar view
        setIsAtExperience(rect.top <= 90);
      } else {
        // Fallback: estimate based on scroll height
        setIsAtExperience(scrollY > 1200);
      }

      // If user recently clicked a nav item, don't let scroll spy overwrite it during smooth scroll
      if (isClickScrollingRef.current) return;

      // When near the top (Hero section), no nav item should have the underline
      const heroThreshold = 380;
      if (scrollY < heroThreshold) {
        setActiveSection('');
        return;
      }

      // If scrolled to the bottom of the page, activate Contact
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollY + windowHeight >= documentHeight - 80) {
        setActiveSection('contact');
        return;
      }

      // Check which section is in view
      const ids = NAV_LINKS.map((l) => l.id);
      let currentSection = '';

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // When section top is near the top of the viewport (under navbar)
          if (rect.top <= 200 && rect.bottom >= 150) {
            currentSection = id;
            break;
          }
        }
      }

      // Fallback: find the highest section that has passed above 250px
      if (!currentSection) {
        for (let i = ids.length - 1; i >= 0; i--) {
          const el = document.getElementById(ids[i]);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 250) {
              currentSection = ids[i];
              break;
            }
          }
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    
    // Immediately set activeSection so underline transitions smoothly on click
    setActiveSection(id);
    if (id === 'experience' || id === 'education' || id === 'about' || id === 'tech-stack' || id === 'contact') {
      setIsAtExperience(true);
    } else if (id === 'hero' || id === 'projects') {
      setIsAtExperience(false);
    }

    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = window.setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 900);

    const el = document.getElementById(id);
    if (el) {
      // 80px offset for the fixed navbar
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isAtExperience
            ? 'bg-black border-b border-white/10 shadow-2xl shadow-black/90'
            : scrolled
            ? 'bg-[#FAF9F7]/95 backdrop-blur-md border-b-0 border-transparent shadow-none'
            : 'bg-transparent border-b-0 border-transparent shadow-none'
        }`}
      >
        {/* Aligned container matching the below flagship projects section */}
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Brand Logo (Moved left, with "Mobile Apps Eng") */}
            <motion.a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              whileHover={{ opacity: 0.88 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 flex flex-col text-left select-none cursor-pointer group outline-none focus:outline-none"
              aria-label="BuildwthSubrat - Home"
            >
              <span className={`text-base sm:text-lg lg:text-xl font-sans font-extrabold tracking-[0.14em] uppercase leading-none transition-colors duration-300 ${
                isAtExperience ? 'text-white group-hover:text-neutral-200' : 'text-neutral-900 group-hover:text-neutral-700'
              }`}>
                BUILDWTHSUBRAT
              </span>
              <span className={`text-[11px] font-sans font-medium tracking-widest mt-1 uppercase transition-colors duration-300 ${
                isAtExperience ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                Mobile Apps Eng
              </span>
            </motion.a>

            {/* Center: Navigation Links in exact order (Projects, Experience, Education, Bio, Skills, Contact) */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative py-1 text-xs xl:text-[13px] font-sans font-semibold tracking-[0.10em] uppercase transition-colors duration-200 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
                      isAtExperience
                        ? isActive
                          ? 'text-white'
                          : 'text-neutral-400 hover:text-white'
                        : isActive
                        ? 'text-neutral-900'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navActiveLine"
                        className={`absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full ${
                          isAtExperience ? 'bg-white' : 'bg-neutral-900'
                        }`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right: Resume + GET STARTED Box */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0">
              {/* Direct Resume Download Link */}
              <a
                href="/Subrat_Kumar_Acharya_Resume.pdf"
                download="Subrat_Kumar_Acharya_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs xl:text-[13px] font-sans font-semibold tracking-[0.10em] uppercase transition-colors duration-200 cursor-pointer outline-none focus:outline-none ${
                  isAtExperience ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Download size={13} className={isAtExperience ? 'text-neutral-400' : 'text-neutral-600'} />
                <span>Resume</span>
              </a>

              {/* High-Contrast Action Button: Dark on light canvas, White on dark canvas */}
              <motion.button
                type="button"
                onClick={(e) => {
                  if (onOpenGetStarted) {
                    e.preventDefault();
                    onOpenGetStarted();
                  } else {
                    handleNavClick(e as any, '#contact');
                  }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2.5 rounded-[2px] text-xs font-sans font-bold tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer shadow-md outline-none focus:outline-none ${
                  isAtExperience
                    ? 'bg-white text-black hover:bg-neutral-200'
                    : 'bg-neutral-950 text-white hover:bg-neutral-800'
                }`}
              >
                GET STARTED
              </motion.button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className={`p-2 rounded-md transition-colors outline-none focus:outline-none ${
                  isAtExperience
                    ? 'text-white bg-neutral-900 border border-white/10 hover:border-white/20'
                    : 'text-neutral-900 bg-neutral-200/80 border border-neutral-300 hover:bg-neutral-300'
                }`}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className={`lg:hidden overflow-hidden backdrop-blur-2xl border-t px-6 py-5 transition-colors duration-200 ${
                isAtExperience
                  ? 'bg-black/95 border-white/10'
                  : 'bg-[#FAF9F7]/98 border-neutral-300'
              }`}
            >
              <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`py-2.5 text-sm font-sans font-semibold tracking-wider uppercase border-b transition-colors ${
                      isAtExperience
                        ? 'text-neutral-300 hover:text-white border-white/5'
                        : 'text-neutral-800 hover:text-black border-neutral-200'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href="/Subrat_Kumar_Acharya_Resume.pdf"
                  download="Subrat_Kumar_Acharya_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className={`mt-3 flex items-center justify-center gap-2 py-3 px-4 rounded text-xs font-mono font-medium tracking-wider uppercase transition-colors ${
                    isAtExperience
                      ? 'text-neutral-300 border border-white/15 bg-neutral-900/60'
                      : 'text-neutral-800 border border-neutral-300 bg-neutral-200/60'
                  }`}
                >
                  <Download size={14} className={isAtExperience ? 'text-white' : 'text-neutral-800'} />
                  <span>Resume</span>
                </a>

                <button
                  type="button"
                  onClick={(e) => {
                    setMobileOpen(false);
                    if (onOpenGetStarted) {
                      e.preventDefault();
                      onOpenGetStarted();
                    } else {
                      handleNavClick(e as any, '#contact');
                    }
                  }}
                  className={`mt-2 w-full py-3.5 rounded-[2px] text-xs font-sans font-bold tracking-widest uppercase transition-colors shadow-lg ${
                    isAtExperience
                      ? 'bg-white text-black hover:bg-neutral-200'
                      : 'bg-neutral-950 text-white hover:bg-neutral-800'
                  }`}
                >
                  GET STARTED
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
