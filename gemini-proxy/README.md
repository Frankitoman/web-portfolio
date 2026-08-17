# Proxy del asistente de soporte (Gemini)

Este es un **Cloudflare Worker**: un pequeño servidor gratuito que hace de intermediario entre el chat de la web y la API de Gemini. Existe para que la clave de Gemini nunca viaje al navegador del cliente (si estuviera en el JavaScript de la web, cualquiera podría verla con "Inspeccionar elemento" y usarla por su cuenta).

```
Navegador del cliente  →  este Worker (guarda la clave)  →  API de Gemini
```

## Requisitos

- Cuenta gratis en [Cloudflare](https://dash.cloudflare.com/sign-up) (no pide tarjeta para este uso).
- [Node.js](https://nodejs.org) instalado (para correr `wrangler`, la herramienta de despliegue de Cloudflare).

## Pasos para desplegar

1. Abrí una terminal **dentro de esta carpeta** (`gemini-proxy`).

2. Iniciá sesión con Cloudflare (se abre el navegador):
   ```bash
   npx wrangler login
   ```

3. Cargá tu clave de Gemini como **secret** (no queda guardada en ningún archivo, solo en Cloudflare):
   ```bash
   npx wrangler secret put GEMINI_API_KEY
   ```
   Cuando lo pida, pegá la clave y presioná Enter.

4. Desplegá el Worker:
   ```bash
   npx wrangler deploy
   ```
   Al terminar, la terminal muestra una URL como:
   ```
   https://anoranza-gemini-proxy.<tu-subdominio>.workers.dev
   ```
   Copiá esa URL.

5. Abrí [`Panaderia/js/chat.js`](../Panaderia/js/chat.js) y reemplazá el valor de `CHAT_ENDPOINT` (arriba del todo del archivo) por la URL que te dio el paso anterior. Después hacé `git add`, `commit` y `push` — el sitio se publica solo vía GitHub Actions (ver `.github/workflows/deploy-pages.yml`) en **GitHub Pages**, en `https://frankitoman.github.io/web-portfolio/`.

## Asegurar el proxy con el dominio final

Mientras prueban, `wrangler.toml` permite pedidos desde cualquier origen (`ALLOWED_ORIGIN = "*"`). **Una vez que el sitio esté publicado en GitHub Pages**:

1. Editá `wrangler.toml` y cambiá `ALLOWED_ORIGIN` a `https://frankitoman.github.io` (sin barra al final, sin el `/web-portfolio` — el origen es solo protocolo + dominio).
2. Volvé a correr `npx wrangler deploy`.

Así el Worker solo va a responder pedidos que vengan de su propia web, no de cualquier otro sitio que intente usar el endpoint.

## Costo

Gratis. El plan gratuito de Cloudflare Workers permite 100.000 pedidos por día, muy por encima de lo que necesita el chat de una panadería. La API de Gemini (`gemini-3.5-flash-lite`) también tiene un plan gratuito con un límite diario de pedidos — más que suficiente para tráfico normal. Si en algún momento lo superan, Google simplemente devuelve un error temporal (el chat ya está preparado para mostrar un mensaje amigable en ese caso), no se cobra nada de forma automática.
