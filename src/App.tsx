import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Achievements from './components/Achievements'
import Education from './components/Education'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (theme === 'light') {
      document.body.style.background = '#F0F5EF'
      document.body.style.color = '#0B1A0B'
    } else {
      document.body.style.background = '#0B0B0B'
      document.body.style.color = '#D4E8D4'
    }
  }, [theme])

  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Navbar theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <TechStack />
            <Achievements />
            <Education />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  )
}
