import { useState, useMemo } from "react";
import { Phone, MessageCircle, MapPin, Instagram, Facebook, Linkedin, Mail, CheckCircle2, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../AnimatedSection";
import { enviarReserva } from "../../lib/booking";
import { clinic, telHref, whatsappHref, mailtoHref } from "../../config/clinic";

const doctors = [
  { slug: "elena-martinez", name: "Dra. Elena Martínez" },
  { slug: "carlos-ruiz", name: "Carlos Ruiz" },
  { slug: "laura-sanchez", name: "Laura Sánchez" },
  { slug: "miguel-torres", name: "Miguel Torres" },
];

const treatments = [
  "Fisioterapia deportiva",
  "Neurorrehabilitación",
  "Fisioterapia pediátrica",
  "Suelo pélvico",
  "Fisioterapia geriátrica",
  "Dolor crónico",
];

function generateSlots(): string[] {
  const slots: string[] = [];
  const { horaInicio, horaFin, duracionCitaMin } = clinic.horario;
  let h = horaInicio, m = 0;
  while (h < horaFin || (h === horaFin && m === 0)) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += duracionCitaMin;
    while (m >= 60) { h += 1; m -= 60; }
  }
  return slots;
}

const TIME_SLOTS = generateSlots();

function getOccupiedSlots(dateStr: string): Set<string> {
  const occupied = new Set<string>();
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) seed += dateStr.charCodeAt(i);
  TIME_SLOTS.forEach((slot, i) => {
    if ((seed * (i + 1) * 7) % 5 === 0) occupied.add(slot);
  });
  return occupied;
}

function formatDateLabel(date: Date): string {
  return date.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" });
}

function getWeekDays(startOfWeek: Date): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}

function toDateStr(d: Date) { return d.toISOString().split("T")[0]; }

function getMonday(d: Date): Date {
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const mon = new Date(d);
  mon.setDate(diff);
  mon.setHours(0, 0, 0, 0);
  return mon;
}

const inputClasses = "w-full px-4 py-3.5 rounded-2xl border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors text-sm font-light";

