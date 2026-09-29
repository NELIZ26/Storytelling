# SPEC v2 — De "quiz con menú" a "novela visual" (storytelling estilo anime)

> **Instrucción para el agente (Antigravity):** Ya existe un `index.html` funcional (motores de minijuego, puntuación, persistencia, mapa, Caso de Carlos). **NO lo reescribas desde cero.** Haz una ACTUALIZACIÓN incremental siguiendo las fases de la sección 12. Conserva y reutiliza: `award()`, `Storage`, los 5 motores (`engineClassify`, `engineMatch`, `engineOrder`, `engineChoice`, `engineChoiceSvg`, `engineMulti`) y el `CONTENT` existente. Antes de empezar, copia el archivo actual a `index_v1_backup.html`. Si algo es ambiguo, elige lo MÁS SIMPLE. Al terminar, ejecuta el checklist de la sección 13.

---

## 0. Por qué esta versión

La rúbrica del curso exige **storytelling**: personaje protagonista, **escenarios ambientados** (cuerpo humano, fábrica, gimnasio), un **conflicto dinámico que se resuelve al avanzar**, **2–3 pantallas por estación**, hipervínculos internos, íconos interactivos y elementos animados. La v1 cumple la parte técnica pero se ve como un cuestionario. La v2 la convierte en una **novela visual (visual novel)**: personaje grande con expresiones, fondos por escena, cuadro de diálogo con efecto de escritura, y una historia con hilo conductor.

**Alcance realista:** no es un video anime real; es una experiencia tipo novela visual con estética anime (personaje ilustrado con expresiones + fondos + animaciones). Es lo mejor que cabe en una web simple sin editar video.

## 1. La historia (hilo conductor)

**Conflicto:** *Carlos*, operario de la bodega "Almacén Andino", termina su turno con la espalda destrozada. Trabaja 8 h cargando cajas de 15 kg, con mala postura y repitiendo el mismo movimiento. La **Señora Biomecánica** llega a investigar el caso.

**Misterio central:** "15 kg no superan el límite legal… ¿entonces por qué le duele tanto?" (respuesta: postura + torsión + repetición + falta de pausas).

**Mecánica que resuelve el conflicto poco a poco:**
- **Medidor "Espalda de Carlos"** en el HUD (barra roja→verde). Empieza en 10 %. Fórmula: `meter = round(10 + 60*(estacionesCompletadas/6) + 30*(tarjetasCarlosReveladas/4))` → llega a 100 % al resolver el caso.
- **Pistas:** al completar el desafío de cada estación se desbloquea una **Pista** que se guarda en el "📁 Expediente de Carlos" (botón en el HUD que abre una lista). Las 6 pistas se usan en el Reto Final.
- **Antagonista simple:** la "Fatiga Silenciosa" (una nube gris pequeña animada que aparece en algunas escenas y desaparece al final). Es decorativo, no requiere lógica.

**Personajes:**
- **Señora Biomecánica** (`sb`): protagonista y guía. Mujer profesional (~40 años), cabello recogido en moño, gafas, chaleco/bata azul con detalles amarillos de seguridad. Voz cálida, didáctica, un poco dramática.
- **Carlos** (`carlos`): operario de ~35 años, camiseta gris, faja lumbar mal puesta. Expresiones: cansado, neutral, aliviado.
- **Narrador** (`narrator`): texto de contexto en cursiva, sin sprite.

**Diseño original:** que NO imite ningún personaje anime existente.

## 2. Stack y restricciones

- Sigue siendo **HTML + CSS + JS vanilla**, sin librerías, sin CDN, sin `type="module"`, sin `fetch`.
- Estructura: `index.html` + carpeta `assets/` (imágenes opcionales, ver sección 8). Debe funcionar abriendo `index.html` con doble clic. Las imágenes se referencian con **rutas relativas**.
- **Toda imagen debe tener fallback** (SVG/CSS): si `assets/` no existe o falla la carga, la app sigue viéndose bien.
- Idioma: español. Sin `<form>`.

## 3. Modelo de datos (nuevo `CONTENT`)

Cada estación pasa de `sections[]` a **3 pantallas**:

