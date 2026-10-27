/* ARCANE LIBRARY: floating grimoires that open and cast their spells, five wands with their own magic,
   a flock of flapping books, floating candles, a cauldron, a teacup that might be a frog, and an owl familiar. */
(()=>{'use strict';const{rp,ramp,bay,H,vn,fbm,RM,TAU,clamp,lerp,mix}=M;const K=M.K,PAL=K.PAL;
const W=1100,FL=168;
const IND=['#06041a','#0e0a2e','#1a1446','#2a2266','#433a8e'],SHV=['#120a08','#26160e','#3e2616','#5e3a1e','#86582c'],
 PG=['#4a3a2a','#8a7858','#c8b490','#e8dcb8','#fff4d8'],GOLD=PAL.gold,
 SPN=[['#2a0a12','#5a1420','#8a2a30'],['#0a1a2a','#14385a','#2a5a8a'],['#0a2014','#143e24','#2a6a3a'],['#2a1a06','#5a3a10','#8a6020'],['#1a0a2a','#3a1a5a','#5e2e8a'],['#201a14','#4a3e30','#6e5e48']];
const SPD=SPN.map(c=>c.map(x=>mix(x,'#06041a',.5)));
const BX=[140,300,460,560,760],WX=[220,380,640,840,960];
const tx=(a=.16,s=3)=>(x,y)=>(fbm(x/s,y/s)-.5)*a;
const glowAt=(g,x,y,r,c,d=.6)=>M.glow(g,Math.round(x),Math.round(y),r,c,d);
const vw=R=>M.view(R);

/* ---------- grimoires ---------- */
const BOOKS=[
 {id:'PYRE',name:'GRIMOIRE OF PYRE',cv:['#1e0604','#4a0e08','#8a1e10','#c83a1a','#ff8a3a'],gc:'#ff8a2a',
  emb(p,x,y){p.poly([[x,y+8],[x-6,y-2],[x-2,y],[x,y-6],[x+2,y],[x+6,y-2]],['#3a0a04','#c84a10','#ff9a2a','#ffe08a'],{v:.6});p.px(x,y-3,'#ffffff')}},
 {id:'RIME',name:'TOME OF RIME',cv:['#06142a','#0e2e5a','#1e5a96','#4a9ad0','#bfeaff'],gc:'#8ae0ff',
  emb(p,x,y){for(let i=0;i<3;i++){const a=i*Math.PI/3;p.line(x-Math.cos(a)*6,y-Math.sin(a)*6,x+Math.cos(a)*6,y+Math.sin(a)*6,'#d8f6ff')}p.px(x,y,'#ffffff');for(const[a,b]of[[0,-6],[0,6],[-5,-3],[5,3],[-5,3],[5,-3]])p.px(x+a,y+b,'#ffffff')}},
 {id:'WATCHER',name:'THE WATCHER CODEX',cv:['#0a0614','#1e1030','#3a1e56','#5e3a86','#9a7ac0'],gc:'#7aff9a',
  emb(p,x,y){p.ell(x,y,6,4,['#0a2a10','#1a5a2a','#4ac06a','#bfffc8'],{b:.1});p.rect(x-1,y-2,2,4,'#05050a')}},
 {id:'ATLAS',name:'THE STAR ATLAS',cv:['#020414','#06102e','#0e1e52','#1e3478','#3a5aa8'],gc:'#ffe08a',
  emb(p,x,y){for(const[a,b]of[[-5,-5],[-1,-2],[3,-6],[5,1],[0,4],[-4,6]])p.px(x+a,y+b,'#ffe08a');p.line(x-5,y-5,x-1,y-2,'#a87020');p.line(x-1,y-2,x+3,y-6,'#a87020');p.line(x-1,y-2,x+5,y+1,'#a87020');p.line(x+5,y+1,x,y+4,'#a87020');p.px(x+3,y-6,'#ffffff')}},
 {id:'HEX',name:'GRIMOIRE OF HEXES',cv:['#040206','#0e0614','#1e0e26','#341a40','#5a2e6a'],gc:'#c060ff',
  emb(p,x,y){p.ell(x,y-1,5,5,['#3a3040','#8a8090','#d8d0e0','#ffffff'],{b:.1});p.rect(x-3,y-1,2,2,'#05020a');p.rect(x+1,y-1,2,2,'#05020a');p.rect(x-2,y+4,5,2,['#8a8090','#d8d0e0']);p.px(x-1,y+5,'#05020a');p.px(x+1,y+5,'#05020a')}}];
const pageText=(p,x,y,w,sd)=>{for(let j=0;j<7;j++){const L=Math.round(w*(.5+H(sd,j)*.45));for(let i=0;i<L;i++)if(H(i>>1,j+sd)>.18)p.px(x+i,y+j*3,PG[1])}};
function bookFrames(b,sd){return M.frames(9,44,30,(p,i,n)=>{const k=i/(n-1),sh=Math.round(9*(1-k)),S=22-sh,cv=b.cv;
 // back cover + right pages
 p.rect(S,3,19,25,cv,{v:.35,bv:.2});p.rect(S,4,17,22,PG,{v:.62,bv:.2,tex:tx(.1,3)});p.rect(S+1,26,16,1,PG[1]);p.rect(S+17,5,1,21,PG[1]);
 pageText(p,S+3,7,11,sd);
 if(k<.5){const w=Math.round(18*(1-2*k));if(w>0){p.rect(S,2,w+1,26,cv,{v:.55,bv:.28,tex:tx(.14,3)});if(w>3){p.rect(S+1,3,1,24,cv[4]);p.rect(S+w-1,3,1,24,cv[1])}
   if(w>=14){p.rect(S+2,4,w-3,1,GOLD[3]);p.rect(S+2,25,w-3,1,GOLD[2]);for(const[a,c]of[[2,4],[w-2,4],[2,25],[w-2,25]])p.px(S+a,c,GOLD[4]);b.emb(p,S+Math.round(w/2),15)}}}
 else{const w=Math.round(18*(2*k-1));if(w>0){p.rect(S-w-1,3,w+1,25,cv,{v:.3,bv:.15});if(w>2){p.rect(S-w,4,w,22,PG,{v:.66,bv:.2,tex:tx(.1,3)});p.rect(S-w,26,w,1,PG[1]);if(w>12)pageText(p,S-w+3,7,w-6,sd+9)}}}
 p.rect(S-1,2,2,26,cv,{v:.2});p.px(S-1,2,GOLD[3]);p.px(S-1,27,GOLD[3])},'#05030a')}
function bookEnt(R,bx,b,i){const F=bookFrames(b,i*13+3),yb=FL-34;
 const e=M.ent(R,{name:b.name,x:bx-22,y:yb-44,w:44,h:30,box:1,z:yb,fr:F,k:0,st:0,last:0,busy:0,cast:-9,flip:-9,b,
  draw(g,X,Y,t,e,sel){const tt=RM?0:t,lift=Math.round(M.ease.io(e.k)*10+Math.sin(tt*1.6+i)*1.5),y=Y-lift,s=F[Math.round(M.ease.io(e.k)*8)];
   // light pool on the lectern
   glowAt(g,X+22,Y+38,8+Math.round(e.k*6),b.gc,.1+e.k*.2);
   if(e.k>.6)M.aura(g,s,X,y,b.gc,2,t,.4+e.k*.3);
   if(sel)g.drawImage(M.ring(s),X-1,y-1);g.drawImage(s.c,X,y);
   if(e.st===0){const ph=(Math.sin(tt*2+i)+1)/2;if(ph>.6)glowAt(g,X+31,y+17,5,b.gc,.25*ph)}
   // the watcher: eye tracks the pointer
   if(b.id==='WATCHER'){const open=e.k>.9,ex=open?X+30:X+31,ey=open?y+15:y+17,px=M.ptr?M.ptr[0]:ex,py=M.ptr?M.ptr[1]:ey+40,a=Math.atan2(py-ey,px-ex),d=Math.min(open?3:2,Math.hypot(px-ex,py-ey)/20);
    if(open){g.fillStyle='#0a2a10';g.fillRect(ex-6,ey-3,13,7);g.fillRect(ex-4,ey-4,9,9);g.fillStyle='#e8ffe8';g.fillRect(ex-5,ey-2,11,5);g.fillRect(ex-3,ey-3,7,7);
     const bl=((tt*.7+i)%4)<.12;if(bl){g.fillStyle='#3a1e56';g.fillRect(ex-6,ey-3,13,7)}else{g.fillStyle='#4ac06a';g.fillRect(Math.round(ex+Math.cos(a)*d)-2,Math.round(ey+Math.sin(a)*d)-2,5,5);g.fillStyle='#05050a';g.fillRect(Math.round(ex+Math.cos(a)*d),Math.round(ey+Math.sin(a)*d)-2,1,5);g.fillStyle='#ffffff';g.fillRect(Math.round(ex+Math.cos(a)*d)-1,Math.round(ey+Math.sin(a)*d)-1,1,1)}}
    else if(e.k<.05){g.fillStyle='#05050a';g.fillRect(Math.round(ex-1+Math.cos(a)*d),Math.round(ey-2+Math.sin(a)*d*.5),2,4)}}
   // page flip while open
   if(e.st===2&&!RM){const fa=(M.now-e.flip);if(fa<.5){const c=Math.cos(fa/.5*Math.PI),w=Math.round(Math.abs(c)*17);g.fillStyle=PG[3];if(c>0)g.fillRect(X+22,y+4-Math.round(Math.sin(fa/.5*Math.PI)*3),w,22);else g.fillRect(X+22-w,y+4-Math.round(Math.sin(fa/.5*Math.PI)*3),w,22);g.fillStyle=PG[1];g.fillRect(c>0?X+22+w-1:X+22-w,y+4-Math.round(Math.sin(fa/.5*Math.PI)*3),1,22)}
    if(M.now-e.cast<.4)glowAt(g,X+22,y+14,18,'#ffffff',.5)}
   e.top=[e.x+22,e.y-lift+14]},
  upd(e,dt,t,R){if(e.st===1){e.k=Math.min(1,e.k+dt/.8);if(e.k>=1){e.st=2;e.last=M.now;castBook(R,e)}}
   else if(e.st===3){e.k=Math.max(0,e.k-dt/.6);if(e.k<=0){e.st=0;M.snd('thud',.8)}}
   else if(e.st===2){if(M.now-e.flip>2.2&&Math.random()<dt*.8){e.flip=M.now;M.snd('flip',1+Math.random()*.3)}if(!RM&&Math.random()<dt*6)M.emit(R,b.id==='HEX'?'voidp':b.id==='RIME'?'frost':b.id==='PYRE'?'ember':b.id==='ATLAS'?'star':'wisp',e.x+22+(Math.random()-.5)*30,e.top[1],1);
    if(M.now-e.last>14&&M.now>e.busy){e.st=3;M.snd('swish',.7)}}},
  click(e,R){if(M.now<e.busy)return;if(e.st===0||e.st===3){e.st=1;M.snd('open',1);M.snd('spell',.9);M.emit(R,'rune',e.x+22,e.y+10,10,{c:[b.gc,'#ffffff']})}else if(e.st===2){e.last=M.now;castBook(R,e)}}});
 return e}

// phoenix sprites (2 wing frames)
const PHX=M.frames(2,19,13,(p,i)=>{const F=['#3a0a04','#c82a10','#ff7a1a','#ffc040','#fff4b0'];
 p.poly([[0,7],[6,5],[12,5],[16,4],[18,6],[15,7],[12,9],[5,9]],F,{v:.62,bv:.3});p.px(17,5,'#ffffff');p.px(16,5,'#3a0a04');
 if(i===0)p.poly([[6,6],[3,0],[9,2],[12,6]],F,{v:.75,bv:.3});else p.poly([[6,7],[4,12],[10,10],[12,7]],F,{v:.5,bv:.3});
 p.line(0,7,0,11,F[3]);p.line(1,8,2,12,F[2])},'#2a0602');
const CONST=[{n:'THE DRAGON',p:[[0,20],[8,14],[16,16],[22,8],[30,4],[36,8],[32,12],[40,18],[50,16],[58,22]],l:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3],[2,7],[7,8],[8,9]]},
 {n:'THE SWORD',p:[[29,0],[29,8],[29,16],[29,24],[21,26],[37,26],[29,30],[29,36]],l:[[0,1],[1,2],[2,3],[4,3],[3,5],[3,6],[6,7]]},
 {n:'THE OWL',p:[[18,4],[24,10],[34,10],[40,4],[29,16],[20,22],[38,22],[24,34],[34,34],[29,12]],l:[[0,1],[1,9],[9,2],[2,3],[1,5],[2,6],[5,7],[6,8],[7,8],[9,4]]},
 {n:'THE CROWN',p:[[10,30],[48,30],[10,12],[19,22],[29,6],[39,22],[48,12]],l:[[0,1],[0,2],[2,3],[3,4],[4,5],[5,6],[6,1]]}];
