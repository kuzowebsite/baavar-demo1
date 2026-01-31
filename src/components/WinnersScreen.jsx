import React, { useRef, useEffect } from 'react';

const WINNERS_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const WinnersScreen = () => {
  return (
    <div className="w-full min-h-screen main-bg flex flex-col pt-28 md:pt-32 pb-20 space-y-12 overflow-x-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@700&display=swap');
          
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          
          .main-bg {
            background-image: url('assets/background.jpg') !important;
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-repeat: no-repeat;
          }

          .winner-title {
            font-family: 'Montserrat Alternates', sans-serif;
            font-weight: 700;
            background: linear-gradient(to bottom, #FFE37C, #A6690F);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            /* Текстийн сүүдэр */
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
          }

          /* Зургийн бүдүүн алтлаг хүрээ болон сүүдэр */
          .gold-card-outer {
            position: relative;
            background: linear-gradient(180deg, #FFE37C 0%, #A6690F 100%);
            padding: 1px; /* Хүрээг бүдүүн болгосон (4px) */
            border-radius: 16px;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.6));
            transition: transform 0.3s ease;
          }

          .gold-card-outer:hover {
            transform: scale(1.02);
          }

          .inner-container {
            width: 100%;
            height: 100%;
            background-color: #1a1a1a;
            border-radius: 16px; /* Хүрээний дотор талын булан */
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
  );
};

const WinnerSection = ({ title }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const onMouseDown = (e) => {
      if (window.innerWidth < 768) return;
      isDown = true;
      slider.style.cursor = 'grabbing';
      startX = e.clientX;
      scrollLeft = slider.scrollLeft;
      slider.style.userSelect = 'none';
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
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const items = container.querySelectorAll('.snap-item');
      if (items.length > 0) {
        const itemWidth = items[0].offsetWidth + 20; // gap-5 (20px)
        const scrollAmount = direction === 'left' ? -itemWidth : itemWidth;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 md:gap-7 relative z-10">
      <h2 className="winner-title text-2xl md:text-4xl pl-8 md:pl-[232px] uppercase tracking-wider">
        {title}
      </h2>
      
      <div className="relative w-full md:px-[232px] group">
        
        {/* Зүүн сум */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 md:left-[242px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-md active:scale-90 transition-all md:opacity-0 md:group-hover:opacity-100 shadow-lg"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div 
          ref={sliderRef}
          className="flex overflow-x-auto gap-5 pb-8 px-8 md:px-0 scrollbar-hide snap-container select-none cursor-grab active:cursor-grabbing"
        >
          {WINNERS_DATA.map((_, i) => (
            <div 
              key={i} 
              className="snap-item shrink-0 gold-card-outer w-[170px] md:w-[240px]" 
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

        {/* Баруун сум */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 md:right-[10px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center text-white backdrop-blur-md active:scale-90 transition-all md:opacity-0 md:group-hover:opacity-100 shadow-lg"
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