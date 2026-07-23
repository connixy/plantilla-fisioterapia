import AnimatedSection from "../AnimatedSection";
import { clinic } from "../../config/clinic";

const FinalCTASection = () => {
  return (
    <section className="py-24 md:py-32 bg-carbon relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsla(174,48%,32%,0.4) 1px, transparent 1px), linear-gradient(90deg, hsla(174,48%,32%,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-clinic relative text-center">
        <AnimatedSection>
          <span className="font-tech text-[11px] tracking-[0.3em] uppercase text-teal/60 block mb-6">
            Empieza tu recuperación
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-carbon-foreground mb-10 tracking-tight">
            ¿Cuándo empezamos{" "}
            <span className="text-teal">a tratarte?</span>
          </h2>
          <a
            href="#contacto"
            className="inline-flex px-12 py-5 rounded-2xl text-lg font-bold text-white transition-all duration-300 animate-pulse-glow"
            style={{ backgroundColor: clinic.colorBoton }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = clinic.colorBotonHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = clinic.colorBoton)}
          >
            Reservar cita
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinalCTASection;
