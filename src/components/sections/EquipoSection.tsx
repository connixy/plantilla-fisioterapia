import { Award, GraduationCap, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import doctorElena from "../../assets/doctor-elena.jpg";
import doctorCarlos from "../../assets/doctor-carlos.jpg";
import doctorLaura from "../../assets/doctor-laura.jpg";
import doctorMiguel from "../../assets/doctor-miguel.jpg";

const featuredMember = {
  name: "Dra. Elena Martínez",
  slug: "elena-martinez",
  specialty: "Directora Clínica · Neurorrehabilitación",
  bio: "Más de 15 años de experiencia en neurorrehabilitación y terapia manual. Formada en las mejores universidades europeas, lidera nuestro equipo con un enfoque basado en la evidencia científica.",
  badges: ["Colegiada Nº 4521", "Máster UCM", "+15 años experiencia"],
  image: doctorElena,
};

const teamMembers = [
  { name: "Carlos Ruiz", slug: "carlos-ruiz", specialty: "Fisioterapia Deportiva", experience: "+10 años", image: doctorCarlos },
  { name: "Laura Sánchez", slug: "laura-sanchez", specialty: "Suelo Pélvico", experience: "+8 años", image: doctorLaura },
  { name: "Miguel Torres", slug: "miguel-torres", specialty: "Dolor Crónico", experience: "+12 años", image: doctorMiguel },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const EquipoSection = () => {
  return (
    <section id="equipo" className="section-padding bg-carbon">
      <div className="container-clinic">
        <AnimatedSection className="text-center mb-16">
          <span className="font-tech text-[11px] tracking-[0.3em] uppercase text-teal/70 block mb-4">
            Equipo clínico
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-carbon-foreground mb-4 tracking-tight">
            Conoce Tu Especialista
          </h2>
          <p className="text-carbon-foreground/50 max-w-2xl mx-auto text-lg font-light">
            Fisioterapeutas colegiados con formación especializada y amplia experiencia clínica.
          </p>
        </AnimatedSection>

        {/* Featured */}
        <AnimatedSection className="mb-12">
          <Link
            to={`/equipo/${featuredMember.slug}`}
            className="block glass-panel rounded-[24px] overflow-hidden md:flex hover:border-teal/30 transition-all duration-500"
          >
            <div className="md:w-2/5 bg-gradient-to-br from-teal/5 to-carbon flex items-center justify-center p-12 md:p-16">
              <img
                src={featuredMember.image}
                alt={featuredMember.name}
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg ring-2 ring-teal/20"
                loading="lazy"
                width={224}
                height={224}
              />
            </div>
            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-carbon-foreground mb-1 tracking-tight">
                {featuredMember.name}
              </h3>
              <p className="font-tech text-[11px] tracking-widest uppercase text-teal mb-5">
                {featuredMember.specialty}
              </p>
              <p className="text-carbon-foreground/50 leading-relaxed mb-6 font-light">
                {featuredMember.bio}
              </p>
              <div className="flex flex-wrap gap-3">
                {featuredMember.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 font-tech text-[10px] tracking-wider uppercase bg-teal/10 text-teal px-4 py-2 rounded-full border border-teal/20"
                  >
                    {badge.includes("Coleg") && <Award size={11} />}
                    {badge.includes("Máster") && <GraduationCap size={11} />}
                    {badge.includes("años") && <Clock size={11} />}
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </AnimatedSection>

        {/* Team grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {teamMembers.map((m) => (
            <motion.div key={m.name} variants={fadeUp}>
              <Link
                to={`/equipo/${m.slug}`}
                className="block glass-panel rounded-[24px] p-8 text-center hover:border-teal/30 transition-all duration-500"
              >
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-5 ring-2 ring-teal/20"
                  loading="lazy"
                  width={80}
                  height={80}
                />
                <h4 className="font-heading text-lg font-bold text-carbon-foreground mb-1 tracking-tight">
                  {m.name}
                </h4>
                <p className="font-tech text-[10px] tracking-widest uppercase text-teal mb-2">
                  {m.specialty}
                </p>
                <p className="font-tech text-[10px] tracking-wider text-carbon-foreground/40 uppercase">
                  {m.experience}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EquipoSection;
