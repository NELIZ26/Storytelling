# SPEC v3 — Storytelling digital ilustrado: primero la HISTORIA completa, después las MISIONES (preguntas y juegos)

> **Instrucción para el agente (Antigravity):** Ya existe un `index.html` (v2) con motores de minijuego, puntuación, persistencia y un motor de escenas básico. Esta versión **cambia el flujo y la arquitectura**. Haz una **refactorización**: (1) copia el archivo actual a `backup/index_v2.html`; (2) parte el proyecto en varios archivos (sección 1); (3) **reutiliza** los motores de juego (`engineClassify`, `engineMatch`, `engineOrder`, `engineChoice`, `engineChoiceSvg`, `engineMulti`), `award()` y `Storage`; (4) **reescribe** el motor de historia según la sección 5. No agregues librerías ni CDN. Ante la duda, elige lo MÁS SIMPLE. Al terminar, ejecuta la checklist (sección 14).

---

## 0. Qué cambia respecto a la v2

1. **Flujo nuevo:** `Bienvenida → HISTORIA COMPLETA (prólogo + 6 capítulos + cierre) → MISIONES (6 juegos) → Reto Final (Caso de Carlos) → Epílogo`. Durante la historia **no hay preguntas ni juegos**: solo se narra, como una película/cómic animado.
2. **Muy "dibujo":** personajes ilustrados en PNG, fondos ilustrados, láminas anatómicas ilustradas, interfaz con estética de cómic.
3. **Ilustración sincronizada con la explicación:** mientras la Señora Biomecánica explica, en un **panel holográfico** aparece el músculo/hueso/esquema correspondiente (brazo, pierna, espalda, capilar, sarcómero…), a veces alternando dos imágenes (relajado ↔ contraído) como un GIF, con zoom o pulso.
4. **Varios archivos** (carpeta con `index.html`, `css/`, `js/`, `assets/`), entregables como `.zip` o publicados en GitHub Pages.
5. El medidor **"Espalda de Carlos"** y los puntos solo viven en la parte de MISIONES (ahí se "resuelve" el conflicto).

## 1. Estructura de archivos

```
/ (raíz del proyecto = lo que se sube a GitHub Pages / se comprime en .zip)
├─ index.html                # solo estructura y <script src> en orden
├─ README.md                 # cómo abrir/publicar (10 líneas)
├─ css/
│   └─ style.css
├─ js/                       # scripts CLÁSICOS (sin type="module"), cargar en este orden:
│   ├─ data-story.js         # CHAPTERS, VISUALS, GLOSSARY
│   ├─ data-quiz.js          # MISSIONS (juegos existentes) y CARLOS
│   ├─ core.js               # state, Storage, helpers, cargador de imágenes, go()
│   ├─ games.js              # motores de minijuego (reutilizados)
│   ├─ story.js              # motor de historia (NUEVO)
│   ├─ screens.js            # welcome, capítulos, misiones, carlos, final
│   ├─ voice.js              # narración opcional
│   └─ main.js               # init()
├─ assets/
│   ├─ characters/           # sprites PNG
│   ├─ backgrounds/          # fondos JPG
│   └─ anatomy/              # láminas anatómicas
└─ backup/index_v2.html
```

- Todo en el espacio global `window.SB = {}` para compartir funciones entre archivos (sin módulos ES).
- **Rutas siempre relativas** (`assets/...`, nunca `/assets/...`) para que funcione en `file://` y en GitHub Pages bajo `/nombre-repo/`.
- **Nombres de archivo en minúsculas, sin espacios ni tildes** (GitHub Pages distingue mayúsculas de minúsculas).

## 2. Reglas técnicas

- HTML + CSS + JS vanilla. Sin frameworks, sin npm, sin CDN, sin `fetch`, sin `type="module"`.
- Idioma: español. Sin `<form>`.
- Funciona abriendo `index.html` con doble clic **y** en GitHub Pages.
- Fuentes: stack del sistema. Estilo "dibujo" con CSS (sección 11).
- Peso total objetivo de `assets/`: ≤ 12 MB.

## 3. Flujo y pantallas

| Pantalla | Descripción |
|---|---|
| `welcome` | Título animado exacto + personaje + botón **"🚀 Comenzar la ruta"** + interruptores 🎬 Modo película y 🔊 Voz. Si hay progreso guardado, botón secundario "Continuar". |
| `story` | Prólogo, Capítulos 1–6 y Cierre (Capítulo 7). Motor de la sección 5. |
| `missionsIntro` | Breve escena (3 líneas de diálogo) que abre la parte de juegos. |
| `missions` | Mapa de misiones (6 + Caso de Carlos) con medidor "Espalda de Carlos". |
| `mission` | Una misión: línea de la Señora Biomecánica + minijuego existente. |
| `carlos` | Reto Final: las 4 preguntas con respuestas argumentadas. |
| `final` | Epílogo (2 líneas de diálogo), puntaje, ideas clave y referencias normativas. |

**Título obligatorio (animado, exacto):** *"Explorando el Movimiento Corporal Humano: un viaje con la Señora biomecánica"*.

**Navegación (hipervínculos internos):** barra superior con 🏠 Inicio · 📖 Capítulos (menú) · 🎮 Misiones · 📁 Glosario. El menú de capítulos permite **saltar libremente** a cualquier capítulo (historia no bloqueada). Las **misiones se desbloquean al terminar la historia** (llegar al último diálogo del Cierre); botón "Saltar a las misiones" con `confirm()` para quien quiera ir directo. Con `?docente=1` todo queda desbloqueado.

## 4. Estado y persistencia

