/* Entrance: a perfectly normal city street... and one extremely not-normal museum. Click the door to go in. */
(()=>{'use strict';const{Pix,rp,ramp,mix,bay,H,vn,fbm,RM,RH,TAU}=M;
const W=900,CX=450,SW=208,CURB=226,ROAD=230;
const OUT='#140c1c';
const SKY=['#3a6ab8','#4a7cc4','#5a8ed0','#6aa0da','#7cb2e2','#90c2ea','#a8d2ee','#c2e0f0','#dcecf0','#f0f2e8'];
const CONC=['#4a4a52','#6a6a70','#8a8a8e','#a8a6a6','#c4c0bc','#dcd8d0'];
const ASPH=['#1e1e26','#2a2a32','#36363e','#44444c','#52525a'];
const GLASS=['#1a2a3a','#2a4258','#3e5e7a','#6a8eaa','#a8c8dc','#e0f0f8'];
const shade=(c,n=6)=>ramp(c,n);
/* ---------- sky + far skyline ---------- */
function skyCanvas(){const p=new Pix(W,RH);
 for(let y=0;y<RH;y++)for(let x=0;x<W;x++){const v=Math.pow(Math.min(1,y/200),1.1)+(vn(x/50,y/16)-.5)*.04;p.px(x,y,rp(SKY,v,x,y))}
 // sun, upper left (the light source for everything)
 p.ell(70,34,13,13,['#ffe8a0','#fff4c8','#fffce8','#ffffff'],{b:.3});for(let r=14;r<26;r++)for(let a=0;a<TAU;a+=.02){const x=Math.round(70+Math.cos(a)*r),y=Math.round(34+Math.sin(a)*r);if(bay(x,y)<(1-(r-14)/12)*.35)p.px(x,y,'#e8f0e0')}
 // hazy distant skyline (three depth layers)
 const L=[[['#8aa8c4','#94b0ca'],150,.6],[['#7894b2','#829eba'],168,.8],[['#647e9c','#6e88a6'],182,1]];
 L.forEach(([c,base,k],li)=>{let x=0;let i=li*31;while(x<W){const bw=14+Math.floor(H(i,li)*26),bh=Math.floor((20+H(i,li+9)*70)*k);const top=base+20-bh;
  p.rect(x,top,bw,SW-top,c,{v:.5,bv:0,g:0});if(H(i,li+3)>.7){p.rect(x+bw/2-1,top-8,1,8,c[1])}if(H(i,li+5)>.6)p.poly([[x,top],[x+bw,top],[x+bw/2,top-6]],c,{v:.4,bv:0});
  if(li===2)for(let wy=top+4;wy<SW-6;wy+=5)for(let wx=x+2;wx<x+bw-2;wx+=4)if(H(wx,wy)>.55)p.px(wx,wy,'#8aa2bc');x+=bw+(H(i,7)>.6?3:0);i++}});
 return p.sp().c}
/* ---------- the normal street ---------- */
const brick=(x0,y0)=>(x,y)=>(((y-y0)%4===3)||((x-x0+(((y-y0)>>2)&1)*4)%8===7))?-.22:(H(x>>3,y>>2)-.5)*.12;
function windowAt(p,x,y,w,h,o={}){p.rect(x-1,y-1,w+2,h+2,o.frame||['#2a2430','#4a4450','#8a8490','#c8c4c8'],{v:.6,bv:.3});
 for(let j=0;j<h;j++)for(let i=0;i<w;i++){const d=(i-j*.8+x*.3)%14;const lit=o.lit&&H(x,y)>.5;p.px(x+i,y+j,lit?rp(['#a86a20','#e8a840','#ffd880'],.5+j/h*.3,x+i,y+j):rp(GLASS,.25+(d>0&&d<3?.5:0)+(1-j/h)*.25,x+i,y+j))}
 if(w>7)p.rect(x+(w>>1),y,1,h,o.mull||'#3a3440');if(h>9)p.rect(x,y+(h>>1),w,1,o.mull||'#3a3440');p.rect(x-2,y+h+1,w+4,2,CONC,{v:.7,bv:.2});
 if(o.curtain)p.rect(x,y,2,h,o.curtain);if(o.plant){p.rect(x,y+h-2,4,2,'#a85a2a');p.px(x+1,y+h-4,'#4a9a3a');p.px(x+2,y+h-3,'#4a9a3a')}}
function street(p){
 // sidewalk slabs
 for(let y=SW;y<CURB;y++)for(let x=0;x<W;x++){const seam=(x%24===0)||((y-SW)===8);p.px(x,y,seam?CONC[1]:rp(CONC,.62-(y-SW)/60+(H(x>>1,y>>1)-.5)*.18,x,y))}
 for(let i=0;i<40;i++){const x=Math.floor(H(i,2)*W),y=SW+2+Math.floor(H(i,3)*14);p.px(x,y,CONC[2]);if(i%3==0)p.px(x+1,y,CONC[2])}// gum spots
 for(let y=CURB;y<ROAD;y++)for(let x=0;x<W;x++)p.px(x,y,rp(CONC,y===CURB?.95:.35-(y-CURB)*.08,x,y));
 for(let y=ROAD;y<RH;y++)for(let x=0;x<W;x++){p.px(x,y,rp(ASPH,.45+(H(x,y)-.5)*.4+(vn(x/12,y/4)-.5)*.3-(y-ROAD)/120,x,y))}
 for(let x=0;x<W;x+=20)if(Math.abs(x+6-CX)>40)p.rect(x,251,12,2,['#a88a20','#e0c040'],{v:.6,bv:0});
 for(let k=0;k<6;k++)p.rect(CX-36+k*13,ROAD+2,8,RH-ROAD-4,['#a8a8a8','#d8d8d0','#f0f0e8'],{v:.6,bv:.1,tex:(x,y)=>(H(x,y)>.9?-.4:0)});// crosswalk
 // manhole + drain
 p.ell(230,262,9,3,ASPH,{v:.2,tex:(x,y)=>((x+y)%3===0?.2:0)});p.rect(140,CURB+1,10,3,['#140c1c','#2a2a32']);
}
function apartment(p,x0,x1,top,col,o={}){const R=shade(col,7);p.rect(x0,top,x1-x0,SW-top,R,{v:.5,g:.15,bv:.12,tex:brick(x0,top)});
 p.rect(x0-2,top-4,x1-x0+4,5,CONC,{v:.62,bv:.3});for(let x=x0;x<x1;x+=4)p.rect(x,top+1,2,2,CONC,{v:.4,bv:0});
 const cols=o.cols||3,cw=(x1-x0)/cols;for(let fy=top+12;fy<SW-36;fy+=24)for(let c=0;c<cols;c++){const wx=Math.round(x0+c*cw+cw/2-6);windowAt(p,wx,fy,12,14,{lit:0,curtain:H(wx,fy)>.6?(H(wx,fy+1)>.5?'#c85a5a':'#e0c070'):0,plant:H(wx,fy+2)>.75});p.rect(wx-1,fy-3,14,2,R,{v:.3,bv:0})}
 // ground floor door + steps
 const dx=Math.round((x0+x1)/2)-6;p.rect(dx-2,SW-30,16,30,R,{v:.3});p.rect(dx,SW-27,12,27,['#2a1a10','#4a2a18','#6a3a20'],{v:.5,bv:.2});p.px(dx+9,SW-14,'#e0c040');p.rect(dx-3,SW-3,18,3,CONC,{v:.6})
 if(o.fire){const fx=x1-o.fire;for(let fy=top+28;fy<SW-36;fy+=24){p.rect(fx-4,fy,26,1,'#1a1a22');p.rect(fx-4,fy-6,26,1,'#2a2a34');for(let i=0;i<26;i+=3)p.rect(fx-4+i,fy-6,1,6,'#2a2a34');p.line(fx+20,fy,fx-2,fy+23,'#2a2a34');p.line(fx+21,fy,fx-1,fy+23,'#3a3a44')}}}
function shopfront(p,x0,x1,sign,col,glow){p.rect(x0,SW-38,x1-x0,38,shade(col),{v:.45,bv:.2});const gx=x0+4,gw=x1-x0-8;
 p.rect(gx,SW-30,gw,26,GLASS,{v:.45,g:.3,bv:-.2,tex:(x,y)=>(((x-y)%16<3)?.35:0)});p.rect(gx,SW-31,gw,1,OUT);p.rect(x0,SW-4,x1-x0,4,CONC,{v:.5});
 const tw=M.tw(sign);p.rect(Math.round((x0+x1)/2-tw/2)-3,SW-46,tw+6,10,['#1a1a22','#2a2a34'],{v:.5,bv:.3});M.ftext(p,sign,Math.round((x0+x1)/2-tw/2),SW-44,glow)}
function city(p){
 // left: brick apartment w/ fire escape
 apartment(p,0,94,54,'#9a4a3a',{fire:30});
 // laundromat with flats above
 p.rect(96,100,80,SW-100,shade('#7aa098',7),{v:.55,g:.15,bv:.15,tex:(x,y)=>(H(x>>1,y>>1)-.5)*.14});p.rect(94,96,84,5,CONC,{v:.6,bv:.3});
 for(const wy of[110,136])for(const wx of[106,130,154])windowAt(p,wx,wy,12,14,{plant:wx===130});
 shopfront(p,96,176,'SUDZ','#5a7a74','#7affd0');for(const wx of[110,130,150]){p.ell(wx+6,SW-16,6,6,['#8a8a90','#c8c8d0','#ffffff'],{b:.2});p.ell(wx+6,SW-16,4,4,['#2a4a6a','#5a8ac0','#a8d8ff'],{b:.2})}
 // glass office tower
 p.rect(178,22,118,SW-22,['#3a4250','#4a5262','#5a6474','#7a8494'],{v:.5,bv:.2});p.rect(176,18,122,5,CONC,{v:.7,bv:.3});p.rect(226,6,22,13,CONC,{v:.5});p.rect(236,0,2,7,'#3a3a44');p.px(236,0,'#ff4a3a');
 for(let fy=28;fy<SW-38;fy+=10)for(let fx=184;fx<292;fx+=9)p.rect(fx,fy,7,7,GLASS,{v:.35+((fx+fy*1.5)%60<14?.45:0)+((fx*7+fy)%23===0?.4:0),bv:.1,tex:(x,y)=>(x+y)%9===0?.2:0});
 p.rect(180,SW-38,114,38,['#2a2e38','#3a3e48'],{v:.5});p.rect(214,SW-32,46,32,GLASS,{v:.5,g:.3});p.rect(237,SW-32,1,32,OUT);M.ftext(p,'MEGACORP',204,SW-46,'#c8ccd8');
 // right: cafe
 p.rect(604,94,96,SW-94,shade('#e8d4a8',7),{v:.6,g:.15,bv:.12,tex:(x,y)=>(H(x>>1,y)-.5)*.1});p.rect(602,90,100,5,['#8a5a3a','#b07a4a','#d8a060'],{v:.6,bv:.3});
 for(const wy of[104,130])for(const wx of[614,642,670])windowAt(p,wx,wy,12,14,{frame:['#3a5a2a','#4a7a3a','#7aa85a'],curtain:'#f0e8d8'});
 shopfront(p,604,700,'BEANS','#4a6a3a','#ffd070');
 for(let x=600;x<704;x++){const st=Math.floor((x-600)/8)%2;for(let y=150;y<160;y++)p.px(x,y,rp(st?['#e8e0d0','#fff8e8']:['#2a6a3a','#3a8a4a'],.6-(y-150)/20,x,y));if((x-600)%8===4){p.px(x,160,st?'#3a8a4a':'#e8e0d0')}}
 // right: tall brown apartment + water tower
 apartment(p,702,806,62,'#7a5a4a',{cols:4});
 const wt=['#3a2418','#5a3a24','#7a5232','#9a6a42'];p.rect(740,30,30,24,wt,{v:.55,tex:(x,y)=>((x-740)%4===0?-.2:0)});p.poly([[736,30],[774,30],[755,16]],['#2a2a34','#4a4a54','#6a6a74'],{v:.6});p.rect(738,40,34,1,'#2a2a34');p.rect(738,48,34,1,'#2a2a34');for(const lx of[742,766])p.rect(lx,54,2,8,'#2a2a34');p.line(742,62,768,54,'#2a2a34');
 // right: bank
 p.rect(808,110,92,SW-110,shade('#c8c0b0',7),{v:.6,g:.2,bv:.1,tex:(x,y)=>((y-110)%8===0?-.18:0)});p.poly([[804,112],[904,112],[854,90]],shade('#c8c0b0',7),{v:.6,bv:.3});p.rect(804,110,100,4,CONC,{v:.6});
 M.ftext(p,'BANK',842,118,'#4a4438');for(const cx of[818,838,870,890])p.cyl(cx-4,130,8,SW-136,shade('#d8d0c0',6),{b:.1,tex:(x,y)=>((x-cx)%3===0?-.12:0)});p.rect(848,160,14,SW-160,['#2a2418','#4a3a28']);p.rect(806,SW-6,96,6,CONC,{v:.6});
}
/* ---------- the wacky museum ---------- */
const PURP=['#2a0a4a','#4a1a7a','#6a2aa8','#8a4ad8','#aa6ae8','#ca9af4','#ecd0ff'];
function museum(){const m=new Pix(310,SW);const ox=295; // local coords: x+ox = world
 const L=x=>x-ox;
 // left turret with a soft-serve roof
 m.cyl(L(304),58,38,SW-58,shade('#3ac0b0',7),{b:.1,tex:(x,y)=>((y%10)<1?-.2:0)});
 for(let k=0;k<5;k++){const r=22-k*4,yy=52-k*7;m.ell(L(323),yy,r,5,['#c84a8a','#e86aaa','#ff9ac8','#ffd0e8','#ffffff'],{b:.15})}m.ell(L(325),16,3,4,['#c8202a','#ff4a4a','#ffaaaa'],{b:.2});m.line(L(325),12,L(328),6,'#3a8a2a');
 windowAt(m,L(316),80,14,18,{});windowAt(m,L(316),120,14,18,{lit:1});
 // main body: wobbly walls
 const wob=y=>Math.round(Math.sin(y/11)*2);
 m.fill(L(340),76,L(560)+1,SW,(x,y)=>{const X=x+ox;return X>=340+wob(y)&&X<=560-wob(y+5)&&y>=76},PURP,{v:.55,g:.25,bv:.25,tex:(x,y)=>{const X=x+ox;const dot=((X+((y>>3)&1)*8)%16-8)**2+((y%16)-8)**2<9;return dot?.7:(H(X>>1,y>>1)-.5)*.1}});
 // rainbow stripe near the base
 const RB=['#ff4a5a','#ff9a3a','#ffe04a','#5ad06a','#4aa8ff','#9a6aff'];for(let y=192;y<204;y++)for(let x=340;x<=560;x++){const X=x+wob(y)*0;if(X<340+wob(y)||X>560-wob(y+5))continue;m.px(L(x),y,rp(ramp(RB[(y-192)>>1],4),.6+(x<350?.2:0),x,y))}
 // frosting drips along the roofline
 for(let x=336;x<=564;x++){const len=3+Math.floor(H(x>>2,5)*(H(x>>2,6)>.6?14:5));for(let y=72;y<76+len;y++){const edge=(x%4===0&&y>74+len-2);m.px(L(x),y,rp(['#d84a9a','#ff7ab8','#ffb0d8','#ffe8f4'],.7-(y-72)/30+(edge?-.3:0),x,y))}}
 for(let i=0;i<40;i++){const x=338+Math.floor(H(i,8)*224),y=73+Math.floor(H(i,9)*4);m.px(L(x),y,RB[i%6])}// sprinkles
 // sign board (letters are a live ent)
 m.rrect(L(CX-90),84,180,24,3,['#2a1a0a','#5a3a1a','#8a5a2a','#b07a3a','#d0a060'],{v:.55,bv:.3,tex:(x,y)=>((y-84)%6===0?-.2:0)});m.rect(L(CX-86),87,172,18,['#1a0e2a','#2a1a3a'],{v:.5,bv:-.2});
 for(const bx of[CX-88,CX+86])for(const by of[86,105])m.px(L(bx),by,'#ffe08a');
 // tagline plaque
 const tg='NOW WITH EXTRA PIXELS',tw=M.tw(tg);m.rect(L(CX-tw/2-4),110,tw+8,10,['#c89a20','#e8c040','#fff08a'],{v:.6,bv:.3});M.ftext(m,tg,L(Math.round(CX-tw/2)),112,'#4a2a08');
 // googly-eye window sockets
 for(const ex of[CX-60,CX+60]){m.ell(L(ex),140,15,15,['#1a0a2a','#3a1a4a','#e0c040','#fff08a'],{b:.2});}
 // big lips around the door
 m.rrect(L(CX-36),134,72,74,26,['#6a0a1a','#a81a2a','#e03a4a','#ff7a7a','#ffc0c0'],{v:.6,bv:.3});m.rect(L(CX-28),SW-4,56,4,['#6a0a1a','#a81a2a'],{v:.5});
 for(let k=0;k<6;k++)if(k!==4)m.rect(L(CX-24+k*8),138,7,6,['#a8a0a0','#e8e4e0','#ffffff'],{v:.7,bv:.3});// teeth (one missing)
 // candy cane pillars
 for(const px of[CX-52,CX+44])m.cyl(L(px),146,8,SW-146,['#8a0a1a','#e02a3a','#ff8a8a'],{b:.1,tex:(x,y)=>((x+y)%8<4?.6:0)});
 // crooked lower windows (characters peek out of these)
 m.rect(L(CX-112),156,28,30,['#2a0a3a','#4a1a5a'],{v:.4});m.rect(L(CX-108),160,20,22,['#0e1a2a','#1a2a44','#2a4060'],{v:.5,g:.4,bv:0});
 m.rect(L(CX+82),152,28,30,['#2a0a3a','#4a1a5a'],{v:.4});m.rect(L(CX+86),156,20,22,['#0e1a2a','#1a2a44','#2a4060'],{v:.5,g:.4,bv:0});
 // right side crazy-straw chimney
 for(let y=26;y<80;y++){const x=548+Math.round(Math.sin(y/5)*4);m.rect(L(x),y,6,1,(y>>2)%2?['#ff4a8a','#ffaacc']:['#4ad0ff','#c8f4ff'],{v:.6,bv:0})}
 // mascot support struts
 for(const sx of[CX-22,CX+20])m.rect(L(sx),62,3,14,['#3a3a44','#6a6a74','#9a9aa4'],{v:.6});
 // little steps
 m.rect(L(CX-30),SW-2,60,2,['#c8a8e8','#ecd0ff'],{v:.6});
 m.ol(OUT);
 return{m,ox}}
function blitShear(p,{m,ox}){for(let y=0;y<m.h;y++){const off=y<140?Math.round((140-y)/18):0;for(let x=0;x<m.w;x++){const o=(y*m.w+x)*4;if(m.d[o+3])p.px(x+ox+off,y,[m.d[o],m.d[o+1],m.d[o+2]])}}}
/* ---------- sprites ---------- */
function doorFrames(){const out=[];const WOOD=['#1a0e10','#3a1e16','#5e3420','#86502c','#ae7040','#d0965a'];
 for(let k=0;k<8;k++){const o=k/7;out.push(M.mk(52,62,p=>{
  for(let y=0;y<62;y++)for(let x=0;x<52;x++){const d=Math.hypot(x-26,y-18)/40;p.px(x,y,rp(['#3a1a14','#7a3a1c','#c8762a','#ffc060','#fff0c0'],1-d*.9+(o<.1?-1:0),x,y))}
  if(o>.2){for(let i=0;i<5;i++){const lx=10+i*8;p.px(lx,8,'#fff8e0');p.px(lx,9,'#ffd890')}p.rect(6,6,40,1,'#5a3a20')}
  for(let y=50;y<62;y++)for(let x=0;x<52;x++)if(bay(x,y)<.35)p.px(x,y,'#e8b070');
  const lw=Math.max(2,Math.round(26*(1-o*.9)));
  for(const s of[0,1]){const x0=s?52-lw:0;p.rect(x0,0,lw,62,WOOD,{v:.5-o*.25,g:.15,bv:.2,tex:(x,y)=>(((x-x0)%6===0)?-.18:0)+(H(x,y>>2)-.5)*.08});
   if(lw>8){p.rect(x0+3,6,lw-6,22,WOOD,{v:.38-o*.2,bv:-.2});p.rect(x0+3,33,lw-6,24,WOOD,{v:.38-o*.2,bv:-.2});const hx=s?x0+3:x0+lw-4;p.rect(hx,30,2,5,['#5a3a10','#c8902a','#ffe08a'],{v:.6});p.px(hx,30,'#fff4c0')}
   for(let y=4;y<60;y+=11)p.px(s?x0+lw-2:x0+1,y,'#d8a24a')}
  p.rect(0,0,52,1,'#140c1c')},false))}return out}
function catFrames(){const F=['#1a1020','#3a2a3a','#6a5050','#a07a6a','#d0a888'];return M.frames(3,16,14,(p,f)=>{p.ell(8,9,5,4,F,{b:.1});p.ell(11,5,3.5,3.2,F,{b:.15});p.poly([[9,3],[10,0],[11,3]],F,{v:.4});p.poly([[12,3],[13,0],[14,3]],F,{v:.4});
 p.px(10,5,f===1?'#3a2a3a':'#9aff6a');p.px(12,5,f===1?'#3a2a3a':'#9aff6a');p.px(11,7,'#ff8aa0');const tl=f===2?[[3,8],[1,5],[1,3]]:[[3,9],[1,8],[0,6]];for(const[a,b]of tl)p.rect(a,b,2,2,F,{v:.45})})}
function pigeonFrames(){const G=['#2a2a3a','#4a4a5a','#6a6a7a','#9a9aaa'];return M.frames(4,12,10,(p,f)=>{const pk=f===1,fl=f>=2;
 p.ell(6,6,4,3,G,{b:.15});p.ell(pk?9:8,pk?6:3,2.4,2.2,G,{b:.2});p.px(pk?10:9,pk?6:3,'#ff8a2a');p.px(pk?11:10,pk?7:3,'#c8a060');p.px(7,5,'#5aa08a');p.px(7,6,'#8a5a9a');
 if(fl){p.line(3,f===2?0:7,6,5,G[1]);p.line(2,f===2?1:8,5,5,G[0])}else{p.px(5,9,'#ff8a2a');p.px(7,9,'#ff8a2a')}p.rect(1,6,2,1,G[0])})}
function birdFrames(){return M.frames(2,9,5,(p,f)=>{const c='#2a2a3a';p.rect(3,2,3,2,c);p.px(6,2,c);if(f){p.line(0,0,3,2,c);p.line(8,0,5,2,c)}else{p.line(0,3,3,2,c);p.line(8,3,5,2,c)}},false)}
function lampFrames(){return M.frames(2,14,62,(p,f)=>{const IR=['#140c1c','#2a3a34','#3a5048','#5a7068'];p.rect(6,14,2,44,IR,{v:.6});p.rect(4,56,6,6,IR,{v:.5});p.rect(3,10,8,2,IR);
 p.rrect(3,2,8,9,2,f?['#6a4a20','#d89a3a','#ffd070','#fff4c0']:['#4a5a58','#7a8a88','#a8b8b8','#d8e8e8'],{v:.65,g:.4});p.rect(2,1,10,2,IR,{v:.6})})}
function carFrames(kind,flip){const B={sedan:['#3a5a9a',44,16],taxi:['#e8c030',44,18],truck:['#f0e8f0',60,28],van:['#c84a3a',50,22],bus:['#3a9a6a',96,32]}[kind];const[col,w,h]=B;const C=shade(col,7);
 return M.frames(2,w,h,(P,f)=>{const p=new Pix(w,h);const TX=[];const ftext=(s,x,y,c)=>TX.push([s,x,y,c]);const top=kind==='taxi'?4:0;
  if(kind==='bus'){p.rrect(0,0,w,h-4,4,C,{v:.55,bv:.25});for(let x=8;x<w-10;x+=12)p.rect(x,5,9,9,GLASS,{v:.6,g:.4});p.rect(w-9,4,7,12,GLASS,{v:.7});p.rect(0,18,w,2,shade('#f0f0e0'),{v:.7});ftext('MUSEUM',8,20,'#ffffff');p.rect(w-14,h-14,4,10,OUT)}
  else if(kind==='truck'){p.rrect(0,0,44,h-4,3,C,{v:.6,bv:.25});p.rrect(44,8,16,h-12,3,shade('#ff8ab8'),{v:.6,bv:.25});p.rect(48,10,8,6,GLASS,{v:.7});p.rect(6,4,30,10,['#5a2a1a','#8a4a2a'],{v:.5});
   for(let i=0;i<5;i++)p.rect(8+i*6,6,4,6,['#ff7ab8','#ffe08a','#7ad0ff','#c8a060','#ffffff'][i]);p.ell(22,-1,5,4,['#d8a058','#f0c890'],{b:.1});p.ell(22,-4,4,3,shade('#ff9ac8'),{b:.2});ftext('YUM',12,16,'#d83a7a')}
  else{const r=kind==='van'?[[0,8],[w,8]]:[[0,9],[w,9]];p.rrect(0,top+7,w,h-top-11,3,C,{v:.6,bv:.25});p.rrect(kind==='van'?2:9,top,kind==='van'?w-10:w-20,10,3,C,{v:.55,bv:.2});
   p.rect(kind==='van'?w-17:w-18,top+2,7,6,GLASS,{v:.7,g:.4});p.rect(kind==='van'?6:12,top+2,kind==='van'?w-26:12,6,GLASS,{v:.6,g:.4});p.rect(w-3,top+9,3,2,'#fff4b0');p.rect(0,top+9,2,2,'#e02a2a');
   if(kind==='taxi'){p.rect(w/2-5,0,10,4,['#2a2a2a','#ffffff']);for(let x=2;x<w-2;x+=4)p.rect(x,top+12,2,1,OUT)}}
  const wy=h-6;for(const wx of kind==='bus'?[12,w-20]:kind==='truck'?[8,48]:[7,w-13]){p.ell(wx+3,wy+3,3.5,3.5,['#0e0e14','#2a2a32','#4a4a52'],{b:0});p.px(wx+3+(f?1:-1),wy+3,'#a8a8b0');p.px(wx+3,wy+3,'#6a6a72')}
  P.blit(p,0,0,flip);for(const[t,x,y,c]of TX)M.ftext(P,t,flip?w-x-M.tw(t):x,y,c)
 })}
function tubeFrames(){return M.frames(6,24,58,(p,f)=>{const ph=f/6*TAU;const T=shade('#ff5a2a',6);let x=12,y=56;
 for(let s=0;s<44;s++){const bend=Math.sin(ph+s*.12)*(s/44)*7;const cx=Math.round(12+bend);p.rect(cx-4,56-s,8,1,T,{v:.55+(Math.sin(ph+s*.2)*.15),bv:0});if(s===30){const a=Math.sin(ph*2)*8;p.line(cx-4,56-s,cx-12,56-s-6+a,T[3]);p.line(cx-4,55-s,cx-12,55-s-6+a,T[2]);p.line(cx+4,56-s,cx+11,56-s-6-a,T[3]);p.line(cx+4,55-s,cx+11,55-s-6-a,T[2])}
  if(s===40){p.rect(cx-2,56-s,2,2,'#ffffff');p.rect(cx+1,56-s,2,2,'#ffffff');p.px(cx-1,57-s,OUT);p.px(cx+2,57-s,OUT);p.rect(cx-2,61-s-8,5,1,OUT)}}
 for(let k=0;k<5;k++)p.px(Math.round(12+Math.sin(ph+44*.12)*7)-2+k,12-(k%2),'#ffe04a');p.rect(6,52,12,6,['#2a2a34','#5a5a64'],{v:.5})})}
const PEEK={dino:p=>{const D=shade('#4ac04a');p.rrect(2,2,16,12,4,D,{v:.6});p.rect(4,12,12,10,D,{v:.5});p.px(6,6,OUT);p.px(5,6,'#ffffff');for(let i=0;i<4;i++)p.px(5+i*3,12,'#ffffff');p.rect(4,11,12,1,OUT)},
 robot:p=>{const S=shade('#9aa8c0');p.rrect(2,4,16,14,2,S,{v:.6});p.rect(4,7,12,7,['#0a1a1a','#103030']);p.px(7,9,'#7affd0');p.px(12,9,'#7affd0');p.rect(7,12,6,1,'#7affd0');p.line(10,4,10,0,'#d0dcea');p.px(10,0,'#ff4a3a');p.rect(4,18,12,4,S,{v:.4})}};
M.def('entrance',{name:M.NAME,w:W,start:CX,top:'#3a6ab8',bot:'#2a2a32',
 bg(p,R){street(p);city(p);blitShear(p,museum());R.sky=skyCanvas()},
 init(R){const E=e=>M.ent(R,e);const D=doorFrames();const K=M.K;
  R.door=E({name:'ENTER',x:CX-26,y:146,w:52,h:62,box:1,open:0,z:SW-1,
   draw(g,x,y,t,e,sel){const k=Math.min(7,Math.floor(e.open*7.99));g.drawImage(D[k].c,x,y);
    if(sel&&!e.open){g.fillStyle='#fff6c4';g.fillRect(x-1,y,1,62);g.fillRect(x+52,y,1,62)}},
   click(e,R){if(e.open||M.busy())return;e.opening=1;M.snd('open');M.snd('boing',.8);if(R.mascot)R.mascot.tongue=M.now+1.5},
   upd(e,dt,t,R){if(e.opening&&e.open<1){e.open=Math.min(1,e.open+dt*(RM?6:1.6));if(e.open>.3&&!e.burst){e.burst=1;M.emit(R,'confetti',CX,170,24,{dir:-Math.PI/2,spread:2.4})}if(e.open>=1){const[ox,oy]=M.view(R);M.go('hall',{from:[CX+ox,175+oy],style:'blocks',col:'#ff7ab8',dout:.75})}}}});
  // bouncing arrow over the door
  E({name:null,nohit:1,x:CX-6,y:120,w:12,h:8,z:SW,draw(g,x,y,t,e){if(R.door.open)return;const b=RM?0:Math.round(Math.abs(Math.sin(t*3))*-3);for(let j=0;j<5;j++){g.fillStyle=OUT;g.fillRect(x+j,y+b+j,11-j*2,1)}g.fillStyle='#ffe08a';for(let j=0;j<4;j++)g.fillRect(x+1+j,y+b+j,9-j*2,1)}});
  // bouncy rainbow sign letters
  const NM='PIXEL MUSEUM',RBW=['#ff4a5a','#ff9a3a','#ffe04a','#5ad06a','#4aa8ff','#c06aff'];const LET=[...NM].map((ch,i)=>ch===' '?null:M.mk(M.tw(ch)*2+2,16,p=>K.big(p,ch,1,1,shade(RBW[i%6],5),2)));
  let lx=0;const LX=[...NM].map(ch=>{const x=lx;lx+=(M.tw(ch)+1)*2;return x});const LW=lx;
  E({name:'PIXEL MUSEUM',x:CX-LW/2,y:88,w:LW,h:18,box:1,wave:-9,draw(g,x,y,t,e,sel){LET.forEach((s,i)=>{if(!s)return;const ph=t*(sel?7:3)+i*.6;let b=RM?0:Math.round(Math.sin(ph)*1.4);const w=M.now-e.wave-i*.06;if(w>0&&w<.4)b-=Math.round(Math.sin(w/.4*Math.PI)*6);g.drawImage(s.c,x+LX[i],y+b)})},
   click(e,R){e.wave=M.now;M.snd('tada');M.emit(R,'confetti',CX,90,30,{rx:70})}});
  // the mascot logo: Pixel Pal, a grinning block with googly eyes and a propeller beanie
  const HEAD=M.mk(76,62,p=>{p.rrect(2,10,72,50,10,['#8a5a08','#c88a10','#f0b820','#ffd84a','#fff08a','#fffce0'],{v:.6,g:.25,bv:.25,tex:(x,y)=>{const d=Math.hypot(x-60,y-50);return d<22?-.25*(1-d/22)-(bay(x,y)<.3?.15:0):0}});
   for(let j=0;j<6;j++)for(let i=0;i<8;i++)if(bay(i,j)<.5){p.px(8+i,40+j,'#ff8a7a');p.px(60+i,40+j,'#ff8a7a')}
   p.fill(14,36,62,58,(x,y)=>{const u=(x-38)/24,v=(y-36)/20;return v>=0&&u*u+v*v<1&&v>u*u*.4},['#3a0a14','#6a1a24','#a02a3a'],{v:.4,bv:-.2});
   for(let i=0;i<6;i++)if(i!==2)p.rect(22+i*5,38,4,4,['#c8c0b8','#ffffff'],{v:.7});p.ell(42,52,7,4,['#c83a5a','#ff6a8a','#ffa0b8'],{b:.2});
   // beanie
   for(let y=1;y<14;y++)for(let x=14;x<62;x++){if(((x-38)/24)**2+((y-14)/13)**2>=1)continue;const seg=Math.floor(Math.atan2(y-14,x-38)/Math.PI*4+8)%4;p.px(x,y,rp(ramp(['#ff4a5a','#4aa8ff','#ffe04a','#5ad06a'][seg],5),.6-(x-14)/80,x,y))}
   p.rect(12,12,52,3,['#1a3a8a','#2a5ad0','#5a8aff'],{v:.6})},OUT);
  R.mascot=E({name:'PIXEL PAL',x:CX-38,y:6,w:76,h:62,box:1,z:-2,react:'jiggle',spin:0,
   draw(g,x,y,t,e,sel){const lean=RM?0:Math.round(Math.sin(t*1.3)*1);x+=lean;if(sel)g.drawImage(M.ring(HEAD),x-1,y-1);g.drawImage(HEAD.c,x,y);
    // googly eyes track the pointer
    const[vx,vy]=M.view(R);const px=M.ptr?M.ptr[0]-vx:CX,py=M.ptr?M.ptr[1]-vy:200;
    for(const ex of[24,52]){const cx=x+ex,cy=y+26;g.fillStyle=OUT;g.fillRect(cx-9,cy-7,18,14);g.fillRect(cx-7,cy-9,14,18);g.fillStyle='#ffffff';g.fillRect(cx-8,cy-6,16,12);g.fillRect(cx-6,cy-8,12,16);g.fillStyle='#d8d8e8';g.fillRect(cx+2,cy+5,5,2);
     let a=Math.atan2(py-(cy-vy*0),px-cx);if(e.spin>M.now)a=t*20+ex;const blink=!RM&&Math.sin(t*.7)>.985;if(blink){g.fillStyle='#f0b820';g.fillRect(cx-8,cy-6,16,12);g.fillRect(cx-6,cy-8,12,16);g.fillStyle=OUT;g.fillRect(cx-7,cy,14,1);continue}
     const r=Math.min(4,Math.hypot(py-cy,px-cx)/10),qx=Math.round(cx+Math.cos(a)*r),qy=Math.round(cy+Math.sin(a)*r);g.fillStyle=OUT;g.fillRect(qx-3,qy-2,6,4);g.fillRect(qx-2,qy-3,4,6);g.fillStyle='#ffffff';g.fillRect(qx-2,qy-2,1,1)}
    if(e.tongue>M.now){g.fillStyle='#ff6a8a';g.fillRect(x+38,y+56,8,6);g.fillRect(x+39,y+62,6,2);g.fillStyle='#c83a5a';g.fillRect(x+41,y+56,1,6)}
    // propeller
    const sp=e.spin>M.now?30:4,ang=RM?0:t*sp,len=Math.round(Math.cos(ang)*12);g.fillStyle='#4a4a54';g.fillRect(x+37,y-4,2,6);g.fillStyle='#ff4a5a';g.fillRect(x+38-Math.abs(len),y-6,Math.abs(len),2);g.fillStyle='#4aa8ff';g.fillRect(x+38,y-6,Math.abs(len),2);g.fillStyle='#ffe04a';g.fillRect(x+37,y-6,2,2)},
   click(e,R){M.react(R,e);e.spin=M.now+1.6;e.tongue=M.now+1.2;M.snd('honk');M.say(R,CX,4,K.pick(['HI! I AM 100% SQUARE','WELCOME, HUMAN!','NO SMOOTHING ALLOWED','BOOP!']));M.emit(R,'confetti',CX,30,20)}});
  // googly-eye windows on the facade
  for(const ex of[CX-60,CX+60])E({name:'GOOGLY WINDOW',x:ex+2-12+(ex<CX?1:1),y:128,w:24,h:24,box:1,z:-1,draw(g,x,y,t,e,sel){const cx=x+12,cy=y+12;g.fillStyle='#ffffff';g.beginPath();for(let j=-11;j<=11;j++){const hw=Math.floor(Math.sqrt(121-j*j));g.fillRect(cx-hw,cy+j,hw*2,1)}
    const[vx,vy]=M.view(R);const px=M.ptr?M.ptr[0]-vx:CX,py=M.ptr?M.ptr[1]-vy:220;let a=Math.atan2(py-cy+vy*0,px-cx);if(e.spin>M.now)a=M.now*25;const q=Math.round(cx+Math.cos(a)*5),r=Math.round(cy+Math.sin(a)*5+(RM?0:1));
    g.fillStyle=OUT;for(let j=-5;j<=5;j++){const hw=Math.floor(Math.sqrt(25-j*j));g.fillRect(q-hw,r+j,hw*2,1)}g.fillStyle='#ffffff';g.fillRect(q-3,r-3,2,2);if(sel){g.fillStyle='#ffe08a';g.fillRect(cx-11,cy-12,22,1)}},
   click(e,R){e.spin=M.now+1;M.snd('boing',1.2+Math.random()*.3);M.say(R,e.x+12,e.y-4,K.pick(['BOING','*JIGGLE*','I SEE YOU']))}});
  // peeking critters in the lower windows
  [[CX-108,160,'dino','RAWR (HI)','roar'],[CX+86,156,'robot','BEEP BOOP','beep']].forEach(([wx,wy,k,line,s])=>{const sp=M.mk(20,22,PEEK[k]);E({name:k==='dino'?'PEEKING DINO':'PEEKING ROBOT',x:wx,y:wy,w:20,h:22,box:1,z:-1,draw(g,x,y,t,e,sel){const up=RM?6:Math.round(((Math.sin(t*.9+x)+1)/2)*10+(e.pop>M.now?-8:0));g.save();g.beginPath();g.rect(x,y,20,22);g.clip();g.drawImage(sp.c,x,y+up+4);g.restore()},
   click(e,R){e.pop=M.now+1;M.snd(s);M.say(R,e.x+10,e.y-4,line);M.emit(R,k==='dino'?'note':'zap',e.x+10,e.y+4,6)}})});
  // chimney puffs pixel cubes
  E({name:'CRAZY STRAW CHIMNEY',x:546,y:22,w:16,h:56,box:1,z:-1,draw(g,x,y,t,e,sel){if(sel){g.fillStyle='#ffe08a';g.fillRect(x,y,16,1)}},upd(e,dt,t,R){e.cd=(e.cd||0)-dt;if(e.cd<0&&!RM){e.cd=.35;M.emit(R,'pixel',e.x+8+2,e.y,1,{dir:-Math.PI/2,spread:.6})}},click(e,R){M.snd('pop');M.emit(R,'pixel',e.x+8,e.y,24,{dir:-Math.PI/2,spread:1.2});M.say(R,e.x+8,e.y-6,'FRESH PIXELS!')}});
  // turret cherry
  E({name:'SOFT-SERVE TOWER',x:304,y:8,w:40,h:46,box:1,z:-1,draw(){},click(e,R){M.snd('squish');M.emit(R,'heart',326,20,6);M.say(R,326,6,'MMM, SPRINKLES')}});
  // wacky inflatable tube man
  const TF=tubeFrames();E({name:'TUBE GUY',x:574,y:SW+14-58,fr:TF,fps:9,z:SW+14,react:'shake',click(e,R){M.react(R,e);e.fps=24;setTimeout(()=>e.fps=9,1500);M.snd('whoosh');M.say(R,e.x+12,e.y-4,K.pick(['WHOOOA','FLAIL!','ART!!!']))}});
  // balloon bunches by the door
  [[CX-72,SW],[CX+70,SW]].forEach(([bx,by],i)=>E({name:'BALLOONS',x:bx-8,y:by-40,w:16,h:40,box:1,z:220,gone:0,draw(g,x,y,t,e,sel){const C=[['#ff4a5a','#ff9a9a'],['#4aa8ff','#aad8ff'],['#ffe04a','#fff0a0']];g.fillStyle='#e8e8e8';for(let k=0;k<3;k++){const kx=x+3+k*5,ky=y+6+(k%2)*4+(RM?0:Math.round(Math.sin(t*2+k+i)));g.fillRect(kx+1,ky+6,1,30-(k%2)*4);if(e.gone===k&&e.gt>M.now)continue;g.fillStyle=C[k][0];g.fillRect(kx-2,ky-3,6,8);g.fillRect(kx-1,ky-4,4,10);g.fillStyle=C[k][1];g.fillRect(kx-1,ky-2,1,2);g.fillStyle='#e8e8e8'}},
   click(e,R){e.gone=(e.gone+1)%3;e.gt=M.now+3;M.snd('pop',1.2);M.emit(R,'confetti',e.x+8,e.y+8,10)}}));
  // traffic light
  R.light={s:0,t:0};E({name:'TRAFFIC LIGHT',x:CX-60,y:CURB-62,w:12,h:62,box:1,z:CURB,draw(g,x,y,t,e,sel){g.fillStyle='#2a2a34';g.fillRect(x+5,y+18,3,44);g.fillStyle=OUT;g.fillRect(x,y,12,22);g.fillStyle='#3a3a44';g.fillRect(x+1,y+1,10,20);const C=[['#2aff6a','#0a3a1a'],['#ffd040','#3a300a'],['#ff3a3a','#3a0a0a']];const ord=[2,1,0];
    for(let k=0;k<3;k++){const on=R.light.s===ord[k];g.fillStyle=on?C[ord[k]][0]:C[ord[k]][1];g.fillRect(x+3,y+2+k*6,6,5);g.fillRect(x+4,y+1+k*6,4,7);if(on){g.fillStyle='#ffffff';g.fillRect(x+4,y+2+k*6,1,1)}}if(sel){g.fillStyle='#ffe08a';g.fillRect(x-1,y,1,22)}},
   upd(e,dt,t,R){R.light.t+=dt;const dur=[6,1.5,4][R.light.s];if(R.light.t>dur){R.light.t=0;R.light.s=(R.light.s+1)%3}},click(e,R){R.light.s=(R.light.s+1)%3;R.light.t=0;M.snd('beep',R.light.s===2?.7:1.3)}});
  // cars
  const lanes=[{y:239,d:1},{y:262,d:-1}];const kinds=[['sedan',0],['taxi',1],['truck',0],['van',1],['bus',1],['sedan',0]];
  kinds.forEach(([k,l],i)=>{const ln=lanes[l];const fr=carFrames(k,ln.d<0);const f0=fr[0];E({name:{sedan:'SEDAN',taxi:'TAXI',truck:'ICE CREAM TRUCK',van:'VAN',bus:'MUSEUM BUS'}[k],car:1,lane:l,x:(i*170+40)%W,y:ln.y-f0.h,fr,sp:28+H(i,4)*16,z:ln.y,react:'hop',hop:4,
   upd(e,dt,t,R){if(RM){return}let v=e.sp*ln.d;const front=ln.d>0?e.x+e.fr[0].w:e.x;const stopX=ln.d>0?CX-42:CX+42;const near=ln.d>0?(stopX-front>0&&stopX-front<16):(front-stopX>0&&front-stopX<16);if(R.light.s===2&&near)v=0;
    for(const o of R.ents)if(o!==e&&o.car&&o.lane===e.lane){const gap=ln.d>0?o.x-(e.x+e.fr[0].w):e.x-(o.x+o.fr[0].w);if(gap>0&&gap<8)v=0}
    e.x+=v*dt;if(v)e.f=Math.floor(t*8)%2;if(ln.d>0&&e.x>W+20)e.x=-e.fr[0].w-20-Math.random()*60;if(ln.d<0&&e.x<-e.fr[0].w-20)e.x=W+20+Math.random()*60},
   click(e,R){M.react(R,e);M.snd(k==='truck'?'chime':'honk',k==='bus'?.7:k==='taxi'?1.3:1);M.say(R,e.x+e.fr[0].w/2,e.y-4,{sedan:'BEEP BEEP',taxi:'TAXI!',truck:'DING DING! SOFT SERVE',van:'HONK',bus:'NEXT STOP: ART'}[k]);if(k==='truck')M.emit(R,'heart',e.x+22,e.y,4)}})});
  // pedestrians on the sidewalk
  K.visitors(R,7,SW+16,['NICE DAY','IS THAT BUILDING...SMILING?','LATE FOR WORK!','I ONLY SEE PIXELS NOW','COFFEE FIRST','WHO PAINTED THAT?','LOVE THE LOBBY'],{off:2});
  // pigeons
  const PF=pigeonFrames();for(let i=0;i<5;i++){const hx=120+i*160+Math.random()*40;E({name:'PIGEON',x:hx,y:SW+10+(i%2)*4,fr:PF,hx,z:SW+20,flip:i%2,upd(e,dt,t,R){if(e.fly){e.f=2+(Math.floor(t*14)%2);e.x+=e.vx*dt;e.y-=50*dt;if(e.y<-20){e.fly=0;e.x=e.hx;e.y=SW+10}return}e.f=(!RM&&Math.sin(t*3+e.t0*5)>.6)?1:0},
   click(e,R){e.fly=1;e.vx=(Math.random()<.5?-1:1)*40;e.flip=e.vx<0;M.snd('swish',1.4);M.emit(R,'dust',e.x+6,e.y+6,4,{c:['#6a6a7a','#9a9aaa']})}})}
  // hydrant
  E({name:'FIRE HYDRANT',x:120,y:SW+2,w:10,h:14,box:1,z:SW+16,draw(g,x,y,t,e,sel){const C=['#7a0a1a','#c82a2a','#ff6a5a'];g.fillStyle=C[0];g.fillRect(x+1,y+3,8,11);g.fillStyle=C[1];g.fillRect(x+2,y+3,5,11);g.fillRect(x+2,y,6,3);g.fillRect(x,y+5,10,3);g.fillStyle=C[2];g.fillRect(x+2,y+1,2,2);g.fillRect(x+3,y+4,1,9);if(sel){g.fillStyle='#ffe08a';g.fillRect(x,y-1,10,1)}
    if(e.spray>M.now&&!RM){g.fillStyle='#bcecff';for(let k=0;k<14;k++){const tt=(M.now*3+k/14)%1;g.fillRect(Math.round(x+10+tt*30),Math.round(y+6-Math.sin(tt*Math.PI)*16),1,1)}}},click(e,R){e.spray=M.now+2;M.snd('splash');M.emit(R,'bubble',e.x+14,e.y,8)}});
  // mailbox
  E({name:'MAILBOX',x:690,y:SW-2,w:14,h:20,box:1,z:SW+18,draw(g,x,y,t,e,sel){g.fillStyle='#1a2a5a';g.fillRect(x,y+2,14,14);g.fillStyle='#2a4aa0';g.fillRect(x+1,y,12,14);g.fillStyle='#5a7ad0';g.fillRect(x+2,y+1,3,10);g.fillStyle=OUT;g.fillRect(x+3,y+5,8,1);g.fillStyle='#2a2a34';g.fillRect(x+2,y+16,2,4);g.fillRect(x+10,y+16,2,4);if(e.let>M.now){g.fillStyle='#ffffff';g.fillRect(x+4,y+1-Math.round((1-(e.let-M.now))*10),6,4)}if(sel){g.fillStyle='#ffe08a';g.fillRect(x,y-1,14,1)}},click(e,R){e.let=M.now+1;M.snd('thud',1.3);M.say(R,e.x+7,e.y-6,'DEAR MUSEUM: WHY?')}});
  // hot dog cart
  const CART=M.mk(40,30,p=>{p.rect(2,12,36,14,shade('#e8e8f0'),{v:.6,bv:.2});p.rect(2,16,36,3,'#e04a3a');M.ftext(p,'DOGS',8,20,'#c82a2a');for(let x=0;x<40;x++)for(let y=0;y<8;y++)p.px(x,y,rp(((x>>2)&1)?['#c82a2a','#ff5a4a']:['#e8e0d0','#ffffff'],.6-y/16,x,y));p.rect(19,8,2,4,'#4a4a54');p.ell(8,27,3,3,['#0e0e14','#3a3a44'],{});p.ell(32,27,3,3,['#0e0e14','#3a3a44'],{})});
  E({name:'HOT DOG CART',x:252,y:SW-12,fr:[CART],z:SW+18,react:'jiggle',click(e,R){M.react(R,e);M.snd('crunch');M.emit(R,'confetti',e.x+20,e.y,8,{c:['#ffd040','#5ad06a','#c86a3a']});M.say(R,e.x+20,e.y-4,K.pick(['RELISH!','MUSTARD!','PIXEL DOGS $2']))}});
  // chalk sandwich board
  E({name:'SANDWICH BOARD',x:516,y:SW-8,w:26,h:24,box:1,z:SW+18,draw(g,x,y,t,e,sel){g.fillStyle='#6a4a2a';g.fillRect(x,y,26,22);g.fillRect(x+2,y+22,2,2);g.fillRect(x+22,y+22,2,2);g.fillStyle='#1a2a22';g.fillRect(x+2,y+2,22,17);M.txt&&0;g.fillStyle='#e8e8d8';const s=e.alt?['NO','BLUR!']:['FREE','ENTRY'];
    s.forEach((w,j)=>{const sp=M.txt(w,'#e8e8d8',null);g.drawImage(sp.c,x+13-Math.floor(sp.w/2),y+3+j*8)});if(sel){g.fillStyle='#ffe08a';g.fillRect(x,y-1,26,1)}},click(e,R){e.alt^=1;M.snd('tick');M.emit(R,'dust',e.x+13,e.y+10,4,{c:['#e8e8d8']})}});
  // street lamps
  const LF=lampFrames();[[88,SW-50],[372,SW-50],[612,SW-50],[810,SW-50]].forEach(([lx,ly])=>E({name:'LAMP POST',x:lx,y:ly,fr:LF,on:0,f:0,z:SW+12,click(e,R){e.on^=1;e.f=e.on;M.snd(e.on?'blip':'thud',e.on?1.2:.8);if(e.on)M.emit(R,'star',lx+7,ly+6,6)}}));
  // bus stop bench + sign
  E({name:'BUS STOP',x:700,y:SW-34,w:30,h:50,box:1,z:SW+14,draw(g,x,y,t,e,sel){g.fillStyle='#2a2a34';g.fillRect(x+2,y,2,50);g.fillStyle='#2a5ad0';g.fillRect(x-2,y,10,10);g.fillStyle='#ffffff';g.fillRect(x,y+3,6,1);g.fillRect(x,y+6,6,1);g.fillStyle='#5a3a24';g.fillRect(x+8,y+38,22,3);g.fillRect(x+8,y+32,22,2);g.fillStyle='#2a2a34';g.fillRect(x+10,y+41,2,8);g.fillRect(x+26,y+41,2,8);if(sel){g.fillStyle='#ffe08a';g.fillRect(x-2,y-1,10,1)}},click(e,R){M.snd('ding');M.say(R,e.x+3,e.y-4,'BUS IN: 3 MIN (MAYBE)')}});
  // museum cat on the step
  const CF=catFrames();E({name:'MUSEUM CAT',x:CX+26,y:SW-12,fr:CF,f:0,z:SW+20,click(e,R){e.f=2;e.blink=M.now+.6;M.react(R,e);M.snd('meow');M.emit(R,'heart',e.x+10,e.y,3)},react:'hop',hop:5,upd(e,dt,t){if(e.blink&&M.now>e.blink){e.f=0;e.blink=0}if(!e.blink&&!RM)e.f=(Math.sin(t*.8+e.t0)>.97)?1:0}});
  // birds over the skyline
  const BF=birdFrames();for(let i=0;i<5;i++)E({bird:1,name:'BIRD',x:Math.random()*W,y:30+Math.random()*50,fr:BF,vx:(Math.random()<.5?-1:1)*(8+Math.random()*8),z:-5,
   upd(e,dt,t){if(RM)return;e.x+=e.vx*dt*(e.fast?6:1);e.y+=Math.sin(t*2+e.t0)*dt*3-(e.fast?dt*40:0);e.f=Math.floor(t*(e.fast?12:4)+e.t0)%2;e.flip=e.vx<0;if(e.x<-20||e.x>W+20||e.y<-20){e.x=e.vx>0?-15:W+15;e.y=30+Math.random()*60;e.fast=0}},
   click(e,R){e.fast=1;M.snd('yip',1.6)}});
  // office window lights you can flick, cafe steam
  E({name:'MEGACORP',x:180,y:24,w:114,h:140,box:1,z:-6,draw(g,x,y,t,e,sel){if(e.party>M.now&&!RM){const C=['#ff4a5a','#ffe04a','#4aa8ff','#5ad06a'];for(let fy=28;fy<SW-38;fy+=10)for(let fx=184;fx<292;fx+=9)if(H(fx,fy+Math.floor(M.now*6))>.6){g.fillStyle=C[(fx+fy)%4];g.fillRect(fx+(x-180),fy+(y-24),7,7)}}},click(e,R){e.party=M.now+2.5;M.snd('bass');M.say(R,237,20,'OFFICE PARTY!')}});
  E({name:'BEANS CAFE',x:604,y:170,w:96,h:38,box:1,z:-6,draw(g,x,y,t,e,sel){if(RM)return;g.fillStyle='#e8e8e8';for(let k=0;k<3;k++){const yy=Math.round(y+4-((t*8+k*6)%14));g.fillRect(x+70+k*3+Math.round(Math.sin(t*3+k)),yy,1,2)}},click(e,R){M.snd('chime',1.3);M.emit(R,'smoke',e.x+72,e.y,6);M.say(R,e.x+48,e.y-4,K.pick(['OAT LATTE FOR... PIXEL?','ESPRESSO!']))}});
  E({name:'SUDZ LAUNDROMAT',x:96,y:170,w:80,h:38,box:1,z:-6,draw(g,x,y,t,e,sel){if(RM)return;const sp=e.sp>M.now?20:3;for(const wx of[116,136,156]){const a=t*sp+wx;g.fillStyle='#ffffff';g.fillRect(Math.round(wx+Math.cos(a)*2),Math.round(SW-16+Math.sin(a)*2),2,2)}},click(e,R){e.sp=M.now+2;M.snd('bubble');M.emit(R,'bubble',136,SW-20,10)}});
 },
 sky(R,g,ox,oy,t){g.drawImage(R.sky,ox,oy);if(!R.clouds)R.clouds=[0,1,2,3,4].map(i=>{const rw=26+i%3*8;return M.mk(rw*2+2,14,p=>{for(let j=-6;j<=6;j++)for(let k=-rw;k<=rw;k++){const d=(k/rw)**2+(j/6)**2+(vn((k+i*40)/7,j/3)-.5)*.5;if(d<1){if(d>.8&&bay(k+rw,j+6)>(1-d)*5)continue;const lit=j<-1||(k<0&&j<1);p.px(k+rw,j+6,lit?'#ffffff':(j>2?'#b8c8dc':'#dce6f0'))}}},false)});
  R.clouds.forEach((c,i)=>{const cx=((RM?0:t*(2+i*.6))+i*210)%(W+160)-80,cy=24+i*13+(i%2)*8;g.drawImage(c.c,Math.round(cx-c.w/2+ox),cy-6+oy)})}
});
})();
