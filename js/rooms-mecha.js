/* MECHA FORGE: a molten foundry-hangar inside the temple. Vehicles unfold into mechs part by part,
   a junk pile assembles into a titan, power-armor plates fly off their racks and lock on, and a drone swarm becomes a giant. */
(()=>{'use strict';const{rp,ramp,mix,bay,H,vn,fbm,RM,RH,TAU,clamp,lerp}=M;const K=M.K,PAL=K.PAL;
const W=1100,FL=168;
const RED=['#2a0808','#6a1410','#b02a1a','#e8502a','#ffa070'],DARK=['#0c0c14','#1a1c26','#2c303c','#454a58','#6a7080'],STL=PAL.steel,
 GLS=['#0a2a4a','#1a5a8a','#3aa0d0','#8ae0ff','#e0fcff'],YEL=['#3a2a04','#7a5a08','#d0a010','#ffd23a','#fff0a0'],
 WHT=['#2a3040','#5a6478','#9aa4b8','#d0d8e4','#ffffff'],ORG=['#3a1404','#8a3a08','#e07010','#ffa030','#ffe0a0'],TEA=['#04262a','#0a4a52','#14808a','#3ac8c8','#a8fff4'],
 RST=PAL.rust,BLU=['#06102e','#0e2a6a','#1a4ab0','#3a84e8','#a8d4ff'],BRZ=['#1a0e06','#3a220e','#6a4218','#a06a28','#d8a050'];
const BRD=['#0a0604','#160e08','#22160c','#342212','#4e341a'];
const tx=(a=.16,s=3)=>(x,y)=>(fbm(x/s,y/s)-.5)*a;
const pl=(p,x,y,w,h,pal,o={})=>{const op={v:o.v??.55,bv:o.bv??.3,g:o.g??.2,tex:o.tex||tx()};if(o.r)p.rrect(x,y,w,h,o.r,pal,op);else p.rect(x,y,w,h,pal,op);if(o.riv){p.px(x+1,y+1,pal[4]);p.px(x+w-2,y+1,pal[3]);p.px(x+1,y+h-2,pal[2]);p.px(x+w-2,y+h-2,pal[1])}};
const wheel=(p,cx,cy,r)=>{p.ell(cx,cy,r,r,DARK,{b:-.05});p.ell(cx,cy,r*.45,r*.45,STL,{b:.1});p.px(Math.round(cx-.5),Math.round(cy-.5),STL[4])};
const rot=s=>M.mk(s.h,s.w,p=>{for(let y=0;y<s.h;y++)for(let x=0;x<s.w;x++){const o=(y*s.w+x)*4;if(s.d[o+3]>40)p.px(s.h-1-y,x,[s.d[o],s.d[o+1],s.d[o+2]])}},false);
const flipS=s=>M.mk(s.w,s.h,p=>p.blit(s,0,0,true),false);
const SP=(w,h,fn)=>M.mk(w,h,fn);
/* composite of a rig's final pose (for auras & the blueprint hologram) */
const pose=(w,h,parts)=>M.mk(w,h,p=>parts.slice().sort((a,b)=>(a.zb??0)-(b.zb??0)).forEach(q=>{const s=Array.isArray(q.s)?q.s[1]:q.s;p.blit(s,q.b[0],q.b[1])}),false);
const hoverSpec=(R,e,col)=>{e.fly=M.now;M.snd('charge',1.4);M.snd('whoosh',.7);M.say(R,e.x+e.w/2,e.y-6,'THRUSTERS!');return 2.4};
const hoverUpd=(e,R,feet,col)=>{const a=M.now-(e.fly??-9);if(a<2.4){const k=a/2.4;e.oy=-Math.sin(Math.min(1,k)*Math.PI)*30;if(!RM)for(const f of feet)M.emit(R,'fire',e.x+f[0],e.y+f[1]+e.oy,2,{dir:Math.PI/2,spread:.4,v:2.4,c:col});if(a>2.25&&!e.landed){e.landed=1;M.snd('thud',.8);M.shake(R,.25,1);M.emit(R,'dust',e.x+e.w/2,FL-8,14,{rx:20})}}else{e.oy=0;e.landed=0}};
const glowAt=(g,x,y,r,c,d=.6)=>M.glow(g,Math.round(x),Math.round(y),r,c,d);

/* ================= HAULER: big rig -> mech ================= */
function hauler(R,cx){const yb=FL-10;
 const trl=SP(22,24,p=>{pl(p,1,1,20,15,STL,{riv:1});for(let x=3;x<20;x+=3)p.rect(x,2,1,13,STL[1]);p.rect(1,9,20,2,RED,{v:.6});p.rect(1,16,20,2,DARK,{v:.4});wheel(p,11,20,3.5)});
 const legA=SP(14,38,p=>{pl(p,3,1,8,15,STL,{riv:1});p.rect(4,4,6,1,STL[1]);pl(p,1,20,12,13,RED,{riv:1});p.rect(2,24,10,2,YEL,{v:.6});wheel(p,7,18,4);pl(p,0,33,14,4,DARK,{v:.5});p.px(11,28,'#ffd23a')});
 const legB=flipS(legA);
 const cab=SP(26,28,p=>{p.rect(3,0,2,8,STL,{v:.6});pl(p,1,6,22,16,RED,{riv:1});p.poly([[14,7],[22,7],[23,14],[14,14]],GLS,{v:.6,bv:.3});p.rect(6,9,6,4,GLS,{v:.5});pl(p,22,14,3,7,STL);for(let y=15;y<21;y+=2)p.rect(22,y,3,1,STL[1]);p.px(23,13,'#fff0a0');p.rect(1,21,24,2,DARK);wheel(p,16,23,4);wheel(p,5,23,4)});
 const chest=SP(32,26,p=>{p.poly([[1,1],[30,1],[27,22],[4,22]],RED,{v:.55,bv:.3,tex:tx()});p.rect(6,4,9,7,GLS,{v:.6});p.rect(17,4,9,7,GLS,{v:.6});p.px(7,5,'#e0fcff');p.px(18,5,'#e0fcff');pl(p,11,13,10,8,STL);for(let y=14;y<21;y+=2)p.rect(12,y,8,1,STL[1]);p.px(3,2,'#ffd23a');p.px(28,2,'#ffd23a');p.rect(14,22,4,3,DARK)});
 const pel=SP(20,8,p=>{pl(p,1,1,18,6,DARK,{riv:1});p.rect(7,2,6,4,RED,{v:.6})});
 const armA=SP(12,28,p=>{pl(p,1,1,10,9,RED,{r:2,riv:1});p.rect(1,7,10,1,YEL[3]);pl(p,3,10,6,7,STL);pl(p,2,17,8,6,RED);pl(p,2,23,8,4,DARK,{r:1})});
 const armB=flipS(armA);
 const head=SP(14,15,p=>{pl(p,1,2,12,11,RED,{r:2});p.rect(6,0,2,4,STL,{v:.7});pl(p,3,7,8,5,STL);p.rect(3,5,8,2,'#5afcff');p.px(0,6,STL[3]);p.px(13,6,STL[3])});
 const P=[{s:[trl,legA],a:[0,54],b:[16,40],t:[0,.28],arc:4,za:1,zb:1},{s:[trl,legB],a:[20,54],b:[34,40],t:[.06,.34],arc:4,za:1,zb:1},
  {s:pel,a:[24,58],b:[22,36],t:[.24,.38],za:-1,zb:2,hide0:1},
  {s:[cab,chest],a:[38,50],b:[16,12],t:[.3,.56],arc:10,za:3,zb:3},
  {s:armA,a:[42,54],b:[5,13],t:[.52,.7],za:-1,zb:4,hide0:1,arc:6},{s:armB,a:[46,54],b:[47,13],t:[.58,.76],za:-1,zb:4,hide0:1,arc:6},
  {s:head,a:[44,48],b:[25,0],t:[.76,.9],za:-1,zb:2.5,hide0:1,arc:8,snd:'servo'}];
 const full=pose(64,78,P);
 const e=K.rig(R,{name:'HAULER RIG',pname:'HAULER PRIME',x:cx,yb,w:64,h:78,dur:3.4,parts:P,ringCol:'#ff7a3a',
  under(g,X,Y,t,e,k){if(e.st>=2&&k>=1)M.aura(g,full,X,Y+Math.round(e.oy||0),'#ff6a2a',2,t,.55)},
  over(g,X,Y,t,e,k){if(k<=0){const bl=(Math.sin(t*3)+1)/2;glowAt(g,X+38+24,Y+50+13,6,'#fff0a0',.3+.3*bl)}
   if(k>=1){const p=.5+.3*Math.sin(t*5);glowAt(g,X+32,Y+6,5,'#5afcff',p);glowAt(g,X+19,Y+14,3,'#ffd23a',.6);glowAt(g,X+44,Y+14,3,'#ffd23a',.6)}},
  upd(e,dt,t,R){hoverUpd(e,R,[],[])},
  done(e,R){M.say(R,e.x+32,e.y-6,'HAULER PRIME, ROLL OUT!',1.6);M.emit(R,'spark',e.x+32,e.y+30,20,{rx:24,ry:30})},
  special(e,R){M.snd('charge',1.6);M.say(R,e.x+32,e.y-6,'PLASMA CANNON!');const x0=e.x+32,y0=e.y+22;setTimeout(()=>{M.snd('laser',.6);M.snd('boom',1.4);M.shake(R,.5,2)},350);
   M.fx(R,1.5,(g,ox,oy,k,a)=>{const X=x0+ox,Y=y0+oy;if(a<.35){glowAt(g,X,Y,Math.round(3+a*24),'#7affff',.8);return}const L=Math.min(1,(a-.35)*5)*120,th=Math.round((1-Math.max(0,(k-.7)/.3))*3);
    for(let i=0;i<L;i++)for(let j=-th;j<=th;j++){const xx=X+i,yy=Y+j+Math.round(Math.sin(i*.4-a*30)*.6);if(Math.abs(j)===th&&bay(xx,yy+((a*40)|0))<.5)continue;g.fillStyle=Math.abs(j)<th-1?'#ffffff':Math.abs(j)<th?'#9affff':'#2ab0ff';g.fillRect(xx,yy,1,1)}
    if(th>0){glowAt(g,X,Y,10,'#9affff',.6);glowAt(g,X+L,Y,8+Math.round(Math.sin(a*30)*2),'#ffffff',.7)}},{});
   setTimeout(()=>M.emit(R,'zap',x0+120,y0,20),500);return 1.6}});
 e.full=full;return e}

/* ================= SKY RAPTOR: jet -> winged mech ================= */
function raptor(R,cx){const yb=FL-10;
 const fus=SP(38,14,p=>{p.poly([[1,3],[30,2],[37,6],[30,11],[1,11]],WHT,{v:.6,bv:.3});p.rect(2,7,30,1,ORG[3]);p.rect(8,9,8,2,DARK);p.rect(1,3,3,8,TEA,{v:.5})});
 const nose=SP(18,10,p=>{p.poly([[1,1],[10,1],[17,5],[10,8],[1,8]],WHT,{v:.6,bv:.3});p.poly([[2,1],[9,1],[12,4],[2,4]],GLS,{v:.6})});
 const wing=SP(28,9,p=>{p.poly([[1,7],[14,1],[22,1],[26,7]],TEA,{v:.55,bv:.3});p.rect(14,1,8,1,ORG[3])});
 const eng=SP(16,9,p=>{pl(p,2,1,13,7,DARK,{riv:1});p.rect(0,2,2,5,ORG[2]);p.px(0,4,'#ffe0a0')});
 const torso=SP(22,26,p=>{p.poly([[1,2],[20,2],[18,15],[14,24],[7,24],[3,15]],WHT,{v:.6,bv:.3});p.rect(8,4,6,6,GLS,{v:.6});p.poly([[3,12],[11,20],[18,12],[18,14],[11,22],[3,14]],ORG,{v:.6});p.rect(9,15,4,3,TEA,{v:.8})});
 const hd=SP(12,13,p=>{p.poly([[2,3],[6,0],[10,3],[10,10],[6,12],[2,10]],WHT,{v:.6,bv:.3});p.poly([[3,6],[6,8],[9,6],[9,7],[6,9],[3,7]],ORG,{v:.8});p.rect(5,0,2,3,TEA)});
 const wM=SP(18,38,p=>{p.poly([[16,36],[1,1],[7,3],[17,18]],TEA,{v:.55,bv:.3});for(let i=0;i<4;i++)p.line(3+i*3,4+i*6,14,20+i*4,TEA[4]);p.line(1,1,16,36,ORG[3])});
 const wMf=flipS(wM);
 const leg=SP(10,32,p=>{pl(p,1,1,8,12,WHT);pl(p,2,13,6,3,ORG);pl(p,1,16,8,11,TEA);pl(p,0,27,10,4,DARK);p.rect(2,30,6,1,ORG[2])});
 const arm=SP(8,22,p=>{pl(p,1,1,6,9,WHT,{r:1});pl(p,1,10,6,8,ORG);p.poly([[1,17],[6,17],[5,21],[2,21]],TEA,{v:.6})});
 const P=[{s:[wing,wM],a:[14,51],b:[4,6],t:[.36,.6],za:5,zb:0,arc:14},{s:[wing,wMf],a:[16,55],b:[42,6],t:[.42,.66],za:-1,zb:0,arc:14,hide0:1},
  {s:[eng,leg],a:[0,58],b:[21,46],t:[0,.26],za:2,zb:1},{s:[eng,leg],a:[2,60],b:[33,46],t:[.06,.32],za:-1,zb:1,hide0:1},
  {s:[fus,torso],a:[12,56],b:[21,22],t:[.2,.44],za:3,zb:2,arc:8},{s:[nose,hd],a:[47,58],b:[26,9],t:[.5,.7],za:4,zb:3,arc:10,snd:'servo'},
  {s:arm,a:[28,60],b:[13,24],t:[.66,.82],za:-1,zb:4,hide0:1},{s:arm,a:[30,60],b:[43,24],t:[.7,.86],za:-1,zb:4,hide0:1}];
 const full=pose(64,78,P);
 const e=K.rig(R,{name:'SKY RAPTOR JET',pname:'RAPTOR VALKYRIE',x:cx,yb,w:64,h:78,dur:3.2,parts:P,ringCol:'#3ac8c8',
  under(g,X,Y,t,e,k){if(k<.2){g.fillStyle='#2c303c';g.fillRect(X+20,Y+70,2,8);g.fillRect(X+44,Y+68,2,10);g.fillStyle='#454a58';g.fillRect(X+18,Y+76,6,2);g.fillRect(X+42,Y+76,6,2)}
   if(e.st>=2&&k>=1)M.aura(g,full,X,Y+Math.round(e.oy||0),'#3ac8c8',2,t,.55)},
  over(g,X,Y,t,e,k){if(k<=0){if(((t*2)|0)%2)glowAt(g,X+37+12,Y+62,3,'#ff4a4a',.6);if(((t*2+1)|0)%2)glowAt(g,X+3,Y+58,3,'#4aff7a',.6)}
   if(k>=1){glowAt(g,X+32,Y+16,4,'#ffa030',.7);glowAt(g,X+32,Y+38,4,'#3ac8c8',.6+.2*Math.sin(t*4));if(!RM&&((t*8)|0)%3===0){g.fillStyle='#a8fff4';g.fillRect(X+5+((t*50)|0)%3,Y+40,1,1);g.fillRect(X+58-((t*50)|0)%3,Y+40,1,1)}}},
  upd(e,dt,t,R){hoverUpd(e,R,[[26,78],[38,78]],['#ffffff','#a8fff4','#3ac8c8','#14808a'])},
  done(e,R){M.say(R,e.x+32,e.y-6,'VALKYRIE MODE!',1.6);M.emit(R,'star',e.x+32,e.y+30,20,{rx:30,ry:30})},
  special(e,R){return hoverSpec(R,e)}});
 e.full=full;return e}

/* ================= RUST TITAN: junk pile -> titan ================= */
function titan(R,cx){const yb=FL-6;const rtx=tx(.28,2);
 const foot=SP(16,8,p=>{p.poly([[1,6],[3,1],[12,1],[15,6]],RST,{v:.5,tex:rtx});p.rect(1,6,14,1,DARK[2])});
 const shin=SP(13,20,p=>{pl(p,1,1,11,18,RST,{riv:1,tex:rtx});for(let y=3;y<17;y+=4){p.rect(2,y,9,2,YEL,{v:.55});p.rect(2+((y>>2)%2)*4,y,3,2,DARK[1])}});
 const thigh=SP(14,18,p=>{pl(p,1,1,12,16,RST,{riv:1,tex:rtx});p.rect(5,3,4,12,DARK,{v:.5});p.rect(6,4,2,10,STL[3])});
 const hip=SP(32,12,p=>{pl(p,1,1,30,10,RST,{riv:1,tex:rtx});p.rect(12,2,8,8,DARK,{v:.5});p.ell(16,6,3,3,['#3a0a04','#8a1a08','#e04a10','#ff9a2a'])});
 const torso=SP(44,32,p=>{p.poly([[1,4],[42,4],[38,30],[6,30]],RST,{v:.55,bv:.3,tex:rtx});pl(p,0,1,12,9,YEL,{riv:1});pl(p,32,1,12,9,YEL,{riv:1});for(let x=1;x<12;x+=3){p.rect(x,2,1,7,DARK[1]);p.rect(x+32,2,1,7,DARK[1])}
  pl(p,14,8,16,14,DARK,{v:.4});for(let y=10;y<21;y+=3)p.rect(15,y,14,1,'#c04010');p.rect(7,0,3,4,STL,{v:.6});p.rect(34,0,3,4,STL,{v:.6});p.px(18,26,'#ffd23a');p.px(25,26,'#ffd23a')});
 const armA=SP(16,38,p=>{pl(p,1,1,14,12,RST,{r:3,riv:1,tex:rtx});p.rect(1,8,14,2,YEL[3]);p.rect(5,13,6,10,STL,{v:.5});p.rect(7,13,2,10,STL[4]);pl(p,2,23,12,8,RST,{tex:rtx});p.poly([[2,31],[14,31],[15,37],[11,35],[8,37],[5,35],[1,37]],DARK,{v:.55})});
 const armB=flipS(armA);
 const head=SP(20,18,p=>{pl(p,1,2,18,14,RST,{r:3,tex:rtx});p.rect(4,7,12,4,DARK[0]);p.rect(5,8,10,2,'#ff2a1a');p.rect(8,0,4,3,STL,{v:.6});p.rect(0,9,2,4,YEL[3]);p.rect(18,9,2,4,YEL[3])});
 const P=[{s:foot,a:[0,96],b:[34,96],t:[0,.1],arc:16},{s:foot,a:[94,96],b:[62,96],t:[.04,.14],arc:16},
  {s:[rot(shin),shin],a:[12,91],b:[36,78],t:[.12,.26],arc:26},{s:[rot(shin),shin],a:[80,91],b:[63,78],t:[.16,.3],arc:26},
  {s:[rot(thigh),thigh],a:[24,90],b:[35,62],t:[.28,.4],arc:30},{s:[rot(thigh),thigh],a:[66,90],b:[63,62],t:[.32,.44],arc:30},
  {s:hip,a:[40,92],b:[40,52],t:[.44,.54],arc:20,za:1,zb:3},{s:torso,a:[34,74],b:[34,22],t:[.52,.68],arc:24,za:0,zb:4,snd:'clang'},
  {s:[rot(armA),armA],a:[0,88],b:[18,24],t:[.66,.8],arc:34,zb:5},{s:[rot(armB),armB],a:[74,88],b:[78,24],t:[.7,.84],arc:34,zb:5},
  {s:head,a:[72,86],b:[46,6],t:[.84,.96],arc:30,zb:6,snd:'clang'}];
 const full=pose(112,104,P);
 const e=K.rig(R,{name:'JUNK PILE',pname:'RUST TITAN',x:cx,yb,w:112,h:104,dur:4.2,parts:P,ringCol:'#ff6a2a',revert:34,
  under(g,X,Y,t,e,k){if(e.st>=2&&k>=1)M.aura(g,full,X,Y,'#ff4a1a',2,t,.45)},
  over(g,X,Y,t,e,k){if(k<=0&&!RM){if(((t*1.3)|0)%4===0){g.fillStyle='#ffd23a';g.fillRect(X+52,Y+80,1,1)}}
   if(k>=1){const p=.6+.3*Math.sin(t*6);glowAt(g,X+56,Y+15,7,'#ff2a1a',p);g.fillStyle=p>.75?'#ffffff':'#ff8a6a';g.fillRect(X+51+Math.round(Math.sin(t*1.5)*3),Y+15,3,1);glowAt(g,X+56,Y+37,10,'#ff7a1a',.35+.15*Math.sin(t*3))}},
  amb(e,R,dt){if(Math.random()<dt*3){M.emit(R,'smoke',e.x+42,e.y+20,1,{dir:-Math.PI/2,spread:.3});M.emit(R,'smoke',e.x+69,e.y+20,1,{dir:-Math.PI/2,spread:.3})}},
  start(e,R){M.say(R,e.x+56,e.y+60,'*CLANK* *CLUNK*',1.4)},
  done(e,R){M.snd('roar',.5);M.shake(R,.5,2);M.say(R,e.x+56,e.y-4,'RUST TITAN ONLINE',1.6);M.emit(R,'steam',e.x+56,e.y+20,20,{rx:40})},
  special(e,R){M.snd('boom',.7);M.snd('crunch',.6);M.shake(R,.9,4);M.flash(R,'#ff7a1a',.12);M.say(R,e.x+56,e.y-4,'GROUND STOMP!');const cx=e.x+56,cy=FL-4;
   M.fx(R,1.1,(g,ox,oy,k)=>{M.ringFx(g,cx+ox,cy+oy,8+k*150,k<.3?'#ffffff':'#ffb050',2,1-k);M.ringFx(g,cx+ox,cy+oy,6+k*100,'#a86a30',1,1-k)});
   M.emit(R,'crumb',cx,cy-4,30,{dir:-Math.PI/2,spread:2.4,v:1.5});M.emit(R,'dust',cx,cy,24,{rx:50});
   for(const o of R.ents)if(o!==e&&o.ex&&Math.abs(o.x+o.w/2-cx)<260&&o.w<80)M.play&&M.play(o,'hop',.4);return 1.4}});
 e.full=full;return e}

/* ================= AEGIS: power armor, plates fly off the racks and lock on ================= */
function aegis(R,cx){const yb=FL-8,EW=120,EH=86,CX=60;
 const T=['#3a4a6a','#8aa0c0','#d0dcef','#ffffff'];
 const endo=M.mk(40,74,p=>{const c=DARK;p.ell(20,8,5,6,c,{b:.1});p.ell(20,8,3,4,DARK[0]);p.rect(19,14,2,34,c,{v:.5});for(let y=20;y<36;y+=4)p.rect(14,y,12,1,c[3]);p.rect(13,46,14,3,c,{v:.55});
  for(const lx of[15,23]){p.rect(lx,49,2,23,c,{v:.5});p.ell(lx+1,60,2,2,c,{b:.2})}p.rect(12,72,7,2,c);p.rect(21,72,7,2,c);p.line(12,18,8,40,c[3]);p.line(28,18,32,40,c[3]);p.rect(11,17,18,2,c,{v:.5});
  for(const[x,y]of[[18,8],[22,8],[20,30],[16,60],[24,60],[12,18],[28,18]])p.px(x,y,'#3aff9a')},false);
 const boot=SP(10,9,p=>{p.poly([[1,1],[7,1],[8,4],[9,7],[1,7]],BLU,{v:.55,bv:.3});p.rect(1,7,8,1,T[1])});
 const shin=SP(9,13,p=>{pl(p,1,1,7,11,BLU,{r:1});p.rect(2,3,5,1,T[2]);p.px(4,8,'#3aff9a')});
 const thigh=SP(10,13,p=>{pl(p,1,1,8,11,BLU,{r:1});p.rect(1,1,8,2,T[2])});
 const belt=SP(22,6,p=>{pl(p,1,1,20,4,T,{v:.5});p.rect(9,1,4,4,BLU,{v:.6});p.px(10,2,'#3aff9a');p.px(11,2,'#3aff9a')});
 const chest=SP(26,21,p=>{p.poly([[1,1],[24,1],[22,13],[16,19],[9,19],[3,13]],BLU,{v:.58,bv:.3,tex:tx(.1)});p.poly([[3,2],[11,2],[8,8],[3,8]],T,{v:.55});p.poly([[14,2],[22,2],[22,8],[17,8]],T,{v:.55});p.ell(12.5,10.5,3,3,DARK[0]);p.ell(12.5,10.5,2,2,['#0a4a2a','#1a8a5a','#3aff9a','#d0ffe8'])});
 const fa=SP(8,13,p=>{pl(p,1,1,6,11,BLU,{r:1});p.rect(1,8,6,2,T[2])});
 const pau=SP(12,9,p=>{p.poly([[1,7],[2,2],[6,1],[10,2],[11,7]],BLU,{v:.6,bv:.3});p.rect(2,3,8,1,T[2])});
 const pauR=flipS(pau);
 const helm=SP(14,15,p=>{p.poly([[2,4],[5,1],[9,1],[12,4],[12,12],[9,14],[5,14],[2,12]],BLU,{v:.6,bv:.3});p.poly([[3,6],[11,6],[10,9],[4,9]],DARK,{v:.3});p.rect(4,7,6,1,'#3aff9a');p.rect(6,1,2,3,T[2])});
 const P=[{s:boot,a:[4,77],b:[49,77],t:[0,.1],arc:10},{s:flipS(boot),a:[104,77],b:[61,77],t:[.03,.13],arc:10},
  {s:shin,a:[6,62],b:[50,64],t:[.13,.23],arc:10},{s:shin,a:[105,62],b:[61,64],t:[.16,.26],arc:10},
  {s:thigh,a:[18,62],b:[49,51],t:[.27,.37],arc:12},{s:thigh,a:[92,62],b:[61,51],t:[.3,.4],arc:12},
  {s:belt,a:[4,50],b:[49,47],t:[.42,.5],arc:12},{s:chest,a:[90,24],b:[47,27],t:[.5,.64],arc:14,glowc:'#3aff9a'},
  {s:fa,a:[20,34],b:[41,39],t:[.62,.71],arc:10},{s:fa,a:[92,48],b:[71,39],t:[.65,.74],arc:10},
  {s:pau,a:[6,22],b:[38,26],t:[.74,.83],arc:12},{s:pauR,a:[102,12],b:[70,26],t:[.77,.86],arc:12},
  {s:helm,a:[18,10],b:[53,11],t:[.86,.97],arc:16,snd:'servo',glowc:'#3aff9a'}];
 const full=M.mk(EW,EH,p=>{p.blit(endo,40,10);P.forEach(q=>p.blit(q.s,q.b[0],q.b[1]))},false);
 const e=K.rig(R,{name:'AEGIS FRAME',pname:'AEGIS: GUARDIAN MODE',x:cx,yb,w:EW,h:EH,dur:3.6,parts:P,ringCol:'#3aff9a',
  under(g,X,Y,t,e,k){// racks
   for(const rx of[2,88]){g.fillStyle='#2c303c';g.fillRect(X+rx,Y+2,30,2);g.fillRect(X+rx+1,Y+2,2,84);g.fillRect(X+rx+27,Y+2,2,84);g.fillStyle='#454a58';g.fillRect(X+rx,Y+2,30,1);for(let i=0;i<4;i++){g.fillStyle='#1a1c26';g.fillRect(X+rx+3,Y+20+i*18,24,1)}}
   const oy=Math.round(e.oy||0);if(e.st>=2&&k>=1)M.aura(g,full,X,Y+oy,'#3aff9a',2,t,.5);g.drawImage(endo.c,X+40,Y+10+oy);
   if(k<=0){const p=(Math.sin(t*2)+1)/2;glowAt(g,X+60,Y+40,4,'#3aff9a',.2+.2*p)}},
  over(g,X,Y,t,e,k){if(k>=1){const p=.55+.35*Math.sin(t*4);glowAt(g,X+60,Y+38,7,'#3aff9a',p);glowAt(g,X+60,Y+18,5,'#3aff9a',.6);g.fillStyle=p>.8?'#ffffff':'#3aff9a';
    for(const[x,y,w,h]of[[54,30,1,6],[66,30,1,6],[52,56,1,7],[68,56,1,7],[44,44,1,5],[75,44,1,5]])g.fillRect(X+x,Y+y,w,h)}},
  upd(e,dt,t,R){hoverUpd(e,R,[[54,86],[66,86]],['#ffffff','#bff0ff','#3aa0ff','#1a4ab0'])},
  start(e,R){M.say(R,e.x+60,e.y-4,'SUIT UP SEQUENCE',1.4)},
  done(e,R){M.say(R,e.x+60,e.y-4,'GUARDIAN MODE',1.6);M.emit(R,'wisp',e.x+60,e.y+40,24,{rx:20,ry:40,c:['#ffffff','#a8ffd0','#3aff9a']})},
  special(e,R){return hoverSpec(R,e)}});
 e.full=full;return e}

/* ================= DRONE SWARM -> giant ================= */
function swarm(R,cx){const BM=['.....###.....','....#####....','....#####....','.....###.....','...#######...','..#########..','.###########.','##.#######.##','##.#######.##','##.#######.##','#..#######..#','#...#####...#','....#####....','....##.##....','...###.###...','...##...##...','...##...##...','...##...##...','..###...###..'];
 const pts=[];BM.forEach((r,j)=>{for(let i=0;i<r.length;i++)if(r[i]==='#')pts.push([i*3-18,j*3-54,j<3&&(i===5||i===7)])});
 const N=pts.length,D=pts.map((q,i)=>({x:cx+(H(i,1)-.5)*80,y:FL-60+(H(i,2)-.5)*50,p:H(i,3)*TAU,s:.6+H(i,4)*.9,vx:0,vy:0}));
 const e=M.ent(R,{ex:1,name:ee=>ee.st===2?'SWARM COLOSSUS':'DRONE SWARM',x:cx-44,y:FL-110,w:88,h:100,box:1,z:FL,st:0,t1:0,
  draw(g,X,Y,t,e,sel){const ox=X-e.x,oy=Y-e.y;const tt=RM?0:t;
   if(e.st===2)M.glow(g,Math.round(cx+ox),Math.round(FL-40+oy),40,'#ff3aa0',.12+.05*Math.sin(t*3));
   for(let i=0;i<N;i++){const d=D[i],x=Math.round(d.x+ox),y=Math.round(d.y+oy+(e.st===2?Math.sin(tt*2+i*.1):0));g.fillStyle='#1a1c26';g.fillRect(x-1,y,3,2);g.fillStyle='#454a58';g.fillRect(x-1,y,3,1);
    const on=e.st===2?(pts[i][2]?'#ff2a4a':(((tt*4+i*.3)|0)%5?'#ff7ad0':'#ffffff')):(((tt*3+d.p*2)|0)%3?'#7affff':'#ff7ad0');g.fillStyle=on;g.fillRect(x,y+1,1,1);
    if(!RM&&((tt*20+i)|0)%2){g.fillStyle='#8a90a0';g.fillRect(x-2,y-1,1,1);g.fillRect(x+2,y-1,1,1)}}
   if(e.st===2)for(const q of pts)if(q[2]){glowAt(g,cx+q[0]+ox,FL-8+q[1]+oy,3,'#ff2a4a',.7)}
   if(sel){g.fillStyle='#fff6c4';const a=(t*20|0)%4;for(let i=0;i<e.w;i+=4){g.fillRect(X+i+a,Y-2,2,1);g.fillRect(X+e.w-i-a,Y+e.h+1,2,1)}}},
  upd(e,dt,t,R){const tt=RM?0:t;for(let i=0;i<N;i++){const d=D[i];let tx,ty,k=4;
    if(e.st===0){tx=cx+Math.cos(tt*d.s+d.p)*36+Math.sin(tt*.7+i)*8;ty=FL-64+Math.sin(tt*d.s*1.3+d.p*2)*22;k=1.6}
    else if(e.st===1||e.st===2){tx=cx+pts[i][0];ty=FL-8+pts[i][1];k=e.st===1?5+i%5:12}
    else{d.x+=d.vx*dt;d.y+=d.vy*dt;d.vx*=.94;d.vy*=.94;continue}
    d.x+=(tx-d.x)*Math.min(1,dt*k);d.y+=(ty-d.y)*Math.min(1,dt*k)}
   if(e.st===1&&M.now-e.t1>1.3){e.st=2;e.t1=M.now;M.snd('power',1.3);M.flash(R,'#ff7ad0',.12);M.say(R,cx,FL-118,'WE ARE ONE.',1.6)}
   if(e.st===2&&M.now-e.t1>9)this.click(e,R);
   if(e.st===3&&M.now-e.t1>1.6)e.st=0},
  click(e,R){if(e.st===0){e.st=1;e.t1=M.now;M.snd('servo',1.6);M.snd('glitch',1.2);M.say(R,cx,FL-118,'FORMATION!',1)}
   else if(e.st===2){e.st=3;e.t1=M.now;M.snd('boom',1.2);M.shake(R,.4,2);M.emit(R,'zap',cx,FL-40,24,{rx:20,ry:30});for(const d of D){const a=Math.atan2(d.y-(FL-40),d.x-cx)+(Math.random()-.5);const v=120+Math.random()*120;d.vx=Math.cos(a)*v;d.vy=Math.sin(a)*v*.7}M.say(R,cx,FL-118,'SCATTER!',1)}}});
 return e}

/* ================= clutter ================= */
function gear(r,teeth,pal){const F=6;return M.frames(F,r*2+3,r*2+3,(p,f)=>{const c=r+1.5;for(let y=0;y<r*2+3;y++)for(let x=0;x<r*2+3;x++){const dx=x+.5-c,dy=y+.5-c,d=Math.hypot(dx,dy),a=Math.atan2(dy,dx)+f/F*TAU/teeth;
  const tooth=((a/(TAU/teeth))%1+1)%1<.5;const ro=tooth?r:r-3;if(d>ro)continue;if(d<r*.32&&d>r*.18)continue;if(d<r*.62&&d>r*.32&&(((a*3/TAU)%1+1)%1)>.25)continue;
  let v=.5-(dx+dy)/(r*2)*.4;if(d>ro-1)v-=.15;if(Math.abs(d-r*.62)<.8)v-=.2;p.px(x,y,rp(pal,v,x,y))}})}
M.K.ext('mecha',{top:'#0c0604',bot:'#0c0604',start:560,
 bg(p,R){// stone forge-hall with bronze hangar plating
  for(let y=0;y<FL;y++)for(let x=0;x<W;x++)p.px(x,y,rp(['#0a0604','#140c08','#1e140c'],.3+(fbm(x/40,y/30)-.5)*.4+y/FL*.4,x,y));
  K.wall(p,0,0,W,26,PAL.basalt,{bh:9,bw:22,sd:7,v:.32});
  // bronze riveted panels between pillars
  for(let x=0;x<W;x+=34)for(let y=40;y<FL-22;y+=24){const sd=x*3+y;p.rect(x+1,y+1,32,22,BRD,{v:.34+(H(x,y)-.5)*.1-(y-40)/400,bv:.2,tex:tx(.12,4)});for(const[a,b]of[[3,3],[30,3],[3,20],[30,20]])p.px(x+a,y+b,BRD[4]);if(H(x,y)>.7)for(let i=0;i<8;i++)p.px(x+6+i*2,y+11,BRD[0])}
  // the great furnace mouth
  K.arch(p,580,FL-22,84,70,12,PAL.basalt,{n:11});for(let y=FL-92;y<FL-22;y++)for(let x=538;x<622;x++){const dx=(x+.5-580)/42,dy=(y+.5-(FL-22))/70;if(dx*dx+dy*dy>=1)continue;p.px(x,y,rp(['#1a0604','#3a0e04','#6a1e06','#a83a0a','#e06a10'],.15+(1-Math.hypot(dx,dy*.8))*.7+(fbm(x/6,y/5)-.5)*.3,x,y))}
  // hazard band + skirting
  for(let x=0;x<W;x++)for(let y=FL-22;y<FL-14;y++)p.px(x,y,((x+y)>>2)%2?'#d0a010':'#1a1208');p.rect(0,FL-23,W,1,'#3a2a10');p.rect(0,FL-14,W,14,PAL.basalt,{v:.35,bv:.2});
  // colossal stone pillars with bronze bands
  for(const px of[10,232,500,680,906,1090]){K.pillar(p,px,26,FL,20,PAL.basalt,{cap:8,base:10,drum:30,sd:px,rune:'#5a2a10'});for(const by of[60,120])p.rect(px-11,by,22,4,BRZ,{v:.6,bv:.3})}
  // pipes
  for(const[py,c]of[[30,STL],[35,BRZ]])p.rect(0,py,W,3,c,{v:.5,bv:.3});for(let x=40;x<W;x+=120){p.rect(x,28,5,10,STL,{v:.6});p.ell(x+2,27,3,2,RED)}
  // stencils
  [[130,'BAY 01'],[360,'BAY 02'],[580,'FORGE'],[820,'BAY 03'],[980,'SWARM']].forEach(([x,s])=>M.ftext(p,s,x-M.tw(s)/2,44,'#a06a28','#1a0e06'));
  // floor: iron grating
  K.floor(p,FL,RH,['#08080c','#141620','#22242e','#343844','#4a505c'],{tw:20,inlay:(x,y)=>(y-FL)%6===0&&x%3===0?'#0a0a10':null});
  // platforms
  for(const[x,w]of[[130,74],[360,74],[580,124],[820,128],[980,92]]){p.rect(x-w/2,FL-6,w,6,DARK,{v:.55,bv:.3});p.rect(x-w/2+2,FL-3,w-4,1,'#ffa030');for(let i=0;i<w;i+=8)p.px(x-w/2+4+i,FL-5,'#ffd23a')}
  // barrels and crates
  for(const[x,c]of[[40,RED],[54,YEL],[1050,STL],[700,RED]]){p.cyl(x,FL-16,11,14,c,{});p.rect(x,FL-12,11,1,DARK[1]);p.rect(x,FL-6,11,1,DARK[1])}
  for(const x of[204,478,884])pl(p,x,FL-14,14,12,PAL.wood,{riv:1})},
 init(R){
  R.gears=[[200,70,22,10,1],[300,60,12,6,-1.6],[640,72,26,12,-.8],[760,66,14,7,1.3],[1030,72,20,10,1]].map(([x,y,r,n,s])=>({x,y,F:gear(r,n,BRZ),s,r}));
  R.mechs=[hauler(R,130),raptor(R,360),titan(R,580),aegis(R,820),swarm(R,980)];
  // gantry hook
  const hook=M.mk(9,8,p=>{p.rect(3,0,3,3,STL,{v:.6});p.poly([[1,3],[7,3],[7,6],[4,7],[1,5]],YEL,{v:.6})});
  M.ent(R,{name:'GANTRY HOOK',x:200,y:40,w:12,h:12,box:1,z:-5,noNav:1,dr:0,
   draw(g,X,Y,t,e){const ox=X-e.x;const tx0=e.cx+ox;g.fillStyle='#2c303c';g.fillRect(tx0-8,20,16,6);g.fillStyle='#ffd23a';g.fillRect(tx0-8,20,16,1);g.fillStyle='#454a58';for(let y=26;y<e.hy;y+=2)g.fillRect(tx0,y,1,1);g.drawImage(hook.c,tx0-4,Math.round(e.hy))},
   upd(e,dt,t){e.cx=550+Math.sin((RM?0:t)*.08)*480;const d=M.now-e.dr;e.L=d<2.2?40+Math.sin(Math.min(1,d/2.2)*Math.PI)*100:40;e.hy=26+e.L;e.x=e.cx-6;e.y=e.hy-2},
   click(e,R){if(M.now-e.dr<2.2)return;e.dr=M.now;M.snd('servo',.6);setTimeout(()=>{M.snd('clang',.6);M.emit(R,'spark',e.cx,FL-30,10)},1100)}});
  // welding arm
  M.ent(R,{name:'WELDING ARM',x:262,y:FL-58,w:30,h:52,box:1,z:FL-4,b:-9,
   draw(g,X,Y,t,e,sel){const tt=RM?0:t,bx=X+6,by=Y+52,a1=-1.25+Math.sin(tt*.9)*.2,a2=.9+Math.sin(tt*1.3)*.4;const ex=bx+Math.cos(a1)*24,ey=by+Math.sin(a1)*24,tx=ex+Math.cos(a1+a2)*20,ty=ey+Math.sin(a1+a2)*20;
    g.fillStyle='#2c303c';g.fillRect(bx-5,by-4,11,4);M.line(g,bx,by-3,ex,ey,'#d0a010',1);M.line(g,ex,ey,tx,ty,'#a07010',1);g.fillStyle='#454a58';g.fillRect(Math.round(ex)-1,Math.round(ey)-1,3,3);g.fillRect(Math.round(tx)-1,Math.round(ty)-1,3,2);
    const w=M.now-e.b<1.6;if(w||((tt*2)|0)%5===0){glowAt(g,tx,ty+2,w?10:4,'#bff0ff',w?.8:.5);g.fillStyle='#ffffff';g.fillRect(Math.round(tx),Math.round(ty)+1,1,2)}e.tip=[tx-X+e.x,ty-Y+e.y]
    if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,e.w,1)}},
   upd(e,dt,t,R){if(e.tip&&!RM&&(M.now-e.b<1.6?Math.random()<.8:Math.random()<dt*2))M.emit(R,'spark',e.tip[0],e.tip[1]+2,M.now-e.b<1.6?3:2,{c:['#ffffff','#bff0ff','#ffd84a']})},
   click(e,R){e.b=M.now;M.snd('forge',1.3);M.snd('zap',.8);M.say(R,e.x+15,e.y-4,'WELD!',.8)}});
  // blueprint hologram (wireframes of the room's mechs)
  R.holo={i:0,g:-9};
  M.ent(R,{name:'BLUEPRINT HOLO',x:432,y:FL-82,w:44,h:76,box:1,z:FL-6,
   draw(g,X,Y,t,e,sel){const tt=RM?0:t;g.fillStyle='#1a1c26';g.fillRect(X+12,Y+66,20,10);g.fillStyle='#3a84e8';g.fillRect(X+14,Y+66,16,1);
    M.glow(g,X+22,Y+34,26,'#3aa0ff',.18);const gl=M.now-R.holo.g<.3;
    for(let y=0;y<60;y+=1){if(((y+((tt*20)|0))%3)===0)continue;const jit=gl&&H(y,(t*30)|0)>.6?((H(y,3)*6)|0)-3:0;g.fillStyle=y%7===0?'#bff0ff':'#3aa0ff';
     const row=R.holoRows[R.holo.i][y];if(row)for(const[a,b]of row)g.fillRect(X+jit+a,Y+4+y,b,1)}
    if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,e.w,1)}},
   click(e,R){R.holo.i=(R.holo.i+1)%4;R.holo.g=M.now;M.snd('glitch',1.4);M.say(R,e.x+22,e.y-4,['HAULER','RAPTOR','TITAN','AEGIS'][R.holo.i]+' SCHEMATIC',1)}});
  // beacons + steam vents
  for(const bx of[80,1060])M.ent(R,{name:'ALARM BEACON',x:bx-5,y:46,w:10,h:10,box:1,z:-1,a:-9,
   draw(g,X,Y,t,e,sel){const al=M.now-e.a<2.4,sp=al?9:2.2,an=(RM?0:t)*sp;g.fillStyle='#2c303c';g.fillRect(X+1,Y+6,8,4);g.fillStyle=al?'#ff2a1a':'#ff7a1a';g.fillRect(X+2,Y+1,6,5);g.fillStyle='#ffd0a0';g.fillRect(X+3,Y+2,2,2);
    const c=Math.cos(an),L=Math.round(Math.abs(c)*26);if(L>2){for(let i=3;i<L;i++){const xx=X+5+Math.sign(c)*i;for(let j=-Math.floor(i/4);j<=Math.floor(i/4);j++)if(bay(xx,Y+3+j)<(al?.5:.25)*(1-i/L)+.08){g.fillStyle=al?'#ff4a2a':'#ffa030';g.fillRect(xx,Y+3+j,1,1)}}}if(al)M.glow(g,X+5,Y+4,12,'#ff2a1a',.3)},
   click(e,R){e.a=M.now;let n=0;const b=()=>{M.snd('beep',n%2?.8:1.1);if(++n<6)setTimeout(b,300)};b();M.flash(R,'#ff2a1a',.1);M.say(R,e.x+5,e.y-4,'INTRUDER? NO, VISITOR.',1.4)}});
  for(const vx of[312,724])M.ent(R,{name:'STEAM VENT',x:vx-8,y:FL-4,w:16,h:6,box:1,z:FL+2,s:-9,
   draw(g,X,Y,t,e,sel){g.fillStyle='#0a0a10';g.fillRect(X,Y,16,4);g.fillStyle='#454a58';for(let i=1;i<16;i+=3)g.fillRect(X+i,Y,1,4);if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,16,1)}},
   upd(e,dt,t,R){if(!RM&&Math.random()<dt*(M.now-e.s<1.5?40:1.2))M.emit(R,'steam',e.x+8,e.y,1,{dir:-Math.PI/2,spread:.4,v:M.now-e.s<1.5?3:1})},
   click(e,R){e.s=M.now;M.snd('hiss',1);M.say(R,e.x+8,e.y-30,'PSSSHHH',.8)}});
  K.motes(R,40,0,W,30,FL-10,['#ffa030','#ffd23a','#ff6a1a'],{big:false});
  // hologram rows from final poses (downsampled 2x, edges + scanline fill)
  const comp=[R.mechs[0],R.mechs[1],R.mechs[2],R.mechs[3]].map((m,i)=>m.full);
  R.holoRows=comp.map(s=>{const sw=Math.ceil(s.w/2),sh=Math.ceil(s.h/2),sc=Math.max(1,Math.max(sw/40,sh/60)),rows=[];const at=(x,y)=>{x=Math.floor(x*2*sc);y=Math.floor(y*2*sc);return x>=0&&y>=0&&x<s.w&&y<s.h&&s.m[y*s.w+x]};
   const ow=Math.floor(sw/sc),oh=Math.floor(sh/sc),ox=Math.round(22-ow/2),oy=60-oh;for(let y=0;y<60;y++){const r=[];const yy=y-oy;if(yy>=0)for(let x=0;x<ow;x++){if(!at(x,yy))continue;const edge=!at(x-1,yy)||!at(x+1,yy)||!at(x,yy-1)||!at(x,yy+1);if(edge||(yy%4===0))r.push([ox+x,1])}rows.push(r)}return rows})},
 back(R,g,ox,oy,t){const tt=RM?0:t;M.glow(g,Math.round(580+ox),Math.round(FL-50+oy),56,'#ff6a1a',.22+.06*Math.sin(tt*5)*Math.sin(tt*2.3),1.3);for(const q of R.gears){const f=((tt*q.s*3)%q.F.length+q.F.length)%q.F.length|0,s=q.F[q.s>0?f:q.F.length-1-f];g.drawImage(s.c,Math.round(q.x+ox-s.w/2),Math.round(q.y+oy-s.h/2))}
  // molten channel
  for(let x=0;x<M.BW;x++){const wx=x-ox;for(let y=0;y<3;y++){const v=(Math.sin(wx*.15-tt*3+y)+1)/2;g.fillStyle=v>.8?'#ffe08a':v>.4?'#ff8a1a':'#c02a08';g.fillRect(x,FL+22+y+oy,1,1)}}}
});
// expose final poses for the hologram
})();