```js
state = {
  screen, story: { chapter:0, screen:0, beat:0, visited:[], done:false },
  unlocked:1, completed:[], points:0, carlosDone:[],
  autoplay:false, voice:false
}
```
- Clave `sb_progress_v3` (ignorar `v1` y `v2`). Todo `save()/load()` en `try/catch`; validar estructura al cargar.
- Se guarda el capítulo actual; al continuar, se reanuda **al inicio de ese capítulo**.
- Puntos: 20 por misión (6×20=120) + 5 por tarjeta de Carlos (4×5=20) = **140**. Igual que antes; `award()` no duplica.
- Medidor: `meter = round(10 + 60*(completed.length/6) + 30*(carlosDone.length/4))`. Empieza en 10 % (rojo) y llega a 100 % (verde).

## 5. Motor de historia (el corazón de la v3)

### 5.1 Layout del escenario (`#stage`, relación 16:9)

```
┌──────────────────────── #stage ─────────────────────────────┐
│ FONDO ilustrado (bg de la escena)                            │
│                                                              │
│  [sprite del hablante]      ┌──── PANEL HOLOGRÁFICO ────┐    │
│  (izquierda, grande)        │  ilustración anatómica     │    │
│                             │  (crossfade / frames)      │    │
│                             │  insignia (ej. "0°–180°")  │    │
│                             │  leyenda + chips tocables  │    │
│                             └────────────────────────────┘    │
│  ┌──────────── caja de diálogo (abajo) ──────────────────┐   │
│  │ NOMBRE          texto con efecto de escritura     ▼   │   │
│  └───────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
 [◀ Atrás] [▶/⏸ Película] [⏭ Saltar pantalla] [🔊] [📖 Capítulos]  ●●○ progreso
```

- **Panel holográfico** (`.holo`): tarjeta crema (`#fffdf7`) con borde grueso de cómic; dentro, la imagen con `mix-blend-mode: multiply` (así las láminas con **fondo blanco** se integran sin recorte). Debajo: leyenda (`caption`) y **chips** tocables (abren el glosario).
- **Sprite:** solo aparece quien habla (`sb` entra desde la izquierda; `carlos` entra desde la derecha del lado contrario pero el panel se mantiene). El `narrator` no tiene sprite; su texto se muestra en cursiva sobre la caja.
- **Móvil vertical (< 700 px):** el escenario pasa a `aspect-ratio: 3/4`; el panel holográfico ocupa la parte superior (ancho completo, ~50 % de alto), el sprite se reduce y va abajo a la izquierda, y la caja de diálogo va **debajo** del escenario (no superpuesta).

### 5.2 Modelo de datos

```js
CHAPTERS = [ { id, title, subtitle, bg, screens:[ { title, beats:[
   { who:'sb'|'carlos'|'narrator', mood:'neutral', visual:'arm_static'|'='|'none', text:'...' }
] } ] } ];

VISUALS = { arm_static: { frames:['arm_contracted'], fps:0, anim:'pulse', caption:'...', chips:['Bíceps'], badge:null, emoji:null, countTo:null }, ... }
```
- `visual:'='` (o campo ausente) = mantener la ilustración actual. `visual:'none'` = ocultar panel.
- **Cada capítulo tiene 2–3 "pantallas" (screens)** con subtítulo (p. ej. "1.2 · La pierna que camina"). Al empezar cada pantalla se muestra 2 s el subtítulo en una etiqueta.
- El texto de `data-story.js` es el de la sección 8; NO se inventa contenido.

### 5.3 Sistema de "visuales" (lo que se ve mientras ella explica)

Cada visual se renderiza dentro del panel así:
- `frames`: lista de imágenes de `assets/anatomy/`. Si hay 1 → estática. Si hay ≥ 2 y `fps > 0` → **alterna** entre ellas cada `1/fps` s (efecto GIF: músculo relajado ↔ contraído). Limpiar el `setInterval` al cambiar de beat/pantalla.
- `anim` (solo CSS sobre la imagen): `pulse` (latido suave), `pulse-red` (latido con brillo rojo, para peligro), `zoom` (acerca 1 → 1.35 en 3 s), `shake` (temblor leve, para "postura mala"), `none`.
- `badge`: texto grande superpuesto (p. ej. `0°–180°`, `206`, `≥ 3 kg`).
- `countTo`: número que **cuenta** de 0 al valor en 3 s (p. ej. `2880`) con etiqueta "repeticiones en un turno".
- `emoji`: fila de emojis grandes cuando no hay lámina (p. ej. `🔄🛠️⏸️`).
- `chips`: etiquetas tocables; al tocar abren el glosario en esa entrada (si existe) o una definición corta.
- **Transición** entre visuales: crossfade de 400 ms (`opacity`).
- **Si falta la imagen** → tarjeta de reemplazo (borde discontinuo + emoji temático + la leyenda). La historia NUNCA se detiene por una imagen faltante (ver sección 6).

### 5.4 Comportamiento

1. Efecto de escritura ~25 ms/carácter. Clic/toque en el escenario, `Espacio`, `Enter` o `→`: si escribe → completa la línea; si terminó → siguiente beat. `←` retrocede.
2. **Modo película** (interruptor ▶/⏸): avanza solo. Espera `max(2500, texto.length*55)` ms tras terminar de escribir; si la **voz** está activa, espera a que termine de hablar (`onend`) más 600 ms. Se pausa al tocar ⏸ o al abrir el menú/glosario.
3. **Tarjeta de capítulo** al iniciar cada capítulo: pantalla completa 1,8 s con "CAPÍTULO N" y el título, estilo anime (barrido diagonal + fundido). Se puede saltar con un clic.
4. Al cambiar de escenario/bg: fundido a negro 300 ms.
5. El sprite hablante hace "idle" (sube y baja 4 px) y "pop" al cambiar de `mood`.
6. Al terminar el último beat del Capítulo 7 (Cierre): `state.story.done = true` y aparece el botón **"🎮 Ir a las misiones"**.
7. Barra de progreso general de la historia (beats leídos / total) y puntos por pantalla.
8. Todos los timers se guardan en `SB.timers` y se limpian en cada cambio de pantalla.

