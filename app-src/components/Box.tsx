'use client';

import { useEffect, useState } from 'react';

interface BoxProps {
  id: string;
  faceValue: number;
  createdDate: string;
  onClick?: () => void;
}

export default function Box({ id, faceValue, createdDate, onClick }: BoxProps) {
  const [ageInDays, setAgeInDays] = useState(0);

  useEffect(() => {
    const calculateAge = () => {
      const created = new Date(createdDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - created.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setAgeInDays(diffDays);
    };

    calculateAge();
    const interval = setInterval(calculateAge, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [createdDate]);

  // Calculate aging effects (0-30 days scale)
  const normalizedAge = Math.min(ageInDays / 30, 1);
  const weathering = normalizedAge * 100; // 0-100%
  const stampOpacity = 0.3 + (normalizedAge * 0.4); // 0.3 to 0.7

  const ageLabel = ageInDays === 0
    ? 'TODAY'
    : ageInDays === 1
    ? '1 DAY OLD'
    : `${ageInDays} DAYS OLD`;

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer transition-transform hover:scale-105"
      style={{
        width: '280px',
        height: '320px',
      }}
    >
      {/* Parcel Box */}
      <div
        className="relative w-full h-full rounded-lg overflow-hidden"
        style={{
          background: `linear-gradient(135deg,
            hsl(${35 - weathering * 0.1}, ${70 - weathering * 0.3}%, ${60 - weathering * 0.2}%) 0%,
            hsl(${30 - weathering * 0.1}, ${65 - weathering * 0.3}%, ${50 - weathering * 0.2}%) 100%)`,
          boxShadow: `
            0 10px 30px rgba(0,0,0,${0.3 + weathering * 0.002}),
            inset 0 1px 0 rgba(255,255,255,${0.2 - weathering * 0.001}),
            inset 0 -1px 0 rgba(0,0,0,${0.2 + weathering * 0.001})
          `,
          border: '1px solid rgba(139, 90, 43, 0.3)',
        }}
      >
        {/* Top Section */}
        <div className="relative flex items-center justify-between p-6 border-b border-amber-900/20">
          {/* Face Value */}
          <div
            className="text-5xl font-bold"
            style={{
              color: '#2c1810',
              textShadow: '0 1px 2px rgba(255,255,255,0.3)',
              filter: `contrast(${1 + weathering * 0.001})`,
            }}
          >
            £{faceValue}
          </div>

          {/* Created Date */}
          <div
            className="text-right text-xs font-mono uppercase tracking-wider"
            style={{
              color: 'rgba(44, 24, 16, 0.7)',
            }}
          >
            <div className="font-bold">CREATED</div>
            <div className="mt-1 text-[10px]">{createdDate}</div>
            <div
              className="mt-2 font-bold"
              style={{
                color: `rgba(139, 69, 19, ${0.5 + normalizedAge * 0.5})`,
              }}
            >
              {ageLabel}
            </div>
          </div>
        </div>

        {/* Middle Section - Texture and Stamps */}
        <div className="relative h-48 flex items-center justify-center overflow-hidden">
          {/* Weathering texture */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(0,0,0,${weathering * 0.0005}) 10px,
                rgba(0,0,0,${weathering * 0.0005}) 20px
              )`,
              opacity: normalizedAge * 0.15,
            }}
          />

          {/* Postal stamps */}
          <div
            className="absolute top-4 right-4 w-16 h-16 rounded border-2 border-dashed rotate-12"
            style={{
              borderColor: `rgba(139, 69, 19, ${stampOpacity})`,
              opacity: normalizedAge > 0.1 ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center text-xs font-bold"
              style={{
                color: `rgba(139, 69, 19, ${stampOpacity})`,
              }}
            >
              £{faceValue}
            </div>
          </div>

          {/* Center label */}
          <div className="text-center z-10">
            <div
              className="text-sm font-bold uppercase tracking-widest mb-2"
              style={{
                color: 'rgba(44, 24, 16, 0.5)',
              }}
            >
              Prize Box
            </div>
            <div
              className="text-xs uppercase tracking-wider"
              style={{
                color: 'rgba(44, 24, 16, 0.4)',
              }}
            >
              Click to Contribute
            </div>
          </div>

          {/* Scuff marks (appear with age) */}
          {normalizedAge > 0.3 && (
            <div
              className="absolute bottom-2 left-4 w-20 h-1 rounded-full"
              style={{
                background: `rgba(0,0,0,${normalizedAge * 0.1})`,
                transform: 'rotate(-5deg)',
              }}
            />
          )}
        </div>

        {/* Bottom stripe (tape) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12"
          style={{
            background: `linear-gradient(90deg,
              rgba(139, 69, 19, ${0.15 + weathering * 0.001}) 0%,
              rgba(101, 67, 33, ${0.2 + weathering * 0.001}) 50%,
              rgba(139, 69, 19, ${0.15 + weathering * 0.001}) 100%)`,
            borderTop: '1px dashed rgba(139, 69, 19, 0.2)',
          }}
        >
          <div
            className="w-full h-full flex items-center justify-center text-xs font-mono uppercase tracking-widest"
            style={{
              color: 'rgba(44, 24, 16, 0.6)',
            }}
          >
            ID: {id.slice(0, 8).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
