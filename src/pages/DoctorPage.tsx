import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Award, GraduationCap, Clock, Phone, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedSection from "../components/AnimatedSection";
import { telHref, whatsappHref } from "../config/clinic";
import doctorElena from "../assets/doctor-elena.jpg";
import doctorCarlos from "../assets/doctor-carlos.jpg";
import doctorLaura from "../assets/doctor-laura.jpg";
import doctorMiguel from "../assets/doctor-miguel.jpg";

const doctorData: Record<string, {
  name: string; image: string; specialty: string; bio: string;
  experience: string; badges: string[]; treatments: string[];
  education: string[]; approach: string;
}> = {
  "elena-martinez": {
    name: "Dra. Elena Martínez",
    image: doctorElena,
    specialty: "Directora Clínica · Neurorrehabilitación",
    bio: "Más de 15 años de experiencia en neurorrehabilitación y terapia manual. Formada en las mejores universidades europeas, la Dra. Martínez lidera nuestro equipo con un enfoque basado en la evidencia científica. Su pasión por la neurorrehabilitación comenzó durante su residencia en el Hospital Universitario La Paz, donde desarrolló protocolos innovadores de tratamiento para pacientes con daño cerebral adquirido.",
    experience: "+15 años",
    badges: ["Colegiada Nº 4521", "Máster UCM", "+15 años experiencia"],
    treatments: ["Neurorrehabilitación", "Terapia manual avanzada", "Rehabilitación funcional"],
    education: ["Grado en Fisioterapia – Universidad Complutense de Madrid", "Máster en Neurorrehabilitación – UCM", "Especialización en Terapia Manual – Universidad de Amberes"],
    approach: "Creo firmemente en un abordaje integral del paciente, combinando la mejor evidencia científica con un trato cercano y personalizado. Cada paciente merece un plan de tratamiento único, diseñado para sus necesidades específicas.",
  },
  "carlos-ruiz": {
    name: "Carlos Ruiz",
    image: doctorCarlos,
    specialty: "Fisioterapia Deportiva",
    bio: "Con más de 10 años de experiencia en el ámbito deportivo, Carlos ha trabajado con atletas de élite y deportistas amateur. Su enfoque combina las técnicas más avanzadas de fisioterapia deportiva con un profundo conocimiento de la biomecánica del movimiento. Ha sido fisioterapeuta en varios clubes deportivos profesionales.",
    experience: "+10 años",
    badges: ["Colegiado Nº 5893", "Máster Fisio Deportiva", "+10 años experiencia"],
    treatments: ["Fisioterapia deportiva", "Readaptación deportiva", "Prevención de lesiones"],
    education: ["Grado en Fisioterapia – Universidad Europea de Madrid", "Máster en Fisioterapia Deportiva – Universidad de Barcelona", "Certificación en Ecografía Musculoesquelética"],
    approach: "Mi objetivo es que cada deportista vuelva a su actividad lo antes posible y en las mejores condiciones. Trabajo con protocolos basados en evidencia y tecnología de vanguardia para acelerar la recuperación.",
  },
  "laura-sanchez": {
    name: "Laura Sánchez",
    image: doctorLaura,
    specialty: "Suelo Pélvico · Fisioterapia Pediátrica",
    bio: "Laura es especialista en rehabilitación del suelo pélvico y fisioterapia pediátrica. Con más de 8 años de experiencia, ha ayudado a cientos de mujeres en su recuperación posparto y a niños con alteraciones del desarrollo. Su enfoque empático y profesional la convierte en una referencia en su área.",
    experience: "+8 años",
    badges: ["Colegiada Nº 6721", "Máster Suelo Pélvico", "+8 años experiencia"],
    treatments: ["Suelo pélvico", "Fisioterapia pediátrica", "Recuperación posparto"],
    education: ["Grado en Fisioterapia – Universidad de Alcalá", "Máster en Fisioterapia del Suelo Pélvico", "Especialización en Fisioterapia Pediátrica – Hospital Niño Jesús"],
    approach: "Creo en la importancia de crear un espacio seguro y de confianza. Tanto con mis pacientes adultas como con los más pequeños, mi prioridad es que se sientan cómodos y comprendidos durante todo el proceso.",
  },
  "miguel-torres": {
    name: "Miguel Torres",
    image: doctorMiguel,
    specialty: "Dolor Crónico · Fisioterapia Geriátrica",
    bio: "Miguel lleva más de 12 años dedicado al tratamiento del dolor crónico y la fisioterapia geriátrica. Su formación en neurociencia del dolor le permite abordar casos complejos con un enfoque multidisciplinar. Es un apasionado de la educación terapéutica y cree firmemente en empoderar al paciente.",
    experience: "+12 años",
    badges: ["Colegiado Nº 4102", "Máster Dolor Crónico", "+12 años experiencia"],
    treatments: ["Dolor crónico", "Fisioterapia geriátrica", "Terapia manual"],
    education: ["Grado en Fisioterapia – Universidad Rey Juan Carlos", "Máster en Dolor Crónico y Neurociencia – Universidad de Murcia", "Certificación en Punción Seca y Neuromodulación"],
    approach: "El dolor crónico es complejo y necesita un abordaje que va más allá de lo físico. Trabajo con mis pacientes para que entiendan su dolor, recuperen la confianza en su cuerpo y vuelvan a disfrutar de su vida diaria.",
  },
};

