import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Sparkles,
  Wand2,
  Flower2,
  Gift,
  Gem,
  ArrowLeft,
  ExternalLink,
  Mail,
} from "lucide-react";
import { PaymentModal } from "./PaymentModal";
import { YOUR_REAL_NAME, GIFTS } from "../constants";

export const Generator: React.FC = () => {
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState({ amount: "0", title: "" });

  const handleGenerate = () => {
    if (!yourName || !partnerName || !yourEmail) return;

    // Robust URL generation
    const baseUrl = window.location.origin + window.location.pathname;
    const url = new URL(baseUrl);
    url.searchParams.set("from", yourName);
    url.searchParams.set("to", partnerName);
    // Base64 encode email to keep it slightly obfuscated in the URL
    try {
      url.searchParams.set("em", btoa(yourEmail));
    } catch (e) {
      console.error("Email encoding failed", e);
    }

    setGeneratedUrl(url.toString());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setShowGifts(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  const openPayment = (amount: string, title: string) => {
    setSelectedGift({ amount, title });
    setIsPayOpen(true);
  };

  useEffect(() => {
    if (showGifts) {
      // ensure the gifts section is visible from the top when opened
      // use a timeout to wait for the DOM update and then jump to top
      setTimeout(() => {
        try {
          window.scrollTo({ top: 0, behavior: "auto" });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        } catch (e) {
          // ignore in non-browser environments
        }
      }, 0);
    }
  }, [showGifts]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 relative overflow-hidden pb-6 md:pb-12">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-rose-500/20 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {!showGifts ? (
            <motion.div
              key="setup"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 w-full max-w-xl"
            >
              <div className="md:mt-10 mt-8 text-center mb-12">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="inline-block mb-6"
                >
                  <Sparkles className="w-12 h-12 text-rose-300" />
                </motion.div>
                <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">
                  Personalize Your Story
                </h1>
                <p className="text-neutral-400 font-light tracking-wide">
                  Create a cinematic experience for your Valentine in seconds.
                </p>
              </div>

              <div className="glass-card p-8 md:p-12 rounded-[2.5rem] space-y-8 border border-white/5 shadow-2xl">
                <div className="space-y-6">
                  <div className="group">
                    <label className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-2 block font-medium group-focus-within:text-rose-400 transition-colors">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={yourName}
                      onChange={(e) => setYourName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/10 focus:border-rose-500/30 focus:ring-0 outline-none transition-all font-serif text-xl"
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-2 block font-medium group-focus-within:text-rose-400 transition-colors">
                      Your Partner's Name
                    </label>
                    <input
                      type="text"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      placeholder="Your Love"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/10 focus:border-rose-500/30 focus:ring-0 outline-none transition-all font-serif text-xl"
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-2 block font-medium group-focus-within:text-rose-400 transition-colors">
                      Your Email{" "}
                      <span className="text-white/20 ml-2 normal-case tracking-normal">
                        (To receive the confession)
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={yourEmail}
                        onChange={(e) => setYourEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/10 focus:border-rose-500/30 focus:ring-0 outline-none transition-all font-serif text-xl pl-12"
                      />
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
                        size={18}
                      />
                    </div>
                  </div>
                </div>

                {!generatedUrl ? (
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGenerate}
                      disabled={!yourName || !partnerName || !yourEmail}
                      className="w-full py-5 bg-white text-black rounded-2xl font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 disabled:opacity-30 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                    >
                      <Wand2 size={16} />
                      Generate My Link
                    </motion.button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-6 pt-6 border-t border-white/5"
                  >
                    <div className="p-6 bg-rose-500/5 rounded-3xl border border-rose-500/10">
                      <p className="text-white/50 text-[10px] tracking-widest uppercase mb-4 font-medium">
                        Your Unique Magic Link
                      </p>
                      <div className="flex items-center gap-3">
                        <input
                          readOnly
                          value={generatedUrl}
                          className="flex-1 bg-transparent text-rose-200 font-mono text-xs overflow-hidden text-ellipsis whitespace-nowrap outline-none"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="p-4 glass rounded-xl text-white/60 hover:text-white transition-colors flex items-center gap-2"
                        >
                          {copied ? (
                            <Check size={18} className="text-green-400" />
                          ) : (
                            <Copy size={18} />
                          )}
                          <span className="text-[10px] uppercase tracking-widest">
                            {copied ? "Copied" : "Copy"}
                          </span>
                        </button>
                      </div>
                      <p className="mt-4 text-[9px] text-white/40 uppercase tracking-widest text-center">
                        Copying will proceed to gifts automatically
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <motion.a
                        href={generatedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-5 border border-white/10 bg-white/5 text-white rounded-2xl font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <ExternalLink size={16} />
                        View Live Preview
                      </motion.a>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={copyToClipboard}
                        className="w-full py-5 border border-rose-400/20 bg-rose-500 text-white rounded-2xl font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 hover:bg-rose-600 transition-colors"
                      >
                        <Gift size={16} />
                        Help Me Gift
                      </motion.button>

                      <button
                        onClick={() => setGeneratedUrl("")}
                        className="text-white/20 hover:text-white/60 text-[10px] tracking-widest uppercase transition-colors"
                      >
                        Change Names
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gifts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-4xl"
            >
              <div className="sticky top-4 z-20 pt-6 pb-4 text-center mb-6">
                <button
                  onClick={() => setShowGifts(false)}
                  className="mb-2 text-white/30 hover:text-white flex items-center gap-2 mx-auto text-[10px] uppercase tracking-widest transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Link
                </button>
                <h2 className="text-5xl md:text-6xl font-serif text-white mb-4">
                  Complete the Surprise
                </h2>
                <p className="text-neutral-400 font-light tracking-wide max-w-xl mx-auto">
                  Bro…❤️ this project is really close to my heart. If it touched
                  you and you’d like to help me make it real for My Soulmate, I’d
                  appreciate it more than I can say✨. No pressure at all.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Option 1: Rose */}
                <motion.button
                  whileHover={{ y: -10 }}
                  onClick={() =>
                    openPayment(GIFTS.ROSE.amount, GIFTS.ROSE.name)
                  }
                  className="glass-card p-6 md:p-8 rounded-[2.5rem] border border-white/5 text-center flex flex-col items-center group transition-all duration-500 hover:border-rose-500/30"
                >
                  <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6 group-hover:bg-rose-500/20 transition-colors">
                    <Flower2 className="w-8 h-8 text-rose-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-2">
                    {GIFTS.ROSE.name}
                  </h3>
                  <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
                    {GIFTS.ROSE.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-white/5 w-full">
                    <p className="text-rose-200 text-2xl md:text-3xl font-serif mb-4">
                      ₹{GIFTS.ROSE.amount}
                    </p>
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">
                      Support Gift
                    </span>
                  </div>
                </motion.button>

                {/* Option 2: Silk */}
                <motion.button
                  whileHover={{ y: -10 }}
                  onClick={() =>
                    openPayment(GIFTS.SILK.amount, GIFTS.SILK.name)
                  }
                  className="glass-card p-6 md:p-8 rounded-[2.5rem] border border-rose-400/20 text-center flex flex-col items-center relative group overflow-hidden transition-all duration-500 hover:border-rose-500/50"
                >
                  <div className="absolute top-4 right-6 bg-rose-500 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest text-white">
                    Classic
                  </div>
                  <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6 group-hover:bg-rose-500/20 transition-colors">
                    <Gift className="w-8 h-8 text-rose-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-2">
                    {GIFTS.SILK.name}
                  </h3>
                  <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
                    {GIFTS.SILK.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-white/5 w-full">
                    <p className="text-rose-200 text-2xl md:text-3xl font-serif mb-4">
                      ₹{GIFTS.SILK.amount}
                    </p>
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">
                      Support Gift
                    </span>
                  </div>
                </motion.button>

                {/* Option 3: Special */}
                <motion.button
                  whileHover={{ y: -10 }}
                  onClick={() =>
                    openPayment(GIFTS.SPECIAL.amount, GIFTS.SPECIAL.name)
                  }
                  className="glass-card p-6 md:p-8 rounded-[2.5rem] border border-white/5 text-center flex flex-col items-center group transition-all duration-500 hover:border-blue-500/30"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                    <Gem className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-2">
                    {GIFTS.SPECIAL.name}
                  </h3>
                  <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
                    {GIFTS.SPECIAL.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-white/5 w-full">
                    <p className="text-blue-200 text-2xl md:text-3xl font-serif mb-4">
                      ₹{GIFTS.SPECIAL.amount}
                    </p>
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">
                      Support Gift
                    </span>
                  </div>
                </motion.button>
              </div>

              <p className="text-center mt-12 text-white/40 text-[9px] uppercase tracking-[0.8em]">
                All contributions go directly to {YOUR_REAL_NAME} via secure UPI
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="relative z-10 w-full text-center text-white/50 text-[8px] md:text-[9px] tracking-[0.8em] md:tracking-[1em] uppercase py-6 md:py-4 border-t border-white/5">
        Developed with passion by {YOUR_REAL_NAME}
      </footer>

      <PaymentModal
        isOpen={isPayOpen}
        onClose={() => setIsPayOpen(false)}
        amount={selectedGift.amount}
        title={selectedGift.title}
      />
    </div>
  );
};
