import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- SVG ICONS (Таны өгсөн иконууд хэвээрээ) ---
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const YouTubeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
);

const DrawerSocialIcon = ({ icon }) => (
    <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm group"
         style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 227, 124, 0.3)', color: '#FFE37C' }}>
        <div className="w-4 h-4 group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_rgba(255,227,124,0.8)] transition-transform">{icon}</div>
    </div>
);

const MobileDrawer = ({ isOpen, onClose, onSelect, selectedIndex }) => {
  const navItems = [
    { id: 0, title: "БААВАР СУГАЛАА" },
    { id: 1, title: "СУГАЛАА ШАЛГАХ" },
    { id: 2, title: "ЯЛАГЧИД" },
  ];

  const drawerVariants = {
    closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 35 } },
    open: { x: "0%", transition: { type: "spring", stiffness: 300, damping: 35, staggerChildren: 0.1 } }
  };

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

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
          {/* Overlay: Бусад бүх зүйлийг бүдгэрүүлж, хамгийн наана гаргах (z-index: 9998) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9998]"
          />

          {/* Drawer Content: Хамгийн дээд давхарга (z-index: 9999) */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] z-[9999] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden border-l border-[#A6690F]/30"
            style={{ isolation: 'isolate' }} // CSS isolation нь 3D трансформтой элементүүдийн дээр гарахад тусална
          >
            {/* Background Layer */}
            <div 
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{ 
                  backgroundImage: "url('/assets/background.jpg')",
                  transform: 'scale(1.1)' 
                }}
            />
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 flex flex-col h-full px-6 py-8">
                {/* A. HEADER */}
                <motion.div variants={linkVariants} className="flex justify-between items-center mb-10 border-b border-[#FFE37C]/20 pb-5">
                    <img src="/assets/logo.png" alt="Logo" className="h-[42px] w-auto object-contain" />
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-[#FFE37C]/30 text-[#FFE37C]"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
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
                                onClick={() => { onSelect(item.id); onClose(); }}
                                className="group relative text-left w-full flex items-center justify-between"
                            >
                                <span className="block text-xl uppercase tracking-[0.1em]" style={goldenTextStyle}>
                                    {item.title}
                                </span>
                                {isSelected && (
                                    <motion.div 
                                        initial={{ x: -10, opacity: 0 }} 
                                        animate={{ x: 0, opacity: 1 }}
                                        className="text-[#FFE37C]"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                    </motion.div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* C. FOOTER */}
                <motion.div variants={linkVariants} className="mt-auto flex flex-col items-center gap-6">
                    <div className="flex gap-5">
                        <DrawerSocialIcon icon={<FacebookIcon />} />
                        <DrawerSocialIcon icon={<InstagramIcon />} />
                        <DrawerSocialIcon icon={<XIcon />} />
                        <DrawerSocialIcon icon={<YouTubeIcon />} />
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold" style={goldenTextStyle}>
                            © 2026 BaavarSugalaa.<br/>All Rights Reserved.
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
