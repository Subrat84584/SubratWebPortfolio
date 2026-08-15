import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function useTypewriter(text: string, speed = 100) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}

export default function Hero() {
  const typewriterText = useTypewriter("Hallo Welt !", 120);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-12 pt-28 pb-16 overflow-hidden z-10"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Top Tag: < Hallo Welt ! |/> */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1 text-xl sm:text-2xl font-mono font-semibold"
        >
          <span style={{ color: "var(--accent)" }}>&lt;</span>
          <span style={{ color: "var(--text)" }}>{typewriterText}</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2.5 h-6 mx-0.5"
            style={{ background: "var(--accent)" }}
          />
          <span style={{ color: "var(--accent)" }}>/&gt;</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-sans tracking-tight leading-[1.15]"
          style={{ color: "#334155" }}
        >
          I'm Subrat, <span className="font-extrabold" style={{ color: "#1E293B" }}>Android &amp; iOS</span>{" "}
          <br className="hidden sm:inline" />
          <span className="font-extrabold" style={{ color: "#1E293B" }}>Flutter &amp; Dart Developer.</span>
        </motion.h1>

        {/* Badge & Intro Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl text-left sm:text-center leading-relaxed text-base sm:text-lg text-slate-600 dark:text-slate-300"
        >
          <span
            className="inline-block px-3.5 py-1.5 mb-2 sm:mb-0 sm:mr-2 rounded-lg font-bold text-white text-sm shadow-sm"
            style={{ background: "var(--accent)" }}
          >
            Welcome to my portfolio!
          </span>{" "}
          <span>
            I'm a Mobile App Developer passionate about turning real-world problems into simple, meaningful software solutions. Crafting seamless cross-platform experiences with Flutter, Firebase, and modern APIs.
          </span>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-16 sm:mt-24 flex items-center justify-center gap-2 font-mono text-sm font-semibold cursor-pointer"
        style={{ color: "var(--accent)" }}
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-lg">⇅</span>
        <span>Keep Scrolling</span>
      </motion.div>
    </section>
  );
}
