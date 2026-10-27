/* East wing (part 1): Outer Space, The Deep, Dinosaur Disco, Haunted Toasters, Tiny Kingdoms */
(()=>{'use strict';
const{ramp,rp,vn,fbm,H,bay,TAU,RM,mix,clamp,lerp,RH}=M,K=M.K;
const ease=p=>p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
// vertically mirrored copy of a sprite (pre-built, never scaled)
K.vflip=s=>{const p=new M.Pix(s.w,s.h);for(let y=0;y<s.h;y++)for(let x=0;x<s.w;x++){const o=((s.h-1-y)*s.w+x)*4;if(s.d[o+3])p.px(x,y,[s.d[o],s.d[o+1],s.d[o+2]])}return p.sp()};
K.panel=(R,g,txt,c)=>{const T=M.txt(txt,c[0],null);M.frame(M.BW/2-T.w/2-6,M.BH-19,T.w+12,15,{c:['#140c1c',c[1],c[2],c[3]]});g.drawImage(T.c,M.BW/2-T.w/2,M.BH-15)};

/* ================= OUTER SPACE ================= */
{K.ext('space',{start:550,top:'#02030c',bot:'#0a2a5a',
  bg(p,R){K.space(p,R.w,RH,{seed:21,pal:['#02030c','#040820','#081030','#0c1640'],neb:['#0c1640','#142a6a','#1e4a8a','#3a7ab0','#7ac0e0'],amt:.4,sparse:160});
   // earth horizon
   const EC=[550,1100],ER=900;for(let y=150;y<RH;y++)for(let x=0;x<R.w;x++){const d=Math.hypot(x-EC[0],(y-EC[1])*1.0);if(d>ER+8)continue;if(d>ER){if(bay(x,y)<(ER+8-d)/8)p.px(x,y,d>ER+4?'#3a8ad8':'#8ad0ff');continue}
    const u=x/90,v=y/14,land=fbm(u+3,v)>.56,cl=fbm(u*2+9,v*3)>.6,lit=.75-(x-EC[0])/1400-(d<ER-30?0:(ER-d)/-60*0);let c=land?rp(['#1a3a12','#2a5a1a','#4a7a2a','#8a9a4a','#c8b070'],lit*.8+(fbm(u*3,v*3)-.5)*.4,x,y):rp(['#04183a','#0a2e6a','#14509a','#2a78c8','#5aa8e8'],lit*.8,x,y);if(cl)c=rp(['#8a9ab0','#c8d8e8','#ffffff'],lit+.2,x,y);if(ER-d<3)c='#a8e8ff';p.px(x,y,c)}
   // moon top-right
   p.ell(940,50,26,26,ramp('#b8b0a8',6),{b:.05,tex:(x,y)=>(vn(x/5,y/5)-.5)*.4});for(let i=0;i<7;i++){const cx=925+H(i,1)*30,cy=36+H(i,2)*30,r=2+H(i,3)*3;p.ell(cx,cy,r,r,ramp('#8a8278',5),{b:-.2})}
   // ringed planet
   p.ell(160,70,22,22,ramp('#e0a060',6),{b:.05,tex:(x,y)=>Math.sin(y*.9)*.12});},
  init(R){
   // ring of the planet as an ent so it draws in front
   M.ent(R,{x:120,y:56,w:80,h:30,hitR:24,name:'RINGED PLANET',sp:0,z:1,draw(g,X,Y,t,e,sel){const k=M.now-e.sp<1;for(let i=0;i<160;i++){const a=i/160*TAU,x=Math.round(X+40+Math.cos(a)*38),y=Math.round(Y+14+Math.sin(a)*7);if(Math.sin(a)<0&&Math.hypot(x-X-40,(y-Y-14)*1)<22)continue;g.fillStyle=k&&((i+Math.floor(t*30))%8<2)?'#ffffff':i%3?'#c8a878':'#8a6a48';g.fillRect(x,y,1,1)}if(sel){g.fillStyle='#fff6c4';g.fillRect(X+38,Y-16,4,1)}},click(e,R){e.sp=M.now;M.snd('chime',.8);M.emit(R,'star',160,70,16,{rx:70,ry:10})}});
   // rocket
   const rk=M.frames(2,18,40,(p,f)=>{const W=ramp('#e8e8f0',6),Rd=ramp('#d83a3a',6);p.poly([[9,0],[15,10],[15,30],[3,30],[3,10]],W,{v:.6});p.poly([[9,0],[14,8],[4,8]],Rd,{v:.6});p.poly([[3,22],[0,32],[3,30]],Rd,{});p.poly([[15,22],[18,32],[15,30]],Rd,{});p.ell(9,15,3,3,['#1a3a6a','#4a9ae0','#c8f0ff'],{b:.1,spec:'#ffffff'});p.rect(5,30,8,3,ramp('#6a6a78'),{v:.5});if(f){p.poly([[5,33],[13,33],[9,40]],['#ff7020','#ffd040','#fff4b0'],{v:.7,bv:0})}});
   R.rocket=M.ent(R,{fr:rk,f:0,name:'ROCKET',x:480,y:150,hy:150,fly:0,
    upd(e,dt,t){if(e.fly){e.fly+=dt;e.f=1;if(e.fly<3){e.y=e.hy-Math.pow(e.fly,2)*40;if(Math.random()<.7)M.emit(R,'fire',e.x+9,e.y+38,2,{dir:Math.PI/2});if(Math.random()<.4)M.emit(R,'smoke',e.x+9,e.y+40,1)}else if(e.fly<5.5){e.y=-60+(e.fly-3)/2.5*(e.hy+60);e.vis=1;if(Math.random()<.6)M.emit(R,'fire',e.x+9,e.y+38,1,{dir:Math.PI/2})}else{e.fly=0;e.y=e.hy;e.f=0;M.snd('thud',1);M.emit(R,'smoke',e.x+9,e.y+38,8)}}else{e.f=0;e.y=e.hy+(RM?0:Math.round(Math.sin(t*1.2)))}},
    click(e,R){if(e.fly)return;e.fly=.01;M.snd('rumble',1.2);M.snd('whoosh',.6);M.say(R,e.x+9,e.y-2,'3.. 2.. 1..',1);K.shake(R,.5,1)}});
   // astronauts
   const astro=M.frames(3,18,22,(p,f)=>{const W=ramp('#e8e8f0',6);p.rrect(3,9,12,10,3,W,{v:.6});p.ell(9,6,6,6,W,{b:.1});p.ell(9,6,4,3.4,['#1a2a4a','#e0a040','#ffe0a0'],{b:.1,spec:'#ffffff'});p.rect(f===1?0:1,f===1?6:10,3,f===1?5:6,W,{v:.5});p.rect(15,10,3,6,W,{v:.5});p.rect(4,19,4,3,W,{v:.4});p.rect(10,19,4,3,W,{v:.4});p.rect(6,12,6,3,'#3a7ad8');if(f===2)p.rect(15,4,3,6,W,{v:.5})});
   for(let i=0;i<3;i++){const fr=astro,up=fr.map(K.vflip);M.ent(R,{fr,f:0,name:'ASTRONAUT',x:420+i*230,y:60+i*30,hx:420+i*230,hy:60+i*30,idle:'float',ba:5,bx:4,bs:.6+i*.2,flipT:0,
    upd(e,dt,t){if(e.flipT>0){e.flipT-=dt;const q=1-e.flipT/1;e.fr=q>.25&&q<.75?up:fr;e.f=1}else{e.fr=fr;e.f=M.now<e.wv?(Math.floor(t*6)%2?2:0):0}},
    click(e,R){e.flipT=1;e.wv=M.now+2;M.snd('boing',.7+i*.2);M.say(R,e.x+9,e.y-2,K.pick(['HI EARTH!','WHEEE!','ZERO G!','HOUSTON?']),1.2);M.emit(R,'star',e.x+9,e.y+10,8)}})}
   // UFO + cows
   const ufo=M.frames(2,40,20,(p,f)=>{p.ell(20,7,9,7,['#2a5a4a','#4aa08a','#9af0d0','#e0fff4'],{b:.1,spec:'#ffffff'});p.ell(20,12,19,5,ramp('#8a8aa0',6),{b:.1});for(let i=0;i<5;i++)p.disc(6+i*7,13,1.2,(i+f)%2?'#ffe040':'#ff4a8a')});
   const cow=K.spr(18,13,p=>{p.rrect(1,2,14,8,3,ramp('#f4f4f4',5),{v:.6});p.disc(5,5,2,'#1a1a1a');p.disc(11,7,1.6,'#1a1a1a');p.rrect(12,0,6,6,2,ramp('#f4f4f4',5),{v:.6});p.rect(15,3,3,2,ramp('#f0a0b0'),{});p.px(14,1,'#140c1c');for(const x of[3,6,10,13])p.rect(x,10,2,3,'#3a3a3a')});
   R.cows=[0,1,2].map(i=>M.ent(R,{spr:cow,name:'SPACE COW',x:640+i*120,y:110+i*24,hx:640+i*120,hy:110+i*24,idle:'float',ba:4,bs:.5+i*.3,snd:'honk',sp:.5,say:'MOO?',react:'hop'}));
   R.ufo=M.ent(R,{fr:ufo,fps:4,name:'UFO',x:700,y:20,beam:0,tgt:null,upd(e,dt,t){if(!RM&&!e.beam)e.x=700+Math.sin(t*.35)*300;if(e.beam){e.beam+=dt;const c=e.tgt;if(c){c.idle=null;c.x=lerp(c.x,e.x+11,dt*3);c.y-=dt*40;if(c.y<e.y+10){c.vis=0}}if(e.beam>3){e.beam=0;if(c){setTimeout(()=>{c.vis=1;c.x=c.hx;c.y=c.hy;c.idle='float';c.fl=M.now;M.snd('pop')},1500)}e.tgt=null}}},
    click(e,R){if(e.beam)return;e.beam=.01;e.tgt=R.cows.filter(c=>c.vis).sort((a,b)=>Math.abs(a.x-e.x)-Math.abs(b.x-e.x))[0]||null;if(e.tgt){e.x=e.tgt.x-11}M.snd('laser',.4);M.snd('boo',1.6);M.say(R,e.x+20,e.y-2,'BEAM ME UP',1)}});
   // space station
   const iss=K.spr(70,26,p=>{for(const sx of[0,52])for(let y=0;y<26;y++)for(let x=0;x<18;x++){const cell=x%6===0||y%5===0;p.px(sx+x,y,cell?'#0a0c18':rp(['#14306a','#2454b0','#5a90f0','#bcd8ff'],.5-y/40,sx+x,y))}p.rect(18,12,34,3,ramp('#8a8a94'),{v:.6});p.cyl(26,6,18,14,ramp('#d8d8e0',6));p.rect(30,2,10,4,ramp('#c8a040'),{v:.6})});
   M.ent(R,{spr:iss,name:'SPACE STATION',x:600,y:56,idle:'float',ba:2,bs:.4,react:'jiggle',snd:'beep',fx:'star',fxn:8,say:'HELLO FROM ORBIT!'});
   // asteroids
   const ast=[0,1].map(k=>K.spr(14+k*6,12+k*5,p=>p.ell(7+k*3,6+k*2.5,6.5+k*3,5.5+k*2.5,ramp('#7a6a5a',6),{b:.05,tex:(x,y)=>(vn(x*.6,y*.6)-.5)*.6})));
   for(let i=0;i<6;i++)M.ent(R,{spr:ast[i%2],name:'ASTEROID',x:100+i*170,y:120+(i%3)*24,vx:-6-i*2,gone:0,upd(e,dt,t){if(e.gone){e.gone-=dt;if(e.gone<=0){e.vis=1;e.x=R.w+10;e.fl=M.now}return}if(!RM){e.x+=e.vx*dt;if(e.x<-30)e.x=R.w+10}},click(e,R){e.vis=0;e.gone=3;M.snd('crunch',.7);M.emit(R,'dust',e.x+8,e.y+6,16,{v:1.5,c:['#a89878','#7a6a5a','#5a4a3e']});M.emit(R,'spark',e.x+8,e.y+6,8);K.shake(R,.2,1)}});
   // alien in a moon crater
   const al=M.frames(2,14,12,(p,f)=>{if(!f)return;p.ell(7,7,5,5,ramp('#6ad04a',5),{b:.15});p.disc(5,6,1.4,'#140c1c');p.disc(9,6,1.4,'#140c1c');p.px(5,5,'#ffffff');p.px(9,5,'#ffffff');p.line(4,2,3,0,'#6ad04a');p.line(10,2,11,0,'#6ad04a')},false);
   M.ent(R,{fr:al,f:0,name:'MOON CRATER',x:933,y:40,w:14,h:12,box:1,click(e,R){e.f=1;M.snd('beep',2);M.say(R,e.x+7,e.y-2,'GREETINGS!',1.4);setTimeout(()=>e.f=0,1600)}});
   K.visitors(R,0,0,[]);R.score=0},
  tap(R,x,y){K.comet(R,x,y,-120,60)},
  upd(R,dt){if(!RM&&Math.random()<dt*.1)K.comet(R,R.cam.x+M.BW+5,Math.random()*80,-160,50)},
  back(R,g,ox,oy){const u=R.ufo;if(u&&u.beam){g.fillStyle='#b8ffd8';for(let y=u.y+16;y<u.y+130;y++){const hw=Math.round(4+(y-u.y)*.18);for(let x=-hw;x<=hw;x++){const X=Math.round(u.x+20+x+ox),Y=Math.round(y+oy);if(bay(X,Y)<.7)continue;g.fillRect(X,Y,1,1)}}}},
  front(R,g,ox,oy){K.drawComets(R,g,ox,oy)}});
}

/* ================= THE DEEP ================= */
{K.ext('ocean',{start:550,top:'#0a4a7a',bot:'#02060e',
  bg(p,R){const W=['#02060e','#041228','#082242','#0e3460','#164a7e','#20649a','#3a86b8'];
   for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c=rp(W,.95-y/RH*.85+(vn(x/60,y/30)-.5)*.08,x,y);if(y>222+Math.sin(x/40)*6+vn(x/20,1)*8){const k=(y-222)/50;c=rp(['#2a2418','#4a3e28','#6a5a3a','#8a7a52','#a8986a'],.7-k*.5+(vn(x/3,y/3)-.5)*.4,x,y)}p.px(x,y,c)}
   // light rays
   for(let r=0;r<9;r++){const x0=60+r*130;for(let y=0;y<180;y++){const hw=4+y*.1;for(let x=x0+y*.35-hw;x<x0+y*.35+hw;x++){if(bay(Math.floor(x),y)<.82+y/900)continue;p.px(x,y,rp(W,.95-y/RH*.6+.15,Math.floor(x),y))}}}
   // rocks + coral
   for(let i=0;i<14;i++){const x=40+i*80+H(i,2)*30,y=232;p.ell(x,y,16+H(i,3)*14,10,ramp('#3a3a4a',6),{b:-.05,tex:(X,Y)=>(vn(X/4,Y/4)-.5)*.5,clip:(X,Y)=>Y<y+6})}
   for(let i=0;i<10;i++){const x=70+i*105+Math.round(H(i,9)*20),c=['#ff6a8a','#ffa040','#c06aff','#ff4a6a','#40e0c0'][i%5],C=ramp(c,5);for(let k=0;k<5;k++){const an=-Math.PI/2+(k-2)*.38,L=12+H(i,k)*10;let bx=x,by=236;for(let s2=0;s2<L;s2++){const bend=an+Math.sin(s2/5+k)*.15;bx+=Math.cos(bend);by+=Math.sin(bend);p.rect(Math.round(bx),Math.round(by),2,1,C[s2<3?1:2]);p.px(Math.round(bx),Math.round(by),C[3])}p.disc(Math.round(bx),Math.round(by),1.6,C[4])}}},
  init(R){
   // kelp (animated by frame)
   const kelp=M.frames(4,12,70,(p,f)=>{for(let y=0;y<70;y++){const sw=Math.sin(y/9+f*TAU/4)*(y/70)*0+Math.sin(y/10+f*1.57)*(1-y/70)*3,x=6+sw;p.rect(Math.round(x)-1,y,3,1,rp(['#0a3a1a','#1a6a2a','#3a9a3a','#7ad04a'],.6-(y%12<2?.2:0),0,y));if(y%10===5)p.ell(x+3,y,3,1.5,ramp('#3a9a3a'),{})}});
   for(let i=0;i<9;i++)M.ent(R,{fr:kelp,fps:3,name:'KELP',x:30+i*125+(i%2)*20,y:166,react:'jiggle',click(e,R){M.react(R,e);M.emit(R,'bubble',e.x+6,e.y+30,8,{rx:6,ry:40});M.snd('bubble',1.3)}});
   // fish schools
   const fishS=c=>M.frames(2,9,5,(p,f)=>{p.ell(5,2.5,4,2.2,ramp(c),{b:.15});p.poly([[1,2],[0,f?0:1],[0,f?4:3]],ramp(c),{});p.px(7,2,'#140c1c')});
   R.fish=[];['#ffd040','#4ad0ff','#ff8a4a'].forEach((c,s)=>{const fr=fishS(c);for(let i=0;i<9;i++){R.fish.push(M.ent(R,{fr,fps:6,name:'FISH',x:200+s*300+(i%3)*12,y:60+s*40+Math.floor(i/3)*8,s,i,ox:(i%3)*12,oy:Math.floor(i/3)*8,scare:0,
    upd(e,dt,t){const cx=200+s*300+Math.sin(t*.25+s)*260,cy=70+s*42+Math.sin(t*.6+s)*16;let tx=cx+e.ox,ty=cy+e.oy;if(e.scare>0){e.scare-=dt;tx+=e.sx*60*e.scare;ty+=e.sy*40*e.scare}if(RM){e.x=tx;e.y=ty;return}const dx=tx-e.x;e.flip=dx<0;e.x+=dx*Math.min(1,dt*3);e.y+=(ty-e.y)*Math.min(1,dt*3)},
    click(e,R){R.fish.filter(q=>q.s===s).forEach(q=>{q.scare=1.2;q.sx=Math.random()-.5;q.sy=Math.random()-.5});M.snd('bubble',1.5);M.emit(R,'bubble',e.x+4,e.y,8)}}))}});
   // octopus
   const oct=M.frames(2,26,26,(p,f)=>{const P2=ramp('#d84a7a',6);for(let i=0;i<5;i++){const x=4+i*4.5;for(let y=12;y<25;y++)p.rect(Math.round(x+Math.sin(y/3+i+f*2)*1.5),y,2,1,P2[2+(y%3===0?1:0)])}p.ell(13,9,9,8,P2,{b:.15});p.disc(9,9,2,'#ffffff');p.disc(17,9,2,'#ffffff');p.px(9,10,'#140c1c');p.px(17,10,'#140c1c')});
   M.ent(R,{fr:oct,fps:3,name:'OCTOPUS',x:520,y:170,hx:520,hy:170,jet:0,upd(e,dt,t){if(e.jet){e.jet+=dt;const q=e.jet;e.x=e.hx+Math.sin(q*2)*60;e.y=e.hy-Math.sin(Math.min(1,q/2)*Math.PI)*90;if(q>2.2){e.jet=0;e.x=e.hx;e.y=e.hy}}},click(e,R){if(e.jet)return;e.jet=.01;M.emit(R,'ink',e.x+13,e.y+12,24,{v:1.4});M.snd('squish',.8);M.say(R,e.x+13,e.y-2,'SQUIRT!',.8)}});
   // jellyfish
   const jel=M.frames(3,16,24,(p,f)=>{const J=['#5a2a8a','#a060e0','#e0b0ff','#fff0ff'];const w=f===1?7:6;p.ell(8,6,w,5,J,{b:.2,clip:(x,y)=>y<=7});for(let i=0;i<4;i++)for(let y=8;y<20+f;y++)p.px(3+i*3+Math.round(Math.sin(y/3+i+f)),y,y%2?J[1]:J[2])});
   for(let i=0;i<4;i++)M.ent(R,{fr:jel,fps:2,name:'JELLYFISH',x:300+i*190,y:120+(i%2)*30,hy:120+(i%2)*30,glow:0,upd(e,dt,t){if(!RM){e.y=e.hy+Math.sin(t*.5+i)*20}},draw(g,X,Y,t,e,sel){const s=jel[(((Math.floor((RM?0:t)*2+i))%3)+3)%3];if(M.now<e.glow){g.fillStyle='#e0b0ff';for(let j=-6;j<s.h+6;j+=1)for(let k=-6;k<s.w+6;k++)if(bay(X+k,Y+j)>.9&&Math.hypot(k-8,j-8)<14)g.fillRect(X+k,Y+j,1,1)}if(sel)g.drawImage(M.ring(s),X-1,Y-1);g.drawImage(s.c,X,Y)},w:16,h:24,click(e,R){e.glow=M.now+1;M.snd('zap',1.6);M.emit(R,'zap',e.x+8,e.y+10,10)}});
   // treasure chest
   const ch=M.frames(2,30,24,(p,f)=>{const Wd=ramp('#8a5a2a',6),G=ramp('#e0b030',6);p.rect(1,10,28,14,Wd,{v:.55});p.rect(1,16,28,2,G,{v:.6});p.rect(13,13,4,6,G,{v:.6});if(f){p.rect(1,0,28,6,Wd,{v:.6});p.rect(3,6,24,4,['#fff4a0','#ffd040'],{v:.6,bv:0})}else p.rrect(1,4,28,8,3,Wd,{v:.65})});
   M.ent(R,{fr:ch,f:0,name:'TREASURE CHEST',x:700,y:212,click(e,R){e.f=1;M.snd('coin',1);M.snd('tada',1.2);M.emit(R,'gold',e.x+15,e.y+6,26,{v:1.3});M.emit(R,'bubble',e.x+15,e.y,10);setTimeout(()=>e.f=0,2000)}});
   // anglerfish
   const ang=M.frames(2,30,22,(p,f)=>{const A=['#0a0e1a','#1a2236','#2a3450','#3a4868'];p.ell(15,12,12,9,A,{b:.1});p.poly([[3,12],[0,6],[0,18]],A,{});p.line(18,3,26,0,'#3a4868');for(let i=0;i<6;i++)p.px(18+i*1.5,15+(i%2),'#ffffff');p.disc(20,9,1.6,'#e0e0f0');if(f)p.rect(17,15,10,3,'#3a0a10')});
   M.ent(R,{fr:ang,f:0,name:'ANGLERFISH',x:960,y:190,click(e,R){e.f=1;M.snd('crunch',.7);M.say(R,e.x+15,e.y-2,'CHOMP!',.8);setTimeout(()=>e.f=0,400)},upd(e,dt,t){e.x=960+(RM?0:Math.sin(t*.3)*30);e.flip=RM?0:Math.cos(t*.3)<0}});
   // submarine
   const sub=K.spr(48,24,p=>{p.ell(24,14,22,9,ramp('#e0b020',6),{b:.1});p.rect(18,1,10,8,ramp('#c8a020'),{v:.6});p.rect(26,0,6,2,ramp('#8a8a9a'),{});for(let i=0;i<3;i++)p.ell(14+i*10,14,3,3,['#1a3a5a','#4a9ad0','#c8f0ff'],{b:.1,spec:'#ffffff'});p.rect(0,12,4,4,ramp('#8a8a9a'),{v:.5})});
   M.ent(R,{spr:sub,name:'SUBMARINE',x:100,y:100,vx:12,upd(e,dt){if(!RM){e.x+=e.vx*dt;if(e.x<40||e.x>R.w-80)e.vx*=-1;e.flip=e.vx<0}},click(e,R){R.ping={x:e.x+24,y:e.y+12,t0:M.now};M.snd('ding',.6);M.say(R,e.x+24,e.y-2,'PING!',.8)}});
   // whale silhouette far away
   const wh=K.spr(90,30,p=>{p.ell(40,16,36,12,['#0a1a30','#0e2440','#142e52'],{b:0});p.poly([[74,14],[90,6],[88,22]],['#0e2440'],{});p.rect(20,24,30,3,'#1a3a5a');p.px(18,13,'#3a5a7a')},false);
   M.ent(R,{spr:wh,name:'WHALE',x:R.w,y:20,z:-50,upd(e,dt){if(!RM){e.x-=dt*8;if(e.x<-100)e.x=R.w+20}},click(e,R){M.snd('boo',.5);M.emit(R,'bubble',e.x+20,e.y+10,14);M.say(R,e.x+40,e.y-2,'WHOOOOOM',1.4)}});
   // crab + clam
   const crab=M.frames(2,16,10,(p,f)=>{const C=ramp('#e04a2a',5);p.ell(8,6,6,3.5,C,{b:.15});p.rect(0,f?0:2,3,3,C,{v:.6});p.rect(13,f?0:2,3,3,C,{v:.6});for(let i=0;i<3;i++){p.px(3+i*2,9,'#a02a1a');p.px(10+i*2,9,'#a02a1a')}p.px(6,3,'#140c1c');p.px(10,3,'#140c1c')});
   M.ent(R,{fr:crab,f:0,name:'CRAB',x:380,y:236,vx:10,upd(e,dt,t){if(M.now<e.sn){e.f=Math.floor(t*12)%2;return}e.f=0;if(!RM){e.x+=e.vx*dt;if(e.x<300||e.x>480)e.vx*=-1}},click(e,R){e.sn=M.now+.8;M.snd('crunch',2);M.say(R,e.x+8,e.y-2,'SNIP SNAP',.8)}});
   const clam=M.frames(2,20,14,(p,f)=>{const S=ramp('#e8b0c8',5);p.ell(10,10,9,4,S,{b:.1,clip:(x,y)=>y>=9});if(f){p.ell(10,4,9,4,S,{b:.2,clip:(x,y)=>y<=5});p.disc(10,8,2,'#ffffff');p.px(9,7,'#ffffff')}else p.ell(10,9,9,3,S,{b:.2,clip:(x,y)=>y<=9})});
   M.ent(R,{fr:clam,f:0,name:'CLAM',x:820,y:232,click(e,R){e.f^=1;M.snd(e.f?'chime':'thud',e.f?1.5:2);if(e.f)M.emit(R,'star',e.x+10,e.y+6,8)}});
   R.ping=null},
  tap(R,x,y){M.emit(R,'bubble',x,y,6);M.snd('bubble',1+Math.random())},
  upd(R,dt){if(!RM&&Math.random()<dt*3)M.emit(R,'bubble',R.cam.x+Math.random()*M.BW,RH-30,1)},
  back(R,g,ox,oy){const p=R.ping;if(p&&M.now-p.t0<1.5){const k=(M.now-p.t0)/1.5,r=8+k*120;g.fillStyle='#8af0ff';for(let i=0;i<120;i++){if(bay(i,1)<k)continue;const a=i/120*TAU;g.fillRect(Math.round(p.x+Math.cos(a)*r+ox),Math.round(p.y+Math.sin(a)*r*.6+oy),1,1)}}}});
}

/* ================= DINOSAUR DISCO ================= */
{const FL=176,PAL=[['#ff4a8a','#4ad0ff','#ffe040','#7aff6a'],['#c060ff','#ff8a2a','#40ffd0','#ff4a4a'],['#ffffff','#ff4aff','#4a8aff','#ffd040']];
 K.ext('dino',{start:500,top:'#0a0612',bot:'#140a1e',
  bg(p,R){for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c;if(y<FL){c=rp(['#0a0612','#140a22','#1e1032','#2a1644'],.3+(y/FL)*.3+(((x>>3)+(y>>3))&1?.04:0),x,y);if(y>FL-30&&y<FL-4&&(x%40<2))c='#3a2a5a'}else c='#140a1e';p.px(x,y,c)}
   // speakers
   for(const sx of[150,850]){p.rect(sx-20,FL-70,40,70,ramp('#2a2a32',6),{v:.5});for(const[cy,r]of[[FL-52,11],[FL-20,13]])p.ell(sx,cy,r,r,ramp('#4a4a58',6),{b:.05})}
   // dj booth
},
  init(R){R.pal=0;R.beat=0;
   // dance floor tiles as one ent
   M.ent(R,{x:0,y:FL,w:R.w,h:RH-FL,box:1,z:-100,name:null,draw(g,X,Y,t){const ts=20,bt=Math.floor((RM?0:t)*2.2);const P=PAL[R.pal];for(let j=0;j*12<RH-FL;j++)for(let i=0;i*ts<R.w;i++){const k=(i+j*3+bt)%7;const on=H(i+bt,j)>.5;g.fillStyle=on?P[k%4]:'#2a1a3a';g.fillRect(X+i*ts+1,Y+j*12+1,ts-2,10);if(on){g.fillStyle='#ffffff';g.fillRect(X+i*ts+2,Y+j*12+2,3,1)}}}});
   M.ent(R,{x:430,y:FL-40,z:FL,nohit:1,spr:K.spr(140,40,p=>{p.rect(0,2,140,38,ramp('#3a2a5a',6),{v:.5});p.rect(0,0,140,4,ramp('#c060ff'),{v:.6});for(let i=0;i<6;i++)p.rect(8+i*22,12,14,20,ramp('#2a1a44'),{v:.4});M.ftext(p,'DJ REX',48,16,'#ffe040','#3a0a4a')},false)});
   // mirror ball
   M.ent(R,{x:480,y:20,w:40,h:40,hitR:18,name:'MIRROR BALL',boost:0,draw(g,X,Y,t,e,sel){g.fillStyle='#8a8a9a';g.fillRect(X+19,0,2,Y+2);const sp=(RM?0:t)*(e.boost>M.now?6:1.5);for(let j=0;j<36;j++)for(let i=0;i<36;i++){const dx=(i-17.5)/18,dy=(j-17.5)/18;if(dx*dx+dy*dy>1)continue;const lon=Math.floor((Math.atan2(dx,Math.sqrt(1-dx*dx-dy*dy))+sp)*4),lat=Math.floor(dy*8);const b=H(lon,lat);let c=b>.85?'#ffffff':b>.5?'#c8c8d8':b>.25?'#8a8aa0':'#4a4a5a';if(-dx*.6-dy*.6>.5&&b>.4)c='#ffffff';g.fillStyle=c;g.fillRect(X+2+i,Y+2+j,1,1)}if(sel){g.fillStyle='#fff6c4';g.fillRect(X+2,Y+40,36,1)}},click(e,R){e.boost=M.now+2;M.snd('chime',1.6);M.emit(R,'star',500,40,24,{v:2})}});
   // dinos
   const D=(nm,w,h,c,draw)=>({nm,fr:M.frames(4,w,h,(p,f)=>draw(p,f,ramp(c,6)))});
   const DINOS=[
    D('T-REX DJ',46,52,'#4ab04a',(p,f,C)=>{p.ell(18,30,12,13,C,{b:.12});p.rect(10,40,6,12,C,{v:.5});p.rect(22,40,6,12,C,{v:.45});p.rrect(22,6+(f%2),22,16,5,C,{v:.6});p.rect(26,18+(f%2),16,3,'#ffffff');p.px(36,10+(f%2),'#140c1c');p.rect(26,4+(f%2),6,10,ramp('#3a3a48'),{v:.5});p.rect(24,9+(f%2),2,6,ramp('#e04a4a'),{});p.rect(30,26,6,2,C,{v:.4});p.rect(34+(f>1?2:0),25,2,3,C,{v:.5});p.poly([[6,30],[0,44],[8,38]],C,{})}),
    D('STEGOSAURUS',52,34,'#e0a040',(p,f,C)=>{const y0=f%2;p.ell(24,20+y0,16,9,C,{b:.12});for(let i=0;i<5;i++)p.poly([[12+i*6,12+y0],[15+i*6,4+y0-(i===2?2:0)],[18+i*6,12+y0]],ramp('#d84a3a'),{});p.rrect(38,14+y0-(f===2?3:0),12,8,3,C,{v:.6});p.px(46,16+y0-(f===2?3:0),'#140c1c');p.poly([[8,20],[0,16+(f%2?-2:2)],[8,24]],C,{});for(let i=0;i<4;i++)p.rect(13+i*8,26,4,8,C,{v:.45})}),
    D('TRICERATOPS',46,32,'#5a8ad8',(p,f,C)=>{const y0=f%2;p.ell(20,18+y0,14,9,C,{b:.12});p.ell(36,12+y0,8,9,ramp('#7aa0e8'),{b:.15});p.rrect(34,12+y0,11,8,3,C,{v:.6});p.line(40,11+y0,45,5+y0-(f===3?2:0),'#fff4d8');p.line(37,10+y0,40,3+y0,'#fff4d8');p.px(39,14+y0,'#140c1c');for(let i=0;i<4;i++)p.rect(9+i*7,24,4,8,C,{v:.45})}),
    D('BRONTOSAURUS',56,60,'#a87ad8',(p,f,C)=>{p.ell(22,44,16,10,C,{b:.12});const nx=[0,3,0,-3][f];for(let i=0;i<14;i++)p.disc(32+i*.6+nx*i/14,38-i*2.6,3,rp(C,.6-i*.01,0,0));p.rrect(36+nx,0,12,8,3,C,{v:.6});p.px(44+nx,2,'#140c1c');p.poly([[6,44],[0,52+(f%2)*2],[8,48]],C,{});for(let i=0;i<4;i++)p.rect(10+i*7,50,5,10,C,{v:.45})}),
    D('VELOCIRAPTOR',34,34,'#e86a4a',(p,f,C)=>{const y0=f%2;p.ell(16,16+y0,8,6,C,{b:.12});p.rrect(20,6+y0-(f===1?2:0),12,7,2,C,{v:.6});p.px(28,8+y0,'#140c1c');p.rect(23,12+y0,8,1,'#ffffff');p.poly([[9,16],[0,12-(f%2)*3],[9,19]],C,{});p.rect(13,21,3,11+(f===3?-3:0),C,{v:.5});p.rect(18,21,3,11+(f===1?-3:0),C,{v:.45});p.rect(21,16+y0,5,2,C,{})}),
    D('PARASAUROLOPHUS',40,40,'#40c0b0',(p,f,C)=>{const y0=f%2;p.ell(16,26+y0,11,8,C,{b:.12});p.rrect(24,10+y0,10,8,3,C,{v:.6});p.line(26,10+y0,16,2+y0+(f===2?-2:0),'#e0a040');p.line(27,10+y0,17,3+y0,'#c08030');p.px(31,12+y0,'#140c1c');for(let i=0;i<2;i++)p.rect(10+i*8,32,4,8,C,{v:.45});p.rect(22,24+y0-(f%2?4:0),2,6,C,{})})];
   const XS=[500,250,360,680,790,120];const YS=[FL-52,FL+20,FL+60,FL+10,FL+50,FL+44];
   DINOS.forEach((d,i)=>{const x=XS[i],y=i===0?FL-76:YS[i];M.ent(R,{fr:d.fr,fps:i===0?4:2.2*1.0+i*.2,name:d.nm,x:x-d.fr[0].w/2,y,flip:i%2===1,spin:0,z:i===0?FL-14:undefined,
    upd(e,dt,t){if(e.spin>0){e.spin-=dt;e.flip=Math.floor(e.spin*10)%2===0}},
    click(e,R){e.spin=.8;M.play(e,'hop',.5);M.snd('roar',1.4+i*.15);M.emit(R,'note',e.x+e.w/2,e.y,8);M.emit(R,'confetti',e.x+e.w/2,e.y,10);M.say(R,e.x+e.w/2,e.y-2,K.pick(['GROOVY!','DINO-MITE!','RAWR-CHA-CHA!','BOOGIE!','JURASSIC JAM!']),1)}})});
   // pterodactyl on wire
   const pt=M.frames(2,30,18,(p,f)=>{const C=ramp('#c86a8a');if(f){p.poly([[0,4],[13,9],[15,12]],C,{});p.poly([[30,4],[17,9],[15,12]],C,{})}else{p.poly([[0,14],[13,8],[15,12]],C,{});p.poly([[30,14],[17,8],[15,12]],C,{})}p.ell(15,10,3,4,C,{b:.1});p.poly([[15,6],[22,8],[15,9]],C,{});p.px(16,7,'#140c1c')});
   M.ent(R,{fr:pt,fps:4,name:'PTERODACTYL',x:260,y:40,upd(e,dt,t){if(!RM){e.x=260+Math.sin(t*.4)*200;e.y=40+Math.sin(t*1.2)*10;e.flip=Math.cos(t*.4)<0}},snd:'yip',sp:.8,fx:'note',say:'SQUAWK!'});
   // DJ decks hotspot
   M.ent(R,{x:440,y:FL-46,w:120,h:10,box:1,name:'TURNTABLES',draw(g,X,Y,t,e,sel){for(const dx of[10,90]){g.fillStyle='#140c1c';g.fillRect(X+dx,Y+2,20,6);const a=Math.floor((RM?0:t)*8)%4;g.fillStyle='#4a4a5a';g.fillRect(X+dx+2+a*4,Y+4,3,2)}if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y,120,1)}},click(e,R){R.pal=(R.pal+1)%PAL.length;M.snd('swish',3);M.snd('tada',1.3);M.say(R,500,FL-60,'DROP THE BEAT!',1);M.emit(R,'note',500,FL-50,12)}});
   // speaker hotspots + fog machine
   for(const sx of[150,850])M.ent(R,{x:sx-20,y:FL-70,w:40,h:70,box:1,name:'SPEAKER',draw(g,X,Y,t,e,sel){const k=(RM?0:Math.max(0,Math.sin(t*14)))>.6||M.now<e.boom;if(k){g.fillStyle='#ff4aff';g.fillRect(X+8,Y+30,1,1);g.fillRect(X+31,Y+30,1,1)}if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-1,40,1);g.fillRect(X,Y+70,40,1)}},click(e,R){e.boom=M.now+.5;M.snd('thud',.7);K.shake(R,.3,2);M.emit(R,'note',sx,FL-40,8)}});
   M.ent(R,{x:930,y:FL+40,spr:K.spr(26,16,p=>{p.rrect(0,2,26,14,2,ramp('#3a3a48',6),{v:.55});p.rect(20,0,5,6,ramp('#6a6a78'),{v:.5});p.px(4,6,'#ff3a3a')}),name:'FOG MACHINE',react:'jiggle',click(e,R){M.react(R,e);M.snd('steam'in{}?'whoosh':'whoosh',.5);for(let k=0;k<4;k++)M.emit(R,'smoke',e.x+22,e.y,10,{dir:Math.PI,spread:.8,v:2})}});
   K.visitors(R,2,RH-4,['DANCE!','LOOK AT HIM GO!','FUNKY!','DINO MOVES!'],{off:2})},
  back(R,g,ox,oy,t){if(RM)return;// lasers
   const P=PAL[R.pal];for(let k=0;k<4;k++){const a=Math.sin(t*(.6+k*.2)+k)*.9,x0=500+ox,y0=40+oy;g.fillStyle=P[k];for(let i=24;i<260;i+=2){const x=Math.round(x0+Math.sin(a+k*.5-.75)*i*1.4),y=Math.round(y0+Math.cos(a*.3)*i*.7);g.fillRect(x,y,1,1)}}
   // mirror ball sparkles on walls
   for(let i=0;i<30;i++){const x=Math.round((H(i,1)*R.w+t*30*(i%2?1:-1))%R.w+ox),y=Math.round(H(i,2)*(FL-20)+oy);if(Math.sin(t*5+i)>.3){g.fillStyle='#ffffff';g.fillRect(x,y,1,1)}}}});
}

