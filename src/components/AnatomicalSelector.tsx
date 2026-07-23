import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Chart from "chart.js/auto";

// Diccionario maestro de especialidades (coincide con los 6 tratamientos)
const SERVICIOS: Record<string, { nombre: string; icono: string }> = {
  deportivo: { nombre: "Deportiva", icono: "🏃" },
  pelvico: { nombre: "Suelo Pélvico", icono: "🧘" },
  neuro: { nombre: "Neurorrehabilitación", icono: "🧠" },
  pediatrica: { nombre: "Pediátrica", icono: "👶" },
  geriatrica: { nombre: "Geriátrica", icono: "👴" },
  dolor: { nombre: "Dolor Crónico", icono: "🛡️" },
};

const SERVICIO_IDS = Object.keys(SERVICIOS);

interface Zona {
  label: string;
  top: string;
  side: "left" | "right";
  sesiones: string;
  serviciosIds: string[];
  nota: string;
  curva: number[];
}

// 6 zonas anatómicas
const ZONAS: Record<string, Zona> = {
  cervical: {
    label: "Cervical",
    top: "15%",
    side: "right",
    sesiones: "3-5",
    serviciosIds: ["dolor", "neuro", "deportivo"],
    nota: "Abordamos el dolor cervical desde el control motor y la desensibilización del sistema nervioso central.",
    curva: [30, 60, 85, 95],
  },
  hombro: {
    label: "Hombro",
    top: "18%",
    side: "left",
    sesiones: "6-8",
    serviciosIds: ["deportivo", "dolor", "geriatrica"],
    nota: "Especialistas en manguito rotador y readaptación funcional tras lesiones o intervenciones quirúrgicas.",
    curva: [10, 30, 55, 75, 90],
  },
  lumbar: {
    label: "Lumbar",
    top: "35%",
    side: "right",
    sesiones: "4-7",
    serviciosIds: ["dolor", "deportivo", "pelvico", "geriatrica"],
    nota: "Tratamiento integral de hernias y lumbalgias. El trabajo de suelo pélvico y core es clave para la estabilidad lumbar.",
    curva: [15, 45, 75, 92, 98],
  },
  pelvis: {
    label: "Pelvis / Abdomen",
    top: "46%",
    side: "left",
    sesiones: "8-12",
    serviciosIds: ["pelvico", "pediatrica", "dolor"],
    nota: "Unidad especializada en recuperación posparto, tratamiento de diástasis y disfunciones uroginecológicas.",
    curva: [5, 20, 45, 65, 80, 95],
  },
  rodilla: {
    label: "Rodilla",
    top: "69%",
    side: "right",
    sesiones: "6-10",
    serviciosIds: ["deportivo", "geriatrica", "dolor"],
    nota: "Rehabilitación de ligamentos y meniscos, y readaptación tras cirugía o prótesis de rodilla.",
    curva: [10, 25, 50, 70, 85, 95],
  },
  tobillo: {
    label: "Tobillo / Pie",
    top: "84%",
    side: "left",
    sesiones: "4-8",
    serviciosIds: ["deportivo", "pediatrica", "neuro"],
    nota: "Desde esguinces y fascitis en deportistas hasta la reeducación de la marcha en pediatría y geriatría.",
    curva: [15, 35, 60, 80, 95],
  },
};

const ZONA_KEYS = Object.keys(ZONAS);
const TEAL = "hsl(174, 48%, 32%)";

