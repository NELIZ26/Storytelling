import codecs

# Fix core.js
with codecs.open('js/core.js', 'r', encoding='utf-8') as f:
    core = f.read()
core = core.replace("SB.el('hud-points').textContent = `<i class=\"fa-solid fa-star\"></i> ${SB.state.points}`", 
                    "SB.el('hud-points').innerHTML = `<i class=\"fa-solid fa-star\"></i> ${SB.state.points}`")
with codecs.open('js/core.js', 'w', encoding='utf-8') as f:
    f.write(core)

# Fix screens.js
with codecs.open('js/screens.js', 'r', encoding='utf-8') as f:
    scr = f.read()
scr = scr.replace("this.textContent=SB.state.voice", "this.innerHTML=SB.state.voice")
with codecs.open('js/screens.js', 'w', encoding='utf-8') as f:
    f.write(scr)

# Fix story.js
with codecs.open('js/story.js', 'r', encoding='utf-8') as f:
    st = f.read()
st = st.replace("SB.el('btn-auto').textContent = SB.state.autoplay", "SB.el('btn-auto').innerHTML = SB.state.autoplay")
with codecs.open('js/story.js', 'w', encoding='utf-8') as f:
    f.write(st)

print("Fixed textContent to innerHTML for FontAwesome icons")
