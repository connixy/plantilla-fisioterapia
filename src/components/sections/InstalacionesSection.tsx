import { useRef, useState, useCallback } from "react";
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

const InstalacionesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scrollLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  }, [isDragging]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    scrollRef.current?.releasePointerCapture(e.pointerId);
  }, []);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <section id="instalaciones" className="section-padding bg-background">
      <div className="container-clinic">
        <AnimatedSection className="text-center mb-10">
          <span className="font-tech text-[11px] tracking-[0.3em] uppercase text-teal/80 block mb-4">
            Facilities
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            Nuestras Instalaciones
          </h2>
        </AnimatedSection>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass-panel-light flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Anterior"
        >
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <button
          onClick={() => scroll(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass-panel-light flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Siguiente"
        >
          <ChevronRight size={18} className="text-foreground" />
        </button>

        <div
          ref={scrollRef}
          className="overflow-x-auto whitespace-nowrap scrollbar-hide touch-pan-x"
          style={{ scrollBehavior: "auto", cursor: isDragging ? "grabbing" : "grab", WebkitOverflowScrolling: "touch" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="inline-flex gap-4 px-6 select-none">
            {photos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Instalación ${i + 1}`}
                className="w-[260px] h-[260px] object-cover rounded-[20px] flex-shrink-0 pointer-events-none"
                width={260}
                height={260}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstalacionesSection;
