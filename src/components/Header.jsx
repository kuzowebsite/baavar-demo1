import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Header = ({ onNavigate, selectedIndex, onMenuPressed, isMenuOpen }) => {
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem('baavar_tickets') || '[]');
    if (storedTickets.length > 0) {
        const latestTimestamp = Math.max(...storedTickets.map(t => t.timestamp));
        const latestBatch = storedTickets.filter(t => t.timestamp === latestTimestamp);
        const formattedData = latestBatch.map(t => ({
            maskedPhone: t.phoneNumber ? t.phoneNumber.substring(0, 4) : 'xxxx', 
            title: t.title,
            code: t.code,
        }));
        setTickerData(formattedData);
    }
  }, []);

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

  const goldenButtonStyle = {
      background: 'linear-gradient(180deg, #F9F0CF 0%, #E6C86E 50%, #C49F30 100%)',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.6)'
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;700&family=Play:wght@400;700&display=swap');
          
          header, img, span, button {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            backface-visibility: hidden;
            transform: translateZ(0);
          }

          @keyframes ticker {
            0% { transform: translate3d(100%, 0, 0); }
            100% { transform: translate3d(-100%, 0, 0); }
          }
          .animate-ticker {
            display: inline-block;
            white-space: nowrap;
            animation: ticker 60s linear infinite; 
            will-change: transform;
          }
        `}
      </style>

      <motion.header 
        initial={false}
        animate={{ 
          // Menu нээгдсэн үед л бүдгэрнэ, бусад үед 'none' (цэвэр зураг)
          filter: isMenuOpen ? "blur(10px)" : "none",
          opacity: isMenuOpen ? 0.6 : 1,
          scale: isMenuOpen ? 0.98 : 1 
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        // shadow-sm болон bg өнгөнүүдийг авч хаясан
        className="fixed top-0 left-0 w-full z-50 overflow-hidden"
        style={{ background: 'transparent', boxShadow: 'none' }}
      >
        
        {/* BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
                src="/assets/background.jpg" 
                alt="Header Background" 
                className="w-full h-full object-cover scale-105" 
                style={{ 
                    filter: 'none',          // Ямар ч эффект байхгүй
                    mixBlendMode: 'normal',  // Холих эффект байхгүй
                    opacity: 1,              // Бүрэн тод
                    maskImage: 'none',       // Ямар ч маск байхгүй
                    WebkitMaskImage: 'none'
                }}
                loading="eager"
            />
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto h-[70px] md:h-[100px] flex items-center justify-between px-5 md:px-8 xl:px-[120px]">
          
          {/* LOGO - 3D SHADOW EFFECT */}
          <div 
            className="cursor-pointer active:scale-95 transition-transform" 
            onClick={() => onNavigate(0)}
          >
              <img 
                src="/assets/logo.png" 
                alt="Baavar Logo" 
                className="w-[110px] md:w-[160px] xl:w-[190px] h-auto object-contain"
                style={{ 
                    imageRendering: 'auto',
                    filter: 'drop-shadow(0px 4px 5px rgba(0,0,0,0.8)) drop-shadow(0px 15px 25px rgba(0,0,0,0.5))'
                }} 
              />
          </div>

          {/* NAV BUTTONS */}
          <nav className="hidden md:flex items-center gap-6 xl:gap-[45px]">
              <NavButton 
                text="БААВАР СУГАЛАА" 
                active={selectedIndex === 0} 
                onClick={() => onNavigate(0)} 
                textStyle={goldenTextStyle}
              />
              <NavButton 
                text="СУГАЛАА ШАЛГАХ" 
                active={selectedIndex === 1} 
                onClick={() => onNavigate(1)} 
                textStyle={goldenTextStyle}
              />
              <NavButton 
                text="ЯЛАГЧИД" 
                active={selectedIndex === 2} 
                onClick={() => onNavigate(2)} 
                textStyle={goldenTextStyle}
              />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden pr-2"> 
             <button 
                onClick={onMenuPressed}
                className="p-2 flex flex-col items-center gap-[5px] bg-transparent border-none outline-none group"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <span className="w-3 h-[2px] rounded-full transition-all duration-300 group-hover:w-5" style={goldenButtonStyle}></span>
                <span className="w-5 h-[1.5px] rounded-full transition-all duration-300" style={goldenButtonStyle}></span>
                <span className="w-3 h-[2px] rounded-full transition-all duration-300 group-hover:w-5" style={goldenButtonStyle}></span>
             </button>
          </div>
        </div>
      </motion.header>
    </>
  );
};

// --- NAV BUTTON (Hover Zoom Effect Added Here) ---
const NavButton = ({ text, active, onClick, textStyle }) => (
  <motion.button 
    onClick={onClick} 
    className="relative py-1 flex flex-col items-center group overflow-visible"
    // HOVER ZOOM EFFECT:
    whileHover={{ scale: 1.1 }} 
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <span 
        className="uppercase text-[13px] xl:text-[15px] transition-all duration-300 tracking-wider"
        style={{
            ...textStyle,
            opacity: active ? 1 : 0.7,
            filter: active ? textStyle.filter : 'none'
        }}
    >
      {text}
    </span>
    
    {active && (
        <motion.div 
            layoutId="headerUnderline" 
            className="absolute -bottom-2 w-full h-[2px] shadow-[0_0_8px_#FFE37C]" 
            style={{ background: 'linear-gradient(90deg, #FFE37C 0%, #A6690F 100%)' }}
        />
    )}
  </motion.button>
);

export default Header;
