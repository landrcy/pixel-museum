/* Landry's site temples (part 1): LANDRCYVERSE OBSERVATORY, THE VOID ABYSS, SEA OF THOUGHT, THE BINDING OF ASHAAD */
(()=>{'use strict';const{rp,ramp,bay,H,vn,fbm,RM,TAU,clamp,lerp,mix}=M;const K=M.K,PAL=K.PAL,P=window.PLANETS;
const glowAt=(g,x,y,r,c,d=.6)=>M.glow(g,Math.round(x),Math.round(y),r,c,d);
const px=(g,x,y,c,w=1,h=1)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h)};
const sel1=(g,X,Y,w)=>{g.fillStyle='#fff6c4';g.fillRect(X,Y-2,w,1)};
/* a live planet painter as an entity (repainted on a timer) */
K.planet=(R,o)=>{const w=o.w,h=o.h||o.w,S=P.mk(w,h);P[o.paint](S,1,o.arg?o.arg(null):o.kind);const sp=M.fromCanvas(S.c);
 const e=M.ent(R,Object.assign({x:Math.round(o.x-w/2),y:Math.round(o.y-h/2),w,h,S,sp,pt:H(w,h)*50,spd:1,next:0,name:o.name,z:o.z??o.y,
  draw(g,x,y,t,e,sel){if(M.now>=e.next){P[o.paint](S,RM?3:e.pt,o.arg?o.arg(e,sel):o.kind);e.next=M.now+(o.dt||.07)}if(e.pre)e.pre(g,x,y,t,e);if(sel)g.drawImage(M.ring(sp),x-1,y-1);g.drawImage(S.c,x,y);if(e.post)e.post(g,x,y,t,e)}},o.e||{}));
 const u=e.upd;e.upd=(e,dt,t,R)=>{e.pt+=dt*e.spd*(RM?0:1);u&&u(e,dt,t,R)};return e};
const S=K.S={glowAt,px,sel1};