```js
station = {
  id, emoji, title,
  bg: 'bodega_manana',            // clave de escena (sección 7)
  screens: [
    { type:'story',   beats:[ {who:'sb'|'carlos'|'narrator', mood:'neutral|explaining|happy|worried|alert|thinking|tired|relieved', text:'...'} ] },
    { type:'explore', widget:'flowToggle'|'joints'|'sarcomere'|'posture'|'repCounter'|'liftSteps', beat:{...}, ficha:['...html...'] },
    { type:'game',    game:{...existente...}, clue:'Pista N: ...' }
  ]
}
```

- `ficha` = las `sections` técnicas que ya existen en la v1 (se conservan) mostradas en un bloque colapsable **"📋 Ficha técnica"** dentro de la pantalla `explore`. Así hay narrativa Y rigor técnico.
- `game` = el objeto `game` que ya existe (no cambiar sus datos).
- El diálogo (`beats`) va SIEMPRE separado de la lógica, dentro de `CONTENT`.

## 4. Motor de escenas (nuevo, el corazón de la v2)

**Layout de una pantalla `story`:**
```
┌───────────── #scene (aspect-ratio 16/9, fondo por escena) ─────────────┐
│  [props animados]                        [sprite del personaje]        │
│                                                                        │
│  ┌──────────────── #dialogue (caja inferior) ───────────────────────┐  │
│  │ ▌Nombre                                         ▼ (indicador)     │  │
│  │ texto con efecto de escritura...                                  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
   [◀ Atrás]   [Saltar ⏭]   [🔊 Voz]   ● ● ○ (progreso de la escena)
```

**Comportamiento:**
1. `playScene(beats, onEnd)` recorre los beats uno por uno.
2. **Efecto de escritura** (~25 ms por carácter). Clic/toque en la escena, `Espacio`, `Enter` o `→`: si el texto aún se está escribiendo → lo completa; si ya terminó → pasa al siguiente beat. `←` retrocede un beat.
3. Al cambiar de hablante: el sprite de `sb` entra deslizando desde la izquierda; el de `carlos` desde la derecha; el `narrator` oculta ambos y muestra el texto en cursiva sobre fondo oscuro translúcido.
4. Cambiar `mood` = cambiar la imagen del sprite (mismo tamaño y posición) con un pequeño "pop".
5. Animación "idle": el sprite del hablante sube y baja 4 px suavemente (CSS `@keyframes bob`, solo `transform`).
6. Al terminar el último beat: aparece el botón **"Continuar ▶"** (lleva a la pantalla `explore`).
7. Botón **"Saltar ⏭"** salta directo al último beat.
8. Los timers (`setInterval/setTimeout`) SE LIMPIAN al cambiar de pantalla (ver contingencias).

**Transición entre escenas:** fundido a negro 300 ms (CSS `opacity`).

## 5. Pantalla `explore` (widgets interactivos con animación)

Estructura: un beat corto de la Señora Biomecánica (avatar pequeño + globo) + el **widget** + `📋 Ficha técnica` colapsable + botón "Ir al desafío ▶". Todos los widgets son SVG + CSS animado + JS mínimo. **Ninguno bloquea el avance** (el botón "Ir al desafío" siempre está activo).

| Widget | Estación | Qué hace |
|---|---|---|
| `flowToggle` | 1 | Interruptor **Estático / Dinámico** sobre un músculo con un capilar en SVG. *Estático:* el capilar se aprieta, los glóbulos rojos casi se detienen y una barra de "Fatiga" sube. *Dinámico:* el músculo se contrae/relaja rítmicamente, los glóbulos fluyen, la barra de fatiga sube muy lento. |
| `joints` | 2 | 4 chips: **Hombro, Rodilla, Lumbar, Cráneo**. Al elegir uno se muestra su tipo (diartrosis / anfiartrosis / sinartrosis) y un **control deslizante de grados** que gira un segmento SVG y dibuja el **arco de movilidad** con el número de grados en vivo (Hombro 0–180°, Rodilla 0–135°, Lumbar flexión 0–60°, Cráneo 0° "sin movimiento"). Marca el límite normal con una línea. |
| `sarcomere` | 3 | Botón **"⚡ Enviar impulso nervioso"**: anima en secuencia (1 impulso → 2 Ca²⁺ aparece → 3 miosina se une y baja el contador de ATP → 4 filamentos se deslizan → 5 sarcómero se acorta). Debajo, tarjeta de **analogía de la fábrica**: ATP = monedas · glucógeno = bodega de combustible · mitocondria = planta de energía · mioglobina = tanque de oxígeno · Ca²⁺ = interruptor. |
| `posture` | 4 | 3 pestañas (Neutra · Forzada · Antigravitatoria), cada una con una silueta SVG y 3 etiquetas de clasificación (posición / tiempo / movimiento) + ejemplo laboral y deportivo. Cierra con la **reflexión** sobre prevención de lesiones. |
| `repCounter` | 5 | Control deslizante **"Segundos por ciclo"** (5–60 s, por defecto 10). Calcula en vivo: repeticiones por hora `3600/ciclo` y por turno de 8 h `28800/ciclo`. Insignia roja "⚠ Trabajo repetitivo" si ciclo < 30 s, verde si ≥ 30 s. Un icono de mano/caja anima al ritmo del ciclo. |
| `liftSteps` | 6 | **Infografía interactiva "¿Cómo levantar una caja?"**: 5 pasos con botones ◀ ▶ y una silueta SVG que cambia de pose (de pie → en cuclillas → levantando). Debajo, tabla de **límites legales** (ver contenido). |