/* ================= HAUNTED TOASTERS ================= */
{const CT=150;
 K.ext('toast',{start:480,top:'#0c0a1a',bot:'#141020',
  bg(p,R){for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c;if(y<CT){const st=(x>>3)&1;c=rp(['#0c0a1a','#16122a','#201a3a','#2a2448','#3a3258'],.3+st*.06+(vn(x/30,y/30)-.5)*.2+(y/CT)*.15,x,y)}else if(y<CT+14){c=rp(ramp('#5a4a6a',5),y===CT?.85:.45,x,y)}else if(y<CT+60){const door=Math.floor(x/48);c=rp(ramp('#3a2a3a',5),.45+((x%48<2||y===CT+14)?-.25:0)+(x%48===24&&y>CT+30&&y<CT+40?.5:0),x,y)}else{const ch=((x>>4)+((y-CT)>>3))&1;c=ch?rp(['#1a1626','#262036'],.5,x,y):rp(['#4a4458','#5a546a'],.5,x,y)}p.px(x,y,c)}
   // window with moon
   p.rect(380,20,120,90,ramp('#3a2a3a',5),{v:.5});for(let y=24;y<106;y++)for(let x=384;x<496;x++){let c=rp(['#0a1a2a','#14304a','#1e4a6a','#2a6a7a'],(y-24)/120+.1,x,y);if(Math.hypot(x-470,y-44)<13)c=rp(['#c8e8b0','#e8ffd0','#ffffff'],.8-Math.hypot(x-470,y-44)/20,x,y);if(x===440||y===65)c='#2a1a2a';p.px(x,y,c)}
   // cobwebs
   for(const[cx,sx]of[[0,1],[R.w-1,-1]])for(let k=0;k<8;k++){p.line(cx,0,cx+sx*(k*8),40-k*5,'#8a8a9a');p.line(cx+sx*k*4,0,cx,k*4,'#6a6a7a')}
   // shelves
   for(const x of[80,700]){p.rect(x,50,100,4,ramp('#5a3a2a'),{v:.6});for(let j=0;j<5;j++)p.rect(x+8+j*18,36,10,14,ramp(['#4a8a5a','#8a3a3a','#3a5a8a','#c8a040','#6a4a8a'][j]),{v:.55})}},
  init(R){
   const toaster=(c)=>M.frames(3,32,24,(p,f)=>{const T=ramp(c,6);p.rrect(0,4,32,20,4,T,{v:.6});p.rect(5,4,8,2,'#140c1c');p.rect(19,4,8,2,'#140c1c');p.rect(28,10,4,6,ramp('#2a2a32'),{v:.5});// face
    const ey=12;if(f===2){p.rect(8,ey-1,4,4,'#140c1c');p.rect(20,ey-1,4,4,'#140c1c');p.rect(12,ey+6,8,3,'#140c1c')}else{p.rect(8,ey,4,f?1:3,'#a0ff80');p.rect(20,ey,4,f?1:3,'#a0ff80');p.rect(12,ey+6,8,1,'#140c1c')}p.rect(2,22,4,2,'#2a2a32');p.rect(26,22,4,2,'#2a2a32')});
   const toast=M.frames(2,14,16,(p,f)=>{p.rrect(0,0,14,16,4,ramp('#d8a050',6),{v:.6});p.rect(2,3,10,11,ramp('#f0d8a0',5),{v:.6});p.px(4,7,'#140c1c');p.px(9,7,'#140c1c');if(f)p.rect(5,10,4,2,'#140c1c');else p.rect(5,11,4,1,'#140c1c')});
   R.toasts=[];
   ['#a8b0c0','#d84a4a','#4a8ad8','#e0c040','#6ab06a','#c070d8'].forEach((c,i)=>{const fr=toaster(c),x=40+i*150,y=CT-24;
    const tst=M.ent(R,{fr:toast,fps:3,name:'GHOST TOAST',x:x+9,y:y-6,vis:0,st:0,hx:x+9,hy:y,z:CT+50,
     upd(e,dt,t){if(!e.st)return;e.st+=dt;if(e.st<.5){e.y=e.hy-e.st*90}else if(e.st<5){e.x=e.hx+Math.sin(e.st*1.5)*40;e.y=e.hy-45+Math.sin(e.st*2.3)*12;if(!RM&&Math.random()<.2)M.emit(R,'ghost',e.x+7,e.y+14,1)}else{e.y+=dt*120;e.x+=(e.hx-e.x)*dt*5;if(e.y>=e.hy){e.st=0;e.vis=0;M.snd('thud',2)}}},
     click(e,R){M.snd('boo',1.4);M.say(R,e.x+7,e.y-2,K.pick(['BOO!','I AM TOAST','RYE ME UP','CRUMBS...']),1);M.emit(R,'ghost',e.x+7,e.y+8,8);e.st=Math.max(e.st,4.6)}});
    M.ent(R,{fr,f:0,name:'HAUNTED TOASTER',x,y,react:false,upd(e,dt,t){if(M.now<e.pop){e.f=2;return}e.f=!RM&&Math.sin(t*2+i*1.7)>.92?1:0;if(!RM&&Math.sin(t*3+i)>.97)e._r=1},
     click(e,R){e.pop=M.now+.6;M.play(e,'shake',.5);M.snd('boing',1.3);M.snd('boo',1+i*.1);if(!tst.st){tst.st=.01;tst.vis=1;tst.x=tst.hx;tst.y=tst.hy}M.emit(R,'smoke',x+16,y,6)}})});
   // floating ghost bread slices
   const ghost=M.frames(2,16,18,(p,f)=>{const G=['#8898d0','#b8c8f0','#eef4ff','#ffffff'];p.ell(8,7,7,7,G,{b:.2,clip:(x,y)=>y<=8});p.rect(1,7,14,7,G,{v:.7,bv:.2});for(let i=0;i<4;i++)p.rect(1+i*4,14,2,f?(i%2?3:2):(i%2?2:3),G[2]);p.rect(4,6,2,3,'#140c1c');p.rect(10,6,2,3,'#140c1c');p.ell(8,11,1.5,1.5,'#140c1c')});
   for(let i=0;i<4;i++)M.ent(R,{fr:ghost,fps:3,name:'GHOST',x:100+i*220,y:60,hx:100+i*220,poof:0,upd(e,dt,t){if(e.poof){e.poof-=dt;if(e.poof<=0){e.vis=1;e.fl=M.now}return}if(!RM){e.x=e.hx+Math.sin(t*.5+i*2)*70;e.y=70+Math.sin(t*1.1+i)*20;e.flip=Math.cos(t*.5+i*2)<0}},click(e,R){M.snd('boo',.9+i*.15);M.emit(R,'ghost',e.x+8,e.y+8,14,{v:1.4});e.vis=0;e.poof=2.5;M.say(R,e.x+8,e.y,'BOOO!',.8)}});
   // hanging bulb
   M.ent(R,{x:230,y:0,w:10,h:36,box:1,name:'FLICKERING BULB',draw(g,X,Y,t,e,sel){g.fillStyle='#2a2a32';g.fillRect(X+4,Y,2,26);const on=RM||(M.now<e.fk?Math.random()>.5:H(Math.floor(t*8),3)>.12);g.fillStyle=on?'#fff4a0':'#4a4a3a';g.fillRect(X+2,Y+26,6,7);g.fillRect(X+3,Y+33,4,2);if(on){g.fillStyle='#ffffff';g.fillRect(X+3,Y+27,1,2)}if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y+37,10,1)}},click(e,R){e.fk=M.now+1.2;K.flash(R,'#d8f0ff',.2);M.snd('zap',.7);M.snd('rumble',1.6)}});
   // fridge
   const fr=M.frames(2,40,70,(p,f)=>{p.rrect(0,0,40,70,3,ramp('#c8d0d8',6),{v:.6});p.rect(0,24,40,1,'#6a6a7a');p.rect(34,8,2,12,'#8a8a9a');p.rect(34,30,2,20,'#8a8a9a');if(f){p.rect(2,26,30,42,['#0a0a0a','#141414'],{bv:0});p.disc(12,40,2,'#ff3030');p.disc(22,40,2,'#ff3030');p.px(12,39,'#ffffff');p.px(22,39,'#ffffff')}p.rect(6,6,8,6,ramp('#ff6a8a'),{v:.6});p.rect(18,10,6,6,ramp('#6ad0ff'),{v:.6})});
   M.ent(R,{fr,f:0,name:'HAUNTED FRIDGE',x:880,y:CT-56,z:CT+20,click(e,R){e.f=1;M.snd('creak',1);setTimeout(()=>M.snd('roar',1.8),300);M.say(R,e.x+20,e.y,'HUNGRY...',1.3);M.emit(R,'ghost',e.x+18,e.y+40,8);setTimeout(()=>e.f=0,1800)}});
   // cuckoo clock
   const ck=M.frames(2,24,34,(p,f)=>{p.poly([[0,10],[12,0],[24,10]],ramp('#6a3a20',6),{v:.6});p.rect(2,10,20,18,ramp('#8a5a2a',6),{v:.55});p.ell(12,20,6,6,ramp('#f4ecdc'),{b:.2});p.line(12,20,12,16,'#140c1c');p.line(12,20,15,20,'#140c1c');p.rect(9,11,6,4,'#140c1c');if(f){p.rect(10,5,5,6,ramp('#8898d0'),{v:.7});p.px(11,6,'#140c1c');p.px(14,8,'#ffa040')}p.rect(8,28,2,6,'#c8a040');p.rect(14,28,2,4,'#c8a040')});
   M.ent(R,{fr:ck,f:0,name:'CUCKOO CLOCK',x:560,y:22,click(e,R){e.f=1;for(let k=0;k<3;k++)setTimeout(()=>M.snd('boo',2),k*350);M.say(R,e.x+12,e.y-2,'BOO-KOO!',1.2);setTimeout(()=>e.f=0,1200)}});
   // bats outside
   const bat=M.frames(2,10,5,(p,f)=>{p.rect(4,1,2,3,'#140c1c');if(f){p.line(0,0,4,2,'#140c1c');p.line(9,0,5,2,'#140c1c')}else{p.line(0,4,4,2,'#140c1c');p.line(9,4,5,2,'#140c1c')}},false);
   for(let i=0;i<3;i++)M.ent(R,{fr:bat,fps:8,name:'BAT',x:400+i*30,y:40+i*14,a:i*2,sc:0,upd(e,dt,t){e.a+=dt*(e.sc>M.now?3:.8);if(!RM){e.x=440+Math.cos(e.a)*(40+(e.sc>M.now?80:0));e.y=60+Math.sin(e.a*1.3)*24}},click(e,R){e.sc=M.now+2;M.snd('yip',2.4);M.say(R,e.x+5,e.y-2,'EEK!',.6)}});
   // candles
   for(let i=0;i<3;i++){const x=150+i*300;M.ent(R,{x,y:CT-14,w:6,h:14,box:1,name:'CANDLE',draw(g,X,Y,t,e,sel){g.fillStyle='#e8e0c8';g.fillRect(X+1,Y+5,4,9);g.fillStyle='#c8c0a8';g.fillRect(X+4,Y+5,1,9);if(M.now>e.out){const h=RM?3:3+Math.round(Math.sin(t*14+i));g.fillStyle='#ffc040';g.fillRect(X+2,Y+5-h,2,h);g.fillStyle='#fff4b0';g.fillRect(X+2,Y+4,1,1)}if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y+15,6,1)}},out:0,click(e,R){e.out=M.now+2;M.emit(R,'smoke',e.x+3,e.y,6);M.snd('whoosh',2.5);M.say(R,e.x+3,e.y-4,'WHO BLEW THAT?',1)}})}
   K.visitors(R,2,RH-4,['SPOOKY!','IS IT TOAST?','EEEK!','I HEARD A BOO'],{off:1})},
  front(R,g){K.drawFlash(R,g)}});
}

