import React, { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Mousewheel, Navigation } from 'swiper/modules'; 
import PurchaseDialog from './PurchaseDialog'; 

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CardContent = ({ item, isMobile, handlePurchaseClick }) => {
  const gradientId = `starGradient-${item.uniqueId}`;

  // Function to get button color based on lottery ID
  const getButtonColor = (itemId) => {
    const colors = {
      1: '#2563EB', // LEXUS RX - Bright Blue
      2: '#EF4444', // ХУРДАН МОРЬ - Vibrant Red
      3: '#D97706', // 9.999.999₮ - Amber
      4: '#8B5CF6', // IPHONE 17 - Purple
      5: '#059669', // 1.000.000₮ - Emerald
    };
    return colors[itemId] || '#FF6060';
  };

  const getTitleStyle = (title) => {
    const length = title.length;
    let fontSize;
    
    if (isMobile) {
      if (length > 25) fontSize = '14px'; 
      else if (length > 15) fontSize = '18px'; 
      else fontSize = '22px'; 
    } else {
      if (length > 20) fontSize = '24px';
      else fontSize = '36px';
    }

    return {
      fontFamily: 'Roboto, sans-serif', 
      fontWeight: 900, 
      fontSize: fontSize, 
      color: '#FFFFFF', 
      margin: isMobile ? '8px 0 0 0' : '10px 0 0 0', 
      textTransform: 'uppercase', 
      lineHeight: '1.2', 
      textAlign: 'center',
      textShadow: '0px 2px 4px rgba(0,0,0,0.8)', 
      whiteSpace: 'normal', 
      wordBreak: 'break-word',
      width: '100%',
      display: 'block',
      paddingBottom: '0px',
      letterSpacing: '0.5px', 
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      transform: 'perspective(1px) translateZ(0)', 
      backfaceVisibility: 'hidden',
    };
  };

  return (
    <div className="w-full h-full flex flex-col items-center flex-grow">
      {/* 1. PROGRESS BAR */}
      <div className="w-full relative z-30 bg-[#0f172a]" style={{ marginBottom: '0px', flexShrink: 0 }}>
        <div className="w-full h-[6px] md:h-[8px] bg-white overflow-visible relative">
          <div style={{ 
              width: `${item.fillPercent}%`,
              background: 'linear-gradient(90deg, #A54400 0%, #FAE8B2 20%, #EFC140 40%, #C26C0D 60%, #FFE89C 80%, #A54400 100%)'
            }} 
            className="h-full relative">
            
            <div className="absolute" 
              style={{ 
                right: '-16px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                zIndex: 30,
                filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))'
              }}>
              <svg width={isMobile ? "40" : "55"} height={isMobile ? "40" : "55"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A54400" />
                    <stop offset="25%" stopColor="#FEF5BA" />
                    <stop offset="50%" stopColor="#C26C0D" />
                    <stop offset="75%" stopColor="#FDF5B9" />
                    <stop offset="100%" stopColor="#A54400" />
                  </linearGradient>
                </defs>
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  fill={`url(#${gradientId})`} stroke="white" strokeWidth="1"/>
              </svg>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full h-full">
                <span style={{ 
                    fontSize: isMobile ? '8px' : '10px', 
                    fontWeight: '900', 
                    color: '#000000', 
                    lineHeight: '1', 
                    textAlign: 'center',
                    display: 'block',
                    transform: 'perspective(1px) translateZ(0)',
                    backfaceVisibility: 'hidden',
                  }}>
                  {item.fillPercent}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 2. МЭДЭЭЛЛИЙН ХЭСЭГ */}
      <div className="w-full relative z-20 flex flex-col items-center overflow-hidden"
        style={{
          borderBottomLeftRadius: isMobile ? '18px' : '38px',
          borderBottomRightRadius: isMobile ? '18px' : '38px',
          marginTop: '0px', 
          marginBottom: '0px', // ЗАСВАР: -1px байсныг 0px болгов (Доорх заагийг арилгахын тулд)
          flexShrink: 0, 
          minHeight: 0 
        }}>
        
        {/* АРЫН ФОН */}
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: "url('assets/background.jpg')",
            backgroundColor: '#ffffff',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 1, 
            mixBlendMode: 'normal',
            zIndex: 0
        }}></div>

        {/* ҮНДСЭН КОНТЕНТ */}
        <div className="w-full flex flex-col items-center relative z-10"
             style={{
               paddingLeft: isMobile ? '20px' : '40px',
               paddingRight: isMobile ? '20px' : '40px',
               paddingBottom: '8px', 
               paddingTop: '0px',
             }}>
          
            <h3 style={getTitleStyle(item.title)}>{item.title}</h3>
            
            <div style={{ 
              width: '100%', 
              height: '1px', 
              backgroundColor: '#D9D9D9', 
              marginTop: '0px', 
              marginBottom: '4px' 
            }}></div>
            
            <div className="w-full flex items-stretch justify-between" style={{ marginTop: '4px', marginBottom: '0', gap: '8px' }}>
              
              {/* ҮНЭ */}
              <div className="flex items-center justify-center shadow-md sharp-text-container" 
                style={{ 
                  backgroundColor: '#F8BE53', 
                  borderRadius: '8px', 
                  padding: isMobile ? '4px 8px' : '4px 16px',
                  flex: 1,
                  transform: 'translate3d(0,0,0)',
                  backfaceVisibility: 'hidden'
                }}>
                <span className="font-bold text-black text-[12px] md:text-[18px]" 
                      style={{ 
                        fontWeight: '900', 
                        letterSpacing: '0.5px',
                        WebkitFontSmoothing: 'subpixel-antialiased', 
                        MozOsxFontSmoothing: 'auto',
                        transform: 'perspective(1px) translateZ(0)',
                        backfaceVisibility: 'hidden',
                        display: 'inline-block'
                      }}>
                  {item.displayPrice}
                </span>
              </div>

              {/* ТОВЧ */}
              <button onClick={(e) => { e.stopPropagation(); handlePurchaseClick(item); }}
                className="flex items-center justify-center shadow-lg hover:brightness-110 transition-all active:scale-95 sharp-text-container" 
                style={{ 
                  backgroundColor: getButtonColor(item.id),
                  borderRadius: '8px', 
                  padding: isMobile ? '0 8px' : '0 16px',
                  cursor: 'pointer', border: 'none',
                  flex: 1.5,
                  transform: 'translate3d(0,0,0)',
                  backfaceVisibility: 'hidden'
                }}>
                <span className="font-bold text-white text-[12px] md:text-[16px] uppercase whitespace-nowrap" 
                      style={{ 
                        fontWeight: '900', 
                        letterSpacing: '0.5px', 
                        textShadow: '0 1px 1px rgba(0,0,0,0.2)',
                        WebkitFontSmoothing: 'subpixel-antialiased', 
                        MozOsxFontSmoothing: 'auto',
                        transform: 'perspective(1px) translateZ(0)', 
                        backfaceVisibility: 'hidden',
                        display: 'inline-block'
                      }}>
                  Шууд оролцох
                </span>
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

