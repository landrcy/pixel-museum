/* DRAGON HOARD and CRYSTAL CAVERN: two fantasy vaults deep under the temple. */
(()=>{'use strict';const{rp,ramp,bay,H,vn,fbm,RM,TAU,clamp,lerp,mix}=M;const K=M.K,PAL=K.PAL;
const glowAt=(g,x,y,r,c,d=.6)=>M.glow(g,Math.round(x),Math.round(y),r,c,d);
const tx=(a=.16,s=3)=>(x,y)=>(fbm(x/s,y/s)-.5)*a;
const DC=new Map();const disc=(r,pal,ol='#0a0202')=>{const k=r+pal[2]+ol;let s=DC.get(k);if(!s){s=M.mk(r*2+3,r*2+3,p=>p.ell(r+1,r+1,r+.5,r+.5,pal,{b:.12}),ol);DC.set(k,s)}return s};
const bez=(a,b,c,u)=>{const i=1-u;return[i*i*a[0]+2*i*u*b[0]+u*u*c[0],i*i*a[1]+2*i*u*b[1]+u*u*c[1]]};

/* ======================= DRAGON HOARD ======================= */
{const W=1000,FL=170,GOLD=PAL.gold,
 SC=['#1a0404','#4a0e0a','#8a1e14','#c83a1e','#ff7a3a'],BEL=['#3a2008','#8a5a10','#d8a030','#ffe08a','#fff4c0'],HRN=PAL.bone,
 ROCK=['#0a0404','#1a0a08','#2a140e','#3e2016','#583222'],LAVA=['#5a0a04','#c02a08','#ff7a1a','#ffd060','#fff4b0'];
 const DX=500;
 // dragon parts
 const BODY=M.mk(96,40,p=>{p.ell(48,24,44,15,SC,{b:.05,tex:tx(.12,2)});p.ell(50,32,34,6,BEL,{b:.1});for(let x=14;x<84;x+=3)p.px(x,30,BEL[1]);
  for(let i=0;i<10;i++){const x=12+i*8,h=4+Math.round(Math.sin(i/9*Math.PI)*4);p.poly([[x,12-(i>1&&i<8?1:0)],[x+3,12-h],[x+6,12]],HRN,{v:.6})}
  for(let y=14;y<34;y+=3)for(let x=8+(y%2)*2;x<90;x+=5)if(H(x,y)>.4)p.px(x,y,SC[1]);
  p.ell(78,32,7,5,SC,{b:.05});for(const c of[73,77,81])p.poly([[c,35],[c+1,38],[c+2,35]],HRN,{v:.7})},'#0a0202');
 const WFOLD=M.mk(46,26,p=>{p.poly([[44,24],[30,2],[22,6],[2,18],[20,20]],SC,{v:.45,bv:.25});p.line(30,2,44,24,SC[4]);p.line(30,3,14,19,SC[1]);p.line(30,3,24,20,SC[1]);p.px(30,1,HRN[4])},'#0a0202');
 const WSPREAD=M.mk(70,58,p=>{p.poly([[66,56],[44,4],[34,0],[2,24],[10,30],[18,36],[30,40],[40,48]],SC,{v:.42,bv:.25});for(const[a,b]of[[2,24],[10,30],[18,36],[30,40]])p.line(44,4,a,b,SC[0]);p.line(44,4,66,56,SC[4]);p.px(34,0,HRN[4]);p.px(44,3,HRN[4])},'#0a0202');
 const HEAD=M.mk(34,20,p=>{p.poly([[2,6],[12,2],[22,4],[33,9],[33,13],[20,14],[4,15]],SC,{v:.6,bv:.3,tex:tx(.1,2)});p.poly([[8,4],[0,0],[3,0],[12,3]],HRN,{v:.6});p.poly([[12,3],[6,-1],[9,-1],[15,3]],HRN,{v:.7});
  p.rect(30,9,2,1,'#0a0202');for(const x of[20,24,28])p.poly([[x,14],[x+1,16],[x+2,14]],HRN,{v:.8});p.rect(8,13,14,1,SC[1]);for(let x=4;x<30;x+=4)p.px(x,7,SC[4])},'#0a0202');
 const JAW=M.mk(28,8,p=>{p.poly([[0,0],[26,1],[27,4],[4,6]],SC,{v:.4,bv:.2});for(const x of[14,18,22])p.poly([[x,1],[x+1,-1],[x+2,1]],HRN,{v:.8});p.rect(4,1,18,1,'#ff5a5a')},'#0a0202');
 const neckPal=SC,tailPal=SC;
 M.K.ext('dragon',{top:'#0a0302',bot:'#0a0302',start:500,
  bg(p,R){for(let y=0;y<FL;y++)for(let x=0;x<W;x++){const n=fbm(x/26,y/18);let v=.25+(n-.5)*.5+y/FL*.15;p.px(x,y,rp(ROCK,v,x,y))}
   // rock ridges & lava cracks
   // layered rock strata and dark cavern columns
   for(let y=0;y<FL;y+=1)for(let x=0;x<W;x++){const st=Math.sin(x*.012+y*.09+vn(x/60,y/20)*3);if(st>.92)p.px(x,y,ROCK[3]);else if(st<-.95)p.px(x,y,ROCK[0])}
   for(const cx of[60,280,720,940]){const w=40+H(cx,1)*20;for(let y=0;y<FL;y++){const ww=w*(.6+.4*Math.abs(y-80)/80)+Math.sin(y*.2+cx)*3;for(let x=Math.round(cx-ww/2);x<cx+ww/2;x++){const nx=(x-cx)/(ww/2);p.px(x,y,rp(ROCK,.12-nx*.12+(fbm(x/6,y/6)-.5)*.2,x,y))}}}
   // glowing lava fissures
   for(let i=0;i<9;i++){let x=60+H(i,1)*(W-120),y=30+H(i,2)*100;const L=30+H(i,3)*50;for(let j=0;j<L;j++){x+=1;y+=Math.round((H(i,j)-.5)*2.2);const w=j<4||j>L-4?0:1;p.px(Math.round(x),y,LAVA[2]);if(w)p.px(Math.round(x),y+1,LAVA[1]);if(j%9===4)p.px(Math.round(x),y,LAVA[3])}}
   // the great hoard mountain behind the dragon
   for(let y=FL-70;y<FL;y++)for(let x=280;x<720;x++){const dx=(x-500)/220,top=FL-70+Math.pow(Math.abs(dx),1.6)*70+Math.sin(x*.3)*1.5;if(y<top)continue;const v=.35+(-dx*.2)+(y-top<2?.35:0)+(H(x,y)-.5)*.3;let c=rp(GOLD,v-.1,x,y);const h=H(x*3,y*7);if(h>.99)c=['#ff3a5a','#3ad0ff','#5aff7a','#c070ff'][(H(x,y+1)*4)|0];else if(h>.96)c=GOLD[4];p.px(x,y,c)}
   // treasures poking out: sword, shield, chalice
   p.line(360,FL-62,372,FL-30,'#c0d0dc');p.line(361,FL-62,373,FL-30,'#7a8ca0');p.rect(354,FL-60,12,2,GOLD,{v:.6});p.px(359,FL-64,'#ff3a5a');
   p.ell(640,FL-40,9,10,['#1a0a3a','#2a2a8a','#4a5ad0','#8aa0ff'],{b:.1});p.ell(640,FL-40,4,4,GOLD,{b:.2});
   p.poly([[440,FL-74],[452,FL-74],[449,FL-66],[443,FL-66]],GOLD,{v:.6});p.rect(445,FL-66,2,5,GOLD[3]);p.rect(442,FL-61,8,2,GOLD,{v:.6});
   // stalactites
   for(let x=0;x<W;x+=9){const h=4+Math.round(H(x,5)*(H(x,6)>.75?36:14)),w=3+Math.round(H(x,7)*5);p.poly([[x,0],[x+w,0],[x+w/2,h]],ROCK,{v:.5,bv:.2})}
   // gold mounds
   const mounds=[[160,60,26],[330,70,22],[500,150,34],[680,80,24],[850,90,40],[960,60,22]];
   for(const[cx,rx,ry]of mounds)for(let y=FL-ry;y<FL+6;y++)for(let x=cx-rx;x<cx+rx;x++){const dx=(x-cx)/rx,dy=(y-FL-4)/ry;if(dx*dx+dy*dy>1)continue;const v=.5-dx*.25-(y-FL+ry)/ry*-.0+(H(x,y)-.5)*.35-dy*.2;let c=rp(GOLD,v,x,y);const h=H(x*3,y*7);if(h>.985)c=['#ff3a5a','#3ad0ff','#5aff7a','#c070ff'][(H(x,y+1)*4)|0];else if(h>.93)c=GOLD[4];p.px(x,y,c)}
   // floor
   for(let y=FL;y<M.RH;y++)for(let x=0;x<W;x++){const v=.35+(fbm(x/8,y/4)-.5)*.4;let c=rp(ROCK,v,x,y);if(H(x,y)>.992)c=rp(GOLD,.6,x,y);p.px(x,y,c)}
   // bones and banners
   for(const x of[60,420,620,780]){p.ell(x,FL+3,4,3,HRN,{b:.1});p.rect(x-3,FL+4,2,2,'#0a0202');p.rect(x+1,FL+4,2,2,'#0a0202');p.line(x+6,FL+6,x+16,FL+4,HRN[3])}
   for(const x of[240,760]){p.rect(x,20,2,50,PAL.iron,{v:.5});for(let y=24;y<70;y++){const w=14-Math.round(H(x,y)*(y>60?8:2));for(let i=0;i<w;i++)p.px(x+2+i,y,rp(['#2a0408','#5a0a14','#8a1a24'],.5-(i/w)*.3,x+i,y))}K.glyph(p,x+6,36,x,'#a87020')}},
  init(R){K.motes(R,50,0,W,20,FL,['#ff7a1a','#ffd060','#ff3a0a'],{big:false});
   // ---------- the sleeping dragon ----------
   const D=R.drag=M.ent(R,{name:e=>e.aw>0?'ANCIENT DRAGON (AWAKE!)':'SLEEPING DRAGON',x:DX-60,y:FL-62,w:150,h:62,box:1,z:FL-2,aw:0,wk:-99,fire:-99,flap:-99,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,ox=X-e.x,br=Math.sin(tt*1.4),bx=DX-48+ox,by=FL-40+Y-e.y+Math.round(br*.6);
     const a=M.now-e.wk,awake=a<7,up=awake?M.ease.out(clamp(a/.8,0,1))*(a>6?(7-a):1):0;e.aw=awake?1:0;
     // tail
     for(let i=16;i>=0;i--){const u=i/16,x=bx+6-u*90+Math.sin(tt*1.6-u*4)*u*6*(awake?2:1),y=FL-12+Math.sin(u*3)*4+Math.cos(tt*1.6-u*4)*u*2;const s=disc(Math.max(1,Math.round(7-u*6)),tailPal);g.drawImage(s.c,Math.round(x-s.w/2),Math.round(y-s.h/2))}
     g.drawImage(disc(1,HRN).c,Math.round(bx-84),FL-14);
     // wing behind (spread when flapping)
     const fa=M.now-e.flap,fl=fa<1.6;
     g.drawImage(BODY.c,bx,by);
     if(fl){const k=Math.sin(fa/1.6*Math.PI*3);g.drawImage(WSPREAD.c,0,0,70,58,bx+18,by-44-Math.round(k*6),70,Math.round(58-Math.abs(k)*14))}else g.drawImage(WFOLD.c,bx+24,by-12+Math.round(br*.5));
     // neck + head
     const n0=[bx+84,by+18],hp=[lerp(bx+108,bx+102,up),lerp(by+18,by-30,up)];const n1=[lerp(bx+104,bx+86,up),lerp(by+28,by-10,up)];
     for(let i=0;i<=18;i++){const[x,y]=bez(n0,n1,hp,i/18),s=disc(Math.round(7-i*.17),neckPal);g.drawImage(s.c,Math.round(x-s.w/2),Math.round(y-s.h/2))}
     const hx=Math.round(hp[0]-4),hy=Math.round(hp[1]-8+(awake?0:Math.round(br))),fo=M.now-e.fire,mo=fo<2.2?Math.round(Math.min(1,fo/.2)*6*(fo>2?(2.2-fo)/.2:1)):(awake&&a>.8?1:0);
     g.drawImage(JAW.c,hx+6,hy+12+mo);g.drawImage(HEAD.c,hx,hy);
     // eye
     if(awake&&a>.3){g.fillStyle='#ffe050';g.fillRect(hx+15,hy+6,4,2);g.fillStyle='#0a0202';g.fillRect(hx+17,hy+6,1,2);glowAt(g,hx+17,hy+7,5,'#ffd040',.5)}else{g.fillStyle='#0a0202';g.fillRect(hx+15,hy+7,4,1)}
     e.mouth=[hx+33-ox,hy+14-(Y-e.y)];
     if(sel){g.fillStyle='#fff6c4';const q=(t*20|0)%4;for(let i=0;i<e.w;i+=4)g.fillRect(X+i+q,Y-2,2,1)}},
    upd(e,dt,t,R){if(!RM&&!e.aw&&Math.random()<dt*.6)M.emit(R,'zzz',DX+60,FL-40,1);if(!RM&&!e.aw&&Math.random()<dt*.4)M.emit(R,'smoke',DX+64,FL-30,1)},
    click(e,R,x,y){const a=M.now-e.wk;if(a>7){e.wk=M.now;M.snd('rumble',.6);M.say(R,DX,FL-80,'...WHO DISTURBS MY HOARD?',1.6);setTimeout(()=>{M.snd('roar',.7);M.shake(R,.6,2)},400);
      setTimeout(()=>breath(R,e),1500)}else if(a<5.5&&M.now-e.flap>1.6){e.flap=M.now;M.snd('whoosh',.6);M.snd('whoosh',.8);M.shake(R,.4,1);M.emit(R,'gold',DX+40,FL-4,30,{dir:-Math.PI/2,spread:2.4});M.emit(R,'dust',DX,FL-2,20,{rx:120})}}});
   function breath(R,e){e.fire=M.now;M.snd('boom',.5);M.snd('whoosh',.5);M.flash(R,'#ff7a1a',.08);M.shake(R,1.6,1.5);
    M.fx(R,2.2,(g,ox,oy,k,a)=>{const[mx,my]=e.mouth,L=Math.min(1,a/.3)*150*(k>.88?(1-k)/.12:1);for(let i=0;i<L;i++){const u=i/150,w=Math.round(2+u*16+Math.sin(i*.4-a*30)*2);for(let j=-w;j<=w;j++){const xx=Math.round(mx+i+ox),yy=Math.round(my+j+u*20+oy),d=Math.abs(j)/w;
      if(bay(xx,yy+((a*50)|0))>(1-d)*1.1-u*.25)continue;g.fillStyle=d<.25&&u<.6?'#fff4b0':d<.5?'#ffc040':d<.8?'#ff7020':'#c02a10';g.fillRect(xx,yy,1,1)}}
     glowAt(g,mx+ox+L*.6,my+oy+12,30,'#ff7a1a',.4);if(!RM&&Math.random()<.8)M.emit(R,'ember',mx+L*Math.random(),my+10,2)});
    setTimeout(()=>{M.emit(R,'smoke',e.mouth[0]+60,e.mouth[1],18,{rx:100,ry:20});M.say(R,DX,FL-80,'HMPH. BACK TO SLEEP.',1.4)},2600)}
   // ---------- dragon egg ----------
   const EGG=M.frames(4,20,24,(p,i)=>{p.ell(10,13,8,10.5,['#0a1a1a','#1a4a4a','#2a7a6a','#5ac0a0','#c8ffe8'],{b:.12,tex:tx(.14,2)});for(let j=0;j<6;j++)p.px(4+((H(j,1)*12)|0),6+((H(j,2)*14)|0),'#1a4a4a');
    const cr=[[[10,3],[8,7],[11,10]],[[11,10],[7,13],[9,17]],[[9,17],[13,20],[11,23]]];for(let s=0;s<i&&s<3;s++){const[a,b,c]=cr[s];p.line(a[0],a[1],b[0],b[1],'#ffe08a');p.line(b[0],b[1],c[0],c[1],'#ffe08a')}},'#05100c');
   const BABY=M.frames(3,22,18,(p,f)=>{const G=['#0a2a1a','#1a5a3a','#2a9a5a','#6ae08a','#c8ffd0'];p.ell(10,12,6,5,G,{b:.1});p.ell(16,6,5,4.5,G,{b:.15});p.rect(18,8,4,2,G[2]);p.px(17,5,'#05050a');p.px(17,4,'#ffffff');p.poly([[12,3],[11,0],[14,2]],HRN,{});
    p.poly([[8,8],[2,f===1?2:6],[6,10]],G,{v:.6});p.line(4,13,0,15-f,G[2]);p.rect(7,16,2,2,G[2]);p.rect(12,16,2,2,G[2]);p.ell(10,13,3,2,['#d8a030','#ffe08a'],{})},'#05100c');
   const SHELL=M.mk(22,8,p=>{p.poly([[0,7],[2,1],[5,4],[8,0],[11,3],[14,0],[17,4],[20,1],[21,7]],['#0a1a1a','#1a4a4a','#2a7a6a','#5ac0a0'],{v:.6})},'#05100c');
   M.ent(R,{name:e=>e.st<3?'DRAGON EGG':'BABY DRAGON',x:190,y:FL-30,w:22,h:26,box:1,z:FL,st:0,hit:-9,sn:-9,ht:0,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t;g.fillStyle='#3a2014';for(let i=0;i<22;i++)g.fillRect(X+i,Y+22+Math.round(Math.abs(i-11)/5),1,3);g.fillStyle='#8a6030';for(let i=0;i<22;i+=3)g.fillRect(X+i,Y+22,2,1);
     if(e.st<3){const sh=M.now-e.hit<.3?Math.round(Math.sin(M.now*80)):0,pu=(Math.sin(tt*3)+1)/2;glowAt(g,X+11,Y+12,12,'#5ac0a0',.15+e.st*.12*pu);const s=EGG[e.st];if(sel)g.drawImage(M.ring(s),X+sh,Y-1);g.drawImage(s.c,X+1+sh,Y);
      if(e.st>0&&pu>.6)glowAt(g,X+11,Y+10,5,'#ffe08a',.5)}
     else{g.drawImage(SHELL.c,X,Y+18);const ha=M.now-e.ht,hop=ha<.5?Math.round(Math.sin(ha/.5*Math.PI)*8):0,s=BABY[RM?0:((tt*3)|0)%2];if(sel)g.drawImage(M.ring(s),X-1,Y+3-hop);g.drawImage(s.c,X,Y+4-hop);
      if(M.now-e.sn<.8){const k=(M.now-e.sn)/.8;for(let i=0;i<14*Math.sin(k*Math.PI);i++){g.fillStyle=i<4?'#fff4b0':i<9?'#ffc040':'#ff7020';g.fillRect(X+22+i,Y+12-hop+Math.round(Math.sin(i+tt*30)),1,1+(i>6?1:0))}}}},
    upd(e,dt){if(e.st===3&&!RM&&Math.random()<dt*.3)e.ht=M.now},
    click(e,R){if(e.st<3){e.st++;e.hit=M.now;M.snd('crack',1+e.st*.2);M.emit(R,'shard',e.x+11,e.y+10,5,{c:['#5ac0a0','#c8ffe8']});if(e.st===3){M.snd('tada',1.2);M.flash(R,'#c8ffe8',.1);M.emit(R,'star',e.x+11,e.y+10,20);M.say(R,e.x+11,e.y-8,'A BABY DRAGON!',1.4)}else M.say(R,e.x+11,e.y-8,e.st===1?'*CRACK*':'*CRACK CRACK*',.7)}
     else{e.sn=M.now;e.ht=M.now;M.snd('yip',1.6);setTimeout(()=>M.snd('whoosh',2),150);M.emit(R,'ember',e.x+30,e.y+12,8);M.say(R,e.x+11,e.y-8,['*SNEEZES FIRE*','RAWR (SMALL)','MAMA?'][(Math.random()*3)|0],.9)}}});
   // ---------- mimic chest ----------
   const CH=M.mk(26,14,p=>{p.rect(0,0,26,14,PAL.wood,{v:.5,bv:.25,tex:tx(.14,3)});p.rect(0,0,26,2,GOLD,{v:.6});p.rect(0,12,26,2,GOLD,{v:.5});p.rect(4,0,2,14,GOLD,{v:.6});p.rect(20,0,2,14,GOLD,{v:.6});p.rect(11,1,4,5,GOLD,{v:.7});p.px(13,4,'#0a0202')},'#0a0602');
   const LID=M.mk(26,9,p=>{p.rrect(0,0,26,9,3,PAL.wood,{v:.6,bv:.25});p.rect(0,6,26,2,GOLD,{v:.6});p.rect(4,0,2,9,GOLD,{v:.65});p.rect(20,0,2,9,GOLD,{v:.65});p.rect(11,5,4,4,GOLD,{v:.8})},'#0a0602');
   M.ent(R,{name:e=>M.now-e.o<3?'MIMIC!':'TREASURE CHEST',x:310,y:FL-25,w:26,h:23,box:1,z:FL+1,o:-9,
    draw(g,X,Y,t,e,sel){const a=M.now-e.o,on=a<3,bite=on?Math.abs(Math.sin(a*7)):0,hop=on?Math.round(Math.abs(Math.sin(a*7))*4):0,op=on?Math.round(2+bite*9):0,Yb=Y+9-hop;
     if(!on)glowAt(g,X+13,Y+8,10,'#ffe050',.2);g.drawImage(CH.c,X,Yb);
     if(op>0){g.fillStyle='#3a0408';g.fillRect(X+2,Yb-op,22,op+2);g.fillStyle='#ff5a7a';g.fillRect(X+8,Yb-2,10+Math.round(bite*4),2);g.fillStyle='#ece0c4';for(let i=2;i<24;i+=3){g.fillRect(X+i,Yb-op,1,2);g.fillRect(X+i+1,Yb-1,1,2)}
      g.fillStyle='#ffe050';g.fillRect(X+7,Yb-op+3,2,2);g.fillRect(X+17,Yb-op+3,2,2)}
     g.drawImage(LID.c,X,Yb-9-op);if(sel&&!on)g.drawImage(M.ring(LID),X-1,Yb-10)},
    click(e,R){if(M.now-e.o<3)return;e.o=M.now;M.snd('creak',.8);setTimeout(()=>{M.snd('crunch',1);M.say(R,e.x+13,e.y-14,'NOT A CHEST!',1.2);M.shake(R,.3,1)},250);for(let i=1;i<6;i++)setTimeout(()=>{M.snd('clack',.6+i*.05);M.emit(R,'gold',e.x+13,e.y+4,4)},300+i*380)}});
   // ---------- cursed crown ----------
   const CRN=M.mk(16,10,p=>{p.poly([[0,9],[0,2],[4,5],[8,0],[12,5],[15,2],[15,9]],GOLD,{v:.65,bv:.3});p.px(8,2,'#ff3a5a');p.px(4,7,'#3ad0ff');p.px(12,7,'#5aff7a');p.rect(0,8,16,1,GOLD[1])},'#1a0a02');
   const KING=M.mk(30,40,p=>{const G=['#0a2a1a','#1a6a4a','#3ab08a','#8affd0','#e0fff4'];p.poly([[4,40],[2,22],[8,12],[22,12],[28,22],[26,40],[20,34],[15,40],[10,34]],G,{v:.55,bv:.3});p.ell(15,9,7,8,G,{b:.15});
    p.rect(11,8,3,3,'#05140c');p.rect(17,8,3,3,'#05140c');p.px(12,9,'#ff3a3a');p.px(18,9,'#ff3a3a');p.poly([[9,14],[15,24],[21,14]],['#3ab08a','#e0fff4'],{v:.5});p.line(4,24,0,30,G[2]);p.line(26,24,30,30,G[2])},'#041008');
   const CROWN=M.ent(R,{name:'CURSED CROWN',x:692,y:FL-38,w:16,h:30,box:1,z:FL,st:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.st,on=a<4.5;g.fillStyle='#3a0a14';g.fillRect(X-4,Y+24,24,6);g.fillStyle='#8a1a24';g.fillRect(X-4,Y+24,24,1);g.fillStyle='#ffd040';g.fillRect(X-4,Y+29,1,1);g.fillRect(X+19,Y+29,1,1);
     let cy=Y+15+Math.round(Math.sin(tt*2)*1);if(on){const kk=clamp((a-.4)/1,0,1),ka=a>3.4?clamp((4.4-a),0,1):kk;
      g.globalAlpha=ka*.85;g.drawImage(KING.c,X-7,Y-36+Math.round((1-kk)*20+Math.sin(tt*3)*1));g.globalAlpha=1;cy=Math.round(lerp(cy,Y-40+Math.sin(tt*3),kk*ka))}
     glowAt(g,X+8,cy+5,9,on?'#5aff9a':'#ffd040',on?.5:.22);if(sel)g.drawImage(M.ring(CRN),X-1,cy-1);g.drawImage(CRN.c,X,cy)},
    upd(e,dt){const a=M.now-e.st;if(a<4.5&&!RM&&Math.random()<dt*20)M.emit(R,'wisp',e.x+8,e.y+8-a*6,1,{c:['#8affd0','#3ab08a']})},
    click(e,R){if(M.now-e.st<4.5)return;e.st=M.now;M.snd('boo',.7);M.snd('spell',.6);setTimeout(()=>M.say(R,e.x+8,e.y-50,K.pick(['WHO DARES WEAR MY CROWN?','IT DOES NOT FIT YOU.','I RULED FOR 900 YEARS!','RETURN IT... OR ELSE.']),1.6),900);setTimeout(()=>M.snd('boo',.5),3400)}});
   // ---------- coin avalanche ----------
   M.ent(R,{name:'COIN MOUNTAIN',x:820,y:FL-40,w:60,h:40,box:1,z:FL-4,av:-9,
    draw(g,X,Y,t,e,sel){const a=M.now-e.av,on=a<2.5;const tt=RM?0:t;for(let i=0;i<9;i++){const cx=X+8+((H(i,4)*44)|0),cy=Y+8+((H(i,5)*26)|0);if(((tt*1.5+i*.37)%3)<.12){g.fillStyle='#ffffff';g.fillRect(cx-1,cy,3,1);g.fillRect(cx,cy-1,1,3)}}
     if(sel){g.fillStyle='#fff6c4';g.fillRect(X+10,Y-2,40,1)}if(on)glowAt(g,X+30,Y+20,30,'#ffd040',.3*(1-a/2.5))},
    upd(e,dt){const a=M.now-e.av;if(a<1.8&&!RM){M.emit(R,'gold',e.x+30+(Math.random()-.5)*30,e.y+4,3,{dir:-Math.PI/2+(Math.random()-.5)*2,floor:FL+4});if(Math.random()<dt*14)M.snd('coin',.8+Math.random()*.8);if(Math.random()<dt*2)M.emit(R,'gem',e.x+30,e.y+6,1,{floor:FL+4})}},
    click(e,R){e.av=M.now;M.snd('rumble',1.2);M.shake(R,.6,1);M.say(R,e.x+30,e.y-10,K.pick(['AVALANCHE!','47,000,001 COINS','(THE DRAGON COUNTS THEM)']),1)}});
   // ---------- skull totem ----------
   const SK=M.mk(10,8,p=>{p.ell(5,3.5,4.5,3.5,HRN,{b:.12});p.rect(2,3,2,2,'#0a0202');p.rect(6,3,2,2,'#0a0202');p.rect(3,7,4,1,HRN[3]);p.px(5,5,'#0a0202')},'#0a0402');
   M.ent(R,{name:'SKULL TOTEM',x:80,y:FL-46,w:14,h:46,box:1,z:FL,on:-9,
    draw(g,X,Y,t,e,sel){g.fillStyle='#3a2014';g.fillRect(X+6,Y+6,2,40);const a=M.now-e.on;K.flame(g,X+7,Y+4,1.6,7,RM?0:t,['#ffffff','#bfffc8','#5ae07a','#1a8a3a']);
     for(let i=0;i<4;i++){const y=Y+10+i*9,lit=a<3&&a>i*.25,ch=lit?Math.round(Math.abs(Math.sin(a*20+i))*1.5):0;g.drawImage(SK.c,X+2,y-ch);g.fillStyle='#0a0202';g.fillRect(X+5,y+7-ch,4,ch+1);if(lit){g.fillStyle='#ff3a3a';g.fillRect(X+4,y+3-ch,1,1);g.fillRect(X+8,y+3-ch,1,1);glowAt(g,X+7,y+3,6,'#ff3a3a',.4)}}
     if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,14,1)}},
    click(e,R){e.on=M.now;for(let i=0;i<4;i++)setTimeout(()=>M.snd('clack',.7+i*.1),i*250);setTimeout(()=>M.say(R,e.x+7,e.y-6,'WE GUARD THE HOARD. MOSTLY.',1.2),1000)}});
   // ---------- molten goblet ----------
   const GOB=M.mk(12,16,p=>{p.poly([[0,0],[11,0],[9,6],[2,6]],GOLD,{v:.6,bv:.3});p.rect(5,6,2,6,GOLD,{v:.6});p.rect(2,12,8,3,GOLD,{v:.5});p.px(5,3,'#ff3a5a')},'#1a0a02');
   M.ent(R,{name:'MOLTEN GOBLET',x:950,y:FL-26,w:14,h:20,box:1,z:FL,po:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.po;g.fillStyle='#2a140e';g.fillRect(X-4,Y+16,20,10);g.fillStyle='#583222';g.fillRect(X-4,Y+16,20,1);glowAt(g,X+6,Y+2,8,'#ff7a1a',.3);if(sel)g.drawImage(M.ring(GOB),X-1,Y-1);g.drawImage(GOB.c,X,Y);
     for(let x=1;x<11;x++){g.fillStyle=Math.sin(x+tt*6)>.5?'#fff4b0':'#ff9a2a';g.fillRect(X+x,Y,1,1)}
     if(a<2.4){const k=Math.min(1,a/.4);g.fillStyle='#ffc040';for(let i=0;i<Math.round(k*16);i++)g.fillRect(X+11+Math.round(Math.sin(i*.3)*1),Y+i,i%3?1:2,1);if(a>.4){const r=Math.round(Math.min(1,(a-.4)/1.4)*4);g.fillStyle='#ffe08a';g.fillRect(X+10-r,Y+16,r*2+2,1);g.fillStyle='#ff9a2a';g.fillRect(X+10-r,Y+15,r*2+2,1)}}
     if(a>=2.4&&a<4){g.fillStyle='#ffe08a';g.fillRect(X+8,Y+12,4,4);g.fillStyle='#a87020';g.fillRect(X+9,Y+13,2,2)}},
    click(e,R){if(M.now-e.po<4)return;e.po=M.now;M.snd('hiss',1.4);M.snd('bubble',.6);setTimeout(()=>{M.snd('coin',1.3);M.say(R,e.x+7,e.y-8,'FRESHLY MINTED.',1)},2400)}});
   // ---------- bats ----------
   const BAT=M.frames(2,11,6,(p,f)=>{p.ell(5,3,1.5,1.8,['#1a0a14','#3a1a2a'],{});if(f){p.poly([[4,2],[0,0],[1,4]],['#1a0a14','#3a1a2a'],{v:.5});p.poly([[6,2],[10,0],[9,4]],['#1a0a14','#3a1a2a'],{v:.5})}else{p.poly([[4,3],[0,5],[2,2]],['#1a0a14','#3a1a2a'],{v:.5});p.poly([[6,3],[10,5],[8,2]],['#1a0a14','#3a1a2a'],{v:.5})}p.px(4,2,'#ff3a3a');p.px(6,2,'#ff3a3a')},'#05020a');
   for(let i=0;i<6;i++)M.ent(R,{name:'CAVE BAT',x:0,y:0,w:11,h:6,box:1,z:-1,noNav:1,sc:-9,ph:H(i,3)*TAU,
    draw(g,X,Y,t,e,sel){const s=BAT[RM?0:((t*14+i)|0)%2];if(sel)g.drawImage(M.ring(s),X-1,Y-1);g.drawImage(s.c,X,Y)},
    upd(e,dt,t){const tt=RM?0:t,sc=M.now-e.sc<2,sp=sc?3:1;e.x=Math.round(W/2+Math.sin(tt*.07*sp+e.ph)*(W/2-30)+Math.sin(tt*2+i)*10);e.y=Math.round(30+Math.sin(tt*.6*sp+e.ph*2)*16+(sc?-Math.sin((M.now-e.sc)/2*Math.PI)*20:0))},
    click(e,R){e.sc=M.now;M.snd('yip',2.2);M.say(R,e.x+5,e.y-4,'SKREE!',.6)}});
   K.brazier(R,40,FL-30,['#fff4b0','#ffc040','#ff7020','#c02a10'],{pole:30,name:'DRAGONFIRE BRAZIER'});K.brazier(R,980,FL-30,['#fff4b0','#ffc040','#ff7020','#c02a10'],{pole:30,name:'DRAGONFIRE BRAZIER'})},
  back(R,g,ox,oy,t){const tt=RM?0:t;// lava falls
   for(const lx of[120,880]){const X=Math.round(lx+ox);if(X<-20||X>M.BW+20)continue;M.glow(g,X,Math.round(80+oy),22,'#ff6a1a',.22);for(let y=10;y<FL;y++)for(let x=-3;x<=3;x++){const v=(Math.sin((y-tt*40)*.25+x)+1)/2;g.fillStyle=Math.abs(x)<2&&v>.6?'#ffd060':v>.3?'#ff7a1a':'#c02a08';if(Math.abs(x)<3||bay(X+x,y)<.5)g.fillRect(X+x,Math.round(y+oy),1,1)}}}
 })}