Regla de simpleza: si un widget se complica, se entrega su versión mínima (etiquetas + una animación CSS), pero el widget debe existir en las 6 estaciones.

## 6. Guion completo (usar TEXTUALMENTE)

**Formato:** `[quién · mood] texto`. Máximo ~170 caracteres por beat.

### Prólogo (escena `bodega_tarde`) — después de "Comenzar la ruta"
1. `[narrator] Almacén Andino, 5:40 p. m. Ocho horas de turno. Una caja más… y Carlos se detiene.`
2. `[carlos · tired] Ay, mi espalda… La siento como una piedra y los brazos me tiemblan.`
3. `[sb · alert] Buenas tardes, Carlos. Soy la Señora Biomecánica. Me llamaron porque tu cuerpo lleva horas enviando señales de alarma.`
4. `[carlos · neutral] ¿Señales? Yo solo cargo cajas de 15 kilos. No es tanto…`
5. `[sb · thinking] Ese es el misterio: 15 kg no superan el límite legal, pero algo en tu forma de trabajar te está desgastando.`
6. `[sb · happy] Vamos a investigarlo por dentro. Cada estación te dará una pista para el expediente de Carlos. ¿Me ayudas, detective?`
→ Al terminar: se muestra el **mapa** (nodos con estilo de camino) y el medidor en 10 %.

### Estación 1 · Trabajo muscular (escena `bodega_manana`)
- Story:
  1. `[narrator] Flashback: 7:00 a. m. Carlos sostiene una caja frente al pecho mientras espera el montacargas.`
  2. `[sb · explaining] Mira sus brazos: no se mueven, pero los músculos trabajan a tope. Eso es trabajo estático: tensión sostenida sin cambiar de longitud.`
  3. `[sb · worried] Al mantenerse apretado, el músculo aplasta sus propios capilares. Llega menos oxígeno, se acumula ácido láctico… y aparece la fatiga.`
  4. `[carlos · tired] Por eso me cansa más esperar con la caja que caminar con ella.`
  5. `[sb · happy] Exacto. Al caminar o pedalear el trabajo es dinámico: el músculo se contrae y se relaja, y bombea la sangre. Veámoslo de cerca.`
- Explore: `flowToggle`. Beat: `[sb · explaining] Cambia el interruptor y observa qué pasa con la sangre.`
- Game: `classify` (existente). **Pista 1:** *"Carlos sostiene cargas sin moverse: trabajo estático y fatiga rápida."*

### Estación 2 · Sistema óseo (escena `interior_cuerpo`)
- Story:
  1. `[narrator] La Señora Biomecánica activa su lupa y se reducen hasta entrar en el cuerpo de Carlos.`
  2. `[sb · explaining] Bienvenido al sistema óseo: 206 huesos que sostienen, protegen y funcionan como palancas cuando los músculos tiran de ellos.`
  3. `[sb · neutral] Los huesos se unen en articulaciones: fijas (sinartrosis) como el cráneo, semimóviles (anfiartrosis) como los discos entre vértebras, y móviles (diartrosis) como hombro y rodilla.`
  4. `[sb · worried] Cuidado con la zona lumbar: L4-L5 y L5-S1 son semimóviles y cargan casi todo el peso de Carlos.`
  5. `[sb · thinking] Cada articulación tiene un arco de movilidad: cuántos grados puede recorrer. Probémoslo.`
