// Custom cursor
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function anim(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;cur.style.left=mx+'px';cur.style.top=my+'px';ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(anim);})();
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ring.style.width='54px';ring.style.height='54px';ring.style.borderColor='rgba(245,158,11,0.6)';});
  el.addEventListener('mouseleave',()=>{ring.style.width='34px';ring.style.height='34px';ring.style.borderColor='rgba(139,92,246,0.5)';});
});

// Particles
const cv=document.getElementById('particle-canvas');
const ctx=cv.getContext('2d');
let W,H;
function resize(){W=cv.width=innerWidth;H=cv.height=innerHeight;}
resize();window.addEventListener('resize',resize);
const cols=['rgba(139,92,246,','rgba(167,139,250,','rgba(196,181,253,','rgba(245,158,11,','rgba(236,72,153,'];
const pts=Array.from({length:90},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.5+0.4,dx:(Math.random()-0.5)*0.28,dy:(Math.random()-0.5)*0.28,c:cols[Math.floor(Math.random()*cols.length)],o:Math.random()*0.35+0.1}));
(function draw(){
  ctx.clearRect(0,0,W,H);
  pts.forEach(p=>{
    p.x+=p.dx;p.y+=p.dy;
    if(p.x<0||p.x>W)p.dx*=-1;
    if(p.y<0||p.y>H)p.dy*=-1;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.c+p.o+')';ctx.fill();
  });
  for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
    const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<110){ctx.beginPath();ctx.strokeStyle=`rgba(139,92,246,${0.055*(1-d/110)})`;ctx.lineWidth=0.5;ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();}
  }
  requestAnimationFrame(draw);
})();

// Scroll reveal
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.1,rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>obs.observe(el));

// Counter
const cobs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target,t=+el.dataset.target;
      let c=0;const s=t/30;
      const ti=setInterval(()=>{c+=s;if(c>=t){c=t;clearInterval(ti);}el.textContent=Math.ceil(c);},40);
      cobs.unobserve(el);
    }
  });
},{threshold:0.5});
document.querySelectorAll('[data-target]').forEach(c=>cobs.observe(c));

// Parallax orbs on mouse
document.addEventListener('mousemove',e=>{
  const cx=(e.clientX/window.innerWidth-0.5);
  const cy=(e.clientY/window.innerHeight-0.5);
  document.querySelectorAll('.hero-orb').forEach((o,i)=>{
    const f=(i+1)*14;
    o.style.transform=`translate(${cx*f}px,${cy*f}px)`;
  });
});
