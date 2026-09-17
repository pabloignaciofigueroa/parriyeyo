# Continuar la web de Parriyeyo

## Estado
Última actualización: 17-09-2026. El brief ahora define catering integral, no contratación de un parrillero individual. Landing reorganizada: experiencia → tipos de eventos → inclusiones → cocina real → cantidad de invitados → proceso → Diego y equipo → consulta de cobertura → cotización. `PAUTA_DIEGO.md` recoge datos pendientes. Macul, RM, Viña y Rancagua se presentan como ubicaciones a consultar, sin prometer cobertura.

`contenido.js` permite destacar una preparación real, incorporar auspiciadores aprobados y habilitar el PDF. Marcas y PDF permanecen ocultos por falta de confirmación. Los selectores 10/20/30/40/40+ inician la consulta, no constituyen paquetes con menús ni tarifas. Ceviches incorporados como especialidad mencionada por el usuario, sin ingredientes ni foto inventados. Ver `CONDICIONES_PDF_PENDIENTES.md`.

Dos fotos retocadas mediante image_gen, con originales intactos, están en `assets/retocadas/`. Allí se documentan procedencia y prompts. La versión «GPT Images 2.5» no estaba seleccionable en la herramienta. La aprobación final de fotografías y oferta corresponde al dueño.

Actualización visual: menos texto, secciones con más aire, portada dominante y ocho platos con nombres y bajadas. Dos platos destacados, seis secundarios, galería ampliable y movimiento suave al entrar en pantalla. Se quitaron la franja de eslóganes y la sección redundante de experiencia; el recorrido ahora es portada → platos → parrillero → cotización. Captura general: `analisis/web-v2-desktop.jpg`. Verificación de anchos 768, 390 y 320 px sin desbordamiento.

Web implementada en HTML, CSS y JavaScript, con diseño adaptable inspirado en el formato aprobado de Fire Chile. Archivos: `index.html`, `styles.css`, `script.js` y `assets/`. No requiere npm ni compilación. No se ha publicado en Internet.

## Abrir
Abrir `index.html` en Chrome. Para vista local con servidor, ejecutar desde esta carpeta:

```powershell
python -m http.server 8770 --bind 127.0.0.1
```

Visitar http://127.0.0.1:8770. Las imágenes y fuentes están incluidas localmente. El vídeo se carga al abrir el reproductor.

## Funcionalidad
- Menú adaptable y enlaces a las secciones.
- Galería ampliable con flechas, teclado y cierre con Escape.
- Vídeo real de Parriyeyo en una ventana modal.
- Formulario con validación de nombre, invitados, lugar, ocasión y fecha opcional.
- Generación de mensaje editable, copia y enlace al perfil de Instagram. El usuario debe pegar y enviar el mensaje por DM. No hay backend ni envío automático.
- Preguntas desplegables, foco de teclado y respeto por movimiento reducido.

## Contenido y límites
Las fotografías son fotogramas propios del respaldo de Instagram, optimizados a WebP. La correspondencia está en `assets/procedencia.json`. Vídeo fuente: C5Jlb9LxSw8. No reutilizamos fotografías ni código de Fire Chile. Las fuentes Barlow/Barlow Condensed están incluidas junto a su licencia OFL.

No inventar precios, cobertura, testimonios, disponibilidad, paquetes ni cantidades mínimas. No hay WhatsApp confirmado; el teléfono hallado en un reel histórico está documentado en el respaldo. Los textos comerciales en primera persona son una propuesta editorial para revisión del dueño.

## Comprobaciones
Chrome: escritorio 1440 px y anchos 768, 390 y 320 px sin desbordamiento horizontal. Imágenes cargadas. Galería, navegación móvil, preparación y copia del mensaje comprobadas. El vídeo reprodujo sus 29,39 segundos y llegó al final sin error. JavaScript validado con `node --check script.js`. Capturas en `analisis/web-desktop.jpg` y `analisis/web-mobile.jpg`.

## Próximos pasos
Revisar textos con el dueño, confirmar contacto y condiciones reales del servicio; después conectar el canal definitivo de cotización y publicar en el dominio elegido. Para cambios visuales, mantener el protagonismo de las imágenes propias y el negro/naranja de la marca.

## Respaldo previo
Consultar `CONTINUAR_INSTAGRAM.md` y `instagram/LEEME.md` para inventario, base SQLite/JSON, vídeos completos y selección visual. No sobrescribir ese archivo documental con cambios de la web.

## Entrega catálogo y marca — 17 septiembre 2026
- 12 imágenes de la selección web analizadas y regeneradas (2 de la revisión anterior y 10 nuevas). No está procesado todo el archivo de Instagram.
- Assets nuevos: assets/catalogo; revisión y límites: assets/catalogo/ANALISIS.md; comparación: analisis/catalogo-comparacion.html.
- Photoshop controlado con Computer Use: logo aislado con máscara y exportado PNG transparente. SVG vectorizado después por contornos, en assets/marca/parriyeyo-logo.svg, usado en cabecera y pie.
- Más aire, marcos naranjos de 3 px, base interior denim y secciones denim #1c3045. Fotografías completas 4:5; galería móvil en una columna.
- QA: sin desbordes a 320/390/768/1440 px; imágenes cargan, galería/menu/formulario funcionan y no hay errores JS. Evidencia analisis/catering-qa.json y catalogo-hero.png/catalogo-platos.png.
- Diego debe validar fidelidad de recetas y retratos generados. No inventar precios, coberturas ni condiciones. Usar motor disponible sin afirmar GPT Images 2.5.

## Revisión V3 — marca y hero de experiencia
- Hero anterior de plato contenido reemplazado por fondo fotográfico de patio generado. Primera propuesta lujosa rechazada por Pablo: NO usar exec-9f338dd3. Versión actual hero-patio.webp; detalles y prompt normalizado en assets/catalogo/HERO_V3.md. Es ilustrativa, no un evento real documentado.
- Foto REAL de Yeyo con gesto: assets/chef-gesto-original.png / chef-gesto.webp. No regenerar su rostro. Reemplaza retrato anterior.
- Photoshop mediante Computer Use: nombre, símbolo y bajada copiados a capas separadas sobre original intacto. Archivo assets/marca/parriyeyo-componentes.psd. Layer 2 nombre, Layer 3 parrilla, Layer 4 bajada, Layer 1 original con máscara.
- Componentes SVG separados y composiciones mediante código sobre trazados originales: logotipo.svg, isotipo.svg, bajada.svg, marco.svg, imagotipo-horizontal.svg, logotipo-enmarcado.svg. Marco separado vectorialmente, no afirmar que todo se exportó de Photoshop.
- Navbar horizontal sin marco/bajada; firma completa reservada a footer y formatos grandes. Guía assets/marca/guia.html.
- Más espacio, jerarquía, mayúsculas en navegación/títulos/platos; franjas naranjas anchas detrás de comida. QA a 320/390/768/1440 sin desbordes ni errores de la landing, imágenes y cotización bien.
