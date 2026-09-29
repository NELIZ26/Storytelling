# SPEC: "Explorando el Movimiento Corporal Humano: un viaje con la Señora Biomecánica"

> **Instrucción para el agente (Antigravity):** Lee este documento completo y construye el proyecto EXACTAMENTE como se describe. No agregues librerías, frameworks ni dependencias. No inventes contenido: todo el texto educativo está en la sección 6 y 7. Si algo es ambiguo, elige la opción MÁS SIMPLE. Al terminar, ejecuta el checklist de la sección 12 y corrige lo que falle.

---

## 1. Objetivo

Aplicación web educativa interactiva (estilo Educaplay/Genially) para una asignatura de **Seguridad y Salud en el Trabajo (UNAD)**. El usuario recorre **6 estaciones** guiado por un personaje (la **Señora Biomecánica**), resuelve un micro-juego por estación, gana **Puntos de Ergonomía**, y termina en un **Reto Final: el Caso de Carlos**.

Debe funcionar: abriendo el archivo con doble clic (`file://`), en celular y en PC, y desplegado gratis en GitHub Pages/Netlify/Vercel.

## 2. Stack y restricciones (NO negociables)

- **HTML + CSS + JavaScript vanilla.** Sin React, sin Vue, sin npm, sin build, sin CDN.
- **Un único archivo: `index.html`** (CSS en `<style>`, JS en `<script>` clásico, NO `type="module"` porque falla en `file://`).
- Sin imágenes externas: todo gráfico es **SVG inline** o emoji. Fuentes: stack del sistema (`system-ui, -apple-system, Segoe UI, Roboto, sans-serif`).
- Sin `<form>`; usar `<button type="button">` y `addEventListener`.
- Sin llamadas de red. Funciona 100% offline.
- Idioma de la interfaz: **español (Colombia)**. `<html lang="es">`.
- Peso objetivo: < 150 KB.

## 3. Estructura del archivo

```
index.html
 ├─ <style>      variables CSS, layout, componentes, animaciones simples
 ├─ <body>
 │    ├─ <header id="hud">      título corto + puntos + barra de progreso
 │    ├─ <main id="app">        aquí se renderiza UNA pantalla a la vez
 │    └─ <div id="toast">       mensajes cortos de feedback (aria-live)
 └─ <script>
      ├─ const CONTENT = {...}   TODO el contenido (sección 6 y 7)
      ├─ const state = {...}     estado (sección 4)
      ├─ helpers (el, shuffle, save, load)
      ├─ renderers: renderWelcome, renderMap, renderStation, renderCarlos, renderFinal
      ├─ motores de minijuego: classify, match, order, choice, multi
      └─ init()
```

**Regla clave:** el contenido va separado de la lógica. Los motores de minijuego leen datos de `CONTENT`; no hay texto educativo dentro de las funciones.

## 4. Estado y navegación

```js
state = {
  screen: 'welcome' | 'map' | 'station' | 'carlos' | 'final',
  current: 1..6,            // estación activa
  unlocked: 1,              // máxima estación desbloqueada
  completed: [],            // ids de estaciones completadas
  points: 0,
  carlosDone: [],           // ids de tarjetas de Carlos reveladas
}
```

- Navegación por función `go(screen, param)` que limpia `#app` y llama al renderer. **Sin router, sin hash.**
- Flujo: `welcome → map → station(1..6) → map → ... → carlos → final`.
- El mapa muestra 6 nodos en un camino (SVG o flex) con estados: 🔒 bloqueada, ▶ actual, ✅ completada. Al completar las 6, se habilita el nodo 7 "Almacén de Carlos".
- **Persistencia:** guardar `state` en `localStorage` bajo la clave `sb_progress_v1`, SIEMPRE dentro de `try/catch` (puede estar bloqueado o en modo incógnito). Si falla, la app sigue funcionando en memoria. Botón "Reiniciar" en el HUD con `confirm()`.
- **Modo docente:** si la URL contiene `?docente=1`, desbloquear todas las estaciones (para que el evaluador navegue libre).

## 5. Puntuación

