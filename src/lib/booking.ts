import emailjs from "@emailjs/browser";
import { clinic, emailjsConfigurado } from "../config/clinic";

const N8N_WEBHOOK_URL = clinic.webhookReservas;

export interface BookingData {
  nombre: string;
  telefono: string;
  email: string;
  doctor: string;
  tratamiento: string;
  fechaHora: string;
}

/** Envía la reserva al webhook (que a su vez la distribuye en el backend). */
export async function enviarReserva(data: BookingData): Promise<boolean> {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Envía la reserva por email mediante EmailJS (sin backend).
 * Devuelve true si se envió, false si falló o si EmailJS no está configurado.
 * Las claves de estos params deben coincidir con las variables {{...}} de la
 * plantilla en emailjs.com.
 */
export async function enviarEmail(data: BookingData): Promise<boolean> {
  if (!emailjsConfigurado) return false;
  try {
    await emailjs.send(
      clinic.emailjs.serviceId,
      clinic.emailjs.templateId,
      {
        to_email: clinic.contacto.email,
        nombre: data.nombre,
        telefono: data.telefono,
        email: data.email,
        doctor: data.doctor || "Sin preferencia",
        tratamiento: data.tratamiento,
        fecha_hora: data.fechaHora,
        mensaje: construirMensaje(data),
      },
      { publicKey: clinic.emailjs.publicKey },
    );
    return true;
  } catch {
    return false;
  }
}

/** Texto legible de la reserva, reutilizado para WhatsApp y email. */
function construirMensaje(data: BookingData): string {
  const lineas = [
    "Nueva solicitud de reserva:",
    `• Nombre: ${data.nombre}`,
    `• Teléfono: ${data.telefono}`,
    `• Email: ${data.email}`,
    `• Especialista: ${data.doctor || "Sin preferencia"}`,
    `• Tratamiento: ${data.tratamiento}`,
    `• Fecha y hora: ${data.fechaHora}`,
  ];
  return lineas.join("\n");
}

/** Enlace de WhatsApp al número de la clínica con la reserva prerrellenada. */
export function whatsappReservaHref(data: BookingData): string {
  return `https://wa.me/${clinic.contacto.whatsapp}?text=${encodeURIComponent(construirMensaje(data))}`;
}

/** Enlace mailto al email de la clínica con la reserva prerrellenada. */
export function mailtoReservaHref(data: BookingData): string {
  const asunto = `Reserva de cita — ${data.nombre}`;
  return `mailto:${clinic.contacto.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(construirMensaje(data))}`;
}
