import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Numpad from './Numpad'; 

const Icons = {
  Search: ({ color = "#B4B4B4", className = "" }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line> 
    </svg>
  ),
  ArrowRight: ({ color = "#B4B4B4", className = "" }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
  Back: ({ color = "#B4B4B4", className = "" }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  ),
  X: ({ color = "#B4B4B4", className = "" }) => (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
};

const CheckTicketScreen = () => {
  const [step, setStep] = useState('PHONE'); // 'PHONE' | 'OTP' | 'RESULT'
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [groupedTickets, setGroupedTickets] = useState([]);
  
  const [isNumpadOpen, setIsNumpadOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // --- 1. OTP ИЛГЭЭХ (MOCK) ---
  const handleRequestOtp = async () => {
    if (phoneNumber.replace(/\s/g, '').length < 8) return; 

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    setIsLoading(false);
    setStep('OTP'); 
    setOtpCode(""); 
    if (isMobile) setIsNumpadOpen(true); 
  };

  // --- 2. OTP БАТАЛГААЖУУЛАХ (MOCK) ---
  const handleVerifyOtp = async () => {
    if (otpCode.length < 4) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    performSearch(phoneNumber.replace(/\s/g, ''));
  };

  // --- 3. СУГАЛАА ХАЙХ ---
  const performSearch = (phoneRaw) => {
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
    setStep('RESULT');
    setIsNumpadOpen(false); 
  };

  // --- 4. RESET (X Button) ---
  const handleReset = () => {
    setStep('PHONE');
    setPhoneNumber("");
    setOtpCode("");
    setGroupedTickets([]);
    if (isMobile) setIsNumpadOpen(true);
  };

  const handleInputUpdate = (val) => {
    if (step === 'PHONE') {
        let raw = val.replace(/\s/g, '');
        if (raw.length > 8) raw = raw.slice(0, 8);
        
        let formatted = raw;
        if (raw.length > 4) {
             formatted = raw.slice(0, 4) + ' ' + raw.slice(4);
        }
        setPhoneNumber(formatted);
    } else if (step === 'OTP') {
        let raw = val.replace(/\s/g, '');
        if (raw.length > 4) raw = raw.slice(0, 4);
        setOtpCode(raw);
    }
  };

  const handleNumpadChange = (val) => {
    handleInputUpdate(val);
  };

  const handleDesktopChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    handleInputUpdate(rawVal);
  };

  const handleBack = (e) => {
    e.stopPropagation();
    setStep('PHONE');
    setOtpCode("");
  };

  const currentValue = step === 'PHONE' ? phoneNumber : otpCode;
  const placeholderText = step === 'PHONE' ? "Утасны дугаар оруулах" : "";
  const maxLength = step === 'PHONE' ? 8 : 4;

  return (
    <>
        <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@700&family=Play:wght@400;700&display=swap');
          .font-alt-bold { font-family: 'Montserrat Alternates', sans-serif; font-weight: 700; }
          .font-play { font-family: 'Play', sans-serif; }
          .custom-placeholder::placeholder { color: #D1D1D1; opacity: 1; }
        `}
        </style>

        {/* 1. BACKGROUND */}
        <div 
            className="fixed inset-0 z-0"
            style={{
                backgroundImage: "url('assets/background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        />

        {/* 2. CONTENT */}
        <div className="relative z-10 w-full min-h-screen flex flex-col items-center overflow-x-hidden pb-10">
            
            {/* SEARCH / INPUT SECTION */}
            <div className="w-full flex flex-col items-center pt-24 md:pt-32 lg:pt-40 pb-6">
                <div className="w-full max-w-[500px] px-6">
                    
                    {/* INPUT CONTAINER */}
                    <div 
                        className={`relative flex items-center w-full h-[54px] rounded-[16px] bg-[#1a2e2a]/90 border-[1.5px] ${step === 'OTP' ? 'border-[#2AFA62]' : 'border-[#D4AF37]'} transition-all shadow-xl backdrop-blur-sm cursor-pointer`}
                        onClick={() => {
                            if (step !== 'RESULT' && isMobile) setIsNumpadOpen(true);
                        }}
                    >
                        {/* BACK BUTTON */}
                        {step === 'OTP' && (
                            <div 
                                onClick={handleBack}
                                className="absolute left-0 pl-3 h-full flex items-center cursor-pointer z-20 hover:opacity-70 transition-opacity"
                            >
                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20">
                                   <Icons.Back className="w-5 h-5" color="#FFFFFF" />
                                </div>
                            </div>
                        )}

                        {step === 'OTP' && otpCode === "" && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                <span className="text-[#D1D1D1] font-bold text-lg font-play tracking-widest opacity-100">
                                    Баталгаажуулах код
                                </span>
                            </div>
                        )}

                        <input
                            ref={inputRef}
                            type="text"
                            readOnly={isMobile || step === 'RESULT'} 
                            value={currentValue}
                            onChange={(!isMobile && step !== 'RESULT') ? handleDesktopChange : undefined}
                            placeholder={placeholderText}
                            className={`w-full h-full bg-transparent outline-none ${step === 'OTP' ? 'pl-14 text-left tracking-[5px]' : 'px-6 text-left'} text-white font-bold text-lg font-play tracking-widest custom-placeholder cursor-pointer relative z-20`}
                        />

                        {/* ACTION BUTTON */}
                        <div className="absolute right-3 h-full flex items-center z-30">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (step === 'PHONE') handleRequestOtp();
                                    else if (step === 'OTP') handleVerifyOtp();
                                    else if (step === 'RESULT') handleReset(); 
                                }}
                                disabled={isLoading}
                                className={`h-[38px] w-[38px] flex items-center justify-center rounded-xl active:scale-95 transition-transform ${step === 'RESULT' ? 'bg-[#FF4D4D]' : ''}`} 
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
                                ) : (
                                    step === 'PHONE' ? (
                                        <div className="bg-[#D4AF37] p-2 rounded-lg">
                                             <Icons.ArrowRight className="w-5 h-5" color="#FFFFFF" />
                                        </div>
                                    ) : step === 'OTP' ? (
                                        <div className="bg-[#2AFA62] p-2 rounded-lg">
                                             <Icons.Search className="w-5 h-5" color="#000000" />
                                        </div>
                                    ) : (
                                        <div className="bg-[#FF4D4D] p-2 rounded-lg">
                                            <Icons.X className="w-5 h-5" color="#FFFFFF" />
                                        </div>
                                    )
                                )}
                            </button>
                        </div>
                    </div>

                    {/* HINT TEXT */}
                    {step === 'OTP' && (
                        <motion.p 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-center text-white/60 text-sm mt-3 font-alt-bold"
                        >
                            {phoneNumber} дугаарт ирсэн кодыг оруулна уу
                        </motion.p>
                    )}
                </div>
            </div>

            {/* RESULTS GRID */}
            <div className="w-full max-w-[1400px] px-6 mt-2">
                <AnimatePresence>
                    {step === 'RESULT' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0 }} 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {groupedTickets.length === 0 ? (
                                <div className="col-span-full flex flex-col items-center py-20 bg-black/40 rounded-3xl backdrop-blur-md border border-white/10">
                                    <p className="text-white font-play text-lg">Сугалаа олдсонгүй</p>
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
            {isMobile && step !== 'RESULT' && (
                <Numpad 
                    isOpen={isNumpadOpen}
                    value={step === 'PHONE' ? phoneNumber.replace(/\s/g, '') : otpCode}
                    onChange={handleNumpadChange}
                    onDone={() => {
                        if (step === 'PHONE') handleRequestOtp();
                        else if (step === 'OTP') handleVerifyOtp();
                        else setIsNumpadOpen(false);
                    }}
                    maxLength={maxLength}
                    submitLabel={step === 'PHONE' ? "ИЛГЭЭХ" : "ШАЛГАХ"}
                />
            )}
        </div>
    </>
  );
};