- Explore: `joints`. Beat: `[sb · happy] Elige una articulación y mueve el control para medir su arco.`
- Game: `match` (existente). **Pista 2:** *"La zona lumbar (L4-L5, L5-S1) es semimóvil y soporta la mayor parte de la carga."*

### Estación 3 · Sistema muscular (escena `fabrica_energia`)
- Story:
  1. `[narrator] Siguen hasta un músculo del brazo. Por dentro parece… ¡una fábrica!`
  2. `[sb · explaining] Hay tres tipos de músculo: esquelético (voluntario), cardíaco y liso (involuntarios). A Carlos le duele el esquelético.`
  3. `[sb · neutral] Sus fibras son de dos clases: las lentas (tipo I), rojas y resistentes, ricas en mioglobina que guarda el oxígeno; y las rápidas (tipo II), potentes pero que se agotan pronto.`
  4. `[sb · explaining] La orden llega por el nervio, se libera calcio y la miosina se agarra a la actina y jala, como remeros tirando de una cuerda.`
  5. `[sb · worried] La energía es el ATP, la moneda de la fábrica. Se fabrica de nuevo a partir del glucógeno. Sin pausas, la bodega de combustible se vacía.`
- Explore: `sarcomere`. Beat: `[sb · happy] Pulsa el botón y mira cómo se contrae una fibra.`
- Game: `order` (existente). **Pista 3:** *"Sin pausas se agota el glucógeno y el ATP: el músculo se fatiga y se lesiona."*

### Estación 4 · Postura (escena `gimnasio`)
- Story:
  1. `[narrator] Para comparar, se teletransportan a un gimnasio. Una levantadora de pesas prepara su técnica.`
  2. `[sb · explaining] La postura es la alineación de los segmentos del cuerpo en el espacio. Se clasifica de tres maneras.`
  3. `[sb · neutral] Por posición: de pie (bípeda), sentada (sedente) o en cuclillas. Por tiempo: mantenida (más de 2 horas seguidas) o prolongada (más del 75 % de la jornada).`
  4. `[sb · neutral] Por movimiento: neutra (cómoda), forzada (cerca de los extremos articulares) o antigravitatoria (brazos por encima de los hombros).`
  5. `[sb · worried] La deportista mantiene una postura neutra. Carlos, en cambio, trabaja agachado, con el tronco flexionado y girando… ocho horas.`
  6. `[sb · alert] Reflexión: una mala postura no duele hoy, duele en meses. Corregirla a tiempo previene lesiones de espalda, hombro y cuello.`
- Explore: `posture`. Beat: `[sb · happy] Compara las tres posturas y fíjate en qué eje se clasifica cada una.`
- Game: `choice` (existente). **Pista 4:** *"Carlos trabaja en postura forzada, con flexión y torsión del tronco, durante horas."*

### Estación 5 · Movimiento (escena `linea_reloj`)
- Story:
  1. `[narrator] 2:00 p. m. Un reloj gigante marca cada gesto. Carlos toma una caja, gira, la deja. Toma otra, gira, la deja.`
  2. `[sb · explaining] Movimiento es el cambio de posición de los segmentos del cuerpo: los músculos tiran de los huesos y las articulaciones lo permiten (flexión, extensión, giro…).`
  3. `[sb · alert] Si el mismo movimiento se repite en ciclos de menos de 30 segundos, o más de la mitad del ciclo es igual, es trabajo repetitivo.`
  4. `[sb · worried] Cada repetición causa un microdaño en tendones y vainas. Sin descanso se acumula: tenosinovitis, síndrome del túnel del carpo, epicondilitis.`
  5. `[carlos · tired] ¿Y yo qué puedo hacer?`
  6. `[sb · happy] Rotar de puesto, mejorar herramientas y mandos, y hacer micropausas activas. Mira cuántas veces repite Carlos su gesto.`
- Explore: `repCounter`. Beat: `[sb · thinking] Cambia los segundos por ciclo y mira cuántas repeticiones acumula en el turno.`
- Game: `multi` (existente). **Pista 5:** *"Carlos repite el mismo ciclo miles de veces por turno: microtraumatismos acumulativos."*