const ContactoSection = () => {
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "", doctor: "", tratamiento: "" });
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);
  const [step, setStep] = useState<"form" | "grid" | "success">("form");
  const [sending, setSending] = useState(false);

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);

  const handleFormNext = (e: React.FormEvent) => { e.preventDefault(); setStep("grid"); };

  const handleConfirm = async () => {
    if (!selectedSlot) return;
    setSending(true);
    const doctorName = doctors.find(d => d.slug === form.doctor)?.name || "";
    await enviarReserva({
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
      email: form.email.trim(),
      doctor: doctorName,
      tratamiento: form.tratamiento,
      fechaHora: `${selectedSlot.date} ${selectedSlot.time}`,
    });
    setSending(false);
    setStep("success");
  };

  const prevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    const today = getMonday(new Date());
    if (d >= today) { setWeekStart(d); setSelectedSlot(null); }
  };
  const nextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
    setSelectedSlot(null);
  };

  return (
    <section id="contacto" className="section-padding bg-carbon">
      <div className="container-clinic">
        <AnimatedSection className="text-center mb-16">
          <span className="font-tech text-[11px] tracking-[0.3em] uppercase text-teal/70 block mb-4">
            Booking System
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-carbon-foreground mb-4 tracking-tight">
            Reserva tu cita
          </h2>
          <p className="text-carbon-foreground/50 text-lg font-light">Selecciona tu horario preferido.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left */}
          <AnimatedSection>
            <div className="space-y-4">
              {[
                { href: telHref, icon: Phone, title: "Llámanos", sub: clinic.contacto.telefonoDisplay, color: "bg-teal/10", hoverColor: "group-hover:bg-teal/20", iconColor: "text-teal" },
                { href: whatsappHref, icon: MessageCircle, title: "WhatsApp", sub: "Escríbenos al instante", color: "bg-green-500/10", hoverColor: "group-hover:bg-green-500/20", iconColor: "text-green-400", external: true },
                { href: mailtoHref, icon: Mail, title: "Email", sub: clinic.contacto.email, color: "bg-teal/10", hoverColor: "group-hover:bg-teal/20", iconColor: "text-teal" },
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 glass-panel rounded-[20px] hover:border-teal/30 transition-all group"
                >
                  <div className={`w-11 h-11 rounded-xl ${item.color} ${item.hoverColor} flex items-center justify-center transition-colors`}>
                    <item.icon className={item.iconColor} size={20} />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-carbon-foreground text-sm">{item.title}</p>
                    <p className="font-tech text-[10px] tracking-wider text-carbon-foreground/40 uppercase">{item.sub}</p>
                  </div>
                </a>
              ))}

              <div className="flex items-start gap-4 p-4 glass-panel rounded-[20px]">
                <div className="w-11 h-11 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-teal" size={20} />
                </div>
                <div>
                  <p className="font-heading font-bold text-carbon-foreground text-sm">Dirección</p>
                  <p className="font-tech text-[10px] tracking-wider text-carbon-foreground/40 uppercase">{clinic.contacto.direccion}</p>
                </div>
              </div>

              <div className="rounded-[20px] overflow-hidden border border-white/10 h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.2234!2d-3.7037902!3d40.4207654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzE0LjgiTiAzwrA0MicxMy42Ilc!5e0!3m2!1ses!2ses!4v1"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Ubicación de la clínica"
                />
              </div>

              <div className="flex gap-4 pt-2">
                {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="text-carbon-foreground/30 hover:text-teal transition-colors" aria-label="Social"><Icon size={18} /></a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right - Booking */}
          <AnimatedSection delay={0.15}>
            <AnimatePresence mode="wait">
              {step === "form" && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleFormNext}
                  className="glass-panel rounded-[24px] p-8 space-y-5"
                >
                  <div>
                    <label className="block font-tech text-[10px] tracking-widest uppercase text-carbon-foreground/50 mb-2">Nombre</label>
                    <input type="text" required className={inputClasses + " bg-white/5 border-white/10 text-carbon-foreground placeholder:text-carbon-foreground/30"}
                      placeholder="Tu nombre completo"
                      value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-tech text-[10px] tracking-widest uppercase text-carbon-foreground/50 mb-2">Teléfono</label>
                      <input type="tel" required className={inputClasses + " bg-white/5 border-white/10 text-carbon-foreground placeholder:text-carbon-foreground/30"}
                        placeholder="+34 600 000 000"
                        value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
                    </div>
                    <div>
                      <label className="block font-tech text-[10px] tracking-widest uppercase text-carbon-foreground/50 mb-2">Email</label>
                      <input type="email" required className={inputClasses + " bg-white/5 border-white/10 text-carbon-foreground placeholder:text-carbon-foreground/30"}
                        placeholder="tu@email.com"
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block font-tech text-[10px] tracking-widest uppercase text-carbon-foreground/50 mb-2">Doctor</label>
                    <select className={inputClasses + " bg-white/5 border-white/10 text-carbon-foreground"} value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })}>
                      <option value="">Sin preferencia</option>
                      {doctors.map((d) => (<option key={d.slug} value={d.slug}>{d.name}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-tech text-[10px] tracking-widest uppercase text-carbon-foreground/50 mb-2">Tratamiento</label>
                    <select required className={inputClasses + " bg-white/5 border-white/10 text-carbon-foreground"} value={form.tratamiento} onChange={(e) => setForm({ ...form, tratamiento: e.target.value })}>
                      <option value="">Selecciona</option>
                      {treatments.map((t) => (<option key={t} value={t}>{t}</option>))}
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-teal text-primary-foreground py-4 rounded-2xl font-bold hover:bg-teal-hover transition-colors flex items-center justify-center gap-2">
                    <CalendarDays size={18} /> Ver disponibilidad
                  </button>
                </motion.form>
              )}

              {step === "grid" && (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-panel rounded-[24px] p-6 md:p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <button onClick={() => setStep("form")} className="font-tech text-[10px] tracking-wider text-teal hover:underline uppercase">← Volver</button>
                    <h3 className="font-heading text-lg font-bold text-carbon-foreground tracking-tight">Elige horario</h3>
                    <div className="w-16" />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <button onClick={prevWeek} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
                      <ChevronLeft size={18} className="text-carbon-foreground" />
                    </button>
                    <span className="font-tech text-[11px] tracking-wider text-carbon-foreground/60 uppercase">
                      {weekDays[0].toLocaleDateString("es-ES", { day: "numeric", month: "short" })} – {weekDays[4].toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <button onClick={nextWeek} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
                      <ChevronRight size={18} className="text-carbon-foreground" />
                    </button>
                  </div>

                  <div className="overflow-x-auto -mx-2 px-2">
                    <div className="grid grid-cols-5 gap-1 min-w-[400px]">
                      {weekDays.map((day) => (
                        <div key={toDateStr(day)} className="text-center font-tech text-[9px] tracking-wider text-carbon-foreground/40 uppercase py-2">
                          {formatDateLabel(day)}
                        </div>
                      ))}
                      {TIME_SLOTS.map((time) =>
                        weekDays.map((day) => {
                          const dateStr = toDateStr(day);
                          const occupied = getOccupiedSlots(dateStr);
                          const isOccupied = occupied.has(time);
                          const isSelected = selectedSlot?.date === dateStr && selectedSlot?.time === time;
                          const isPast = new Date(`${dateStr}T${time}:00`) < new Date();
                          const disabled = isOccupied || isPast;

                          return (
                            <button
                              key={`${dateStr}-${time}`}
                              disabled={disabled}
                              onClick={() => setSelectedSlot({ date: dateStr, time })}
                              className={`py-1.5 font-tech text-[10px] rounded-xl transition-all ${
                                disabled
                                  ? "opacity-30 grayscale cursor-not-allowed bg-white/5 text-carbon-foreground/30 line-through"
                                  : isSelected
                                    ? "bg-teal text-primary-foreground shadow-md scale-105"
                                    : "bg-white/5 text-carbon-foreground/60 hover:bg-teal/15 hover:text-teal"
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {selectedSlot && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 rounded-2xl bg-teal/5 border border-teal/20">
                      <p className="font-tech text-[11px] tracking-wider text-carbon-foreground/70 mb-3 uppercase">
                        <span className="font-bold text-teal">Cita:</span>{" "}
                        {new Date(selectedSlot.date).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })} · {selectedSlot.time}
                      </p>
                      <button
                        onClick={handleConfirm}
                        disabled={sending}
                        className="w-full py-3.5 rounded-2xl font-bold transition-all disabled:opacity-60 text-white"
                        style={{ backgroundColor: clinic.colorBoton }}
                      >
                        {sending ? "Enviando..." : "Confirmar reserva"}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="glass-panel rounded-[24px] p-10 text-center flex flex-col items-center justify-center min-h-[400px]"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 300 }}>
                    <CheckCircle2 className="text-teal mx-auto mb-6" size={64} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-carbon-foreground mb-3 tracking-tight">
                    Cita bloqueada
                  </h3>
                  <p className="text-carbon-foreground/50 text-lg mb-8 font-light">
                    Te contactaremos por WhatsApp para confirmar.
                  </p>
                  <button
                    onClick={() => { setStep("form"); setSelectedSlot(null); setForm({ nombre: "", telefono: "", email: "", doctor: "", tratamiento: "" }); }}
                    className="font-tech text-[11px] tracking-wider text-teal hover:underline uppercase"
                  >
                    Reservar otra cita
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactoSection;
