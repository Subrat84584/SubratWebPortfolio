import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  title: string;
  company: string;
  quote: string;
  initials: string;
  avatarGradient: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    title: "Engineering Manager",
    company: "Tech Innovations Pvt. Ltd.",
    quote:
      "Subrat is an exceptionally talented mobile developer. His ability to translate complex requirements into elegant, performant applications is remarkable. He delivered our flagship app ahead of schedule with zero critical bugs at launch.",
    initials: "PS",
    avatarGradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Rahul Mehta",
    title: "Senior Product Manager",
    company: "Pixel Code Studios",
    quote:
      "Working with Subrat was a pleasure. He has a rare combination of strong engineering skills and product thinking. He consistently pushed for better user experiences and his code quality is top-notch. A true asset to any team.",
    initials: "RM",
    avatarGradient: "from-purple-500 to-pink-600",
  },
  {
    name: "Ananya Patel",
    title: "Lead Software Engineer",
    company: "CloudBridge Tech",
    quote:
      "I've mentored many junior developers and Subrat stands out. His growth trajectory is impressive — within 6 months he was independently architecting features and mentoring others. His Flutter expertise is genuinely world-class.",
    initials: "AP",
    avatarGradient: "from-emerald-500 to-teal-600",
  },
];

const AUTO_PLAY_INTERVAL = 5000;

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
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ background: "#0a0a0f" }}
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-400">
            What People Say
          </span>
          <h2 className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
            Client{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
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
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-12">
            {/* Gradient top border */}
            <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />

            {/* Large quote icon */}
            <div className="absolute right-8 top-8 opacity-10">
              <Quote className="h-20 w-20 text-purple-400" />
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" as const }}
              >
                {/* Stars */}
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="mb-8 text-lg leading-relaxed text-gray-200 sm:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.avatarGradient} text-lg font-bold text-white shadow-lg`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-gray-400">
                      {t.title} &middot; {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            {/* Prev button */}
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dot navigation */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="relative h-2 overflow-hidden rounded-full transition-all duration-300"
                  style={{ width: i === current ? 24 : 8 }}
                >
                  <span className="absolute inset-0 rounded-full bg-white/20" />
                  {i === current && (
                    <motion.span
                      layoutId="dot"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
