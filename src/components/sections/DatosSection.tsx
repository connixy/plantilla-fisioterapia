import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "../AnimatedSection";

const stats = [
  { target: 12, suffix: "+", label: "Años experiencia", unit: "YRS", decimals: 0 },
  { target: 1400, suffix: "+", label: "Pacientes tratados", unit: "PAT", decimals: 0, formatThousands: true },
  { target: 4.9, suffix: "/5", label: "Valoración Google", unit: "RTG", decimals: 1 },
  { target: 3, suffix: "", label: "Especialistas", unit: "DRS", decimals: 0 },
];

const AnimatedCounter = ({ target, suffix, decimals, formatThousands, inView }: {
  target: number; suffix: string; decimals: number; formatThousands?: boolean; inView: boolean;
}) => {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1800;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  const display = decimals > 0
    ? value.toFixed(decimals)
    : formatThousands
      ? Math.round(value).toLocaleString("es-ES")
      : Math.round(value).toString();

  return <>{display}{suffix}</>;
};

const DatosSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-carbon relative overflow-hidden">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsla(174,48%,32%,0.4) 1px, transparent 1px), linear-gradient(90deg, hsla(174,48%,32%,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-clinic relative">
        <AnimatedSection className="text-center mb-16">
          <span className="font-tech text-[11px] tracking-[0.3em] uppercase text-teal/70 block mb-4">
            Performance Metrics
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-carbon-foreground tracking-tight">
            Especificaciones Técnicas
          </h2>
        </AnimatedSection>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel rounded-[20px] p-6 text-center group hover:border-teal/30 transition-all"
            >
              <p className="font-tech text-[9px] tracking-[0.2em] text-teal/50 uppercase mb-3">{s.unit}</p>
              <p className="font-tech text-3xl md:text-4xl font-bold text-teal mb-2">
                <AnimatedCounter target={s.target} suffix={s.suffix} decimals={s.decimals} formatThousands={s.formatThousands} inView={inView} />
              </p>
              <p className="font-tech text-[10px] tracking-wider text-carbon-foreground/40 uppercase">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="flex justify-center gap-4 mt-12">
          {["COFM", "CGCFE", "ISO 9001"].map((cert) => (
            <div key={cert} className="glass-panel rounded-full px-5 py-2">
              <span className="font-tech text-carbon-foreground/30 text-[10px] tracking-[0.2em] uppercase">{cert}</span>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default DatosSection;
