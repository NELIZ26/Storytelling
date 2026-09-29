
        const GLOSSARY = {
            "estático": "Trabajo muscular donde hay tensión continua sin movimiento, impidiendo el flujo sanguíneo.",
            "dinámico": "Trabajo muscular con ciclos de contracción y relajación, favoreciendo la circulación.",
            "diartrosis": "Articulaciones de gran movilidad, como el hombro y la rodilla.",
            "anfiartrosis": "Articulaciones con movilidad muy limitada, como los discos intervertebrales.",
            "sinartrosis": "Articulaciones fijas, sin movimiento, como las suturas del cráneo.",
            "mioglobina": "Proteína muscular que almacena oxígeno para producir energía.",
            "ATP": "Adenosín Trifosfato, la molécula que proporciona energía inmediata para la contracción muscular.",
            "NIOSH": "Instituto Nacional para la Seguridad y Salud Ocupacional, creadores de la ecuación para evaluar tareas de levantamiento."
        };

        const AVATAR_SVG = `<svg class="sprite-fallback" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#bae6fd"/><circle cx="50" cy="40" r="25" fill="#fde047"/><path d="M 30 90 Q 50 60 70 90" fill="#0284c7"/><circle cx="40" cy="35" r="5" fill="#333"/><circle cx="60" cy="35" r="5" fill="#333"/><path class="mouth" d="M 45 50 L 55 50" fill="none" stroke="#333" stroke-width="2"/></svg>`;
        const CARLOS_SVG = `<svg class="sprite-fallback" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#e2e8f0"/><circle cx="50" cy="40" r="25" fill="#fca5a5"/><path d="M 30 90 Q 50 60 70 90" fill="#64748b"/><circle cx="40" cy="35" r="5" fill="#333"/><circle cx="60" cy="35" r="5" fill="#333"/><path class="mouth" d="M 45 55 Q 50 50 55 55" fill="none" stroke="#333" stroke-width="2"/></svg>`;

        const BG_GRADIENTS = {
            "bodega_tarde": "linear-gradient(to bottom, #fdba74, #94a3b8)",
            "bodega_manana": "linear-gradient(to bottom, #bae6fd, #fef3c7)",
            "interior_cuerpo": "linear-gradient(to bottom, #1e3a8a, #4c1d95)",
            "fabrica_energia": "linear-gradient(to bottom, #0f766e, #f59e0b)",
            "gimnasio": "linear-gradient(to bottom, #3b82f6, #94a3b8)",
            "linea_reloj": "linear-gradient(to bottom, #64748b, #fca5a5)",
            "zona_carga": "linear-gradient(to bottom, #f97316, #2563eb)",
            "sala_reunion": "linear-gradient(to bottom, #60a5fa, #ffffff)",
            "bodega_feliz": "linear-gradient(to bottom, #fef08a, #bbf7d0)"
        };

        const CONTENT = {
            stations: [
                {
                    id: 1, emoji: "💪", title: "Trabajo muscular", bg: "bodega_manana",
                    screens: [
                        { type: 'story', bg: 'bodega_manana', beats: [
                            { who: 'narrator', text: 'Flashback: 7:00 a. m. Carlos sostiene una caja frente al pecho mientras espera el montacargas.' },
                            { who: 'sb', mood: 'explaining', text: 'Mira sus brazos: no se mueven, pero los músculos trabajan a tope. Eso es <a class="glossary-link" onclick="app.showGlossary(\'estático\')">estático</a>: tensión sostenida sin cambiar de longitud.' },
                            { who: 'sb', mood: 'worried', text: 'Al mantenerse apretado, el músculo aplasta sus propios capilares. Llega menos oxígeno, se acumula ácido láctico... y aparece la fatiga.' },
                            { who: 'carlos', mood: 'tired', text: 'Por eso me cansa más esperar con la caja que caminar con ella.' },
                            { who: 'sb', mood: 'happy', text: 'Exacto. Al caminar o pedalear el trabajo es <a class="glossary-link" onclick="app.showGlossary(\'dinámico\')">dinámico</a>: el músculo se contrae y se relaja, y bombea la sangre. Veámoslo de cerca.' }
                        ]},
                        { type: 'explore', widget: 'flowToggle', beat: {who: 'sb', mood: 'explaining', text: 'Cambia el interruptor y observa qué pasa con la sangre.'}, 
                          ficha: ["<b>Trabajo estático:</b> el músculo genera tensión sin cambiar su longitud (contracción isométrica). Al mantenerse contraído comprime los capilares, reduce la llegada de oxígeno (isquemia transitoria, hipoxia local) y se acumulan metabolitos como el ácido láctico. Resultado: <b>fatiga rápida</b>.", "<b>Trabajo dinámico:</b> ciclos rítmicos de acortamiento (concéntrico) y elongación (excéntrico). Funciona como 'bomba muscular': favorece el retorno venoso y el aporte de nutrientes. Fatiga más lenta."]
                        },
                        { type: 'game', clue: "Carlos sostiene cargas sin moverse: trabajo estático y fatiga rápida.",
                          game: { type: "classify", items: [ { text: "Sostener una caja en el aire", cat: "E" }, { text: "Pedalear", cat: "D" }, { text: "Caminar", cat: "D" }, { text: "Mantener el brazo extendido", cat: "E" }, { text: "Estar de pie sin moverse", cat: "E" }, { text: "Subir escaleras", cat: "D" } ], categories: [ { id: "E", label: "Estático" }, { id: "D", label: "Dinámico" } ], explain: "El trabajo estático corta el flujo de sangre; el dinámico lo bombea." }
                        }
                    ]
                },
                {
                    id: 2, emoji: "🦴", title: "Sistema óseo", bg: "interior_cuerpo",
                    screens: [
                        { type: 'story', bg: 'interior_cuerpo', beats: [
                            { who: 'narrator', text: 'La Señora Biomecánica activa su lupa y se reducen hasta entrar en el cuerpo de Carlos.' },
                            { who: 'sb', mood: 'explaining', text: 'Bienvenido al sistema óseo: 206 huesos que sostienen, protegen y funcionan como palancas cuando los músculos tiran de ellos.' },
                            { who: 'sb', mood: 'neutral', text: 'Se unen en articulaciones: fijas (<a class="glossary-link" onclick="app.showGlossary(\'sinartrosis\')">sinartrosis</a>) como el cráneo, semimóviles (<a class="glossary-link" onclick="app.showGlossary(\'anfiartrosis\')">anfiartrosis</a>) como los discos vertebrales, y móviles (<a class="glossary-link" onclick="app.showGlossary(\'diartrosis\')">diartrosis</a>) como hombro y rodilla.' },
                            { who: 'sb', mood: 'worried', text: 'Cuidado con la zona lumbar: L4-L5 y L5-S1 son semimóviles y cargan casi todo el peso de Carlos.' },
                            { who: 'sb', mood: 'thinking', text: 'Cada articulación tiene un arco de movilidad: cuántos grados puede recorrer. Probémoslo.' }
                        ]},
                        { type: 'explore', widget: 'joints', beat: {who: 'sb', mood: 'happy', text: 'Elige una articulación y mueve el control para medir su arco.'},
                          ficha: ["El esqueleto tiene <b>206 huesos</b> que funcionan como <b>palancas</b> movidas por la fuerza muscular.", "<b>Arcos de movilidad:</b> flexión de hombro 0°–180°; flexión de rodilla 0°–135°; columna lumbar flexión 0°–60° y extensión 0°–25°."]
                        },
                        { type: 'game', clue: "La zona lumbar (L4-L5, L5-S1) es semimóvil y soporta la mayor parte de la carga.",
                          game: { type: "match", pairs: [ { left: "Hombro", right: "Diartrosis · 0°–180°" }, { left: "Rodilla", right: "Diartrosis · 0°–135°" }, { left: "Discos intervertebrales", right: "Anfiartrosis · mov. limitado" }, { left: "Suturas del cráneo", right: "Sinartrosis · sin mov." } ], explain: "Diartrosis = mucho mov. Anfiartrosis = poco. Sinartrosis = nada." }
                        }
                    ]
                },
                {
                    id: 3, emoji: "⚡", title: "Sistema muscular", bg: "fabrica_energia",
                    screens: [
                        { type: 'story', bg: 'fabrica_energia', beats: [
                            { who: 'narrator', text: 'Siguen hasta un músculo del brazo. Por dentro parece... ¡una fábrica!' },
                            { who: 'sb', mood: 'explaining', text: 'Hay tres tipos de músculo: esquelético, cardíaco y liso. A Carlos le duele el esquelético.' },
                            { who: 'sb', mood: 'neutral', text: 'Las fibras lentas son ricas en <a class="glossary-link" onclick="app.showGlossary(\'mioglobina\')">mioglobina</a>; las rápidas se agotan pronto.' },
                            { who: 'sb', mood: 'explaining', text: 'La orden llega por el nervio, se libera calcio y la miosina jala a la actina, como remeros.' },
                            { who: 'sb', mood: 'worried', text: 'La energía es el <a class="glossary-link" onclick="app.showGlossary(\'ATP\')">ATP</a>, la moneda de la fábrica. Sin pausas, la bodega de combustible se vacía.' }
                        ]},
                        { type: 'explore', widget: 'sarcomere', beat: {who: 'sb', mood: 'happy', text: 'Pulsa el botón y mira cómo se contrae una fibra.'},
                          ficha: ["<b>Contracción:</b> el impulso nervioso libera <b>Ca²⁺</b>, que deja libres los sitios de la actina; la miosina se une y consume <b>ATP</b>, que se resintetiza desde el glucógeno."]
                        },
                        { type: 'game', clue: "Sin pausas se agota el glucógeno y el ATP: el músculo se fatiga y se lesiona.",
                          game: { type: "order", items: [ { id: 1, text: "Llega el impulso nervioso" }, { id: 2, text: "Se libera calcio" }, { id: 3, text: "La miosina consume ATP" }, { id: 4, text: "Filamentos se deslizan" }, { id: 5, text: "El músculo se acorta" } ], explain: "Nervio -> Calcio -> ATP -> Deslizamiento -> Contracción." }
                        }
                    ]
                },
                {
                    id: 4, emoji: "📐", title: "Postura", bg: "gimnasio",
                    screens: [
                        { type: 'story', bg: 'gimnasio', beats: [
                            { who: 'narrator', text: 'Para comparar, se teletransportan a un gimnasio. Una levantadora de pesas prepara su técnica.' },
                            { who: 'sb', mood: 'explaining', text: 'La postura es la alineación de los segmentos. Se clasifica de tres maneras.' },
                            { who: 'sb', mood: 'neutral', text: 'Por posición (bípeda, sedente). Por tiempo: mantenida (> 2 h) o prolongada (> 75 % jornada).' },
                            { who: 'sb', mood: 'neutral', text: 'Por movimiento: neutra, forzada (extremos articulares) o antigravitatoria (brazos arriba).' },
                            { who: 'sb', mood: 'worried', text: 'La deportista mantiene postura neutra. Carlos trabaja agachado, girando el tronco... ocho horas.' },
                            { who: 'sb', mood: 'alert', text: 'Reflexión: una mala postura no duele hoy, duele en meses. Corregirla previene lesiones.' }
                        ]},
                        { type: 'explore', widget: 'posture', beat: {who: 'sb', mood: 'happy', text: 'Compara las tres posturas y fíjate en su clasificación.'},
                          ficha: ["<b>Postura:</b> alineación espacial. Mantenida: >2 horas continuas. Prolongada: >75% jornada. Neutra: confort. Forzada: extremos articulares. Antigravitatoria: brazos altos."]
                        },
                        { type: 'game', clue: "Carlos trabaja en postura forzada, con flexión y torsión del tronco, durante horas.",
                          game: { type: "choice", question: "¿Cuál combina postura forzada, mantenida y antigravitatoria?", options: [ { id: "A", text: "Secretaria sentada con apoyo" }, { id: "B", text: "Cajero de pie alternando peso" }, { id: "C", text: "Pintor con brazos altos 3 h seguidas", correct: true }, { id: "D", text: "Operario caminando con caja liviana" } ], explain: "Brazos altos = antigravitatoria; 3h = mantenida." }
                        }
                    ]
                },
                {
                    id: 5, emoji: "🔄", title: "Movimiento", bg: "linea_reloj",
                    screens: [
                        { type: 'story', bg: 'linea_reloj', beats: [
                            { who: 'narrator', text: '2:00 p. m. Un reloj gigante marca cada gesto. Carlos toma, gira, deja. Toma, gira, deja.' },
                            { who: 'sb', mood: 'explaining', text: 'Movimiento es el cambio de posición: los músculos tiran, las articulaciones lo permiten.' },
                            { who: 'sb', mood: 'alert', text: 'Si el gesto se repite en ciclos menores a 30 segundos, o más de la mitad es igual, es trabajo repetitivo.' },
                            { who: 'sb', mood: 'worried', text: 'Cada repetición causa microdaño. Sin descanso: túnel del carpo, epicondilitis.' },
                            { who: 'carlos', mood: 'tired', text: '¿Y yo qué puedo hacer?' },
                            { who: 'sb', mood: 'happy', text: 'Rotar de puesto, mejorar herramientas y micropausas activas. Mira cuántas veces repites tú.' }
                        ]},
                        { type: 'explore', widget: 'repCounter', beat: {who: 'sb', mood: 'thinking', text: 'Cambia los segundos por ciclo y mira el acumulado.'},
                          ficha: ["<b>Trabajo repetitivo:</b> ciclos < 30 s o > 50% del ciclo igual. Riesgos: tenosinovitis, túnel del carpo. Prevención: pausas, rotación."]
                        },
                        { type: 'game', clue: "Carlos repite el mismo ciclo miles de veces por turno: microtraumatismos acumulativos.",
                          game: { type: "multi", question: "Selecciona SOLO las medidas eficaces:", options: [ { id: 1, text: "Rotar al trabajador", correct: true }, { id: 2, text: "Aumentar velocidad", correct: false }, { id: 3, text: "Rediseñar herramientas", correct: true }, { id: 4, text: "Eliminar descansos", correct: false }, { id: 5, text: "Micropausas activas", correct: true }, { id: 6, text: "Horas extras sin cambio", correct: false } ], explain: "Rotar, rediseñar y pausar son las claves." }
                        }
                    ]
                },
                {
                    id: 6, emoji: "📦", title: "Carga", bg: "zona_carga",
                    screens: [
                        { type: 'story', bg: 'zona_carga', beats: [
                            { who: 'narrator', text: '5:00 p. m. Regresan a la zona de carga.' },
                            { who: 'sb', mood: 'explaining', text: 'Carga manual se considera desde 3 kg. La técnica segura evita lesiones.' },
                            { who: 'sb', mood: 'neutral', text: 'En Colombia (Res. 2400) el límite es 25 kg para hombres. La <a class="glossary-link" onclick="app.showGlossary(\'NIOSH\')">ecuación NIOSH</a> parte de 23 kg ideales.' },
                            { who: 'carlos', mood: 'neutral', text: 'Entonces mis 15 kilos están dentro del límite...' },
                            { who: 'sb', mood: 'alert', text: '¡Ahí está el giro! Esos límites son para condiciones ideales. Con mala postura, torsión y repetición, 15 kg pueden ser demasiado.' },
                            { who: 'sb', mood: 'happy', text: 'Aprendamos a levantar una caja.' }
                        ]},
                        { type: 'explore', widget: 'liftSteps', beat: {who: 'sb', mood: 'explaining', text: 'Avanza paso a paso y observa la postura correcta.'},
                          ficha: ["Técnica segura: pies separados, carga pegada, rodillas flexionadas, espalda recta, SIN torsión.", "<b>Límites legales:</b> Res. 2400/1979 (H:25kg, M:12.5kg). ISO 11228-1 / NIOSH (23kg ideal)."]
                        },
                        { type: 'game', clue: "15 kg cumplen el límite legal, pero postura + torsión + repetición lo vuelven riesgoso.",
                          game: { type: "choice-svg", question: "¿Cuál es el levantamiento correcto?", options: [ { id: "A", text: "A", correct: false, svg: '<svg viewBox="0 0 100 100" width="80" height="80"><path d="M40 30 Q60 40 50 70 M50 70 L45 95 M50 70 L60 95 M40 35 L75 55" stroke="black" stroke-width="4" fill="none"/><circle cx="40" cy="20" r="8" fill="none" stroke="black" stroke-width="4"/><rect x="75" y="50" width="20" height="20"/></svg>' }, { id: "B", text: "B", correct: true, svg: '<svg viewBox="0 0 100 100" width="80" height="80"><path d="M50 30 L50 60 L30 95 M50 60 L45 95 M50 35 L65 50" stroke="black" stroke-width="4" fill="none"/><circle cx="50" cy="20" r="8" fill="none" stroke="black" stroke-width="4"/><rect x="65" y="40" width="20" height="20"/></svg>' }, { id: "C", text: "C", correct: false, svg: '<svg viewBox="0 0 100 100" width="80" height="80"><path d="M50 30 L50 70 M50 70 L45 95 M50 70 L55 95 M50 35 L20 45 M50 35 L80 45" stroke="black" stroke-width="4" fill="none"/><circle cx="50" cy="20" r="8" fill="none" stroke="black" stroke-width="4"/><rect x="10" y="40" width="15" height="15"/><rect x="75" y="40" width="15" height="15"/></svg>' } ], explain: "Rodillas flexionadas, espalda recta y carga pegada." }
                        }
                    ]
                }
            ],
            carlos: {
                intro: "Carlos trabaja en un almacén levantando, transportando y ubicando cajas de <b>15 kg</b> de forma repetitiva y <b>sin pausas</b>.",
                questions: [
                    { id: 1, q: "¿Qué tipo de trabajo muscular realiza Carlos?", a: "Trabajo combinado: dinámico al levantar y estático prolongado al sostener. Aunque 15 kg no superan el límite de 25 kg de la Res. 2400, la repetición, la postura forzada y la ausencia de pausas reducen el peso seguro (ecuación NIOSH)." },
                    { id: 2, q: "¿Qué sistemas anatómicos están involucrados?", a: "Osteoarticular (lumbosacras, discos, hombros), Muscular (erectores espinales, etc), Nervioso y Circulatorio." },
                    { id: 3, q: "¿Qué consecuencias o patologías puede tener?", a: "Lumbalgia mecánica, hernia discal, tendinopatía, DME acumulativos." },
                    { id: 4, q: "¿Qué medidas preventivas recomiendas?", a: "Pausas activas cada 2h, ayudas mecánicas, ubicar carga a buena altura. Aunque 15 kg no superan el límite de 25 kg de la Res. 2400, la repetición y postura reducen el peso seguro (ecuación NIOSH)." }
                ]
            }
        };

        const PrologueBeats = [
            { who: 'narrator', text: 'Almacén Andino, 5:40 p. m. Ocho horas de turno. Una caja más... y Carlos se detiene.' },
            { who: 'carlos', mood: 'tired', text: 'Ay, mi espalda... La siento como una piedra y los brazos me tiemblan.' },
            { who: 'sb', mood: 'alert', text: 'Buenas tardes, Carlos. Soy la Señora Biomecánica. Me llamaron porque tu cuerpo lleva horas enviando señales de alarma.' },
            { who: 'carlos', mood: 'neutral', text: '¿Señales? Yo solo cargo cajas de 15 kilos. No es tanto...' },
            { who: 'sb', mood: 'thinking', text: 'Ese es el misterio: 15 kg no superan el límite legal, pero algo en tu forma de trabajar te está desgastando.' },
            { who: 'sb', mood: 'happy', text: 'Vamos a investigarlo por dentro. Cada estación te dará una pista para el expediente de Carlos. ¿Me ayudas, detective?' }
        ];

        let state = { screen: 'welcome', current: 0, unlocked: 1, completed: [], points: 0, carlosDone: [], clues: [], screenIdx: 0, voice: false };
        let typeInterval, voiceSynth = window.speechSynthesis, currentUtterance;
        let pendingTimers = [];

        const Storage = {
            key: 'sb_progress_v2',
            save: () => { try { localStorage.setItem(Storage.key, JSON.stringify(state)); } catch(e){} },
            load: () => { try { const d = localStorage.getItem(Storage.key); if(d) { const p=JSON.parse(d); if(p.points!==undefined) state=p; } } catch(e){} }
        };

        const el = id => document.getElementById(id);
        const ce = tag => document.createElement(tag);
        
        function updateHUD() {
            if(state.screen==='welcome') { el('hud').classList.add('hidden'); return; }
            el('hud').classList.remove('hidden');
            el('hud-points').textContent = `⭐ ${state.points}`;
            const meter = 10 + 60*(state.completed.length/6) + 30*(state.carlosDone.length/4);
            const mEl = el('carlos-meter');
            mEl.style.width = `${Math.min(100, Math.round(meter))}%`;
            mEl.style.backgroundColor = meter > 80 ? 'var(--ok)' : (meter > 40 ? 'var(--accent)' : 'var(--bad)');
            
            const nav = el('hud-nav');
            nav.innerHTML = `<button class="btn-icon" onclick="go('map')" title="Mapa">🏠</button>`;
            for(let i=1; i<=6; i++) {
                const isLocked = i > state.unlocked;
                nav.innerHTML += `<button class="btn-icon ${isLocked?'locked':''}" onclick="if(!${isLocked}) go('station', ${i})" title="Estación ${i}">${i}</button>`;
            }
            const allC = state.completed.length >= 6;
            nav.innerHTML += `<button class="btn-icon ${!allC?'locked':''}" onclick="if(${allC}) go('carlos')" title="Caso Carlos">🏭</button>`;
            nav.innerHTML += `<button class="btn-icon" onclick="app.showClues()" title="Expediente">📁</button>`;
            
            el('btn-voice').textContent = state.voice ? '🔊' : '🔇';
        }

        function clearTimers() {
            clearInterval(typeInterval);
            pendingTimers.forEach(clearTimeout);
            pendingTimers = [];
            if(voiceSynth) voiceSynth.cancel();
        }

        function go(screenName, param = null) {
            clearTimers();
            state.screen = screenName;
            if(screenName==='station') state.current = param;
            state.screenIdx = 0;
            Storage.save();
            updateHUD();
            render();
        }

        function render() {
            const appEl = el('app');
            appEl.innerHTML = '';
            window.scrollTo(0, 0);
            
            if(state.screen === 'welcome') {
                appEl.innerHTML = `
                    <div class="card" style="text-align: center; margin-top:2rem;">
                        <h1 class="fade-in" style="margin-bottom:2rem; line-height: 1.2;">Explorando el Movimiento Corporal Humano:<br>un viaje con la Señora biomecánica</h1>
                        <div style="display:flex; justify-content:center; margin-bottom: 2rem;">
                            <div style="width:150px; animation: float 3s infinite ease-in-out;">${AVATAR_SVG}</div>
                        </div>
                        <button class="btn-primary fade-in" style="font-size:1.2rem; padding: 1rem 2rem;" onclick="go('prologue')">🚀 Comenzar la ruta</button>
                        <br><br><button class="btn-secondary" onclick="app.toggleVoice(); this.textContent=state.voice?'🔊 Voz: Encendida':'🔇 Voz: Apagada'">🔇 Voz: Apagada</button>
                    </div>`;
            } else if (state.screen === 'map') {
                appEl.innerHTML = `<div class="card"><h2>Mapa de Ruta</h2><p style="margin-bottom:1rem;">Selecciona una estación.</p><div style="display:flex; gap:1rem; flex-wrap:wrap; justify-content:center; margin-top:2rem;"></div></div>`;
                const c = appEl.querySelector('div>div');
                CONTENT.stations.forEach(st => {
                    const l = st.id > state.unlocked;
                    c.innerHTML += `<button class="btn-secondary" style="${l?'opacity:0.5; cursor:not-allowed;':''}" onclick="if(!${l}) go('station', ${st.id})">
                        <div style="font-size:2rem;">${l?'🔒':st.emoji}</div>Estación ${st.id}
                    </button>`;
                });
                const fin = state.completed.length >= 6;
                c.innerHTML += `<button class="btn-secondary" style="${!fin?'opacity:0.5; cursor:not-allowed;':''}" onclick="if(${fin}) go('carlos')"><div style="font-size:2rem;">${fin?'🏭':'🔒'}</div>Reto Final</button>`;
            } else if (state.screen === 'prologue') {
                renderScene(appEl, { bg: 'bodega_tarde', beats: PrologueBeats }, () => go('map'));
            } else if (state.screen === 'station') {
                const st = CONTENT.stations.find(s => s.id === state.current);
                const scr = st.screens[state.screenIdx];
                if (scr.type === 'story') {
                    renderScene(appEl, scr, () => { state.screenIdx++; Storage.save(); render(); });
                } else if (scr.type === 'explore') {
                    appEl.innerHTML = `<div class="card fade-in"><h2>${st.emoji} ${st.title}</h2>
                        <div style="display:flex; gap:1rem; align-items:center; background:#e0f2fe; padding:1rem; border-radius:8px;">
                            <div style="width:60px;">${AVATAR_SVG}</div><p><b>Señora Biomecánica:</b><br>${scr.beat.text}</p>
                        </div>
                        <div class="widget-container" id="widget-area">${getWidgetHTML(scr.widget)}</div>
                        <details class="ficha-tecnica"><summary style="font-weight:bold; cursor:pointer;">📋 Ficha técnica (Despliega)</summary><div style="margin-top:1rem;">${scr.ficha.join('<br><br>')}</div></details>
                        <button class="btn-primary" style="width:100%" onclick="app.nextScreenIdx()">Ir al desafío ▶</button>
                    </div>`;
                    initWidget(scr.widget);
                } else if (scr.type === 'game') {
                    appEl.innerHTML = `<div class="card fade-in"><h2>¡Desafío!</h2><div id="game-wrapper"></div><div id="game-feedback" class="game-feedback"></div><button id="btn-reveal" class="btn-secondary hidden" style="margin-top:1rem;width:100%">Ver respuesta</button><button class="btn-primary" style="margin-top:1rem; width:100%" onclick="go('map')">Volver al mapa</button></div>`;
                    initGame(st, scr);
                }
            } else if (state.screen === 'carlos') {
                appEl.innerHTML = `<div class="card fade-in"><h2>Reto Final: El Caso de Carlos 🏭</h2><p>${CONTENT.carlos.intro}</p><div id="cards" style="margin-top:1rem;"></div><button id="btn-fin" class="btn-primary hidden" style="width:100%; margin-top:1rem;" onclick="go('epilogue')">Finalizar Caso</button></div>`;
                const cc = el('cards');
                CONTENT.carlos.questions.forEach(q => {
                    const done = state.carlosDone.includes(q.id);
                    cc.innerHTML += `<div class="card" style="border:2px solid #e2e8f0; box-shadow:none;"><p><b>${q.id}. ${q.q}</b></p>
                    <textarea class="${done?'hidden':''}" style="width:100%; margin-top:0.5rem; padding:0.5rem;" placeholder="Escribe tu hipótesis (opcional)"></textarea>
                    <button class="btn-secondary ${done?'hidden':''}" style="margin-top:0.5rem;" onclick="app.solveCarlos(${q.id}, this)">Ver respuesta de la Señora Biomecánica</button>
                    <div class="${done?'':'hidden'}" style="margin-top:1rem; padding-top:1rem; border-top:1px solid #ccc;">${q.a}</div></div>`;
                });
                if(state.carlosDone.length===4) el('btn-fin').classList.remove('hidden');
            } else if (state.screen === 'epilogue') {
                renderScene(appEl, { bg: 'bodega_feliz', beats: [{who:'carlos', mood:'relieved', text:'Gracias, Señora Biomecánica. Ahora entiendo qué le pasaba a mi cuerpo.'}, {who:'sb', mood:'happy', text:'Recuerda: el movimiento se cuida con conocimiento. ¡Misión cumplida!'}] }, () => {
                    appEl.innerHTML = `<div class="card fade-in" style="text-align:center;"><h1>Resultados Finales</h1><h2 style="font-size:3rem; color:var(--primary)">${state.points} / 140 pts</h2><p>Misión cumplida, agente de prevención.</p>
                    <div style="margin:2rem 0; text-align:left;"><details class="ficha-tecnica"><summary style="font-weight:bold; cursor:pointer;">Referencias Normativas</summary><div style="margin-top:1rem;">Res. 2400/1979, Decreto 1072/2015, GTC 45, ISO 11228-1, NIOSH, Directiva 90/269/CEE</div></details></div>
                    <button class="btn-restart" style="margin-top:2rem;" onclick="app.restart()">Reiniciar todo</button></div>`;
                });
            }
        }

        window.app = {
            nextScreenIdx: () => { state.screenIdx++; Storage.save(); render(); },
            toggleVoice: () => { state.voice = !state.voice; updateHUD(); Storage.save(); },
            showClues: () => { el('clues-list').innerHTML = state.clues.length? state.clues.map(c=>`<li>${c}</li>`).join('') : '<li>Aún no tienes pistas.</li>'; el('modal-clues').style.display='flex'; },
            showGlossary: (term) => { el('glossary-title').textContent = term; el('glossary-desc').textContent = GLOSSARY[term] || ''; el('modal-glossary').style.display='flex'; },
            solveCarlos: (id, btn) => { if(!state.carlosDone.includes(id)) { state.carlosDone.push(id); state.points+=5; Storage.save(); updateHUD(); btn.classList.add('hidden'); btn.previousElementSibling.classList.add('hidden'); btn.nextElementSibling.classList.remove('hidden'); if(state.carlosDone.length===4) el('btn-fin').classList.remove('hidden'); } },
            restart: () => { if(confirm("¿Seguro?")) { localStorage.clear(); state={screen:'welcome', current:0, unlocked:1, completed:[], points:0, carlosDone:[], clues:[], screenIdx:0, voice:false}; init(); } }
        };

        function speak(text, who) {
            if(!state.voice || !voiceSynth) return;
            voiceSynth.cancel();
            const clean = text.replace(/<[^>]*>?/gm, '');
            currentUtterance = new SpeechSynthesisUtterance(clean);
            currentUtterance.lang = 'es-CO';
            currentUtterance.pitch = who==='carlos' ? 0.8 : 1.1;
            currentUtterance.rate = 0.95;
            voiceSynth.speak(currentUtterance);
        }

        // Scene Engine
        function renderScene(container, sceneData, onEnd) {
            container.innerHTML = `
                <div id="scene-container" class="fade-in">
                    <img class="scene-bg" src="assets/bg_${sceneData.bg}.webp" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div class="scene-bg" style="background: ${BG_GRADIENTS[sceneData.bg]}; display:none;"></div>
                    <div class="scene-props"></div>
                    <div class="sprite-container speaker-sb" id="sp-sb">${AVATAR_SVG}</div>
                    <div class="sprite-container speaker-carlos" id="sp-carlos">${CARLOS_SVG}</div>
                    <div class="dialogue-box" id="dialogue-box">
                        <div class="dialogue-name" id="d-name"></div>
                        <div class="dialogue-text" id="d-text"></div>
                        <div class="dialogue-indicator">▼</div>
                    </div>
                </div>
                <div class="scene-controls">
                    <button class="btn-secondary" id="btn-skip">Saltar ⏭</button>
                    <button class="btn-primary hidden" id="btn-cont">Continuar ▶</button>
                </div>
            `;
            
            const box = el('dialogue-box'), dName = el('d-name'), dText = el('d-text');
            const spSb = el('sp-sb'), spCarlos = el('sp-carlos');
            let beatIdx = 0, isTyping = false, fullText = "";
            
            const nextBeat = () => {
                if(isTyping) {
                    clearInterval(typeInterval);
                    dText.innerHTML = fullText;
                    isTyping = false;
                    return;
                }
                if(beatIdx >= sceneData.beats.length) {
                    el('btn-skip').classList.add('hidden');
                    el('btn-cont').classList.remove('hidden');
                    el('btn-cont').onclick = onEnd;
                    return;
                }
                
                const b = sceneData.beats[beatIdx];
                fullText = b.text;
                dText.innerHTML = '';
                
                spSb.classList.remove('active'); spCarlos.classList.remove('active');
                if(b.who === 'sb') { 
                    dName.textContent = 'Señora Biomecánica'; spSb.classList.add('active'); speak(fullText, 'sb'); 
                    spSb.innerHTML = `<img src="assets/sb_${b.mood||'neutral'}.webp" onerror="this.outerHTML=AVATAR_SVG" class="sprite" />`;
                }
                else if(b.who === 'carlos') { 
                    dName.textContent = 'Carlos'; spCarlos.classList.add('active'); speak(fullText, 'carlos'); 
                    spCarlos.innerHTML = `<img src="assets/carlos_${b.mood||'neutral'}.webp" onerror="this.outerHTML=CARLOS_SVG" class="sprite" />`;
                }
                else { dName.textContent = ''; spSb.classList.remove('active'); spCarlos.classList.remove('active'); }
                
                // update fallback moods
                setTimeout(()=>{
                    if(b.who==='sb' && spSb.querySelector('.mouth')){
                        if(b.mood === 'happy') spSb.querySelector('.mouth').setAttribute('d', 'M45 45 Q50 55 55 45');
                        else if(b.mood === 'worried' || b.mood === 'alert') spSb.querySelector('.mouth').setAttribute('d', 'M45 55 Q50 50 55 55');
                        else spSb.querySelector('.mouth').setAttribute('d', 'M45 50 L55 50');
                    }
                }, 50);
                
                box.style.display = 'block';
                isTyping = true;
                
                // Quick typing simulation keeping HTML tags intact is complex, so we just fade in or innerHTML directly if user prefers reduced motion
                dText.innerHTML = fullText;
                isTyping = false;
                
                beatIdx++;
            };
            
            box.onclick = nextBeat;
            el('scene-container').onclick = nextBeat;
            el('btn-skip').onclick = () => { beatIdx = sceneData.beats.length; nextBeat(); };
            
            // preloads
            if(sceneData.bg) {
                const img = new Image(); img.src = `assets/bg_${sceneData.bg}.webp`;
            }
            
            // start
            pendingTimers.push(setTimeout(nextBeat, 300));
        }

        // Widgets
        function getWidgetHTML(type) {
            if(type === 'flowToggle') return `<div style="padding:1rem; background:#fee2e2; border-radius:8px;" id="wt"><div style="display:flex; justify-content:center; gap:1rem; margin-bottom:1rem;"><button class="btn-primary" onclick="el('vessel').style.transform='scaleY(0.2)'; el('v-fat').style.width='90%'">Estático</button> <button class="btn-secondary" onclick="el('vessel').style.transform='scaleY(1)'; el('v-fat').style.width='10%'">Dinámico</button></div><div style="height:20px; border:2px solid red; border-radius:10px; overflow:hidden;"><div id="vessel" style="height:100%; width:100%; background:repeating-linear-gradient(45deg, #f87171, #f87171 10px, #fca5a5 10px, #fca5a5 20px); transition:transform 0.5s; background-size:200% 100%; animation:flowRed 1s linear infinite;"></div></div><p style="margin-top:0.5rem; font-size:0.8rem; font-weight:bold;">Fatiga: <span style="display:inline-block; width:100px; height:8px; background:#ddd;"><span id="v-fat" style="display:block; height:100%; background:var(--bad); width:10%; transition:width 1s;"></span></span></p></div>`;
            if(type === 'joints') return `<div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center;margin-bottom:1rem;"><button class="btn-secondary" onclick="app.j('Hombro',180)">Hombro</button><button class="btn-secondary" onclick="app.j('Rodilla',135)">Rodilla</button><button class="btn-secondary" onclick="app.j('Lumbar',60)">Lumbar</button><button class="btn-secondary" onclick="app.j('Cráneo',0)">Cráneo</button></div><p>Mueve el control para ver el arco de <b id="j-n">Hombro</b>:</p><input type="range" id="j-range" min="0" max="180" value="0" oninput="el('j-val').textContent=this.value+'°'; el('j-line').style.transform='rotate('+(this.value)+'deg)';"><br><b id="j-val">0°</b><div style="position:relative; width:100px; height:100px; margin: 1rem auto; border:1px solid #ccc; border-radius:50%;"><div style="position:absolute; bottom:50%; left:50%; width:2px; height:50%; background:black; transform-origin:bottom center;"></div><div id="j-line" style="position:absolute; bottom:50%; left:50%; width:4px; height:50%; background:var(--primary); transform-origin:bottom center; transform:rotate(0deg); transition:transform 0.1s;"></div></div>`;
            if(type === 'sarcomere') return `<button class="btn-primary" onclick="app.s()">⚡ Enviar impulso</button><div id="s-anim" style="margin:1rem auto; width:80%; height:40px; background:#ccc; position:relative; overflow:hidden;"><div id="s-act" style="position:absolute; top:10px; width:40%; left:0; height:20px; background:blue; transition:left 1s;"></div><div id="s-act2" style="position:absolute; top:10px; width:40%; right:0; height:20px; background:blue; transition:right 1s;"></div><div style="position:absolute; top:15px; left:25%; width:50%; height:10px; background:red;"></div></div><p id="s-msg" style="font-weight:bold;"></p><div style="font-size:0.8rem; background:#f0fdf4; padding:0.5rem; border-radius:4px; margin-top:1rem;">ATP = monedas, Glucógeno = bodega, Mitocondria = planta, Mioglobina = tanque O2.</div>`;
            if(type === 'posture') return `<div style="display:flex;gap:1rem;justify-content:center;margin-bottom:1rem;"><button class="btn-secondary" onclick="app.p('n')">Neutra</button><button class="btn-secondary" onclick="app.p('f')">Forzada</button><button class="btn-secondary" onclick="app.p('a')">Antigravitatoria</button></div><div id="p-res" style="font-weight:bold; min-height:50px;">Elige una postura.</div>`;
            if(type === 'repCounter') return `<p>Segundos por ciclo:</p><input type="range" min="5" max="60" value="10" oninput="app.r(this.value)"><br><b id="r-val">10</b> s -> <b id="r-res">2880</b> reps/turno <span id="r-w" style="color:var(--bad)">⚠ Repetitivo</span>`;
            if(type === 'liftSteps') return `<p id="l-txt" style="font-weight:bold; min-height:40px;">Paso 1: Acercarse y separar pies.</p><div style="margin:1rem 0;"><button class="btn-secondary" onclick="app.l(-1)">◀</button> <button class="btn-secondary" onclick="app.l(1)">▶</button></div><div style="font-size:0.8rem; text-align:left; background:#fff; padding:0.5rem; border:1px solid #ccc;">Límites: Res. 2400 (H:25kg, M:12.5kg). NIOSH: 23kg.</div>`;
            return ``;
        }
        function initWidget(type) {
            if(type==='joints') {
                app.j = (n, m) => { el('j-n').textContent = n; const r=el('j-range'); r.max=m; r.value=0; el('j-val').textContent='0°'; el('j-line').style.transform='rotate(0deg)'; };
            } else if(type==='sarcomere') {
                app.s = () => { el('s-msg').textContent="¡Ca²⁺ liberado! ATP consumido. Contracción..."; el('s-act').style.left='10%'; el('s-act2').style.right='10%'; setTimeout(()=>{el('s-act').style.left='0'; el('s-act2').style.right='0';el('s-msg').textContent="Relajación.";},1500); };
            } else if(type==='posture') {
                app.p = (v) => { el('p-res').innerHTML = v==='n'?'Neutra (confort)<br>Ej: Secretaria bien sentada':(v==='f'?'Forzada (extremo)<br>Ej: Agachado girando tronco':'Antigravitatoria (brazos altos)<br>Ej: Pintor de techo'); };
            } else if(type==='repCounter') {
                app.r = (v) => { el('r-val').textContent=v; el('r-res').textContent=Math.round(28800/v); el('r-w').textContent=v<30?'⚠ Repetitivo (Riesgo)':'✔ Aceptable'; el('r-w').style.color=v<30?'var(--bad)':'var(--ok)'; };
            } else if(type==='liftSteps') {
                app.lStep = 0; const txts = ["1: Acercarse y separar pies.", "2: Flexionar rodillas, espalda recta.", "3: Agarre firme, carga pegada.", "4: Levantar con piernas, sin torcer.", "5: Para girar, mover los pies."];
                app.l = (d) => { app.lStep = Math.max(0, Math.min(4, app.lStep+d)); el('l-txt').textContent="Paso "+txts[app.lStep]; };
            }
        }

        // Games Logic
        function initGame(station, scr) {
            const wrapper = el('game-wrapper'), fb = el('game-feedback'), rev = el('btn-reveal');
            let att = 0; const isDone = state.completed.includes(station.id);
            const finish = (ok) => {
                if(!ok) { att++; if(att>=2 && !isDone) rev.classList.remove('hidden'); fb.className='game-feedback show error'; fb.innerHTML='✖ Intenta de nuevo.'; }
                else { fb.className='game-feedback show success'; fb.innerHTML='✔ ¡Correcto! '+scr.game.explain; rev.classList.add('hidden'); 
                    if(!isDone) { 
                        state.points += (att===0?20:(att===1?10:5)); state.completed.push(station.id); 
                        if(state.unlocked===station.id && state.unlocked<6) state.unlocked++;
                        if(!state.clues.includes(scr.clue)) state.clues.push(scr.clue);
                        Storage.save(); updateHUD(); showToast('¡Reto superado!');
                    }
                    wrapper.style.pointerEvents='none'; wrapper.style.opacity='0.6';
                }
            };
            rev.onclick = () => { fb.className='game-feedback show success'; fb.innerHTML='✔ Revelado. '+scr.game.explain; rev.classList.add('hidden'); if(!isDone){ state.points+=5; state.completed.push(station.id); if(!state.clues.includes(scr.clue)) state.clues.push(scr.clue); if(state.unlocked===station.id && state.unlocked<6) state.unlocked++; Storage.save(); updateHUD(); } wrapper.style.pointerEvents='none'; wrapper.style.opacity='0.6'; };
            
            const g = scr.game;
            if(g.type==='classify') { wrapper.innerHTML=`<div class="card" id="c-it" style="text-align:center;font-weight:bold;font-size:1.2rem;"></div><div class="classify-buttons">${g.categories.map(c=>`<button class="btn-primary" data-id="${c.id}">${c.label}</button>`).join('')}</div>`; let i=0, items=[...g.items].sort(()=>Math.random()-0.5); const rr=()=>{if(i>=items.length)finish(true);else el('c-it').textContent=items[i].text;}; rr(); wrapper.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.id===items[i].cat){i++;rr();}else finish(false);}); }
            else if(g.type==='match') { wrapper.innerHTML=`<div class="match-container"><div class="match-col">${g.pairs.map(p=>p.left).sort(()=>Math.random()-0.5).map(x=>`<button class="match-btn l" data-v="${x}">${x}</button>`).join('')}</div><div class="match-col">${g.pairs.map(p=>({l:p.left,r:p.right})).sort(()=>Math.random()-0.5).map(x=>`<button class="match-btn r" data-v="${x.l}">${x.r}</button>`).join('')}</div></div>`; let sel=null, m=0; wrapper.querySelectorAll('.l').forEach(b=>b.onclick=()=>{wrapper.querySelectorAll('.l').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');sel=b;}); wrapper.querySelectorAll('.r').forEach(b=>b.onclick=()=>{if(!sel||b.classList.contains('matched'))return; if(b.dataset.v===sel.dataset.v){b.classList.add('matched');sel.classList.add('matched');sel.classList.remove('selected');sel=null;m++;if(m===g.pairs.length)finish(true);}else finish(false);}); }
            else if(g.type==='order') { wrapper.innerHTML=`<div class="order-list">${g.items.sort(()=>Math.random()-0.5).map((x,idx)=>`<div class="order-item" data-id="${x.id}"><button class="btn-secondary" onclick="this.parentElement.previousElementSibling?this.parentElement.parentNode.insertBefore(this.parentElement,this.parentElement.previousElementSibling):null">▲</button><span>${x.text}</span></div>`).join('')}</div><button class="btn-primary" style="margin-top:1rem;width:100%" id="chk-ord">Comprobar</button>`; el('chk-ord').onclick=()=>{let ok=true;wrapper.querySelectorAll('.order-item').forEach((e,i)=>{if(parseInt(e.dataset.id)!==g.items[i].id)ok=false;}); finish(ok);}; }
            else if(g.type==='choice') { wrapper.innerHTML=`<p><b>${g.question}</b></p><div class="choice-list">${g.options.map(o=>`<button class="choice-btn" data-c="${o.correct?1:0}">${o.text}</button>`).join('')}</div>`; wrapper.querySelectorAll('button').forEach(b=>b.onclick=()=>finish(b.dataset.c==='1')); }
            else if(g.type==='choice-svg') { wrapper.innerHTML=`<p><b>${g.question}</b></p><div class="choice-svg-container">${g.options.map(o=>`<div>${o.svg}<button class="choice-btn" style="width:100%;" data-c="${o.correct?1:0}">${o.text}</button></div>`).join('')}</div>`; wrapper.querySelectorAll('button').forEach(b=>b.onclick=()=>finish(b.dataset.c==='1')); }
            else if(g.type==='multi') { wrapper.innerHTML=`<p><b>${g.question}</b></p><div class="multi-list">${g.options.map(o=>`<label class="multi-item"><input type="checkbox" data-c="${o.correct?1:0}"><span>${o.text}</span></label>`).join('')}</div><button class="btn-primary" style="width:100%" id="chk-m">Comprobar</button>`; el('chk-m').onclick=()=>{const cbs=Array.from(wrapper.querySelectorAll('input')); const ok=cbs.every(cb=>(cb.checked && cb.dataset.c==='1') || (!cb.checked && cb.dataset.c==='0')); finish(ok);}; }
            
            if(isDone) finish(true);
        }

        function showToast(msg) { const t=el('toast'); t.textContent=msg; t.className='show'; setTimeout(()=>t.className='', 3000); }

        function init() {
            if(window.location.search.includes('docente=1')) state.unlocked = 7;
            Storage.load();
            if(state.screen==='station' || state.screen==='prologue' || state.screen==='epilogue') go('map'); else go(state.screen);
        }
        
        window.onerror = () => showToast("Algo salió mal, recarga la página por favor.");
        init();
    