## 6. Contrato de imágenes (nombres EXACTOS)

Cada archivo se busca probando extensiones en cascada (si falla la primera, prueba la siguiente; si fallan todas, usa el fallback). Función auxiliar `loadImg(folder, base, exts, onOk, onFail)`.

| Carpeta | Archivos (sin extensión) | Extensiones a probar | Fallback |
|---|---|---|---|
| `assets/characters/` | `sb_neutral`, `sb_explaining`, `sb_happy`, `sb_worried`, `sb_alert`, `carlos_tired`, `carlos_neutral`, `carlos_relieved` | `.png`, `.webp` | Avatar SVG grande (el de la v2) + emoji-insignia del `mood` |
| `assets/backgrounds/` | `bg_bodega_tarde`, `bg_bodega_manana`, `bg_interior_cuerpo`, `bg_fabrica_energia`, `bg_gimnasio`, `bg_linea_reloj`, `bg_zona_carga`, `bg_sala_reunion` | `.jpg`, `.png`, `.webp` | Gradiente CSS por escena + 2–3 emojis flotantes |
| `assets/anatomy/` | `arm_relaxed`, `arm_contracted`, `leg_muscles`, `leg_flexed`, `back_muscles`, `capillary_free`, `capillary_squeezed`, `skeleton`, `skull_sutures`, `spine_lumbar`, `shoulder_joint`, `knee_joint`, `muscle_types`, `fiber_types`, `sarcomere_relaxed`, `sarcomere_contracted`, `atp_factory`, `posture_neutral`, `posture_forced`, `posture_overhead`, `wrist_tendon`, `lift_wrong`, `lift_twist`, `lift_right`, `disc_herniation` | `.png`, `.svg`, `.jpg`, `.webp` | Tarjeta de reemplazo con emoji + leyenda |

- Los sprites son **PNG con fondo transparente**. Las láminas anatómicas pueden ser PNG/JPG/SVG con **fondo blanco** (se funden con `multiply`).
- **La app debe construirse y probarse PRIMERO sin ninguna imagen** (todo con fallbacks); las imágenes se agregan después, sin tocar código, respetando los nombres.
- El escenario/sprite/panel se ajustan con `object-fit: contain` para aceptar cualquier proporción.
- **Precarga** (`new Image()`) de los sprites y del fondo del siguiente capítulo y de las láminas del siguiente capítulo, al iniciar el actual.
- Cuando existan `lift_wrong`, `lift_twist`, `lift_right`, el juego de la Misión 6 (`engineChoiceSvg`) debe usar esas láminas (mezcladas y rotuladas A/B/C); si no existen, usa los SVG de figuras de palitos actuales.

## 7. Catálogo de visuales (`VISUALS`)

| id | frames (assets/anatomy) | fps | anim | caption | chips / badge |
|---|---|---|---|---|---|
| `arm_static` | arm_contracted | 0 | pulse | Trabajo estático · contracción isométrica | Bíceps · Isometría |
| `arm_cycle` | arm_relaxed, arm_contracted | 0.8 | none | Trabajo dinámico · se contrae y se relaja | Concéntrica · Excéntrica |
| `cap_squeezed` | capillary_squeezed | 0 | pulse-red | El músculo tenso aplasta el capilar | Isquemia · Hipoxia · Ácido láctico |
| `cap_free` | capillary_free | 0 | pulse | Bomba muscular: la sangre fluye | Retorno venoso |
| `leg_walk` | leg_muscles, leg_flexed | 0.8 | none | Caminar: trabajo dinámico | Cuádriceps · Isquiotibiales · Gemelos |
| `back_load` | back_muscles | 0 | pulse-red | Erectores espinales bajo carga | Erectores espinales · Dorsal ancho · Glúteos |
| `skeleton` | skeleton | 0 | zoom | El esqueleto humano · badge `206` | Huesos · Palancas |
| `skull` | skull_sutures | 0 | pulse | Articulación fija · sinartrosis | Sinartrosis |
| `lumbar` | spine_lumbar | 0 | pulse | Semimóvil · anfiartrosis | Anfiartrosis · L4-L5 · L5-S1 |
| `shoulder` | shoulder_joint | 0 | none | Articulación móvil · diartrosis · badge `0°–180°` | Diartrosis · Glenohumeral |
| `knee` | knee_joint | 0 | none | Articulación móvil · badge `0°–135°` | Diartrosis · Femorotibial |
| `lumbar_rom` | spine_lumbar | 0 | pulse | Movilidad lumbar · badge `Flex 0°–60° · Ext 0°–25°` | Arco de movilidad |
| `muscle_types` | muscle_types | 0 | none | Tres tipos de músculo | Esquelético · Cardíaco · Liso |
| `fibers` | fiber_types | 0 | none | Fibras tipo I y tipo II | Tipo I · Tipo II · Mioglobina |
| `sarco` | sarcomere_relaxed, sarcomere_contracted | 0.9 | none | Actina y miosina se deslizan | Actina · Miosina · Ca²⁺ |
| `factory` | atp_factory | 0 | pulse | La fábrica de ATP | ATP · Glucógeno · Mitocondria |
| `posture_all` | posture_neutral, posture_forced, posture_overhead | 0.4 | none | Tres posturas para comparar | Neutra · Forzada · Antigravitatoria |
| `posture_f` | posture_forced | 0 | shake | Postura forzada y mantenida | Forzada · Mantenida |
| `posture_o` | posture_overhead | 0 | pulse | Postura antigravitatoria | Antigravitatoria |
| `posture_n` | posture_neutral | 0 | none | Postura neutra | Neutra · Bípeda |
| `wrist` | wrist_tendon | 0 | pulse-red | Tendones y túnel del carpo | Tenosinovitis · Túnel del carpo · Epicondilitis |
| `reps` | — (emoji ⏱️📦) | — | — | countTo `2880` "repeticiones en un turno de 8 h" | Trabajo repetitivo |
| `prevent` | — (emoji 🔄🛠️⏸️) | — | — | Rotar · Rediseñar · Micropausas | Micropausas activas |
| `load` | — (emoji 📦) | — | — | badge `≥ 3 kg` | Carga manual |
| `limits` | — (emoji ⚖️) | — | — | Límites de referencia | Res. 2400/1979: 25 kg ♂ · 12,5 kg ♀ · ISO 11228-1 / NIOSH: 23 kg |
| `lift_bad` | lift_wrong | 0 | shake | Espalda encorvada y carga lejos ✖ | Brazo de palanca largo |
| `lift_twist` | lift_twist | 0 | shake | Torsión del tronco con carga ✖ | Torsión |
| `lift_good` | lift_right | 0 | pulse | Rodillas flexionadas, espalda recta ✔ | Técnica segura |
| `disc` | disc_herniation | 0 | pulse-red | Hernia discal lumbar | Protrusión · Hernia discal |

