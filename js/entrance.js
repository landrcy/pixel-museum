/* Entrance: a normal city at night... and, wedged between the laundromat and the bank, a colossal floating ancient temple
   with a googly-eyed stone idol in a propeller beanie. Click the glowing stone door to go in. */
(()=>{'use strict';const{Pix,rp,ramp,mix,bay,H,vn,fbm,RM,RH,TAU,clamp,lerp}=M;const K=M.K,PAL=K.PAL;
const W=900,CX=450,SW=168,CURB=182,ROAD=185,OUT='#140c1c';
const TS=['#141018','#2a2230','#463a44','#6a5a5a','#94806e','#c0a888','#e4d0aa'];
const CY=['#0a3a4a','#1a7a8a','#3ad8e0','#a8fff8','#ffffff'];
const NIGHT=['#05040c','#0a0a1c','#12122a','#1a1a38','#262448','#3a2e58','#5a3a68','#8a4a6a'];
const CONC=['#1a1a22','#26262e','#34343c','#44444c','#585860'];
const ASPH=['#08080c','#101016','#18181e','#202028'];
const WIN=['#3a2a10','#8a6020','#e0a840','#ffe08a'];
/* ---------- sky (cached, parallax) ---------- */
let SKYC=null;function skyCanvas(){if(SKYC)return SKYC;const w=Math.round(W*.6+400),p=new Pix(w,RH);
 for(let y=0;y<RH;y++)for(let x=0;x<w;x++){const v=Math.pow(y/RH,1.4)*1.05+(vn(x/80,y/30)-.5)*.08;p.px(x,y,rp(NIGHT,v,x,y))}
 for(let i=0;i<220;i++){const x=Math.floor(H(i,3)*w),y=Math.floor(H(i,4)*120),b=H(i,5);p.px(x,y,b>.9?'#ffffff':b>.6?'#a8a8d8':'#5a5a90')}
 // moon upper left = light source
 p.ell(60,30,11,11,['#8a8ab0','#c8c8e0','#f0f0ff','#ffffff'],{b:.25});p.px(55,28,'#a8a8c8');p.px(62,34,'#a8a8c8');p.px(58,35,'#b8b8d0');
 for(let r=12;r<24;r++)for(let a=0;a<TAU;a+=.02){const x=Math.round(60+Math.cos(a)*r),y=Math.round(30+Math.sin(a)*r);if(bay(x,y)<(1-(r-12)/12)*.3)p.px(x,y,'#3a3a6a')}
 // distant skyline silhouette
 let x=0,i=0;while(x<w){const bw=12+Math.floor(H(i,1)*22),bh=30+Math.floor(H(i,2)*60);p.rect(x,SW-bh,bw,bh,'#0c0c1e');for(let wy=SW-bh+4;wy<SW-4;wy+=5)for(let wx=x+2;wx<x+bw-2;wx+=3)if(H(wx,wy)>.86)p.px(wx,wy,H(wx,wy+1)>.5?'#8a6a3a':'#3a5a7a');if(H(i,6)>.7)p.rect(x+bw/2|0,SW-bh-6,1,6,'#0c0c1e');x+=bw+1;i++}
 return SKYC=p.sp().c}
/* ---------- city painters (night) ---------- */
const brick=(x0,y0)=>(x,y)=>(((y-y0)%4===3)||((x-x0+(((y-y0)>>2)&1)*4)%8===7))?-.2:(H(x>>3,y>>2)-.5)*.1;
function wins(p,x0,x1,top,bot,o={}){const cw=o.cw||14,rh=o.rh||16;for(let y=top;y+10<bot;y+=rh)for(let x=x0+4;x+8<=x1-2;x+=cw){const h=H(x,y),lit=h>.45,tv=h>.92;p.rect(x-1,y-1,10,12,o.fr||'#0a0a12');
  for(let j=0;j<10;j++)for(let i=0;i<8;i++)p.px(x+i,y+j,tv?rp(['#1a4a8a','#3a8ad8','#8ad0ff'],.4+j/20,x+i,y+j):lit?rp(WIN,.45+j/22+(H(x,i)-.5)*.1,x+i,y+j):rp(['#0e1220','#1a2236','#2a3450'],.3+(i-j>2?.3:0),x+i,y+j));
  p.rect(x+4,y,1,10,'#0a0a12');p.rect(x,y+5,8,1,'#0a0a12');if(lit&&h>.75){p.rect(x,y,2,10,h>.85?'#a83a3a':'#c0a060')}p.rect(x-1,y+10,10,1,CONC[3])}}
function bldg(p,x0,x1,top,col,o={}){const R=ramp(col,6);p.rect(x0,top,x1-x0,SW-top,R,{v:.3,g:.12,bv:.1,tex:o.glass?(x,y)=>((x+y*2)%23<2?.15:0):brick(x0,top)});p.rect(x0-1,top-3,x1-x0+2,3,CONC,{v:.6,bv:.3});
 if(!o.glass)wins(p,x0,x1,top+8,SW-26,o);else for(let y=top+6;y<SW-30;y+=8)for(let x=x0+3;x<x1-6;x+=7)p.rect(x,y,5,5,H(x,y)>.6?WIN:['#0e1626','#1a2a44','#2a4060'],{v:.45,bv:.1})}
function shop(p,x0,x1,col){p.rect(x0,SW-30,x1-x0,30,ramp(col,5),{v:.35,bv:.2});p.rect(x0+4,SW-24,x1-x0-8,20,['#2a2410','#6a5420','#c09a40','#f0d080'],{v:.45,g:.3,tex:(x,y)=>(((x-y)%16<3)?.25:0)});p.rect(x0,SW-3,x1-x0,3,CONC,{v:.5})}
function city(p){
 bldg(p,0,70,40,'#4a2a2a',{cw:13});p.rect(20,30,30,10,PAL.wood,{v:.3});
 bldg(p,72,150,84,'#2a3a3a',{cw:13});shop(p,72,150,'#1a2a2a');
 bldg(p,152,262,18,'#1a2030',{glass:1});shop(p,152,262,'#101420');
 bldg(p,638,740,70,'#3a2a20',{cw:14});shop(p,638,740,'#2a1a10');
 bldg(p,742,820,36,'#2a2238',{cw:13});
 bldg(p,822,900,92,'#3a3832',{cw:13});for(const cx of[832,852,872,892])p.cyl(cx-3,124,6,SW-128,['#1a1a1c','#3a3a38','#5a5850','#7a786c'],{});p.poly([[818,94],[904,94],[860,80]],['#1a1a1c','#3a3a38','#5a5850'],{v:.5});
 // water tower
 p.rect(756,14,26,20,PAL.wood,{v:.35,tex:(x,y)=>((x-756)%4===0?-.2:0)});p.poly([[752,14],[786,14],[769,4]],CONC,{v:.5});for(const lx of[760,776])p.rect(lx,34,2,6,'#0a0a12');
 // fire escape
 for(let fy=60;fy<SW-36;fy+=22){p.rect(36,fy,30,1,'#0a0a12');for(let i=0;i<30;i+=3)p.rect(36+i,fy-6,1,6,'#14141c');p.line(62,fy,40,fy+21,'#14141c')}}
function street(p){
 for(let y=SW;y<CURB;y++)for(let x=0;x<W;x++){const seam=(x%24===0)||((y-SW)===7);p.px(x,y,seam?CONC[0]:rp(CONC,.62-(y-SW)/40+(H(x>>1,y>>1)-.5)*.16,x,y))}
 for(let y=CURB;y<ROAD;y++)for(let x=0;x<W;x++)p.px(x,y,rp(CONC,y===CURB?.9:.3,x,y));
 for(let y=ROAD;y<RH;y++)for(let x=0;x<W;x++)p.px(x,y,rp(ASPH,.5+(H(x,y)-.5)*.5+(vn(x/12,y/4)-.5)*.3,x,y));
 for(let x=0;x<W;x+=20)p.rect(x,196,11,1,'#8a7a30')}
/* ---------- the temple ---------- */
const T0=286,T1=614,PB=146;// platform top
function temple(p){
 // stepped base
 for(let s=0;s<4;s++){const y=PB+s*5+2,x0=T0-6-s*8,x1=T1+6+s*8;p.rect(x0,y,x1-x0,5,TS,{v:.5-s*.04,bv:.3,tex:(x,yy)=>(fbm(x/4,yy/3)-.5)*.3+((x-x0)%18===0?-.3:0)})}
 p.rect(T0,PB-6,T1-T0,8,TS,{v:.55,bv:.3});
 // back wall (dim, deep)
 K.wall(p,T0+8,62,T1-8,PB-6,['#0a0810','#16121e','#241e2e','#352c40'],{bh:8,bw:14,sd:3,v:.3,moss:PAL.moss});
 // pillars
 for(const px of[308,350,392,508,550,592])K.pillar(p,px,64,PB-6,18,TS,{cap:7,base:7,drum:20,vines:px%3?2:1,sd:px});
 // entablature + glyph frieze slot (glyphs drawn live) + pediment
 p.rect(T0-6,52,T1-T0+12,12,TS,{v:.5,bv:.3,tex:(x,y)=>(fbm(x/5,y/3)-.5)*.3});p.rect(T0-8,50,T1-T0+16,3,TS,{v:.75,bv:.2});p.rect(T0+4,56,T1-T0-8,5,'#0e0a12');
 p.poly([[T0-10,50],[CX,22],[T1+10,50]],TS,{v:.55,bv:.32,tex:(x,y)=>(fbm(x/6,y/4)-.5)*.3});p.poly([[T0+12,47],[CX,28],[T1-12,47]],TS,{v:.32,bv:-.2,tex:(x,y)=>(fbm(x/6,y/4)-.5)*.2});
 for(let i=0;i<14;i++)K.vine(p,T0+H(i,3)*(T1-T0),50,6+H(i,4)*22,i+40);
 // the doorway (dark arch; door leaves + portal live)
 K.arch(p,CX,104,58,22,7,TS,{n:9});p.rect(CX-36,104,7,PB-104-6,TS,{v:.6,bv:.3});p.rect(CX+29,104,7,PB-104-6,TS,{v:.45,bv:.3});
 // cracks/chips into the street (it's very old)
 for(let i=0;i<5;i++){let x=T0+20+i*70,y=SW;for(let j=0;j<6;j++){p.px(x,y,CONC[0]);x+=Math.round(H(i,j)*2-1);y++}}
 // lion/sphinx guardians
 for(const s of[-1,1]){const gx=CX+s*120;p.rect(gx-10,PB-14,20,8,TS,{v:.5,bv:.3})}}
function guardian(flip){return M.mk(26,22,p=>{const S=TS;p.ell(12,13,10,6,S,{b:.1});p.rect(2,14,22,7,S,{v:.5,bv:.25});p.ell(19,7,6,6,S,{b:.15});p.rect(20,2,3,3,S,{v:.6});p.rect(15,2,3,3,S,{v:.6});p.rect(21,6,2,1,'#0a0810');p.rect(17,6,2,1,'#0a0810');p.rect(18,10,4,1,S[1]);p.rect(1,12,3,2,S,{v:.4});K.glyph(p,8,14,77,'#1a7a8a');if(flip){}})}
/* ---------- the funny logo: a stone idol head in a propeller beanie ---------- */
const IDOL=M.mk(44,30,p=>{p.rrect(2,2,40,27,6,TS,{v:.55,bv:.3,tex:(x,y)=>(fbm(x/4,y/4)-.5)*.3});p.rect(2,24,40,5,TS,{v:.35});p.rect(14,22,16,3,'#0a0810');for(let i=0;i<4;i++)p.rect(15+i*4,22,2,2,TS[5]);p.rect(20,14,4,6,TS,{v:.7,bv:.2});
 p.rect(6,6,32,2,TS[2]);K.glyph(p,4,16,9,'#1a7a8a');K.glyph(p,35,16,9,'#1a7a8a')});
const BEANIE=M.mk(30,12,p=>{p.ell(15,11,13,8,['#1a2a8a','#2a4ad8','#e83a3a','#ffd23a','#ffffff'],{clip:(x,y)=>y<11,tex:(x,y)=>(((x-3)/6|0)%3)*.2-.2});p.rect(1,10,28,2,'#d82a2a');p.rect(14,0,2,4,'#a8a8b0')});
M.def('entrance',{name:'PIXEL MUSEUM',w:W,top:'#05040c',bot:'#08080c',start:CX,
 sky(R,g,ox,oy,t){const s=skyCanvas();g.drawImage(s,Math.round(ox*.4),oy);const tt=RM?0:t;
  // rune light column rising from the temple into the sky
  for(let y=0;y<60;y++){const w=10+y*.15+Math.sin(tt*2+y*.2)*2;for(let x=-w;x<=w;x++){const X=Math.round(CX+ox+x),Y=y+oy;if(bay(X,Y+((tt*10)|0))<.18*(1-Math.abs(x)/w)*(1-y/60*.4)){g.fillStyle=Math.abs(x)<3?'#a8fff8':'#3ad8e0';g.fillRect(X,Y,1,1)}}}},
 bg(p,R){city(p);street(p);temple(p)},
 back(R,g,ox,oy,t){const tt=RM?0:t;
  // frieze glyphs + pillar runes pulsing
  for(let i=0;i<44;i++){const ph=(Math.sin(tt*2-i*.4)+1)/2;g.drawImage(K.gly(i+500,ph>.7?'#a8fff8':ph>.35?'#3ad8e0':'#1a7a8a'),Math.round(T0+8+i*7.2+ox),56+oy)}
  for(const px of[308,350,392,508,550,592])for(let k=0;k<3;k++){const ph=(Math.sin(tt*1.5+px*.1+k)+1)/2;if(ph<.3)continue;g.drawImage(K.gly(px+k,ph>.75?'#a8fff8':'#3ad8e0'),Math.round(px-2+ox),78+k*16+oy);if(ph>.8)M.glow(g,Math.round(px+ox),Math.round(80+k*16+oy),5,'#3ad8e0',.4)}
  // neon shop signs (flicker)
  const neon=(s,x,y,c,c2,ph)=>{const on=RM||(Math.sin(tt*7+ph)>-.85&&!(((tt*3+ph)|0)%11===0&&((tt*20)|0)%2));const T=M.txt(s,on?c:'#2a2030',null);if(on)M.glow(g,Math.round(x+ox+T.w/2),Math.round(y+oy+3),T.w/2+5,c2,.25);g.drawImage(T.c,Math.round(x+ox),y+oy)};
  neon('SUDZ',96,SW-40,'#7affd0','#2ac0a0',1);neon('MEGACORP',176,SW-40,'#c8ccd8','#5a6aa0',2);neon('PIZZA',660,SW-40,'#ff7a5a','#ff3a2a',3);neon('BANK',842,104,'#ffd070','#a07020',4);
  // portal light spill on the steps
  M.glow(g,Math.round(CX+ox),Math.round(PB+oy),34,'#3ad8e0',.16+.05*Math.sin(tt*2))},
 init(R){const E=o=>M.ent(R,o);
  // the magic door
  const leaf=s=>M.mk(29,42,p=>{p.rect(0,0,29,42,TS,{v:.42,bv:.25,tex:(x,y)=>(fbm(x/4,y/4)-.5)*.3});for(let y=6;y<40;y+=10)p.rect(2,y,25,1,TS[1]);K.glyph(p,s<0?20:4,10,31+s,'#1a7a8a');K.glyph(p,s<0?20:4,24,33+s,'#1a7a8a')});
  const LL=leaf(-1),LR=leaf(1);const PP=[];for(let i=0;i<260;i++)PP.push([H(i,1)*TAU,Math.sqrt(H(i,2)),H(i,3)]);
  R.door=E({name:'ENTER',x:CX-29,y:PB-48,w:58,h:48,box:1,open:0,z:SW-2,
   draw(g,X,Y,t,e,sel){const tt=RM?0:t,o=M.ease.io(e.open),hv=sel?1:0;
    // portal swirl
    g.fillStyle='#04040a';g.fillRect(X+1,Y+2,56,46);for(const[a,r,c]of PP){const aa=a+tt*(1.5-r)*2,rr=r*24;const x=Math.round(X+29+Math.cos(aa)*rr),y=Math.round(Y+24+Math.sin(aa)*rr*.9);if(y<Y+2)continue;g.fillStyle=c>.8?'#ffffff':c>.5?'#a8fff8':c>.25?'#3ad8e0':'#a050f0';g.fillRect(x,y,1,1)}
    M.glow(g,X+29,Y+24,18+Math.round(o*10),'#a8fff8',.2+o*.4);
    const d=Math.round(o*28);g.drawImage(LL.c,X+1-d,Y+6);g.drawImage(LR.c,X+29+d,Y+6);
    // seal
    if(o<.05){const r=8,ph=(Math.sin(tt*3)+1)/2;M.glow(g,X+29,Y+26,10+hv*4,'#3ad8e0',.4+ph*.3+hv*.2);M.ringFull(g,X+29,Y+26,r,ph>.5||hv?'#a8fff8':'#3ad8e0');M.ringFull(g,X+29,Y+26,r-3,'#1a7a8a');g.drawImage(K.gly(808,ph>.5||hv?'#ffffff':'#a8fff8'),X+27,Y+24);for(let i=0;i<6;i++){const a=tt*1.5+i*TAU/6;g.fillStyle='#ffffff';g.fillRect(Math.round(X+29+Math.cos(a)*r),Math.round(Y+26+Math.sin(a)*r),1,1)}}
    if(sel){const a=(t*20|0)%4;g.fillStyle='#a8fff8';for(let i=0;i<58;i+=4){g.fillRect(X+i+a,Y+3,2,1)}}},
   upd(e,dt,t,R){if(e.opening&&e.open<1){e.open=Math.min(1,e.open+dt*(RM?6:1.1));if(!RM&&Math.random()<.6)M.emit(R,'rune',CX+(Math.random()-.5)*50,PB-20,1);if(e.open>.4&&!e.burst){e.burst=1;M.flash(R,'#a8fff8',.15);M.emit(R,'wisp',CX,PB-20,24,{c:CY.slice(2)})}
     if(e.open>=1){const[ox,oy]=M.view(R);M.go('hall',{from:[CX+ox,PB-20+oy],style:'diamond',col:'#3ad8e0',dout:.75})}}},
   click(e,R){if(e.opening)return;e.opening=1;e.burst=0;M.snd('rumble',.9);M.snd('gong',.8);M.shake(R,.6,1);M.say(R,CX,PB-56,'THE SEAL BREAKS...',1.2)}});
  // floating rune-letter sign
  const S='PIXEL MUSEUM';let lx=CX-Math.round(M.tw(S)/2);[...S].forEach((ch,i)=>{const w=M.tw(ch);if(ch!==' '){const sp0=M.txt(ch,'#a8fff8','#0a3a4a'),sp1=M.txt(ch,'#ffffff','#1a7a8a');E({name:'RUNE SIGN',x:lx-1,y:66,w:w+3,h:10,box:1,z:SW-3,sp:0,noNav:i!==0,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,b=Math.round(Math.sin(tt*2+i*.6)*1.5),s=M.now<e.sp;let yy=Y+b;if(s)yy-=Math.round(Math.sin((e.sp-M.now)*Math.PI/1.2*2)*6);M.glow(g,X+w/2+1,yy+4,6,'#3ad8e0',sel||s?.55:.3);const sp=sel||s||Math.sin(tt*3-i*.5)>.85?sp1:sp0;
     if(s&&((M.now*16)|0)%2){const ww=Math.max(1,Math.round(sp.w*Math.abs(Math.cos((e.sp-M.now)*8))));g.drawImage(sp.c,0,0,sp.w,sp.h,X+Math.round((sp.w-ww)/2),yy,ww,sp.h)}else g.drawImage(sp.c,X,yy)},
    click(e,R){e.sp=M.now+1.2;M.snd('chime',.8+i*.06);M.emit(R,'rune',e.x+w/2,e.y,4,{c:CY.slice(2)});if(i===0)for(const o of R.ents)if(o.name==='RUNE SIGN'&&o!==e)setTimeout(()=>{o.sp=M.now+1.2;M.snd('chime',.8+R.ents.indexOf(o)%12*.06)},R.ents.indexOf(o)*40%500)}})}lx+=w+1});
  // the idol
  R.idol=E({name:'STONE IDOL',x:CX-22,y:13,w:44,h:36,box:1,z:30,spin:0,up:0,
   draw(g,X,Y,t,e,sel){const tt=RM?0:t,lift=M.now<e.up?Math.round(Math.sin((e.up-M.now)/2.4*Math.PI)*16):0,y=Y+6-lift;
    if(sel)g.drawImage(M.ring(IDOL),X-1,y-1);g.drawImage(IDOL.c,X,y);
    const pr=M.now<e.up?40:6,pa=tt*pr;g.drawImage(BEANIE.c,X+7,y-8);const pl=Math.round(Math.cos(pa)*11);g.fillStyle='#ffd23a';g.fillRect(X+22-Math.abs(pl),y-10,Math.abs(pl)*2+1,1);g.fillStyle='#e83a3a';g.fillRect(X+22+(pl<0?pl:0),y-10,Math.abs(pl)/2|0,1);g.fillStyle='#ffffff';g.fillRect(X+22,y-11,1,2);
    // googly eyes
    const[vx,vy]=M.view(R);const px=M.ptr?M.ptr[0]-vx:CX,py=M.ptr?M.ptr[1]-vy:200;
    for(const ex of[12,32]){const cx=X+ex,cy=y+12;g.fillStyle='#140c1c';g.fillRect(cx-5,cy-4,11,9);g.fillRect(cx-4,cy-5,9,11);g.fillStyle='#ffffff';g.fillRect(cx-4,cy-3,9,7);g.fillRect(cx-3,cy-4,7,9);
     let a=Math.atan2(py-cy,px-cx);if(e.spin>M.now)a=M.now*25*(ex>20?1:-1);const q=Math.round(cx+Math.cos(a)*2.5),r=Math.round(cy+Math.sin(a)*2.5+(RM?0:.4));g.fillStyle='#140c1c';g.fillRect(q-1,r-1,3,3)}
    if(M.now<e.up&&!RM){g.fillStyle='#a8fff8';for(let i=0;i<6;i++)g.fillRect(X+8+((tt*60+i*7)|0)%30,y-12+(i%3),1,1)}},
   click(e,R){const L=['WELCOME, MORTAL!','I AM VERY ANCIENT. AND STYLISH.','THE BEANIE IS LOAD-BEARING.','NO REFUNDS ON PROPHECIES.','ENTER, IF YOU DARE. OR LIKE ART.'];e.spin=M.now+1.2;if(Math.random()<.5){e.up=M.now+2.4;M.snd('whoosh',1.6);M.snd('boing',.8)}else M.snd('boing',1);M.say(R,CX,e.y+50,L[(Math.random()*L.length)|0],1.8)}});
  // guardians
  [-1,1].forEach(s=>{const sp=guardian();E({name:'TEMPLE GUARDIAN',x:CX+s*120-13,y:PB-36,spr:sp,flip:s>0,z:SW-1,eg:-9,react:'jiggle',
   draw(g,X,Y,t,e,sel){if(sel)g.drawImage(M.ring(sp),X-1,Y-1);if(e.flip){g.save();g.translate(X+sp.w,Y);g.scale(-1,1);g.drawImage(sp.c,0,0);g.restore()}else g.drawImage(sp.c,X,Y);if(M.now-e.eg<1.6){const ex=e.flip?X+sp.w-19:X+18;M.glow(g,ex,Y+6,5,'#3ad8e0',.8);g.fillStyle='#a8fff8';g.fillRect(ex-1,Y+6,2,1);g.fillRect(ex+3*(e.flip?-1:1),Y+6,2,1)}},
   click(e,R){e.eg=M.now;M.snd('roar',1.6);M.shake(R,.25,1);M.say(R,e.x+13,e.y-4,'GRR. (PURRS)',1.2);M.emit(R,'rune',e.x+13,e.y+6,6)}})});
  // braziers on the steps
  for(const bx of[T0+8,T1-8])K.brazier(R,bx,PB-6,['#ffffff','#a8fff8','#3ad8e0','#1a7a8a'],{name:'SPIRIT BRAZIER',pole:0});
  // floating stones around the temple
  [[262,70,10],[640,60,12],[272,120,8],[628,110,9],[330,30,7],[574,26,8],[244,36,6],[660,34,7]].forEach(([x,y,r],i)=>{const sp=M.mk(r*2+2,Math.round(r*1.6)+2,p=>{p.poly([[1,r*.5],[r*.6,0],[r*1.6,1],[r*2,r*.6],[r*1.4,r*1.5],[r*.5,r*1.3]],TS,{v:.5,bv:.3,tex:(xx,yy)=>(fbm(xx/3,yy/3)-.5)*.3});if(r>7)K.glyph(p,r-2,Math.round(r*.4),i+60,'#3ad8e0')});
   E({name:'FLOATING STONE',x:x-r,y,spr:sp,z:20,noNav:1,dr:-9,
    draw(g,X,Y,t,e,sel){const tt=RM?0:t,d=M.now-e.dr;let off=Math.sin(tt*1.2+i)*3;if(d<2.2)off+=d<.5?M.ease.in(d/.5)*20:20*(1-M.ease.el((d-.5)/1.7));const y=Math.round(Y+off);M.glow(g,X+r,y+r+4,r+3,'#3ad8e0',.12);if(sel)g.drawImage(M.ring(sp),X-1,y-1);g.drawImage(sp.c,X,y);g.fillStyle='#3ad8e0';if(((tt*4+i)|0)%3===0)g.fillRect(X+r,y+Math.round(r*1.6)+3+((tt*10)|0)%4,1,1)},
    click(e,R){e.dr=M.now;M.snd('whoosh',.7);setTimeout(()=>{M.snd('thud',.9);M.snd('chime',1.4)},500)}})});
  K.motes(R,30,T0-40,T1+40,10,PB,CY.slice(2),{z:30});
  // streetlamps
  const lamp=M.mk(14,58,p=>{p.rect(6,12,2,42,PAL.iron,{v:.5});p.rect(4,52,6,6,PAL.iron,{v:.5});p.rect(3,9,8,2,PAL.iron);p.rrect(3,1,8,9,2,['#6a4a20','#d89a3a','#ffd070','#fff4c0'],{v:.7,g:.4});p.rect(2,0,10,2,PAL.iron)});
  for(const lx of[40,270,632,860])E({name:'STREETLAMP',x:lx-7,y:SW-48,spr:lamp,z:CURB,noNav:1,off:-9,draw(g,X,Y,t,e,sel){const on=M.now-e.off>1.4||((M.now*12)|0)%3===0;if(on)M.glow(g,X+7,Y+6,18,'#ffd070',.25);if(sel)g.drawImage(M.ring(lamp),X-1,Y-1);g.drawImage(lamp.c,X,Y);if(!on){g.fillStyle='#3a2a10';g.fillRect(X+4,Y+3,6,6)}},click(e,R){e.off=M.now;M.snd('zap',.6)}});
  // cars
  const lanes=[{y:196,d:1},{y:207,d:-1}];[['sedan',0],['taxi',1],['van',0],['bus',1],['truck',0]].forEach(([k,l],i)=>{const ln=lanes[l];const fr=carFrames(k,ln.d<0);
   E({name:{sedan:'SEDAN',taxi:'TAXI',truck:'ICE CREAM TRUCK',van:'VAN',bus:'MUSEUM BUS'}[k],car:1,noNav:1,x:(i*230+40)%W,y:ln.y-fr[0].h,fr,sp:26+H(i,4)*14,z:ln.y+20,react:'hop',
    upd(e,dt,t){if(RM)return;e.x+=e.sp*ln.d*dt;e.f=Math.floor(t*8)%2;if(ln.d>0&&e.x>W+20)e.x=-fr[0].w-20-Math.random()*80;if(ln.d<0&&e.x<-fr[0].w-20)e.x=W+20+Math.random()*80},
    draw(g,X,Y,t,e,sel){const s=fr[e.f]||fr[0];if(sel)g.drawImage(M.ring(s),X-1,Y-1);g.drawImage(s.c,X,Y);const hx=ln.d>0?X+s.w:X;for(let i=1;i<14;i++)for(let j=-Math.floor(i/4);j<=Math.floor(i/4);j++)if(bay(hx+i*ln.d,Y+s.h-8+j)<.35*(1-i/14)){g.fillStyle='#fff0b0';g.fillRect(hx+i*ln.d,Y+s.h-8+j,1,1)}},
    click(e,R){M.react(R,e);M.snd(k==='truck'?'chime':'honk',k==='bus'?.7:k==='taxi'?1.3:1);M.say(R,e.x+fr[0].w/2,e.y-4,{sedan:'IS THAT TEMPLE NEW?',taxi:'TAXI!',truck:'DING DING! SOFT SERVE',van:'HONK',bus:'NEXT STOP: ANCIENT'}[k])}})});
  // pedestrians
  const PEO=[{skin:0,hair:'#2a1a10',shirt:'#c84a3a',pants:'#2a3a5a',style:1},{skin:2,hair:'#e8c060',shirt:'#3a8a5a',pants:'#3a2a20',style:0},{skin:1,hair:'#1a1010',shirt:'#6a4aa8',pants:'#1a1a2a',style:3},{skin:3,hair:'#4a2a1a',shirt:'#e0a030',pants:'#2a4a6a',style:2,dress:1},{skin:2,hair:'#8a3a1a',shirt:'#3a6ab8',pants:'#4a4a4a',style:0}];
  const LINES=['IS THAT BUILDING FLOATING?','WAS THAT HERE YESTERDAY?','THE STATUE WINKED AT ME','LATE FOR WORK!','NICE BEANIE, BIG GUY','I HEAR DRAGONS INSIDE'];
  PEO.forEach((o,i)=>{const fr=M.person(o);E({name:'PEDESTRIAN',x:60+i*180,y:SW-14+(i%2)*3,fr,vx:(i%2?1:-1)*(12+i*2),pause:0,noNav:1,
   upd(e,dt,t){e.z=e.y+28;if(M.now<e.wv){e.f=5;return}if(RM){e.f=4;return}if(e.pause>0){e.pause-=dt;e.f=4;return}e.x+=e.vx*dt;e.flip=e.vx<0;e.f=Math.floor(t*6+e.t0)%4;if(e.x<10||e.x>W-24){e.vx*=-1;e.x=clamp(e.x,10,W-24)}if(Math.random()<dt*.08)e.pause=1+Math.random()*2.5},
   click(e,R){e.wv=M.now+1.1;M.snd('blip',1.3+i*.1);M.say(R,e.x+7,e.y-2,LINES[(Math.random()*LINES.length)|0])}})});
  // pigeons
  const PF=pigeonFrames();for(let i=0;i<4;i++){const hx=100+i*220;E({name:'PIGEON',x:hx,y:SW+3+(i%2)*3,fr:PF,hx,z:SW+20,flip:i%2,noNav:1,upd(e,dt,t){if(e.fly){e.f=2+(Math.floor(t*14)%2);e.x+=e.vx*dt;e.y-=50*dt;if(e.y<-20){e.fly=0;e.x=e.hx;e.y=SW+3}return}e.f=(!RM&&Math.sin(t*3+e.t0*5)>.6)?1:0},
   click(e,R){e.fly=1;e.vx=(Math.random()<.5?-1:1)*40;e.flip=e.vx<0;M.snd('swish',1.4)}})}},
 enter(R){if(R.door){R.door.open=0;R.door.opening=0}}});
function pigeonFrames(){const G=['#2a2a3a','#4a4a5a','#6a6a7a','#9a9aaa'];return M.frames(4,12,10,(p,f)=>{const pk=f===1,fl=f>=2;
 p.ell(6,6,4,3,G,{b:.15});p.ell(pk?9:8,pk?6:3,2.4,2.2,G,{b:.2});p.px(pk?10:9,pk?6:3,'#ff8a2a');p.px(7,5,'#5aa08a');
 if(fl){p.line(3,f===2?0:7,6,5,G[1]);p.line(2,f===2?1:8,5,5,G[0])}else{p.px(5,9,'#ff8a2a');p.px(7,9,'#ff8a2a')}p.rect(1,6,2,1,G[0])})}
function carFrames(kind,flip){const B={sedan:['#3a5a9a',40,15],taxi:['#e8c030',40,17],truck:['#f0e8f0',54,24],van:['#c84a3a',46,20],bus:['#3a9a6a',84,28]}[kind];const[col,w,h]=B;const C=ramp(col,6);const GL=['#1a2a3a','#2a4258','#6a8eaa','#a8c8dc'];
 return M.frames(2,w,h,(P,f)=>{const p=new Pix(w,h);const top=kind==='taxi'?3:0;
  if(kind==='bus'){p.rrect(0,0,w,h-4,4,C,{v:.5,bv:.25});for(let x=6;x<w-10;x+=11)p.rect(x,4,8,8,['#3a2a10','#c09a40','#f0d080'],{v:.6});p.rect(w-8,3,6,11,GL,{v:.6});p.rect(0,16,w,2,'#f0f0e0')}
  else if(kind==='truck'){p.rrect(0,0,40,h-4,3,C,{v:.55,bv:.25});p.rrect(40,7,14,h-11,3,ramp('#ff8ab8',5),{v:.6,bv:.25});p.rect(43,9,8,5,GL,{v:.7});for(let i=0;i<5;i++)p.rect(6+i*6,5,4,6,['#ff7ab8','#ffe08a','#7ad0ff','#c8a060','#ffffff'][i])}
  else{p.rrect(0,top+6,w,h-top-10,3,C,{v:.55,bv:.25});p.rrect(kind==='van'?2:8,top,kind==='van'?w-10:w-18,9,3,C,{v:.5,bv:.2});p.rect(kind==='van'?w-16:w-17,top+2,7,5,GL,{v:.7});p.rect(kind==='van'?6:11,top+2,kind==='van'?w-24:11,5,GL,{v:.6});p.rect(w-3,top+8,3,2,'#fff4b0');p.rect(0,top+8,2,2,'#e02a2a');
   if(kind==='taxi')p.rect(w/2-4,0,8,3,['#2a2a2a','#ffffff'])}
  const wy=h-6;for(const wx of kind==='bus'?[10,w-18]:kind==='truck'?[7,43]:[6,w-12]){p.ell(wx+3,wy+3,3.5,3.5,['#0e0e14','#2a2a32','#4a4a52'],{b:0});p.px(wx+3+(f?1:-1),wy+3,'#a8a8b0')}
  P.blit(p,0,0,flip)})}
})();
