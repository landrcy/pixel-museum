/* Legend rooms: Mecha Hangar, Magic Swords, Dog Park */
(()=>{'use strict';
const{ramp,rp,vn,fbm,H,bay,TAU,RM,mix,clamp,lerp,RH}=M,K=M.K;
const ease=p=>p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;

/* ================= MECHA HANGAR ================= */
{const FL=214;
 // armour plate painter: bevelled, riveted, with a stripe and optional glow slot
 const plate=(w,h,c,o={})=>K.spr(w,h,p=>{const C=ramp(c,6);p.rrect(0,0,w,h,o.r??2,C,{v:.58,bv:.28});if(o.stripe)p.rect(o.sv?Math.floor(w/2)-1:1,o.sv?1:Math.floor(h/2)-1,o.sv?3:w-2,o.sv?h-2:3,ramp(o.stripe),{v:.6,bv:0});
  if(w>8&&h>8)[[2,2],[w-3,2],[2,h-3],[w-3,h-3]].forEach(([x,y])=>{p.px(x,y,C[5]);p.px(x+1,y+1,C[1])});if(o.glow)p.rect(o.glow[0],o.glow[1],o.glow[2],o.glow[3],['#3a1a08','#ff7a1a','#ffd060','#fff4c0'],{v:.6,bv:0});if(o.vent)for(let y=4;y<h-4;y+=3)p.rect(3,y,w-6,1,C[1]);if(o.wheel){p.ell(w/2,h/2,w/2-.5,h/2-.5,ramp('#2a2a32',5),{b:.05});p.ell(w/2,h/2,w/4,h/4,ramp('#a8a8b8',5),{b:.1});p.px(Math.floor(w/2),Math.floor(h/2),'#140c1c')}});
 // a mech = parts with a robot pose and a vehicle pose (all offsets in texels from the base point)
 const MECHS=[{nm:'TITAN',c:'#c8383a',c2:'#e8e8f0',x:230,veh:'TANK'},{nm:'VALKYRIE',c:'#3a6ad8',c2:'#e8e8f0',x:560,veh:'JET'},{nm:'BULLDOG',c:'#e0a830',c2:'#3a3a48',x:890,veh:'TRUCK'}];
 const build=(m)=>{const c=m.c,c2=m.c2,DK='#4a4a58';const P=[
  // [robotSpr, rx,ry, vehicleSpr, vx,vy]  (offsets from the base point, texels)
  [plate(16,46,c2,{stripe:c}),-28,-52,plate(46,10,c2,{stripe:c}),-64,-24],
  [plate(16,46,c2,{stripe:c}),12,-52,plate(46,10,c2,{stripe:c}),-6,-24],
  [plate(18,8,DK),-29,-8,plate(16,16,'#2a2a32',{wheel:1,r:8}),-58,-16],
  [plate(18,8,DK),11,-8,plate(16,16,'#2a2a32',{wheel:1,r:8}),26,-16],
  [plate(30,8,DK,{vent:0}),-15,-58,plate(30,6,DK),-15,-15],
  [plate(52,40,c,{glow:[21,14,10,8],stripe:c2,sv:1}),-26,-98,plate(60,22,c,{glow:[46,7,9,6],vent:1}),-44,-46],
  [plate(14,40,c,{vent:1}),-42,-90,plate(34,8,c2),-74,-32],
  [plate(14,40,c,{vent:1}),28,-90,plate(34,8,c2),24,-32],
  [plate(12,10,DK),-41,-52,plate(8,6,DK,{glow:[1,1,6,4]}),-52,-44],
  [plate(12,10,DK),29,-52,plate(8,6,DK,{glow:[1,1,6,4]}),-52,-37],
  [plate(18,12,c2,{stripe:c}),-46,-102,plate(18,8,c2,{stripe:c}),-60,-34],
  [plate(18,12,c2,{stripe:c}),28,-102,plate(18,8,c2,{stripe:c}),26,-34],
  [plate(22,18,c2,{glow:[4,7,14,3]}),-11,-116,plate(20,12,c2,{glow:[2,3,10,4]}),-10,-58],
  [plate(4,18,'#5a5a68'),8,-132,plate(40,4,'#5a5a68'),12,-52]];
  if(m.veh==='JET'){P[6][3]=plate(52,8,c2,{stripe:c});P[6][4]=-98;P[6][5]=-38;P[7][3]=plate(52,8,c2,{stripe:c});P[7][4]=34;P[7][5]=-38;P[2][3]=plate(14,7,'#ff8a2a',{glow:[1,1,12,5]});P[2][4]=-58;P[2][5]=-34;P[3][3]=plate(14,7,'#ff8a2a',{glow:[1,1,12,5]});P[3][4]=-58;P[3][5]=-26}
  if(m.veh==='TRUCK'){P[13][3]=plate(6,14,'#5a5a68');P[13][4]=-34;P[13][5]=-62;P[12][3]=plate(26,20,c2,{glow:[3,3,18,7]});P[12][4]=16;P[12][5]=-50}
  return P};
 K.ext('mecha',{start:560,top:'#141820',bot:'#24242c',
  bg(p,R){const WL=['#0e1218','#161c26','#202836','#2c3646','#3c4858','#56647a'];
   for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c;if(y<FL){const rib=x%10,pan=Math.floor(x/80);c=rp(WL,.35+(rib<2?.18:rib>8?-.12:0)+H(pan,1)*.08-y/FL*.18+(vn(x/30,y/20)-.5)*.1,x,y);if(y>36&&y<64&&x%160>20&&x%160<140){c=rp(['#1a2a4a','#2a4a7a','#4a7ab0','#8ab8e0'],.4+(64-y)/40,x,y);if((x%160-20)%30===0||y===50)c='#1a2030'}}
    else{const k=(y-FL)/(RH-FL);c=rp(['#1a1a20','#26262e','#32323c','#40404c','#56566a'],.45+k*.15+(vn(x/16,y/6)-.5)*.2+(x%60===0?-.2:0),x,y)}p.px(x,y,c)}
   for(let x=0;x<R.w;x++){for(let y=FL-6;y<FL;y++)p.px(x,y,((x+y)>>2)&1?'#e0b020':'#1a1a20');p.px(x,FL,'#0a0a10');
    for(let y=14;y<22;y++)p.px(x,y,rp(ramp('#5a5a6a'),y<16?.8:y>20?.2:.5,x,y));if(x%40<3)for(let y=0;y<14;y++)p.px(x,y,rp(ramp('#4a4a5a'),.5,x,y))}
   // bay numbers + floor markings
   MECHS.forEach((m,i)=>{p.rect(m.x-70,FL+6,140,2,'#c8a020');p.rect(m.x-70,RH-8,140,2,'#c8a020');K.big(p,String(i+1),m.x-6,72,'#c8a020',3);
    for(let y=FL-128;y<FL;y+=12){p.rect(m.x-64,y,3,12,ramp('#8a8a9a'),{v:.5});p.rect(m.x+61,y,3,12,ramp('#8a8a9a'),{v:.5});p.line(m.x-61,y,m.x-50,y+11,'#5a5a6a')}p.rect(m.x-66,FL-130,132,3,ramp('#8a8a9a'),{v:.6})})},
  init(R){
   MECHS.forEach((m,mi)=>{const parts=build(m);const st={v:0,tgt:0,t0:-9,busy:0};
    const e=M.ent(R,{x:m.x-80,y:FL-134,w:160,h:134,box:1,name:m.nm,z:FL,react:false,
     draw(g,X,Y,t,e,sel){const p=st.busy?ease(clamp((M.now-st.t0)/1.3,0,1)):st.tgt;const v=st.busy?(st.tgt?p:1-p):st.tgt;if(st.busy&&M.now-st.t0>1.3){st.busy=0;st.v=st.tgt;M.snd('tada',1.1+mi*.1);M.emit(R,'star',m.x,FL-60,16);M.say(R,m.x,FL-122,st.tgt?m.veh+' MODE!':'ROBOT MODE!',1.2)}
      const bx=X+80,by=Y+134;const bob=st.tgt||RM?0:Math.round(Math.sin(t*1.5+mi)*1);
      parts.forEach(([rs,rx,ry,vs,vx,vy],k)=>{const s=v<.5?rs:vs,q=v,x=Math.round(lerp(rx,vx,q)),y=Math.round(lerp(ry,vy,q))+(k>=5?bob:0);if(sel)g.drawImage(M.ring(s),bx+x-1,by+y-1)});
      parts.forEach(([rs,rx,ry,vs,vx,vy],k)=>{const s=v<.5?rs:vs,q=v,x=Math.round(lerp(rx,vx,q)),y=Math.round(lerp(ry,vy,q))+(k>=5?bob:0);g.drawImage(s.c,bx+x,by+y)});
      // eye/core glow pulse
      if(v<.5){const pu=RM?1:(Math.sin(t*4+mi)>0?1:0);g.fillStyle=pu?'#fff4c0':'#ffb040';g.fillRect(bx-7,by-109+bob,14,1)}
      if(st.busy&&!RM&&Math.random()<.5)M.emit(R,'spark',m.x+K.rnd(-40,40),FL-K.rnd(10,90),2)},
     click(e,R){if(st.busy)return;st.busy=1;st.t0=M.now;st.tgt=st.tgt?0:1;M.snd('clang',.8);setTimeout(()=>M.snd('laser',.6),250);setTimeout(()=>M.snd('clang',1.1),600);setTimeout(()=>M.snd('thud',1),1000);K.shake(R,.3,1)}});
    e.st=st;R['m'+mi]=e});
   // welding arms with sparks
   R.welders=[[395,1],[725,-1]].map(([x,d],i)=>{const fr=M.frames(2,30,40,(p,f)=>{const S=ramp('#e0a830',6);p.rect(4,34,22,6,ramp('#3a3a48'),{v:.5});p.rect(12,18,6,17,S,{v:.5});p.ell(15,18,4,4,ramp('#5a5a68'),{b:.1});p.line(15,18,f?26:24,f?6:8,'#e0a830');p.line(16,18,f?27:25,f?7:9,'#a87020');p.rect(f?25:23,f?3:5,4,4,ramp('#5a5a68'),{v:.5})});
    return M.ent(R,{x:x-15,y:FL-38,fr,fps:3,flip:d<0,name:'WELDING ARM',react:'jiggle',upd(e,dt){if(!RM&&Math.random()<dt*14)M.emit(R,'spark',e.x+(d>0?28:2),e.y+4,1,{dir:-Math.PI/2+d*.6})},click(e,R){M.react(R,e);M.emit(R,'spark',e.x+(d>0?28:2),e.y+4,30,{v:1.5});M.emit(R,'zap',e.x+(d>0?28:2),e.y+4,10);M.snd('zap',1);K.flash(R,'#c8e8ff',.12)}})});
   // overhead crane with a crate
   const crate=K.spr(22,20,p=>{p.rect(0,0,22,20,ramp('#a8743a',6),{v:.55});p.line(2,2,19,17,'#6a4220');p.line(19,2,2,17,'#6a4220');p.rect(0,0,22,2,ramp('#6a4220'),{v:.5});p.rect(0,18,22,2,ramp('#6a4220'),{v:.4})});
   R.crane={x:300,dir:1,drop:0,cy:44};M.ent(R,{spr:crate,name:'CARGO CRATE',x:0,y:0,z:5,upd(e,dt){const c=R.crane;if(c.drop){c.drop+=dt;if(c.drop<.6){c.cy=lerp(44,FL-20,c.drop/.6)}else if(c.drop<.65&&!c.hit){c.hit=1;c.cy=FL-20;M.snd('thud',.7);K.shake(R,.3,2);M.emit(R,'dust',c.x+11,FL,16,{v:1.4,floor:FL+2})}else if(c.drop>1.4){c.cy=Math.max(44,c.cy-dt*60);if(c.cy<=44){c.drop=0;c.hit=0}}}else if(!RM){c.x+=c.dir*dt*30;if(c.x<120||c.x>980)c.dir*=-1}e.x=Math.round(c.x);e.y=Math.round(c.cy)},
    click(e,R){if(R.crane.drop)return;R.crane.drop=.01;M.snd('whoosh',.7)}});
   // warning beacons
   R.beac=[];for(let i=0;i<5;i++){const x=80+i*240;R.beac.push(M.ent(R,{x:x-5,y:24,w:10,h:9,box:1,name:'WARNING LIGHT',draw(g,X,Y,t,e,sel){const ph=Math.floor((RM?0:t)*8+i)%4,al=M.now<R.alarm;g.fillStyle='#3a3a48';g.fillRect(X,Y+6,10,3);g.fillStyle=al?(ph%2?'#ff3a2a':'#ffd040'):(ph===0?'#ffd040':'#a86a10');g.fillRect(X+1,Y,8,6);g.fillStyle='#fff4c0';g.fillRect(X+2,Y+1,2,1);if(sel){g.fillStyle='#fff6c4';g.fillRect(X-1,Y-1,12,1)}},click(e,R){R.alarm=M.now+2.2;for(let k=0;k<4;k++)setTimeout(()=>M.snd('beep',.6),k*450)}}))}
   // control console
   const cons=M.frames(2,40,30,(p,f)=>{p.poly([[0,10],[40,10],[36,30],[4,30]],ramp('#4a5468',6),{v:.55});p.poly([[2,10],[38,10],[34,2],[6,2]],ramp('#2a3040',6),{v:.6});for(let i=0;i<6;i++){const on=((i+f)%2)===0;p.rect(6+i*5,14,3,3,on?['#ff5a4a','#ffb0a0']:['#3a1a1a','#5a2a2a'],{v:.6,bv:0});p.rect(6+i*5,20,3,2,on?'#5aff8a':'#1a4a2a')}p.rect(10,4,20,5,f?['#1a4a3a','#3aff9a']:['#1a3a2a','#2ac07a'],{v:.6,bv:0})});
   M.ent(R,{x:1010,y:FL-12,fr:cons,fps:2,name:'CONTROL PANEL',react:'jiggle',click(e,R){M.react(R,e);M.snd('beep',1.4);let k=0;[R.m0,R.m1,R.m2].forEach(m=>setTimeout(()=>m.click(m,R),(k++)*350))}});
   // drones
   const drone=M.frames(2,16,10,(p,f)=>{p.rect(f?0:2,0,f?16:12,1,'#a8a8b8');p.rect(7,1,2,2,'#5a5a68');p.rrect(3,3,10,6,2,ramp('#e8e8f0',5),{v:.6});p.px(10,5,'#3affaa')});
   for(let i=0;i<3;i++)M.ent(R,{fr:drone,fps:16,name:'HANGAR DRONE',x:200+i*300,y:90+i*14,hx:200+i*300,hy:90+i*14,spin:0,upd(e,dt,t){if(RM)return;e.x=e.hx+Math.sin(t*.5+i*2)*80;e.y=e.hy+Math.sin(t*1.3+i)*8-(e.spin>0?20*Math.sin(e.spin*Math.PI):0);e.spin=Math.max(0,e.spin-dt)},click(e,R){e.spin=1;M.snd('beep',1.8);M.say(R,e.x+8,e.y-2,'BEEP BOOP',.8);M.emit(R,'zap',e.x+8,e.y+5,6)}});
   // oil barrels
   for(let i=0;i<4;i++){const c=['#c8383a','#3a6ad8','#e0a830','#4ab05a'][i];M.ent(R,{x:[60,140,470,1060][i],y:FL+14+(i%2)*20,spr:K.spr(16,22,p=>{p.cyl(0,1,16,20,ramp(c,6));p.rect(0,6,16,1,ramp(c)[0]);p.rect(0,15,16,1,ramp(c)[0]);p.ell(8,1.5,7.5,1.5,ramp(c,6),{b:.3})}),name:'OIL BARREL',react:'shake',snd:'clang',fx:'smoke',fxn:4})}
   K.visitors(R,3,RH-4,['SO BIG!','CAN I DRIVE IT?','TRANSFORM!','HUGE!'],{off:4})},
  back(R,g,ox,oy,t){const c=R.crane;if(!c)return;const x=Math.round(c.x+ox),y=Math.round(c.cy+oy);g.fillStyle='#e0b020';g.fillRect(x-4,14+oy,30,8);g.fillStyle='#140c1c';g.fillRect(x+10,22+oy,1,y-22-oy);g.fillStyle='#8a8a9a';g.fillRect(x+6,y-3,10,3)},
  front(R,g,ox,oy,t){if(R.alarm&&M.now<R.alarm&&!RM&&Math.floor(t*4)%2){g.fillStyle='#ff2a1a';for(let y=0;y<M.BH;y+=2)for(let x=(y>>1)&1;x<M.BW;x+=4)g.fillRect(x,y,1,1)}K.drawFlash(R,g)}});
}

/* ================= MAGIC SWORDS ================= */
{const FL=196,SW=[{nm:'EXCALIBUR',b:'#e8f4ff',h:'#ffd040',fx:'star',snd:1},{nm:'FROSTBRAND',b:'#9ae8ff',h:'#4a8ad8',fx:'snow',snd:1.25},{nm:'EMBERFANG',b:'#ffb070',h:'#c8302a',fx:'fire',snd:.8},{nm:'STORMCALLER',b:'#d0d8ff',h:'#6a4ad8',fx:'zap',snd:1.5},{nm:'VOIDEDGE',b:'#c890ff',h:'#2a0a4a',fx:'ink',snd:.6}];
 const SX=[140,290,500,710,860];
 const sword=(s)=>K.spr(14,52,p=>{const B=ramp(s.b,6),Hc=ramp(s.h,5);p.poly([[5,0],[8,0],[9,4],[9,36],[4,36],[4,4]],B,{v:.62,bv:.35});p.rect(6,3,1,32,B[5]);p.rect(0,36,14,4,Hc,{v:.6});p.rect(5,40,4,9,ramp('#6a3a20'),{v:.5,tex:(x,y)=>y%2?.15:0});p.ell(7,50,2.5,2,Hc,{b:.2,spec:'#ffffff'});p.px(7,38,'#ffffff')});
 const dagger=[0,1,2,3].map(o=>K.spr(14,14,p=>{const B=['#5a6a8a','#a8b8d8','#e8f4ff'];const pts=[[[7,0],[7,9]],[[0,7],[9,7]],[[1,1],[8,8]],[[12,1],[5,8]]][o];p.line(pts[0][0],pts[0][1],pts[1][0],pts[1][1],B[2]);p.line(pts[0][0]+(o===0?1:o===1?0:o===2?1:-1),pts[0][1]+(o===1?1:0),pts[1][0]+(o===0?1:0),pts[1][1]+(o===1?1:0),B[1]);const hx=[7,9,9,4][o],hy=[10,7,9,9][o];p.rect(hx-1,hy-1,3,3,ramp('#c8a030'),{v:.6});p.px(hx+(o===1?2:o===3?-2:o===2?2:0),hy+(o===0?3:o===2?2:o===3?2:0),'#6a3a20')}));
 K.ext('swords',{start:500,top:'#08081a',bot:'#141428',
  bg(p,R){const ST=['#08081a','#10122a','#1a1e3e','#262c54','#363e6c','#4e5888'];
   for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c;if(y<FL){const row=Math.floor(y/12),bx=(x+(row%2)*14)%28,by=y%12;c=(bx===0||by===0)?rp(ST,.12,x,y):rp(ST,.3+H(Math.floor((x+(row%2)*14)/28),row)*.15+(by===1?.1:0)+(vn(x/20,y/20)-.5)*.15-y/FL*.05,x,y)}
    else{const k=(y-FL)/(RH-FL),tx=Math.floor(x/(30+k*10)),ty=Math.floor((y-FL)/10);c=rp(['#0c0c1e','#16182e','#20243e','#2e3452','#40486a'],.35+k*.2+H(tx,ty)*.12+((y-FL)%10===0?-.2:0),x,y)}p.px(x,y,c)}
   // gothic stained glass windows
   for(let i=0;i<5;i++){const wx=70+i*215,top=24,bot=120,hw=22;for(let y=top;y<bot;y++)for(let x=wx-hw-3;x<=wx+hw+3;x++){const dy=y-(top+hw),inA=y>top+hw||((x-wx+hw*.0)**2*0+1)>0;const ax=Math.abs(x-wx),arch=y<top+hw?Math.hypot(ax+hw*.4,(top+hw)-y)<=hw*1.4:true,arch2=y<top+hw?Math.hypot(ax+hw*.4,(top+hw)-y)<=hw*1.4+3:true;if(!arch2||ax>hw+3)continue;if(!arch||ax>hw){p.px(x,y,rp(ST,.55,x,y));continue}
     const cell=(Math.floor((x-wx+40)/9)+Math.floor(y/11)*3)%5,lead=((x-wx+40)%9===0)||(y%11===0)||ax===0;p.px(x,y,lead?'#0a0814':rp(ramp(['#c8302a','#3a6ad8','#e0b030','#3aa860','#9a4ad8'][(cell+i)%5],5),.55+(1-(y-top)/(bot-top))*.3,x,y))}}
   // banners
   for(let i=0;i<4;i++){const x=175+i*215;p.poly([[x,8],[x+20,8],[x+20,64],[x+10,56],[x,64]],ramp(['#7a1a2a','#1a2a6a'][i%2],6),{v:.55});p.rect(x+6,22,8,14,ramp('#e0b030'),{v:.6})}
   // rune circle on the floor
   for(let y=FL+20;y<RH;y++)for(let x=400;x<600;x++){const dx=(x-500)/80,dy=(y-238)/24,r=Math.hypot(dx,dy);if(Math.abs(r-1)<.04||Math.abs(r-.75)<.05)p.px(x,y,'#3a3a8a')}},
  init(R){R.runeA=0;
   SW.forEach((s,i)=>{const x=SX[i],stone=K.spr(40,24,p=>{p.ell(20,14,19,10,ramp('#6a6a7a',6),{b:.1,tex:(X,Y)=>(vn(X/3,Y/3)-.5)*.4});p.rect(18,4,4,3,'#1a1a24')});
    M.ent(R,{spr:stone,x:x-20,y:FL+10,nohit:1,z:FL+30});
    const sp=sword(s);M.ent(R,{spr:sp,name:s.nm,x:x-7,y:FL-26,hy:FL-26,st:0,z:FL+29,
     upd(e,dt,t){if(e.st===1){e.p=Math.min(1,e.p+dt*1.2);e.y=Math.round(e.hy-ease(e.p)*44);if(e.p>=1)e.st=2}else if(e.st===2){e.y=Math.round(e.hy-44+(RM?0:Math.sin(t*2+i)*2));if(!RM&&Math.random()<dt*10)M.emit(R,s.fx,e.x+7,e.y+18,1,{v:.4,rx:8,ry:30})}else if(e.st===3){e.y+=dt*260;if(e.y>=e.hy){e.y=e.hy;e.st=0;M.snd('clang',s.snd);K.shake(R,.3,2);M.emit(R,'dust',x,FL+16,14,{v:1.3});M.emit(R,'spark',x,FL+12,10)}}},
     click(e,R){if(e.st===0){e.st=1;e.p=0;M.snd('chime',s.snd);M.snd('swish',s.snd);M.emit(R,s.fx,x,FL,20,{v:1.4});M.emit(R,'star',x,FL-10,10);M.say(R,x,FL-80,s.nm+'!',1.4);R.runeA=M.now}else if(e.st===2){e.st=3;M.snd('swish',.7)}}})});
   // floating blades orbiting the rune circle
   R.blades=[];for(let i=0;i<6;i++){const b=M.ent(R,{spr:dagger[0],name:'ENCHANTED BLADE',x:0,y:0,a:i/6*TAU,dash:0,
    upd(e,dt,t){const sp=M.now-R.runeA<3?2.2:.6;if(!RM)e.a+=dt*sp;let cx=500+Math.cos(e.a)*86,cy=150+Math.sin(e.a)*26;if(e.dash){e.dash+=dt*2;const q=e.dash<1?ease(e.dash):1-ease(e.dash-1);cx=lerp(cx,R.dum.x+10,q);cy=lerp(cy,R.dum.y+16,q);if(e.dash>=1&&!e.hit){e.hit=1;M.play(R.dum,'shake',.5);M.emit(R,'crumb',R.dum.x+10,R.dum.y+14,12);M.snd('thud',1.4)}if(e.dash>=2){e.dash=0;e.hit=0}}
     e.x=Math.round(cx-7);e.y=Math.round(cy-7);const o=Math.round(((e.a%Math.PI)+Math.PI)%Math.PI/(Math.PI/4))%4;e.spr=dagger[[1,2,0,3][o]];e.z=cy+(Math.sin(e.a)>0?60:0)},
    click(e,R){if(e.dash)return;e.dash=.01;M.snd('swish',1.3);M.emit(R,'star',e.x+7,e.y+7,6)}});R.blades.push(b)}
   // training dummy
   R.dum=M.ent(R,{x:640,y:FL+2,spr:K.spr(22,40,p=>{p.rect(10,20,3,20,ramp('#6a4220'),{v:.5});p.rect(2,14,18,4,ramp('#c8a050'),{v:.55});p.ell(11,8,7,7,ramp('#d8b060',6),{b:.1,tex:(x,y)=>(x+y)%3===0?-.15:0});p.rrect(5,14,12,16,3,ramp('#c8a050',6),{v:.55,tex:(x,y)=>y%3===0?-.15:0});p.px(9,7,'#3a2010');p.px(13,7,'#3a2010');p.line(9,10,13,10,'#3a2010')}),name:'TRAINING DUMMY',react:'shake',snd:'thud',fx:'crumb',fxn:10,say:()=>K.pick(['OOF!','OUCH!','NOT AGAIN!'])});
   // anvil + hammer
   const anv=M.frames(2,34,30,(p,f)=>{const I=ramp('#5a5a6a',6);p.poly([[0,10],[34,10],[28,16],[6,16]],I,{v:.6});p.rect(10,16,14,8,I,{v:.45});p.rect(4,24,26,6,I,{v:.4});p.poly([[0,10],[-0,14],[-4,10]],I,{});if(f){p.rect(18,4,12,5,ramp('#8a8a9a'),{v:.6});p.rect(22,0,3,4,ramp('#6a4220'),{})}else{p.rect(22,-0,10,5,ramp('#8a8a9a'),{v:.6});p.line(26,5,30,12,'#6a4220')}p.rect(10,8,10,2,['#ff7020','#ffd060'],{v:.6})});
   M.ent(R,{x:360,y:FL+4,fr:anv,f:0,name:'ANVIL',click(e,R){e.f=1;M.snd('clang',1.3);M.emit(R,'spark',e.x+20,e.y+8,22,{v:1.3});setTimeout(()=>e.f=0,180)}});
   // spellbook on lectern
   const book=M.frames(3,28,34,(p,f)=>{p.rect(11,14,6,18,ramp('#6a4220'),{v:.5});p.rect(5,30,18,4,ramp('#5a3418'),{v:.5});p.poly([[0,12],[28,12],[24,4],[4,4]],ramp('#7a2a3a'),{v:.5});p.rect(3,4,11,8,ramp('#f0e0c0'),{v:.65});p.rect(14,4,11,8,ramp('#e8d8b0'),{v:.6});for(let i=0;i<3;i++){p.rect(5,6+i*2,7,1,'#8a6a4a');p.rect(16,6+i*2,7,1,'#8a6a4a')}if(f)p.poly([[14,4],[14+(f===1?6:-6),0],[14+(f===1?8:-8),8]],ramp('#fff4dc'),{v:.7})});
   M.ent(R,{x:930,y:FL-6,fr:book,f:0,name:'SPELLBOOK',click(e,R){let k=0;const iv=setInterval(()=>{e.f=1+(k%2);M.snd('swish',2);if(++k>5){clearInterval(iv);e.f=0}},90);M.emit(R,'note',e.x+14,e.y,6,{c:['#c8a0ff','#7af0ff']});M.emit(R,'star',e.x+14,e.y,10);M.say(R,e.x+14,e.y-2,K.pick(['ABRACADABRA','SHAZAM!','LUMOS!']))}});
   // knight armour
   const kn=M.frames(2,22,46,(p,f)=>{const S=ramp('#a8b0c8',6);p.rect(6,30,4,16,S,{v:.5});p.rect(12,30,4,16,S,{v:.45});p.rrect(3,14,16,18,3,S,{v:.6});p.rect(0,15,4,14,S,{v:.5});p.rect(18,15,4,14,S,{v:.45});p.ell(11,8,7,7.5,S,{b:.15,spec:'#ffffff'});if(f){p.rect(6,6,10,4,['#f0c8a0','#d8a880'],{v:.6});p.px(8,7,'#140c1c');p.px(13,7,'#140c1c')}else p.rect(6,7,10,2,'#140c1c');p.rect(9,0,4,3,ramp('#c8302a'),{v:.6})});
   M.ent(R,{x:44,y:FL-10,fr:kn,f:0,name:'SUIT OF ARMOUR',click(e,R){e.f=1;M.snd('creak',1.6);M.say(R,e.x+11,e.y-2,K.pick(['HELLO THERE!','WHO GOES?','ZZZ... OH!']));setTimeout(()=>{e.f=0;M.snd('clang',1.8)},1200)}});
   // torches
   for(let i=0;i<5;i++){const x=133+i*215;M.ent(R,{x:x-4,y:90,w:9,h:18,box:1,name:'TORCH',flare:0,draw(g,X,Y,t,e,sel){g.fillStyle='#4a2e18';g.fillRect(X+3,Y+8,3,10);g.fillStyle='#6a6a7a';g.fillRect(X+1,Y+7,7,2);const fl=M.now<e.flare,h=fl?9:5;for(let j=0;j<h;j++){const w=Math.max(1,Math.round((h-j)*.6+(RM?0:Math.sin(t*12+j+i)*.6)));g.fillStyle=j<2?'#fff4b0':j<4?'#ffc040':'#ff6a20';g.fillRect(X+4-Math.floor(w/2),Y+7-j,w,1)}if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y+19,9,1)}if(!RM&&Math.random()<.1)M.emit(R,'fire',e.x+4,e.y+2,1)},click(e,R){e.flare=M.now+1.5;M.snd('whoosh',1.3);M.emit(R,'fire',e.x+4,e.y,14,{v:1.6})}})}
   // rune circle hotspot
   M.ent(R,{x:420,y:FL+26,w:160,h:30,box:1,name:'RUNE CIRCLE',z:FL+20,draw(){},click(e,R){R.runeA=M.now;M.snd('chime',.7);M.snd('chime',1.4);M.emit(R,'star',500,238,26,{rx:150,ry:30})}});
   K.visitors(R,2,RH-4,['SHINY!','CAN I PULL ONE?','SO MAGICAL','EPIC!'],{off:5})},
  back(R,g,ox,oy,t){const act=M.now-R.runeA<3;for(let i=0;i<48;i++){const a=i/48*TAU+(RM?0:t*.3),x=Math.round(500+Math.cos(a)*72+ox),y=Math.round(238+Math.sin(a)*21+oy),on=act||((i+Math.floor(t*6))%8<2);g.fillStyle=on?(act?'#ffffff':'#8ac8ff'):'#4a4ab0';g.fillRect(x,y,i%4?1:2,1)}
   if(act&&!RM){g.fillStyle='#c8e0ff';for(let j=0;j<40;j++){const x=Math.round(500+(H(j,Math.floor(t*10))-.5)*150+ox),y=Math.round(238-H(j,3)*((M.now-R.runeA)*80)+oy);g.fillRect(x,y,1,2)}}},
  front(R,g){}});
}