## 8. GUION COMPLETO DE LA HISTORIA (usar TEXTUALMENTE)

**Formato:** `[quién · mood | visual] texto`. `|=` mantiene la ilustración; `|none` la oculta.
Moods de `sb`: neutral, explaining, happy, worried, alert. Moods de `carlos`: tired, neutral, relieved.

### Prólogo · "Una tarde en la bodega" — bg `bodega_tarde`
1. `[narrator | none]` Almacén Andino, 5:40 p. m. Ocho horas de turno. Una caja más… y Carlos se detiene.
2. `[carlos·tired | none]` Ay, mi espalda… La siento como una piedra y los brazos me tiemblan.
3. `[sb·alert | none]` Buenas tardes, Carlos. Soy la Señora Biomecánica. Me llamaron porque tu cuerpo lleva horas enviando señales de alarma.
4. `[carlos·neutral | none]` ¿Señales? Yo solo cargo cajas de 15 kilos. No es tanto…
5. `[sb·explaining | none]` Para ayudarte, haremos un viaje por tu cuerpo. Primero conoceremos la historia completa; al final resolveremos tu caso.
6. `[sb·happy | none]` Sígueme. ¡Empezamos!

### Capítulo 1 · "El motor oculto" (Trabajo muscular) — bg `bodega_manana`
**1.1 · El brazo que espera**
1. `[narrator | none]` Flashback: 7:00 a. m. Carlos sostiene una caja frente al pecho, esperando el montacargas.
2. `[sb·explaining | arm_static]` Mira su brazo: no se mueve, pero el músculo está trabajando a tope. Eso es trabajo muscular estático.
3. `[sb·neutral | arm_static]` El músculo genera tensión sin cambiar de longitud. Se llama contracción isométrica.
4. `[sb·worried | cap_squeezed]` Y ahí está el problema: el músculo tenso aplasta sus propios capilares.
5. `[sb·worried | cap_squeezed]` Llega menos oxígeno (isquemia), se acumula ácido láctico… y aparece la fatiga.

**1.2 · La pierna que camina**
6. `[narrator | leg_walk]` Poco después, Carlos cruza la bodega caminando.
7. `[sb·explaining | leg_walk]` Ahora mira sus piernas: cuádriceps, isquiotibiales y gemelos se contraen y se relajan. Eso es trabajo dinámico.
8. `[sb·happy | arm_cycle]` En el trabajo dinámico hay ciclos de acortamiento (concéntrico) y de elongación (excéntrico).
9. `[sb·happy | cap_free]` Además funciona como una bomba: empuja la sangre de regreso al corazón y renueva el oxígeno. ¡Se cansa mucho menos!

**1.3 · En la vida real**
10. `[carlos·tired | =]` Por eso me cansa más esperar con la caja que caminar con ella…
11. `[sb·explaining | =]` Exacto. Estático: sostener una herramienta en alto, estar de pie sin moverse. Dinámico: caminar, pedalear, subir escaleras.
12. `[sb·alert | back_load]` En el trabajo de Carlos hay de los dos: dinámico al levantar, y estático en la espalda al sostener y transportar la carga.
13. `[sb·neutral | back_load]` Sus erectores espinales casi nunca descansan. Guarda ese dato: lo vamos a necesitar.

### Capítulo 2 · "La arquitectura del cuerpo" (Sistema óseo) — bg `interior_cuerpo`
**2.1 · El esqueleto**
1. `[narrator | none]` La Señora Biomecánica activa su lupa y ambos se hacen diminutos hasta entrar en el cuerpo de Carlos.
2. `[sb·explaining | skeleton]` Bienvenido al sistema óseo: 206 huesos que forman el armazón del cuerpo.
3. `[sb·neutral | skeleton]` Sostienen el cuerpo, protegen órganos, guardan minerales y producen células de la sangre en la médula ósea.
4. `[sb·explaining | skeleton]` Y algo clave: funcionan como palancas que los músculos mueven al tirar de ellos.

