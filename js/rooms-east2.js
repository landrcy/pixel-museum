/* East wing (part 2): Cat Astronauts, Slime Lab, Robot Breakroom, Upside-Down Room, Giant Snack Hall */
(()=>{'use strict';
const{ramp,rp,vn,fbm,H,bay,TAU,RM,mix,clamp,lerp,RH}=M,K=M.K;

/* ================= CAT ASTRONAUTS ================= */
{const FL=210;
 K.ext('cats',{start:500,top:'#1a1e2e',bot:'#20242e',
  bg(p,R){for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c;const px=x%64,py=y%48;
    if(y<FL)c=rp(['#20242e','#2e3444','#3e4658','#566078','#7a849a'],.45+(px<2||py<2?-.25:0)+(px===2||py===2?.2:0)+(y<16?-.2:0),x,y);else c=rp(['#1a1c24','#2a2e3a','#3a3e4c','#4a4e5c'],.55+((x%24)<1||((y-FL)%12)<1?-.3:0)+((x%24)===1||((y-FL)%12)===1?.2:0),x,y);p.px(x,y,c)}
   // round portholes with space outside
   for(let i=0;i<5;i++){const cx=100+i*200,cy=70;for(let y=cy-30;y<=cy+30;y++)for(let x=cx-30;x<=cx+30;x++){const d=Math.hypot(x-cx,y-cy);if(d>30)continue;if(d>25){p.px(x,y,rp(ramp('#b8bcc8',6),.8-(x-cx+y-cy)/80,x,y));continue}let c=rp(['#02030c','#060a20','#0a1438'],.3+vn(x/9,y/9)*.4,x,y);if(H(x,y)>.985)c='#ffffff';if(i===2&&Math.hypot(x-cx+6,y-cy-6)<12)c=rp(['#c8a020','#f0d040','#fff4a0'],.9-Math.hypot(x-cx+10,y-cy-2)/16,x,y);if(i===2&&H(Math.floor(x/3),Math.floor(y/3))>.8&&Math.hypot(x-cx+6,y-cy-6)<12)c='#c08a20';if(i===4&&Math.hypot(x-cx-4,y-cy-4)<16)c=rp(['#14408a','#2a6ad8','#4ab04a','#ffffff'],.4+fbm(x/6,y/6)*.6,x,y);if(d>24)c='#8ab0c8';p.px(x,y,c)}for(let k=0;k<8;k++){const a=k/8*TAU;p.disc(cx+Math.cos(a)*27.5,cy+Math.sin(a)*27.5,1,'#5a5e6a')}}
   M.ftext(p,'MEOWSION CONTROL',380,FL-40,'#7af0ff','#0a2030');
   // floor rails
   for(let x=0;x<R.w;x++)p.px(x,FL,'#8a90a0')},
  init(R){R.yarn=null;R.dot=null;
   const CATC=[['#f0a040','#fff0d8'],['#3a3a44','#ffffff'],['#d8d8e0','#ffffff'],['#a86a3a','#f0d0a0'],['#8a8a9a','#e0e0e8'],['#f0f0f0','#f0a040']];
   const catFr=(c,b)=>M.frames(3,26,26,(p,f)=>{const C=ramp(c,6),W=ramp('#e8ecf4',6);// suit
     p.rrect(6,14,14,10,3,W,{v:.6});p.rect(4,15+(f===1?-4:0),3,6,W,{v:.5});p.rect(19,15,3,6,W,{v:.5});p.rect(7,23,4,3,W,{v:.45});p.rect(15,23,4,3,W,{v:.45});
     p.poly([[20,20],[25,14+(f===2?-4:0)],[24,20]],C,{});// tail
     p.ell(13,9,8,7,C,{b:.12});p.poly([[6,6],[7,0],[11,4]],C,{});p.poly([[20,6],[19,0],[15,4]],C,{});p.ell(13,11,4,2.5,ramp(b,4),{b:.2});
     p.rect(9,7,2,f===2?1:2,'#140c1c');p.rect(16,7,2,f===2?1:2,'#140c1c');p.px(13,10,'#ff8aa8');p.px(9,7,'#7aff8a');p.px(16,7,'#7aff8a');
     // helmet bubble
     for(let a=0;a<64;a++){const an=a/64*TAU,x=Math.round(13+Math.cos(an)*11),y=Math.round(9+Math.sin(an)*9);if(y<16)p.px(x,y,'#c8f0ff')}p.px(7,4,'#ffffff');p.px(8,3,'#ffffff');p.rect(9,16,8,2,'#4a8ad8')});
   R.cats=CATC.map(([c,b],i)=>{const fr=catFr(c,b),up=fr.map(K.vflip);return M.ent(R,{fr,f:0,name:['CAPTAIN WHISKERS','MISSION MITTENS','ASTRO SNOWBALL','COMMANDER TOAST','LT. SOCKS','PILOT NOODLE'][i],
     x:80+i*150,y:60+(i%3)*40,hx:80+i*150,hy:60+(i%3)*40,a:i,ch:0,tum:0,
     upd(e,dt,t){if(e.tum>0){e.tum-=dt;const q=1-e.tum;e.fr=q>.25&&q<.75?up:fr;e.flip=q>.5}else e.fr=fr;
      let tx=e.hx+Math.sin(t*.4+i)*30,ty=e.hy+Math.sin(t*.7+i*2)*14;const tg=R.dot&&M.now<R.dot.t?R.dot:(R.yarn&&R.yarn.vis&&R.yarn.st?R.yarn:null);if(tg&&Math.hypot(tg.x-e.x,tg.y-e.y)<260){tx=tg.x-13;ty=tg.y-13;e.f=2}else e.f=Math.sin(t*2+i)>.9?1:0;if(RM){if(!tg)return}e.flip=e.tum>0?e.flip:tx<e.x;e.x+=(tx-e.x)*Math.min(1,dt*(tg?1.6:.8));e.y+=(ty-e.y)*Math.min(1,dt*(tg?1.6:.8));e.y=clamp(e.y,20,FL-24)},
     click(e,R){e.tum=1;M.snd('meow',1.2+i*.1);M.say(R,e.x+13,e.y-2,K.pick(['MEOW!','MRRROW?','PURR-PULSION!','ONE SMALL PAW...','NYA!']),1);M.emit(R,'heart',e.x+13,e.y+4,6)}})});
   // yarn ball
   const yarn=K.spr(12,12,p=>{p.ell(6,6,5.5,5.5,ramp('#e04a8a',6),{b:.1});for(let i=0;i<4;i++)p.line(2,3+i*2,10,2+i*2+(i%2),'#ff8ac0')});
   R.yarn=M.ent(R,{spr:yarn,name:'YARN BALL',x:480,y:150,vx:0,vy:0,st:0,upd(e,dt){if(!e.st)return;e.x+=e.vx*dt;e.y+=e.vy*dt;if(e.x<10||e.x>R.w-20)e.vx*=-1;if(e.y<20||e.y>FL-12)e.vy*=-1;e.st-=dt;if(e.st<=0){e.st=0;e.vx=e.vy=0}},click(e,R){e.st=6;const a=Math.random()*TAU;e.vx=Math.cos(a)*70;e.vy=Math.sin(a)*50;M.snd('boing',1.2);M.say(R,e.x+6,e.y-2,'YARN!!',.7)}});
   // laser pointer
   M.ent(R,{x:870,y:FL-18,spr:K.spr(20,8,p=>{p.rrect(0,1,18,6,2,ramp('#3a3a48',6),{v:.55});p.rect(18,3,2,2,'#ff3030');p.px(5,3,'#ff3030')}),name:'LASER POINTER',react:'jiggle',click(e,R){R.dot={x:R.cam.x+60+Math.random()*(M.BW-120),y:40+Math.random()*120,t:M.now+5,t0:M.now};M.snd('laser',1.6)}});
   // treat dispenser
   M.ent(R,{x:640,y:FL-30,spr:K.spr(22,30,p=>{p.rrect(0,0,22,30,3,ramp('#c8ccd8',6),{v:.6});p.rect(4,4,14,10,['#0a2030','#1a4a6a'],{v:.4});p.ell(11,9,4,2,ramp('#ff8a4a'),{});p.px(15,9,'#ff8a4a');p.rect(7,18,8,8,ramp('#4a4a58'),{v:.5});p.rect(9,20,4,4,'#140c1c')}),name:'TUNA DISPENSER',react:'shake',click(e,R){M.react(R,e);M.snd('pop',1.2);for(let k=0;k<6;k++){const f=M.ent(R,{spr:K.spr(8,4,p=>{p.ell(4,2,3.5,1.8,ramp('#ff8a4a'),{});p.px(1,1,'#ffd040')}),x:e.x+8,y:e.y,vx:(Math.random()-.5)*60,vy:-30-Math.random()*40,life:4,name:'TUNA SNACK',upd(f,dt){f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy*=.99;f.life-=dt;const c=R.cats.find(c=>Math.hypot(c.x+13-f.x,c.y+13-f.y)<14);if(c||f.life<0){f.dead=1;f.vis=0;if(c){M.emit(R,'heart',f.x,f.y,3);M.snd('blip',2)}}}});}}});
   // control console + space litter box
   M.ent(R,{x:380,y:FL-34,w:100,h:34,box:1,name:'MISSION CONSOLE',draw(g,X,Y,t,e,sel){g.fillStyle='#2a2e3a';g.fillRect(X,Y+8,100,26);g.fillStyle='#4a5060';g.fillRect(X,Y+8,100,2);for(let i=0;i<12;i++){const on=RM?i%2:H(i,Math.floor(t*3+(M.now<e.al?t*10:0)))>.5;g.fillStyle=on?['#ff4a4a','#4aff7a','#ffd040','#4ad0ff'][i%4]:'#1a1c24';g.fillRect(X+6+i*7,Y+14,4,3)}g.fillStyle='#0a2030';g.fillRect(X+30,Y+20,40,10);g.fillStyle='#7af0ff';const w=Math.floor((RM?0:t)*20)%40;g.fillRect(X+30+w,Y+24,2,2);if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y+6,100,1)}},click(e,R){e.al=M.now+1.5;M.snd('beep',1);M.snd('beep',1.5);M.say(R,e.x+50,e.y,'LAUNCH THE KIBBLE!',1.2)}});
   M.ent(R,{x:120,y:FL-12,spr:K.spr(30,12,p=>{p.rrect(0,2,30,10,2,ramp('#6a8ad8',6),{v:.55});p.rect(2,0,26,4,ramp('#e8dcb0'),{v:.6})}),name:'ZERO-G LITTER BOX',react:'jiggle',fx:'dust',fxn:10,snd:'squish',sp:1.4,say:'DONT ASK.'});
   K.visitors(R,2,RH-4,['CATS IN SPACE!','SO FLOATY','PSPSPSPS'],{off:3})},
  front(R,g,ox,oy,t){const d=R.dot;if(d&&M.now<d.t){const q=M.now-d.t0;d.x+=Math.sin(q*3)*1.6;d.y+=Math.cos(q*2.3)*1.2;g.fillStyle='#ff3030';g.fillRect(Math.round(d.x+ox)-1,Math.round(d.y+oy),3,1);g.fillRect(Math.round(d.x+ox),Math.round(d.y+oy)-1,1,3);g.fillStyle='#ffd0d0';g.fillRect(Math.round(d.x+ox),Math.round(d.y+oy),1,1)}},
  tap(R,x,y){R.dot={x,y,t:M.now+3,t0:M.now};M.snd('laser',2)}});
}