### Estación 6 · Carga (escena `zona_carga`)
- Story:
  1. `[narrator] 5:00 p. m. Regresan a la zona de carga, donde empezó todo.`
  2. `[sb · explaining] Carga es cualquier peso que el cuerpo levanta, baja, empuja, tira o sostiene. En manejo manual se considera carga desde 3 kg.`
  3. `[sb · neutral] En Colombia, la Resolución 2400 de 1979 fija 25 kg para hombres y 12,5 kg para mujeres. Internacionalmente, ISO 11228-1 y la ecuación NIOSH parten de 23 kg en condiciones ideales.`
  4. `[carlos · neutral] Entonces mis 15 kilos están dentro del límite…`
  5. `[sb · alert] ¡Ahí está el giro de la historia! Esos límites son para condiciones ideales. Con mala postura, torsión y miles de repeticiones, 15 kg pueden ser demasiado.`
  6. `[sb · happy] Aprendamos a levantar una caja sin lesionar la espalda.`
- Explore: `liftSteps`. Beat: `[sb · explaining] Avanza paso a paso y observa la postura correcta.`
  - Pasos: 1) Acércate a la caja y separa los pies al ancho de los hombros. 2) Flexiona las rodillas, mantén la espalda recta. 3) Agarra firme y pega la caja al cuerpo. 4) Levanta con la fuerza de las piernas, sin torcer el tronco. 5) Para girar, mueve los pies, no la cintura.
  - Tabla de límites: *Colombia (Res. 2400/1979)*: hombres 25 kg · mujeres 12,5 kg · *ISO 11228-1 / NIOSH*: 23 kg de referencia en condiciones ideales (se reduce por frecuencia, distancia, altura, torsión).
- Game: `choiceSvg` (existente). **Pista 6:** *"15 kg cumplen el límite legal, pero postura + torsión + repetición lo vuelven riesgoso."*

### Reto Final · El Caso de Carlos (escena `sala_reunion`)
- Story (antes de las tarjetas):
  1. `[narrator] Sala de reuniones de Seguridad y Salud en el Trabajo. El expediente de Carlos está completo.`
  2. `[sb · happy] Con nuestras seis pistas ya podemos resolver el caso. Respondamos las cuatro preguntas.`
- Luego mostrar el **📁 Expediente** (las 6 pistas) y las **4 tarjetas** existentes de Carlos. Mejora: cada tarjeta incluye un `<textarea>` **opcional** "Escribe tu hipótesis" ANTES del botón "Ver la respuesta de la Señora Biomecánica" (no se evalúa; sirve para el trabajo conjunto). Mantener las respuestas actuales, y **añadir a la respuesta 1 y 4** una frase: *"Aunque 15 kg no superan el límite de 25 kg de la Res. 2400, la repetición, la postura forzada y la ausencia de pausas reducen el peso seguro (ecuación NIOSH)."*

### Epílogo (escena `bodega_feliz`) — pantalla final
1. `[carlos · relieved] Gracias, Señora Biomecánica. Ahora entiendo qué le pasaba a mi cuerpo.`
2. `[sb · happy] Recuerda: el movimiento se cuida con conocimiento. ¡Misión cumplida!`
- Después: puntaje total (/140), mensaje según rango (existente), 6 ideas clave, referencias normativas, medidor de Carlos al 100 % en verde y botones "Volver al mapa" / "Reiniciar".

## 7. Escenas (fondos)

Cada escena es `{ key, img:'assets/bg_KEY.webp', fallback:'linear-gradient(...)', props:[...] }`. El fondo usa `<img>`/`background-image` y, si falla (`onerror`), cae al gradiente + props.

| key | Ambiente | Gradiente de respaldo | Props animados (emoji o SVG) |
|---|---|---|---|
| `bodega_tarde` | Bodega al atardecer | naranja→gris | 📦 apiladas, ☁️ gris (Fatiga Silenciosa) |
| `bodega_manana` | Bodega de mañana | celeste claro→beige | 📦, 🚜 |
| `interior_cuerpo` | Interior del cuerpo, tono anatómico | azul oscuro→violeta | 🦴, partículas flotantes |
| `fabrica_energia` | Interior de la fibra como fábrica | verde azulado→amarillo | ⚙️ girando, ⚡ parpadeando |
| `gimnasio` | Gimnasio | azul→gris | 🏋️, 🪞 |
| `linea_reloj` | Línea de bodega con reloj grande | gris→rojo tenue | 🕑 (agujas girando), 📦 en banda |
| `zona_carga` | Zona de carga y andenes | naranja→azul | 📦, 🚚 |
| `sala_reunion` | Sala de reuniones SST | azul→blanco | 📁, 📋 |
| `bodega_feliz` | Bodega soleada | amarillo claro→verde claro | ✨, 📦 |