- Cada minijuego vale **20 puntos** (6 estaciones = 120) + Caso de Carlos **20 puntos** (4 tarjetas x 5) = **140 pts máximo**.
- Por minijuego: 1.er intento correcto = 20 pts; 2.º intento = 10; 3.º o más = 5.
- **Nunca bloquear al usuario:** tras 2 errores se muestra un botón "Ver respuesta" que revela la solución con su explicación y permite continuar (otorga 5 pts).
- Feedback inmediato en cada respuesta: color + texto + explicación breve (campo `explain`). No depender solo del color (agregar ✔/✖ y texto).
- Sumar puntos una sola vez por estación (si repite el juego, no suma de nuevo).

## 6. Contenido educativo por estación (`CONTENT.stations`)

Cada estación tiene: `id`, `emoji`, `title`, `intro` (frase de la Señora Biomecánica, 1-2 líneas), `sections` (bloques de teoría cortos) y `game` (minijuego). La teoría se muestra en **tarjetas colapsables o en pasos "Siguiente"**, máximo 3-4 líneas por tarjeta. El usuario debe leer la teoría ANTES de que aparezca el botón "¡Al desafío!".

### Estación 1 — Trabajo muscular: "El motor oculto"
- **Trabajo estático:** el músculo genera tensión sin cambiar su longitud (contracción isométrica). Al mantenerse contraído comprime los capilares, reduce la llegada de oxígeno (isquemia transitoria, hipoxia local) y se acumulan metabolitos como el ácido láctico. Resultado: **fatiga rápida**.
- **Trabajo dinámico:** ciclos rítmicos de acortamiento (concéntrico) y elongación (excéntrico). Funciona como "bomba muscular": favorece el retorno venoso y el aporte de nutrientes. Fatiga más lenta.
- **Juego (classify):** clasificar en "Estático" o "Dinámico":
  - Sostener una caja en el aire → Estático
  - Pedalear → Dinámico
  - Caminar → Dinámico
  - Mantener el brazo extendido con una herramienta → Estático
  - Permanecer de pie sin moverse frente a una línea de producción → Estático
  - Subir escaleras → Dinámico
  - `explain` general: "El trabajo estático corta el flujo de sangre; el dinámico lo bombea."

### Estación 2 — Sistema óseo: "La arquitectura articular"
- El esqueleto tiene **206 huesos** que funcionan como **palancas** movidas por la fuerza muscular.
- **Sinartrosis** (fijas): suturas craneales. **Anfiartrosis** (semimóviles): discos intervertebrales, sínfisis púbica. **Diartrosis** (sinoviales, móviles): glenohumeral (hombro), coxofemoral (cadera), femorotibial (rodilla).
- **Arcos de movilidad (grados):** flexión de hombro 0°–180°; flexión de rodilla 0°–135°; columna lumbar flexión 0°–60° y extensión 0°–25°.
- **Juego (match):** emparejar 4 pares:
  - Hombro (glenohumeral) — Diartrosis · 0°–180°
  - Rodilla (femorotibial) — Diartrosis · 0°–135°
  - Discos intervertebrales — Anfiartrosis · movimiento limitado
  - Suturas del cráneo — Sinartrosis · sin movimiento
  - Columna izquierda: nombre de la articulación. Columna derecha (mezclada): "tipo · rango". 

### Estación 3 — Sistema muscular: "Energía y filamentos"
- **Tipos de músculo:** esquelético (voluntario, estriado), cardíaco (estriado, involuntario), liso (visceral, involuntario).
- **Fibras tipo I:** lentas, rojas, oxidativas, ricas en mioglobina y mitocondrias; resistentes a la fatiga; sostienen la postura. **Fibras tipo II:** rápidas, blancas, glucolíticas; mucha potencia, se agotan rápido. La **mioglobina** almacena oxígeno para la célula muscular.
- **Contracción:** el impulso nervioso libera **Ca²⁺**, que deja libres los sitios activos de la actina; la cabeza de miosina se une, tracciona e hidroliza **ATP** (energía inmediata), que se resintetiza desde el **glucógeno muscular**.
- **Juego (order):** ordenar los 5 pasos:
  1. Llega el impulso nervioso
  2. Se libera calcio (Ca²⁺)
  3. La miosina se une a la actina y consume ATP
  4. Los filamentos de actina y miosina se deslizan
  5. El músculo se acorta (contracción)

### Estación 4 — Postura: "La geometría corporal"
- Postura = alineación espacial de los segmentos corporales. Se clasifica en 3 ejes:
  - **Según posición:** bípeda (de pie), sedente (sentado), en cuclillas.
  - **Según tiempo de exposición:** *mantenida* (más de 2 horas continuas) o *prolongada* (más del 75 % de la jornada).
  - **Según movimiento:** *neutra* (ángulos de confort), *forzada* (extremos del rango articular) o *antigravitatoria* (miembros superiores por encima de los hombros).
