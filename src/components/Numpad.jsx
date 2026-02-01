import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Numpad = ({ isOpen, value, onChange, onDone, maxLength = 8 }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'ABC', '0', 'backspace'];

  const handlePress = (key) => {
    if (key === 'backspace') {
      onChange(value.slice(0, -1));
    } else if (key === 'ABC') {
      // Үсэг рүү шилжих үйлдэл (Одоогоор функцгүй)
    } else {
      if (value.length < maxLength) {
        onChange(value + key);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[60] bg-[#D1D5DB] pb-8 pt-2 px-2 shadow-2xl rounded-t-[20px] max-w-[460px] mx-auto"
        >
          {/* TOP BAR */}
          <div className="flex justify-between px-4 py-2 items-center">
            <span className="text-[#007AFF] font-medium text-lg cursor-pointer" onClick={() => handlePress('ABC')}>ABC</span>
            <span className="text-[#007AFF] font-bold text-lg cursor-pointer" onClick={onDone}>Done</span>
          </div>

          {/* KEYS GRID */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {keys.map((key, index) => {
              if (key === 'backspace') {
                return (
                  <button
                    key={index}
                    onClick={() => handlePress(key)}
                    className="h-14 flex items-center justify-center active:bg-gray-400 transition-colors"
                  >
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 2H9L2 9L9 16H21V2Z" />
                      <line x1="12" y1="7" x2="18" y2="13" />
                      <line x1="18" y1="7" x2="12" y2="13" />
                    </svg>
                  </button>
                );
              }
              
              const isSpecial = key === 'ABC';
              return (
                <button
                  key={index}
                  onClick={() => !isSpecial && handlePress(key)}
                  className={`h-14 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center active:bg-gray-200 transition-colors ${isSpecial ? 'bg-transparent shadow-none' : ''}`}
                >
                  <span className="text-2xl text-black">{isSpecial ? '' : key}</span>
                  {key === '2' && <span className="text-[10px] -mt-1">A B C</span>}
                  {key === '3' && <span className="text-[10px] -mt-1">D E F</span>}
                  {key === '4' && <span className="text-[10px] -mt-1">G H I</span>}
                  {key === '5' && <span className="text-[10px] -mt-1">J K L</span>}
                  {key === '6' && <span className="text-[10px] -mt-1">M N O</span>}
                  {key === '7' && <span className="text-[10px] -mt-1">P Q R S</span>}
                  {key === '8' && <span className="text-[10px] -mt-1">T U V</span>}
                  {key === '9' && <span className="text-[10px] -mt-1">W X Y Z</span>}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Numpad;