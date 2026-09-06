"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Check,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      agreeTerms?: string;
    } = {};
    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms & Conditions.";
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

    setTimeout(() => {
      setIsSubmitting(false);
      setSignupSuccess(true);
      setTimeout(() => {
        router.push("/verify-otp");
      }, 1400);
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-137.5 h-87.5 bg-orange-600/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 text-orange-500 text-[11px] font-mono tracking-widest uppercase mb-2">
            <Sparkles className="w-3 h-3 text-orange-500" />
            <span>JOIN THE SYNDICATE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            CREATE AN <span className="text-orange-500">ACCOUNT</span>
          </h1>

          <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Unlock raffle draws, early access drops, and private lookbooks.
          </p>
        </div>
        <div className="bg-neutral-950 border border-neutral-850 p-6 sm:p-8 shadow-2xl space-y-6">
          {signupSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-full flex items-center justify-center mx-auto animate-in zoom-in">
                <CheckCircle2 className="w-8 h-8 text-orange-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black uppercase tracking-tight text-white">
                  ACCOUNT CREATED
                </h3>
                <p className="text-xs font-mono text-neutral-400 uppercase">
                  Redirecting you to sign in...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="signup-name"
                  className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold"
                >
                  FULL NAME
                </label>
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name)
                      setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="E.G. ALEX MERCER"
                  autoComplete="name"
                  className={`w-full bg-black text-white text-xs font-mono uppercase px-4 py-3.5 border transition-colors focus:outline-none placeholder-neutral-600 ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-neutral-800 focus:border-orange-500"
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] font-mono text-red-400 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold"
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="NAME@DOMAIN.COM"
                  autoComplete="email"
                  className={`w-full bg-black text-white text-xs font-mono uppercase px-4 py-3.5 border transition-colors focus:outline-none placeholder-neutral-600 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-neutral-800 focus:border-orange-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] font-mono text-red-400 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold"
                >
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="MIN. 6 CHARACTERS..."
                    autoComplete="new-password"
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
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold"
                >
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword)
                        setErrors((prev) => ({
                          ...prev,
                          confirmPassword: undefined,
                        }));
                    }}
                    placeholder="REPEAT PASSWORD..."
                    autoComplete="new-password"
                    className={`w-full bg-black text-white text-xs font-mono px-4 py-3.5 pr-11 border transition-colors focus:outline-none placeholder-neutral-600 ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : "border-neutral-800 focus:border-orange-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors p-1 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] font-mono text-red-400 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.confirmPassword}</span>
                  </p>
                )}
              </div>
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => {
                      const next = !agreeTerms;
                      setAgreeTerms(next);
                      if (next && errors.agreeTerms)
                        setErrors((prev) => ({ ...prev, agreeTerms: undefined }));
                    }}
                    className={`w-4 h-4 border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                      agreeTerms
                        ? "bg-orange-500 border-orange-500 text-black"
                        : errors.agreeTerms
                        ? "border-red-500 bg-neutral-950"
                        : "border-neutral-700 bg-neutral-950 hover:border-neutral-500"
                    }`}
                  >
                    {agreeTerms && <Check className="w-3 h-3 stroke-3" />}
                  </div>
                  <span className="text-xs font-mono text-neutral-400 leading-relaxed">
                    I agree to the{" "}
                    <span className="text-neutral-200 underline">Terms & Conditions</span>{" "}
                    and{" "}
                    <span className="text-neutral-200 underline">Privacy Policy</span>.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-[11px] font-mono text-red-400 flex items-center gap-1 pt-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.agreeTerms}</span>
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-xs sm:text-sm tracking-[0.2em] transition-all duration-200 shadow-xl shadow-orange-500/20 active:scale-[0.99] flex items-center justify-center gap-2 group disabled:opacity-50 mt-4"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-pulse">CREATING PROFILE...</span>
                ) : (
                  <>
                    <span>JOIN TRENDWEAR</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

         
          <div className="pt-4 border-t border-neutral-900 text-center text-xs font-mono uppercase tracking-wider text-neutral-400">
            <span>ALREADY REGISTERED? </span>
            <Link
              href="/login"
              className="text-orange-500 font-bold hover:text-orange-400 underline underline-offset-4 ml-1 transition-colors"
            >
              SIGN IN
            </Link>
          </div>
        </div>

       
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
          <span>ZERO SPAM // INSTANT UNLOCK</span>
        </div>
      </motion.div>
    </div>
  );
}
