# Guía de imágenes — Señora Biomecánica (estilo dibujo/anime)

Esta guía es para **ustedes** (no para Antigravity). Aquí está TODO lo que hay que crear, con el nombre exacto de cada archivo y un prompt listo para pegar en un generador de imágenes con IA (cualquiera que permita usar una imagen de referencia, por ejemplo Gemini, ChatGPT o Leonardo).

> **Importante:** la app funciona SIN imágenes (usa dibujos simples de reemplazo). Pueden pedirle a Antigravity que construya todo primero y agregar las imágenes después, sin tocar código: solo copian los archivos con **los nombres exactos** a las carpetas indicadas.

---

## 1. Reglas de oro

1. **Nombres exactos**, en minúsculas, sin espacios ni tildes (`sb_happy.png`, no `SB Happy.PNG`).
2. **Sin texto ni letras dentro de las imágenes** (la IA los escribe mal). Las etiquetas las pone la app.
3. **Mismo estilo en todas.** Pega SIEMPRE el bloque de estilo (sección 2) al inicio de cada prompt.
4. **Personajes con fondo transparente (PNG).** Láminas anatómicas con **fondo blanco** (no hace falta recortarlas).
5. Cuando tengas la primera imagen de un personaje, **súbela como referencia** en las siguientes ("mismo personaje, mismo vestuario, distinta expresión").
6. **Revisa la anatomía** contra tu material de clase: la IA se equivoca (dedos, músculos, vértebras).
7. **Comprime** antes de entregar (squoosh.app o tinypng.com). Metas: sprites ≤ 400 KB, fondos ≤ 250 KB, láminas ≤ 300 KB. Total ≤ 12 MB.

## 2. Bloque de estilo (pegar al inicio de cada prompt)

```
STYLE: semi-realistic anime illustration, clean black lineart, soft cel shading,
warm friendly colors, educational textbook clarity, no text, no letters,
no watermark, consistent art style across the whole series.
```

## 3. Personajes → `assets/characters/` (SVG o PNG transparente, ~800×1200)

