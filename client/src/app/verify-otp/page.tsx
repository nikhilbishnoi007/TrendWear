"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  KeyRound,
  Sparkles,
} from "lucide-react";

export default function VerifyOtpPage() {
  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState<number>(30);
  const [resendNotification, setResendNotification] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 30-second countdown timer for resend OTP
  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  // Auto-focus the first input on load
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Verification simulation handler
  const handleVerify = (codeToVerify?: string) => {
    const fullCode = codeToVerify || otp.join("");

    if (fullCode.length < 6) {
      setError("Please enter all 6 digits of the verification code.");
      return;
    }

    setIsVerifying(true);
    setError(null);

    // Simulate verification check
    setTimeout(() => {
      setIsVerifying(false);
      // Dummy OTP is "123456"
      if (fullCode === "123456") {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 1600);
      } else {
        setError("Invalid OTP code. Please try again. (Hint: Test code is 123456)");
        // Highlight inputs with red outline and focus first input
        inputRefs.current[0]?.focus();
      }
    }, 600);
  };

  const handleInputChange = (index: number, value: string) => {
    // Only accept numeric characters
    const digit = value.replace(/\D/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError(null);

    // If digit entered, advance focus to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are filled
    const isCompleted = newOtp.every((d) => d !== "");
    if (isCompleted) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move focus backward and clear previous box
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current box
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
      setError(null);
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

    if (pastedData) {
      const newOtp = ["", "", "", "", "", ""];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      setError(null);

      if (pastedData.length === 6) {
        inputRefs.current[5]?.focus();
        handleVerify(pastedData);
      } else {
        inputRefs.current[pastedData.length]?.focus();
      }
    }
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;

    setCountdown(30);
    setOtp(["", "", "", "", "", ""]);
    setError(null);
    setResendNotification("New verification code dispatched: 123456");
    inputRefs.current[0]?.focus();

    setTimeout(() => {
      setResendNotification(null);
    }, 4000);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 text-orange-500 text-[11px] font-mono tracking-widest uppercase mb-2">
            <KeyRound className="w-3 h-3 text-orange-500" />
            <span>SECURITY CHALLENGE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            VERIFY <span className="text-orange-500">OTP</span>
          </h1>

          <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Enter the 6-digit security code sent to your device.
          </p>

          {/* Test code helper pill */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900/90 border border-neutral-800 text-neutral-300 font-mono text-[11px] uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-orange-400" />
              <span>TEST PASSCODE: <strong className="text-orange-500 font-bold">123456</strong></span>
            </span>
          </div>
        </div>

        {/* Verification Card */}
        <div className="bg-neutral-950 border border-neutral-850 p-6 sm:p-8 shadow-2xl space-y-6">
          {isSuccess ? (
            /* Success Transition State */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-full flex items-center justify-center mx-auto animate-in zoom-in">
                <CheckCircle2 className="w-8 h-8 text-orange-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black uppercase tracking-tight text-white">
                  CODE VERIFIED
                </h3>
                <p className="text-xs font-mono text-neutral-400 uppercase">
                  Welcome to TrendWear. Entering underground feed...
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 6 OTP Input Boxes */}
              <div className="space-y-2">
                <label className="block text-center font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold mb-4">
                  ENTER 6-DIGIT CODE
                </label>

                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className={`h-14 sm:h-16 text-center text-xl sm:text-2xl font-mono font-black uppercase bg-black text-white border transition-all focus:outline-none select-none ${
                        error
                          ? "border-red-500 focus:border-red-500 shadow-sm shadow-red-500/20"
                          : digit
                          ? "border-orange-500/80 bg-neutral-900/50 shadow-md shadow-orange-500/15"
                          : "border-neutral-800 focus:border-orange-500"
                      }`}
                    />
                  ))}
                </div>

                {/* Error Banner */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-950/40 border border-red-900/60 text-red-400 text-xs font-mono flex items-center gap-2 mt-4"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Resend Success Banner */}
                <AnimatePresence>
                  {resendNotification && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono flex items-center gap-2 mt-4"
                    >
                      <Sparkles className="w-4 h-4 flex-shrink-0 text-orange-400" />
                      <span>{resendNotification}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Manual Verify Button */}
              <button
                type="button"
                disabled={isVerifying || otp.some((d) => d === "")}
                onClick={() => handleVerify()}
                className="w-full py-4 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:hover:bg-orange-500 text-black font-black uppercase text-xs sm:text-sm tracking-[0.2em] transition-all duration-200 shadow-xl shadow-orange-500/20 active:scale-[0.99] flex items-center justify-center gap-2 group"
              >
                {isVerifying ? (
                  <span className="inline-block animate-pulse">VERIFYING CODE...</span>
                ) : (
                  <>
                    <span>CONFIRM & PROCEED</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Resend Section with 30s Countdown */}
              <div className="pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
                <span>DIDN&apos;T RECEIVE CODE?</span>

                {countdown > 0 ? (
                  <span className="text-neutral-500 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500/50 animate-ping" />
                    RESEND IN {countdown}S
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-orange-500 font-bold hover:text-orange-400 underline underline-offset-4 flex items-center gap-1.5 transition-colors focus:outline-none"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>RESEND OTP</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Switch to Login / Alternative Link */}
          <div className="pt-2 text-center text-xs font-mono uppercase tracking-wider text-neutral-500">
            <Link
              href="/login"
              className="hover:text-neutral-300 transition-colors underline underline-offset-4"
            >
              BACK TO SIGN IN
            </Link>
          </div>
        </div>

        {/* Security Micro Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
          <span>ZERO-KNOWLEDGE AUTH PROTOCOL</span>
        </div>
      </motion.div>
    </div>
  );
}
