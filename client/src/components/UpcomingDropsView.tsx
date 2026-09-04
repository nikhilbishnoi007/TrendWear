"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Bell,
  Check,
  Calendar,
} from "lucide-react";
import { UPCOMING_DROPS, UpcomingDrop } from "@/data/products";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const calculateTimeRemaining = (targetDateString: string): TimeRemaining => {
  const target = new Date(targetDateString).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds, isExpired: false };
};

const DropCountdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <div className="bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-bold py-2 px-3 text-center uppercase tracking-widest">
        DROP IS NOW LIVE
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-center select-none">
      <div className="bg-black border border-neutral-800 p-2 sm:p-2.5">
        <div className="text-base sm:text-xl font-black font-mono text-white">
          {String(timeLeft.days).padStart(2, "0")}
        </div>
        <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          DAYS
        </div>
      </div>
      <div className="bg-black border border-neutral-800 p-2 sm:p-2.5">
        <div className="text-base sm:text-xl font-black font-mono text-white">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          HOURS
        </div>
      </div>
      <div className="bg-black border border-neutral-800 p-2 sm:p-2.5">
        <div className="text-base sm:text-xl font-black font-mono text-white">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          MINS
        </div>
      </div>
      <div className="bg-black border border-neutral-800 p-2 sm:p-2.5">
        <div className="text-base sm:text-xl font-black font-mono text-orange-500">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
        <div className="text-[9px] sm:text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          SECS
        </div>
      </div>
    </div>
  );
};

export const UpcomingDropsView: React.FC = () => {
  const [remindedDrops, setRemindedDrops] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeModalDrop, setActiveModalDrop] = useState<UpcomingDrop | null>(null);
  const [reminderEmail, setReminderEmail] = useState("");
  const [reminderSuccess, setReminderSuccess] = useState(false);

  const categories = ["ALL", "Sneakers", "Apparel", "Accessories"];

  const filteredDrops =
    selectedCategory === "ALL"
      ? UPCOMING_DROPS
      : UPCOMING_DROPS.filter((d) => d.category === selectedCategory);

  const handleReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeModalDrop && reminderEmail.trim()) {
      setRemindedDrops((prev) => [...prev, activeModalDrop.id]);
      setReminderSuccess(true);
      setTimeout(() => {
        setActiveModalDrop(null);
        setReminderSuccess(false);
        setReminderEmail("");
      }, 2000);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pb-24">
      {/* Header Banner */}
      <section className="relative py-16 border-b border-neutral-900 bg-neutral-950/60 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-neutral-900 border border-neutral-800 text-orange-500 text-xs font-mono tracking-widest uppercase">
            <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span>CONFIRMED LAUNCH CALENDAR</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-white">
            UPCOMING <span className="text-orange-500">DROPS</span>
          </h1>

          <p className="max-w-2xl text-neutral-400 text-xs sm:text-sm font-mono uppercase tracking-wider">
            Mark your calendar. High-heat silhouettes and limited micro-editions dropping soon.
            Set live alerts so you never take an L.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-black shadow-md shadow-orange-500/20"
                    : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-900 hover:border-neutral-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider hidden sm:inline">
            {filteredDrops.length} UPCOMING RELEASES
          </span>
        </div>

        {/* Drops Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          {filteredDrops.map((drop) => {
            const hasReminder = remindedDrops.includes(drop.id);

            return (
              <div
                key={drop.id}
                className="group bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Image & Tags */}
                <div>
                  <div className="relative aspect-video sm:aspect-[16/10] bg-neutral-900 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={drop.image}
                      alt={drop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />

                    {/* Multi-tier Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      <span className="bg-orange-500 text-black text-[10px] font-mono font-black uppercase tracking-widest px-2.5 py-1 shadow-md shadow-orange-500/30">
                        {drop.dropType}
                      </span>
                      <span className="bg-black/80 backdrop-blur-md text-neutral-300 text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 border border-neutral-800">
                        {drop.edition}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <div className="bg-neutral-950/90 backdrop-blur-md border border-neutral-800 p-3">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-orange-500" />
                          <span>LAUNCH: {drop.displayDate}</span>
                        </div>
                        <DropCountdown targetDate={drop.releaseDate} />
                      </div>
                    </div>
                  </div>

                  {/* Drop Info */}
                  <div className="p-6 space-y-3">
                    <div className="text-[11px] font-mono uppercase text-neutral-500 tracking-widest">
                      {`${drop.brand} // ${drop.category}`}
                    </div>

                    <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors">
                      {drop.name}
                    </h3>

                    <p className="text-xs font-light text-neutral-400 leading-relaxed line-clamp-2">
                      {drop.description}
                    </p>

                    <div className="text-base font-mono font-bold text-white pt-1">
                      ESTIMATED RETAIL: ${drop.price}
                    </div>
                  </div>
                </div>

                {/* Reminder Action Button */}
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => setActiveModalDrop(drop)}
                    className={`w-full py-4 font-black uppercase text-xs tracking-widest transition-all duration-200 flex items-center justify-center gap-2 ${
                      hasReminder
                        ? "bg-neutral-900 border border-orange-500/40 text-orange-400"
                        : "bg-neutral-900 hover:bg-orange-500 text-neutral-200 hover:text-black border border-neutral-800 hover:border-orange-500 active:scale-98"
                    }`}
                  >
                    {hasReminder ? (
                      <>
                        <Check className="w-4 h-4 text-orange-400 stroke-[3]" />
                        <span>REMINDER SET (ALERT ARMED)</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-4 h-4" />
                        <span>SET DROP REMINDER</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reminder Alert Modal */}
      <AnimatePresence>
        {activeModalDrop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalDrop(null)}
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
                  CONFIRM DROP REMINDER
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">
                  {activeModalDrop.name}
                </h3>
                <p className="text-xs font-mono text-neutral-400">
                  LAUNCH DATE: {activeModalDrop.displayDate}
                </p>
                <p className="text-xs text-neutral-400 font-light leading-relaxed pt-1">
                  We will dispatch an SMS and priority email alert 15 minutes before the release window opens.
                </p>
              </div>

              {reminderSuccess ? (
                <div className="p-4 bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs text-center flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-orange-400" />
                  <span>REMINDER ACTIVE! YOU WILL RECEIVE PRIORITY ACCESS.</span>
                </div>
              ) : (
                <form onSubmit={handleReminderSubmit} className="space-y-4">
                  <input
                    type="email"
                    required
                    value={reminderEmail}
                    onChange={(e) => setReminderEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL ADDRESS..."
                    className="w-full bg-black text-white text-xs font-mono uppercase px-4 py-3.5 border border-neutral-800 focus:border-orange-500 focus:outline-none placeholder-neutral-500"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-orange-500 hover:bg-orange-400 text-black font-black uppercase text-xs tracking-widest transition-colors"
                    >
                      ARM REMINDER
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModalDrop(null)}
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
};

export default UpcomingDropsView;
