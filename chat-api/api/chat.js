/**
 * Función serverless de Vercel: proxy seguro para el asistente de soporte
 * de Añoranza. Guarda la clave de Gemini como variable de entorno (nunca
 * llega al navegador) y agrega el contexto del negocio antes de reenviar
 * la pregunta del cliente.
 */

const GEMINI_MODEL = "gemini-3.5-flash-lite";

const SYSTEM_PROMPT = `Sos el asistente virtual de Añoranza, una panadería y pastelería artesanal argentina en Copenhague, Dinamarca. Ayudás a los clientes con dudas sobre productos, pedidos y horarios, con calidez y cercanía (tratá al cliente de "vos", como se habla en Argentina).

Información del negocio:
- Productos: Alfajores (clásicos de dulce de leche, bañados en chocolate o con coco), Medialunas de manteca, Facturas surtidas (vigilantes, cañoncitos, sacramentos, entre otras), Tortas por encargo (de manzana o chocolate estilo argentino, para cumpleaños y eventos).
- Los pedidos se pueden encargar con anticipación (por este chat, email o teléfono) y retirar en el local.
- Horario de atención: martes a domingo, de 8:00 a 18:00. Cerrado los lunes.
- Contacto: hola@anoranza.dk
- Ubicación: Copenhague, Dinamarca (la dirección exacta se confirma por email o teléfono).

Reglas importantes:
- No inventes precios exactos, direcciones, plazos de entrega ni promesas que no estén confirmadas arriba (por ejemplo, no asegures que hacemos envíos a domicilio si no se aclaró). Si no sabés algo con certeza, decilo con honestidad y sugerí escribir a hola@anoranza.dk o completar el formulario de contacto de la web para confirmar los detalles.
- Respuestas cortas y cálidas (2 a 4 oraciones). Texto plano puro: nunca uses asteriscos, guiones, numeración ni ningún otro formato markdown.
- Si preguntan algo totalmente ajeno a la panadería, respondé con simpatía y redirigí la conversación hacia cómo podés ayudar con pedidos o productos.`;

module.exports = async function handler(req, res) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }
  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({ error: "El asistente no está configurado todavía." });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const message = (body.message || "").toString().trim();
  if (!message) { res.status(400).json({ error: "Falta el mensaje" }); return; }
  if (message.length > 800) { res.status(400).json({ error: "Mensaje demasiado largo" }); return; }

  const rawHistory = Array.isArray(body.history) ? body.history : [];
  const history = rawHistory
    .filter((h) => h && (h.role === "user" || h.role === "model") && typeof h.text === "string")
    .slice(-12)
    .map((h) => ({ role: h.role, parts: [{ text: h.text.slice(0, 800) }] }));

  const contents = [...history, { role: "user", parts: [{ text: message }] }];

  const payload = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: { temperature: 0.4, maxOutputTokens: 300 },
  };

  let geminiRes;
  try {
    geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
  } catch (err) {
    res.status(502).json({ error: "No pudimos conectar con el asistente. Probá de nuevo en un momento." });
    return;
  }

  if (!geminiRes.ok) {
    const errText = await geminiRes.text();
    console.log("Gemini error", geminiRes.status, errText);
    res.status(502).json({ error: "No pudimos responder ahora, intentá de nuevo en un momento." });
    return;
  }

  const data = await geminiRes.json();
  const reply =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") ||
    "Perdón, no pude generar una respuesta. ¿Podés reformular tu pregunta?";

  res.status(200).json({ reply });
};
