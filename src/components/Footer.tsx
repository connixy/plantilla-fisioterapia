import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { clinic, telHref, mailtoHref } from "../config/clinic";

const treatments = [
  { label: "Fisioterapia deportiva", path: "/tratamiento/fisioterapia-deportiva" },
  { label: "Neurorrehabilitación", path: "/tratamiento/neurorrehabilitacion" },
  { label: "Fisioterapia pediátrica", path: "/tratamiento/fisioterapia-pediatrica" },
  { label: "Suelo pélvico", path: "/tratamiento/suelo-pelvico" },
  { label: "Fisioterapia geriátrica", path: "/tratamiento/fisioterapia-geriatrica" },
  { label: "Dolor crónico", path: "/tratamiento/dolor-cronico" },
];

const Footer = () => {
  return (
    <footer className="bg-carbon text-carbon-foreground">
      <div className="container-clinic py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-xl font-bold mb-4 tracking-tight">
              {clinic.marca.prefijo}<span className="text-teal">{clinic.marca.sufijo}</span>
            </h3>
            <p className="text-sm text-carbon-foreground/40 leading-relaxed mb-6 font-light">
              Tratamiento personalizado con diagnóstico preciso y atención individual en el corazón de Madrid.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: clinic.redes.instagram },
                { Icon: Facebook, href: clinic.redes.facebook },
                { Icon: Linkedin, href: clinic.redes.linkedin },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="text-carbon-foreground/30 hover:text-teal transition-colors" aria-label="Social">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-tech text-[10px] tracking-[0.2em] uppercase mb-5 text-carbon-foreground/30">Navegación</h4>
            <ul className="space-y-3">
              {["Tratamientos", "Equipo", "Casos reales", "Sobre nosotros", "Contacto"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-carbon-foreground/50 hover:text-teal transition-colors font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="font-tech text-[10px] tracking-[0.2em] uppercase mb-5 text-carbon-foreground/30">Tratamientos</h4>
            <ul className="space-y-3">
              {treatments.map((t) => (
                <li key={t.path}>
                  <Link to={t.path} className="text-sm text-carbon-foreground/50 hover:text-teal transition-colors font-light">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-tech text-[10px] tracking-[0.2em] uppercase mb-5 text-carbon-foreground/30">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-carbon-foreground/50">
                <Phone size={14} className="text-teal flex-shrink-0" />
                <a href={telHref} className="hover:text-teal transition-colors">{clinic.contacto.telefonoDisplay}</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-carbon-foreground/50">
                <Mail size={14} className="text-teal flex-shrink-0" />
                <a href={mailtoHref} className="hover:text-teal transition-colors">{clinic.contacto.email}</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-carbon-foreground/50">
                <MapPin size={14} className="text-teal flex-shrink-0 mt-0.5" />
                <span>{clinic.contacto.direccion}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-carbon-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-tech text-[10px] tracking-wider text-carbon-foreground/30 uppercase">
            © {new Date().getFullYear()} {clinic.marca.prefijo}{clinic.marca.sufijo}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 font-tech text-[10px] tracking-wider text-carbon-foreground/30 uppercase">
            <a href="#" className="hover:text-teal transition-colors">Privacidad</a>
            <span>·</span>
            <a href="#" className="hover:text-teal transition-colors">Cookies</a>
            <span>·</span>
            <a href="#" className="hover:text-teal transition-colors">Legal</a>
          </div>
          <p className="font-tech text-[10px] tracking-wider text-carbon-foreground/20 uppercase">
            Diseño por <span className="text-teal">Connixy</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
