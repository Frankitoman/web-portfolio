import { createMimeMessage, Mailbox } from "mimetext";
import { EmailMessage } from "cloudflare:email";

const FROM_ADDR = "contact@tierra.dk";
const TO_ADDR = "francojmansilla@gmail.com";

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function handleContact(request, env) {
  let data;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request." }, 400);
  }

  // honeypot: bots fill every field, real visitors never see/fill this one
  if (data.company) {
    return jsonResponse({ ok: true }, 200);
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();

  if (!name || !email || !message) {
    return jsonResponse({ ok: false, error: "Missing required fields." }, 400);
  }

  const msg = createMimeMessage();
  msg.setSender({ name: "Tierra — Sitio web", addr: FROM_ADDR });
  msg.setRecipient(TO_ADDR);
  msg.setSubject(`Nuevo mensaje desde Tierra — ${name}`);
  msg.setHeader("Reply-To", new Mailbox({ addr: email }));
  msg.addMessage({
    contentType: "text/plain",
    data: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
  });

  try {
    const email_message = new EmailMessage(FROM_ADDR, TO_ADDR, msg.asRaw());
    await env.CONTACT_EMAIL.send(email_message);
  } catch (err) {
    return jsonResponse({ ok: false, error: "Could not send message." }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/api/contact") {
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