- **Juego (choice):** "¿Cuál de estos puestos combina postura forzada, mantenida y antigravitatoria?"
  - A) Secretaria sentada con espalda apoyada y teclado a la altura del codo
  - B) Cajero de pie que alterna el peso entre ambas piernas
  - C) **Pintor de techos con los brazos sobre los hombros durante 3 horas seguidas** ← correcta
  - D) Operario que camina y transporta una caja liviana
  - `explain`: "Brazos sobre los hombros = antigravitatoria; extremo del rango = forzada; 3 h continuas = mantenida."

### Estación 5 — Movimiento y riesgo repetitivo
- **Trabajo repetitivo:** ciclos menores a 30 segundos, o más del 50 % del ciclo repite la misma secuencia de movimientos.
- **Riesgos:** microtraumatismos acumulativos en las vainas de los tendones: tenosinovitis, síndrome del túnel del carpo, epicondilitis.
- **Prevención:** rotación de puestos, rediseño ergonómico de mandos y herramientas, micropausas activas.
- **Juego (multi):** seleccionar SOLO las medidas eficaces (6 opciones, 3 correctas):
  - ✔ Rotar al trabajador entre puestos con movimientos distintos
  - ✔ Rediseñar herramientas y mandos para reducir el esfuerzo
  - ✔ Programar micropausas activas
  - ✘ Aumentar la velocidad de la línea para terminar antes
  - ✘ Eliminar los descansos para compensar la producción
  - ✘ Dar horas extra en el mismo puesto sin cambios
  - Validar con botón "Comprobar": correcto solo si el conjunto seleccionado es exactamente el correcto.

### Estación 6 — Carga y técnicas seguras
- **Carga:** masa ≥ 3 kg sometida a levantamiento, descenso, empuje o tracción manual.
- **Técnica segura:** pies separados al ancho de los hombros, carga pegada al tronco (menor brazo de palanca), rodillas flexionadas, columna recta y **sin torsión del tronco**.
- **Límites (Colombia):** Resolución 2400 de 1979 — hombres 25 kg, mujeres 12,5 kg. **Internacional:** ISO 11228-1 y ecuación NIOSH, con peso de referencia de 23 kg en condiciones ideales.
- **Juego (choice con SVG):** mostrar 3 siluetas SVG simples (figura de palitos) etiquetadas A, B, C: A) espalda encorvada con piernas rectas y carga lejos; B) **rodillas flexionadas, espalda recta, carga pegada al cuerpo** ← correcta; C) tronco girado mientras levanta. Pregunta: "¿Cuál es el levantamiento correcto?"
  - Dibujar las siluetas con `<line>` y `<circle>` (cabeza, tronco, brazos, piernas, caja como `<rect>`). Deben ser reconocibles pero simples.

## 7. Reto final: El Caso de Carlos (`CONTENT.carlos`)

**Escenario (mostrar arriba):** Carlos trabaja en un almacén levantando, transportando y ubicando cajas de **15 kg** de forma repetitiva y **sin pausas**.

Mostrar **4 tarjetas** (una por pregunta). Cada tarjeta muestra la pregunta con un botón "Pensar mi respuesta"; al pulsarlo se revela la respuesta modelo y se otorgan 5 pts (una vez). Debajo de cada respuesta, un mini-autochequeo opcional no puntuado no es necesario: mantener simple.

1. **¿Qué tipo de trabajo muscular realiza Carlos?**
   Trabajo **combinado**: *dinámico* al levantar, acomodar y bajar las cajas repetidamente, y *estático prolongado* en tronco y cintura escapular al sostener y transportar los 15 kg. Sin pausas, los músculos paravertebrales mantienen contracciones isométricas que limitan el flujo sanguíneo capilar y generan fatiga por hipoxia tisular.

2. **¿Qué sistemas anatómicos están involucrados?**
   - **Osteoarticular:** articulaciones lumbosacras (L4-L5, L5-S1), discos, cápsulas; hombros y rodillas.
   - **Muscular:** erectores espinales, dorsal ancho, glúteos, isquiotibiales, cuádriceps, flexores de los dedos.
   - **Nervioso:** control motor voluntario, mecanorreceptores articulares y raíces del nervio ciático (riesgo de compresión).
   - **Circulatorio:** microcirculación muscular con presión intramuscular sostenida.

