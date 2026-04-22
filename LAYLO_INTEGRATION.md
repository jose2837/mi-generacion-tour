# Integración con Laylo

## Opción 1: Frontend directo (simple)
Activar `LAYLO.ENABLED = true` en `src/config.js`. El formulario enviará los datos a Laylo directamente desde el navegador al mismo tiempo que a Supabase.

## Opción 2: Supabase Edge Function (recomendado para producción)

Crea una Edge Function en Supabase que se dispare con un webhook `INSERT` en la tabla `registros_interes` y la sincronice con Laylo.

```typescript
// supabase/functions/sync-laylo/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

serve(async (req) => {
  const { record } = await req.json()
  
  const LAYLO_API_KEY = Deno.env.get("LAYLO_API_KEY")
  const LAYLO_DROP_ID = Deno.env.get("LAYLO_DROP_ID")
  
  const res = await fetch(
    `https://api.laylo.com/v1/drops/${LAYLO_DROP_ID}/fans`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LAYLO_API_KEY}`,
      },
      body: JSON.stringify({
        phone: record.telefono,
        name:  record.nombre,
        metadata: {
          ciudad:  record.ciudad,
          compro:  record.compro,
        },
      }),
    }
  )

  if (res.ok) {
    const layloData = await res.json()
    // Marcar como sincronizado en Supabase
    // (llamar a la función marcar_laylo_synced del schema)
  }

  return new Response(JSON.stringify({ ok: res.ok }))
})
```

## Variables de entorno necesarias en Supabase Edge Functions
- `LAYLO_API_KEY`
- `LAYLO_DROP_ID`