/* ================= SLIME LAB ================= */
{const FL=200;
 K.ext('slime',{start:500,top:'#0a1a12',bot:'#10161a',
  bg(p,R){for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c;if(y<FL){c=rp(['#0a140e','#122218','#1a3022','#24402e','#30523c'],.35+((x%32<1||y%32<1)?-.2:0)+Math.max(0,.3-Math.abs(y-60)/200)+(vn(x/40,y/40)-.5)*.15,x,y)}else c=rp(['#10161a','#1a2228','#26303a'],.45+(((x>>3)+(y>>3))&1?.08:0),x,y);p.px(x,y,c)}
   // hazard stripes + pipes
   for(let x=0;x<R.w;x++)for(let y=FL-6;y<FL;y++)p.px(x,y,((x+y)>>2)&1?'#e0c020':'#1a1a1a');
   for(let i=0;i<3;i++){const y=20+i*10;p.rect(0,y,R.w,4,ramp(['#6a7a6a','#5a6a7a','#7a6a5a'][i]),{v:.6});for(let x=40+i*70;x<R.w;x+=200)p.rect(x,y-1,4,6,ramp('#8a8a8a'),{v:.5})}
   // biohazard sign
   p.rect(860,70,40,40,ramp('#e0c020'),{v:.6});p.ell(880,90,10,10,['#1a1a1a'],{});p.ell(880,90,5,5,['#e0c020'],{});M.ftext(p,'SLIME',863,114,'#7aff6a','#0a1a0a')},
  init(R){
   const COL=['#5aff4a','#ff4aa8','#4ac8ff','#ffd040','#b06aff','#ff8a2a'];
   const slimeFr=(c,s)=>M.frames(3,Math.round(22*s),Math.round(18*s),(p,f)=>{const w=22*s,h=18*s,C=['#140c1c',...ramp(c,5)];const sq=[0,2,-2][f]*s;p.ell(w/2,h-1-(h/2-1+(f===2?1:0)*s)+sq/2,w/2-1+sq,h/2-1-sq/2,ramp(c,6),{b:.18,spec:'#ffffff',clip:(x,y)=>y<h-1});p.rect(1,h-2,w-2,1,ramp(c,6)[1]);p.rect(Math.round(w*.32),Math.round(h*.45),Math.max(1,Math.round(2*s)),Math.max(1,Math.round(3*s)),'#140c1c');p.rect(Math.round(w*.6),Math.round(h*.45),Math.max(1,Math.round(2*s)),Math.max(1,Math.round(3*s)),'#140c1c')});
   const FRS=COL.map(c=>[slimeFr(c,1),slimeFr(c,.6)]);
   R.slimes=[];const add=(ci,sm,x,y)=>{const fr=FRS[ci][sm?1:0];const e=M.ent(R,{fr,f:0,name:sm?'BABY SLIME':['GLOOP','BLOOP','SPLORT','GOOEY','WOBBLES','OOZE'][ci],x,y,vx:(Math.random()-.5)*20,vy:0,air:0,ci,sm,
     upd(e,dt,t){if(e.air){e.vy+=300*dt;e.y+=e.vy*dt;e.x+=e.vx*dt;if(e.y>=FL+30-fr[0].h+(e.ly||0)){e.y=FL+30-fr[0].h+(e.ly||0);e.air=0;e.f=1;e.sq=M.now+.2;M.emit(R,'slime',e.x+fr[0].w/2,e.y+fr[0].h,6,{c:ramp(COL[ci],4)})}}else{e.f=M.now<e.sq?1:(RM?0:Math.floor(t*2+ci)%2?0:2);if(!RM&&Math.random()<dt*.4){e.air=1;e.vy=-90;e.vx=(Math.random()-.5)*60}}e.x=clamp(e.x,10,R.w-30);e.flip=e.vx<0},
     click(e,R){M.snd('squish',sm?1.8:1);e.air=1;e.vy=-160;M.emit(R,'slime',e.x+fr[0].w/2,e.y+fr[0].h/2,10,{c:ramp(COL[ci],4)});if(!sm&&R.slimes.length<26){for(const d of[-1,1]){const b=add(ci,1,e.x+fr[0].w/2,e.y);b.air=1;b.vy=-140;b.vx=d*50;b.ly=Math.round(Math.random()*30)}M.say(R,e.x+11,e.y-2,'SPLIT!',.7)}else M.say(R,e.x+6,e.y-2,'BLIP!',.5)}});e.ly=Math.round(Math.random()*30);R.slimes.push(e);return e};
   // particle type 'slime' (registered once)
   if(!M.PT.slime)M.PT.slime={c:['#5aff4a'],l:[.4,.8],v:[30,70],g:180,s:'px'};
   for(let i=0;i<6;i++)add(i,0,80+i*150,FL+10);
   // vats
   const vat=c=>M.frames(3,40,80,(p,f)=>{const C=ramp(c,6);p.rect(2,0,36,6,ramp('#8a8a9a'),{v:.6});for(let y=6;y<70;y++)for(let x=3;x<37;x++){let col=y<14+f?'#0a1a1a':rp(C,.55-(y-20)/150+((x+f*3)%11===0?.15:0),x,y);if(x===6||x===7)col='#e8ffff';if(x===3||x===36)col='#8ab0b0';p.px(x,y,col)}p.rect(0,70,40,10,ramp('#5a5a6a'),{v:.6});p.disc(12,70-((f*13)%40)-8,1.5,'#ffffff');p.disc(26,70-((f*21+10)%50)-8,1,'#ffffff')});
   [['#5aff4a',0],['#ff4aa8',1],['#4ac8ff',2],['#b06aff',4]].forEach(([c,ci],i)=>M.ent(R,{fr:vat(c),fps:3,name:'SLIME VAT',x:110+i*230,y:FL-80,react:'jiggle',click(e,R){M.react(R,e);M.snd('bubble',.7);M.emit(R,'bubble',e.x+20,e.y+20,14,{rx:12,ry:20});if(R.slimes.length<26){const s=add(ci,0,e.x+10,e.y);s.air=1;s.vy=-200;s.vx=(Math.random()-.5)*80;M.say(R,e.x+20,e.y-2,'A NEW SLIME!',1)}}}));
   // mixing station
   M.ent(R,{x:700,y:FL-34,w:60,h:34,box:1,name:'MIXING STATION',mx:0,draw(g,X,Y,t,e,sel){g.fillStyle='#3a4048';g.fillRect(X,Y+20,60,14);g.fillStyle='#5a6068';g.fillRect(X,Y+20,60,2);const q=M.now-e.mx,on=q<1.5;for(let i=0;i<3;i++){const bx=X+6+i*18,by=Y+4+(on&&i!==1?-Math.round(Math.sin(Math.min(1,q)*Math.PI)*6):0);g.fillStyle='#c8f0ff';g.fillRect(bx,by,10,16);g.fillStyle=i===1&&on?['#ff4a4a','#ffd040','#5aff4a','#4ac8ff','#b06aff'][Math.floor(q*10)%5]:['#ff4aa8','#ffffff','#4ac8ff'][i];g.fillRect(bx+1,by+6,8,9);g.fillStyle='#ffffff';g.fillRect(bx+1,by+1,1,13)}if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y+35,60,1)}},click(e,R){e.mx=M.now;M.snd('bubble',1.2);M.snd('tada',1.5);M.emit(R,'confetti',e.x+30,e.y,16);setTimeout(()=>{if(R.slimes.length<26){const s=add(Math.floor(Math.random()*6),0,e.x+20,e.y);s.air=1;s.vy=-220;s.vx=-40}},700);M.say(R,e.x+30,e.y-4,'RAINBOW GOO!',1)}});
   // tesla coil
   M.ent(R,{x:960,y:FL-70,w:24,h:70,box:1,name:'TESLA COIL',zp:0,draw(g,X,Y,t,e,sel){g.fillStyle='#4a3a2a';g.fillRect(X+4,Y+60,16,10);for(let y=14;y<60;y+=2){g.fillStyle=y%4?'#c08040':'#8a5a2a';g.fillRect(X+8,Y+y,8,2)}g.fillStyle='#b8bcc8';g.fillRect(X+2,Y+6,20,8);g.fillStyle='#e8ecf4';g.fillRect(X+4,Y+6,10,2);const on=M.now<e.zp||(!RM&&Math.sin(t*1.7)>.97);if(on){g.fillStyle='#c8f0ff';let x=X+12,y=Y+6;for(let k=0;k<20;k++){x+=Math.round((Math.random()-.5)*6);y-=1+Math.round(Math.random());g.fillRect(x,y,1,1);if(y<0)break}}if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y+71,24,1)}},click(e,R){e.zp=M.now+.8;M.snd('zap',.8);K.flash(R,'#c8f0ff',.15);M.emit(R,'zap',e.x+12,e.y+6,20);R.slimes.forEach(s=>{if(Math.abs(s.x-e.x)<200){s.air=1;s.vy=-180}})}});
   // lab computer + goggles scientist
   M.ent(R,{x:30,y:FL-40,spr:K.spr(36,40,p=>{p.rect(0,30,36,10,ramp('#3a4048'),{v:.55});p.rect(4,2,28,22,ramp('#c8ccc0',6),{v:.6});p.rect(7,5,22,15,['#0a1a0a','#14301a'],{v:.4});for(let i=0;i<4;i++)p.rect(9,7+i*3,6+H(i,1)*12,1,'#5aff4a');p.rect(14,24,8,6,ramp('#a8aca0'),{v:.5})}),name:'LAB COMPUTER',react:'jiggle',snd:'beep',sp:1.4,say:'ANALYSIS: GOOPY'});
   K.visitors(R,3,RH-4,['EW, STICKY!','SO SQUISHY','CAN I TOUCH IT?','IT BLINKED!'],{off:4})},
  front(R,g){K.drawFlash(R,g)},
  tap(R,x,y){M.emit(R,'bubble',x,y,4);M.snd('bubble',1.6)}});
}

