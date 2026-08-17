# Imágenes

Todas las imágenes del sitio fueron generadas con la API de imágenes de OpenAI (`gpt-image-1`) como placeholders visuales de alta calidad, mientras no haya fotos reales del local/productos.

Viven en `assets/images/`:

| Archivo | Uso | Notas |
|---|---|---|
| `hero.jpg` | Foto principal del hero | Bandeja de alfajores/facturas |
| `historia.jpg` | Sección "Nuestra historia" | Manos amasando / obrador |
| `product-alfajores.jpg` | Tarjeta de producto | |
| `product-medialunas.jpg` | Tarjeta de producto | |
| `product-facturas.jpg` | Tarjeta de producto | |
| `product-tortas.jpg` | Tarjeta de producto | |
| `avatar-1.jpg` … `avatar-4.jpg` | Avatares de testimonios | Ilustraciones estilizadas (no fotos reales, ya que los testimonios son inventados) |
| `gallery-1.jpg` … `gallery-6.jpg` | Sección "Seguinos el rastro de manteca" | Estilo Instagram |

Todas comprimidas a JPEG (~1.7MB en total para las 16, antes 25MB) para que el sitio cargue rápido.

## Reemplazar por fotos reales

Cuando tengan fotos reales del local, productos o clientes (con permiso), simplemente sobrescriban el archivo correspondiente en `assets/images/` con el mismo nombre — no hace falta tocar el HTML. Recomendado: `.jpg`/`.webp` comprimidas, mismo aspect ratio que el original para que no se recorten mal con `object-fit: cover`.
