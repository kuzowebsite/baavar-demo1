import React, { useRef, useEffect, useState } from 'react';

const WINNERS_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const WinnersScreen = () => {
  return (
    <>
      {/* 1. FIXED BACKGROUND LAYER */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 2. SCROLLING CONTENT LAYER */}
      <div className="relative z-10 w-full min-h-screen flex flex-col pt-28 md:pt-32 pb-20 space-y-2 overflow-x-hidden">
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@700&display=swap');
            
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            
            .winner-title {
              font-family: 'Montserrat Alternates', sans-serif;
              font-weight: 700;
              background: linear-gradient(to bottom, #FFE37C, #A6690F);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
            }

            .gold-card-outer {
              position: relative;
              background: linear-gradient(180deg, #FFE37C 0%, #A6690F 100%);
              padding: 1px; 
              border-radius: 16px;
              filter: drop-shadow(0 4px 8px rgba(0,0,0,0.6));
              transition: transform 0.3s ease;
              z-index: 10;
            }

            .gold-card-outer:hover {
              transform: scale(1.02);
              z-index: 20; 
            }

            .inner-container {
              width: 100%;
              height: 100%;
              background-color: #1a1a1a;
              border-radius: 16px;
              overflow: hidden;
            }
            
            @media (max-width: 767px) {
              .snap-container {
                scroll-snap-type: x mandatory;
                scroll-behavior: smooth;
              }
              .snap-item {
                scroll-snap-align: center;
              }
            }
          `}
        </style>

        <WinnerSection title="Баавар ялагчид" />
        <WinnerSection title="Нүнжиг ялагчид" />
        <WinnerSection title="Сүншиг ялагчид" />
      </div>
    </>
  );
};

const WinnerSection = ({ title }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Баруун зүүн тийш гүйлгэх боломжтой эсэхийг хадгалах
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollTimeout = useRef(null);

  // Scroll хийх боломжтой эсэхийг шалгах функц
  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      // Зүүн талд зай байгаа эсэх (> 0)
      setCanScrollLeft(scrollLeft > 0);
      // Баруун талд зай байгаа эсэх (1px-ийн зөрүүг тооцохгүй)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const handleScrollEvent = () => {
    // 1. Scroll хийгдэх бүрт товч харагдах эсэхийг шалгана
    checkScrollPosition();

    // 2. Drag/Scroll хийж байхад товчийг түр нуух логик
    setIsDragging(true);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      setIsDragging(false);
    }, 150);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Эхлэх үед товч харагдах эсэхийг шалгах
    checkScrollPosition();
    // Цонхны хэмжээ өөрчлөгдөхөд дахин шалгах
    window.addEventListener('resize', checkScrollPosition);

    let isDown = false;
    let startX;
    let scrollLeft;

    const onMouseDown = (e) => {
      if (window.innerWidth < 768) return;
      isDown = true;
      setIsDragging(true);
      slider.style.cursor = 'grabbing';
      startX = e.clientX;
      scrollLeft = slider.scrollLeft;
      slider.style.userSelect = 'none';
      
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };

    const onMouseLeave = () => {
      isDown = false;
      slider.style.cursor = 'grab';
    };

    const onMouseUp = () => {
      isDown = false;
      slider.style.cursor = 'grab';
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.clientX;
      const walk = (x - startX) * 2.5; 
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', onMouseLeave);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('resize', checkScrollPosition);
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const items = container.querySelectorAll('.snap-item');
      if (items.length > 0) {
        const itemWidth = items[0].offsetWidth + 20; 
        const scrollAmount = direction === 'left' ? -itemWidth : itemWidth;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 md:gap-5 relative z-10">
      <h2 className="winner-title text-xl md:text-3xl pl-8 md:pl-8 xl:pl-[232px] uppercase tracking-wider">
        {title}
      </h2>
      
      <div className="relative w-full md:px-8 xl:px-[232px] group">
        
        {/* Left Button */}
        <button 
          onClick={() => scroll('left')}
          // z-index-ийг z-30 болгосон (зургийн урд гаргахын тулд)
          // !canScrollLeft үед бүр мөсөн нуух (opacity-0 pointer-events-none)
          className={`absolute left-2 md:left-4 xl:left-[190px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-md active:scale-90 transition-all shadow-lg
            ${(!canScrollLeft || isDragging) 
              ? 'opacity-0 pointer-events-none duration-200' 
              : 'md:opacity-0 md:group-hover:opacity-100 duration-300'}
          `}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div 
          ref={sliderRef}
          onScroll={handleScrollEvent}
          onTouchStart={() => setIsDragging(true)}
          className="flex overflow-x-auto gap-5 pt-4 pb-8 px-8 md:px-0 scrollbar-hide snap-container select-none cursor-grab active:cursor-grabbing"
        >
          {WINNERS_DATA.map((_, i) => (
            <div 
              key={i} 
              // Картын hover z-index нь 20 байгаа. Тиймээс товч нь z-30 байх хэрэгтэй.
              className="snap-item shrink-0 gold-card-outer w-[140px] md:w-[150px] xl:w-[200px]" 
              style={{ aspectRatio: '222/280' }}
            >
              <div className="inner-container">
                <img 
                  src="/win/win1.jpg" 
                  alt="Winner" 
                  className="w-full h-full object-cover pointer-events-none"
                  draggable="false"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button 
          onClick={() => scroll('right')}
          // z-index-ийг z-30 болгосон
          // !canScrollRight үед бүр мөсөн нуух
          className={`absolute right-2 md:right-4 xl:right-[190px] top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-md active:scale-90 transition-all shadow-lg
            ${(!canScrollRight || isDragging)
              ? 'opacity-0 pointer-events-none duration-200' 
              : 'md:opacity-0 md:group-hover:opacity-100 duration-300'}
          `}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WinnersScreen;
