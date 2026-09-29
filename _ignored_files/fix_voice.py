import codecs

# Fix core.js by adding toggleVoice
with codecs.open('js/core.js', 'r', encoding='utf-8') as f:
    core = f.read()

toggle_voice_fn = """
SB.toggleVoice = (btn) => {
    SB.state.voice = !SB.state.voice;
    SB.Storage.save();
    btn.innerHTML = SB.state.voice ? '<i class="fa-solid fa-volume-high"></i> Voz: ON' : '<i class="fa-solid fa-volume-xmark"></i> Voz: OFF';
};
"""

if 'SB.toggleVoice =' not in core:
    core = core + "\n" + toggle_voice_fn
    with codecs.open('js/core.js', 'w', encoding='utf-8') as f:
        f.write(core)

# Fix screens.js by using toggleVoice
with codecs.open('js/screens.js', 'r', encoding='utf-8') as f:
    scr = f.read()

# We need to find the exact string to replace. Let's use regex to be safe.
import re
scr = re.sub(r'onclick="SB\.state\.voice\s*=\s*!SB\.state\.voice;[^"]+"', 'onclick="SB.toggleVoice(this)"', scr)

with codecs.open('js/screens.js', 'w', encoding='utf-8') as f:
    f.write(scr)

print("Fixed toggleVoice")
