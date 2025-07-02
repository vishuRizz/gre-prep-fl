import React, { useState, useEffect } from 'react';


interface MapPoint {
  id: number;
  x: number;
  y: number;
  color: 'blue' | 'green';
  isActive: boolean;
}

const CrunchPrepMap: React.FC = () => {
  const [points, setPoints] = useState<MapPoint[]>([
    { id: 1, x: 15, y: 25, color: 'green', isActive: false },
    { id: 2, x: 25, y: 45, color: 'blue', isActive: false },
    { id: 3, x: 45, y: 35, color: 'blue', isActive: false },
    { id: 4, x: 55, y: 28, color: 'green', isActive: false },
    { id: 5, x: 65, y: 45, color: 'blue', isActive: false },
    { id: 6, x: 75, y: 30, color: 'green', isActive: false },
    { id: 7, x: 85, y: 55, color: 'blue', isActive: false },
    { id: 8, x: 35, y: 60, color: 'green', isActive: false },
    { id: 9, x: 70, y: 65, color: 'blue', isActive: false },
    { id: 10, x: 90, y: 40, color: 'green', isActive: false },
    { id: 11, x: 20, y: 70, color: 'blue', isActive: false },
    { id: 12, x: 50, y: 75, color: 'green', isActive: false },
    { id: 13, x: 80, y: 20, color: 'blue', isActive: false },
    { id: 14, x: 10, y: 50, color: 'green', isActive: false },
    { id: 15, x: 95, y: 65, color: 'blue', isActive: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prevPoints => {
        const newPoints = [...prevPoints];
        const randomIndex = Math.floor(Math.random() * newPoints.length);
        
        // Reset all points
        newPoints.forEach(point => point.isActive = false);
        
        // Activate random point
        newPoints[randomIndex].isActive = true;
        
        return newPoints;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        {/* Header */}
        

        {/* Map Container */}
        <div className="relative w-full h-96 md:h-[500px]overflow-hidden ">
          {/* World Map Background */}
          <div className="absolute inset-0 opacity-10">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified world continents */}
              {/* North America */}
              <path
                d="M50 150 Q100 120 180 140 Q220 160 250 180 Q200 220 150 200 Q80 180 50 150Z"
                fill="currentColor"
                className="text-gray-300"
              />
              {/* South America */}
              <path
                d="M180 250 Q200 240 220 260 Q240 300 220 350 Q200 380 180 360 Q160 320 180 250Z"
                fill="currentColor"
                className="text-gray-300"
              />
              {/* Europe */}
              <path
                d="M450 120 Q500 110 550 130 Q580 150 560 170 Q520 160 480 150 Q450 140 450 120Z"
                fill="currentColor"
                className="text-gray-300"
              />
              {/* Africa */}
              <path
                d="M480 180 Q520 170 550 200 Q570 250 550 320 Q520 350 480 340 Q450 300 480 180Z"
                fill="currentColor"
                className="text-gray-300"
              />
              {/* Asia */}
              <path
                d="M600 100 Q700 90 800 120 Q850 160 820 200 Q750 180 650 170 Q600 140 600 100Z"
                fill="currentColor"
                className="text-gray-300"
              />
              {/* Australia */}
              <path
                d="M720 320 Q780 310 820 330 Q840 350 820 370 Q780 360 740 350 Q720 340 720 320Z"
                fill="currentColor"
                className="text-gray-300"
              />
            </svg>
          </div>

          {/* Animated Points */}
          {points.map((point) => (
            <div
              key={point.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                point.isActive ? 'scale-150 z-20' : 'scale-100 z-10'
              }`}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              {/* Ripple Effect */}
              {point.isActive && (
                <div
                  className={`absolute inset-0 rounded-full animate-ping ${
                    point.color === 'blue'
                      ? 'bg-blue-400'
                      : 'bg-emerald-400'
                  }`}
                  style={{ width: '24px', height: '24px', transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}
                />
              )}
              
              {/* Main Point */}
              <div
                className={`relative w-4 h-4 rounded-full shadow-lg transition-all duration-300 ${
                  point.color === 'blue'
                    ? 'bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-300'
                    : 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-emerald-300'
                } ${
                  point.isActive
                    ? 'shadow-xl animate-pulse'
                    : 'shadow-md'
                }`}
              >
                {/* Inner glow */}
                <div
                  className={`absolute inset-1 rounded-full ${
                    point.color === 'blue'
                      ? 'bg-blue-200'
                      : 'bg-emerald-200'
                  } opacity-60`}
                />
              </div>
            </div>
          ))}

          {/* Connecting Lines (Optional Animation) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            {points.slice(0, -1).map((point, index) => {
              const nextPoint = points[index + 1];
              return (
                <line
                  key={`line-${point.id}`}
                  x1={`${point.x}%`}
                  y1={`${point.y}%`}
                  x2={`${nextPoint.x}%`}
                  y2={`${nextPoint.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  className="animate-pulse"
                />
              );
            })}
          </svg>
        </div>

       
      </div>
    </div>

  );
};

export default CrunchPrepMap;