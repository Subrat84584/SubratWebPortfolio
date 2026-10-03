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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<number | null>(null);

  // Reliable scroll tracking for active section underline
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black border-b border-white/10 ${
          scrolled ? 'shadow-2xl shadow-black/90' : 'shadow-lg shadow-black/50'
        }`}
      >
        {/* Generous wide container with ample breathing room to prevent congestion */}
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
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
              <span className="text-base sm:text-lg lg:text-xl font-sans font-extrabold tracking-[0.14em] uppercase text-white leading-none group-hover:text-neutral-200 transition-colors">
                BUILDWTHSUBRAT
              </span>
              <span className="text-[11px] font-sans font-medium tracking-widest text-neutral-400 mt-1 uppercase">
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
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navActiveLine"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right: Resume (PDF bracket removed) + GET STARTED Box moved right */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0">
              {/* Direct Resume Download Link (No bracket) */}
              <a
                href="/Subrat_Kumar_Acharya_Resume.pdf"
                download="Subrat_Kumar_Acharya_Resume.pdf"
                className="inline-flex items-center gap-1.5 text-xs xl:text-[13px] font-sans font-semibold tracking-[0.10em] uppercase text-neutral-400 hover:text-white transition-colors cursor-pointer outline-none focus:outline-none"
              >
                <Download size={13} className="text-neutral-400" />
                <span>Resume</span>
              </a>

              {/* Squarespace Signature High-Contrast Solid White Button */}
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
                className="px-6 py-2.5 rounded-[2px] text-xs font-sans font-bold tracking-[0.14em] uppercase bg-white text-black hover:bg-neutral-200 transition-all duration-200 cursor-pointer shadow-md outline-none focus:outline-none"
              >
                GET STARTED
              </motion.button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="p-2 rounded-md text-white bg-neutral-900 border border-white/10 hover:border-white/20 transition-colors outline-none focus:outline-none"
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
              className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-2xl border-t border-white/10 px-6 py-5"
            >
              <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="py-2.5 text-sm font-sans font-semibold tracking-wider text-neutral-300 hover:text-white uppercase border-b border-white/5"
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href="/Subrat_Kumar_Acharya_Resume.pdf"
                  download="Subrat_Kumar_Acharya_Resume.pdf"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 flex items-center justify-center gap-2 py-3 px-4 rounded text-xs font-mono font-medium tracking-wider text-neutral-300 border border-white/15 bg-neutral-900/60 uppercase"
                >
                  <Download size={14} className="text-white" />
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
                  className="mt-2 w-full py-3.5 rounded-[2px] text-xs font-sans font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-colors shadow-lg"
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