function castBook(R,e){const b=e.b,[cx,cy]=e.top;e.cast=M.now;M.flash(R,b.gc,.08);
 if(b.id==='PYRE'){M.snd('whoosh',1.2);M.snd('roar',1.6);M.say(R,cx,cy-30,'RISE, PHOENIX!',1.2);e.busy=M.now+3.2;
  M.fx(R,3.2,(g,ox,oy,k,a)=>{const r=Math.min(1,a/.4),x=cx+Math.sin(a*2.4)*110*r,y=cy-30-Math.sin(a*4.8)*22-r*14,dx=Math.cos(a*2.4);
   if(k>.92){if(!e._bst){e._bst=1;M.emit(R,'ember',x,y,40,{c:['#fff4b0','#ffc040','#ff7020']});M.snd('boom',1.4)}return}e._bst=0;
   glowAt(g,x+ox,y+oy,16,'#ff7a1a',.45);const s=PHX[((a*10)|0)%2];g.drawImage(dx>=0?s.c:M.flipC(s),Math.round(x+ox-9),Math.round(y+oy-6));
   if(!RM&&Math.random()<.9)M.emit(R,'ember',x-dx*8,y,2,{c:['#fff4b0','#ffc040','#ff7020']})})}
 else if(b.id==='RIME'){M.snd('crack',1.2);M.snd('chime',.6);M.say(R,cx,cy-30,'FROST NOVA!',1.2);e.busy=M.now+3;const sp=[];for(let i=0;i<18;i++)sp.push([(H(i,4)-.5)*180,4+H(i,9)*16,H(i,2)*.4]);
  M.fx(R,3,(g,ox,oy,k,a)=>{const rr=Math.min(1,a/.6)*95;M.ringFx(g,cx+ox,FL+4+oy,rr*.6,'#bfeaff',2,1-k);M.ringFx(g,cx+ox,FL+4+oy,rr*.4,'#4a9ad0',1,.6*(1-k));
   for(const[dx,h,d]of sp){const u=clamp((a-d-Math.abs(dx)/300)/.3,0,1)*(k>.85?(1-k)/.15:1);const hh=Math.round(h*u);if(hh<1)continue;const X=Math.round(cx+dx+ox),Y=FL+2+oy;
    for(let j=0;j<hh;j++){const w=Math.max(0,Math.round((1-j/hh)*2.5));g.fillStyle=j>hh-2?'#ffffff':'#8ad8ff';g.fillRect(X-w,Y-j,1,1);g.fillStyle='#d8f6ff';g.fillRect(X-w+1,Y-j,Math.max(1,w),1);g.fillStyle='#4a9ad0';g.fillRect(X+1,Y-j,Math.max(0,w),1)}}
   if(Math.abs(k-.86)<.02&&!e._sh){e._sh=1;M.snd('crunch',1.4);for(const[dx,h]of sp)M.emit(R,'shard',cx+dx,FL-h/2,3,{c:['#ffffff','#bfeaff','#8ad8ff']})}if(k<.5)e._sh=0});
  if(!RM){let n=0;const sn=()=>{M.emit(R,'snow',cx+(Math.random()-.5)*240,10,6);M.emit(R,'frost',cx,cy,4);if(++n<14)setTimeout(sn,140)};sn()}}
 else if(b.id==='WATCHER'){M.snd('charge',.7);M.say(R,cx,cy-30,'IT SEES YOU.',1.2);e.busy=M.now+2.2;
  M.fx(R,2.1,(g,ox,oy,k,a)=>{const ex=cx+ox+8,ey=cy+oy+1;let tx=M.ptr?M.ptr[0]:ex+80,ty=M.ptr?M.ptr[1]:ey+40;if(Math.hypot(tx-ex,ty-ey)<20){tx=ex+60;ty=FL+oy}
   if(a<.5){glowAt(g,ex,ey,4+Math.round(a*16),'#7aff9a',.7);return}if(!e._z){e._z=1;M.snd('laser',.5);M.shake(R,.3,1)}
   const th=k>.85?0:1;for(let s=0;s<3;s++)M.line(g,ex,ey+s-1,tx,ty+s-1,s===1?'#ffffff':'#4ac06a');if(th)M.line(g,ex,ey,tx,ty,'#bfffc8',1);
   glowAt(g,tx,ty,10+Math.round(Math.sin(a*40)*2),'#7aff9a',.7);if(!RM&&Math.random()<.7)M.emit(R,'zap',tx-ox,ty-oy,3,{c:['#ffffff','#7aff9a','#bfffc8']});if(k>.97)e._z=0})}
 else if(b.id==='ATLAS'){const c=CONST[(e.ci=(e.ci??-1)+1)%CONST.length];M.snd('chime',1);M.say(R,cx,cy-36,c.n,1.6);e.busy=M.now+3.6;
  M.fx(R,4,(g,ox,oy,k,a)=>{const X=cx-29+ox,Y=26+oy,fade=k>.8?(1-k)/.2:1;
   c.l.forEach(([i,j],n)=>{const u=clamp((a-.6-n*.18)/.3,0,1);if(u<=0)return;const[x0,y0]=c.p[i],[x1,y1]=c.p[j];const xe=lerp(x0,x1,u),ye=lerp(y0,y1,u);const L=Math.max(1,Math.round(Math.hypot(xe-x0,ye-y0)));
    for(let q=0;q<=L;q++){const xx=Math.round(X+lerp(x0,xe,q/L)),yy=Math.round(Y+lerp(y0,ye,q/L));if(bay(xx,yy)<.7*fade){g.fillStyle='#a87020';g.fillRect(xx,yy,1,1)}}});
   c.p.forEach(([x,y],n)=>{const u=clamp((a-n*.07)/.2,0,1);if(u<=0||bay(x,y)>fade)return;const xx=Math.round(X+x),yy=Math.round(Y+y),tw=Math.sin(a*8+n)>.3;glowAt(g,xx,yy,5,'#ffe08a',.35*fade);g.fillStyle='#fff4c0';g.fillRect(xx-1,yy,3,1);g.fillRect(xx,yy-1,1,3);if(tw){g.fillStyle='#ffffff';g.fillRect(xx,yy,1,1)}})});
  for(let i=0;i<12;i++)setTimeout(()=>M.snd('tick',1.6+i*.05),600+i*160)}
 else if(b.id==='HEX'){M.snd('boo',.8);M.snd('rumble',.6);M.say(R,cx,cy-30,'THE SHADOWS STIR...',1.4);e.busy=M.now+3.6;const tn=[];for(let i=0;i<7;i++)tn.push([(i-3)*22+(H(i,5)-.5)*8,40+H(i,3)*40,H(i,7)*TAU]);
  M.fx(R,3.6,(g,ox,oy,k,a)=>{const gr=Math.min(1,a/.8)*(k>.8?(1-k)/.2:1);g.globalAlpha=.45*gr;g.fillStyle='#05020a';g.fillRect(0,0,M.BW,M.BH);g.globalAlpha=1;
   for(const[dx,h,ph]of tn){const L=Math.round(h*gr);for(let j=0;j<L;j++){const u=j/h,x=cx+dx+ox+Math.sin(a*3+ph+j*.12)*(4+u*10),y=FL+2+oy-j,w=Math.max(0,Math.round((1-u)*3));g.fillStyle='#140820';g.fillRect(Math.round(x)-w,y,w*2+1,1);if(w>0){g.fillStyle='#5a2e6a';g.fillRect(Math.round(x)-w,y,1,1)}if(j===L-1){g.fillStyle='#c060ff';g.fillRect(Math.round(x),y-1,1,1)}}}
   for(let i=0;i<6;i++){if(Math.sin(a*2+i*1.7)<.2)continue;const x=Math.round(cx+ox+(H(i,11)-.5)*260),y=Math.round(40+oy+H(i,12)*80);g.fillStyle='#ff2a4a';g.fillRect(x,y,2,1);g.fillRect(x+4,y,2,1)}
   if(!RM&&Math.random()<.5)M.emit(R,'voidp',cx+(Math.random()-.5)*150,FL-4,1)})}}

