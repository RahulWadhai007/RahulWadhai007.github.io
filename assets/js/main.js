// ═══════════════════════════════════════════════════════
// PORTFOLIO — MAIN JAVASCRIPT
// Theme Toggle + Animations + Cursor + 3D Scene + SPA
// ═══════════════════════════════════════════════════════

// ─── TYPING ANIMATION ───
const lines = ['Agentic AI Engineer','LangGraph Architect','Deep Learning Builder','LLM Orchestrator'];
let li=0,ci=0,del=false;
function type(){
  const tEl = document.getElementById('typed-line');
  if(!tEl) { setTimeout(type, 100); return; }
  const cur = lines[li];
  if(!del){
    ci++;
    tEl.textContent = cur.slice(0,ci);
    if(ci===cur.length){ del=true; setTimeout(type,1800); return; }
  } else {
    ci--;
    tEl.textContent = cur.slice(0,ci);
    if(ci===0){ del=false; li=(li+1)%lines.length; setTimeout(type,300); return; }
  }
  setTimeout(type, del?55:90);
}
setTimeout(type, 1200);

// ─── CURSOR (disabled — using default system cursor) ───

// ─── NEURAL MESH + 3D PC (Three.js) ───
const canvas = document.getElementById('neural');
const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,0.1,500);
cam.position.z = 85;

// Orbit controls for 360 dragging
const controls = new THREE.OrbitControls(cam, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = false;
controls.minPolarAngle = Math.PI / 4; 
controls.maxPolarAngle = Math.PI / 1.5; 

// Add lights for the 3D Desktop PC to render correctly
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemiLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(0, 50, 50);
scene.add(dirLight);

// Load the Desktop PC model
let pcModel;
const loader = new THREE.GLTFLoader();
loader.load('./portfolio/scene.glb', function(gltf) {
  pcModel = gltf.scene;
  pcModel.scale.set(6, 6, 6);
  pcModel.position.set(0, -18, 0); 
  pcModel.rotation.set(0, -0.6, 0); 

  pcModel.traverse(node => {
      if(node.isMesh) {
          if(node.material) {
              node.material.metalness = Math.max(0.2, node.material.metalness || 0);
          }
      }
  });

  scene.add(pcModel);
});


// Render nodes
const N=130, DIST=24;
const pos=[], vel=[];
for(let i=0;i<N;i++){
  pos.push({x:(Math.random()-.5)*180,y:(Math.random()-.5)*110,z:(Math.random()-.5)*65});
  vel.push({x:(Math.random()-.5)*.055,y:(Math.random()-.5)*.035,z:(Math.random()-.5)*.025});
}

const ptGeo = new THREE.BufferGeometry();
const ptArr = new Float32Array(N*3);
pos.forEach((p,i)=>{ ptArr[i*3]=p.x; ptArr[i*3+1]=p.y; ptArr[i*3+2]=p.z; });
ptGeo.setAttribute('position',new THREE.BufferAttribute(ptArr,3));
scene.add(new THREE.Points(ptGeo,new THREE.PointsMaterial({color:0x8b5cf6,size:.95,transparent:true,opacity:.9})));

const lGeo = new THREE.BufferGeometry();
const lPos = new Float32Array(N*(N-1)/2*6);
const lCol = new Float32Array(N*(N-1)/2*6);
lGeo.setAttribute('position',new THREE.BufferAttribute(lPos,3));
lGeo.setAttribute('color',new THREE.BufferAttribute(lCol,3));
const lMesh = new THREE.LineSegments(lGeo,new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.28}));
scene.add(lMesh);

const VC=[.545,.361,.965], CC=[.133,.827,.933];
let nmx=0,nmy=0;
document.addEventListener('mousemove',e=>{ nmx=(e.clientX/window.innerWidth-.5)*2; nmy=-(e.clientY/window.innerHeight-.5)*2; });
window.addEventListener('resize',()=>{ 
  cam.aspect=window.innerWidth/window.innerHeight; 
  cam.updateProjectionMatrix(); 
  renderer.setSize(window.innerWidth,window.innerHeight); 
  
  // Scale down PC on mobile dynamically
  if (pcModel) {
    if (window.innerWidth < 768) {
      pcModel.scale.set(4, 4, 4);
      pcModel.position.set(0, -15, 0);
    } else {
      pcModel.scale.set(6, 6, 6);
      pcModel.position.set(0, -18, 0); 
    }
  }
});

function updateMesh(){
  let lc=0;
  for(let i=0;i<N;i++){
    for(let j=i+1;j<N;j++){
      const dx=pos[i].x-pos[j].x,dy=pos[i].y-pos[j].y,dz=pos[i].z-pos[j].z;
      const d=Math.sqrt(dx*dx+dy*dy+dz*dz);
      if(d<DIST){
        const t=Math.max(0,Math.min(1,(Math.abs(pos[i].z)+30)/60));
        const r=VC[0]*(1-t)+CC[0]*t,g=VC[1]*(1-t)+CC[1]*t,b=VC[2]*(1-t)+CC[2]*t;
        const k=lc*6;
        lPos[k]=pos[i].x;lPos[k+1]=pos[i].y;lPos[k+2]=pos[i].z;
        lPos[k+3]=pos[j].x;lPos[k+4]=pos[j].y;lPos[k+5]=pos[j].z;
        lCol[k]=r;lCol[k+1]=g;lCol[k+2]=b;lCol[k+3]=r;lCol[k+4]=g;lCol[k+5]=b;
        lc++;
      }
    }
  }
  lGeo.setDrawRange(0,lc*2);
  lGeo.attributes.position.needsUpdate=true;
  lGeo.attributes.color.needsUpdate=true;
}