/* ======================= LANDRCYVERSE OBSERVATORY ======================= */
{const W=960,FL=170,SX=480,SY=74,BR=['#140c04','#3a2208','#7a4a10','#c08a2a','#ffe08a'];
 const BOD=[['void',30,90,'THE VOID'],['sea',20,120,'SEA OF THOUGHT'],['ashaad',22,150,'ASHAAD',20],['yt',20,180,'LLC CHANNELS'],['arena',30,212,'BALL ARENA',24],['crest',24,244,'COOPER CITY',19]];
 K.ext('hub',{top:'#03020a',bot:'#03020a',start:480,
  bg(p,R){K.space(p,0,0,W,FL,['#02010a','#06041a','#0c0828','#140e34'],['#140e34','#2a1650','#4a2066','#7a2c72','#b0507a'],3,.45);
   // temple dome ribs framing the sky
   for(let x=0;x<W;x++){const d=Math.abs(x-SX)/(W/2);const y=Math.round(6+d*d*30);for(let j=0;j<y;j++)p.px(x,j,rp(PAL.slate,.25+(j===y-1?.4:0),x,j))}
   for(const cx of[60,250,710,900])K.pillar(p,cx,40,FL,16,PAL.slate,{cap:8,base:8,rune:'#7a5ac8',sd:cx});
   // orbit paths (dotted ellipses)
   for(const b of BOD){const n=Math.round(b[2]*5);for(let k=0;k<n;k+=4){const a=k/n*TAU;p.px(SX+Math.cos(a)*b[2],SY+Math.sin(a)*b[2]*.24,Math.sin(a)>0?'#3a3470':'#221e48')}}
   K.floor(p,FL,M.RH,PAL.slate,{v:.3,inlay:(x,y)=>{const d=Math.hypot((x-SX)/2.2,(y-FL-18)*1.6);return Math.abs(d-40)<.7||Math.abs(d-70)<.7?(H(x,y)>.5?BR[3]:BR[2]):0}})},
  init(R){
   const sun=K.planet(R,{paint:'sun',w:80,x:SX,y:SY,name:'THE SUN (LANDRCYVERSE)',z:-10,dt:.06,arg:e=>({ign:1,fl:e?1+e.flare:1,L:e?Math.floor(e.Lr*8)/8:1}),
    e:{flare:0,Lr:1,upd(e,dt){e.flare=Math.max(0,e.flare-dt*.9);if(e.Lr<1)e.Lr=Math.min(1,e.Lr+dt*.8)},
     click(e,R){e.flare=1.6;e.Lr=0;M.snd('charge',.6);M.snd('rumble',1.3);M.emit(R,'fire',SX,SY,26,{v:2.4});M.flash(R,'#fff0c0',.12);M.say(R,SX,SY-46,'SOLAR FLARE! THE L REWRITES ITSELF',1.6)}}});
   BOD.forEach((b,i)=>{const e=K.planet(R,{paint:b[0],w:b[1],h:b[4],x:SX,y:SY,name:b[3],dt:.08,arg:b[0]==='ashaad'?(e,s)=>({open:e&&M.now<e.bT?1:0}):undefined,
    e:{a:i*1.7+.4,rx:b[2],bT:0,w0:.5*Math.pow(90/b[2],1.4),
     upd(e,dt){const sp=M.now<e.bT?5:1;e.a+=dt*e.w0*sp*(RM?0:1);const cx=SX+Math.cos(e.a)*e.rx,cy=SY+Math.sin(e.a)*e.rx*.24;e.x=Math.round(cx-e.w/2);e.y=Math.round(cy-e.h/2);e.z=Math.sin(e.a)>0?20:-20},
     click(e,R){e.bT=M.now+1.4;M.snd('whoosh',1+i*.1);M.emit(R,'star',e.x+e.w/2,e.y+e.h/2,10);M.say(R,e.x+e.w/2,e.y-6,b[3]+' ZOOMS!',1)}}})});
   // brass telescope: swing + lens reveal of a comet
   M.ent(R,{name:'BRASS TELESCOPE',x:150,y:FL-46,w:44,h:46,box:1,z:FL,ang:-.6,lk:-9,
    draw(g,X,Y,t,e,sel){const a=e.ang+(M.now-e.lk<3?0:Math.sin(t*.3)*.05);g.fillStyle=BR[1];g.fillRect(X+12,Y+30,3,16);g.fillRect(X+26,Y+30,3,16);g.fillRect(X+18,Y+26,6,20);
     const cx=X+21,cy=Y+26;for(let s=-12;s<26;s++){const w=s<0?2:s<16?3:4,x=cx+Math.cos(a)*s,y=cy+Math.sin(a)*s;for(let k=-w;k<=w;k++)px(g,x-Math.sin(a)*k,y+Math.cos(a)*k,k===-w?BR[4]:k<0?BR[3]:BR[2])}
     const lx=cx+Math.cos(a)*26,ly=cy+Math.sin(a)*26;glowAt(g,lx,ly,6,'#8ab0ff',.5);if(sel)sel1(g,X,Y,44)},
    upd(e,dt){if(M.now-e.lk<3)e.ang=lerp(e.ang,e.tg,dt*4)},
    click(e,R){e.lk=M.now;e.tg=-.3-Math.random()*.9;M.snd('servo',.8);setTimeout(()=>{M.snd('chime',1.4);const sx=e.x+20+Math.cos(e.tg)*140,sy=Math.max(14,e.y+26+Math.sin(e.tg)*140);
     M.fx(R,1.8,(g,ox,oy,k)=>{const r=Math.round(22*Math.min(1,k*5)*(k>.85?(1-k)/.15:1));for(let i=0;i<64;i++){const an=i/64*TAU;px(g,sx+ox+Math.cos(an)*r,sy+oy+Math.sin(an)*r,i%2?BR[3]:BR[4])}
      for(let j=0;j<10;j++){const cx=sx-20+k*40-j*1.5,cy=sy-6+k*12-j*.5;if(Math.hypot(cx-sx,cy-sy)<r)px(g,cx+ox,cy+oy,j<2?'#ffffff':j<5?'#bcecff':'#6ab0ff')}});M.say(R,sx,sy-28,K.pick(['A COMET!','A NEW STAR!','LANDRY WAS HERE']),1.2)},500)}});
   // constellation L
   const ST=[[700,26],[702,44],[705,62],[708,80],[726,82],[744,80],[760,74]];
   M.ent(R,{name:'CONSTELLATION OF L',x:690,y:18,w:80,h:72,box:1,z:-30,noNav:1,cn:-9,
    draw(g,X,Y,t,e,sel){const ox=X-690,oy=Y-18,a=M.now-e.cn,n=a<6?Math.min(ST.length,Math.floor(a*4)):0;
     for(let i=1;i<n;i++)M.line(g,ST[i-1][0]+ox,ST[i-1][1]+oy,ST[i][0]+ox,ST[i][1]+oy,'#bcd8ff');
     ST.forEach(([x,y],i)=>{const tw=(Math.sin(t*3+i)+1)/2;const lit=i<n;glowAt(g,x+ox,y+oy,lit?8:4,lit?'#ffe08a':'#8ab0ff',.4+tw*.3);px(g,x+ox,y+oy,'#ffffff');if(lit||tw>.7){px(g,x+ox-1,y+oy,'#bcd8ff');px(g,x+ox+1,y+oy,'#bcd8ff');px(g,x+ox,y+oy-1,'#bcd8ff');px(g,x+ox,y+oy+1,'#bcd8ff')}})},
    click(e,R){e.cn=M.now;M.snd('chime',1);for(let i=0;i<7;i++)setTimeout(()=>M.snd('ding',1+i*.12),i*250);setTimeout(()=>M.say(R,730,30,'THE GREAT L OF THE SKY',1.4),1800)}});
   // astrolabe
   M.ent(R,{name:'GOLDEN ASTROLABE',x:780,y:FL-44,w:40,h:44,box:1,z:FL,sp:0,
    draw(g,X,Y,t,e,sel){g.fillStyle=PAL.basalt[3];g.fillRect(X+14,Y+36,12,8);g.fillStyle=BR[3];g.fillRect(X+14,Y+36,12,1);const cx=X+20,cy=Y+18;
     for(let r=0;r<3;r++){const rr=16-r*4,an=e.sp*(r%2?-1.3:1)*(1+r*.4)+r;for(let i=0;i<48;i++){const q=i/48*TAU;const x=Math.cos(q)*rr,y=Math.sin(q)*rr;const xx=x*Math.cos(an),yy=y,zz=x*Math.sin(an);px(g,cx+xx,cy+yy*(r===1?.5:1)+(r===2?zz*.3:0),zz>0?BR[4]:BR[2])}}
     glowAt(g,cx,cy,8,'#ffe08a',.5);px(g,cx-1,cy-1,'#ffffff',2,2);if(sel)sel1(g,X,Y,40)},
    upd(e,dt){e.sp+=dt*(e.v||.4)*(RM?0:1);e.v=Math.max(.4,(e.v||.4)-dt*3)},
    click(e,R){e.v=12;M.snd('spell',1.2);M.emit(R,'rune',e.x+20,e.y+18,12,{c:['#ffe08a','#bcd8ff']})}});
   K.brazier(R,330,FL-2,['#fff4c0','#ffd040','#ff9020','#a03a10'],{pole:22,name:'STAR BRAZIER'});K.brazier(R,630,FL-2,['#ffffff','#bcd8ff','#6a8aff','#2a2a8a'],{pole:22,name:'STAR BRAZIER'});
   K.portalSign(R,900,FL,'VISIT LANDRCYVERSE','https://landrcy.github.io/',['#ffe08a','#fff4c0'],'OPEN THE REAL LANDRCYVERSE');
   K.motes(R,26,0,W,20,FL,['#ffe08a','#bcd8ff','#ffffff'])}
 })}

