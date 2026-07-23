import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import treatmentDeportiva from "../../assets/treatment-deportiva.jpg";
import treatmentNeuro from "../../assets/treatment-neurorrehabilitacion.jpg";
import treatmentPediatrica from "../../assets/treatment-pediatrica.jpg";
import treatmentSueloPelvico from "../../assets/treatment-suelo-pelvico.jpg";
import treatmentGeriatrica from "../../assets/treatment-geriatrica.jpg";
import treatmentDolorCronico from "../../assets/treatment-dolor-cronico.jpg";
import beforeCervicalgia from "../../assets/before-cervicalgia.jpg";
import afterCervicalgia from "../../assets/after-cervicalgia.jpg";

const photos = [
  treatmentDeportiva, treatmentNeuro, treatmentPediatrica, treatmentSueloPelvico,
  treatmentGeriatrica, treatmentDolorCronico, beforeCervicalgia, afterCervicalgia,
];

const CARD = 260; // ancho de cada imagen (px)
const GAP = 16;   // separación entre imágenes (px)
const STEP = CARD + GAP;
const AUTOPLAY_MS = 3500;

const InstalacionesSection = () => {
  const count = photos.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ startX: number; active: boolean }>({ startX: 0, active: false });

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + count) % count);
  }, [count]);

  // Avance automático cada 3,5 s; vuelve al inicio al llegar al final (módulo).
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  // Swipe táctil / arrastre con ratón (Pointer Events)
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { startX: e.clientX, active: true };
    setPaused(true);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.active = false;
    if (dx <= -40) go(1);
    else if (dx >= 40) go(-1);
    setPaused(false);
  };
  const onPointerLeave = () => {
    if (drag.current.active) {
      drag.current.active = false;
      setPaused(false);
    }
  };

  return (
    <section id="instalaciones" className="section-padding bg-background">
      <div className="container-clinic">
        <AnimatedSection className="text-center mb-10">
          <span className="font-tech text-[11px] tracking-[0.3em] uppercase text-teal/80 block mb-4">
            Instalaciones
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            Nuestras Instalaciones
          </h2>
        </AnimatedSection>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Flechas */}
        <button
          onClick={() => go(-1)}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass-panel-light flex items-center justify-center shadow-md hover:bg-teal hover:text-white transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass-panel-light flex items-center justify-center shadow-md hover:bg-teal hover:text-white transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRight size={18} />
        </button>

        {/* Pista: centra la imagen activa mediante translateX */}
        <div
          className="flex items-center touch-pan-y select-none"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(calc(50% - ${index * STEP + CARD / 2}px))`,
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
        >
          {photos.map((src, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="flex-shrink-0 rounded-[20px] overflow-hidden transition-all duration-500"
              style={{ width: CARD, opacity: i === index ? 1 : 0.5 }}
              aria-label={`Ver instalación ${i + 1}`}
              tabIndex={-1}
            >
              <img
                src={src}
                alt={`Instalación ${i + 1}`}
                className="w-[260px] h-[260px] object-cover pointer-events-none"
                width={260}
                height={260}
                draggable={false}
              />
            </button>
          ))}
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-8">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir a la imagen ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-teal" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstalacionesSection;
