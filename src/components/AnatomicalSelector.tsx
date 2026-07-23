import { useState } from "react";
import { motion } from "framer-motion";

export interface BodyZone {
  id: string;
  label: string;
  treatments: string[];
  successRate: number;
  avgSessions: number;
}

const zones: BodyZone[] = [
  { id: "cervical", label: "Cervical", treatments: ["Neurorrehabilitación", "Dolor crónico"], successRate: 94, avgSessions: 8 },
  { id: "hombro", label: "Hombro", treatments: ["Fisioterapia deportiva", "Dolor crónico"], successRate: 91, avgSessions: 10 },
  { id: "lumbar", label: "Lumbar", treatments: ["Dolor crónico", "Fisioterapia geriátrica"], successRate: 89, avgSessions: 12 },
  { id: "pelvis", label: "Suelo pélvico", treatments: ["Suelo pélvico"], successRate: 96, avgSessions: 6 },
  { id: "rodilla", label: "Rodilla", treatments: ["Fisioterapia deportiva", "Fisioterapia geriátrica"], successRate: 93, avgSessions: 14 },
  { id: "tobillo", label: "Tobillo / Pie", treatments: ["Fisioterapia deportiva", "Fisioterapia pediátrica"], successRate: 95, avgSessions: 8 },
];

interface Props {
  onSelectZone?: (zone: BodyZone | null) => void;
}

const AnatomicalSelector = ({ onSelectZone }: Props) => {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const handleClick = (zone: BodyZone) => {
    const next = activeZone === zone.id ? null : zone.id;
    setActiveZone(next);
    onSelectZone?.(next ? zone : null);
  };

  const selected = zones.find((z) => z.id === activeZone);

  // SVG body outline zones (positions relative to viewBox 0 0 200 500)
  const zonePositions: Record<string, { cx: number; cy: number; r: number }> = {
    cervical: { cx: 100, cy: 72, r: 18 },
    hombro: { cx: 100, cy: 115, r: 22 },
    lumbar: { cx: 100, cy: 195, r: 22 },
    pelvis: { cx: 100, cy: 250, r: 20 },
    rodilla: { cx: 100, cy: 345, r: 18 },
    tobillo: { cx: 100, cy: 440, r: 16 },
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      {/* Body SVG */}
      <div className="relative w-[200px] md:w-[220px] flex-shrink-0">
        <svg viewBox="0 0 200 500" className="w-full h-auto">
          {/* Simplified body silhouette */}
          <path
            d="M100 20 C115 20 125 35 125 50 C125 65 115 75 100 75 C85 75 75 65 75 50 C75 35 85 20 100 20 Z
               M70 85 L55 175 L65 180 L75 120 L85 200 L70 280 L75 380 L68 460 L88 465 L100 390 L112 465 L132 460 L125 380 L130 280 L115 200 L125 120 L135 180 L145 175 L130 85 Z"
            fill="none"
            stroke="hsla(174, 48%, 32%, 0.3)"
            strokeWidth="1.5"
          />

          {/* Interactive zones */}
          {zones.map((zone) => {
            const pos = zonePositions[zone.id];
            const isActive = activeZone === zone.id;
            return (
              <g key={zone.id} onClick={() => handleClick(zone)} className="cursor-pointer">
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r={pos.r}
                  fill={isActive ? "hsla(174, 48%, 32%, 0.25)" : "hsla(174, 48%, 32%, 0.08)"}
                  stroke={isActive ? "hsl(174, 48%, 32%)" : "hsla(174, 48%, 32%, 0.3)"}
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-all duration-300"
                />
                {isActive && (
                  <circle
                    cx={pos.cx}
                    cy={pos.cy}
                    r={pos.r + 4}
                    fill="none"
                    stroke="hsl(174, 48%, 32%)"
                    strokeWidth="1"
                    opacity="0.4"
                    className="animate-pulse"
                  />
                )}
                <circle cx={pos.cx} cy={pos.cy} r={3} fill="hsl(174, 48%, 32%)" opacity={isActive ? 1 : 0.5} />
              </g>
            );
          })}
        </svg>

        {/* Zone labels */}
        {zones.map((zone) => {
          const pos = zonePositions[zone.id];
          const isActive = activeZone === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => handleClick(zone)}
              className={`absolute font-tech text-[10px] tracking-wider uppercase transition-all duration-300 ${
                isActive ? "text-teal" : "text-muted-foreground/60 hover:text-teal/80"
              }`}
              style={{
                top: `${(pos.cy / 500) * 100}%`,
                left: pos.cx > 100 ? "70%" : "auto",
                right: pos.cx <= 100 ? "70%" : "auto",
                transform: "translateY(-50%)",
              }}
            >
              {zone.label}
            </button>
          );
        })}
      </div>

      {/* Zone details */}
      <div className="flex-1 min-h-[260px]">
        {selected ? (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-panel-light rounded-[24px] p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="font-tech text-xs tracking-widest uppercase text-teal">
                Zona seleccionada
              </span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6 tracking-tight">
              {selected.label}
            </h3>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/50 rounded-2xl p-4">
                <p className="font-tech text-2xl font-bold text-teal">{selected.successRate}%</p>
                <p className="font-tech text-[10px] tracking-wider uppercase text-muted-foreground mt-1">Tasa de éxito</p>
              </div>
              <div className="bg-muted/50 rounded-2xl p-4">
                <p className="font-tech text-2xl font-bold text-foreground">{selected.avgSessions}</p>
                <p className="font-tech text-[10px] tracking-wider uppercase text-muted-foreground mt-1">Sesiones promedio</p>
              </div>
            </div>

            {/* Related treatments */}
            <div>
              <p className="font-tech text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
                Protocolos disponibles
              </p>
              <div className="flex flex-wrap gap-2">
                {selected.treatments.map((t) => (
                  <span
                    key={t}
                    className="font-tech text-xs px-3 py-1.5 rounded-full bg-teal/10 text-teal border border-teal/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="glass-panel-light rounded-[24px] p-8 flex flex-col items-center justify-center min-h-[260px] text-center">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-teal/30 flex items-center justify-center mb-4">
              <span className="font-tech text-teal text-lg">⊕</span>
            </div>
            <p className="font-tech text-xs tracking-widest uppercase text-muted-foreground">
              Selecciona una zona del cuerpo
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Haz clic en un punto para ver protocolos y métricas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnatomicalSelector;
