import React from 'react';

// Жишээ өгөгдөл
const WINNERS_DATA = [
  { id: 1, title: "LEXUS RX 350", luckyNumber: "A4F92K", phone: "9911 2***", date: "2024.02.01", img: "/win/win1.jpg" },
  { id: 2, title: "IPHONE 15 PRO", luckyNumber: "B77X12", phone: "8805 1***", date: "2024.02.03", img: "/win/win1.jpg" },
  { id: 3, title: "5 САЯ ТӨГРӨГ", luckyNumber: "C90L01", phone: "9191 8***", date: "2024.02.05", img: "/win/win1.jpg" },
  { id: 4, title: "SUPER ЯЛАГЧ", luckyNumber: "S11K99", phone: "8080 3***", date: "2024.02.06", img: "/win/win1.jpg" },
  { id: 5, title: "LAND CRUISER", luckyNumber: "LC300X", phone: "9900 9***", date: "2024.02.08", img: "/win/win1.jpg" },
  { id: 6, title: "MACBOOK PRO", luckyNumber: "M2PRO5", phone: "9515 7***", date: "2024.02.10", img: "/win/win1.jpg" },
  { id: 7, title: "PLAYSTATION 5", luckyNumber: "PS5X01", phone: "8686 2***", date: "2024.02.12", img: "/win/win1.jpg" },
  { id: 8, title: "AIRPODS MAX", luckyNumber: "APM999", phone: "9444 5***", date: "2024.02.14", img: "/win/win1.jpg" },
];

const WinnersScreen = () => {
  return (
    <>
      {/* 1. FIXED BACKGROUND LAYER */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/background.jpg')",
          backgroundColor: '#0f172a', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10 w-full min-h-screen flex flex-col pt-24 md:pt-32 pb-20 px-4 md:px-8 space-y-6">
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;700;900&family=Roboto:wght@400;500;700&display=swap');
            
            /* Section Title Style */
            .section-title {
              font-family: 'Montserrat Alternates', sans-serif;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 1px;
              background: linear-gradient(180deg, #FFFFFF 0%, #E2E2E2 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
            }

            /* Gold Gradient Border & Outer Card */
            .winner-card-outer {
              position: relative;
              background: linear-gradient(135deg, #A54400 0%, #F8BE53 50%, #A54400 100%);
              padding: 2px; 
              border-radius: 16px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.5);
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              height: 100%;
            }

            .winner-card-outer:hover {
              transform: translateY(-3px);
              box-shadow: 0 10px 25px rgba(248, 190, 83, 0.2);
            }

            .winner-card-inner {
              width: 100%;
              height: 100%;
              background: #1e293b; 
              border-radius: 14px; 
              overflow: hidden;    
              display: flex;
              flex-direction: row;
            }

            .text-gold-gradient {
               background: linear-gradient(90deg, #F8BE53, #FFD700);
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;
            }
          `}
        </style>

        {/* Header */}
        <div className="w-full max-w-[1400px] mx-auto text-center md:text-left mb-4">
           <h2 className="section-title text-2xl md:text-3xl pl-0 md:pl-2">
             ТОХИРЛЫН ЯЛАГЧИД
           </h2>
        </div>

        {/* GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 w-full max-w-[1400px] mx-auto pb-10 justify-items-center md:justify-items-stretch">
          {WINNERS_DATA.map((item, i) => (
            <div 
              key={i} 
              // Card Width & Height Adjustment
              // w-[335px]: Өргөнийг бага зэрэг нэмж текстийг багтаав
              // h-[160px]: Өндрийг тохируулав (зураг дөрвөлжин харагдахад дөхөм болгож)
              className="winner-card-outer w-[335px] h-[160px] md:w-auto md:h-[180px]"
            >
              <div className="winner-card-inner">
                
                {/* 1. Зүүн талд: ЗУРАГ 
                    w-[130px]: Тогтмол өргөн өгснөөр зургийг гонзгой биш, дөрвөлжин харагдуулна.
                    h-full: Өндөртэйгээ тэнцүүлэхийг зорив.
                */}
                <div className="w-[130px] md:w-[150px] h-full relative overflow-hidden border-r border-white/10 shrink-0">
                   <img 
                     src={item.img} 
                     alt="Winner" 
                     className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                   />
                   <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent"></div>
                </div>

                {/* 2. Баруун талд: МЭДЭЭЛЭЛ (Үлдсэн зайг эзэлнэ: flex-1) */}
                <div 
                  className="flex-1 flex flex-col justify-between p-3 md:p-4
                             bg-[url('/assets/background.jpg')] bg-cover bg-center bg-no-repeat"
                >
                    {/* Content Wrapper */}
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        
                        {/* Дээд хэсэг: Гарчиг */}
                        <div>
                            <h3 className="font-['Montserrat_Alternates'] font-bold text-white text-sm md:text-base leading-tight line-clamp-2 uppercase drop-shadow-md">
                                {item.title}
                            </h3>
                        </div>

                        {/* Дунд хэсэг: Азын КОД */}
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] md:text-xs text-gray-300 font-medium uppercase drop-shadow-sm">Азын тоо:</span>
                            <span className="text-gold-gradient font-bold font-mono text-sm md:text-lg tracking-wider drop-shadow-sm">
                                {item.luckyNumber}
                            </span>
                        </div>

                        {/* Доод хэсэг: Шугам + Ялагч + Огноо + ТОВЧ */}
                        <div className="flex flex-col gap-1.5">
                            <div className="w-full h-[1px] bg-white/30 shadow-sm"></div>
                            
                            <div className="flex justify-between items-end">
                                {/* Ялагч */}
                                <div className="flex flex-col">
                                    <span className="text-[9px] md:text-[10px] text-gray-300 uppercase drop-shadow-sm">Ялагч</span>
                                    <span className="text-white font-bold text-xs md:text-sm font-['Roboto'] drop-shadow-sm">
                                        {item.phone}
                                    </span>
                                </div>

                                {/* Огноо */}
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] md:text-[10px] text-gray-300 uppercase drop-shadow-sm">Огноо</span>
                                    <span className="text-gray-200 font-medium text-[10px] md:text-xs font-['Roboto'] drop-shadow-sm">
                                        {item.date}
                                    </span>
                                </div>
                            </div>

                            {/* --- LIVE ҮЗЭХ ТОВЧ --- */}
                            <button 
                                onClick={() => window.open('https://facebook.com/yourpage/live', '_blank')}
                                className="w-full mt-0.5 group relative flex items-center justify-center gap-2 py-1 rounded-lg overflow-hidden transition-all duration-300 active:scale-95 bg-black/40 hover:bg-black/60 border border-[#F8BE53]/50 hover:border-[#F8BE53]"
                            >
                                {/* Blinking Red Dot */}
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                                </span>
                                
                                <span className="text-[10px] md:text-xs font-bold text-[#F8BE53] uppercase tracking-widest group-hover:text-white transition-colors">
                                    Live үзэх
                                </span>
                                
                                {/* Play Icon */}
                                <svg className="w-3 h-3 fill-current text-[#F8BE53] group-hover:text-white transition-colors" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>

                        </div>
                    </div>

                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
};

export default WinnersScreen;