Los props usan `animation` CSS suave (flotar, girar, parpadear), máximo 3 por escena, solo `transform`/`opacity`.

## 8. Arte del personaje (imágenes) — recomendado, con fallback

**Objetivo visual:** ilustración estilo anime/manga, colores planos y limpios.

**Sprites** (WebP con fondo transparente, ~600×900 px, ≤ 120 KB c/u), en `assets/`:
- Señora Biomecánica: `sb_neutral.webp`, `sb_explaining.webp` (dedo índice en alto), `sb_happy.webp`, `sb_worried.webp`, `sb_alert.webp` (señalando con seriedad), `sb_thinking.webp` (mano en la barbilla).
- Carlos: `carlos_tired.webp` (mano en la espalda), `carlos_neutral.webp`, `carlos_relieved.webp`.
- Fondos: `bg_<key>.webp` 1280×720, ≤ 150 KB c/u.

**Plantilla de prompt (si el IDE puede generar imágenes; si no, se generan aparte y se colocan en `assets/`):**
> "Anime-style full-body character, [DESCRIPCIÓN], flat colors, clean lineart, transparent background, same outfit, same proportions and same pose scale in every image, facing slightly right, expression: [MOOD]."
- Descripción `sb`: *Latina woman around 40, hair in a bun, round glasses, blue lab vest with yellow safety details, warm smile, holding a tablet.*
- Descripción `carlos`: *Latino man around 35, gray t-shirt, work pants, poorly fitted lumbar belt, short dark hair.*

**Fallback obligatorio sin imágenes:** reutilizar `AVATAR_SVG` de la v1 a tamaño grande (~180 px) y representar el `mood` con un cambio simple de la boca/cejas en el SVG o con un emoji-insignia (😊 😟 ❗ 🤔 😮‍💨). Carlos se representa con un SVG análogo (círculo de cabeza, camiseta gris). La app debe verse decente aunque `assets/` esté vacío.

**Precarga:** al entrar a una escena, precargar (`new Image()`) los sprites y el fondo de la siguiente escena para evitar parpadeos.

## 9. Narración por voz (opcional, recomendada por la rúbrica)

- Usar la **Web Speech API** (`speechSynthesis`), sin archivos de audio.
- Botón **"🔊 Narración: apagada/encendida"** en la bienvenida y en la barra de escena. **Por defecto APAGADA** (el usuario la activa con un clic, lo que además cumple la política de autoplay del navegador).
- Al mostrar cada beat de `sb`: `speak(texto)` con `lang='es-CO'`; si no hay voz `es-CO`, buscar cualquier voz `es-*`; si no hay ninguna, ocultar el botón sin mostrar error.
- Tono de la Señora Biomecánica: `pitch = 1.1`, `rate = 0.95`. Carlos: `pitch = 0.8`. Narrador: sin voz.
- `speechSynthesis.cancel()` al avanzar/retroceder/saltar y al cambiar de pantalla. Quitar etiquetas HTML del texto antes de leer. Las voces cargan de forma asíncrona: escuchar `voiceschanged` y reintentar seleccionar voz.
- Es un extra: si falla, la app sigue igual.

## 10. Navegación e hipervínculos internos (exigidos por la rúbrica)

- **Barra de navegación fija** (dentro del HUD): íconos 🏠 Mapa · 1️⃣…6️⃣ estaciones · 🏭 Caso de Carlos · 📁 Expediente. Cada ícono es un botón/enlace interno (`go(...)`): bloqueado si no está desbloqueado (candado + tooltip), activo si `?docente=1`.
- Dentro de cada estación: botones **◀ Estación anterior / Estación siguiente ▶** (respetan el bloqueo) y "Volver al mapa".
- Los términos clave en los diálogos y la ficha (ej. **diartrosis, ATP, NIOSH**) pueden ser **enlaces internos** a un mini-glosario emergente (`<dialog>` o div modal) con su definición de 1 línea. Mínimo 8 términos: estático, dinámico, diartrosis, anfiartrosis, sinartrosis, mioglobina, ATP, NIOSH.
- **Mapa:** mantener el existente pero rediseñado como camino (línea que une los nodos, el nodo actual pulsa con animación, el avatar pequeño de la Señora Biomecánica se ubica junto al nodo actual).

