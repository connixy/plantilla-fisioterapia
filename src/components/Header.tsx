import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clinic } from "../config/clinic";

const navItems = [
  { label: "Tratamientos", href: "#tratamientos" },
  { label: "Equipo", href: "#equipo" },
  { label: "Casos reales", href: "#casos-reales" },
  { label: "Instalaciones", href: "#instalaciones" },
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll del fondo mientras el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
        }
      }, 300);
    } else {
      const el = document.querySelector(href);
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-panel-light shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-clinic flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-heading text-lg md:text-xl font-bold tracking-tight">
          <span className={scrolled ? "text-foreground" : "text-white"}>
            {clinic.marca.prefijo}
          </span>
          <span className="text-teal">{clinic.marca.sufijo}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`font-tech text-[11px] tracking-[0.15em] uppercase font-medium transition-colors hover:text-teal ${
                scrolled ? "text-foreground/60" : "text-white/70"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contacto")}
            className="text-white px-6 py-2.5 rounded-xl font-tech text-[11px] tracking-wider uppercase font-bold transition-all duration-300"
            style={{ backgroundColor: clinic.colorBoton }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = clinic.colorBotonHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = clinic.colorBoton)}
          >
            Reservar cita
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-2 relative z-[70]"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X className="text-foreground" size={26} />
          ) : (
            <Menu className={scrolled ? "text-foreground" : "text-white"} size={26} />
          )}
        </button>
      </div>

      {/* Mobile overlay: pantalla completa, fondo blanco sólido */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="md:hidden fixed inset-0 z-[60] bg-white flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <nav className="flex-1 flex flex-col items-center justify-center gap-7 px-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="font-tech text-base tracking-[0.15em] uppercase text-foreground hover:text-teal transition-colors"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <button
                onClick={() => handleNavClick("#contacto")}
                className="text-white px-10 py-3.5 rounded-xl font-tech text-sm tracking-wider uppercase font-bold transition-colors mt-4"
                style={{ backgroundColor: clinic.colorBoton }}
              >
                Reservar cita
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
