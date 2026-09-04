"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Mock local authentication state simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setLoginSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }, 800);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
      setForgotSubmitted(true);
      setTimeout(() => {
        setIsForgotPasswordOpen(false);
        setForgotSubmitted(false);
        setForgotEmail("");
      }, 2000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 text-orange-500 text-[11px] font-mono tracking-widest uppercase mb-2">
            <Sparkles className="w-3 h-3 text-orange-500" />
            <span>MEMBER ACCESS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            SIGN IN TO <span className="text-orange-500">TRENDWEAR</span>
          </h1>

          <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Enter your credentials to access drops & order archives.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-neutral-950 border border-neutral-850 p-6 sm:p-8 shadow-2xl space-y-6">
          {loginSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-full flex items-center justify-center mx-auto animate-in zoom-in">
                <CheckCircle2 className="w-8 h-8 text-orange-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black uppercase tracking-tight text-white">
                  ACCESS GRANTED
                </h3>
                <p className="text-xs font-mono text-neutral-400 uppercase">
                  Redirecting to your feed...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-email"
                  className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold"
                >
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="NAME@DOMAIN.COM"
                    autoComplete="email"
                    className={`w-full bg-black text-white text-xs font-mono uppercase px-4 py-3.5 border transition-colors focus:outline-none placeholder-neutral-600 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-neutral-800 focus:border-orange-500"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] font-mono text-red-400 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold"
                  >
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(true)}
                    className="text-[11px] font-mono uppercase text-orange-400 hover:text-orange-300 transition-colors focus:outline-none"
                  >
                    FORGOT PASSWORD?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="ENTER PASSWORD..."
                    autoComplete="current-password"
                    className={`w-full bg-black text-white text-xs font-mono px-4 py-3.5 pr-11 border transition-colors focus:outline-none placeholder-neutral-600 ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-neutral-800 focus:border-orange-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors p-1 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] font-mono text-red-400 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-xs sm:text-sm tracking-[0.2em] transition-all duration-200 shadow-xl shadow-orange-500/20 active:scale-[0.99] flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-pulse">AUTHENTICATING...</span>
                ) : (
                  <>
                    <span>SIGN IN</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Switch to Signup */}
          <div className="pt-4 border-t border-neutral-900 text-center text-xs font-mono uppercase tracking-wider text-neutral-400">
            <span>NOT A MEMBER YET? </span>
            <Link
              href="/signup"
              className="text-orange-500 font-bold hover:text-orange-400 underline underline-offset-4 ml-1 transition-colors"
            >
              CREATE ACCOUNT
            </Link>
          </div>
        </div>

        {/* Security Micro Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
          <span>ENCRYPTED CLIENT SESSION</span>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {isForgotPasswordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsForgotPasswordOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-md bg-neutral-950 border border-neutral-800 p-8 shadow-2xl text-white space-y-6"
            >
              <div className="space-y-2">
                <div className="text-orange-500 font-mono text-xs tracking-widest uppercase">
                  PASSWORD RECOVERY
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">
                  RESET YOUR PASSWORD
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Enter your registered email address and we will dispatch password reset instructions.
                </p>
              </div>

              {forgotSubmitted ? (
                <div className="p-4 bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                  <span>RESET LINK DISPATCHED IF EMAIL EXISTS.</span>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL..."
                    className="w-full bg-black text-white text-xs font-mono uppercase px-4 py-3.5 border border-neutral-800 focus:border-orange-500 focus:outline-none placeholder-neutral-500"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-xs tracking-widest transition-colors"
                    >
                      SEND RESET LINK
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsForgotPasswordOpen(false)}
                      className="px-5 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold uppercase text-xs tracking-wider transition-colors"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
