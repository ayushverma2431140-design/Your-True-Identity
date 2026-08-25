/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check } from 'lucide-react';

type Gender = 'male' | 'female' | 'gay' | null;

export default function App() {
  const [selectedGender, setSelectedGender] = useState<Gender>(null);
  const [copied, setCopied] = useState(false);

  const getMessage = () => {
    switch (selectedGender) {
      case 'male':
        return 'u are gay 😂';
      case 'female':
        return 'L@ud! 🤣';
      case 'gay':
        return 'i know u are gay 🏳️‍🌈';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE600] flex flex-col items-center justify-center overflow-hidden p-4 relative font-sans text-black">
      <div className="absolute top-10 left-10 w-48 h-48 md:w-64 md:h-64 bg-[#FF3366] rounded-full mix-blend-multiply opacity-50 blur-2xl md:blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 md:w-96 md:h-96 bg-[#00AEEF] rounded-full mix-blend-multiply opacity-50 blur-2xl md:blur-3xl pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {!selectedGender ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 flex flex-col items-center w-full max-w-4xl"
          >
            <h1 className="text-5xl md:text-[80px] font-black italic tracking-tighter leading-none mb-4 md:mb-8 uppercase text-black border-b-[6px] md:border-b-[10px] border-black pb-4 text-center">
              The Truth Oracle
            </h1>
            <p className="text-xl md:text-2xl font-bold mb-12 md:mb-16 tracking-wide uppercase opacity-80 text-center">
              Select your identity to reveal your inner spirit animal
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 w-full px-4">
              <button
                onClick={() => { setSelectedGender('male'); }}
                className="bg-white border-[4px] md:border-[6px] border-black p-6 md:p-8 text-3xl md:text-4xl font-black uppercase hover:translate-x-1 hover:-translate-y-1 md:hover:translate-x-2 md:hover:-translate-y-2 transition-transform duration-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
              >
                Male
              </button>
              <button
                onClick={() => { setSelectedGender('female'); }}
                className="bg-white border-[4px] md:border-[6px] border-black p-6 md:p-8 text-3xl md:text-4xl font-black uppercase hover:translate-x-1 hover:-translate-y-1 md:hover:translate-x-2 md:hover:-translate-y-2 transition-transform duration-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
              >
                Female
              </button>
              <button
                onClick={() => { setSelectedGender('gay'); }}
                className="bg-white border-[4px] md:border-[6px] border-black p-6 md:p-8 text-3xl md:text-4xl font-black uppercase hover:translate-x-1 hover:-translate-y-1 md:hover:translate-x-2 md:hover:-translate-y-2 transition-transform duration-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
              >
                Gay
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100 }}
            className="fixed inset-0 z-50 bg-[#FF3366] flex flex-col items-center justify-center p-4 text-center"
          >
            <div className="border-[8px] md:border-[12px] border-black bg-white p-10 md:p-20 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] md:shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] -rotate-2 max-w-full overflow-hidden flex flex-col items-center">
              <h1 
                className="text-6xl md:text-[100px] lg:text-[120px] font-black uppercase leading-tight md:leading-none mb-10 text-black break-words"
                style={{ fontFamily: "'Bangers', system-ui, cursive", letterSpacing: '2px' }}
              >
                {getMessage()}
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => { setSelectedGender(null); setCopied(false); }}
                  className="bg-black text-white px-8 py-4 text-lg md:text-xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                  Start Over
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(getMessage());
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="bg-white text-black border-4 border-black px-8 py-4 text-lg md:text-xl font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check size={24} /> : <Copy size={24} />}
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
