import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

interface NavLink {
  label: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#hero', id: 'hero' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      }, observerOptions);

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    []
  );

  const isDark = theme === 'dark';

  const navBg = scrolled
    ? isDark
      ? 'rgba(10, 10, 15, 0.85)'
      : 'rgba(255, 255, 255, 0.85)'
    : 'transparent';

  const borderColor = scrolled
    ? isDark
      ? 'rgba(139, 92, 246, 0.2)'
      : 'rgba(14, 165, 233, 0.2)'
    : 'transparent';

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: navBg,
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: `1px solid ${borderColor}`,
          transition:
            'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
          boxShadow: scrolled
            ? `0 1px 30px rgba(139, 92, 246, 0.08)`
            : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex-shrink-0 select-none"
              aria-label="Go to top"
            >
              <span
                className="text-2xl font-bold tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'Georgia, serif',
                }}
              >
                SKA
              </span>
            </motion.a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                    style={{
                      color: isActive
                        ? '#0ea5e9'
                        : isDark
                        ? 'rgba(255,255,255,0.7)'
                        : 'rgba(0,0,0,0.65)',
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #0ea5e9, #8b5cf6)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Controls */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full transition-colors duration-200"
                style={{
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)',
                  backgroundColor: isDark
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(0,0,0,0.05)',
                }}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              {/* Hire Me CTA */}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)',
                  boxShadow: '0 2px 16px rgba(139, 92, 246, 0.35)',
                }}
              >
                Hire Me
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <div className="flex md:hidden items-center gap-2">
              {/* Theme Toggle (mobile) */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full"
                style={{
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)',
                }}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="p-2 rounded-md"
                style={{
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)',
                }}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' as const }}
              style={{
                overflow: 'hidden',
                backgroundColor: isDark ? 'rgba(10,10,15,0.97)' : 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderTop: `1px solid ${
                  isDark ? 'rgba(139,92,246,0.15)' : 'rgba(14,165,233,0.15)'
                }`,
              }}
            >
              <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, index) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.25 }}
                      className="px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150"
                      style={{
                        color: isActive
                          ? '#0ea5e9'
                          : isDark
                          ? 'rgba(255,255,255,0.75)'
                          : 'rgba(0,0,0,0.65)',
                        backgroundColor: isActive
                          ? isDark
                            ? 'rgba(14,165,233,0.08)'
                            : 'rgba(14,165,233,0.06)'
                          : 'transparent',
                        borderLeft: isActive
                          ? '2px solid #0ea5e9'
                          : '2px solid transparent',
                      }}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}

                {/* Hire Me (mobile) */}
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.25 }}
                  className="mt-2 mx-0 px-4 py-3 rounded-lg text-sm font-semibold text-white text-center"
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)',
                    boxShadow: '0 2px 16px rgba(139, 92, 246, 0.35)',
                  }}
                >
                  Hire Me
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