/* ======================= THE VOID ABYSS ======================= */
{const W=900,FL=170,VX=450,VY=72,VP=['#05020a','#120626','#2a0e4a','#5a1a8a','#a040e0','#e0a0ff'];
 K.ext('void',{top:'#020104',bot:'#020104',start:450,
  bg(p,R){for(let y=0;y<M.RH;y++)for(let x=0;x<W;x++){const d=Math.hypot((x-VX)/2,y-VY);let v=.05+Math.max(0,.35-d/300)+(fbm(x/30,y/20)-.5)*.15;const sw=Math.sin(Math.atan2(y-VY,(x-VX)/2)*3+d*.05);if(sw>.85&&d<220)v+=.1;p.px(x,y,rp(VP,v,x,y))}
   for(let i=0;i<300;i++){const x=H(i,4)*W,y=H(i,5)*FL;p.px(x,y,H(i,6)>.8?'#e0a0ff':'#5a3a8a')}
   // broken obsidian floor slabs drifting into the dark
   for(let x=0;x<W;x+=26){const off=Math.round((H(x,1)-.5)*6),h=8+H(x,2)*16;p.poly([[x+1,FL+off],[x+25,FL+off+1],[x+22,FL+off+h],[x+4,FL+off+h+3]],VP,{v:.3,bv:.35});p.rect(x+2,FL+off,22,1,VP[4])}},
  back(R,g,ox,oy,t){const tt=RM?0:t;for(let i=0;i<18;i++){const a=tt*(.3+H(i,1)*.4)+i,r=70+H(i,2)*60;const x=VX+Math.cos(a)*r+ox,y=VY+Math.sin(a)*r*.35+oy;g.fillStyle=i%3?'#2a0e4a':'#5a1a8a';g.fillRect(Math.round(x),Math.round(y),2+(i%2),2)}},
  init(R){
   const v=K.planet(R,{paint:'void',w:120,x:VX,y:VY,name:'THE SINGULARITY',z:-10,dt:.08,
    e:{click(e,R){M.snd('rumble',.6);M.snd('boom',.5);M.shake(R,1,2);M.flash(R,'#a040e0',.1);R.pull=M.now;M.say(R,VX,VY-48,'IT HUNGERS.',1.2);
     for(let i=0;i<40;i++){const a=Math.random()*TAU,r=80+Math.random()*80;M.emit(R,'voidp',VX+Math.cos(a)*r,VY+Math.sin(a)*r*.6,1,{dir:a+Math.PI,spread:.1})}}}});
   // floating monoliths that spaghettify into the void
   [[140,60],[280,96],[610,96],[760,50]].forEach(([mx,my],i)=>M.ent(R,{name:'DRIFTING MONOLITH',x:mx,y:my,w:12,h:30,box:1,z:-5,noNav:1,sg:-9,bx:mx,by:my,
    draw(g,X,Y,t,e,sel){const a=M.now-e.sg;const k=a<3?Math.min(1,a/1.6):0;if(k>=1&&a<3)return;const tx=VX+(X-e.x),ty=VY+(Y-e.y);
     for(let y=0;y<30;y++){const u=y/30,sx=lerp(X,tx,k*k*(1-u*.5)),sy=lerp(Y+y*(1+k*3),ty,k*k);const w=Math.max(1,Math.round(12*(1-k*.9)));for(let x=0;x<w;x++)px(g,sx+x+(k?Math.sin(y+t*20)*k*3:0),sy,x===0?VP[4]:x<3?VP[3]:VP[2])}
     if(!k){g.drawImage(K.gly(i*3+1,VP[5]),X+4,Y+8);g.drawImage(K.gly(i*3+2,VP[4]),X+4,Y+17);if(sel)sel1(g,X,Y,12)}},
    upd(e,dt,t){const tt=RM?0:t;e.y=Math.round(e.by+Math.sin(tt*.7+i*2)*5)},
    click(e,R){if(M.now-e.sg<3)return;e.sg=M.now;M.snd('whoosh',.5);M.snd('glitch',.5);M.say(R,e.x+6,e.y-6,'SPAGHETTIFIED!',1);setTimeout(()=>{M.snd('pop',.7);M.emit(R,'voidp',e.bx+6,e.by+15,14)},3000)}}));
   // void walker: blinks around leaving afterimages
   const VW=M.frames(2,14,30,(p,f)=>{p.ell(7,6,5,6,['#000000','#0a0412','#1a0a2a'],{});p.poly([[2,10],[12,10],[13,28+f],[1,28-f]],['#000000','#0a0412','#1a0a2a'],{v:.4});for(let y=12;y<28;y+=4)p.px(3+((y*7)%8),y,'#2a0e4a')},'#000000');
   M.ent(R,{name:'VOID WALKER',x:520,y:FL-31,w:14,h:30,box:1,z:FL,tp:[],bl:-9,
    draw(g,X,Y,t,e,sel){for(const q of e.tp){const a=(M.now-q.t)/1;if(a>1)continue;g.globalAlpha=1-a;g.drawImage(VW[0].c,q.x+X-e.x,Y);g.globalAlpha=1}
     glowAt(g,X+7,Y+20,14,'#5a1a8a',.3);g.drawImage(VW[((t*3)|0)%2].c,X,Y);const bl=((t*.7)%3)<.1;if(!bl){px(g,X+4,Y+5,'#ff40ff',2,1);px(g,X+8,Y+5,'#ff40ff',2,1)}if(sel)sel1(g,X,Y,14)},
    upd(e,dt,t){if(!RM&&M.now-e.bl>1.2){e.x+=Math.sin(t*.5)*dt*8}},
    click(e,R){e.bl=M.now;const n=[];for(let i=1;i<=4;i++)n.push({x:e.x+(i-2)*0,t:M.now});e.tp.push({x:e.x,t:M.now});const nx=clamp(e.x+(Math.random()<.5?-1:1)*(80+Math.random()*120),40,W-60);M.emit(R,'voidp',e.x+7,e.y+15,12);e.x=Math.round(nx);M.emit(R,'voidp',e.x+7,e.y+15,12);M.snd('glitch',1.4);M.say(R,e.x+7,e.y-6,K.pick(['...','I AM THE SPACE BETWEEN','BOO?']),1);e.tp=e.tp.slice(-4)}});
   // glitch logo
   M.ent(R,{name:'GLITCHED LOGO',x:640,y:FL-34,w:70,h:20,box:1,z:FL,sh:-9,
    draw(g,X,Y,t,e,sel){const a=M.now-e.sh,on=a<2;g.drawImage(M.txt('THE VOID','#e0a0ff','#120626').c,X+14,Y+5);const gl=((t*4)|0)%13===0||on;if(gl){for(let i=0;i<4;i++){const yy=Y+4+((H(i,(t*20)|0)*14)|0);px(g,X+(H(i,(t*30)|0)*60),yy,i%2?'#00ffff':'#ff00aa',10,2)}}
     if(on){for(let i=0;i<60;i++){const k=a<1?a:2-a;const x=X+6+(i%30)*2+(H(i,1)-.5)*80*k,y=Y+6+((i/30)|0)*4+(H(i,2)-.5)*50*k;px(g,x,y,i%3?'#e0a0ff':'#ffffff')}}
     g.fillStyle=VP[2];g.fillRect(X,Y+18,70,2);if(sel)sel1(g,X,Y,70)},
    click(e,R){e.sh=M.now;M.snd('glitch',.8);M.snd('crack',1.2);setTimeout(()=>M.snd('glitch',1.6),900)}});
   // gravity orb
   M.ent(R,{name:'GRAVITY ORB',x:370,y:FL-36,w:20,h:36,box:1,z:FL,inv:-9,
    draw(g,X,Y,t,e,sel){g.fillStyle=VP[2];g.fillRect(X+5,Y+24,10,12);g.fillStyle=VP[4];g.fillRect(X+5,Y+24,10,1);const on=M.now-e.inv<3,oy=on?-Math.round(Math.sin(Math.min(1,(M.now-e.inv)*2)*Math.PI/2)*14):0;
     glowAt(g,X+10,Y+14+oy,on?18:10,'#a040e0',.5);g.drawImage(disc('#7a2ac0'),X+5,Y+9+oy);for(let i=0;i<6;i++){const an=t*2+i;px(g,X+10+Math.cos(an)*9,Y+14+oy+Math.sin(an)*3,VP[5])}if(sel)sel1(g,X,Y,20)},
    click(e,R){e.inv=M.now;M.snd('hum',.7);M.say(R,e.x+10,e.y-14,'GRAVITY: OPTIONAL',1);for(const q of R.P)q.vy=(q.vy||0)-1.5;M.emit(R,'voidp',e.x+10,e.y,16,{dir:-Math.PI/2,spread:1})}});
   const DC={};function disc(c){return DC[c]||(DC[c]=M.mk(10,10,p=>p.ell(5,5,4.5,4.5,ramp(c),{b:.2,spec:'#ffffff'}),'#05020a').c)}
   K.portalSign(R,820,FL,'ENTER THE VOID','https://landrcy.github.io/the-void/',['#a040e0','#e0a0ff'],'OPEN THE VOID');
   K.motes(R,30,0,W,10,FL,['#a040e0','#e0a0ff','#5a1a8a'])}
 })}

