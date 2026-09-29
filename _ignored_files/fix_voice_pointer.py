import codecs
import re

# 1. Update CSS to fix the pointer overlapping
with codecs.open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Move dialogue-box::before and ::after to the center instead of left: 15%
css = css.replace("left: 15%;", "left: 50%; transform: translateX(-50%);")

with codecs.open('css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

# 2. Update voice.js to select female/male voices
voice_script = """window.SB = window.SB || {};

SB.getVoice = (who) => {
    const voices = speechSynthesis.getVoices();
    const esVoices = voices.filter(v => v.lang.startsWith('es'));
    if(esVoices.length === 0) return null;
    
    // Nombres comunes de voces femeninas/masculinas en Windows/Mac/Android
    const femaleNames = ['sabina', 'helena', 'laura', 'zira', 'mujer', 'female', 'monica', 'paulina'];
    const maleNames = ['raul', 'pablo', 'david', 'hombre', 'male', 'diego', 'jorge'];
    
    if (who === 'carlos') {
        let v = esVoices.find(v => maleNames.some(name => v.name.toLowerCase().includes(name)));
        return v || esVoices[0];
    } else {
        // Para Señora Biomecánica (mujer)
        let v = esVoices.find(v => femaleNames.some(name => v.name.toLowerCase().includes(name)));
        return v || esVoices[0];
    }
};

SB.speak = (text, who) => {
    if (!SB.state.voice || !window.speechSynthesis) return;
    speechSynthesis.cancel();
    if (who === 'narrator') return; 
    
    const clean = text.replace(/<[^>]*>?/gm, '');
    const utt = new SpeechSynthesisUtterance(clean);
    utt.lang = 'es-CO';
    
    // Intentar asignar una voz específica
    const voice = SB.getVoice(who);
    if (voice) utt.voice = voice;
    
    // Ajustar el pitch
    utt.pitch = who === 'carlos' ? 0.8 : 1.2;
    utt.rate = 0.95;
    
    utt.onend = () => {
        if (SB.state.autoplay) {
            if(SB.onVoiceEnd) SB.onVoiceEnd();
        }
    };
    speechSynthesis.speak(utt);
};
"""

with codecs.open('js/voice.js', 'w', encoding='utf-8') as f:
    f.write(voice_script)

print("CSS pointer and voice matching fixed.")
