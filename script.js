'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let motionManager;
const menu = $('.menu-toggle');
function closeMenu(){ menu.setAttribute('aria-expanded','false'); $('#navigation').classList.remove('is-open'); }
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true'; menu.setAttribute('aria-expanded',String(open));$('#navigation').classList.toggle('is-open',open);});
$$('#navigation a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
matchMedia('(min-width:801px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
$('#year').textContent = new Date().getFullYear();
const today = new Date();
$('#date').min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
// Ambient footage loads only when visible; user intent overrides automatic playback.
const heroVideo = $('#hero-video');
const motionButton = $('#motion-toggle');
let ambientAllowed = !motion.matches && !navigator.connection?.saveData;
let heroVisible = false;
function loadAmbient(){if(!heroVideo.getAttribute('src')){heroVideo.src=heroVideo.dataset.src;heroVideo.load();}}
function syncAmbient(){
  if(ambientAllowed&&heroVisible&&!document.hidden&&!$('dialog[open]')){
    loadAmbient();heroVideo.play().catch(()=>{motionButton.innerHTML='<span class="ui-icon" aria-hidden="true">▶</span> Reproducir';});
  }else heroVideo.pause();
}
heroVideo.addEventListener('play',()=>{motionButton.innerHTML='<span class="ui-icon" aria-hidden="true">Ⅱ</span> Pausar';motionButton.setAttribute('aria-label','Pausar video de portada');});
heroVideo.addEventListener('pause',()=>{motionButton.innerHTML='<span class="ui-icon" aria-hidden="true">▶</span> Reproducir';motionButton.setAttribute('aria-label','Reproducir video de portada');});
motionButton.addEventListener('click',()=>{ambientAllowed=heroVideo.paused;syncAmbient();});
if('IntersectionObserver' in window){new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;syncAmbient();},{threshold:.15}).observe(heroVideo);}else{heroVisible=true;syncAmbient();}
document.addEventListener('visibilitychange',syncAmbient);
motion.addEventListener('change',()=>{ambientAllowed=!motion.matches&&!navigator.connection?.saveData;syncAmbient();setupMotion();});
// Native dialogs keep focus contained, support Escape and return it to the trigger.
$$('dialog').forEach(dialog=>{
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');syncAmbient();});
});
function openDialog(dialog){heroVideo.pause();document.body.classList.add('modal-open');dialog.showModal();}
const film=$('#brand-video');
const videos={experiencia:'assets/video/experiencia.mp4',cocina:'assets/video/cocina.mp4',yeyo:'assets/video/yeyo.mp4',malaya:'assets/video/malaya.mp4'};
$$('[data-video]').forEach(button=>button.addEventListener('click',()=>{
 $('#video-title').textContent=button.dataset.title;film.querySelectorAll('track').forEach(t=>t.remove());if(button.dataset.video==='yeyo'){const track=document.createElement('track');track.kind='captions';track.label='Español · resumen';track.srclang='es';track.src='assets/video/yeyo-resumen.vtt';track.default=true;film.append(track);}film.src=videos[button.dataset.video];film.poster=button.dataset.video==='yeyo'?'assets/editorial/yeyo-servicio.webp':'assets/editorial/parrilla.webp';openDialog($('#video-dialog'));film.play().catch(()=>{});
}));
$('#video-dialog').addEventListener('close',()=>{film.pause();film.removeAttribute('src');film.load();});
const gallery=$$('[data-gallery]'); let activeImage=0;
function showImage(index){activeImage=(index+gallery.length)%gallery.length;const item=gallery[activeImage];$('#gallery-image').src=`assets/editorial/${item.dataset.gallery}.webp`;$('#gallery-image').alt=item.querySelector('img').alt;$('#gallery-caption').textContent=`${activeImage+1} / ${gallery.length} — ${item.dataset.caption}`;}
gallery.forEach((b,i)=>b.addEventListener('click',()=>{showImage(i);openDialog($('#gallery-dialog'));}));
$('#previous-image').addEventListener('click',()=>showImage(activeImage-1));$('#next-image').addEventListener('click',()=>showImage(activeImage+1));
$('#gallery-dialog').addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showImage(activeImage+1);}if(e.key==='ArrowLeft'){e.preventDefault();showImage(activeImage-1);}});
const rail=$('#dish-rail');
const dishes=$$('.dish');
function railPosition(){return Math.round(rail.scrollLeft/(dishes[0].offsetWidth+parseFloat(getComputedStyle(rail).gap)));}
function updateRail(){const i=Math.min(5,railPosition());$('#rail-count').textContent=`${String(i+1).padStart(2,'0')} / 06`;$('#dish-prev').disabled=rail.scrollLeft<5;$('#dish-next').disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-5;}
function slideRail(direction){rail.scrollBy({left:direction*(dishes[0].offsetWidth+parseFloat(getComputedStyle(rail).gap)),behavior:motion.matches?'instant':'smooth'});}
$('#dish-prev').addEventListener('click',()=>slideRail(-1));$('#dish-next').addEventListener('click',()=>slideRail(1));
rail.addEventListener('scroll',updateRail,{passive:true});rail.addEventListener('keydown',e=>{if(e.target!==rail)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();slideRail(e.key==='ArrowRight'?1:-1);}});window.addEventListener('resize',updateRail,{passive:true});updateRail();
$$('[data-event]').forEach(a=>a.addEventListener('click',()=>{$('#occasion').value=a.dataset.event;}));
$('#quote-form').addEventListener('submit',e=>{
 e.preventDefault();const name=$('#name').value.trim(),place=$('#place').value.trim();
 if(!name||!place){const input=!name?$('#name'):$('#place');input.setCustomValidity('Completa este dato para preparar tu consulta.');input.reportValidity();input.addEventListener('input',()=>input.setCustomValidity(''),{once:true});return;}
 const date=$('#date').value;const dateText=date?new Intl.DateTimeFormat('es-CL',{day:'numeric',month:'long',year:'numeric'}).format(new Date(`${date}T12:00:00`)):'Por definir';
 $('#quote-message').value=`¡Hola, Parriyeyo! Soy ${name} y me gustaría cotizar un evento.\n\nOcasión: ${$('#occasion').value}\nFecha estimada: ${dateText}\nInvitados: ${$('#guests').value}\nLugar: ${place}\n${$('#details').value.trim()?`\nMás detalles: ${$('#details').value.trim()}\n`:''}\n¿Podemos conversar sobre disponibilidad y una propuesta?`;
 $('#copy-status').textContent='El mensaje todavía no se ha enviado.';$('#copy-message').textContent='Copiar mensaje';openDialog($('#quote-dialog'));
});
$('#copy-message').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#quote-message').value);$('#copy-status').textContent='Mensaje copiado. Abre Instagram, pulsa «Mensaje» y pégalo para enviarlo.';$('#copy-message').textContent='¡Mensaje copiado!';}catch{$('#quote-message').focus();$('#quote-message').select();$('#copy-status').textContent='Usa la opción Copiar de tu dispositivo y pega el mensaje en Instagram.';}});
const content=window.PARRIYEYO_CONTENT||{};
(content.partners||[]).forEach(partner=>{let url;try{url=new URL(partner.url);}catch{return;}if(!partner.name||url.protocol!=='https:')return;const a=document.createElement('a');a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';a.textContent=partner.name;$('#partner-list').append(a);});$('#aliados').hidden=!$('#partner-list').children.length;
if(content.conditionsPdf&&/^assets\/[a-z0-9_/-]+\.pdf$/i.test(content.conditionsPdf)&&!content.conditionsPdf.includes('..')){$('#conditions-link').href=content.conditionsPdf;$('#conditions-download').hidden=false;}
// Progressive motion: all copy and images remain available without GSAP or JavaScript.
function setupMotion(){
 motionManager?.revert();
 if(motion.matches)return;
 if(window.gsap&&window.ScrollTrigger){
 gsap.registerPlugin(ScrollTrigger);
 const mm=gsap.matchMedia();motionManager=mm;
 mm.add('(prefers-reduced-motion: no-preference)',()=>{
   gsap.from('.hero-copy h1',{y:30,duration:1.1,ease:'power3.out'});
   gsap.from('.hero-stills figure',{y:28,stagger:.12,duration:1.2,ease:'power3.out'});
   const track=$('.ticker-track');gsap.to(track,{xPercent:-20,ease:'none',scrollTrigger:{trigger:'.ticker',start:'top bottom',end:'bottom top',scrub:1}});
   gsap.utils.toArray('[data-parallax]').forEach(img=>gsap.fromTo(img,{yPercent:-3},{yPercent:3,ease:'none',scrollTrigger:{trigger:img.parentElement,start:'top bottom',end:'bottom top',scrub:1}}));
   gsap.from('.round-seal',{rotation:8,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:'.hero-visual',start:'top 80%'}});
   gsap.from('.team-photo',{rotation:-2,y:35,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:'.chef-pictures',start:'top 80%'}});
   gsap.utils.toArray('.occasion-links a').forEach((a,i)=>gsap.from(a,{x:-15,duration:.65,delay:i*.06,ease:'power3.out',scrollTrigger:{trigger:'.occasion-links',start:'top 85%'}}));

 });
 mm.add('(min-width: 801px) and (prefers-reduced-motion: no-preference)',()=>{
   const section=$('.ritual'),steps=$$('.ritual-step'),images=$$('.ritual-image');section.classList.add('is-pinned');let currentStep=0;
   function activate(i){if(i===currentStep)return;steps[currentStep].classList.remove('active');images[currentStep].classList.remove('active');currentStep=i;steps[i].classList.add('active');images[i].classList.add('active');gsap.fromTo(steps[i],{y:22},{y:0,duration:.55,ease:'power3.out'});gsap.fromTo(images[i],{opacity:.6,scale:1.035},{opacity:1,scale:1,duration:.6,ease:'power2.out'});}
   ScrollTrigger.create({trigger:section,start:'top 90px',end:'bottom bottom',invalidateOnRefresh:true,onUpdate:self=>{activate(Math.min(2,Math.floor(self.progress*3)));$('.ritual-progress span').style.width=`${33.33+self.progress*66.67}%`;}});
   return()=>{section.classList.remove('is-pinned');steps.forEach((s,i)=>s.classList.toggle('active',i===0));images.forEach((s,i)=>s.classList.toggle('active',i===0));};
 });
 window.addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});
}

}
setupMotion();

