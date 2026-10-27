/* Lobby + west/east corridors (one continuous hall), themed doors, the attendant and the wing dialogue. */
(()=>{'use strict';const{Pix,rp,ramp,mix,bay,H,vn,fbm,RM,RH,TAU,clamp}=M;
const W=2240,L0=840,L1=1400,CX=1120,FLOOR=198,DS=78;
const doorX=(wing,i)=>wing==='W'?L0-70-i*DS:L1+22+i*DS;
const wingIds=w=>M.order.filter(id=>M.defs[id].wing===w);
M.backAt=id=>{const d=M.defs[id];if(!d||!d.wing)return undefined;const i=wingIds(d.wing).indexOf(id);return doorX(d.wing,i)+24};
/* ---------- people ---------- */
const SKIN=[['#3a1e18','#6a3a28','#a06440','#c88a5a','#e8b080'],['#2a1410','#4a2418','#7a4028','#a0603a','#c8845a'],['#4a2a24','#8a5040','#c88a6a','#f0b890','#ffd8b8'],['#1e100c','#3a1e14','#5a3020','#7a4630','#9a6040']];
// small visitor: 14x28, frames 0-3 walk, 4 idle, 5 wave
M.person=(o)=>{const sk=SKIN[o.skin%4],hair=ramp(o.hair,4),shirt=ramp(o.shirt,5),pants=ramp(o.pants,4);return M.frames(6,14,28,(p,f)=>{
 const st=f<4?[0,1,0,-1][f]:0,arm=f<4?[1,0,-1,0][f]:0;
 // legs
 p.rect(4,19,3,7+(st>0?-1:0),pants,{v:.45});p.rect(7,19,3,7+(st<0?-1:0),pants,{v:.6});p.rect(3+(st>0?1:0),25+(st>0?-1:0),4,2,['#140c1c','#2a2030','#4a3a48'],{v:.5});p.rect(7-(st<0?-1:0),25+(st<0?-1:0),4,2,['#140c1c','#2a2030','#4a3a48'],{v:.6});
 // body + arms
 p.rrect(3,11,8,9,2,shirt,{v:.55});if(o.dress)p.poly([[2,17],[12,17],[13,22],[1,22]],shirt,{v:.5});
 if(f===5){p.rect(11,4,2,8,shirt,{v:.6});p.rect(11,3,2,2,sk,{v:.7})}else{p.rect(11,12+arm,2,6,shirt,{v:.4});p.px(11,18+arm,sk[3]);p.px(12,18+arm,sk[2])}
 p.rect(1,12-arm,2,6,shirt,{v:.7});p.px(1,18-arm,sk[3]);p.px(2,18-arm,sk[3]);
 // head
 p.ell(7,7,4.6,4.8,sk,{b:.15});p.px(8,7,'#140c1c');p.px(10,7,'#140c1c');p.px(9,9,sk[1]);
 // hair styles
 const hs=o.style%4;if(hs===0){p.ell(6.5,4.2,4.8,2.8,hair,{b:.1});p.rect(2,4,2,4,hair,{v:.4})}else if(hs===1){p.ell(6.5,4,5,3,hair,{b:.1});p.rect(2,4,3,8,hair,{v:.45})}else if(hs===2){p.ell(7,3.6,4.2,2.6,hair,{b:.1});p.rect(3,4,1,2,hair)}else{p.rect(2,2,10,3,['#1a1030','#3a3060','#5a5090','#8a80c0'],{v:.6});p.rect(4,0,7,3,['#1a1030','#3a3060','#5a5090','#8a80c0'],{v:.5})}
})};
// attendant: 26x36 behind the desk. frames: 0 idle,1 breathe,2 blink,3 talk,4 wave a,5 wave b
function attendant(){const sk=SKIN[2],NV=['#120e2a','#1e2350','#2e3a7a','#4a5aa8','#7a8ad0'],GD=['#5a3a10','#9a6a20','#e0a838','#ffe08a'],HR=['#1a0e0a','#3a2418','#5a3a24','#7a5236'];
 return M.frames(6,28,36,(p,f)=>{const by=f===1?1:0;
  // torso + shoulders
  p.rrect(3,19+by,22,17,4,NV,{v:.55});p.poly([[11,19+by],[17,19+by],[14,26+by]],['#c8c0e0','#f4f0ff','#ffffff'],{v:.6});p.rect(13,21+by,2,4,['#6a1018','#b8283a','#e85a5a'],{v:.6});p.px(12,21+by,'#b8283a');p.px(15,21+by,'#b8283a');
  for(const y of[27,31])p.px(10,y+by,GD[3]),p.px(18,y+by,GD[2]);p.rect(20,23+by,3,2,GD,{v:.7});
  // arms
  if(f>=4){const up=f===4;p.rect(23,(up?8:11)+by,3,12,NV,{v:.6});p.ell(24.5,(up?6:9)+by,2.4,2.4,sk,{b:.2});p.rect(3,24+by,3,11,NV,{v:.45})}else{p.rect(1,22+by,3,13,NV,{v:.45});p.rect(24,22+by,3,13,NV,{v:.6})}
  // head
  p.rect(12,16+by,4,4,sk,{v:.4});p.ell(14,11+by,6.4,6.6,sk,{b:.12});
  p.ell(14,7+by,7,4.2,HR,{b:.1});p.rect(7,7+by,2,6,HR,{v:.4});p.rect(19,7+by,2,4,HR,{v:.5});
  // cap
  p.rrect(7,1+by,14,5,2,NV,{v:.6});p.rect(6,5+by,17,2,NV,{v:.35});p.rect(11,2+by,6,2,GD,{v:.6});p.px(14,2+by,'#fff4c0');
  // face
  if(f===2){p.rect(10,11+by,2,1,'#3a1e18');p.rect(16,11+by,2,1,'#3a1e18')}else{p.rect(10,10+by,2,2,'#140c1c');p.rect(16,10+by,2,2,'#140c1c');p.px(10,10+by,'#ffffff');p.px(16,10+by,'#ffffff')}
  p.px(9,13+by,'#f08a80');p.px(19,13+by,'#f08a80');
  if(f===3||f===5){p.rect(13,14+by,3,2,'#6a1a20');p.px(14,15+by,'#e85a6a')}else{p.px(12,14+by,'#8a3a3a');p.rect(13,15+by,3,1,'#8a3a3a');p.px(16,14+by,'#8a3a3a')}
 })}
/* ---------- door art ---------- */
const MAT={wood:['#1a0e10','#3a1e16','#5e3420','#86502c','#ae7040','#d0965a'],stone:['#1c1826','#34303e','#524c5a','#787080','#a098a0','#c8c0c0'],metal:['#141822','#2a3242','#465268','#6a7a92','#98a8bc','#d0dcea'],gold:['#3a2008','#6a4210','#a87020','#e0a838','#ffe08a','#fff8d0']};
function doorArt(d){const D=d.door,st=D.style||'arch',FR=D.frame?ramp(D.frame,6):MAT.stone,LF=D.leaf?ramp(D.leaf,6):MAT.wood,w=48,h=80;
 const inLeaf=(x,y)=>{if(x<7||x>40||y<8||y>78)return false;if(st==='arch'||st==='flip')return y>=26||(x+.5-24)**2+(y+.5-26)**2<=17.2**2;if(st==='gothic'){if(y>=28)return true;const k=(28-y)/20;return Math.abs(x+.5-24)<=17*(1-k)+0}if(st==='slide')return!((y<12&&(x<11-(y-8)||x>36+(y-8))));return true};
 const frameOnly=M.mk(w,h,p=>{
  p.fill(0,0,w,h,(x,y)=>{if(inLeaf(x,y))return false;if(st==='arch'||st==='flip'){if(y<4)return(x+.5-24)**2+(y+.5-26)**2<=23.5**2;return(x>=1&&x<=46)&&((x+.5-24)**2+(y+.5-26)**2<=23.5**2||y>=26)}if(st==='gothic'){const k=Math.max(0,(28-y)/26);return Math.abs(x+.5-24)<=23*(1-k*k*.9)}return x>=1&&x<=46&&y>=2},FR,{v:.55,bv:.3,tex:(x,y)=>D.ftex?D.ftex(x,y):((H(x>>1,y>>1)-.5)*.12)});
  // threshold + keystone gem
  p.rect(2,78,44,2,FR,{v:.75});if(st!=='slide'){p.rect(21,1,6,6,FR,{v:.8});p.ell(24,4,2,2,ramp(D.light,4),{b:.4})}else{for(let x=4;x<44;x+=4)p.rect(x,3,2,2,['#3a3a10','#e0c030','#fff070'],{v:.6});p.rect(4,76,40,2,['#3a3a10','#e0c030'],{tex:(x)=>((x>>1)&1)?-.5:.3})}
  if(D.trim)D.trim(p,inLeaf)});
 const leaf=M.mk(w,h,p=>{const tx=D.tex||'planks';p.fill(0,0,w,h,inLeaf,LF,{v:.5,g:.25,bv:.22,tex:(x,y)=>tx==='planks'?(((x-7)%7===0)?-.25:0)+(H(x,y>>2)-.5)*.12:tx==='metal'?(((y-8)%17===0)?-.3:0)+((x===8||x===39)?.15:0):tx==='candy'?((((x+y)>>2)&1)?.25:-.1):tx==='panel'?0:(H(x>>1,y>>1)-.5)*.15});
  if(tx==='panel'||tx==='planks'){p.rect(11,46,26,14,LF,{v:.4,bv:-.22});p.rect(11,63,26,12,LF,{v:.4,bv:-.22})}
  if(tx==='metal')for(const[a,b]of[[10,11],[37,11],[10,75],[37,75],[10,44],[37,44]])p.px(a,b,LF[5]);
  // emblem medallion
  p.ell(24,30,11,11,D.plate?ramp(D.plate,5):MAT.gold,{b:.15});p.ell(24,30,9,9,ramp(D.bgc||mix(D.leaf||'#5e3420','#000000',.5),5),{b:-.15});
  if(D.emb)D.emb(p,24,30);
  // handle
  if(st!=='slide'){const hy=st==='flip'?24:52;p.ell(36,hy,2.2,2.2,MAT.gold,{b:.25,spec:'#ffffff'})}else{p.rect(22,46,4,16,['#140c1c','#2a3242','#465268'],{v:.3});p.rect(23,48,2,2,ramp(D.light,4),{v:.8})}
  if(D.leafx)D.leafx(p)},false);
 // interior glow behind the leaf
 const inside=M.mk(w,h,p=>{const L=ramp(D.light,6);for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(inLeaf(x,y)){const dd=Math.hypot(x-24,y-40)/34;p.px(x,y,rp(L,1.05-dd,x,y))}},false);
 const flip=s=>{if(st!=='flip')return s;const c=document.createElement('canvas');c.width=s.w;c.height=s.h;const x=c.getContext('2d');x.translate(0,s.h);x.scale(1,-1);x.drawImage(s.c,0,0);return M.fromCanvas(c)};
 const full=M.mk(w,h,p=>{p.blit(frameOnly,0,0);p.blit(leaf,0,0)},'#140c1c');
 return{frame:flip(frameOnly),leaf:flip(leaf),inside:flip(inside),full:flip(full),inLeaf,st}}
// small painting between doors
function painting(seed){const k=seed%4,C=[['#1a2a4a','#3a5a8a','#7aa0c8','#e8c890'],['#2a1a3a','#7a2a4a','#e0704a','#ffd080'],['#0e2a2a','#1e5a4a','#5aa06a','#c8e08a'],['#1a1a2e','#4a2a6a','#a04a9a','#f0a0d0']][k];
 return M.mk(26,20,p=>{p.rect(0,0,26,20,MAT.gold,{v:.6,bv:.3});p.rect(2,2,22,16,C,{v:.4,bv:0,g:0});for(let y=3;y<17;y++)for(let x=3;x<23;x++){let v=(y-3)/14;if(k===0)v=y>11?.2+(H(x,y)*.2):.4+(1-v)*.5;if(k===1)v=1-v+(Math.hypot(x-12,y-14)<4?.6:0);if(k===2)v=y>13-Math.abs(Math.sin(x*.4+seed))*5?.15:.75-v*.4;if(k===3)v=(Math.sin(x*.5+seed)+Math.cos(y*.6))*.25+.5;p.px(x,y,rp(C,v,x,y))}})}
/* ---------- hall background ---------- */
const WALLW=['#0a1a1e','#12292e','#1a3a40','#245058','#3a6e72'],WALLE=['#1e0a14','#2e1220','#46182c','#621f3a','#86304a'],LOBW=['#2a2030','#4a3e48','#7a6a6a','#a89a8e','#d8ccb8','#f4ecdc'];
const WOOD=MAT.wood,GOLD=MAT.gold,MARB=['#1c1626','#3a3040','#6a5e66','#9a8e8e','#c8bcb0','#ece2d2'],MARD=['#100c18','#1e1828','#2e2638','#443a4e'];
function bg(p){
 for(let x=0;x<W;x++){const lob=x>=L0&&x<L1,wr=x<L0?WALLW:WALLE;
  for(let y=0;y<FLOOR;y++){let c;
   if(lob){if(y<16)c=rp(LOBW,.18+(y/16)*.2,x,y);else if(y<22)c=rp(GOLD,.5+(y===16?.3:0),x,y);else{const px2=(x-L0)%70,inP=y>=40&&y<=136&&px2>=8&&px2<=62,edge=inP&&(y===40||y===136||px2===8||px2===62),edge2=inP&&(y===41||y===137||px2===9||px2===63);c=rp(LOBW,.64-y/FLOOR*.2+(edge?-.3:edge2?.22:inP?-.06:0)+(fbm(x/14,y/22)-.5)*.06,x,y);if(y===146||y===147)c=rp(GOLD,y===146?.8:.4,x,y)}if(y>=150&&y<FLOOR-6)c=rp(MARB,.55+(((x-L0)%28<1)?-.3:0)+(fbm(x/9,y/5)-.5)*.3,x,y)}
   else{if(y<26){const beam=(x%39)<5;c=rp(WOOD,beam?.5-(y/26)*.3:.15+(y/26)*.1+((x%39)===5?-.2:0),x,y)}else if(y<30)c=rp(GOLD,y===26?.85:.45,x,y);
    else if(y<146){const mx=x%14,my=(y-30)%18,dm=Math.abs(mx-7)/7+Math.abs(my-9)/9,mot=dm<.45&&dm>.28||(mx===7&&my===9);c=rp(wr,.45+(mot?.28:0)+(y<40?-.15:0)+(fbm(x/50,y/50)-.5)*.1,x,y)}
    else if(y<149)c=rp(WOOD,y===146?.85:.55,x,y);else{const pn=x%26,pv=(pn===0||y===150||y===FLOOR-8)?-.3:(pn===1||y===151)?.2:0;c=rp(WOOD,.38+pv+(H(x>>3,y>>3)-.5)*.06,x,y)}}
   if(y>=FLOOR-6)c=rp(lob?MARB:WOOD,y===FLOOR-6?.8:.3,x,y);p.px(x,y,c)}
  // floors
  for(let y=FLOOR;y<RH;y++){let c;if(lob){const d=y-160,i=Math.floor((x-CX)/(d*.27)),row=Math.floor(Math.log((y-180)/18)/Math.log(1.18)),dark=(i+row)&1,seam=Math.abs(((x-CX)/(d*.27))-Math.round((x-CX)/(d*.27)))*(d*.27)<.5;
    c=seam?'#2a2030':rp(dark?MARD:MARB,(dark?.55:.6)+(fbm(x/14+i,y/4)-.5)*.5-(y<FLOOR+6?.15:0),x,y)}
   else{const bd=Math.floor((y-FLOOR)/(3+(y-FLOOR)/14)),off=(bd*37)%60,seam=((x+off)%60===0);c=seam?WOOD[0]:rp(WOOD,.4+(H(Math.floor((x+off)/60),bd)-.5)*.25+(y-FLOOR)/180,x,y);
    if(y>=226&&y<258){const e=y===226||y===257,g2=y===228||y===255;c=e?'#140c1c':g2?rp(GOLD,.6,x,y):rp(x<L0?['#0e2a2e','#174048','#22585e','#3a7a7a']:['#3a0a14','#5a1420','#7a1e2c','#a0324a'],.45+((((x>>2)+(y>>1))&3)===0?.2:0)+(y-226)/80,x,y)}}
   p.px(x,y,c)}}
 // lobby: arched grand window, banner, desk
 const SKW=['#0b0820','#1a1240','#2e1a58','#4a2462','#7a3466','#b84e60','#e8805a'];
 for(let y=30;y<152;y++)for(let x=CX-66;x<=CX+66;x++){const dx=x+.5-CX,dy=y+.5-96,out=y<96?dx*dx+dy*dy<=66*66:Math.abs(dx)<=66,inn=y<96?dx*dx+dy*dy<=60*60:Math.abs(dx)<=60;if(!out)continue;
  if(!inn){p.px(x,y,rp(GOLD,.45+(dx<0?.25:-.1)+(y<96&&dy*dy+dx*dx>63*63?.2:0),x,y));continue}
  let c=rp(SKW,(y-36)/116+(vn(x/20,y/10)-.5)*.1,x,y);const mh=140-10*vn(x/25,3)-4*vn(x/9,1);if(y>mh)c=rp(['#140c24','#1e1434','#2a1a40'],.3+(y-mh)/30,x,y);
  const md=Math.hypot(x-(CX-30),y-62);if(md<9)c=rp(['#8a7aa0','#d8cce0','#fff4dc','#fffcf2'],.9-md/14+((x-(CX-30))+(y-62))*-.02,x,y);
  const ang=Math.atan2(dy,dx),r=Math.hypot(dx,dy);if(Math.abs(dx)<1||y===96||y===97||(y<96&&Math.abs(r-34)<.6)||(y<96&&Math.abs(((ang/Math.PI*6)%1+1)%1-.5)>.47&&r>34))c='#3a2c34';if(Math.abs(Math.abs(dx)-30)<.6&&y>96)c='#3a2c34';
  p.px(x,y,c)}
 p.rect(CX-68,150,136,3,GOLD,{v:.6});
 // columns + archways at the wing mouths
 for(const ax of[L0,L1]){p.rect(ax-34,0,68,FLOOR,LOBW,{v:.5,bv:.25,tex:(x,y)=>(((y>>3)+((x>>4)&1))&1)?.04:-.04});p.rrect(ax-24,30,48,FLOOR-30+8,24,['#07040c'],{bv:0});
  const lab=ax===L0?'< WEST WING':'EAST WING >',lw=M.tw(lab);p.rrect(ax-lw/2-6,10,lw+12,14,2,WOOD,{v:.5});p.rect(ax-lw/2-4,12,lw+8,10,GOLD,{v:.55,bv:.2});M.ftext(p,lab,Math.round(ax-lw/2),14,'#2a1a0a')}
 for(const cx of[L0+60,L0+150,L1-150,L1-60]){p.cyl(cx-9,40,18,FLOOR-48,MARB,{b:.1,tex:(x,y)=>((x-cx+9)%5===2?-.15:0)+(fbm(x/4,y/12)-.5)*.2});p.rrect(cx-13,30,26,10,2,GOLD,{v:.55});p.rrect(cx-12,FLOOR-10,24,10,2,MARB,{v:.6})}
 // velvet rope stanchions in lobby
 for(const sx of[L0+100,L0+200,L1-200,L1-100]){p.rect(sx-1,FLOOR+6,3,20,GOLD,{v:.6});p.ell(sx+.5,FLOOR+5,2.5,2.5,GOLD,{b:.2});p.rect(sx-3,FLOOR+26,7,2,GOLD)}
 for(const[a,b]of[[L0+100,L0+200],[L1-200,L1-100]])for(let x=a+2;x<b-1;x++){const y=Math.round(FLOOR+9+Math.sin((x-a)/(b-a)*Math.PI)*7);p.px(x,y,'#8a1a2a');p.px(x,y+1,'#c8283a');p.px(x,y+2,'#5a0e1a')}
 // benches in corridors (one per wing) + sconces/paintings between doors
 for(const wg of['W','E'])for(let i=0;i<10;i++){const dx=doorX(wg,i);const sx=wg==='W'?dx-15:dx+63;if(sx>L0-30&&sx<L1+30)continue;p.rect(sx-3,100,7,3,GOLD,{v:.6})}
 // front desk
 p.rect(CX-62,152,124,10,['#1a0e10','#4a2a18','#7a4a24','#a8703a','#d8a060','#f4c890'],{v:.75,bv:.3});
 p.rect(CX-58,162,116,FLOOR+18-162,WOOD,{v:.48,g:.2,tex:(x,y)=>((x-CX+58)%29===0?-.3:0)+((y===168||y===FLOOR+12)?-.25:0)});
 for(let i=0;i<4;i++){const px=CX-54+i*29;p.rect(px+3,172,22,26,WOOD,{v:.38,bv:-.2})}
 p.rect(CX-58,162,116,2,GOLD,{v:.6});const nm='INFORMATION',tw=M.tw(nm);p.rect(CX-tw/2-4,174,tw+8,11,GOLD,{v:.55,bv:.25});M.ftext(p,nm,Math.round(CX-tw/2),176,'#3a2008');
 // big hanging banner over the window
 const NM=M.NAME,nw=M.tw(NM);p.rect(CX-nw/2-8,20,nw+16,4,GOLD,{v:.6});p.poly([[CX-nw/2-6,24],[CX+nw/2+6,24],[CX+nw/2+6,40],[CX,46],[CX-nw/2-6,40]],['#2a0a14','#5a1424','#8a2234','#b8384a','#e05a64'],{v:.5,bv:.25});M.ftext(p,NM,Math.round(CX-nw/2),29,'#ffe08a','#2a0a14')}
/* ---------- the hall scene ---------- */
M.def('hall',{name:'LOBBY',w:W,start:CX,top:'#140c1c',bot:'#1a0e10',backTo:'entrance',backLabel:'EXIT',backIcon:'out',
 bg(p,R){bg(p)},
 init(R){const E=o=>M.ent(R,o);
  // window sky (dynamic) rendered under the static bg? we draw it in back() into the window shape
  // doors
  for(const wg of['W','E'])wingIds(wg).forEach((id,i)=>{const d=M.defs[id],A=doorArt(d),x=doorX(wg,i);let pl=null,plc=null;
   if(d.door.planet){const q=d.door.planet;plc=window.PLANETS.mk(q.w,q.h||q.w)}
   const e=E({room:id,name:d.name,x,y:FLOOR-80,w:48,h:80,box:1,open:0,z:FLOOR-2,
    draw(g,X,Y,t,e,sel){const o=e.open;const lt=M.hx(d.door.light);
     // light pool on the floor
     const pul=RM?1:.75+.25*Math.sin(t*2+i);for(let j=0;j<6;j++)for(let k=-22+j;k<=22-j;k++){if(bay(X+24+k,Y+80+j)<(1-j/6)*.5*pul*(.3+o*.9)){g.fillStyle=d.door.light;g.fillRect(X+24+k,Y+80+j,1,1)}}
     if(sel)g.drawImage(M.ring(A.full),X-1,Y-1);
     if(o<=0){g.drawImage(A.full.c,X,Y);if(plc&&(!RM||!e.pp)){if(!e.pn||M.now>e.pn){window.PLANETS[d.door.planet.paint](plc,RM?7:M.now+i,d.door.planet.arg?d.door.planet.arg(e,sel):undefined);e.pn=M.now+.09;e.pp=1}const q=d.door.planet;g.drawImage(plc.c,X+24-Math.floor(q.w/2),Y+30-Math.floor((q.h||q.w)/2)+(A.st==='flip'?20:0))}}
     else{g.drawImage(A.inside.c,X,Y);if(A.st==='slide'){const sh=Math.round(o*70);g.drawImage(A.leaf.c,0,sh,48,80-sh,X,Y,48,80-sh)}else{const lw=Math.max(2,Math.round(34*(1-o*.92)));const LF=ramp(d.door.leaf||'#5e3420',6);for(let yy=0;yy<80;yy++)for(let xx=0;xx<lw;xx++){const ax=7+xx,ay=yy;if(!A.inLeaf(ax,A.st==='flip'?79-ay:ay))continue;g.fillStyle=rp(LF,.45-o*.25+(xx===0?.2:xx===lw-1?-.2:0),ax,ay);g.fillRect(X+ax,Y+ay,1,1)}}g.drawImage(A.frame.c,X,Y)}},
    click(e,R){if(e.open||M.busy())return;e.opening=1;M.snd(A.st==='slide'?'zap':'creak',A.st==='slide'?.5:1.1);M.snd('open',1+i*.02)},
    upd(e,dt,t,R){if(e.opening){e.open=Math.min(1,e.open+dt*(RM?8:2.2));if(e.open>.35&&!e.sp){e.sp=1;M.emit(R,d.door.fx||'star',e.x+24,e.y+44,16,{rx:20,ry:30})}if(e.open>=1&&!M.busy()){e.opening=0;const[ox,oy]=M.view(R);M.go(id,{from:[e.x+24+ox,e.y+44+oy],style:'iris',dout:.55})}}
     else if(e.closing){e.open=Math.max(0,e.open-dt*2.5);if(e.open<=0){e.closing=0;e.sp=0;M.snd('thud',1.3)}}
     // ambient themed sparkle around visible doors
     if(!RM&&Math.random()<dt*.5){const[ox]=M.view(R);if(e.x+ox>-50&&e.x+ox<M.BW+50)M.emit(R,d.door.fx||'star',e.x+8+Math.random()*32,e.y+20+Math.random()*50,1)}}});
   R.doors=R.doors||{};R.doors[id]=e;
   // painting + sconce on the wall next to the door
   const px=wg==='W'?x-28:x+50;if(px>8&&px<W-30&&!(px>L0-40&&px<L1+10)){const P=painting(i+(wg==='E'?5:0));E({name:null,x:px,y:56,spr:P,react:'shake',click(e,R){M.react(R,e);M.snd('tick',.7);M.emit(R,'dust',e.x+13,e.y+20,5)}});
    E({name:'LAMP',x:px+10,y:104,w:7,h:9,box:1,on:1,click(e,R){e.on^=1;M.snd(e.on?'blip':'thud',1.4);if(e.on)M.emit(R,'star',e.x+3,e.y+3,4)},draw(g,X,Y,t,e,sel){g.fillStyle='#140c1c';g.fillRect(X,Y+4,7,4);g.fillStyle='#a87020';g.fillRect(X+1,Y+5,5,2);g.fillStyle=e.on?'#ffe8a0':'#5a4a3a';g.fillRect(X+2,Y,3,4);if(sel){g.fillStyle='#fff6c4';g.fillRect(X-1,Y,1,8);g.fillRect(X+7,Y,1,8)}
     if(e.on){const fl=RM?1:.85+.15*Math.sin(t*7+e.t0);for(let j=-12;j<=12;j++)for(let k=-12;k<=12;k++){const dd=Math.hypot(k,j);if(dd>3&&dd<12&&bay(X+3+k,Y+2+j)<(1-dd/12)*.42*fl){g.fillStyle='#ffd890';g.fillRect(X+3+k,Y+2+j,1,1)}}}}})}});
  // attendant + desk props
  const AF=attendant();R.att=E({name:'ATTENDANT',x:CX-14,y:121,fr:AF,z:150,f:0,
   upd(e,dt,t){if(e.wave&&M.now<e.wave){e.f=Math.floor(M.now*6)%2?4:5;return}if(R.dlg&&!R.dlg.done){e.f=Math.floor(M.now*10)%2?3:0;return}const k=RM?0:t+e.t0;e.f=(k%4.3<.12)?2:(Math.sin(k*1.6)>.3?1:0)},
   click(e,R){openDlg(R)}});
  const bell=M.mk(12,9,p=>{p.ell(6,6,5,4.5,GOLD,{b:.2,spec:'#ffffff',clip:(x,y)=>y<7});p.rect(0,6,12,3,WOOD,{v:.5});p.px(6,1,GOLD[4])});E({name:'BELL',x:CX+34,y:143,spr:bell,react:'jiggle',snd:'ding',fx:'note',fxn:4,click(e,R){M.react(R,e);R.att.wave=M.now+1;M.say(R,CX,R.att.y-2,'HELLO!')}});
  const book=M.mk(18,8,p=>{p.poly([[1,6],[8,3],[9,7],[1,7]],['#d8d0c0','#f4ecdc','#ffffff'],{v:.6});p.poly([[9,3],[16,6],[16,7],[9,7]],['#c8c0b0','#e8e0d0'],{v:.5});p.line(3,5,7,4,'#9a9080');p.line(11,4,15,6,'#9a9080');p.rect(0,7,18,1,'#7a2a2a')});E({name:'GUESTBOOK',x:CX-46,y:144,spr:book,react:'dip',snd:'swish',fx:'star',fxn:5});
  const globe=M.frames(8,16,24,(p,f)=>{p.rect(7,16,2,5,GOLD,{v:.5});p.rect(3,21,10,3,WOOD,{v:.5});p.ell(8,9,7,7,['#0e2a4a','#1e4a7a','#3a7ab8','#6ab0e0'],{tex:(x,y,dx,dy)=>{const lon=Math.atan2(dx,Math.sqrt(Math.max(0,1-dx*dx-dy*dy)))+f/8*TAU;return vn(lon*2+5,dy*3)>.55?.0:0}});
   p.each((x,y,c)=>{const dx=(x+.5-8)/7,dy=(y+.5-9)/7;if(dx*dx+dy*dy>1)return;const nz=Math.sqrt(1-dx*dx-dy*dy),lon=Math.atan2(dx,nz)+f/8*TAU;if(vn(Math.cos(lon)*2+3,Math.sin(lon)*2+dy*3)>.55){const lit=-.58*dx-.62*dy+.53*nz;return rp(['#1a3a1a','#2a6a2a','#5aa03a','#9ad05a'],.3+lit*.6,x,y)}});p.line(1,9,1,2,GOLD[2]);p.line(15,9,15,15,GOLD[2])});
  E({name:'GLOBE',x:L0+170,y:FLOOR-6,fr:globe,f:0,z:FLOOR+20,spin:0,upd(e,dt){if(e.spin>0){e.spin-=dt;e.ph=(e.ph||0)+dt*14*Math.min(1,e.spin)}e.f=Math.floor(e.ph||0)%8},click(e,R){e.spin=2;M.snd('whoosh',1.4);M.emit(R,'star',e.x+8,e.y+8,6)}});
  // potted ferns
  const fern=M.frames(3,26,34,(p,f)=>{p.rrect(6,22,14,12,2,['#3a1a14','#7a3424','#b85a34','#d8844a'],{v:.55});p.rect(5,21,16,3,['#3a1a14','#7a3424','#b85a34','#d8844a'],{v:.7});
   const LV=['#0e2416','#1a3a20','#2a5a2c','#3e7a38','#62a046','#8ac85a'];for(let k=0;k<9;k++){const a=-Math.PI/2+(k-4)*.36+(f-1)*.06,L=12+(k%3)*3;for(let s=0;s<L;s++){const x=13+Math.cos(a)*s+Math.sin(s*.3)*(k-4)*.3,y=22+Math.sin(a)*s+s*s*.02*Math.abs(k-4);p.px(x,y,rp(LV,.75-s/L*.3,x|0,y|0));if(s>2&&s%2===0){p.px(x+1,y+1,rp(LV,.5,x|0,y|0));p.px(x-1,y+1,rp(LV,.35,x|0,y|0))}}}});
  for(const fx of[L0+40,L1-66,CX-100,CX+76])E({name:'FERN',x:fx,y:FLOOR-24,fr:fern,fps:1.3,react:'shake',snd:'swish',fx:'leaf',fxn:6});
  // chandelier
  const chand=M.frames(4,48,34,(p,f)=>{p.line(24,0,24,8,'#3a2a20');p.ell(24,14,14,5,GOLD,{b:.1});p.rect(8,14,32,3,GOLD,{v:.5});for(let k=0;k<5;k++){const x=10+k*7;p.rect(x,10,2,5,['#e8e0d0','#ffffff']);p.px(x,8+(f+k)%2,'#ffe08a');p.px(x+1,9,'#ff9a3a');for(let j=0;j<4;j++)if((k+j+f)%3!==0)p.px(x+(j%2),18+j*3,['#e8f8ff','#a8e0ff','#ffffff'][(j+f)%3])}p.ell(24,22,4,6,['#a8e0ff','#e8f8ff','#ffffff'],{b:.2})});
  R.ch=E({name:'CHANDELIER',x:CX-24,y:0,fr:chand,fps:4,z:0,react:'jiggle',snd:'chime',fx:'star',fxn:14,rd:.8});
  // visitors strolling
  const PEO=[{skin:0,hair:'#2a1a10',shirt:'#c84a3a',pants:'#2a3a5a',style:1},{skin:2,hair:'#e8c060',shirt:'#3a8a5a',pants:'#3a2a20',style:0},{skin:1,hair:'#1a1010',shirt:'#6a4aa8',pants:'#1a1a2a',style:3},{skin:3,hair:'#4a2a1a',shirt:'#e0a030',pants:'#2a4a6a',style:2,dress:1},{skin:2,hair:'#8a3a1a',shirt:'#3a6ab8',pants:'#4a4a4a',style:0}];
  const LINES=['WOW!','NEAT!','HI!','SO PIXEL!','COOL!','HELLO!'];
  PEO.forEach((o,i)=>{const fr=M.person(o);E({name:'VISITOR',x:CX-300+i*170+(i>2?400:0),y:FLOOR+12+(i%3)*14,fr,vx:(i%2?1:-1)*(10+i*2),pause:0,
   upd(e,dt,t){e.z=e.y+28;if(M.now<e.wv){e.f=5;return}if(RM){e.f=4;return}if(e.pause>0){e.pause-=dt;e.f=4;return}e.x+=e.vx*dt;e.flip=e.vx<0;e.f=Math.floor(t*6+e.t0)%4;if(e.x<30||e.x>W-44){e.vx*=-1;e.x=clamp(e.x,30,W-44)}if(Math.random()<dt*.08)e.pause=1+Math.random()*2.5},
   click(e,R){e.wv=M.now+1.1;M.snd('blip',1.3+i*.1);M.say(R,e.x+7,e.y-2,LINES[(Math.random()*LINES.length)|0]);M.emit(R,'heart',e.x+7,e.y,2)}})});
  // dust motes in the window light
 },
 enter(R,o){if(o.ret&&R.doors&&R.doors[o.ret]){const d=R.doors[o.ret];d.open=1;d.opening=0;d.closing=1;d.sp=0}else if(R.doors)for(const k in R.doors){R.doors[k].open=0;R.doors[k].opening=0;R.doors[k].sp=0}
  if(!o.ret&&!o.at&&!o.pop){M.centerOn(R,CX,true);setTimeout(()=>{if(M.cur()===R&&!R.greeted){R.greeted=1;R.att.wave=M.now+1.2;M.say(R,CX,R.att.y-2,'WELCOME!',1.6)}},700)}},
 sky(){},
 back(R,g,ox,oy,t){if(RM)return;for(let i=0;i<26;i++){const x=CX-56+(i*37)%112,y=40+(i*29)%60;if((x-CX)**2+(y-96)**2>56*56||Math.abs(x-CX)<2)continue;if(Math.sin(t*(1+i%3)+i)>.6){g.fillStyle='#ffffff';g.fillRect(x+ox,y+oy,1,1)}}// god rays from the window
  for(let i=0;i<30;i++){const k=(t*.05+i*.618)%1,x=CX-60+((i*53)%120)+Math.sin(t*.5+i)*4,y=60+k*130;if(bay(x|0,y|0)<.5){g.fillStyle=i%3?'#fff0c8':'#ffffff';g.fillRect(Math.round(x+ox),Math.round(y+oy),1,1)}}},
 upd(R,dt,t){},
 over(R,g,t){if(R.dlg)drawDlg(R,g,t)}});
/* ---------- the wing dialogue ---------- */
function openDlg(R){if(R.dlg)return;R.dlg={t0:M.now,wing:R.lastWing||'W',sel:0,page:0,done:false,typ:0};R.att.wave=0;M.snd('blip',1.1);M.centerOn(R,CX)}
function closeDlg(R){R.dlg=null;R.dlgItems=null;M.snd('blip',.8)}
const GREET='HI! WHICH WING?';
function layout(R){const bw=Math.min(M.BW-6,330),bh=Math.min(M.BH-24,124),bx=Math.floor((M.BW-bw)/2),by=M.BH-bh-3;const cols=bw>=250?2:1,rows=Math.max(3,Math.floor((bh-50)/11)),per=cols*rows;return{bw,bh,bx,by,cols,rows,per}}
function drawDlg(R,g,t){const D=R.dlg,Lx=layout(R),{bw,bh,bx,by,cols,rows,per}=Lx;const items=[];
 g.fillStyle='#07040c';for(let y=0;y<M.BH;y++)for(let x=(y&1);x<M.BW;x+=2)if((x+y)%4===0)g.fillRect(x,y,1,1);
 M.frame(bx,by,bw,bh,{c:['#140c1c','#4a2e18','#d8a24a','#1a1230'],pat:'#221a3a'});
 // portrait
 const A=R.att.fr[Math.floor(M.now*10)%2&&!D.done?3:0];g.fillStyle='#2a2448';g.fillRect(bx+6,by+6,22,22);g.drawImage(A.c,3,1,20,20,bx+7,by+7,20,20);g.fillStyle='#d8a24a';g.fillRect(bx+6,by+28,22,1);
 // typed greeting
 const n=Math.min(GREET.length,Math.floor((M.now-D.t0)*(RM?999:28)));if(n>D.typ){D.typ=n;if(n%2===0)M.snd('type')}if(n>=GREET.length)D.done=true;g.drawImage(M.txt(GREET.slice(0,n)||' ','#fff6dc',null).c,bx+33,by+8);
 // tabs
 const tabs=[['W',bw<200?'WEST':'WEST WING'],['E',bw<200?'EAST':'EAST WING']];let tx=bx+33;for(const[k,lab]of tabs){const T=M.txt(lab,D.wing===k?'#2a1a0a':'#e8d8b0',null),w=T.w+8;const hv=R.dlgHov==='t'+k;g.fillStyle='#140c1c';g.fillRect(tx,by+18,w,12);g.fillStyle=D.wing===k?(hv?'#ffe8a0':'#e0a838'):(hv?'#4a3a6a':'#2e2448');g.fillRect(tx+1,by+19,w-2,10);g.drawImage(T.c,tx+4,by+21);items.push({id:'t'+k,x:tx,y:by+18,w,h:12,act:()=>{D.wing=k;D.page=0;D.sel=0;R.lastWing=k;M.snd('tick')}});tx+=w+3}
 // list
 const ids=wingIds(D.wing),pages=Math.ceil(ids.length/per);D.page=clamp(D.page,0,pages-1);const cw=Math.floor((bw-14)/cols);
 ids.slice(D.page*per,D.page*per+per).forEach((id,j)=>{const c=Math.floor(j/rows),r=j%rows,x=bx+8+c*cw,y=by+35+r*11,idx=D.page*per+j,hv=R.dlgHov==='r'+idx||D.sel===idx;
  if(hv){g.fillStyle='#3a2e5a';g.fillRect(x,y-1,cw-4,10);const b=RM?0:Math.round(Math.sin(t*8));g.fillStyle='#ffe08a';for(let k=0;k<4;k++)g.fillRect(x+2+b,y+1+k,1+(k<2?k:3-k),1)}
  g.drawImage(M.txt(M.defs[id].short||M.defs[id].name,hv?'#ffe08a':'#e8dcc8',null).c,x+8,y+1);items.push({id:'r'+idx,x,y:y-1,w:cw-4,h:10,act:()=>pick(R,id)})});
 // paging + close
 const fy=by+bh-13;if(pages>1){const pl='< '+(D.page+1)+'/'+pages+' >',T=M.txt(pl,'#e8dcc8',null);g.drawImage(T.c,bx+8,fy+2);items.push({id:'pp',x:bx+6,y:fy,w:14,h:11,act:()=>{D.page=(D.page-1+pages)%pages;M.snd('tick')}});items.push({id:'pn',x:bx+T.w-4,y:fy,w:16,h:11,act:()=>{D.page=(D.page+1)%pages;M.snd('tick')}})}
 const cl=bw<200?'BYE':'JUST LOOKING',CT=M.txt(cl,R.dlgHov==='x'?'#ffe08a':'#b8a8c8',null);g.drawImage(CT.c,bx+bw-CT.w-8,fy+2);items.push({id:'x',x:bx+bw-CT.w-10,y:fy,w:CT.w+4,h:11,act:()=>closeDlg(R)});
 R.dlgItems=items}
function pick(R,id){const d=M.defs[id];R.dlg=null;R.dlgItems=null;R.att.wave=M.now+1;M.say(R,CX,R.att.y-2,'THIS WAY!',1);M.snd('chime');const[ox,oy]=M.view(R);M.emit(R,'star',CX,R.att.y+10,10);setTimeout(()=>M.go(id,{from:[CX+ox,R.att.y+16+oy],style:'iris',dout:.6}),550)}
const itemAt=(R,x,y)=>(R.dlgItems||[]).find(u=>x>=u.x&&y>=u.y&&x<u.x+u.w&&y<u.y+u.h);
const hallDef=M.defs.hall;
hallDef.init=(orig=>R=>{orig(R);
 R.dlgClick=(x,y)=>{const u=itemAt(R,x,y);if(u)u.act();else{const{bx,by,bw,bh}=layout(R);if(x<bx||y<by||x>bx+bw||y>by+bh)closeDlg(R)}};
 R.dlgHit=(x,y)=>{const u=itemAt(R,x,y);R.dlgHov=u?u.id:null;if(u&&u.id[0]==='r')R.dlg.sel=+u.id.slice(1);return!!u};
 R.dlgKey=ev=>{const D=R.dlg,ids=wingIds(D.wing);if(ev.key==='Escape'){closeDlg(R);return true}if(ev.key==='ArrowDown'){D.sel=(D.sel+1)%ids.length;D.page=Math.floor(D.sel/layout(R).per);M.snd('tick');return true}if(ev.key==='ArrowUp'){D.sel=(D.sel-1+ids.length)%ids.length;D.page=Math.floor(D.sel/layout(R).per);M.snd('tick');return true}
  if(ev.key==='ArrowLeft'||ev.key==='ArrowRight'||ev.key==='Tab'){D.wing=D.wing==='W'?'E':'W';D.sel=0;D.page=0;M.snd('tick');return true}if(ev.key==='Enter'||ev.key===' '){pick(R,ids[D.sel]);return true}return false}})(hallDef.init);
M.openDlg=()=>{const R=M.cur();if(R&&R.id==='hall')openDlg(R)};
})();
