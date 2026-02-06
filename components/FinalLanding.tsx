import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Send,
  Sparkles,
  Coffee,
  Copy,
  Check,
  Flower2,
  Gift as GiftIcon,
  Gem,
  MessageCircle,
  Twitter,
  Instagram,
  Facebook,
  Share2,
} from "lucide-react";
import {
  DEFAULT_HER_NAME,
  FORMSPREE_ID,
  SUPPORT_AMOUNT,
  GIFTS,
  YOUR_REAL_NAME,
} from "../constants";
import { PaymentModal } from "./PaymentModal";

export const FinalLanding: React.FC = () => {
  const shareMessages = [
    "Hey! 🌷 Create a meaningful Valentine’s experience for the person you love. Simple, emotional, and unforgettable, just like the way they make you feel. Let’s begin 💖",

    "Hey! 💘 Ready to create something truly special this Valentine’s Day? Build a beautiful, cinematic love experience that speaks straight to their heart. Start now and turn your love into a moment they will cherish forever ✨",

    "Hey! ❤️ Create a heartfelt Valentine’s experience your partner will always remember. Some feelings deserve more than words, they deserve effort, care, and intention. Go ahead and make them smile today 🌸",

    "Hey! 🎬 Create a stunning, cinematic Valentine’s experience for your loved one. Not just a message, but a journey filled with emotion, memories, and meaning. Take a few minutes and create a memory they will never forget ❤️",

    "Hey! 💖 Create a beautiful, cinematic Valentine’s experience for the one who means everything to you. Turn your feelings into something unforgettable, a moment they can feel, not just read. Start now and make this Valentine’s truly special 💌",
  ];

  const getRandomMessage = () => {
    return shareMessages[Math.floor(Math.random() * shareMessages.length)];
  };
  const [showResponse, setShowResponse] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState({
    amount: SUPPORT_AMOUNT,
    title: "Show Some Love",
  });
  const [linkCopied, setLinkCopied] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const herName = params.get("to") || DEFAULT_HER_NAME;
  const encodedEmail = params.get("em");

  let targetEmail = "";
  if (encodedEmail) {
    try {
      targetEmail = atob(encodedEmail);
    } catch (e) {
      console.error("Failed to decode email");
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const triggerMagic = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 3000);
  };

  const copyLink = () => {
    const generatorLink = getGeneratorLink();
    const message = getRandomMessage();
    navigator.clipboard.writeText(`${message} ${generatorLink}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const openPayment = (amount: string, title: string) => {
    setSelectedGift({ amount, title });
    setIsPayOpen(true);
  };

  const getGeneratorLink = () => {
    return `${window.location.origin}${window.location.pathname}`.split("?")[0];
  };

  const shareOnWhatsApp = () => {
    const generatorLink = getGeneratorLink();
    const text = encodeURIComponent(`${getRandomMessage()} ${generatorLink}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareOnTwitter = () => {
    const generatorLink = getGeneratorLink();
    const text = encodeURIComponent(`${getRandomMessage()} ${generatorLink}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const shareOnFacebook = () => {
    const generatorLink = getGeneratorLink();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatorLink)}`,
      "_blank",
    );
  };

  const shareOnInstagram = () => {
    const generatorLink = getGeneratorLink();
    const message = getRandomMessage();
    navigator.clipboard.writeText(`${message} ${generatorLink}`);
    alert("Message copied! Open Instagram and paste it in your bio or DM.");
    window.open("https://instagram.com", "_blank");
  };

  const handleConfess = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const finalMsg = customMsg || message;
    if (!finalMsg.trim()) return;

    setIsSending(true);

    try {
      if (targetEmail) {
        // Use FormSubmit.co for dynamic email delivery (Free, requires one-time activation by creator)
        await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            message: finalMsg,
            _subject: `💌 New Valentine Confession from ${herName}!`,
            _template: "table",
            _captcha: "false",
          }),
        });
      } else if (FORMSPREE_ID ) {
        // Fallback to static Formspree ID if no dynamic email is provided
        await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            confession: finalMsg,
            from: herName,
            timestamp: new Date().toISOString(),
          }),
        });
      }
    } catch (err) {
      console.error("Email failed", err);
    }

    await new Promise((r) => setTimeout(r, 1500));
    setIsSending(false);
    setHasSent(true);
    triggerMagic();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <AnimatePresence>
        {showHearts && (
          <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: Math.random() * 2 + 1,
                  x: (Math.random() - 0.5) * window.innerWidth,
                  y: (Math.random() - 0.5) * window.innerHeight,
                }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute text-rose-500"
              >
                <Heart fill="currentColor" size={Math.random() * 24 + 12} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center flex flex-col items-center w-full max-w-2xl relative z-10"
      >
        <AnimatePresence mode="wait">
          {!showResponse ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center"
            >
              <p className="text-2xl md:text-4xl font-serif text-white mb-16 italic font-light">
                Will you tell me what's in your heart? <br />
                <span className="text-rose-300/80">
                  I'm waiting to hear those three words...
                </span>
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(244,63,94,0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowResponse(true)}
                    className="glass px-12 py-5 rounded-full text-white font-light tracking-[0.2em] text-sm transition-all duration-500 border border-rose-500/20"
                  >
                    CONVEY MY FEELINGS
                  </motion.button>

                  <motion.button
                    whileHover={{ opacity: 0.6 }}
                    onClick={scrollToTop}
                    className="px-12 py-5 text-white/40 font-light tracking-[0.2em] text-sm hover:text-white transition-all"
                  >
                    REPLAY OUR STORY
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center w-full"
            >
              {!hasSent ? (
                <div className="w-full space-y-8">
                  <div className="p-8 md:p-12 glass rounded-[2.5rem] text-center w-full border border-white/10">
                    <p className="text-2xl md:text-3xl font-serif text-rose-100 italic mb-6">
                      Take a moment. <br /> Close your eyes. <br /> Let your
                      heart speak.
                    </p>
                    <p className="text-neutral-500 text-[10px] tracking-widest uppercase mb-8">
                      I'm listening... always.
                    </p>

                    <div className="space-y-4">
                      <motion.button
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: "rgba(244,63,94,0.1)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          handleConfess(undefined, "I LOVE YOU ❤️")
                        }
                        disabled={isSending}
                        className="w-full py-6 glass rounded-2xl border border-rose-500/30 text-rose-200 font-serif text-2xl italic tracking-wider flex items-center justify-center gap-3"
                      >
                        <Heart className="w-5 h-5 fill-rose-500" />
                        I Love You
                        <Heart className="w-5 h-5 fill-rose-500" />
                      </motion.button>

                      <div className="relative">
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Or write something more..."
                          className="w-full h-32 bg-white/5 rounded-2xl p-6 text-white font-light text-lg font-serif placeholder:text-white/20 resize-none border border-white/5 focus:border-rose-500/20 transition-colors focus:ring-0"
                        />
                      </div>

                      <motion.button
                        onClick={(e) => handleConfess(e)}
                        disabled={isSending || !message.trim()}
                        whileHover={{ scale: 1.02 }}
                        className="w-full py-4 bg-white text-black rounded-xl font-medium tracking-widest text-xs uppercase flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSending ? "Sending to him..." : "Send Confession"}
                        <Send size={14} />
                      </motion.button>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setShowResponse(false)}
                    className="text-white/20 hover:text-white/60 text-[10px] tracking-widest uppercase transition-colors"
                  >
                    Go Back
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-12 glass rounded-[2.5rem] text-center border border-rose-500/30 w-full"
                >
                  <Sparkles className="w-12 h-12 text-rose-300 mx-auto mb-6" />
                  <h3 className="text-3xl font-serif text-white mb-4 italic">
                    Message Delivered.
                  </h3>
                  <p className="text-neutral-400 font-light leading-relaxed mb-8">
                    Thank you, {herName}. <br />
                    Your words have found their way home.
                  </p>

                  <div className="flex flex-col gap-4">
                    <div className="text-center mb-8">
                      <p className="text-2xl md:text-3xl font-serif text-white mb-2">
                        Help Another Boy Make His Girl's Day
                      </p>
                      <p className="text-neutral-400 mb-6">
                        Share the magic with others. Let them create their own
                        cinematic love story.
                      </p>

                      <div className="flex flex-wrap justify-center gap-6 mb-6">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={shareOnWhatsApp}
                          className="flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 transition-all"
                          title="Share on WhatsApp"
                        >
                          <MessageCircle className="w-8 h-8 text-[#25D366]" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={shareOnTwitter}
                          className="flex items-center justify-center w-16 h-16 rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 transition-all"
                          title="Share on Twitter"
                        >
                          <Twitter className="w-8 h-8 text-[#1DA1F2]" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={shareOnInstagram}
                          className="flex items-center justify-center w-16 h-16 rounded-full
bg-gradient-to-tr from-[#F58529]/15 via-[#DD2A7B]/15 to-[#8134AF]/15
hover:from-[#F58529]/25 hover:via-[#DD2A7B]/25 hover:to-[#8134AF]/25
border border-[#DD2A7B]/30
transition-all"
                          title="Share on Instagram"
                        >
                          <Instagram className="w-8 h-8 text-[#FD1D1D]" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={shareOnFacebook}
                          className="flex items-center justify-center w-16 h-16 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 transition-all"
                          title="Share on Facebook"
                        >
                          <Facebook className="w-8 h-8 text-[#1877F2]" />
                        </motion.button>
                      </div>

                      <p className="text-[9px] text-white/30 uppercase tracking-widest">
                        Spread the love. One cinematic moment at a time.
                      </p>
                    </div>

                    <motion.button
                      onClick={copyLink}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 rounded-full text-white/60 text-[10px] uppercase tracking-widest mx-auto hover:bg-white/10 transition-colors w-full"
                    >
                      {linkCopied ? (
                        <Check size={14} className="text-green-400" />
                      ) : (
                        <Copy size={14} />
                      )}
                      {linkCopied ? "Link Copied" : "Copy Link"}
                    </motion.button>

                    <button
                      onClick={scrollToTop}
                      className="text-white/20 hover:text-white transition-colors text-[9px] tracking-[0.3em] uppercase mt-4"
                    >
                      Start Over
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="absolute bottom-8 left-0 right-0 text-center text-[9px] tracking-[0.8em] uppercase font-light">
        A purely unique moment for{" "}
        <span className="text-white font-medium">{herName}</span>
      </footer>

      <PaymentModal
        isOpen={isPayOpen}
        onClose={() => setIsPayOpen(false)}
        amount={selectedGift.amount}
        title={selectedGift.title}
      />
    </section>
  );
};
