
window.SB = window.SB || {};

SB.renderScreen = (params) => {
    const s = SB.state.screen;
    const appEl = SB.el('app');
    appEl.innerHTML = '';
    
    if (s === 'welcome') {
        appEl.innerHTML = `
            <div class="card" style="text-align: center; margin-top:2rem;">
                <h1 class="fade-in" style="margin-bottom:2rem; line-height: 1.2; font-size:2.5rem; color:var(--sky); text-shadow: 2px 2px 0 var(--ink);">Explorando el Movimiento Corporal Humano:<br>un viaje con la Señora biomecánica</h1>
                <div style="display:flex; justify-content:center; margin-bottom: 2rem;">
                    <div style="width:250px; height: 350px; animation: bob 3s infinite ease-in-out; margin: 0 auto; display:flex; justify-content:center; align-items:flex-end;">
                        <img src="assets/characters/sb_neutral.svg" style="max-width:100%; max-height:100%; object-fit:contain;" alt="Señora Biomecánica" onerror="this.outerHTML='<div style=\'width:150px; height:150px; background:var(--sky); border-radius:50%; display:flex; align-items:center; justify-content:center; border:4px solid var(--ink);\'><i class=\'fa-solid fa-user\' style=\'font-size:4rem;\'></i></div>'">
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
    else if (s === 'storyMenu') {
        appEl.innerHTML = `<div class="card"><h2><i class="fa-solid fa-book-open"></i> Capítulos de la Historia</h2><p style="margin-bottom:1rem;">Puedes saltar libremente.</p><div style="display:flex; flex-direction:column; gap:1rem;" id="ch-list"></div></div>`;
        const list = SB.el('ch-list');
        SB.CHAPTERS.forEach(ch => {
            list.innerHTML += `<button class="btn-secondary" style="text-align:left; font-size:1.2rem;" onclick="SB.state.story.chapter=${ch.id}; SB.state.story.screen=0; SB.state.story.beat=0; SB.go('story')"><b>${ch.id}.</b> ${ch.title} <br><span style="font-size:0.9rem; color:var(--coral); font-weight:normal;">${ch.subtitle}</span></button>`;
        });
        if(SB.state.story.done) {
            list.innerHTML += `<button class="btn-primary" style="margin-top:2rem;" onclick="SB.go('missionsIntro')"><i class="fa-solid fa-gamepad"></i> Ir a las Misiones</button>`;
        }
    }
    else if (s === 'story') {
        SB.renderStory();
    }
    else if (s === 'missionsIntro') {
        appEl.innerHTML = `
            <div class="card fade-in" style="text-align:center;">
                <h2>Sala de Misiones</h2>
                <p style="font-size:1.2rem; margin: 1rem 0;">La espalda de Carlos está al 10% de salud. Cada misión que superes le devuelve energía. Cuando llegue al 100%, habremos resuelto el caso.</p>
                <button class="btn-primary" style="font-size:1.2rem;" onclick="SB.go('missions')"><i class="fa-solid fa-play"></i> Entrar al Mapa</button>
            </div>
        `;
    }
    else if (s === 'missions') {
        appEl.innerHTML = `<div class="card"><h2>Mapa de Misiones <i class="fa-solid fa-gamepad"></i></h2><p style="margin-bottom:1rem;">Resuelve las misiones para llenar la espalda de Carlos.</p><div style="display:flex; gap:1rem; flex-wrap:wrap; justify-content:center; margin-top:2rem;" id="m-list"></div></div>`;
        const c = SB.el('m-list');
        const unlockAll = window.location.search.includes('docente=1');
        SB.MISSIONS.forEach(m => {
            const isLocked = !unlockAll && m.id > SB.state.unlocked;
            const isDone = SB.state.completed.includes(m.id);
            c.innerHTML += `<button class="btn-secondary" style="${isLocked?'opacity:0.5; cursor:not-allowed;':''}" onclick="if(!${isLocked}) SB.go('mission', {id:${m.id}})">
                <div style="font-size:2rem;">${isLocked?'<i class="fa-solid fa-lock"></i>': (isDone?'<i class="fa-solid fa-check"></i>':'<i class="fa-solid fa-star"></i>')}</div>Misión ${m.id}
            </button>`;
        });
        const fin = unlockAll || SB.state.completed.length >= 6;
        c.innerHTML += `<button class="btn-primary" style="${!fin?'opacity:0.5; cursor:not-allowed;':''} margin-top:1rem; width:100%;" onclick="if(${fin}) SB.go('carlos')"><div style="font-size:2rem;">${fin?'<i class="fa-solid fa-industry"></i>':'<i class="fa-solid fa-lock"></i>'}</div>Reto Final: Caso Carlos</button>`;
    }
    else if (s === 'mission') {
        const m = SB.MISSIONS.find(x => x.id === params.id);
        appEl.innerHTML = `
            <div class="card fade-in">
                <h2>${m.title}</h2>
                <div style="background:var(--bg); padding:1rem; border-radius:8px; margin-bottom:1rem; border:2px solid var(--ink);">
                    <b>Señora Biomecánica:</b> "${m.intro}"
                </div>
                <div id="game-container"></div>
                <div id="game-feedback" class="game-feedback"></div>
                <button id="btn-reveal" class="btn-secondary hidden" style="margin-top:1rem;width:100%">Ver respuesta</button>
                <button id="btn-back" class="btn-primary hidden" style="margin-top:1rem; width:100%" onclick="SB.go('missions')">Volver al mapa</button>
            </div>
        `;
        const fb = SB.el('game-feedback');
        const rev = SB.el('btn-reveal');
        
        SB.initGame(SB.el('game-container'), m, (ok, attempts) => {
            if(ok) {
                fb.className = 'game-feedback show success';
                fb.innerHTML = `<i class="fa-solid fa-check"></i> ¡Correcto! ${m.game.explain}`;
                rev.classList.add('hidden');
                SB.el('btn-back').classList.remove('hidden');
                SB.award(m.id, attempts === 0 ? 20 : (attempts === 1 ? 10 : 5));
            } else {
                rev.classList.remove('hidden');
                rev.onclick = () => {
                    fb.className = 'game-feedback show success';
                    fb.innerHTML = `<i class="fa-solid fa-check"></i> Revelado. ${m.game.explain}`;
                    rev.classList.add('hidden');
                    SB.el('btn-back').classList.remove('hidden');
                    SB.award(m.id, 5);
                };
            }
        });
    }
    else if (s === 'carlos') {
        appEl.innerHTML = `<div class="card fade-in"><h2>Reto Final: El Caso de Carlos <i class="fa-solid fa-industry"></i></h2><p>${SB.CARLOS_CASE.intro}</p><div id="cards" style="margin-top:1rem;"></div><button id="btn-fin" class="btn-primary hidden" style="width:100%; margin-top:1rem;" onclick="SB.go('final')">Finalizar Caso</button></div>`;
        const cc = SB.el('cards');
        SB.CARLOS_CASE.questions.forEach(q => {
            const done = SB.state.carlosDone.includes(q.id);
            cc.innerHTML += `<div class="card" style="border:2px solid var(--ink); box-shadow:none;"><p><b>${q.id}. ${q.q}</b></p>
            <textarea class="${done?'hidden':''}" style="width:100%; margin-top:0.5rem; padding:0.5rem; border:2px solid var(--ink); border-radius:4px;" placeholder="Escribe tu hipótesis (opcional)"></textarea>
            <button class="btn-secondary ${done?'hidden':''}" style="margin-top:0.5rem;" onclick="SB.solveCarlos(${q.id}, this)">Ver respuesta oficial</button>
            <div class="${done?'':'hidden'}" style="margin-top:1rem; padding-top:1rem; border-top:2px dashed var(--ink); color:var(--sky); font-weight:bold;">${q.a}</div></div>`;
        });
        if(SB.state.carlosDone.length === 4) SB.el('btn-fin').classList.remove('hidden');
    }
    else if (s === 'final') {
        appEl.innerHTML = `
            <div class="card fade-in" style="text-align:center;">
                <h1>Resultados Finales</h1>
                <h2 style="font-size:3rem; color:var(--sky); text-shadow:2px 2px 0 var(--ink);">${SB.state.points} / 140 pts</h2>
                <p style="font-size:1.2rem; font-weight:bold;">¡Misión cumplida, agente de prevención!</p>
                <div style="background:var(--bg); border:2px solid var(--ink); border-radius:8px; padding:1rem; margin-top:1rem; text-align:left;">
                    <h3>Referencias Normativas:</h3>
                    <ul style="margin-left:1.5rem; margin-top:0.5rem;">
                        <li>Res. 2400/1979</li><li>Decreto 1072/2015</li><li>GTC 45</li><li>ISO 11228-1</li><li>Ecuación NIOSH</li><li>Directiva 90/269/CEE</li>
                    </ul>
                </div>
                <div style="margin-top:2rem; display:flex; flex-direction:column; gap:1rem;">
                    <button class="btn-primary" onclick="SB.go('storyMenu')"><i class="fa-solid fa-book-open"></i> Volver a ver la historia</button>
                    <button class="btn-secondary" onclick="SB.go('missions')"><i class="fa-solid fa-gamepad"></i> Volver al mapa</button>
                    <button class="btn-secondary" onclick="if(confirm('¿Reiniciar todo el progreso?')) { localStorage.removeItem(SB.Storage.key); window.location.reload(); }"><i class="fa-solid fa-rotate-left"></i> Reiniciar progreso</button>
                </div>
            </div>`;
    }
};

SB.solveCarlos = (id, btn) => {
    if(!SB.state.carlosDone.includes(id)) {
        SB.state.carlosDone.push(id);
        SB.state.points += 5;
        SB.Storage.save();
        SB.updateHUD();
        btn.classList.add('hidden');
        btn.previousElementSibling.classList.add('hidden');
        btn.nextElementSibling.classList.remove('hidden');
        if(SB.state.carlosDone.length === 4) SB.el('btn-fin').classList.remove('hidden');
    }
};