/* ======================= SEA OF THOUGHT ======================= */
{const W=960,FL=170,SE=['#04121e','#08243a','#0e3a56','#1a5a78','#3a8aa0','#8ad0e0'],SD=['#2a2018','#5a4a30','#8a7448','#b8a070','#e0d0a0'];
 const THOUGHTS=['WHAT IF FISH THINK TOO?','THE OCEAN IS JUST A BIG THOUGHT','I FORGOT WHAT I WAS THINKING','DREAMS ARE WET IDEAS','BE THE BUBBLE'];
 K.ext('sea',{top:'#04121e',bot:'#04121e',start:480,
  bg(p,R){for(let y=0;y<M.RH;y++)for(let x=0;x<W;x++)p.px(x,y,rp(SE,.75-y/M.RH*.7+(fbm(x/40,y/25)-.5)*.2,x,y));
   // sunken temple: drowned pillars & arches
   for(const cx of[90,300,660,870])K.pillar(p,cx,50+H(cx,1)*20,FL,14,PAL.jade,{cap:7,base:7,broken:H(cx,2)>.5,vines:2,sd:cx});K.arch(p,480,FL-70,180,50,10,PAL.jade,{n:13});
   for(let x=0;x<W;x++){const h=Math.round(4+vn(x/30,2)*10);for(let y=FL-h;y<M.RH;y++)p.px(x,y,rp(SD,.3+(y-FL+h)/40*.4+(fbm(x/5,y/4)-.5)*.2,x,y))}
   for(let i=0;i<40;i++){const x=H(i,8)*W,y=FL+4+H(i,9)*30;p.px(x,y,'#e0d0a0');p.px(x+1,y,'#f0a0a0')}},
  init(R){
   // centrepiece: thought planet in a bubble
   K.planet(R,{paint:'sea',w:56,x:480,y:70,name:'THE THINKING SEA',z:-10,
    e:{bb:-9,pre(g,X,Y,t,e){glowAt(g,X+28,Y+28,40,'#4ad0ff',.18);for(let i=0;i<80;i++){const a=i/80*TAU;px(g,X+28+Math.cos(a)*36,Y+28+Math.sin(a)*36,i%5?'#3a8aa0':'#c0f0ff')}px(g,X+8,Y+2,'#ffffff',3,1)},
     click(e,R){M.snd('bubble',.8);const s=K.pick(THOUGHTS);M.say(R,480,22,s,2);for(let i=0;i<20;i++)M.emit(R,'bubble',480+(Math.random()-.5)*60,90,1)}}});
   // bottle of thoughts
   M.ent(R,{name:'BOTTLE OF THOUGHTS',x:190,y:FL-22,w:28,h:16,box:1,z:FL,op:-9,
    draw(g,X,Y,t,e,sel){const a=M.now-e.op,on=a<4;const rock=on?0:Math.round(Math.sin(t*1.5));g.fillStyle='#1a5a4a';g.fillRect(X+2,Y+6+rock,18,9);g.fillStyle='#3a9a7a';g.fillRect(X+3,Y+7+rock,16,2);g.fillStyle='#1a5a4a';g.fillRect(X+20,Y+8+rock,6,4);
     g.fillStyle='#e0d0a0';g.fillRect(X+6,Y+9+rock,10,4);if(!on){g.fillStyle='#8a5a30';g.fillRect(X+26,Y+8+rock,2,4)}
     if(on){const k=Math.min(1,(a-.3)/.5);if(k>0){const w=Math.round(60*k);g.fillStyle='#e0d0a0';g.fillRect(X+14-w/2,Y-30,w,20);g.fillStyle='#b8a070';g.fillRect(X+14-w/2,Y-30,w,1);g.fillRect(X+14-w/2,Y-11,w,1);if(k>=1){g.drawImage(M.txt('DEAR SEA,','#3a2a1a',false).c,X-12,Y-27);g.drawImage(M.txt(e.msg||'','#3a2a1a',false).c,X-12,Y-19)}}}
     if(sel)sel1(g,X,Y,28)},
    click(e,R){if(M.now-e.op<4)return;e.op=M.now;e.msg=K.pick(['THINK BIG','STAY WET','HI LANDRY','KEEP GOING']);M.snd('pop',1.2);M.emit(R,'bubble',e.x+27,e.y+10,10)}});
   // stone thinker head
   const HD=M.mk(40,40,p=>{p.ell(20,18,16,17,PAL.jade,{b:.15});p.rect(10,30,20,10,PAL.jade,{v:.4});p.rect(12,16,6,2,PAL.jade[0]);p.rect(23,16,6,2,PAL.jade[0]);p.rect(18,19,4,7,PAL.jade,{v:.65});p.rect(15,29,10,1,PAL.jade[0]);K.vine(p,30,6,20,3)},'#020a08');
   M.ent(R,{name:'STONE THINKER',x:320,y:FL-42,w:40,h:40,box:1,z:FL,th:-9,
    draw(g,X,Y,t,e,sel){if(sel)g.drawImage(M.ring(HD),X-1,Y-1);g.drawImage(HD.c,X,Y);const a=M.now-e.th;if(a<3.5){px(g,X+13,Y+16,'#c0fff0',4,2);px(g,X+24,Y+16,'#c0fff0',4,2);glowAt(g,X+20,Y+17,12,'#4ad0ff',.4);
      const k=Math.min(1,a*2);for(let i=0;i<3;i++)px(g,X+34+i*4,Y-2-i*5,'#c0f0ff',1+i,1+i);if(k>=1){const bx=X+44,by=Y-50;g.fillStyle='#c0f0ff';g.fillRect(bx,by,40,26);g.fillStyle='#04121e';g.fillRect(bx+1,by+1,38,24);for(let f=0;f<3;f++){const fx=bx+4+((a*20+f*12)%32),fy=by+6+f*6;px(g,fx,fy,'#ffa040',4,2);px(g,fx-2,fy,'#ffa040',1,2)}}}if(sel)0},
    click(e,R){if(M.now-e.th<3.5)return;e.th=M.now;M.snd('hum',1.2);M.snd('bubble',.6);M.say(R,e.x+20,e.y-6,'HMMMMM... FISH.',1.2)}});
   // turtle that swims; click: spin in shell
   const TU=M.frames(2,26,14,(p,f)=>{p.ell(12,7,9,6,['#1a3a1a','#3a6a2a','#6a9a3a','#a0c05a'],{b:.1});for(let i=0;i<3;i++)p.px(8+i*4,5,'#1a3a1a');p.ell(23,7,3,3,['#3a6a4a','#6aa07a']);p.px(24,6,'#000000');p.rect(4,f?11:12,4,2,'#6aa07a');p.rect(16,f?12:11,4,2,'#6aa07a')},'#04121e');
   M.ent(R,{name:'ANCIENT SEA TURTLE',x:600,y:110,w:26,h:14,box:1,z:-2,noNav:1,sp:-9,vx:12,
    draw(g,X,Y,t,e,sel){const a=M.now-e.sp;const s=TU[((t*2)|0)%2];if(a<2){g.save();g.translate(X+12,Y+7);g.rotate(a*12);g.drawImage(s.c,0,0,20,14,-10,-7,20,14);g.restore();return}if(sel)g.drawImage(M.ring(s),X-1,Y-1);g.drawImage(e.vx<0?M.flipC(s):s.c,X,Y)},
    upd(e,dt,t){if(RM||M.now-e.sp<2)return;e.x+=e.vx*dt;e.y=Math.round(100+Math.sin(t*.5)*14);if(e.x>W-60||e.x<40)e.vx*=-1},
    click(e,R){e.sp=M.now;M.snd('boing',.8);M.emit(R,'bubble',e.x+12,e.y,10);M.say(R,e.x+12,e.y-6,'WHEEEE!',.8)}});
   // fish school (boids-lite)
   const fish=[];for(let i=0;i<14;i++)fish.push({x:700+H(i,1)*80,y:60+H(i,2)*40,vx:10+H(i,3)*5,vy:0,c:i%3?'#ffa040':'#ffd060'});
   M.ent(R,{name:'SCHOOL OF THOUGHTFISH',x:700,y:60,w:60,h:40,box:1,z:-3,noNav:1,sc:-9,
    draw(g,X,Y,t,e,sel){const ox=X-e.x,oy=Y-e.y;for(const f of fish){const d=f.vx<0?-1:1;px(g,f.x+ox,f.y+oy,f.c,3,2);px(g,f.x+ox-d*2+(d<0?3:0),f.y+oy,'#c05a20',1,2);px(g,f.x+ox+(d>0?2:0),f.y+oy,'#000000')}if(sel)sel1(g,X,Y,60)},
    upd(e,dt,t){if(RM)return;let cx=0,cy=0;for(const f of fish){cx+=f.x;cy+=f.y}cx/=fish.length;cy/=fish.length;const tx=600+Math.sin(t*.2)*280,ty=70+Math.sin(t*.37)*25;const sc=M.now-e.sc<1.5;
     for(const f of fish){if(sc){f.vx+=(f.x-cx)*dt*3;f.vy+=(f.y-cy)*dt*3}else{f.vx+=((tx-f.x)*.04+(cx-f.x)*.1)*dt*4;f.vy+=((ty-f.y)*.04+(cy-f.y)*.1)*dt*4}const sp=Math.hypot(f.vx,f.vy),m=sc?60:22;if(sp>m){f.vx*=m/sp;f.vy*=m/sp}f.x+=f.vx*dt;f.y+=f.vy*dt}
     e.x=Math.round(cx-30);e.y=Math.round(cy-20)},
    click(e,R){e.sc=M.now;M.snd('swish',1.4);M.emit(R,'bubble',e.x+30,e.y+20,8)}});
   // jellyfish: pulse & light up
   [[150,70],[420,120],[840,90]].forEach(([jx,jy],i)=>M.ent(R,{name:'LANTERN JELLYFISH',x:jx,y:jy,w:14,h:22,box:1,z:-2,noNav:1,lt:-9,by:jy,
    draw(g,X,Y,t,e,sel){const lit=M.now-e.lt<2.5,c=lit?['#ff80ff','#ffd0ff']:['#8a5ac0','#c0a0ff'];const pu=Math.sin(t*3+i)*1.5;glowAt(g,X+7,Y+5,lit?18:8,c[0],lit?.5:.25);
     for(let y=0;y<7;y++){const w=Math.round(6+pu*.3-Math.max(0,3-y)*1.4);px(g,X+7-w,Y+y,y<2?c[1]:c[0],w*2,1)}for(let k=0;k<4;k++)for(let y=0;y<12;y++)if(bay(k,y+((t*8)|0))<.7)px(g,X+2+k*3+Math.sin(t*2+y*.5+k)*1.2,Y+7+y,c[k%2]);if(sel)sel1(g,X,Y,14)},
    upd(e,dt,t){const tt=RM?0:t;e.y=Math.round(e.by+Math.sin(tt*.6+i*2)*10-(M.now-e.lt<1?(1-(M.now-e.lt))*0:0))},
    click(e,R){e.lt=M.now;M.snd('zap',1.8);M.snd('chime',1.6);M.emit(R,'zap',e.x+7,e.y+12,8,{c:['#ff80ff','#ffffff']})}}));
   // kelp (swaying, click: wiggle dance)
   M.ent(R,{name:'DANCING KELP',x:540,y:FL-60,w:40,h:60,box:1,z:FL-2,dn:-9,
    draw(g,X,Y,t,e,sel){const dn=M.now-e.dn<2.5?4:1;for(let k=0;k<5;k++){const h=40+H(k,5)*20;for(let y=0;y<h;y++){const u=y/h,x=X+4+k*8+Math.sin(t*1.5*dn+u*4+k)*u*4*dn;px(g,x,Y+60-y,u>.9?'#8ad04a':'#3a8a2a',2,1);if(y%7===3)px(g,x+2,Y+60-y,'#6ab03a',2,1)}}if(sel)sel1(g,X,Y,40)},
    click(e,R){e.dn=M.now;M.snd('note',1);M.say(R,e.x+20,e.y-6,'KELP DISCO',1);for(let i=0;i<5;i++)M.emit(R,'note',e.x+5+i*8,e.y,1)}});
   K.portalSign(R,900,FL+6,'DIVE INTO SEA OF THOUGHT','https://landrcy.github.io/sea-of-thought/',['#4ad0ff','#c0f0ff'],'OPEN SEA OF THOUGHT');
   K.motes(R,20,0,W,10,FL,['#c0f0ff','#4ad0ff'])},
  back(R,g,ox,oy,t){const tt=RM?0:t;// god rays
   for(let r=0;r<5;r++){const x0=120+r*190+Math.sin(tt*.2+r)*20;for(let y=0;y<140;y+=2)for(let k=0;k<10;k++)if(bay(k+y,y)<.12*(1-y/140)){g.fillStyle='#8ad0e0';g.fillRect(Math.round(x0+y*.3+k+ox),y+oy,1,1)}}}
 })}

