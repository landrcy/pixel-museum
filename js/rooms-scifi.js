/* NEON CYBER SHRINE and STARSHIP RELIC VAULT: two sci-fi vaults. */
(()=>{'use strict';const{rp,ramp,bay,H,vn,fbm,RM,TAU,clamp,lerp,mix}=M;const K=M.K,PAL=K.PAL;
const glowAt=(g,x,y,r,c,d=.6)=>M.glow(g,Math.round(x),Math.round(y),r,c,d);
const tx=(a=.16,s=3)=>(x,y)=>(fbm(x/s,y/s)-.5)*a;
const px=(g,x,y,c,w=1,h=1)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h)};

/* ======================= NEON CYBER SHRINE ======================= */
{const W=1000,FL=168,NP=['#2a0414','#6a0a3a','#c01a6a','#ff3a9a','#ffb0dc'],NC=['#02202a','#0a4a5a','#10a0b0','#3affe8','#c0fff8'],DK=['#04040c','#0a0a18','#121228','#1c1c3a','#2a2a50'],
  VI=['#14082a','#2a1050','#4a1a8a','#8a3ae0','#d0a0ff'];
 M.K.ext('cyber',{top:'#04040c',bot:'#04040c',start:500,
  bg(p,R){for(let y=0;y<FL;y++)for(let x=0;x<W;x++)p.px(x,y,rp(DK,.15+y/FL*.35+(fbm(x/40,y/30)-.5)*.2,x,y));
   // distant megacity silhouettes with neon windows
   for(let x=0;x<W;){const w=20+H(x,1)*40,h=40+H(x,2)*80;p.rect(x,FL-h,w,h,['#06061a','#0a0a24','#10102e'],{v:.4,bv:.1});for(let yy=FL-h+4;yy<FL-6;yy+=5)for(let xx=x+3;xx<x+w-3;xx+=4)if(H(xx,yy)>.82)p.px(xx,yy,H(xx,yy+1)>.5?'#3a6a8a':'#8a2a6a');x+=w+2}
   // big dithered moon
   for(let y=-30;y<=30;y++)for(let x=-30;x<=30;x++){const d=Math.hypot(x,y)/30;if(d>1)continue;const l=1-d*.5+(x+y<0?.15:-.15)+(fbm((x+300)/6,y/6)-.5)*.3;p.px(300+x,40+y,rp(['#3a0a2a','#6a1a4a','#a03a6a','#e07aa0'],l,x,y))}
   // shrine wall: dark lacquer panels with neon trim
   for(let x=0;x<W;x+=60){p.rect(x+4,96,52,FL-96,['#0a0614','#140a22','#1e1030'],{v:.5,bv:.2,tex:tx(.1,4)});p.rect(x+4,96,52,1,NP[3]);p.rect(x+4,FL-8,52,1,NC[3]);for(let i=0;i<4;i++)K.glyph(p,x+12+i*10,104,x+i,'#6a1a4a')}
   // roof eaves
   for(let x=0;x<W;x++){const y=86+Math.round(Math.pow(((x%200)-100)/100,2)*-6+6);for(let j=0;j<6;j++)p.px(x,y+j,rp(['#0a0a14','#1a1428','#2a1e3a'],.6-j*.1,x,y+j));p.px(x,y+6,NP[2])}
   // floor: glossy black stone with neon reflections
   for(let y=FL;y<M.RH;y++)for(let x=0;x<W;x++){let c=rp(DK,.2+(y-FL)/40*.3+(H(x>>4,y>>3)-.5)*.1,x,y);p.px(x,y,c)}
   for(let x=0;x<W;x+=120)for(let y=FL+2;y<M.RH;y++)if(bay(x,y)<.5-(y-FL)/80)for(const d of[0,1])p.px(x+30+d,y,y%2?NP[1]:NC[1]);
   for(let x=0;x<W;x+=3)if(H(x,9)>.5)p.px(x,FL+2,NP[1])},
  init(R){R.rain=[];for(let i=0;i<70;i++)R.rain.push({x:H(i,1)*W,y:H(i,2)*FL,s:120+H(i,3)*80,c:i%3?'#3a6a9a':'#8a3a8a'});
   // ---------- neon torii portal ----------
   M.ent(R,{name:'NEON TORII GATE',x:446,y:FL-80,w:108,h:80,box:1,z:FL-3,op:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.op,on=a<5,f=on?Math.min(1,a/.6)*(a>4.4?(5-a)/.6:1):0;const fl=((tt*7)|0)%23===0?.4:1;
     // portal inside
     const cx=X+54,cy=Y+46;if(f>0){for(let i=0;i<500*f;i++){const r=(i/500)*38*f,an=i*.37+tt*(3-r*.04)+r*.1;const x=Math.round(cx+Math.cos(an)*r*.9),y=Math.round(cy+Math.sin(an)*r);if(y>Y+80||y<Y+12)continue;px(g,x,y,i%4===0?'#ffffff':i%2?NC[3]:NP[3])}glowAt(g,cx,cy,30,NC[3],.5*f)}
     else{for(let i=0;i<20;i++){const yy=Y+16+((i*7+tt*20)%64);if(bay(cx+i,yy)<.3)px(g,cx-30+((H(i,3)*60)|0),yy,NC[2])}}
     // pillars + beams (neon tubes)
     const tube=(x,y,w,h,c)=>{g.fillStyle=c[1];g.fillRect(x-1,y-1,w+2,h+2);g.fillStyle=c[3];g.fillRect(x,y,w,h);g.fillStyle=c[4];g.fillRect(x+(w>h?0:1),y+(w>h?1:0),w>h?w:1,w>h?1:h)};
     g.globalAlpha=fl;glowAt(g,X+18,Y+40,26,NP[3],.25);glowAt(g,X+90,Y+40,26,NP[3],.25);
     tube(X+14,Y+10,4,70,NP);tube(X+90,Y+10,4,70,NP);tube(X,Y+2,108,4,NP);tube(X+6,Y+16,96,3,NP);tube(X+52,Y+6,3,10,NC);g.globalAlpha=1;
     if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-3,e.w,1)}},
    upd(e,dt){const a=M.now-e.op;if(a<4.5&&!RM){M.emit(R,'code',e.x+54+(Math.random()-.5)*60,e.y+46,2,{dir:Math.random()*TAU,spread:.3})}},
    click(e,R){if(M.now-e.op<5)return;e.op=M.now;M.snd('glitch',.8);M.snd('charge',.6);M.flash(R,'#3affe8',.08);setTimeout(()=>{M.snd('hum',.8);M.say(R,e.x+54,e.y-6,'THE GATE TO THE NET OPENS',1.4)},400)}});
   // ---------- glitch kitsune ----------
   const FOX=M.mk(26,20,p=>{const O=['#2a0a14','#8a2a3a','#e05a5a','#ff9a8a','#ffe0d8'];p.ell(13,13,8,5,O,{b:.1});p.poly([[18,10],[22,2],[25,8],[26,12],[20,14]],O,{v:.6,bv:.3});p.poly([[20,4],[19,0],[22,3]],O,{v:.7});p.poly([[23,5],[24,1],[25,6]],O,{v:.7});
   p.rect(24,10,2,1,'#05050a');p.px(22,7,'#3affe8');p.rect(7,16,2,4,O[2]);p.rect(16,16,2,4,O[2]);p.ell(16,14,3,2,['#e0c0b8','#ffffff'],{});},'#14040a');
   M.ent(R,{name:'GLITCH KITSUNE',x:220,y:FL-26,w:30,h:22,box:1,z:FL,tl:1,tlT:-9,gl:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t;const n=e.tl;
     for(let i=0;i<n;i++){const sp=n>1?(i/(n-1)-.5):0,an=-Math.PI/2-.6+sp*2.2+Math.sin(tt*2+i)*.08;for(let s=0;s<16;s++){const u=s/16,x=X+6+Math.cos(an)*s*1.2+Math.sin(tt*3+i+u*3)*u*2,y=Y+12+Math.sin(an)*s*1.2,w=Math.max(1,Math.round(Math.sin(u*Math.PI*.9+.3)*3.5));g.fillStyle=u>.8?'#ffffff':u>.5?NC[3]:'#e05a5a';g.fillRect(Math.round(x-w/2),Math.round(y-w/2),w,w)}}
     const gl=M.now-e.gl<.6||((tt*3)|0)%17===0;if(gl){g.globalAlpha=.6;g.drawImage(FOX.c,X+2,Y+2);g.globalCompositeOperation='lighter';g.globalAlpha=.4;g.fillStyle='#ff00aa';g.fillRect(X+2,Y+2+((tt*40)|0)%18,26,2);g.globalCompositeOperation='source-over';g.globalAlpha=1}
     if(sel)g.drawImage(M.ring(FOX),X+1,Y+1);g.drawImage(FOX.c,X+2+(gl?Math.round(Math.sin(tt*90)):0),Y+2);
     for(let i=0;i<Math.min(n,3);i++){const an=tt*2+i*TAU/3,x=X+15+Math.cos(an)*20,y=Y+4+Math.sin(an)*6;glowAt(g,x,y,5,NC[3],.6);px(g,x,y,'#ffffff')}},
    click(e,R){e.gl=M.now;if(e.tl<9){e.tl++;M.snd('glitch',1+e.tl*.06);M.snd('spell',1+e.tl*.05);M.emit(R,'code',e.x+8,e.y,6);M.say(R,e.x+15,e.y-14,e.tl===9?'NINE TAILS! ASCENDED.':e.tl+' TAILS',.9);if(e.tl===9){M.flash(R,'#3affe8',.1);M.emit(R,'star',e.x+15,e.y,20,{c:['#3affe8','#ffffff','#ff3a9a']})}}
     else{e.tl=1;M.snd('boo',1.4);M.say(R,e.x+15,e.y-14,'*POOF* (RESET)',.8);M.emit(R,'smoke',e.x+10,e.y+8,10)}}});
   // ---------- data koi -> dragon ----------
   M.ent(R,{name:'DATA KOI POND',x:330,y:FL-2,w:80,h:14,box:1,z:FL+4,lp:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.lp,on=a<3.2;g.fillStyle='#04121a';for(let y=0;y<10;y++){const w=Math.round(40*Math.sqrt(1-Math.pow((y-5)/5.5,2)));g.fillRect(X+40-w,Y+2+y,w*2,1)}g.fillStyle=NC[1];g.fillRect(X+4,Y+2,72,1);
     if(!on)for(let i=0;i<3;i++){const an=tt*(.8+i*.2)+i*2,x=X+40+Math.cos(an)*26,y=Y+7+Math.sin(an)*3;const c=[NP[3],NC[3],'#ffd040'][i];for(let s=0;s<5;s++)px(g,x-Math.sin(an)*s*1.2*(1),y+Math.cos(an)*s*.3,s===0?'#ffffff':c,s<3?2:1,1)}
     else{const k=a/3.2;const pts=[];for(let s=0;s<34;s++){const u=k*1.2-s*.012;if(u<0||u>1)continue;const x=X+40+(u-.5)*220,y=Y-Math.sin(u*Math.PI)*90+Math.sin(u*20+s*.5)*4;pts.push([x,y,s])}
      for(const[x,y,s]of pts){const w=s<4?3:s<20?2:1;g.fillStyle=s===0?'#ffffff':s%3===0?'#ffd040':s%2?NC[3]:NP[3];g.fillRect(Math.round(x)-1,Math.round(y)-w+1,w,w);if(s===2){px(g,x+1,y-4,NP[4]);px(g,x+3,y-5,NP[4])}}if(pts[0])glowAt(g,pts[0][0],pts[0][1],10,NC[3],.5)}
     if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,e.w,1)}},
    click(e,R){if(M.now-e.lp<3.2)return;e.lp=M.now;M.snd('bubble',1);M.snd('roar',1.8);M.emit(R,'water',e.x+40,e.y+4,16);M.say(R,e.x+40,e.y-30,'THE KOI BECOME A DRAGON!',1.4);setTimeout(()=>{M.snd('bubble',.7);M.emit(R,'water',e.x+150,e.y,14)},3000)}});
   // ---------- android monk ----------
   const MONK=M.mk(24,26,p=>{const S=['#1a1a2a','#3a3a5a','#6a6a8a','#a0a0c0','#e0e0f0'],O=['#2a0a04','#8a3a0a','#e07010','#ffa030'];p.ell(12,22,11,4,O,{b:.1});p.poly([[5,22],[6,10],[18,10],[19,22]],O,{v:.5,bv:.3});p.ell(12,6,5,5.5,S,{b:.2,spec:'#ffffff'});
    p.rect(9,5,6,2,'#05050a');p.px(10,5,NC[3]);p.px(14,5,NC[3]);p.rect(9,15,6,4,S,{v:.6});p.px(12,16,NP[3]);p.line(6,12,10,17,S[2]);p.line(18,12,14,17,S[2])},'#05050a');
   M.ent(R,{name:'ANDROID MONK',x:690,y:FL-30,w:24,h:28,box:1,z:FL,md:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.md,on=a<5,lv=on?Math.round(Math.sin(Math.min(1,a/.8)*Math.PI/2)*14*(a>4.3?(5-a)/.7:1)):Math.round(Math.sin(tt*1.5));const y=Y-lv;
     if(on){for(let r=0;r<3;r++){const rr=20+r*10,n=r===1?10:40;for(let i=0;i<n;i++){const an=i/n*TAU+tt*(r%2?-1:1)*(.6+r*.2);const x=X+12+Math.cos(an)*rr,yy=y+14+Math.sin(an)*rr*.4;if(r===1)g.drawImage(K.gly(i*7,NP[3]),Math.round(x-2),Math.round(yy-2));else if(i%2)px(g,x,yy,NC[3])}}glowAt(g,X+12,y+12,30,NC[3],.25)}
     const hr=on?6+Math.round(Math.sin(tt*4)):5;for(let i=0;i<24;i++){const an=i/24*TAU;px(g,X+12+Math.cos(an)*hr*1.4,y-2+Math.sin(an)*hr*.4,i%2?'#ffd040':'#fff4c0')}glowAt(g,X+12,y-2,8,'#ffd040',.35);
     if(sel)g.drawImage(M.ring(MONK),X-1,y-1);g.drawImage(MONK.c,X,y);if(lv>2)glowAt(g,X+12,Y+26,8,NC[3],.4)},
    click(e,R){if(M.now-e.md<5)return;e.md=M.now;M.snd('hum',.6);M.snd('gong',.8);M.say(R,e.x+12,e.y-20,K.pick(['OMMMMM.EXE','ENLIGHTENMENT: 99 PERCENT','I HAVE TRANSCENDED MY FIRMWARE']),1.6);setTimeout(()=>M.snd('bell',1),1500)}});
   // ---------- glitch bonsai ----------
   M.ent(R,{name:'GLITCH BONSAI',x:850,y:FL-40,w:36,h:40,box:1,z:FL,gw:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.gw,on=a<4,wire=on&&a>1.6&&a<2.4;g.fillStyle='#3a1a1a';g.fillRect(X+8,Y+32,20,8);g.fillStyle=NP[2];g.fillRect(X+8,Y+32,20,1);
     const tr=[[18,32],[17,26],[14,20],[18,15],[23,10]];for(let i=0;i<tr.length-1;i++)M.line(g,X+tr[i][0],Y+tr[i][1],X+tr[i+1][0],Y+tr[i+1][1],wire?NC[3]:'#5a3a2a',wire?0:1);
     const cl=[[12,14,7],[24,8,8],[28,16,5],[8,20,5]],sc=on?1+Math.min(1,a/.6)*.4:1;for(const[cx,cy,r]of cl){const rr=Math.round(r*sc);for(let y=-rr;y<=rr;y++)for(let x=-rr;x<=rr;x++){if(x*x+y*y*1.6>rr*rr)continue;const xx=X+cx+x,yy=Y+cy+y;if(wire){if(Math.abs(x*x+y*y*1.6-rr*rr)<rr*1.5)px(g,xx,yy,NC[3]);continue}const v=bay(xx,yy);if(v<.15)continue;px(g,xx,yy,y<-rr/3?NP[4]:v>.6?NP[3]:NP[2])}}
     if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,e.w,1)}},
    upd(e,dt){if(!RM&&Math.random()<dt*(M.now-e.gw<4?30:1.5))M.emit(R,'petal',e.x+18+(Math.random()-.5)*30,e.y+10,1,{c:['#ffb0dc','#ff3a9a','#ffffff']})},
    click(e,R){e.gw=M.now;M.snd('chime',1.3);setTimeout(()=>{M.snd('glitch',1.2);M.say(R,e.x+18,e.y-6,'RENDERING... BLOSSOMS',1)},1600)}});
   // ---------- oni mask ----------
   const ONI=M.mk(22,24,p=>{const Rr=['#2a0404','#6a0a0a','#c01a1a','#ff4a3a','#ffa08a'];p.poly([[2,4],[20,4],[21,14],[16,23],[6,23],[1,14]],Rr,{v:.55,bv:.3});p.poly([[3,4],[0,-1],[6,3]],PAL.bone,{v:.7});p.poly([[19,4],[22,-1],[16,3]],PAL.bone,{v:.7});
    p.poly([[5,9],[10,10],[9,12],[5,11]],['#05050a']);p.poly([[17,9],[12,10],[13,12],[17,11]],['#05050a']);p.rect(6,17,10,3,'#05050a');for(let x=7;x<16;x+=2)p.px(x,17,'#ece0c4');p.px(7,19,'#ece0c4');p.px(14,19,'#ece0c4');p.line(4,7,10,8,'#05050a');p.line(18,7,12,8,'#05050a')},'#05050a');
   M.ent(R,{name:'ONI MASK',x:110,y:110,w:22,h:24,box:1,z:-3,lg:-9,
    draw(g,X,Y,t,e,sel){const a=M.now-e.lg,on=a<2.5,sp=on?Math.round(Math.sin(Math.min(1,a/.3)*Math.PI/2)*3*(a>2.1?(2.5-a)/.4:1)):0;
     if(sp>0){g.fillStyle='#05050a';g.fillRect(X+11-sp,Y,sp*2,24);for(let y=0;y<24;y+=2)px(g,X+11-sp+((H(y,(t*20)|0)*sp*2)|0),Y+y,NC[3])}
     g.drawImage(ONI.c,0,0,11,24,X-sp,Y,11,24);g.drawImage(ONI.c,11,0,11,24,X+11+sp,Y,11,24);
     if(on||((t*.5)%4)<.2){px(g,X+7-sp,Y+10,'#ff3a3a',2,1);px(g,X+14+sp,Y+10,'#ff3a3a',2,1);glowAt(g,X+11,Y+10,10,'#ff3a3a',.4)}if(sel)g.drawImage(M.ring(ONI),X-1,Y-1)},
    click(e,R){e.lg=M.now;M.snd('boo',.6);M.snd('glitch',.6);M.say(R,e.x+11,e.y-6,'HAHAHA... SYNTAX ERROR.',1.2)}});
   // ---------- lantern drones ----------
   const LC=[NP,NC,['#2a1a04','#8a5a10','#e0a020','#ffd040','#fff4c0'],VI];
   for(let i=0;i<6;i++)M.ent(R,{name:'LANTERN DRONE',x:80+i*160,y:40,w:10,h:16,box:1,z:-1,noNav:1,ci:i%4,sp:-9,bx:80+i*160,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,c=LC[e.ci],spin=M.now-e.sp<1;const pr=Math.round(Math.cos(tt*(spin?60:30))*5);px(g,X+5-Math.abs(pr),Y,'#a0a0c0',Math.abs(pr)*2+1,1);px(g,X+4,Y+1,'#3a3a5a',2,2);
     glowAt(g,X+5,Y+9,10,c[3],.35);g.fillStyle=c[2];g.fillRect(X+1,Y+3,8,11);g.fillStyle=c[3];g.fillRect(X+2,Y+4,5,9);g.fillStyle=c[4];g.fillRect(X+3,Y+5,2,6);g.fillStyle='#1a1a2a';g.fillRect(X+1,Y+3,8,1);g.fillRect(X+1,Y+13,8,1);g.drawImage(K.gly(i*5,'#1a0a14'),X+3,Y+6);
     if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,10,1)}},
    upd(e,dt,t){const tt=RM?0:t,spin=M.now-e.sp<1;e.x=Math.round(e.bx+Math.sin(tt*.4+i)*30);e.y=Math.round(36+Math.sin(tt*.9+i*2)*8-(spin?Math.sin((M.now-e.sp)*Math.PI)*12:0))},
    click(e,R){e.ci=(e.ci+1)%4;e.sp=M.now;M.snd('servo',1.6);M.emit(R,'spark',e.x+5,e.y+14,6,{c:[LC[e.ci][3],'#ffffff']})}});
   // ---------- vending machine ----------
   M.ent(R,{name:'SHRINE VENDING MACHINE',x:960,y:FL-40,w:24,h:40,box:1,z:FL,dr:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t;g.fillStyle='#e8e8f0';g.fillRect(X,Y,24,40);g.fillStyle='#1a1a2a';g.fillRect(X+2,Y+2,20,22);glowAt(g,X+12,Y+12,14,NC[3],.3);
     for(let r=0;r<3;r++)for(let c=0;c<4;c++)px(g,X+4+c*5,Y+4+r*7,[NP[3],NC[3],'#ffd040','#7aff7a'][(c+r)%4],3,5);g.fillStyle='#05050a';g.fillRect(X+4,Y+30,16,6);
     const a=M.now-e.dr;if(a<1.5){px(g,X+10,Y+31,NP[3],4,4)}if(((tt*2)|0)%2)px(g,X+20,Y+27,'#ff3a3a',2,1);if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,24,1)}},
    click(e,R){e.dr=M.now;M.snd('beep',1.2);setTimeout(()=>{M.snd('clang',1.4);M.say(R,e.x+12,e.y-6,K.pick(['NEON SODA: +5 HP','RAMEN.EXE DISPENSED','ONIGIRI (DIGITAL)']),1)},400)}});},
  back(R,g,ox,oy,t){const tt=RM?0:t;// neon rain + holo signs
   for(const r of R.rain){const y=((r.y+tt*r.s)%(FL+20))-10,x=Math.round(((r.x-y*.15)%W+W)%W+ox*.7);if(x<0||x>M.BW)continue;g.fillStyle=r.c;g.fillRect(x,Math.round(y+oy),1,4)}
   for(const[x,y,c,n]of[[150,50,NP,4],[640,44,NC,5],[820,60,VI,3]]){const X=Math.round(x+ox*.85),Y=Math.round(y+oy);if(X<-60||X>M.BW+20)continue;const fl=((tt*5+x)|0)%29===0;if(fl)continue;glowAt(g,X+n*4,Y+3,16,c[3],.2);for(let i=0;i<n;i++)g.drawImage(K.gly(x+i,c[3]),X+i*8,Y)}}
 })}