const allDoctors = Object.entries(doctorData).map(([slug, d]) => ({ slug, name: d.name }));

const DoctorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? doctorData[slug] : null;
  const [form, setForm] = useState({
    nombre: "", telefono: "", email: "", tratamiento: "", mensaje: "", fecha: "", doctor: slug || "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl text-foreground mb-4">Doctor no encontrado</h1>
          <Link to="/" className="text-teal hover:underline">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`¡Solicitud de cita con ${data.name} enviada! Nos pondremos en contacto en menos de 24h.`);
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors text-sm";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="gradient-navy pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container-clinic">
          <Link to="/#equipo" className="inline-flex items-center gap-2 text-navy-foreground/50 hover:text-teal transition-colors text-sm mb-8">
            <ArrowLeft size={16} /> Volver al equipo
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="md:flex items-center gap-12">
            <img
              src={data.image}
              alt={data.name}
              className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-xl border-4 border-teal/20 mb-6 md:mb-0 mx-auto md:mx-0"
              width={224}
              height={224}
            />
            <div>
              <h1 className="font-heading text-3xl md:text-5xl font-semibold text-navy-foreground mb-2">{data.name}</h1>
              <p className="text-xl text-teal italic font-heading mb-4">{data.specialty}</p>
              <div className="flex flex-wrap gap-3">
                {data.badges.map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-1.5 text-xs font-medium bg-teal/20 text-teal px-3 py-1.5 rounded-full">
                    {badge.includes("Coleg") && <Award size={12} />}
                    {badge.includes("Máster") && <GraduationCap size={12} />}
                    {badge.includes("años") && <Clock size={12} />}
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bio */}
      <section className="section-padding">
        <div className="container-clinic max-w-3xl">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal mb-3">Biografía</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6">Sobre {data.name.split(" ")[0]}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{data.bio}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Education */}
      <section className="py-16 bg-muted/30">
        <div className="container-clinic max-w-3xl">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal mb-3">Formación</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-8">Educación y certificaciones</h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i} className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border">
                  <GraduationCap className="text-teal flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-foreground">{edu}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Approach */}
      <section className="section-padding">
        <div className="container-clinic max-w-3xl">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal mb-3">Filosofía</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6">Mi enfoque</h2>
            <blockquote className="text-muted-foreground text-lg leading-relaxed italic border-l-4 border-teal pl-6">
              "{data.approach}"
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-16 bg-muted/30">
        <div className="container-clinic max-w-3xl">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal mb-3">Especialidades</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-8">Tratamientos</h2>
            <div className="flex flex-wrap gap-3">
              {data.treatments.map((t) => (
                <span key={t} className="bg-teal/10 text-teal px-5 py-2.5 rounded-lg text-sm font-medium">{t}</span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding">
        <div className="container-clinic max-w-xl">
          <AnimatedSection>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal mb-3">Reservar cita</p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-8">
              Pide cita con {data.name.split(" ")[0]}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Nombre</label>
                <input type="text" required className={inputClasses} placeholder="Tu nombre completo"
                  value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Teléfono</label>
                  <input type="tel" required className={inputClasses} placeholder="+34 600 000 000"
                    value={form.telefono} onChange={(e) => setForm({...form, telefono: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input type="email" required className={inputClasses} placeholder="tu@email.com"
                    value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Doctor</label>
                <select className={inputClasses} value={form.doctor} onChange={(e) => setForm({...form, doctor: e.target.value})}>
                  {allDoctors.map((d) => (
                    <option key={d.slug} value={d.slug}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Tratamiento</label>
                <select className={inputClasses} value={form.tratamiento} onChange={(e) => setForm({...form, tratamiento: e.target.value})}>
                  <option value="">Selecciona un tratamiento</option>
                  {data.treatments.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Fecha preferida</label>
                <input type="date" className={inputClasses}
                  value={form.fecha} onChange={(e) => setForm({...form, fecha: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Mensaje</label>
                <textarea rows={3} className={inputClasses} placeholder="Cuéntanos tu caso..."
                  value={form.mensaje} onChange={(e) => setForm({...form, mensaje: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-teal text-primary-foreground py-4 rounded-lg font-semibold hover:bg-teal-hover transition-colors">
                Solicitar cita con {data.name.split(" ")[0]}
              </button>
              <p className="text-center text-muted-foreground text-xs">Respuesta en menos de 24h.</p>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick contact */}
      <section className="py-16 gradient-navy">
        <div className="container-clinic text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-navy-foreground mb-6">¿Prefieres contacto directo?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={telHref} className="inline-flex items-center justify-center gap-2 bg-teal text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-teal-hover transition-colors">
                <Phone size={18} /> Llamar ahora
              </a>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-navy-foreground/20 text-navy-foreground px-8 py-4 rounded-lg font-semibold hover:border-navy-foreground/40 transition-colors">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoctorPage;
