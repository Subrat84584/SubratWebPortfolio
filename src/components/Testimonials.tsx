import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  quote: string;
  initials: string;
  accent: "yellow" | "green";
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    title: "Engineering Manager",
    company: "Tech Innovations Pvt. Ltd.",
    initials: "PS",
    accent: "yellow",
    quote:
      "Subrat is an exceptionally talented mobile developer. His ability to translate complex requirements into elegant, performant applications is remarkable. He delivered our flagship app ahead of schedule with zero critical bugs at launch.",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    title: "Senior Product Manager",
    company: "Pixel Code Studios",
    initials: "RM",
    accent: "green",
    quote:
      "Working with Subrat was a pleasure. He has a rare combination of strong engineering skills and product thinking. He consistently pushed for better user experiences and his code quality is top-notch. A true asset to any team.",
  },
  {
    id: 3,
    name: "Ananya Patel",
    title: "Lead Software Engineer",
    company: "CloudBridge Tech",
    initials: "AP",
    accent: "yellow",
    quote:
      "I've mentored many junior developers and Subrat stands out. His growth trajectory is impressive — within 6 months he was independently architecting features and mentoring others. His Flutter expertise is genuinely world-class.",
  },
];

const AUTO_PLAY_INTERVAL = 5000;

// Word-by-word animated heading
function WordReveal({ children }: { children: string }) {
  const words = children.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.28em]"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: i * 0.09, duration: 0.5, ease: "easeOut" as const }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0, filter: "blur(5px)" }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, filter: "blur(5px)" }),
  };

  const t = testimonials[current];
  const isYellow    = t.accent === "yellow";
  const accentColor = isYellow ? "#F5D000" : "#39D353";
  const accentBg    = isYellow ? "rgba(245,208,0,0.10)"  : "rgba(57,211,83,0.10)";
  const accentBorder= isYellow ? "rgba(245,208,0,0.22)"  : "rgba(57,211,83,0.22)";

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ background: "#0B0B0B" }}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(245,208,0,0.04)" }} />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(57,211,83,0.04)" }} />

      <div className="relative mx-auto max-w-4xl">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span
            className="mb-3 inline-block rounded-full border px-4 py-1.5 text-sm font-medium"
            style={{ borderColor: "rgba(57,211,83,0.28)", background: "rgba(57,211,83,0.08)", color: "#39D353" }}
          >
            Social Proof
          </span>
          <h2
            className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold"
            style={{ color: "#D4E8D4", fontFamily: "Space Grotesk, sans-serif" }}
          >
            Client{" "}
            <span style={{
              background: "linear-gradient(135deg, #F5D000, #39D353)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              <WordReveal>Testimonials</WordReveal>
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: "#5A7A57" }}>
            Feedback from the people I've had the privilege of working with.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Card */}
          <div
            className="relative overflow-hidden rounded-2xl border"
            style={{
              background: "rgba(13,20,12,0.88)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(245,208,0,0.12)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            }}
          >
            {/* Top accent bar */}
            <motion.div
              className="absolute inset-x-0 top-0 h-px"
              animate={{
                background: `linear-gradient(90deg, ${accentColor}, ${isYellow ? "#39D353" : "#F5D000"})`,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Watermark quote icon */}
            <div className="absolute right-8 top-8 opacity-5 pointer-events-none">
              <Quote className="h-24 w-24" style={{ color: accentColor }} />
            </div>

            <div className="p-8 sm:p-10 lg:p-12">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={t.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeInOut" as const }}
                >
                  {/* Quote icon + Stars */}
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ background: accentBg }}
                    >
                      <Quote className="h-5 w-5" style={{ color: accentColor }} />
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4" style={{ fill: "#F5D000", color: "#F5D000" }} />
                      ))}
                    </div>
                  </div>

                  {/* Quote text */}
                  <blockquote
                    className="mb-8 text-lg leading-relaxed sm:text-xl"
                    style={{ color: "#D4E8D4" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold"
                      style={{
                        background: accentBg,
                        border: `2px solid ${accentBorder}`,
                        color: accentColor,
                        fontFamily: "Space Grotesk, sans-serif",
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: "#D4E8D4" }}>{t.name}</p>
                      <p className="text-sm mt-0.5" style={{ color: "#3A5A37" }}>
                        {t.title} &middot; {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-6">
            {/* Prev */}
            <motion.button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 focus:outline-none"
              style={{
                border: "1px solid rgba(245,208,0,0.16)",
                background: "rgba(13,20,12,0.70)",
                color: "#5A7A57",
              }}
              whileHover={{ borderColor: "rgba(245,208,0,0.40)", color: "#F5D000", scale: 1.07 }}
              whileTap={{ scale: 0.93 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((item, i) => {
                const dotColor = item.accent === "yellow" ? "#F5D000" : "#39D353";
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="h-2 rounded-full transition-all duration-300 focus:outline-none"
                    style={{
                      width: i === current ? "2rem" : "0.5rem",
                      background: i === current ? dotColor : "rgba(245,208,0,0.15)",
                    }}
                  />
                );
              })}
            </div>

            {/* Next */}
            <motion.button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 focus:outline-none"
              style={{
                border: "1px solid rgba(245,208,0,0.16)",
                background: "rgba(13,20,12,0.70)",
                color: "#5A7A57",
              }}
              whileHover={{ borderColor: "rgba(245,208,0,0.40)", color: "#F5D000", scale: 1.07 }}
              whileTap={{ scale: 0.93 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Auto-play progress bar */}
          <div
            className="mt-5 h-px w-full overflow-hidden rounded-full"
            style={{ background: "rgba(245,208,0,0.08)" }}
          >
            {!isPaused && (
              <motion.div
                key={current}
                className="h-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: "linear" }}
                style={{
                  background: `linear-gradient(90deg, ${accentColor}, ${isYellow ? "#39D353" : "#F5D000"})`,
                }}
              />
            )}
          </div>

          <p className="mt-3 text-center text-xs font-mono" style={{ color: "#2A3A28" }}>
            {current + 1} / {testimonials.length}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
