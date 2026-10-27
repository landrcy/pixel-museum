/* Entrance: museum facade at dusk. Click the door to go in. */
(()=>{'use strict';const{Pix,rp,ramp,mix,bay,H,vn,fbm,RM,RH,TAU}=M;
const W=520,CX=260;
const STONE=['#2a2036','#463a54','#6e6276','#9c8e96','#c8baae','#ece0cc','#fff8ea'];
const STONE2=['#241c30','#3a304a','#5a4e64','#82747e','#ac9e98','#d0c4b4'];
const SKY=['#0b0820','#151034','#241848','#3a2058','#5a2a62','#862f62','#b8465e','#e06e5a','#f8a066','#ffd08a'];
function skyCanvas(){const p=new Pix(W,RH);
 for(let y=0;y<RH;y++)for(let x=0;x<W;x++){const v=Math.pow(Math.min(1,y/222),1.35)+(vn(x/40,y/14)-.5)*.05;p.px(x,y,rp(SKY,v,x,y))}
 // wispy dithered clouds bands
 for(let y=60;y<200;y++)for(let x=0;x<W;x++){const c=fbm(x/60+3,y/9);if(c>.62&&bay(x,y)<(c-.62)*5){const v=Math.min(1,y/222)+.08;p.px(x,y,rp(SKY,v+.12,x,y))}}
 // moon (upper left, crescent shadow lower right)
 p.ell(62,44,15,15,['#3a2a5a','#8a7aa0','#d8cce0','#fff4dc','#fffcf2'],{k:1.1,b:.25});for(let y=26;y<64;y++)for(let x=44;x<82;x++){if((x-68)**2+(y-50)**2<14*14&&(x-62)**2+(y-44)**2<15*15)p.px(x,y,rp(SKY,.12,x,y))}
 [[52,38],[57,47],[49,49]].forEach(([a,b])=>{p.px(a,b,'#c8bcd4');p.px(a+1,b,'#c8bcd4')});
 // far hills + town silhouettes
 for(let x=0;x<W;x++){const h1=200-18*vn(x/70,1)-8*vn(x/23,4),h2=212-14*vn(x/50+9,2)-5*vn(x/13,7);
  for(let y=Math.floor(h1);y<RH;y++)p.px(x,y,rp(['#2a1a44','#3a2252','#4a2a5a'],.5+(y-h1)/80+(bay(x,y)-.5)*.1,x,y));
  for(let y=Math.floor(h2);y<RH;y++)p.px(x,y,rp(['#1e1434','#2a1a40','#341e48'],.4+(y-h2)/60,x,y))}
 for(let i=0;i<14;i++){const bx=(i*41+17)%W,bw=6+(i*7)%8,bh=6+(i*13)%14,by=206-bh;if(Math.abs(bx-CX)<190)continue;p.rect(bx,by,bw,bh+6,['#1a1230','#241838'],{bv:0,g:0});for(let k=0;k<3;k++)if(H(i,k)>.4)p.px(bx+2+k*2,by+3+(k%2)*3,'#ffd88a')}
 return p.sp().c}
function building(p){
 // ground: lawn + plaza
 for(let y=226;y<RH;y++)for(let x=0;x<W;x++){const v=.35+(y-226)/90+(vn(x/6,y/3)-.5)*.35;p.px(x,y,rp(['#142a1e','#1c3a24','#28502c','#3a6a34','#548a3c'],v,x,y))}
 for(let y=228;y<RH;y++){const hw=70+(y-228)*1.6;for(let x=Math.floor(CX-hw);x<CX+hw;x++){const row=Math.floor((y-228)/6),off=(row&1)*8,edge=((x-CX+500+off)%16===0)||((y-228)%6===0);p.px(x,y,edge?'#3a3044':rp(['#4a3e52','#6a5e6e','#8a7e86','#a89c9c'],.35+(y-228)/120+(H(Math.floor((x+off)/16),row)-.5)*.3,x,y))}}
 // steps
 for(let s=0;s<4;s++){const y=206+s*6,x0=92-s*10,x1=428+s*10;p.rect(x0,y,x1-x0,6,STONE,{v:.62-s*.04,g:.3,bv:.2});for(let x=x0;x<x1;x++){p.px(x,y,STONE[5]);if(H(x,s)>.93)p.px(x,y+3,STONE[2])}}
 // back wall (cella) with block courses
 p.rect(108,96,304,110,STONE2,{v:.5,g:.25,bv:0,tex:(x,y)=>((y-96)%8===0||((x+((y-96)>>3&1)*10)%20===0))?-.28:(H(x>>2,y>>2)-.5)*.1});
 // tall glowing windows between columns
 for(const wx of[134,182,330,378]){p.rrect(wx-6,138,12,44,6,['#2a1830','#5a2a30','#b85a30','#f0a040','#ffd890','#fff4c8'],{v:.72,g:-.5,bv:0});p.rect(wx-1,138,1,44,'#3a2430');p.rect(wx-6,158,12,1,'#3a2430');p.rect(wx-7,182,14,2,STONE)}
 // door recess + frame + fanlight
 p.rect(230,128,60,78,STONE2,{v:.25,bv:0});p.rrect(226,118,68,88,28,STONE,{v:.66,bv:.25});p.rrect(232,124,56,82,24,STONE2,{v:.18,bv:.15});
 for(let y=124;y<146;y++)for(let x=236;x<284;x++){const dx=x+.5-CX,dy=y+.5-148;const r=Math.hypot(dx,dy);if(r<22&&dy<0){const a=Math.atan2(dy,dx),spoke=Math.abs(((a/Math.PI*7)%1+1)%1-.5)<.08,ring=Math.abs(r-11)<.8;p.px(x,y,spoke||ring?'#3a2a20':rp(['#a85a20','#e89a3a','#ffd078','#fff2c0'],.4+(1-r/22)*.7,x,y))}}
 p.rect(234,146,52,2,STONE);
 // columns (fluted shafts, ionic capitals, bases)
 for(const cx of[112,164,212,308,356,408]){p.cyl(cx-8,106,16,94,STONE,{b:.08,tex:(x,y)=>((x-cx+8)%4===1?-.16:0)});
  p.rrect(cx-11,98,22,8,2,STONE,{v:.6});p.ell(cx-9,102,3.2,3.2,STONE,{b:.1});p.ell(cx+9,102,3.2,3.2,STONE,{b:.1});p.px(cx-9,102,STONE[1]);p.px(cx+9,102,STONE[1]);
  p.rect(cx-10,200,20,3,STONE,{v:.66});p.rect(cx-11,203,22,3,STONE,{v:.5})}
 // entablature: architrave, frieze with engraved name, cornice with dentils
 p.rect(92,90,336,8,STONE,{v:.55,bv:.2});p.rect(92,93,336,1,STONE[3]);
 p.rect(94,77,332,13,STONE,{v:.6,bv:.18,tex:(x,y)=>(H(x>>1,y)-.5)*.06});
 const nm=M.NAME,tw=M.tw(nm);M.ftext(p,nm,Math.round(CX-tw/2)+1,80,STONE[6]);M.ftext(p,nm,Math.round(CX-tw/2),79,'#2a2036');
 p.rect(86,70,348,7,STONE,{v:.66,bv:.25});for(let x=90;x<432;x+=5)p.rect(x,74,3,3,STONE,{v:.4,bv:.2});
 // pediment
 p.poly([[84,70],[436,70],[CX,26]],STONE,{v:.62,g:.15,bv:.3});p.poly([[104,66],[416,66],[CX,35]],STONE2,{v:.36,g:.2,bv:.15});
 for(let x=84;x<=436;x++){const y=Math.round(70-(1-Math.abs(x-CX)/176)*44);p.px(x,y,STONE[6]);p.px(x,y+1,STONE[4])}
 // relief: two pixel laurel branches around the mosaic
 for(let k=0;k<7;k++){for(const s of[-1,1]){const x=CX+s*(18+k*7),y=58-k*1.2+k*k*.25;p.ell(x,y,3,1.6,STONE,{b:.15});p.px(x+s*3,y+1,STONE[2])}}
 // acroteria
 for(const[ax,ay]of[[CX,24],[88,66],[432,66]]){p.ell(ax,ay-2,4,5,STONE,{b:.15});p.px(ax,ay-6,STONE[6])}
 // bushes along the base
 for(let i=0;i<10;i++){const bx=i<5?96+i*14:330+(i-5)*14;if(bx>210&&bx<310)continue;p.ell(bx,203,9,6,['#0e2416','#1a3a20','#2a5a2c','#3e7a38','#62a046'],{tex:(x,y)=>(H(x,y)-.5)*.4})}
}
// ---------- sprites ----------
function doorFrames(){const out=[];const WOOD=['#1a0e10','#3a1e16','#5e3420','#86502c','#ae7040','#d0965a'];
 for(let k=0;k<8;k++){const o=k/7;out.push(M.mk(52,62,p=>{
  // inside: warm lobby glow with chandelier sparkle
  for(let y=0;y<62;y++)for(let x=0;x<52;x++){const d=Math.hypot(x-26,y-18)/40;p.px(x,y,rp(['#3a1a14','#7a3a1c','#c8762a','#ffc060','#fff0c0'],1-d*.9+(o<.1?-1:0),x,y))}
  if(o>.2){for(let i=0;i<5;i++){const lx=10+i*8;p.px(lx,8,'#fff8e0');p.px(lx,9,'#ffd890')}p.rect(6,6,40,1,'#5a3a20')}
  // floor reflection
  for(let y=50;y<62;y++)for(let x=0;x<52;x++)if(bay(x,y)<.35)p.px(x,y,'#e8b070');
  // leaves swinging inward (hinged at the outer jambs): width shrinks, shading darkens
  const lw=Math.max(2,Math.round(26*(1-o*.9)));
  for(const s of[0,1]){const x0=s?52-lw:0;p.rect(x0,0,lw,62,WOOD,{v:.5-o*.25,g:.15,bv:.2,tex:(x,y)=>(((x-x0)%6===0)?-.18:0)+(H(x,y>>2)-.5)*.08});
   if(lw>8){p.rect(x0+3,6,lw-6,22,WOOD,{v:.38-o*.2,bv:-.2});p.rect(x0+3,33,lw-6,24,WOOD,{v:.38-o*.2,bv:-.2});const hx=s?x0+3:x0+lw-4;p.rect(hx,30,2,5,['#5a3a10','#c8902a','#ffe08a'],{v:.6});p.px(hx,30,'#fff4c0')}
   for(let y=4;y<60;y+=11)p.px(s?x0+lw-2:x0+1,y,'#d8a24a')}
  p.rect(0,0,52,1,'#140c1c')},false))}return out}
function bannerFrames(col,em){const R=ramp(col,6);return M.frames(6,14,46,(p,f)=>{for(let x=1;x<13;x++){const sw=Math.round(Math.sin(f/6*TAU+x*.45)*1.2),len=38+sw+((x%3===0)?2:0);for(let y=3;y<len;y++){const sh=Math.sin(f/6*TAU+x*.45+.8);p.px(x,y,rp(R,.55+sh*.18-(y/len)*.15+(x<3?.1:0),x,y))}
  p.px(x,len,R[1]);if(x%4===2)p.px(x,len+1,'#e0a838')}
  p.rect(0,1,14,3,['#4a2a10','#a06a20','#e0a838','#ffe08a'],{v:.6});
  p.map(4,12,em,{'#':'#ffe08a','o':'#e0a838','w':'#fff8e0'})})}
const EMB=[['..#..','.#o#.','#oow#','.#o#.','..#..'],['.#.#.','#o#o#','#ooo#','.#o#.','..#..'],['#...#','.#.#.','..w..','.#.#.','#...#'],['.###.','#oww#','#ooo#','#ooo#','.###.']];
function treeFrames(seed){const LV=['#0a1a16','#12301e','#1e4a28','#2e6a30','#4a8c3a','#74b048'];return M.frames(4,64,96,(p,f)=>{
 p.rect(28,58,8,38,['#1a0e10','#3a2018','#5a3624','#7a5030'],{v:.5,tex:(x,y)=>((x+y*3)%7===0?-.2:0)});p.line(32,70,18,52,'#3a2018');p.line(33,66,46,50,'#3a2018');
 const sw=Math.sin(f/4*TAU);const blobs=[[32,30,22,18],[18,44,14,12],[46,42,15,12],[30,14,14,11],[40,24,12,10],[22,24,12,10]];
 for(const[bx,by,rx,ry]of blobs)p.ell(bx+sw*(1-by/60)*1.5,by,rx,ry,LV,{tex:(x,y)=>(H(x+seed,y)-.5)*.35+(vn(x/3+seed,y/3)-.5)*.3})},true)}
function lampFrames(){return M.frames(2,14,62,(p,f)=>{const IR=['#140c1c','#2a2436','#4a4458','#706a80'];p.rect(6,14,2,44,IR,{v:.6});p.rect(4,56,6,6,IR,{v:.5});p.rect(3,10,8,2,IR);
 p.rrect(3,2,8,9,2,f?['#6a4a20','#d89a3a','#ffd070','#fff4c0']:['#2a2436','#3a3448','#4a4458'],{v:.65,g:.4});p.rect(2,1,10,2,IR,{v:.6})})}
function catFrames(){const F=['#1a1020','#3a2a3a','#6a5050','#a07a6a','#d0a888'];return M.frames(3,16,14,(p,f)=>{p.ell(8,9,5,4,F,{b:.1});p.ell(11,5,3.5,3.2,F,{b:.15});p.poly([[9,3],[10,0],[11,3]],F,{v:.4});p.poly([[12,3],[13,0],[14,3]],F,{v:.4});
 p.px(10,5,f===1?'#3a2a3a':'#9aff6a');p.px(12,5,f===1?'#3a2a3a':'#9aff6a');p.px(11,7,'#ff8aa0');const tl=f===2?[[3,8],[1,5],[1,3]]:[[3,9],[1,8],[0,6]];for(const[a,b]of tl)p.rect(a,b,2,2,F,{v:.45})})}
function birdFrames(){return M.frames(2,9,5,(p,f)=>{const c='#140c1c';p.rect(3,2,3,2,c);p.px(6,2,c);if(f){p.line(0,0,3,2,c);p.line(8,0,5,2,c)}else{p.line(0,3,3,2,c);p.line(8,3,5,2,c)}},false)}
function flagFrames(){return M.frames(6,20,22,(p,f)=>{p.rect(1,0,2,22,['#2a2436','#6a6480','#a8a2b8'],{v:.6});for(let x=3;x<19;x++){const o=Math.round(Math.sin(f/6*TAU-x*.5)*1.4);for(let y=1;y<10;y++){if(y>9-Math.floor((x-3)/2.2)&&y>4)continue;const band=y<4?'#ffd040':'#7a2a8a';p.px(x,y+o,rp(ramp(band,4),.55+Math.sin(f/6*TAU-x*.5+1)*.25,x,y))}}})}
// pediment mosaic: a slowly colour-cycling pixel diamond
function mosaic(g,x,y,t){const C=['#ff4a6a','#ffb03a','#ffe85a','#5ae07a','#4ab0ff','#a06aff'];for(let j=-5;j<=5;j++)for(let i=-5;i<=5;i++){if(Math.abs(i)+Math.abs(j)>5)continue;const k=Math.floor((RM?0:t*2)+(i+j+10)*.5)%C.length;g.fillStyle=(Math.abs(i)+Math.abs(j)===5)?'#2a2036':C[(k+C.length)%C.length];g.fillRect(x+i*2,y+j*2,2,2)}}
M.def('entrance',{name:M.NAME,w:W,start:CX,top:'#0b0820',bot:'#142a1e',
 bg(p,R){building(p);R.sky=skyCanvas()},
 init(R){const E=e=>M.ent(R,e);const D=doorFrames();
  R.door=E({name:'ENTER',x:CX-26,y:144,w:52,h:62,box:1,open:0,
   draw(g,x,y,t,e,sel){const k=Math.min(7,Math.floor(e.open*7.99));g.drawImage(D[k].c,x,y);if(e.open>0&&!RM){g.globalAlpha=.25*e.open;g.fillStyle='#ffd890';g.beginPath();g.fillRect(x-6,y+62,64,4);g.globalAlpha=1}
    if(sel&&!e.open){g.fillStyle='#fff6c4';g.fillRect(x-1,y,1,62);g.fillRect(x+52,y,1,62)}
    if(!e.open){const b=RM?0:Math.round(Math.abs(Math.sin(t*3))*-3);g.fillStyle='#140c1c';for(let j=0;j<5;j++)g.fillRect(x+21+j,y-40+b+j,11-j*2,1);g.fillStyle='#ffe08a';for(let j=0;j<4;j++)g.fillRect(x+22+j,y-40+b+j,9-j*2,1)}},
   click(e,R){if(e.open||M.busy())return;e.opening=1;M.snd('open');M.snd('creak',.9)},
   upd(e,dt,t,R){if(e.opening&&e.open<1){e.open=Math.min(1,e.open+dt*(RM?6:1.6));if(e.open>.3&&!e.burst){e.burst=1;M.emit(R,'star',CX,175,18,{dir:-Math.PI/2,spread:2.4})}if(e.open>=1){const[ox,oy]=M.view(R);M.go('hall',{from:[CX+ox,175+oy],style:'iris',dout:.7})}}}});
  const ban=[['#b8283a',0],['#1e7a8a',1],['#1e7a8a',2],['#b8283a',3]];[138,186,334,382].forEach((bx,i)=>{const fr=bannerFrames(ban[i][0],EMB[ban[i][1]]);E({name:null,x:bx-7,y:104,fr,fps:5,react:'jiggle',click:(e,R)=>{M.react(R,e);M.emit(R,'star',bx,130,6)}})});
  [[2,138,'TREE'],[456,136,'TREE']].forEach(([tx,ty],i)=>{const fr=treeFrames(i*50);E({name:'OLD OAK',x:tx,y:ty,fr,fps:1.6,react:'shake',snd:'swish',click(e,R){M.react(R,e);M.emit(R,'leaf',e.x+32,e.y+30,14,{rx:40,ry:20})
   ;for(const b of R.ents)if(b.bird&&Math.abs(b.x-e.x)<200&&b.vx<0==false){}}})});
  const LF=lampFrames();[[66,170],[440,170]].forEach(([lx,ly])=>E({name:'LAMP',x:lx,y:ly,fr:LF,on:1,f:1,click(e,R){e.on^=1;e.f=e.on;M.snd(e.on?'blip':'thud',e.on?1.2:.8);if(e.on)M.emit(R,'star',lx+7,ly+6,6)},draw(g,x,y,t,e,sel){const s=LF[e.on?1:0];if(sel)g.drawImage(M.ring(s),x-1,y-1);g.drawImage(s.c,x,y);if(e.on){const fl=RM?1:.8+.2*Math.sin(t*9+e.t0);for(let j=-9;j<=9;j++)for(let i=-9;i<=9;i++){const d=Math.hypot(i,j);if(d>4&&d<9&&bay(x+7+i,y+6+j)<(1-d/9)*.6*fl){g.fillStyle='#ffd070';g.fillRect(x+7+i,y+6+j,1,1)}}}},box:1,w:14,h:62}));
  const CF=catFrames();E({name:'MUSEUM CAT',x:300,y:217,fr:CF,f:0,click(e,R){e.f=2;e.blink=M.now+.6;M.react(R,e);M.snd('meow');M.emit(R,'heart',e.x+10,e.y,3)},react:'hop',hop:5,upd(e,dt,t){if(e.blink&&M.now>e.blink){e.f=0;e.blink=0}if(!e.blink&&!RM)e.f=(Math.sin(t*.8+e.t0)>.97)?1:0}});
  const FF=flagFrames();[[78,30],[422,30]].forEach(([fx,fy])=>E({name:null,x:fx,y:fy,fr:FF,fps:7}));
  E({name:'PIXEL MOSAIC',x:CX-11,y:39,w:22,h:22,box:1,draw(g,x,y,t,e,sel){mosaic(g,x+11,y+11,t+(e.boost||0))},click(e,R){e.boost=(e.boost||0)+3;M.snd('chime');M.emit(R,'pixel',CX,50,16)}});
  const BF=birdFrames();for(let i=0;i<5;i++)E({bird:1,name:'BIRD',x:Math.random()*W,y:40+Math.random()*50,fr:BF,vx:(Math.random()<.5?-1:1)*(8+Math.random()*8),z:-1,
   upd(e,dt,t){if(RM)return;e.x+=e.vx*dt*(e.fast?6:1);e.y+=Math.sin(t*2+e.t0)*dt*3-(e.fast?dt*40:0);e.f=Math.floor(t*(e.fast?12:4)+e.t0)%2;e.flip=e.vx<0;if(e.x<-20||e.x>W+20||e.y<-20){e.x=e.vx>0?-15:W+15;e.y=40+Math.random()*60;e.fast=0}},
   click(e,R){e.fast=1;M.snd('yip',1.6);M.emit(R,'dust',e.x+4,e.y+2,5,{c:['#2a2030','#4a4058']})}})},
 sky(R,g,ox,oy,t){g.drawImage(R.sky,ox,oy);if(RM)return;for(let i=0;i<40;i++){const x=(i*97+13)%W,y=(i*53)%110+4;if(Math.abs(x-62)<20&&y<70)continue;const tw=Math.sin(t*(1+i%3)+i*1.7);if(tw>.2){g.fillStyle=tw>.9?'#ffffff':'#c8c0f0';g.fillRect(x+ox,y+oy,1,1);if(tw>.97&&i%4===0){g.fillRect(x+ox-1,y+oy,3,1);g.fillRect(x+ox,y+oy-1,1,3)}}}
  // slow cloud puffs drifting across
  for(let i=0;i<4;i++){const cx=((t*(3+i)+i*160)%(W+120))-60,cy=58+i*22;for(let j=-3;j<=3;j++)for(let k=-22;k<=22;k++){const d=(k/22)**2+(j/3.2)**2;if(d<1&&bay(cx+k,cy+j)<(1-d)*.55){g.fillStyle=j<0?'#b06a8a':'#7a3e6a';g.fillRect(Math.round(cx+k+ox),cy+j+oy,1,1)}}}},
 back(R,g,ox,oy,t){// window flicker + door fanlight shimmer
  if(RM)return;for(const wx of[134,182,330,378]){const k=Math.sin(t*1.7+wx)*.5+.5;if(k>.8){g.fillStyle='#fff4c8';g.fillRect(wx-4+ox,150+oy+Math.round(k*6),1,1)}}}
});
})();
