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
  color: "blue" | "purple" | "yellow" | "green" | "red" | "cyan";
}

const achievements: Achievement[] = [
  {
    stat: "50,000+",
    numericValue: 50000,
    suffix: "+",
    icon: Users,
    title: "Users Served",
    description:
      "Built and deployed mobile applications reaching over 50,000 active users across Android and iOS platforms",
    color: "blue",
  },
  {
    stat: "5",
    numericValue: 5,
    suffix: "",
    icon: Smartphone,
    title: "Apps Shipped",
    description:
      "Successfully designed, developed, and launched 5 production-grade mobile applications",
    color: "purple",
  },
  {
    stat: "40%",
    numericValue: 40,
    suffix: "%",
    icon: Zap,
    title: "Performance Boost",
    description:
      "Achieved 40% reduction in app load times through systematic performance profiling and optimization",
    color: "yellow",
  },
  {
    stat: "400+",
    numericValue: 400,
    suffix: "+",
    icon: GitBranch,
    title: "Open Source Contributor",
    description:
      "Contributed to 5+ open source packages on pub.dev with 400+ combined GitHub stars",
    color: "green",
  },
  {
    stat: "99.9%",
    numericValue: 99.9,
    suffix: "%",
    icon: Shield,
    title: "Uptime",
    description:
      "Maintained enterprise-grade reliability across all deployed applications",
    color: "red",
  },
  {
    stat: "20+",
    numericValue: 20,
    suffix: "+",
    icon: BookOpen,
    title: "Continuous Learner",
    description:
      "Completed 20+ courses and certifications in mobile development and cloud technologies",
    color: "cyan",
  },
];

const colorMap = {
  blue: {
    gradient: "from-blue-500 to-blue-700",
    glow: "group-hover:shadow-blue-500/25",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    text: "from-blue-400 to-blue-600",
  },
  purple: {
    gradient: "from-purple-500 to-purple-700",
    glow: "group-hover:shadow-purple-500/25",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    border: "group-hover:border-purple-500/50",
    text: "from-purple-400 to-purple-600",
  },
  yellow: {
    gradient: "from-yellow-500 to-yellow-700",
    glow: "group-hover:shadow-yellow-500/25",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-400",
    border: "group-hover:border-yellow-500/50",
    text: "from-yellow-400 to-yellow-600",
  },
  green: {
    gradient: "from-green-500 to-green-700",
    glow: "group-hover:shadow-green-500/25",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
    border: "group-hover:border-green-500/50",
    text: "from-green-400 to-green-600",
  },
  red: {
    gradient: "from-red-500 to-red-700",
    glow: "group-hover:shadow-red-500/25",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    border: "group-hover:border-red-500/50",
    text: "from-red-400 to-red-600",
  },
  cyan: {
    gradient: "from-cyan-500 to-cyan-700",
    glow: "group-hover:shadow-cyan-500/25",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    text: "from-cyan-400 to-cyan-600",
  },
};

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

function AchievementCard({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const colors = colorMap[achievement.color];
  const Icon = achievement.icon;

  const numVal = achievement.numericValue ?? 0;
  const countedValue = useCountUp(numVal, 1800, isInView);

  const displayStat =
    isInView && achievement.numericValue !== null
      ? achievement.numericValue >= 1000
        ? `${(countedValue / 1000).toFixed(0)}k${achievement.suffix}`
        : `${countedValue}${achievement.suffix}`
      : achievement.stat;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" as const }}
      className={`group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${colors.glow} ${colors.border}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${colors.iconBg}`}
        >
          <Icon className={`h-6 w-6 ${colors.iconColor}`} />
        </div>
      </div>

      <div
        className={`mb-2 bg-gradient-to-r ${colors.text} bg-clip-text text-4xl font-extrabold text-transparent`}
      >
        {displayStat}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">
        {achievement.title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-400">
        {achievement.description}
      </p>

      {/* Subtle gradient overlay on hover */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
      />
    </motion.div>
  );
}

function generateHeatmapData(): number[][] {
  const weeks = 52;
  const days = 7;
  const grid: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      const rand = Math.random();
      if (rand < 0.3) week.push(0);
      else if (rand < 0.55) week.push(1);
      else if (rand < 0.75) week.push(2);
      else if (rand < 0.9) week.push(3);
      else week.push(4);
    }
    grid.push(week);
  }
  return grid;
}

const heatmapData = generateHeatmapData();

const heatmapColors = [
  "bg-gray-800",
  "bg-green-900",
  "bg-green-700",
  "bg-green-500",
  "bg-green-400",
];

function ContributionGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" as const }}
      className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      <h3 className="mb-6 text-center text-xl font-semibold text-white">
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
                  transition={{
                    duration: 0.3,
                    delay: isInView ? (wi * 7 + di) * 0.003 : 0,
                  }}
                  title={`${level} contributions`}
                  className={`h-3 w-3 rounded-sm ${heatmapColors[level]} transition-transform duration-150 hover:scale-125`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-500">
        <span>Less</span>
        {heatmapColors.map((c, i) => (
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
      style={{ background: "#0a0a0f" }}
    >
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-purple-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
            Milestones
          </span>
          <h2 className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
            Key{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Numbers that reflect real impact — from users reached to
            performance milestones.
          </p>
        </motion.div>

        {/* Achievement cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.title}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>

        {/* GitHub-style contribution heatmap */}
        <ContributionGrid />
      </div>
    </section>
  );
}