**2.2 · Tres tipos de uniones**
5. `[sb·neutral | skeleton]` Los huesos se unen en articulaciones. Hay tres tipos, según cuánto se mueven.
6. `[sb·explaining | skull]` Fijas o sinartrosis: no se mueven. Ejemplo: las suturas del cráneo.
7. `[sb·explaining | lumbar]` Semimóviles o anfiartrosis: movimiento limitado. Ejemplo: los discos entre las vértebras y la sínfisis púbica.
8. `[sb·explaining | shoulder]` Móviles o diartrosis, también llamadas sinoviales: hombro (glenohumeral), cadera (coxofemoral) y rodilla (femorotibial).
9. `[sb·worried | lumbar]` Ojo con esta zona: las vértebras L4-L5 y L5-S1 son semimóviles y soportan casi todo el peso cuando Carlos levanta.

**2.3 · ¿Cuántos grados se mueve?**
10. `[sb·explaining | shoulder]` Toda articulación tiene un arco de movilidad: el ángulo, en grados, que puede recorrer. El hombro llega a 180° de flexión.
11. `[sb·neutral | knee]` La rodilla flexiona hasta unos 135°.
12. `[sb·alert | lumbar_rom]` La zona lumbar es la más limitada: unos 60° al flexionar y 25° al extender. Forzarla más allá es pedir una lesión.
13. `[sb·happy | skeleton]` Ya conocemos la estructura. Ahora, ¡vamos a ver los músculos que la mueven!

### Capítulo 3 · "La fábrica de energía" (Sistema muscular) — bg `fabrica_energia`
**3.1 · Los tres músculos**
1. `[narrator | none]` Siguen avanzando hasta entrar en un músculo del brazo. Por dentro parece… ¡una gran fábrica!
2. `[sb·explaining | muscle_types]` Hay tres tipos de músculo: el esquelético, voluntario y estriado; el cardíaco, estriado e involuntario; y el liso, de las vísceras.
3. `[sb·neutral | muscle_types]` El que mueve a Carlos, y el que se cansa en su trabajo, es el músculo esquelético.
4. `[sb·explaining | fibers]` Sus fibras son de dos clases. Tipo I: lentas, rojas y resistentes, con mucha mioglobina y mitocondrias; sostienen la postura.
5. `[sb·explaining | fibers]` Tipo II: rápidas y blancas. Dan mucha potencia, pero se agotan pronto.

**3.2 · Adentro de la fibra**
6. `[sb·explaining | sarco]` Dentro de la fibra hay unidades llamadas sarcómeros, con filamentos de actina y de miosina.
7. `[sb·explaining | sarco]` El impulso nervioso libera calcio (Ca²⁺), la cabeza de miosina se engancha a la actina y tira.
8. `[sb·happy | sarco]` Es como remeros jalando una cuerda: los filamentos se deslizan y el músculo se acorta.

**3.3 · La fábrica de energía**
9. `[sb·explaining | factory]` Tirar cuesta energía. La moneda de esta fábrica es el ATP: se gasta cada vez que la miosina tira.
10. `[sb·neutral | factory]` El ATP se fabrica de nuevo a partir del glucógeno, el combustible guardado en el músculo, usando oxígeno.
11. `[sb·neutral | fibers]` El oxígeno llega por la sangre y lo guarda la mioglobina, como un pequeño tanque dentro de la fibra.
12. `[sb·worried | factory]` Sin pausas, la bodega de glucógeno se vacía y el ATP escasea. Resultado: fatiga y lesión.

### Capítulo 4 · "La geometría del cuerpo" (Postura) — bg `gimnasio`
**4.1 · ¿Qué es la postura?**
1. `[narrator | none]` Para comparar, se teletransportan a un gimnasio. Una levantadora de pesas revisa su técnica frente al espejo.
2. `[sb·explaining | posture_n]` La postura es la alineación de los segmentos del cuerpo en el espacio durante una actividad.
3. `[sb·neutral | posture_n]` Cuando es correcta, la carga se reparte y los músculos trabajan sin exceso.

**4.2 · Tres formas de clasificarla**
4. `[sb·explaining | posture_all]` Se clasifica de tres maneras: por posición, por tiempo de exposición y por tipo de movimiento.
5. `[sb·neutral | posture_all]` Por posición: de pie (bípeda), sentada (sedente) o en cuclillas.
6. `[sb·neutral | posture_f]` Por tiempo: mantenida, más de 2 horas seguidas; o prolongada, más del 75 % de la jornada.
7. `[sb·neutral | posture_o]` Por movimiento: neutra o de confort; forzada, cerca de los extremos articulares; y antigravitatoria, con los brazos sobre los hombros.

**4.3 · Carlos frente al espejo**
8. `[narrator | none]` El espejo del gimnasio muestra el reflejo de Carlos trabajando en la bodega.
9. `[sb·worried | posture_f]` Mira: tronco flexionado, giro de cintura y caja lejos del cuerpo… durante ocho horas. Postura forzada y mantenida.
10. `[carlos·tired | posture_f]` Yo nunca lo noté. No me dolía mientras lo hacía…
11. `[sb·alert | posture_f]` Reflexión: una mala postura no duele hoy, duele en meses. Corregirla a tiempo previene lesiones de espalda, hombros y cuello.

### Capítulo 5 · "El reloj que no descansa" (Movimiento) — bg `linea_reloj`
**5.1 · ¿Qué es el movimiento?**
1. `[narrator | none]` 2:00 p. m. Un reloj gigante marca cada gesto. Carlos toma una caja, gira, la deja. Toma otra, gira, la deja.
2. `[sb·explaining | shoulder]` Movimiento es el cambio de posición de los segmentos del cuerpo: los músculos tiran de los huesos y las articulaciones lo permiten.
3. `[sb·neutral | arm_cycle]` Los movimientos básicos son flexión, extensión, rotación, y separar o acercar el segmento al cuerpo.

