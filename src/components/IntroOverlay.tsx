import { useState, useEffect } from "react";
import { clinic } from "../config/clinic";

/**
 * Animación de entrada: fondo oscuro con el nombre de la clínica.
 * El desmontaje se hace con setTimeout (no depende de la animación), de modo
 * que el overlay SIEMPRE desaparece y nunca bloquea la web, incluso si la
 * pestaña estaba en segundo plano (donde las animaciones se pausan).
 */
const IntroOverlay = () => {
  const [phase, setPhase] = useState<"show" | "fading" | "done">("show");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("fading"), 1300);
    const t2 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-carbon transition-opacity duration-500 ease-in-out"
      style={{ opacity: phase === "fading" ? 0 : 1 }}
    >
      <div className="text-center intro-rise">
        <span className="font-tech text-[10px] tracking-[0.4em] uppercase text-teal/70 block mb-4">
          Fisioterapia avanzada
        </span>
        <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight text-white">
          {clinic.marca.prefijo}
          <span className="text-teal">{clinic.marca.sufijo}</span>
        </h1>
        <div className="mx-auto mt-6 h-px w-32 bg-teal/60 intro-line" />
      </div>
    </div>
  );
};

export default IntroOverlay;