## 11. Estado, puntuación y persistencia (cambios)

- Nueva clave: `sb_progress_v2`. Ignorar datos de `v1`.
- Estado ampliado: `state = { screen, current, unlocked, completed, points, carlosDone, clues:[], screenIdx:0, voice:false }`.
- **Puntuación sin cambios:** 20 pts por minijuego (6×20 = 120) + 5 por tarjeta de Carlos (4×5 = 20) = **140**. La `award()` existente además guarda la pista en `state.clues` (una sola vez).
- Reiniciar (`confirm`) limpia todo, incluidas pistas y medidor.
- Al recargar la página, volver al **mapa** (no reanudar a mitad de escena).
- Continúan `?docente=1` y el modo sin bloqueo tras 2 errores ("Ver respuesta").

## 12. Fases de implementación (en este orden, con punto de control)

1. **Backup** del `index.html` actual como `index_v1_backup.html`.
2. **Motor de escenas:** `playScene`, caja de diálogo, efecto de escritura, teclado/táctil, sprites con fallback SVG. Probar con el prólogo. ✔ *Control: el prólogo se reproduce completo.*
3. **Bienvenida animada:** título con animación de aparición letra a letra (o palabra a palabra), avatar grande, botón **"🚀 Comenzar la ruta"**, botón de voz. El título debe seguir siendo EXACTAMENTE: *"Explorando el Movimiento Corporal Humano: un viaje con la Señora biomecánica"*.
4. **HUD + medidor + expediente + navegación de íconos + mapa rediseñado.**
5. **Reestructurar las 6 estaciones** al modelo de 3 pantallas (`story → explore → game`) con los textos de la sección 6. Al principio `explore` puede mostrar solo la ficha técnica (widget vacío) y se completa en la fase 6. ✔ *Control: se puede recorrer toda la ruta de punta a punta.*
6. **Widgets** (sección 5) en este orden de prioridad: `repCounter` → `flowToggle` → `joints` → `liftSteps` → `sarcomere` → `posture`.
7. **Reto Final + Epílogo** con expediente, textareas opcionales y pantalla final.
8. **Glosario emergente** y enlaces internos.
9. **Voz** (sección 9).
10. **Imágenes** (sección 8): agregar `assets/` si están disponibles; comprobar el fallback renombrando la carpeta.
11. **QA** con la sección 13.

*Si el tiempo apremia, recortar en este orden (de menos a más importante):* voz → glosario → fondos con imagen → props animados → widgets `posture` y `sarcomere` (dejar versión mínima). **No recortar:** historia, escenas con diálogo, 3 pantallas por estación, medidor, minijuegos, Caso de Carlos.

## 13. Contingencias y checklist

| Riesgo | Solución requerida |
|---|---|
| Las imágenes no cargan o falta `assets/` | `onerror` → fallback SVG/gradiente (sección 8). Nunca mostrar el ícono de imagen rota. |
| Doble clic mientras escribe el texto | 1.er clic completa la línea, 2.º avanza; ignorar clics durante la transición de 300 ms. |
| Timers activos al cambiar de pantalla | Guardar `currentTimers` y limpiar `clearInterval/Timeout` y `speechSynthesis.cancel()` en `go()`. |
| Usuario impaciente | Botón "Saltar ⏭" siempre visible; tecla `→`. |
| Celular en vertical | La escena baja a `aspect-ratio: 4/3`; el sprite se reduce al 60 %; caja de diálogo debajo del fondo, `font-size: 1rem`; usar `dvh` con fallback a `vh`. |
| Texto largo desborda | Caja de diálogo con `max-height` y scroll interno; `overflow-wrap:anywhere`. |
| Voz no disponible / sin `es-*` | Ocultar el botón silenciosamente. |
| `prefers-reduced-motion` | Efecto de escritura instantáneo, sin bob, sin deslizamientos ni props animados. |
| Rendimiento | Animar solo `transform` y `opacity`; máximo 3 props animados por escena; imágenes WebP ≤ 150 KB; total `assets/` ≤ 2 MB. |
| `localStorage` bloqueado o datos corruptos | Mantener el `try/catch` y la validación de `Storage`. |
| Doble puntuación | `award()` ignora estaciones ya completadas (existente). |
| Alguien salta la historia con `?docente=1` | Es intencional: solo desbloquea navegación; el diálogo sigue disponible. |
| Error JS inesperado | `window.onerror` → mensaje amable "Algo salió mal, recarga la página". |
| Texto pegado con símbolos | Unicode directo (Ca²⁺, °, ≥). Sin LaTeX. |
| Personaje con parecido a un anime existente | Diseño original; no usar nombres ni rasgos icónicos de franquicias. |

