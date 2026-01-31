import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Numpad from './Numpad'; // Numpad-ийг импортлох

const Icons = {
  Search: ({ color = "#B4B4B4", className = "" }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line> 
    </svg>
  ),
};

const CheckTicketScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [groupedTickets, setGroupedTickets] = useState([]);
  
  // NUMPAD STATE
  const [isNumpadOpen, setIsNumpadOpen] = useState(false);

  const performSearch = async (phoneRaw) => {
    setIsLoading(true);
    setHasSearched(false);
    setGroupedTickets([]);
    setIsNumpadOpen(false); // Хайлт эхлэхэд гарыг хаах

    await new Promise(resolve => setTimeout(resolve, 800));

    const allTickets = JSON.parse(localStorage.getItem('baavar_tickets') || '[]');
    const myTickets = allTickets.filter(t => t.phoneNumber === phoneRaw);
    
    const groups = myTickets.reduce((acc, ticket) => {
        const groupKey = (ticket.lotteryName || "") + (ticket.itemName || "");
        if (!acc[groupKey]) {
            acc[groupKey] = {
                lotteryName: ticket.lotteryName || "Баавар Сугалаа",
                itemName: ticket.itemName || "Lexus RX",
                image: ticket.image || ticket.imageUrl,
                winningNumber: ticket.winningNumber,
                numbers: []
            };
        }
        let numbers = Array.isArray(ticket.luckyNumbers) ? ticket.luckyNumbers : [ticket.luckyNumbers];
        numbers.forEach(num => { if(num) acc[groupKey].numbers.push(num); });
        return acc;
    }, {});

    setGroupedTickets(Object.values(groups));
    setIsLoading(false);
    setHasSearched(true);
  };

  // Numpad-аас ирэх утгыг боловсруулах
  const handleNumpadChange = (val) => {
    // Утасны дугаар форматлах (xxxx xxxx)
    let formatted = val;
    if (val.length > 4) {
        formatted = val.slice(0, 4) + ' ' + val.slice(4);
    }
    setPhoneNumber(formatted);

    // 8 оронтой болмогц хайлт хийх
    if (val.length === 8) {
        performSearch(val);
    } else {
        setHasSearched(false);
    }
  };

  return (
    <>
        <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@700&family=Play:wght@400;700&display=swap');
          .font-alt-bold { font-family: 'Montserrat Alternates', sans-serif; font-weight: 700; }
          .font-play { font-family: 'Play', sans-serif; }
          .custom-placeholder::placeholder { color: #D1D1D1; opacity: 1; }
          
          /* Background тохиргоог зөвхөн className-д ашиглана */
        `}
        </style>

        {/* --- FIXED BACKGROUND LAYERS (SCROLL FIX) --- */}
        <div className="fixed inset-0 z-0">
            <img 
                src="assets/background.jpg" 
                alt="bg" 
                className="w-full h-full object-cover"
            />
            {/* Overlay байхгүй, зураг тод харагдана */}
        </div>

        {/* --- SCROLLABLE CONTENT WRAPPER --- */}
        <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden relative z-10 pb-40">
            
            {/* SEARCH SECTION - pt-24 болгож доошлуулсан */}
            <div className="relative w-full flex flex-col items-center pt-24 pb-6">
                <div className="w-full max-w-[500px] px-6">
                    <div 
                        className="relative flex items-center w-full h-[54px] rounded-[16px] bg-[#1a2e2a]/90 border-[1.5px] border-[#D4AF37] focus-within:border-[#D4AF37] transition-all shadow-xl backdrop-blur-sm cursor-pointer"
                        onClick={() => setIsNumpadOpen(true)} // Input дээр дарахад Numpad нээгдэнэ
                    >
                        <input
                            type="text"
                            readOnly // Гарнаас шивэхийг хориглож зөвхөн Numpad ашиглана
                            value={phoneNumber}
                            placeholder="Утасны дугаар оруулах"
                            className="w-full h-full bg-transparent outline-none px-6 text-white font-bold text-lg font-play tracking-widest custom-placeholder cursor-pointer"
                        />
                        <div className="absolute right-5">
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
                            ) : (
                                <Icons.Search className="w-5 h-5" color="#D4AF37" />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* RESULTS GRID */}
            <div className="w-full max-w-[1400px] px-6 mt-8 relative">
                <AnimatePresence>
                    {hasSearched && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0 }} 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {groupedTickets.length === 0 ? (
                                <div className="col-span-full text-center py-20 text-white font-play bg-black/40 rounded-3xl backdrop-blur-md border border-white/10">
                                    Сугалаа олдсонгүй
                                </div>
                            ) : (
                                groupedTickets.map((group, idx) => (
                                    <LotteryResultCard key={idx} data={group} />
                                ))
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* NUMPAD COMPONENT */}
            <Numpad 
                isOpen={isNumpadOpen}
                value={phoneNumber.replace(/\s/g, '')} // Хоосон зайг арилгаж дамжуулна
                onChange={handleNumpadChange}
                onDone={() => setIsNumpadOpen(false)}
                maxLength={8}
            />
        </div>
    </>
  );
};

const LotteryResultCard = ({ data }) => {
  const imageToShow = data.image || "/suglaa/3.jpg"; 

  return (
    <div className="w-full bg-white rounded-[24px] shadow-2xl overflow-hidden border-[1.5px] border-[#D4AF37] flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02]">
        <div className="p-4 flex gap-4 items-center">
            <div className="w-[74px] h-[74px] shrink-0 rounded-[14px] overflow-hidden border-[1.2px] border-[#D4AF37] bg-gray-50">
                <img 
                  src={imageToShow} 
                  alt="Lottery" 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.src = "/suglaa/3.jpg"; }}
                />
            </div>

            <div className="flex flex-col">
                <h3 className="text-[#000000] font-alt-bold text-[15px] leading-tight">
                    {data.lotteryName}
                </h3>
                <p className="text-[#000000] font-alt-bold text-[15px] mt-1 opacity-70">
                    {data.itemName}
                </p>
            </div>
        </div>

        <div className="w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent 5%, #9D9D9D 20%, #9D9D9D 80%, transparent 95%)', opacity: 0.3 }} />

        <div className="p-4 flex-grow bg-gray-50/50">
            <div className="flex flex-wrap gap-2">
                {data.numbers.map((num, i) => {
                    const isWinner = num === data.winningNumber || num.toString() === data.winningNumber?.toString();
                    return (
                        <div 
                            key={i} 
                            className={`flex items-center justify-center px-3 py-1 rounded-[5px] font-bold font-play text-[12px] shadow-sm min-w-[60px] ${isWinner ? 'bg-[#2AFA62] ring-2 ring-[#1a9e3e] scale-110' : 'bg-[#A6ECFF]'} text-[#000000] transition-transform`}
                        >
                            {num}
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  );
};

export default CheckTicketScreen;