const AnatomicalSelector = () => {
  const [activeKey, setActiveKey] = useState<string>("cervical");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const zona = ZONAS[activeKey];

  // Dibuja / actualiza la gráfica de evolución al cambiar de zona
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    chartRef.current?.destroy();
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: zona.curva.map((_, i) => `S${i + 1}`),
        datasets: [
          {
            data: zona.curva,
            borderColor: TEAL,
            backgroundColor: "hsla(174, 48%, 32%, 0.08)",
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: TEAL,
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { display: false, min: 0, max: 100 },
          x: { grid: { display: false }, ticks: { font: { size: 9 }, color: "#a8a29e" } },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [activeKey, zona.curva]);

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* Columna izquierda: silueta + leyenda */}
      <div className="lg:col-span-5 flex flex-col items-center">
        <div className="bg-white/40 p-6 md:p-8 rounded-[3rem] border border-border shadow-inner w-full">
          <div className="anat-container">
            {/* Silueta humana de frente (SVG minimalista), centrada en el viewBox */}
            <svg
              viewBox="0 0 320 560"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {/* Cabeza */}
              <circle
                cx="160"
                cy="46"
                r="30"
                fill="hsla(174, 48%, 32%, 0.12)"
                stroke="hsla(174, 48%, 32%, 0.45)"
                strokeWidth="2"
              />
              {/* Cuerpo: tronco, brazos y piernas */}
              <path
                d="M160,74 C172,74 180,80 184,90 L210,104 C218,107 220,114 218,122
                   L210,205 C209,214 200,214 199,205 L192,120 L190,175 L194,255
                   L188,380 L184,470 C184,486 172,486 171,470 L166,330 L160,300
                   L154,330 L149,470 C148,486 136,486 136,470 L132,380 L126,255 L130,175
                   L128,120 L121,205 C120,214 111,214 110,205 L102,122 C100,114 102,107 110,104
                   L136,90 C140,80 148,74 160,74 Z"
                fill="hsla(174, 48%, 32%, 0.12)"
                stroke="hsla(174, 48%, 32%, 0.45)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>

            {/* Etiquetas de zona (en los laterales, fuera del cuerpo) */}
            {ZONA_KEYS.map((key) => {
              const z = ZONAS[key];
              return (
                <div
                  key={`${key}-label`}
                  className={`anat-label ${z.side} ${activeKey === key ? "active" : ""}`}
                  style={{ top: z.top }}
                >
                  {z.label}
                </div>
              );
            })}

            {/* Nodos interactivos (centrados sobre la zona) */}
            {ZONA_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                aria-label={ZONAS[key].label}
                className={`anat-node ${activeKey === key ? "active" : ""}`}
                style={{ top: ZONAS[key].top, left: "50%" }}
                onClick={() => setActiveKey(key)}
              >
                <div className="anat-node-circle">
                  <div className="anat-node-dot" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Leyenda de especialidades */}
        <div className="mt-8 grid grid-cols-2 gap-3 w-full">
          {SERVICIO_IDS.map((sId) => {
            const activo = zona.serviciosIds.includes(sId);
            return (
              <div
                key={sId}
                className={`px-3 py-2 rounded-xl text-[10px] font-bold flex items-center gap-2 border transition-all duration-300 ${
                  activo
                    ? "bg-white border-teal text-teal shadow-sm -translate-y-0.5"
                    : "bg-muted border-border text-muted-foreground opacity-40 grayscale"
                }`}
              >
                <span>{SERVICIOS[sId].icono}</span> {SERVICIOS[sId].nombre}
              </div>
            );
          })}
        </div>
      </div>

      {/* Columna derecha: panel de información dinámico */}
      <div className="lg:col-span-7">
        <div className="glass-panel-light p-8 md:p-10 rounded-[3rem] shadow-2xl min-h-[560px] flex flex-col">
          <div className="flex justify-between items-start mb-8 gap-4">
            <div>
              <span className="font-tech text-[10px] font-black text-teal uppercase tracking-[0.3em] mb-2 block">
                Zona seleccionada
              </span>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activeKey}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="font-heading text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-none"
                >
                  {zona.label}
                </motion.h3>
              </AnimatePresence>
            </div>
            <div className="bg-muted/60 border border-border px-5 py-3 rounded-2xl text-center flex-shrink-0">
              <span className="block font-tech text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                Sesiones estimadas
              </span>
              <span className="font-heading text-3xl font-black italic text-foreground">{zona.sesiones}</span>
            </div>
          </div>

          {/* Especialidades que intervienen */}
          <div className="mb-8">
            <h4 className="font-tech text-xs font-black text-muted-foreground uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-teal rounded-full" />
              Especialidades que intervienen en esta zona
            </h4>
            <div className="flex flex-wrap gap-3">
              {zona.serviciosIds.map((sId) => (
                <div
                  key={sId}
                  className="bg-teal/10 text-teal px-4 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-2 border border-teal/20 shadow-sm"
                >
                  <span>{SERVICIOS[sId].icono}</span> {SERVICIOS[sId].nombre}
                </div>
              ))}
            </div>
          </div>

          {/* Protocolo clínico */}
          <div className="p-6 bg-carbon text-carbon-foreground rounded-[2rem] shadow-lg mb-8 relative overflow-hidden">
            <h4 className="font-tech text-[9px] font-bold text-teal uppercase mb-2 tracking-widest">
              Protocolo clínico
            </h4>
            <p className="text-xs leading-relaxed italic text-carbon-foreground/70 font-medium">{zona.nota}</p>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-teal/10 rounded-full blur-xl" />
          </div>

          {/* Gráfica de evolución */}
          <div className="mt-auto pt-6 border-t border-border">
            <h4 className="font-tech text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-4 text-center">
              Evolución de bienestar proyectada
            </h4>
            <div className="relative w-full h-[200px]">
              <canvas ref={canvasRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnatomicalSelector;