/* ================= TINY KINGDOMS IN JARS ================= */
{const SH=[118,232];
 const JARS=[{nm:'CASTLE KINGDOM',sky:'#6ab0e8',gnd:'#4a9a3a',ev:'fireworks'},{nm:'VOLCANO ISLAND',sky:'#e88a5a',gnd:'#3a7a8a',ev:'lava'},{nm:'SNOWY VILLAGE',sky:'#8aa8d0',gnd:'#e8f0f8',ev:'snow'},{nm:'CORAL REEF',sky:'#2a6aa0',gnd:'#d8c890',ev:'bubbles'},
  {nm:'FAIRY FOREST',sky:'#2a3a5a',gnd:'#2a6a3a',ev:'fireflies'},{nm:'DESERT PYRAMIDS',sky:'#f0c880',gnd:'#e0b060',ev:'sand'},{nm:'SKY ISLAND',sky:'#9ad8ff',gnd:'#5ab04a',ev:'dragon'},{nm:'NIGHT CITY',sky:'#141a3a',gnd:'#3a3a4a',ev:'lights'}];
 const JW=56,JH=72;
 const scene=(j,p)=>{const S=ramp(j.sky,5),G=ramp(j.gnd,5);for(let y=8;y<JH;y++)for(let x=0;x<JW;x++)p.px(x,y,rp(S,.8-y/JH*.4,x,y));for(let y=50;y<JH;y++)for(let x=0;x<JW;x++)p.px(x,y,rp(G,.6-(y-50)/40,x,y));
  switch(j.ev){case'fireworks':p.rect(18,30,20,20,ramp('#b0a8a0'),{v:.6});p.rect(14,24,6,26,ramp('#b0a8a0'),{v:.6});p.rect(36,24,6,26,ramp('#b0a8a0'),{v:.5});p.poly([[13,24],[17,16],[21,24]],ramp('#4a5ad8'),{});p.poly([[35,24],[39,16],[43,24]],ramp('#4a5ad8'),{});p.rect(25,40,6,10,'#3a2a1a');p.rect(26,22,1,8,'#3a2a1a');p.rect(27,22,5,3,'#e04a3a');break;
   case'lava':p.poly([[10,50],[28,18],[46,50]],ramp('#6a4a3a'),{v:.5});p.poly([[24,22],[28,18],[32,22],[30,30],[26,28]],ramp('#ff6a20'),{});p.rect(8,48,40,3,ramp('#d8c070'),{});break;
   case'snow':for(let i=0;i<3;i++){const x=6+i*16;p.rect(x,38,12,12,ramp(['#c86a4a','#6a8ac8','#c8a040'][i]),{v:.6});p.poly([[x-1,38],[x+6,31],[x+13,38]],ramp('#f4f8ff'),{});p.rect(x+4,43,3,4,'#ffe080')}p.poly([[40,50],[46,30],[52,50]],ramp('#2a6a3a'),{});break;
   case'bubbles':for(let i=0;i<4;i++){p.rect(8+i*12,40-i%2*6,3,12+i%2*6,ramp(['#ff6a8a','#ffa040','#c06aff','#40e0c0'][i]),{v:.6})}p.ell(30,30,5,3,ramp('#ffd040'),{});p.px(33,29,'#140c1c');break;
   case'fireflies':for(let i=0;i<3;i++){p.rect(8+i*18,34,3,16,ramp('#5a3a2a'),{});p.ell(9+i*18,28,8,8,ramp('#2a8a3a'),{b:.1})}p.ell(28,46,4,3,ramp('#e04a6a'),{});p.rect(27,46,2,4,'#f0f0e0');break;
   case'sand':p.poly([[6,50],[20,26],[34,50]],ramp('#e8c070'),{v:.6});p.poly([[28,50],[40,32],[52,50]],ramp('#d8b060'),{v:.5});p.rect(40,12,6,6,'#fff4a0');break;
   case'dragon':p.ell(28,44,20,7,ramp('#8a6a4a'),{b:.1});p.ell(28,40,18,5,G,{b:.1});p.rect(22,30,10,10,ramp('#f0e0d0'),{v:.6});p.poly([[21,30],[27,24],[33,30]],ramp('#c83a3a'),{});for(let i=0;i<3;i++)p.ell(10+i*16,16+i%2*4,6,3,ramp('#ffffff'),{b:.2});break;
   case'lights':for(let i=0;i<5;i++){const h=14+H(i,7)*24;p.rect(3+i*10,50-h,9,h,ramp('#2a2a40'),{v:.5})}p.disc(44,14,4,'#f0f0d0');break}};
 K.ext('jars',{start:500,top:'#1a0e08',bot:'#2a1a10',
  bg(p,R){for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c=rp(['#140a06','#24140a','#341e10','#46281a','#5a3622'],.35+((x%60)<2?-.2:0)+(vn(x/10,y/50)-.5)*.2+H(Math.floor(x/60),1)*.1,x,y);p.px(x,y,c)}
   for(const sy of SH){for(let x=0;x<R.w;x++){for(let y=sy;y<sy+8;y++)p.px(x,y,rp(ramp('#8a5a32',6),.75-(y-sy)/9,x,y));p.px(x,sy+8,'#140a06')}for(let x=40;x<R.w;x+=180){p.poly([[x,sy+8],[x+14,sy+8],[x,sy+22]],ramp('#6a4222'),{})}}},
  init(R){R.jfx=[];
   JARS.forEach((j,i)=>{const sx=90+(i%4)*240+(i>=4?110:0),sy=SH[i>=4?1:0]-JH;const inner=K.spr(JW,JH,p=>scene(j,p),false);
    const glass=K.spr(JW+6,JH+12,p=>{for(let y=10;y<JH+12;y++)for(let x=0;x<JW+6;x++){const ex=x===0||x===JW+5||y===JH+11,ey=x===1||x===JW+4||y===JH+10;if(y<14&&(x<3||x>JW+2))continue;if(ex)p.px(x,y,'#2a4a5a');else if(ey)p.px(x,y,'#7ab0c0')}p.rect(4,0,JW-2,8,ramp('#a8703a',6),{v:.6,tex:(x,y)=>(x%4===0?-.1:0)});p.rect(2,7,JW+2,4,ramp('#6a4a2a'),{v:.5});for(let y=16;y<JH;y++){p.px(6,y,'#ffffff');if(y%3)p.px(7,y,'#c8f0ff')}p.rect(JW-4,20,2,10,'#c8f0ff')});
    M.ent(R,{x:sx,y:sy,w:JW+6,h:JH+12,box:1,name:j.nm,act:0,
     draw(g,X,Y,t,e,sel){g.drawImage(inner.c,X+3,Y+10-6);const a=M.now-e.act,on=a<3;
      // live inhabitants per jar
      g.save();g.beginPath();g.rect(X+3,Y+12,JW,JH-2);g.clip();const tt=RM?0:t;
      switch(j.ev){case'fireworks':g.fillStyle='#d0d0e0';g.fillRect(X+10+Math.round((Math.sin(tt)*.5+.5)*30),Y+56,2,4);if(on)for(let k=0;k<12;k++){const an=k/12*TAU,r=a*14;g.fillStyle=['#ff5a6a','#ffd040','#5ad0ff'][k%3];g.fillRect(Math.round(X+30+Math.cos(an)*r),Math.round(Y+22+Math.sin(an)*r),1,1)}break;
       case'lava':if(on)for(let k=0;k<10;k++){const q=(a*1.5+k*.1)%1;g.fillStyle=k%2?'#ff7020':'#ffd040';g.fillRect(Math.round(X+31+(k-5)*q*4),Math.round(Y+16-Math.sin(q*Math.PI)*12+q*20),1,1)}else{g.fillStyle='#ff9a3a';if(Math.sin(tt*3)>0)g.fillRect(X+30,Y+16,2,1)}break;
       case'snow':for(let k=0;k<(on?40:10);k++){g.fillStyle='#ffffff';g.fillRect(Math.round(X+3+H(k,1)*JW+Math.sin(tt+k)*2),Math.round(Y+12+((H(k,2)*JH+tt*(on?30:8))%(JH-14))),1,1)}break;
       case'bubbles':for(let k=0;k<(on?16:4);k++){g.fillStyle='#c8f6ff';g.fillRect(Math.round(X+8+H(k,3)*44),Math.round(Y+JH-((H(k,4)*JH+tt*20)%(JH-12))),1,1)}g.fillStyle='#ffd040';g.fillRect(Math.round(X+30+Math.sin(tt)*14),Y+34,4,2);break;
       case'fireflies':for(let k=0;k<(on?24:7);k++){if(Math.sin(tt*3+k)<0)continue;g.fillStyle='#e0ff80';g.fillRect(Math.round(X+8+H(k,5)*44+Math.sin(tt+k)*4),Math.round(Y+18+H(k,6)*36+Math.cos(tt*1.3+k)*3),1,1)}break;
       case'sand':if(on)for(let k=0;k<40;k++){g.fillStyle=k%2?'#e8c070':'#c8a050';g.fillRect(Math.round(X+3+((H(k,7)*JW+a*60)%JW)),Math.round(Y+30+H(k,8)*30),1,1)}g.fillStyle='#8a6a3a';g.fillRect(Math.round(X+10+((tt*4)%36)),Y+52,4,3);break;
       case'dragon':{const dx=Math.round(X+30+Math.cos(tt*(on?3:1))*20),dy=Math.round(Y+24+Math.sin(tt*(on?3:1)*2)*6);g.fillStyle='#d83a3a';g.fillRect(dx-2,dy,5,2);g.fillRect(dx-3+(Math.floor(tt*8)%2?0:1),dy-1,2,1);g.fillRect(dx+2,dy-1,2,1);if(on){g.fillStyle='#ffa040';g.fillRect(dx+4,dy,2,1)}break}
       case'lights':for(let k=0;k<20;k++){const on2=on?(k+Math.floor(a*8))%3===0:H(k,Math.floor(tt*.5))>.5;if(!on2)continue;g.fillStyle=on?'#ff8af0':'#ffe080';g.fillRect(X+5+(k%5)*10+((k>>2)&1)*3,Y+40-((k*7)%20),1,1)}break}
      g.restore();if(sel)g.drawImage(M.ring(glass),X-1,Y-1);g.drawImage(glass.c,X,Y)},
     click(e,R){e.act=M.now;M.play(e,'jiggle',.4);M.snd(['tada','rumble','chime','bubble','chime','whoosh','roar','beep'][i],[1.2,1.4,1.6,1.5,2,1.5,2.2,1.3][i]);M.say(R,e.x+31,e.y-2,j.nm,1.2);M.emit(R,'star',e.x+31,e.y+10,8)}})});
   // curator gnome with magnifying glass
   const gn=M.frames(2,18,26,(p,f)=>{p.poly([[3,10],[9,0],[15,10]],ramp('#d83a3a'),{v:.6});p.ell(9,13,5,4,ramp('#f0c8a0'),{b:.15});p.ell(9,17,5,4,ramp('#f4f4f4'),{b:.2});p.rrect(3,18,12,8,2,ramp('#3a6ad8'),{v:.55});p.px(7,12,'#140c1c');p.px(11,12,'#140c1c');if(f){p.ell(16,10,2.5,2.5,['#8ad0ff','#c8f0ff'],{});p.line(15,13,14,17,'#6a4220')}});
   M.ent(R,{fr:gn,f:0,name:'CURATOR GNOME',x:40,y:SH[1]-26,click(e,R){e.f^=1;M.snd('blip',1.8);M.say(R,e.x+9,e.y-2,K.pick(['LOOK CLOSER!','TINY, ISNT IT?','DONT SHAKE THEM!','I MADE THESE']),1.4)}});
   // dusty book stack + candle
   M.ent(R,{x:R.w-60,y:SH[0]-18,spr:K.spr(30,18,p=>{for(let i=0;i<3;i++)p.rect(i*2,12-i*6,26-i*3,6,ramp(['#7a2a3a','#2a4a7a','#3a6a3a'][i]),{v:.55})}),name:'OLD BOOKS',react:'hop',fx:'dust',fxn:8,snd:'thud',sp:1.6})}});
}
})();