**5.2 · Cuando el movimiento se repite**
4. `[sb·alert | reps]` Si el mismo movimiento se repite en ciclos de menos de 30 segundos, o más de la mitad del ciclo es igual, es trabajo repetitivo.
5. `[sb·worried | reps]` Con un ciclo de 10 segundos, Carlos repite su gesto unas 2.880 veces en un turno de 8 horas.
6. `[sb·worried | wrist]` Cada repetición deja un microdaño en tendones y vainas. Sin descanso se acumula: tenosinovitis, túnel del carpo, epicondilitis.
7. `[carlos·tired | wrist]` Entonces no es un golpe ni una caída… es el mismo gesto, una y otra vez.

**5.3 · Cómo frenar el desgaste**
8. `[sb·happy | prevent]` Buenas noticias: se previene. Rotar de puesto, rediseñar herramientas y mandos, y hacer micropausas activas.
9. `[sb·neutral | prevent]` Cambiar de tarea reparte el esfuerzo entre distintos músculos y deja recuperar a los cansados.

### Capítulo 6 · "El peso de la verdad" (Carga) — bg `zona_carga`
**6.1 · ¿Qué es una carga?**
1. `[narrator | none]` 5:00 p. m. Regresan a la zona de carga, donde empezó todo.
2. `[sb·explaining | load]` Carga es cualquier peso que el cuerpo levanta, baja, empuja, tira o sostiene. En manejo manual se considera desde 3 kg.

**6.2 · Los límites**
3. `[sb·neutral | limits]` En Colombia, la Resolución 2400 de 1979 fija 25 kg para hombres y 12,5 kg para mujeres.
4. `[sb·neutral | limits]` Internacionalmente, la norma ISO 11228-1 y la ecuación NIOSH parten de 23 kg, pero solo en condiciones ideales.
5. `[carlos·neutral | limits]` Entonces mis 15 kilos están dentro del límite…
6. `[sb·alert | limits]` ¡Ahí está el giro de la historia! Con mala postura, torsión y miles de repeticiones, 15 kg pueden ser demasiado.

**6.3 · Levantar sin lesionarse**
7. `[sb·happy | lift_bad]` Aprendamos a levantar bien. Primero, lo que NO se debe hacer: espalda encorvada y carga lejos del cuerpo.
8. `[sb·alert | lift_twist]` Tampoco girar el tronco con la carga en las manos: la torsión castiga los discos.
9. `[sb·explaining | lift_good]` Técnica segura: pies al ancho de los hombros, rodillas flexionadas y espalda recta.
10. `[sb·explaining | lift_good]` Agarra firme, pega la caja al cuerpo, levanta con la fuerza de las piernas y, para girar, mueve los pies, no la cintura.

### Capítulo 7 · "El diagnóstico" (Cierre de la historia) — bg `sala_reunion`
1. `[narrator | none]` Sala de reuniones de Seguridad y Salud en el Trabajo.
2. `[sb·explaining | back_load]` Resumamos el caso: Carlos combina trabajo dinámico y estático, con postura forzada y un movimiento repetido miles de veces.
3. `[sb·worried | disc]` Su columna lumbar, de movilidad limitada, recibe carga, torsión y repetición. El riesgo: lumbalgia y hernia discal.
4. `[carlos·tired | disc]` ¿Y ahora qué hago, Señora Biomecánica?
5. `[sb·alert | none]` Ahora te toca a ti, detective. Demuestra que entendiste cada estación y salva la espalda de Carlos.
6. `[sb·happy | none]` Cada misión superada devuelve salud a su espalda. ¡Comencemos!

→ Aquí termina la historia (`story.done = true`) y se ofrece **"🎮 Ir a las misiones"**.

## 9. Parte 2 — MISIONES, Reto Final y Epílogo

**`missionsIntro`** (bg `sala_reunion`, 3 líneas): `[sb·happy]` "Bienvenido/a a la Sala de Misiones. La espalda de Carlos está al 10 % de salud." · `[sb·explaining]` "Cada misión que superes le devuelve energía." · `[sb·alert]` "Cuando llegue al 100 %, habremos resuelto el caso."

**Mapa de misiones:** 6 nodos + 🏭 Caso de Carlos, con el medidor "Espalda de Carlos" arriba. Desbloqueo secuencial (con `?docente=1` todo abierto).

**Cada misión** (reutilizar los juegos y datos existentes, NO cambiarlos):
| # | Título | Motor | Frase inicial de la Señora Biomecánica |
|---|---|---|---|
| 1 | Trabajo muscular | `classify` | "Clasifica cada situación como trabajo estático o dinámico." |
| 2 | Sistema óseo | `match` | "Empareja cada articulación con su tipo y su arco de movilidad." |
| 3 | Sistema muscular | `order` | "Ordena los pasos de la contracción muscular." |
| 4 | Postura | `choice` | "Encuentra el puesto de trabajo con la peor postura." |
| 5 | Movimiento | `multi` | "Elige solo las medidas de prevención eficaces." |
| 6 | Carga | `choiceSvg` | "Encuentra el levantamiento correcto." |

Encabezado de cada misión: sprite pequeño de `sb` + su frase + miniatura de una lámina relacionada (opcional: 1 → arm_cycle, 2 → skeleton, 3 → sarco, 4 → posture_all, 5 → wrist, 6 → lift_cycle/lift_good). Puntuación y "Ver respuesta tras 2 errores" como en la v2.

**Reto Final — Caso de Carlos:** usar las 4 tarjetas existentes (textarea opcional "Escribe tu hipótesis" + botón "Ver la respuesta de la Señora Biomecánica"). Agregar a las respuestas 1 y 4: *"Aunque 15 kg no superan el límite de 25 kg de la Res. 2400, la repetición, la postura forzada y la ausencia de pausas reducen el peso seguro (ecuación NIOSH)."* Mostrar debajo de la respuesta 3 la lámina `disc_herniation` (si existe).

