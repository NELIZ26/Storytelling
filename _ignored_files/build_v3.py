import codecs

html_content = r"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Explorando el Movimiento Corporal Humano: un viaje con la Señora biomecánica</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header id="hud" class="hidden">
        <div class="hud-top">
            <div id="hud-title" style="font-weight:bold; font-size:1.1rem; flex:1;"></div>
            <div class="meter-container hidden" id="meter-container" title="Espalda de Carlos">
                <div id="carlos-meter" class="meter-fill"></div>
            </div>
            <div style="display:flex; gap: 0.5rem; align-items:center;">
                <span id="hud-points" class="hidden">⭐ 0</span>
            </div>
        </div>
        <div class="hud-nav" id="hud-nav"></div>
    </header>
    <main id="app"></main>
    <div id="toast" aria-live="polite"></div>
    
    <div id="modal-glossary" class="modal-overlay" onclick="if(event.target==this) this.style.display='none'">
        <div class="modal-content">
            <h2 id="glossary-title">Término</h2>
            <p id="glossary-desc" style="margin-top: 1rem;"></p>
            <button class="btn-secondary" style="margin-top:1rem; width:100%" onclick="document.getElementById('modal-glossary').style.display='none'">Cerrar</button>
        </div>
    </div>

    <!-- Carga de scripts en orden estricto -->
    <script src="js/data-story.js"></script>
    <script src="js/data-quiz.js"></script>
    <script src="js/core.js"></script>
    <script src="js/voice.js"></script>
    <script src="js/games.js"></script>
    <script src="js/story.js"></script>
    <script src="js/screens.js"></script>
    <script src="js/main.js"></script>
</body>
</html>"""

css_content = r"""
:root {
    --ink: #1b1b2f; --paper: #fffdf7; --sky: #8ecae6; --sun: #ffb703;
    --coral: #ef476f; --mint: #06d6a0; --bg: #f1f5f9;
    --border-radius: 12px;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
    font-family: system-ui, -apple-system, sans-serif;
    background: var(--bg);
    background-image: radial-gradient(#d1d5db 1px, transparent 1px);
    background-size: 20px 20px;
    color: var(--ink);
    line-height: 1.5;
    display: flex; flex-direction: column; min-height: 100dvh; overflow-x: hidden;
}

/* UI COMIC STYLE */
.card { background: var(--paper); border: 3px solid var(--ink); border-radius: var(--border-radius); padding: 1.5rem; margin-bottom: 1rem; box-shadow: 4px 4px 0 var(--ink); }
button { font-family: inherit; font-size: 1rem; padding: 0.75rem 1.5rem; border: 3px solid var(--ink); border-radius: 8px; cursor: pointer; transition: all 0.2s; box-shadow: 3px 3px 0 var(--ink); min-height: 44px; font-weight: bold; }
button:active { transform: translate(3px, 3px); box-shadow: none; }
button:hover:not(:disabled) { transform: rotate(-1deg); }
button:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: 3px 3px 0 var(--ink); }
.btn-primary { background: var(--sky); color: var(--ink); }
.btn-secondary { background: white; color: var(--ink); }
.btn-icon { padding: 0.25rem 0.5rem; font-size: 1.2rem; background: white; border: 2px solid var(--ink); box-shadow: 2px 2px 0 var(--ink); }
.btn-icon.locked { opacity: 0.5; filter: grayscale(1); cursor: not-allowed; }

/* HUD */
#hud { background: var(--paper); padding: 0.5rem 1rem; border-bottom: 3px solid var(--ink); position: sticky; top: 0; z-index: 100; display: flex; flex-direction: column; gap: 0.5rem; }
.hud-top { display: flex; justify-content: space-between; align-items: center; }
.hud-nav { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; justify-content: center; }
.meter-container { background: #e2e8f0; height: 14px; border: 2px solid var(--ink); border-radius: 7px; flex: 1; margin: 0 1rem; position: relative; overflow: hidden; }
.meter-fill { background: var(--coral); height: 100%; transition: width 0.5s, background-color 0.5s; width: 10%; }

/* SCENE ENGINE */
#app { flex: 1; display: flex; flex-direction: column; width: 100%; max-width: 900px; margin: 0 auto; padding: 1rem; position: relative; }
#stage { aspect-ratio: 16/9; background: #333; position: relative; border: 4px solid var(--ink); border-radius: var(--border-radius); overflow: hidden; margin-bottom: 0.5rem; display: flex; transition: opacity 0.3s; background-size: cover; background-position: center; box-shadow: 4px 4px 0 var(--ink); }
.scene-bg { position: absolute; top:0; left:0; width:100%; height:100%; z-index: 1; object-fit: cover; }
.sprite-container { position: absolute; bottom: -5%; width: 40%; height: 85%; z-index: 3; display: flex; justify-content: center; align-items: flex-end; transition: opacity 0.2s; }
.sprite { max-width: 100%; max-height: 100%; object-fit: contain; }
.speaker-left { left: 0; }
.speaker-right { right: 0; }

/* HOLOGRAPHIC PANEL */
.holo-panel { position: absolute; top: 5%; right: 5%; width: 40%; height: 60%; background: var(--paper); border: 3px solid var(--ink); border-radius: 8px; z-index: 2; display: flex; flex-direction: column; box-shadow: 4px 4px 0 var(--ink); transition: opacity 0.4s; overflow: hidden; }
.holo-img-container { flex: 1; position: relative; overflow: hidden; display: flex; justify-content: center; align-items: center; background: #fff; }
.holo-img { position: absolute; max-width: 95%; max-height: 95%; object-fit: contain; mix-blend-mode: multiply; transition: opacity 0.4s; }
.holo-badge { position: absolute; top: 10px; right: 10px; background: var(--sun); border: 2px solid var(--ink); padding: 0.2rem 0.5rem; font-weight: bold; border-radius: 4px; z-index: 3; }
.holo-footer { background: var(--bg); border-top: 2px solid var(--ink); padding: 0.5rem; text-align: center; font-size: 0.85rem; font-weight: bold; }
.holo-chips { display: flex; flex-wrap: wrap; gap: 0.25rem; justify-content: center; margin-top: 0.25rem; }
.chip { background: var(--mint); border: 1px solid var(--ink); border-radius: 12px; padding: 0.1rem 0.4rem; font-size: 0.75rem; cursor: pointer; }

/* DIALOGUE BOX */
.dialogue-box { position: absolute; bottom: 5%; left: 5%; width: 90%; background: var(--paper); border: 3px solid var(--ink); padding: 1rem 1.5rem; border-radius: 8px; z-index: 4; cursor: pointer; min-height: 100px; box-shadow: 4px 4px 0 var(--ink); }
.dialogue-box::before { content: ''; position: absolute; top: -15px; left: 15%; border-width: 0 15px 15px 15px; border-style: solid; border-color: transparent transparent var(--ink) transparent; }
.dialogue-box::after { content: ''; position: absolute; top: -11px; left: 15%; border-width: 0 15px 15px 15px; border-style: solid; border-color: transparent transparent var(--paper) transparent; }
.dialogue-name { position: absolute; top: -15px; left: -3px; background: var(--sky); border: 3px solid var(--ink); padding: 0.2rem 0.8rem; font-weight: bold; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px; }
.dialogue-name.sb { background: var(--sky); }
.dialogue-name.carlos { background: var(--sun); }
.dialogue-name.narrator { background: var(--ink); color: white; }
.dialogue-text { font-size: 1.15rem; margin-top: 0.5rem; font-weight: 500; }
.narrator-text { font-style: italic; }
.dialogue-indicator { position: absolute; bottom: 10px; right: 15px; animation: blink 1s infinite; font-weight: bold; font-size: 1.2rem; }

/* CONTROLS */
.scene-controls { display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; flex-wrap: wrap; gap: 0.5rem; }

/* MODALS */
.modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.6); z-index: 1000; display: none; justify-content: center; align-items: center; padding: 1rem; }
.modal-content { background: var(--paper); border: 4px solid var(--ink); padding: 1.5rem; border-radius: var(--border-radius); max-width: 500px; width: 100%; box-shadow: 6px 6px 0 var(--ink); max-height: 80vh; overflow-y: auto; }

