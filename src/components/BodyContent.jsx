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
      textShadow: '0px 2px 6px rgba(0,0,0,0.9), 0px 4px 12px rgba(0,0,0,0.7)',
      whiteSpace: 'normal', 
      wordBreak: 'break-word',
      width: '100%',
      display: 'block',
      paddingBottom: '0px',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
      letterSpacing: '1px',
      paintOrder: 'stroke fill'
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
              <div className="flex items-center justify-center shadow-md" 
                style={{ 
                  backgroundColor: '#F8BE53', 
                  borderRadius: '8px', 
                  padding: isMobile ? '4px 8px' : '4px 16px',
                  flex: 1
                }}>
                <span className="font-bold text-black text-[12px] md:text-[18px]" style={{ 
                  WebkitFontSmoothing: 'antialiased', 
                  MozOsxFontSmoothing: 'grayscale', 
                  textRendering: 'optimizeLegibility', 
                  letterSpacing: '1px',
                  fontWeight: '900',
                  textShadow: '0px 1px 2px rgba(0,0,0,0.3)',
                  paintOrder: 'stroke fill'
                }}>{item.displayPrice}</span>
              </div>

              <button onClick={(e) => { e.stopPropagation(); handlePurchaseClick(item); }}
                className="flex items-center justify-center shadow-lg hover:brightness-110 transition-all active:scale-95" 
                style={{ 
                  backgroundColor: getButtonColor(item.id),
                  borderRadius: '8px', 
                  padding: isMobile ? '0 8px' : '0 16px',
                  cursor: 'pointer', border: 'none',
                  flex: 1.5 
                }}>
                <span className="font-bold text-white text-[12px] md:text-[16px] uppercase whitespace-nowrap drop-shadow-sm" style={{ 
                  WebkitFontSmoothing: 'antialiased', 
                  MozOsxFontSmoothing: 'grayscale', 
                  textRendering: 'optimizeLegibility', 
                  letterSpacing: '1.2px',
                  fontWeight: '900',
                  textShadow: '0px 2px 4px rgba(0,0,0,0.5), 0px 4px 8px rgba(0,0,0,0.3)',
                  paintOrder: 'stroke fill'
                }}>Шууд оролцох</span>
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

      setWindowWidth(wWidth); // Update width state

      const mobileCheck = wWidth <= 1024;
      setIsMobile(mobileCheck);

      const phoneCheck = wWidth < 740;
      setIsPhone(phoneCheck);

      const smallPhoneCheck = wWidth <= 400 && wHeight <= 750;
      setIsSmallPhone(smallPhoneCheck);

      if (mobileCheck) {
        setScale(1); 
        // Dynamic Sizing Logic for Mobile
        if (wWidth >= 740) {
          // Tablet logic
          setMobileSlideSize({ width: 330, height: 420 });
        } else {
          // Mobile Logic - USER FIXED SIZE
          // Таны хүссэн тогтмол хэмжээ: Width 290px, Height 356px
          setMobileSlideSize({ width: 250, height: 336 });
        }
      } else {
        // Desktop Scale Logic
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
  
  const SLIDE_WIDTH_ACTIVE = isMobile ? mobileSlideSize.width : DESKTOP_SLIDE_WIDTH;
  const SLIDE_HEIGHT_ACTIVE = isMobile ? mobileSlideSize.height : DESKTOP_SLIDE_HEIGHT;
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

    if (windowWidth <= 320) {
        return { width: '135px', left: '-34px', bottom: '0' };
    }
    // 1. ЖИЖИГ УТАС (320px - 344px) - Жишээ: iPhone SE 1, Galaxy Z Fold Cover
    if (windowWidth <= 344) {
        return { width: '230px', left: '-75px', bottom: '0' };
    }

    // 2. ДУНД УТАС (345px - 360px) - Жишээ: Classic Androids
    if (windowWidth <= 360) {
        return { width: '140px', left: '-30px', bottom: '0' };
    }

    // 3. iPhone SE 2/3, 12/13 Mini (361px - 375px)
    if (windowWidth <= 375) {
        return { width: '140px', left: '-30px', bottom: '0' };
    }

    // 4. iPhone 12/13/14/15 Pro, Samsung S21/22/23 (376px - 400px)
    if (windowWidth <= 400) {
        return { width: '260px', left: '-80px', bottom: '0' };
    }

    // 5. iPhone Plus загварууд (414px)
    if (windowWidth <= 414) {
        return { width: '210px', left: '-50px', bottom: '0' };
    }

    // 6. ТОМ УТАС / Pro Max (415px - 767px)
    if (windowWidth < 768) {
        return { width: '270px', left: '-80px', bottom: '0' };
    }

    // 7. TABLET (768px - 1023px) - iPad, Galaxy Tab
    // Tablet дээр зураг харагдана
    if (windowWidth >= 768 && windowWidth < 1024) {
        return { width: '200px', left: '-40px', bottom: '0' }; 
    }

    // 8. Desktop/Laptop (>=1024px) - Харагдахгүй
    return { width: '0px', left: '0px', bottom: '0', display: 'none' }; 
  };

  // --- 2. ТЕКСТИЙН БАЙРЛАЛ (ТОХИРУУЛСАН) ---
  const getTextStyles = () => {

    if (windowWidth <= 320) {
        return { bottom: '20%' };
    }

    if (windowWidth <= 344) {
        return { bottom: '30%' }; // Доошлох хэрэгтэй
    }
    // 1. ЖИЖИГ УТАС (320px - 344px)
    if (windowWidth <= 344) {
        return { bottom: '28%' }; // Доошлох хэрэгтэй
    }

    // 2. ДУНД УТАС (345px - 360px)
    if (windowWidth <= 360) {
        return { bottom: '20%' };
    }

    // 3. iPhone SE 2/3, Mini (361px - 375px)
    if (windowWidth <= 375) {
        return { bottom: '19%' };
    }

    // 4. iPhone 12/13/14/15 Pro (376px - 400px)
    if (windowWidth <= 400) {
        return { bottom: '29%' };
    }

    // 5. iPhone Plus (414px)
    if (windowWidth <= 414) {
        return { bottom: '26%' };
    }

    // 6. ТОМ УТАС / Pro Max (415px - 767px)
    if (windowWidth < 767) {
        return { bottom: '30%' };
    }

        if (windowWidth < 819) {
        return { bottom: '28%' };
    }

    // 7. TABLET (768px - 1023px) - iPad Air, Pro 11, Asus (820, 853 орно)
    if (windowWidth >= 820 && windowWidth < 1024) {
        return { bottom: '38%' }; // Tablet дээр арай доор
    }

    // 8. Desktop (>=1024px) - Харагдахгүй
    return { display: 'none' };
  };

  const imageStyle = getImageStyles();
  const textPos = getTextStyles();

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300;400;700;900&family=Roboto:wght@400;700;900&display=swap');
          
          html, body {
            margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden !important; overscroll-behavior: none; 
          }
          #root { height: 100%; overflow: hidden; }

          header, .header-container {
            position: fixed !important; top: 0; left: 0; width: 100%; z-index: 100 !important; background: #0f172a;
          }

          .mobile-title-container, .desktop-title-container { z-index: 110 !important; }

          .custom-swiper { 
            width: 100%; height: 100%; padding-top: 10px; padding-bottom: 10px; overflow: visible !important; 
          }
          .swiper-wrapper { align-items: center; transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1) !important; }
          
          .swiper-slide { 
              width: ${isMobile ? mobileSlideSize.width : DESKTOP_SLIDE_WIDTH}px !important; 
              height: ${isMobile ? mobileSlideSize.height : DESKTOP_SLIDE_HEIGHT}px !important; 
              transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease, filter 0.4s ease; 
              border-radius: ${isMobile ? '20px' : '40px'} !important; 
              overflow: visible !important; 
              user-select: none; background-color: #0f172a; z-index: 10; 
              cursor: pointer; 
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
             .swiper-slide { filter: blur(2px); opacity: 0.8; }
             .swiper-slide-prev { 
                opacity: 0 !important; visibility: hidden !important; pointer-events: none !important;
                transform: translateY(-500%) !important; z-index: -100 !important;
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
                 pointer-events: auto !important; /* Enable clicks on side slides */
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
        top: isPhone ? (isSmallPhone ? '60px' : '50px') : (isMobile ? 'auto' : '50px'),
        marginTop: isPhone ? '-50px' : (isSmallPhone ? '45px' : (isMobile ? '100px' : '-140px')), 
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
    maxWidth: isMobile ? '180%' : '100%',
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
      
      top: (isPhone && window.innerWidth === 359) ? '-300px' 
         : (isPhone && window.innerWidth < 360) ? '-240px' 
         : isSmallPhone ? '-306px'                          
         : (isPhone && window.innerWidth === 428) ? '-370px' 
         : (isPhone && window.innerWidth >= 425) ? '-340px' 
         : (isPhone && window.innerWidth >= 400) ? '-330px' 
         : isPhone ? '-280px'                               
         : (isMobile ? '-50%'                               
         : '-25%'),                                         

      width: (isPhone && window.innerWidth < 360) ? '170vw' 
           : isSmallPhone ? '150vw'                         
           : (isPhone && window.innerWidth === 428) ? '210vw' 
           : (isPhone && window.innerWidth >= 425) ? '200vw' 
           : (isPhone && window.innerWidth >= 400) ? '205vw' 
           : isPhone ? '180vw'                              
           : (isMobile ? '180vw'                             
           : '200%'),                                       
           
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
        top: (isPhone && window.innerWidth < 360) ? '18%'       
           : isSmallPhone ? '10%'                               
           : (isPhone && window.innerWidth === 428) ? '-2%'     
           : (isPhone && window.innerWidth >= 425) ? '15%'      
           : (isPhone && window.innerWidth >= 400) ? '13%'      
           : isPhone ? '25%'                                    
           : (isMobile ? '10%'                                  
           : '40%'),                                            
        
        width: (isPhone && window.innerWidth < 360) ? '95vw'   
             : (isPhone && window.innerWidth === 428) ? '100vw' 
             : isPhone ? '90vw'                                
             : (isMobile ? '40%'                                
             : '35%'),                                          

        height: isPhone ? '100vw' : '180%',
        objectFit: 'contain',
        zIndex: 2,
        mixBlendMode: 'normal'
      }}
    />

    {!isMobile && (
      <div style={{
        position: 'absolute',
        right: '200px', 
        top: '91%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        pointerEvents: 'auto'
      }}>
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
              <div className="absolute pointer-events-none" 
                   style={{ left: '80px', bottom: '-30px', height: 'auto', top: '140px', zIndex: 9999 }}>
                <img src="/assets/mongolian-woman.png" alt="Host" style={{ height: '780px', width: 'auto', objectFit: 'contain' }} />
              </div>
            )}

            {/* SWIPER CONTAINER */}
            <div className={`swiper-container-wrapper ${isMobile ? "w-full relative" : "absolute w-full"}`} 
     style={{ 
         flexGrow: isPhone ? 0 : 0, 
         height: isPhone ? 'auto' : (isMobile ? `${mobileSlideSize.height}px` : '700px'), 
         minHeight: isPhone ? '0' : 'auto', 
         top: (isPhone && window.innerWidth === 428) ? '-50px' : (isMobile ? '-30px' : '120px'),
         marginTop: isMobile ? (isSmallPhone ? '60px' : (isPhone ? '10px' : '-8px')) : '0', 
         display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
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
                    spaceBetween={isPhone ? 0 : 80}
                    slideToClickedSlide={true}
                    autoplay={{ delay: 10000, disableOnInteraction: false }}
                    onTouchMove={() => setIsInteracting(true)} 
                    onTouchEnd={() => setTimeout(() => setIsInteracting(false), 500)} 
                    coverflowEffect={{ rotate: 0, stretch: isPhone ? -320 : 0, depth: isPhone ? 150 : 100, modifier: 1, slideShadows: false, scale: isPhone ? 0.9 : 1 }}
                    modules={[EffectCoverflow, Pagination, Autoplay, Mousewheel, Navigation]} 
                    className="custom-swiper"
                    style={{ height: '100%', width: '100%' }}
                >
                    {displayList.map((item) => (
                        <SwiperSlide key={item.uniqueId}>
            {({ isActive }) => (
                <div className="relative w-full transition-all duration-500 cursor-pointer overflow-hidden flex flex-col lottery-card-hover" 
                     onClick={() => handlePurchaseClick(item, isActive)}
                     style={{ 
                          borderRadius: isMobile ? '20px' : '40px',
                          boxSizing: 'border-box',
                          border: '2px solid #9B7A49',
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
             <div style={{ position: 'absolute', bottom: imageStyle.bottom, left: imageStyle.left, zIndex: 90, pointerEvents: 'none' }}>
                  <img src="/assets/mongolian-woman.png" style={{ width: imageStyle.width, height: 'auto' }} alt="Host" />
             </div>
            )}

            {/* TEXT & ICON - Visible on Phones & Tablets, Hidden on Desktop (>= 1024) */}
            {window.innerWidth < 1024 && (
             <div style={{
                  position: 'absolute',
                  bottom: textPos.bottom, 
                  left: '50%',
                  transform: 'translateX(-50%)', 
                  zIndex: 90,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '6px',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap'
             }}>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 12L20.6 9.2L20.9 5.5L17.3 4.7L15.4 1.5L12 3L8.6 1.5L6.7 4.7L3.1 5.5L3.4 9.2L1 12L3.4 14.8L3.1 18.5L6.7 19.3L8.6 22.5L12 21L15.4 22.5L17.3 19.3L20.9 18.5L20.6 14.8L23 12ZM10 16.5L6 12.5L7.4 11.1L10 13.7L16.6 7.1L18 8.5L10 16.5Z" fill="white"/>
                 </svg>
                 
                 <p style={{ 
                    fontFamily: "'Montserrat Alternates', sans-serif", 
                    fontWeight: '300', 
                    color: '#FFFFFF', 
                    textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                    fontSize: '12px',
                    margin: '0',
                    lineHeight: '1', 
                    textAlign: 'left'
                 }}>
                    Сангийн яамны зөвшөөрөлтэй
                 </p>
             </div>
            )}

            {isMobile && !isPhone && (
              <div className="w-full flex justify-start items-end mt-4 relative z-50 pointer-events-none mobile-host-container"
                   style={{ marginTop: '1px', marginLeft: '0px', transform: 'translateY(0px)' }}>
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
