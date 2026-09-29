import codecs
import re

# 1. Update core.js
with codecs.open('js/core.js', 'r', encoding='utf-8') as f:
    core = f.read()

load_img_old = r"SB\.loadImg = \(folder, baseName, exts, fallbackHtml, callback\) => \{[\s\S]*?^};"
load_img_new = """SB.loadImg = (folder, baseName, fallbackHtml, callback) => {
    const src = `assets/${folder}/${baseName}.svg`;
    const img = new Image();
    img.onload = () => callback(src, false);
    img.onerror = () => callback(null, true);
    img.src = src;
};"""

core = re.sub(load_img_old, load_img_new, core, flags=re.MULTILINE)

with codecs.open('js/core.js', 'w', encoding='utf-8') as f:
    f.write(core)


# 2. Update story.js to match new loadImg signature
with codecs.open('js/story.js', 'r', encoding='utf-8') as f:
    st = f.read()

st = re.sub(r"SB\.loadImg\('backgrounds', bgName, \['\.svg', '\.jpg', '\.webp', '\.png'\], FALLBACK_BG, \(src, fall\) => \{",
            "SB.loadImg('backgrounds', bgName, FALLBACK_BG, (src, fall) => {", st)
st = re.sub(r"SB\.loadImg\('backgrounds', bgName, \['\.jpg', '\.webp', '\.png'\], FALLBACK_BG, \(src, fall\) => \{",
            "SB.loadImg('backgrounds', bgName, FALLBACK_BG, (src, fall) => {", st)
st = re.sub(r"SB\.loadImg\('anatomy', imgName, \['\.svg', '\.png', '\.jpg', '\.webp'\], FALLBACK_ANATOMY, \(src, fall\) => \{",
            "SB.loadImg('anatomy', imgName, FALLBACK_ANATOMY, (src, fall) => {", st)
st = re.sub(r"SB\.loadImg\('anatomy', imgName, \['\.png', '\.jpg', '\.webp'\], FALLBACK_ANATOMY, \(src, fall\) => \{",
            "SB.loadImg('anatomy', imgName, FALLBACK_ANATOMY, (src, fall) => {", st)
st = re.sub(r"SB\.loadImg\('characters', `sb_\$\{beat\.mood\}`, \['\.svg', '\.png', '\.webp'\], FALLBACK_SB, \(src, fall\) => \{",
            "SB.loadImg('characters', `sb_${beat.mood}`, FALLBACK_SB, (src, fall) => {", st)
st = re.sub(r"SB\.loadImg\('characters', `carlos_\$\{beat\.mood\}`, \['\.svg', '\.png', '\.webp'\], FALLBACK_CARLOS, \(src, fall\) => \{",
            "SB.loadImg('characters', `carlos_${beat.mood}`, FALLBACK_CARLOS, (src, fall) => {", st)

with codecs.open('js/story.js', 'w', encoding='utf-8') as f:
    f.write(st)

# 3. Update screens.js: Welcome screen avatar
with codecs.open('js/screens.js', 'r', encoding='utf-8') as f:
    scr = f.read()

avatar_old = """<div style="width:150px; animation: bob 3s infinite ease-in-out;">
                        <svg class="sprite" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#8ecae6"/><circle cx="50" cy="40" r="25" fill="#ffb703"/><path d="M 30 90 Q 50 60 70 90" fill="#1b1b2f"/><circle cx="40" cy="35" r="5" fill="#fff"/><circle cx="60" cy="35" r="5" fill="#fff"/><path d="M 45 45 Q 50 55 55 45" fill="none" stroke="#fff" stroke-width="2"/></svg>
                    </div>"""
avatar_new = """<div style="width:250px; height: 350px; animation: bob 3s infinite ease-in-out; margin: 0 auto; display:flex; justify-content:center; align-items:flex-end;">
                        <img src="assets/characters/sb_neutral.svg" style="max-width:100%; max-height:100%; object-fit:contain;" alt="Señora Biomecánica" onerror="this.outerHTML='<div style=\\'width:150px; height:150px; background:var(--sky); border-radius:50%; display:flex; align-items:center; justify-content:center; border:4px solid var(--ink);\\'><i class=\\'fa-solid fa-user\\' style=\\'font-size:4rem;\\'></i></div>'">
                    </div>"""
if avatar_old in scr:
    scr = scr.replace(avatar_old, avatar_new)
else:
    # Just in case it was already replaced
    pass

with codecs.open('js/screens.js', 'w', encoding='utf-8') as f:
    f.write(scr)

# 4. Update CSS for larger size and responsiveness
with codecs.open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace("max-width: 900px;", "max-width: 1100px;")
css = css.replace("font-size: 1.1rem;", "font-size: 1.25rem;") 
if "#dialogue-box" in css:
    css = re.sub(r'#dialogue-box\s*\{[^}]+\}', '#dialogue-box { background: var(--paper); border: 3px solid var(--ink); border-radius: var(--border-radius); padding: 1.5rem; position: relative; z-index: 10; font-size: 1.3rem; box-shadow: 4px 4px 0 var(--ink); margin-bottom: 1rem; cursor: pointer; transition: transform 0.1s; display: flex; flex-direction: column; gap: 0.5rem; }', css)

mobile_mq = """
@media (max-width: 600px) {
    #app { padding: 0.5rem; }
    #dialogue-box { font-size: 1.1rem; padding: 1rem; }
    #stage { aspect-ratio: 4/3; border-width: 3px; }
    .sprite-container { width: 45%; bottom: -2%; height: 90%; }
    .card { padding: 1rem; }
    button { padding: 0.6rem 1rem; font-size: 0.95rem; }
}
"""
if "@media (max-width: 600px)" not in css:
    css += "\n" + mobile_mq

with codecs.open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Updates applied")
