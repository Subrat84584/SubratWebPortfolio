import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Smartphone, Send, Phone, Mail, User, ShieldCheck } from "lucide-react";

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectScope: string;
}

export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectScope: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!formData.name.trim()) errs.name = "Your name is required.";
    if (!formData.email.trim()) {
      errs.email = "Your email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone or WhatsApp number is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate prompt dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", email: "", phone: "", projectScope: "" });
        onClose();
      }, 3500);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-9 shadow-2xl z-10 my-8 text-left"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center mb-5">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Consultation Request Received!
                </h3>
                <p className="mt-2 text-sm text-slate-600 max-w-sm leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. I will review your requirements and connect with you on WhatsApp / Phone within 12 hours.
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-400">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Your details are kept strictly private &amp; confidential.</span>
                </div>
              </motion.div>
            ) : (
              <div>
                {/* Header */}
                <div className="mb-6">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase block mb-1 text-orange-600">
                    [CLIENT ONBOARDING]
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Build your mobile app with me
                  </h3>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed font-sans">
                    Share your contact details below to discuss architecture, timeline, and deliverables for your business app.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="modal-name"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Full Name <span className="text-orange-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User size={16} />
                      </div>
                      <input
                        id="modal-name"
                        name="name"
                        type="text"
                        placeholder="e.g. David Miller"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full rounded-xl border pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none ${
                          errors.name
                            ? "border-red-400 bg-red-50/30 focus:border-red-500"
                            : "border-slate-300 bg-slate-50/60 focus:bg-white focus:border-slate-900"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 font-mono text-[11px] text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="modal-email"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Email Address <span className="text-orange-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail size={16} />
                      </div>
                      <input
                        id="modal-email"
                        name="email"
                        type="email"
                        placeholder="david@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full rounded-xl border pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none ${
                          errors.email
                            ? "border-red-400 bg-red-50/30 focus:border-red-500"
                            : "border-slate-300 bg-slate-50/60 focus:bg-white focus:border-slate-900"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 font-mono text-[11px] text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="modal-phone"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Phone / WhatsApp Number <span className="text-orange-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone size={16} />
                      </div>
                      <input
                        id="modal-phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000 or WhatsApp number"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full rounded-xl border pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none ${
                          errors.phone
                            ? "border-red-400 bg-red-50/30 focus:border-red-500"
                            : "border-slate-300 bg-slate-50/60 focus:bg-white focus:border-slate-900"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 font-mono text-[11px] text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  {/* Brief Scope */}
                  <div>
                    <label
                      htmlFor="modal-scope"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      App Overview / Business Scope <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="modal-scope"
                      name="projectScope"
                      rows={3}
                      placeholder="Briefly tell me about your app idea, target platforms (iOS/Android), or timeline..."
                      value={formData.projectScope}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/60 focus:bg-white focus:border-slate-900 p-3 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ y: isSubmitting ? 0 : -1 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                    className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 text-sm shadow-md transition-all cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                        </svg>
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Smartphone size={16} />
                        <span>Request Direct Consultation</span>
                        <Send size={14} className="ml-1" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Footer Note */}
                <p className="mt-4 text-center font-mono text-[11px] text-slate-500">
                  Direct reply guaranteed within 12 hours. Zero spam.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
