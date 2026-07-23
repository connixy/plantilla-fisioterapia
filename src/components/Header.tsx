import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X className={scrolled ? "text-foreground" : "text-white"} size={24} />
          ) : (
            <Menu className={scrolled ? "text-foreground" : "text-white"} size={24} />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 animate-fade-in-up bg-background/95 backdrop-blur-xl">
          <nav className="flex flex-col items-center justify-center gap-6 pt-16 bg-white">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="font-tech text-sm tracking-[0.15em] uppercase text-foreground hover:text-teal transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contacto")}
              className="text-white px-8 py-3 rounded-xl font-tech text-sm tracking-wider uppercase font-bold transition-colors mt-4"
              style={{ backgroundColor: clinic.colorBoton }}
            >
              Reservar cita
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
