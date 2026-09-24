# EMAX Energía — Landing de asesoramiento energético

Prueba técnica — Diseñadora Web / Frontend. Landing page a código para una empresa de asesoramiento energético orientada a captar clientes del mercado español (ahorro en factura de **luz y gas**, consulta gratuita).

## 🔗 Visualización

Publica el repositorio con un solo click:

- **Netlify**: arrastra la carpeta a https://app.netlify.com/drop (o `netlify deploy`) — no requiere build.
- **Vercel**: importa el repo en https://vercel.com/new (framework: *Other*), sin comandos de build.
- **Local**: abre `index.html` en cualquier navegador.

```bash
# Opcional: servidor local
npx serve .
```

## 🛠️ Tecnología y organización del proyecto

- **HTML5 semántico** (`header`, `section`, `footer`, `nav`, `figure`, `details/summary`) con meta tags de SEO y accesibilidad (ARIA, `label`s, `autocomplete`, `prefers-reduced-motion`).
- **CSS puro** con design tokens (variables) y metodología **BEM**. *Mobile-first* con breakpoints de móvil, tablet (640px) y escritorio (1024px).
- **JavaScript vanilla** (ES6, sin frameworks): menú móvil, scroll reveal con `IntersectionObserver`, modo presentación (scroll deck + Lenis), carrusel de reseñas, sombra del header y formulario con validación + envío vía `mailto`.
- Dependencias externas mínimas: **Google Fonts** (Inter + Manrope) y **Lenis** (scroll suave) por CDN. Sin builders ni bundlers.

```
emax-energy-landing/
├── index.html        # Estructura y contenido (todo el texto en español)
├── css/
│   └── styles.css    # Tokens + base + componentes + responsive
├── js/
│   └── main.js       # Interacciones: reveal, deck, carrusel, formulario
├── img/              # Imágenes optimizadas (JPG/PNG, listas para producción)
│   ├── hero.png      # Hero (758×758, PNG con fondo transparente)
│   ├── tiempo.png    # Solución (1254×1254, se conserva PNG por su transparencia)
│   ├── avatar-carmen.jpg
│   ├── avatar-javier.jpg
│   └── avatar-laura.jpg
└── README.md
```

## 🧩 Estructura de la landing

1. **Hero** — titular de dolor + beneficio con riesgo revertido ("gratis"), cifra de ahorro medio (**+250 €/año**), doble CTA, banda de resultados (1.200+ hogares / 20+ comercializadoras / ≤24 h) y visual propio.
2. **Problema** — 3 dolores reales del mercado español + urgencia honesta (revisión trimestral de tarifas).
3. **Solución** — revisión energética gratuita, qué analizamos y estadísticas de impacto.
4. **Comparativa** — "hoy vs. con EMAX": tabla de contraste + **franja de comercializadoras** (Endesa, Iberdrola, Naturgy, Repsol…) que refuerza la independencia.
5. **Beneficios** — 6 beneficios (bento grid) orientados a resultado, con microcopy de garantía.
6. **Cómo funciona** — los 3 pasos exigidos + **garantía EMAX** (reversión de riesgo: si no hay ahorro, nada que pagar).
7. **Prueba social** — valoración 4.9/5 + **carrusel de reseñas** con testimonios y cifras concretas.
8. **FAQ** — 5 preguntas que neutralizan las objeciones típicas (corte de suministro, ahorro real, permanencia, precio, factura) en acordeón nativo (`<details>`), sin JS.
9. **Formulario** — nombre, teléfono, email, tipo de cliente, mensaje y botón de envío; urgencia temporal, tranquilizadores, microcopy de riesgo revertido y consentimiento RGPD.
10. **Footer** — marca, navegación simulada, contacto e información legal simulada.

## 🎨 Decisiones de diseño (orientadas a conversión)

- **Color**: verde petrol/teal (confianza + sostenibilidad) y ámbar como acento de "ahorro/energía"; el CTA primario es el elemento de mayor contraste.
- **Tipografía**: Inter (cuerpo) + Manrope (titulares), jerarquía clara del 400 al 800.
- **Un objetivo, un CTA**: todas las rutas llevan al formulario de consulta gratuita; CTA primario repetido en header, hero y cierre de "cómo funciona".
- **Cifras y prueba social**: números en el hero ("+250 €/año"), banda de resultados, ratings y testimonios con euros — porque los datos concretos convierten más que los adjetivos.
- **Reversión de riesgo**: "Gratis · Sin permanencia · Sin compromiso" y garantía EMAX por escrito.
- **Objeción resuelta antes de la conversión**: la FAQ va justo antes del formulario.
- **Rendimiento como palanca de conversión**: imágenes optimizadas (hero comprimida manteniendo transparencia en PNG), `loading="lazy"`, `fetchpriority="high"` en el hero.
- **Texturas sutiles**: puntos en degradé en todas las secciones (familia visual coherente, muy suaves para no competir con el contenido).
- **Modo presentación**: en escritorio alto, cada sección encaja en la pantalla con scroll encadenado (Lenis); el footer es la pantalla final permanente. En móvil/tarjetas con `prefers-reduced-motion` se mantiene el scroll normal.
- **Responsive**: mobile-first, carrusel con gesto táctil y autoplay (que respeta `prefers-reduced-motion`).

## ✅ Verificaciones

- HTML con etiquetado balanceado y semántico (validado con script de `check-tags`).
- A11y: foco visible, roles/labels, `prefers-reduced-motion`, navegación por teclado, `details` nativos.
- Responsive comprobado en móvil (390px), tablet y escritorio.
- Formulario funcional: validación en cliente y apertura del correo del usuario con la solicitud rellenada (`mailto:hola@emaxenergia.com`).

> Nota: la dirección de correo y los enlaces legales son simulados; el contenido de marcas comerciales de la franja es ilustrativo.