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
  { label: 'Home',       href: '#hero',       id: 'hero' },
  { label: 'About',      href: '#about',      id: 'about' },
  { label: 'Skills',     href: '#skills',     id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects',   href: '#projects',   id: 'projects' },
  { label: 'Contact',    href: '#contact',    id: 'contact' },
];

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observers: IntersectionObserver[] = [];
    const opts: IntersectionObserverInit = {
      root: null,
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    };
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(id); });
      }, opts);
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const navBg = scrolled ? 'rgba(11, 11, 11, 0.88)' : 'transparent';
  const borderColor = scrolled ? 'rgba(245, 208, 0, 0.12)' : 'transparent';

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
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          boxShadow: scrolled ? '0 1px 30px rgba(245, 208, 0, 0.05)' : 'none',
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
                  fontFamily: 'Space Grotesk, sans-serif',
                  background: 'linear-gradient(135deg, #F5D000 0%, #39D353 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                SKA
              </span>
            </motion.a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                    style={{ color: isActive ? '#F5D000' : 'rgba(212,232,212,0.55)' }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #F5D000, #39D353)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right controls */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full transition-colors duration-200"
                style={{
                  color: 'rgba(212,232,212,0.6)',
                  backgroundColor: 'rgba(245,208,0,0.06)',
                }}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </motion.button>

              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: '#F5D000',
                  color: '#0B0B0B',
                  boxShadow: '0 2px 16px rgba(245, 208, 0, 0.30)',
                }}
              >
                Hire Me
              </motion.a>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full"
                style={{ color: 'rgba(212,232,212,0.6)' }}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="p-2 rounded-md"
                style={{ color: 'rgba(212,232,212,0.6)' }}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
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
                backgroundColor: 'rgba(11,11,11,0.97)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(245,208,0,0.10)',
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
                        color: isActive ? '#F5D000' : 'rgba(212,232,212,0.65)',
                        backgroundColor: isActive ? 'rgba(245,208,0,0.07)' : 'transparent',
                        borderLeft: isActive ? '2px solid #F5D000' : '2px solid transparent',
                      }}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}

                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.25 }}
                  className="mt-2 px-4 py-3 rounded-lg text-sm font-semibold text-center"
                  style={{ background: '#F5D000', color: '#0B0B0B' }}
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
