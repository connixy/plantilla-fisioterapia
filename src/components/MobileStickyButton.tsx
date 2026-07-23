import { clinic } from "../config/clinic";

const MobileStickyButton = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-gradient-to-t from-carbon via-carbon/90 to-transparent">
      <a
        href="#contacto"
        className="block w-full text-white text-center py-4 rounded-2xl font-bold shadow-lg transition-all font-tech text-sm tracking-wider uppercase"
        style={{ backgroundColor: clinic.colorBoton }}
      >
        Reservar cita
      </a>
    </div>
  );
};

export default MobileStickyButton;