/* ================= ROBOT BREAKROOM ================= */
{const FL=190;
 K.ext('robots',{start:500,top:'#d8d4c8',bot:'#5a5a62',
  bg(p,R){for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c;if(y<FL){c=rp(['#8a8a82','#a8a89e','#c4c2b6','#dcd8cc','#eeeae0'],.55+(y>FL-40?-.12:0)+(y===FL-40?-.3:0)-(y<10?.2:0),x,y)}else c=rp(['#3a3a42','#4a4a52','#5a5a62','#6a6a74'],.5+(((x>>4)+((y-FL)>>4))&1?.1:0),x,y);p.px(x,y,c)}
   // windows + poster + clock
   for(let i=0;i<3;i++){const x=60+i*340;p.rect(x,30,90,60,ramp('#6a6a72'),{v:.5});for(let y=34;y<86;y++)for(let X=x+4;X<x+86;X++)p.px(X,y,rp(['#4a7ab0','#7ab0e0','#b0e0ff'],.4+(y-34)/80,X,y));p.rect(x+44,34,2,52,'#6a6a72');for(let X=x+4;X<x+86;X++)if(X%13<8)p.px(X,80-((X*7)%20),'#3a5a7a')}
   p.rect(270,40,56,40,ramp('#3a5ad8'),{v:.6});M.ftext(p,'WORK HARD',275,48,'#ffffff','#1a2a6a');M.ftext(p,'REBOOT',282,58,'#ffd040','#1a2a6a');M.ftext(p,'HARDER',282,68,'#ffd040','#1a2a6a')},
  init(R){
   const bot=(c,head)=>M.frames(4,24,40,(p,f)=>{const C=ramp(c,6),D=ramp('#4a4a58',5);p.rect(10,0,2,6,D,{});p.disc(11,1,1.5,f%2?'#ff4a4a':'#ffd040');p.rrect(3,6,18,13,3,C,{v:.6});p.rect(6,9,12,6,['#0a1a2a','#14304a'],{v:.4});const eye=f===3?1:2;p.rect(8,11,3,eye,'#7af0ff');p.rect(13,11,3,eye,'#7af0ff');p.rect(9,19,6,2,D,{});p.rrect(4,21,16,12,2,C,{v:.55});p.rect(8,24,8,4,ramp('#c8a040'),{v:.6});const aw=f===1?-4:0;p.rect(0,22+aw,4,9,C,{v:.5});p.rect(20,22-(f===2?4:0),4,9,C,{v:.45});p.rect(6,33,4,7,D,{v:.5});p.rect(14,33,4,7,D,{v:.45})});
   // vending machine
   const vm=K.spr(40,80,p=>{p.rrect(0,0,40,80,3,ramp('#d83a3a',6),{v:.6});p.rect(4,6,24,52,['#0a0a14','#141428'],{v:.4});for(let r=0;r<5;r++)for(let k=0;k<4;k++)p.rect(6+k*5,9+r*10,4,7,ramp(['#ffd040','#4ad0ff','#7aff6a','#ff8af0'][(r+k)%4]),{v:.6});p.rect(30,10,6,20,ramp('#c8c8d0'),{v:.5});for(let i=0;i<6;i++)p.rect(31+(i%2)*2,12+Math.floor(i/2)*4,2,2,'#4a4a58');p.rect(4,64,24,10,'#140c1c');M.ftext(p,'OIL',8,1,'#ffffff','#7a1a1a')});
   M.ent(R,{spr:vm,name:'VENDING MACHINE',x:120,y:FL-80,react:'shake',click(e,R){M.react(R,e);M.snd('clunk'in{}?'thud':'thud',1.4);setTimeout(()=>M.snd('coin',1.5),200);const can=M.ent(R,{spr:K.spr(8,12,p=>{p.rect(0,0,8,12,ramp(K.pick(['#ffd040','#4ad0ff','#7aff6a']),6),{v:.6});p.rect(0,0,8,1,'#c8c8d0')}),x:e.x+12,y:e.y+64,vy:-40,vx:30+Math.random()*30,name:'OIL CAN',life:6,upd(c,dt){c.vy+=200*dt;c.x+=c.vx*dt;c.y+=c.vy*dt;if(c.y>FL+8){c.y=FL+8;c.vy*=-.4;c.vx*=.8}c.life-=dt;if(c.life<0){c.vis=0;c.dead=1}},click(c,R){c.vis=0;c.dead=1;M.snd('pop',1.4);M.emit(R,'spark',c.x+4,c.y,10);M.say(R,c.x+4,c.y-2,'GLUG GLUG',.8)}})}});
   // coffee machine on counter
   M.ent(R,{x:300,y:FL-34,spr:K.spr(70,34,p=>{p.rect(0,16,70,18,ramp('#8a6a4a',6),{v:.55});p.rect(0,14,70,3,ramp('#c8c0b0'),{v:.6});p.rrect(6,0,22,16,2,ramp('#3a3a42',6),{v:.6});p.rect(10,3,14,3,'#ff4a4a');p.rect(14,10,6,6,ramp('#e8e8f0'),{v:.6});p.rect(40,6,14,10,ramp('#c8ccd8'),{v:.6});p.rect(43,8,8,5,'#140c1c')},false),name:'COFFEE MACHINE',z:FL-1,click(e,R){M.snd('steam'in{}?'whoosh':'whoosh',1.2);M.emit(R,'smoke',e.x+17,e.y,10,{v:1.4});M.emit(R,'spark',e.x+17,e.y+10,6);M.say(R,e.x+17,e.y-4,'1 CUP OF HOT VOLTS',1.2)}});
   // microwave
   M.ent(R,{x:345,y:FL-34,z:FL,w:28,h:14,box:1,name:'MICROWAVE',cook:0,draw(g,X,Y,t,e,sel){g.fillStyle='#d8d8e0';g.fillRect(X,Y,28,14);g.fillStyle='#8a8a94';g.fillRect(X,Y+13,28,1);const on=M.now<e.cook;g.fillStyle=on?'#ffd080':'#1a1a24';g.fillRect(X+2,Y+2,18,10);if(on){g.fillStyle='#c8a040';g.fillRect(X+8+Math.round(Math.sin(t*4)*3),Y+8,6,3)}g.fillStyle='#4aff7a';g.fillRect(X+22,Y+3,4,2);if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-1,28,1)}},click(e,R){e.cook=M.now+2;M.snd('beep',.6);setTimeout(()=>{M.snd('ding',1.6);M.say(R,e.x+14,e.y-2,'DING! BOLTS READY',1)},2000)}});
   // water cooler
   M.ent(R,{x:250,y:FL-50,spr:K.spr(18,50,p=>{p.ell(9,9,8,9,['#3a8ad8','#6ab0f0','#a8d8ff','#e8f8ff'],{b:.2,spec:'#ffffff'});p.rect(2,18,14,32,ramp('#e8e8f0',6),{v:.6});p.rect(6,24,3,3,'#3a8ad8');p.rect(10,24,3,3,'#e04a4a')}),name:'WATER COOLER',react:'jiggle',click(e,R){M.react(R,e);M.snd('bubble',.6);M.snd('bubble',.9);M.emit(R,'bubble',e.x+9,e.y+12,10,{rx:5,ry:6});M.say(R,e.x+9,e.y-2,'GLUG',.6)}});
   // robots
   const RB=[['#a8b0c0','BOLT'],['#e0a040','SPROCKET'],['#5ab07a','CHIP'],['#c070d8','UNIT 7'],['#4a8ad8','GIZMO']];
   const LINES=[['BEEP. COFFEE?','MONDAYS.EXE','ON BREAK'],['I DREAM OF SHEEP','0101 LOL','LUNCH = AA BATTERY'],['DANCE.PROTOCOL','DO THE ROBOT!','*SERVO NOISES*'],['ZZZ... CHARGING','5 MORE VOLTS','LOW BATTERY'],['HAVE YOU TRIED REBOOTING?','BEEP BOOP','HELLO HUMAN']];
   RB.forEach(([c,nm],i)=>{const fr=bot(c);const x=[440,520,620,840,700][i];M.ent(R,{fr,f:0,name:nm,x,y:FL-40+(i===3?0:0),hx:x,dance:0,
    upd(e,dt,t){if(i===2&&!RM){e.f=Math.floor(t*4)%3;return}if(i===3){e.f=3;if(!RM&&Math.random()<dt*.6)M.emit(R,'zzz',e.x+16,e.y+4,1);return}if(e.dance>M.now){e.f=Math.floor(t*8)%3;return}e.f=!RM&&Math.sin(t*1.5+i*2)>.95?3:0;if(i===4&&!RM){e.x=e.hx+Math.sin(t*.4)*60;e.flip=Math.cos(t*.4)<0}},
    click(e,R){e.dance=M.now+1.5;M.play(e,'hop',.4);M.snd('beep',1+i*.3);setTimeout(()=>M.snd('blip',1.5+i*.2),120);M.say(R,e.x+12,e.y-2,K.pick(LINES[i]),1.3);M.emit(R,'spark',e.x+12,e.y+4,6)}})});
   // charger outlet near robot 3
   M.ent(R,{x:870,y:FL-24,w:8,h:10,box:1,name:'WALL OUTLET',draw(g,X,Y,t,e,sel){g.fillStyle='#f0ece0';g.fillRect(X,Y,8,10);g.fillStyle='#140c1c';g.fillRect(X+2,Y+3,1,3);g.fillRect(X+5,Y+3,1,3);g.fillStyle='#3a3a42';for(let k=0;k<14;k++)g.fillRect(X-k,Y+5+Math.round(Math.sin(k/3)*2),1,1);if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y+11,8,1)}},click(e,R){M.snd('zap',1);M.emit(R,'zap',e.x+4,e.y+5,10);M.say(R,e.x-10,e.y-20,'WAKE UP, UNIT 7!',1)}});
   // roomba
   const rmb=K.spr(20,8,p=>{p.ell(10,4,9.5,3.5,ramp('#3a3a48',6),{b:.15});p.px(14,2,'#4aff7a');p.rect(7,2,6,1,'#8a8a9a')});
   M.ent(R,{spr:rmb,name:'ROOMBA',x:400,y:FL+40,vx:30,vy:10,spin:0,upd(e,dt,t){if(RM)return;if(e.spin>0){e.spin-=dt;e.flip=Math.floor(e.spin*12)%2===0;return}e.x+=e.vx*dt;e.y+=e.vy*dt;if(e.x<20||e.x>R.w-40)e.vx*=-1;if(e.y<FL+10||e.y>RH-20)e.vy*=-1;e.flip=e.vx<0;if(Math.random()<.05)M.emit(R,'dust',e.x+(e.vx<0?20:0),e.y+6,1)},click(e,R){e.spin=1;M.snd('honk',1.6);M.say(R,e.x+10,e.y-2,'BEEP BEEP! MOVE!',.9)}});
   // couch + TV
   M.ent(R,{x:560,y:FL-24,nohit:1,z:FL-35,spr:K.spr(100,24,p=>{p.rrect(0,0,100,24,4,ramp('#6a4a8a',6),{v:.6});p.rect(4,10,92,6,ramp('#8a6aaa'),{v:.6})},false)});
   M.ent(R,{x:620,y:FL-110,w:60,h:40,box:1,name:'TV',ch:0,draw(g,X,Y,t,e,sel){g.fillStyle='#2a2a32';g.fillRect(X,Y,60,40);g.fillStyle='#140c1c';g.fillRect(X+3,Y+3,54,32);const tt=RM?0:t;if(e.ch===0){for(let k=0;k<20;k++){g.fillStyle=['#ff4a4a','#ffd040','#4aff7a','#4ad0ff'][k%4];g.fillRect(X+5+k*2.6,Y+5,2,28)}}else if(e.ch===1){for(let y=0;y<32;y++)for(let x=0;x<54;x+=2){if(H(x+Math.floor(tt*20),y)>.5){g.fillStyle='#c8c8c8';g.fillRect(X+3+x,Y+3+y,2,1)}}}else{g.fillStyle='#1a3a6a';g.fillRect(X+3,Y+3,54,32);g.fillStyle='#ffd040';const bx=X+10+Math.round(Math.abs(((tt*30)%80)-40));g.fillRect(bx,Y+20,6,6);M.ftext&&0}g.fillStyle='#4a4a58';g.fillRect(X+28,Y+40,4,6);if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-1,60,1)}},click(e,R){e.ch=(e.ch+1)%3;M.snd('blip',2);M.say(R,e.x+30,e.y-2,['TEST PATTERN','STATIC','ROBO SPORTS'][e.ch],.8)}});
   // wall clock
   M.ent(R,{x:470,y:30,w:24,h:24,hitR:12,name:'CLOCK',draw(g,X,Y,t,e,sel){for(let j=0;j<24;j++)for(let i=0;i<24;i++){const d=Math.hypot(i-11.5,j-11.5);if(d>12)continue;g.fillStyle=d>10?'#4a4a58':'#f4f0e4';g.fillRect(X+i,Y+j,1,1)}const a=(RM?0:t)*(M.now<e.fs?8:.2);for(let k=0;k<8;k++){g.fillStyle='#140c1c';g.fillRect(Math.round(X+12+Math.cos(a)*k),Math.round(Y+12+Math.sin(a)*k),1,1);if(k<5)g.fillRect(Math.round(X+12+Math.cos(a/12)*k),Math.round(Y+12+Math.sin(a/12)*k),1,1)}if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y+25,24,1)}},click(e,R){e.fs=M.now+1.5;M.snd('tick'in{}?'blip':'blip',2.4);M.say(R,e.x+12,e.y+26,'BREAK OVER?!',1)}});
   K.visitors(R,2,RH-4,['THEY TAKE BREAKS?','CUTE ROBOTS','IS THAT DECAF?'],{off:5})}});
}

