const looks=[
 {ref:'artist-reference',result:'artist-result',title:'The artist’s muse.',type:'ART INSPIRED',desc:'A rose gown, feathered hat, and painter’s palette bring a painted wardrobe into a photographic portrait.',tags:['Painting inspiration','Photographic result']},
 {ref:'ivory-reference',result:'ivory-result',title:'Ivory daydream.',type:'ART INSPIRED',desc:'An ivory dress, pink sash, and dark shawl travel from a framed painting into an illustrated full-body portrait.',tags:['Painting inspiration','Illustrated result']},
 {ref:'scarlet-reference',result:'scarlet-result',title:'Scarlet ribbon.',type:'ART INSPIRED',desc:'A cream headwrap, ruffled collar, and scarlet sash reimagine the painting’s black dress in a softly shaded illustration.',tags:['Shared painting reference','Illustrated result']},
 {ref:'scarlet-reference',result:'ink-result',title:'In ink.',type:'STYLE VARIATION',desc:'The same painting inspires another interpretation: graphic lines, textured shading, and a vivid red ribbon.',tags:['Shared painting reference','Ink-style result']},
 {ref:'cat-reference',result:'cat-result',title:'Calico comfort.',type:'EVERYDAY INSPIRATION',desc:'A calico cat in a golden bed inspires a cozy portrait, complete with a spotted fleece outfit, paw slippers, and a familiar companion.',tags:['Cat photo inspiration','Photographic result']}
];
let active=0;const $=id=>document.getElementById(id);const path=name=>`assets/${name}.jpg`;
function select(i){active=i;const l=looks[i];$('reference').src=path(l.ref);$('reference').alt=`Reference for ${l.title}`;$('result').src=path(l.result);$('result').alt=`Generated result: ${l.title}`;$('compare-result').src=path(l.result);$('compare-result').alt=`Generated result for comparison: ${l.title}`;$('look-number').textContent=`LOOK 0${i+1} / ${l.type}`;$('look-title').textContent=l.title;$('look-description').textContent=l.desc;$('tags').replaceChildren(...l.tags.map(t=>{const e=document.createElement('span');e.textContent=t;return e}));$('compare').value=50;compare();document.querySelectorAll('[data-look]').forEach((b,j)=>{b.classList.toggle('active',j===i);b.setAttribute('aria-pressed',String(j===i))});}
function compare(){const v=$('compare').value;$('before').style.clipPath=`inset(0 ${100-v}% 0 0)`;$('divider').style.left=v+'%';}
document.querySelectorAll('[data-look]').forEach(b=>b.addEventListener('click',()=>select(+b.dataset.look)));$('next').onclick=()=>select((active+1)%looks.length);$('compare').oninput=compare;
function open(name,alt){$('large').src=path(name);$('large').alt=alt;$('lightbox').showModal();}
document.querySelector('[data-view]').onclick=()=>open('artist-reference','Painting reference for The artist’s muse');$('expand-original').onclick=()=>open('original','Original source photograph');$('expand-ref').onclick=()=>open(looks[active].ref,`Reference for ${looks[active].title}`);$('expand-result').onclick=()=>open(looks[active].result,`Generated result: ${looks[active].title}`);$('close').onclick=()=>$('lightbox').close();$('lightbox').onclick=e=>{if(e.target===$('lightbox'))$('lightbox').close();};

$("hero-original").onclick=()=>open("original","Original source photograph");
$("hero-output").onclick=()=>open("artist-result","Generated portrait inspired by the painting");

$("calico-explore").addEventListener("click",()=>select(4));

$("calico-reference-open").onclick=()=>open("cat-reference","Calico cat reference photograph");
