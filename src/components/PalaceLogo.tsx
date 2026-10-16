import React from 'react';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PalaceLogo: React.FC<Props> = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 rounded-xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-stone-900 border border-amber-500/40 p-1.5 shadow-md shadow-amber-950/20 group-hover:border-amber-400/70 transition-all ${sizeMap[size]} ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-amber-400 drop-shadow"
      >
        <defs>
          <linearGradient id="palaceGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Outer royal arch */}
        <path
          d="M6 42V20C6 11 14 4 24 4C34 4 42 11 42 20V42"
          stroke="url(#palaceGoldGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Inner Mughal cusped arch */}
        <path
          d="M12 42V24C12 18 17 14 24 10C31 14 36 18 36 24V42"
          stroke="url(#palaceGoldGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Royal Kalash / Finial top */}
        <circle cx="24" cy="5" r="2" fill="url(#palaceGoldGrad)" />

        {/* Flame / Diya motif */}
        <path
          d="M24 18C22 21 21 23 21 25C21 26.6569 22.3431 28 24 28C25.6569 28 27 26.6569 27 25C27 23 26 21 24 18Z"
          fill="url(#palaceGoldGrad)"
        />

        {/* Base foundation line */}
        <path
          d="M4 42H44"
          stroke="url(#palaceGoldGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M9 45H39"
          stroke="url(#palaceGoldGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
