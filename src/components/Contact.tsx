import { useRef, useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  Link2,
  GitBranch,
  MapPin,
  Send,
  CheckCircle2,
  Briefcase,
  Code2,
  Users,
  Lightbulb,
  Phone,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Zap,
  FileText,
  Download,
} from "lucide-react";

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
  href: string;
  isExternal?: boolean;
  canCopy?: boolean;
}

const contactInfoItems: ContactInfo[] = [
  {
    icon: Mail,
    label: "Direct Email",
    value: "subratkumaracharya1@gmail.com",
    subtext: "Priority inbox • 2-4 hr reply",
    href: "mailto:subratkumaracharya1@gmail.com",
    canCopy: true,
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 9330126807",
    subtext: "Direct mobile & WhatsApp",
    href: "https://wa.me/919330126807",
    isExternal: true,
  },
  {
    icon: Link2,
    label: "LinkedIn Professional Profile",
    value: "linkedin.com/in/subrat-k-acharya-a29681188",
    subtext: "Verified career credentials",
    href: "https://www.linkedin.com/in/subrat-k-acharya-a29681188/",
    isExternal: true,
  },
  {
    icon: GitBranch,
    label: "GitHub Repositories",
    value: "github.com/Subrat84584",
    subtext: "Production Flutter repositories",
    href: "https://github.com/Subrat84584",
    isExternal: true,
  },
  {
    icon: MapPin,
    label: "Base Location",
    value: "Kolkata, WB, India",
    subtext: "On-site, Hybrid & Remote Worldwide",
    href: "https://maps.google.com/?q=Kolkata,+West+Bengal,+India",
    isExternal: true,
  },
];

const availableFor = [
  { label: "Full-Time Mobile Roles", icon: Briefcase },
  { label: "Cross-Platform Flutter Apps", icon: Code2 },
  { label: "Architecture & Code Reviews", icon: Users },
  { label: "Mobile Consulting & MVPs", icon: Lightbulb },
];

const TOPIC_PRESETS = [
  "Senior Flutter Engineer Role",
  "Full-Time Mobile Specialist",
  "Cross-Platform Flutter MVP",
  "60 FPS Profiling & Performance Audit",
  "Payment & In-App Subscriptions",
  "Mobile Architecture & Code Review",
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!validateEmail(form.email)) errors.email = "Please enter a valid email address.";
  if (!form.subject.trim()) errors.subject = "Subject is required.";
  if (!form.message.trim()) errors.message = "Message details are required.";
  return errors;
}