**Epílogo (`final`, bg `bodega_manana`):** `[carlos·relieved]` "Gracias, Señora Biomecánica. Ahora entiendo qué le pasaba a mi cuerpo." · `[sb·happy]` "Recuerda: el movimiento se cuida con conocimiento. ¡Misión cumplida!" → puntaje /140, mensaje según rango, 6 ideas clave, referencias normativas (Res. 2400/1979, Decreto 1072/2015, GTC 45, ISO 11228-1, NIOSH, Directiva 90/269/CEE), botones "Volver a ver la historia", "Volver al mapa", "Reiniciar".

## 10. Glosario (chips y enlaces internos)

Ventana emergente accesible (`<dialog>` o div modal, cierra con Esc y clic fuera). Entradas (1 línea cada una):
- **Trabajo estático:** el músculo se contrae sin cambiar de longitud (isométrico); comprime capilares y fatiga rápido.
- **Trabajo dinámico:** ciclos de contracción y relajación; actúa como bomba muscular.
- **Isquemia / Hipoxia:** falta de riego sanguíneo / falta de oxígeno en el tejido.
- **Sinartrosis:** articulación fija (suturas del cráneo).
- **Anfiartrosis:** articulación semimóvil (discos intervertebrales, sínfisis púbica).
- **Diartrosis:** articulación móvil o sinovial (hombro, cadera, rodilla).
- **Arco de movilidad:** ángulo, en grados, que una articulación puede recorrer.
- **Mioglobina:** proteína que almacena oxígeno en el músculo.
- **ATP:** molécula que entrega la energía inmediata para la contracción.
- **Glucógeno:** reserva de glucosa del músculo, para rehacer ATP.
- **Actina y miosina:** filamentos que se deslizan y acortan el sarcómero.
- **Ecuación NIOSH:** método que calcula el peso máximo recomendado según las condiciones del levantamiento (23 kg en condiciones ideales).
- **Postura forzada / mantenida / antigravitatoria:** cerca del extremo articular / más de 2 h continuas / brazos sobre los hombros.
- **Trabajo repetitivo:** ciclos < 30 s, o > 50 % del ciclo con la misma secuencia de movimientos.
Chips sin entrada en el glosario: mostrar tooltip con la leyenda del visual.

## 11. Estilo visual "dibujo / cómic" (CSS)

- Paleta: `--ink:#1b1b2f` (contornos), `--paper:#fffdf7`, `--sky:#8ecae6`, `--sun:#ffb703`, `--coral:#ef476f`, `--mint:#06d6a0`, `--bg:#f1f5f9`.
- **Contorno grueso** (3 px `--ink`) y **sombra desplazada** dura (`box-shadow: 4px 4px 0 var(--ink)`) en tarjetas, botones, panel holográfico y caja de diálogo.
- Fondo de páginas con **trama de puntos (halftone)** sutil con `radial-gradient`.
- Caja de diálogo con "cola" de globo (pseudo-elemento) apuntando al sprite; etiqueta de nombre en una pestaña coloreada (SB azul, Carlos naranja, Narrador gris oscuro).
- Botones tipo cómic: bordes redondeados, hover con leve rotación (`rotate(-1deg)`).
- Título de bienvenida con animación letra a letra y rebote; tarjeta de capítulo con barrido diagonal.
- Todo en unidades relativas; tamaños base 16–18 px; botones ≥ 44 px.

## 12. Voz y accesibilidad

- **Voz** (Web Speech API): apagada por defecto; interruptor 🔊. Al mostrar un beat de `sb` o `carlos`: `speak(texto)` con `lang='es-CO'` → si no hay, cualquier `es-*` → si no hay, ocultar el botón. `sb`: pitch 1.1, rate 0.95; `carlos`: pitch 0.8. Sin voz para `narrator` (o voz neutra si se desea). Quitar etiquetas HTML antes de leer. Cargar voces con `voiceschanged`. `speechSynthesis.cancel()` al retroceder, saltar, cambiar de pantalla o cerrar.
- Botones reales, foco visible, `aria-live="polite"` en la caja de diálogo, `alt` en cada imagen, contraste ≥ 4.5:1.
- `prefers-reduced-motion`: efecto de escritura instantáneo; sin idle, sin zoom/shake/pulse, sin barrido de capítulo; los `frames` no alternan (se muestra el primero).

## 13. Fases de implementación (en este orden, con puntos de control)

1. **Backup** (`backup/index_v2.html`) y **separar archivos** (sección 1) sin cambiar el comportamiento. ✔ *Control: la app v2 sigue funcionando.*
2. **`core.js`:** estado v3, Storage, cargador de imágenes en cascada, `go()`, temporizadores.
3. **Motor de historia** (`story.js`) con layout, caja de diálogo, escritura, sprites con fallback, panel holográfico con fallback, tarjeta de capítulo, modo película. Probar con el Prólogo. ✔ *Control: el prólogo se reproduce completo sin imágenes.*
4. **`data-story.js`:** volcar TEXTUALMENTE la sección 7 (VISUALS) y la sección 8 (guion). ✔ *Control: se puede recorrer toda la historia de punta a punta, con tarjetas de reemplazo.*
5. **Bienvenida animada + menú de capítulos + barra de navegación + glosario.**
6. **Misiones:** `missionsIntro`, mapa con medidor, encabezado de misión, integración de los 6 juegos existentes.
7. **Reto Final + Epílogo.**
8. **Estilo cómic** (sección 11) y **responsive** móvil.
9. **Voz** (sección 12).
10. **Imágenes:** copiar los archivos a `assets/` con los nombres del contrato (sección 6) y verificar; probar también renombrando la carpeta para comprobar los fallbacks.
11. **README.md** y checklist.

