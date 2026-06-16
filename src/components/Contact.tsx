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
  color: string;
  hoverColor: string;
}

const contactInfoItems: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "subrat.acharya@gmail.com",
    href: "mailto:subrat.acharya@gmail.com",
    color: "text-blue-400",
    hoverColor: "hover:border-blue-500/50 hover:shadow-blue-500/10",
  },
  {
    icon: Link2,
    label: "LinkedIn",
    value: "linkedin.com/in/subrat-acharya",
    href: "https://linkedin.com/in/subrat-acharya",
    color: "text-sky-400",
    hoverColor: "hover:border-sky-500/50 hover:shadow-sky-500/10",
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "github.com/subrat-acharya",
    href: "https://github.com/subrat-acharya",
    color: "text-purple-400",
    hoverColor: "hover:border-purple-500/50 hover:shadow-purple-500/10",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bhubaneswar, Odisha, India",
    href: "#",
    color: "text-rose-400",
    hoverColor: "hover:border-rose-500/50 hover:shadow-rose-500/10",
  },
];

const availableFor = [
  { label: "Full-time Roles", icon: Briefcase },
  { label: "Freelance", icon: Code2 },
  { label: "Open Source", icon: Users },
  { label: "Consulting", icon: Lightbulb },
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
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!validateEmail(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
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

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormState]) {
      const newErrors = validateForm({ ...form, [name]: value });
      setErrors(newErrors);
    }
  };

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateForm(form);
    setErrors(newErrors);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const allTouched: Partial<Record<keyof FormState, boolean>> = {
      name: true,
      email: true,
      subject: true,
      message: true,
    };
    setTouched(allTouched);
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
    "w-full rounded-xl border bg-white/5 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200 outline-none focus:ring-2";
  const inputNormal =
    "border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20";
  const inputError =
    "border-red-500/60 focus:border-red-500 focus:ring-red-500/20";

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ background: "#0a0a0f" }}
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
            Get In Touch
          </span>
          <h2 className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
            Let's{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Have a project in mind or just want to say hello? I'd love to hear
            from you.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* LEFT — Contact info */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -30 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-4">
              {contactInfoItems.map((item, i) => {
                const Icon = item.icon;
                const isLink = item.href !== "#";
                const cls = `group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/8 hover:shadow-lg ${item.hoverColor} ${isLink ? "cursor-pointer" : ""}`;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={leftInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    {isLink ? (
                      <a href={item.href} target="_blank" rel="noreferrer noopener" className={cls}>
                        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 ${item.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{item.label}</p>
                          <p className="font-medium text-gray-200">{item.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className={cls}>
                        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 ${item.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{item.label}</p>
                          <p className="font-medium text-gray-200">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Available for section */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                Available for:
              </p>
              <div className="flex flex-wrap gap-2">
                {availableFor.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Contact form */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 30 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              {/* Gradient top border */}
              <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle className="mb-4 h-16 w-16 text-green-400" />
                  <h3 className="mb-2 text-xl font-bold text-white">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm font-medium text-gray-300"
                    >
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} ${touched.name && errors.name ? inputError : inputNormal}`}
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-sm font-medium text-gray-300"
                    >
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} ${touched.email && errors.email ? inputError : inputNormal}`}
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-1.5 block text-sm font-medium text-gray-300"
                    >
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} ${touched.subject && errors.subject ? inputError : inputNormal}`}
                    />
                    {touched.subject && errors.subject && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-sm font-medium text-gray-300"
                    >
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project or just say hi..."
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} resize-none ${touched.message && errors.message ? inputError : inputNormal}`}
                    />
                    {touched.message && errors.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
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
