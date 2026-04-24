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
Al registrarte, completar formularios o utilizar este servicio, autorizas de manera libre, previa, expresa e informada el tratamiento de tus datos personales conforme a la Ley 1581 de 2012 y demás normas aplicables en Colombia.

<br><br>

<strong>Responsable del tratamiento de los datos</strong><br>
Los datos personales recolectados a través de este formulario serán tratados por <strong>Palmahía Records</strong>, quien actúa como responsable del tratamiento de la información.

<br><br>

<strong>1. Finalidad del tratamiento de datos</strong><br>
Tus datos personales serán recolectados, almacenados, usados y tratados con las siguientes finalidades:<br><br>

(i) Identificarte dentro de la plataforma o servicio;<br>
(ii) Gestionar tu registro;<br>
(iii) Contactarte por medios físicos, electrónicos o telefónicos;<br>
(iv) Enviarte información relacionada con el evento, novedades o comunicaciones operativas;<br>
(v) Brindar soporte y atención al usuario;<br>
(vi) Analizar y mejorar la calidad del servicio y la experiencia del usuario;<br>
(vii) Cumplir obligaciones legales o contractuales;<br>
(viii) Prevenir fraudes o accesos no autorizados.<br><br>

<strong>2. Uso y almacenamiento de la información</strong><br>
La información será almacenada en bases de datos seguras y podrá ser gestionada directamente por <strong>Palmahía Records</strong> o por terceros encargados del tratamiento bajo acuerdos de confidencialidad y seguridad.<br><br>

Nos comprometemos a implementar medidas técnicas, administrativas y organizativas razonables para proteger tus datos contra pérdida, acceso no autorizado o uso indebido.<br><br>

<strong>3. Derechos del titular de los datos</strong><br>
Como titular de los datos personales, tienes derecho a:<br><br>

Conocer, actualizar y rectificar tus datos;<br>
Solicitar prueba de la autorización otorgada;<br>
Ser informado sobre el uso de tus datos;<br>
Revocar la autorización o solicitar la eliminación de tus datos cuando sea procedente;<br>
Presentar consultas o reclamos;<br>
Acceder de forma gratuita a tus datos personales.<br><br>

<strong>4. Revocatoria de autorización</strong><br>
Puedes solicitar en cualquier momento la eliminación o modificación de tus datos, salvo obligación legal o contractual.<br><br>

<strong>5. Seguridad de la información</strong><br>
Adoptamos medidas de seguridad razonables para garantizar la integridad, confidencialidad y disponibilidad de la información, aunque ningún sistema en internet es 100% infalible.<br><br>

<strong>6. Terceros</strong><br>
Podremos compartir datos con terceros encargados del tratamiento (proveedores tecnológicos o herramientas de analítica), únicamente para cumplir las finalidades descritas y bajo acuerdos de confidencialidad.<br><br>

<strong>7. Contacto para ejercer derechos</strong><br>
Para consultas, solicitudes o ejercer tus derechos como titular de los datos puedes escribir a:<br>
<strong>estrategadigitalpr@palmahia.com</strong>.<br><br>

<strong>8. Aceptación</strong><br>
Al marcar la casilla de aceptación o continuar usando el servicio, manifiestas que has leído, entendido y aceptas el tratamiento de tus datos personales conforme a esta política.
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
    INSTAGRAM: "https://www.instagram.com/pasabordo/",   
    TIKTOK: "https://www.tiktok.com/@pasabordooficial",
    FACEBOOK: "https://www.facebook.com/PasabordoOficial",        
    YOUTUBE: "https://www.youtube.com/channel/UCouhUh5O-o5a1oPqadzMIBw",     
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
