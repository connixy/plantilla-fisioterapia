import AnimatedSection from "../AnimatedSection";
import BeforeAfterSlider from "../BeforeAfterSlider";

const cases = [
  {
    name: "María",
    problem: "Cervicalgia crónica",
    sessions: 8,
    quote: "Después de años de dolor, por fin puedo dormir sin molestias. El equipo fue increíble.",
    before: "/images/before-cervicalgia.jpg",
    after: "/images/after-cervicalgia.jpg",
  },
  {
    name: "Javier",
    problem: "Rotura de ligamento cruzado",
    sessions: 16,
    quote: "Volví a correr en menos tiempo del esperado. Profesionalidad y cercanía en cada sesión.",
    before: "/images/before-ligamento.jpg",
    after: "/images/after-ligamento.jpg",
  },
];

const CasosRealesSection = () => {
  return (
    <section id="casos-reales" className="section-padding bg-background">
      <div className="container-clinic">
        <AnimatedSection className="text-center mb-16">
          <span className="font-tech text-[11px] tracking-[0.3em] uppercase text-teal/80 block mb-4">
            Clinical Results
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Casos Reales
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
            Resultados medibles que transforman la vida de nuestros pacientes.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <AnimatedSection key={c.name} delay={i * 0.15}>
              <div className="glass-panel-light rounded-[24px] overflow-hidden hover:border-teal/20 transition-all duration-500">
                <BeforeAfterSlider beforeImage={c.before} afterImage={c.after} />
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center ring-1 ring-teal/20">
                      <span className="text-teal font-bold text-sm">{c.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-heading font-bold text-foreground tracking-tight">{c.name}</p>
                      <p className="font-tech text-[10px] tracking-wider text-muted-foreground uppercase">{c.problem} · {c.sessions} sesiones</p>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground italic leading-relaxed text-sm font-light">
                    "{c.quote}"
                  </blockquote>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasosRealesSection;
