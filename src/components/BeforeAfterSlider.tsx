import { useState, useRef, useCallback } from "react";

interface Props {
  beforeImage: string;
  afterImage: string;
  height?: string;
}

const BeforeAfterSlider = ({ beforeImage, afterImage, height = "h-64 md:h-80" }: Props) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleStart = () => { isDragging.current = true; };
  const handleEnd = () => { isDragging.current = false; };
  const handleMove = (clientX: number) => {
    if (isDragging.current) updatePosition(clientX);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${height} rounded-xl overflow-hidden cursor-col-resize select-none`}
      onMouseDown={(e) => { handleStart(); updatePosition(e.clientX); }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => { handleStart(); updatePosition(e.touches[0].clientX); }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      {/* After (full background) */}
      <div className="absolute inset-0">
        <img src={afterImage} alt="Después del tratamiento" className="w-full h-full object-cover" />
      </div>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={beforeImage} alt="Antes del tratamiento" className="w-full h-full object-cover" />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-card z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-card rounded-full shadow-lg flex items-center justify-center">
          <span className="text-teal font-bold text-xs">⟷</span>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 text-xs font-semibold bg-card/80 text-foreground px-2 py-1 rounded">Antes</span>
      <span className="absolute top-3 right-3 text-xs font-semibold bg-card/80 text-foreground px-2 py-1 rounded">Después</span>
    </div>
  );
};

export default BeforeAfterSlider;
