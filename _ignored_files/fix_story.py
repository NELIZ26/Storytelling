import codecs
import re

with codecs.open('js/story.js', 'r', encoding='utf-8') as f:
    st = f.read()

# Replace arrays with nothing
# SB.loadImg('backgrounds', `bg_${chapter.bg}`, ['.jpg', '.webp', '.png'], `<div style="width:100%; height:100%; background:var(--ink);"></div>`, (src, fallback) => {
st = re.sub(r"SB\.loadImg\('backgrounds', `bg_\$\{chapter\.bg\}`, \[[^\]]+\]", "SB.loadImg('backgrounds', `bg_${chapter.bg}`", st)

# SB.loadImg('anatomy', vis.frames[0], ['.png', '.jpg', '.webp', '.svg'], `<div style="font-size:3rem;"><i class="fa-regular fa-image"></i></div>`, (src, fall) => {
st = re.sub(r"SB\.loadImg\('anatomy', vis\.frames\[0\], \[[^\]]+\]", "SB.loadImg('anatomy', vis.frames[0]", st)

# SB.loadImg('anatomy', vis.frames[fIdx], ['.png', '.jpg', '.webp', '.svg'], fall, (src2, fall2) => {
st = re.sub(r"SB\.loadImg\('anatomy', vis\.frames\[fIdx\], \[[^\]]+\]", "SB.loadImg('anatomy', vis.frames[fIdx]", st)

with codecs.open('js/story.js', 'w', encoding='utf-8') as f:
    f.write(st)

print("Arrays removed from story.js loadImg calls")