/* ======================= STARSHIP RELIC VAULT ======================= */
{const W=1000,FL=168,TL=['#020c10','#06202a','#0e3a44','#1a5a62','#3a8a8a'],TQ=['#02201c','#0a4a40','#14907a','#3affd0','#c0fff0'],AL=['#2a0a3a','#5a1a7a','#a03ae0','#e080ff','#ffd0ff'],
  WM=['#2a1404','#6a3a0a','#c07010','#ffb030','#fff0a0'];
 M.K.ext('relic',{top:'#020a0e',bot:'#020a0e',start:500,
  bg(p,R){for(let y=0;y<FL;y++)for(let x=0;x<W;x++)p.px(x,y,rp(TL,.18+(fbm(x/40,y/20)-.5)*.2+y/FL*.15,x,y));
   // hex panel wall
   for(let y=30;y<FL-10;y+=12)for(let x=((y/12)%2)*10;x<W;x+=20){const sd=H(x,y);p.poly([[x+5,y],[x+15,y],[x+19,y+6],[x+15,y+12],[x+5,y+12],[x+1,y+6]],['#020a0e','#04161a','#082228','#0c2c32'],{v:.3+(sd-.5)*.2+y/FL*-.1,bv:.2});if(sd>.96)p.rect(x+8,y+5,4,2,TQ[2])}
   // ribs: ancient alien pillars with gold glyph bands
   for(const x of[215,450,600,755]){p.rect(x-7,22,14,FL-22,TL,{v:.55,bv:.35,tex:tx(.12,3)});p.rect(x-9,FL-14,18,14,TL,{v:.6});for(let y=40;y<FL-20;y+=9)K.glyph(p,x-2,y,x+y,WM[2])}
   for(let x=0;x<W;x+=8)K.glyph(p,x+1,92,x*3,x%16?WM[1]:WM[2]);p.rect(0,90,W,1,WM[1]);p.rect(0,98,W,1,WM[1]);
   // observation windows with starfield & a nebula
   for(const wx of[100,330,670,900]){for(let y=40;y<84;y++)for(let x=wx-36;x<wx+36;x++){const d=Math.abs(x-wx)/36;if(y<44+d*d*8)continue;const n=fbm(x/20+wx,y/14);let c=n>.6?mix('#1a0a3a','#5a1a6a',(n-.6)*2):'#02030a';if(H(x,y)>.985)c='#ffffff';else if(H(x,y)>.97)c='#8ab0d0';p.px(x,y,c)}
    p.rect(wx-38,38,76,3,TL,{v:.7});p.rect(wx-38,84,76,4,TL,{v:.6});p.rect(wx-1,40,2,44,TL,{v:.5})}
   // ceiling machinery
   for(let x=0;x<W;x++){for(let y=0;y<22;y++)p.px(x,y,rp(TL,.3+(y===21?.4:0)-(x%40<2?.2:0),x,y));if(x%40===20)for(let y=22;y<30;y++)p.px(x,y,TL[2])}
   for(let x=0;x<W;x+=8)p.px(x,20,TQ[2]);
   // floor: metal deck with glowing seams
   for(let y=FL;y<M.RH;y++)for(let x=0;x<W;x++){let c=rp(TL,.3+(y-FL)/40*.25+(fbm(x/6,y/3)-.5)*.15,x,y);if(x%32===0||y===FL)c=TL[0];if(y===FL+1)c=TQ[2];p.px(x,y,c)}},
  init(R){K.motes(R,30,0,W,24,FL,['#3affd0','#c0fff0','#e080ff'],{big:false});
   // ---------- hypercube ----------
   const V=[];for(let i=0;i<16;i++)V.push([(i&1)?1:-1,(i&2)?1:-1,(i&4)?1:-1,(i&8)?1:-1]);const E=[];for(let i=0;i<16;i++)for(let j=i+1;j<16;j++){const d=i^j;if((d&(d-1))===0)E.push([i,j])}
   M.ent(R,{name:'HYPERCUBE',x:170,y:FL-90,w:60,h:60,box:1,z:FL,sp:-9,ang:0,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.sp,on=a<3,un=on?Math.sin(Math.min(1,a/3)*Math.PI):0;const A=e.ang,B=tt*.4;const cx=X+30,cy=Y+30+Math.round(Math.sin(tt*1.2)*2),S=11+un*7;
     glowAt(g,cx,cy,30,TQ[3],.2+un*.2);g.fillStyle=TL[2];g.fillRect(cx-10,Y+60,20,4);g.fillStyle=TQ[3];g.fillRect(cx-10,Y+60,20,1);
     const P=V.map(([x,y,z,w])=>{let x1=x*Math.cos(A)-w*Math.sin(A),w1=x*Math.sin(A)+w*Math.cos(A);let y1=y*Math.cos(A*.7)-w1*Math.sin(A*.7),w2=y*Math.sin(A*.7)+w1*Math.cos(A*.7);w2*=1+un;const k=2/(3-w2*.5);let X3=x1*k,Y3=y1*k,Z3=z*k;const xr=X3*Math.cos(B)-Z3*Math.sin(B),zr=X3*Math.sin(B)+Z3*Math.cos(B);return[cx+xr*S,cy+Y3*S,zr,w2]});
     for(const[i,j]of E){const p=P[i],q=P[j],inner=p[3]<0&&q[3]<0;M.line(g,p[0],p[1],q[0],q[1],inner?AL[3]:TQ[3])}for(const p of P)px(g,p[0],p[1],'#ffffff');
     if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,e.w,1)}},
    upd(e,dt){const on=M.now-e.sp<3;e.ang+=dt*(on?2.6:.5)*(RM?0:1)},
    click(e,R){if(M.now-e.sp<3)return;e.sp=M.now;M.snd('hum',1.2);M.snd('glitch',1.6);M.say(R,e.x+30,e.y-6,'UNFOLDING THE 4TH DIMENSION',1.4);M.emit(R,'star',e.x+30,e.y+30,16,{c:['#3affd0','#e080ff','#ffffff']})}});
   // ---------- stasis pod ----------
   const ALN=M.mk(16,30,p=>{p.ell(8,7,6,7,AL,{b:.15});p.poly([[4,13],[12,13],[13,28],[3,28]],AL,{v:.5,bv:.3});p.line(3,15,0,24,AL[2]);p.line(13,15,15,24,AL[2])},'#14041a');
   M.ent(R,{name:'STASIS POD',x:360,y:FL-58,w:32,h:58,box:1,z:FL,wk:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.wk,on=a<4.5,clr=on?Math.min(1,a/.6)*(a>3.8?(4.5-a)/.7:1):0;g.fillStyle=TL[1];g.fillRect(X,Y,32,6);g.fillRect(X,Y+52,32,6);g.fillStyle=TQ[3];g.fillRect(X+4,Y+4,24,1);g.fillRect(X+4,Y+53,24,1);
     g.fillStyle='#04201c';g.fillRect(X+3,Y+6,26,46);glowAt(g,X+16,Y+28,20,TQ[3],.25);const wave=on&&a>1.2&&a<3.5?Math.round(Math.sin(a*12)*2):0;g.drawImage(ALN.c,X+8,Y+14+Math.round(Math.sin(tt*1.2)));
     if(on){px(g,X+13,Y+20,'#ffffff',2,2);px(g,X+18,Y+20,'#ffffff',2,2);px(g,X+14,Y+21,'#05050a');px(g,X+19,Y+21,'#05050a');if(wave)M.line(g,X+21,Y+30,X+27,Y+22+wave,AL[3])}else{px(g,X+13,Y+21,'#05050a',2,1);px(g,X+18,Y+21,'#05050a',2,1)}
     for(let y=6;y<52;y++)for(let x=3;x<29;x++){if(bay(X+x,Y+y)<.55*(1-clr)){g.fillStyle=y%5===0?'#c0fff0':'#5ac0b0';g.globalAlpha=.5;g.fillRect(X+x,Y+y,1,1);g.globalAlpha=1}}
     for(let i=0;i<4;i++){const by=Y+50-((tt*14+i*12)%44);px(g,X+8+i*5,by,'#c0fff0')}g.fillStyle=TL[3];g.fillRect(X+2,Y+6,1,46);g.fillRect(X+29,Y+6,1,46);if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,32,1)}},
    click(e,R){if(M.now-e.wk<4.5)return;e.wk=M.now;M.snd('hiss',1);M.snd('steam',1);setTimeout(()=>{M.snd('beep',1.6);M.say(R,e.x+16,e.y-8,K.pick(['GREETINGS, CARBON UNIT.','IS IT 3024 YET?','5 MORE MILLENNIA PLEASE']),1.6)},1200);M.emit(R,'steam',e.x+16,e.y,10)}});
   // ---------- plasma core ----------
   M.ent(R,{name:'PLASMA CORE',x:494,y:FL-110,w:52,h:110,box:1,z:FL-1,ov:-9,ang:0,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.ov,on=a<4,crit=on&&a<2.6;const cx=X+26,col=crit?['#ff3a3a','#ffb0a0']:[TQ[3],TQ[4]];
     g.fillStyle=TL[1];g.fillRect(cx-14,Y,28,8);g.fillRect(cx-16,Y+96,32,14);g.fillStyle=TL[3];g.fillRect(cx-14,Y+7,28,1);g.fillRect(cx-16,Y+96,32,1);
     glowAt(g,cx,Y+52,crit?40:28,col[0],crit?.45:.3);for(let y=Y+8;y<Y+96;y++){const w=4+Math.round(Math.sin(y*.3+tt*(crit?30:8))*1.5);for(let x=-w;x<=w;x++)if(bay(cx+x,y+((tt*40)|0))<1-Math.abs(x)/w*.8){g.fillStyle=Math.abs(x)<2?'#ffffff':Math.abs(x)<w-1?col[1]:col[0];g.fillRect(cx+x,y,1,1)}}
     for(let r=0;r<3;r++){const yy=Y+26+r*24,an=e.ang*(r%2?-1:1)+r;const rx=18+r*2;for(let i=0;i<40;i++){const q=i/40*TAU+an,x=cx+Math.cos(q)*rx,y=yy+Math.sin(q)*4;if(Math.sin(q)<0&&Math.abs(Math.cos(q))<.9){}px(g,x,y,(i%10)<2?'#ffffff':crit?'#c02a2a':TQ[2])}}
     if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,e.w,1)}},
    upd(e,dt){const a=M.now-e.ov,crit=a<2.6;e.ang+=dt*(crit?14:1.5)*(RM?0:1);if(crit&&!RM&&Math.random()<dt*20)M.emit(R,'zap',e.x+26+(Math.random()-.5)*40,e.y+20+Math.random()*70,2,{c:['#ffffff','#ff8a8a']})},
    click(e,R){if(M.now-e.ov<4)return;e.ov=M.now;M.snd('charge',.6);M.say(R,e.x+26,e.y-6,'WARNING: CORE OVERLOAD',1.4);M.shake(R,2.4,1.5);let n=0;const b=()=>{M.snd('beep',n%2?.7:1);if(++n<6)setTimeout(b,350)};b();M.flash(R,'#ff3a3a',.1);
     setTimeout(()=>{M.snd('steam',.8);M.snd('hiss',.7);M.emit(R,'steam',e.x+10,e.y+96,14);M.emit(R,'steam',e.x+42,e.y+96,14);M.say(R,e.x+26,e.y-6,'...STABILISED. PHEW.',1.2)},2600)}});
   // ---------- star orrery ----------
   M.ent(R,{name:'STAR ORRERY',x:640,y:FL-96,w:80,h:80,box:1,z:FL,al:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.al,on=a<4,k=on?Math.min(1,a/.8)*(a>3.4?(4-a)/.6:1):0;const cx=X+40,cy=Y+38;g.fillStyle=TL[2];g.fillRect(cx-1,cy,2,52);g.fillRect(cx-12,Y+88,24,4);
     glowAt(g,cx,cy,16,'#ffd040',.5);g.drawImage(disc4('#ffd040'),cx-5,cy-5);
     const pl=[[14,.9,'#e080ff',2],[22,.55,'#3affd0',3],[31,.35,'#ff8a3a',3],[38,.2,'#8ab0ff',2]];
     pl.forEach(([r,s,c,sz],i)=>{for(let q=0;q<48;q++){const an=q/48*TAU;if(q%2)continue;px(g,cx+Math.cos(an)*r,cy+Math.sin(an)*r*.35,'#6aa0a8')}const an=lerp(tt*s+i*1.7,0,k);const x=cx+Math.cos(an)*r,y=cy+Math.sin(an)*r*.35;glowAt(g,x,y,sz+3,c,.4);px(g,x-1,y-1,c,sz,sz);px(g,x-1,y-1,'#ffffff')});
     if(k>.95){M.line(g,cx,cy,cx+60,cy,'#fff4c0');glowAt(g,cx+60,cy,8,'#ffd040',.6)}if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,e.w,1)}},
    click(e,R){if(M.now-e.al<4)return;e.al=M.now;M.snd('chime',.8);M.snd('power',1);setTimeout(()=>{M.snd('laser',1.2);M.say(R,e.x+40,e.y-6,'PLANETARY ALIGNMENT!',1.4);M.emit(R,'star',e.x+100,e.y+38,14)},800)}});
   const DC={};function disc4(c){return DC[c]||(DC[c]=M.mk(10,10,p=>p.ell(5,5,4.5,4.5,ramp(c),{b:.2,spec:'#ffffff'}),'#2a1a04').c)}
   // ---------- sentinel ----------
   M.ent(R,{name:'ANCIENT SENTINEL',x:790,y:FL-70,w:30,h:70,box:1,z:FL,sc:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.sc,on=a<3;g.fillStyle=TL[1];g.fillRect(X+10,Y+24,10,46);g.fillStyle=TL[3];g.fillRect(X+10,Y+24,1,46);g.fillRect(X+4,Y+64,22,6);
     const hy=Y+8+Math.round(Math.sin(tt*1.3)*2);for(let y=0;y<16;y++){const w=Math.round(13-Math.abs(y-8)*.8);g.fillStyle=y<3?TL[4]:TL[2];g.fillRect(X+15-w,hy+y,w*2,1)}
     const ec=on?'#ff3a3a':TQ[3];const ea=on?Math.sin(a*3)*.9:Math.sin(tt*.7)*.6;const ex=X+15+Math.round(Math.sin(ea)*6);glowAt(g,ex,hy+8,8,ec,.6);px(g,ex-2,hy+6,ec,5,4);px(g,ex,hy+7,'#ffffff',1,2);
     if(on){const tx=e.x+15+Math.sin(ea)*200;for(let y=0;y<FL-hy+e.y-Y;y++){}M.line(g,ex,hy+8,tx-e.x+X,FL+(Y-e.y),ec);glowAt(g,tx-e.x+X,FL+(Y-e.y),6,ec,.6)}
     if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,e.w,1)}},
    click(e,R){if(M.now-e.sc<3)return;e.sc=M.now;M.snd('laser',.4);M.snd('beep',.8);M.say(R,e.x+15,e.y-6,'SCANNING...',1);setTimeout(()=>{M.snd('ding',1);M.say(R,e.x+15,e.y-6,'IDENTITY: VISITOR. THREAT: CUTE.',1.6)},2200)}});
   // ---------- warp gate ----------
   const SHIP=M.mk(14,7,p=>{p.poly([[0,3],[8,0],[13,3],[8,6]],['#2a3a4a','#7a9ab0','#c0e0f0','#ffffff'],{v:.6});p.px(9,2,TQ[3])},'#05050a');
   M.ent(R,{name:'WARP GATE',x:900,y:FL-84,w:70,h:84,box:1,z:FL,wp:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,a=M.now-e.wp,on=a<3.5,cx=X+35,cy=Y+38;if(on){for(let i=0;i<60;i++){const an=H(i,1)*TAU,r=((H(i,2)+a*1.5)%1)*28;const x=cx+Math.cos(an)*r,y=cy+Math.sin(an)*r;M.line(g,x,y,cx+Math.cos(an)*r*1.25,cy+Math.sin(an)*r*1.25,i%3?'#c0fff0':AL[3])}glowAt(g,cx,cy,28,TQ[3],.4)}
     for(let i=0;i<64;i++){const an=i/64*TAU,r=31;const x=cx+Math.cos(an)*r,y=cy+Math.sin(an)*r;px(g,x-1,y-1,TL[3],3,3);const lit=((i+((tt*(on?40:8))|0))%8)===0;if(lit)px(g,x,y,TQ[4])}
     g.fillStyle=TL[2];g.fillRect(cx-16,Y+70,32,14);g.fillStyle=TQ[3];g.fillRect(cx-16,Y+70,32,1);
     if(on&&a>1){const k=(a-1)/2.5;const sx=cx-k*300,sy=cy+Math.sin(k*6)*6;g.drawImage(M.flipC({c:SHIP.c,w:SHIP.w,h:SHIP.h}),Math.round(sx-7),Math.round(sy-3));px(g,sx+7,sy,'#ffb030',3,1);glowAt(g,sx+8,sy,4,'#ffb030',.6)}
     if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,e.w,1)}},
    click(e,R){if(M.now-e.wp<3.5)return;e.wp=M.now;M.snd('charge',.8);M.snd('whoosh',.5);setTimeout(()=>{M.snd('laser',.7);M.flash(R,'#c0fff0',.08);M.say(R,e.x+35,e.y-6,'INCOMING VESSEL!',1)},900)}});
   // ---------- console + drone ----------
   M.ent(R,{name:'ALIEN CONSOLE',x:250,y:FL-24,w:34,h:24,box:1,z:FL,ty:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t;g.fillStyle=TL[2];g.fillRect(X,Y+6,34,18);g.fillStyle=TL[4];g.fillRect(X,Y+6,34,1);g.fillStyle='#02100c';g.fillRect(X+3,Y,28,8);
     for(let i=0;i<5;i++)g.drawImage(K.gly(((tt*2)|0)+i+(M.now-e.ty<2?50:0),M.now-e.ty<2?AL[3]:TQ[3]),X+4+i*5,Y+2);for(let i=0;i<6;i++)px(g,X+4+i*5,Y+12,((tt*4+i)|0)%3?TL[3]:['#ff3a3a','#3affd0','#ffd040'][i%3],3,2);if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,34,1)}},
    click(e,R){e.ty=M.now;M.snd('type',1);M.snd('beep',1.4);M.say(R,e.x+17,e.y-6,K.pick(['TRANSLATING: "DO NOT PRESS"','TRANSLATING: "SNACK BAY 4"','STAR CHART UPDATED']),1.2)}});
   const DR=M.mk(12,8,p=>{p.ell(6,4,5,3.5,['#1a2a3a','#4a6a8a','#8ab0d0','#e0f0ff'],{b:.2});p.px(6,4,'#3affd0')},'#05050a');
   M.ent(R,{name:'MAINTENANCE DRONE',x:400,y:50,w:12,h:8,box:1,z:-1,noNav:1,bp:-9,
    draw(g,X,Y,t,e,sel){if(sel)g.drawImage(M.ring(DR),X-1,Y-1);g.drawImage(DR.c,X,Y);px(g,X+5,Y+8,'#3affd0',2,1);if(M.now-e.bp<1.5){M.line(g,X+6,Y+8,X+6+Math.sin(t*20)*10,Y+40,'#3affd0')}},
    upd(e,dt,t){const tt=RM?0:t;e.x=Math.round(500+Math.sin(tt*.15)*420);e.y=Math.round(46+Math.sin(tt*.9)*8)},
    click(e,R){e.bp=M.now;M.snd('beep',2);M.snd('zap',1.6);M.say(R,e.x+6,e.y-6,'BEEP BOOP (REPAIRING)',.9)}});},
  back(R,g,ox,oy,t){const tt=RM?0:t;for(const wx of[100,330,670,900]){const X=Math.round(wx+ox);if(X<-40||X>M.BW+40)continue;for(let i=0;i<6;i++){const x=X-34+(((tt*6+i*13)%68)|0),y=Math.round(48+H(i,wx)*30+oy);g.fillStyle='#c0e0ff';g.fillRect(x,y,1,1)}}}
 })}
})();
