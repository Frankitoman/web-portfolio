# API del asistente de soporte (Gemini)

Esta es una función serverless de **Vercel**: un servidor gratuito y mínimo que hace de intermediario entre el chat de la web y la API de Gemini, para que la clave nunca viaje al navegador del cliente.

```
Sitio en GitHub Pages  →  esta función en Vercel (guarda la clave)  →  API de Gemini
```

No hace falta instalar nada ni usar la terminal — todo se hace desde el dashboard de Vercel, logueándote con tu cuenta de GitHub.

## Pasos para desplegar

1. Andá a [vercel.com](https://vercel.com) y hacé clic en **"Continue with GitHub"** (usás tu cuenta de GitHub, no hace falta crear una contraseña nueva).

2. Una vez adentro, **"Add New..."** → **"Project"**.

3. Elegí importar el repositorio **`Frankitoman/web-portfolio`**.

4. En la pantalla de configuración ("Configure Project"):
   - **Root Directory**: hacé clic en "Edit" y elegí `chat-api`.
   - **Framework Preset**: dejalo en "Other".
   - Build Command / Output Directory: dejalos vacíos (no hace falta).

5. Abrí la sección **"Environment Variables"** y agregá:
   | Name | Value |
   |---|---|
   | `GEMINI_API_KEY` | tu clave de Gemini |

   (Opcional, para más adelante: `ALLOWED_ORIGIN` con el valor `https://frankitoman.github.io` — ver abajo.)

6. Hacé clic en **Deploy**. Al terminar (tarda menos de un minuto), Vercel te muestra un dominio como:
   ```
   https://web-portfolio-xxxx.vercel.app
   ```

7. El endpoint del chat es esa URL + `/api/chat`, por ejemplo:
   ```
   https://web-portfolio-xxxx.vercel.app/api/chat
   ```
   Copiá esa URL completa.

8. Abrí [`Panaderia/js/chat.js`](../Panaderia/js/chat.js) y reemplazá el valor de `CHAT_ENDPOINT` (arriba del todo del archivo) por esa URL. Guardá, subí el cambio a GitHub (`git add`, `commit`, `push`) — GitHub Pages se redeploya solo.

## Asegurar el endpoint con el dominio final

Mientras probás, dejar `ALLOWED_ORIGIN` sin configurar permite pedidos desde cualquier origen. Una vez que confirmes que todo funciona:

1. En Vercel, andá a tu proyecto → **Settings** → **Environment Variables**.
2. Agregá `ALLOWED_ORIGIN` con el valor `https://frankitoman.github.io` (sin barra al final).
3. Vercel va a pedir un "Redeploy" — aceptalo (botón que aparece arriba, o desde la pestaña "Deployments" → "..." → "Redeploy").

Así la función solo va a responder pedidos que vengan de tu sitio.

## Costo

Gratis. El plan gratuito de Vercel (Hobby) incluye ejecuciones de funciones serverless muy por encima de lo que necesita el chat de una panadería, sin pedir tarjeta. La API de Gemini también tiene su propio plan gratuito con un límite diario de pedidos — si en algún momento lo superan, Google devuelve un error temporal (el chat ya está preparado para mostrar un mensaje amigable en ese caso), no se cobra nada de forma automática.
