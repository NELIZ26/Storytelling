import codecs
import re

with codecs.open('js/story.js', 'r', encoding='utf-8') as f:
    st = f.read()

st = st.replace("['.png', '.webp'], FALLBACK_SB", "['.svg', '.png', '.webp'], FALLBACK_SB")
st = st.replace("['.png', '.webp'], FALLBACK_CARLOS", "['.svg', '.png', '.webp'], FALLBACK_CARLOS")

with codecs.open('js/story.js', 'w', encoding='utf-8') as f:
    f.write(st)

with codecs.open('GUIA_IMAGENES.md', 'r', encoding='utf-8') as f:
    gd = f.read()

gd = gd.replace("`assets/characters/` (PNG transparente, ~800×1200)", "`assets/characters/` (SVG o PNG transparente, ~800×1200)")
gd = gd.replace("Exporta PNG.", "Exporta en PNG o SVG vectorizado.")

with codecs.open('GUIA_IMAGENES.md', 'w', encoding='utf-8') as f:
    f.write(gd)

print("SVG allowed for characters")
