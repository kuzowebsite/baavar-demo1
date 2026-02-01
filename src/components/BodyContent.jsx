// src/components/BodyContent.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Mousewheel } from 'swiper/modules'; 
import PurchaseDialog from './PurchaseDialog'; 

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const CardContent = ({ item, isMobile, handlePurchaseClick }) => {
  const gradientId = `starGradient-${item.uniqueId}`;

  const getTitleStyle = (title) => {
    const length = title.length;
    let fontSize;
    
    // Гарчгийн фонтны хэмжээний тохиргоо (Phone & Tablet)
    if (isMobile) {
      if (length > 25) fontSize = '16px'; 
      else if (length > 15) fontSize = '20px'; 
      else fontSize = '24px'; 
    } else {
      // Desktop
      if (length > 20) fontSize = '24px';
      else fontSize = '36px';
    }

    return {
      fontFamily: 'Roboto, sans-serif', 
      fontWeight: 900, 
      fontSize: fontSize, 
      color: '#FFFFFF', 
      margin: isMobile ? '8px 0 0 0' : '12px 0 0 0', 
      textTransform: 'uppercase', 
      lineHeight: '1.2', 
      textAlign: 'center',
      textShadow: '0px 2px 4px rgba(0,0,0,0.8)',
      whiteSpace: 'normal', 
      wordBreak: 'break-word',
      width: '100%',
      display: 'block',
      paddingBottom: '0px' 
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
              <svg width={isMobile ? "45" : "60"} height={isMobile ? "45" : "60"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    fontSize: isMobile ? '8px' : '11px', 
                    fontWeight: '900', 
                    color: '#000000', 
                    lineHeight: '1', 
                    textAlign: 'center',
                    display: 'block'
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
          marginBottom: '-1px', 
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
               paddingLeft: isMobile ? '24px' : '45px',
               paddingRight: isMobile ? '24px' : '45px',
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
              <div className="flex items-center justify-center shadow-md" 
                style={{ 
                  backgroundColor: '#F8BE53', 
                  borderRadius: '8px', 
                  padding: isMobile ? '4px 10px' : '4px 16px',
                  flex: 1
                }}>
                <span className="font-bold text-black text-[12px] md:text-[18px]">{item.displayPrice}</span>
              </div>

              <button onClick={(e) => { e.stopPropagation(); handlePurchaseClick(item); }}
                className="flex items-center justify-center shadow-lg hover:brightness-110 transition-all active:scale-95" 
                style={{ 
                  backgroundColor: '#FF6060',
                  borderRadius: '8px', 
                  padding: isMobile ? '0 10px' : '0 16px',
                  cursor: 'pointer', border: 'none',
                  flex: 1.5 
                }}>
                <span className="font-bold text-white text-[12px] md:text-[16px] uppercase whitespace-nowrap drop-shadow-sm">Шууд оролцох</span>
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
  const [mobileSlideSize, setMobileSlideSize] = useState({ width: 340, height: 500 });
  // Tablet дээр гүйлгэх үед товчийг нуух state
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const designWidth = 1920;
      const designHeight = 1080;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Mobile check (Phone + Tablet)
      const mobileCheck = windowWidth <= 1024;
      setIsMobile(mobileCheck);

      // Phone check (Only Phone)
      const phoneCheck = windowWidth < 740;
      setIsPhone(phoneCheck);

      // Small Phone check (iPhone SE etc.)
      const smallPhoneCheck = windowWidth <= 400 && windowHeight <= 750;
      setIsSmallPhone(smallPhoneCheck);

      if (mobileCheck) {
        setScale(1); 
        if (windowWidth >= 740) {
          // Tablet Size
          setMobileSlideSize({ width: 330, height: 420 });
        } else {
          // Phone Size
          const mWidth = Math.min(windowWidth * 0.65, 260); 
          const mHeight = mWidth * 1.35; 
          setMobileSlideSize({ width: mWidth, height: mHeight });
        }
      } else {
        // Desktop Scale
        const widthScale = windowWidth / designWidth;
        const heightScale = windowHeight / designHeight;
        const finalScale = Math.min(widthScale, heightScale) * (windowWidth < 1500 ? 0.95 : 0.9); 
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

  // Desktop дээр слайдыг өргөн (fatter) болгов.
  const DESKTOP_SLIDE_WIDTH = 540; 
  const DESKTOP_SLIDE_HEIGHT = 650;
  
  const SLIDE_WIDTH_ACTIVE = isMobile ? mobileSlideSize.width : DESKTOP_SLIDE_WIDTH;
  const SLIDE_HEIGHT_ACTIVE = isMobile ? mobileSlideSize.height : DESKTOP_SLIDE_HEIGHT;
  const CONTAINER_HEIGHT = 760;

  const handlePurchaseClick = (item) => {
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

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300;400;700;900&family=Roboto:wght@400;700;900&display=swap');
          
          /* === SCROLL LOCKING FIX === */
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden !important; /* Хуудсыг бүхэлд нь түгжинэ */
            overscroll-behavior: none; /* iOS bounce эффектийг зогсооно */
          }
          #root {
            height: 100%;
            overflow: hidden;
          }

          header, .header-container {
            position: fixed !important;
            top: 0; left: 0; width: 100%; z-index: 100 !important; background: #0f172a;
          }

          /* === ANIMATION KEYFRAMES === */
          @keyframes goldGlowPulse {
            0% { 
              transform: scale(1); 
              filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5)) brightness(1); 
            }
            50% { 
              transform: scale(1.05); 
              filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8)) brightness(1.2); 
            }
            100% { 
              transform: scale(1); 
              filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5)) brightness(1); 
            }
          }

          .mobile-title-container, .desktop-title-container { 
            z-index: 110 !important; 
          }

          .custom-swiper { 
            width: 100%; height: 100%; padding-top: 20px; padding-bottom: 20px; overflow: visible !important; 
          }
          .swiper-wrapper { align-items: center; transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1) !important; }
          
          .swiper-slide { 
              width: ${isMobile ? mobileSlideSize.width : DESKTOP_SLIDE_WIDTH}px !important; 
              height: ${isMobile ? mobileSlideSize.height : DESKTOP_SLIDE_HEIGHT}px !important; 
              transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease, filter 0.4s ease; 
              border-radius: ${isMobile ? '20px' : '40px'} !important; 
              overflow: hidden; user-select: none; background-color: #0f172a; z-index: 10; cursor: default; 
          }

          @media (max-width: 739px) {
             .swiper-slide-active { 
                filter: blur(0px) !important; 
                opacity: 1 !important; 
                z-index: 100 !important;
                box-shadow: 0 10px 30px rgba(0,0,0,0.8) !important;
             }
             .swiper-slide {
                filter: blur(2px);
                opacity: 0.8;
              }
             .swiper-slide-prev { 
                opacity: 0 !important; 
                visibility: hidden !important;
                transition: opacity 0.1s !important;
                pointer-events: none !important;
                transform: translateY(-500%) !important;
                z-index: -100 !important;
             }
             .swiper-slide-next {
                opacity: 0.6 !important; 
                filter: blur(4px) !important; 
                z-index: 50 !important;
                visibility: visible !important;
             }
             .swiper-slide-next ~ .swiper-slide {
                opacity: 0 !important; 
                visibility: hidden !important;
             }
          }

          @media (min-width: 740px) {
             .swiper-slide {
                filter: blur(5px) !important;
                opacity: 0.9 !important;
                transform: scale(1) !important;
             }
             
             .swiper-slide-active {
                filter: blur(0px) !important;
                opacity: 1 !important;
                z-index: 150 !important; 
                box-shadow: 0 15px 40px rgba(0,0,0,0.55);
             }

             .swiper-slide-prev, .swiper-slide-next {
                opacity: 0.8 !important;
             }
          }

          .swiper-slide img { width: 100%; height: 100%; object-fit: cover; border-radius: ${isMobile ? '20px' : '40px'} !important; }
          
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
              .custom-swiper { padding-top: 0px !important; padding-bottom: 0px !important; }
          }
          
          @media (min-width: 740px) and (max-width: 1025px) {
              .mobile-title-container {
                  margin-top: 100px !important; 
                  display: flex !important;
                  position: relative !important; z-index: 60 !important;
              }
              .swiper-container-wrapper {
                  margin-top: 20px !important; 
                  z-index: 10 !important;
              }
              .mobile-host-container {
                  position: absolute !important;
                  transform: none !important;
                  z-index: 999 !important;
                  pointer-events: none;
              }
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
            .mobile-title-container { 
               margin-bottom: 10px !important; 
            }
          }
        `}
      </style>

      {/* --- FIXED BACKGROUND --- */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: "url('assets/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0, 
          pointerEvents: 'none' 
        }}
      />

      {/* Main Container */}
      <div className={`w-full relative flex`} 
           style={{ 
               height: isPhone ? '100vh' : '100%', 
               minHeight: isMobile ? '100vh' : '600px', 
               flexDirection: 'column', 
               justifyContent: isPhone ? 'flex-start' : (isMobile ? 'flex-start' : 'center'), 
               alignItems: 'center',
               paddingTop: isMobile ? '0px' : '0',
               overflow: 'hidden',
               backgroundColor: 'transparent' 
           }}>
          
          <div className="relative" 
               style={{ 
                   width: isMobile ? '100%' : '1920px', 
                   height: isPhone ? '100%' : (isMobile ? '100%' : `${CONTAINER_HEIGHT}px`), 
                   transform: isMobile ? 'none' : `scale(${scale})`, 
                   transformOrigin: 'center center',
                   display: isPhone ? 'flex' : (isMobile ? 'flex' : 'block'),
                   flexDirection: isMobile ? 'column' : 'row',
                   alignItems: 'center',
                   zIndex: isMobile ? 'auto' : 1200,
                   position: 'relative'
               }}>
            
            {/* ГАРЧИГ / EFFECT IMAGE ХЭСЭГ */}
            <div className={`mobile-title-container ${isMobile ? "w-full flex flex-col items-center justify-center px-4 shrink-0" : "absolute w-full flex justify-center z-10"}`} 
     style={{ 
        position: isPhone ? 'fixed' : (isMobile ? 'relative' : 'absolute'),
        top: isPhone ? (isSmallPhone ? '35px' : '50px') : (isMobile ? 'auto' : '50px'),
        marginTop: isPhone ? '0' : (isSmallPhone ? '45px' : (isMobile ? '100px' : '-140px')), 
        marginBottom: isPhone ? '-40px' : '0', 
        paddingBottom: isPhone ? '0px' : '0',
        zIndex: 110, 
        flexShrink: 0, 
        pointerEvents: 'none',
        left: isPhone ? 0 : 'auto',
        width: '100%'
     }}>

  {/* Image Container */}
  <div style={{
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300%',
    maxWidth: isMobile ? '200%' : '100%',
    height: isSmallPhone ? '160px' : (isPhone ? '200px' : (isMobile ? '180px' : '180px')),
  }}>
    
    {/* Bloom - Behind */}
    <img 
        src="assets/Bloom.png"
        alt="Bloom"
        style={{
          position: 'absolute',
          
          height: isPhone ? '200vw' : '180%', 
          
          left: '50%', 
          transform: 'translateX(-50%)', 
          
          // --- BLOOM POSITION (TOP) ---
          top: (isPhone && window.innerWidth < 360) ? '-256px' // 0. Galaxy Z Fold 5 (344px - Very Narrow) -> Энийг тааруулна
             : isSmallPhone ? '-306px'           // 1. iPhone SE (Small)
             : (isPhone && window.innerWidth >= 425) ? '-340px' // 2. iPhone 14 Pro Max (Wide)
             : (isPhone && window.innerWidth >= 400) ? '-330px' // 3. iPhone XR (Mid-Wide)
             : isPhone ? '-300px'                // 4. iPhone 12 Pro (Standard)
             : (isMobile ? '-50%'                // 5. iPads (Tablet) -> Энийг тааруулна
             : '-25%'),                          // 6. Desktop -> Энийг тааруулна

          // --- BLOOM SIZE (WIDTH) ---
          width: (isPhone && window.innerWidth < 360) ? '170vw' // 0. Galaxy Z Fold 5 (Нарийн дэлгэц тул багасгав)
               : isSmallPhone ? '150vw'          // 1. iPhone SE
               : (isPhone && window.innerWidth >= 425) ? '210vw' // 2. iPhone 14 Pro Max 
               : (isPhone && window.innerWidth >= 400) ? '205vw' // 3. iPhone XR
               : isPhone ? '200vw'               // 4. iPhone 12 Pro
               : (isMobile ? '180vw'              // 5. iPads (Tablet)
               : '200%'),                        // 6. Desktop
               
          objectFit: 'contain',
          mixBlendMode: 'screen',
          zIndex: 1,
          pointerEvents: 'none'
        }}
    />

    {/* Effect - Front */}
    <img 
      src="assets/effect.png" 
      alt="Lottery Effect"
      className="effect-image"
      style={{
        position: 'relative',
        
        // --- EFFECT POSITION (TOP) ---
        top: (isPhone && window.innerWidth < 360) ? '8%'       // 0. Galaxy Z Fold 5 (344px) -> Энийг тааруулна
           : isSmallPhone ? '10%'                // 1. iPhone SE
           : (isPhone && window.innerWidth >= 425) ? '15%'  // 2. iPhone 14 Pro Max
           : (isPhone && window.innerWidth >= 400) ? '13%'  // 3. iPhone XR
           : isPhone ? '12%'                     // 4. iPhone 12 Pro
           : (isMobile ? '10%'                   // 5. iPads (Tablet) -> Энийг тааруулна
           : '40%'),                             // 6. Desktop -> Энийг тааруулна
        
        // --- EFFECT SIZE (WIDTH) ---
        width: (isPhone && window.innerWidth < 360) ? '95vw'  // 0. Galaxy Z Fold 5 (Нарийн дэлгэц)
             : isPhone ? '100vw'                 // Phones
             : (isMobile ? '40%'                // 5. iPads (Tablet) -> Энийг тааруулна
             : '35%'),                          // 6. Desktop -> Энийг тааруулна

        height: isPhone ? '100vw' : '180%',
        objectFit: 'contain',
        zIndex: 2,
        mixBlendMode: 'normal'
      }}
    />

    {/* Desktop Navigation Buttons (Only Desktop) */}
    {!isMobile && (
      <div style={{
        position: 'absolute',
        right: '200px', 
        top: '90%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        pointerEvents: 'auto'
      }}>
        <button 
          onClick={() => swiperRef?.slidePrev()}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          className="hover:bg-white/20 hover:scale-110"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={() => swiperRef?.slideNext()}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          className="hover:bg-white/20 hover:scale-110"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    )}
  </div>
</div>

            {!isMobile && (
              <div className="absolute pointer-events-none" 
                   style={{ 
                      left: '80px', 
                      bottom: '-30px', 
                      height: 'auto', 
                      top: '140px',
                      zIndex: 9999 
                   }}>
                <img src="/assets/mongolian-woman.png" alt="Host" 
                     style={{ height: '780px', width: 'auto', objectFit: 'contain' }} />
              </div>
            )}

            {/* SWIPER CONTAINER */}
            <div className={`swiper-container-wrapper ${isMobile ? "w-full relative" : "absolute w-full"}`} 
                 style={{ 
                  flexGrow: isPhone ? 0 : 0, 
                  height: isPhone ? 'auto' : (isMobile ? `${mobileSlideSize.height}px` : '700px'), 
                  minHeight: isPhone ? '0' : 'auto', 
                  top: isMobile ? '0' : '120px', 
                  marginTop: isMobile ? (isSmallPhone ? '60px' : (isPhone ? '10px' : '-8px')) : '0', 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                 }}>
                
                {/* Tablet Navigation Buttons (Sides of active slide) */}
                {isMobile && !isPhone && (
                  <>
                    <button 
                      onClick={() => swiperRef?.slidePrev()}
                      style={{
                        position: 'absolute',
                        left: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 200,
                        opacity: isInteracting ? 0 : 1, // Interact хийхэд алга болно
                        transition: 'opacity 0.3s ease',
                        background: 'rgba(0,0,0,0.3)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                       <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button 
                      onClick={() => swiperRef?.slideNext()}
                      style={{
                        position: 'absolute',
                        right: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 200,
                        opacity: isInteracting ? 0 : 1, // Interact хийхэд алга болно
                        transition: 'opacity 0.3s ease',
                        background: 'rgba(0,0,0,0.3)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
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
                    spaceBetween={isPhone ? 0 : 80}
                    slideToClickedSlide={true}
                    autoplay={{ delay: 10000, disableOnInteraction: false }}
                    onTouchMove={() => setIsInteracting(true)} // Tablet feature
                    onTouchEnd={() => setTimeout(() => setIsInteracting(false), 500)} // Tablet feature
                    coverflowEffect={{ 
                        rotate: 0, 
                        stretch: isPhone ? -320 : 0, 
                        depth: isPhone ? 150 : 100, 
                        modifier: 1, 
                        slideShadows: false,
                        scale: isPhone ? 0.9 : 1 
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay, Mousewheel]} 
                    className="custom-swiper"
                    style={{ height: '100%', width: '100%' }}
                >
                    {displayList.map((item) => (
                        <SwiperSlide key={item.uniqueId}>
                            {({ isActive }) => (
                                <div className="relative w-full transition-all duration-500 cursor-pointer overflow-hidden flex flex-col" 
                                     onClick={() => handlePurchaseClick(item)}
                                     style={{ 
                                          borderRadius: isMobile ? '20px' : '40px',
                                          boxSizing: 'border-box',
                                          border: '2px solid #9B7A49',
                                          height: '100%', 
                                          minHeight: '100%',
                                          backgroundColor: '#0f172a',
                                          display: 'flex',       
                                          flexDirection: 'column' 
                                     }}>
                                     
                                     <div className="relative w-full overflow-hidden" 
                                          style={{
                                              flex: '1 1 auto',
                                              height: 'auto', 
                                              minHeight: 0,
                                              borderTopLeftRadius: isMobile ? '18px' : '38px',
                                              borderTopRightRadius: isMobile ? '18px' : '38px',
                                              borderBottomLeftRadius: isMobile ? '0' : '0', 
                                              borderBottomRightRadius: isMobile ? '0' : '0',
                                              transition: 'border-radius 0.3s ease'
                                          }}>
                                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                     </div>

                                     <div className="w-full relative z-20 bg-transparent flex flex-col"
                                          style={{ 
                                              flex: '0 0 auto', 
                                              minHeight: 0,
                                              display: 'flex'
                                          }}>
                                          <CardContent item={item} isMobile={isMobile} handlePurchaseClick={handlePurchaseClick} />
                                     </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {(isPhone || window.innerWidth > 450) && (
  <div className="w-full flex items-center justify-center shrink-0" 
      style={{ 
          position: 'absolute', 
          zIndex: 100, 
          
          // --- 1. CONTAINER POSITION (BOTTOM) ---
          // Desktop (1024)-ийг хасаж, зөвхөн Tablet (768)-аас дээш гэдгийг үлдээв
          bottom: (window.innerWidth >= 768) ? '50px'             // Tablet & Desktop (Common)
                
                // --- Phone Logic ---
                : (isPhone && window.innerWidth < 360) ? '10px'  
                : isSmallPhone ? '10px'                           
                : (isPhone && window.innerWidth >= 425) ? '10px' 
                : (isPhone && window.innerWidth >= 400) ? '10px' 
                : (isPhone) ? '-8px'                              
                : '10px',

          // --- CONTAINER POSITION (LEFT) ---
          // Tablet & Desktop дээр 0px (Голлуулна)
          left: (window.innerWidth >= 768) ? '0px'            
              
              // --- Phone Logic ---
              : (isSmallPhone) ? '-60px' 
              : (isPhone && window.innerWidth === 375) ? '-90px' 
              : (isPhone && window.innerWidth === 414) ? '-80px' 
              : (isPhone) ? '-80px'
              : '-80px',
          
          width: '100%',
          pointerEvents: 'none', 
          
          // --- GAP ADJUSTMENT ---
          gap: (window.innerWidth >= 768) ? '10px'
             : (isPhone && window.innerWidth < 360) ? '6px' 
             : '8px'
      }}>
    
    {/* Mongolian Woman Image (BEHIND) */}
    <img 
       src="/assets/mongolian-woman.png" 
       alt="Host" 
       style={{ 
         position: 'relative', 
         zIndex: 10, 

         // --- IMAGE VISIBILITY ---
         // Tablet & Desktop дээр зургийг харуулахгүй
         display: (window.innerWidth >= 768) ? 'none' : 'block',

         // --- IMAGE SIZE (HEIGHT) ---
         height: (isPhone && window.innerWidth < 360) ? '330px'  
               : isSmallPhone ? '200px'                           
               : (isPhone && window.innerWidth >= 425) ? '350px'  
               : (isPhone && window.innerWidth === 414) ? '250px'
               : (isPhone && window.innerWidth >= 400) ? '325px'  
               : (isPhone) ? '330px'
               : '330px', 
         
         width: 'auto', 
         objectFit: 'contain',
         transform: 'translateY(10px)' 
       }} 
    />

    {/* SVG ICON (FRONT) */}
    <svg 
  width="20" 
  height="20" 
  viewBox="0 0 24 24" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
  style={{
      position: 'relative',
      zIndex: 20, 

      // --- ICON POSITION: MARGIN TOP ---
      // ЗӨВХӨН iPad (Mini, Air, Pro) дээр 0px
      // (768px-ээс их БА 1024px-ээс бага буюу тэнцүү үед)
      marginTop: (window.innerWidth >= 768 && window.innerWidth <= 1024) ? '0px'

               // --- Phone & Desktop Logic (Desktop доошоо орно) ---
               : (isPhone && window.innerWidth < 360) ? '-180px'   
               : (isPhone && window.innerWidth === 360) ? '40px'    
               : isSmallPhone ? '30px'                              
               : (isPhone && window.innerWidth === 375) ? '-130px'  
               : (isPhone && window.innerWidth >= 425) ? '-150px'  
               : (isPhone && window.innerWidth === 414) ? '20px'   
               : (isPhone && window.innerWidth >= 400) ? '-150px'  
               : '-140px',

      // --- ICON POSITION: MARGIN LEFT ---
      // ЗӨВХӨН iPad (Mini, Air, Pro) дээр 0px
      marginLeft: (window.innerWidth >= 768 && window.innerWidth <= 1024) ? '0px'          

                // --- Phone & Desktop Logic ---
                : (isPhone && window.innerWidth < 360) ? '-120px'  
                : (isPhone && window.innerWidth === 360) ? '-50px' 
                : isSmallPhone ? '-40px' 
                : (isPhone && window.innerWidth === 375) ? '-104px' 
                : (isPhone && window.innerWidth >= 425) ? '-110px' 
                : (isPhone && window.innerWidth === 414) ? '-40px' 
                : (isPhone && window.innerWidth >= 400) ? '-106px' 
                : '-104px',

      marginBottom: '0px',
      marginRight: '0px',
      transform: 'translateY(0px)' 
  }}
>
  <path d="M23 12L20.6 9.2L20.9 5.5L17.3 4.7L15.4 1.5L12 3L8.6 1.5L6.7 4.7L3.1 5.5L3.4 9.2L1 12L3.4 14.8L3.1 18.5L6.7 19.3L8.6 22.5L12 21L15.4 22.5L17.3 19.3L20.9 18.5L20.6 14.8L23 12ZM10 16.5L6 12.5L7.4 11.1L10 13.7L16.6 7.1L18 8.5L10 16.5Z" fill="white"/>
</svg>

    {/* Text: Сангийн яамны зөвшөөрөлтэй */}
    <p style={{ 
    position: 'relative',
    zIndex: 20, 

    fontFamily: "'Montserrat Alternates', sans-serif", 
    fontWeight: '300', 
    color: '#FFFFFF', 
    textShadow: '0 1px 3px rgba(0,0,0,0.6)',

    // --- FONT SIZE ---
    // Зөвхөн iPad (768px - 1024px) дээр 16px
    fontSize: (window.innerWidth >= 768 && window.innerWidth <= 1024) ? '16px'
            // Phone Logic
            : (isPhone && window.innerWidth < 360) ? '11px' 
            : isSmallPhone ? '12px' 
            : (isPhone && window.innerWidth >= 425) ? '13px' 
            : '11px',

    // --- TEXT POSITION: MARGIN TOP ---
    // Зөвхөн iPad (768px - 1024px) дээр 0px
    marginTop: (window.innerWidth >= 768 && window.innerWidth <= 1024) ? '0px'

             // --- Phone Logic ---
             : (isPhone && window.innerWidth < 360) ? '-180px'  
             : (isPhone && window.innerWidth === 360) ? '40px' 
             : isSmallPhone ? '30px' 
             : (isPhone && window.innerWidth === 375) ? '-130px' 
             : (isPhone && window.innerWidth >= 425) ? '-150px' 
             : (isPhone && window.innerWidth === 414) ? '20px' 
             : (isPhone && window.innerWidth >= 400) ? '-150px' 
             : '-140px',

    // --- TEXT POSITION: MARGIN LEFT ---
    // Зөвхөн iPad (768px - 1024px) дээр 0px
    marginLeft: (window.innerWidth >= 768 && window.innerWidth <= 1024) ? '0px'

              // --- Phone Logic ---
              : (isPhone && window.innerWidth < 360) ? '-6px'  
              : (isPhone && window.innerWidth === 360) ? '-7px'  
              : isSmallPhone ? '-8px' 
              : (isPhone && window.innerWidth === 375) ? '-7px' 
              : (isPhone && window.innerWidth >= 425) ? '-6px' 
              : (isPhone && window.innerWidth === 414) ? '-4px' 
              : (isPhone && window.innerWidth >= 400) ? '-4px' 
              : '-7px',

    marginRight: '0',
    marginBottom: '0',
}}>
    Сангийн яамны зөвшөөрөлтэй
</p>
</div>
)}

            {isMobile && !isPhone && (
              <div className="w-full flex justify-start items-end mt-4 relative z-50 pointer-events-none mobile-host-container"
                   style={{ 
                      marginTop: '1px', 
                      marginLeft: '0px', 
                      transform: 'translateY(0px)' 
                   }}>
                <img 
                  src="/assets/mongolian-woman.png" 
                  alt="Host" 
                  style={{ 
                    width: 'auto', 
                    objectFit: 'contain', 
                    filter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.2))' 
                  }} 
                />
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