/* ================= UPSIDE-DOWN ROOM ================= */
{// "floor" is on the ceiling: everything hangs from the top; gravity points up
 const CE=46;// ceiling-floor line (things stand on it upside down)
 K.ext('upside',{start:450,top:'#5a3a2a',bot:'#c8b8e0',
  bg(p,R){const T=new M.Pix(R.w,RH);// paint a normal room, then mirror it vertically
   for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){const fy=RH-CE;let c;if(y<fy){c=rp(['#8a7aa8','#a898c4','#c8b8e0','#e0d4f0'],.55+((x%40)<20?.05:0)+(y<12?-.15:0)+(y>fy-8?-.2:0),x,y);if(x%40===0)c='#9a8ab8'}else c=rp(['#4a2a1a','#6a3e24','#8a5a32','#a87a4a'],.5+((x%32)<1?-.3:0)+(vn(x/30,y/2)-.5)*.3,x,y);T.px(x,y,c)}
   // window + painting (normal orientation, then flipped)
   T.rect(300,60,80,60,ramp('#6a4a2a'),{v:.5});for(let y=64;y<116;y++)for(let x=304;x<376;x++)T.px(x,y,rp(['#6ab0e8','#9ad0ff','#d8f0ff'],(y-64)/60+.2,x,y));T.ell(330,100,12,6,ramp('#ffffff'),{b:.2});T.rect(338,64,2,52,'#6a4a2a');
   T.rect(600,70,50,40,ramp('#c8a040'),{v:.6});T.rect(604,74,42,32,['#2a6a3a','#4a9a4a'],{v:.4});T.ell(625,86,6,6,ramp('#ffd040'),{b:.1});
   T.rect(120,80,40,30,ramp('#c8a040'),{v:.6});T.rect(124,84,32,22,['#3a4a8a','#5a7ad8'],{v:.4});T.ftext&&0;M.ftext(T,'HOME',126,90,'#ffffff','#1a2a5a');
   for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){const o=((RH-1-y)*R.w+x)*4;p.px(x,y,[T.d[o],T.d[o+1],T.d[o+2]])}},
  init(R){R.grav=-1;// -1 = up (this room's normal), +1 = down
   const V=K.vflip;
   const mk=(nm,spr,x,opts={})=>{const s=V(spr);return M.ent(R,Object.assign({spr:s,name:nm,x,y:CE,vy:0,fall:0,h0:s.h,
     upd(e,dt){if(!e.fall)return;e.vy+=R.grav*420*dt;e.y+=e.vy*dt;const top=CE,bot=RH-12-e.h;if(e.y<top){e.y=top;e.vy=Math.abs(e.vy)>60?-e.vy*.35:0;if(!e.vy)e.fall=0;else M.snd('thud',1.6)}if(e.y>bot){e.y=bot;e.vy=Math.abs(e.vy)>60?-e.vy*.35:0;if(!e.vy)e.fall=0;else M.snd('thud',1.6)}},
     click(e,R){e.fall=1;e.vy=R.grav*-160;M.snd('boing',.9);M.emit(R,'star',e.x+e.w/2,e.y+e.h/2,6);if(opts.say)M.say(R,e.x+e.w/2,e.y+e.h+8,opts.say,1)}},opts.e||{}))};
   const sofa=K.spr(70,30,p=>{p.rrect(0,4,70,20,4,ramp('#d84a6a',6),{v:.6});p.rrect(0,0,10,26,3,ramp('#c03a5a',6),{v:.6});p.rrect(60,0,10,26,3,ramp('#c03a5a',6),{v:.55});p.rect(4,24,4,6,'#4a2a1a');p.rect(62,24,4,6,'#4a2a1a')});
   const table=K.spr(40,26,p=>{p.rect(0,0,40,4,ramp('#8a5a32',6),{v:.6});p.rect(3,4,3,22,ramp('#6a3e24'),{v:.5});p.rect(34,4,3,22,ramp('#6a3e24'),{v:.45});p.rect(14,-0,12,0,'#000')});
   const lamp=K.spr(20,46,p=>{p.poly([[2,14],[6,0],[14,0],[18,14]],ramp('#ffe080',6),{v:.7});p.rect(9,14,2,28,ramp('#4a4a58'),{});p.rect(4,42,12,4,ramp('#4a4a58'),{v:.5})});
   const cat=K.spr(24,14,p=>{p.ell(12,9,10,5,ramp('#f0a040',6),{b:.12});p.ell(19,6,5,4,ramp('#f0a040',6),{b:.15});p.poly([[15,3],[16,0],[18,3]],ramp('#f0a040'),{});p.poly([[20,3],[22,0],[23,4]],ramp('#f0a040'),{});p.line(17,6,18,6,'#140c1c');p.line(20,6,21,6,'#140c1c');p.poly([[2,9],[0,4],[3,8]],ramp('#f0a040'),{})});
   const bowl=K.spr(20,20,p=>{p.ell(10,10,9,9,['#3a8ad8','#6ab0f0','#a8d8ff'],{b:.2,clip:(x,y)=>y>5});p.ell(10,12,3,2,ramp('#ff8a2a'),{});p.px(12,11,'#140c1c');p.rect(4,19,12,1,'#c8c8d0')});
   const plant=K.spr(18,30,p=>{p.rect(3,18,12,12,ramp('#c86a3a',6),{v:.6});for(let i=0;i<5;i++)p.ell(9+(i-2)*3,10-Math.abs(i-2)*2,3,7,ramp('#4aa04a'),{b:.1})});
   const shelfbk=K.spr(30,22,p=>{for(let i=0;i<4;i++)p.rect(2+i*7,4,6,18,ramp(['#d83a3a','#3a8ad8','#ffd040','#4ab04a'][i]),{v:.55});p.rect(0,0,30,3,ramp('#6a3e24'),{v:.5})});
   R.things=[mk('UPSIDE SOFA',sofa,140,{say:'COMFY... ISH'}),mk('TABLE',table,240),mk('LAMP',lamp,320,{say:'LIGHTS UP!'}),mk('SLEEPY CAT',cat,170,{say:'MRRP?!',e:{x:160}}),mk('FISH BOWL',bowl,420,{say:'BLUB?'}),mk('POTTED PLANT',plant,500),mk('BOOKS',shelfbk,560),mk('ARMCHAIR',K.spr(34,30,p=>{p.rrect(0,4,34,20,4,ramp('#4a8ad8',6),{v:.6});p.rrect(0,0,8,26,3,ramp('#3a6ab0',6),{v:.6});p.rrect(26,0,8,26,3,ramp('#3a6ab0',6),{v:.55});p.rect(4,24,3,6,'#4a2a1a');p.rect(27,24,3,6,'#4a2a1a')}),680,{say:'WHEEE'})];
   // cat sits on sofa: adjust after sofa
   R.things[3].y=CE+20;
   // chandelier pointing UP from the bottom (it's the ceiling down there)
   const ch=M.frames(2,40,40,(p,f)=>{p.rect(19,0,2,16,ramp('#c8a040'),{});p.ell(20,18,16,4,ramp('#e0b040',6),{b:.1});for(let i=0;i<5;i++){const x=6+i*7;p.rect(x,10,3,6,ramp('#f4f0e4'),{v:.6});p.rect(x+1,(f+i)%2?6:7,1,3,'#ffd040')}});
   M.ent(R,{fr:ch.map(V),fps:4,name:'CHANDELIER',x:400,y:RH-58,react:'jiggle',click(e,R){M.react(R,e);M.snd('chime',1.3);M.emit(R,'spark',e.x+20,e.y+20,10)}});
   // person walking on the ceiling-floor
   K.visitors(R,3,CE+28,['MY HAIR!','WHICH WAY IS UP?','I FEEL DIZZY','WHOA...'],{off:2}).forEach(v=>{v.fr=v.fr.map(V);v.y=CE});
   // gravity lever
   const lev=M.frames(2,16,24,(p,f)=>{p.rect(0,16,16,8,ramp('#5a5a68',6),{v:.6});p.line(8,17,f?14:2,2,'#8a8a94');p.line(9,17,f?15:3,2,'#8a8a94');p.disc(f?14:2,2,2.5,'#ff3a3a')});
   M.ent(R,{fr:lev,f:0,name:'GRAVITY SWITCH',x:820,y:RH-36,click(e,R){e.f^=1;R.grav=e.f?1:-1;M.snd('rumble',1.2);M.snd('whoosh',.6);K.shake(R,.5,2);M.say(R,e.x+8,e.y-4,e.f?'GRAVITY: DOWN?!':'GRAVITY: UP',1.2);R.things.forEach((t,k)=>setTimeout(()=>{t.fall=1;t.vy=0},k*60))}});
   R.rain=[];},
  upd(R,dt,t){if(RM)return;// rain falling upward
   if(Math.random()<dt*20)R.rain.push({x:R.cam.x+Math.random()*M.BW,y:RH-14});for(const d of R.rain)d.y+=R.grav*140*dt;R.rain=R.rain.filter(d=>d.y>CE&&d.y<RH)},
  back(R,g,ox,oy){g.fillStyle='#8ab0e0';for(const d of R.rain){g.fillRect(Math.round(d.x+ox),Math.round(d.y+oy),1,3)}},
  tap(R,x,y){M.emit(R,'bubble',x,y,6,{g:R.grav*30});M.snd('bubble',1.4)}});
}

