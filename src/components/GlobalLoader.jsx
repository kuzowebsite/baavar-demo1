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
          // Хар дэвсгэртэй, бүх дэлгэцийг эзэлсэн контейнер
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* MP4 Video Player */}
          <video 
            src="/assets/Reloading.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            // object-cover нь видеог дэлгэц дүүргэж харуулна
            className="w-full h-full object-cover" 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalLoader;
