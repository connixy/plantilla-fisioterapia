import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Phone, MessageCircle, CheckCircle, Activity, Brain, Baby, Heart, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FloatingButtons from "../components/FloatingButtons";
import { whatsappHref } from "../config/clinic";
import beforeCervicalgia from "../assets/before-cervicalgia.jpg";
import afterCervicalgia from "../assets/after-cervicalgia.jpg";
import treatmentDeportiva from "../assets/treatment-deportiva.jpg";
import treatmentNeuro from "../assets/treatment-neurorrehabilitacion.jpg";
import treatmentPediatrica from "../assets/treatment-pediatrica.jpg";
import treatmentSueloPelvico from "../assets/treatment-suelo-pelvico.jpg";
import treatmentGeriatrica from "../assets/treatment-geriatrica.jpg";
import treatmentDolorCronico from "../assets/treatment-dolor-cronico.jpg";

const treatmentData: Record<string, {
  icon: any; title: string; tagline: string; problem: string; audience: string;
  steps: string[]; benefits: string[]; therapist: string; therapistSpec: string;
  testimonial: { name: string; quote: string; sessions: number };
  image: string; price: string;
}> = {
  "fisioterapia-deportiva": {
    icon: Activity, title: "Fisioterapia deportiva", tagline: "Vuelve a competir al máximo nivel.",
    problem: "Lesiones musculares, articulares y ligamentosas derivadas de la práctica deportiva que limitan tu rendimiento y bienestar.",
    audience: "Deportistas profesionales y amateurs, personas activas con lesiones recurrentes, atletas en pretemporada.",
    steps: ["Evaluación biomecánica completa", "Diagnóstico por imagen si es necesario", "Plan de tratamiento personalizado", "Sesiones de terapia manual y ejercicio terapéutico", "Readaptación deportiva progresiva", "Plan de prevención de recaídas"],
    benefits: ["Recuperación acelerada", "Prevención de recidivas", "Mejora del rendimiento", "Vuelta segura a la competición"],
    therapist: "Carlos Ruiz", therapistSpec: "Especialista en fisioterapia deportiva con +10 años de experiencia",
    testimonial: { name: "Javier", quote: "Volví a correr en menos tiempo del esperado. Profesionalidad y cercanía en cada sesión.", sessions: 16 },
    image: treatmentDeportiva, price: "Desde 35 €",
  },
  "neurorrehabilitacion": {
    icon: Brain, title: "Neurorrehabilitación", tagline: "Recupera funcionalidad, recupera vida.",
    problem: "Secuelas de ictus, esclerosis múltiple, Parkinson, lesiones medulares y otras patologías neurológicas que afectan la movilidad y autonomía.",
    audience: "Pacientes con daño cerebral adquirido, enfermedades neurodegenerativas, lesiones medulares y parálisis.",
    steps: ["Valoración neurológica funcional", "Establecimiento de objetivos terapéuticos", "Neuroestimulación y facilitación neuromuscular", "Entrenamiento funcional de actividades diarias", "Reeducación de la marcha y equilibrio", "Seguimiento y ajuste continuo del plan"],
    benefits: ["Mejora de la movilidad funcional", "Mayor autonomía personal", "Reducción de la espasticidad", "Mejor calidad de vida"],
    therapist: "Dra. Elena Martínez", therapistSpec: "Directora clínica, especialista en neurorrehabilitación con +15 años de experiencia",
    testimonial: { name: "Pedro", quote: "Tras el ictus pensé que no volvería a caminar. Hoy subo escaleras solo. Gracias por no rendiros.", sessions: 24 },
    image: treatmentNeuro, price: "Desde 40 €",
  },
  "fisioterapia-pediatrica": {
    icon: Baby, title: "Fisioterapia pediátrica", tagline: "Cuidando su desarrollo desde el inicio.",
    problem: "Retrasos en el desarrollo motor, tortícolis congénita, parálisis braquial obstétrica, deformidades craneales y problemas respiratorios infantiles.",
    audience: "Bebés y niños con alteraciones del desarrollo, prematuros, niños con patología neurológica o respiratoria.",
    steps: ["Valoración del desarrollo psicomotor", "Evaluación de reflejos y tono muscular", "Terapia manual pediátrica adaptada", "Estimulación del desarrollo motor", "Pautas para los padres", "Seguimiento evolutivo periódico"],
    benefits: ["Desarrollo motor óptimo", "Corrección de alteraciones posturales", "Mejora respiratoria", "Acompañamiento familiar"],
    therapist: "Laura Sánchez", therapistSpec: "Especialista en fisioterapia pediátrica y suelo pélvico",
    testimonial: { name: "Marta", quote: "Mi hijo empezó a gatear correctamente después de 6 sesiones. El trato con los niños es maravilloso.", sessions: 12 },
    image: treatmentPediatrica, price: "Desde 30 €",
  },
  "suelo-pelvico": {
    icon: Heart, title: "Suelo pélvico", tagline: "Recupera tu bienestar íntimo.",
    problem: "Incontinencia urinaria, prolapsos, dolor pélvico crónico, disfunciones sexuales, diástasis abdominal y recuperación posparto.",
    audience: "Mujeres en el embarazo y posparto, personas con incontinencia, pacientes con dolor pélvico crónico.",
    steps: ["Valoración perineal completa", "Ecografía funcional del suelo pélvico", "Terapia manual intracavitaria", "Electroestimulación y biofeedback", "Ejercicios hipopresivos", "Plan de mantenimiento domiciliario"],
    benefits: ["Eliminación de la incontinencia", "Recuperación posparto completa", "Reducción del dolor pélvico", "Mejora de la calidad de vida íntima"],
    therapist: "Laura Sánchez", therapistSpec: "Especialista en suelo pélvico y fisioterapia pediátrica con +8 años de experiencia",
    testimonial: { name: "Lucía", quote: "Un equipo profesional, cercano y con mucha experiencia. Recomiendo esta clínica sin dudarlo.", sessions: 10 },
    image: treatmentSueloPelvico, price: "Desde 35 €",
  },
  "fisioterapia-geriatrica": {
    icon: Users, title: "Fisioterapia geriátrica", tagline: "Más movilidad, más independencia.",
    problem: "Pérdida de movilidad, riesgo de caídas, dolor articular crónico, sarcopenia y limitaciones funcionales asociadas al envejecimiento.",
    audience: "Personas mayores con limitación funcional, pacientes post-fractura de cadera, personas con artrosis avanzada.",
    steps: ["Valoración geriátrica integral", "Evaluación del riesgo de caídas", "Programa de movilidad articular", "Fortalecimiento muscular adaptado", "Entrenamiento del equilibrio", "Programa de mantenimiento a largo plazo"],
    benefits: ["Mayor independencia funcional", "Reducción del riesgo de caídas", "Alivio del dolor articular", "Mejor calidad de vida"],
    therapist: "Miguel Torres", therapistSpec: "Especialista en dolor crónico y fisioterapia geriátrica con +12 años de experiencia",
    testimonial: { name: "Carmen", quote: "A mis 78 años, vuelvo a pasear por el parque cada mañana. Me han devuelto la vida.", sessions: 20 },
    image: treatmentGeriatrica, price: "Desde 30 €",
  },
  "dolor-cronico": {
    icon: Zap, title: "Dolor crónico", tagline: "Alivio real para un dolor persistente.",
    problem: "Dolor que persiste más de 3 meses: fibromialgia, cefaleas tensionales, lumbalgia crónica, dolor neuropático y síndromes de sensibilización central.",
    audience: "Pacientes con dolor de larga duración, personas con fibromialgia, pacientes con dolor que no responde a tratamientos convencionales.",
    steps: ["Evaluación integral del dolor", "Educación en neurociencia del dolor", "Terapia manual y punción seca", "Ejercicio terapéutico graduado", "Técnicas de neuromodulación", "Plan de autogestión del dolor"],
    benefits: ["Reducción significativa del dolor", "Mejor comprensión de tu dolor", "Mayor funcionalidad diaria", "Estrategias de autogestión"],
    therapist: "Miguel Torres", therapistSpec: "Especialista en dolor crónico con +12 años de experiencia",
    testimonial: { name: "María", quote: "Después de años de dolor, por fin puedo dormir sin molestias. El equipo fue increíble.", sessions: 8 },
    image: treatmentDolorCronico, price: "Desde 35 €",
  },
};

const TreatmentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? treatmentData[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      document.title = `${data.title} | Clínica Fisioterapia Avanzada Madrid`;
    }
    return () => { document.title = "Clínica Fisioterapia Avanzada | Madrid"; };
  }, [slug, data]);

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl text-foreground mb-4">Tratamiento no encontrado</h1>
          <Link to="/" className="text-teal hover:underline">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="gradient-navy pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-clinic">
          <Link to="/" className="inline-flex items-center gap-2 text-navy-foreground/50 hover:text-teal transition-colors text-sm mb-8">
            <ArrowLeft size={16} /> Volver a tratamientos
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="md:flex md:items-center md:gap-12">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-xl bg-teal/20 flex items-center justify-center mb-6">
                  <Icon className="text-teal" size={28} />
                </div>
                <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-semibold text-navy-foreground mb-4">{data.title}</h1>
                <p className="text-xl md:text-2xl text-teal italic font-heading mb-2">{data.tagline}</p>
                <p className="text-sm" style={{ color: "#555555" }}>{data.price}</p>
              </div>
              <div className="mt-8 md:mt-0 flex-shrink-0">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full md:w-80 h-60 md:h-72 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="section-padding">
        <div className="container-clinic max-w-3xl">
          <AnimatedSection>
            <div className="md:flex md:items-start md:gap-10">
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold uppercase tracking-widest text-teal mb-3">El problema</p>
                <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6">¿Qué problema soluciona?</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{data.problem}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Audience */}
      <section className="py-16 bg-muted/30">
        <div className="container-clinic max-w-3xl">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal mb-3">Indicaciones</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6">¿Para quién es?</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{data.audience}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding">
        <div className="container-clinic max-w-3xl">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal mb-3">Proceso</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-10">Cómo es la sesión</h2>
          </AnimatedSection>
          <div className="space-y-6">
            {data.steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-teal text-sm font-bold">{i + 1}</span>
                  </div>
                  <p className="text-foreground">{step}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container-clinic max-w-3xl">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal mb-3">Resultados</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-8">Beneficios esperados</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.benefits.map((b, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="flex items-center gap-3 bg-card p-4 rounded-xl border border-border">
                  <CheckCircle className="text-teal flex-shrink-0" size={20} />
                  <span className="text-foreground font-medium">{b}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial + Before/After */}
      <section className="section-padding">
        <div className="container-clinic max-w-3xl">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal mb-3">Caso real</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-8">Resultado de un paciente</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <BeforeAfterSlider beforeImage={beforeCervicalgia} afterImage={afterCervicalgia} />
            <div className="mt-6 bg-card rounded-xl border border-border p-6">
              <p className="text-muted-foreground italic mb-4">"{data.testimonial.quote}"</p>
              <p className="font-semibold text-foreground">{data.testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{data.testimonial.sessions} sesiones completadas</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Therapist */}
      <section className="py-16 bg-muted/30">
        <div className="container-clinic max-w-3xl">
          <AnimatedSection>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-teal/15 flex items-center justify-center flex-shrink-0">
                <span className="font-heading text-2xl text-teal font-semibold">
                  {data.therapist.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="text-sm text-teal font-medium mb-1">Tu terapeuta</p>
                <h3 className="font-heading text-xl font-semibold text-foreground">{data.therapist}</h3>
                <p className="text-muted-foreground text-sm">{data.therapistSpec}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 gradient-navy text-center">
        <div className="container-clinic">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-navy-foreground mb-8">
              ¿Empezamos tu <span className="text-teal italic">recuperación?</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#contacto" className="bg-teal text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-teal-hover transition-colors">
                Reservar cita
              </Link>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-navy-foreground/20 text-navy-foreground px-8 py-4 rounded-lg font-semibold hover:border-navy-foreground/40 transition-colors">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <FloatingButtons />

      {/* Mobile sticky */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-gradient-to-t from-background via-background to-transparent">
        <div className="flex gap-2">
          <Link to="/#contacto" className="flex-1 bg-teal text-primary-foreground text-center py-3.5 rounded-xl font-semibold shadow-lg">
            Reservar cita
          </Link>
          <a href={whatsappHref} className="w-14 bg-card border border-border rounded-xl flex items-center justify-center shadow-lg">
            <MessageCircle className="text-green-600" size={22} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPage;