/* ---------- wands ---------- */
const WANDS=[{name:'WAND OF ARCANE MISSILES',sh:['#2a1a3a','#5e3a86'],tip:'#e070ff',gl:'#c060ff'},
 {name:'STORMCALLER WAND',sh:['#1a1a2a','#4a4a6a'],tip:'#bfeaff',gl:'#6ab0ff'},
 {name:'PRISM WAND',sh:['#e8e0d0','#ffffff'],tip:'#ffffff',gl:'#ffffff'},
 {name:'WAND OF TRANSMUTATION',sh:['#3a2014','#8a5a30'],tip:'#7aff7a',gl:'#5ae07a'},
 {name:'SUMMONER\'S STAFF',sh:['#2a2026','#bcae96'],tip:'#ffe08a',gl:'#ffd040'}];
const wandSpr=(w,up)=>M.mk(up?7:16,up?18:16,p=>{if(up){p.rect(3,4,1,13,w.sh[1]);p.rect(2,12,3,4,w.sh[0]);p.px(3,16,GOLD[3]);p.px(3,11,GOLD[3]);p.rect(2,1,3,3,[w.tip,'#ffffff']);p.px(3,0,'#ffffff')}
 else{p.line(2,13,12,3,w.sh[1]);p.line(3,14,12,4,w.sh[0]);p.line(1,14,4,11,w.sh[0]);p.px(4,11,GOLD[3]);p.rect(12,1,3,3,[w.tip,'#ffffff']);p.px(14,1,'#ffffff')}},'#05030a');
