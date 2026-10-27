/* Shared kit: ancient-temple painters (stone, pillars, vines, runes, floors), live fx helpers,
   the MORPH exhibit factory (plain -> powered, with flash/aura/special) and the part-by-part RIG for mechs. */
(()=>{'use strict';
const{ramp,rp,vn,fbm,H,bay,TAU,RM,mix,clamp,lerp,RH}=M;
const K=M.K={};
K.ext=(id,o)=>Object.assign(M.defs[id],o);
K.open=url=>{try{window.open(url,'_blank','noopener')}catch(e){}};
K.rnd=(a,b)=>a+Math.random()*(b-a);
K.pick=a=>a[(Math.random()*a.length)|0];
K.spr=(w,h,fn,ol)=>M.mk(w,h,fn,ol);
K.shake=(R,d,a)=>M.shake(R,d,a);
K.flash=(R,c,d)=>M.flash(R,c,d);
/* palettes (dark -> light, 5 steps) */
const PAL=K.PAL={
 sand:['#2a1a1a','#5a3a2a','#8a6040','#b8905a','#e0c088'],
 moss:['#0e2a14','#1e4a1e','#3a7a2a','#6ab03a','#a8e05a'],
 slate:['#0e0c1a','#1e1a30','#2e2a48','#463e64','#6a6088'],
 jade:['#06201c','#0e3a32','#1a5e4e','#2e8a6e','#6ac09a'],
 basalt:['#0a0810','#16121e','#241e2e','#352c40','#4e4258'],
 bone:['#2a2026','#5a4a48','#8a7a6a','#bcae96','#ece0c4'],
 rust:['#1e0c08','#4a1e10','#8a3a18','#c86a2a','#f0a850'],
 steel:['#10141e','#283246','#4a5a70','#7a8ca0','#c0d0dc'],
 gold:['#3a2008','#6a4210','#a87020','#e0a838','#ffe08a'],
 iron:['#16161e','#2e2e3a','#4e4e5c','#7a7a88','#b0b0bc'],
 wood:['#1a0e0a','#3a2014','#5e3a20','#8a5a30','#b88a50'],
 leather:['#1e100a','#3e2214','#62381e','#8a5a32','#b0844e']};
/* a procedural symmetric 5x5 rune glyph (cached as a canvas) */
const GLC=new Map();
K.glyphBits=sd=>{const b=[];for(let j=0;j<5;j++){b.push([]);for(let i=0;i<3;i++)b[j][i]=H(sd*7+j,i+3)>.48||(i===2&&(j===0||j===4)&&H(sd,j)>.3)}b[2][2]=true;return b};
K.glyph=(p,x,y,sd,c)=>{const b=K.glyphBits(sd);for(let j=0;j<5;j++)for(let i=0;i<5;i++)if(b[j][i<3?i:4-i])p.px(x+i,y+j,c)};
K.gly=(sd,c)=>{const k=sd+c;let s=GLC.get(k);if(!s){s=M.mk(5,5,p=>K.glyph(p,0,0,sd,c),false);GLC.set(k,s)}return s.c};
/* masonry wall with mortar seams, bevels, chips, cracks and optional moss on the block tops */
K.wall=(p,x0,y0,x1,y1,pal,o={})=>{const bh=o.bh||9,bw=o.bw||16,sd=o.sd||3,mo=o.mortar||pal[0];
 for(let y=Math.max(0,y0);y<Math.min(p.h,y1);y++){const row=Math.floor((y-y0)/bh),by=(y-y0)%bh,off=Math.floor(H(row,sd)*bw);
  for(let x=Math.max(0,x0);x<Math.min(p.w,x1);x++){if(o.test&&!o.test(x,y))continue;const xx=x-x0+off,bi=Math.floor(xx/bw),bx=xx%bw,hb=H(bi,row*7+sd*31);
   if(bx===0||by===0){p.px(x,y,mo);continue}
   if(hb<.1&&bx+by<4){p.px(x,y,mo);continue}
   let v=(o.v??.42)+(hb-.5)*.24+(fbm(x/7+sd,y/7)-.5)*.3+(o.lv?o.lv(x,y):0);
   if(bx===1||by===1)v+=.2;else if(bx===bw-1||by===bh-1)v-=.17;
   if(hb>.84&&by>1){const c0=2+(hb*97%1)*(bw-4),sl=((hb*13)%1-.5)*1.6;if(Math.abs(bx-(c0+(by-bh/2)*sl))<.6){p.px(x,y,mo);continue}}
   let c=rp(pal,v,x,y);
   if(o.moss&&by<4&&fbm(x/11+5,y/6+sd)>.6+by*.04)c=rp(o.moss,.25+fbm(x/3,y/3)*.6,x,y);
   p.px(x,y,c)}}};
/* colossal fluted column; o: cap, base, broken, drum, rune(col) */
K.pillar=(p,cx,top,bot,w,pal,o={})=>{const x0=Math.round(cx-w/2),cap=o.cap??8,base=o.base??8,drum=o.drum||24;
 const st=top+cap,en=bot-base;
 for(let y=st;y<en;y++)for(let x=x0;x<x0+w;x++){const nx=(x+.5-cx)/(w/2),f=(x-x0)%4;if(o.broken&&y<st+6+H(x,3)*10&&y<st+10)continue;
  let v=.6-nx*.42-nx*nx*.18+(fbm(x/5,y/9)-.5)*.22;if(f===0)v-=.2;else if(f===1)v+=.08;
  if((y-st)%drum===0)v-=.3;else if((y-st)%drum===1)v+=.12;
  if(H(x>>2,(y/drum|0)+7)>.9&&f===2)v-=.25;p.px(x,y,rp(pal,v,x,y))}
 if(!o.broken&&cap){for(let y=top;y<st;y++){const j=y-top,ww=j<3?w+10:j<5?w+6:w+3;const xa=Math.round(cx-ww/2);for(let x=xa;x<xa+ww;x++){let v=j<3?.7-(j===2?.2:0):.5;const nx=(x+.5-cx)/(ww/2);v-=nx*.25;if(j===0)v+=.15;p.px(x,y,rp(pal,v,x,y))}}
  p.px(Math.round(cx-w/2-5),top+3,pal[0]);p.px(Math.round(cx+w/2+4),top+3,pal[0])}
 for(let y=en;y<bot;y++){const j=y-en,ww=j<3?w+4:w+10;const xa=Math.round(cx-ww/2);for(let x=xa;x<xa+ww;x++){const nx=(x+.5-cx)/(ww/2);let v=.55-nx*.25+(j===0||j===3?.18:0)-(j===2?.2:0);p.px(x,y,rp(pal,v,x,y))}}
 if(o.rune){for(let k=0;k<3;k++)K.glyph(p,Math.round(cx-2),st+12+k*9,o.sd*5+k,o.rune)}
 if(o.vines)for(let k=0;k<o.vines;k++)K.vine(p,x0+2+H(k,cx)*(w-4),st-2,18+H(cx,k)*40,cx+k)};
K.vine=(p,x,y,len,sd,pal=PAL.moss)=>{for(let i=0;i<len;i++){const xx=Math.round(x+Math.sin(i*.16+sd)*2+(vn(i/9,sd)-.5)*4),yy=Math.round(y+i);p.px(xx,yy,rp(pal,.3+(i%5===0?.2:0),xx,yy));
  if(i%4===2){const s=(i>>2)%2?1:-1;p.px(xx+s,yy,pal[3]);p.px(xx+s*2,yy-1,pal[3]);p.px(xx+s*2,yy,pal[2]);if(H(i,sd)>.5)p.px(xx+s,yy-1,pal[4])}}};
/* big stone floor slabs; inlay(x,y,v) may return a colour to paint glowing inlays */
K.floor=(p,y0,y1,pal,o={})=>{let y=y0,row=0;const rows=[];while(y<y1){const h=Math.round(5+row*2.2);rows.push([y,Math.min(y1,y+h),row]);y+=h;row++}
 for(const[a,b,r]of rows){const tw=Math.round((o.tw||22)+r*7),off=Math.floor(H(r,9)*tw);for(let yy=a;yy<b;yy++)for(let x=0;x<p.w;x++){const xx=x+off,bi=Math.floor(xx/tw),bx=xx%tw,hb=H(bi,r+40),k=(yy-y0)/(y1-y0);
   let v=(o.v??.34)+k*.22+(hb-.5)*.18+(fbm(x/9,yy/5)-.5)*.22;if(yy===a)v=-.1;else if(yy===a+1)v+=.18;if(bx===0)v=-.1;else if(bx===1)v+=.1;
   let c=v<0?pal[0]:rp(pal,v,x,yy);if(o.inlay){const q=o.inlay(x,yy);if(q)c=q}p.px(x,yy,c)}}};
/* stone plinth with a glyph */
K.ped=(p,cx,yb,w,h,pal,gc,sd=1)=>{const x0=Math.round(cx-w/2);p.rect(x0-2,yb-h,w+4,3,pal,{v:.62,bv:.2});p.rect(x0,yb-h+3,w,h-6,pal,{v:.42,bv:.18,tex:(x,y)=>(fbm(x/4,y/4)-.5)*.3});p.rect(x0-3,yb-3,w+6,3,pal,{v:.5,bv:.2});if(gc)K.glyph(p,Math.round(cx-2),yb-h+Math.round(h/2)-2,sd,gc)};
/* broken arch of wedge stones */
K.arch=(p,cx,yb,w,h,th,pal,o={})=>{const rx=w/2,ry=h;for(let y=yb-ry-th;y<yb;y++)for(let x=Math.round(cx-rx-th);x<=cx+rx+th;x++){const dx=(x+.5-cx),dy=(y+.5-yb);const r1=Math.hypot(dx/rx,dy/ry),r2=Math.hypot(dx/(rx+th),dy/(ry+th));if(r1<1||r2>1)continue;const a=Math.atan2(-dy,dx),seg=Math.floor(a/(Math.PI/(o.n||11)));if(o.broken&&a>Math.PI*.55&&a<Math.PI*.75)continue;
  const sa=(a/(Math.PI/(o.n||11)))%1;let v=.5+(H(seg,4)-.5)*.2+(fbm(x/5,y/5)-.5)*.25-(dx/(rx+th))*.2;if(sa<.08)v=-.1;else if(sa<.18)v+=.15;if(r1<1.04)v+=.15;p.px(x,y,v<0?pal[0]:rp(pal,v,x,y))}};
/* starfield/nebula painter (for cosmic rooms) */
K.space=(p,x0,y0,x1,y1,pal,neb,sd=1,amt=.5)=>{for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){let c=rp(pal,.15+(y-y0)/(y1-y0)*.6+(vn(x/90+sd,y/70)-.5)*.3,x,y);const n=fbm(x/60+sd*7,y/40+sd)+(amt-.5)*.4;if(neb&&n>.52)c=rp(neb,(n-.52)*3.2,x,y);p.px(x,y,c)}
 const ns=Math.round((x1-x0)*(y1-y0)/220);for(let i=0;i<ns;i++){const x=x0+Math.floor(H(i,sd)*(x1-x0)),y=y0+Math.floor(H(i,sd+11)*(y1-y0)),b=H(i,sd+23);if(b>.985){p.px(x,y,'#ffffff');p.px(x-1,y,'#bcd8ff');p.px(x+1,y,'#bcd8ff');p.px(x,y-1,'#bcd8ff');p.px(x,y+1,'#bcd8ff')}else p.px(x,y,b>.8?'#ffffff':b>.5?'#a8a0d0':'#5a5490')}};
/* live pixel flame on a 2d context: (x,yb) bottom centre */
K.flame=(g,x,yb,w,h,t,cols=['#fff4b0','#ffc040','#ff7020','#c02a10'],sd=0)=>{for(let j=0;j<h;j++){const k=j/h,ww=w*Math.pow(1-k,.8)*(.75+.25*Math.sin(t*11+j*.7+sd)),sx=Math.sin(t*6+j*.35+sd)*k*2.5;if(ww<.4){if(bay(x,j+(t*20|0))<.4){g.fillStyle=cols[3];g.fillRect(Math.round(x+sx),yb-j,1,1)}continue}
  for(let i=Math.round(-ww);i<=Math.round(ww);i++){const d=Math.abs(i)/(ww+.5)+k*.7;const ci=d<.45?0:d<.8?1:d<1.15?2:3;if(ci===3&&bay(i+Math.round(x),j+((t*24)|0))>.5)continue;g.fillStyle=cols[ci];g.fillRect(Math.round(x+i+sx),yb-j,1,1)}}};
/* ambient floating motes/wisps in an area (one entity, no hit) */
K.motes=(R,n,x0,x1,y0,y1,cols,o={})=>{const ms=[];for(let i=0;i<n;i++)ms.push({x:x0+H(i,R.w)*(x1-x0),y:y0+H(i,7)*(y1-y0),p:H(i,3)*TAU,s:.3+H(i,5)*.8});
 return M.ent(R,{x:0,y:0,w:1,h:1,nohit:1,z:o.z??999,draw(g,X,Y,t){const ox=X,oy=Y;for(const m of ms){const tt=RM?0:t,x=Math.round(ox+m.x+Math.sin(tt*m.s+m.p)*10),y=Math.round(oy+m.y+Math.sin(tt*m.s*1.3+m.p*2)*6-((tt*m.s*6)%20));if(x<-4||x>M.BW+4)continue;const tw=(Math.sin(tt*3*m.s+m.p)+1)/2;g.fillStyle=cols[(m.p*3|0)%cols.length];g.fillRect(x,y,1,1);if(tw>.6&&o.big!==false){g.fillRect(x-1,y,1,1);g.fillRect(x+1,y,1,1);g.fillRect(x,y-1,1,1);g.fillRect(x,y+1,1,1);g.fillStyle='#ffffff';g.fillRect(x,y,1,1)}}}})};
/* shimmering glyph band drawn live (back layer) */
K.runeLine=(g,x,y,n,sd,col,t,gap=7,glowCol)=>{for(let i=0;i<n;i++){const ph=(Math.sin(t*2-i*.6+sd)+1)/2;if(ph<.25)continue;if(ph>.75&&glowCol)M.glow(g,x+i*gap+2,y+2,5,glowCol,.5);g.drawImage(K.gly(sd+i,ph>.6?col[1]:col[0]),x+i*gap,y)}};

/* =========== MORPH: an exhibit that transforms from plain to powered ===========
 o: name, pname, x (centre), yb (bottom), F (frames: 0 plain .. n-1 powered), dur, aura, ar, float,
    snd0, snd1, start(e,R), during(e,R,k,dt), done(e,R), special(e,R) (returns busy seconds),
    under/over(g,X,Y,t,e,s), amb(e,R,dt) (powered ambient), idle(g,X,Y,t,e,s) (plain ambient), revert seconds */
K.morph=(R,o)=>{const F=o.F,w=F[0].w,h=F[0].h,dur=o.dur||1.4,ar=o.ar||3;
 const e=M.ent(R,{ex:1,x:Math.round(o.x-w/2),y:o.yb-h,w,h,fr:F,f:0,k:0,st:0,z:o.z??o.yb,last:0,busy:0,fl0:-9,
  name:o.pname?(ee=>ee.st>=2?o.pname:o.name):o.name,
  draw(g,X,Y,t,e,sel){const s=F[e.f],lift=o.float?Math.round(M.ease.io(e.k)*o.float+(e.st===2&&!RM?Math.sin(t*2+e.t0)*1.4:0)):0;const y=Y-lift;
   o.under&&o.under(g,X,y,t,e,s,Y);
   if(e.k>.5&&o.aura){M.aura(g,s,X,y,o.aura,ar,t,e.st===2?.85:.5);if(o.aura2)M.aura(g,s,X,y,o.aura2,1,t+.06)}
   if(sel)g.drawImage(M.ring(s),X-1,y-1);g.drawImage(s.c,X,y);
   const fa=M.now-e.fl0;if(fa<.14){g.globalAlpha=fa<.07?1:.6;g.drawImage(M.white(s),X,y);g.globalAlpha=1}
   if(e.st===0&&o.idle)o.idle(g,X,y,t,e,s);o.over&&o.over(g,X,y,t,e,s)},
  upd(e,dt,t,R){if(e.st===1){e.k=Math.min(1,e.k+dt/dur);o.during&&o.during(e,R,e.k,dt);if(e.k>=1){e.st=2;e.last=M.now;e.fl0=M.now;M.snd(o.snd1||'power');M.flash(R,o.flashCol||'#ffffff',.16);
     const cx=e.x+w/2,cy=e.y+h/2-(o.float||0);M.fx(R,.5,(g,ox,oy,k)=>{M.ringFull(g,cx+ox,cy+oy,4+k*40,k<.5?'#ffffff':(o.ringCol||o.aura||'#ffffff'),1-k)});o.done&&o.done(e,R)}}
   else if(e.st===3){e.k=Math.max(0,e.k-dt/(dur*.7));if(e.k<=0){e.st=0;M.snd('swish',.7)}}
   else if(e.st===2){o.amb&&!RM&&o.amb(e,R,dt,t);if(o.revert!==0&&M.now-e.last>(o.revert||28)&&M.now>e.busy){e.st=3;M.emit(R,'smoke',e.x+w/2,e.y+h/2,8,{rx:w*.6,ry:h*.5})}}
   e.f=Math.round(M.ease.io(e.k)*(F.length-1));o.upd&&o.upd(e,dt,t,R)},
  click(e,R){if(M.now<e.busy)return;if(e.st===0){e.st=1;M.snd(o.snd0||'charge');o.start&&o.start(e,R)}else if(e.st===2){e.last=M.now;const b=o.special?o.special(e,R):0;e.busy=M.now+(b||.4)}}},o.e||{});
 return e};

/* =========== RIG: a part-by-part transformer ===========
 parts: {s: sprite | [A,B] (swap with a squash-flip), a:[x,y] (start, rel. to ent), b:[x,y] (end), t:[t0,t1] within 0..1,
          arc (px lift at mid), za, zb (draw order), snap (clack+sparks on arrival)}
 o: name, pname, x, yb, w, h, dur, glows [{x,y,r,c,t}], special(e,R), over/under(g,X,Y,t,e,k), amb */
K.rig=(R,o)=>{const P=o.parts,w=o.w,h=o.h,dur=o.dur||3;
 const e=M.ent(R,{ex:1,x:Math.round(o.x-w/2),y:o.yb-h,w,h,box:1,k:0,st:0,z:o.z??o.yb,last:0,busy:0,pu:P.map(()=>0),
  name:o.pname?(ee=>ee.st>=2?o.pname:o.name):o.name,
  draw(g,X,Y,t,e,sel){const k=e.k;o.under&&o.under(g,X,Y,t,e,k);
   const L=P.map((q,i)=>{const u=clamp((k-q.t[0])/(q.t[1]-q.t[0]),0,1),eu=M.ease.io(u);return{q,u,eu,z:u<.5?(q.za??i):(q.zb??q.za??i)}}).sort((a,b)=>a.z-b.z);
   for(const{q,u,eu}of L){if(q.hide0&&u<=0||q.hide1&&u>=1)continue;const px=lerp(q.a[0],q.b[0],eu),py=lerp(q.a[1],q.b[1],eu)-(q.arc?Math.sin(u*Math.PI)*q.arc:0);
    let s=q.s,sc=1;if(Array.isArray(q.s)){const c=Math.cos(clamp(u*1.0,0,1)*Math.PI);s=c>=0?q.s[0]:q.s[1];sc=Math.max(.12,Math.abs(c));if(u<=0)sc=1,s=q.s[0];if(u>=1)sc=1,s=q.s[1]}
    const x=Math.round(X+px),y=Math.round(Y+py);
    if(q.glowc&&u>=1&&e.st>=2)M.aura(g,s,x,y,q.glowc,2,t);
    if(sc<1){const ww=Math.max(1,Math.round(s.w*sc));g.drawImage(s.c,0,0,s.w,s.h,Math.round(x+(s.w-ww)/2),y,ww,s.h)}else g.drawImage(s.c,x,y);
    if(u>0&&u<1&&!RM){g.fillStyle='#ffffff';if(bay(x,y+((t*30)|0))<.3)g.fillRect(x+(s.w>>1),y+(s.h>>1),1,1)}}
   if(sel){g.fillStyle='#fff6c4';const a=(t*20|0)%4;for(let i=0;i<w;i+=4){g.fillRect(X+i+a,Y-2,2,1);g.fillRect(X+w-i-a,Y+h+1,2,1)}}
   o.over&&o.over(g,X,Y,t,e,k)},
  upd(e,dt,t,R){const fw=e.st===1,bw=e.st===3;if(fw)e.k=Math.min(1,e.k+dt/dur);if(bw)e.k=Math.max(0,e.k-dt/(dur*.6));
   P.forEach((q,i)=>{const u=clamp((e.k-q.t[0])/(q.t[1]-q.t[0]),0,1);if(fw&&e.pu[i]<1&&u>=1&&q.snap!==false){M.snd(q.snd||'clack',.9+H(i,3)*.4);M.emit(R,q.pfx||'spark',e.x+q.b[0]+(Array.isArray(q.s)?q.s[1]:q.s).w/2,e.y+q.b[1]+(Array.isArray(q.s)?q.s[1]:q.s).h/2,6)}
    if(fw&&e.pu[i]<=0&&u>0&&q.snd0)M.snd(q.snd0);e.pu[i]=u});
   if(fw&&e.k>=1){e.st=2;e.last=M.now;M.snd(o.snd1||'power');M.flash(R,'#ffffff',.14);const cx=e.x+w/2,cy=e.y+h*.4;M.fx(R,.55,(g,ox,oy,k)=>M.ringFull(g,cx+ox,cy+oy,4+k*44,k<.4?'#ffffff':(o.ringCol||'#7ae0ff'),1-k));o.done&&o.done(e,R)}
   if(bw&&e.k<=0){e.st=0}
   if(e.st===2){o.amb&&!RM&&o.amb(e,R,dt,t);if(M.now-e.last>(o.revert||30)&&M.now>e.busy){e.st=3;M.snd('servo',.7)}}
   o.upd&&o.upd(e,dt,t,R)},
  click(e,R){if(M.now<e.busy)return;if(e.st===0){e.st=1;M.snd(o.snd0||'servo');o.start&&o.start(e,R)}else if(e.st===2){e.last=M.now;const b=o.special?o.special(e,R):0;e.busy=M.now+(b||.5)}else if(e.st===3){e.st=1}}},o.e||{});
 return e};

/* a simple clickable prop with its own custom click (for clutter & mini exhibits) */
K.prop=(R,o)=>M.ent(R,Object.assign({ex:1},o));
/* glowing hanging brazier / torch (live flame); click -> flares */
K.brazier=(R,x,yb,cols,o={})=>{const pl=o.pole||0,bowl=M.mk(14,9+pl,p=>{p.poly([[0,0],[13,0],[10,6],[3,6]],PAL.iron,{v:.5,bv:.25});p.rect(5,6,4,3,PAL.iron,{v:.4});if(pl){p.rect(6,9,2,pl-3,PAL.iron,{v:.5});p.rect(3,pl+6,8,3,PAL.iron,{v:.5,bv:.2})}});
 return M.ent(R,{name:o.name||'SPIRIT BRAZIER',x:x-7,y:yb-9,w:14,h:9+pl,z:yb,fl:0,ci:0,draw(g,X,Y,t,e,sel){const big=M.now-e.fl<.8?1.8:1;M.glow(g,X+7,Y-6,Math.round(14*big),cols[2],.35);if(sel)g.drawImage(M.ring(bowl),X-1,Y-1);g.drawImage(bowl.c,X,Y);K.flame(g,X+7,Y,4*big,Math.round(12*big),RM?0:t+e.t0,cols,e.t0)},
  click(e,R){e.fl=M.now;M.snd('whoosh',1.3);M.emit(R,'ember',e.x+7,e.y-6,14,{c:cols})},noNav:o.noNav??1})};
/* runic temple portal sign that links out to one of Landry's sites */
K.portalSign=(R,x,yb,label,url,cols,name)=>{const W=M.tw(label)+14;const sp=M.mk(W,16,p=>{p.rrect(0,0,W,16,3,PAL.slate,{v:.45,bv:.25});p.rect(2,2,W-4,12,PAL.basalt,{v:.35,bv:-.15});M.ftext(p,label,7,4,cols[1],cols[0])});
 return M.ent(R,{name:name||'VISIT THE SITE',x:Math.round(x-W/2),y:yb-16,spr:sp,z:yb,react:'jiggle',draw(g,X,Y,t,e,sel){M.glow(g,X+W/2,Y+8,W/2+4,cols[0],.25+.1*Math.sin(t*3));if(sel)g.drawImage(M.ring(sp),X-1,Y-1);g.drawImage(sp.c,X,Y)},click(e,R){M.react(R,e);M.snd('chime');M.emit(R,'rune',e.x+W/2,e.y,12,{c:cols});setTimeout(()=>K.open(url),220)}})};
})();
