import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const SuccessToast = ({ isOpen, message, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes toastSlideInOut {
          0% { opacity: 0; transform: translate(-50%, -50px) scale(0.85); }
          12% { opacity: 1; transform: translate(-50%, 0) scale(1.02); }
          16% { transform: translate(-50%, 0) scale(1); }
          85% { opacity: 1; transform: translate(-50%, 0) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -30px) scale(0.9); }
        }
        @keyframes progressShrink {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        .animate-toast {
          animation: toastSlideInOut 3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-progress {
          animation: progressShrink 2.7s linear forwards;
          animation-delay: 0.3s; 
        }
      `}</style>

      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] animate-toast pointer-events-none">
        <div className="relative overflow-hidden bg-white/90 backdrop-blur-2xl border border-slate-100 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.25)] rounded-2xl flex items-center p-3 pr-8 min-w-[300px]">
          <div className="relative flex-shrink-0 mr-4 ml-1">
            <div className="absolute inset-0 bg-emerald-400 blur-md opacity-50 rounded-full animate-pulse"></div>
            <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(16,185,129,0.4)]">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <div className="flex flex-col py-1">
            <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">Berhasil</h4>
            <p className="text-sm font-bold text-slate-700 leading-tight">
              {message}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-slate-100 w-full">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 animate-progress origin-left"></div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default SuccessToast;