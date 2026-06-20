import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Smartphone, Zap, GitBranch, Shield, BookOpen } from "lucide-react";

interface Achievement {
  stat: string;
  numericValue: number | null;
  suffix: string;
  icon: React.ElementType;
  title: string;
  description: string;
  accent: "yellow" | "green";
}

const achievements: Achievement[] = [
  {
    stat: "50K+", numericValue: 50000, suffix: "+",
    icon: Users, title: "Users Served", accent: "yellow",
    description: "Built and deployed mobile applications reaching over 50,000 active users across Android and iOS platforms",
  },
  {
    stat: "5", numericValue: 5, suffix: "",
    icon: Smartphone, title: "Apps Shipped", accent: "green",
    description: "Successfully designed, developed, and launched 5 production-grade mobile applications",
  },
  {
    stat: "40%", numericValue: 40, suffix: "%",
    icon: Zap, title: "Performance Boost", accent: "yellow",
    description: "Achieved 40% reduction in app load times through systematic performance profiling and optimization",
  },
  {
    stat: "400+", numericValue: 400, suffix: "+",
    icon: GitBranch, title: "Open Source", accent: "green",
    description: "Contributed to 5+ open source packages on pub.dev with 400+ combined GitHub stars",
  },
  {
    stat: "99.9%", numericValue: 99.9, suffix: "%",
    icon: Shield, title: "Uptime", accent: "yellow",
    description: "Maintained enterprise-grade reliability across all deployed applications",
  },
  {
    stat: "20+", numericValue: 20, suffix: "+",
    icon: BookOpen, title: "Continuous Learner", accent: "green",
    description: "Completed 20+ courses and certifications in mobile development and cloud technologies",
  },
];

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

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = achievement.icon;
  const isYellow = achievement.accent === "yellow";

  const accentColor = isYellow ? "#F5D000" : "#39D353";
  const accentBg    = isYellow ? "rgba(245,208,0,0.08)"  : "rgba(57,211,83,0.08)";
  const accentBorder= isYellow ? "rgba(245,208,0,0.18)"  : "rgba(57,211,83,0.18)";
  const accentHover = isYellow ? "rgba(245,208,0,0.10)"  : "rgba(57,211,83,0.10)";
  const shadowColor = isYellow ? "rgba(245,208,0,0.12)"  : "rgba(57,211,83,0.12)";

  const numVal = achievement.numericValue ?? 0;
  const counted = useCountUp(numVal, 1800, isInView);

  const displayStat =
    isInView && achievement.numericValue !== null
      ? achievement.numericValue >= 1000
        ? `${Math.round(counted / 1000)}k${achievement.suffix}`
        : `${counted}${achievement.suffix}`
      : achievement.stat;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" as const }}
      className="group relative rounded-2xl border p-6 cursor-default overflow-hidden transition-all duration-300"
      style={{
        background: "rgba(13, 20, 12, 0.80)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(245,208,0,0.10)",
      }}
      whileHover={{
        boxShadow: `0 20px 60px ${shadowColor}`,
        borderColor: accentBorder,
        y: -4,
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${accentHover}, transparent 70%)` }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: accentBg }}
        >
          <Icon className="h-6 w-6" style={{ color: accentColor }} />
        </div>

        {/* Stat number */}
        <div className="mb-2 text-4xl font-extrabold" style={{ color: accentColor, fontFamily: "Space Grotesk, sans-serif" }}>
          {displayStat}
        </div>

        <h3 className="mb-2 text-lg font-semibold" style={{ color: "#D4E8D4" }}>
          {achievement.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#3A5A37" }}>
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
}

// GitHub-style contribution heatmap in yellow/green
const heatmapData: number[][] = (() => {
  const grid: number[][] = [];
  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      const i = w * 7 + d;
      const v = (i * 37 + w * 13 + d * 7) % 100;
      if (v < 30) week.push(0);
      else if (v < 55) week.push(1);
      else if (v < 75) week.push(2);
      else if (v < 90) week.push(3);
      else week.push(4);
    }
    grid.push(week);
  }
  return grid;
})();

const heatColors = ["heat-0", "heat-1", "heat-2", "heat-3", "heat-4"];

function ContributionGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" as const }}
      className="mt-16 rounded-2xl border p-6"
      style={{
        background: "rgba(13, 20, 12, 0.80)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(245,208,0,0.10)",
      }}
    >
      <h3 className="mb-6 text-center text-xl font-semibold" style={{ color: "#D4E8D4" }}>
        Coding Activity
      </h3>
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-1">
          {heatmapData.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((level, di) => (
                <motion.div
                  key={di}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.25, delay: isInView ? (wi * 7 + di) * 0.003 : 0 }}
                  title={`${level} contributions`}
                  className={`h-3 w-3 rounded-sm ${heatColors[level]} transition-transform duration-150 hover:scale-125`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 text-xs font-mono" style={{ color: "#2A3A28" }}>
        <span>Less</span>
        {heatColors.map((c, i) => (
          <div key={i} className={`h-3 w-3 rounded-sm ${c}`} />
        ))}
        <span>More</span>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section
      id="achievements"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ background: "#0B0B0B" }}
    >
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(245,208,0,0.04)" }} />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(57,211,83,0.04)" }} />

      <div className="relative mx-auto max-w-7xl">
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
            Milestones
          </span>
          <h2
            className="mt-2 text-4xl font-extrabold sm:text-5xl"
            style={{ color: "#D4E8D4", fontFamily: "Space Grotesk, sans-serif" }}
          >
            <WordReveal>Key Achievements</WordReveal>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: "#5A7A57" }}>
            Numbers that reflect real impact — from users reached to performance milestones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <AchievementCard key={achievement.title} achievement={achievement} index={index} />
          ))}
        </div>

        <ContributionGrid />
      </div>
    </section>
  );
}
