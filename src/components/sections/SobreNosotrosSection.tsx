import { Search, User, Zap } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";

const values = [
  { icon: Search, title: "Diagnóstico preciso", desc: "Evaluación exhaustiva antes de cada tratamiento para identificar la causa real del problema.", code: "DX_01" },
  { icon: User, title: "Trato personalizado", desc: "Cada paciente recibe un plan adaptado a su situación, objetivos y ritmo de recuperación.", code: "TX_02" },
  { icon: Zap, title: "Sin listas de espera", desc: "Primera cita en menos de 48 horas. Tu recuperación no puede esperar.", code: "QK_03" },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const SobreNosotrosSection = () => {
  return (
    <section id="sobre-nosotros" className="section-padding bg-background">
      <div className="container-clinic">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <AnimatedSection>
            <span className="font-tech text-[11px] tracking-[0.3em] uppercase text-teal/80 block mb-4">
              Philosophy
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
              Sobre Nosotros
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed font-light">
              Creemos en una fisioterapia basada en la evidencia, con un enfoque humano y cercano. Cada paciente es único, y cada tratamiento debe serlo también.
            </p>
          </AnimatedSection>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14"
        >
          {values.map((v) => (
            <motion.div key={v.title} variants={fadeUp}>
              <div className="glass-panel-light rounded-[24px] p-8 text-center h-full hover:border-teal/20 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-5">
                  <v.icon className="text-teal" size={24} />
                </div>
                <p className="font-tech text-[9px] tracking-[0.2em] text-muted-foreground/40 uppercase mb-3">{v.code}</p>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 tracking-tight">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection className="text-center">
          <a
            href="#equipo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold bg-teal text-primary-foreground hover:bg-teal-hover transition-colors"
          >
            Conocer al equipo
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SobreNosotrosSection;