**Checklist de aceptación (verificar antes de terminar):**
- [ ] Abre con doble clic sin errores en consola, con y sin carpeta `assets/`.
- [ ] Título animado exacto y botón "Comenzar la ruta" en la bienvenida.
- [ ] Prólogo → 6 estaciones (cada una con 3 pantallas: escena, explora, desafío) → Reto Final → Epílogo.
- [ ] Cada estación tiene fondo/ambiente propio y la Señora Biomecánica aparece con expresiones distintas.
- [ ] El medidor "Espalda de Carlos" sube de 10 % a 100 % siguiendo la fórmula; las 6 pistas aparecen en el Expediente.
- [ ] Los 6 widgets existen y se animan/responden.
- [ ] Navegación por íconos, botones anterior/siguiente y glosario funcionan; los bloqueos se respetan (salvo `?docente=1`).
- [ ] Los 5 motores de minijuego siguen funcionando; puntaje máximo = 140, sin duplicar.
- [ ] Normas correctas: Res. 2400/1979, Decreto 1072/2015, GTC 45, ISO 11228-1, NIOSH, Directiva 90/269/CEE. No se cita la Res. 156/2005 como norma de peso.
- [ ] Contenido cubre TODO lo pedido por la rúbrica (ver tabla siguiente).
- [ ] Se ve bien a 360 px y a 1280 px; funciona con teclado y con toque.
- [ ] Narración de voz opcional funciona o queda oculta sin errores.

### Cobertura de la rúbrica (para el evaluador)

| Requisito de la guía | Dónde se cumple |
|---|---|
| Título fijo animado | Bienvenida (fase 3) |
| Botón "Comenzar la ruta" | Bienvenida |
| Señora Biomecánica como protagonista y guía | Sprite y diálogo en todas las escenas |
| Entornos narrativos + conflicto que se resuelve | Escenas por estación + historia de Carlos + medidor de espalda |
| Hipervínculos internos, botones de navegación, íconos interactivos | Barra de íconos, anterior/siguiente, glosario, mapa |
| Elementos animados / esquemas breves | Widgets SVG/CSS animados (sección 5), props de escena |
| Audio con voz del personaje (opcional) | Narración con Web Speech API (sección 9) |
| 6 estaciones con 2–3 pantallas | Escena → Explora → Desafío |
| Estación 1: estático vs. dinámico, ejemplos, esquema | Historia 1 + `flowToggle` + `classify` |
| Estación 2: definición, tipos de articulación, arco de movilidad | Historia 2 + `joints` + `match` |
| Estación 3: tipos de músculo, fibras, contracción, oxigenación, ATP/glucógeno, analogía | Historia 3 + `sarcomere` (analogía de la fábrica) + `order` |
| Estación 4: definición, clasificación, ejemplos, reflexión | Historia 4 + `posture` + `choice` |
| Estación 5: concepto de movimiento, repetitivo, riesgos, prevención | Historia 5 + `repCounter` + `multi` |
| Estación 6: carga, técnicas, límites legales, infografía interactiva | Historia 6 + `liftSteps` + tabla + `choiceSvg` |
| Reto final con las 4 preguntas argumentadas | Sala de reuniones + 4 tarjetas con respuestas |

---

### Nota para quienes entregan el trabajo (no para el agente)
- Verifiquen en su guía los **artículos exactos** de la Res. 2400/1979 sobre carga y los umbrales de postura mantenida/prolongada (2 h y 75 %); ajústenlos solo dentro de `CONTENT`.
- Para el documento final: expliquen brevemente qué recurso cumple cada parámetro (la tabla de cobertura les sirve de guía) y peguen el enlace publicado.
- Si suben la app a GitHub Pages/Netlify, suban `index.html` **junto con la carpeta `assets/`**.
