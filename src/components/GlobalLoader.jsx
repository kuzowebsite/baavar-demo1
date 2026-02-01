import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../context/LoadingContext';

const GlobalLoader = ({ forceShow }) => {
  const { isLoading } = useLoading();
  const shouldShow = isLoading || forceShow;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{
              backgroundImage: "url('/assets/background.jpg')",
              backgroundColor: '#003026' 
          }}
        >
          {/* Logo Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center mb-12" 
          >
            
            {/* 1. GIF АНИМЭЙШН (Одоо дээд талд нь байна) */}
            <img 
              src="/assets/loading-loga1.gif" 
              alt="Loading Animation" 
              // w-32 h-32 болгож томруулсан. mb-6 нь доод зурагнаасаа зай авна.
              className="w-32 h-32 object-contain mb-6" 
            />

            {/* 2. СТАТИК ЛОГО (Одоо доод талд нь байна) */}
            <img 
              src="/assets/loading-logo.png" 
              alt="Baavar Suglaa Logo" 
              className="w-60 md:w-80 object-contain drop-shadow-lg" 
            />

          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalLoader;