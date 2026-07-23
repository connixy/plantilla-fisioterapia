import { Link } from "react-router-dom";
import { Activity, Brain, Baby, Heart, Users, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "../TiltCard";
import AnimatedSection from "../AnimatedSection";

const treatments = [
  {
    icon: Activity,
    title: "Deportiva",
    subtitle: "Rendimiento & Recuperación",
    description: "Recuperación y prevención de lesiones para atletas y deportistas de todos los niveles.",
    slug: "fisioterapia-deportiva",
    tech: "Electroestimulación · Kinesiotaping",
    span: "col-span-1 md:col-span-2 md:row-span-1",
  },
  {
    icon: Heart,
    title: "Suelo Pélvico",
    subtitle: "Rehabilitación especializada",
    description: "Rehabilitación del suelo pélvico con técnicas avanzadas y personalizadas.",
    slug: "suelo-pelvico",
    tech: "Biofeedback · EPI ecoguiada",
    span: "col-span-1 md:col-span-1 md:row-span-2",
  },
  {
    icon: Brain,
    title: "Neurorrehabilitación",
    subtitle: "Neuroplasticidad aplicada",
    description: "Tratamiento especializado en patologías neurológicas y rehabilitación funcional.",
    slug: "neurorrehabilitacion",
    tech: "Bobath · Vojta · PNF",
    span: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    icon: Baby,
    title: "Pediátrica",
    subtitle: "Desarrollo infantil",
    description: "Atención terapéutica adaptada a las necesidades del desarrollo infantil.",
    slug: "fisioterapia-pediatrica",
    tech: "Estimulación temprana · Psicomotricidad",
    span: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    icon: Users,
    title: "Geriátrica",
    subtitle: "Movilidad & Autonomía",
    description: "Mejora de la movilidad y calidad de vida en personas mayores.",
    slug: "fisioterapia-geriatrica",
    tech: "Equilibrio · Propiocepción",
    span: "col-span-1 md:col-span-1 md:row-span-1",
  },
  {
    icon: Zap,
    title: "Dolor Crónico",
    subtitle: "Enfoque multidisciplinar",
    description: "Abordaje integral del dolor persistente con enfoque multidisciplinar.",
    slug: "dolor-cronico",
    tech: "Neuromodulación · Terapia manual",
    span: "col-span-1 md:col-span-2 md:row-span-1",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const TratamientosSection = () => {
  return (
    <section id="tratamientos" className="section-padding bg-carbon">
      <div className="container-clinic">
        <AnimatedSection className="text-center mb-16">
          <span className="font-tech text-[11px] tracking-[0.3em] uppercase text-teal/80 block mb-4">
            Especialidades
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-carbon-foreground mb-4 tracking-tight">
            Nuestros Tratamientos{" "}
            <span className="text-teal">Especializados</span>
          </h2>
          <p className="text-carbon-foreground/50 max-w-2xl mx-auto text-lg font-light">
            Cada paciente recibe un plan de tratamiento personalizado basado en un diagnóstico preciso.
          </p>
        </AnimatedSection>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {treatments.map((t) => (
            <motion.div key={t.slug} variants={fadeUp} className={t.span}>
              <TiltCard className="h-full">
                <Link
                  to={`/tratamiento/${t.slug}`}
                  className="group block glass-panel rounded-[24px] p-8 h-full relative overflow-hidden hover:border-teal/30 transition-all duration-500"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-teal/10 flex items-center justify-center mb-5 group-hover:bg-teal/20 transition-colors">
                    <t.icon className="text-teal" size={22} />
                  </div>

                  {/* Content layers */}
                  <div style={{ transform: "translateZ(20px)" }}>
                    <h3 className="font-heading text-xl font-bold text-carbon-foreground mb-1 tracking-tight">
                      {t.title}
                    </h3>
                    <p className="font-tech text-[10px] tracking-widest uppercase text-teal/70 mb-4">
                      {t.subtitle}
                    </p>
                    <p className="text-carbon-foreground/50 text-sm leading-relaxed mb-5">
                      {t.description}
                    </p>
                  </div>

                  {/* Tech specs */}
                  <div
                    className="border-t border-white/5 pt-4 mt-auto"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    <p className="font-tech text-[9px] tracking-wider text-carbon-foreground/30 uppercase">
                      {t.tech}
                    </p>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={18} className="text-teal" />
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TratamientosSection;