function wandEnt(R,x,w,i,cast){const D=wandSpr(w,0),U=wandSpr(w,1),yb=FL-24;
 return M.ent(R,{name:w.name,x:x-9,y:yb-30,w:18,h:22,box:1,z:yb+1,sw:-9,busy:0,tip:[x+4,yb-26],
  draw(g,X,Y,t,e,sel){const tt=RM?0:t,b=Math.round(Math.sin(tt*2+i*1.3)*2),up=M.now-e.sw<.5,s=up?U:D,x=X+(up?6:1),y=Y+b+(up?-2:2);
   glowAt(g,X+9,Y+24,7,w.gl,.25);M.aura(g,s,x,y,w.gl,1,t,.35);if(sel)g.drawImage(M.ring(s),x-1,y-1);g.drawImage(s.c,x,y);
   const tpx=up?x+3:x+13,tpy=up?y+2:y+2;e.tip=[tpx-X+e.x,tpy-Y+e.y];const tw=((tt*3+i)%2)<.3||M.now-e.sw<.6;if(tw){glowAt(g,tpx,tpy,6,w.gl,.6);g.fillStyle='#ffffff';g.fillRect(tpx-2,tpy,5,1);g.fillRect(tpx,tpy-2,1,5)}},
  upd(e,dt){if(!RM&&e.tip&&Math.random()<dt*2)M.emit(R,'star',e.tip[0],e.tip[1],1,{c:[w.gl,'#ffffff']})},
  click(e,R){if(M.now<e.busy)return;e.sw=M.now;M.snd('spell',1+i*.08);e.busy=M.now+(cast(e,R)||1)}})}
// floating candles
function candles(R){R.candles=[];const s=M.mk(4,9,p=>{p.rect(0,1,4,8,['#8a7a6a','#d8ccb0','#fff4e0'],{v:.6});p.px(1,0,'#fff4e0');p.px(2,2,'#ffffff')},'#2a2026');
 for(let i=0;i<16;i++){const x=40+i*68+H(i,3)*30,y=34+H(i,8)*54;const c=M.ent(R,{name:'FLOATING CANDLE',x,y,w:4,h:9,box:1,z:-2,noNav:1,lit:-9,blue:-99,
  draw(g,X,Y,t,e,sel){const tt=RM?0:t,b=Math.round(Math.sin(tt*1.2+i)*2),y=Y+b,bl=M.now-e.blue<6,hot=M.now-e.lit<.6;e.fy=e.y+b;glowAt(g,X+2,y-3,hot?14:9,bl?'#6ab0ff':'#ffb040',hot?.5:.28);if(sel)g.drawImage(M.ring(s),X-1,y-1);g.drawImage(s.c,X,y);
   K.flame(g,X+2,y,hot?2.4:1.4,hot?9:5,tt+i,bl?['#ffffff','#bfeaff','#6ab0ff','#2a4ad0']:undefined,i)},
  click(e,R){e.blue=M.now;e.lit=M.now;M.snd('whoosh',1.8);M.emit(R,'spark',e.x+2,e.y-3,6,{c:['#ffffff','#bfeaff','#6ab0ff']})}});R.candles.push(c)}}
// flock of flapping books
function flock(R){const F=[0,1,2].map(n=>M.frames(3,14,9,(p,f)=>{const cv=[SPN[n][0],SPN[n][1],SPN[n][2],'#c87a4a'],a=[3,1,-2][f];
  p.poly([[7,6],[0,6-a],[0,8-a],[7,8]],cv,{v:.55});p.poly([[7,6],[13,6-a],[13,8-a],[7,8]],cv,{v:.45});p.poly([[7,6],[1,5-a],[7,5]],PG,{v:.7});p.poly([[7,6],[12,5-a],[7,5]],PG,{v:.6});p.rect(6,5,2,4,cv[0])},'#05030a'));
 for(let i=0;i<7;i++){const fr=F[i%3];M.ent(R,{name:'FLAPPING BOOK',x:0,y:0,w:14,h:9,box:1,z:-1,noNav:1,lp:-9,ph:H(i,5)*TAU,sp:.05+H(i,6)*.04,
  draw(g,X,Y,t,e,sel){const s=fr[e.f];if(sel)g.drawImage(M.ring(s),X-1,Y-1);g.drawImage(e.dir<0?M.flipC(s):s.c,X,Y)},
  upd(e,dt,t){const tt=RM?0:t,lp=M.now-e.lp;const a=tt*e.sp+e.ph;e.x=Math.round(W/2+Math.sin(a)*(W/2-40));e.dir=Math.cos(a)>=0?1:-1;e.y=Math.round(40+Math.sin(a*3+i)*14+(lp<1?-Math.sin(lp*TAU)*14:0));if(lp<1)e.x+=Math.round(Math.sin(lp*TAU)*10*e.dir);e.f=RM?0:((tt*(lp<1?20:8)+i)|0)%3},
  click(e,R){e.lp=M.now;M.snd('flip',1.3);M.snd('swish',1.5);const x0=e.x+7,y0=e.y+6;M.fx(R,2.6,(g,ox,oy,k,a)=>{const x=Math.round(x0+ox+Math.sin(a*4)*8),y=Math.round(y0+oy+a*40);g.fillStyle=PG[3];g.fillRect(x-2,y,5,4);g.fillStyle=PG[1];g.fillRect(x-1,y+1,3,1);g.fillRect(x-1,y+3,2,1)})}})}}