3. **¿Qué consecuencias o patologías puede tener?**
   - **Columna:** lumbalgia mecánica, degeneración discal prematura, protrusión y hernia discal, agravadas por flexión + torsión.
   - **Periféricas:** tendinopatía del manguito de los rotadores, bursitis y desórdenes musculoesqueléticos (DME) acumulativos.

4. **¿Qué medidas preventivas recomiendas (nacional e internacional)?**
   - **Colombia** (Res. 2400/1979, Decreto 1072/2015, GTC 45): ingreso al Programa de Vigilancia Epidemiológica osteomuscular; pausas activas dirigidas (cada 2 horas); capacitación en higiene postural y manejo manual de cargas.
   - **Internacional** (ISO 11228-1, Directiva 90/269/CEE, NIOSH):
     - *Ingeniería:* ayudas mecánicas (mesas elevadoras, transpaletas, transportadores de rodillos); ubicar la carga entre nudillos y codos (≈ 50–110 cm) evitando levantar desde el suelo.
     - *Administrativos:* rotación de puestos sin carga y reducción del tiempo de levantamiento continuo según la ecuación NIOSH.

**Pantalla final:** puntaje total sobre 140, mensaje de la Señora Biomecánica según rango (≥ 110: "¡Experta/o en ergonomía!", 70–109: "¡Muy buen recorrido!", < 70: "¡Repasemos y vuelve a intentarlo!"), resumen de 6 ideas clave (una por estación, 1 línea cada una) y botones "Volver al mapa" y "Reiniciar". Incluir bloque **Referencias normativas** (lista de las normas citadas).

## 8. Motores de minijuego (comportamiento exacto)

Todos son **accesibles por teclado y táctiles**. **NO usar drag & drop nativo** (falla en celulares); usar **toque para seleccionar + toque para colocar**.

| Motor | Interacción | Validación |
|---|---|---|
| `classify` | Se muestra una tarjeta a la vez; el usuario pulsa uno de 2 botones (categorías). | Correcto/incorrecto por tarjeta; el intento cuenta cuando falla algo. Termina al clasificar todas. |
| `match` | Dos columnas. Toca un elemento de la izquierda y luego uno de la derecha para unirlos. | Si el par es correcto queda verde y bloqueado; si no, vibra y cuenta error. |
| `order` | Elementos mezclados en una lista; botones ▲ ▼ en cada uno para moverlos. Botón "Comprobar". | Compara con el orden correcto; en error marca cuáles están mal colocados. |
| `choice` | Opciones como botones grandes (una selección). | Feedback inmediato con `explain`. |
| `multi` | Casillas (botones toggle). Botón "Comprobar". | Correcto solo si el conjunto coincide exactamente; en error indicar cuántos aciertos hubo, sin revelar cuáles. |

Cada motor recibe `(container, gameData, onFinish)` y llama `onFinish(attempts)` al terminar. La puntuación la calcula una función central `award(stationId, attempts)`.

## 9. Diseño visual (simple pero cuidado)

- **Paleta (variables CSS):** `--bg:#f4f7fb; --card:#ffffff; --primary:#1f6feb; --accent:#f59e0b; --ok:#16a34a; --bad:#dc2626; --text:#1e293b; --muted:#64748b;`
- Esquinas `border-radius: 14px`, sombras suaves, tipografía de sistema, tamaños base 16–18 px, botones de mínimo 44 px de alto.
- **Avatar de la Señora Biomecánica:** SVG inline simple (círculo de cabeza, cabello recogido, bata blanca o camisa azul, unas gafas). Aparece en un globo de diálogo en cada estación con su `intro`. No necesita ser sofisticado.
- Animaciones mínimas con CSS: fade-in al cambiar de pantalla, "shake" en error, "pop" en acierto. Respetar `@media (prefers-reduced-motion: reduce)` desactivándolas.
- **HUD fijo arriba:** "⭐ Puntos: X" y barra de progreso (estaciones completadas / 7).
- Layout responsive: una columna centrada, `max-width: 820px`; probar a 360 px de ancho.
- **Pantalla de bienvenida:** título obligatorio *"Explorando el Movimiento Corporal Humano: un viaje con la Señora biomecánica"*, avatar, 2 líneas de instrucción y botón "🚀 Comenzar la ruta".

