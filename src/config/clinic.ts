/**
 * ────────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN CENTRAL DE LA CLÍNICA
 * ────────────────────────────────────────────────────────────────
 *  Edita SOLO este archivo para personalizar la plantilla para una
 *  clínica nueva: nombre, contacto, dirección, horario, redes y color
 *  del botón de acción. Todos los componentes leen de aquí.
 *
 *  Lo que NO está en este archivo (se edita en su propio sitio):
 *   - Servicios / tratamientos → src/components/sections/TratamientosSection.tsx
 *   - Equipo / doctores        → src/components/sections/EquipoSection.tsx
 *   - Fotos                    → src/assets/ (doctores, tratamientos)
 *                                public/images (antes/después) y
 *                                public/videos/hero-bg.mp4 (fondo hero)
 *   - Paleta de colores        → src/index.css (variable --teal)
 *   - Título/SEO del navegador → index.html
 * ────────────────────────────────────────────────────────────────
 */

export const clinic = {
  /** Marca. El logo se muestra en dos tonos: prefijo + sufijo (en color teal). */
  marca: {
    prefijo: "FISIO",
    sufijo: "EXFO",
  },

  /** Ciudad donde opera la clínica (aparece en textos del hero, etc.). */
  ciudad: "Madrid",

  /** Datos de contacto. */
  contacto: {
    /** Teléfono en formato internacional para enlaces tel: (sin espacios). */
    telefono: "+34641851773",
    /** Teléfono con formato bonito para mostrar en pantalla. */
    telefonoDisplay: "+34 641 851 773",
    /** Número para enlaces de WhatsApp (solo dígitos, con prefijo país, sin +). */
    whatsapp: "34641851773",
    /** Email de contacto. */
    email: "info@fisioavanzada.es",
    /** Dirección física completa. */
    direccion: "Calle Gran Vía 42, 28013 Madrid",
  },

  /** Enlaces a redes sociales (usa "#" si no aplica). */
  redes: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
  },

  /**
   * Horario del sistema de reservas. Genera los huecos disponibles.
   *  - horaInicio / horaFin: en formato 24h (número de hora).
   *  - duracionCitaMin: duración de cada hueco en minutos.
   */
  horario: {
    horaInicio: 9,
    horaFin: 20,
    duracionCitaMin: 45,
  },

  /** Color del botón de acción principal ("Reservar cita"). */
  colorBoton: "#FF7A59",
  colorBotonHover: "#e8694b",

  /**
   * URL del webhook (n8n) que recibe las reservas.
   * IMPORTANTE: para producción usa la URL /webhook/ (no la /webhook-test/,
   * que en n8n solo funciona con el editor abierto).
   */
  webhookReservas:
    "https://connixy.app.n8n.cloud/webhook-test/a016edb6-2e09-4535-82fd-4e134c1b2ecd",
} as const;

/** Enlace tel: listo para usar en href. */
export const telHref = `tel:${clinic.contacto.telefono}`;
/** Enlace de WhatsApp listo para usar en href. */
export const whatsappHref = `https://wa.me/${clinic.contacto.whatsapp}`;
/** Enlace mailto: listo para usar en href. */
export const mailtoHref = `mailto:${clinic.contacto.email}`;
