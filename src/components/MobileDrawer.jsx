import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- SVG ICONS ---
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

// Шинээр нэмэгдсэн YouTube икон
const YouTubeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

// Сошиал иконы загвар
const DrawerSocialIcon = ({ icon }) => (
    <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm group"
         style={{ 
             background: 'rgba(255, 255, 255, 0.05)', 
             border: '1px solid rgba(255, 227, 124, 0.3)', 
             color: '#FFE37C' 
         }}
    >
        <div className="w-4 h-4 group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_rgba(255,227,124,0.8)] transition-transform">
            {icon}
        </div>
    </div>
);

const MobileDrawer = ({ isOpen, onClose, onSelect, selectedIndex }) => {
  
  const navItems = [
    { id: 0, title: "БААВАР СУГАЛАА" },
    { id: 1, title: "СУГАЛАА ШАЛГАХ" },
    { id: 2, title: "ЯЛАГЧИД" },
  ];

  const drawerVariants = {
    closed: { 
        x: "100%",
        transition: { type: "spring", stiffness: 300, damping: 35 }
    },
    open: { 
        x: "0%",
        transition: { type: "spring", stiffness: 300, damping: 35, staggerChildren: 0.1 }
    }
  };

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  // --- STYLE OBJECTS ---
  const goldenTextStyle = {
      fontFamily: "'Montserrat Alternates', sans-serif",
      fontWeight: '700',
      background: 'linear-gradient(90deg, #FFE37C 0%, #A6690F 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent',
      filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <style>
            {`@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;700&display=swap');`}
          </style>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] z-[70] flex flex-col shadow-2xl overflow-hidden border-l border-[#A6690F]/30"
          >
            
            <div 
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: "url('/assets/background.jpg')" }}
            />
            
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 flex flex-col h-full px-6 py-8">

                {/* A. HEADER */}
                <motion.div variants={linkVariants} className="flex justify-between items-center mb-10 border-b border-[#FFE37C]/20 pb-5">
                    <img 
                        src="/assets/logo.png" 
                        alt="Logo" 
                        className="w-auto object-contain"
                        style={{ 
                            height: '42px',
                            imageRendering: '-webkit-optimize-contrast',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.4))'
                        }} 
                    />
                    
                    <button 
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-[#FFE37C]/30 text-[#FFE37C] hover:bg-[#FFE37C]/10 transition-all duration-300"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </motion.div>


                {/* B. MENU LINKS */}
                <div className="flex-1 flex flex-col gap-8 justify-start pt-2">
                    {navItems.map((item) => {
                        const isSelected = selectedIndex === item.id;
                        return (
                            <motion.button
                                key={item.id}
                                variants={linkVariants}
                                onClick={() => onSelect(item.id)}
                                className="group relative text-left w-full flex items-center justify-between"
                            >
                                <span 
                                    className={`block text-lg uppercase tracking-[0.1em] transition-all duration-300 opacity-100`}
                                    style={goldenTextStyle}
                                >
                                    {item.title}
                                </span>

                                <AnimatePresence>
                                    {isSelected && (
                                        <motion.div
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: -10, opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="text-[#FFE37C]" 
                                            style={{ filter: 'drop-shadow(0px 0px 5px #A6690F)' }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </div>


                {/* C. FOOTER */}
                <motion.div variants={linkVariants} className="mt-auto flex flex-col items-center gap-5">
                    
                    {/* Social Icons Container - YouTube нэмэгдсэн */}
                    <div className="flex gap-4">
                        <DrawerSocialIcon icon={<FacebookIcon />} />
                        <DrawerSocialIcon icon={<InstagramIcon />} />
                        <DrawerSocialIcon icon={<XIcon />} />
                        <DrawerSocialIcon icon={<YouTubeIcon />} />
                    </div>

                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold" 
                           style={{ 
                               ...goldenTextStyle, 
                               fontSize: '9px',
                               letterSpacing: '0.2em'
                           }}>
                            © 2026 BaavarSugalaa.<br/>
                            All Rights Reserved.
                        </p>
                    </div>
                </motion.div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;