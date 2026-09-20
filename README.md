# Parriyeyo

Sitio estático de catering para eventos. HTML, CSS y JavaScript, sin compilación. GSAP y ScrollTrigger se sirven localmente desde `assets/vendor/`.

## Vista local

Ejecutar `python -m http.server 4173` y abrir http://localhost:4173.

## Experiencia visual

- Portada con montaje de 15,5 segundos de videos reales de @parriyeyo, sin audio automático.
- Carrusel de seis preparaciones con ampliación de fotografías y navegación por teclado.
- Videos de cocina, experiencia y Yeyo con controles nativos.
- Recorrido de tres escenas ligado al scroll en escritorio; lectura completa sin fijación en móvil y con movimiento reducido.
- Paralaje moderado, transiciones, acordeones y consulta que prepara un mensaje para Instagram.
- Fotografía y video propios. Ninguna imagen generada se usa en la página actual.

## Contenido y fuentes

`contenido.js` permite añadir aliados y PDF de condiciones una vez confirmados. Los manifiestos `assets/editorial/fuentes.json` y `assets/video/fuentes.json` registran las publicaciones y momentos de origen.

Los PSD editables, originales de Instagram, 1.716 fotogramas a intervalos de 0,5 segundos, hojas de contacto y respaldos se conservan localmente en `analisis/renovacion/` e `instagram/`; no se publican.

El formulario no envía ni reserva: prepara un mensaje para copiar y enviar por Instagram. No hay precios, cobertura, mínimos de invitados ni testimonios inventados.

## Publicación y reversión

Repositorio: https://github.com/pabloignaciofigueroa/parriyeyo
Sitio: https://parriyeyo.vercel.app/
Versión anterior: `39de38b6c6848521072b7231deb5072d81fc3dcc`. Respaldo local: `analisis/renovacion/antes/sitio-original.zip`.

No incluir carpetas locales de Gómez y Gómez al publicar este proyecto.
