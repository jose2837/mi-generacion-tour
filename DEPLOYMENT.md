# 🚀 GUÍA DE DESPLIEGUE A PRODUCCIÓN
## Mi Generación Tour — Checklist completo

---

## ESTRUCTURA FINAL DEL PROYECTO

```
mi-generacion-tour/
├── index.html          ← HTML principal (modal hero incluido)
├── config.js           ← ⚡ CONFIGURACIÓN (Supabase, Laylo, Evento)
├── main.js             ← JavaScript producción (formularios + validaciones)
├── style.css           ← Estilos (incluye modal hero)
├── vercel.json         ← Configuración Vercel
├── supabase-schema.sql ← Esquema BD (ejecutar una sola vez)
├── images/             ← Imágenes .webp del sitio
│   ├── teatro-bg.webp
│   ├── slide1.webp ... slide4.webp
│   ├── reveal-base.webp
│   ├── split-left.webp / split-right.webp
│   ├── quote-bg.webp
│   └── LOGO PASABORDO.png
├── MANUAL.md
├── LAYLO_INTEGRATION.md
└── DEPLOYMENT.md       ← Este archivo
```

---

## PASO 1 — CONFIGURAR SUPABASE

### 1.1 Crear proyecto
1. Ir a https://supabase.com → New Project
2. Región recomendada para Colombia: **South America (São Paulo) `sa-east-1`**
3. Guardar la contraseña de la BD

### 1.2 Ejecutar el schema
1. Dashboard → SQL Editor → New query
2. Pegar el contenido de `supabase-schema.sql` y ejecutar
3. Verificar: Table Editor debe mostrar la tabla `registros_interes`

### 1.3 Obtener credenciales
- Dashboard → Settings → API
- Copiar **Project URL** (ej: `https://abcdefgh.supabase.co`)
- Copiar **anon public key** (empieza con `eyJ...`)

### 1.4 Ingresar credenciales en config.js
```js
SUPABASE: {
  URL:      "https://XXXXXXXX.supabase.co",   // ← Tu URL
  ANON_KEY: "eyJhbGciOiJ...",                  // ← Tu anon key
  TABLE:    "registros_interes",
},
```

### 1.5 Verificar RLS
En Supabase → Authentication → Policies, confirmar que existan:
- `allow_insert_anon` → INSERT para `anon` ✓
- `allow_select_authenticated` → SELECT para `authenticated` ✓

---

## PASO 2 — CONFIGURAR URL DE VENTA DE BOLETAS

En `config.js`, actualizar:
```js
EVENT: {
  TICKETS_URL: "https://latiquetera.com/",  // ← URL real de venta
  ...
}
```

Esta URL es a donde redirige el modal hero después de un registro exitoso.

---

## PASO 3 — PROBAR EN LOCALHOST

```bash
# Desde la carpeta raíz del proyecto:
python3 -m http.server 3000

# O con Node.js:
npx serve . -p 3000
```

Abrir: **http://localhost:3000**

### Pruebas de formulario en desarrollo

Cuando Supabase **no está configurado** (credenciales placeholder):
- El modal hero: muestra error controlado en el `rfcard-feedback`
- El formulario de interés: muestra `"✓ Recibido (modo desarrollo)"`
- No hay redirección ni datos guardados

Cuando Supabase **está configurado**:
- Modal hero: guarda en BD y redirige a la URL de boletas
- Formulario interés: guarda en BD y muestra mensaje de éxito

---

## PASO 4 — QA COMPLETO — CHECKLIST

### 4.1 Modal Hero (popup automático)
- [ ] Aparece exactamente a los 5 segundos de cargar la página
- [ ] Ocupa ~70% del viewport en desktop
- [ ] En mobile aparece como sheet desde abajo (100% ancho)
- [ ] El botón **X** cierra el modal correctamente
- [ ] Hacer clic **fuera** del modal NO lo cierra
- [ ] Presionar **ESC** NO cierra el modal
- [ ] Todos los campos son obligatorios

### 4.2 Validaciones del modal hero
- [ ] Nombre vacío → muestra error "Ingresa tu nombre"
- [ ] Nombre con números (ej: `Juan123`) → muestra "Solo letras, sin números"
- [ ] Teléfono vacío → muestra error
- [ ] Teléfono con letras (ej: `abc`) → muestra error de formato
- [ ] Sin ciudad seleccionada → muestra error (por defecto Medellín está marcada)
- [ ] Sin checkbox de consentimiento → muestra error
- [ ] Formulario válido con Supabase configurado → guarda y redirige

### 4.3 Formulario de interés (sección inferior)
- [ ] Nombre vacío → error visible
- [ ] Nombre con números → error "solo letras"
- [ ] Teléfono inválido → error de formato
- [ ] Ciudad no en lista → error con lista de ciudades válidas
- [ ] Ciudad válida (ej: "Medellín", "Cali", "Ecuador") → acepta
- [ ] Ciudad con acento vs sin acento → ambas aceptadas (ej: "Medellín" y "Medellin")
- [ ] Sin radio "¿ya compraste?" → error
- [ ] Sin consentimiento → error
- [ ] Si marca "No" → aparece sección de razones
- [ ] Si marca "Otro" en razones → aparece campo de texto
- [ ] Envío exitoso → mensaje de confirmación visible, formulario se resetea

