/* The ancient temple interior: lobby + west/east colonnades, sealed rune portals, the keeper and the wing dialogue. */
(()=>{'use strict';const{Pix,rp,ramp,mix,bay,H,vn,fbm,RM,RH,TAU,clamp,lerp}=M;const K=M.K,PAL=K.PAL;
const DS=72,NW=7,L0=620,L1=1100,CX=860,W=1720,FLOOR=152;
const doorX=(wing,i)=>wing==='W'?L0-66-i*DS:L1+18+i*DS;
const wingIds=w=>M.order.filter(id=>M.defs[id].wing===w);
M.backAt=id=>{const d=M.defs[id];if(!d||!d.wing)return undefined;const i=wingIds(d.wing).indexOf(id);return doorX(d.wing,i)+24};
/* ---------- people ---------- */
const SKIN=[['#3a1e18','#6a3a28','#a06440','#c88a5a','#e8b080'],['#2a1410','#4a2418','#7a4028','#a0603a','#c8845a'],['#4a2a24','#8a5040','#c88a6a','#f0b890','#ffd8b8'],['#1e100c','#3a1e14','#5a3020','#7a4630','#9a6040']];
M.person=(o)=>{const sk=SKIN[o.skin%4],hair=ramp(o.hair,4),shirt=ramp(o.shirt,5),pants=ramp(o.pants,4);return M.frames(6,14,28,(p,f)=>{
 const st=f<4?[0,1,0,-1][f]:0,arm=f<4?[1,0,-1,0][f]:0;
 p.rect(4,19,3,7+(st>0?-1:0),pants,{v:.45});p.rect(7,19,3,7+(st<0?-1:0),pants,{v:.6});p.rect(3+(st>0?1:0),25+(st>0?-1:0),4,2,['#140c1c','#2a2030','#4a3a48'],{v:.5});p.rect(7-(st<0?-1:0),25+(st<0?-1:0),4,2,['#140c1c','#2a2030','#4a3a48'],{v:.6});
 p.rrect(3,11,8,9,2,shirt,{v:.55});if(o.dress)p.poly([[2,17],[12,17],[13,22],[1,22]],shirt,{v:.5});
 if(f===5){p.rect(11,4,2,8,shirt,{v:.6});p.rect(11,3,2,2,sk,{v:.7})}else{p.rect(11,12+arm,2,6,shirt,{v:.4});p.px(11,18+arm,sk[3]);p.px(12,18+arm,sk[2])}
 p.rect(1,12-arm,2,6,shirt,{v:.7});p.px(1,18-arm,sk[3]);p.px(2,18-arm,sk[3]);
 p.ell(7,7,4.6,4.8,sk,{b:.15});p.px(8,7,'#140c1c');p.px(10,7,'#140c1c');p.px(9,9,sk[1]);
 const hs=(o.style||0)%4;if(hs===0){p.ell(6.5,4.2,4.8,2.8,hair,{b:.1});p.rect(2,4,2,4,hair,{v:.4})}else if(hs===1){p.ell(6.5,4,5,3,hair,{b:.1});p.rect(2,4,3,8,hair,{v:.45})}else if(hs===2){p.ell(7,3.6,4.2,2.6,hair,{b:.1});p.rect(3,4,1,2,hair)}else{p.rect(2,2,10,3,['#1a1030','#3a3060','#5a5090','#8a80c0'],{v:.6});p.rect(4,0,7,3,['#1a1030','#3a3060','#5a5090','#8a80c0'],{v:.5})}})};
/* the temple keeper: hooded, glowing amulet. frames 0 idle,1 breathe,2 blink,3 talk,4/5 wave */
function keeper(){const sk=SKIN[2],RB=['#140a26','#24143e','#3a2260','#58368a','#8058b8'],GD=PAL.gold;
 return M.frames(6,30,40,(p,f)=>{const by=f===1?1:0;
  p.poly([[4,40],[7,18+by],[23,18+by],[26,40]],RB,{v:.5,bv:.22,tex:(x,y)=>(x===15?-.15:0)});p.rect(4,38,22,2,GD,{v:.5});
  for(let y=22;y<38;y+=4)p.px(15,y+by,GD[3]);
  if(f>=4){const up=f===4;p.rect(24,(up?8:12)+by,4,13,RB,{v:.62});p.ell(26,(up?7:10)+by,2.4,2.4,sk,{b:.2});p.rect(3,24+by,4,13,RB,{v:.4})}else{p.rect(2,22+by,4,15,RB,{v:.4});p.rect(24,22+by,4,15,RB,{v:.6});p.ell(15,33,4,2.5,sk,{b:.1})}
  // hood + face
  p.ell(15,12+by,9,10,RB,{b:.05});p.ell(15,13+by,6,6.6,sk,{b:.12});p.poly([[6,12+by],[15,1+by],[24,12+by],[21,8+by],[9,8+by]],RB,{v:.62});
  p.rect(10,17+by,10,3,['#d8d0c8','#f0ece4','#ffffff'],{v:.55});p.px(15,20+by,'#d8d0c8');
  if(f===2){p.rect(11,13+by,2,1,'#3a1e18');p.rect(17,13+by,2,1,'#3a1e18')}else{p.rect(11,12+by,2,2,'#140c1c');p.rect(17,12+by,2,2,'#140c1c');p.px(11,12+by,'#ffffff');p.px(17,12+by,'#ffffff')}
  if(f===3||f===5)p.rect(14,17+by,3,1,'#6a1a20');
  p.ell(15,23+by,2.6,2.6,['#0a3a3a','#1a8a8a','#5af0e0','#e0fff8'],{b:.3});p.rect(9,21+by,12,1,GD[2])})}
/* ---------- sealed rune portal (door) ---------- */
function doorArt(d){const D=d.door,FR=ramp(D.frame||'#5a5068',5),LF=ramp(D.leaf||'#4a4458',5),LT=ramp(D.light,5),w=48,h=80;
 const inLeaf=(x,y)=>x>=7&&x<=40&&y<=77&&(y>=27||(x+.5-24)**2+(y+.5-27)**2<=17.2**2);
 const frame=M.mk(w,h,p=>{p.fill(0,0,w,h,(x,y)=>!inLeaf(x,y)&&x>=0&&x<w&&(y>=24?true:(x+.5-24)**2+(y+.5-25)**2<=24.5**2),FR,{v:.5,bv:.28,tex:(x,y)=>(fbm(x/4,y/4)-.5)*.35+((y>26&&(y-26)%10===0)?-.25:0)});
  // voussoir seams
  for(let a=0;a<=10;a++){const an=Math.PI*a/10;p.line(24+Math.cos(an)*18,25-Math.sin(an)*18,24+Math.cos(an)*24,25-Math.sin(an)*24,FR[0])}
  p.rect(20,0,8,8,FR,{v:.75,bv:.25});p.ell(24,4,2.4,2.4,LT,{b:.4,spec:'#ffffff'});
  p.rect(0,77,48,3,FR,{v:.65,bv:.2});
  for(let k=0;k<5;k++){K.glyph(p,1,32+k*9,(D.sd||3)+k,FR[1]);K.glyph(p,42,32+k*9,(D.sd||3)+k+9,FR[1])}});
 const leaf=side=>M.mk(w,h,p=>{p.fill(0,0,w,h,(x,y)=>inLeaf(x,y)&&(side?x>=24:x<24),LF,{v:.45,g:.2,bv:.25,tex:(x,y)=>(fbm(x/5+(D.sd||0),y/5)-.5)*.3+(((y-30)%16===0)?-.2:0)});
  // carved seal halves + emblem
  p.ell(24,44,12,12,ramp(D.plate||'#a08a6a',5),{b:.1,clip:(x)=>side?x>=24:x<24});p.ell(24,44,10,10,ramp(D.bgc||'#140c1c',5),{b:-.2,clip:(x)=>side?x>=24:x<24});
  if(D.emb){const q=new Pix(w,h);D.emb(q,24,44);for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(q.has(x,y)&&(side?x>=24:x<24))p.px(x,y,q.get(x,y))}
  for(let y=12;y<77;y++)p.px(side?24:23,y,LF[0])},false);
 const L=leaf(0),Rr=leaf(1);
 const full=M.mk(w,h,p=>{p.blit(frame,0,0);p.blit(L,0,0);p.blit(Rr,0,0)},'#140c1c');
 // polar lookup for the live portal swirl
 const pts=[];for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(inLeaf(x,y)){const dx=x+.5-24,dy=y+.5-46;pts.push(x,y,Math.atan2(dy,dx),Math.hypot(dx,dy*.8))}
 return{frame,L,Rr,full,inLeaf,pts,LT}}
function portal(g,X,Y,A,t,D){const P=A.pts,L=A.LT;for(let i=0;i<P.length;i+=4){const r=P[i+3],v=Math.sin(P[i+2]*3+r*.35-t*5)*.5+.5,k=clamp(1.15-r/30+(v-.5)*.5,0,1);const c=r<4?'#ffffff':rp(L,k,P[i],P[i+1]+((t*8)|0));g.fillStyle=k<.12?'#07040c':c;g.fillRect(X+P[i],Y+P[i+1],1,1)}}
/* ---------- hall background ---------- */
const WW=PAL.jade,WE=['#120a1e','#221434','#36204c','#4e3068','#6e4a8a'],LB=['#1e1418','#3e2c2a','#6a5040','#9a7c5a','#ccb084'];
function bg(p){
 const wallPal=x=>x<L0?WW:x>=L1?WE:LB;
 // ceiling: rough cave rock
 for(let y=0;y<20;y++)for(let x=0;x<W;x++){const n=fbm(x/12,y/6);p.px(x,y,rp(PAL.basalt,.2+n*.5+(y>16?.2:0),x,y))}
 // walls
 K.wall(p,0,20,L0,FLOOR,WW,{bh:11,bw:22,sd:4,moss:PAL.moss,v:.38});K.wall(p,L1,20,W,FLOOR,WE,{bh:11,bw:22,sd:9,v:.38});K.wall(p,L0,20,L1,FLOOR,LB,{bh:13,bw:30,sd:2,v:.42});
 // jagged ceiling edge + hanging roots
 for(let x=0;x<W;x++){const d=Math.round(20+vn(x/7,1)*6+(H(x>>2,3)>.8?4:0));for(let y=18;y<d;y++)p.px(x,y,rp(PAL.basalt,.25+(y===d-1?.25:0),x,y))}
 for(let i=0;i<70;i++){const x=Math.floor(H(i,77)*W);K.vine(p,x,22,8+H(i,5)*34,i)}
 // frieze band
 for(let x=0;x<W;x++)for(let y=34;y<46;y++){const P=wallPal(x);let v=.3+(y===34||y===45?.25:0)+(y===35?-.2:0);p.px(x,y,rp(P,v,x,y))}
 for(let x=4;x<W;x+=9)K.glyph(p,x,37,(x/9)|0,wallPal(x)[1]);
 // skirting + floor
 for(let x=0;x<W;x++)for(let y=FLOOR-5;y<FLOOR;y++)p.px(x,y,rp(wallPal(x),y===FLOOR-5?.75:.32,x,y));
 K.floor(p,FLOOR,RH,['#0c0a10','#1e1a22','#342c30','#4e4440','#6e6050'],{tw:26});for(let x=14;x<W-10;x+=26){const c=x<L0?'#2ad0b0':x>=L1?'#c060f0':'#e0a838';p.rect(x-1,173,9,9,'#140c1c');p.rect(x,174,7,7,'#221a26');K.glyph(p,x+1,175,x*7+3,c)}
 // pillars between doors
 for(const wg of['W','E'])for(let i=0;i<=NW;i++){const dx=wg==='W'?doorX('W',i)+60:doorX('E',i)-12;if(wg==='W'&&i===0||wg==='E'&&i===0)continue;K.pillar(p,dx,20,FLOOR,14,wg==='W'?WW:WE,{cap:7,base:7,vines:wg==='W'?2:0,rune:wg==='W'?'#1e6e5e':'#5a2e7a',sd:i})}
 // lobby: colossal pillars at the wing mouths + carved lintel
 for(const ax of[L0,L1]){K.pillar(p,ax-14,20,FLOOR,26,LB,{cap:10,base:10,drum:30,vines:3,sd:ax});K.pillar(p,ax+14,20,FLOOR,26,LB,{cap:10,base:10,drum:30,sd:ax+3});
  const lab=ax===L0?'< WEST WING':'EAST WING >',lw=M.tw(lab);p.rect(ax-lw/2-7,52,lw+14,15,PAL.bone,{v:.5,bv:.25});p.rect(ax-lw/2-5,54,lw+10,11,LB,{v:.3,bv:-.2});M.ftext(p,lab,Math.round(ax-lw/2),56,ax===L0?'#5af0d0':'#e090ff','#140c1c')}
 // giant rune-circle recess behind the keeper
 for(let y=24;y<FLOOR;y++)for(let x=CX-74;x<=CX+74;x++){const dx=x+.5-CX,dy=y+.5-82,r=Math.hypot(dx,dy);if(r>70)continue;let v=.12+(r>64?.35:0)+(r>66?.2:0)+(fbm(x/6,y/6)-.5)*.2;p.px(x,y,rp(['#07040c','#120a1e','#1e1430','#3a2a40','#6a5040','#9a7c5a'],v,x,y))}
 // altar desk
 p.rect(CX-58,FLOOR-34,116,6,PAL.bone,{v:.66,bv:.3});p.rect(CX-52,FLOOR-28,104,30,LB,{v:.42,bv:.2,tex:(x,y)=>(fbm(x/4,y/4)-.5)*.3});
 for(let k=0;k<8;k++)K.glyph(p,CX-46+k*12,FLOOR-18,k+40,'#5a3a20');
 // carved title lintel
 const NM=M.NAME,nw=M.tw(NM);p.rect(CX-nw/2-10,6,nw+20,17,PAL.bone,{v:.55,bv:.3,tex:(x,y)=>(fbm(x/3,y/3)-.5)*.3});p.rect(CX-nw/2-7,9,nw+14,11,LB,{v:.25,bv:-.2});
 // shattered skylight over lobby (stars)
 for(let y=0;y<6;y++)for(let x=CX-120;x<CX+120;x++)if(y<3+vn(x/9,2)*4&&Math.abs(x-CX)>nw/2+12)p.px(x,y,H(x,y)>.96?'#ffffff':rp(['#07051a','#0d0a26','#151034'],y/6,x,y));
}
/* ---------- the hall scene ---------- */
M.def('hall',{name:'TEMPLE ATRIUM',w:W,start:CX,top:'#0a0810',bot:'#0c0a10',backTo:'entrance',backLabel:'EXIT',backIcon:'out',
 bg(p,R){bg(p)},
 init(R){const E=o=>M.ent(R,o);
  for(const wg of['W','E'])wingIds(wg).forEach((id,i)=>{const d=M.defs[id],A=doorArt(d),x=doorX(wg,i);let plc=null;
   if(d.door.planet){const q=d.door.planet;plc=window.PLANETS.mk(q.w,q.h||q.w)}
   const e=E({room:id,name:d.name,x,y:FLOOR-80,w:48,h:80,box:1,open:0,z:FLOOR-2,
    draw(g,X,Y,t,e,sel){const o=e.open,pul=RM?1:.7+.3*Math.sin(t*2+i);
     M.glow(g,X+24,Y+78,26,d.door.light,.22*pul+o*.3,1.6);
     if(o>0)portal(g,X,Y,A,RM?0:t,d);
     if(sel)g.drawImage(M.ring(A.full),X-1,Y-1);
     if(o<=0){g.drawImage(A.full.c,X,Y);if(plc){if(!e.pn||M.now>e.pn){window.PLANETS[d.door.planet.paint](plc,RM?7:M.now+i,d.door.planet.arg?d.door.planet.arg(e,sel):undefined);e.pn=M.now+.09}const q=d.door.planet;g.drawImage(plc.c,X+24-Math.floor(q.w/2),Y+44-Math.floor((q.h||q.w)/2))}}
     else{const sh=Math.round(M.ease.io(o)*17);g.drawImage(A.frame.c,X,Y);g.save();g.beginPath();g.rect(X+7,Y,34,80);g.clip();g.drawImage(A.L.c,X-sh,Y);g.drawImage(A.Rr.c,X+sh,Y);g.restore();g.drawImage(A.frame.c,X,Y)}
     // runes on the frame breathe in the door's light
     for(let k=0;k<5;k++){const ph=(Math.sin(t*2.4-k*.8+i)+1)/2;if(ph>.45||sel||o>0){const c=ph>.8||o>0?'#ffffff':d.door.light;g.drawImage(K.gly((d.door.sd||3)+k,c),X+1,Y+32+k*9);g.drawImage(K.gly((d.door.sd||3)+k+9,c),X+42,Y+32+k*9)}}
     const gk=(Math.sin(t*3+i)+1)/2;if(gk>.6)M.glow(g,X+24,Y+4,4,'#ffffff',.5)},
    click(e,R){if(e.open||M.busy())return;e.opening=1;M.snd('rumble',1.4);M.snd('open',1+i*.02)},
    upd(e,dt,t,R){if(e.opening){e.open=Math.min(1,e.open+dt*(RM?8:1.8));if(e.open>.35&&!e.sp){e.sp=1;M.emit(R,d.door.fx||'star',e.x+24,e.y+44,18,{rx:20,ry:30});M.emit(R,'rune',e.x+24,e.y+40,8,{c:[d.door.light,'#ffffff']})}if(e.open>=1&&!M.busy()){e.opening=0;const[ox,oy]=M.view(R);M.go(id,M.trFor(id,[e.x+24+ox,e.y+44+oy]))}}
     else if(e.closing){e.open=Math.max(0,e.open-dt*2.2);if(e.open<=0){e.closing=0;e.sp=0;M.snd('thud',1.1)}}
     if(!RM&&Math.random()<dt*.6){const[ox]=M.view(R);if(e.x+ox>-50&&e.x+ox<M.BW+50)M.emit(R,'rune',e.x+4+Math.random()*40,e.y+30+Math.random()*44,1,{c:[d.door.light,'#ffffff']})}}});
   R.doors=R.doors||{};R.doors[id]=e;
   // brazier beside each door
   const bx=wg==='W'?x-12:x+60;if(i<NW-1||wg==='E')K.brazier(R,bx,FLOOR+2,wg==='W'?['#e8fff4','#5af0d0','#1ab090','#0a5a4a']:['#fff0ff','#e090ff','#a040e0','#4a1a7a'],{name:'SPIRIT FLAME'})});
  // keeper + altar things
  const AF=keeper();R.att=E({name:'TEMPLE KEEPER',x:CX-15,y:FLOOR-34-38,fr:AF,z:FLOOR-30,f:0,
   upd(e,dt,t){if(e.wave&&M.now<e.wave){e.f=Math.floor(M.now*6)%2?4:5;return}if(R.dlg&&!R.dlg.done){e.f=Math.floor(M.now*10)%2?3:0;return}const k=RM?0:t+e.t0;e.f=(k%4.3<.12)?2:(Math.sin(k*1.6)>.3?1:0)},
   click(e,R){openDlg(R)}});
  // great rune circle on the wall: click -> rings spin up + flare
  R.circ=E({name:'RUNE OF PASSAGE',x:CX-62,y:22,w:124,h:20,box:1,z:-5,spin:0,draw(g,X,Y,t,e,sel){const cx=X+62,cy=Y+60,sp=RM?0:t*(.3+e.spin*3);
    for(const[r,n,dir,c]of[[58,22,1,'#e0a838'],[46,16,-1,'#5af0d0'],[34,11,1,'#e090ff']]){for(let k=0;k<n;k++){const a=k/n*TAU+sp*dir*(60/r);const x=Math.round(cx+Math.cos(a)*r)-2,y=Math.round(cy+Math.sin(a)*r)-2;const on=(Math.sin(t*2+k*.7)+1)/2>.4||e.spin>.1||sel;if(on)g.drawImage(K.gly(k+r,e.spin>.3?'#ffffff':c),x,y)}M.ringFull(g,cx,cy,r+5,c,.35+e.spin*.5)}
    M.glow(g,cx,cy,22+e.spin*14,'#fff0c0',.25+e.spin*.4)},
   upd(e,dt){e.spin=Math.max(0,e.spin-dt*.35)},click(e,R){e.spin=1.4;M.snd('gong',1);M.flash(R,'#fff0c0',.2);M.emit(R,'rune',CX,82,20,{c:['#e0a838','#5af0d0','#e090ff'],v:2.5});R.att.wave=M.now+1.2;M.say(R,CX,R.att.y-2,'THE TEMPLE STIRS!',1.4)}});
  // crystal orb on the altar
  E({name:'SEEING ORB',x:CX+28,y:FLOOR-34-14,w:14,h:14,box:1,z:FLOOR-20,v:0,draw(g,X,Y,t,e,sel){const k=M.now-e.v<2.5;M.glow(g,X+7,Y+6,k?16:9,k?'#ff7ab8':'#7ae0ff',.4);for(let j=0;j<12;j++)for(let i=0;i<12;i++){const dx=i-5.5,dy=j-5.5;if(dx*dx+dy*dy>36)continue;const sw=Math.sin(Math.atan2(dy,dx)*2+Math.hypot(dx,dy)*.6-t*(k?8:2));g.fillStyle=sw>.3?(k?'#ffb0e0':'#bff8ff'):sw>-.3?(k?'#c040a0':'#3aa0e0'):'#1a2a5a';g.fillRect(X+1+i,Y+j,1,1)}g.fillStyle='#ffffff';g.fillRect(X+4,Y+2,2,1);g.fillStyle='#6a5040';g.fillRect(X+2,Y+12,10,2);if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-2,14,1)}},
   click(e,R){e.v=M.now;M.snd('spell',.8);M.say(R,e.x+7,e.y-2,K.pick(['I SEE... SWORDS!','A DRAGON NAPS EAST','THE VOID STARES BACK','YOU WILL CLICK MORE','MECHS! SO MANY MECHS']),2);M.emit(R,'star',e.x+7,e.y+6,10)}});
  // ritual gong
  const gong=M.mk(20,26,p=>{p.rect(1,0,18,3,PAL.wood,{v:.6});p.rect(1,0,2,26,PAL.wood,{v:.5});p.rect(17,0,2,26,PAL.wood,{v:.5});p.ell(10,13,7,7,PAL.gold,{b:.15,spec:'#ffffff'});p.ell(10,13,3,3,PAL.gold,{b:-.1})});
  E({name:'TEMPLE GONG',x:CX-52,y:FLOOR-34-26,spr:gong,z:FLOOR-30,react:'shake',rd:.8,click(e,R){M.react(R,e);M.snd('gong',1.3);M.shake(R,.4,1);R.att.wave=M.now+1;M.say(R,CX,R.att.y-2,'HELLO, TRAVELLER!');const cx=e.x+10,cy=e.y+13;M.fx(R,.9,(g,ox,oy,k)=>{M.ringFull(g,cx+ox,cy+oy,5+k*30,'#ffe08a',1-k);M.ringFull(g,cx+ox,cy+oy,2+k*20,'#ffffff',(1-k)*.6)})}});
  // floating stones (drift; click -> spin up and drop, then levitate back)
  const rock=sd=>M.mk(16,12,p=>{p.poly([[2,3],[7,0],[14,2],[15,7],[10,11],[3,10],[0,6]],LB,{v:.5,bv:.3,tex:(x,y)=>(fbm(x/3+sd,y/3)-.5)*.4});K.glyph(p,5,3,sd,'#5af0d0')});
  [[CX-150,60],[CX+140,48],[CX-240,78],[CX+250,70],[L0-300,60],[L1+330,58]].forEach(([x,y],i)=>{const s=rock(i+2);E({name:'FLOATING STONE',x,y,spr:s,z:-3,by:y,dropT:-9,noNav:1,draw(g,X,Y,t,e,sel){const a=M.now-e.dropT;let dy=RM?0:Math.round(Math.sin(t*1.1+i)*3);if(a<1.6){const k=a/1.6;dy+=Math.round(k<.4?Math.sin(k/.4*Math.PI/2)*18:(1-(k-.4)/.6)*18)}M.glow(g,X+8,Y+dy+16,8,'#5af0d0',.25);if(sel)g.drawImage(M.ring(s),X-1,Y+dy-1);g.drawImage(s.c,X,Y+dy);e._dy=dy},click(e,R){e.dropT=M.now;M.snd('whoosh',.8);setTimeout(()=>{M.snd('thud',.8);M.emit(R,'dust',e.x+8,e.y+30,6)},600);M.emit(R,'rune',e.x+8,e.y+6,6,{c:['#5af0d0','#ffffff']})}})});
  K.motes(R,90,0,W,30,FLOOR,['#5af0d0','#e090ff','#ffe08a','#ffffff']);
  // pilgrims
  const PEO=[{skin:0,hair:'#2a1a10',shirt:'#c84a3a',pants:'#2a3a5a',style:1},{skin:2,hair:'#e8c060',shirt:'#3a8a5a',pants:'#3a2a20',style:0},{skin:1,hair:'#1a1010',shirt:'#6a4aa8',pants:'#1a1a2a',style:3},{skin:3,hair:'#4a2a1a',shirt:'#e0a030',pants:'#2a4a6a',style:2,dress:1},{skin:2,hair:'#8a3a1a',shirt:'#3a6ab8',pants:'#4a4a4a',style:0}];
  const LINES=['WHOA, RUNES!','IS THAT ROCK FLOATING?','SO ANCIENT','I HEARD A DRAGON','THE DOORS GLOW!','SPOOKY. NICE.'];
  PEO.forEach((o,i)=>{const fr=M.person(o);E({name:'VISITOR',x:CX-330+i*160+(i>2?380:0),y:FLOOR+6+(i%3)*10,fr,vx:(i%2?1:-1)*(10+i*2),pause:0,
   upd(e,dt,t){e.z=e.y+28;if(M.now<e.wv){e.f=5;return}if(RM){e.f=4;return}if(e.pause>0){e.pause-=dt;e.f=4;return}e.x+=e.vx*dt;e.flip=e.vx<0;e.f=Math.floor(t*6+e.t0)%4;if(e.x<30||e.x>W-44){e.vx*=-1;e.x=clamp(e.x,30,W-44)}if(Math.random()<dt*.08)e.pause=1+Math.random()*2.5},
   click(e,R){e.wv=M.now+1.1;M.snd('blip',1.3+i*.1);M.say(R,e.x+7,e.y-2,LINES[(Math.random()*LINES.length)|0]);M.emit(R,'heart',e.x+7,e.y,2)}})})},
 enter(R,o){if(o.ret&&R.doors&&R.doors[o.ret]){const d=R.doors[o.ret];d.open=1;d.opening=0;d.closing=1;d.sp=0}else if(R.doors)for(const k in R.doors){R.doors[k].open=0;R.doors[k].opening=0;R.doors[k].sp=0}
  if(!o.ret&&!o.at&&!o.pop){M.centerOn(R,CX,true);setTimeout(()=>{if(M.cur()===R&&!R.greeted){R.greeted=1;R.att.wave=M.now+1.2;M.say(R,CX,R.att.y-2,'WELCOME, SEEKER!',1.6)}},700)}},
 back(R,g,ox,oy,t){// glowing title + frieze runes + skylight beams
  const NM=M.NAME,nw=M.tw(NM),T=M.txt(NM,'#ffe9a8',null);const gx=Math.round(CX+ox-nw/2);M.glow(g,CX+ox,oy+14,nw/2+6,'#e0a838',.18+.08*Math.sin(t*2));g.drawImage(M.txt(NM,'#5a3a10',null).c,gx+1,oy+12);g.drawImage(T.c,gx,oy+11);
  const x0=Math.max(0,Math.floor(-ox/9)*9+4);for(let x=x0;x<Math.min(W,-ox+M.BW+9);x+=9){const ph=(Math.sin(t*1.6-x*.05)+1)/2;if(ph>.7)g.drawImage(K.gly((x/9)|0,x<L0?'#5af0d0':x>=L1?'#e090ff':'#ffe08a'),x+ox,37+oy)}
  if(!RM)for(let i=0;i<26;i++){const k=(t*.06+i*.618)%1,x=CX-90+((i*53)%180)+Math.sin(t*.5+i)*4,y=10+k*140;if(bay(x|0,y|0)<.5){g.fillStyle=i%3?'#fff0c8':'#ffffff';g.fillRect(Math.round(x+ox),Math.round(y+oy),1,1)}}},
 over(R,g,t){if(R.dlg)drawDlg(R,g,t)}});
