# EMAX Energía — Landing de asesoramiento energético

Prueba técnica — Diseñadora Web / Frontend. Landing page a código para una empresa de asesoramiento energético orientada a captar clientes del mercado español.

## 🔗 Visualización

Abrir `index.html` en cualquier navegador (no requiere build ni dependencias).

```bash
# Opcional: servidor local
npx serve .
```

## 🛠️ Tecnología y organización del proyecto

- **HTML5 semántico** (`header`, `section`, `footer`, `nav`, `figure`) con meta tags de SEO y accesibilidad (ARIA, `label`s, `autocomplete`, `prefers-reduced-motion`).
- **CSS puro** con variables de diseño (design tokens) y metodología **BEM**. *Mobile-first* con breakpoints de tablet (640px) y escritorio (1024px).
- **JavaScript vanilla** (ES6, sin dependencias): menú móvil, scroll reveal con `IntersectionObserver`, sombra del header al hacer scroll y validación/envío simulado del formulario.
- Sin frameworks ni librerías externas = carga instantánea, fácil auditoría y cero dependencias. Estructura preparada para migrar a React/Next o Astro si se desea.

```
emax-energy-landing/
├── index.html        # Estructura y contenido (Todo el texto en español)
├── css/
│   └── styles.css    # Tokens + base + componentes + responsive
├── js/
│   └── main.js       # Interacciones, validación y reveal
├── img/              # Imágenes (placeholders actuales)
│   ├── hero.jpg
│   ├── solucion.png
│   ├── avatar-carmen.jpg
│   ├── avatar-javier.jpg
│   ├── avatar-laura.jpg
│   └── asesor.jpg
└── README.md
```

## 🖼️ Imágenes — prompts para generarlas con otra IA

La maquetación incluye **6 imágenes** en los puntos clave (hero, solución, testimonios y formulario). Hoy hay placeholders de marca con el mismo nombre y tamaño. Genera cada imagen, guárdala con su formato a **JPG/WebP en `img/` con el mismo nombre** y listo (misma proporción que el placeholder).

| Archivo | Tamaño / proporción | Uso |
|---|---|---|
| `img/hero.jpg` | 1408×768 · 16:9 | Banner horizontal full-width del hero |
| `img/solucion.png` | 1024×1536 · 2:3 | Sección solución (columna derecha) |
| `img/avatar-carmen.jpg` | 400×400 · 1:1 | Testimonio 1 |
| `img/avatar-javier.jpg` | 400×400 · 1:1 | Testimonio 2 |
| `img/avatar-laura.jpg` | 400×400 · 1:1 | Testimonio 3 |
| `img/asesor.jpg` | 400×400 · 1:1 | Formulario |

**Prompt 1 — `hero.jpg`** (vivienda eficiente, atardecer cálido):
> Photorealistic exterior of a modern two-story Spanish house at golden hour, large rooftop solar panels, warm lights glowing inside the windows, small hedge and garden, clear sky with soft warm sunset tones, professional real estate photography, high detail, no text, no people, no watermark, wide 4:3 composition.

**Prompt 2 — `solucion.png`** (asesor y clienta en el salón, formato vertical):
> Photorealistic warm portrait-oriented (2:3) scene of a friendly energy consultant in smart casual clothes sitting on a sofa in a bright Spanish living room, showing a printed electricity bill and a tablet to a smiling middle-aged woman client, coffee cups on the table, natural window light, authentic and trustworthy atmosphere, editorial photography, no text, no logos, vertical 2:3 composition.

**Prompt 3 — `avatar-carmen.jpg`** (testimonio 1):
> Photorealistic headshot portrait of a cheerful Spanish woman around 45 years old, short dark hair, subtle genuine smile, soft neutral warm background, natural even lighting, professional profile photo, squared crop, close-up, no text.

**Prompt 4 — `avatar-javier.jpg`** (testimonio 2):
> Photorealistic headshot portrait of a Spanish man around 38 years old with short beard, wearing a casual checked shirt, friendly confident smile, soft neutral warm background, natural lighting, professional profile photo, squared crop, close-up, no text.

