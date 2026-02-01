import React from 'react';

const Footer = () => {
  // --- MOBILE DRAWER-ТАЙ ИЖИЛ ЗАГВАРУУД ---
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
    <footer className="relative w-full py-12 overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300;400;700&display=swap');`}
      </style>
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
          <img 
            src="/assets/background.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* --- ШИНЭЧЛЭЛ: САНГИЙН ЯАМНЫ ЗӨВШӨӨРӨЛ (TOP CENTER) --- */}
      {/* top-1 болгож дээш нь тулгав */}
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20 opacity-100 py-2">
          {/* ICON - Хэмжээг 18 болгож томруулав */}
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23 12L20.6 9.2L20.9 5.5L17.3 4.7L15.4 1.5L12 3L8.6 1.5L6.7 4.7L3.1 5.5L3.4 9.2L1 12L3.4 14.8L3.1 18.5L6.7 19.3L8.6 22.5L12 21L15.4 22.5L17.3 19.3L20.9 18.5L20.6 14.8L23 12ZM10 16.5L6 12.5L7.4 11.1L10 13.7L16.6 7.1L18 8.5L10 16.5Z" fill="white"/>
          </svg>
          
          {/* TEXT - Хэмжээг томруулав (Mobile: 12px, PC: 14px) */}
          <span 
            className="text-[12px] md:text-[14px] text-white tracking-wide whitespace-nowrap"
            style={{ 
                fontFamily: "'Montserrat Alternates', sans-serif", 
                fontWeight: '400',
                textShadow: '0 1px 3px rgba(0,0,0,0.9)'
            }}
          >
            Сангийн яамны зөвшөөрөлтэй
          </span>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-0 mt-8">
        
        {/* --- ЗҮҮН ТАЛ: Social Icons & Copyright --- */}
        <div className="flex flex-col items-center md:items-start gap-5">
            
            {/* Social Icons */}
            <div className="flex gap-4">
                <FooterSocialIcon icon={<FacebookIcon />} />
                <FooterSocialIcon icon={<InstagramIcon />} />
                <FooterSocialIcon icon={<XIcon />} />
                <FooterSocialIcon icon={<YouTubeIcon />} />
            </div>

            {/* Copyright - Алтан текст */}
            <p className="text-[10px] md:text-xs uppercase tracking-[0.15em]" style={goldenTextStyle}>
                © 2026 BaavarSugalaa. All Rights Reserved.
            </p>
        </div>

        {/* --- БАРУУН ТАЛ: Links - Алтан текст --- */}
        <div className="flex gap-6 md:gap-8 uppercase tracking-wider">
             <a href="#" className="text-[10px] md:text-xs transition-opacity hover:opacity-70" style={goldenTextStyle}>
                Cookie policy
             </a>
             <a href="#" className="text-[10px] md:text-xs transition-opacity hover:opacity-70" style={goldenTextStyle}>
                Terms & Conditions
             </a>
        </div>

      </div>
    </footer>
  );
};

// --- ТУСЛАХ КОМПОНЕНТУУД ---

const FooterSocialIcon = ({ icon }) => (
    <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm group"
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

const YouTubeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
    </svg>
);

export default Footer;