### 4.4 Canvas Reveal
- [ ] Desktop: el mouse revela la imagen al pasar sobre la sección
- [ ] Mobile: al llegar a la sección, la imagen se revela automáticamente

### 4.5 Carrusel Hero
- [ ] Las imágenes se desplazan en loop infinito
- [ ] En mobile la velocidad es 18s, en desktop 26s
- [ ] No hay salto visual al reiniciar el loop

### 4.6 Seguridad básica
- [ ] Inputs con `<script>alert()</script>` → no ejecutan código, se sanitizan
- [ ] Inputs con `'; DROP TABLE` → se limpian antes de enviar
- [ ] Campos muy largos (+200 chars) → se truncan automáticamente

### 4.7 Accesibilidad
- [ ] Tab navigation funciona correctamente en el modal
- [ ] Botón X del modal es enfocable con teclado
- [ ] Mensajes de error tienen `role="alert"` y `aria-live="polite"`
- [ ] El modal tiene `role="dialog"` y `aria-labelledby`

---

## PASO 5 — DESPLEGAR EN VERCEL

### 5.1 Subir código a GitHub
```bash
git init
git add .
git commit -m "Mi Generación Tour — producción lista"
git remote add origin https://github.com/TUUSUARIO/mi-generacion-tour.git
git push -u origin main
```

### 5.2 Conectar Vercel
1. Ir a https://vercel.com/new
2. Importar el repositorio de GitHub
3. Framework Preset: **Other** (HTML estático)
4. Root Directory: dejar vacío (o `.` si pide)
5. Click **Deploy**

### 5.3 Verificar vercel.json
El `vercel.json` actual ya está configurado correctamente para servir archivos estáticos y aplicar cache a imágenes.

### 5.4 Dominio personalizado
1. Vercel Dashboard → tu proyecto → Settings → Domains
2. Agregar tu dominio (ej: `migeneraciontour.com`)
3. Configurar DNS en tu proveedor:
   - **A record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com` (para subdominios como `www`)
4. Esperar 5–30 minutos para propagación

---

## PASO 6 — VERIFICACIÓN FINAL EN PRODUCCIÓN

Después del despliegue, probar con el dominio real:

- [ ] El sitio carga en menos de 3 segundos (red normal)
- [ ] El modal aparece a los 5 segundos
- [ ] Llenar y enviar el modal hero con datos reales → verificar en Supabase Table Editor
- [ ] Llenar y enviar formulario de interés → verificar en Supabase
- [ ] HTTPS activo (candado en el navegador)
- [ ] Las imágenes .webp cargan correctamente
- [ ] El sitio es funcional en mobile (iOS Safari + Android Chrome)

---

## VARIABLES A ACTUALIZAR ANTES DE PRODUCCIÓN

Archivo `config.js`:
```js
SUPABASE: {
  URL:      "⚡ URL REAL DE SUPABASE",
  ANON_KEY: "⚡ ANON KEY REAL",
},
LAYLO: {
  ENABLED: false,         // ← true cuando tengas credenciales
  API_KEY: "",
  DROP_ID: "",
},
EVENT: {
  TICKETS_URL: "⚡ URL REAL DE VENTA DE BOLETAS",
},
SOCIAL: {
  INSTAGRAM: "⚡ URL REAL",
  TIKTOK:    "⚡ URL REAL",
  YOUTUBE:   "⚡ URL REAL",
},
PRIVACY_POLICY: `⚡ TEXTO LEGAL REVISADO POR ABOGADO`,
```

---

## NOTAS DE SEGURIDAD

- La **anon key** de Supabase es segura para uso público en el frontend. Está diseñada para esto.
- La seguridad real es gestionada por las **RLS policies** en Supabase (ya configuradas en el schema).
- Solo se permite INSERT anónimo. SELECT/UPDATE/DELETE requieren autenticación.
- Los campos del formulario son sanitizados en el frontend antes de enviar a Supabase.
- Los payloads enviados a Supabase solo incluyen los campos del schema (no se filtran campos extra).

---

## SOLUCIÓN DE PROBLEMAS

| Problema | Solución |
|---|---|
| Modal no aparece | Verificar que `id="heroModalOverlay"` y `id="heroModalCard"` existen en el HTML |
| Supabase devuelve 401 | Verificar que `ANON_KEY` en config.js es correcto |
| Supabase devuelve 404 | Verificar que la tabla `registros_interes` existe |
| Supabase devuelve 422 | El payload tiene campos no permitidos o viola constraints |
| No redirige tras submit | Verificar `EVENT.TICKETS_URL` en config.js |
| Formulario no valida ciudad | Verificar que la ciudad está en `CIUDADES_VALIDAS` en main.js |
| Imágenes no cargan en Vercel | Verificar que están en la carpeta `images/` en la raíz |

---

*Guía generada para Mi Generación Tour — Pasabordo 2026*