*Si el tiempo apremia, recortar en este orden (de menos a más importante):* voz → modo película → glosario → estilo cómic avanzado → animaciones `zoom/shake`. **No recortar:** historia completa antes de las misiones, panel de ilustraciones sincronizado, 2–3 pantallas por estación, misiones con los 6 juegos, Caso de Carlos, título y botón obligatorios.

## 14. Contingencias y checklist

| Riesgo | Solución requerida |
|---|---|
| Falta una imagen o carpeta `assets/` | Cascada de extensiones → fallback (avatar SVG, gradiente, tarjeta de reemplazo). Nunca ícono de imagen rota ni error en consola que detenga la app. |
| Archivos con mayúsculas/espacios/tildes | Solo minúsculas, sin espacios ni tildes; la cascada usa exactamente los nombres del contrato. |
| GitHub Pages: rutas | Solo rutas relativas; `index.html` en la raíz del repositorio. |
| Abrir el `.zip` sin descomprimir | Advertir en el README: descomprimir antes de abrir `index.html`. |
| Imágenes con fondo blanco sobre el panel | `mix-blend-mode: multiply` sobre fondo crema; si el navegador no lo soporta, se ve un recuadro blanco (aceptable). |
| Sprites con fondo sólido (no transparente) | No hay solución por código; deben ser PNG transparentes (ver guía de imágenes). |
| Timers (escritura, `frames`, autoplay, voz) | Registrar en `SB.timers`; limpiar en cada cambio de beat/pantalla/capítulo. |
| Doble clic mientras escribe | 1.er clic completa; 2.º avanza; ignorar clics durante transiciones. |
| Modo película + voz desincronizados | Con voz activa, esperar `onend`; si no dispara en 15 s, continuar. |
| Móvil vertical | Layout de la sección 5.1; `dvh` con fallback a `vh`; textos con `overflow-wrap:anywhere`. |
| Rendimiento con muchas imágenes | Precargar solo el siguiente capítulo; animar solo `transform`/`opacity`. |
| `localStorage` bloqueado o corrupto | `try/catch` y validación; seguir en memoria. |
| Doble puntuación | `award()` ignora estaciones ya completadas. |
| Alguien intenta saltarse la historia | `confirm()` y `?docente=1`; los puntos solo se otorgan en misiones. |
| Error JS inesperado | `window.onerror` → mensaje amable "Algo salió mal, recarga la página". |
| Símbolos (Ca²⁺, °, ≥) | Unicode directo. Sin LaTeX. |

**Checklist de aceptación:**
- [ ] Abre con doble clic sin errores de consola, con y sin `assets/`.
- [ ] Título animado exacto + botón "Comenzar la ruta" en la bienvenida.
- [ ] La historia completa (Prólogo + Caps. 1–6 + Cierre) se recorre SIN preguntas ni juegos.
- [ ] Cada estación tiene 2–3 pantallas con subtítulo y su escenario propio.
- [ ] Mientras la Señora Biomecánica explica, el panel muestra la ilustración correspondiente (brazo/pierna/espalda/capilar/sarcómero…), con alternancia de frames donde está definido.
- [ ] Los chips abren el glosario; el menú de capítulos permite saltar entre capítulos.
- [ ] Modo película avanza solo; voz opcional funciona o queda oculta.
- [ ] Misiones bloqueadas hasta terminar la historia (o `?docente=1`); los 6 juegos funcionan; medidor 10 %→100 %; máximo 140 puntos.
- [ ] Caso de Carlos con las 4 respuestas argumentadas (incluye nota NIOSH).
- [ ] Normas correctas (Res. 2400/1979, Decreto 1072/2015, GTC 45, ISO 11228-1, NIOSH, Directiva 90/269/CEE). No se cita la Res. 156/2005 como norma de peso.
- [ ] Se ve bien a 360 px y a 1280 px; funciona con teclado y toque.
- [ ] Publicable como `.zip` y en GitHub Pages (rutas relativas, nombres en minúsculas).

### Cobertura de la rúbrica

| Requisito | Dónde se cumple |
|---|---|
| Título fijo animado | Bienvenida |
| Botón "Comenzar la ruta" | Bienvenida |
| Señora Biomecánica protagonista y guía | Sprites y diálogo en toda la historia y las misiones |
| Entornos narrativos + conflicto | 8 escenarios + caso de Carlos + medidor de espalda |
| Hipervínculos internos, navegación, íconos interactivos | Menú de capítulos, barra superior, chips, glosario, mapa de misiones |
| Elementos animados / esquemas | Panel holográfico con frames, pulso, zoom, contador |
| Audio narrado (opcional) | Voz del navegador |
| 6 estaciones con 2–3 pantallas | Capítulos 1–6 con 3 pantallas cada uno |
| Contenidos de cada estación | Sección 8 (historia) + misiones (sección 9) |
| Reto final con 4 preguntas argumentadas | Sección 9 |

---

### Nota para el equipo (no para el agente)
- Verifiquen en su guía los **artículos exactos** de la Res. 2400/1979 sobre carga y los umbrales de postura mantenida/prolongada (2 h y 75 %); ajústenlos solo en `data-story.js` / `data-quiz.js`.
- Las láminas anatómicas generadas con IA pueden traer errores de anatomía: revísenlas contra su material del curso antes de usarlas.
- Para entregar: comprimir la carpeta completa en `.zip` o subirla a GitHub y activar Pages (Settings → Pages → rama `main`, carpeta `/root`).
