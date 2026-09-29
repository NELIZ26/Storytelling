
window.SB = window.SB || {};

// Fallbacks SVG y Emojis
const FALLBACK_SB = `<svg class="sprite" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#8ecae6"/><circle cx="50" cy="40" r="25" fill="#ffb703"/><path d="M 30 90 Q 50 60 70 90" fill="#1b1b2f"/><circle cx="40" cy="35" r="5" fill="#fff"/><circle cx="60" cy="35" r="5" fill="#fff"/><path d="M 45 50 L 55 50" fill="none" stroke="#fff" stroke-width="2"/></svg>`;
const FALLBACK_CARLOS = `<svg class="sprite" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#e2e8f0"/><circle cx="50" cy="40" r="25" fill="#fca5a5"/><path d="M 30 90 Q 50 60 70 90" fill="#64748b"/><circle cx="40" cy="35" r="5" fill="#fff"/><circle cx="60" cy="35" r="5" fill="#fff"/><path d="M 45 55 Q 50 50 55 55" fill="none" stroke="#fff" stroke-width="2"/></svg>`;

function renderSceneHolo(visualId) {
    if (!visualId || visualId === 'none') {
        return `<div class="holo-panel" style="opacity:0;" id="holo-panel"></div>`;
    }
    const vis = SB.VISUALS[visualId];
    if (!vis) return `<div class="holo-panel" style="opacity:0;" id="holo-panel"></div>`;
    
    let badgeHtml = vis.badge ? `<div class="holo-badge">${vis.badge}</div>` : '';
    let chipsHtml = vis.chips ? vis.chips.map(c => `<div class="chip" onclick="SB.showGlossary('${c}')">${c}</div>`).join('') : '';
    
    return `
    <div class="holo-panel fade-in" id="holo-panel">
        ${badgeHtml}
        <div class="holo-img-container" id="holo-img-container">
            <!-- images injected here -->
        </div>
        <div class="holo-footer">
            ${vis.caption}
            <div class="holo-chips">${chipsHtml}</div>
        </div>
    </div>`;
}

SB.renderStory = () => {
    const chIdx = SB.state.story.chapter;
    const scIdx = SB.state.story.screen;
    let bIdx = SB.state.story.beat;
    
    const chapter = SB.CHAPTERS[chIdx];
    const screen = chapter.screens[scIdx];
    
    const appEl = SB.el('app');
    
    // Tarjeta de capítulo
    if (scIdx === 0 && bIdx === 0 && !SB.state.story.visited.includes(chIdx)) {
        SB.state.story.visited.push(chIdx);
        appEl.innerHTML = `
            <div id="chapter-card" class="ch-anim" onclick="this.style.display='none'; SB.startBeat();">
                <h2>Capítulo ${chIdx}</h2>
                <h1 style="font-size:2.5rem; color:var(--sun)">${chapter.title}</h1>
            </div>
            <div id="story-content" style="display:flex; flex-direction:column; height:100%;"></div>
        `;
        SB.timers.push(setTimeout(() => {
            const cc = SB.el('chapter-card');
            if(cc) { cc.style.display='none'; SB.startBeat(); }
        }, 1800));
    } else {
        appEl.innerHTML = `<div id="story-content" style="display:flex; flex-direction:column; height:100%;"></div>`;
        SB.startBeat();
    }
};