/* ================= DOG PARK ================= */
{const GR=170;
 const BREEDS=[{nm:'CORGI',c:'#e0903a',c2:'#fff4e0',bw:20,bh:10,leg:4,ear:'up',tail:'stub',sn:4,pat:'belly',p:1.2},
  {nm:'DALMATIAN',c:'#f4f4f4',c2:'#1a1a22',bw:22,bh:11,leg:10,ear:'flop',tail:'long',sn:5,pat:'spots',p:.9},
  {nm:'GOLDEN RETRIEVER',c:'#e8b050',c2:'#f8d890',bw:24,bh:12,leg:9,ear:'flop',tail:'long',sn:5,pat:'none',p:.85,fluff:1},
  {nm:'PUG',c:'#e0c8a0',c2:'#2a2020',bw:15,bh:10,leg:5,ear:'tiny',tail:'curl',sn:1,pat:'mask',p:1.3},
  {nm:'HUSKY',c:'#6a7488',c2:'#f4f4f8',bw:22,bh:12,leg:9,ear:'up',tail:'curl',sn:5,pat:'husky',p:.9,fluff:1},
  {nm:'DACHSHUND',c:'#8a4a22',c2:'#c87a3a',bw:24,bh:8,leg:3,ear:'flop',tail:'long',sn:6,pat:'none',p:1.25},
  {nm:'POODLE',c:'#f0d8e8',c2:'#ffffff',bw:16,bh:10,leg:10,ear:'flop',tail:'pom',sn:4,pat:'none',p:1.1,fluff:2},
  {nm:'SHIBA INU',c:'#d8783a',c2:'#fff0d8',bw:18,bh:10,leg:7,ear:'up',tail:'curl',sn:4,pat:'belly',p:1.05},
  {nm:'BEAGLE',c:'#c8803a',c2:'#f8f0e0',bw:19,bh:10,leg:7,ear:'flop',tail:'up',sn:4,pat:'saddle',p:1},
  {nm:'BLACK LAB',c:'#2a2630',c2:'#3a3644',bw:23,bh:12,leg:9,ear:'flop',tail:'long',sn:5,pat:'none',p:.8},
  {nm:'CHIHUAHUA',c:'#e8c890',c2:'#fff4e0',bw:11,bh:7,leg:5,ear:'big',tail:'up',sn:2,pat:'none',p:1.6},
  {nm:'GREAT DANE',c:'#5a6070',c2:'#7a8090',bw:28,bh:13,leg:16,ear:'up',tail:'long',sn:6,pat:'none',p:.6}];
 // frames: 0,1 wag | 2,3 walk | 4 sit | 5 bark
 const dogFrames=(b)=>{const W=b.bw+b.sn+16,Hh=b.leg+b.bh+16;return M.frames(6,W,Hh,(p,f)=>{const C=ramp(b.c,6),C2=ramp(b.c2,5),by=Hh-b.leg-Math.ceil(b.bh/2)-1,bx=6+b.bw/2,sit=f===4,bark=f===5;
  const legs=[[bx-b.bw/2+2,0],[bx-b.bw/2+5,1],[bx+b.bw/2-6,0],[bx+b.bw/2-3,1]];
  legs.forEach(([lx,back],k)=>{let off=0;if(f===2)off=k%2?1:-1;if(f===3)off=k%2?-1:1;if(sit&&k<2)return;p.rect(Math.round(lx+off),by+2,3,b.leg+Math.ceil(b.bh/2)-2-(sit?0:0),back?ramp(mix(b.c,'#140c1c',.25),5):C,{v:.5,bv:.15});p.rect(Math.round(lx+off),Hh-2,3,1,back?C[1]:C[2])});
  // tail
  const tx=bx-b.bw/2,ty=by-b.bh/4,wag=f===1?1:f===0?-1:0;
  if(b.tail==='long'){for(let i=0;i<7;i++)p.rect(Math.round(tx-i),Math.round(ty-i*.7+wag*i*.25),2,2,C[3-(i>4?1:0)])}else if(b.tail==='curl'){p.ell(tx-1,ty-3+wag,3,3,C,{b:.1});p.px(tx-1,ty-3+wag,b.c2)}else if(b.tail==='up'){for(let i=0;i<6;i++)p.rect(Math.round(tx-1-i*.3+wag*i*.3),Math.round(ty-i),2,1,C[3]);p.px(tx-2,ty-6,C2[3])}else if(b.tail==='pom'){p.line(tx,ty,tx-2,ty-4+wag,C[3]);p.ell(tx-2,ty-6+wag,2.5,2.5,C2,{b:.2})}else p.rect(tx-2,ty-1+wag,3,2,C[3]);
  // body
  if(sit)p.ell(bx-2,by+1,b.bw/2-1,b.bh/2+2,C,{b:.12});else p.ell(bx,by,b.bw/2,b.bh/2,C,{b:.12,tex:b.fluff?(x,y)=>(x+y)%3===0?.1:0:null});
  if(b.pat==='belly'||b.pat==='husky')p.ell(bx+2,by+b.bh/4,b.bw/2-4,b.bh/4,C2,{b:.2});if(b.pat==='saddle')p.ell(bx-1,by-b.bh/4,b.bw/2-3,b.bh/3,ramp('#2a2026',4),{b:.15});if(b.pat==='spots')for(let i=0;i<6;i++)p.disc(bx-b.bw/2+3+H(i,1)*(b.bw-6),by-b.bh/2+2+H(i,2)*(b.bh-4),1,'#1a1a22');
  // head
  const hx=bx+b.bw/2-1,hy=by-b.bh/2-2-(bark?2:0),hr=Math.max(4,b.bh/2+1);
  p.ell(hx,hy,hr,hr,C,{b:.15,tex:b.fluff===2?(x,y)=>(x+y)%2?.1:0:null});p.rrect(Math.round(hx+hr-2),Math.round(hy-1),b.sn+2,Math.max(3,Math.round(hr*.9)),1,b.pat==='mask'?ramp('#3a2a2a',4):(b.pat==='husky'||b.pat==='belly'?C2:C),{v:.6});
  p.px(hx+hr-1+b.sn+1,hy-1,'#140c1c');p.px(hx+hr+b.sn,hy-1,'#140c1c');p.px(Math.round(hx+1),Math.round(hy-2),'#140c1c');p.px(Math.round(hx+1),Math.round(hy-3),'#ffffff');
  if(b.pat==='husky'){p.px(hx,hy+1,b.c2);p.px(hx+1,hy+1,b.c2);p.px(hx+2,hy,b.c2)}if(b.pat==='spots')p.px(hx-2,hy,'#1a1a22');
  if(bark){p.rect(Math.round(hx+hr-1),Math.round(hy+hr*.6),b.sn+1,2,'#3a0a10');p.px(Math.round(hx+hr),Math.round(hy+hr*.6)+1,'#ff6a8a')}else if(f<2&&b.sn>2){p.rect(Math.round(hx+hr+1),Math.round(hy+hr*.5),2,2+f,'#ff6a8a')}
  // ears
  const ex=hx-1,ey=hy-hr+1;if(b.ear==='up'){p.poly([[ex-2,ey+1],[ex-1,ey-4],[ex+2,ey+1]],C,{v:.6});p.px(ex-1,ey-1,'#ffb0a0')}else if(b.ear==='big'){p.poly([[ex-3,ey+2],[ex-3,ey-5],[ex+2,ey+1]],C,{v:.6});p.px(ex-2,ey-1,'#ffb0a0');p.px(ex-2,ey,'#ffb0a0')}else if(b.ear==='tiny'){p.rect(ex-2,ey,3,2,ramp('#2a2020',4),{v:.5})}else{p.rrect(ex-3,ey,4,Math.round(hr*1.2)+(bark?-1:0),2,b.pat==='spots'?ramp('#1a1a22',4):b.pat==='saddle'?ramp('#8a4a22',5):ramp(mix(b.c,'#140c1c',.2),5),{v:.5})}
 })};
 K.ext('dogs',{start:550,top:'#7ac8f0',bot:'#3a8a2a',
  bg(p,R){const SK=['#4a98d8','#6ab4ea','#8ccaf2','#b4e0f8','#dcf2fc'],G=['#1e5a1a','#2e7a22','#46982e','#64b43a','#8ad04a','#b4e46a'];
   for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c;if(y<GR){c=rp(SK,.15+y/GR*.8,x,y);const cl=fbm(x/50,y/18)-(y/GR)*.3;if(cl>.52&&y<110)c=rp(['#c8dcf0','#e8f2fc','#ffffff'],(cl-.52)*6-((y%30)/30)*.3,x,y)}
    else{const k=(y-GR)/(RH-GR);c=rp(G,.55-k*.25+(vn(x/8,y/4)-.5)*.3+(H(x,y)>.96?.3:0),x,y);const pth=Math.abs(y-(225+Math.sin(x/90)*12));if(pth<9)c=rp(['#a8885a','#c8a870','#e0c890','#f0dcaa'],.5-pth/20+(vn(x/3,y/3)-.5)*.3,x,y)}p.px(x,y,c)}
   // far trees + hills
   for(let x=0;x<R.w;x++){const h=12+Math.floor(vn(x/40,2)*22);for(let y=GR-h;y<GR;y++)p.px(x,y,rp(['#1a4a2a','#2a6a3a','#3a8a4a'],.35+(vn(x/6,y/6)-.5)*.5-(y-GR+h)/h*.1+.2,x,y))}
   // fence
   for(let x=0;x<R.w;x++){for(const y of[GR+2,GR+8])p.px(x,y,rp(ramp('#e8e0d0'),.6,x,y));if(x%12<3)for(let y=GR-4;y<GR+14;y++)p.px(x,y,rp(ramp('#f0e8d8',5),.7-(x%12)*.2,x,y))}
   // big trees
   for(const tx of[60,420,760,1060]){p.rect(tx-5,GR-30,10,52,ramp('#7a4a2a',6),{v:.5,tex:(x,y)=>(y%5===0?-.1:0)});p.ell(tx,GR-50,32,28,ramp('#3a9a3a',6),{b:.05,tex:(x,y)=>(vn(x/5,y/5)-.5)*.5});p.ell(tx-12,GR-62,16,14,ramp('#4aaa3a',6),{b:.15,tex:(x,y)=>(vn(x/4,y/4)-.5)*.4})}
   // pond
   p.ell(900,250,70,14,['#1a4a7a','#2a6aa0','#4a9ad0','#8ad0f0'],{b:.1,tex:(x,y)=>((x+y*3)%11===0?.3:0)});
   // benches
   for(const bx of[250,640]){p.rect(bx,GR+14,40,4,ramp('#a86a3a'),{v:.6});p.rect(bx,GR+6,40,3,ramp('#a86a3a'),{v:.6});p.rect(bx+3,GR+18,3,9,ramp('#3a3a48'),{});p.rect(bx+34,GR+18,3,9,ramp('#3a3a48'),{})}},
  init(R){R.dogs=[];
   BREEDS.forEach((b,i)=>{const fr=dogFrames(b),W=fr[0].w,Hh=fr[0].h;const d=M.ent(R,{fr,f:0,name:b.nm,x:60+i*84+(i%3)*10,y:200+(i%4)*14-Hh,b,vx:(i%2?-1:1)*(10+H(i,4)*12),st:'walk',st_t:2+H(i,5)*4,
    upd(e,dt,t){e.z=e.y+Hh;const ws=RM?0:t;if(M.now<e.barkT){e.f=5;return}
     if(e.st==='fetch'){const bl=R.ball;const tx=bl.held===e?R.home.x:bl.x,ty=bl.held===e?R.home.y:bl.gy;const dx=tx-(e.x+W/2),dy=ty-(e.y+Hh);const d2=Math.hypot(dx,dy);e.flip=dx<0;e.f=2+Math.floor(ws*10)%2;if(d2>3){e.x+=dx/d2*70*dt;e.y+=dy/d2*40*dt}else if(bl.held===e){bl.held=null;bl.x=R.home.x;bl.y=bl.gy=R.home.y;e.st='sit';e.st_t=2;M.snd('woof',b.p);M.emit(R,'heart',e.x+W/2,e.y,4);M.say(R,e.x+W/2,e.y-2,'AGAIN!',1)}else if(bl.landed&&!bl.held){bl.held=e;M.snd('yip',b.p*1.2);R.dogs.forEach(o=>{if(o!==e&&o.st==='fetch'){o.st='walk';o.st_t=1}})}return}
     e.st_t-=dt;if(e.st_t<=0){const r=Math.random();e.st=r<.55?'walk':r<.8?'wag':'sit';e.st_t=1.5+Math.random()*3;if(e.st==='walk')e.vx=(Math.random()<.5?-1:1)*(10+Math.random()*14)}
     if(e.st==='walk'&&!RM){e.x+=e.vx*dt;e.flip=e.vx<0;if(e.x<20||e.x>R.w-W-20){e.vx*=-1;e.x=clamp(e.x,20,R.w-W-20)}e.f=2+Math.floor(ws*8)%2}else if(e.st==='sit')e.f=4;else e.f=Math.floor(ws*(RM?0:8))%2;
     e.y=clamp(e.y,GR+12-Hh+6,RH-Hh-2)},
    click(e,R){e.barkT=M.now+.45;M.snd(b.p>1.3?'yip':'woof',b.p);M.say(R,e.x+W/2,e.y-2,b.p>1.3?'YIP!':b.p<.7?'WOOF!':K.pick(['WOOF!','BARK!','ARF!','RUFF!']),.9);M.emit(R,'heart',e.x+W/2,e.y,3);M.play(e,'hop',.35)}});R.dogs.push(d)});
   // the ball
   R.home={x:540,y:236};const bs=K.spr(7,7,p=>p.ell(3.5,3.5,3.5,3.5,['#5a7a10','#a8d020','#d8f040','#f4ffa0'],{b:.15}));
   R.ball=M.ent(R,{spr:bs,name:'TENNIS BALL',x:R.home.x,y:R.home.y-7,gy:R.home.y,landed:1,held:null,
    upd(e,dt){if(e.held){const d=e.held,W=d.fr[0].w;e.x=d.x+(d.flip?2:W-6);e.y=d.y+d.fr[0].h-d.b.leg-d.b.bh-6;e.z=d.z+1;return}if(!e.landed){e.t+=dt;const q=Math.min(1,e.t/1.1);e.x=lerp(e.x0,e.tx,q);e.y=lerp(e.y0,e.ty,q)-Math.sin(q*Math.PI)*70-7;if(q>=1){e.landed=1;e.gy=e.ty;e.y=e.ty-7;M.snd('boing',1.6);M.emit(R,'dust',e.x+3,e.ty,5)}}else{e.y=e.gy-7}e.z=e.gy},
    click(e,R){if(e.held||!e.landed)return;e.landed=0;e.t=0;e.x0=e.x;e.y0=e.gy;e.tx=clamp(e.x+K.rnd(-320,320),40,R.w-60);e.ty=K.rnd(200,262);M.snd('swish',1);
     const near=R.dogs.slice().sort((a,b)=>Math.abs(a.x-e.tx)-Math.abs(b.x-e.tx)).slice(0,3);near.forEach(d=>{d.st='fetch';M.say(R,d.x+10,d.y-2,'!',.6)});R.home.x=clamp(e.x0,40,R.w-60);R.home.y=e.y0}});
   // fire hydrant
   M.ent(R,{x:330,y:GR+30,spr:K.spr(12,18,p=>{const Rd=ramp('#d8302a',6);p.rrect(2,3,8,15,2,Rd,{v:.55});p.rect(0,7,12,3,Rd,{v:.5});p.ell(6,3,4,3,Rd,{b:.2});p.rect(1,16,10,2,Rd,{v:.4})}),name:'FIRE HYDRANT',react:'jiggle',click(e,R){M.react(R,e);M.snd('splash',.8);M.emit(R,'water',e.x+6,e.y+4,40,{dir:-Math.PI/2,spread:.9,v:1.3});R.dogs.forEach(d=>{if(Math.abs(d.x-e.x)<120){d.barkT=M.now+.4;M.snd('yip',d.b.p)}})}});
   // doghouse with sleepy pup
   const dh=M.frames(2,40,36,(p,f)=>{p.poly([[0,14],[20,0],[40,14]],ramp('#c83a2a',6),{v:.6});p.rect(3,14,34,22,ramp('#e0a860',6),{v:.55,tex:(x,y)=>(y%5===0?-.12:0)});p.rrect(13,20,14,16,6,['#140c1c','#24141c'],{bv:0});if(f){p.ell(20,30,5,4,ramp('#8a5a3a'),{b:.15});p.px(18,29,'#140c1c');p.px(22,29,'#140c1c');p.rect(19,31,3,1,'#140c1c')}p.rect(14,6,12,6,ramp('#f4ecdc'),{v:.6});M.ftext(p,'REX',15,6,'#6a2a1a')});
   M.ent(R,{x:150,y:GR+18,fr:dh,f:0,name:'DOGHOUSE',upd(e){if(!RM&&M.now>e.zz){e.zz=M.now+1.4;M.emit(R,'zzz',e.x+24,e.y+18,1)}},zz:0,click(e,R){e.f=1;M.snd('yip',.9);M.say(R,e.x+20,e.y,'*YAWN*',1.2);setTimeout(()=>e.f=0,1600)}});
   // treat jar
   M.ent(R,{x:690,y:GR+16,spr:K.spr(16,20,p=>{p.rrect(1,4,14,16,3,['#5a7a8a','#8ab0c0','#c8e8f0','#ffffff'],{v:.5,bv:.3});p.rect(2,1,12,4,ramp('#c83a2a'),{v:.6});for(let i=0;i<6;i++)p.rect(3+(i%3)*4,9+Math.floor(i/3)*5,3,2,ramp('#a8703a'),{v:.6})}),name:'TREAT JAR',react:'hop',click(e,R){M.react(R,e);M.snd('crunch',1.2);M.emit(R,'crumb',e.x+8,e.y,16,{v:1.2});R.dogs.forEach(d=>{if(d.st!=='fetch'){d.st='sit';d.st_t=2.5}});M.say(R,e.x+8,e.y-2,'SIT!',1)}});
   // butterflies
   const bf=M.frames(2,7,5,(p,f)=>{const c=['#ff8ad8','#ffffff'];if(f){p.rect(0,0,3,3,c[0]);p.rect(4,0,3,3,c[0])}else{p.rect(1,1,2,2,c[0]);p.rect(4,1,2,2,c[0])}p.rect(3,0,1,5,'#3a2a3a')});
   for(let i=0;i<4;i++)M.ent(R,{fr:bf,fps:8,name:'BUTTERFLY',x:200+i*230,y:150,hx:200+i*230,upd(e,dt,t){if(RM)return;e.x=e.hx+Math.sin(t*.7+i*3)*60;e.y=150+Math.sin(t*1.9+i)*18+(e.flee?-40:0)},click(e,R){e.hx+=K.rnd(-100,100);M.snd('chime',2);M.emit(R,'star',e.x+3,e.y+2,6)}});
   // squirrel in the tree
   const sq=M.frames(2,12,10,(p,f)=>{const S=ramp('#a86a3a');p.ell(5,6,4,3,S,{b:.1});p.ell(8,3,2.5,2.5,S,{b:.15});p.px(9,2,'#140c1c');p.ell(1,f?3:4,2.5,4,ramp('#c88a4a'),{b:.2})});
   M.ent(R,{fr:sq,fps:3,name:'SQUIRREL',x:428,y:GR-46,hx:428,run:0,upd(e,dt){if(e.run){e.run+=dt;e.x=e.hx+e.run*140;e.y=GR-46+Math.abs(Math.sin(e.run*12))*-4+(e.run>.6?e.run*40:0);if(e.run>3){e.run=0;e.x=e.hx;e.y=GR-46;e.fl=M.now}}},click(e,R){if(e.run)return;e.run=.01;M.snd('yip',2.2);M.say(R,e.x+6,e.y-2,'NUTS!',.8);R.dogs.forEach(d=>{d.barkT=M.now+.6+Math.random()*.4});setTimeout(()=>M.snd('woof',1),150);setTimeout(()=>M.snd('yip',1.4),330)}});
   K.visitors(R,2,RH-2,['GOOD BOY!','SO FLUFFY!','CAN I PET?','PUPPIES!'],{off:0})}});
}
})();
