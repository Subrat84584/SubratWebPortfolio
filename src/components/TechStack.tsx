import { motion } from "framer-motion";
import { Monitor, Code, Smartphone, Database, Layers, Settings } from "lucide-react";

const FAVORITES = [
  {
    title: "Mobile App Development",
    icon: Smartphone,
    skills: "Flutter, Dart, Android Studio, Cross-platform (Android & iOS)",
  },
  {
    title: "Backend & Cloud",
    icon: Code,
    skills: "Spring Boot, Java, Firebase, REST APIs, Node.js",
  },
  {
    title: "API & Testing",
    icon: Settings,
    skills: "Postman, Swagger, RESTful Architecture",
  },
  {
    title: "Database & Storage",
    icon: Database,
    skills: "Firebase Firestore, MySQL, SQL",
  },
  {
    title: "Payments & Store",
    icon: Layers,
    skills: "Razorpay, RevenueCat, In-App Purchases, Google Play Console",
  },
  {
    title: "Web & Tools",
    icon: Monitor,
    skills: "React.js, Next.js, TypeScript, Git, GitHub, Asana, Project Planning",
  },
];

export default function TechStack() {
  return (
    <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <span className="text-xs font-mono font-bold tracking-widest uppercase block mb-2" style={{ color: "var(--accent)" }}>
          TOOLS & TECH
        </span>
        <h2 className="text-3xl sm:text-5xl font-sans tracking-tight text-slate-800 dark:text-slate-100">
          My Personal <span className="font-bold">Favorites</span>
        </h2>
      </motion.div>

      {/* Grid: Left Isometric Illustration + Right Category Grid */}
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: 3D Isometric Laptop SVG Graphic */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-[340px]">
            <svg
              viewBox="0 0 500 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto drop-shadow-2xl"
            >
              {/* Coffee Cup Base */}
              <ellipse cx="120" cy="160" rx="35" ry="18" fill="#F97316" opacity="0.2" />
              <path d="M95 130 C95 130 95 170 120 170 C145 170 145 130 145 130 Z" fill="#7C3AED" />
              <ellipse cx="120" cy="130" rx="25" ry="10" fill="#A78BFA" />

              {/* Laptop Screen Body */}
              <path d="M220 130 L380 220 L270 330 L110 240 Z" fill="#312E81" />
              <path d="M230 140 L370 220 L270 315 L130 235 Z" fill="#1E1B4B" />
              
              {/* Screen Code Lines */}
              <rect x="250" y="180" width="70" height="8" rx="4" fill="#818CF8" transform="rotate(27 250 180)" />
              <rect x="220" y="200" width="90" height="8" rx="4" fill="#F97316" transform="rotate(27 220 200)" />
              <rect x="200" y="220" width="50" height="8" rx="4" fill="#34D399" transform="rotate(27 200 220)" />

              {/* Keyboard Base */}
              <path d="M110 240 L270 330 L220 350 L60 260 Z" fill="#4338CA" />
              <path d="M100 245 L255 330 C255 330 200 355 190 350 L50 265 Z" fill="#6366F1" opacity="0.8" />
            </svg>
          </div>
        </motion.div>

        {/* Right Side: Category Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 grid sm:grid-cols-2 gap-8"
        >
          {FAVORITES.map((fav, i) => {
            const Icon = fav.icon;
            return (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Icon size={20} style={{ color: "var(--accent)" }} />
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {fav.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {fav.skills}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
