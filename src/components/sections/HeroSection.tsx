import { motion } from "framer-motion";
import { Star, ShieldCheck, Clock } from "lucide-react";
import { clinic } from "../../config/clinic";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      <div className="container-clinic relative z-10 pt-32 pb-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Tech label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="font-tech text-[11px] tracking-[0.3em] uppercase text-teal/90 inline-flex items-center gap-2">
              <span className="w-6 h-px bg-teal/50" />
              Sistema de recuperación avanzada
              <span className="w-6 h-px bg-teal/50" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight"
          >
            Tu recuperación,{" "}
            <span className="text-teal">sin esperas.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed mb-12 font-light"
          >
            Fisioterapia avanzada en {clinic.ciudad}. Diagnóstico preciso, tratamiento personalizado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a
              href="#contacto"
              className="group relative px-10 py-4 rounded-2xl text-base font-bold text-white transition-all duration-300 overflow-hidden"
              style={{ backgroundColor: clinic.colorBoton }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = clinic.colorBotonHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = clinic.colorBoton)}
            >
              <span className="relative z-10">Reservar primera visita</span>
            </a>
            <a
              href="#anatomia"
              className="border border-white/20 text-white/80 px-10 py-4 rounded-2xl text-base font-medium hover:border-white/40 hover:text-white transition-all backdrop-blur-sm"
            >
              Explorar tratamientos
            </a>
          </motion.div>

          {/* Spec badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex flex-wrap justify-center gap-6"
          >
            {[
              { icon: Star, text: "4.9 valoración", iconClass: "fill-teal" },
              { icon: ShieldCheck, text: "Colegiados CGCFE" },
              { icon: Clock, text: "Cita en 48h" },
            ].map((item) => (
              <div key={item.text} className="glass-panel rounded-full px-5 py-2.5 flex items-center gap-2">
                <item.icon size={14} className={`text-teal ${item.iconClass || ""}`} />
                <span className="font-tech text-[11px] tracking-wider text-white/70 uppercase">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
