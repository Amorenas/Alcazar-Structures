// --- Forzar actualización del logo si el navegador tenía uno antiguo en caché
(function ensureFreshLogo(){
  const img = document.querySelector('.brand-logo');
  if(img && !img.src.includes('v=')){
    const url = new URL(img.getAttribute('src'), location.href);
    url.searchParams.set('v','2');
    img.src = url.toString();
  }
})();

// --- Lightbox sin dependencias (clic, teclas, swipe, ESC)
(function lightbox(){
  const gallery = document.querySelector('[data-lightbox]');
  if(!gallery) return;

  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-cap');
  const prevBtn = lb.querySelector('.lb-prev');
  const nextBtn = lb.querySelector('.lb-next');
  const closeBtn = lb.querySelector('.lb-close');

  const items = Array.from(gallery.querySelectorAll('img[data-full]'));
  let index = 0;

  const open = (i)=>{
    index = (i+items.length)%items.length;
    const el = items[index];
    img.src = el.dataset.full || el.src;
    img.alt = el.alt || '';
    cap.textContent = el.alt || '';
    lb.hidden = false;
    lb.setAttribute('aria-hidden','false');
    document.body.classList.add('noscroll');
    // Preload vecinos
    [index-1,index+1].forEach(j=>{
      const k = (j+items.length)%items.length;
      new Image().src = items[k].dataset.full || items[k].src;
    });
  };
  const close = ()=>{
    lb.hidden = true;
    lb.setAttribute('aria-hidden','true');
    document.body.classList.remove('noscroll');
    img.removeAttribute('src');
  };
  const next = ()=> open(index+1);
  const prev = ()=> open(index-1);

  items.forEach((el,i)=>{
    el.setAttribute('tabindex','0');
    el.addEventListener('click',()=>open(i));
    el.addEventListener('keydown',e=>{
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); open(i); }
    });
  });

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  lb.addEventListener('click', (e)=>{ if(e.target===lb) close(); });

  document.addEventListener('keydown', (e)=>{
    if(lb.hidden) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowRight') next();
    if(e.key==='ArrowLeft') prev();
  });

  // Gestos táctiles
  let sx = 0, sy = 0;
  img.addEventListener('touchstart', e=>{
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, {passive:true});
  img.addEventListener('touchend', e=>{
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if(Math.abs(dx) > 40 && Math.abs(dy) < 60){ dx<0 ? next() : prev(); }
  });
})();