/* ======================= CRYSTAL CAVERN ======================= */
{const W=1000,FL=166,
 CR=['#06041a','#100a30','#1a1450','#2a2276','#3e34a0'],AM=['#1a0a3a','#4a1a8a','#8a3ae0','#c88aff','#f4e0ff'],CY=['#04202a','#0a4a6a','#1a8ac0','#5ad0ff','#d8fcff'],PK=['#2a0a2a','#6a1a5a','#c03aa0','#ff8ae0','#ffe0f8'],
 TINTS=[null,'#3aa0ff','#3aff9a','#ffb03a','#ff3a6a'],MU=['#0a2a2a','#1a6a5a','#2ac0a0','#8affe0','#e0fff8'];
 const cry=(p,cx,yb,w,h,pal,lean=0)=>{p.poly([[cx-w/2,yb],[cx-w/2+lean*h*.3,yb-h*.75],[cx+lean*h*.4,yb-h],[cx+w/2+lean*h*.3,yb-h*.75],[cx+w/2,yb]],pal,{v:.5,bv:.35});p.line(cx+lean*h*.4,yb-h,cx+lean*h*.15,yb-2,pal[4])};
 M.K.ext('crystal',{top:'#04030e',bot:'#04030e',start:500,
  bg(p,R){for(let y=0;y<FL;y++)for(let x=0;x<W;x++){const n=fbm(x/34,y/22);p.px(x,y,rp(CR,.2+(n-.5)*.55+(1-Math.abs(y-80)/80)*.1,x,y))}
   // glowing veins
   for(let i=0;i<22;i++){let x=H(i,11)*W,y=20+H(i,12)*(FL-40);const pal=[AM,CY,PK][i%3];const dir=H(i,13)*TAU;for(let j=0;j<26;j++){const a=dir+(H(i,j)-.5)*1.2;x+=Math.cos(a);y+=Math.sin(a)*.7;p.px(Math.round(x),Math.round(y),mix(pal[2],CR[1],.45))}}
   // wall geode clusters (dimmed, they glow in back())
   for(let i=0;i<14;i++){const cx=30+H(i,21)*(W-60),cy=24+H(i,22)*70,pal=[AM,CY,PK][i%3].map(c=>mix(c,CR[1],.25));for(let k=0;k<5;k++){const a=-Math.PI/2+(k-2)*.45,h=6+H(i,k)*10;const x1=cx+Math.cos(a)*h,y1=cy+Math.sin(a)*h;p.poly([[cx-2,cy],[x1-1,y1],[x1+1,y1-1],[cx+2,cy]],pal,{v:.55,bv:.3})}}
   // ceiling crystals
   for(let x=6;x<W;x+=14){const h=6+H(x,1)*26,pal=[AM,CY,PK][(H(x,2)*3)|0];p.poly([[x-4,0],[x+4,0],[x+1,h]],pal,{v:.45,bv:.3})}
   // background crystal clusters
   for(let i=0;i<30;i++){const x=H(i,3)*W,h=20+H(i,4)*60,w=6+H(i,5)*10;cry(p,x,FL,w,h,[AM,CY,PK][i%3].map((c,j)=>mix(c,CR[1],.55-j*.05)),(H(i,6)-.5)*.8)}
   // floor + pool
   for(let y=FL;y<M.RH;y++)for(let x=0;x<W;x++){let c=rp(CR,.35+(fbm(x/7,y/4)-.5)*.4,x,y);if(H(x,y)>.993)c=[AM,CY,PK][(H(x,y+1)*3)|0][3];p.px(x,y,c)}
   for(let y=FL+4;y<FL+18;y++)for(let x=560;x<760;x++){const dx=(x-660)/100,dy=(y-FL-11)/7;if(dx*dx+dy*dy>1)continue;p.px(x,y,rp(['#04102a','#0a2a5a','#1a5a9a','#5ad0ff'],.3+(H(x,y)>.95?.5:0)-dy*.1,x,y))}},
  init(R){K.motes(R,60,0,W,20,FL,['#c88aff','#5ad0ff','#ff8ae0','#ffffff'],{big:false});R.tint=0;R.tintT=-9;
   // ---------- singing crystals ----------
   const NOTES=[1,1.12,1.26,1.5,1.68],seq=[];const SCOL=[AM,CY,PK,AM,CY];
   NOTES.forEach((nt,i)=>{const h=18+i*7,S=M.mk(12,h+2,p=>cry(p,6,h+1,10,h,SCOL[i],0),'#05031a');
    M.ent(R,{name:'SINGING CRYSTAL',x:96+i*16,y:FL-h-2,w:12,h:h+2,box:1,z:FL,s:S,rg:-9,
     draw(g,X,Y,t,e,sel){const a=M.now-e.rg,on=a<1.2,sh=on&&a<.3?Math.round(Math.sin(a*90)):0;glowAt(g,X+6,Y+h/2,on?16:8,SCOL[i][3],on?.55*(1.2-a):.15);if(on)M.aura(g,S,X+sh,Y,SCOL[i][4],1,t);if(sel)g.drawImage(M.ring(S),X-1+sh,Y-1);g.drawImage(S.c,X+sh,Y);
      if(on){const r=Math.round(a*30);M.ringFx(g,X+6,Y+h,r,SCOL[i][3],1,1-a/1.2)}},
     click(e,R){e.rg=M.now;M.snd('chime',nt*.8);M.snd('bell',nt);M.emit(R,'shard',e.x+6,e.y+4,4,{c:[SCOL[i][3],'#ffffff']});seq.push(i);if(seq.length>5)seq.shift();
      if(seq.join('')==='01234'){seq.length=0;setTimeout(()=>aurora(R),300)}else if(seq.length===1)M.say(R,170,FL-60,'PLAY THEM IN ORDER...',1)}})});
   function aurora(R){M.snd('tada',1);M.say(R,170,FL-70,'THE CAVERN SINGS BACK!',1.6);M.fx(R,5,(g,ox,oy,k,a)=>{const f=Math.min(1,a/.6)*(k>.8?(1-k)/.2:1);for(let x=0;x<M.BW;x++){const wx=x-ox,y0=30+Math.sin(wx*.02+a*2)*10+Math.sin(wx*.05-a)*4;for(let j=0;j<24;j++){if(bay(x,j)>f*(1-j/24)*.7)continue;g.fillStyle=j<4?'#e0fff8':(wx>>5)%3===0?'#8affe0':(wx>>5)%3===1?'#c88aff':'#ff8ae0';g.fillRect(x,Math.round(y0+j+oy),1,1)}}})}
   // ---------- crystal golem (rig) ----------
   const sh=(w,h,pal,sd)=>M.mk(w,h,p=>{p.poly([[0,h*.3],[w*.4,0],[w-1,h*.2],[w-1,h*.8],[w*.6,h-1],[0,h-1]],pal,{v:.5,bv:.35});p.line(w*.4,1,w*.5,h-2,pal[4]);if(sd)p.px(w>>1,h>>1,'#ffffff')},'#05031a');
   const FOOT=sh(12,8,CY),SHIN=sh(10,14,CY),THI=sh(11,12,AM),HIP=sh(22,8,AM),TOR=sh(28,22,AM,1),SHO=sh(14,10,PK),ARM=sh(9,18,CY),FIST=sh(11,10,PK),HD=sh(14,12,CY),CORE=M.mk(8,8,p=>p.poly([[4,0],[7,4],[4,7],[0,4]],['#5a0a3a','#ff3aa0','#ff8ae0','#ffffff'],{v:.6}),'#2a0a1a');
   const lie=[[2,62],[14,64],[26,60],[38,64],[8,56],[30,56],[20,52],[0,48],[40,50],[10,44],[34,44],[22,58],[18,40],[24,46]];
   const GP=[{s:FOOT,b:[10,76]},{s:FOOT,b:[34,76]},{s:SHIN,b:[11,62]},{s:SHIN,b:[35,62]},{s:THI,b:[10,50]},{s:THI,b:[35,50]},{s:HIP,b:[17,44],zb:1},{s:TOR,b:[14,22],zb:2},{s:CORE,b:[24,29],zb:3,glowc:'#ff3aa0'},{s:SHO,b:[4,20],zb:3},{s:SHO,b:[38,20],zb:3},{s:ARM,b:[6,30],zb:1},{s:ARM,b:[41,30],zb:1},{s:FIST,b:[5,46],zb:2},{s:FIST,b:[40,46],zb:2},{s:HD,b:[21,8],zb:3,glowc:'#5ad0ff'}];
   GP.forEach((q,i)=>{const l=lie[i%lie.length];q.a=[l[0]+6,l[1]+12-q.s.h*.3+8];q.t=[i*.045,i*.045+.32];q.arc=14+(i%3)*8;q.za=i*.1;q.snd='chime';q.pfx='shard'});
   const golem=K.rig(R,{name:'CRYSTAL PILE',pname:'CRYSTAL GOLEM',x:330,yb:FL-2,w:60,h:84,dur:3,parts:GP,ringCol:'#c88aff',snd0:'spell',
    over(g,X,Y,t,e,k){if(k>=1){const p=.5+.3*Math.sin(t*4);glowAt(g,X+28,Y+33,8,'#ff3aa0',p);g.fillStyle='#ffffff';g.fillRect(X+25,Y+13,2,1);g.fillRect(X+30,Y+13,2,1)}},
    done(e,R){M.say(R,e.x+30,e.y-6,'GOLEM AWAKENS!',1.4);M.emit(R,'shard',e.x+30,e.y+40,20,{c:['#c88aff','#5ad0ff','#ffffff']})},
    special(e,R){M.snd('boom',1);M.shake(R,.6,2);M.say(R,e.x+30,e.y-6,'CRYSTAL QUAKE!',1);const x0=e.x+30;M.fx(R,1.6,(g,ox,oy,k,a)=>{for(const s of[-1,1])for(let i=0;i<8;i++){const u=clamp((a-i*.07)/.25,0,1)*(k>.75?(1-k)/.25:1);const hh=Math.round(u*(14-i));if(hh<1)continue;const x=Math.round(x0+s*(16+i*10)+ox),y=FL+oy;
      for(let j=0;j<hh;j++){const w=Math.round((1-j/hh)*3);g.fillStyle=j>hh-2?'#ffffff':i%2?'#c88aff':'#5ad0ff';g.fillRect(x-w,y-j,w*2+1,1)}}});return 1.6}});
   // ---------- geode galaxy ----------
   const GEO=M.mk(30,22,p=>{p.ell(15,12,14,10,['#1a1414','#3a3030','#5a4a48','#8a7a70'],{b:.1,tex:tx(.25,2)});p.line(15,2,13,8,'#1a1414');p.line(13,8,17,14,'#1a1414')},'#05030a');
   const HALF=[0,1].map(s=>M.mk(16,22,p=>{p.ell(s?0:15,12,14,10,['#1a1414','#3a3030','#5a4a48','#8a7a70'],{b:.1});p.ell(s?0:15,12,10,7,AM,{b:-.1});for(let i=0;i<14;i++)p.px(((H(i,s)*10)|0)+(s?0:5),7+((H(i,s+2)*10)|0),'#f4e0ff')},'#05030a'));
   M.ent(R,{name:'GEODE',x:486,y:FL-22,w:30,h:22,box:1,z:FL,op:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.op,on=a<7,k=on?M.ease.out(clamp(a/.5,0,1))*(a>6.4?(7-a)/.6:1):0,sp=Math.round(k*10);
     if(!on){if(sel)g.drawImage(M.ring(GEO),X-1,Y-1);g.drawImage(GEO.c,X,Y);if(((tt*.8)%3)<.2)glowAt(g,X+14,Y+8,5,'#c88aff',.5);return}
     // galaxy
     const cx=X+15,cy=Y-6-Math.round(k*30),r=Math.round(4+k*34);glowAt(g,cx,cy,r,'#c88aff',.3*k);for(let i=0;i<220*k;i++){const arm=i%3,d=(i/220)*r,an=arm*TAU/3+d*.18+tt*.8;const x=Math.round(cx+Math.cos(an)*d),y=Math.round(cy+Math.sin(an)*d*.5);
      g.fillStyle=d<r*.2?'#ffffff':i%5===0?'#ff8ae0':i%3===0?'#5ad0ff':'#c88aff';g.fillRect(x,y,1,1)}glowAt(g,cx,cy,6,'#ffffff',.8*k);
     g.drawImage(HALF[0].c,X-sp,Y);g.drawImage(HALF[1].c,X+15+sp,Y)},
    click(e,R){if(M.now-e.op<7)return;e.op=M.now;M.snd('crack',.8);M.snd('spell',.6);M.snd('hum',.7);M.flash(R,'#c88aff',.08);M.say(R,e.x+15,e.y-60,'A GALAXY, HIDING IN A ROCK.',1.6)}});
   // ---------- prism of light ----------
   const BIG=M.mk(20,30,p=>cry(p,10,29,18,28,['#2a3a6a','#6a8ac0','#a8c8ff','#e0f0ff','#ffffff'],0),'#0a0a2a');
   M.ent(R,{name:'LIGHT PRISM',x:630,y:FL-62,w:20,h:30,box:1,z:FL,ang:0,ro:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t;for(let y=0;y<Y+4;y++){if(bay(X+10,y)<.5){g.fillStyle='#e0f0ff';g.fillRect(X+9,y,3,1)}}glowAt(g,X+10,Y+10,14,'#e0f0ff',.35);
     const r=M.now-e.ro<.5?(M.now-e.ro)/.5:1,ang=lerp(e.pang??0,e.ang,M.ease.out(r));const RB=['#ff4a4a','#ff9a2a','#ffe050','#7aff7a','#4ad0ff','#6a6aff','#c070ff'];
     RB.forEach((c,i)=>{const a0=Math.PI/2+ang+(i-3)*.13;const L=90;for(let s=0;s<L;s+=1){const x=Math.round(X+10+Math.cos(a0)*s),y=Math.round(Y+16+Math.sin(a0)*s);if(y>FL+12)break;if(bay(x,y)<.6-s/L*.4){g.fillStyle=c;g.fillRect(x,y,1,1)}}});
     if(sel)g.drawImage(M.ring(BIG),X-1,Y-1);g.drawImage(BIG.c,X,Y+Math.round(Math.sin(tt*1.4)))},
    click(e,R){e.pang=e.ang;e.ang=[0,-.9,.9,-.5,.5][((e.i=(e.i||0)+1))%5];e.ro=M.now;M.snd('chime',1.2);M.snd('swish',1.4);M.emit(R,'gem',e.x+10,e.y+16,10)}});
   // ---------- crystal heart ----------
   const HRT=M.mk(26,24,p=>{p.poly([[13,23],[1,10],[1,5],[6,1],[11,2],[13,5],[15,2],[20,1],[25,5],[25,10]],PK,{v:.55,bv:.35});p.line(13,5,13,22,PK[4]);p.line(6,3,4,9,'#ffffff')},'#2a0a1a');
   M.ent(R,{name:'HEART OF THE CAVERN',x:790,y:FL-70,w:26,h:24,box:1,z:FL,pu:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,bt=(tt*1.2)%1,beat=bt<.1||(bt>.18&&bt<.26),bob=Math.round(Math.sin(tt*1.5)*2),y=Y+bob;glowAt(g,X+13,y+12,beat?22:16,'#ff3aa0',beat?.45:.28);M.aura(g,HRT,X,y,'#ff8ae0',beat?3:2,t,.5);
     if(sel)g.drawImage(M.ring(HRT),X-1,y-1);g.drawImage(HRT.c,X,y);const a=M.now-e.pu;if(a<1){M.ringFull(g,X+13,y+12,4+a*70,'#ff8ae0',1-a)}
     // tether chains
     g.fillStyle='#4a3a6a';for(let i=0;i<10;i++){g.fillRect(X+2-i*3,y+10+i*3,1,1);g.fillRect(X+24+i*3,y+10+i*3,1,1)}},
    upd(e,dt,t){if(!RM&&Math.random()<dt*3)M.emit(R,'heart',e.x+13,e.y+10,1,{c:['#ff8ae0','#ff3aa0']})},
    click(e,R){e.pu=M.now;R.tint=(R.tint+1)%TINTS.length;R.tintT=M.now;M.snd('bass',1);M.snd('power',1.2);M.shake(R,.3,1);M.flash(R,TINTS[R.tint]||'#ff8ae0',.12);M.say(R,e.x+13,e.y-8,R.tint?'THE CAVERN CHANGES HUE':'BACK TO ITS TRUE COLOURS',1.2)}});
   // ---------- glow mushrooms ----------
   for(let i=0;i<5;i++){const h=6+((H(i,9)*8)|0),r=3+((H(i,8)*3)|0),x=900+i*14+((H(i,7)*6)|0);
    M.ent(R,{name:'GLOW MUSHROOM',x:x-r-1,y:FL-h-r*2,w:r*2+3,h:h+r*2,box:1,z:FL+1,gr:-9,
     draw(g,X,Y,t,e,sel){const a=M.now-e.gr,on=a<4,s=on?1+Math.sin(Math.min(1,a/.4)*Math.PI/2)*.6*(a>3.4?(4-a)/.6:1):1,hh=Math.round(h*s),rr=Math.round(r*s),cx=X+r+1,yb=Y+h+r*2;
      g.fillStyle='#bfe8e0';g.fillRect(cx-1,yb-hh,2,hh);glowAt(g,cx,yb-hh-1,rr*3,MU[3],on?.5:.25);g.fillStyle=MU[2];g.fillRect(cx-rr,yb-hh-rr,rr*2+1,rr);g.fillRect(cx-rr+1,yb-hh-rr-1,rr*2-1,1);g.fillStyle=MU[3];g.fillRect(cx-rr+1,yb-hh-rr,rr,1);g.fillStyle=MU[4];g.fillRect(cx-1,yb-hh-rr+1,1,1);g.fillRect(cx+2,yb-hh-rr+2,1,1);
      if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,e.w,1)}},
     click(e,R){e.gr=M.now;M.snd('squish',1.4+i*.1);M.emit(R,'wisp',e.x+e.w/2,e.y,12,{c:['#8affe0','#e0fff8','#2ac0a0']});M.say(R,e.x+e.w/2,e.y-6,'*POOF* SPORES!',.7)}})}
   // ---------- crystal moths ----------
   const MO=M.frames(2,9,7,(p,f)=>{p.rect(4,1,1,5,'#ffffff');if(f){p.poly([[4,2],[0,0],[1,4]],CY,{v:.6});p.poly([[4,2],[8,0],[7,4]],CY,{v:.6})}else{p.poly([[4,3],[1,6],[0,3]],CY,{v:.6});p.poly([[4,3],[7,6],[8,3]],CY,{v:.6})}},'#04102a');
   for(let i=0;i<8;i++)M.ent(R,{name:'CRYSTAL MOTH',x:0,y:0,w:9,h:7,box:1,z:-1,noNav:1,ph:H(i,4)*TAU,bu:-9,
    draw(g,X,Y,t,e,sel){if(M.now-e.bu<3)return;const s=MO[RM?0:((t*16+i)|0)%2];glowAt(g,X+4,Y+3,6,'#5ad0ff',.35);if(sel)g.drawImage(M.ring(s),X-1,Y-1);g.drawImage(s.c,X,Y)},
    upd(e,dt,t){const tt=RM?0:t;e.x=Math.round(80+((i*137+tt*8*(i%2?1:-1))%840+840)%840+Math.sin(tt*1.3+e.ph)*14);e.y=Math.round(50+Math.sin(tt*.8+e.ph)*30+Math.sin(tt*2.6+i)*6)},
    click(e,R){if(M.now-e.bu<3)return;e.bu=M.now;M.snd('chime',1.8);M.emit(R,'star',e.x+4,e.y+3,14,{c:['#ffffff','#5ad0ff','#c88aff']})}});
   // drip
   R.drips=[];},
  upd(R,dt,t){if(!RM&&Math.random()<dt*.8)R.drips.push({x:560+Math.random()*200,y:20,v:0});for(const d of R.drips){d.v+=dt*120;d.y+=d.v*dt;if(d.y>FL+10){d.dead=1;M.emit(R,'water',d.x,FL+10,3);if(Math.random()<.4)M.snd('blip',2.5)}}R.drips=R.drips.filter(d=>!d.dead)},
  back(R,g,ox,oy,t){const tt=RM?0:t;for(let i=0;i<14;i++){const x=Math.round(30+H(i,21)*(W-60)+ox),y=Math.round(24+H(i,22)*70+oy-6);if(x<-20||x>M.BW+20)continue;M.glow(g,x,y,14,[AM,CY,PK][i%3][3],.14+.08*Math.sin(tt*1.5+i))}// pool shimmer + reflections
   for(let i=0;i<30;i++){const x=Math.round(570+H(i,1)*180+Math.sin(tt+i)*3+ox),y=Math.round(FL+6+H(i,2)*10+oy);if(Math.sin(tt*2+i)>.3){g.fillStyle='#8ae0ff';g.fillRect(x,y,2,1)}}
   for(const d of R.drips){g.fillStyle='#bfeaff';g.fillRect(Math.round(d.x+ox),Math.round(d.y+oy),1,2)}},
  front(R,g,ox,oy,t){if(R.tint){const c=TINTS[R.tint];g.globalAlpha=.16;g.globalCompositeOperation='overlay';g.fillStyle=c;g.fillRect(0,0,M.BW,M.BH);g.globalCompositeOperation='source-over';g.globalAlpha=1}}
 })}
})();
