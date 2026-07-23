import { clinic } from "../config/clinic";

const N8N_WEBHOOK_URL = clinic.webhookReservas;

export interface BookingData {
  nombre: string;
  telefono: string;
  email: string;
  doctor: string;
  tratamiento: string;
  fechaHora: string;
}

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
