import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";

const reports = [
  {
    name: "Paciente A.P.",
    id: "RPT-2024-0847",
    condition: "Dolor lumbar crónico",
    duration: "12 sesiones",
    status: "ALTA CLÍNICA COMPLETA",
    text: "Desde la primera sesión noté la diferencia. El dolor desapareció por completo y he recuperado la movilidad total para hacer mi vida normal.",
    boxes: [
      { value: "0 / 10", label: "Dolor residual" },
      { value: "100%", label: "Movilidad recuperada" },
      { value: "ALTA", label: "Estado final", highlight: true },
    ],
  },
  {
    name: "Paciente R.M.",
    id: "RPT-2024-1203",
    condition: "Rehabilitación postoperatoria LCA",
    duration: "16 sesiones",
    status: "ALTA DEPORTIVA 100%",
    text: "Volví a entrenar y a competir al 100% sin ningún tipo de molestia. Un plan perfectamente adaptado a mi nivel.",
    boxes: [
      { value: "0 / 10", label: "Dolor en impacto" },
      { value: "100%", label: "Rendimiento deportivo" },
      { value: "ALTA", label: "Estado final", highlight: true },
    ],
  },
  {
    name: "Paciente L.G.",
    id: "RPT-2024-0592",
    condition: "Suelo pélvico posparto",
    duration: "8 sesiones",
    status: "ALTA CLÍNICA COMPLETA",
    text: "Un equipo profesional y cercano. Recuperé el tono y la fuerza al 100% en muy pocas sesiones. Recomiendo la clínica sin dudarlo.",
    boxes: [
      { value: "0 / 10", label: "Molestia residual" },
      { value: "100%", label: "Tono muscular" },
      { value: "ALTA", label: "Estado final", highlight: true },
    ],
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const ResenasSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-clinic">
        <AnimatedSection className="text-center mb-16">
          <span className="font-tech text-[11px] tracking-[0.3em] uppercase text-teal/80 block mb-4">
            Informes de recuperación
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Reportes de Recuperación
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            <span className="font-tech text-sm">127</span> pacientes. Una misma experiencia.
          </p>
        </AnimatedSection>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {reports.map((r) => (
            <motion.div key={r.id} variants={fadeUp}>
              <div className="glass-panel-light rounded-[24px] p-7 h-full flex flex-col border border-border/50 hover:border-teal/20 transition-all duration-500">
                {/* Report header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-tech text-[9px] tracking-[0.15em] text-muted-foreground/50 uppercase">{r.id}</span>
                  <span className="inline-flex items-center gap-1 font-tech text-[9px] tracking-wider text-teal uppercase">
                    <CheckCircle2 size={10} />
                    {r.status}
                  </span>
                </div>

                {/* Patient */}
                <div className="mb-5">
                  <h4 className="font-heading text-lg font-bold text-foreground tracking-tight">{r.name}</h4>
                  <p className="font-tech text-[10px] tracking-wider text-muted-foreground uppercase mt-1">
                    {r.condition} · {r.duration}
                  </p>
                </div>

                {/* Indicadores clínicos */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {r.boxes.map((box, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-3 text-center border ${
                        box.highlight
                          ? "bg-emerald-500 border-emerald-500"
                          : "bg-teal/5 border-teal/10"
                      }`}
                    >
                      <p className={`font-tech text-xs font-bold ${box.highlight ? "text-white" : "text-teal"}`}>
                        {box.value}
                      </p>
                      <p
                        className={`font-tech text-[8px] tracking-wider uppercase mt-1 ${
                          box.highlight ? "text-white/90" : "text-muted-foreground"
                        }`}
                      >
                        {box.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 italic">
                  "{r.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResenasSection;