// The fire scene is a real inline video on mobile and desktop.
const ritualVideo = $('#ritual-video');
const ritualFrame = $('.ritual-film');
const ritualButton = $('#ritual-video-toggle');
let ritualVisible = false;
let ritualAllowed = !motion.matches;
function loadRitualVideo(){
 if(!ritualVideo.getAttribute('src')){
  ritualVideo.muted = true;
  ritualVideo.defaultMuted = true;
  ritualVideo.src = matchMedia('(max-width:800px)').matches ? ritualVideo.dataset.mobileSrc : ritualVideo.dataset.src;
  ritualVideo.load();
 }
}
function syncRitualVideo(){
 if(ritualAllowed && ritualVisible && ritualFrame.classList.contains('active') && !document.hidden && !$('dialog[open]')){
  loadRitualVideo();
  ritualVideo.play().catch(()=>{
   ritualButton.innerHTML='<span class="ui-icon" aria-hidden="true">▶</span> Reproducir';
   ritualButton.setAttribute('aria-label','Reproducir video de fuego');
  });
 }else ritualVideo.pause();
}
ritualVideo.addEventListener('play',()=>{
 ritualButton.innerHTML='<span class="ui-icon" aria-hidden="true">Ⅱ</span> Pausar';
 ritualButton.setAttribute('aria-label','Pausar video de fuego');
});
ritualVideo.addEventListener('pause',()=>{
 ritualButton.innerHTML='<span class="ui-icon" aria-hidden="true">▶</span> Reproducir';
 ritualButton.setAttribute('aria-label','Reproducir video de fuego');
});
ritualButton.addEventListener('click',()=>{
 ritualAllowed=ritualVideo.paused;
 syncRitualVideo();
});
if('IntersectionObserver' in window){
 const preloadRitual = new IntersectionObserver(entries=>{
  if(entries.some(e=>e.isIntersecting)){loadRitualVideo();preloadRitual.disconnect();}
 },{rootMargin:'400px 0px'});
 preloadRitual.observe($('.ritual-images'));
 new IntersectionObserver(entries=>{
  ritualVisible=entries[0].isIntersecting;
  syncRitualVideo();
 },{threshold:0}).observe($('.ritual-images'));
}else{ritualVisible=true;syncRitualVideo();}
new MutationObserver(syncRitualVideo).observe(ritualFrame,{attributes:true,attributeFilter:['class']});
$$('dialog').forEach(dialog=>new MutationObserver(syncRitualVideo).observe(dialog,{attributes:true,attributeFilter:['open']}));
document.addEventListener('visibilitychange',syncRitualVideo);
function updateRitualPreference(){ritualAllowed=!motion.matches;syncRitualVideo();}
motion.addEventListener('change',updateRitualPreference);

matchMedia('(max-width:800px)').addEventListener('change',()=>{
 ritualVideo.pause();ritualVideo.removeAttribute('src');loadRitualVideo();syncRitualVideo();
});