M.trFor=(id,from)=>{const ST=['blocks','diamond','melt','shutter','iris'];const i=Math.max(0,M.order.indexOf(id));const d=M.defs[id]||{};const col=(d.door&&d.door.light)||'#ffd86a';return{from,style:d.tr||ST[i%ST.length],col,dout:.6,din:.55}};
/* ---------- the wing dialogue ---------- */
function openDlg(R){if(R.dlg)return;R.dlg={t0:M.now,wing:R.lastWing||'W',sel:0,page:0,done:false,typ:0};R.att.wave=0;M.snd('blip',1.1);M.centerOn(R,CX)}
function closeDlg(R){R.dlg=null;R.dlgItems=null;M.snd('blip',.8)}
const GREET='WHICH WING, SEEKER?';
function layout(R){const bw=Math.min(M.BW-6,330),bh=Math.min(M.BH-24,124),bx=Math.floor((M.BW-bw)/2),by=M.BH-bh-3;const cols=bw>=250?2:1,rows=Math.max(3,Math.floor((bh-50)/11)),per=cols*rows;return{bw,bh,bx,by,cols,rows,per}}
function drawDlg(R,g,t){const D=R.dlg,Lx=layout(R),{bw,bh,bx,by,cols,rows,per}=Lx;const items=[];
 g.fillStyle='#07040c';for(let y=0;y<M.BH;y++)for(let x=(y&1);x<M.BW;x+=2)if((x+y)%4===0)g.fillRect(x,y,1,1);
 M.frame(bx,by,bw,bh,{c:['#140c1c','#3a2a40','#e0a838','#120a1e'],pat:'#1e1430'});
 const A=R.att.fr[Math.floor(M.now*10)%2&&!D.done?3:0];g.fillStyle='#24143e';g.fillRect(bx+6,by+6,22,22);g.drawImage(A.c,4,2,20,20,bx+7,by+7,20,20);g.fillStyle='#e0a838';g.fillRect(bx+6,by+28,22,1);
 const n=Math.min(GREET.length,Math.floor((M.now-D.t0)*(RM?999:28)));if(n>D.typ){D.typ=n;if(n%2===0)M.snd('type')}if(n>=GREET.length)D.done=true;g.drawImage(M.txt(GREET.slice(0,n)||' ','#fff6dc',null).c,bx+33,by+8);
 const tabs=[['W',bw<200?'WEST':'WEST WING'],['E',bw<200?'EAST':'EAST WING']];let tx=bx+33;for(const[k,lab]of tabs){const T=M.txt(lab,D.wing===k?'#140a26':'#e8d8b0',null),w=T.w+8;const hv=R.dlgHov==='t'+k;g.fillStyle='#140c1c';g.fillRect(tx,by+18,w,12);g.fillStyle=D.wing===k?(hv?'#a8fff0':(k==='W'?'#5af0d0':'#e090ff')):(hv?'#4a3a6a':'#2e2448');g.fillRect(tx+1,by+19,w-2,10);g.drawImage(T.c,tx+4,by+21);items.push({id:'t'+k,x:tx,y:by+18,w,h:12,act:()=>{D.wing=k;D.page=0;D.sel=0;R.lastWing=k;M.snd('tick')}});tx+=w+3}
 const ids=wingIds(D.wing),pages=Math.ceil(ids.length/per);D.page=clamp(D.page,0,pages-1);const cw=Math.floor((bw-14)/cols);
 ids.slice(D.page*per,D.page*per+per).forEach((id,j)=>{const c=Math.floor(j/rows),r=j%rows,x=bx+8+c*cw,y=by+35+r*11,idx=D.page*per+j,hv=R.dlgHov==='r'+idx||D.sel===idx;
  if(hv){g.fillStyle='#3a2e5a';g.fillRect(x,y-1,cw-4,10);const b=RM?0:Math.round(Math.sin(t*8));g.fillStyle='#ffe08a';for(let k=0;k<4;k++)g.fillRect(x+2+b,y+1+k,1+(k<2?k:3-k),1)}
  g.drawImage(M.txt(M.defs[id].short||M.defs[id].name,hv?'#ffe08a':'#e8dcc8',null).c,x+8,y+1);items.push({id:'r'+idx,x,y:y-1,w:cw-4,h:10,act:()=>pick(R,id)})});
 const fy=by+bh-13;if(pages>1){const pl='< '+(D.page+1)+'/'+pages+' >',T=M.txt(pl,'#e8dcc8',null);g.drawImage(T.c,bx+8,fy+2);items.push({id:'pp',x:bx+6,y:fy,w:14,h:11,act:()=>{D.page=(D.page-1+pages)%pages;M.snd('tick')}});items.push({id:'pn',x:bx+T.w-4,y:fy,w:16,h:11,act:()=>{D.page=(D.page+1)%pages;M.snd('tick')}})}
 const cl=bw<200?'BYE':'JUST LOOKING',CT=M.txt(cl,R.dlgHov==='x'?'#ffe08a':'#b8a8c8',null);g.drawImage(CT.c,bx+bw-CT.w-8,fy+2);items.push({id:'x',x:bx+bw-CT.w-10,y:fy,w:CT.w+4,h:11,act:()=>closeDlg(R)});
 R.dlgItems=items}
