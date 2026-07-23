import AnimatedSection from "../AnimatedSection";
import AnatomicalSelector from "../AnatomicalSelector";

const AnatomiaSection = () => {
  return (
    <section id="anatomia" className="section-padding bg-background">
      <div className="container-clinic">
        <AnimatedSection className="text-center mb-16">
          <span className="font-tech text-[11px] tracking-[0.3em] uppercase text-teal/80 block mb-4">
            Diagnóstico por zonas
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Selector Anatómico
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
            Selecciona la zona afectada para ver los protocolos disponibles y métricas de recuperación.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <AnatomicalSelector />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AnatomiaSection;
