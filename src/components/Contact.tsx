import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail, Link2, GitBranch, MapPin, Send, CheckCircle,
  Briefcase, Code2, Users, Lightbulb,
} from "lucide-react";

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  accent: "yellow" | "green";
}

const contactInfoItems: ContactInfo[] = [
  { icon: Mail,      label: "Email",    value: "subrat.acharya@gmail.com",        href: "mailto:subrat.acharya@gmail.com",          accent: "yellow" },
  { icon: Link2,     label: "LinkedIn", value: "linkedin.com/in/subrat-acharya",  href: "https://linkedin.com/in/subrat-acharya",   accent: "green" },
  { icon: GitBranch, label: "GitHub",   value: "github.com/subrat-acharya",       href: "https://github.com/subrat-acharya",        accent: "yellow" },
  { icon: MapPin,    label: "Location", value: "Bhubaneswar, Odisha, India",      href: "#",                                        accent: "green" },
];

const availableFor = [
  { label: "Full-time Roles", icon: Briefcase },
  { label: "Freelance",       icon: Code2 },
  { label: "Open Source",     icon: Users },
  { label: "Consulting",      icon: Lightbulb },
];

interface FormState  { name: string; email: string; subject: string; message: string }
interface FormErrors { name?: string; email?: string; subject?: string; message?: string }

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim())    errors.name    = "Name is required.";
  if (!form.email.trim())   errors.email   = "Email is required.";
  else if (!validateEmail(form.email)) errors.email = "Please enter a valid email address.";
  if (!form.subject.trim()) errors.subject = "Subject is required.";
  if (!form.message.trim()) errors.message = "Message is required.";
  return errors;
}

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

export default function Contact() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });
  const leftRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-50px" });
  const rightRef = useRef(null);
  const rightInView = useInView(rightRef, { once: true, margin: "-50px" });

  const [form, setForm]             = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors]         = useState<FormErrors>({});
  const [touched, setTouched]       = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]   = useState(false);

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
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const inputBase = "w-full rounded-xl border bg-transparent px-4 py-3 text-sm placeholder-gray-400 backdrop-blur-sm transition-all duration-200 outline-none focus:ring-2";
  const inputNormal = "border-[var(--border)] focus:border-[var(--accent-2)] focus:ring-[var(--border)] text-[var(--text)]";
  const inputError  = "border-red-500/60 focus:border-red-500 focus:ring-red-500/20 text-[var(--text)]";

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 z-10"
      style={{ background: "transparent" }}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(99, 102, 241, 0.03)" }} />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(16, 185, 129, 0.03)" }} />

      <div className="relative mx-auto max-w-6xl">
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
            style={{ borderColor: "var(--border)", background: "rgba(16, 185, 129, 0.08)", color: "var(--accent)" }}
          >
            Get In Touch
          </span>
          <h2
            className="mt-2 text-4xl font-extrabold sm:text-5xl"
            style={{ color: "var(--text)" }}
          >
            <WordReveal>Let's Connect</WordReveal>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: "var(--muted)" }}>
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left — contact info */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -30 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-3">
              {contactInfoItems.map((item, i) => {
                const Icon = item.icon;
                const isLink = item.href !== "#";
                const accentColor  = item.accent === "yellow" ? "var(--accent-2)" : "var(--accent)";
                const accentBg     = item.accent === "yellow" ? "rgba(99, 102, 241, 0.06)" : "rgba(16, 185, 129, 0.06)";
                const accentBorder = "var(--border-hover)";

                const inner = (
                  <div
                    className="group flex items-center gap-4 rounded-xl border p-4 transition-all duration-300 cursor-pointer"
                    style={{
                      background: "var(--card-bg)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{ background: accentBg }}
                    >
                      <Icon className="h-5 w-5" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                        {item.label}
                      </p>
                      <p className="font-semibold text-sm mt-0.5" style={{ color: "var(--text)" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={leftInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ x: 4, borderColor: accentBorder }}
                    style={{ borderRadius: "0.75rem" }}
                  >
                    {isLink ? (
                      <a href={item.href} target="_blank" rel="noreferrer noopener" className="block">
                        {inner}
                      </a>
                    ) : inner}
                  </motion.div>
                );
              })}
            </div>

            {/* Available for */}
            <div
              className="rounded-xl border p-5"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--border)",
              }}
            >
              <p className="mb-3 text-xs font-mono uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                Available for:
              </p>
              <div className="flex flex-wrap gap-2">
                {availableFor.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border"
                    style={{
                      borderColor: "var(--border)",
                      background: "rgba(16, 185, 129, 0.08)",
                      color: "var(--text)",
                    }}
                  >
                    <Icon className="h-3.5 w-3.5 text-[var(--accent)]" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 30 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div
              className="relative rounded-2xl border p-6 sm:p-8"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--border)",
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                style={{ background: "linear-gradient(90deg, var(--accent-2), var(--accent))" }}
              />

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle className="mb-4 h-16 w-16 text-[var(--accent)]" />
                  <h3 className="mb-2 text-xl font-bold" style={{ color: "var(--text)" }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: "var(--muted)" }}>
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--muted)" }}>
                      Name <span style={{ color: "var(--accent-2)" }}>*</span>
                    </label>
                    <input
                      id="contact-name" name="name" type="text" placeholder="Your full name"
                      value={form.name} onChange={handleChange} onBlur={handleBlur}
                      className={`${inputBase} ${touched.name && errors.name ? inputError : inputNormal}`}
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--muted)" }}>
                      Email <span style={{ color: "var(--accent-2)" }}>*</span>
                    </label>
                    <input
                      id="contact-email" name="email" type="email" placeholder="your@email.com"
                      value={form.email} onChange={handleChange} onBlur={handleBlur}
                      className={`${inputBase} ${touched.email && errors.email ? inputError : inputNormal}`}
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--muted)" }}>
                      Subject <span style={{ color: "var(--accent-2)" }}>*</span>
                    </label>
                    <input
                      id="contact-subject" name="subject" type="text" placeholder="What's this about?"
                      value={form.subject} onChange={handleChange} onBlur={handleBlur}
                      className={`${inputBase} ${touched.subject && errors.subject ? inputError : inputNormal}`}
                    />
                    {touched.subject && errors.subject && (
                      <p className="mt-1 text-xs text-red-400">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--muted)" }}>
                      Message <span style={{ color: "var(--accent-2)" }}>*</span>
                    </label>
                    <textarea
                      id="contact-message" name="message" rows={5}
                      placeholder="Tell me about your project or just say hi..."
                      value={form.message} onChange={handleChange} onBlur={handleBlur}
                      className={`${inputBase} resize-none ${touched.message && errors.message ? inputError : inputNormal}`}
                    />
                    {touched.message && errors.message && (
                      <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-sm disabled:cursor-not-allowed disabled:opacity-70 transition-all duration-200 text-white"
                    style={{
                      background: "var(--accent)",
                      boxShadow: isSubmitting ? "none" : "0 4px 14px rgba(16, 185, 129, 0.2)",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
