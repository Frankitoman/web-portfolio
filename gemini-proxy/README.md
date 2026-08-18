# Proxy del asistente de soporte (Gemini) — Cloudflare Worker

Un pequeño servidor gratuito que hace de intermediario entre el chat de la web y la API de Gemini, para que la clave nunca viaje al navegador del cliente.

```
Sitio (GitHub Pages / Cloudflare)  →  este Worker (guarda la clave)  →  API de Gemini
```

## Requisitos

- Cuenta gratis en [Cloudflare](https://dash.cloudflare.com/sign-up) (la misma que ya usás para el sitio).
- [Node.js](https://nodejs.org) — ya está instalado en esta máquina.

## Desplegar (sin login interactivo)

Como esta terminal no puede abrir un navegador para el login de `wrangler`, se usa un **token de API** en su lugar:

1. Andá a [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2. **Create Token** → plantilla **"Edit Cloudflare Workers"** → **Continue to summary** → **Create Token**
3. Copiá el token (se muestra una sola vez)
4. Pasáselo a Claude para que corra:
   ```bash
   CLOUDFLARE_API_TOKEN=<tu-token> npx wrangler secret put GEMINI_API_KEY
   CLOUDFLARE_API_TOKEN=<tu-token> npx wrangler deploy
   ```
   (desde la carpeta `gemini-proxy`)
5. Al terminar, `wrangler` muestra una URL como `https://anoranza-gemini-proxy.<subdominio>.workers.dev`. Copiala.
6. Reemplazá `CHAT_ENDPOINT` en [`Panaderia/js/chat.js`](../Panaderia/js/chat.js) por esa URL + `/` (la raíz, sin `/api/chat` — a diferencia de Vercel, acá el Worker entero es el endpoint).

## CORS (qué dominios pueden usar el proxy)

`wrangler.toml` ya tiene precargados los dos dominios donde vive el sitio hoy (GitHub Pages y Cloudflare). Si agregás un dominio propio más adelante, sumalo a la lista `ALLOWED_ORIGIN` (separado por coma, sin espacios) y volvé a desplegar.

## Costo

Gratis. El plan gratuito de Cloudflare Workers permite 100.000 pedidos por día. La API de Gemini también tiene su propio límite diario gratuito — si se supera, Google devuelve un error temporal (el chat ya muestra un mensaje amigable en ese caso), no se cobra nada automáticamente.
