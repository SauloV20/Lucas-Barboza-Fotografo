
// PRELOADER
window.addEventListener('load', () => { const pre = document.getElementById('preloader'); if(pre){ pre.style.display = 'none'; } });

// MENU HAMBURGER
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if(hamburger && navLinks){
  hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// FADE-IN DAS SEÇÕES
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold:0.2, rootMargin:"0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, appearOptions);
faders.forEach(fader=>appearOnScroll.observe(fader));

// PORTFÓLIO FILTER
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioItems.forEach((item, index)=>{
      if(filter==='all'||item.classList.contains(filter)){
        item.style.display='block';
        setTimeout(()=>item.style.opacity='1', 100*index);
      } else { item.style.display='none'; item.style.opacity='0'; }
    });
  });
});

// LIGHTBOX AVANÇADO
const lightbox = document.getElementById('lightbox');
if(lightbox){
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const closeBtn = document.querySelector('.lightbox .close');
  const prevBtn = document.querySelector('.lightbox .prev');
  const nextBtn = document.querySelector('.lightbox .next');

  let currentIndex = 0;
  let portfolioArray = Array.from(portfolioItems);

  function openLightbox(index){
    const item = portfolioArray[index];
    lightboxImg.src = item.querySelector('img').src;
    lightboxTitle.textContent = item.dataset.title || '';
    lightbox.style.display = 'flex';
    currentIndex = index;
  }

  portfolioArray.forEach((item, i)=>{
    item.addEventListener('click', ()=> openLightbox(i));
  });

  if(closeBtn){ closeBtn.addEventListener('click', ()=> lightbox.style.display='none'); }
  lightbox.addEventListener('click', e=>{ if(e.target===lightbox) lightbox.style.display='none'; });
  if(prevBtn){ prevBtn.addEventListener('click', ()=>{
    currentIndex = (currentIndex-1+portfolioArray.length)%portfolioArray.length;
    openLightbox(currentIndex);
  }); }
  if(nextBtn){ nextBtn.addEventListener('click', ()=>{
    currentIndex = (currentIndex+1)%portfolioArray.length;
    openLightbox(currentIndex);
  }); }
}

// TEXTO DINÂMICO HOME
const text = "Fotografia de Casamentos e Pré-Weddings com emoção e estilo.";
const typedText = document.getElementById('typed-text');
let i=0;
function typeWriter(){
  if(!typedText) return;
  if(i<text.length){ typedText.innerHTML+=text.charAt(i); i++; setTimeout(typeWriter,100); }
}
if(typedText){ window.addEventListener('load', typeWriter); }