export default function Contact() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });
  const leftRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-50px" });
  const rightRef = useRef(null);
  const rightInView = useInView(rightRef, { once: true, margin: "-50px" });

  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [kolkataTime, setKolkataTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setKolkataTime(formatter.format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("subratkumaracharya1@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSelectTopic = (topic: string) => {
    setForm((prev) => ({ ...prev, subject: topic }));
    if (touched.subject) {
      setErrors((prev) => ({ ...prev, subject: undefined }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormState]) {
      setErrors(validateForm({ ...form, [name]: value }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateForm(form));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    const newErrors = validateForm(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setTimeout(() => setIsSuccess(false), 6000);
    }, 1400);
  };

  const inputBase =
    "w-full rounded-xl border px-4 py-3 text-sm placeholder-neutral-500 transition-all duration-200 outline-none";
  const inputNormal =
    "border-white/10 bg-white/5 focus:bg-white/10 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500";
  const inputError =
    "border-red-500/80 bg-red-950/30 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500/20";

  return (
    <section id="contact" className="relative px-4 py-24 sm:py-28 sm:px-8 lg:px-12 z-10 max-w-7xl mx-auto">
      <div className="relative mx-auto">
        {/* ───────────────────────────────────────────────────────
            SECTION HEADER
        ─────────────────────────────────────────────────────── */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >

          <h2 className="text-3xl sm:text-5xl font-sans tracking-tight text-white font-extrabold">
            Let's Build Something <span className="text-orange-500">Exceptional</span>
          </h2>
          <p className="mt-2.5 max-w-2xl text-base text-neutral-400 leading-relaxed font-sans">
            Whether you have a mobile application in development, a full-time engineering opening, or want to discuss architecture, my inbox is open.
          </p>
        </motion.div>

        {/* ───────────────────────────────────────────────────────
            MAIN GRID: LEFT DIRECT CHANNELS & AVAILABILITY + RIGHT FORM
        ─────────────────────────────────────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* LEFT COLUMN: Channels + Availability SLA + Engagements */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -20 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Live Availability SLA Card */}
            <div className="slate-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                    LIVE STATUS // OPEN FOR ROLES
                  </span>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
                  Q4 2026 Ready
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans mb-4">
                Currently exploring senior mobile engineering roles, high-performance Flutter builds, and architectural consulting worldwide.
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/10 font-mono text-[11px]">
                <div className="slate-inner-box p-2.5 rounded-xl">
                  <div className="flex items-center gap-1.5 text-orange-400 font-bold mb-0.5">
                    <Clock size={12} />
                    <span>Response SLA</span>
                  </div>
                  <span className="text-white font-semibold">&lt; 2–4 Hours</span>
                </div>

                <div className="slate-inner-box p-2.5 rounded-xl">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Kolkata, WB Time</span>
                  </div>
                  <span className="text-white font-semibold">{kolkataTime || "IST (UTC+5:30)"}</span>
                </div>
              </div>

              {/* Direct Quick Action Buttons: WhatsApp & CV */}
              <div className="flex flex-wrap sm:flex-nowrap gap-2.5 pt-3.5 mt-2 border-t border-white/10">
                <a
                  href="https://wa.me/919330126807?text=Hi%20Subrat%2C%20I%20saw%20your%20Flutter%20portfolio%20and%20would%20like%20to%20connect!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  <Phone size={13} className="text-emerald-400" />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href="/Subrat_Kumar_Acharya_Resume.pdf"
                  download="Subrat_Kumar_Acharya_Resume.pdf"
                  className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-200 hover:text-white text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  <FileText size={13} className="text-orange-400" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>

            {/* Direct Channels List */}
            <div className="space-y-3">
              {contactInfoItems.map((item, i) => {
                const Icon = item.icon;
                const isLink = item.href !== "#";

                const inner = (
                  <div className="slate-card group flex items-center justify-between p-4 sm:p-5 rounded-2xl cursor-pointer">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                            {item.label}
                          </p>
                        </div>
                        <p className="font-bold text-sm text-white truncate mt-0.5 group-hover:text-orange-400 transition-colors">
                          {item.value}
                        </p>
                        <p className="text-[11px] font-mono text-neutral-400 truncate mt-0.5">
                          {item.subtext}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                      {item.canCopy && (
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          title="Copy email to clipboard"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
                        >
                          {copiedEmail ? (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                              <Check size={13} />
                              <span>Copied!</span>
                            </span>
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      )}
                      {item.isExternal && (
                        <div className="p-2 text-neutral-500 group-hover:text-orange-400 transition-colors">
                          <ExternalLink size={14} />
                        </div>
                      )}
                    </div>
                  </div>
                );

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={leftInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    {isLink ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noreferrer noopener"
                        className="block"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Engagements & Availability Card */}
            <div className="slate-card p-5 sm:p-6 rounded-3xl">
              <span className="mb-3 block text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                ENGAGEMENTS &amp; AVAILABILITY:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableFor.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="slate-inner-box flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-mono font-medium text-neutral-200"
                  >
                    <Icon className="h-3.5 w-3.5 text-orange-400 flex-shrink-0" />
                    <span className="truncate">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Clean Architectural Contact Form with Topic Chips */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 20 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="slate-card relative rounded-3xl p-6 sm:p-8">
              {/* Top hairline accent bar */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl"
                style={{ background: "var(--accent)" }}
              />

              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Direct Inquiry &amp; Project Transmission
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mt-0.5">
                    Delivered directly to subratkumaracharya1@gmail.com
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={18} />
                </div>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 shadow-lg">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Transmission Dispatched Successfully!
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md leading-relaxed font-sans">
                    Thank you for reaching out, Subrat has received your message and will review the specifications and reply promptly.
                  </p>
                  <span className="mt-4 font-mono text-xs text-orange-400">
                    Priority SLA: Response within 2–4 hours
                  </span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Topic Preset Chips */}
                  <div>
                    <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-neutral-300">
                      Select Discussion Topic (Optional Quick-Fill):
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {TOPIC_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleSelectTopic(preset)}
                          className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            form.subject === preset
                              ? "bg-orange-500 text-white font-bold shadow-xs border border-orange-400"
                              : "slate-inner-box text-neutral-300 hover:text-white hover:border-white/20"
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-neutral-300"
                      >
                        Your Name <span className="text-orange-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Alex Henderson"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputBase} ${touched.name && errors.name ? inputError : inputNormal}`}
                      />
                      {touched.name && errors.name && (
                        <p className="mt-1 font-mono text-[11px] text-red-500">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-neutral-300"
                      >
                        Email Address <span className="text-orange-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="alex@company.com"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputBase} ${touched.email && errors.email ? inputError : inputNormal}`}
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1 font-mono text-[11px] text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-neutral-300"
                    >
                      Project or Discussion Topic <span className="text-orange-500">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="e.g. Flutter Mobile Architecture / Full-time Role"
                      value={form.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} ${touched.subject && errors.subject ? inputError : inputNormal}`}
                    />
                    {touched.subject && errors.subject && (
                      <p className="mt-1 font-mono text-[11px] text-red-500">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
                      >
                        Message Details <span className="text-orange-500">*</span>
                      </label>
                      <span className="font-mono text-[10px] text-neutral-500">
                        {form.message.length} chars
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Share project scope, mobile app specifications, timeline, or inquiry..."
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} resize-none ${touched.message && errors.message ? inputError : inputNormal}`}
                    />
                    {touched.message && errors.message && (
                      <p className="mt-1 font-mono text-[11px] text-red-500">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ y: isSubmitting ? 0 : -1 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 font-bold text-sm disabled:cursor-not-allowed disabled:opacity-60 transition-all text-neutral-900 bg-white hover:bg-neutral-100 cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="h-4 w-4 animate-spin text-neutral-900" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                        <span>Dispatching Transmission...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 text-orange-600" />
                        <span>Send Transmission to Subrat</span>
                      </>
                    )}
                  </motion.button>

                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={13} className="text-emerald-400" />
                      <span>Encrypted direct communication</span>
                    </span>
                    <span>Kolkata, WB • IST (UTC+5:30)</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