SB.startBeat = () => {
    const chIdx = SB.state.story.chapter;
    const scIdx = SB.state.story.screen;
    const bIdx = SB.state.story.beat;
    
    const chapter = SB.CHAPTERS[chIdx];
    const screen = chapter.screens[scIdx];
    const beat = screen.beats[bIdx];
    
    const container = SB.el('story-content');
    
    // Dibujar el layout base si es el primer beat o si no existe
    if (!SB.el('stage')) {
        container.innerHTML = `
            <div id="stage" class="fade-in">
                <div class="scene-bg" id="scene-bg"></div>
                <div class="sprite-container speaker-left" id="sp-left"></div>
                <div class="sprite-container speaker-right" id="sp-right"></div>
                <div id="holo-wrapper"></div>
                
                <div class="dialogue-box" id="dialogue-box">
                    <div class="dialogue-name" id="d-name"></div>
                    <div class="dialogue-text" id="d-text"></div>
                    <div class="dialogue-indicator"><i class="fa-solid fa-caret-down"></i></div>
                </div>
            </div>
            <div class="scene-controls">
                <button class="btn-secondary" onclick="SB.prevBeat()"><i class="fa-solid fa-backward"></i> Atrás</button>
                <button class="btn-secondary" onclick="SB.toggleAutoplay()" id="btn-auto">${SB.state.autoplay ? '<i class="fa-solid fa-pause"></i> Pausa' : '<i class="fa-solid fa-play"></i> Película'}</button>
                <button class="btn-primary" onclick="SB.nextBeat()" id="btn-next">Siguiente <i class="fa-solid fa-forward-step"></i></button>
            </div>
        `;
        
        // Cargar fondo
        SB.loadImg('backgrounds', `bg_${chapter.bg}`, `<div style="width:100%; height:100%; background:var(--ink);"></div>`, (src, fallback) => {
            SB.el('scene-bg').innerHTML = src ? `<img src="${src}" style="width:100%; height:100%; object-fit:cover; opacity:0.6;">` : fallback;
        });
        
        // Manejador del cuadro de diálogo
        SB.el('dialogue-box').onclick = SB.nextBeat;
        SB.el('stage').onclick = (e) => { if (e.target.id === 'stage' || e.target.classList.contains('scene-bg')) SB.nextBeat(); };
        
        // Soporte teclado
        window.onkeydown = (e) => {
            if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') { SB.nextBeat(); }
            if (e.key === 'ArrowLeft') { SB.prevBeat(); }
        };
    }
    
    const btnAuto = SB.el('btn-auto'); if (btnAuto) btnAuto.innerHTML = SB.state.autoplay ? '<i class="fa-solid fa-pause"></i> Pausa' : '<i class="fa-solid fa-play"></i> Película';
    
    // Panel Visual
    if (beat.visual && beat.visual !== '=') {
        SB.el('holo-wrapper').innerHTML = renderSceneHolo(beat.visual);
        if (beat.visual !== 'none') {
            const vis = SB.VISUALS[beat.visual];
            const holoC = SB.el('holo-img-container');
            if (vis.emoji) {
                holoC.innerHTML = `<div style="font-size: 5rem;" class="anim-${vis.anim}">${vis.emoji}</div>`;
                if(vis.countTo) {
                    let c = 0;
                    const step = Math.ceil(vis.countTo / 30);
                    const tm = setInterval(() => {
                        c += step;
                        if(c >= vis.countTo) { c = vis.countTo; clearInterval(tm); }
                        if(SB.el('count-el')) SB.el('count-el').textContent = c;
                    }, 100);
                    SB.timers.push(tm);
                    holoC.innerHTML += `<div style="position:absolute; bottom:10px; font-weight:bold; font-size:2rem; color:var(--ink);"><span id="count-el">0</span></div>`;
                }
            } else if (vis.frames && vis.frames.length > 0) {
                // Cargar primer frame
                SB.loadImg('anatomy', vis.frames[0], `<div style="font-size:3rem;"><i class="fa-regular fa-image"></i></div>`, (src, fall) => {
                    holoC.innerHTML = src ? `<img src="${src}" class="holo-img anim-${vis.anim}" id="holo-frame">` : fall;
                    
                    if (vis.frames.length > 1 && vis.fps > 0) {
                        let fIdx = 0;
                        const tm = setInterval(() => {
                            fIdx = (fIdx + 1) % vis.frames.length;
                            SB.loadImg('anatomy', vis.frames[fIdx], fall, (src2, fall2) => {
                                const hf = SB.el('holo-frame');
                                if(hf && src2) hf.src = src2;
                            });
                        }, 1000 / vis.fps);
                        SB.timers.push(tm);
                    }
                });
            }
        }
    }
    
    // Configurar sprite
    const spL = SB.el('sp-left');
    const spR = SB.el('sp-right');
    const dName = SB.el('d-name');
    const dText = SB.el('d-text');
    
    spL.style.opacity = 0; spR.style.opacity = 0;
    dName.className = 'dialogue-name';
    dText.className = 'dialogue-text';
    
    if (beat.who === 'sb') {
        dName.textContent = 'Señora Biomecánica';
        dName.classList.add('sb');
        spL.style.opacity = 1;
        SB.loadImg('characters', `sb_${beat.mood}`, FALLBACK_SB, (src, fall) => {
            spL.innerHTML = src ? `<img src="${src}" class="sprite anim-idle">` : fall;
        });
    } else if (beat.who === 'carlos') {
        dName.textContent = 'Carlos';
        dName.classList.add('carlos');
        spR.style.opacity = 1;
        SB.loadImg('characters', `carlos_${beat.mood}`, FALLBACK_CARLOS, (src, fall) => {
            spR.innerHTML = src ? `<img src="${src}" class="sprite anim-idle">` : fall;
        });
    } else {
        dName.textContent = 'Narrador';
        dName.classList.add('narrator');
        dText.classList.add('narrator-text');
    }
    
    // Escritura
    SB.isTyping = true;
    SB.fullText = beat.text;
    dText.innerHTML = '';
    
    // Voz
    SB.speak(SB.fullText, beat.who);
    
    let tIdx = 0;
    const txtContent = SB.fullText.replace(/<[^>]*>?/gm, ''); // Para modo texto, si hay html escribirlo rápido
    dText.innerHTML = SB.fullText; // Por simplicidad y evitar romper HTML, lo mostramos completo
    SB.isTyping = false;
    
    // Autoplay logic
    if (SB.state.autoplay) {
        SB.onVoiceEnd = () => {
            const tm = setTimeout(() => { SB.nextBeat(); }, 1000);
            SB.timers.push(tm);
        };
        if (!SB.state.voice || beat.who === 'narrator') {
            const tm = setTimeout(() => { SB.nextBeat(); }, Math.max(2500, SB.fullText.length * 50));
            SB.timers.push(tm);
        }
    }
};