**Prompt 5 — `avatar-laura.jpg`** (testimonio 3):
> Photorealistic headshot portrait of a Spanish woman around 32 years old with shoulder-length brown hair, bright natural smile, soft neutral warm background, natural lighting, professional profile photo, squared crop, close-up, no text.

**Prompt 6 — `asesor.jpg`** (formulario, personaje recurrente):
> Photorealistic headshot of a trustworthy Spanish male energy advisor around 40 years old, short neat hair with slight grey, light blue shirt, calm confident smile, soft office background with subtle green tones (brand color: teal), professional portrait, squared crop, no text.

> Consejo de coherencia visual: pide a la IA "same seed" / "consistent character" o usa un estilo común en todos los retratos (misma luz, fondo neutro cálido) para que parezcan del mismo set de testimonios.

## 🧩 Estructura de la landing

1. **Hero** — titular de dolor + beneficio con riesgo revertido ("Gratis"), doble CTA, prueba social (4.9/5, +15.000 hogares) y visual propio de ahorro.
2. **Problema** — 3 dolores reales del mercado español + urgencia real (revisión trimestral de tarifas).
3. **Solución** — revisión energética gratuita, qué analizamos y estadísticas de impacto.
4. **Comparativa** — "hoy vs. con EMAX": tabla de contraste que hace tangible la pérdida de no actuar.
5. **Beneficios** — 6 beneficios orientados a resultado, con microcopy de garantía ("por escrito, en tu propia factura").
6. **Cómo funciona** — los 3 pasos exigidos + **garantía EMAX** (reversión de riesgo: si no hay ahorro, nada que pagar).
7. **Prueba social** — valoración media 4.9/5 con estrellas + 3 testimonios con impacto en euros.
8. **Formulario** — urgencia temporal, lista de tranquilizadores, microcopy de riesgo revertido bajo el botón, consentimiento RGPD y estado de éxito.
9. **Footer** — marca, navegación simulada, contacto e información legal simulada.

## 🎨 Decisiones de diseño

- **Color**: verde petrol/teal (confianza, energía, sostenibilidad) + ámbar como acento cálido para la "energía/ahorro". Jerarquía clara para lo interactivo.
- **Tipografía**: Inter, alta legibilidad, weights del 400 al 800 para jerarquizar.
- **Conversión**: CTA primario siempre visible (header sticky + hero + final de "cómo funciona" + formulario), microcopy que elimina riesgos percibidos ("sin compromiso", "gratis", "sin permanencia"), **reversión de riesgo** (garantía EMAX), **prueba social** con rating y testimonios con cifras, y **urgencia honesta** basada en la revisión trimestral de tarifas.
- **Visual del hero**: gráfico de ahorro construido en HTML/CSS (factura actual vs. con EMAX), sin stock: comunica el beneficio en 2 segundos y es responsive.
- **Imágenes con propósito**: 6 imágenes en los puntos de máxima confianza y comprensión (hero, solución, avatares de testimonios y asesor del formulario), con `alt` descriptivo, `loading="lazy"`, ratio y `object-fit` fijos para una maquetación estable y coherente.
- **Responsive**: mobile-first, menú hamburguesa en móvil, rejillas que se colapsan limpiamente a una columna.

## 🤖 Uso de IA

La IA se utilizó como **apoyo** en la generación de textos persuasivos, estructura de secciones y boilerplate de código, pero todo el resultado fue adaptado, corregido y ordenado a mano:

- Textos revisados para cumplir la solicitación litera y el tono del mercado español.
- Código depurado (etiquetado balanceado, accesibilidad, validación del formulario).
- Elecciones de diseño (paleta, tipografía, layout, mensajes) tomadas con criterio propio y justificadas arriba.

## ✅ Verificaciones

- HTML con etiquetado balanceado y semántico.
- A11y: foco visible, roles/labels, `prefers-reduced-motion`, navegación por teclado.
- Responsive comprobado en móvil, tablet y escritorio.