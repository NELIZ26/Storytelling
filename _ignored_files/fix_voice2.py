import codecs
import re

with codecs.open('js/screens.js', 'r', encoding='utf-8') as f:
    scr = f.read()

# Replace the whole welcome screen logic because it's messy now.
welcome_str = """
    if (s === 'welcome') {
        appEl.innerHTML = `
            <div class="card" style="text-align: center; margin-top:2rem;">
                <h1 class="fade-in" style="margin-bottom:2rem; line-height: 1.2; font-size:2.5rem; color:var(--sky); text-shadow: 2px 2px 0 var(--ink);">Explorando el Movimiento Corporal Humano:<br>un viaje con la Señora biomecánica</h1>
                <div style="display:flex; justify-content:center; margin-bottom: 2rem;">
                    <div style="width:150px; animation: bob 3s infinite ease-in-out;">
                        <svg class="sprite" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#8ecae6"/><circle cx="50" cy="40" r="25" fill="#ffb703"/><path d="M 30 90 Q 50 60 70 90" fill="#1b1b2f"/><circle cx="40" cy="35" r="5" fill="#fff"/><circle cx="60" cy="35" r="5" fill="#fff"/><path d="M 45 45 Q 50 55 55 45" fill="none" stroke="#fff" stroke-width="2"/></svg>
                    </div>
                </div>
                <button class="btn-primary fade-in" style="font-size:1.5rem; padding: 1rem 2rem;" onclick="SB.go('story')"><i class="fa-solid fa-rocket"></i> Comenzar la ruta</button>
                <div style="margin-top:2rem; display:flex; gap:1rem; justify-content:center;">
                    <button class="btn-secondary" onclick="SB.toggleVoice(this)">
                        ${SB.state.voice ? '<i class="fa-solid fa-volume-high"></i> Voz: ON' : '<i class="fa-solid fa-volume-xmark"></i> Voz: OFF'}
                    </button>
                </div>
            </div>`;
    } 
"""

scr = re.sub(r"if \(s === 'welcome'\) \{[\s\S]*?\} \n    else if \(s === 'storyMenu'\)", welcome_str.strip() + "\n    else if (s === 'storyMenu')", scr)

with codecs.open('js/screens.js', 'w', encoding='utf-8') as f:
    f.write(scr)

print("Fixed welcome screen")
