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
  const scrollTimeout = useRef(null); // Scroll зогсолтыг хянах timer

  // Scroll хөдөлгөөнийг хянах функц (Mobile & Desktop аль алинд нь ажиллана)
  const handleScrollEvent = () => {
    // Хөдөлж эхлэнгүүт нууна
    setIsDragging(true);

    // Өмнөх timer-ийг устгана (хэрвээ дахин scroll хийгдвэл)
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // 150ms-ийн дараа хөдөлгөөн зогссон гэж үзээд товчийг гаргана
    scrollTimeout.current = setTimeout(() => {
      setIsDragging(false);
    }, 150);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // Desktop Mouse Events
    const onMouseDown = (e) => {
      if (window.innerWidth < 768) return;
      isDown = true;
      setIsDragging(true);
      slider.style.cursor = 'grabbing';
      startX = e.clientX;
      scrollLeft = slider.scrollLeft;
      slider.style.userSelect = 'none';
      
      // Drag хийж байхад timer-ийг цуцлах (гараар чирж байхад алга болохгүй байхгүйн тулд)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };

    const onMouseLeave = () => {
      isDown = false;
      // Mouse гарсан үед шууд харуулахгүй, scroll дуусахыг хүлээнэ (handleScrollEvent зохицуулна)
      slider.style.cursor = 'grab';
    };

    const onMouseUp = () => {
      isDown = false;
      // Mouse тавьсан үед шууд харуулахгүй, scroll дуусахыг хүлээнэ
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
          className={`absolute left-2 md:left-4 xl:left-[190px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-md active:scale-90 transition-all shadow-lg
            ${isDragging ? 'opacity-0 pointer-events-none duration-200' : 'md:opacity-0 md:group-hover:opacity-100 duration-300'}
          `}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div 
          ref={sliderRef}
          // Энд onScroll ашигласан нь хамгийн найдвартай арга
          onScroll={handleScrollEvent}
          // Touch эхлэхэд шууд нуух (илүү хурдан хариу үйлдэл үзүүлэхийн тулд)
          onTouchStart={() => setIsDragging(true)}
          className="flex overflow-x-auto gap-5 pt-4 pb-8 px-8 md:px-0 scrollbar-hide snap-container select-none cursor-grab active:cursor-grabbing"
        >
          {WINNERS_DATA.map((_, i) => (
            <div 
              key={i} 
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
          className={`absolute right-2 md:right-4 xl:right-[190px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-md active:scale-90 transition-all shadow-lg
            ${isDragging ? 'opacity-0 pointer-events-none duration-200' : 'md:opacity-0 md:group-hover:opacity-100 duration-300'}
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
