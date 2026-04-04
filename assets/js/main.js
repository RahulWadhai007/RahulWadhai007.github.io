// TYPING ANIMATION
  const lines = ['Agentic AI Engineer','LangGraph Architect','Deep Learning Builder','LLM Orchestrator'];
  let li=0,ci=0,del=false;
  const tEl = document.getElementById('typed-line');
  function type(){
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

  // CURSOR
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
  (function anim(){ rx+=(mx-rx)*.1; ry+=(my-ry)*.1; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(anim); })();
  document.querySelectorAll('a,button,.pcard,.ach-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
  });

  // NEURAL MESH + 3D PC (Three.js)
  const canvas = document.getElementById('neural');
  const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth,window.innerHeight);
  // Important for standard GLTF lighting matching
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
  loader.load('./portfolio/scene.gltf', function(gltf) {
    pcModel = gltf.scene;
    // Center it so OrbitControls revolves around it cleanly
    pcModel.scale.set(6, 6, 6);
    pcModel.position.set(0, -18, 0); 
    pcModel.rotation.set(0.1, -0.6, 0.05); 

    // Make sure all materials render properly
    pcModel.traverse(node => {
        if(node.isMesh) {
            // Apply slight metallic polish
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

    // Subtle PC model hover/sway animation reacting to mouse
    if (pcModel) {
        pcModel.position.y = (window.innerWidth < 768 ? -15 : -18) + Math.sin(t*0.5) * 2;
        // Comment out rotation so dragging is smooth and reliable
        // pcModel.rotation.y = -0.6 + (nmx * 0.1);
        // pcModel.rotation.x = 0.1 + (-nmy * 0.1);
    }

    // Keep scene sway very subtle
    scene.rotation.y+=((nmx*.03)-scene.rotation.y)*.018;
    scene.rotation.x+=((-nmy*.02)-scene.rotation.x)*.018;
    scene.rotation.z=Math.sin(t*.25)*.008;

    controls.update(); // Update 360 drag logic
    renderer.render(scene,cam);
  })();

  // 3D TILT
  document.querySelectorAll('[data-tilt]').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const cx=(e.clientX-r.left)/r.width-.5, cy=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(700px) rotateY(${cx*15}deg) rotateX(${-cy*11}deg) scale(1.03)`;
    });
    card.addEventListener('mouseleave',()=>{ card.style.transform='perspective(700px) rotateY(0) rotateX(0) scale(1)'; });
  });

  // SCROLL REVEAL + SKILL BARS
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