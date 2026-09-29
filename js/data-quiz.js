
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