let t=0;
(function loop(){
  requestAnimationFrame(loop); t+=.007;
  for(let i=0;i<N;i++){
    pos[i].x+=vel[i].x; pos[i].y+=vel[i].y; pos[i].z+=vel[i].z;
    if(Math.abs(pos[i].x)>90) vel[i].x*=-1;
    if(Math.abs(pos[i].y)>55) vel[i].y*=-1;
    if(Math.abs(pos[i].z)>32) vel[i].z*=-1;
    ptArr[i*3]=pos[i].x; ptArr[i*3+1]=pos[i].y; ptArr[i*3+2]=pos[i].z;
  }
  ptGeo.attributes.position.needsUpdate=true;
  updateMesh();

  // Subtle PC model sway animation (no mouse tracking)
  if (pcModel) {
      pcModel.position.y = (window.innerWidth < 768 ? -15 : -18) + Math.sin(t*0.5) * 2;
  }

  controls.update();
  renderer.render(scene,cam);
})();

// ═══════════════════════════════════════════════════════
// 3D TILT — VanillaTilt.js integration
// ═══════════════════════════════════════════════════════
function initTilt() {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.15,
      scale: 1.02,
      perspective: 1000
    });
  }
}

// ─── SCROLL REVEAL + SKILL BARS ───
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      e.target.querySelectorAll('.bfill').forEach(b=>b.classList.add('on'));
      io.unobserve(e.target);
    }
  });
},{threshold:.1});
document.querySelectorAll('.rev').forEach(el=>io.observe(el));


// ═══════════════════════════════════════════════════════
// SEAMLESS SPA ROUTER
// ═══════════════════════════════════════════════════════
document.addEventListener('click', e => {
  const link = e.target.closest('a');
  if (!link || !link.href) return;
  
  const url = new URL(link.href);
  if (url.origin === window.location.origin && (url.pathname.endsWith('.html') || url.pathname === '/')) {
    e.preventDefault();
    
    link.classList.add('btn-press');
    
    setTimeout(() => {
      link.classList.remove('btn-press');
      navigateTo(url.pathname);
    }, 200); 
  }
});

window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname, false);
});

async function navigateTo(path, push = true) {
  const container = document.getElementById('page-content');
  if(!container) {
    window.location.href = path;
    return; 
  }
  
  container.classList.add('is-loading');
  
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Network err');
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const newContent = doc.getElementById('page-content');
    const newTitle = doc.querySelector('title');
    
    if (newContent) {
      if (newTitle) document.title = newTitle.innerText;
      setTimeout(() => {
        container.innerHTML = newContent.innerHTML;
        
        if (push) {
            history.pushState(null, '', path);
        }

        reInitDOM();

        container.classList.remove('is-loading');
        window.scrollTo({top: 0, behavior: 'smooth'});
      }, 300); 
    } else {
      window.location.href = path;
    }
  } catch (err) {
    console.error('Routing failed, falling back:', err);
    window.location.href = path;
  }
}

function reInitDOM() {
  // Re-observe scroll reveals
  document.querySelectorAll('.rev').forEach(el => io.observe(el));
  
  // Re-trigger entrance animations with staggered delays
  triggerEntranceAnimations();

  // Re-init 3D tilt on new cards
  initTilt();
}


// ═══════════════════════════════════════════════════════
// THEME SWITCHER — localStorage Persistence
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
});

// Toggle on click
document.addEventListener('click', e => {
  const themeBtn = e.target.closest('.theme-toggle');
  if (themeBtn) {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    
    // Persist preference
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }
});


// ═══════════════════════════════════════════════════════
// GODMODE PHYSICS ENGINE — Nav Indicator + PC Shadow
// ═══════════════════════════════════════════════════════
function initGodmodePhysics() {
  if (!document.getElementById('pc-shadow')) {
    const shadow = document.createElement('div');
    shadow.id = 'pc-shadow';
    document.body.appendChild(shadow);
  }
}


// ═══════════════════════════════════════════════════════
// PARALLAX + MAGNETIC BUTTON PULL (disabled)
// ═══════════════════════════════════════════════════════

// ─── CLICK RIPPLE ───
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn, .nav-btn');
  if (btn && !btn.classList.contains('theme-toggle')) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    if(!btn.classList.contains('nav-btn')) btn.style.overflow = 'hidden';
    if(window.getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }
});


// ═══════════════════════════════════════════════════════
// ENTRANCE ANIMATIONS — Staggered slide-up + fade
// ═══════════════════════════════════════════════════════
function triggerEntranceAnimations() {
  const selectors = '.hero-sub, .atext p, .pcard, .sgroup, .edu-box, .ach-card, .cdesc, .clink, .sh';
  const elements = document.querySelectorAll(selectors);
  
  elements.forEach((el, i) => {
    el.classList.remove('entrance-animate');
    el.style.animationDelay = '';
    void el.offsetHeight; // trigger reflow
    
    const delay = i * 0.08;
    el.style.animationDelay = `${delay}s`;
    el.classList.add('entrance-animate');
  });
}

// Fire entrance animations on initial page load
document.addEventListener('DOMContentLoaded', () => {
  triggerEntranceAnimations();
  initGodmodePhysics();
  initTilt();
});
