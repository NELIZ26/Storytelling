
window.SB = window.SB || {};

SB.state = {
    screen: 'welcome',
    story: { chapter:0, screen:0, beat:0, visited:[], done:false },
    unlocked: 1, completed: [], points: 0, carlosDone: [],
    autoplay: false, voice: false
};

SB.timers = [];

SB.Storage = {
    key: 'sb_progress_v3',
    save: () => { try { localStorage.setItem(SB.Storage.key, JSON.stringify(SB.state)); } catch(e){} },
    load: () => { try { const d = localStorage.getItem(SB.Storage.key); if(d) { const p = JSON.parse(d); if(p.story) SB.state = p; } } catch(e){} }
};

SB.el = id => document.getElementById(id);

SB.clearTimers = () => {
    SB.timers.forEach(clearTimeout);
    SB.timers.forEach(clearInterval);
    SB.timers = [];
    if(window.speechSynthesis) speechSynthesis.cancel();
};

SB.showToast = msg => {
    const t = SB.el('toast');
    t.innerHTML = msg;
    t.className = 'show';
    setTimeout(() => t.className='', 3000);
};

SB.go = (screenName, params = {}) => {
    SB.clearTimers();
    SB.state.screen = screenName;
    SB.Storage.save();
    SB.updateHUD();
    SB.renderScreen(params);
};

SB.updateHUD = () => {
    const hud = SB.el('hud');
    if (SB.state.screen === 'welcome') {
        hud.classList.add('hidden');
        return;
    }
    hud.classList.remove('hidden');
    
    // Only show meter in missions
    const isMission = SB.state.screen.startsWith('mission') || SB.state.screen === 'carlos' || SB.state.screen === 'final';
    SB.el('meter-container').classList.toggle('hidden', !isMission);
    SB.el('hud-points').classList.toggle('hidden', !isMission);
    
    if (isMission) {
        SB.el('hud-points').innerHTML = `<i class="fa-solid fa-star"></i> ${SB.state.points}`;
        const meter = 10 + 60 * (SB.state.completed.length / 6) + 30 * (SB.state.carlosDone.length / 4);
        const mEl = SB.el('carlos-meter');
        mEl.style.width = `${Math.min(100, Math.round(meter))}%`;
        mEl.style.backgroundColor = meter > 80 ? 'var(--mint)' : (meter > 40 ? 'var(--sun)' : 'var(--coral)');
    }
    
    SB.el('hud-title').textContent = isMission ? "Espalda de Carlos" : "Historia";
    
    const nav = SB.el('hud-nav');
    nav.innerHTML = `
        <button class="btn-icon" onclick="SB.go('welcome')" title="Inicio"><i class="fa-solid fa-home"></i></button>
        <button class="btn-icon" onclick="SB.go('storyMenu')" title="Capítulos"><i class="fa-solid fa-book-open"></i></button>
        <button class="btn-icon ${!SB.state.story.done ? 'locked':''}" onclick="if(SB.state.story.done) SB.go('missionsIntro')" title="Misiones"><i class="fa-solid fa-gamepad"></i></button>
    `;
};

SB.showGlossary = (term) => {
    const t = term.toLowerCase();
    SB.el('glossary-title').textContent = term;
    SB.el('glossary-desc').textContent = SB.GLOSSARY[t] || "Concepto clave.";
    SB.el('modal-glossary').style.display = 'flex';
};

SB.award = (missionId, points) => {
    if (!SB.state.completed.includes(missionId)) {
        SB.state.completed.push(missionId);
        SB.state.points += points;
        if (SB.state.unlocked === missionId && SB.state.unlocked < 6) {
            SB.state.unlocked++;
        }
        SB.Storage.save();
        SB.updateHUD();
        SB.showToast("¡Reto superado!");
    }
};

/* Carga en cascada */
SB.loadImg = (folder, baseName, fallbackHtml, callback) => {
    const src = `assets/${folder}/${baseName}.svg`;
    const img = new Image();
    img.onload = () => callback(src, false);
    img.onerror = () => callback(null, true);
    img.src = src;
};


SB.toggleVoice = (btn) => {
    SB.state.voice = !SB.state.voice;
    SB.Storage.save();
    btn.innerHTML = SB.state.voice ? '<i class="fa-solid fa-volume-high"></i> Voz: ON' : '<i class="fa-solid fa-volume-xmark"></i> Voz: OFF';
};
