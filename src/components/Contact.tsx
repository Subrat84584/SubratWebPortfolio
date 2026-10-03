import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Link2,
  GitBranch,
  MapPin,
  Send,
  CheckCircle,
  Briefcase,
  Code2,
  Users,
  Lightbulb,
} from "lucide-react";

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}

const contactInfoItems: ContactInfo[] = [
  {
    icon: Mail,
    label: "Direct Email",
    value: "subratkumaracharya1@gmail.com",
    href: "mailto:subratkumaracharya1@gmail.com",
  },
  {
    icon: Link2,
    label: "LinkedIn Professional Profile",
    value: "linkedin.com/in/subrat-k-acharya-a29681188",
    href: "https://www.linkedin.com/in/subrat-k-acharya-a29681188/",
  },
  {
    icon: GitBranch,
    label: "GitHub Repositories",
    value: "github.com/Subrat84584",
    href: "https://github.com/Subrat84584",
  },
  {
    icon: MapPin,
    label: "Base Location",
    value: "Bhubaneswar, Odisha, India",
    href: "#",
  },
];

const availableFor = [
  { label: "Full-Time Mobile Roles", icon: Briefcase },
  { label: "Cross-Platform Flutter Apps", icon: Code2 },
  { label: "Architecture & Code Reviews", icon: Users },
  { label: "Mobile Consulting & MVPs", icon: Lightbulb },
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
  if (!form.message.trim()) errors.message = "Message is required.";
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

  const inputBase =
    "w-full rounded-xl border px-4 py-3 text-sm placeholder-slate-400 transition-all duration-200 outline-none";
  const inputNormal =
    "border-slate-300 bg-slate-50/70 focus:bg-white text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900";
  const inputError =
    "border-red-500/80 bg-red-50/30 text-slate-900 focus:border-red-500 focus:ring-1 focus:ring-red-500/20";

  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 lg:px-8 z-10">
      <div className="relative mx-auto max-w-6xl">
        {/* Section Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span
            className="text-xs font-mono font-bold tracking-widest uppercase block mb-2"
            style={{ color: "var(--accent)" }}
          >
            [COMMUNICATION // 06]
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans tracking-tight text-slate-900">
            Let's Build Something <span className="font-extrabold">Exceptional</span>
          </h2>
          <p className="mt-3 max-w-2xl text-base text-slate-600 leading-relaxed font-sans">
            Whether you have a mobile app in development, an engineering opening, or want to discuss architecture, my inbox is open.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Direct channels + Available for */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -20 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="space-y-3">
              {contactInfoItems.map((item, i) => {
                const Icon = item.icon;
                const isLink = item.href !== "#";

                const inner = (
                  <div className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 hover:border-slate-400 hover:shadow-xs transition-all cursor-pointer">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 border border-orange-200/70 text-orange-700 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                        {item.label}
                      </p>
                      <p className="font-bold text-sm text-slate-900 truncate mt-0.5 group-hover:text-orange-700 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={leftInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
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

            {/* Available for section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
              <span className="mb-3 block text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
                Engagements &amp; Availability:
              </span>
              <div className="flex flex-wrap gap-2">
                {availableFor.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono font-medium border border-slate-200 bg-slate-50 text-slate-800"
                  >
                    <Icon className="h-3.5 w-3.5 text-orange-600" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Editorial Contact Form */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 20 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              {/* Top hairline accent bar */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
                style={{ background: "var(--accent)" }}
              />

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center mb-4">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">
                    Message Dispatched Successfully
                  </h3>
                  <p className="text-sm text-slate-600 max-w-sm">
                    Thank you for reaching out. I’ve received your message and will reply promptly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-600"
                      >
                        Your Name <span className="text-orange-600">*</span>
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
                        className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-600"
                      >
                        Email Address <span className="text-orange-600">*</span>
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
                      className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-600"
                    >
                      Project or Discussion Topic <span className="text-orange-600">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="e.g. Flutter Mobile Architecture / Job Opening"
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
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-600"
                    >
                      Message Details <span className="text-orange-600">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Share project scope, timeline, requirements, or inquiry..."
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
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-bold text-sm disabled:cursor-not-allowed disabled:opacity-60 transition-all text-white bg-slate-900 hover:bg-slate-800 cursor-pointer shadow-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                        <span>Dispatching Transmission...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Transmission</span>
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
