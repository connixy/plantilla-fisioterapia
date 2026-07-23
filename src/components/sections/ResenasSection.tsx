import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";

const reports = [
  {
    name: "Ana P.",
    id: "RPT-2024-0847",
    condition: "Dolor lumbar crónico",
    duration: "12 sesiones",
    status: "RECUPERACIÓN COMPLETA",
    text: "Desde la primera sesión noté la diferencia. El trato es excepcional y el diagnóstico fue muy preciso.",
    metrics: { pain: "8 → 1", mobility: "+85%", satisfaction: "10/10" },
  },
  {
    name: "Roberto M.",
    id: "RPT-2024-1203",
    condition: "Rehabilitación postoperatoria LCA",
    duration: "16 sesiones",
    status: "ALTA DEPORTIVA",
    text: "Me recuperé antes de lo previsto gracias a un plan de tratamiento perfectamente adaptado a mis necesidades.",
    metrics: { pain: "7 → 0", mobility: "+92%", satisfaction: "10/10" },
  },
  {
    name: "Lucía G.",
    id: "RPT-2024-0592",
    condition: "Suelo pélvico posparto",
    duration: "8 sesiones",
    status: "RECUPERACIÓN COMPLETA",
    text: "Un equipo profesional, cercano y con mucha experiencia. Recomiendo esta clínica sin dudarlo.",
    metrics: { pain: "6 → 0", mobility: "+96%", satisfaction: "10/10" },
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

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {Object.entries(r.metrics).map(([key, val]) => (
                    <div key={key} className="bg-muted/50 rounded-xl p-3 text-center">
                      <p className="font-tech text-xs font-bold text-foreground">{val}</p>
                      <p className="font-tech text-[8px] tracking-wider text-muted-foreground uppercase mt-1">
                        {key === "pain" ? "Dolor" : key === "mobility" ? "Movilidad" : "Satisfacción"}
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
