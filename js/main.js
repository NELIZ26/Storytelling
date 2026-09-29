
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