/* ======================= THE BINDING OF ASHAAD ======================= */
{const W=900,FL=170,CX=450,DS=['#0a0606','#1a100c','#2e1e18','#4a3428','#6a5040'],FI=['#fff4b0','#ffb040','#ff6020','#a02010'];
 K.ext('ashaad',{top:'#0a0606',bot:'#0a0606',start:450,
  bg(p,R){K.wall(p,0,0,W,FL,DS,{v:.3,bh:10,bw:18,sd:41});
   for(const cx of[110,330,570,790])K.pillar(p,cx,10,FL,16,DS,{cap:8,base:8,rune:'#8a2a1a',sd:cx});
   for(const bx of[220,680]){for(let y=24;y<92;y++){const w=y>84?(y%2?10:12):12;for(let x=-w;x<w;x++)p.px(bx+x,y,rp(['#2a0408','#5a0a12','#8a1a1a','#b02a20'],.45-Math.abs(x)/30+(fbm(x/3,y/6)-.5)*.3,x,y))}for(let k=0;k<4;k++)K.glyph(p,bx-2,34+k*12,bx+k,'#e0a838');p.rect(bx-14,22,28,2,PAL.iron,{v:.6})}
   for(let x=0;x<W;x+=7)K.glyph(p,x,4,x+9,x%14?'#3a0a06':'#6a1a0a');
   K.floor(p,FL,M.RH,DS,{v:.25});
   // blood-red binding circle inlay on the floor
   for(let y=FL;y<M.RH;y++)for(let x=CX-90;x<CX+90;x++){const d=Math.hypot((x-CX)/2.4,(y-FL-14)*1.4);if(Math.abs(d-34)<.6||Math.abs(d-28)<.6)p.px(x,y,'#6a1a0a')}
   for(let i=0;i<5;i++){const a=i/5*TAU-Math.PI/2,b=(i+2)/5*TAU-Math.PI/2;p.line(CX+Math.cos(a)*28*2.4,FL+14+Math.sin(a)*28/1.4,CX+Math.cos(b)*28*2.4,FL+14+Math.sin(b)*28/1.4,'#4a120a')}},
  init(R){
   const ash=K.planet(R,{paint:'ashaad',w:84,h:76,x:CX,y:76,name:'THE BOUND ONE (ASHAAD)',z:-10,arg:e=>({open:e?e.op:0}),
    e:{op:0,bn:-9,upd(e,dt){const on=M.now-e.bn<3.5;e.op=clamp(e.op+(on?1:-1)*dt*1.5,0,1)},
     pre(g,X,Y,t,e){const on=M.now-e.bn<3.5;const cx=X+42,cy=Y+38;// chains to the corners
      for(const[ax,ay]of[[-120,-60],[120,-60],[-120,80],[120,80]]){const n=24;for(let i=0;i<n;i++){const u=i/n,jg=on?Math.sin(t*30+i)*2:Math.sin(t+i*.3)*.5;const x=cx+ax*u+jg,y=cy+ay*u+Math.sin(u*Math.PI)*8;px(g,x-1,y-1,i%2?'#4a4048':'#7a7078',i%2?2:3,2)}}
      if(on){glowAt(g,cx,cy,44,'#ff3a1a',.35)}},
     click(e,R){e.bn=M.now;M.snd('clang',.6);M.snd('roar',.5);M.shake(R,1,1.5);M.say(R,CX,64,'THE BINDING HOLDS... FOR NOW',1.6);M.emit(R,'ember',CX,100,30,{c:FI});
      for(let k=0;k<5;k++)setTimeout(()=>M.snd('clang',.8+k*.1),300+k*200)}}});
   // soul candles
   for(let i=0;i<5;i++){const a=i/5*TAU-Math.PI/2,x=CX+Math.cos(a)*68,yb=FL+14+Math.sin(a)*22;M.ent(R,{name:'SOUL CANDLE',x:Math.round(x-3),y:Math.round(yb-12),w:6,h:12,box:1,z:Math.round(yb),gh:-9,
    draw(g,X,Y,t,e,sel){const s=M.now-e.gh<5;g.fillStyle='#d8d0b8';g.fillRect(X+1,Y+4,4,8);g.fillStyle='#a09880';g.fillRect(X+4,Y+4,1,8);K.flame(g,X+3,Y+3,1.6,6,RM?0:t+i,s?['#e0ffe0','#7aff7a','#2ac02a','#0a5a1a']:FI,i);glowAt(g,X+3,Y,8,s?'#7aff7a':'#ff9020',.4);if(sel)sel1(g,X,Y,6)},
    click(e,R){e.gh=M.now;M.snd('boo',1+i*.1);M.emit(R,'ghost',e.x+3,e.y-4,2);M.emit(R,'wisp',e.x+3,e.y,6,{c:['#7aff7a','#e0ffe0']})}})}
   // shackled tome that tries to escape
   M.ent(R,{name:'SHACKLED TOME',x:200,y:FL-34,w:22,h:30,box:1,z:FL,es:-9,
    draw(g,X,Y,t,e,sel){const a=M.now-e.es,on=a<2.2,dy=on?-Math.abs(Math.sin(a*8))*10:0,dx=on?Math.sin(a*25)*2:0;g.fillStyle=DS[3];g.fillRect(X+2,Y+24,18,6);
     M.line(g,X+4,Y+26,X+6+dx,Y+16+dy,'#7a7078');M.line(g,X+18,Y+26,X+16+dx,Y+16+dy,'#7a7078');const bx=X+3+dx,by=Y+6+dy;g.fillStyle='#4a0a1a';g.fillRect(bx,by,16,14);g.fillStyle='#8a1a2a';g.fillRect(bx+1,by+1,14,2);g.fillStyle='#e0c060';g.fillRect(bx+15,by,1,14);
     px(g,bx+6,by+5,on?'#ff3a1a':'#a02010',4,3);px(g,bx+7,by+6,'#000000',2,1);if(on)glowAt(g,bx+8,by+7,10,'#ff3a1a',.5);if(sel)sel1(g,X,Y,22)},
    click(e,R){e.es=M.now;M.snd('clack',.8);M.snd('roar',1.6);M.say(R,e.x+11,e.y-8,K.pick(['LET ME OUT!','READ ME... READ MEEE','*RATTLE RATTLE*']),1.2)}});
   // gargoyle
   const GA=M.frames(2,26,20,(p,f)=>{p.ell(13,12,7,7,DS,{b:.15});p.ell(13,5,5,4,DS,{b:.2});p.poly(f?[[6,8],[0,0],[3,10]]:[[6,10],[1,14],[5,14]],DS,{v:.6});p.poly(f?[[20,8],[26,0],[23,10]]:[[20,10],[25,14],[21,14]],DS,{v:.4});p.px(10,4,'#000');p.px(15,4,'#000');p.poly([[9,1],[8,-2],[10,0]],DS,{v:.7});p.poly([[17,1],[18,-2],[16,0]],DS,{v:.7})},'#050303');
   M.ent(R,{name:'TEMPLE GARGOYLE',x:690,y:40,w:26,h:20,box:1,z:-3,noNav:1,wk:-9,
    draw(g,X,Y,t,e,sel){g.fillStyle=DS[3];g.fillRect(X-4,Y+19,34,4);const a=M.now-e.wk,on=a<3;const f=on?((t*8)|0)%2:0,dy=on?-Math.round(Math.sin(Math.min(1,a)*Math.PI)*12):0;if(sel)g.drawImage(M.ring(GA[f]),X-1,Y-1+dy);g.drawImage(GA[f].c,X,Y+dy);
     if(on||((t*.3)%5)<.15){px(g,X+10,Y+4+dy,'#ff3a1a');px(g,X+15,Y+4+dy,'#ff3a1a');glowAt(g,X+13,Y+4+dy,6,'#ff3a1a',.5)}},
    click(e,R){e.wk=M.now;M.snd('crack',.8);M.snd('roar',1.2);M.emit(R,'dust',e.x+13,e.y+18,10);M.say(R,e.x+13,e.y-8,K.pick(['WHO DARES?','I WAS NAPPING.','SKREEEE!']),1.2)}});
   // trapdoor
   M.ent(R,{name:'CREAKING TRAPDOOR',x:600,y:FL+22,w:34,h:10,box:1,z:FL+30,op:-9,
    draw(g,X,Y,t,e,sel){const a=M.now-e.op,on=a<3;g.fillStyle='#000000';g.fillRect(X,Y,34,10);if(on){const k=Math.min(1,a*3)*(a>2.5?(3-a)*2:1);const bl=((a*3)|0)%4===3;if(!bl&&k>.6){px(g,X+10,Y+4,'#ffe040',2,1);px(g,X+20,Y+4,'#ffe040',2,1)}
      if(a>1&&a<2.4){const hy=Math.round(Math.sin((a-1)/1.4*Math.PI)*10);g.fillStyle='#4a6a3a';g.fillRect(X+24,Y-hy,4,hy+2);for(let k2=0;k2<3;k2++)px(g,X+23+k2*2,Y-hy-2,'#4a6a3a',1,2)}
      g.fillStyle=PAL.wood[2];g.fillRect(X,Y-Math.round(k*14),34,3)}else{for(let y=0;y<10;y++)px(g,X,Y+y,y%3?PAL.wood[2]:PAL.wood[1],34,1);px(g,X+15,Y+4,'#7a7078',4,2)}if(sel)sel1(g,X,Y,34)},
    click(e,R){if(M.now-e.op<3)return;e.op=M.now;M.snd('creak',.8);setTimeout(()=>{M.snd('boo',.8);M.say(R,e.x+17,e.y-20,'*SOMETHING WAVES HELLO*',1.2)},1000)}});
   K.brazier(R,250,FL-50,FI,{name:'HELLFIRE SCONCE'});K.brazier(R,650,FL-50,FI,{name:'HELLFIRE SCONCE'});
   K.portalSign(R,820,FL,'PLAY THE BINDING OF ASHAAD','https://landrcy.github.io/binding-of-ashaad/',['#ff6a2a','#ffd0a0'],'PLAY THE BINDING OF ASHAAD');
   K.motes(R,24,0,W,20,FL,['#ff6a2a','#ffb040','#a02010'])}
 })}
})();