function pick(R,id){R.dlg=null;R.dlgItems=null;R.att.wave=M.now+1;M.say(R,CX,R.att.y-2,'THIS WAY!',1);M.snd('chime');const[ox,oy]=M.view(R);M.emit(R,'rune',CX,R.att.y+10,10,{c:['#5af0d0','#ffffff']});setTimeout(()=>M.go(id,M.trFor(id,[CX+ox,R.att.y+16+oy])),550)}
const itemAt=(R,x,y)=>(R.dlgItems||[]).find(u=>x>=u.x&&y>=u.y&&x<u.x+u.w&&y<u.y+u.h);
const hallDef=M.defs.hall;
hallDef.init=(orig=>R=>{orig(R);
 R.dlgClick=(x,y)=>{const u=itemAt(R,x,y);if(u)u.act();else{const{bx,by,bw,bh}=layout(R);if(x<bx||y<by||x>bx+bw||y>by+bh)closeDlg(R)}};
 R.dlgHit=(x,y)=>{const u=itemAt(R,x,y);R.dlgHov=u?u.id:null;if(u&&u.id[0]==='r')R.dlg.sel=+u.id.slice(1);return!!u};
 R.dlgKey=ev=>{const D=R.dlg,ids=wingIds(D.wing);if(ev.key==='Escape'){closeDlg(R);return true}if(ev.key==='ArrowDown'){D.sel=(D.sel+1)%ids.length;D.page=Math.floor(D.sel/layout(R).per);M.snd('tick');return true}if(ev.key==='ArrowUp'){D.sel=(D.sel-1+ids.length)%ids.length;D.page=Math.floor(D.sel/layout(R).per);M.snd('tick');return true}
  if(ev.key==='ArrowLeft'||ev.key==='ArrowRight'||ev.key==='Tab'){D.wing=D.wing==='W'?'E':'W';D.sel=0;D.page=0;M.snd('tick');return true}if(ev.key==='Enter'||ev.key===' '){pick(R,ids[D.sel]);return true}return false}})(hallDef.init);
M.openDlg=()=>{const R=M.cur();if(R&&R.id==='hall')openDlg(R)};
})();
