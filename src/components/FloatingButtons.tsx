import { Phone, MessageCircle } from "lucide-react";
import { clinic, telHref, whatsappHref } from "../config/clinic";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:bottom-8 md:right-8">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        style={{ backgroundColor: "#25D366" }}
      >
        <MessageCircle className="text-white" size={24} />
      </a>
      <a
        href={telHref}
        aria-label="Llamar"
        className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        style={{ backgroundColor: clinic.colorBoton }}
      >
        <Phone className="text-white" size={24} />
      </a>
    </div>
  );
};

export default FloatingButtons;
