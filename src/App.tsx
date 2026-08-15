import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackgroundParticles from './components/BackgroundParticles'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light')

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
    }
  }, [theme])

  return (
    <>
      <BackgroundParticles />
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
      <main>
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Projects />
      </main>
      <Footer />
    </>
  )
}
