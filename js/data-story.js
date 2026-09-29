
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
    "reps": { frames:[], fps:0, anim:'none', caption:'repeticiones en un turno de 8 h', chips:['Trabajo repetitivo'], badge:null, emoji:'<i class="fa-solid fa-stopwatch"></i> <i class="fa-solid fa-box"></i>', countTo:2880 },
    "prevent": { frames:[], fps:0, anim:'none', caption:'Rotar · Rediseñar · Micropausas', chips:['Micropausas activas'], badge:null, emoji:'<i class="fa-solid fa-rotate"></i> <i class="fa-solid fa-tools"></i> <i class="fa-solid fa-pause"></i>', countTo:null },
    "load": { frames:[], fps:0, anim:'none', caption:'', chips:['Carga manual'], badge:'≥ 3 kg', emoji:'<i class="fa-solid fa-box"></i>', countTo:null },
    "limits": { frames:[], fps:0, anim:'none', caption:'Límites de referencia', chips:['Res. 2400', 'NIOSH'], badge:null, emoji:'<i class="fa-solid fa-scale-balanced"></i>', countTo:null },
    "lift_bad": { frames:['lift_wrong'], fps:0, anim:'shake', caption:'Espalda encorvada y carga lejos <i class="fa-solid fa-xmark"></i>', chips:['Brazo de palanca'], badge:null, emoji:null, countTo:null },
    "lift_twist": { frames:['lift_twist'], fps:0, anim:'shake', caption:'Torsión del tronco con carga <i class="fa-solid fa-xmark"></i>', chips:['Torsión'], badge:null, emoji:null, countTo:null },
    "lift_good": { frames:['lift_right'], fps:0, anim:'pulse', caption:'Rodillas flexionadas, espalda recta <i class="fa-solid fa-check"></i>', chips:['Técnica segura'], badge:null, emoji:null, countTo:null },
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
