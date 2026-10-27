/* HALL OF BLADES & ARMOR: plain blades that forge themselves into elemental relics, a colossal rune sword,
   and armor stands whose plates fly in and lock on one by one. */
(()=>{'use strict';const{rp,ramp,mix,bay,H,vn,fbm,RM,RH,TAU,clamp,lerp}=M;const K=M.K,PAL=K.PAL;
const W=1240,FL=168,SX=[150,220,290,360,880,950,1020,1090],AX=[80,450,800],ST=['#0e0806','#1e1410','#34241c','#4e382a','#6e5240','#8e6e54'];
const STEEL=['#1a1c26','#3a3e4e','#626878','#9aa2b0','#d8dee6'],GRIP=['#1e0e08','#3e2010','#6a3a1c','#8a5a30'],IRON=PAL.iron;
/* ---------- the eight blades ---------- */
const EL=[
 {name:'RUSTY LONGSWORD',pn:'EMBERFANG',R:['#3a0a04','#8a1a08','#e04a10','#ff9a2a','#ffe08a'],au:'#ff6a1a',L:56,w:3,sh:'flam',gd:'flame',gem:['#8a3a00','#ffb020','#fff0a0'],grip:['#2a0a04','#5a1a08','#8a2a10','#c04018'],pfx:'ember',sp:'INFERNO SPIRAL'},
 {name:'PLAIN BROADSWORD',pn:'FROSTBITE',R:['#0a1a3a','#1a4a8a','#3aa0e0','#8ae0ff','#f0fcff'],au:'#7ad8ff',L:52,w:3.6,sh:'crys',gd:'spike',gem:['#0a3a6a','#4ac0ff','#e8ffff'],grip:['#0a1a2a','#1a3a5a','#2a5a8a','#4a8ac0'],pfx:'frost',sp:'FROST NOVA'},
 {name:'OLD SHORTSWORD',pn:'STORMCALLER',R:['#14103a','#2a2a8a','#5a7aff','#b0d0ff','#ffffff'],au:'#8a9aff',L:54,w:3,sh:'jag',gd:'bolt',gem:['#2a2a8a','#8ab0ff','#ffffff'],grip:['#10102a','#20204a','#3a3a7a','#5a5aaa'],pfx:'bolt',sp:'CHAIN LIGHTNING'},
 {name:'DULL RAPIER',pn:'BLOODMOON',R:['#24040c','#5a0816','#a8122a','#ff3a4a','#ffb0b8'],au:'#ff2a4a',au2:'#a040e0',L:60,w:2.2,sh:'thin',gd:'thorn',gem:['#3a0a5a','#a040e0','#f0c0ff'],grip:['#140410','#2a0a20','#4a1438','#6a2a5a'],pfx:'voidp',sp:'BLOOD TENDRILS'},
 {name:'BRONZE BLADE',pn:'THORNHEART',R:['#0a2a10','#1a5a1a','#3aa03a','#8ae05a','#e8ffb0'],au:'#7aff5a',L:50,w:3.2,sh:'leaf',gd:'leaf',gem:['#5a0a2a','#ff5a9a','#ffd0e8'],grip:['#1a1408','#3a2a10','#5a4420','#7a6030'],pfx:'leaf',sp:'OVERGROWTH'},
 {name:'STEEL CLAYMORE',pn:'DAWNBRINGER',R:['#4a2a08','#a86a10','#f0b020','#ffe880','#ffffff'],au:'#ffe070',L:58,w:4,sh:'great',gd:'wings',gem:['#a85a00','#ffe050','#ffffff'],grip:['#3a2008','#6a4210','#a87020','#e0a838'],pfx:'holy',sp:'HOLY PILLAR'},
 {name:'IRON SABRE',pn:'TIDEREAVER',R:['#04203a','#0a4a6a','#1a8aa0','#5ad8d0','#d0fff4'],au:'#3ad8d0',L:54,w:3,sh:'curve',gd:'wave',gem:['#0a3a4a','#3af0e0','#e0fffa'],grip:['#041420','#0a2a3a','#1a4a5a','#2a6a7a'],pfx:'bubble',sp:'TIDAL VORTEX'},
 {name:'TWIN-TIP SWORD',pn:'STARFALL',R:['#0a0420','#2a1060','#6a2ab0','#c060f0','#ffd0ff'],au:'#c060f0',L:58,w:3.4,sh:'fork',gd:'moon',gem:['#2a0a5a','#e080ff','#ffffff'],grip:['#0a0418','#1a0a30','#2e1450','#4a2a7a'],pfx:'star',sp:'COSMIC RIFT'}];
const GUARD={flame:[[1,0],[6,-1],[10,-6],[8,-2],[12,-3],[7,2],[1,2]],spike:[[1,-1],[5,-2],[11,-6],[7,0],[12,2],[5,2],[1,1]],bolt:[[1,-1],[6,-2],[5,-5],[11,-6],[8,0],[11,1],[1,2]],
 thorn:[[1,-1],[8,-2],[12,-8],[10,-1],[13,3],[7,1],[1,2]],leaf:[[1,0],[5,-3],[10,-5],[9,0],[4,2],[1,2]],wings:[[1,-1],[4,-5],[9,-9],[14,-10],[12,-6],[15,-5],[11,-2],[13,0],[8,1],[1,2]],
 wave:[[1,0],[6,-1],[9,1],[11,-2],[11,-6],[14,-1],[10,3],[4,3],[1,2]],moon:[[1,-1],[6,-4],[11,-9],[9,-3],[6,1],[1,2]]};
const FW=34,FH=86,SCX=17,GY=70;
function hw(sh,u,w,a){// half width along the blade, a = how far the shape has morphed (0 plain .. 1)
 const tip=u>.84?Math.max(0,(1-u)/.16):1;let m=1,c=0;
 switch(sh){case'flam':m=1+.38*a*Math.sin(u*TAU*3.2);break;case'crys':m=1+a*(.25-.35*u)+(a>.5&&(u*12%1)<.25?.6*a:0);break;case'jag':m=1+a*(((u*9)|0)%2?.45:-.15);break;
  case'thin':m=1-a*.2;break;case'leaf':m=(1-a)+a*(.5+1.25*Math.pow(Math.sin(Math.min(1,u*1.05)*Math.PI),.8));break;case'great':m=1+a*.35;break;case'curve':m=1+a*.35*Math.sin(u*Math.PI*.9);c=a*Math.pow(u,1.7)*7;break;case'fork':m=1+a*.15;break}
 return[w*m*tip,c]}
function swordPix(p,el,k){const a=M.ease.io(clamp(k*1.15,0,1)),L=Math.round(lerp(44,el.L,a)),w=lerp(2.4,el.w,a),front=k*1.3-.1;
 const cxx=SCX+.5;const gk=clamp((k-.12)/.5,0,1);
 // blade
 for(let y=GY-1;y>=GY-L;y--){const u=(GY-1-y)/L,[h,c]=hw(el.sh,u,w,a);if(h<=.2)continue;const cx=cxx+c;for(let x=Math.floor(cx-h);x<=Math.ceil(cx+h)-1;x++){const nx=(x+.5-cx)/h;if(Math.abs(nx)>1.05)continue;if(el.sh==='fork'&&a>.4&&u>.78&&Math.abs(nx)<.35*a)continue;
   const pw=u<front-.06+bay(x,y)*.12;let v=.62-nx*.38;if(Math.abs(x+.5-cx)<.75)v+=.22;if(nx<-.7)v+=.15;if(nx>.75)v-=.18;
   let col=pw?rp(el.R,v,x,y):rp(STEEL,v-.05+(H(x,y)<.12&&k<.01?-.25:0),x,y);
   if(pw&&el.sh==='fork'&&H(x,y*3)>.9)col='#ffffff';
   if(Math.abs(u-front)<.045&&k<1)col=bay(x,y)<.5?'#ffffff':'#fff4b0';
   p.px(x,y,col)}
  if(k>=1&&(GY-y)%8===4&&u<.8)p.px(Math.round(cx-.5),y,el.R[4])}
 // guard: plain bar morphs into the element's guard silhouette
 const G=ramp(el.gem[1],5),GR=k<.3?IRON:G;
 p.rect(SCX-6+Math.round(gk*2),GY,13-Math.round(gk*4),3,IRON,{v:.55,bv:.25});
 if(gk>0){const pts=GUARD[el.gd];for(const sx of[1,-1])p.poly(pts.map(([x,y])=>[SCX+.5+sx*x*gk*1.05,GY+1+y*gk]),el.R,{v:.55,bv:.28})}
 // grip + pommel + gem
 const gp=k>.45?el.grip:GRIP;for(let y=GY+3;y<GY+12;y++)for(let x=SCX-1;x<=SCX+1;x++)p.px(x,y,rp(gp,.55-(x-SCX)*.25+((y-GY)%3===0?-.2:0),x,y));
 if(k>.45)for(let y=GY+4;y<GY+12;y+=3)p.px(SCX,y,PAL.gold[3]);
 p.ell(SCX+.5,GY+13.5,2.6,2.6,k>.6?ramp(el.gem[1],5):IRON,{b:.2,spec:k>.6?'#ffffff':null});
 if(gk>.3)p.ell(SCX+.5,GY+1.5,2.2*gk,2*gk,ramp(el.gem[1],5),{b:.35,spec:'#ffffff'})}
/* ---------- specials ---------- */
const SPEC={
 'INFERNO SPIRAL':(R,e,cx,cy,top)=>{M.snd('roar',1.4);M.snd('whoosh',.6);M.shake(R,.5,2);M.flash(R,'#ff7020',.2);M.fx(R,1.6,(g,ox,oy,k,a)=>{const n=60;for(let i=0;i<n;i++){const q=i/n;if(q>k*1.6)break;const an=q*TAU*4-a*9,r=(4+q*14)*(1-Math.max(0,k-.75)*3),x=cx+ox+Math.cos(an)*r,y=e.y+e.h+oy-q*96;const fr=Math.sin(an);g.fillStyle=fr>.3?'#fff4b0':fr>-.3?'#ff9a2a':'#c02a10';g.fillRect(Math.round(x),Math.round(y),2,2)}K.flame(g,cx+ox,e.y+e.h+oy+2,9*(1-k),Math.round(26*(1-k*.6)),a*1.5)});for(let i=0;i<6;i++)setTimeout(()=>M.emit(R,'ember',cx,top+40,14,{rx:24,ry:50}),i*180)},
 'FROST NOVA':(R,e,cx,cy,top)=>{M.snd('crack',1.2);M.snd('chime',.7);M.flash(R,'#c8f4ff',.18);const fy=FL+4,N=14,shards=[];for(let i=0;i<N;i++)shards.push([Math.cos(i/N*TAU)*34,Math.sin(i/N*TAU)*7,6+H(i,e.x)*8]);
  M.fx(R,1.5,(g,ox,oy,k)=>{M.ringFx(g,cx+ox,fy+oy,6+k*60,k<.3?'#ffffff':'#8ae0ff',1,1-k);const gr=k<.2?k/.2:k>.75?0:1;if(gr<=0)return;for(const[dx,dy,h]of shards){const hh=Math.round(h*gr),bx=Math.round(cx+dx+ox),by=Math.round(fy+dy+oy);for(let j=0;j<hh;j++){const ww=Math.max(0,Math.round((1-j/hh)*2.4));for(let i=-ww;i<=ww;i++){g.fillStyle=i<0?'#ffffff':i===0?'#bff0ff':'#4aa0e0';g.fillRect(bx+i,by-j,1,1)}}}});
  setTimeout(()=>{M.snd('crunch',1.4);for(const[dx,dy]of shards)M.emit(R,'shard',cx+dx,fy+dy-6,4,{c:['#ffffff','#bff0ff','#8ae0ff']})},1100);M.emit(R,'snow',cx,top,30,{rx:90,ry:30})},
 'CHAIN LIGHTNING':(R,e,cx,cy,top)=>{const others=R.swords.filter(o=>o!==e).sort((a,b)=>Math.abs(a.x-e.x)-Math.abs(b.x-e.x)).slice(0,3);for(let i=0;i<5;i++)setTimeout(()=>M.snd('zap',1+Math.random()*.4),i*120);M.flash(R,'#b0d0ff',.25);M.shake(R,.3,1);
  M.fx(R,1,(g,ox,oy,k)=>{if(bay((k*40)|0,3)>.7)return;M.bolt(g,cx+ox+(Math.random()-.5)*20,oy-4,cx+ox,top+oy,['#ffffff','#6a8aff'],9,8);let px=cx,py=top;for(const o of others){const ox2=o.x+o.w/2,oy2=o.y+8;if(k>.25){M.bolt(g,px+ox,py+oy,ox2+ox,oy2+oy,['#ffffff','#8ab0ff'],8,10);M.glow(g,ox2+ox,oy2+oy,8,'#b0d0ff',.6)}px=ox2;py=oy2}});
  for(const o of others)setTimeout(()=>{o.fl0=M.now;M.emit(R,'bolt',o.x+o.w/2,o.y+10,10)},300);M.emit(R,'bolt',cx,top,16)},
 'BLOOD TENDRILS':(R,e,cx,cy,top)=>{M.snd('boo',.6);M.snd('rumble',.9);M.flash(R,'#5a0816',.3);M.fx(R,1.9,(g,ox,oy,k,a)=>{const BWv=M.BW,BHv=M.BH,dk=Math.sin(k*Math.PI)*.55;g.fillStyle='#0a0008';for(let y=0;y<BHv;y+=1)for(let x=(y&1);x<BWv;x+=2){const d=Math.hypot(x-(cx+ox),(y-(cy+oy))*1.3)/150;if(bay(x,y)<dk*d)g.fillRect(x,y,1,1)}
   for(let t2=0;t2<7;t2++){const a0=t2/7*TAU+a*.7;for(let j=0;j<26;j++){const q=j/26;if(q>k*1.7)break;const r=q*70,an=a0+Math.sin(q*6-a*4)*.7+q*1.4,x=Math.round(cx+ox+Math.cos(an)*r),y=Math.round(cy+oy+Math.sin(an)*r*.6),s=Math.max(1,Math.round((1-q)*3));g.fillStyle=j%3===0?'#a040e0':q<.5?'#ff3a4a':'#6a0a1e';g.fillRect(x,y,s,s)}}},{back:false});M.emit(R,'voidp',cx,cy,30,{rx:30,ry:60})},
 'OVERGROWTH':(R,e,cx,cy,top)=>{M.snd('swish',.7);M.snd('chime',1.2);const fy=FL+5;M.fx(R,2.6,(g,ox,oy,k,a)=>{const Lg=Math.min(1,k*1.6)*110,fade=k>.8?(k-.8)/.2:0;for(const dir of[-1,1])for(let i=0;i<Lg;i++){const x=Math.round(cx+ox+dir*i),y=Math.round(fy+oy+Math.sin(i*.18)*3);if(bay(x,y)<fade)continue;g.fillStyle=i%2?'#3aa03a':'#1a5a1a';g.fillRect(x,y,1,2);
    if(i%7===3){g.fillStyle='#8ae05a';g.fillRect(x,y-2,2,1);g.fillRect(x+1,y-3,1,1)}if(i%19===10&&i<Lg-6){const b=Math.min(1,(Lg-i)/20);g.fillStyle='#ff8ac0';const r=Math.round(b*2);g.fillRect(x-r,y-4,r*2+1,1);g.fillRect(x,y-4-r,1,r*2+1);g.fillStyle='#ffe050';g.fillRect(x,y-4,1,1)}}
   // the blade sprouts a canopy of leaves
   for(let i=0;i<16;i++){const an=i/16*TAU+a*.8,r=10+Math.sin(a*3+i)*3;const x=Math.round(cx+ox+Math.cos(an)*r),y=Math.round(top+oy+10+Math.sin(an)*r*.6);g.fillStyle=i%2?'#8ae05a':'#3aa03a';g.fillRect(x,y,2,1)}});
  for(let i=0;i<5;i++)setTimeout(()=>M.emit(R,'petal',cx+(Math.random()-.5)*160,FL-60,6),i*300)},
 'HOLY PILLAR':(R,e,cx,cy,top)=>{M.snd('power',1.3);M.snd('bell',1);M.flash(R,'#ffffff',.3);M.fx(R,1.8,(g,ox,oy,k,a)=>{const wv=4+Math.sin(Math.min(1,k*1.3)*Math.PI)*16,x0=cx+ox,y1=FL+oy+4;for(let y=0;y<y1;y++){const ww=wv*(.8+.2*Math.sin(y*.2-a*10));for(let i=-Math.ceil(ww);i<=Math.ceil(ww);i++){const d=Math.abs(i)/ww;if(d>1)continue;if(d>.45&&bay(x0+i,y+((a*30)|0))>(1-d)*1.4)continue;g.fillStyle=d<.25?'#ffffff':d<.6?'#fff8c0':'#ffe070';g.fillRect(Math.round(x0+i),y,1,1)}}
   M.ringFx(g,x0,y1,wv*2.4,'#ffe070',1,.8)});for(let i=0;i<6;i++)setTimeout(()=>M.emit(R,'holy',cx,FL-80+Math.random()*60,10,{rx:40}),i*200)},
 'TIDAL VORTEX':(R,e,cx,cy,top)=>{M.snd('splash',.8);M.snd('whoosh',.7);M.fx(R,1.9,(g,ox,oy,k,a)=>{for(let i=0;i<70;i++){const q=i/70;if(q>k*1.5)break;const an=q*TAU*5+a*7,r=(22-q*16)*(1-Math.max(0,k-.8)*4),x=Math.round(cx+ox+Math.cos(an)*r),y=Math.round(e.y+e.h+oy-q*90);g.fillStyle=Math.sin(an)>0?'#d0fff4':'#1a8aa0';g.fillRect(x,y,2,1)}
   for(const dir of[-1,1]){const wx=cx+ox+dir*(20+k*70),wy=FL+oy+2;for(let i=0;i<14;i++){const h=Math.round(Math.sin(i/14*Math.PI)*12*(1-k));g.fillStyle=i<3?'#ffffff':'#5ad8d0';g.fillRect(Math.round(wx-dir*i),wy-h,1,h);g.fillStyle='#ffffff';g.fillRect(Math.round(wx-dir*i),wy-h,1,1)}}});
  for(let i=0;i<5;i++)setTimeout(()=>M.emit(R,'water',cx,top+20,12,{rx:20}),i*250)},
 'COSMIC RIFT':(R,e,cx,cy,top)=>{M.snd('hum',.6);M.snd('laser',.5);const hy=top-14,S=[];for(let i=0;i<40;i++)S.push([H(i,e.x)*TAU,30+H(i,9)*60]);const con=[[-34,-20],[-14,-34],[10,-28],[30,-12],[22,10]];
  M.fx(R,2.4,(g,ox,oy,k,a)=>{const X=cx+ox,Y=hy+oy;const rr=k<.75?Math.min(7,k*20):7*(1-(k-.75)/.25);for(const[an0,r0]of S){const q=Math.min(1,k*1.4),r=r0*(1-q),an=an0+q*4;if(r<3)continue;g.fillStyle=r0>60?'#ffffff':'#e0a0ff';g.fillRect(Math.round(X+Math.cos(an)*r),Math.round(Y+Math.sin(an)*r*.5),1,1)}
   M.ringFx(g,X,Y,rr+5,'#e080ff',2);M.ringFx(g,X,Y,rr+8,'#ffffff',1,.5);for(let j=-rr;j<=rr;j++)for(let i=-rr;i<=rr;i++)if(i*i+j*j<=rr*rr){g.fillStyle='#000000';g.fillRect(Math.round(X+i),Math.round(Y+j),1,1)}
   if(k>.7){const c2=(k-.7)/.3;for(let i=0;i<con.length;i++){const[x1,y1]=con[i];M.glow(g,X+x1,Y+y1,3,'#ffffff',.9);if(i<con.length-1&&c2>i/con.length){const[x2,y2]=con[i+1];M.line(g,X+x1,Y+y1,X+x2,Y+y2,'#c060f0')}}}});setTimeout(()=>{M.flash(R,'#e080ff',.2);M.snd('boom',1.4);M.emit(R,'star',cx,hy,24)},1700)}};
/* ---------- armor sets: plates fly in bottom-up and lock on ---------- */
const AW=44,AH=72,ACX=22;
const PARTS=['boots','greaves','tassets','chest','arms','pauldrons','helm'];
function armorPart(p,part,S){const P=S.pal,T=S.trim,C=S.cloth,tex=S.scale?(x,y)=>(((x+((y>>1)&1)*2)%4===0)||((y%3)===0)?-.18:0):S.tex||((x,y)=>(fbm(x/3,y/3)-.5)*.2);
 switch(part){
 case'boots':for(const bx of[13,24]){p.rect(bx,62,7,6,P,{v:.5,bv:.25,tex});p.rect(bx+(bx<20?-2:0),66,9,3,P,{v:.4,bv:.2});p.rect(bx,61,7,2,T,{v:.6})}break;
 case'greaves':for(const bx of[14,24]){p.rect(bx,45,6,16,P,{v:.55,bv:.25,tex});p.ell(bx+3,47,3.6,3,T,{b:.2});if(S.spikes){p.px(bx+(bx<20?-1:6),46,T[3]);p.px(bx+(bx<20?-2:7),45,T[4])}}break;
 case'tassets':p.rect(13,38,18,4,T,{v:.55,bv:.25});p.rect(20,38,4,4,ramp(S.gem,5),{v:.7});p.poly([[13,42],[20,42],[19,49],[13,47]],P,{v:.5,bv:.25,tex});p.poly([[24,42],[31,42],[31,47],[25,49]],P,{v:.45,bv:.25,tex});break;
 case'chest':p.poly([[12,17],[32,17],[31,31],[28,38],[16,38],[13,31]],P,{v:.55,bv:.3,tex});p.rect(21,19,2,17,T,{v:.7});if(S.emb)S.emb(p,22,26);for(const y of[31,34])p.rect(15,y,14,1,P[1]);break;
 case'arms':for(const[ax,fl]of[[7,0],[32,1]]){p.rect(ax,21,5,13,C||P,{v:.45,bv:.2});p.rect(ax-1,31,7,8,P,{v:.55,bv:.25,tex});p.rect(ax-1,31,7,2,T,{v:.6});p.rect(ax,39,5,3,P,{v:.4});if(S.spikes){p.px(fl?ax+6:ax-2,33,T[4]);p.px(fl?ax+7:ax-3,32,T[3])}}break;
 case'pauldrons':for(const[cx,s]of[[10,-1],[34,1]]){p.ell(cx,20,6.5,4.6,P,{b:.15,tex});p.rect(cx-6,22,13,1,T[2]);if(S.spikes)p.poly([[cx-2,17],[cx+s*7,8],[cx+2,17]],T,{v:.6,bv:.2});if(S.wingP)p.poly([[cx,17],[cx+s*9,12],[cx+s*6,18]],T,{v:.7})}break;
 case'helm':{const hs=S.helm;p.ell(22,9.5,6.4,7.2,P,{b:.15,tex});
  if(hs==='hood'){p.poly([[14,14],[22,0],[30,14],[27,9],[17,9]],C,{v:.45});p.rect(18,8,9,5,['#07040c'],{});p.px(19,10,S.eye);p.px(20,10,S.eye);p.px(24,10,S.eye);p.px(25,10,S.eye)}
  else if(hs==='bucket'){p.rect(16,3,13,13,P,{v:.5,bv:.28,tex});p.rect(17,8,11,2,['#07040c'],{});p.rect(22,10,1,5,P[0]);for(let y=11;y<15;y+=2){p.px(19,y,P[0]);p.px(25,y,P[0])}}
  else if(hs==='cap'){p.ell(22,6,7,4.4,C,{b:.1});p.rect(17,9,10,2,'#07040c');p.px(19,9,S.eye);p.px(25,9,S.eye)}
  else{p.rect(17,8,11,2,['#07040c'],{});p.px(19,8,S.eye);p.px(25,8,S.eye);if(hs==='winged')for(const s of[-1,1])p.poly([[22+s*6,8],[22+s*13,0],[22+s*11,6],[22+s*14,4],[22+s*8,12]],T,{v:.7,bv:.2});
   if(hs==='horned')for(const s of[-1,1])p.poly([[22+s*5,4],[22+s*10,-1],[22+s*12,-6],[22+s*9,2],[22+s*6,7]],T,{v:.6,bv:.2});if(hs==='spiked')for(let i=-2;i<=2;i++)p.poly([[22+i*3-1,3],[22+i*3,-4+Math.abs(i)],[22+i*3+1,3]],T,{v:.65})}
  p.rect(16,15,13,2,T,{v:.6})}}}
const ASET=[
 {name:'TRAVELLER LEATHERS',pn:'SHADOW REAPER',col:'#a040e0',plain:{pal:PAL.leather,trim:['#2a1a10','#4a3020','#6a4a30','#8a6a40','#a08050'],cloth:['#1a1410','#2e2418','#463a28'],helm:'cap',eye:'#140c1c',gem:'#6a4a30'},
  pow:{pal:['#07040c','#140a1e','#24143a','#3a2058','#5a3a80'],trim:['#2a0a4a','#5a1a8a','#a040e0','#e090ff','#ffffff'],cloth:['#07040c','#120a1a','#1e1028'],helm:'hood',eye:'#e090ff',gem:'#c060f0',spikes:1,emb:(p,x,y)=>{p.poly([[x,y-4],[x+3,y],[x,y+5],[x-3,y]],['#3a0a5a','#a040e0','#f0c0ff'],{v:.6})}},sp:'PHANTOM STEP'},
 {name:'DENTED IRON PLATE',pn:'RADIANT PALADIN',col:'#ffe070',plain:{pal:PAL.iron,trim:['#2a2a30','#4a4a52','#6a6a74','#8a8a94','#a8a8b0'],cloth:['#2a1e1a','#4a3a30','#6a5444'],helm:'bucket',eye:'#140c1c',gem:'#6a6a74',tex:(x,y)=>(H(x>>1,y>>1)>.9?-.3:0)+(fbm(x/3,y/3)-.5)*.3},
  pow:{pal:['#6a6a7a','#a8acc0','#d8dcea','#f4f6ff','#ffffff'],trim:PAL.gold,cloth:['#2a3a8a','#3a5ac0','#5a8af0'],helm:'winged',eye:'#7ae0ff',gem:'#ffe050',wingP:1,emb:(p,x,y)=>{p.ell(x,y,3.5,3.5,PAL.gold,{b:.3,spec:'#ffffff'});for(let i=0;i<8;i++){const a=i/8*TAU;p.px(x+Math.cos(a)*5,y+Math.sin(a)*5,'#ffe08a')}}},sp:'AEGIS DOME'},
 {name:'BRONZE SCALE MAIL',pn:'DRAGONSCALE WARLORD',col:'#ff5a1a',plain:{pal:['#2a1a08','#5a3a14','#8a6020','#b08a3a','#d0b060'],trim:['#2a1a08','#4a3010','#6a4a1a','#8a6a2a','#a88a3a'],cloth:['#1e1a14','#3a3024','#5a4a38'],helm:'bucket',eye:'#140c1c',gem:'#8a6020',scale:1},
  pow:{pal:['#2a0404','#5a0a08','#a01a10','#e04a1a','#ff9a4a'],trim:PAL.gold,cloth:['#1a0404','#3a0a08','#5a1a10'],helm:'horned',eye:'#ffe050',gem:'#ffb020',scale:1,spikes:1,emb:(p,x,y)=>{p.poly([[x-4,y-3],[x+4,y-3],[x,y+5]],['#5a1a00','#ffb020','#fff0a0'],{v:.6})}},sp:'DRAGON ROAR'}];
function armorSprites(set){const base=M.mk(AW,AH,p=>{p.rect(21,6,3,62,PAL.wood,{v:.45});p.rect(9,18,27,3,PAL.wood,{v:.55});p.ell(22,6,3,3,PAL.wood,{b:.2})});
 const mk=(S,part)=>M.mk(AW,AH,p=>armorPart(p,part,S));const pow=PARTS.map(pt=>mk(set.pow,pt));return{base,plain:PARTS.map(pt=>mk(set.plain,pt)),pow,full:M.mk(AW,AH,p=>pow.forEach(s=>p.blit(s,0,0)),false)}}
function armorEnt(R,set,x){const A=armorSprites(set),n=PARTS.length,dur=3.2,yb=FL-12;
 const from=i=>[[0,26],[-30,10],[30,-4],[0,-40],[-34,-6],[34,-24],[0,-56]][i];
 const e=M.ent(R,{ex:1,x:Math.round(x-AW/2),y:yb-AH,w:AW,h:AH,box:1,z:yb,k:0,st:0,last:0,busy:0,pf:-1,fl:[],
  name:ee=>ee.st>=2?set.pn:set.name,
  draw(g,X,Y,t,e,sel){const k=e.k,lift=e.st===2&&!RM?Math.round(Math.sin(t*2)*1):0;
   if(e.st>=2&&set.pn==='RADIANT PALADIN'){const fl=RM?0:Math.sin(t*2.2)*3;for(const s of[-1,1])for(let i=0;i<30;i++)for(let j=0;j<12+i*.9;j++){const xx=X+ACX+s*(6+i),yy=Y+16-Math.round(i*1.1+fl*(i/30))+j;if(bay(xx,yy)<(1-i/30)*(1-j/(12+i*.9))*1.5+(j%6===0&&i>4?.3:0)){g.fillStyle=j<2?'#ffffff':'#ffe880';g.fillRect(xx,yy,1,1)}}}
   if(e.st>=2&&set.pn==='SHADOW REAPER'){for(let i=0;i<22;i++)for(let j=0;j<6;j++){const xx=X+ACX-6+((i*7+j*3)%13),yy=Y+16+i*2+j-((t*6)|0)%2;if(bay(xx,yy)<.35){g.fillStyle='#120a1a';g.fillRect(xx,yy+Math.round(Math.sin(t*3+i*.4)*1),1,1)}}}
   if(e.st>=1&&k>.98)M.aura(g,A.full,X,Y+lift,set.col,3,t,.6);
   g.drawImage(A.base.c,X,Y);
   for(let i=0;i<n;i++){const u=clamp((k*n-i)/1,0,1);if(u<=0){g.drawImage(A.plain[i].c,X,Y+lift);continue}
    if(u<1){const f=from(i),eu=M.ease.out(u),dx=Math.round(f[0]*(1-eu)),dy=Math.round(f[1]*(1-eu)-Math.sin(u*Math.PI)*8);if(u<.2)g.drawImage(A.plain[i].c,X,Y);g.drawImage(A.pow[i].c,X+dx,Y+dy);if(!RM&&bay(X+dx,Y+dy+((t*30)|0))<.5){g.fillStyle='#ffffff';g.fillRect(X+dx+ACX,Y+dy+[64,52,42,26,34,18,8][i],1,1)}}
    else{g.drawImage(A.pow[i].c,X,Y+lift);const fa=M.now-(e.fl[i]||-9);if(fa<.1)g.drawImage(M.white(A.pow[i]),X,Y+lift)}}
   if(e.st>=2&&set.pn==='SHADOW REAPER')K.flame(g,X+ACX,Y+1+lift,2.5,12,t*1.3,['#ffffff','#e090ff','#a040e0','#4a1a7a']);
   if(e.st>=2&&set.pn==='DRAGONSCALE WARLORD'){const pl=(Math.sin(t*4)+1)/2;g.fillStyle=pl>.5?'#ffe050':'#ff7a1a';for(const[a,b]of[[17,24],[27,30],[16,47],[26,52],[22,34]])g.fillRect(X+a,Y+b+lift,1,2)}
   if(e.st>=2){const ey=[10,8,8][ASET.indexOf(set)];M.glow(g,X+19,Y+ey+lift,3,set.pow.eye,.7);M.glow(g,X+25,Y+ey+lift,3,set.pow.eye,.7)}
   if(sel)M.aura(g,A.base,X,Y,'#fff6c4',1,0)},
  upd(e,dt,t,R){if(e.st===1){e.k=Math.min(1,e.k+dt/dur);const pi=Math.floor(e.k*n-1e-6);if(e.k*n>=e.pf+2){e.pf++;e.fl[e.pf]=M.now;M.snd('clack',.9+e.pf*.06);const yy=[64,52,42,26,34,18,8][e.pf];M.emit(R,'spark',e.x+ACX,e.y+yy,8,{c:['#ffffff',set.col]});M.fx(R,.25,(g,ox,oy,k)=>M.ringFull(g,e.x+ACX+ox,e.y+yy+oy,3+k*12,set.col,1-k))}
    if(e.k>=1){e.st=2;e.last=M.now;M.snd('power',1.1);M.flash(R,'#ffffff',.16);const cx=e.x+ACX,cy=e.y+30;M.fx(R,.6,(g,ox,oy,k)=>M.ringFull(g,cx+ox,cy+oy,4+k*44,k<.4?'#ffffff':set.col,1-k));M.emit(R,set.pow.helm==='hood'?'voidp':set.pow.helm==='winged'?'holy':'ember',cx,cy,24,{rx:30,ry:50});M.say(R,cx,e.y-4,set.pn+'!',1.4)}}
   else if(e.st===3){e.k=Math.max(0,e.k-dt/1.4);if(e.k<=0){e.st=0;e.pf=-1}}
   else if(e.st===2){if(!RM&&Math.random()<dt*6)M.emit(R,set.pow.helm==='hood'?'voidp':set.pow.helm==='winged'?'holy':'ember',e.x+ACX+(Math.random()-.5)*30,e.y+20+Math.random()*40,1);if(M.now-e.last>30&&M.now>e.busy){e.st=3;M.snd('swish',.6)}}},
  click(e,R){if(M.now<e.busy)return;if(e.st===0){e.st=1;e.pf=-1;M.snd('charge',.8);M.say(R,e.x+ACX,e.y-4,'SUIT UP!',1)}else if(e.st===2){e.last=M.now;e.busy=M.now+1.6;ASPEC[set.sp](R,e,A)}}});return e}
const ASPEC={
 'PHANTOM STEP':(R,e,A)=>{M.snd('whoosh',1.2);M.snd('glitch',.8);M.say(R,e.x+ACX,e.y-4,'PHANTOM STEP!');e.vis=1;M.fx(R,1.3,(g,ox,oy,k)=>{for(const s of[-1,1])for(let c=1;c<=3;c++){const d=Math.round(Math.sin(Math.min(1,k*1.5)*Math.PI)*c*16*s),X=e.x+ox+d,Y=e.y+oy;if(bay(c*3,(k*20)|0)>.8)continue;const sp=A.pow[3];g.globalAlpha=.55-c*.12;for(let i=0;i<A.pow.length;i++)g.drawImage(M.white(A.pow[i]),X,Y);g.globalAlpha=1;M.aura(g,sp,X,Y,'#a040e0',2,k*9)}});M.emit(R,'voidp',e.x+ACX,e.y+40,26,{rx:80,ry:30})},
 'AEGIS DOME':(R,e)=>{M.snd('bell',1.2);M.snd('hum',1);M.say(R,e.x+ACX,e.y-4,'AEGIS DOME!');const cx=e.x+ACX,cy=FL;M.fx(R,1.8,(g,ox,oy,k)=>{const r=Math.min(1,k*3)*40,fade=k>.8?(k-.8)/.2:0;for(let y=-r;y<=0;y++)for(let x=-r;x<=r;x++){const d=Math.hypot(x,y*1.1)/r;if(d>1||d<.82)continue;const X=Math.round(cx+ox+x),Y=Math.round(cy+oy+y);if(bay(X,Y)<fade)continue;const hex=((Math.round(x/4)+Math.round(y/4))&1);if(d>.94||hex&&bay(X,Y)<.6){g.fillStyle=d>.95?'#ffffff':'#ffe070';g.fillRect(X,Y,1,1)}}});M.emit(R,'holy',cx,cy-30,26,{rx:60,ry:40})},
 'DRAGON ROAR':(R,e)=>{M.snd('roar',.9);M.shake(R,.8,2);M.say(R,e.x+ACX,e.y-4,'ROOOAR!');const hx=e.x+ACX+6,hy=e.y+12;M.fx(R,1.4,(g,ox,oy,k,a)=>{const L=Math.min(1,k*3)*80*(k>.75?1-(k-.75)*4:1);for(let i=0;i<L;i++){const s=1+i*.12,y0=hy+oy+Math.sin(i*.3-a*20)*s*.3;for(let j=-s;j<=s;j++){const X=Math.round(hx+ox+i),Y=Math.round(y0+j),d=Math.abs(j)/s;if(bay(X,Y+((a*40)|0))>1-d*.6&&d>.5)continue;g.fillStyle=d<.3?'#fff4b0':d<.7?'#ffa020':'#d02a10';g.fillRect(X,Y,1,1)}}});for(let i=0;i<6;i++)setTimeout(()=>M.emit(R,'ember',hx+60,hy,12,{rx:40,ry:20}),i*150)}};
/* ---------- room ---------- */
M.K.ext('swords',{top:'#0e0806',bot:'#0e0806',start:620,
 bg(p,R){// deep colonnade of arches
  for(let y=0;y<FL;y++)for(let x=0;x<W;x++)p.px(x,y,rp(['#07040a','#0e0810','#160e14'],.3+(fbm(x/30,y/20)-.5)*.4+y/FL*.3,x,y));
  for(let i=0;i<16;i++){const ax=i*84+20;K.arch(p,ax,FL-60,70,40,9,['#0e0806','#1a120e','#261a14','#34241c'],{n:9});K.wall(p,ax-44,FL-60,ax-34,FL,['#0e0806','#1a120e','#261a14','#34241c'],{bh:8,bw:10,sd:i});}
  // back wall upper masonry
  K.wall(p,0,0,W,30,ST,{bh:10,bw:20,sd:5,moss:PAL.moss,v:.3});
  // giant central archway
  K.arch(p,620,FL-90,150,74,16,ST,{n:13});for(const px of[536,688])K.pillar(p,px+8,FL-90,FL,18,ST,{cap:6,base:8,vines:2,rune:'#2a5a6a',sd:px});
  for(let y=24;y<FL;y++)for(let x=546;x<694;x++){const dx=x+.5-620,dy=y+.5-(FL-90),inn=y>=FL-90?Math.abs(dx)<=73:dx*dx/75/75+dy*dy/74/74<1;if(!inn||x>=528&&x<546||x>=688&&x<706)continue;p.px(x,y,rp(['#050308','#0a0a18','#10162a','#16243a'],.2+(1-Math.hypot(dx,y-110)/110)*.7,x,y))}
  // big pillars + vines across the room
  for(const px of[60,410,830,1180]){K.pillar(p,px,10,FL,22,ST,{cap:9,base:9,drum:28,vines:3,sd:px,rune:'#3a2a20'})}
  for(let i=0;i<46;i++)K.vine(p,H(i,3)*W,0,10+H(i,8)*60,i);
  // tattered banners
  for(const bx of[240,1010]){p.rect(bx-14,26,28,3,PAL.wood,{v:.6});p.poly([[bx-12,29],[bx+12,29],[bx+12,74],[bx+6,68],[bx,78],[bx-6,70],[bx-12,76]],['#2a0606','#5a0e0e','#8a1a1a','#b83a2a'],{v:.5,bv:.2,tex:(x,y)=>(H(x,y>>2)-.5)*.2});M.EMB.sword(p,bx,48)}
  // floor
  K.floor(p,FL,RH,['#0a0606','#1a120e','#2e221a','#46342a','#5e4a3a'],{tw:24,inlay:(x,y)=>{if(y>FL+2&&y<FL+5&&H(x>>2,y)>.85)return PAL.moss[2];return null}});
  // pedestals
  for(const s of SX)K.ped(p,s,FL,24,18,ST,'#2a5a6a',s);for(const a of AX)K.ped(p,a,FL,36,12,ST,'#3a2a20',a);
  K.ped(p,620,FL,46,10,ST,'#2a6a8a',7)},
 init(R){const S=SX;R.swords=[];
  EL.forEach((el,i)=>{const F=M.frames(14,FW,FH,(p,f,n)=>swordPix(p,el,f/(n-1)));const x=S[i];
   const e=K.morph(R,{name:el.name,pname:el.pn,x,yb:FL-18+2,F,dur:1.5,aura:el.au,aura2:el.au2,ar:3,float:7,snd0:'forge',
    start(e,R){M.snd('clang',1.2);M.emit(R,'spark',x,FL-26,14,{dir:-Math.PI/2,spread:1.6})},
    during(e,R,k){const fy=e.y+GY-k*1.3*el.L;if(!RM&&Math.random()<.6)M.emit(R,'spark',x+(Math.random()-.5)*6,Math.max(e.y+4,fy),1,{c:['#ffffff','#fff4b0',el.au]})},
    done(e,R){M.emit(R,el.pfx,x,e.y+30,22,{rx:16,ry:40});M.say(R,x,e.y-6,el.pn+'!',1.4)},
    under(g,X,Y,t,e){if(e.k>.3){const pu=.25+.12*Math.sin(t*3+i);M.glow(g,X+SCX,Y+GY-26,Math.round(22+e.k*6),el.au,pu*e.k,1.3,i&1)}},
    over(g,X,Y,t,e){if(e.st!==2||RM)return;for(let j=0;j<3;j++){const a=t*2.4+j*TAU/3+i,ox=Math.cos(a)*11,oy=Math.sin(a)*4;g.fillStyle=Math.sin(a)>0?'#ffffff':el.R[3];const px=Math.round(X+SCX+ox),py=Math.round(Y+GY-30+oy+Math.sin(t*1.5+j)*18);g.fillRect(px,py,1,1);if(Math.sin(a)>.5){g.fillRect(px-1,py,3,1);g.fillRect(px,py-1,1,3)}}},
    idle(g,X,Y,t,e){const gl=((t*.7+i*.37)%3);if(gl<.35){const yy=Math.round(Y+GY-4-gl/.35*40);g.fillStyle='#ffffff';g.fillRect(X+SCX-1,yy,1,2)}},
    amb(e,R,dt){if(Math.random()<dt*7)M.emit(R,el.pfx,x+(Math.random()-.5)*10,e.y+10+Math.random()*50,1)},
    special(e,R){const cx=x,top=e.y+GY-el.L-7;M.say(R,cx,top-6,el.sp+'!',1.4);SPEC[el.sp](R,e,cx,e.y+40,top);return 1.6}});
   R.swords.push(e)});
  ASET.forEach((s,i)=>armorEnt(R,s,AX[i]));
  // the colossal rune blade in the archway
  const GW=40,GH=150,gS=k=>M.mk(GW,GH,p=>{const B=k?['#0a1430','#1a3a6a','#3a6aa0','#7ab0d8','#e0f4ff']:['#14141c','#26283a','#3a3e52','#565c70','#7a8094'];const gy=118;
   for(let y=8;y<gy;y++){const u=(gy-y)/110,h=u>.9?6*(1-u)/.1:6+Math.sin(u*9)*.4;for(let x=Math.floor(20-h);x<Math.ceil(20+h);x++){const nx=(x+.5-20)/h;let v=.6-nx*.36;if(Math.abs(x+.5-20)<1)v+=.2;if(nx>.75)v-=.2;p.px(x,y,rp(B,v+(fbm(x/3,y/3)-.5)*(k?.1:.35),x,y))}if(y>14&&y<gy-4){p.px(19,y,B[0]);p.px(20,y,B[1]);p.px(21,y,B[0])}}
   p.poly([[2,gy],[38,gy],[34,gy+6],[24,gy+4],[16,gy+4],[6,gy+6]],k?PAL.gold:['#1a1410','#3a3028','#5a4a3a','#7a6650'],{v:.55,bv:.25});for(const s of[-1,1])p.poly([[20+s*16,gy],[20+s*20,gy-8],[20+s*18,gy+2]],k?PAL.gold:['#1a1410','#3a3028','#5a4a3a'],{v:.6});
   for(let y=gy+6;y<gy+24;y++)for(let x=17;x<23;x++)p.px(x,y,rp(GRIP,.5-(x-20)*.15+((y-gy)%4===0?-.25:0),x,y));p.ell(20,gy+27,4,4,k?ramp('#3aa0ff',5):['#1a1410','#3a3028','#5a4a3a'],{b:.2,spec:k?'#ffffff':null});p.ell(20,gy+2,3,3,k?ramp('#ff6a1a',5):['#2a2a30','#4a4a52'],{b:.3})});
  const G0=gS(0),G1=gS(1),runeY=[];for(let i=0;i<12;i++)runeY.push(108-i*8.4);
  R.giant=M.ent(R,{ex:1,x:620-GW/2,y:FL-10-GH+4,w:GW,h:GH,box:1,z:FL-9,k:0,st:0,burst:-9,
   name:ee=>ee.st?'AWAKENED: THE FIRST FLAME':'DORMANT RUNEBLADE',
   draw(g,X,Y,t,e,sel){const k=e.k,lit=Math.floor(k*14);
    if(k>0){M.glow(g,X+20,Y+70,Math.round(40+k*20),'#3a8aff',.18*k+(M.now-e.burst<1?.2:0),1.2);M.glow(g,X+20,Y+70,26,'#7ad8ff',.25*k)}
    if(e.st&&k>=1)M.aura(g,G1,X,Y,'#7ad8ff',3,t,.7);
    if(sel)g.drawImage(M.ring(G0),X-1,Y-1);g.drawImage((k>=1?G1:G0).c,X,Y);
    for(let i=0;i<12;i++){const on=i<lit;if(!on&&k>0)continue;const ph=on?1:(Math.sin(t*1.2-i*.5)+1)/2*.6;if(ph<.25)continue;g.drawImage(K.gly(i+300,on?(i===lit-1?'#ffffff':'#7af0ff'):'#3a4a6a'),X+18-2,Math.round(Y+runeY[i]-2));if(on)M.glow(g,X+20,Y+runeY[i],4,'#7af0ff',.4)}
    if(k>=1&&!RM){const big=M.now-e.burst<1.6?1.8:1;for(let i=0;i<150;i++){const q=i/150,a=q*TAU*6-t*6,r=(11+Math.sin(q*9+t)*2)*big,x=X+20+Math.cos(a)*r,y=Y+118-q*112*Math.min(1,big);const fr=Math.sin(a);if(fr<-.2&&i%2)continue;g.fillStyle=fr>.4?'#fff4b0':fr>-.2?'#ff9a2a':'#d03a10';g.fillRect(Math.round(x),Math.round(y),fr>.4?2:1,fr>-.2?2:1)}K.flame(g,X+20,Y+12,4,16,t*1.2,['#ffffff','#bff0ff','#3aa0ff','#1a3a8a'])}},
   upd(e,dt,t,R){if(e.st&&e.k<1){e.k=Math.min(1,e.k+dt/2.6);const lit=Math.floor(e.k*14);if(lit!==e.pl&&lit<=12){e.pl=lit;M.snd('chime',.6+lit*.08);M.emit(R,'rune',e.x+20,e.y+runeY[Math.max(0,lit-1)],4,{c:['#7af0ff','#ffffff']})}if(e.k>=1){M.snd('roar',1.1);M.snd('power',.8);M.flash(R,'#bff0ff',.25);M.shake(R,.6,2);M.emit(R,'ember',e.x+20,e.y+80,40,{rx:30,ry:100})}}
    if(e.st&&e.k>=1&&!RM&&Math.random()<dt*10)M.emit(R,Math.random()<.5?'ember':'rune',e.x+20+(Math.random()-.5)*30,e.y+20+Math.random()*100,1,{c:Math.random()<.5?undefined:['#7af0ff','#ffffff']})},
   click(e,R){if(!e.st){e.st=1;M.snd('rumble',.7);M.say(R,e.x+20,e.y-4,'THE RUNES WAKE...',1.6)}else if(e.k>=1){e.burst=M.now;M.snd('boom',1);M.snd('roar',1.3);M.shake(R,.7,3);M.flash(R,'#ff9a2a',.2);M.say(R,e.x+20,e.y-4,'FIRST FLAME!');const cx=e.x+20,cy=FL;M.fx(R,1,(g,ox,oy,k)=>{M.ringFx(g,cx+ox,cy+oy,6+k*130,k<.3?'#ffffff':'#ff9a2a',2,1-k);M.ringFx(g,cx+ox,cy+oy,4+k*90,'#7af0ff',1,1-k)});M.emit(R,'ember',cx,e.y+60,40,{rx:40,ry:120})}}});
  // ambient: braziers, wisps, shields
  for(const bx of[30,520,720,1210])K.brazier(R,bx,FL-34,['#e8fff8','#7af0ff','#2a8ab0','#0a3a5a'],{name:'SPIRIT BRAZIER',pole:34});
  K.motes(R,70,0,W,20,FL,['#7af0ff','#bff8ff','#5ae0a0']);
  const shield=(c)=>M.mk(18,22,p=>{p.poly([[0,0],[17,0],[17,9],[9,21],[0,9]],ramp(c,5),{v:.5,bv:.3});p.rect(8,1,2,18,PAL.gold,{v:.6});p.rect(1,6,16,2,PAL.gold,{v:.6})});
  [['#2a4ab8',320],['#b83a2a',560],['#3a8a3a',690],['#6a2a8a',935]].forEach(([c,sx],i)=>{const s=shield(c);M.ent(R,{name:'WAR-TORN SHIELD',x:sx,y:44,spr:s,z:-2,noNav:1,react:'shake',click(e,R){M.react(R,e);M.snd('clang',.8+i*.1);M.emit(R,'spark',e.x+9,e.y+10,8)}})})},
 upd(R,dt,t){}});
})();
