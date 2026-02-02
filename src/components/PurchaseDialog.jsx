import React, { useState, useEffect } from 'react';
import Numpad from './Numpad';

// --- ICONS ---
const Icons = {
  Close: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  CheckSquare: ({ checked }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={checked ? "#068071" : "#D1D5DB"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4" ry="4"></rect>
      {checked && <polyline points="9 11 12 14 22 4" stroke="#068071" strokeWidth="3" transform="translate(-2, 2)"></polyline>}
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Minus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Loader: () => (
    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
  ),
  QrCode: () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
      <path d="M10 3h4v4h-4z"></path>
      <path d="M10 17h4v4h-4z"></path>
      <path d="M3 10h18"></path>
    </svg>
  ),
  Success: () => (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#068071" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  Lock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  Refresh: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6"></path>
      <path d="M1 20v-6h6"></path>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  ),
  Alert: () => (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  )
};

const PurchaseDialog = ({ 
  title = "", 
  lotteryCode = "",
  lotteryType = "",
  basePrice = 0, 
  imageUrl = "", 
  onClose, 
  initialQuantity = 1 
}) => {
  const isFree = basePrice === 0;

  // --- STATE ---
  const [currentStep, setCurrentStep] = useState(1);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpTimeLeft, setOtpTimeLeft] = useState(60); 
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  const [remainingSeconds, setRemainingSeconds] = useState(300); 
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('qpay');
  const [luckyNumbers, setLuckyNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false); 
  
  // Банкны шалгалт амжилтгүй болсон эсэхийг хадгалах state
  const [isBankCheckFailed, setIsBankCheckFailed] = useState(false);

  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const [processedImage, setProcessedImage] = useState(imageUrl);
  
  // NUMPAD STATE
  const [isNumpadOpen, setIsNumpadOpen] = useState(false);
  
  // MOBILE CHECK STATE
  const [isMobile, setIsMobile] = useState(false);

  const totalPrice = basePrice * quantity;
  const rawPhoneNumber = phoneNumber.replace(/\s/g, ''); 
  const isPhoneValid = rawPhoneNumber.length === 8;
  const isOtpValid = otpInput.length === 4 && !isOtpExpired;

  // --- SCREEN SIZE CHECK ---
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // --- IMAGE CONVERSION ---
  useEffect(() => {
    const processImage = async () => {
        if (!imageUrl) return;
        if (typeof imageUrl === 'string' && !imageUrl.startsWith('blob:')) {
            setProcessedImage(imageUrl);
            return;
        }
        try {
            if (imageUrl instanceof File) {
                const reader = new FileReader();
                reader.onload = () => setProcessedImage(reader.result);
                reader.readAsDataURL(imageUrl);
            } 
            else if (typeof imageUrl === 'string' && imageUrl.startsWith('blob:')) {
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => setProcessedImage(reader.result);
                reader.readAsDataURL(blob);
            }
        } catch (error) {
            console.error("Image Error:", error);
            setProcessedImage(imageUrl);
        }
    };
    processImage();
  }, [imageUrl]);
  
  // --- TIMERS ---
  useEffect(() => {
    if (remainingSeconds <= 0) {
      onClose(); 
      return;
    }
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingSeconds, onClose]);

  useEffect(() => {
    let timer = null;
    if (currentStep === 2 && otpTimeLeft > 0) {
        timer = setInterval(() => {
            setOtpTimeLeft(prev => prev - 1);
        }, 1000);
    } else if (otpTimeLeft === 0) {
        setIsOtpExpired(true);
    }
    return () => clearInterval(timer);
  }, [currentStep, otpTimeLeft]);

  // Гарнаас гадуур дарахад гарыг хаах
  const handleOverlayClick = () => {
    if (isNumpadOpen) setIsNumpadOpen(false);
  };

  const formatTimer = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatMoney = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const generateLuckyNumbers = (count) => {
    const nums = new Set();
    while (nums.size < count) {
        nums.add(generateRandomString(6));
    }
    return Array.from(nums);
  };

  const saveToStorage = (status = 'Paid', numbers = []) => {
    const ticketData = {
        id: Date.now(),
        phoneNumber: rawPhoneNumber,
        lotteryName: title, 
        itemName: lotteryType, 
        image: processedImage,
        luckyNumbers: numbers.length > 0 ? numbers : luckyNumbers, 
        drawDate: "2024.12.01",
        winningNumber: null,
        status: status,
        timestamp: Date.now()
    };

    const existingData = JSON.parse(localStorage.getItem('baavar_tickets') || '[]');
    localStorage.setItem('baavar_tickets', JSON.stringify([...existingData, ticketData]));
  };

  const handleNumpadChange = (val) => {
    if (currentStep === 1) {
      let formatted = val;
      if (val.length > 4) {
          formatted = val.slice(0, 4) + ' ' + val.slice(4);
      }
      setPhoneNumber(formatted);
    } else if (currentStep === 2) {
      if (!isOtpExpired) setOtpInput(val);
    }
  };

  const handleDesktopInputChange = (e) => {
      const rawVal = e.target.value.replace(/[^0-9]/g, '');
      if (currentStep === 1) {
          if (rawVal.length <= 8) {
              handleNumpadChange(rawVal);
          }
      } 
      else if (currentStep === 2) {
          if (rawVal.length <= 4) {
              handleNumpadChange(rawVal);
          }
      }
  };

  const handleResendOtp = () => {
      setOtpTimeLeft(60); 
      setIsOtpExpired(false);
      setOtpInput('');
      const demoCode = "1234";
      setGeneratedOtp(demoCode);
      alert(`Код: ${demoCode}`);
  };

  // --- NAVIGATION ---
  const handleNext = () => {
    setIsNumpadOpen(false); 
    if (currentStep === 1) {
        if (!isPhoneValid) return;
        const demoCode = "1234";
        setGeneratedOtp(demoCode);
        setOtpTimeLeft(60); 
        setIsOtpExpired(false);
        setOtpInput('');
        alert(`Код: ${demoCode}`);
        setCurrentStep(2);
        return;
    }

    if (currentStep === 2) {
        if (isOtpExpired || otpInput !== generatedOtp) {
            alert("Код буруу эсвэл хугацаа дууссан!");
            return;
        }
        setCurrentStep(3);
        return;
    }

    if (currentStep === 3) {
        setCurrentStep(4);
        return;
    }

    if (currentStep === 4) {
        const nums = generateLuckyNumbers(quantity);
        setLuckyNumbers(nums);
        
        if (isFree) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setIsPaymentSuccess(true);
                saveToStorage('Paid', nums); 
                setCurrentStep(8); 
            }, 1000);
        } else {
            setCurrentStep(5);
        }
        return;
    }

    if (currentStep === 5) {
        if (selectedPaymentMethod === 'qpay') setCurrentStep(6);
        else setCurrentStep(7);
        return;
    }
  };

  const handleBack = () => {
    setIsNumpadOpen(false);
    if (currentStep > 1) {
      if (currentStep === 6 || currentStep === 7) {
          setCurrentStep(5);
          setIsBankCheckFailed(false); // Банкны step-ээс буцахад алдааг цэвэрлэнэ
      }
      else setCurrentStep(prev => prev - 1);
      setIsPaymentSuccess(false); 
    }
  };

  // QPay Шалгах (Амжилттай)
  const handleCheckPayment = () => {
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          setIsPaymentSuccess(true); 
          saveToStorage('Paid', luckyNumbers); 
      }, 2000);
  };

  // Банк Шалгах (Амжилтгүй)
  const handleBankCheck = () => {
      setIsLoading(true);
      setIsBankCheckFailed(false); // Reset
      setTimeout(() => {
          setIsLoading(false);
          setIsBankCheckFailed(true); // Алдааны мэдээлэл харуулна
          // Хадгалахгүй
      }, 2000);
  };

  const handleFinish = () => {
      saveToStorage('Pending', luckyNumbers);
      onClose();
  };

  const handleCloseRequest = () => {
      if (isPaymentSuccess) onClose();
      else setShowExitConfirm(true);
  };

  const confirmClose = () => {
      setShowExitConfirm(false);
      onClose();
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Утасны дугаар";
      case 2: return "Баталгаажуулах";
      case 3: return "Тоо ширхэг";
      case 4: return "Захиалга хянах";
      case 5: return "Төлбөрийн нөхцөл";
      case 6: return isPaymentSuccess ? "Амжилттай" : "QPay";
      case 7: return isBankCheckFailed ? "Анхааруулга" : "Банк"; 
      case 8: return "Амжилттай";
      default: return "";
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1: 
        return (
          <div className="flex flex-col items-center w-full justify-center h-full">
            <p className="text-center mb-[6px] text-xs font-play">Та өөрийн дугаарыг оруулна уу</p>
            <input
              type="text"
              value={phoneNumber}
              readOnly={isMobile}
              onChange={!isMobile ? handleDesktopInputChange : undefined}
              onClick={() => isMobile && setIsNumpadOpen(true)}
              placeholder="8090 1860" 
              className="w-full max-w-[320px] h-[35px] rounded-[8px] border border-[#D9D9D9] bg-white font-play text-sm text-center outline-none text-black cursor-pointer"
            />
          </div>
        );

      case 2: 
        return (
            <div className="flex flex-col items-center w-full justify-center h-full">
                <p className="text-center mb-[6px] text-xs font-play">{phoneNumber} дугаарт илгээсэн кодыг оруулна уу</p>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={otpInput}
                        readOnly={isMobile}
                        onChange={!isMobile ? handleDesktopInputChange : undefined}
                        onClick={() => isMobile && !isOtpExpired && setIsNumpadOpen(true)}
                        placeholder="1234"
                        className={`w-[120px] h-[35px] rounded-[8px] border bg-white font-play text-lg text-center outline-none cursor-pointer ${
                            isOtpExpired ? 'border-red-400 bg-red-50 text-red-500' : 'border-[#D9D9D9]'
                        }`}
                    />
                    <div className="w-[60px] h-[35px] rounded-[8px] border flex items-center justify-center text-sm font-bold font-play">
                        {formatTimer(otpTimeLeft)}
                    </div>
                </div>
                {isOtpExpired && <button onClick={handleResendOtp} className="mt-2 text-[#068071] text-[11px] font-bold">Дахин илгээх</button>}
            </div>
        );
      case 3: 
        return (
          <div className="flex flex-col items-center w-full justify-center h-full">
            <p className="text-center mb-[6px] text-xs font-play px-8">
              {isFree ? "Үнэгүй сугалаа зөвхөн 1 удаа оролцох эрхтэй." : "Та тасалбарын тоо ширхэгийг сонгоно уу."}
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => quantity > 1 && setQuantity(q => q - 1)} disabled={isFree} className="w-[40px] h-[30px] border rounded-[8px]">-</button>
              <div className="w-[80px] h-[30px] flex items-center justify-center border rounded-[8px] font-bold">{quantity}</div>
              <button onClick={() => setQuantity(q => q + 1)} disabled={isFree} className="w-[40px] h-[30px] border rounded-[8px]">{isFree ? <Icons.Lock /> : "+"}</button>
            </div>
          </div>
        );
      case 4: 
        return (
          <div className="flex flex-col w-full px-6 justify-center h-full pt-4"> 
            <div className="space-y-1 w-full max-w-[320px] mx-auto text-[12px] font-play">
              <div className="flex justify-between"><span>Нэр:</span><span className="font-bold">{title}</span></div>
              <div className="flex justify-between"><span>Төрөл:</span><span className="font-bold">{lotteryType}</span></div>
              <div className="flex justify-between"><span>Ширхэг:</span><span className="font-bold">{quantity}</span></div>
              <div className="flex justify-between"><span>Нийт:</span><span className="font-bold">{isFree ? "Үнэгүй" : `${formatMoney(totalPrice)}₮`}</span></div>
              <div className="flex justify-between"><span>Дугаар:</span><span className="font-bold">{phoneNumber}</span></div>
            </div>
          </div>
        );
      case 5: 
        return (
          <div className="flex flex-col items-center w-full justify-center h-full gap-2">
            <button onClick={() => setSelectedPaymentMethod('qpay')} className={`w-full max-w-[320px] h-[30px] border rounded-[8px] flex items-center justify-center relative ${selectedPaymentMethod === 'qpay' ? 'border-[#068071]' : ''}`}>
              <div className="absolute left-3"><Icons.CheckSquare checked={selectedPaymentMethod === 'qpay'} /></div>
              <span className="text-[12px] font-bold">QPay</span>
            </button>
            <button onClick={() => setSelectedPaymentMethod('bank')} className={`w-full max-w-[320px] h-[30px] border rounded-[8px] flex items-center justify-center relative ${selectedPaymentMethod === 'bank' ? 'border-[#068071]' : ''}`}>
              <div className="absolute left-3"><Icons.CheckSquare checked={selectedPaymentMethod === 'bank'} /></div>
              <span className="text-[12px] font-bold">Банкаар төлөх</span>
            </button>
          </div>
        );
      case 6: 
        return (
          <div className="flex flex-col items-center w-full pt-2 pb-4">
            <p className="text-[10px] text-gray-600 mb-1">Таны азын дугаарууд:</p>
            <div className="flex flex-wrap justify-center gap-1 mb-2">
                {luckyNumbers.map((num, idx) => (
                    <span key={idx} className="bg-gray-100 text-[#068071] border px-2 py-0.5 rounded text-[11px] font-bold">{num}</span>
                ))}
            </div>
            {isPaymentSuccess ? (
                <div className="flex flex-col items-center animate-pulse"><Icons.Success /><span className="text-[#068071] font-bold text-sm mt-2">Амжилттай!</span></div>
            ) : (
                <div className="bg-white p-1 rounded border mb-3"><Icons.QrCode /></div>
            )}
          </div>
        );

      case 7: 
        return (
          <div className="flex flex-col items-center w-full pt-2 px-6">
            <div className="space-y-1 w-full max-w-[320px] mx-auto text-[12px] font-play">
              <div className="flex justify-between"><span>Банк:</span><span className="font-bold">Хаан банк</span></div>
              <div className="flex justify-between"><span>Данс:</span><span className="font-bold">5318101209</span></div>
              <div className="flex justify-between"><span>Дүн:</span><span className="font-bold">{formatMoney(totalPrice)}₮</span></div>
              <div className="flex justify-between"><span>Утга:</span><span className="font-bold">{phoneNumber}</span></div>
            </div>

            {isBankCheckFailed && (
                <div className="flex flex-col items-center animate-pulse mt-4">
                    <Icons.Alert />
                    <span className="text-red-500 font-bold text-sm mt-2 text-center">
                        Таны төлбөр төлөгдөөгүй байна
                    </span>
                </div>
            )}
          </div>
        );
      
      case 8: 
        return (
            <div className="flex flex-col items-center w-full justify-center h-full pt-2">
                 <div className="animate-bounce-short"><Icons.Success /></div>
                 <h3 className="text-[#068071] font-bold text-lg">Амжилттай!</h3>
                 <p className="text-[11px] text-gray-600 mb-4 px-6 text-center">Та BONUS-д амжилттай оролцлоо!</p>
                 <div className="w-full bg-gray-50 py-3 flex flex-col items-center">
                    <p className="text-[10px] text-gray-500 mb-2">Азын дугаар:</p>
                    <div className="flex flex-wrap justify-center gap-1">
                        {luckyNumbers.map((num, idx) => (
                            <span key={idx} className="bg-white text-[#068071] border border-[#068071] px-4 py-1 rounded-[6px] text-[16px] font-bold shadow-sm">{num}</span>
                        ))}
                    </div>
                </div>
            </div>
        );

      default: return null;
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap');
          .font-play { font-family: 'Play', sans-serif; }
          .animate-bounce-short { animation: bounce 1s infinite; }
          @keyframes bounce { 0%, 100% { transform: translateY(-5%); } 50% { transform: translateY(0); } }
        `}
      </style>
      
      {/* BACKGROUND OVERLAY */}
      <div 
        className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-[100px] px-4"
        onClick={handleOverlayClick}
      >
        <div 
          className="bg-white relative flex flex-col shadow-2xl overflow-hidden transition-all duration-300 w-full"
          onClick={(e) => e.stopPropagation()} 
          style={{ maxWidth: '460px', minHeight: '250px', height: (currentStep >= 6) ? 'auto' : '250px', borderRadius: '20px' }}
        >
          
          <button onClick={handleCloseRequest} className="absolute top-3 right-3 text-gray-400 z-10"><Icons.Close /></button>

          {showExitConfirm && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
              <div className="text-center">
                <h3 className="font-play font-bold mb-4">Цуцлах уу?</h3>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => setShowExitConfirm(false)} className="px-4 py-1 border rounded-lg text-xs">Үгүй</button>
                  <button onClick={confirmClose} className="px-4 py-1 bg-[#FF6060] text-white rounded-lg text-xs">Тийм</button>
                </div>
              </div>
            </div>
          )}

          <div className="w-full flex justify-between items-end border-b px-6 pb-2" style={{ height: '65px' }}>
              <h2 className="font-play font-bold text-[20px] text-black">{getStepTitle()}</h2>
              <div className="font-play font-bold text-[20px] text-[#068071]">{formatTimer(remainingSeconds)}</div>
          </div>

          <div className="flex-1 w-full overflow-hidden relative pb-4">{renderContent()}</div>

          <div className="w-full flex justify-between items-center border-t px-6" style={{ height: '50px' }}>
              <button onClick={handleBack} disabled={currentStep === 1 || isPaymentSuccess || currentStep === 8}
                      className="w-[90px] h-[30px] rounded-lg border text-[12px] font-play disabled:opacity-50">Өмнөх</button>

              <button onClick={() => {
                          if (currentStep === 6) { if (isPaymentSuccess) onClose(); else handleCheckPayment(); }
                          else if (currentStep === 7) handleBankCheck(); 
                          else if (currentStep === 8) onClose();
                          else handleNext();
                      }}
                      disabled={(currentStep === 1 && !isPhoneValid) || (currentStep === 2 && !isOtpValid) || isLoading}
                      className="min-w-[90px] h-[30px] rounded-lg border text-[12px] font-play flex items-center justify-center gap-1"
                      style={{ 
                          // ЗАССАН ХЭСЭГ: backgroundColor давхардаагүй
                          backgroundColor: (isPaymentSuccess || currentStep === 8) ? '#068071' : '#FFFFFF',
                          color: (isPaymentSuccess || currentStep === 8) ? '#FFFFFF' : (currentStep === 7 && isBankCheckFailed) ? '#EF4444' : '#057F71',
                          borderColor: (currentStep === 7 && isBankCheckFailed) ? '#EF4444' : '#E5E7EB'
                      }}>
                  
                  {isLoading ? <Icons.Loader /> : 
                     (currentStep === 6 ? (isPaymentSuccess ? "Хаах" : "Төлбөр шалгах") : 
                     (currentStep === 7 ? (isBankCheckFailed ? "Дахин шалгах" : "Төлбөр шалгах") : 
                     (currentStep >= 8 ? "Хаах" : "Дараах")))}
              </button>
          </div>
        </div>
      </div>

      {isMobile && (
        <Numpad 
            isOpen={isNumpadOpen}
            value={currentStep === 1 ? rawPhoneNumber : otpInput}
            onChange={handleNumpadChange}
            onDone={() => setIsNumpadOpen(false)}
            maxLength={currentStep === 1 ? 8 : 4}
        />
      )}
    </>
  );
};

export default PurchaseDialog;
