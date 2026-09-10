import React from 'react';

const SlidingPill = ({ activeIndex }) => {
  return (
    <>
      <style>{`
        .sliding-pill {
          position: absolute;
          z-index: 0;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        /* Mode HP (Horizontal Slide) */
        @media (max-width: 767px) {
          .sliding-pill {
             top: 6px;
             bottom: 6px;
             width: calc((100% - 16px) / 6); /* Angka 6 ini jumlah menu lu */
             transform: translateX(calc(${activeIndex} * 100%));
             left: 8px;
             background-color: rgba(239, 246, 255, 0.8);
             border: 1px solid #dbeafe;
             border-radius: 1.25rem;
          }
        }
        /* Mode Laptop (Vertical Slide) */
        @media (min-width: 768px) {
          .sliding-pill {
             left: 16px;
             right: 16px;
             height: 48px;
             transform: translateY(calc(${activeIndex} * 54px));
             top: 8px;
             background: linear-gradient(to right, #2563eb, #3b82f6);
             box-shadow: 0 4px 15px rgba(37,99,235,0.25);
             border-radius: 0.75rem;
          }
        }
      `}</style>
      <div className="sliding-pill"></div>
    </>
  );
};

export default SlidingPill;