/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║         MI GENERACIÓN TOUR — ARCHIVO DE CONFIGURACIÓN           ║
 * ║   Aquí puedes cambiar colores, fuentes, textos y conexiones     ║
 * ║   Ver MANUAL.md para instrucciones detalladas                   ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

window.TOUR_CONFIG = {

  // ──────────────────────────────────────────────────────────────
  // 1. SUPABASE — Conexión a la base de datos
  //    Reemplaza con tus credenciales de https://supabase.com
  // ──────────────────────────────────────────────────────────────
  SUPABASE: {
    URL: "https://juoppauzyaenwoqbmhtd.supabase.co",
    ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1b3BwYXV6eWFlbndvcWJtaHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MDc3MTcsImV4cCI6MjA5MjM4MzcxN30.IHzhUkboHu6mOIBRvelkmRfCtzFC3hjIc1wJvs40In8",
    TABLE: "registros_interes",                        // Nombre de la tabla
  },

  // ──────────────────────────────────────────────────────────────
  // 2. LAYLO — Integración de API (opcional)
  //    Activa cuando tengas las credenciales de Laylo
  //    Ver docs/LAYLO_INTEGRATION.md para instrucciones
  // ──────────────────────────────────────────────────────────────
  LAYLO: {
    ENABLED: false,                                    // ⚡ Cambiar a true cuando esté listo
    API_KEY: "",                                       // ⚡ REEMPLAZAR con tu API key de Laylo
    DROP_ID: "",                                       // ⚡ ID del drop en Laylo
    ENDPOINT: "https://api.laylo.com/v1/drops",
    // Cuando ENABLED=true, el formulario también enviará los datos a Laylo
    // y se mostrará el widget de Laylo en la sección del formulario
  },

  // ──────────────────────────────────────────────────────────────
  // 3. POLÍTICA DE TRATAMIENTO DE DATOS
  //    ⚡ EDITAR antes del despliegue con el texto legal correcto
  //    Recomendamos revisión de un abogado especializado
  // ──────────────────────────────────────────────────────────────
  PRIVACY_POLICY: `
    Al diligenciar y enviar este formulario, usted como titular de la información,
    autoriza de manera libre, previa, expresa, voluntaria e informada a
    <strong>Mi Generación Tour SAS</strong> (en adelante "el Responsable") para que
    trate sus datos personales de nombre, teléfono y ciudad, con las siguientes finalidades:
    <br><br>
    (i) Gestión de registro e interés en el evento;<br>
    (ii) Envío de información sobre el evento, fechas, disponibilidad y promociones;<br>
    (iii) Análisis estadístico de audiencias.<br><br>
    El tratamiento se realiza bajo los principios de la <strong>Ley 1581 de 2012</strong>
    y el <strong>Decreto 1377 de 2013</strong>. Sus datos no serán vendidos ni cedidos a
    terceros con fines comerciales. Usted tiene derecho a conocer, actualizar, rectificar
    y suprimir sus datos escribiendo a
    <a href="mailto:privacidad@migeneraciontour.com" style="color:var(--gold-1)">
      privacidad@migeneraciontour.com
    </a>.
    Para mayor información consulte nuestra
    <a href="/politica-privacidad.html" style="color:var(--gold-1)">
      Política de Privacidad completa
    </a>.
  `,

  // ──────────────────────────────────────────────────────────────
  // 4. EVENTO — Información editable del evento
  // ──────────────────────────────────────────────────────────────
  EVENT: {
    ARTIST: "Pasabordo",
    TOUR_NAME: "Mi Generación Tour",
    DATE: "17 de septiembre de 2026",
    VENUE: "Teatro Universidad de Medellín",
    CITY: "Medellín",
    TIME: "20:00",
    AVAILABLE_TICKETS: 287,                          // ⚡ Actualizar dinámicamente si quieres
    SOLD_PERCENTAGE: 72,                             // ⚡ Porcentaje vendido para la barra
  },

  // ──────────────────────────────────────────────────────────────
  // 5. REDES SOCIALES
  // ──────────────────────────────────────────────────────────────
  SOCIAL: {
    INSTAGRAM: "https://instagram.com/pasabordo",   // ⚡ REEMPLAZAR
    TIKTOK: "https://tiktok.com/@pasabordo",        // ⚡ REEMPLAZAR
    YOUTUBE: "https://youtube.com/@pasabordo",      // ⚡ REEMPLAZAR
  },

  // ──────────────────────────────────────────────────────────────
  // 6. CANVAS REVEAL — Configuración del efecto
  // ──────────────────────────────────────────────────────────────
  REVEAL: {
    DESKTOP_RADIUS: 80,               // Radio del brush en desktop (px)
    MOBILE_AUTO_SPEED: 2000,          // Duración del auto-reveal mobile (ms)
    MAX_DROPS: 60,                    // Máximo de partículas simultáneas
    MOBILE_MAX_DROPS: 20,             // Máximo de partículas en mobile
    TOUCH_THROTTLE_MS: 16,            // Throttling de eventos touch (~60fps)
    MOBILE_RADIUS: 50,                // Radio del brush en touch (px)
  },

};

// ── Exportar globalmente (disponible para main.js) ──
const SUPABASE_CONFIG = window.TOUR_CONFIG.SUPABASE;
const LAYLO_CONFIG = window.TOUR_CONFIG.LAYLO;
const REVEAL_CONFIG = window.TOUR_CONFIG.REVEAL;
