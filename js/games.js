
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
            SB.showToast('<i class="fa-solid fa-xmark"></i> Intenta de nuevo.');
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
        wrapper.innerHTML = `<div class="order-list">${g.items.sort(()=>Math.random()-0.5).map((x,idx)=>`<div class="order-item" data-id="${x.id}"><button class="btn-secondary" onclick="this.parentElement.previousElementSibling?this.parentElement.parentNode.insertBefore(this.parentElement,this.parentElement.previousElementSibling):null"><i class="fa-solid fa-caret-up"></i></button><span>${x.text}</span></div>`).join('')}</div><button class="btn-primary" style="margin-top:1rem;width:100%" id="chk-ord">Comprobar</button>`; 
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
