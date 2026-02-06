
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, QrCode, Heart } from 'lucide-react';
import { MY_UPI_ID, YOUR_REAL_NAME } from '../constants';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  amount: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, amount, title = "Support the Creator" }) => {
  // GPay specific parameter: mc (Merchant Category Code) or just standard UPI
  // Adding &mc=0000 and other params sometimes helps specific apps, but standard is usually enough
  const upiUrl = `upi://pay?pa=${MY_UPI_ID}&pn=${encodeURIComponent(YOUR_REAL_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(title)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative glass-card w-full max-w-md p-8 rounded-[2.5rem] border border-white/10 text-center overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-white to-blue-500" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <Heart className="w-12 h-12 text-rose-500 mx-auto mb-6 fill-rose-500/20" />
            
            <h3 className="text-2xl font-serif text-white mb-2">{title}</h3>
            <p className="text-neutral-400 text-sm mb-8 px-4">
              Help me buy this for my partner. Every contribution makes the surprise more magical.
            </p>

            <div className="bg-white/5 rounded-[2rem] p-8 mb-8 flex flex-col items-center border border-white/5">
              <p className="text-rose-200 text-5xl font-serif mb-8 glow-text">₹{amount}</p>
              
              <div className="relative group mb-6 bg-white p-2 rounded-2xl">
                <img 
                  src={qrUrl} 
                  alt="UPI QR Code" 
                  className="w-48 h-48 rounded-lg"
                />
              </div>
              <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-medium">Scan with GPay / PhonePe</p>
            </div>

            {isMobile && (
              <motion.a
                href={upiUrl}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-white text-black rounded-2xl font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-3 shadow-[0_10px_40px_rgba(255,255,255,0.15)] mb-4"
              >
                <Smartphone size={16} />
                Open GPay / UPI App
              </motion.a>
            )}

            <p className="text-[9px] text-white/20 tracking-[0.3em] uppercase font-light">
              Immediate redirect to secure payment
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
