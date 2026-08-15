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
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects',   href: '#projects',   id: 'projects' },
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

  const navBg = scrolled ? 'var(--card-bg)' : 'transparent';
  const borderColor = scrolled ? 'var(--border)' : 'transparent';

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
          boxShadow: scrolled ? '0 4px 20px var(--border)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 select-none"
              aria-label="Go to top"
            >
              <span
                className="text-3xl sm:text-4xl font-bold tracking-normal italic"
                style={{
                  fontFamily: "'Dancing Script', 'Caveat', cursive",
                  color: 'var(--accent)',
                }}
              >
                subrat05
              </span>
            </motion.a>

            {/* Right Group: Navigation links & controls */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-6" aria-label="Main navigation">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="relative text-base font-semibold transition-colors duration-200"
                      style={{ color: isActive ? 'var(--text)' : 'var(--muted-dark)' }}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full"
                          style={{ background: 'var(--text)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  );
                })}
              </nav>

              <motion.a
                href="#projects"
                onClick={(e) => handleNavClick(e, '#projects')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{
                  background: 'rgba(241, 245, 249, 0.9)',
                  color: '#1E293B',
                  border: '1px solid rgba(203, 213, 225, 0.6)',
                }}
              >
                Let's talk !
              </motion.a>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-full transition-colors duration-200 flex items-center justify-center"
                  style={{ color: 'var(--text)', background: 'transparent' }}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button
                  onClick={() => setMobileOpen((prev) => !prev)}
                  className="p-2.5 rounded-full flex items-center justify-center"
                  style={{ color: '#1E293B', background: '#E2E8F0' }}
                  aria-label="Toggle menu"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full"
                style={{ color: 'var(--text)' }}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="p-2.5 rounded-full flex items-center justify-center"
                style={{ color: '#1E293B', background: '#E2E8F0' }}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
                backgroundColor: 'var(--card-bg)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderTop: '1px solid var(--border)',
              }}
            >
              <nav className="flex flex-col px-6 py-4 gap-2" aria-label="Mobile navigation">
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
                      className="px-4 py-3 rounded-lg text-base font-semibold transition-colors duration-150"
                      style={{
                        color: isActive ? 'var(--accent)' : 'var(--text)',
                        backgroundColor: isActive ? 'rgba(249, 115, 22, 0.08)' : 'transparent',
                      }}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}

                <motion.a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, '#projects')}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.25 }}
                  className="mt-2 px-4 py-3 rounded-lg text-sm font-semibold text-center"
                  style={{ background: '#E2E8F0', color: '#1E293B' }}
                >
                  Let's talk !
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
