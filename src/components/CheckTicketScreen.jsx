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
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("PHONE"); // PHONE, OTP, RESULTS
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [groupedTickets, setGroupedTickets] = useState([]);
  
  // NUMPAD STATE
  const [isNumpadOpen, setIsNumpadOpen] = useState(false);

  const performSearch = async (phoneRaw) => {
    setIsLoading(true);
    setHasSearched(false);
    setIsNumpadOpen(false);

    await new Promise(resolve => setTimeout(resolve, 800));

    const allTickets = JSON.parse(localStorage.getItem('baavar_tickets') || '[]');
    const myTickets = allTickets.filter(t => t.phoneNumber === phoneRaw);
    
    const groups = myTickets.reduce((acc, ticket) => {
        const groupKey = (ticket.lotteryName || "") + (ticket.itemName || "");
        
        if (!acc[groupKey]) {
            acc[groupKey] = {
                lotteryName: ticket.lotteryName || "Баавар Сугалаа",
                itemName: ticket.itemName || "Сугалаа",
                image: ticket.image || ticket.imageUrl, 
                winningNumber: ticket.winningNumber,
                numbers: []
            };
        }

        let numbers = [];
        if (Array.isArray(ticket.luckyNumbers)) numbers = ticket.luckyNumbers;
        else if (ticket.luckyNumbers) numbers = [ticket.luckyNumbers];
        else if (ticket.number) numbers = [ticket.number];

        numbers.forEach(num => { 
            if(num && !acc[groupKey].numbers.includes(num)) {
                acc[groupKey].numbers.push(num); 
            }
        });

        return acc;
    }, {});

    setGroupedTickets(Object.values(groups));
    setIsLoading(false);
    setHasSearched(true);
    setStep("RESULTS");
  };

  const handleNumpadChange = (val) => {
    if (step === "PHONE" || step === "RESULTS") {
      let formatted = val;
      if (val.length > 4) formatted = `${val.slice(0, 4)} ${val.slice(4)}`;
      setPhoneNumber(formatted);

      if (val.length < 8) {
          setHasSearched(false);
          setStep("PHONE");
          setOtp("");
      }

      if (val.length === 8) {
          setIsLoading(true);
          setIsNumpadOpen(false);
          setTimeout(() => {
              setIsLoading(false);
              setStep("OTP");
              setIsNumpadOpen(true);
          }, 600);
      }
    } else if (step === "OTP") {
      setOtp(val);
      if (val === "1234") {
          const rawPhone = phoneNumber.replace(/\s/g, '');
          performSearch(rawPhone);
      }
    }
  };

  return (
    <>
        <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@700&family=Play:wght@400;700&display=swap');
          .font-alt-bold { font-family: 'Montserrat Alternates', sans-serif; font-weight: 700; }
          .font-play { font-family: 'Play', sans-serif; }
          .custom-placeholder::placeholder { color: #AFAFAF; opacity: 1; }
        `}
        </style>

        {/* --- FIXED BACKGROUND LAYERS (SCROLL FIX) --- */}
        <div className="fixed inset-0 z-0">
            {/* Үндсэн зураг */}
            <img 
                src="assets/background.jpg" 
                alt="bg" 
                className="w-full h-full object-cover"
            />
            {/* Хар өнгийн overlay (Уншигдахад хялбар болгох) */}
            <div className="absolute inset-0 bg-[#1a2e2a]/80"></div>
            {/* Цэгэн хээ */}
            <div className="absolute inset-0 opacity-10" 
                 style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px'}}>
            </div>
        </div>

        {/* --- SCROLLABLE CONTENT WRAPPER --- */}
        {/* relative z-10 өгснөөр арын зургийн дээр гарч ирнэ */}
        <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden relative z-10 pb-40">
            
            <div className="relative w-full flex flex-col items-center pt-24 pb-10">
                <div className="w-full max-w-[500px] px-6">
                    <AnimatePresence mode="wait">
                        {(step === "PHONE" || step === "RESULTS") && (
                            <motion.div 
                                key="phone-input"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative flex items-center w-full h-[56px] rounded-[16px] bg-[#F9F9F9] border-[1.5px] border-[#D4AF37] shadow-2xl cursor-pointer"
                                onClick={() => setIsNumpadOpen(true)}
                            >
                                <input
                                    type="text"
                                    readOnly
                                    value={phoneNumber}
                                    placeholder="Утасны дугаар"
                                    className="w-full h-full bg-transparent outline-none px-6 text-[#1a2e2a] font-bold text-xl font-play tracking-[0.2em] custom-placeholder cursor-pointer"
                                />
                                <div className="absolute right-5">
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
                                    ) : (
                                        <Icons.Search className="w-5 h-5" color="#D4AF37" />
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {step === "OTP" && (
                            <motion.div 
                                key="otp-input"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col items-center w-full"
                            >
                                <p className="text-white font-play mb-4 text-sm opacity-80">(Түр зуурын код: 1234)</p>
                                <div 
                                    className="relative flex items-center w-full h-[56px] rounded-[16px] bg-white border-[1.5px] border-[#D4AF37] shadow-2xl cursor-pointer"
                                    onClick={() => setIsNumpadOpen(true)}
                                >
                                    <input
                                        type="text"
                                        readOnly
                                        value={otp}
                                        placeholder="OTP Код"
                                        className="w-full h-full bg-transparent outline-none px-6 text-center text-[#1a2e2a] font-bold text-2xl font-play tracking-[0.5em] custom-placeholder cursor-pointer"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="w-full max-w-[1400px] px-6 mt-4 relative">
                <AnimatePresence>
                    {hasSearched && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {groupedTickets.length === 0 ? (
                                <div className="col-span-full text-center py-20 text-white font-play bg-black/20 backdrop-blur-sm rounded-3xl">
                                    Танд одоогоор сугалаа байхгүй байна.
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
                value={step === "OTP" ? otp : phoneNumber.replace(/\s/g, '')}
                onChange={handleNumpadChange}
                onDone={() => setIsNumpadOpen(false)}
                maxLength={step === "OTP" ? 4 : 8}
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