M.K.ext('books',{top:'#06041a',bot:'#06041a',start:560,
 bg(p,R){
  for(let y=0;y<FL;y++)for(let x=0;x<W;x++)p.px(x,y,rp(IND,.2+(fbm(x/50,y/30)-.5)*.3+y/FL*.25,x,y));
  // vaulted upper wall
  K.wall(p,0,0,W,22,PAL.slate,{bh:8,bw:20,sd:5});
  // bookshelves: rows of spines
  for(let sx=0;sx<W;sx+=110){const x0=sx+12,x1=sx+98;p.rect(x0-3,30,x1-x0+6,FL-34,SHV,{v:.3,bv:.15});
   for(let y=36;y<FL-14;y+=17){p.rect(x0-3,y+13,x1-x0+6,3,SHV,{v:.6,bv:.25});let x=x0;while(x<x1-2){const w=2+((H(x,y)*3)|0),h=9+((H(x,y+1)*4)|0),c=SPD[(H(x,y+2)*6)|0];if(H(x,y+5)>.93){x+=4;continue}
     const lean=H(x,y+7)>.95;for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++){const v=xx===0?2:xx===w-1?0:1;p.px(x+xx+(lean&&yy<3?1:0),y+13-h+yy,c[yy===2||yy===h-3?Math.min(2,v+1):v])}if(H(x,y+3)>.6)p.px(x+(w>>1),y+13-h+3,GOLD[1]);x+=w}}
   p.rect(x0-4,28,x1-x0+8,4,SHV,{v:.65,bv:.3})}
  // gothic pillars
  for(const x of[6,116,226,336,446,654,764,874,984,1094])K.pillar(p,x,24,FL,12,PAL.slate,{cap:6,base:7,drum:20,rune:'#6a5aa8',sd:x});
  // rose window
  const rx=550,ry=52;for(let y=ry-38;y<ry+38;y++)for(let x=rx-40;x<rx+40;x++){const d=Math.hypot(x-rx,(y-ry)*1.05)*1.2;if(d>46)continue;if(d>42){p.px(x,y,rp(PAL.slate,.5+(x<rx?.2:-.1),x,y));continue}
   const a=Math.atan2(y-ry,x-rx),seg=Math.floor((a+Math.PI)/(TAU/12)),edge=Math.abs(((a+Math.PI)/(TAU/12))%1-.5)>.44||Math.abs(d-26)<1||Math.abs(d-12)<1;
   if(edge){p.px(x,y,PAL.slate[1]);continue}const pal=d<12?['#3a2a08','#a87020','#ffe08a']:d<26?(seg%2?['#1a0a3a','#5a2aa8','#a070ff']:['#0a1a3a','#2a5aa8','#6ab0ff']):(seg%3===0?['#2a0a20','#8a2a6a','#e070c0']:seg%3===1?['#0a1a3a','#2a5aa8','#6ab0ff']:['#1a0a3a','#5a2aa8','#a070ff']);
   p.px(x,y,rp(pal,.35+(x-rx)/-120+(y-ry)/-140+(fbm(x/6,y/6)-.5)*.3,x,y))}
  // floor + rune carpet
  K.floor(p,FL,M.RH,PAL.slate,{v:.3,tw:24});
  for(let x=0;x<W;x++)for(let y=FL+6;y<FL+16;y++){const e=y===FL+6||y===FL+15;p.px(x,y,e?GOLD[2]:y===FL+7||y===FL+14?'#2a0a2a':rp(['#2a0a3a','#4a1a5a','#6a2a7a'],.4+(fbm(x/4,y/3)-.5)*.3,x,y))}
  for(let x=4;x<W;x+=14)K.glyph(p,x,FL+9,x*3+1,'#c8a040');
  // lecterns
  for(const x of BX){p.poly([[x-14,FL-34],[x+14,FL-38],[x+12,FL-32],[x-12,FL-28]],SHV,{v:.7,bv:.3});p.rect(x-3,FL-30,6,26,SHV,{v:.5,bv:.25});p.rect(x-10,FL-5,20,5,SHV,{v:.5,bv:.25});p.rect(x-8,FL-18,16,2,GOLD,{v:.6});K.glyph(p,x-2,FL-26,x,'#a87020')}
  // wand plinths
  for(const x of WX){p.rect(x-6,FL-20,12,20,PAL.slate,{v:.55,bv:.25,tex:tx(.2,3)});p.rect(x-8,FL-22,16,3,PAL.slate,{v:.7,bv:.25});p.rect(x-8,FL-3,16,3,PAL.slate,{v:.5});K.glyph(p,x-2,FL-14,x+7,'#8a6ad0')}
  // prism stand, tea table, summoning circle base
  p.rect(694,FL-40,4,40,PAL.slate,{v:.5,bv:.2});p.rect(688,FL-4,16,4,PAL.slate,{v:.5});
  p.rect(874,FL-16,30,3,SHV,{v:.7,bv:.3});p.rect(877,FL-13,2,13,SHV,{v:.4});p.rect(899,FL-13,2,13,SHV,{v:.4})},
 init(R){
  candles(R);flock(R);
  R.books=BOOKS.map((b,i)=>bookEnt(R,BX[i],b,i));
  const prism=[700,FL-50];
  // ARCANE MISSILES
  wandEnt(R,WX[0],WANDS[0],0,(e,R)=>{M.say(R,e.x+9,e.y-6,'ARCANE MISSILES!',1);const[sx,sy]=e.tip;const tg=R.ents.filter(q=>q.name==='FLAPPING BOOK'||q.name==='FLOATING CANDLE').sort((a,b)=>Math.abs(a.x-sx)-Math.abs(b.x-sx)).slice(0,5);
   tg.forEach((q,n)=>{const cx=sx+(Math.random()-.5)*80,cy=sy-50-Math.random()*40,d0=n*.12;setTimeout(()=>M.snd('zap',1.4+n*.1),d0*1000);
    M.fx(R,1+d0,(g,ox,oy,k,a)=>{const u=clamp((a-d0)/.8,0,1);if(u<=0)return;const tx=q.x+q.w/2,ty=(q.fy??q.y)+q.h/2;if(u>=1){if(!q._hit||M.now-q._hit>1){q._hit=M.now;M.emit(R,'voidp',tx,ty,8,{c:['#ffffff','#e070ff','#a050f0']});M.snd('pop',1.2);if(q.lit!=null)q.lit=M.now}return}
     for(let s=0;s<5;s++){const v=Math.max(0,u-s*.04),i1=1-v,x=i1*i1*sx+2*i1*v*cx+v*v*tx,y=i1*i1*sy+2*i1*v*cy+v*v*ty;g.fillStyle=s===0?'#ffffff':s<3?'#e070ff':'#7a2ab0';g.fillRect(Math.round(x+ox)-(s===0?1:0),Math.round(y+oy)-(s===0?1:0),s===0?3:1,s===0?3:1)}
     const x=i1x(sx,cx,tx,u),y=i1x(sy,cy,ty,u);glowAt(g,x+ox,y+oy,6,'#c060ff',.6)})});return 1.4});
  // CHAIN LIGHTNING across the candles
  wandEnt(R,WX[1],WANDS[1],1,(e,R)=>{M.say(R,e.x+9,e.y-6,'CHAIN LIGHTNING!',1);M.snd('zap',.7);M.shake(R,.3,1);const[sx,sy]=e.tip;let pts=[[sx,sy]],used=new Set();
   for(let n=0;n<6;n++){const[lx,ly]=pts[pts.length-1];let best=null,bd=1e9;for(const c of R.candles){if(used.has(c))continue;const d=Math.hypot(c.x-lx,(c.fy??c.y)-ly);if(d<bd&&c.x>=lx-30){bd=d;best=c}}if(!best)break;used.add(best);pts.push([best.x+2,(best.fy??best.y)-4]);const b=best;setTimeout(()=>{b.lit=M.now;b.blue=M.now;M.snd('zap',1.2+n*.08);M.emit(R,'bolt',b.x+2,b.y-3,6)},n*110)}
   M.fx(R,1.1,(g,ox,oy,k,a)=>{const n=Math.min(pts.length-1,Math.floor(a/.11)+1);if(k>.8&&((a*30)|0)%2)return;for(let i=0;i<n;i++)M.bolt(g,pts[i][0]+ox,pts[i][1]+oy,pts[i+1][0]+ox,pts[i+1][1]+oy,['#ffffff','#6ab0ff'],6,5);glowAt(g,pts[n][0]+ox,pts[n][1]+oy,8,'#bfeaff',.6)});M.flash(R,'#bfeaff',.06);return 1.2});
  // PRISM BEAM
  const PR=M.mk(13,15,p=>{p.poly([[6,0],[12,14],[0,14]],['#3a4a6a','#8aa0c8','#d8e8ff','#ffffff'],{v:.6,bv:.35});p.line(6,2,3,12,'#ffffff')},'#0a0a20');
  R.prism=M.ent(R,{name:'FLOATING PRISM',x:prism[0]-6,y:prism[1]-8,w:13,h:15,box:1,z:FL-20,sp:-9,
   draw(g,X,Y,t,e,sel){const tt=RM?0:t,b=Math.round(Math.sin(tt*1.5)*2);glowAt(g,X+6,Y+8+b,10,'#d8e8ff',.25);if(sel)g.drawImage(M.ring(PR),X-1,Y-1+b);g.drawImage(PR.c,X,Y+b);
    const ph=((tt*.6)%1);g.fillStyle=['#ff4a4a','#ffd040','#7aff7a','#4ad0ff','#a070ff'][(tt*4|0)%5];g.fillRect(X+6,Y+12+b,1,1)},
   click(e,R){M.snd('chime',1.4);M.emit(R,'gem',e.x+6,e.y+8,10);M.say(R,e.x+6,e.y-6,'*HUMS IN 7 COLOURS*',1)}});
  wandEnt(R,WX[2],WANDS[2],2,(e,R)=>{M.say(R,e.x+9,e.y-6,'PRISMATIC RAY!',1);M.snd('laser',1);M.snd('chime',.8);const[sx,sy]=e.tip,px=prism[0],py=prism[1]+2;
   const RB=['#ff4a4a','#ff9a2a','#ffe050','#7aff7a','#4ad0ff','#6a6aff','#c070ff'];
   M.fx(R,2,(g,ox,oy,k,a)=>{const u=Math.min(1,a/.25),f=k>.8?(1-k)/.2:1;const ex=lerp(sx,px,u),ey=lerp(sy,py,u);M.line(g,sx+ox,sy+oy,ex+ox,ey+oy,'#ffffff',1);if(u<1)return;glowAt(g,px+ox,py+oy,14,'#ffffff',.7*f);
    RB.forEach((c,i)=>{const ang=-.55+i*.17,L=Math.min(1,(a-.25)/.3)*260;const x1=px+Math.cos(ang)*L,y1=py+Math.sin(ang)*L*.55;for(let s=0;s<2;s++)M.line(g,px+ox,py+oy+s,x1+ox,y1+oy+s,c);if(L>200&&f>.3)glowAt(g,x1+ox,y1+oy,8,c,.45*f)})});setTimeout(()=>M.emit(R,'gem',px,py,16),300);return 2.1});
  // TRANSMUTATION: teacup <-> frog
  const CUP=M.mk(12,9,p=>{p.rect(1,2,8,6,['#8a7a90','#e8e0f0','#ffffff'],{v:.6,bv:.25});p.rect(9,3,2,3,['#8a7a90','#d8d0e0']);p.rect(0,8,11,1,'#b8a8c8');p.rect(2,2,6,1,'#7a4a2a');p.px(4,4,'#ff8ac0');p.px(5,5,'#ff8ac0')},'#1a1020');
  const FROG=M.frames(2,13,11,(p,f)=>{const G=['#0a2a0a','#1e5a1e','#3a9a2a','#7ae05a','#c8ff9a'];if(f===0){p.ell(6,7,5.5,3.5,G,{b:.1});p.ell(3,3,2,2,G,{b:.1});p.ell(9,3,2,2,G,{b:.1});p.rect(1,9,3,2,G[2]);p.rect(9,9,3,2,G[2])}else{p.ell(6,5,4.5,4,G,{b:.1});p.ell(3,2,2,2,G,{b:.1});p.ell(9,2,2,2,G,{b:.1});p.line(1,8,0,10,G[2]);p.line(11,8,12,10,G[2])}
   p.px(3,f?2:3,'#05050a');p.px(9,f?2:3,'#05050a');p.px(2,f?1:2,'#ffffff');p.px(8,f?1:2,'#ffffff');p.rect(4,f?6:8,5,1,'#1e5a1e');p.px(7,f?3:4,'#ffd0e0')},'#05140a');
  R.cup=M.ent(R,{name:e=>e.frog?'FORMER TEACUP':'ENCHANTED TEACUP',x:883,y:FL-27,w:13,h:11,box:1,z:FL-14,frog:0,hop:-9,
   draw(g,X,Y,t,e,sel){const tt=RM?0:t;if(e.frog){const ha=M.now-e.hop,hy=ha<.6?Math.round(Math.sin(ha/.6*Math.PI)*12):0,s=FROG[hy>0?1:0];if(sel)g.drawImage(M.ring(s),X-1,Y-hy);g.drawImage(s.c,X,Y-hy+0)}
    else{if(sel)g.drawImage(M.ring(CUP),X-1,Y+1);g.drawImage(CUP.c,X,Y+2);if(!RM&&((tt*2)|0)%2)M.emit(R,'steam',e.x+5,e.y+2,1,{v:1})}},
   upd(e,dt){if(e.frog&&!RM&&M.now-e.hop>3&&Math.random()<dt*.5){e.hop=M.now;M.snd('boing',1.5)}},
   click(e,R){if(e.frog){e.hop=M.now;M.snd('boing',1.2);M.say(R,e.x+6,e.y-14,'RIBBIT.',.8)}else{M.snd('ding',1.6);M.say(R,e.x+6,e.y-10,'EARL GREY, ENCHANTED.',1)}}});
  wandEnt(R,WX[3],WANDS[3],3,(e,R)=>{const c=R.cup;M.snd('spell',1.2);M.say(R,e.x+9,e.y-6,c.frog?'FROGUS... TEACUPUS!':'TEACUPUS FROGIFY!',1.2);const[sx,sy]=e.tip;
   M.fx(R,.6,(g,ox,oy,k)=>{const x=lerp(sx,c.x+6,k),y=lerp(sy,c.y+4,k)-Math.sin(k*Math.PI)*20;glowAt(g,x+ox,y+oy,5,'#7aff7a',.7);g.fillStyle='#ffffff';g.fillRect(Math.round(x+ox),Math.round(y+oy),1,1);if(!RM)M.emit(R,'wisp',x,y,1)});
   setTimeout(()=>{c.frog=!c.frog;c.hop=M.now;M.snd('pop',.8);M.snd('boing',1.3);M.emit(R,'smoke',c.x+6,c.y+4,14,{rx:10,ry:6});M.emit(R,'star',c.x+6,c.y+4,10,{c:['#7aff7a','#ffffff']})},600);return 1.2});
  // SUMMONING: owl familiar
  const OWL=M.frames(4,15,14,(p,f)=>{const B=['#1a1008','#4a3018','#8a6030','#c89a58','#f0d8a0'];if(f<2){p.ell(7,8,5,5.5,B,{b:.1});p.ell(7,10,3,3,['#8a7050','#e8d8b0','#fff4e0'],{b:.1});p.poly([[2,3],[4,1],[5,4]],B,{v:.5});p.poly([[12,3],[10,1],[9,4]],B,{v:.5});
    for(const ex of[5,9]){p.ell(ex,6,2,2,['#ffe050','#fff4a0'],{});p.px(ex,6,f?'#ffe050':'#05050a')}p.px(7,8,'#e0a020');p.rect(5,13,2,1,'#e0a020');p.rect(8,13,2,1,'#e0a020')}
   else{p.ell(7,7,3.5,4,B,{b:.1});const a=f===2?-4:3;p.poly([[4,6],[0,6+a],[1,8+a],[5,9]],B,{v:.6});p.poly([[10,6],[14,6+a],[13,8+a],[9,9]],B,{v:.6});p.px(6,5,'#ffe050');p.px(8,5,'#ffe050');p.px(7,7,'#e0a020')}},'#0a0604');
  const owl=R.owl=M.ent(R,{name:'OWL FAMILIAR',x:1010,y:FL-14,w:15,h:14,box:1,z:FL+3,vis:0,st:0,t1:0,path:null,turn:-9,
   draw(g,X,Y,t,e,sel){if(!e.vis)return;const tt=RM?0:t,fly=e.st===1,s=fly?OWL[2+(((tt*12)|0)%2)]:OWL[((tt*.5)%5)<.15?1:0];if(sel)g.drawImage(M.ring(s),X-1,Y-1);const tn=M.now-e.turn<.8;
    g.drawImage(tn&&((M.now-e.turn)*10|0)%2?M.flipC(s):s.c,X,Y);if(e.glow>M.now)glowAt(g,X+7,Y+7,12,'#ffd040',.4)},
   upd(e,dt,t,R){if(e.st===1){e.u+=dt/e.d;const u=Math.min(1,e.u),[a,b,c]=e.path;e.x=Math.round(i1x(a[0],b[0],c[0],u)-7);e.y=Math.round(i1x(a[1],b[1],c[1],u)-7);if(u>=1){e.st=0;M.snd('woof',2)}}
    else if(e.vis&&!RM&&Math.random()<dt*.06){const tgt=[[40+Math.random()*1000,26],[1010,FL-7]][Math.random()<.6?0:1];flyTo(e,tgt)}},
   click(e,R){if(!e.vis)return;e.turn=M.now;M.snd('boo',1.8);M.say(R,e.x+7,e.y-6,['HOO.','HOO HOO?','WHO SUMMONED ME?','I RETURN AT DAWN.'][(Math.random()*4)|0],1);if(e.st===0&&Math.random()<.5)flyTo(e,[e.x<500?e.x+200:e.x-200,30+Math.random()*30])}});
  function flyTo(e,[tx,ty]){const a=[e.x+7,e.y+7],c=[tx,ty];e.path=[a,[(a[0]+c[0])/2,Math.min(a[1],c[1])-30],c];e.u=0;e.d=Math.max(1,Math.hypot(c[0]-a[0],c[1]-a[1])/90);e.st=1;M.snd('whoosh',1.6)}
  M.ent(R,{name:'SUMMONING CIRCLE',x:990,y:FL-2,w:40,h:10,box:1,z:FL-1,on:-9,
   draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.on,live=a<3.5,dr=live?Math.min(1,a/1.2):1,b=live?1:.35+.1*Math.sin(tt*2);const cx=X+20,cy=Y+5;
    const n=60;for(let i=0;i<n*dr;i++){const an=i/n*TAU+tt*.3;g.fillStyle=live?'#ffe08a':'#6a5a30';if(bay(i,3)<b+.2)g.fillRect(Math.round(cx+Math.cos(an)*19),Math.round(cy+Math.sin(an)*5),1,1);if(i%2===0)g.fillRect(Math.round(cx+Math.cos(-an)*13),Math.round(cy+Math.sin(-an)*3.4),1,1)}
    for(let i=0;i<5;i++){const an=i/5*TAU-Math.PI/2+tt*.3,bn=((i+2)%5)/5*TAU-Math.PI/2+tt*.3;if(i/5<dr)M.line(g,cx+Math.cos(an)*13,cy+Math.sin(an)*3.4,cx+Math.cos(bn)*13,cy+Math.sin(bn)*3.4,live?'#ffd040':'#4a3e20')}
    if(live&&a>1.2&&a<3){const h=Math.round(Math.min(1,(a-1.2)/.3)*80*(a>2.6?(3-a)/.4:1));for(let y=0;y<h;y++){const w=Math.round(9+Math.sin(y*.3+tt*20)*2);for(let x=-w;x<=w;x++)if(bay(cx+x,cy-y+((tt*60)|0))<(1-Math.abs(x)/w)*.7){g.fillStyle=Math.abs(x)<3?'#ffffff':'#ffe08a';g.fillRect(cx+x,cy-y,1,1)}}}
    if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,e.w,1)}},
   click(e,R){summon(R,e)}});
  function summon(R,c){if(M.now-c.on<3.5)return;c.on=M.now;M.snd('gong',1.2);M.snd('spell',.7);setTimeout(()=>{M.snd('power',1.2);M.flash(R,'#ffe08a',.1);M.emit(R,'holy',1010,FL-20,24,{rx:20,ry:30});owl.vis=1;owl.st=0;owl.x=1003;owl.y=FL-20;owl.glow=M.now+1.5;M.say(R,1010,FL-50,owl.vis?'A FAMILIAR ANSWERS!':'',1.2)},1300)}
  R.circle=R.ents[R.ents.length-1];
  wandEnt(R,WX[4],WANDS[4],4,(e,R)=>{M.say(R,e.x+9,e.y-6,'I SUMMON THEE!',1);const[sx,sy]=e.tip;M.fx(R,.8,(g,ox,oy,k)=>{for(let i=0;i<6;i++){const u=clamp(k*1.4-i*.08,0,1),x=lerp(sx,1010,u),y=lerp(sy,FL,u)-Math.sin(u*Math.PI)*30;g.fillStyle=i?'#ffd040':'#ffffff';g.fillRect(Math.round(x+ox),Math.round(y+oy),1,1)}});setTimeout(()=>summon(R,R.circle),500);return 3.6});
  // cauldron
  const CAU=M.mk(30,20,p=>{p.ell(15,10,14,9,PAL.iron,{b:-.1,spec:'#b0b0bc'});p.rect(2,2,26,3,PAL.iron,{v:.65,bv:.3});p.rect(5,17,3,3,PAL.iron[1]);p.rect(22,17,3,3,PAL.iron[1])},'#05050a');
  const CC=[['#0a3a0a','#3ac02a','#9aff5a','#e0ffc0'],['#2a0a3a','#a03ae0','#e07aff','#ffd0ff'],['#3a1a04','#e07010','#ffc040','#fff4b0'],['#0a1a3a','#2a8ae0','#8ae0ff','#e0fcff']];
  M.ent(R,{name:'BUBBLING CAULDRON',x:46,y:FL-22,w:30,h:22,box:1,z:FL,ci:0,b:-9,
   draw(g,X,Y,t,e,sel){const tt=RM?0:t,c=CC[e.ci];for(let i=0;i<3;i++)K.flame(g,X+8+i*7,Y+22,2.5,6,tt+i,undefined,i);glowAt(g,X+15,Y+2,16,c[1],.35);if(sel)g.drawImage(M.ring(CAU),X-1,Y+1);g.drawImage(CAU.c,X,Y+2);
    for(let x=4;x<26;x++){const h=Math.round(Math.sin(x*.7+tt*5)*1.2);g.fillStyle=x%5===0?c[3]:c[2];g.fillRect(X+x,Y+3+h,1,1);g.fillStyle=c[1];g.fillRect(X+x,Y+4+h,1,2)}
    if(M.now-e.b<1.2){const k=(M.now-e.b)/1.2,r=Math.round(3+k*9);if(k<.8){g.fillStyle=c[2];for(let a=0;a<TAU;a+=.25)g.fillRect(Math.round(X+15+Math.cos(a)*r),Math.round(Y+2-r+Math.sin(a)*r),1,1);g.fillStyle='#ffffff';g.fillRect(X+15-r+2,Y+2-r-1,1,1)}}},
   upd(e,dt){if(!RM&&Math.random()<dt*5)M.emit(R,'bubble',e.x+6+Math.random()*18,e.y+2,1,{c:[CC[e.ci][3]]})},
   click(e,R){e.ci=(e.ci+1)%CC.length;e.b=M.now;M.snd('bubble',1);setTimeout(()=>{M.snd('pop',.8);M.emit(R,'slime',e.x+15,e.y-10,14,{c:CC[e.ci].slice(1)})},900);M.say(R,e.x+15,e.y-14,['DOUBLE, DOUBLE!','TOIL AND TROUBLE!','EYE OF NEWT? NO, PIXEL OF NEWT.','SMELLS LIKE PURPLE.'][e.ci],1)}});
  // astral hourglass
  M.ent(R,{name:'ASTRAL HOURGLASS',x:1060,y:FL-26,w:12,h:22,box:1,z:FL,fl:-9,up:0,
   draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.fl,rot=a<.6?a/.6:1;const k=((tt*.05)%1),fill=e.up?1-k:k;const sq=Math.max(1,Math.round(Math.abs(Math.cos(rot*Math.PI))*12));const x0=X+6-(sq>>1);
    g.fillStyle='#a87020';g.fillRect(x0,Y,sq,2);g.fillRect(x0,Y+20,sq,2);if(sq>6){g.fillStyle='#1a1446';for(let y=2;y<20;y++){const w=Math.round(Math.abs(y-11)/9*4)+1;g.fillRect(X+6-w,Y+y,w*2,1)}
     g.fillStyle='#ffe08a';const top=Math.round((1-fill)*8),bot=Math.round(fill*8);for(let y=0;y<top;y++){const yy=Y+11-y-1,w=Math.round((y+1)/9*4);g.fillRect(X+6-w,yy,w*2,1)}for(let y=0;y<bot;y++){const yy=Y+19-y,w=Math.round((9-y)/9*4)+1;g.fillRect(X+6-w,yy,w*2,1)}if(((tt*10)|0)%2){g.fillStyle='#ffffff';g.fillRect(X+6,Y+11,1,8-bot)}}
    glowAt(g,X+6,Y+11,8,'#ffe08a',.2);if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,12,1)}},
   click(e,R){e.fl=M.now;e.up=!e.up;M.snd('clack',1);M.snd('chime',.5);M.say(R,e.x+6,e.y-6,e.up?'TIME FLOWS BACKWARD.':'TIME FLOWS ON.',1);M.emit(R,'star',e.x+6,e.y+10,10,{c:['#ffe08a','#ffffff']})}});
  K.motes(R,46,0,W,24,FL-6,['#a070ff','#ffe08a','#6ab0ff'],{big:false});
  R.pages=[];for(let i=0;i<10;i++)R.pages.push({x:H(i,1)*W,y:H(i,2)*FL,s:4+H(i,3)*6,p:H(i,4)*TAU})},
 back(R,g,ox,oy,t){const tt=RM?0:t;
  // light through the rose window
  
  if(!RM)for(const q of R.pages){const y=(q.y+tt*q.s)%(FL+10),x=q.x+Math.sin(tt*.8+q.p)*12;const X=Math.round(x+ox),Y=Math.round(y+oy);if(X<-6||X>M.BW)continue;const fl=Math.sin(tt*3+q.p)>0;g.fillStyle='#c8b490';g.fillRect(X,Y,fl?4:2,3);g.fillStyle='#8a7858';g.fillRect(X+(fl?1:0),Y+1,fl?2:1,1)}}
});
function i1x(a,b,c,u){const i=1-u;return i*i*a+2*i*u*b+u*u*c}
})();