/* UTILS */
.hidden { display: none !important; }
.fade-in { animation: fadeIn 0.3s forwards; }
#toast { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: var(--ink); color: white; padding: 0.75rem 1.5rem; border-radius: 30px; font-weight: bold; opacity: 0; transition: opacity 0.3s; z-index: 2000; }
#toast.show { opacity: 1; }
.glossary-link { color: var(--coral); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; font-weight: bold; }

/* CHAPTER CARD */
#chapter-card { position: absolute; top:0; left:0; width:100%; height:100%; background: var(--ink); color: var(--paper); z-index: 10; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem; }
.ch-anim { animation: wipe 0.5s ease-out forwards; }
@keyframes wipe { 0% { clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%); } 100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }

/* ANIMATIONS */
@keyframes blink { 50% { opacity: 0; } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes idle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
@keyframes pulseAnim { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes pulseRed { 0%, 100% { filter: drop-shadow(0 0 0 rgba(239,71,111,0)); transform: scale(1); } 50% { filter: drop-shadow(0 0 10px rgba(239,71,111,0.8)); transform: scale(1.03); } }
@keyframes zoomAnim { 0% { transform: scale(1); } 100% { transform: scale(1.35); } }
@keyframes shakeAnim { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-3px); } 75% { transform: translateX(3px); } }
.anim-pulse { animation: pulseAnim 2s infinite ease-in-out; }
.anim-pulse-red { animation: pulseRed 1.5s infinite ease-in-out; }
.anim-zoom { animation: zoomAnim 3s forwards; }
.anim-shake { animation: shakeAnim 0.5s infinite; }
.anim-idle { animation: idle 3s infinite ease-in-out; }
.pop { animation: popAnim 0.2s; }
@keyframes popAnim { 0% { transform: scale(0.9); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }

/* GAMES */
.game-feedback { margin-top: 1rem; padding: 1rem; border: 3px solid var(--ink); border-radius: 8px; display: none; font-weight: bold; }
.game-feedback.show { display: block; animation: popAnim 0.3s; }
.game-feedback.success { background: var(--mint); color: var(--ink); }
.game-feedback.error { background: var(--coral); color: white; }
.classify-buttons { display: flex; gap: 1rem; justify-content: center; }
.match-container { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.match-col { display: flex; flex-direction: column; gap: 0.5rem; flex: 1; min-width: 200px; }
.match-btn { padding: 1rem; text-align: left; background: white; border: 3px solid var(--ink); word-break: break-word;}
.match-btn.selected { background: var(--sky); transform: scale(1.02); }
.match-btn.matched { background: var(--mint); opacity: 0.8; }
.order-list { display: flex; flex-direction: column; gap: 0.5rem; }
.order-item { display: flex; align-items: center; gap: 1rem; background: white; padding: 0.5rem 1rem; border: 3px solid var(--ink); border-radius: 8px; }
.choice-list { display: flex; flex-direction: column; gap: 0.75rem; }
.choice-btn { text-align: left; background: white; border: 3px solid var(--ink); height: auto; padding: 1rem;}
.choice-svg-container { display: flex; justify-content: space-around; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem;}
.multi-list { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.multi-item { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: white; border: 3px solid var(--ink); border-radius: 8px; cursor: pointer; }

/* RESPONSIVE */
@media (max-width: 700px) {
    #stage { aspect-ratio: 3/4; border-width: 2px; }
    .holo-panel { top: 2%; left: 5%; width: 90%; height: 45%; }
    .sprite-container { width: 50%; height: 50%; bottom: 0; left: 0; }
    .dialogue-box { position: relative; bottom: 0; left: 0; width: 100%; margin-top: 0.5rem; }
    .dialogue-box::before, .dialogue-box::after { display: none; }
}
@media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
}
"""

data_story_content = r"""
window.SB = window.SB || {};

SB.GLOSSARY = {
    "estático": "Trabajo muscular donde hay tensión continua sin movimiento, impidiendo el flujo sanguíneo.",
    "dinámico": "Trabajo muscular con ciclos de contracción y relajación, favoreciendo la circulación.",
    "isquemia": "Falta de riego sanguíneo en el tejido.",
    "hipoxia": "Falta de oxígeno en el tejido.",
    "diartrosis": "Articulaciones de gran movilidad, como el hombro y la rodilla.",
    "anfiartrosis": "Articulaciones con movilidad muy limitada, como los discos intervertebrales.",
    "sinartrosis": "Articulaciones fijas, sin movimiento, como las suturas del cráneo.",
    "arco de movilidad": "Ángulo, en grados, que una articulación puede recorrer.",
    "mioglobina": "Proteína muscular que almacena oxígeno para producir energía.",
    "atp": "Adenosín Trifosfato, la molécula que proporciona energía inmediata para la contracción muscular.",
    "glucógeno": "Reserva de glucosa del músculo, para rehacer ATP.",
    "actina y miosina": "Filamentos que se deslizan y acortan el sarcómero.",
    "ecuación niosh": "Método que calcula el peso máximo recomendado (23 kg ideales).",
    "postura forzada": "Cerca del extremo articular.",
    "postura mantenida": "Más de 2 h continuas.",
    "postura antigravitatoria": "Brazos sobre los hombros.",
    "trabajo repetitivo": "Ciclos < 30 s o > 50 % del ciclo igual."
};

SB.VISUALS = {
    "arm_static": { frames:['arm_contracted'], fps:0, anim:'pulse', caption:'Trabajo estático · contracción isométrica', chips:['Bíceps', 'Isometría'], badge:null, emoji:null, countTo:null },
    "arm_cycle": { frames:['arm_relaxed', 'arm_contracted'], fps:0.8, anim:'none', caption:'Trabajo dinámico · se contrae y se relaja', chips:['Concéntrica', 'Excéntrica'], badge:null, emoji:null, countTo:null },
    "cap_squeezed": { frames:['capillary_squeezed'], fps:0, anim:'pulse-red', caption:'El músculo tenso aplasta el capilar', chips:['Isquemia', 'Hipoxia'], badge:null, emoji:null, countTo:null },
    "cap_free": { frames:['capillary_free'], fps:0, anim:'pulse', caption:'Bomba muscular: la sangre fluye', chips:['Retorno venoso'], badge:null, emoji:null, countTo:null },
    "leg_walk": { frames:['leg_muscles', 'leg_flexed'], fps:0.8, anim:'none', caption:'Caminar: trabajo dinámico', chips:['Cuádriceps', 'Isquiotibiales', 'Gemelos'], badge:null, emoji:null, countTo:null },
    "back_load": { frames:['back_muscles'], fps:0, anim:'pulse-red', caption:'Erectores espinales bajo carga', chips:['Erectores espinales', 'Dorsal ancho'], badge:null, emoji:null, countTo:null },
    "skeleton": { frames:['skeleton'], fps:0, anim:'zoom', caption:'El esqueleto humano', chips:['Huesos', 'Palancas'], badge:'206', emoji:null, countTo:null },
    "skull": { frames:['skull_sutures'], fps:0, anim:'pulse', caption:'Articulación fija · sinartrosis', chips:['Sinartrosis'], badge:null, emoji:null, countTo:null },
    "lumbar": { frames:['spine_lumbar'], fps:0, anim:'pulse', caption:'Semimóvil · anfiartrosis', chips:['Anfiartrosis', 'L4-L5', 'L5-S1'], badge:null, emoji:null, countTo:null },
    "shoulder": { frames:['shoulder_joint'], fps:0, anim:'none', caption:'Articulación móvil · diartrosis', chips:['Diartrosis'], badge:'0°–180°', emoji:null, countTo:null },
    "knee": { frames:['knee_joint'], fps:0, anim:'none', caption:'Articulación móvil', chips:['Diartrosis'], badge:'0°–135°', emoji:null, countTo:null },
    "lumbar_rom": { frames:['spine_lumbar'], fps:0, anim:'pulse', caption:'Movilidad lumbar', chips:['Arco de movilidad'], badge:'Flex 0°–60° · Ext 0°–25°', emoji:null, countTo:null },
    "muscle_types": { frames:['muscle_types'], fps:0, anim:'none', caption:'Tres tipos de músculo', chips:['Esquelético', 'Cardíaco', 'Liso'], badge:null, emoji:null, countTo:null },
    "fibers": { frames:['fiber_types'], fps:0, anim:'none', caption:'Fibras tipo I y tipo II', chips:['Tipo I', 'Tipo II', 'Mioglobina'], badge:null, emoji:null, countTo:null },
    "sarco": { frames:['sarcomere_relaxed', 'sarcomere_contracted'], fps:0.9, anim:'none', caption:'Actina y miosina se deslizan', chips:['Actina y miosina', 'Ca²⁺'], badge:null, emoji:null, countTo:null },
    "factory": { frames:['atp_factory'], fps:0, anim:'pulse', caption:'La fábrica de ATP', chips:['ATP', 'Glucógeno'], badge:null, emoji:null, countTo:null },
    "posture_all": { frames:['posture_neutral', 'posture_forced', 'posture_overhead'], fps:0.4, anim:'none', caption:'Tres posturas para comparar', chips:['Neutra', 'Forzada', 'Antigravitatoria'], badge:null, emoji:null, countTo:null },
    "posture_f": { frames:['posture_forced'], fps:0, anim:'shake', caption:'Postura forzada y mantenida', chips:['Postura forzada', 'Postura mantenida'], badge:null, emoji:null, countTo:null },
    "posture_o": { frames:['posture_overhead'], fps:0, anim:'pulse', caption:'Postura antigravitatoria', chips:['Postura antigravitatoria'], badge:null, emoji:null, countTo:null },
    "posture_n": { frames:['posture_neutral'], fps:0, anim:'none', caption:'Postura neutra', chips:['Neutra'], badge:null, emoji:null, countTo:null },
    "wrist": { frames:['wrist_tendon'], fps:0, anim:'pulse-red', caption:'Tendones y túnel del carpo', chips:['Túnel del carpo', 'Epicondilitis'], badge:null, emoji:null, countTo:null },
    "reps": { frames:[], fps:0, anim:'none', caption:'repeticiones en un turno de 8 h', chips:['Trabajo repetitivo'], badge:null, emoji:'⏱️📦', countTo:2880 },
    "prevent": { frames:[], fps:0, anim:'none', caption:'Rotar · Rediseñar · Micropausas', chips:['Micropausas activas'], badge:null, emoji:'🔄🛠️⏸️', countTo:null },
    "load": { frames:[], fps:0, anim:'none', caption:'', chips:['Carga manual'], badge:'≥ 3 kg', emoji:'📦', countTo:null },
    "limits": { frames:[], fps:0, anim:'none', caption:'Límites de referencia', chips:['Res. 2400', 'NIOSH'], badge:null, emoji:'⚖️', countTo:null },
    "lift_bad": { frames:['lift_wrong'], fps:0, anim:'shake', caption:'Espalda encorvada y carga lejos ✖', chips:['Brazo de palanca'], badge:null, emoji:null, countTo:null },
    "lift_twist": { frames:['lift_twist'], fps:0, anim:'shake', caption:'Torsión del tronco con carga ✖', chips:['Torsión'], badge:null, emoji:null, countTo:null },
    "lift_good": { frames:['lift_right'], fps:0, anim:'pulse', caption:'Rodillas flexionadas, espalda recta ✔', chips:['Técnica segura'], badge:null, emoji:null, countTo:null },
    "disc": { frames:['disc_herniation'], fps:0, anim:'pulse-red', caption:'Hernia discal lumbar', chips:['Hernia discal'], badge:null, emoji:null, countTo:null }
};

SB.CHAPTERS = [
    {
        id: 0, title: "Prólogo", subtitle: "Una tarde en la bodega", bg: "bodega_tarde",
        screens: [
            {
                title: "Inicio del turno",
                beats: [
                    { who:'narrator', mood:'neutral', visual:'none', text:'Almacén Andino, 5:40 p. m. Ocho horas de turno. Una caja más... y Carlos se detiene.' },
                    { who:'carlos', mood:'tired', visual:'none', text:'Ay, mi espalda... La siento como una piedra y los brazos me tiemblan.' },
                    { who:'sb', mood:'alert', visual:'none', text:'Buenas tardes, Carlos. Soy la Señora Biomecánica. Me llamaron porque tu cuerpo lleva horas enviando señales de alarma.' },
                    { who:'carlos', mood:'neutral', visual:'none', text:'¿Señales? Yo solo cargo cajas de 15 kilos. No es tanto...' },
                    { who:'sb', mood:'explaining', visual:'none', text:'Para ayudarte, haremos un viaje por tu cuerpo. Primero conoceremos la historia completa; al final resolveremos tu caso.' },
                    { who:'sb', mood:'happy', visual:'none', text:'Sígueme. ¡Empezamos!' }
                ]
            }
        ]
    },
    {
        id: 1, title: "El motor oculto", subtitle: "Trabajo muscular", bg: "bodega_manana",
        screens: [
            {
                title: "1.1 · El brazo que espera",
                beats: [
                    { who:'narrator', mood:'neutral', visual:'none', text:'Flashback: 7:00 a. m. Carlos sostiene una caja frente al pecho, esperando el montacargas.' },
                    { who:'sb', mood:'explaining', visual:'arm_static', text:'Mira su brazo: no se mueve, pero el músculo está trabajando a tope. Eso es <a class="glossary-link" onclick="SB.showGlossary(\'estático\')">trabajo muscular estático</a>.' },
                    { who:'sb', mood:'neutral', visual:'=', text:'El músculo genera tensión sin cambiar de longitud. Se llama contracción isométrica.' },
                    { who:'sb', mood:'worried', visual:'cap_squeezed', text:'Y ahí está el problema: el músculo tenso aplasta sus propios capilares.' },
                    { who:'sb', mood:'worried', visual:'=', text:'Llega menos oxígeno (<a class="glossary-link" onclick="SB.showGlossary(\'isquemia\')">isquemia</a>), se acumula ácido láctico... y aparece la fatiga.' }
                ]
            },
            {
                title: "1.2 · La pierna que camina",
                beats: [
                    { who:'narrator', mood:'neutral', visual:'leg_walk', text:'Poco después, Carlos cruza la bodega caminando.' },
                    { who:'sb', mood:'explaining', visual:'=', text:'Ahora mira sus piernas: cuádriceps, isquiotibiales y gemelos se contraen y se relajan. Eso es <a class="glossary-link" onclick="SB.showGlossary(\'dinámico\')">trabajo dinámico</a>.' },
                    { who:'sb', mood:'happy', visual:'arm_cycle', text:'En el trabajo dinámico hay ciclos de acortamiento (concéntrico) y de elongación (excéntrico).' },
                    { who:'sb', mood:'happy', visual:'cap_free', text:'Además funciona como una bomba: empuja la sangre de regreso al corazón y renueva el oxígeno. ¡Se cansa mucho menos!' }
                ]
            },
            {
                title: "1.3 · En la vida real",
                beats: [
                    { who:'carlos', mood:'tired', visual:'=', text:'Por eso me cansa más esperar con la caja que caminar con ella...' },
                    { who:'sb', mood:'explaining', visual:'=', text:'Exacto. Estático: sostener una herramienta en alto, estar de pie sin moverse. Dinámico: caminar, pedalear, subir escaleras.' },
                    { who:'sb', mood:'alert', visual:'back_load', text:'En el trabajo de Carlos hay de los dos: dinámico al levantar, y estático en la espalda al sostener y transportar la carga.' },
                    { who:'sb', mood:'neutral', visual:'=', text:'Sus erectores espinales casi nunca descansan. Guarda ese dato: lo vamos a necesitar.' }
                ]
            }
        ]
    },
    {
        id: 2, title: "La arquitectura del cuerpo", subtitle: "Sistema óseo", bg: "interior_cuerpo",
        screens: [
            {
                title: "2.1 · El esqueleto",
                beats: [
                    { who:'narrator', mood:'neutral', visual:'none', text:'La Señora Biomecánica activa su lupa y ambos se hacen diminutos hasta entrar en el cuerpo de Carlos.' },
                    { who:'sb', mood:'explaining', visual:'skeleton', text:'Bienvenido al sistema óseo: 206 huesos que forman el armazón del cuerpo.' },
                    { who:'sb', mood:'neutral', visual:'=', text:'Sostienen el cuerpo, protegen órganos, guardan minerales y producen células de la sangre en la médula ósea.' },
                    { who:'sb', mood:'explaining', visual:'=', text:'Y algo clave: funcionan como palancas que los músculos mueven al tirar de ellos.' }
                ]
            },
            {
                title: "2.2 · Tres tipos de uniones",
                beats: [
                    { who:'sb', mood:'neutral', visual:'skeleton', text:'Los huesos se unen en articulaciones. Hay tres tipos, según cuánto se mueven.' },
                    { who:'sb', mood:'explaining', visual:'skull', text:'Fijas o <a class="glossary-link" onclick="SB.showGlossary(\'sinartrosis\')">sinartrosis</a>: no se mueven. Ejemplo: las suturas del cráneo.' },
                    { who:'sb', mood:'explaining', visual:'lumbar', text:'Semimóviles o <a class="glossary-link" onclick="SB.showGlossary(\'anfiartrosis\')">anfiartrosis</a>: movimiento limitado. Ejemplo: los discos entre las vértebras y la sínfisis púbica.' },
                    { who:'sb', mood:'explaining', visual:'shoulder', text:'Móviles o <a class="glossary-link" onclick="SB.showGlossary(\'diartrosis\')">diartrosis</a>, también llamadas sinoviales: hombro (glenohumeral), cadera (coxofemoral) y rodilla (femorotibial).' },
                    { who:'sb', mood:'worried', visual:'lumbar', text:'Ojo con esta zona: las vértebras L4-L5 y L5-S1 son semimóviles y soportan casi todo el peso cuando Carlos levanta.' }
                ]
            },
            {
                title: "2.3 · ¿Cuántos grados se mueve?",
                beats: [
                    { who:'sb', mood:'explaining', visual:'shoulder', text:'Toda articulación tiene un <a class="glossary-link" onclick="SB.showGlossary(\'arco de movilidad\')">arco de movilidad</a>: el ángulo, en grados, que puede recorrer. El hombro llega a 180° de flexión.' },
                    { who:'sb', mood:'neutral', visual:'knee', text:'La rodilla flexiona hasta unos 135°.' },
                    { who:'sb', mood:'alert', visual:'lumbar_rom', text:'La zona lumbar es la más limitada: unos 60° al flexionar y 25° al extender. Forzarla más allá es pedir una lesión.' },
                    { who:'sb', mood:'happy', visual:'skeleton', text:'Ya conocemos la estructura. Ahora, ¡vamos a ver los músculos que la mueven!' }
                ]
            }
        ]
    },
    {
        id: 3, title: "La fábrica de energía", subtitle: "Sistema muscular", bg: "fabrica_energia",
        screens: [
            {
                title: "3.1 · Los tres músculos",
                beats: [
                    { who:'narrator', mood:'neutral', visual:'none', text:'Siguen avanzando hasta entrar en un músculo del brazo. Por dentro parece... ¡una gran fábrica!' },
                    { who:'sb', mood:'explaining', visual:'muscle_types', text:'Hay tres tipos de músculo: el esquelético, voluntario y estriado; el cardíaco, estriado e involuntario; y el liso, de las vísceras.' },
                    { who:'sb', mood:'neutral', visual:'=', text:'El que mueve a Carlos, y el que se cansa en su trabajo, es el músculo esquelético.' },
                    { who:'sb', mood:'explaining', visual:'fibers', text:'Sus fibras son de dos clases. Tipo I: lentas, rojas y resistentes, con mucha mioglobina y mitocondrias; sostienen la postura.' },
                    { who:'sb', mood:'explaining', visual:'=', text:'Tipo II: rápidas y blancas. Dan mucha potencia, pero se agotan pronto.' }
                ]
            },
            {
                title: "3.2 · Adentro de la fibra",
                beats: [
                    { who:'sb', mood:'explaining', visual:'sarco', text:'Dentro de la fibra hay unidades llamadas sarcómeros, con filamentos de actina y de miosina.' },
                    { who:'sb', mood:'explaining', visual:'=', text:'El impulso nervioso libera calcio (Ca²⁺), la cabeza de miosina se engancha a la actina y tira.' },
                    { who:'sb', mood:'happy', visual:'=', text:'Es como remeros jalando una cuerda: los filamentos se deslizan y el músculo se acorta.' }
                ]
            },
            {
                title: "3.3 · La fábrica de energía",
                beats: [
                    { who:'sb', mood:'explaining', visual:'factory', text:'Tirar cuesta energía. La moneda de esta fábrica es el <a class="glossary-link" onclick="SB.showGlossary(\'atp\')">ATP</a>: se gasta cada vez que la miosina tira.' },
                    { who:'sb', mood:'neutral', visual:'=', text:'El ATP se fabrica de nuevo a partir del <a class="glossary-link" onclick="SB.showGlossary(\'glucógeno\')">glucógeno</a>, el combustible guardado en el músculo, usando oxígeno.' },
                    { who:'sb', mood:'neutral', visual:'fibers', text:'El oxígeno llega por la sangre y lo guarda la <a class="glossary-link" onclick="SB.showGlossary(\'mioglobina\')">mioglobina</a>, como un pequeño tanque dentro de la fibra.' },
                    { who:'sb', mood:'worried', visual:'factory', text:'Sin pausas, la bodega de glucógeno se vacía y el ATP escasea. Resultado: fatiga y lesión.' }
                ]
            }
        ]
    },
    {
        id: 4, title: "La geometría del cuerpo", subtitle: "Postura", bg: "gimnasio",
        screens: [
            {
                title: "4.1 · ¿Qué es la postura?",
                beats: [
                    { who:'narrator', mood:'neutral', visual:'none', text:'Para comparar, se teletransportan a un gimnasio. Una levantadora de pesas revisa su técnica frente al espejo.' },
                    { who:'sb', mood:'explaining', visual:'posture_n', text:'La postura es la alineación de los segmentos del cuerpo en el espacio durante una actividad.' },
                    { who:'sb', mood:'neutral', visual:'=', text:'Cuando es correcta, la carga se reparte y los músculos trabajan sin exceso.' }
                ]
            },
            {
                title: "4.2 · Tres formas de clasificarla",
                beats: [
                    { who:'sb', mood:'explaining', visual:'posture_all', text:'Se clasifica de tres maneras: por posición, por tiempo de exposición y por tipo de movimiento.' },
                    { who:'sb', mood:'neutral', visual:'=', text:'Por posición: de pie (bípeda), sentada (sedente) o en cuclillas.' },
                    { who:'sb', mood:'neutral', visual:'posture_f', text:'Por tiempo: mantenida, más de 2 horas seguidas; o prolongada, más del 75 % de la jornada.' },
                    { who:'sb', mood:'neutral', visual:'posture_o', text:'Por movimiento: neutra o de confort; forzada, cerca de los extremos articulares; y antigravitatoria, con los brazos sobre los hombros.' }
                ]
            },
            {
                title: "4.3 · Carlos frente al espejo",
                beats: [
                    { who:'narrator', mood:'neutral', visual:'none', text:'El espejo del gimnasio muestra el reflejo de Carlos trabajando en la bodega.' },
                    { who:'sb', mood:'worried', visual:'posture_f', text:'Mira: tronco flexionado, giro de cintura y caja lejos del cuerpo... durante ocho horas. <a class="glossary-link" onclick="SB.showGlossary(\'postura forzada\')">Postura forzada</a> y mantenida.' },
                    { who:'carlos', mood:'tired', visual:'=', text:'Yo nunca lo noté. No me dolía mientras lo hacía...' },
                    { who:'sb', mood:'alert', visual:'=', text:'Reflexión: una mala postura no duele hoy, duele en meses. Corregirla a tiempo previene lesiones de espalda, hombros y cuello.' }
                ]
            }
        ]
    },
    {
        id: 5, title: "El reloj que no descansa", subtitle: "Movimiento", bg: "linea_reloj",
        screens: [
            {
                title: "5.1 · ¿Qué es el movimiento?",
                beats: [
                    { who:'narrator', mood:'neutral', visual:'none', text:'2:00 p. m. Un reloj gigante marca cada gesto. Carlos toma una caja, gira, la deja. Toma otra, gira, la deja.' },
                    { who:'sb', mood:'explaining', visual:'shoulder', text:'Movimiento es el cambio de posición de los segmentos del cuerpo: los músculos tiran de los huesos y las articulaciones lo permiten.' },
                    { who:'sb', mood:'neutral', visual:'arm_cycle', text:'Los movimientos básicos son flexión, extensión, rotación, y separar o acercar el segmento al cuerpo.' }
                ]
            },
            {
                title: "5.2 · Cuando el movimiento se repite",
                beats: [
                    { who:'sb', mood:'alert', visual:'reps', text:'Si el mismo movimiento se repite en ciclos de menos de 30 segundos, o más de la mitad del ciclo es igual, es <a class="glossary-link" onclick="SB.showGlossary(\'trabajo repetitivo\')">trabajo repetitivo</a>.' },
                    { who:'sb', mood:'worried', visual:'=', text:'Con un ciclo de 10 segundos, Carlos repite su gesto unas 2.880 veces en un turno de 8 horas.' },
                    { who:'sb', mood:'worried', visual:'wrist', text:'Cada repetición deja un microdaño en tendones y vainas. Sin descanso se acumula: tenosinovitis, túnel del carpo, epicondilitis.' },
                    { who:'carlos', mood:'tired', visual:'=', text:'Entonces no es un golpe ni una caída... es el mismo gesto, una y otra vez.' }
                ]
            },
            {
                title: "5.3 · Cómo frenar el desgaste",
                beats: [
                    { who:'sb', mood:'happy', visual:'prevent', text:'Buenas noticias: se previene. Rotar de puesto, rediseñar herramientas y mandos, y hacer micropausas activas.' },
                    { who:'sb', mood:'neutral', visual:'=', text:'Cambiar de tarea reparte el esfuerzo entre distintos músculos y deja recuperar a los cansados.' }
                ]
            }
        ]
    },
    {
        id: 6, title: "El peso de la verdad", subtitle: "Carga", bg: "zona_carga",
        screens: [
            {
                title: "6.1 · ¿Qué es una carga?",
                beats: [
                    { who:'narrator', mood:'neutral', visual:'none', text:'5:00 p. m. Regresan a la zona de carga, donde empezó todo.' },
                    { who:'sb', mood:'explaining', visual:'load', text:'Carga es cualquier peso que el cuerpo levanta, baja, empuja, tira o sostiene. En manejo manual se considera desde 3 kg.' }
                ]
            },
            {
                title: "6.2 · Los límites",
                beats: [
                    { who:'sb', mood:'neutral', visual:'limits', text:'En Colombia, la Resolución 2400 de 1979 fija 25 kg para hombres y 12,5 kg para mujeres.' },
                    { who:'sb', mood:'neutral', visual:'=', text:'Internacionalmente, la norma ISO 11228-1 y la <a class="glossary-link" onclick="SB.showGlossary(\'ecuación niosh\')">ecuación NIOSH</a> parten de 23 kg, pero solo en condiciones ideales.' },
                    { who:'carlos', mood:'neutral', visual:'=', text:'Entonces mis 15 kilos están dentro del límite...' },
                    { who:'sb', mood:'alert', visual:'=', text:'¡Ahí está el giro de la historia! Con mala postura, torsión y miles de repeticiones, 15 kg pueden ser demasiado.' }
                ]
            },
            {
                title: "6.3 · Levantar sin lesionarse",
                beats: [
                    { who:'sb', mood:'happy', visual:'lift_bad', text:'Aprendamos a levantar bien. Primero, lo que NO se debe hacer: espalda encorvada y carga lejos del cuerpo.' },
                    { who:'sb', mood:'alert', visual:'lift_twist', text:'Tampoco girar el tronco con la carga en las manos: la torsión castiga los discos.' },
                    { who:'sb', mood:'explaining', visual:'lift_good', text:'Técnica segura: pies al ancho de los hombros, rodillas flexionadas y espalda recta.' },
                    { who:'sb', mood:'explaining', visual:'=', text:'Agarra firme, pega la caja al cuerpo, levanta con la fuerza de las piernas y, para girar, mueve los pies, no la cintura.' }
                ]
            }
        ]
    },
    {
        id: 7, title: "El diagnóstico", subtitle: "Cierre de la historia", bg: "sala_reunion",
        screens: [
            {
                title: "7.1 · Cierre de la historia",
                beats: [
                    { who:'narrator', mood:'neutral', visual:'none', text:'Sala de reuniones de Seguridad y Salud en el Trabajo.' },
                    { who:'sb', mood:'explaining', visual:'back_load', text:'Resumamos el caso: Carlos combina trabajo dinámico y estático, con postura forzada y un movimiento repetido miles de veces.' },
                    { who:'sb', mood:'worried', visual:'disc', text:'Su columna lumbar, de movilidad limitada, recibe carga, torsión y repetición. El riesgo: lumbalgia y hernia discal.' },
                    { who:'carlos', mood:'tired', visual:'=', text:'¿Y ahora qué hago, Señora Biomecánica?' },
                    { who:'sb', mood:'alert', visual:'none', text:'Ahora te toca a ti, detective. Demuestra que entendiste cada estación y salva la espalda de Carlos.' },
                    { who:'sb', mood:'happy', visual:'none', text:'Cada misión superada devuelve salud a su espalda. ¡Comencemos!' }
                ]
            }
        ]
    }
];
"""

data_quiz_content = r"""
window.SB = window.SB || {};

SB.MISSIONS = [
    {
        id: 1, title: "Trabajo muscular", engine: "classify",
        intro: "Clasifica cada situación como trabajo estático o dinámico.",
        game: {
            items: [ { text: "Sostener una caja en el aire", cat: "E" }, { text: "Pedalear", cat: "D" }, { text: "Caminar", cat: "D" }, { text: "Mantener el brazo extendido", cat: "E" }, { text: "Estar de pie sin moverse", cat: "E" }, { text: "Subir escaleras", cat: "D" } ],
            categories: [ { id: "E", label: "Estático" }, { id: "D", label: "Dinámico" } ],
            explain: "El trabajo estático corta el flujo de sangre; el dinámico lo bombea."
        }
    },
    {
        id: 2, title: "Sistema óseo", engine: "match",
        intro: "Empareja cada articulación con su tipo y su arco de movilidad.",
        game: {
            pairs: [ { left: "Hombro", right: "Diartrosis · 0°–180°" }, { left: "Rodilla", right: "Diartrosis · 0°–135°" }, { left: "Discos intervertebrales", right: "Anfiartrosis · mov. limitado" }, { left: "Suturas del cráneo", right: "Sinartrosis · sin mov." } ],
            explain: "Diartrosis = mucho mov. Anfiartrosis = poco. Sinartrosis = nada."
        }
    },
    {
        id: 3, title: "Sistema muscular", engine: "order",
        intro: "Ordena los pasos de la contracción muscular.",
        game: {
            items: [ { id: 1, text: "Llega el impulso nervioso" }, { id: 2, text: "Se libera calcio" }, { id: 3, text: "La miosina consume ATP" }, { id: 4, text: "Filamentos se deslizan" }, { id: 5, text: "El músculo se acorta" } ],
            explain: "Nervio -> Calcio -> ATP -> Deslizamiento -> Contracción."
        }
    },
    {
        id: 4, title: "Postura", engine: "choice",
        intro: "Encuentra el puesto de trabajo con la peor postura.",
        game: {
            question: "¿Cuál combina postura forzada, mantenida y antigravitatoria?",
            options: [ { id: "A", text: "Secretaria sentada con apoyo" }, { id: "B", text: "Cajero de pie alternando peso" }, { id: "C", text: "Pintor con brazos altos 3 h seguidas", correct: true }, { id: "D", text: "Operario caminando con caja liviana" } ],
            explain: "Brazos altos = antigravitatoria; 3h = mantenida."
        }
    },
    {
        id: 5, title: "Movimiento", engine: "multi",
        intro: "Elige solo las medidas de prevención eficaces.",
        game: {
            question: "Selecciona SOLO las medidas eficaces:",
            options: [ { id: 1, text: "Rotar al trabajador", correct: true }, { id: 2, text: "Aumentar velocidad", correct: false }, { id: 3, text: "Rediseñar herramientas", correct: true }, { id: 4, text: "Eliminar descansos", correct: false }, { id: 5, text: "Micropausas activas", correct: true }, { id: 6, text: "Horas extras sin cambio", correct: false } ],
            explain: "Rotar, rediseñar y pausar son las claves."
        }
    },
    {
        id: 6, title: "Carga", engine: "choiceSvg",
        intro: "Encuentra el levantamiento correcto.",
        game: {
            question: "¿Cuál es el levantamiento correcto?",
            options: [
                { id: "A", text: "A", correct: false, svg: '<svg viewBox="0 0 100 100" width="80" height="80"><path d="M40 30 Q60 40 50 70 M50 70 L45 95 M50 70 L60 95 M40 35 L75 55" stroke="black" stroke-width="4" fill="none"/><circle cx="40" cy="20" r="8" fill="none" stroke="black" stroke-width="4"/><rect x="75" y="50" width="20" height="20"/></svg>' },
                { id: "B", text: "B", correct: true, svg: '<svg viewBox="0 0 100 100" width="80" height="80"><path d="M50 30 L50 60 L30 95 M50 60 L45 95 M50 35 L65 50" stroke="black" stroke-width="4" fill="none"/><circle cx="50" cy="20" r="8" fill="none" stroke="black" stroke-width="4"/><rect x="65" y="40" width="20" height="20"/></svg>' },
                { id: "C", text: "C", correct: false, svg: '<svg viewBox="0 0 100 100" width="80" height="80"><path d="M50 30 L50 70 M50 70 L45 95 M50 70 L55 95 M50 35 L20 45 M50 35 L80 45" stroke="black" stroke-width="4" fill="none"/><circle cx="50" cy="20" r="8" fill="none" stroke="black" stroke-width="4"/><rect x="10" y="40" width="15" height="15"/><rect x="75" y="40" width="15" height="15"/></svg>' }
            ],
            explain: "Rodillas flexionadas, espalda recta y carga pegada."
        }
    }
];

SB.CARLOS_CASE = {
    intro: "Carlos trabaja en un almacén levantando, transportando y ubicando cajas de <b>15 kg</b> de forma repetitiva y <b>sin pausas</b>.",
    questions: [
        { id: 1, q: "¿Qué tipo de trabajo muscular realiza Carlos?", a: "Trabajo combinado: dinámico al levantar y estático prolongado al sostener. Aunque 15 kg no superan el límite de 25 kg de la Res. 2400, la repetición, la postura forzada y la ausencia de pausas reducen el peso seguro (ecuación NIOSH)." },
        { id: 2, q: "¿Qué sistemas anatómicos están involucrados?", a: "Osteoarticular (lumbosacras, discos, hombros), Muscular (erectores espinales, etc), Nervioso y Circulatorio." },
        { id: 3, q: "¿Qué consecuencias o patologías puede tener?", a: "Lumbalgia mecánica, hernia discal, tendinopatía, DME acumulativos." },
        { id: 4, q: "¿Qué medidas preventivas recomiendas?", a: "Pausas activas cada 2h, ayudas mecánicas, ubicar carga a buena altura. Aunque 15 kg no superan el límite de 25 kg de la Res. 2400, la repetición y postura reducen el peso seguro (ecuación NIOSH)." }
    ]
};
"""

core_content = r"""
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
    t.textContent = msg;
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
        SB.el('hud-points').textContent = `⭐ ${SB.state.points}`;
        const meter = 10 + 60 * (SB.state.completed.length / 6) + 30 * (SB.state.carlosDone.length / 4);
        const mEl = SB.el('carlos-meter');
        mEl.style.width = `${Math.min(100, Math.round(meter))}%`;
        mEl.style.backgroundColor = meter > 80 ? 'var(--mint)' : (meter > 40 ? 'var(--sun)' : 'var(--coral)');
    }
    
    SB.el('hud-title').textContent = isMission ? "Espalda de Carlos" : "Historia";
    
    const nav = SB.el('hud-nav');
    nav.innerHTML = `
        <button class="btn-icon" onclick="SB.go('welcome')" title="Inicio">🏠</button>
        <button class="btn-icon" onclick="SB.go('storyMenu')" title="Capítulos">📖</button>
        <button class="btn-icon ${!SB.state.story.done ? 'locked':''}" onclick="if(SB.state.story.done) SB.go('missionsIntro')" title="Misiones">🎮</button>
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
SB.loadImg = (folder, baseName, exts, fallbackHtml, callback) => {
    let idx = 0;
    const tryNext = () => {
        if (idx >= exts.length) {
            callback(null, fallbackHtml);
            return;
        }
        const img = new Image();
        img.onload = () => callback(`assets/${folder}/${baseName}${exts[idx]}`, null);
        img.onerror = () => { idx++; tryNext(); };
        img.src = `assets/${folder}/${baseName}${exts[idx]}`;
    };
    tryNext();
};
"""

voice_content = r"""
window.SB = window.SB || {};

SB.speak = (text, who) => {
    if (!SB.state.voice || !window.speechSynthesis) return;
    speechSynthesis.cancel();
    if (who === 'narrator') return; // Sin voz
    
    const clean = text.replace(/<[^>]*>?/gm, '');
    const utt = new SpeechSynthesisUtterance(clean);
    utt.lang = 'es-CO'; // Fallback a es-* si no hay
    utt.pitch = who === 'carlos' ? 0.8 : 1.1;
    utt.rate = 0.95;
    
    // onend solo para modo película
    utt.onend = () => {
        if (SB.state.autoplay) {
            // Se le avisa a story que terminó de hablar
            if(SB.onVoiceEnd) SB.onVoiceEnd();
        }
    };
    speechSynthesis.speak(utt);
};
"""

story_content = r"""
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
                    <div class="dialogue-indicator">▼</div>
                </div>
            </div>
            <div class="scene-controls">
                <button class="btn-secondary" onclick="SB.prevBeat()">◀ Atrás</button>
                <button class="btn-secondary" onclick="SB.toggleAutoplay()" id="btn-auto">${SB.state.autoplay ? '⏸ Pausa' : '▶ Película'}</button>
                <button class="btn-primary" onclick="SB.nextBeat()" id="btn-next">Siguiente ▶</button>
            </div>
        `;
        
        // Cargar fondo
        SB.loadImg('backgrounds', `bg_${chapter.bg}`, ['.jpg', '.webp', '.png'], `<div style="width:100%; height:100%; background:var(--ink);"></div>`, (src, fallback) => {
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
    
    SB.el('btn-auto').textContent = SB.state.autoplay ? '⏸ Pausa' : '▶ Película';
    
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
                SB.loadImg('anatomy', vis.frames[0], ['.png', '.jpg', '.webp', '.svg'], `<div style="font-size:3rem;">🖼️</div>`, (src, fall) => {
                    holoC.innerHTML = src ? `<img src="${src}" class="holo-img anim-${vis.anim}" id="holo-frame">` : fall;
                    
                    if (vis.frames.length > 1 && vis.fps > 0) {
                        let fIdx = 0;
                        const tm = setInterval(() => {
                            fIdx = (fIdx + 1) % vis.frames.length;
                            SB.loadImg('anatomy', vis.frames[fIdx], ['.png', '.jpg', '.webp', '.svg'], fall, (src2, fall2) => {
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
        SB.loadImg('characters', `sb_${beat.mood}`, ['.png', '.webp'], FALLBACK_SB, (src, fall) => {
            spL.innerHTML = src ? `<img src="${src}" class="sprite anim-idle">` : fall;
        });
    } else if (beat.who === 'carlos') {
        dName.textContent = 'Carlos';
        dName.classList.add('carlos');
        spR.style.opacity = 1;
        SB.loadImg('characters', `carlos_${beat.mood}`, ['.png', '.webp'], FALLBACK_CARLOS, (src, fall) => {
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
    SB.el('btn-auto').textContent = SB.state.autoplay ? '⏸ Pausa' : '▶ Película';
};
"""

games_content = r"""
window.SB = window.SB || {};

// Reutilización de lógica de minijuegos
SB.initGame = (container, gData, onFinish) => {
    const wrapper = document.createElement('div');
    container.innerHTML = '';
    container.appendChild(wrapper);
    
    let att = 0;
    const finish = (ok) => {
        if (!ok) {
            att++;
            SB.showToast("✖ Intenta de nuevo.");
            if(att >= 2) onFinish(false);
        } else {
            wrapper.style.pointerEvents = 'none';
            wrapper.style.opacity = '0.6';
            onFinish(true, att);
        }
    };
    
    if (gData.engine === 'classify') {
        const g = gData.game;
        wrapper.innerHTML = `<div class="card" id="c-it" style="text-align:center;font-weight:bold;font-size:1.2rem;"></div><div class="classify-buttons">${g.categories.map(c=>`<button class="btn-primary" data-id="${c.id}">${c.label}</button>`).join('')}</div>`; 
        let i=0, items=[...g.items].sort(()=>Math.random()-0.5); 
        const rr=()=>{ if(i>=items.length) finish(true); else wrapper.querySelector('#c-it').textContent=items[i].text; }; 
        rr(); 
        wrapper.querySelectorAll('button').forEach(b=>b.onclick=()=>{ if(b.dataset.id===items[i].cat){ i++; rr(); } else finish(false); }); 
    } 
    else if (gData.engine === 'match') {
        const g = gData.game;
        wrapper.innerHTML = `<div class="match-container"><div class="match-col">${g.pairs.map(p=>p.left).sort(()=>Math.random()-0.5).map(x=>`<button class="match-btn l" data-v="${x}">${x}</button>`).join('')}</div><div class="match-col">${g.pairs.map(p=>({l:p.left,r:p.right})).sort(()=>Math.random()-0.5).map(x=>`<button class="match-btn r" data-v="${x.l}">${x.r}</button>`).join('')}</div></div>`; 
        let sel=null, m=0; 
        wrapper.querySelectorAll('.l').forEach(b=>b.onclick=()=>{ wrapper.querySelectorAll('.l').forEach(x=>x.classList.remove('selected')); b.classList.add('selected'); sel=b; }); 
        wrapper.querySelectorAll('.r').forEach(b=>b.onclick=()=>{ if(!sel||b.classList.contains('matched'))return; if(b.dataset.v===sel.dataset.v){ b.classList.add('matched'); sel.classList.add('matched'); sel.classList.remove('selected'); sel=null; m++; if(m===g.pairs.length) finish(true); } else finish(false); });
    }
    else if (gData.engine === 'order') {
        const g = gData.game;
        wrapper.innerHTML = `<div class="order-list">${g.items.sort(()=>Math.random()-0.5).map((x,idx)=>`<div class="order-item" data-id="${x.id}"><button class="btn-secondary" onclick="this.parentElement.previousElementSibling?this.parentElement.parentNode.insertBefore(this.parentElement,this.parentElement.previousElementSibling):null">▲</button><span>${x.text}</span></div>`).join('')}</div><button class="btn-primary" style="margin-top:1rem;width:100%" id="chk-ord">Comprobar</button>`; 
        wrapper.querySelector('#chk-ord').onclick=()=>{ let ok=true; wrapper.querySelectorAll('.order-item').forEach((e,i)=>{ if(parseInt(e.dataset.id)!==g.items[i].id)ok=false; }); finish(ok); };
    }
    else if (gData.engine === 'choice') {
        const g = gData.game;
        wrapper.innerHTML = `<p><b>${g.question}</b></p><div class="choice-list">${g.options.map(o=>`<button class="choice-btn" data-c="${o.correct?1:0}">${o.text}</button>`).join('')}</div>`; 
        wrapper.querySelectorAll('.choice-btn').forEach(b=>b.onclick=()=>finish(b.dataset.c==='1'));
    }
    else if (gData.engine === 'multi') {
        const g = gData.game;
        wrapper.innerHTML = `<p><b>${g.question}</b></p><div class="multi-list">${g.options.map(o=>`<label class="multi-item"><input type="checkbox" data-c="${o.correct?1:0}"><span>${o.text}</span></label>`).join('')}</div><button class="btn-primary" style="width:100%" id="chk-m">Comprobar</button>`; 
        wrapper.querySelector('#chk-m').onclick=()=>{ const cbs=Array.from(wrapper.querySelectorAll('input')); const ok=cbs.every(cb=>(cb.checked && cb.dataset.c==='1') || (!cb.checked && cb.dataset.c==='0')); finish(ok); };
    }
    else if (gData.engine === 'choiceSvg') {
        const g = gData.game;
        wrapper.innerHTML = `<p><b>${g.question}</b></p><div class="choice-svg-container">${g.options.map(o=>`<div style="text-align:center;">${o.svg}<br><button class="choice-btn" style="width:100%; margin-top:0.5rem;" data-c="${o.correct?1:0}">${o.text}</button></div>`).join('')}</div>`; 
        wrapper.querySelectorAll('.choice-btn').forEach(b=>b.onclick=()=>finish(b.dataset.c==='1'));
    }
};
"""

screens_content = r"""
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
                    <div style="width:150px; animation: bob 3s infinite ease-in-out;">
                        <svg class="sprite" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#8ecae6"/><circle cx="50" cy="40" r="25" fill="#ffb703"/><path d="M 30 90 Q 50 60 70 90" fill="#1b1b2f"/><circle cx="40" cy="35" r="5" fill="#fff"/><circle cx="60" cy="35" r="5" fill="#fff"/><path d="M 45 45 Q 50 55 55 45" fill="none" stroke="#fff" stroke-width="2"/></svg>
                    </div>
                </div>
                <button class="btn-primary fade-in" style="font-size:1.5rem; padding: 1rem 2rem;" onclick="SB.go('story')">🚀 Comenzar la ruta</button>
                <div style="margin-top:2rem; display:flex; gap:1rem; justify-content:center;">
                    <button class="btn-secondary" onclick="SB.state.voice = !SB.state.voice; SB.Storage.save(); this.textContent=SB.state.voice?'🔊 Voz: ON':'🔇 Voz: OFF'">🔇 Voz: OFF</button>
                </div>
            </div>`;
    } 
    else if (s === 'storyMenu') {
        appEl.innerHTML = `<div class="card"><h2>📖 Capítulos de la Historia</h2><p style="margin-bottom:1rem;">Puedes saltar libremente.</p><div style="display:flex; flex-direction:column; gap:1rem;" id="ch-list"></div></div>`;
        const list = SB.el('ch-list');
        SB.CHAPTERS.forEach(ch => {
            list.innerHTML += `<button class="btn-secondary" style="text-align:left; font-size:1.2rem;" onclick="SB.state.story.chapter=${ch.id}; SB.state.story.screen=0; SB.state.story.beat=0; SB.go('story')"><b>${ch.id}.</b> ${ch.title} <br><span style="font-size:0.9rem; color:var(--coral); font-weight:normal;">${ch.subtitle}</span></button>`;
        });
        if(SB.state.story.done) {
            list.innerHTML += `<button class="btn-primary" style="margin-top:2rem;" onclick="SB.go('missionsIntro')">🎮 Ir a las Misiones</button>`;
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
                <button class="btn-primary" style="font-size:1.2rem;" onclick="SB.go('missions')">▶ Entrar al Mapa</button>
            </div>
        `;
    }
    else if (s === 'missions') {
        appEl.innerHTML = `<div class="card"><h2>Mapa de Misiones 🎮</h2><p style="margin-bottom:1rem;">Resuelve las misiones para llenar la espalda de Carlos.</p><div style="display:flex; gap:1rem; flex-wrap:wrap; justify-content:center; margin-top:2rem;" id="m-list"></div></div>`;
        const c = SB.el('m-list');
        const unlockAll = window.location.search.includes('docente=1');
        SB.MISSIONS.forEach(m => {
            const isLocked = !unlockAll && m.id > SB.state.unlocked;
            const isDone = SB.state.completed.includes(m.id);
            c.innerHTML += `<button class="btn-secondary" style="${isLocked?'opacity:0.5; cursor:not-allowed;':''}" onclick="if(!${isLocked}) SB.go('mission', {id:${m.id}})">
                <div style="font-size:2rem;">${isLocked?'🔒': (isDone?'✅':'⭐')}</div>Misión ${m.id}
            </button>`;
        });
        const fin = unlockAll || SB.state.completed.length >= 6;
        c.innerHTML += `<button class="btn-primary" style="${!fin?'opacity:0.5; cursor:not-allowed;':''} margin-top:1rem; width:100%;" onclick="if(${fin}) SB.go('carlos')"><div style="font-size:2rem;">${fin?'🏭':'🔒'}</div>Reto Final: Caso Carlos</button>`;
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
                fb.innerHTML = `✔ ¡Correcto! ${m.game.explain}`;
                rev.classList.add('hidden');
                SB.el('btn-back').classList.remove('hidden');
                SB.award(m.id, attempts === 0 ? 20 : (attempts === 1 ? 10 : 5));
            } else {
                rev.classList.remove('hidden');
                rev.onclick = () => {
                    fb.className = 'game-feedback show success';
                    fb.innerHTML = `✔ Revelado. ${m.game.explain}`;
                    rev.classList.add('hidden');
                    SB.el('btn-back').classList.remove('hidden');
                    SB.award(m.id, 5);
                };
            }
        });
    }
    else if (s === 'carlos') {
        appEl.innerHTML = `<div class="card fade-in"><h2>Reto Final: El Caso de Carlos 🏭</h2><p>${SB.CARLOS_CASE.intro}</p><div id="cards" style="margin-top:1rem;"></div><button id="btn-fin" class="btn-primary hidden" style="width:100%; margin-top:1rem;" onclick="SB.go('final')">Finalizar Caso</button></div>`;
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
                    <button class="btn-primary" onclick="SB.go('storyMenu')">📖 Volver a ver la historia</button>
                    <button class="btn-secondary" onclick="SB.go('missions')">🎮 Volver al mapa</button>
                    <button class="btn-secondary" onclick="if(confirm('¿Reiniciar todo el progreso?')) { localStorage.removeItem(SB.Storage.key); window.location.reload(); }">🔄 Reiniciar progreso</button>
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
"""

main_content = r"""
window.SB = window.SB || {};

window.onerror = () => {
    if(SB.showToast) SB.showToast("Algo salió mal, recarga la página por favor.");
};

window.onload = () => {
    // Tecla ESC para cerrar glosario
    window.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') document.getElementById('modal-glossary').style.display = 'none';
    });
    
    SB.Storage.load();
    if(window.location.search.includes('docente=1')) SB.state.unlocked = 7;
    
    // Si estaba a mitad de historia, ir a menú de historia para reanudar el capítulo
    if(SB.state.screen === 'story') {
        SB.go('storyMenu');
    } else {
        SB.go(SB.state.screen);
    }
};
"""

with codecs.open('index.html', 'w', encoding='utf-8') as f: f.write(html_content)
with codecs.open('css/style.css', 'w', encoding='utf-8') as f: f.write(css_content)
with codecs.open('js/data-story.js', 'w', encoding='utf-8') as f: f.write(data_story_content)
with codecs.open('js/data-quiz.js', 'w', encoding='utf-8') as f: f.write(data_quiz_content)
with codecs.open('js/core.js', 'w', encoding='utf-8') as f: f.write(core_content)
with codecs.open('js/voice.js', 'w', encoding='utf-8') as f: f.write(voice_content)
with codecs.open('js/story.js', 'w', encoding='utf-8') as f: f.write(story_content)
with codecs.open('js/games.js', 'w', encoding='utf-8') as f: f.write(games_content)
with codecs.open('js/screens.js', 'w', encoding='utf-8') as f: f.write(screens_content)
with codecs.open('js/main.js', 'w', encoding='utf-8') as f: f.write(main_content)

print("V3 architecture built.")