## 10. Accesibilidad mínima

- Botones reales (`<button>`), foco visible (`:focus-visible` con outline claro).
- `aria-live="polite"` en el contenedor de feedback/toast.
- Contraste suficiente (texto sobre fondo ≥ 4.5:1).
- Los ✔/✖ acompañan siempre al color.
- Los SVG llevan `role="img"` y `aria-label`.

## 11. Contingencias (el agente DEBE manejarlas)

| Riesgo | Solución requerida |
|---|---|
| `localStorage` bloqueado o lleno | `try/catch` en todo `save()`/`load()`; continuar en memoria. |
| Datos guardados corruptos o de otra versión | `load()` valida con `try { JSON.parse }` y comprueba que existan `points` y `unlocked`; si no, ignora y empieza de cero. La clave incluye versión (`_v1`). |
| Usuario en celular (sin drag & drop) | Motores por toque (sección 8). |
| Abierto con `file://` | Sin módulos ES, sin `fetch`, todo inline. |
| Doble clic rápido / doble puntuación | `award()` ignora si la estación ya está en `completed`; deshabilitar botones tras responder. |
| Usuario atascado en un juego | "Ver respuesta" tras 2 errores; nunca bloquear el avance. |
| Refresh a mitad de estación | Al recargar, volver al **mapa** con progreso guardado (no reanudar a mitad de juego). |
| Saltarse estaciones manipulando el DOM | Sin importancia; solo verificar `unlocked` en `go('station', n)` y redirigir al mapa. `?docente=1` desbloquea todo a propósito. |
| Pantalla pequeña (< 360 px) | Columnas de `match` se apilan; textos con `overflow-wrap:anywhere`. |
| Texto largo | Teoría en tarjetas cortas; nunca más de ~4 líneas por bloque. |
| Errores JS inesperados | `window.onerror` muestra un mensaje amable "Algo salió mal, recarga la página" sin romper el HUD. |
| Fórmulas/símbolos | Escribir Ca²⁺, °, ≥ directamente en Unicode; **no usar LaTeX/MathJax**. |
| Impresión/PDF para el informe | Añadir `@media print` básico: ocultar HUD y botones, mostrar contenido legible. |

## 12. Checklist de aceptación (verificar antes de terminar)

- [ ] Un solo `index.html` que abre con doble clic sin errores en consola.
- [ ] Sin dependencias externas ni peticiones de red.
- [ ] Título obligatorio exacto en la bienvenida.
- [ ] Las 6 estaciones + Caso de Carlos con TODO el contenido de las secciones 6 y 7.
- [ ] Los 5 motores funcionan con mouse, teclado y toque.
- [ ] Puntos suman correctamente y máximo = 140; no se duplican.
- [ ] El progreso persiste al recargar y "Reiniciar" lo borra.
- [ ] `?docente=1` desbloquea todas las estaciones.
- [ ] Se ve bien a 360 px y a 1280 px.
- [ ] Las normas se citan exactamente como en el contenido (Res. 2400/1979, Decreto 1072/2015, GTC 45, ISO 11228-1, NIOSH, Directiva 90/269/CEE). No se menciona la Res. 156/2005 como norma de límites de peso.
- [ ] Ninguna palabra en inglés visible para el usuario.

## 13. Entrega y despliegue

1. Entregar `index.html` y un `README.md` de 10 líneas: cómo abrirlo y cómo usar `?docente=1`.
2. **GitHub Pages:** crear repo → subir `index.html` → Settings → Pages → rama `main`, carpeta `/root`. El enlace queda `https://USUARIO.github.io/REPO/`.
3. **Alternativa más rápida:** arrastrar la carpeta a https://app.netlify.com/drop.
4. Ese enlace es el que se pega en el documento final del trabajo.

---

### Notas para la persona que entrega el trabajo (no para el agente)

- Verifica en tu guía/rúbrica de la UNAD los **números exactos de artículos** de la Res. 2400/1979 sobre carga (el texto base menciona Título X, Art. 389–392; confírmalos antes de citarlos por número) y los valores de "postura mantenida/prolongada" (2 h / 75 %), que deben coincidir con lo que pide tu curso.
- Los rangos articulares son valores de referencia comunes; si tu material usa otras cifras, cámbialas solo en el objeto `CONTENT` sin tocar la lógica.