**Cómo hacerlos sin que se vean distintos:**
1. Genera primero a la Señora Biomecánica "neutral" hasta que te guste.
2. Con esa imagen como referencia, genera las demás expresiones.
3. Pide **fondo verde plano (#00FF00)** o blanco y luego quita el fondo con Canva ("Eliminar fondo"), remove.bg o Photoroom. Exporta en PNG o SVG vectorizado.
4. Todas las expresiones: mismo tamaño, misma escala, cuerpo entero o de rodillas hacia arriba, mirando ligeramente a la derecha.

**Descripción base — Señora Biomecánica:**
`Latina woman around 40, hair in a neat bun, round glasses, blue lab vest with yellow safety details, warm intelligent smile, holding a tablet, three-quarter body, facing slightly right.`

| Archivo | Expresión / pose |
|---|---|
| `sb_neutral.png` | Serena, mirada al frente, tablet en la mano. |
| `sb_explaining.png` | Dedo índice en alto, sonrisa didáctica. |
| `sb_happy.png` | Sonrisa grande, ojos brillantes, pulgar arriba. |
| `sb_worried.png` | Cejas preocupadas, mano en la barbilla. |
| `sb_alert.png` | Seria, señalando hacia el frente con el dedo. |

**Descripción base — Carlos:**
`Latino man around 35, short dark hair, gray t-shirt, work pants, poorly fitted lumbar belt, warehouse worker, three-quarter body, facing slightly left.`

| Archivo | Expresión / pose |
|---|---|
| `carlos_tired.png` | Cansado, una mano en la espalda baja, gesto de dolor. |
| `carlos_neutral.png` | Neutral, brazos relajados. |
| `carlos_relieved.png` | Aliviado, sonriendo, postura erguida. |

## 4. Fondos → `assets/backgrounds/` (JPG, 1600×900)

Añade a cada prompt: `wide background scene, no characters, soft depth, 16:9.`

| Archivo | Escena |
|---|---|
| `bg_bodega_tarde.jpg` | Bodega/almacén al atardecer, cajas apiladas, luz naranja. |
| `bg_bodega_manana.jpg` | Misma bodega por la mañana, luz clara, montacargas al fondo. |
| `bg_interior_cuerpo.jpg` | Interior del cuerpo humano estilizado (tonos azul/violeta, partículas, tejido). |
| `bg_fabrica_energia.jpg` | Interior de una fibra muscular como fábrica: engranajes, tuberías, luces cálidas. |
| `bg_gimnasio.jpg` | Gimnasio con espejos, pesas y bancos. |
| `bg_linea_reloj.jpg` | Línea de trabajo de bodega con banda transportadora y un reloj gigante en la pared. |
| `bg_zona_carga.jpg` | Andén de carga y descarga con camión y cajas. |
| `bg_sala_reunion.jpg` | Sala de reuniones moderna con pizarra y pantalla, ambiente profesional. |

## 5. Láminas anatómicas → `assets/anatomy/` (PNG/JPG, fondo BLANCO, ~1000×1000)

Añade a cada prompt: `on a plain white background, centered, medical textbook illustration.`
Si dos láminas son "par" (relajado/contraído), genera la segunda con la primera como referencia para que coincidan en tamaño y posición: así la animación alternada se ve fluida.

**Prioridad A (imprescindibles):**

| Archivo | Prompt (después del bloque de estilo) |
|---|---|
| `arm_relaxed.png` | Human arm with visible muscles (biceps, triceps, deltoid), relaxed, elbow extended, side view. |
| `arm_contracted.png` | Same arm, elbow flexed 90°, biceps bulging and contracted, same size and position. |
| `leg_muscles.png` | Human leg, side view, standing extended, visible quadriceps, hamstrings and calf muscles. |
| `leg_flexed.png` | Same leg mid-step, knee bent, muscles contracted, same size and position. |
| `back_muscles.png` | Human back, posterior view, erector spinae, latissimus dorsi and gluteus visible, slightly highlighted in warm red. |
| `capillary_free.png` | Cross-section of muscle tissue with an open blood capillary, red blood cells flowing freely, arrows showing flow. |
| `capillary_squeezed.png` | Same view, capillary pinched and squeezed by tense muscle fibers, red blood cells stuck, dull colors. |
| `sarcomere_relaxed.png` | Sarcomere diagram: thin actin filaments and thick myosin filaments, relaxed, wide gap between Z-lines. |
| `sarcomere_contracted.png` | Same sarcomere contracted, filaments overlapped, Z-lines closer, same size and position. |
| `posture_neutral.png` | Worker standing upright with neutral spine at a workstation, side view. |
| `posture_forced.png` | Worker bent forward at the waist and twisting the trunk to pick a box from a low shelf, side view. |
| `posture_overhead.png` | Painter with both arms above shoulder level painting a ceiling, side view. |
| `lift_wrong.png` | Man lifting a box from the floor with rounded back and straight legs, box far from the body, side view. |
| `lift_twist.png` | Man twisting his torso while holding a heavy box, feet planted, side view. |
| `lift_right.png` | Man in a squat lifting a box: knees bent, straight back, box close to the body, side view. |

**Prioridad B (si hay tiempo):**

| Archivo | Prompt |
|---|---|
| `skeleton.png` | Full human skeleton, front view. |
| `skull_sutures.png` | Human skull, side view, cranial sutures clearly visible. |
| `spine_lumbar.png` | Lumbar spine (L3–L5) and sacrum, lateral view, intervertebral discs highlighted. |
| `shoulder_joint.png` | Human shoulder joint (glenohumeral ball-and-socket), bones and cartilage, front view. |
| `knee_joint.png` | Human knee joint, side view, flexed, femur, tibia, patella and cartilage. |
| `muscle_types.png` | Three panels side by side: skeletal muscle (striated fibers), cardiac muscle (branched striated), smooth muscle (spindle cells). |
| `fiber_types.png` | Two muscle fibers side by side: left thin, red, many mitochondria (slow); right thick, pale (fast). |
| `atp_factory.png` | Cute cartoon factory building inside a cell (mitochondria as a factory) producing golden coins, chimney with smoke, glucose barrels. |
| `wrist_tendon.png` | Hand and wrist anatomy showing tendons and the carpal tunnel, inflamed area in red. |
| `disc_herniation.png` | Lumbar vertebrae with a bulging herniated disc pressing on a nerve root, medical illustration. |

> Sin las de prioridad B, la app muestra una tarjeta de reemplazo con emoji y leyenda: la historia sigue funcionando.

## 6. Atajo posible

Las **láminas geométricas** (capilar, sarcómero, siluetas de levantamiento y de postura) pueden hacerse como **SVG** dibujados por código, sin IA, y quedan limpias y coherentes. Guárdalas con el mismo nombre y extensión `.svg` (la app también las reconoce). Pídelas por separado si las quieren.

## 7. Entrega

- Estructura final: `assets/characters/`, `assets/backgrounds/`, `assets/anatomy/`.
- Prueba local: abre `index.html` con doble clic.
- Publicación: sube TODA la carpeta a GitHub (con `assets/`) y activa GitHub Pages, o comprímela en un `.zip` (descomprimir antes de abrir).
