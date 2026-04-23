export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { nombre, telefono, ciudad, compro, razones, otro_detalle } = req.body;

    // Validación básica (lado servidor)
    if (!nombre || !telefono) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    // Anti-spam simple (rápido para hoy)
    if (telefono.length < 7) {
      return res.status(400).json({ error: "Teléfono inválido" });
    }

    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/registros_interes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          nombre,
          telefono,
          ciudad,
          compro,
          razones,
          otro_detalle,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: err });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}