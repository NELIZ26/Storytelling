import codecs
import re

# 1. Update index.html
with codecs.open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

fa_link = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">'
if fa_link not in html:
    html = html.replace('<link rel="stylesheet" href="css/style.css">', f'{fa_link}\n    <link rel="stylesheet" href="css/style.css">')

html = html.replace('⭐', '<i class="fa-solid fa-star"></i>')
with codecs.open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update core.js
with codecs.open('js/core.js', 'r', encoding='utf-8') as f:
    core = f.read()

core = core.replace('⭐', '<i class="fa-solid fa-star"></i>')
core = core.replace('🏠', '<i class="fa-solid fa-home"></i>')
core = core.replace('📖', '<i class="fa-solid fa-book-open"></i>')
core = core.replace('🎮', '<i class="fa-solid fa-gamepad"></i>')
with codecs.open('js/core.js', 'w', encoding='utf-8') as f:
    f.write(core)

# 3. Update screens.js
with codecs.open('js/screens.js', 'r', encoding='utf-8') as f:
    scr = f.read()

replacements_scr = {
    '🚀 Comenzar la ruta': '<i class="fa-solid fa-rocket"></i> Comenzar la ruta',
    '🔊 Voz: ON': '<i class="fa-solid fa-volume-high"></i> Voz: ON',
    '🔇 Voz: OFF': '<i class="fa-solid fa-volume-xmark"></i> Voz: OFF',
    '📖 Capítulos de la Historia': '<i class="fa-solid fa-book-open"></i> Capítulos de la Historia',
    '🎮 Ir a las Misiones': '<i class="fa-solid fa-gamepad"></i> Ir a las Misiones',
    '▶ Entrar al Mapa': '<i class="fa-solid fa-play"></i> Entrar al Mapa',
    '🎮': '<i class="fa-solid fa-gamepad"></i>',
    '🔒': '<i class="fa-solid fa-lock"></i>',
    '✅': '<i class="fa-solid fa-check"></i>',
    '⭐': '<i class="fa-solid fa-star"></i>',
    '🏭': '<i class="fa-solid fa-industry"></i>',
    '✔': '<i class="fa-solid fa-check"></i>',
    '📖 Volver a ver la historia': '<i class="fa-solid fa-book-open"></i> Volver a ver la historia',
    '🎮 Volver al mapa': '<i class="fa-solid fa-gamepad"></i> Volver al mapa',
    '🔄 Reiniciar progreso': '<i class="fa-solid fa-rotate-left"></i> Reiniciar progreso'
}

for k, v in replacements_scr.items():
    scr = scr.replace(k, v)
with codecs.open('js/screens.js', 'w', encoding='utf-8') as f:
    f.write(scr)

# 4. Update story.js
with codecs.open('js/story.js', 'r', encoding='utf-8') as f:
    st = f.read()

replacements_st = {
    '▼': '<i class="fa-solid fa-caret-down"></i>',
    '◀ Atrás': '<i class="fa-solid fa-backward"></i> Atrás',
    '▶ Película': '<i class="fa-solid fa-play"></i> Película',
    '⏸ Pausa': '<i class="fa-solid fa-pause"></i> Pausa',
    'Siguiente ▶': 'Siguiente <i class="fa-solid fa-forward-step"></i>',
    '🖼️': '<i class="fa-regular fa-image"></i>'
}

for k, v in replacements_st.items():
    st = st.replace(k, v)
with codecs.open('js/story.js', 'w', encoding='utf-8') as f:
    f.write(st)

# 5. Update data-story.js
with codecs.open('js/data-story.js', 'r', encoding='utf-8') as f:
    ds = f.read()

replacements_ds = {
    "emoji:'⏱️📦'": "emoji:'<i class=\"fa-solid fa-stopwatch\"></i> <i class=\"fa-solid fa-box\"></i>'",
    "emoji:'🔄🛠️⏸️'": "emoji:'<i class=\"fa-solid fa-rotate\"></i> <i class=\"fa-solid fa-tools\"></i> <i class=\"fa-solid fa-pause\"></i>'",
    "emoji:'📦'": "emoji:'<i class=\"fa-solid fa-box\"></i>'",
    "emoji:'⚖️'": "emoji:'<i class=\"fa-solid fa-scale-balanced\"></i>'",
    '✖': '<i class="fa-solid fa-xmark"></i>',
    '✔': '<i class="fa-solid fa-check"></i>',
    '💪': '<i class="fa-solid fa-dumbbell"></i>',
    '🦴': '<i class="fa-solid fa-bone"></i>',
    '⚡': '<i class="fa-solid fa-bolt"></i>',
    '📐': '<i class="fa-solid fa-ruler-combined"></i>',
    '🔄': '<i class="fa-solid fa-rotate"></i>',
    '📦': '<i class="fa-solid fa-box"></i>'
}

for k, v in replacements_ds.items():
    ds = ds.replace(k, v)
with codecs.open('js/data-story.js', 'w', encoding='utf-8') as f:
    f.write(ds)

# 6. Update games.js
with codecs.open('js/games.js', 'r', encoding='utf-8') as f:
    g = f.read()

g = g.replace('✖', '<i class="fa-solid fa-xmark"></i>')
g = g.replace('▲', '<i class="fa-solid fa-caret-up"></i>')
with codecs.open('js/games.js', 'w', encoding='utf-8') as f:
    f.write(g)

print("Icons replaced with FontAwesome")
