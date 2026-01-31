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
    
    if (isMobile) {
      if (length > 25) fontSize = '18px';
      else if (length > 15) fontSize = '20px';
      else fontSize = '24px';
    } else {
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
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[1px]">
                <span style={{ 
                  fontSize: isMobile ? '10px' : '13px', 
                  fontWeight: '900', 
                  color: '#000000' 
                }}>
                  {item.fillPercent}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 2. МЭДЭЭЛЛИЙН ХЭСЭГ */}
      <div className="w-full flex flex-col items-center relative z-20"
        style={{
          backgroundImage: "url('assets/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottomLeftRadius: isMobile ? '18px' : '38px',
          borderBottomRightRadius: isMobile ? '18px' : '38px',
          paddingLeft: isMobile ? '24px' : '45px',
          paddingRight: isMobile ? '24px' : '45px',
          paddingBottom: '8px', 
          paddingTop: '0px', 
          marginTop: '0px', 
          marginBottom: '-1px', 
          flexShrink: 0, 
          minHeight: 0 
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
              padding: isMobile ? '4px 10px' : '4px 16px', // Desktop padding багасгаж нарийн болгосон
              flex: 1
            }}>
            <span className="font-bold text-black text-[12px] md:text-[18px]">{item.displayPrice}</span>
          </div>

          <button onClick={(e) => { e.stopPropagation(); handlePurchaseClick(item); }}
            className="flex items-center justify-center shadow-lg hover:brightness-110 transition-all active:scale-95" 
            style={{ 
              backgroundColor: '#FF6060',
              borderRadius: '8px', 
              padding: isMobile ? '0 10px' : '0 16px', // Desktop өндрийг нарийн байхаар тохируулав
              cursor: 'pointer', border: 'none',
              flex: 1.5 // Товчийг үнээс бага зэрэг урт харагдуулна
            }}>
            <span className="font-bold text-white text-[12px] md:text-[16px] uppercase whitespace-nowrap drop-shadow-sm">Шууд оролцох</span>
          </button>
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
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [selectedLotto, setSelectedLotto] = useState(null);
  const [mobileSlideSize, setMobileSlideSize] = useState({ width: 340, height: 500 });

  useEffect(() => {
    const handleResize = () => {
      const designWidth = 1920;
      const designHeight = 1080;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const mobileCheck = windowWidth <= 1024;
      setIsMobile(mobileCheck);

      const phoneCheck = windowWidth < 740;
      setIsPhone(phoneCheck);

      if (mobileCheck) {
        setScale(1); 
        if (windowWidth >= 740) {
          setMobileSlideSize({ width: 330, height: 420 });
        } else {
          const mWidth = Math.min(windowWidth * 0.65, 260); 
          const mHeight = mWidth * 1.35; 
          setMobileSlideSize({ width: mWidth, height: mHeight });
        }
      } else {
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
    { id: 1, title: "LEXUS RX 2026", price: "30,000₮", displayPrice: "30,000₮", imageUrl: "/suglaa/1.png", code: "BS001", type: "Баавар сугалаа", fillPercent: 90 },
    { id: 2, title: "IPHONE 17 PRO MAX", price: "5,000₮", displayPrice: "5,000₮", imageUrl: "/suglaa/1.png", code: "NS001", type: "Нүнжиг сугалаа", fillPercent: 45 },
    { id: 3, title: "LAND CRUISER 300", price: "20,000₮", displayPrice: "20,000₮", imageUrl: "/suglaa/3.jpg", code: "SS001", type: "Сүншиг сугалаа", fillPercent: 70 },
    { id: 4, title: "3 ӨРӨӨ БАЙР", price: "50,000₮", displayPrice: "50,000₮", imageUrl: "/suglaa/1.png", code: "BS002", type: "Баавар сугалаа", fillPercent: 20 },
    { id: 5, title: "BONUS SUGLAA", price: "0₮", displayPrice: "Үнэгүй", imageUrl: "/suglaa/3.jpg", code: "FR001", type: "Үнэгүй сугалаа", fillPercent: 10 },
  ];

  const displayList = useMemo(() => {
    return [...baseLottoList, ...baseLottoList, ...baseLottoList].map((item, index) => ({
      ...item,
      uniqueId: `${item.id}-${index}`
    }));
  }, []);

  const DESKTOP_SLIDE_WIDTH = 540;
  const DESKTOP_SLIDE_HEIGHT = 680;
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
          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@700;900&family=Roboto:wght@400;700;900&display=swap');
          
          header, .header-container {
              animation: none !important;
              transform: none !important;
              top: 0 !important;
          }

          .custom-swiper { 
            width: 100%; 
            height: 100%; 
            padding-top: 20px; 
            padding-bottom: 20px; 
            overflow: visible !important; 
          }
          .swiper-wrapper { 
              align-items: center; 
              transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1) !important;
          }
          
          .swiper-slide { 
              width: ${isMobile ? mobileSlideSize.width * 0.85 : 420}px !important; 
              height: ${isMobile ? mobileSlideSize.height * 0.85 : 420}px !important; 
              transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease, filter 0.8s ease; 
              filter: blur(4px); 
              opacity: 0.6; 
              border-radius: ${isMobile ? '20px' : '40px'} !important; 
              overflow: hidden; 
              user-select: none; 
              background-color: #0f172a; 
              z-index: 10; 
              cursor: default; 
          }

          @media (max-width: 739px) {
             .swiper-slide { filter: blur(4px); opacity: 0.5; }
             .swiper-slide-prev { opacity: 0.2 !important; filter: blur(8px) !important; }
             .swiper-slide-next {
                opacity: 0.5 !important; 
                filter: blur(5px) !important; 
                z-index: 90 !important;
                width: ${SLIDE_WIDTH_ACTIVE}px !important;
                height: ${SLIDE_HEIGHT_ACTIVE}px !important;
             }
          }

          .swiper-slide img { 
              width: 100%; height: 100%; object-fit: cover; 
              border-radius: ${isMobile ? '20px' : '40px'} !important; 
          }
          
          .swiper-slide-active { 
              width: ${SLIDE_WIDTH_ACTIVE}px !important; 
              height: ${SLIDE_HEIGHT_ACTIVE}px !important; 
              filter: blur(0px) !important; opacity: 1 !important; z-index: 100 !important; 
              background-color: transparent; box-shadow: 0 15px 40px rgba(0,0,0,0.55); 
              border-radius: ${isMobile ? '20px' : '40px'} !important;
          }
          
          .swiper-slide-active img { border-radius: 0 !important; }
          
          .golden-3d-text {
            font-family: 'Montserrat Alternates', sans-serif;
            font-weight: 900;
            text-transform: uppercase;
            color: #F8BE53; 
            text-shadow: 0px 2px 4px rgba(0,0,0,0.5); 
            filter: drop-shadow(0px 2px 0px #7D5A12);
            position: relative;
            z-index: 10000;
          }

          @media (max-width: 739px) {
              .custom-swiper { padding-top: 0px !important; padding-bottom: 0px !important; }
              .mobile-title { 
                margin-bottom: 20px; 
                margin-top: 20px; 
                position: relative;
                z-index: 10 !important; opacity: 1 !important;
                display: block !important; visibility: visible !important;
              }
              body, html { overflow-x: hidden; }
          }
          
          @media (max-width: 1024px) and (min-width: 740px) {
            .mobile-title-container {
                margin-top: 140px !important; 
                display: flex !important;
                position: relative !important; 
                z-index: 60 !important;
            }
            .swiper-container-wrapper {
                 margin-top: 40px !important;
            }
            .mobile-host-container {
                transform: translateY(-120px) !important;
                z-index: 0 !important;
            }
            .mobile-host-container img {
                height: 550px !important;
            }
          }

          /* iPhone SE (375px) болон жижиг дэлгэцэнд зориулсан CSS */
          @media (max-width: 380px) {
            .mobile-title {
              font-size: 20px !important;
            }
            .mobile-title-container {
              margin-top: 80px !important;
              margin-bottom: 10px !important;
            }
          }
        `}
      </style>

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
               backgroundImage: "url('assets/background.jpg')",
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
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
                   alignItems: 'center'
               }}>
            
            {/* ГАРЧИГ ХЭСЭГ */}
            <div className={isMobile ? "w-full flex flex-col items-center justify-center px-4 shrink-0 mobile-title-container" : "absolute w-full flex justify-center z-10"} 
                  style={{ 
                    position: isPhone ? 'relative' : (isMobile ? 'relative' : 'absolute'),
                    marginTop: isPhone ? '80px' : '0', 
                    top: isPhone ? 'auto' : (isMobile ? 'auto' : '50px'),
                    paddingBottom: isPhone ? '10px' : '0',
                    zIndex: 50,
                    flexShrink: 0, 
                    pointerEvents: 'none'
                  }}>
              <h1 className="mobile-title golden-3d-text"
                  style={{ 
                      fontSize: isMobile ? 'clamp(24px, 6vw, 36px)' : '36px',
                      letterSpacing: '1px', 
                      margin: 0, 
                      textAlign: 'center', 
                      lineHeight: 1.2,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' 
                  }}>
                  {isPhone ? (
                    <>
                      <span style={{ display: 'block' }}>Монголын хамгийн</span>
                      <span style={{ display: 'block' }}>том хонжворт сугалаа</span>
                    </>
                  ) : (
                    "Монголын хамгийн том хонжворт сугалаа"
                  )}
              </h1>
            </div>

            {!isMobile && (
                <div className="absolute z-20 pointer-events-none" style={{ left: '80px', bottom: '-30px', height: 'auto', top: '140px'}}>
                    <img src="/assets/mongolian-woman.png" alt="Host" style={{ height: '780px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(10px 10px 20px rgba(0,0,0,0.3))' }} />
                </div>
            )}

            {/* SWIPER CONTAINER */}
            <div className={`${isMobile ? "w-full relative swiper-container-wrapper" : "absolute w-full"}`} 
                 style={{ 
                  flexGrow: isPhone ? 0 : 0, 
                  height: isPhone ? 'auto' : (isMobile ? `${mobileSlideSize.height}px` : '700px'), 
                  minHeight: isPhone ? '0' : 'auto', 
                  top: isMobile ? '0' : '120px', 
                  marginTop: isMobile ? (isPhone ? '-10px' : '-80px') : '0', 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                 }}>
                
                <Swiper
                    onSwiper={setSwiperRef}
                    direction={isPhone ? 'vertical' : 'horizontal'} 
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    centeredSlidesBounds={true}
                    slidesPerView={'auto'}
                    loop={true}
                    speed={600} 
                    mousewheel={isPhone ? true : false} 
                    spaceBetween={isMobile ? (isPhone ? 30 : 50) : 60} 
                    slideToClickedSlide={true}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    coverflowEffect={{ 
                        rotate: isPhone ? 0 : 0, 
                        stretch: isPhone ? 60 : 0, 
                        depth: isMobile ? (isPhone ? 100 : 80) : 150, 
                        modifier: 1, 
                        slideShadows: false 
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
                                              borderBottomLeftRadius: isActive ? '0' : (isMobile ? '18px' : '38px'),
                                              borderBottomRightRadius: isActive ? '0' : (isMobile ? '18px' : '38px'),
                                              transition: 'border-radius 0.3s ease'
                                          }}>
                                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                     </div>

                                     {isActive && (
                                          <div className="w-full relative z-20 bg-transparent flex flex-col"
                                               style={{ flex: '0 0 auto', minHeight: 0 }}>
                                              <CardContent item={item} isMobile={isMobile} handlePurchaseClick={handlePurchaseClick} />
                                          </div>
                                     )}
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* FOOTER TEXT */}
            {isPhone && (
                <div className="w-full text-center py-2 pb-4 shrink-0 z-50" style={{ position: 'relative' }}>
                    <p className="golden-3d-text" style={{ fontSize: '12px', margin: 0 }}>
                        Сангийн яамны зөвшөөрөлтэй сугалаа
                    </p>
                </div>
            )}

            {isMobile && !isPhone && (
                <div className="w-full flex justify-start items-end mt-4 relative z-0 mobile-host-container"
                      style={{ marginTop: '1px', marginLeft: '-100px', transform: 'translateY(0px)' }}>
                    <img src="/assets/mongolian-woman.png" alt="Host" 
                        style={{ width: 'auto', height: '360px', objectFit: 'contain', filter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.2))' }} />
                </div>
            )}

          </div>

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
    </>
  );
};

export default BodyContent;
