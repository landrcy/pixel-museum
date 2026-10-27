/* Shared room kit + Landry's site rooms (part 1): Landrcyverse, The Void, Sea of Thought */
(()=>{'use strict';
const{ramp,rp,vn,fbm,H,bay,TAU,RM,mix,clamp,lerp,RH}=M,P=window.PLANETS;
const K=M.K={};
K.ext=(id,o)=>Object.assign(M.defs[id],o);
K.open=url=>{try{window.open(url,'_blank','noopener')}catch(e){}};
K.rnd=(a,b)=>a+Math.random()*(b-a);
K.pick=a=>a[(Math.random()*a.length)|0];
// starfield + nebula backdrop painted straight into the room bg
K.space=(p,w,h,o={})=>{const pal=o.pal||['#03020a','#07051a','#0d0a26','#151034'],neb=o.neb||['#151034','#2a1650','#4a2066','#7a2c72','#b0507a'],sd=o.seed||1,amt=o.amt??.5;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){let c=rp(pal,.15+y/h*.6+(vn(x/90+sd,y/70)-.5)*.3,x,y);const n=fbm(x/70+sd*7,y/45+sd)*(.6+.4*vn(x/200+sd,3))+(amt-.5)*.4;if(n>.5)c=rp(neb,(n-.5)*3.2,x,y);p.px(x,y,c)}
 const ns=Math.round(w*h/(o.sparse||260));for(let i=0;i<ns;i++){const x=Math.floor(H(i,sd)*w),y=Math.floor(H(i,sd+11)*h),b=H(i,sd+23);
  if(b>.985){const c=b>.993?'#fff4d8':'#bcd8ff';p.px(x,y,'#ffffff');p.px(x-1,y,c);p.px(x+1,y,c);p.px(x,y-1,c);p.px(x,y+1,c)}else p.px(x,y,b>.8?'#ffffff':b>.5?'#a8a0d0':'#5a5490')}};
// observatory balcony: brass rail + dark tiled floor
K.rail=(p,w,y0,o={})=>{const G=['#3a2008','#6a4210','#a87020','#e0a838','#ffe08a'],F=o.floor||['#0a0812','#141020','#1e1830','#2a2240','#3a3050'];
 for(let y=y0+12;y<RH;y++)for(let x=0;x<w;x++){const k=(y-y0-12)/(RH-y0-12),tile=((Math.floor(x/(20+k*10))+Math.floor((y-y0)/8))&1);p.px(x,y,rp(F,.25+k*.35+(tile?.12:0)+((y-y0-12)%8===0?-.15:0),x,y))}
 for(let x=0;x<w;x++){p.px(x,y0,rp(G,.85,x,y0));p.px(x,y0+1,rp(G,.55,x,y0));p.px(x,y0+2,rp(G,.25,x,y0));p.px(x,y0+11,rp(G,.6,x,y0));p.px(x,y0+12,'#140c1c');
  if(x%8===4)for(let y=y0+3;y<y0+11;y++)p.px(x,y,rp(G,.45,x,y));if(x%48===0)for(let y=y0-3;y<y0+12;y++)for(let i=-1;i<=1;i++)p.px(x+i,y,rp(G,.75-i*.3,x+i,y))}};
// a planet painter as a live entity (drawn 1:1, repainted on a timer)
K.planet=(R,o)=>{const w=o.w,h=o.h||o.w,S=P.mk(w,h);P[o.paint](S,1,o.arg?o.arg(null):undefined);const sp=M.fromCanvas(S.c);
 const e=M.ent(R,Object.assign({x:Math.round(o.x-w/2),y:Math.round(o.y-h/2),w,h,S,sp,pt:H(w,h)*50,spd:1,hitR:o.hitR||Math.min(w,h)*.42,next:0,name:o.name,z:o.z,
  draw(g,x,y,t,e,sel){if(M.now>=e.next){P[o.paint](S,RM?3:e.pt,o.arg?o.arg(e,sel):undefined);e.next=M.now+(o.dt||.07)}if(sel)g.drawImage(M.ring(sp),x-1,y-1);g.drawImage(S.c,x,y)}},o.e||{}));
 const u=e.upd;e.upd=(e,dt,t,R)=>{e.pt+=dt*e.spd*(RM?0:1);u&&u(e,dt,t,R)};return e};
// wooden signpost that links out
K.sign=(R,x,yb,label,url,name,o={})=>{const W=M.tw(label)+12,Hh=30,col=o.col||'#8a5a2a';
 const spr=M.mk(W+2,Hh,p=>{p.rect(Math.floor(W/2)-1,12,3,Hh-12,ramp('#6a4220'),{v:.5});p.rrect(0,0,W+1,14,2,ramp(col,6),{v:.6,tex:(x,y)=>((y*7+(x>>3))%5===0?-.12:0)});p.rect(2,2,W-3,10,ramp(mix(col,'#140c1c',.35)),{v:.4,bv:-.2});M.ftext(p,label,6,3,'#fff0c0','#3a2010');p.px(1,1,'#ffe08a');p.px(W-1,1,'#ffe08a')});
 return M.ent(R,{x:Math.round(x-spr.w/2),y:yb-Hh,spr,name,z:yb,react:'jiggle',click(e,R){M.react(R,e);M.snd('coin');M.emit(R,'star',e.x+e.w/2,e.y+6,12);setTimeout(()=>K.open(url),160)}})};
// strolling visitors
const PEOPLE=[{skin:0,hair:'#2a1a10',shirt:'#c84a3a',pants:'#2a3a5a'},{skin:2,hair:'#e8c060',shirt:'#3a8a5a',pants:'#3a2a20'},{skin:1,hair:'#1a1010',shirt:'#6a4aa8',pants:'#1a1a2a'},{skin:3,hair:'#4a2a1a',shirt:'#e0a030',pants:'#2a4a6a',dress:1},{skin:2,hair:'#8a3a1a',shirt:'#3a6ab8',pants:'#4a4a4a'},{skin:1,hair:'#d8d0c0',shirt:'#a83a6a',pants:'#3a3a4a'}];
K.visitors=(R,n,yb,lines,o={})=>{const out=[];for(let i=0;i<n;i++){const pe=PEOPLE[(i+(o.off||0))%PEOPLE.length],fr=M.person(pe);
 out.push(M.ent(R,{name:'VISITOR',x:60+((i+.5)/n)*(R.w-140),y:yb-28+(i%2)*4,fr,vx:(i%2?1:-1)*(9+i*2),pause:0,
  upd(e,dt,t){e.z=e.y+28;if(M.now<e.wv){e.f=5;return}if(RM){e.f=4;return}if(e.pause>0){e.pause-=dt;e.f=4;return}e.x+=e.vx*dt;e.flip=e.vx<0;e.f=Math.floor(t*6+e.t0)%4;if(e.x<20||e.x>R.w-34){e.vx*=-1;e.x=clamp(e.x,20,R.w-34)}if(Math.random()<dt*.1)e.pause=1+Math.random()*2.5},
  click(e,R){e.wv=M.now+1.1;M.snd('blip',1.2+i*.1);M.say(R,e.x+7,e.y-2,K.pick(lines));M.emit(R,'heart',e.x+7,e.y,2)}}))}return out};
// little comet with a dithered tail (front layer)
K.comet=(R,x,y,dx,dy,c)=>{(R.comets||(R.comets=[])).push({x,y,dx,dy,t0:M.now,c:c||['#ffffff','#bcecff','#6ab0ff','#3a5aa0']});M.snd('whoosh',1.4)};
K.drawComets=(R,g,ox,oy)=>{if(!R.comets)return;R.comets=R.comets.filter(c=>M.now-c.t0<1.6);for(const c of R.comets){const a=M.now-c.t0;for(let k=18;k>=0;k--){const tt=Math.max(0,a-k*.012),x=Math.round(c.x+c.dx*tt+ox),y=Math.round(c.y+c.dy*tt+oy);if(k>2&&bay(x,y)>1-k/22)continue;g.fillStyle=c.c[Math.min(3,k>>2)];g.fillRect(x,y,1,1)}g.fillStyle='#ffffff';const hx=Math.round(c.x+c.dx*a+ox),hy=Math.round(c.y+c.dy*a+oy);g.fillRect(hx,hy,2,2)}};
// generic helpers
K.spr=(w,h,fn,ol)=>M.mk(w,h,fn,ol);
K.flash=(R,col='#ffffff',d=.15)=>{R.fx=R.fx||{};R.fx.flash={t0:M.now,col,d}};
K.drawFlash=(R,g)=>{const f=R.fx&&R.fx.flash;if(!f)return;const a=(M.now-f.t0)/f.d;if(a>=1||RM){R.fx.flash=null;return}g.fillStyle=f.col;const k=Math.round((1-a)*10);for(let y=0;y<M.BH;y+=1)for(let x=(y&1);x<M.BW;x+=2)if(bay(x,y)*10<k){g.fillRect(x,y,1,1)}};
K.shake=(R,d=.35,a=2)=>{R.shk={t0:M.now,d,a}};
K.shk=(R)=>{const s=R.shk;if(!s||RM)return 0;const p=(M.now-s.t0)/s.d;if(p>=1){R.shk=null;return 0}return Math.round(Math.sin(p*60)*s.a*(1-p))};

/* ================= LANDRCYVERSE: the solar system hub ================= */
{const SX=550,SY=116,SQ=.22;
 const BODIES=[{paint:'satellite',w:34,h:21,rx:108,name:'ARCHIVE SATELLITE',snd:'beep'},{paint:'void',w:60,rx:156,name:'THE VOID',snd:'rumble'},{paint:'sea',w:30,rx:212,name:'SEA OF THOUGHT',snd:'splash'},
  {paint:'ashaad',w:32,h:29,rx:272,name:'THE BINDING OF ASHAAD',snd:'creak',open:1},{paint:'yt',w:30,rx:338,name:'LLC POWERED CHANNELS',snd:'beep',moons:1},{paint:'arena',w:50,h:40,rx:414,name:'BALL ARENA',snd:'ding'},{paint:'crest',w:34,h:27,rx:482,name:'COOPER CITY',snd:'tada'}];
 const CH=[['LANGRINO','battle'],['CLUTCHCLIPS','mc'],['BOWLFULOFTRIVIA','cosmic'],['REDDITSTORYADAY','fire'],['SAT IN A MINUTE','chalk']];
 K.ext('hub',{start:550,top:'#03020a',bot:'#0a0812',
  bg(p,R){K.space(p,R.w,RH,{seed:3,amt:.55});
   for(let i=0;i<1400;i++){const r=Math.pow(H(i,9),.8)*44,arm=(i%3)*TAU/3,ang=arm+r*.11+(H(i,12)-.5)*.5,x=140+Math.cos(ang)*r,y=58+Math.sin(ang)*r*.42,k=r/44;p.px(x,y,k<.15?'#fff4d8':k<.45?(H(i,4)>.5?'#e8d0ff':'#c8a8ff'):H(i,5)>.6?'#7a5ac8':'#4a3a8a')}
   for(let i=0;i<9;i++)p.px(140+i-4,58,'#ffffff');
   for(const b of BODIES){const n=Math.round(b.rx*5);for(let k=0;k<n;k++){if(k%4)continue;const a=k/n*TAU;p.px(SX+Math.cos(a)*b.rx,SY+Math.sin(a)*b.rx*SQ,Math.sin(a)>0?'#3a3470':'#262250')}}
   K.rail(p,R.w,236)},
  init(R){
   const sun=K.planet(R,{paint:'sun',w:112,x:SX,y:SY,name:'THE SUN',z:SY,hitR:34,dt:.06,arg:e=>({ign:1,fl:e?1+e.flare:1,L:e?Math.floor(e.Lr*8)/8:1}),
    e:{flare:0,Lr:1,upd(e,dt){e.flare=Math.max(0,e.flare-dt*.9);if(e.Lr<1)e.Lr=Math.min(1,e.Lr+dt*.9)},
     click(e,R){e.flare=1.6;e.Lr=0;M.snd('chime',.8);M.snd('rumble',1.3);M.emit(R,'star',SX,SY,26,{v:2.2});M.emit(R,'fire',SX,SY,20,{v:3});K.flash(R,'#fff0c0',.25)}}});
   R.bodies=BODIES.map((b,i)=>{const a0=i*1.7+.4,e=K.planet(R,{paint:b.paint,w:b.w,h:b.h,x:SX,y:SY,name:b.name,dt:b.paint==='void'?.09:.07,arg:b.open?(e,sel)=>({open:e&&(sel||M.now<e.boostT)?1:0}):undefined,
     e:{a:a0,rx:b.rx,boost:0,boostT:0,w0:.55*Math.pow(108/b.rx,1.5),
      upd(e,dt){e.boost=Math.max(0,e.boost-dt*.7);e.a+=dt*(RM?0:e.w0*.5)+dt*e.boost*2.4;const cx=SX+Math.cos(e.a)*e.rx,cy=SY+Math.sin(e.a)*e.rx*SQ;e.x=Math.round(cx-e.w/2);e.y=Math.round(cy-e.h/2);e.z=cy;e.spd=1+e.boost*4},
      click(e,R){e.boost=1.4;e.boostT=M.now+2;M.snd(b.snd,1.1);M.snd('whoosh',1.2);M.emit(R,'star',e.x+e.w/2,e.y+e.h/2,14)}}});
    if(b.moons)e.moons=CH.map(([nm,kind],j)=>K.planet(R,{paint:'moon',w:11,x:0,y:0,arg:()=>kind,name:nm,dt:.1,hitR:6,e:{j,upd(m,dt,t){const ang=t*(RM?0:.8)+j*TAU/5+e.boost*3,cx=e.x+e.w/2+Math.cos(ang)*24,cy=e.y+e.h/2+Math.sin(ang)*8;m.x=Math.round(cx-5.5);m.y=Math.round(cy-5.5);m.z=e.z+Math.sin(ang)*2},
     click(m,R){M.snd('blip',1.4+j*.1);M.emit(R,'note',m.x+5,m.y,3);M.say(R,m.x+5,m.y-2,nm)}}}));
    return e});
   // telescope
   const tel=M.frames(3,26,34,(p,f)=>{const L=ramp('#b08a4a',6),T=ramp('#3a4a8a',6);p.line(13,20,5,33,'#5a3a1a');p.line(13,20,21,33,'#5a3a1a');p.line(13,20,13,33,'#7a5228');p.line(14,20,14,33,'#4a2a10');
    const ang=[-.55,-.85,-1.15][f],cx=13,cy=18;for(let k=-11;k<=9;k++){const x=cx+Math.cos(ang)*k,y=cy+Math.sin(ang)*k,r=k>5?3:k<-6?1.6:2.3;p.disc(x,y,r,null);p.ell(x,y,r,r,k>5?L:T,{b:.1})}p.ell(cx,cy,3,3,L,{b:.2,spec:'#fff4d8'})});
   M.ent(R,{x:70,y:208,fr:tel,f:0,name:'TELESCOPE',react:'jiggle',click(e,R){M.react(R,e);e.f=(e.f+1)%3;M.snd('creak',1.6);const sx=40+Math.random()*120,sy=12+Math.random()*80;(R.found=R.found||[]).push([sx,sy,M.now]);M.emit(R,'star',sx,sy,8);M.say(R,e.x+13,e.y-2,K.pick(['NEW STAR!','A COMET!','WHOA!','I SEE IT!']))}});
   K.sign(R,1030,250,'VISIT >','https://landrcy.github.io/','OPEN THE REAL LANDRCYVERSE');
   K.visitors(R,3,262,['SO MANY PLANETS!','LOOK, THE VOID!','PRETTY!','IS THAT THE SUN?']);
   R.belt=Array.from({length:90},(_,i)=>({a:H(i,1)*TAU,r:372+H(i,2)*16,c:H(i,3)>.6?'#a08a6a':H(i,3)>.3?'#6a5a4a':'#4a3e36'}))},
  tap(R,x,y){if(y<230)K.comet(R,x,y,-130,48)},
  upd(R,dt,t){if(!RM&&Math.random()<dt*.12)K.comet(R,R.cam.x+M.BW+10,10+Math.random()*60,-150,40)},
  back(R,g,ox,oy,t){for(const b of R.belt){const a=b.a+t*(RM?0:.06),x=Math.round(SX+Math.cos(a)*b.r+ox),y=Math.round(SY+Math.sin(a)*b.r*SQ+oy);g.fillStyle=b.c;g.fillRect(x,y,1,1)}
   if(R.found)for(const[sx,sy,t0]of R.found){const tw=Math.sin(t*3+sx)>0;g.fillStyle='#fff6c0';g.fillRect(sx+ox,sy+oy,1,1);if(tw){g.fillRect(sx-1+ox,sy+oy,3,1);g.fillRect(sx+ox,sy-1+oy,1,3)}}},
  front(R,g,ox,oy){K.drawComets(R,g,ox,oy);K.drawFlash(R,g)}});
}

/* ================= THE VOID: feed it things ================= */
{const VX=450,VY=120,VW=228;
 const JUNK={
  rock:p=>{p.ell(8,7,7,6,ramp('#7a6a5a',6),{b:.05,tex:(x,y)=>(vn(x*.7,y*.7)-.5)*.5});p.px(5,5,'#3a2e28');p.px(10,9,'#3a2e28')},
  duck:p=>{const Y=ramp('#ffd030');p.ell(8,10,7,5,Y,{b:.1});p.ell(10,5,4,4,Y,{b:.15});p.rect(13,5,3,2,ramp('#ff8a20'),{v:.6});p.px(11,4,'#140c1c')},
  astro:p=>{const W2=ramp('#e8e8f0',6);p.rrect(3,9,10,10,3,W2,{v:.6});p.ell(8,6,5,5,W2,{b:.1});p.ell(8,6,3.2,2.6,['#1a2a4a','#3a6ab0','#a8d8ff'],{b:.1,spec:'#ffffff'});p.rect(1,10,3,6,W2,{v:.4});p.rect(12,10,3,6,W2,{v:.5});p.rect(5,14,6,2,'#d84a3a')},
  tv:p=>{p.rrect(1,3,16,12,2,ramp('#8a5a3a'),{v:.5});p.rect(3,5,10,8,['#1a3a2a','#3a8a5a','#8af0a0'],{v:.5});p.line(6,0,8,3,'#a8a8b0');p.line(12,0,10,3,'#a8a8b0');p.px(15,7,'#ffd040');p.px(15,10,'#ffd040')},
  sock:p=>{const S=ramp('#e84a6a');p.rect(5,1,6,10,S,{v:.6,tex:(x,y)=>y%4<2?.25:0});p.rrect(3,8,12,6,3,S,{v:.5})},
  cup:p=>{p.rrect(2,4,11,9,3,ramp('#f0f0f8',6),{v:.6});p.rect(13,6,3,4,ramp('#f0f0f8',6),{v:.5});p.clr(14,7);p.clr(14,8);p.rect(3,4,9,2,['#6a3a1a','#a86a3a'],{});p.rect(1,13,14,2,ramp('#c8c8d8'),{v:.5})},
  ship:p=>{p.poly([[1,8],[12,3],[18,8],[12,13]],ramp('#c8d0e0',6),{v:.6});p.ell(11,8,3,2.5,['#1a3a6a','#4a9ae0','#c8f0ff'],{b:.1});p.poly([[2,8],[0,4],[5,6]],ramp('#d83a3a'),{});p.poly([[2,8],[0,12],[5,10]],ramp('#d83a3a'),{})},
  cassette:p=>{p.rrect(1,3,16,10,1,ramp('#3a3a4a'),{v:.5});p.rect(3,5,12,4,ramp('#e8d8b0'),{v:.6});p.disc(6,7,1.6,'#140c1c');p.disc(12,7,1.6,'#140c1c');p.rect(5,10,8,2,'#6a6a7a')},
  chair:p=>{const C=ramp('#a86a3a');p.rect(3,1,3,15,C,{v:.5});p.rect(3,8,12,3,C,{v:.6});p.rect(12,10,3,6,C,{v:.4});p.rect(4,10,2,6,C,{v:.4})},
  pizza:p=>{p.poly([[1,2],[16,2],[8,16]],ramp('#f0c040'),{v:.6});p.rect(1,1,16,2,ramp('#c8803a'),{v:.6});[[5,5],[10,6],[8,10]].forEach(([x,y])=>p.disc(x,y,1.4,'#c8302a'))}};
 const NAMES={rock:'SPACE ROCK',duck:'RUBBER DUCK',astro:'LOST ASTRONAUT',tv:'OLD TV',sock:'LONELY SOCK',cup:'TEACUP',ship:'TINY ROCKET',cassette:'MIXTAPE',chair:'FLOATING CHAIR',pizza:'PIZZA SLICE'};
 K.ext('void',{start:450,top:'#020106',bot:'#0a0812',
  bg(p,R){K.space(p,R.w,RH,{seed:7,pal:['#020106','#05020c','#0a0418','#120624'],neb:['#120624','#2a0c40','#4a1060','#7a1a7a','#b0308a'],amt:.45,sparse:200});K.rail(p,R.w,238,{floor:['#06040a','#0e0818','#180e28','#24163a','#322050']})},
  init(R){R.vs=P.mk(VW,VW);R.vrow=0;P.void(R.vs,1,{});
   R.hole=M.ent(R,{x:VX-14,y:VY-14,w:28,h:28,hitR:14,name:'THE VOID',z:-1,draw(){},click(e,R){M.snd('rumble',.8);K.shake(R,.5,2);R.pulse=M.now;M.emit(R,'ink',VX,VY,14,{v:2})}});
   const ks=Object.keys(JUNK);ks.forEach((k,i)=>{const spr=K.spr(18,18,JUNK[k]);const a=i/ks.length*TAU+.3,r=150+(i%3)*70;const hx=VX+Math.cos(a)*r*1.25,hy=clamp(VY+Math.sin(a)*r*.42,18,200);
    M.ent(R,{spr,name:NAMES[k],x:hx,y:hy,hx,hy,idle:'float',ba:3,bx:2,state:0,
     upd(e,dt,t){if(e.state===1){e.p+=dt/1.6;const q=Math.min(1,e.p),r=e.r0*(1-Math.pow(q,1.4)),a=e.a0+q*q*7;e.x=VX+Math.cos(a)*r*1.1-9;e.y=VY+Math.sin(a)*r*.55-9;if(!RM&&Math.random()<.5)M.emit(R,'ink',e.x+9,e.y+9,1,{v:.2});if(r<12){e.state=2;e.vis=0;e.back=M.now+3.5;R.pulse=M.now;M.snd('rumble',1.4);M.emit(R,'star',VX,VY,16,{v:1.6});M.emit(R,'ink',VX,VY,10,{v:2});K.shake(R,.4,1);R.eaten=(R.eaten||0)+1;M.say(R,VX,VY-30,K.pick(['NOM.','GONE!','*GULP*','MORE?','DELICIOUS']))}}
      else if(e.state===2&&M.now>e.back){e.state=0;e.vis=1;e.x=e.hx;e.y=e.hy;e.fl=M.now;M.snd('pop',1.2);M.emit(R,'star',e.x+9,e.y+9,8)}},
     click(e,R){if(e.state)return;e.state=1;e.p=0;const dx=e.x+9-VX,dy=(e.y+9-VY)/.55;e.r0=Math.hypot(dx/1.1,dy);e.a0=Math.atan2(dy,dx/1.1);e.idle=null;e.fl=M.now;M.snd('whoosh',.8);M.say(R,e.x+9,e.y-2,'AAAH!',.8)},
     });});
   // star streams spiralling inward
   R.dust=Array.from({length:110},(_,i)=>({a:H(i,1)*TAU,r:60+H(i,2)*330,c:H(i,3)>.7?'#f0c8ff':H(i,3)>.35?'#a060d0':'#5a3090'}));
   K.sign(R,820,252,'VISIT >','https://landrcy.github.io/the-void/','OPEN THE VOID');
   K.visitors(R,2,264,['IT STARES BACK','SO DARK...','HOLD MY HAND','WHERE DID IT GO?'],{off:2})},
  back(R,g,ox,oy,t){const sk=K.shk(R);for(const d of R.dust){if(!RM){d.r-=(12+800/d.r)*.016;d.a+=(30/d.r)*.016;if(d.r<18){d.r=330+Math.random()*60;d.a=Math.random()*TAU}}const x=Math.round(VX+Math.cos(d.a)*d.r*1.15+ox+sk),y=Math.round(VY+Math.sin(d.a)*d.r*.5+oy);g.fillStyle=d.c;g.fillRect(x,y,1,1)}
   // repaint a third of the void each frame (it is big)
   if(!RM||!R.vok){const n=Math.ceil(VW/3),y0=R.vrow*n;P.void(R.vs,RM?3:t,{y0,y1:y0+n});R.vrow=(R.vrow+1)%3;R.vok=1}
   g.drawImage(R.vs.c,Math.round(VX-VW/2+ox+sk),Math.round(VY-VW/2+oy));
   if(R.pulse&&M.now-R.pulse<.6&&!RM){const k=(M.now-R.pulse)/.6,r=20+k*90;g.fillStyle='#e0a0ff';for(let i=0;i<90;i++){const a=i/90*TAU;if(bay(i,3)>1-k)continue;g.fillRect(Math.round(VX+Math.cos(a)*r*1.2+ox),Math.round(VY+Math.sin(a)*r*.55+oy),1,1)}}},
  ui(R,g){if(R.eaten){const T=M.txt('EATEN: '+R.eaten,'#e0b0ff',null);M.frame(M.BW/2-T.w/2-6,M.BH-19,T.w+12,15,{c:['#140c1c','#2a1440','#9030b8','#120624']});g.drawImage(T.c,M.BW/2-T.w/2,M.BH-15)}},
  front(R,g){K.drawFlash(R,g)}});
}

/* ================= SEA OF THOUGHT: messages in bottles at night ================= */
{const WL=150,MSG=['YOU MATTER','KEEP GOING','HELLO, STRANGER','BE KIND TODAY','DRINK WATER','YOU GOT THIS','SMILE :)','THE SEA LISTENS','STAY CURIOUS','CALL A FRIEND'];
 const SEA=['#04112a','#0a2a5a','#11508a','#1f82b8','#4cb8dc','#a6e6f4'];
 K.ext('sea',{start:500,top:'#060a20',bot:'#04112a',
  bg(p,R){const SK=['#060a20','#0c1436','#16224e','#243266','#3a4a7a','#5a6a8e'];
   for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c;if(y<WL){c=rp(SK,.05+y/WL*.75+(vn(x/80,y/30)-.5)*.12,x,y);const au=Math.sin(x/70+Math.sin(x/33)*1.5)*14+50;if(Math.abs(y-au)<14*vn(x/40,2)&&y<WL-20)c=rp(['#16224e','#1a4a5a','#2a8a7a','#5ad0a0'],.9-Math.abs(y-au)/14+(vn(x/9,y/5)-.5)*.4,x,y)}
    else{const k=(y-WL)/(RH-WL);c=rp(SEA,.62-k*.5+(vn(x/30,y/4)-.5)*.18,x,y);if(Math.abs(x-150)<(8+k*40)*vn(y/2,x/30)&&bay(x,y)>.4)c=rp(SEA,.85,x,y)}p.px(x,y,c)}
   for(let i=0;i<R.w*.5;i++){const x=Math.floor(H(i,4)*R.w),y=Math.floor(H(i,5)*(WL-30));p.px(x,y,H(i,6)>.9?'#ffffff':'#8a9ac8')}
   // distant islands
   for(let x=0;x<R.w;x++){const h=Math.max(0,(vn(x/50,8)-.55)*40);for(let y=WL-Math.round(h);y<WL;y++)p.px(x,y,rp(['#04081a','#0a1230','#141e44'],.4-(WL-y)/40,x,y))}
   // lighthouse rock + tower (left)
   p.ell(90,WL+16,70,24,ramp('#3a3a4a',6),{b:-.05,tex:(x,y)=>(vn(x/4,y/4)-.5)*.5,clip:(x,y)=>y<WL+30});
   for(let y=42;y<WL+2;y++){const k=(y-42)/(WL-40),hw=Math.round(7+k*7);for(let x=90-hw;x<=90+hw;x++){const band=Math.floor((y-42)/14)%2;p.px(x,y,rp(band?['#5a1a1a','#a02a2a','#e04a3a','#ff8a6a']:['#5a5a6a','#a8a8b8','#e8e8f0','#ffffff'],.75-(x-90+hw)/(2*hw)*.6,x,y))}p.px(90-hw-1,y,'#140c1c');p.px(90+hw+1,y,'#140c1c')}
   p.rect(80,28,21,14,['#1a1a2a','#2a2a3a'],{bv:0});p.rect(82,30,17,10,['#ffe080','#fff6c0'],{v:.6,bv:0});p.poly([[78,28],[90,16],[102,28]],ramp('#c83a2a'),{});p.rect(76,40,29,3,ramp('#3a3a4a'),{v:.5});p.px(90,14,'#ffd040');
   // dock (right)
   for(let x=860;x<R.w;x++){for(let y=WL+38;y<WL+46;y++)p.px(x,y,rp(ramp('#8a5a2a'),.6-(y-WL-38)/12+(x%14===0?-.3:0),x,y));if(x%28===0)for(let y=WL+46;y<RH;y++)for(let i=0;i<3;i++)p.px(x+i,y,rp(ramp('#5a3a1a'),.7-i*.25-(y-WL)/200,x+i,y))}},
  init(R){
   R.sea=K.planet(R,{paint:'sea',w:50,x:640,y:46,name:'SEA OF THOUGHT',dt:.08,hitR:20,z:-5,e:{click(e,R){e.spd=6;setTimeout(()=>e.spd=1,900);M.snd('splash',1.4);M.emit(R,'bubble',640,46,14,{v:1.5});M.emit(R,'water',640,52,10)}}});
   // bottles
   const bot=(i)=>K.spr(10,18,p=>{const G=[['#0a2a22','#1a5444','#2e8a6c','#6ad0a8','#c8ffe8'],['#2a1a0a','#5a3a14','#9a6a2a','#d8a85a','#ffe8b8'],['#0a1a3a','#1a3a6a','#3a6ab0','#7ab0f0','#d0e8ff']][i%3];p.rrect(1,6,8,11,3,G,{v:.5});p.rect(3,1,4,6,G,{v:.55});p.rect(3,0,4,2,ramp('#a06a3a'),{v:.6});p.rect(3,9,4,5,ramp('#f0e0b0'),{v:.6});p.px(2,8,'#ffffff');p.px(2,9,'#ffffff')});
   for(let i=0;i<9;i++){const bx=230+i*68+(i%2)*18,by=WL+14+(i%3)*22;M.ent(R,{spr:bot(i),name:'MESSAGE IN A BOTTLE',x:bx,y:by,by,ph:i*1.3,z:by+18,
    upd(e,dt,t){if(e.sink){e.sink+=dt;e.y=e.by+Math.min(20,e.sink*24);if(e.sink>3){e.sink=0;e.fl=M.now;M.emit(R,'water',e.x+5,e.by+6,8)}}else e.y=e.by+Math.round(Math.sin(t*1.6+e.ph)*(RM?0:1.6))},
    click(e,R){if(e.sink)return;M.snd('pop',1.3);M.snd('chime',1.1);M.emit(R,'water',e.x+5,e.y+4,10);M.emit(R,'star',e.x+5,e.y,6);M.say(R,e.x+5,e.y-2,MSG[(R.mi=(R.mi||0)+1)%MSG.length],2.2);e.sink=.01}})}
   // lighthouse lamp
   M.ent(R,{x:80,y:28,w:21,h:14,box:1,name:'LIGHTHOUSE',draw(){},click(e,R){R.beamB=M.now;M.snd('honk',.5);M.emit(R,'star',90,34,10)}});
   // sailboat
   const boat=K.spr(36,34,p=>{p.poly([[2,24],[34,24],[29,31],[7,31]],ramp('#8a4a2a'),{v:.6});p.rect(17,2,2,23,ramp('#5a3a1a'),{v:.5});p.poly([[19,3],[33,21],[19,21]],ramp('#f4ecdc'),{v:.6});p.poly([[16,6],[16,21],[4,21]],ramp('#e8c8a0'),{v:.5});p.rect(4,25,28,1,'#ffd040');p.px(19,1,'#e04a3a');p.px(20,1,'#e04a3a')});
   M.ent(R,{spr:boat,name:'SAILBOAT',x:480,y:WL-6,vx:6,react:'shake',z:WL+28,upd(e,dt,t){if(!RM){e.x+=e.vx*dt;if(e.x<300||e.x>820)e.vx*=-1;e.flip=e.vx<0;e.y=WL-6+Math.round(Math.sin(t*1.3)*1.2)}},click(e,R){M.react(R,e);M.snd('honk',.8);e.vx*=-1;M.emit(R,'water',e.x+18,e.y+30,10)}});
   // jumping fish
   const fish=M.frames(2,12,7,(p,f)=>{p.ell(6,3.5,5,3,ramp(f?'#ffa040':'#ff7a3a'),{b:.15});p.poly([[1,3],[0,0],[0,6]],ramp('#ff6a2a'),{});p.px(8,2,'#140c1c')});
   for(let i=0;i<3;i++)M.ent(R,{fr:fish,name:'FISH',x:300+i*200,y:WL+30,vis:1,hx:300+i*200,jt:-i*2,f:0,
    upd(e,dt,t){e.jt+=dt;const p=e.jt/1.1;if(p>0&&p<1){e.y=WL+24-Math.sin(p*Math.PI)*34;e.x=e.hx+p*30;e.f=p<.5?0:1;e.flip=0;e.vis=1}else{e.vis=0;if(p>=1){M.emit(R,'water',e.x+6,WL+24,6);e.jt=-(3+Math.random()*5);e.hx=200+Math.random()*600}}},
    click(e,R){M.snd('splash',1.6);M.emit(R,'water',e.x+6,e.y+3,10);M.say(R,e.x+6,e.y-2,'BLUB!',.8)}});
   // gulls
   const gull=M.frames(2,11,6,(p,f)=>{const W2=['#a8a8b8','#e8e8f0','#ffffff'];if(f){p.line(0,1,4,3,'#e8e8f0');p.line(10,1,6,3,'#e8e8f0')}else{p.line(0,4,4,2,'#e8e8f0');p.line(10,4,6,2,'#e8e8f0')}p.rect(4,2,3,2,W2[2])});
   for(let i=0;i<4;i++)M.ent(R,{fr:gull,fps:5,name:'SEAGULL',x:200+i*220,y:60+i*12,vx:12+i*3,upd(e,dt){if(!RM){e.x+=e.vx*dt;if(e.x>R.w+20)e.x=-20}},click(e,R){M.snd('yip',1.8);M.say(R,e.x+5,e.y-2,'MINE!',.8);e.vx*=2.5;setTimeout(()=>e.vx/=2.5,1500)}});
   K.sign(R,930,WL+38,'WRITE ONE >','https://landrcy.github.io/sea-of-thought/','OPEN SEA OF THOUGHT');
   R.rip=[]},
  tap(R,x,y){if(y>WL){R.rip.push([x,y,M.now]);M.snd('splash',1.2+Math.random()*.4);M.emit(R,'water',x,y,8)}},
  back(R,g,ox,oy,t){// moving wave crests
   for(let y=WL+3;y<RH;y+=4){const k=(y-WL)/(RH-WL),sp=8+k*20,ph=(RM?0:t)*sp*(y%2?1:-1);g.fillStyle=k<.3?'#4cb8dc':'#a6e6f4';const step=Math.round(30+k*34);for(let x=-((ph%step+step)%step);x<M.BW;x+=step){const wx=Math.round(x),w=Math.round(3+k*6);if(bay(wx,y)<.3)continue;g.fillRect(wx,y,w,1)}}
   // lighthouse beam
   const a=(RM?1:t*.9)%TAU,br=R.beamB&&M.now-R.beamB<.8?1:0;if(Math.cos(a)>0||br){const dir=Math.sin(a)>0?1:-1,len=br?260:Math.round(180*Math.cos(a));g.fillStyle=br?'#fffbe0':'#ffe9a0';for(let i=6;i<len;i++){const hw=Math.round(i*.12);for(let j=-hw;j<=hw;j+=1){const x=Math.round(90+dir*i+ox),y=Math.round(35+j+oy);if(bay(x,y)<.75+i/len*.25-(br?.25:0))continue;g.fillRect(x,y,1,1)}}}
   R.rip=R.rip.filter(r=>M.now-r[2]<1);for(const[x,y,t0]of R.rip){const k=(M.now-t0),rr=2+k*16;g.fillStyle='#c8f4ff';for(let i=0;i<24;i++){const an=i/24*TAU;if(bay(i,2)<k)continue;g.fillRect(Math.round(x+Math.cos(an)*rr+ox),Math.round(y+Math.sin(an)*rr*.35+oy),1,1)}}}});
}
})();