const BodyContent = ({ onLottoClick }) => { 
  const [swiperRef, setSwiperRef] = useState(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false); 
  const [isPhone, setIsPhone] = useState(false);
  const [isSmallPhone, setIsSmallPhone] = useState(false);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [selectedLotto, setSelectedLotto] = useState(null);
  const [mobileSlideSize, setMobileSlideSize] = useState({ width: 290, height: 356 });
  const [isInteracting, setIsInteracting] = useState(false);

  // Дэлгэцийн өргөнийг хадгалах
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const designWidth = 1920;
      const designHeight = 1080;
      const wWidth = window.innerWidth;
      const wHeight = window.innerHeight;

      setWindowWidth(wWidth);

      const mobileCheck = wWidth <= 1024;
      setIsMobile(mobileCheck);

      const phoneCheck = wWidth < 740;
      setIsPhone(phoneCheck);

      const smallPhoneCheck = wWidth <= 400 && wHeight <= 750;
      setIsSmallPhone(smallPhoneCheck);

      if (mobileCheck) {
        setScale(1); 
        if (wWidth >= 740) {
          setMobileSlideSize({ width: 330, height: 420 });
        } else {
          setMobileSlideSize({ width: 250, height: 336 });
        }
      } else {
        const widthScale = wWidth / designWidth;
        const heightScale = wHeight / designHeight;
        const finalScale = Math.min(widthScale, heightScale) * (wWidth < 1500 ? 0.95 : 0.9); 
        setScale(finalScale);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const baseLottoList = [
    { id: 1, title: "LEXUS RX", price: "30,000₮", displayPrice: "30,000₮", imageUrl: "/suglaa/1.png", type: "Баавар сугалаа", fillPercent: 90 },
    { id: 2, title: "ХУРДАН МОРЬ", price: "5,000₮", displayPrice: "5,000₮", imageUrl: "/suglaa/2.png", type: "Монгол сугалаа", fillPercent: 45 },
    { id: 3, title: "9.999.999₮", price: "20,000₮", displayPrice: "20,000₮", imageUrl: "/suglaa/3.png", type: "Саятан сугалаа", fillPercent: 70 },
    { id: 4, title: "IPHONE 17", price: "10,000₮", displayPrice: "10,000₮", imageUrl: "/suglaa/4.png", type: "iPhone сугалаа", fillPercent: 20 },
    { id: 5, title: "1.000.000₮", price: "0₮", displayPrice: "Үнэгүй", imageUrl: "/suglaa/5.png", type: "Үнэгүй сугалаа", fillPercent: 10 },
  ];

  const displayList = useMemo(() => {
    return [...baseLottoList, ...baseLottoList, ...baseLottoList].map((item, index) => ({
      ...item,
      uniqueId: `${item.id}-${index}`
    }));
  }, []);

  const DESKTOP_SLIDE_WIDTH = 540; 
  const DESKTOP_SLIDE_HEIGHT = 650;
  
  // Notebook хэмжээнүүдийн хувьд жижигрүүлсэн хэмжээ
  const isNotebook = windowWidth >= 1025 && windowWidth < 1400;
  const NOTEBOOK_SLIDE_WIDTH = 420;
  const NOTEBOOK_SLIDE_HEIGHT = 500;
  
  const SLIDE_WIDTH_ACTIVE = isMobile ? mobileSlideSize.width : (isNotebook ? NOTEBOOK_SLIDE_WIDTH : DESKTOP_SLIDE_WIDTH);
  const SLIDE_HEIGHT_ACTIVE = isMobile ? mobileSlideSize.height : (isNotebook ? NOTEBOOK_SLIDE_HEIGHT : DESKTOP_SLIDE_HEIGHT);
  const CONTAINER_HEIGHT = 760;

  const handlePurchaseClick = (item, isActive) => {
    if (isActive === false) return; 

    sessionStorage.setItem('currentLottoType', item.type);
    sessionStorage.setItem('currentLottoTitle', item.title);
    sessionStorage.setItem('currentLottoImage', item.imageUrl);
    setSelectedLotto(item);
    setShowPurchaseDialog(true);
  };

  const closePurchaseDialog = () => {
    setShowPurchaseDialog(false);
    setSelectedLotto(null);
  };

  // --- HELPER: Image Size & Position Logic ---
  const getImageStyles = () => {
    if (windowWidth <= 320) return { width: '135px', left: '-34px', bottom: '0' };
    if (windowWidth <= 333) return { width: '155px', left: '-45px', bottom: '0' };
    if (windowWidth <= 344) return { width: '200px', left: '-65px', bottom: '0' };
    if (windowWidth <= 360) return { width: '140px', left: '-30px', bottom: '0' };
    if (windowWidth <= 375) return { width: '140px', left: '-30px', bottom: '0' };
    if (windowWidth <= 391) return { width: '200px', left: '-50px', bottom: '0' };
    if (windowWidth <= 400) return { width: '260px', left: '-80px', bottom: '0' };
    if (windowWidth <= 414) return { width: '180px', left: '-40px', bottom: '0' };
    if (windowWidth < 768) return { width: '270px', left: '-80px', bottom: '0' };
    if (windowWidth >= 768 && windowWidth < 1024) return { width: '200px', left: '-40px', bottom: '0' }; 
    return { width: '0px', left: '0px', bottom: '0', display: 'none' }; 
  };

  // --- HELPER: Text Position Logic ---
  const getTextStyles = () => {
    if (windowWidth <= 320) return { bottom: '20%' };
    if (windowWidth <= 333) return { bottom: '23%' };
    if (windowWidth <= 344) return { bottom: '26%' };
    if (windowWidth <= 360) return { bottom: '20%' };
    if (windowWidth <= 375) return { bottom: '19%' };
    if (windowWidth <= 391) return { bottom: '26%' };
    if (windowWidth <= 400) return { bottom: '29%' };
    if (windowWidth <= 414) return { bottom: '23%' };
    if (windowWidth < 767) return { bottom: '30%' };
    if (windowWidth < 819) return { bottom: '27%' };
    if (windowWidth >= 820 && windowWidth < 1024) return { bottom: '36%' };
    return { display: 'none' };
  };

  // =========================================================================
  // 🎨 BLOOM ЗУРГИЙН ХЭМЖЭЭГ БҮХ ТӨХӨӨРӨМЖ ДЭЭР НАРИЙН ТОХИРУУЛАХ ФУНКЦ
  // =========================================================================
  const getBloomStyle = () => {
    const w = windowWidth;

    // --- NOTEBOOK ХЭМЖЭЭНҮҮД (1025px - 1400px) ---
    if (w >= 1025 && w < 1400) {
      return {
        containerTop: '-80px',    
        width: '100%',
        top: '0%',
        left: '0',
        transform: 'none',
        scale: 2.4,
        effectWidth: '22%'
      };
    }

    // --- 1. ЖИЖИГ УТАСНУУД (Small Mobile) ---
    if (w < 360) {
      return {
        containerTop: '-40px',     
        width: '180%',             
        top: '-10%',               
        left: '50%',               
        transform: 'translateX(0%)',
        scale: 1.0,                 
        effectWidth: '55%'         
      };
    }

    // --- 2. ДУНДАЖ УТАСНУУД (Standard Mobile) ---
    else if (w >= 360 && w < 390) {
      return {
        containerTop: '-50px',
        width: '160%',             
        top: '-15%',
        left: '50%',
        transform: 'translateX(15%)',
        scale: 1.3,
        effectWidth: '50%'
      };
    }

    // --- 3. ТОМ УТАСНУУД (Large Mobile / Plus / Max) ---
    else if (w >= 390 && w < 430) {
      return {
        containerTop: '-60px',
        width: '150%',             
        top: '0%',
        left: '50%',
        transform: 'translateX(15%)',
        scale: 1.3,
        effectWidth: '55%'
      };
    }

    // --- 4. ӨРГӨН УТАС БА ЖИЖИГ TABLET (Foldables / Phablets) ---
    else if (w >= 430 && w < 768) {
      return {
        containerTop: '20px',      
        width: '200%',
        top: '-25%',
        left: '50%',
        transform: 'translateX(30%)',
        scale: 1.6,
        effectWidth: '36%'
      };
    }

    // --- 5. TABLET БОЛОН IPAD (Portrait Mode) ---
    else if (w >= 768 && w < 1024) {
      return {
        containerTop: '40px',
        width: '100%',             
        top: '-30%',
        left: '0',
        transform: 'none',
        scale: 1.6,                
        effectWidth: '45%'
      };
    }

    else if (w >= 1024 && w < 1280) {
      return {
        containerTop: '40px',
        width: '100%',             
        top: '-30%',
        left: '0',
        transform: 'none',
        scale: 1.6,                
        effectWidth: '45%'
      };
    }

    // --- 6. ЖИЖИГ LAPTOP БА ТОМ TABLET (Landscape) ---
    else if (w >= 1280 && w < 1400) {
      return {
        containerTop: '-100px',    
        width: '120%',
        top: '-36%',
        left: '10%',
        transform: 'translateX(-10%)',
        scale: 2.0,
        effectWidth: '26%'
      };
    }

    // --- 7. ДУНДАЖ LAPTOP (Standard Laptop) ---
    else if (w >= 1400 && w < 1600) {
      return {
        containerTop: '-100px',
        width: '120%',
        top: '0%',
        left: '0',
        transform: 'none', 
        scale: 2.0,
        effectWidth: '26%'
      };
    }

    // --- 8. DESKTOP / ТОМ ДЭЛГЭЦ (Full HD & 4K) ---
    else {
      return {
        containerTop: '-140px',
        width: '120%',             
        top: '10%',
        left: '0',
        transform: 'none',
        scale: 2.0,
        effectWidth: '18%'
      };
    }
  };

  const imageStyle = getImageStyles();
  const textPos = getTextStyles();
  const bloomStyles = getBloomStyle(); 

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300;400;700;900&family=Roboto:wght@400;700;900&display=swap');
          
          body, html, #root {
             -webkit-font-smoothing: antialiased !important;
             -moz-osx-font-smoothing: grayscale !important;
             text-rendering: optimizeLegibility !important;
          }

          .sharp-text-container {
             transform: translate3d(0, 0, 0); 
             backface-visibility: hidden;
             perspective: 1000px;
          }

          /* --- HEADER Z-INDEX FIXED TO 9999 TO COVER EVERYTHING --- */
          header, .header-container {
            position: fixed !important; top: 0; left: 0; width: 100%; z-index: 9999 !important; background: transparent;
          }

          .mobile-title-container, .desktop-title-container { z-index: 110 !important; }

          .custom-swiper { 
            width: 100%; height: 100%; padding-top: 10px; padding-bottom: 10px; overflow: visible !important; 
          }
          .swiper-wrapper { align-items: center; transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1) !important; }
          
          .swiper-slide { 
              width: ${isMobile ? mobileSlideSize.width : (isNotebook ? NOTEBOOK_SLIDE_WIDTH : DESKTOP_SLIDE_WIDTH)}px !important; 
              height: ${isMobile ? mobileSlideSize.height : (isNotebook ? NOTEBOOK_SLIDE_HEIGHT : DESKTOP_SLIDE_HEIGHT)}px !important; 
              transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease, filter 0.4s ease; 
              border-radius: ${isMobile ? '20px' : '40px'} !important; 
              overflow: visible !important; 
              user-select: none; background-color: #0f172a; z-index: 10; 
              cursor: pointer;
              transform-style: preserve-3d;
              backface-visibility: hidden;
              will-change: transform; 
          }

          @media (min-width: 1025px) {
            .swiper-slide-active .lottery-card-hover:hover {
               transform: scale(1.05); z-index: 200; box-shadow: 0 25px 60px rgba(0,0,0,0.7);
            }
          }

          @media (max-width: 739px) {
             .swiper-slide-active { 
                filter: blur(0px) !important; opacity: 1 !important; z-index: 100 !important;
                box-shadow: 0 10px 30px rgba(0,0,0,0.8) !important;
             }
             .swiper-slide-active .w-full {
                transform: translateZ(0); 
                backface-visibility: hidden;
             }
             
             .swiper-slide { filter: blur(2px); opacity: 0.8; }
             
             /* ЭНД ӨӨРЧЛӨЛТ ОРСОН: Цаашаагаа (Z-axis) жижгэрч алга болох эффект */
             .swiper-slide-prev { 
                opacity: 0 !important; 
                visibility: hidden !important; 
                pointer-events: none !important;
                /* Дээшээ 500% шидэхгүйгээр, бага зэрэг дээшлээд гүн рүү (Z) түлхэж, жижгэрүүлнэ */
                transform: translate3d(0, -50px, -400px) scale(0.6) !important; 
                z-index: -100 !important;
             }

             .swiper-slide-next {
                opacity: 0.6 !important; filter: blur(4px) !important; z-index: 50 !important; visibility: visible !important;
             }
             .swiper-slide-next ~ .swiper-slide { opacity: 0 !important; visibility: hidden !important; }
          }

          @media (min-width: 740px) {
             .swiper-slide { filter: blur(5px) !important; opacity: 0.9 !important; transform: scale(1) !important; }
             .swiper-slide-active {
                filter: blur(0px) !important; opacity: 1 !important; z-index: 150 !important; 
                box-shadow: 0 15px 40px rgba(0,0,0,0.55);
             }
             .swiper-slide-prev, .swiper-slide-next { 
                 opacity: 0.8 !important; 
                 pointer-events: auto !important; 
             }
          }

          .swiper-slide img { 
             width: 100%; height: 100%; object-fit: cover; border-radius: ${isMobile ? '20px' : '40px'} !important;
             image-rendering: -webkit-optimize-contrast;
          }
          
          .swiper-slide-active { 
              width: ${SLIDE_WIDTH_ACTIVE}px !important; height: ${SLIDE_HEIGHT_ACTIVE}px !important; 
              filter: blur(0px) !important; opacity: 1 !important; z-index: 100 !important; 
              background-color: transparent; box-shadow: 0 15px 40px rgba(0,0,0,0.55); 
              border-radius: ${isMobile ? '20px' : '40px'} !important;
          }
          .swiper-slide-active img { border-radius: 0 !important; }

          .effect-image {
            animation: none;
            display: block;
            object-fit: contain;
            mix-blend-mode: screen;
          }

          @media (max-width: 739px) {
              .custom-swiper { 
        padding-top: 0px !important; 
        padding-bottom: 80px !important; 
        overflow: visible !important; 
    }
          }
          
          @media (min-width: 740px) and (max-width: 1025px) {
              .mobile-title-container { margin-top: 100px !important; display: flex !important; position: relative !important; z-index: 60 !important; }
              .swiper-container-wrapper { margin-top: 20px !important; z-index: 10 !important; }
              .mobile-host-container { position: absolute !important; transform: none !important; z-index: 999 !important; pointer-events: none; }
          }
          @media (min-width: 740px) and (max-width: 815px) {
              .mobile-host-container { bottom: -60px !important; left: -50px !important; }
              .mobile-host-container img { height: 480px !important; }
          }
          @media (min-width: 816px) and (max-width: 1000px) {
              .mobile-host-container { bottom: -10px !important; left: -82px !important; }
              .mobile-host-container img { height: 620px !important; }
          }
          @media (min-width: 1001px) and (max-width: 1025px) {
              .mobile-host-container { bottom: 100px !important; left: -40px !important; }
              .mobile-host-container img { height: 720px !important; }
              .mobile-title { font-size: 42px !important; }
          }
          @media (max-width: 380px) {
            .mobile-title { font-size: 20px !important; }
            .mobile-title-container { margin-bottom: 10px !important; }
          }
        `}
      </style>

      {/* --- FIXED BACKGROUND --- */}
      <div 
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundImage: "url('assets/background.jpg')", backgroundSize: 'cover',
          backgroundPosition: 'center', backgroundRepeat: 'no-repeat', zIndex: 0, pointerEvents: 'none' 
        }}
      />

      {/* Main Container */}
      <div className={`w-full relative flex`} 
           style={{ 
               height: isPhone ? '100vh' : '100%', 
               minHeight: isMobile ? '100vh' : '600px', 
               flexDirection: 'column', 
               justifyContent: isPhone ? 'flex-start' : (isMobile ? 'flex-start' : 'center'), 
               alignItems: 'center', paddingTop: isMobile ? '0px' : '0', overflow: 'hidden', backgroundColor: 'transparent' 
           }}>
          
          <div className="relative" 
               style={{ 
                   width: isMobile ? '100%' : '1920px', 
                   height: isPhone ? '100%' : (isMobile ? '100%' : `${CONTAINER_HEIGHT}px`), 
                   transform: isMobile ? 'none' : `scale(${scale})`, 
                   transformOrigin: 'center center',
                   display: isPhone ? 'flex' : (isMobile ? 'flex' : 'block'),
                   flexDirection: isMobile ? 'column' : 'row',
                   alignItems: 'center', zIndex: isMobile ? 'auto' : 1200, position: 'relative'
               }}>
            
            {/* ГАРЧИГ / EFFECT IMAGE ХЭСЭГ */}
            <div className={`mobile-title-container ${isMobile ? "w-full flex flex-col items-center justify-center px-4 shrink-0" : "absolute w-full flex justify-center z-10"}`} 
                 style={{ 
                    position: isPhone ? 'fixed' : (isMobile ? 'relative' : 'absolute'),
                    // getBloomStyle функцээс ирсэн containerTop-ийг ашиглана
                    marginTop: isMobile ? bloomStyles.containerTop : '-140px', 
                    top: isPhone ? (isSmallPhone ? '60px' : '50px') : (isMobile ? 'auto' : '50px'),
                    marginBottom: isPhone ? '-40px' : '0', paddingBottom: isPhone ? '0px' : '0',
                    zIndex: 110, flexShrink: 0, pointerEvents: 'none', 
                    left: isPhone ? 0 : 'auto', 
                    width: '100%'
                 }}>

              {/* Image Container */}
              <div style={{
                position: 'relative', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                // Функцээс ирсэн өргөн ба байрлалууд:
                width: bloomStyles.width, 
                maxWidth: isMobile ? '180%' : '100%',
                height: isSmallPhone ? '160px' : (isPhone ? '200px' : (isMobile ? '180px' : '180px')),
                transform: bloomStyles.transform, // X тэнхлэгийн дагуу төвлөрүүлэх
                left: isMobile ? '0' : '0', 
              }}>
                <div style={{
                    position: 'absolute', 
                    // Функцээс ирсэн нарийн тохиргоонууд:
                    left: bloomStyles.left === '50%' ? '50%' : bloomStyles.left,
                    top: bloomStyles.top,
                    transform: bloomStyles.left === '50%' ? 'translateX(-50%)' : 'none',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    pointerEvents: 'none', 
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    scale: bloomStyles.scale // Томруулах/Жижигрүүлэх
                }}>
                    <img src="assets/Bloom.png" alt="Bloom"
                        style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'screen', position: 'absolute', top: 0, left: 0 }}
                    />
                    <img src="assets/effect.png" alt="Lottery Effect" className="effect-image"
                        style={{ 
                          position: 'absolute', 
                          objectFit: 'contain', 
                          mixBlendMode: 'normal', 
                          top: '65%', 
                          left: '50%', 
                          transform: 'translate(-50%, -50%)',
                          width: isMobile ? bloomStyles.effectWidth : '18%', // Effect-ийн хэмжээг мөн тааруулав
                          height: 'auto'
                        }}
                    />
                </div>

                {!isMobile && (
                  <div style={{ position: 'absolute', right: '200px', top: '91%', transform: 'translateY(-50%)', zIndex: 20, display: 'flex', flexDirection: 'row', gap: '10px', pointerEvents: 'auto' }}>
                    <button onClick={() => swiperRef?.slidePrev()} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }} className="hover:bg-white/20 hover:scale-110">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button onClick={() => swiperRef?.slideNext()} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }} className="hover:bg-white/20 hover:scale-110">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {!isMobile && (
              <div className="absolute pointer-events-none" style={{ left: '80px', bottom: '-30px', height: 'auto', top: '140px', zIndex: 9999 }}>
                <img src="/assets/mongolian-woman.png" alt="Host" style={{ height: '780px', width: 'auto', objectFit: 'contain' }} />
              </div>
            )}

            {/* SWIPER CONTAINER - MASK ADDED HERE TO HIDE CONTENT BEHIND HEADER */}
            <div className={`swiper-container-wrapper ${isMobile ? "w-full relative" : "absolute w-full"}`} 
                 style={{ 
                     flexGrow: isPhone ? 0 : 0, 
                     height: isPhone ? `${mobileSlideSize.height + 400}px` : (isMobile ? `${mobileSlideSize.height}px` : '700px'), 
                     minHeight: isPhone ? '0' : 'auto', 
                     top: (isPhone && window.innerWidth === 428) ? '-50px' : (isMobile ? '10px' : (isNotebook ? '40px' : '120px')),
                     marginTop: isMobile ? (isSmallPhone ? '60px' : (isPhone ? '80px' : '-8px')) : '0', 
                     display: 'flex', alignItems: isPhone ? 'flex-start' : 'center', justifyContent: 'center', zIndex: 10,
                     // 🎨 ШИНЭЧЛЭГДСЭН ХЭСЭГ: MASKING
                     // Header-ийн доороос 20% хүртэл уусгаж харуулах (Дээд хэсэг нь transparent)
                     WebkitMaskImage: 'none',
maskImage: 'none'
                 }}>
                
                {isMobile && !isPhone && (
                  <>
                    <button onClick={() => swiperRef?.slidePrev()} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 200, opacity: isInteracting ? 0 : 1, transition: 'opacity 0.3s ease', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                       <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button onClick={() => swiperRef?.slideNext()} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 200, opacity: isInteracting ? 0 : 1, transition: 'opacity 0.3s ease', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                       <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </>
                )}

                <Swiper
                    onSwiper={setSwiperRef}
                    direction={isPhone ? 'vertical' : 'horizontal'} 
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    centeredSlidesBounds={true}
                    slidesPerView={'auto'}
                    loop={true}
                    speed={500}
                    mousewheel={isPhone ? true : false} 
                    spaceBetween={isPhone ? 20 : (isNotebook ? 40 : 80)}
                    slideToClickedSlide={true}
                    autoplay={{ delay: 10000, disableOnInteraction: false }}
                    onTouchMove={() => setIsInteracting(true)} 
                    onTouchEnd={() => setTimeout(() => setIsInteracting(false), 500)} 
                    coverflowEffect={{ rotate: 0, stretch: isPhone ? 0 : 0, depth: isPhone ? 80 : 100, modifier: isPhone ? 0.8 : 1, slideShadows: false, scale: isPhone ? 0.85 : 1 }}
                    modules={[EffectCoverflow, Pagination, Autoplay, Mousewheel, Navigation]} 
                    className="custom-swiper"
                    style={{ height: '100%', width: '100%' }}
                    roundLengths={true}
                >
                    {displayList.map((item) => (
                        <SwiperSlide key={item.uniqueId}>
            {({ isActive }) => (
                <div className="relative w-full transition-all duration-500 cursor-pointer overflow-hidden flex flex-col lottery-card-hover" 
                     onClick={() => handlePurchaseClick(item, isActive)}
                     style={{ 
                          borderRadius: isMobile ? '20px' : '40px',
                          boxSizing: 'border-box', border: '2px solid #9B7A49',
                          height: '100%', minHeight: '100%',
                          backgroundColor: '#0f172a', display: 'flex', flexDirection: 'column' 
                     }}>
                                     
                     <div className="relative w-full overflow-hidden" 
                          style={{ flex: '1 1 auto', height: 'auto', minHeight: 0, borderTopLeftRadius: isMobile ? '18px' : '38px', borderTopRightRadius: isMobile ? '18px' : '38px', borderBottomLeftRadius: isMobile ? '0' : '0', borderBottomRightRadius: isMobile ? '0' : '0', transition: 'border-radius 0.3s ease' }}>
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                     </div>

                     <div className="w-full relative z-20 bg-transparent flex flex-col" style={{ flex: '0 0 auto', minHeight: 0, display: 'flex' }}>
                          <CardContent item={item} isMobile={isMobile} handlePurchaseClick={handlePurchaseClick} />
                     </div>
                </div>
            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* WOMAN IMAGE - Dynamic for Phones Only */}
            {(isPhone || window.innerWidth < 768) && (
             <div style={{ position: 'absolute', bottom: imageStyle.bottom, left: imageStyle.left, zIndex: 90, pointerEvents: 'none', display: imageStyle.display }}>
                  <img src="/assets/mongolian-woman.png" style={{ width: imageStyle.width, height: 'auto' }} alt="Host" />
             </div>
            )}

            {/* TEXT & ICON - Visible on Phones & Tablets, Hidden on Desktop (>= 1024) */}
            {window.innerWidth < 1024 && (
             <div style={{
                  position: 'absolute', bottom: textPos.bottom, left: '50%', transform: 'translateX(-50%)', 
                  zIndex: 90, display: textPos.display || 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px', pointerEvents: 'none', whiteSpace: 'nowrap'
             }}>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 12L20.6 9.2L20.9 5.5L17.3 4.7L15.4 1.5L12 3L8.6 1.5L6.7 4.7L3.1 5.5L3.4 9.2L1 12L3.4 14.8L3.1 18.5L6.7 19.3L8.6 22.5L12 21L15.4 22.5L17.3 19.3L20.9 18.5L20.6 14.8L23 12ZM10 16.5L6 12.5L7.4 11.1L10 13.7L16.6 7.1L18 8.5L10 16.5Z" fill="white"/>
                 </svg>
                 <p style={{ fontFamily: "'Montserrat Alternates', sans-serif", fontWeight: '300', color: '#FFFFFF', textShadow: '0 1px 3px rgba(0,0,0,0.6)', fontSize: '13px', margin: '0', lineHeight: '1', textAlign: 'left' }}>
                    Сангийн яамны зөвшөөрөлтэй
                 </p>
             </div>
            )}

            {isMobile && !isPhone && (
              <div className="w-full flex justify-start items-end mt-4 relative z-50 pointer-events-none mobile-host-container"
                   style={{ marginTop: '1px', marginLeft: '40px', transform: 'translateY(0px)' }}>
                <img src="/assets/mongolian-woman.png" alt="Host" style={{ width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.2))' }} />
              </div>
            )}

          </div>

          <div style={{ position: 'relative', zIndex: 99999 }}>
            {showPurchaseDialog && selectedLotto && (
                <PurchaseDialog 
                    title={selectedLotto.title}
                    lotteryCode={selectedLotto.code}
                    lotteryType={selectedLotto.type}
                    basePrice={parseInt(selectedLotto.price.replace(/[^0-9]/g, '')) || 0} 
                    onClose={closePurchaseDialog}
                />
            )}
          </div>

      </div>
    </>
  );
};

export default BodyContent;