/* ================= GIANT SNACK HALL ================= */
{const FL=214;
 K.ext('snack',{start:550,top:'#ffd8e8',bot:'#3a2a4a',
  bg(p,R){for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c;if(y<FL){c=rp(['#e8a8c8','#f4c0d8','#ffd8e8','#fff0f6'],.45+((x>>4)%2?.08:0)+(y>FL-40?-.1:0),x,y);if(y>FL-40&&y<FL-36)c='#c86a9a'}else c=((x>>4)+((y-FL)>>3))&1?rp(['#f4f0f8','#ffffff'],.5,x,y):rp(['#c84a6a','#e05a7a'],.5,x,y);p.px(x,y,c)}
   // neon sign
   M.ftext(p,'GIANT SNACKS',510,16,'#ff4aa8','#3a0a2a')},
  init(R){const ent=(o)=>M.ent(R,o);
   // donut
   const don=K.spr(90,60,p=>{p.ell(45,32,44,26,ramp('#d8a060',6),{b:.1});p.ell(45,28,40,21,ramp('#ff8ac0',6),{b:.15,clip:(x,y)=>!(Math.hypot((x-45)/1.8,y-30)<9)});p.ell(45,30,15,8,['#00000000'],{});for(let y=0;y<60;y++)for(let x=0;x<90;x++)if(Math.hypot((x-45)/1.7,y-31)<8.5)p.clr(x,y);for(let i=0;i<40;i++){const a=H(i,1)*TAU,r=14+H(i,2)*20,x=Math.round(45+Math.cos(a)*r*1.7),y=Math.round(28+Math.sin(a)*r*.8);if(p.has(x,y)&&p.has(x+2,y))p.rect(x,y,2,1,['#ffffff','#4ad0ff','#ffd040','#7aff6a','#c070ff'][i%5])}});
   ent({spr:don,name:'GIANT DONUT',x:40,y:FL-60,react:'jiggle',click(e,R){M.react(R,e);M.snd('pop',1);M.emit(R,'confetti',e.x+45,e.y,24,{v:1.2});M.say(R,e.x+45,e.y-4,'SPRINKLE STORM!',1)}});
   // pizza slice with cheese pull
   const pz=K.spr(80,70,p=>{p.poly([[0,6],[80,6],[40,70]],ramp('#ffd040',6),{v:.6});p.rect(0,0,80,8,ramp('#d8903a',6),{v:.6});for(let i=0;i<7;i++){const x=16+H(i,3)*48,y=14+H(i,4)*30;if(Math.abs(x-40)<(70-y)*.55)p.ell(x,y,5,4,ramp('#d83a2a',6),{b:.15})}});
   ent({spr:pz,name:'PIZZA SLICE',x:170,y:FL-110,pull:0,click(e,R){e.pull=M.now;M.snd('squish',.8);M.say(R,e.x+40,e.y-4,'CHEESE PULL!',1)},draw(g,X,Y,t,e,sel){if(sel)g.drawImage(M.ring(pz),X-1,Y-1);g.drawImage(pz.c,X,Y);const q=M.now-e.pull;if(q<2){const len=Math.round(Math.sin(Math.min(1,q)*Math.PI/2)*30*(q<1.5?1:(2-q)*2));g.fillStyle='#ffe060';for(let k=0;k<4;k++)g.fillRect(X+30+k*6,Y+40+Math.round(Math.sin(k)*3),2,len-k*4);g.fillStyle='#fff4a0';g.fillRect(X+31,Y+40,1,len)}}});
   // burger stack
   const L=[['#e0a050',14,'BUN'],['#4ab04a',4],['#d83a2a',5],['#ffd040',4],['#6a3a1a',10],['#e0a050',10]];
   R.burger=[];let by=FL;L.slice().reverse().forEach((l,k)=>{const h=l[1],w=70;by-=h;const s=K.spr(w,h,p=>{if(k===L.length-1)p.ell(w/2,h,w/2-1,h,ramp(l[0],6),{b:.1,clip:(x,y)=>y<h});else p.rrect(0,0,w,h,3,ramp(l[0],6),{v:.6});if(k===L.length-1)for(let i=0;i<8;i++)p.rect(10+i*7,4+(i%2)*2,2,1,'#fff4d8');if(l[0]==='#4ab04a')for(let x=0;x<w;x+=6)p.px(x,h-1,'#2a7a2a')});R.burger.push(ent({spr:s,name:'TOWER BURGER',x:330,y:by,hy:by,k}))});
   R.burger.forEach(b=>b.click=(e,R)=>{R.burger.forEach((q,j)=>setTimeout(()=>M.play(q,'hop',.4),j*70));M.snd('boing',.8);M.say(R,365,by-10,'NOM NOM!',1)});
   // soda can
   const can=K.spr(36,70,p=>{p.cyl(0,6,36,60,ramp('#d82a2a',6));p.ell(18,6,17,5,ramp('#c8c8d0',6),{b:.2});p.rect(4,26,28,14,ramp('#ffffff',3),{v:.7});M.ftext(p,'FIZZ',7,30,'#d82a2a',null)});
   ent({spr:can,name:'SODA CAN',x:450,y:FL-70,react:'shake',click(e,R){M.react(R,e);M.snd('steam'in{}?'whoosh':'whoosh',.8);for(let k=0;k<5;k++)setTimeout(()=>M.emit(R,'bubble',e.x+18,e.y,12,{dir:-Math.PI/2,v:3,spread:.4}),k*100);M.say(R,e.x+18,e.y-6,'FSSSHHH!',1)}});
   // ice cream cone
   const ic=M.frames(2,40,90,(p,f)=>{p.poly([[6,40],[34,40],[20,90]],ramp('#d8a060',6),{v:.6});for(let k=0;k<7;k++)p.line(8+k*4,40,20,88,'#b07a3a');const S=[['#ffc8e0',0],['#8a5a3a',14],['#fff4e0',28]];S.forEach(([c,o],i)=>p.ell(20,38-o,15-i*1.5,10,ramp(c,6),{b:.15}));p.disc(20,6,3,'#d82a3a');p.px(19,4,'#ffffff');if(f){p.rect(8,42,2,6,ramp('#ffc8e0'),{});p.rect(30,42,2,9,ramp('#ffc8e0'),{})}});
   ent({fr:ic,fps:.7,name:'ICE CREAM',x:540,y:FL-90,react:'jiggle',click(e,R){M.react(R,e);M.snd('blip',1.3);M.emit(R,'heart',e.x+20,e.y,8);M.say(R,e.x+20,e.y-4,'BRAIN FREEZE!',1)}});
   // popcorn machine
   const pm=K.spr(50,80,p=>{p.rect(0,60,50,20,ramp('#d82a2a',6),{v:.6});p.rect(2,8,46,52,['#ffe8a0','#fff4c8'],{v:.5});for(let i=0;i<80;i++){const x=4+H(i,5)*42,y=34+H(i,6)*24;p.disc(x,y,1.5,['#fff8e0','#ffe080','#ffffff'][i%3])}p.rect(0,0,50,8,ramp('#d82a2a',6),{v:.6});M.ftext(p,'POP',15,64,'#ffd040','#5a0a0a')});
   ent({spr:pm,name:'POPCORN MACHINE',x:640,y:FL-80,react:'jiggle',click(e,R){M.react(R,e);for(let k=0;k<8;k++)setTimeout(()=>M.snd('pop',1.5+Math.random()*.6),k*80);M.emit(R,'pop',e.x+25,e.y+20,30,{v:1.4})}});
   if(!M.PT.pop)M.PT.pop={c:['#fff8e0','#ffffff','#ffe080'],l:[.8,1.4],v:[50,110],g:180,s:'px',dr:2};
   // chocolate fountain
   ent({x:740,y:FL-80,w:60,h:80,box:1,name:'CHOCO FOUNTAIN',boost:0,draw(g,X,Y,t,e,sel){const tt=RM?0:t*(M.now<e.boost?3:1);const tiers=[[20,0],[34,24],[50,50]];g.fillStyle='#c8ccd8';g.fillRect(X+28,Y,4,70);tiers.forEach(([w,y])=>{g.fillStyle='#5a3418';g.fillRect(X+30-w/2,Y+y+6,w,4);g.fillStyle='#8a5a2a';g.fillRect(X+30-w/2,Y+y+6,w,1);for(let x=-w/2;x<w/2;x+=3){const len=6+Math.round(((x*7+tt*20)%10+10)%10/3);g.fillStyle='#6a3e1e';g.fillRect(X+30+x,Y+y+10,2,len+8)}});g.fillStyle='#5a3418';g.fillRect(X+2,Y+72,56,8);if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y+81,60,1)}},click(e,R){e.boost=M.now+2;M.snd('bubble',.5);M.emit(R,'dust',e.x+30,e.y+60,14,{c:['#6a3e1e','#8a5a2a']});M.say(R,e.x+30,e.y-4,'CHOCO-LANCHE!',1)}});
   // cookie with bites
   const ck=M.frames(4,60,60,(p,f)=>{p.ell(30,30,28,28,ramp('#d8a060',6),{b:.1,tex:(x,y)=>(vn(x/3,y/3)-.5)*.3});for(let i=0;i<14;i++)p.ell(10+H(i,7)*40,10+H(i,8)*40,3,2.5,ramp('#4a2a1a'),{b:.1});for(let b=0;b<f;b++){const cx=[56,44,58][b],cy=[14,4,34][b];for(let y=0;y<60;y++)for(let x=0;x<60;x++)if(Math.hypot(x-cx,y-cy)<9)p.clr(x,y)}});
   ent({fr:ck,f:0,name:'GIANT COOKIE',x:840,y:FL-60,click(e,R){e.f++;M.snd('crunch',1);M.emit(R,'dust',e.x+50,e.y+20,14,{c:['#d8a060','#b07a3a','#4a2a1a']});if(e.f>3){e.f=0;M.say(R,e.x+30,e.y-4,'FRESH BATCH!',1);M.snd('tada',1.2)}}});
   // gummy bears
   const gb=c=>M.frames(2,14,18,(p,f)=>{const C=ramp(c,6);p.ell(7,12,5,5-(f?1:0),C,{b:.15,spec:'#ffffff'});p.ell(7,5,4,4,C,{b:.15});p.disc(3,1,1.5,C[3]);p.disc(11,1,1.5,C[3]);p.px(5,4,'#140c1c');p.px(9,4,'#140c1c');p.rect(2,15,3,3,C[3]);p.rect(9,15,3,3,C[3])});
   ['#ff4a4a','#4aff7a','#ffd040','#ff8a2a','#c070ff'].forEach((c,i)=>ent({fr:gb(c),fps:2,name:'GUMMY BEAR',x:930+i*28,y:FL+10+(i%2)*14,react:'hop',hop:12,snd:'boing',sp:1.6+i*.1,fx:'heart',fxn:3,say:K.pick(['BOING!','GUMMY!','SQUISH!'])}));
   // giant pretzel hanging on the wall
   const pr=K.spr(60,46,p=>{const C=ramp('#a8602a',6);for(let a=0;a<220;a++){const q=a/220*TAU;const x=30+Math.sin(q)*24,y=22+Math.sin(2*q)*12+Math.cos(q)*4;p.disc(x,y,3.5,rp(C,.6+Math.sin(q)*.15,0,0))}for(let i=0;i<14;i++)p.rect(8+H(i,9)*44,8+H(i,3)*30,1,1,'#ffffff')});
   ent({spr:pr,name:'GIANT PRETZEL',x:250,y:40,react:'spin'in{}?'jiggle':'jiggle',snd:'crunch',sp:1.3,fx:'dust',fxn:10,say:'SALTY!'});
   K.visitors(R,4,RH-4,['SO HUNGRY','THAT DONUT IS HUGE','CAN WE EAT IT?','SNACK TIME!'],{off:6})}});
}
})();