// --- СУГАЛААНЫ КАРТ (ШИНЭЧЛЭГДСЭН BACKGROUND) ---
const LotteryResultCard = ({ data }) => {
  const imageToShow = data.image || "/suglaa/1.png"; 

  return (
    <div 
        className="w-full rounded-[24px] shadow-2xl overflow-hidden border-[1.5px] border-[#D4AF37] flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02]"
        // BACKGROUND IMAGE HERE
        style={{
            backgroundImage: "url('assets/background.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#0f172a' // Fallback color
        }}
    >
        <div className="p-4 flex gap-4 items-center relative z-10">
            <div className="w-[74px] h-[74px] shrink-0 rounded-[14px] overflow-hidden border-[1.2px] border-[#D4AF37] bg-black/20">
                <img 
                  src={imageToShow} 
                  alt="Lottery" 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.src = "/suglaa/2.png"; }}
                />
            </div>

            <div className="flex flex-col">
                {/* ТЕКСТИЙН ӨНГИЙГ ЦАГААН БОЛГОВ */}
                <h3 className="text-white font-alt-bold text-[15px] leading-tight drop-shadow-md">
                    {data.lotteryName}
                </h3>
                <p className="text-white/80 font-alt-bold text-[15px] mt-1 opacity-70 drop-shadow-sm">
                    {data.itemName}
                </p>
            </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-[1px] relative z-10" style={{ background: 'linear-gradient(90deg, transparent 5%, #FFFFFF 20%, #FFFFFF 80%, transparent 95%)', opacity: 0.2 }} />

        <div className="p-4 flex-grow bg-black/10 relative z-10">
            <div className="flex flex-wrap gap-2">
                {data.numbers.map((num, i) => {
                    const isWinner = num === data.winningNumber || num.toString() === data.winningNumber?.toString();
                    return (
                        <div 
                            key={i} 
                            className={`flex items-center justify-center px-3 py-1 rounded-[5px] font-bold font-play text-[12px] shadow-sm min-w-[60px] 
                                      ${isWinner ? 'bg-[#2AFA62] ring-2 ring-[#1a9e3e] scale-110 text-black' : 'bg-[#1a2e2a]/80 text-white border border-[#D4AF37]/50'} 
                                      transition-transform`}
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