SB.nextBeat = () => {
    if (SB.isTyping) {
        SB.isTyping = false;
        SB.el('d-text').innerHTML = SB.fullText;
        return;
    }
    SB.clearTimers();
    
    let chIdx = SB.state.story.chapter;
    let scIdx = SB.state.story.screen;
    let bIdx = SB.state.story.beat;
    
    bIdx++;
    if (bIdx >= SB.CHAPTERS[chIdx].screens[scIdx].beats.length) {
        bIdx = 0;
        scIdx++;
        if (scIdx >= SB.CHAPTERS[chIdx].screens.length) {
            scIdx = 0;
            chIdx++;
            if (chIdx >= SB.CHAPTERS.length) {
                // Fin de la historia
                SB.state.story.done = true;
                SB.Storage.save();
                SB.go('missionsIntro');
                return;
            }
        }
    }
    
    SB.state.story.chapter = chIdx;
    SB.state.story.screen = scIdx;
    SB.state.story.beat = bIdx;
    SB.Storage.save();
    
    // Re-render completo si cambia de pantalla
    if (bIdx === 0) {
        SB.renderStory();
    } else {
        SB.startBeat();
    }
};

SB.prevBeat = () => {
    SB.clearTimers();
    let chIdx = SB.state.story.chapter;
    let scIdx = SB.state.story.screen;
    let bIdx = SB.state.story.beat;
    
    bIdx--;
    if (bIdx < 0) {
        scIdx--;
        if (scIdx < 0) {
            chIdx--;
            if (chIdx < 0) {
                SB.go('storyMenu');
                return;
            }
            scIdx = SB.CHAPTERS[chIdx].screens.length - 1;
        }
        bIdx = SB.CHAPTERS[chIdx].screens[scIdx].beats.length - 1;
    }
    
    SB.state.story.chapter = chIdx;
    SB.state.story.screen = scIdx;
    SB.state.story.beat = bIdx;
    SB.Storage.save();
    
    if (bIdx === SB.CHAPTERS[chIdx].screens[scIdx].beats.length - 1) {
        SB.renderStory();
    } else {
        SB.startBeat();
    }
};

SB.toggleAutoplay = () => {
    SB.state.autoplay = !SB.state.autoplay;
    SB.Storage.save();
    if (SB.state.autoplay) SB.nextBeat();
    else SB.clearTimers();
    const btnAuto = SB.el('btn-auto'); if (btnAuto) btnAuto.innerHTML = SB.state.autoplay ? '<i class="fa-solid fa-pause"></i> Pausa' : '<i class="fa-solid fa-play"></i> Película';
};
