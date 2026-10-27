/* Landry's site rooms (part 2): Ashaad, LLC Channels, Ball Arena, Cooper City */
(()=>{'use strict';
const{ramp,rp,vn,fbm,H,bay,TAU,RM,mix,clamp,lerp,RH}=M,P=window.PLANETS,K=M.K;
const big=(p,s,x,y,ra,sc=3)=>{let cx=x;for(const ch of s){const G=M.txt(ch,'#ffffff',null);const w=M.tw(ch);for(let j=0;j<7;j++)for(let i=0;i<w;i++){if(!G.m[j*G.w+i])continue;p.rect(cx+i*sc,y+j*sc,sc,sc,ra,{v:.62-j*.05,bv:.3})}cx+=(w+1)*sc}};
K.big=big;

/* ================= THE BINDING OF ASHAAD: the basement ================= */
{const FL=150,A='assets/ashaad/';
 K.ext('ashaad',{start:500,top:'#140c0a',bot:'#1a120e',
  bg(p,R){const BR=['#140c0a','#2a1a14','#3e2a20','#5a3e2e','#7a5640','#9a7454'],ST=['#120c0a','#241812','#382820','#4c382c','#62483a'];
   for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c;
    if(y<FL){const row=Math.floor(y/10),bx=(x+(row%2)*12)%24,by=y%10,mort=bx===0||by===0,id=H(Math.floor((x+(row%2)*12)/24),row);c=mort?rp(BR,.12,x,y):rp(BR,.42+id*.22-(by===9?.15:by===1?-.1:0)-(bx===23?.12:bx===1?-.08:0)+(vn(x/6,y/6)-.5)*.25-y/FL*.12+(1-y/FL)*0,x,y);
     if(H(x>>2,y>>2)>.995)c='#140c0a'}
    else{const k=(y-FL)/(RH-FL),tw=26,th=14,tx=Math.floor(x/tw),ty=Math.floor((y-FL)/th),ex=x%tw,ey=(y-FL)%th,id=H(tx,ty+50);c=(ex===0||ey===0)?rp(ST,.1,x,y):rp(ST,.38+id*.25+(ex===1||ey===1?.15:0)-(ex===tw-1||ey===th-1?.12:0)+(vn(x/5,y/5)-.5)*.3,x,y)}
    // vignette: dark corners like the game
    const vx=Math.min(x,R.w-x)/120,vy=y/40;if(vx<1&&bay(x,y)>vx)c='#0a0606';if(y<FL&&vy<1&&bay(x,y)>vy*1.2)c='#0a0606';p.px(x,y,c)}
   for(let x=0;x<R.w;x++){p.px(x,FL,'#0a0606');p.px(x,FL+1,'#2a1a14');p.px(x,FL-1,rp(BR,.55,x,FL))}
   // arched basement doors + cracks + cobwebs
   for(const dx of[150,850]){p.rrect(dx-20,FL-56,40,57,20,['#0a0606'],{bv:0});for(let a=0;a<=20;a++){const ang=Math.PI+a/20*Math.PI,x=dx+Math.cos(ang)*22,y=FL-36+Math.sin(ang)*22;p.rect(Math.round(x)-2,Math.round(y)-2,5,5,ST,{v:.6})}p.rect(dx-22,FL-36,5,36,ST,{v:.5});p.rect(dx+18,FL-36,5,36,ST,{v:.45});
    for(let i=0;i<5;i++)p.rect(dx-16+i*7,FL-36,2,36,ramp('#3a2a20'),{v:.4})}
   for(let i=0;i<14;i++){let x=H(i,3)*R.w,y=H(i,4)*FL*.8;for(let k=0;k<12;k++){p.px(x,y,'#0e0806');x+=H(i,k)*3-1.5;y+=1}}
   for(const[cx,sx]of[[0,1],[R.w-1,-1]])for(let k=0;k<6;k++){p.line(cx,k*6,cx+sx*(36-k*6),0,'#8a8078');}
   // rocks on the floor
   for(let i=0;i<12;i++){const x=40+H(i,8)*(R.w-80),y=FL+12+H(i,9)*100;if(Math.abs(x-500)<70)continue;p.ell(x,y,6,4.5,ramp('#6a5a4e',6),{b:.05,tex:(X,Y)=>(vn(X*.6,Y*.6)-.5)*.4});p.ol}},
  init(R){R.tears=[];
   const L=(src,fn)=>M.img(A+src).then(s=>s&&fn(s));
   // pedestals + items
   const IT=[['book_of_sigma','BOOK OF SIGMA'],['energy_can','ENERGY CAN'],['fanum_tax_bag','FANUM TAX BAG'],['gold_glasses','GOLD GLASSES'],['julians_halo',"JULIAN'S HALO"],['sick_bomb','SICK BOMB'],['skibidi_toilet','SKIBIDI TOILET']];
   const PX=[230,320,410,590,680,770,500];
   IT.forEach(([f,nm],i)=>{const x=PX[i],y=i===6?FL-6:FL+6;const ped=M.ent(R,{x:x-16,y:y,w:32,h:24,spr:null,z:y+24,nohit:1});L('pedestal.png',s=>ped.spr=s);
    const it=M.ent(R,{x:x-16,y:y-30,w:32,h:32,spr:null,name:nm,idle:'float',ba:2,bs:1.6,z:y+25,hy:y-30,
     upd(e,dt){if(e.got){e.got+=dt;if(e.got<.8){e.y=e.hy-Math.round(e.got*30);e.vis=1}else{e.vis=0}if(e.got>4.5){e.got=0;e.vis=1;e.y=e.hy;e.fl=M.now;M.snd('pop');M.emit(R,'star',x,e.y+16,10)}}},
     click(e,R){if(e.got)return;e.got=.01;M.snd('tada',1);M.emit(R,'gold',x,e.y+16,18);M.emit(R,'star',x,e.y+10,12);M.say(R,x,e.y-4,nm+'!',1.6);R.items=(R.items||0)+1}});L(f+'.png',s=>it.spr=s)});
   // fires
   const fr=[];Promise.all([0,1,2,3].map(i=>M.img(A+'fire'+i+'.png'))).then(a=>{if(a.every(Boolean))fr.push(...a)});
   [[110,FL+70],[890,FL+70],[300,FL+92],[700,FL+92]].forEach(([x,y],i)=>M.ent(R,{x:x-12,y:y-32,w:24,h:32,fr,fps:8,name:'FIRE',out:0,box:1,
    draw(g,X,Y,t,e,sel){if(!fr.length)return;if(e.out&&M.now<e.out){g.fillStyle='#ff7020';if(Math.sin(t*9+i)>0)g.fillRect(X+11,Y+29,2,1);g.fillStyle='#5a3a2a';g.fillRect(X+6,Y+30,12,2);return}if(e.out){e.out=0;M.emit(R,'fire',x,y-10,14,{v:2});M.snd('whoosh',1.5)}
     const s=fr[Math.floor((RM?0:t)*8+i)%4];if(sel)g.drawImage(M.ring(s),X-1,Y-1);g.drawImage(s.c,X,Y);if(!RM&&Math.random()<.15)M.emit(R,'fire',x+K.rnd(-4,4),y-14,1)},
    click(e,R){if(e.out)return;e.out=M.now+3;M.snd('splash',.7);M.emit(R,'smoke',x,y-12,10);M.say(R,x,y-36,'PSSHH',.8)}}));
   // trapdoor
   R.trap=K.planet(R,{paint:'ashaad',w:66,h:60,x:500,y:FL+66,name:'TRAPDOOR',z:FL+40,hitR:30,dt:.05,arg:e=>({open:e?e.op:0}),
    e:{op:0,ot:0,upd(e,dt){if(e.ot>0){e.ot-=dt;e.op=Math.min(1,e.op+dt*1.4)}else e.op=Math.max(0,e.op-dt*1.2)},click(e,R){e.ot=2.5;M.snd('creak',.8);setTimeout(()=>M.snd('rumble',1),400);M.emit(R,'dust',500,FL+70,16,{v:1.5});M.say(R,500,FL+30,'NEXT FLOOR...',1.4)}}});
   // the crew (1:1 sprites from the game)
   const CREW=[['ashaad.png','ASHAAD',260],['julian.png','JULIAN',420],['emmanuel.png','EMMANUEL',600],['julian_good.png','GOOD JULIAN',760]];
   CREW.forEach(([f,nm,x0],i)=>{const e=M.ent(R,{x:x0,y:FL+40+(i%2)*40,w:32,h:32,spr:null,name:nm,idle:'bob',bs:5,ba:1,vx:(i%2?1:-1)*14,dir:1,react:'hop',hop:6,
    upd(e,dt,t){e.z=e.y+32;if(RM)return;if(M.now<e.stop)return;e.x+=e.vx*dt;e.y+=Math.sin(t*.7+i)*dt*8;e.y=clamp(e.y,FL+4,RH-36);if(e.x<60||e.x>R.w-90){e.vx*=-1;e.x=clamp(e.x,60,R.w-90)}e.flip=e.vx<0;if(Math.random()<dt*.15)e.vx*=-1},
    click(e,R){M.react(R,e);e.stop=M.now+.8;const d=e.flip?-1:1;for(let k=0;k<3;k++)setTimeout(()=>{R.tears.push({x:e.x+16+d*8,y:e.y+14,vx:d*(110+k*10),vy:-20,t0:M.now,gy:e.y+30});M.snd('pop',.8+k*.1)},k*120);M.say(R,e.x+16,e.y-2,K.pick(['PEW PEW!','TEARS!','BOO HOO','TAKE THAT!']),.9)}});L(f,s=>e.spr=s)});
   // the boss
   const boss=M.ent(R,{x:620,y:FL+30,w:64,h:64,spr:null,name:'FINLEY (BOSS)',idle:'bob',bs:2,ba:1,z:FL+94,react:false,
    upd(e,dt){if(e.jt!=null){e.jt+=dt;const p=e.jt/.7;e._yo=-Math.round(Math.sin(Math.min(1,p)*Math.PI)*22);e.y=FL+30+e._yo;if(p>=1){e.jt=null;e.y=FL+30;K.shake(R,.45,3);M.snd('thud',.6);M.emit(R,'dust',e.x+32,e.y+62,22,{v:1.6,floor:e.y+63})}}},
    click(e,R){if(e.jt!=null)return;e.jt=0;M.snd('roar',1);M.say(R,e.x+32,e.y-2,'RAAAH!',1)}});L('finley.png',s=>boss.spr=s);
   K.sign(R,940,FL+60,'PLAY >','https://landrcy.github.io/binding-of-ashaad/','PLAY THE BINDING OF ASHAAD',{col:'#6a3a2a'})},
  tap(R,x,y){M.emit(R,'dust',x,y,4)},
  upd(R,dt){for(const q of R.tears){q.x+=q.vx*dt;q.vy+=60*dt;q.y+=q.vy*dt;if(M.now-q.t0>.9||q.y>q.gy){q.dead=1;M.emit(R,'drop',q.x,q.y,6,{v:.8});M.snd('squish',1.8)}}R.tears=R.tears.filter(q=>!q.dead)},
  front(R,g,ox,oy){for(const q of R.tears){const x=Math.round(q.x+ox),y=Math.round(q.y+oy);g.fillStyle='#140c1c';g.fillRect(x-2,y-1,5,3);g.fillRect(x-1,y-2,3,5);g.fillStyle='#4aa8f0';g.fillRect(x-1,y-1,3,3);g.fillStyle='#c8f0ff';g.fillRect(x-1,y-1,1,1)}},
  back(R,g,ox,oy,t){const s=K.shk(R);if(s){g.drawImage(R.bg,ox+s,oy)}},
  ui(R,g){if(R.items){const T=M.txt('ITEMS: '+R.items,'#ffd8a0',null);M.frame(M.BW/2-T.w/2-6,M.BH-19,T.w+12,15,{c:['#140c1c','#3a2010','#a8603a','#1a0e0a']});g.drawImage(T.c,M.BW/2-T.w/2,M.BH-15)}}});
}

/* ================= LLC POWERED CHANNELS: the TV studio ================= */
{const FL=176,CH=[['LANGRINO','battle','https://www.youtube.com/@Langrino'],['CLUTCHCLIPS','mc','https://www.youtube.com/@clutchclipscrate'],['BOWLFULOFTRIVIA','cosmic','https://www.youtube.com/@bowlfuloftrivia'],['REDDITSTORYADAY','fire','https://www.youtube.com/channel/UCRegZeMyJ1B5B9n64rfgKAw'],['SAT IN A MINUTE','chalk','https://www.youtube.com/channel/UCfDhWTThokF3gKW03iEGijg']];
 const TVX=[150,300,480,660,810];
 K.ext('llc',{start:480,top:'#1a0a10',bot:'#2a160e',
  bg(p,R){const WL=['#12060a','#220a12','#36101c','#4e1826','#6a2232'],WD=ramp('#8a5a32',6);
   for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c;if(y<FL){const cx=x%12,cy=y%12,pyr=Math.abs(cx-5.5)+Math.abs(cy-5.5),lit=(cx<6?.1:-.1)+(cy<6?.1:-.1);c=rp(WL,.5-pyr/14+lit-(y<16?.2:0),x,y)}else{const k=(y-FL)/(RH-FL),pl=Math.floor(x/(34+k*14));c=rp(WD,.3+k*.35+H(pl,3)*.15+(x%(34+Math.floor(k*14))===0?-.25:0),x,y)}p.px(x,y,c)}
   for(let x=0;x<R.w;x++){p.px(x,FL,'#140c1c');p.rect(x,FL-6,1,6,ramp('#3a1a24'),{v:.5-((x>>2)&1)*.1})}
   // marquee "LLC" with bulb frame (bulbs animate in back())
   p.rrect(380,16,200,46,4,ramp('#2a1a2a'),{v:.4});p.rrect(384,20,192,38,3,['#0a0408','#140810'],{bv:0});big(p,'LLC',400,26,['#5a0a10','#a01820','#e83a3a','#ff8a7a','#fff0e0'],4);
   M.ftext(p,'POWERED',500,30,'#ffd8a0','#3a1010');M.ftext(p,'CHANNELS',500,42,'#ffd8a0','#3a1010');
   // TV stands
   for(const x of TVX){p.rect(x-3,FL-14,6,40,ramp('#4a4a52'),{v:.5});p.rect(x-14,FL+24,28,4,ramp('#3a3a42'),{v:.5})}
   // award plaque
   p.rrect(852,40,46,54,3,ramp('#6a4a2a'),{v:.5});p.rrect(858,46,34,34,3,ramp('#b8bcc8',6),{v:.6});p.poly([[870,54],[870,72],[884,63]],['#e8e8f0','#ffffff'],{v:.6});M.ftext(p,'100',866,83,'#ffe08a')},
  init(R){
   R.yt=K.planet(R,{paint:'yt',w:46,x:480,y:100,name:'LLC POWERED',dt:.07,hitR:18,e:{idle:'float',click(e,R){e.spd=8;setTimeout(()=>e.spd=1,900);M.snd('tada',1.2);M.emit(R,'note',480,100,14,{v:1.6});M.emit(R,'confetti',480,92,16)}}});
   const tvS=K.spr(44,38,p=>{p.rrect(0,0,44,34,4,ramp('#8a5a3a',6),{v:.55,tex:(x,y)=>((x+y*3)%7===0?-.1:0)});p.rrect(3,3,30,26,4,['#0a0a0a'],{bv:0});p.rect(36,6,5,5,ramp('#d8c8a0'),{v:.6});p.rect(36,14,5,5,ramp('#d8c8a0'),{v:.5});for(let i=0;i<4;i++)p.rect(36,22+i*2,5,1,'#3a2414');p.rect(6,34,6,4,ramp('#3a2a20'),{v:.5});p.rect(32,34,6,4,ramp('#3a2a20'),{v:.5})});
   CH.forEach(([nm,kind,url],i)=>{const x=TVX[i],ms=P.mk(18,18);P.moon(ms,1,kind);const S={st:0};
    M.ent(R,{x:x-22,y:FL-50,spr:tvS,name:nm,react:'jiggle',
     draw(g,X,Y,t,e,sel){if(sel)g.drawImage(M.ring(tvS),X-1,Y-1);g.drawImage(tvS.c,X,Y);const sx=X+4,sy=Y+4;
      if(M.now<S.st){for(let j=0;j<24;j++)for(let k=0;k<28;k+=1){const v=Math.random();if(v<.45)continue;g.fillStyle=v>.85?'#ffffff':v>.65?'#a8a8b0':'#4a4a52';g.fillRect(sx+k,sy+j,1,1)}}
      else{g.fillStyle=['#1a0a10','#0a1a10','#120a24','#1a0c04','#0a1410'][i];g.fillRect(sx,sy,28,24);if(!e.n||M.now>e.n){P.moon(ms,RM?3:t,kind);e.n=M.now+.1}g.drawImage(ms.c,sx+5,sy+2);
       g.fillStyle='rgba(0,0,0,.28)';for(let j=0;j<24;j+=2)g.fillRect(sx,sy+j,28,1);g.fillStyle='#ffffff';g.fillRect(sx+1,sy+1,2,1);g.fillRect(sx+1,sy+2,1,1)}},
     click(e,R){M.react(R,e);S.st=M.now+.45;M.snd('beep',1+i*.08);M.snd('splash',3);M.say(R,x,FL-54,nm,1.3)}});
    K.sign(R,x,FL+48,'WATCH >',url,'WATCH '+nm,{col:'#a8202a'})});
   // camera
   const cam=M.frames(2,34,46,(p,f)=>{const D=ramp('#3a3a48',6);p.line(17,22,6,45,'#2a2a30');p.line(17,22,28,45,'#2a2a30');p.line(17,22,17,45,'#4a4a52');p.rrect(4,6,24,16,2,D,{v:.55});p.rect(26,9,7,10,D,{v:.4});p.ell(32,14,2.5,4.5,['#0a1a2a','#2a5a8a','#8ad0ff'],{b:.1,spec:'#ffffff'});p.rect(6,2,10,4,D,{v:.6});p.disc(9,10,1.4,f?'#ff3030':'#5a1010')});
   M.ent(R,{x:236,y:FL-14,fr:cam,fps:2,name:'CAMERA',click(e,R){M.react(R,e);K.flash(R,'#ffffff',.22);M.snd('pop',.6);M.snd('beep',1.6);M.say(R,e.x+17,e.y-2,'SAY CHEESE!')}});
   // spotlights
   R.spots=[[60,1],[900,-1]].map(([x,d],i)=>M.ent(R,{x:x-10,y:FL-46,spr:K.spr(22,62,p=>{p.line(11,18,3,61,'#2a2a30');p.line(11,18,19,61,'#2a2a30');p.rect(10,18,2,44,ramp('#5a5a62'),{v:.5});p.rrect(2,2,18,16,3,ramp('#4a4a58',6),{v:.55});p.ell(d>0?17:4,10,3,6,['#a89a60','#fff4b0','#ffffff'],{b:.2})}),name:'SPOTLIGHT',on:1,flip:d<0,react:'jiggle',click(e,R){M.react(R,e);e.on^=1;M.snd('thud',2.2)}}));
   // clapperboard
   const clap=M.frames(2,22,20,(p,f)=>{p.rect(1,7,20,12,ramp('#2a2a30'),{v:.4});for(let i=0;i<5;i++)p.rect(2+i*4,10,2,8,'#e8e8f0');const a=f?0:-.45;for(let i=0;i<20;i++){const x=1+Math.cos(a)*i,y=6+Math.sin(a)*i;p.rect(Math.round(x),Math.round(y)-1,1,3,((i>>2)&1)?'#e8e8f0':'#1a1a20')}});
   M.ent(R,{x:362,y:FL+40,fr:clap,f:0,name:'CLAPPERBOARD',click(e,R){M.react(R,e);e.f=1;M.snd('thud',3);M.snd('crunch',2);setTimeout(()=>e.f=0,350);M.say(R,e.x+11,e.y-2,'ACTION!')}});
   // microphone
   M.ent(R,{x:574,y:FL-18,spr:K.spr(14,52,p=>{p.rect(6,14,2,34,ramp('#6a6a72'),{v:.5});p.ell(7,49,6,2,ramp('#3a3a42'),{});p.rrect(3,0,8,14,4,ramp('#a8a8b8',6),{v:.6,tex:(x,y)=>((x+y)%2?-.12:0)});p.rect(3,11,8,2,'#3a3a42')}),name:'MICROPHONE',react:'jiggle',fx:'note',fxn:5,snd:'chime',say:()=>K.pick(['TESTING 1 2','IS THIS ON?','HELLO WORLD!']),click(e,R){M.react(R,e)}});
   // ON AIR sign
   M.ent(R,{x:100,y:30,w:48,h:16,box:1,name:'ON AIR',on:1,draw(g,X,Y,t,e,sel){const on=e.on&&(RM||Math.sin(t*3)>-.6);M.frame(X,Y,48,16,{c:['#140c1c','#3a1a1a',on?'#ff5a4a':'#5a2a2a',on?'#a01a1a':'#2a0a0a']});g.drawImage(M.txt('ON AIR',on?'#fff0e0':'#8a5a5a',null).c,X+8,Y+5);if(sel){g.fillStyle='#fff6c4';g.fillRect(X,Y-1,48,1);g.fillRect(X,Y+16,48,1)}},click(e,R){e.on^=1;M.snd('beep',e.on?1.2:.7)}});
   // award
   M.ent(R,{x:852,y:40,w:46,h:54,box:1,name:'PLAY BUTTON AWARD',draw(g,X,Y,t,e,sel){if(e.sh&&M.now-e.sh<.6){const k=(M.now-e.sh)/.6;g.fillStyle='#ffffff';const sx=Math.round(X+6+k*40);for(let j=0;j<34;j++){const xx=sx-j/2|0;if(xx>X+6&&xx<X+40)g.fillRect(xx,Y+46-j,2,1)}}if(sel){g.fillStyle='#fff6c4';g.fillRect(X-1,Y,1,54);g.fillRect(X+46,Y,1,54)}},click(e,R){e.sh=M.now;M.snd('chime',1.2);M.emit(R,'star',875,62,12)}});
   // film projector with spinning reels
   const proj=M.frames(4,40,34,(p,f)=>{for(const[cx,cy]of[[10,10],[28,8]]){p.disc(cx,cy,8,null);p.ell(cx,cy,8,8,ramp('#7a7a88',6),{b:.05});for(let k=0;k<3;k++){const a=f*TAU/12+k*TAU/3;p.disc(cx+Math.cos(a)*4.5,cy+Math.sin(a)*4.5,1.8,'#1a1a22')}p.disc(cx,cy,1.2,'#d8d8e0')}p.rrect(4,16,32,12,2,ramp('#3a3a48',6),{v:.55});p.rect(34,19,5,6,ramp('#6a6a78'),{v:.5});p.rect(8,28,4,6,'#2a2a30');p.rect(28,28,4,6,'#2a2a30')});
   M.ent(R,{x:690,y:FL+18,fr:proj,fps:10,name:'FILM PROJECTOR',react:'jiggle',click(e,R){M.react(R,e);e.fps=e.fps>10?10:40;M.snd('type',1);R.beam=M.now+(e.fps>10?3:0)}});
   K.visitors(R,2,RH-6,['I SUBSCRIBED!','LIKE AND SUB!','SO RETRO!','CHANNEL SURFING'],{off:1})},
  back(R,g,ox,oy,t){// marquee bulbs
   for(let i=0;i<40;i++){const per=i<20,k=per?i:i-20,x=per?384+k*10:384+k*10,y=per?17:59;const on=RM?i%2:Math.floor(t*6+i)%3===0;g.fillStyle=on?'#fff0a0':'#6a4a20';g.fillRect(x+ox,y+oy,2,2)}
   for(const s of R.spots){if(!s.on)continue;const d=s.flip?-1:1,x0=s.x+(d>0?18:3),y0=s.y+10;g.fillStyle='#fff4c0';for(let i=4;i<150;i++){const hw=Math.round(i*.22);for(let j=-hw;j<=hw;j++){const x=Math.round(x0+d*i*.8+ox),y=Math.round(y0+i*.72+j*.4+oy);if(bay(x,y)<.86+i/600)continue;g.fillRect(x,y,1,1)}}}
   if(R.beam&&M.now<R.beam){g.fillStyle='#e8f4ff';for(let i=0;i<120;i++){const hw=Math.round(i*.15);for(let j=-hw;j<=hw;j++){const x=Math.round(728+i+ox),y=Math.round(FL+40+j-i*.3+oy);if(bay(x,y)<.8)continue;g.fillRect(x,y,1,1)}}}},
  front(R,g){K.drawFlash(R,g)}});
}

/* ================= BALL ARENA ================= */
{const FL=150,AW=220,AH=176,CX=450;
 K.ext('arena',{start:450,top:'#06060e',bot:'#141420',
  bg(p,R){const ST=['#06060e','#0e0e1c','#161628','#202036','#2c2c46'];
   for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c;const dx=Math.abs(x-CX);
    if(y<FL-20){c=rp(ST,.15+y/FL*.3,x,y);const tier=Math.floor((y-20)/9),inS=y>20&&dx>130;if(inS){const seat=((x>>2)+tier)&1;c=rp(['#0a0a16','#16162a','#22223e','#34345a'],.3+(seat?.1:0)+((y-20)%9===0?-.2:0),x,y);if(H(x>>2,tier)>.4&&(y-20)%9>2&&(y-20)%9<7)c=rp([['#3a1a2a','#6a2a3a'],['#1a2a4a','#2a4a7a'],['#3a3a1a','#6a6a2a'],['#1a3a2a','#2a6a4a']][Math.floor(H(tier,x>>2)*4)],.5,x,y)}}
    else{const k=(y-FL+20)/(RH-FL+20),pool=Math.max(0,1-Math.hypot((x-CX)/260,(y-200)/70));c=rp(['#0e0c18','#1a1628','#26203a','#3a3050','#5a4a6a'],.2+pool*.6+(((x>>4)+(y>>3))&1?.04:0),x,y)}p.px(x,y,c)}
   // barrier boards
   for(let x=0;x<R.w;x++)for(let y=FL-20;y<FL-8;y++){const seg=Math.floor(x/60);p.px(x,y,rp(ramp(['#c83a3a','#3a6ac8','#e0a838','#3aa860'][seg%4],5),.65-(y-FL+20)/16,x,y))}
   for(let s=0;s*60<R.w;s++)M.ftext(p,['LANGRINO','BALL','FIGHT','ARENA'][s%4],s*60+8,FL-18,'#fff6dc','#140c1c');
   // banners
   for(let i=0;i<6;i++){const x=60+i*150,c=ramp(['#c83a3a','#3a6ac8','#e0a838'][i%3]);if(Math.abs(x-CX)<80)continue;p.poly([[x,0],[x+18,0],[x+18,30],[x+9,24],[x,30]],c,{v:.55});p.ell(x+9,12,4,4,ramp('#fff4d8'),{b:.1})}},
  init(R){
   R.ar=K.planet(R,{paint:'arena',w:AW,h:AH,x:CX,y:150,name:'THE RING',hitR:70,dt:.05,z:150,e:{click(e,R){M.snd('ding',1);M.emit(R,'confetti',CX,90,26,{v:1.4});R.wave=M.now;R.cheer=M.now}}});
   // crowd front rows
   const CR=['#c84a3a','#3a8ac8','#e0b030','#4ab05a','#a04ac8','#f0f0f0','#e86aa0'];
   R.crowd=[];for(let i=0;i<52;i++){const left=i<26,k=left?i:i-26,x=left?8+k*12+(k%2)*3:R.w-20-k*12-(k%2)*3,y=FL-34+(k%2)*6;if(Math.abs(x-CX)<118)continue;
    const fr=M.frames(2,10,16,(p,f)=>{const sk=['#f0c8a0','#c88a5a','#8a5a3a','#5a3a20'][i%4],sh=ramp(CR[i%7],4);p.ell(5,4,3,3,ramp(sk,4),{b:.1});p.rect(3,1,5,2,ramp(['#2a1a10','#e8c060','#1a1010','#8a3a1a'][(i>>1)%4]),{});p.rect(2,8,7,7,sh,{v:.55});if(f){p.rect(1,1,1,7,ramp(sk),{});p.rect(9,1,1,7,ramp(sk),{})}else{p.rect(1,8,1,5,ramp(sk),{});p.rect(9,8,1,5,ramp(sk),{})}});
    R.crowd.push(M.ent(R,{x,y,fr,f:0,name:'FAN',z:y,idle:'bob',bs:3+H(i,1)*2,ba:.6,cx:x,upd(e){const w=R.wave?(M.now-R.wave)*260-Math.abs(e.cx-CX)+120:-1;e.f=(w>0&&w<140)||M.now<e.ch?1:0;if(w>0&&w<140)e._up=1},click(e,R){e.ch=M.now+.8;M.play(e,'hop',.4);M.snd('yip',1.3+Math.random()*.4);M.emit(R,'confetti',e.x+5,e.y,6);R.wave=M.now-.4}}))}
   // bell
   M.ent(R,{x:250,y:FL+50,spr:K.spr(24,36,p=>{p.rect(11,14,3,20,ramp('#6a4a2a'),{v:.5});p.rect(4,33,16,3,ramp('#4a3020'),{v:.5});p.ell(12,9,9,8,ramp('#e0a838',6),{b:.15,spec:'#fffbe0',clip:(x,y)=>y<14});p.rect(3,13,19,2,ramp('#a87020'),{v:.5});p.disc(12,15,1.6,'#3a2008')}),name:'BELL',react:'shake',fx:'confetti',fxn:14,snd:'ding',say:'DING DING!',click(e,R){M.react(R,e);R.wave=M.now;M.snd('ding',1.25)}});
   // trophy
   M.ent(R,{x:640,y:FL+46,spr:K.spr(26,40,p=>{const G2=ramp('#e0a838',6);p.rect(5,32,16,8,ramp('#3a2a4a'),{v:.5});p.rect(10,24,6,8,G2,{v:.5});p.ell(13,10,10,10,G2,{b:.15,clip:(x,y)=>y>=4});p.rect(3,4,21,2,G2,{v:.7});p.ell(3,12,3,4,G2,{clip:(x,y)=>x<4});p.ell(23,12,3,4,G2,{clip:(x,y)=>x>22});p.px(9,8,'#fffbe0');p.px(9,9,'#fffbe0')}),name:'CHAMPION TROPHY',react:'hop',fx:'gold',fxn:18,snd:'tada',say:'CHAMPION!',click(e,R){M.react(R,e);M.emit(R,'star',e.x+13,e.y+8,10)}});
   // scoreboard
   R.score=[3,2];M.ent(R,{x:CX-40,y:6,w:80,h:24,box:1,name:'SCOREBOARD',z:0,draw(g,X,Y,t,e,sel){M.frame(X,Y,80,24,{c:['#140c1c','#2a2a3a',sel?'#ffe08a':'#8a8aa0','#0a0a12']});const a=M.txt(String(R.score[0]),'#ff5a4a',null),b=M.txt(String(R.score[1]),'#5ab0ff',null);g.drawImage(M.txt('RED','#ff8a7a',null).c,X+6,Y+5);g.drawImage(a.c,X+8,Y+14);g.drawImage(M.txt('BLUE','#8ac8ff',null).c,X+56,Y+5);g.drawImage(b.c,X+64,Y+14);if(RM||Math.sin(t*4)>0){g.fillStyle='#ffe08a';g.fillRect(X+39,Y+9,2,2);g.fillRect(X+39,Y+14,2,2)}},
    click(e,R){const k=Math.random()<.5?0:1;R.score[k]++;M.snd('beep',1.2);M.emit(R,'pixel',CX,30,10);R.wave=M.now}});
   // bouncing mascot balls
   const ball=(c)=>K.spr(16,16,p=>p.ell(8,8,7,7,ramp(c,6),{b:.1,spec:'#ffffff'}));
   [['#d83a3a',140],['#3a7ad8',760],['#e0b030',560]].forEach(([c,x],i)=>{const sp=ball(c);M.ent(R,{spr:sp,name:['RED BALL','BLUE BALL','GOLD BALL'][i],x,y:RH-30,vx:(i%2?-1:1)*30,vy:0,gy:RH-24-i*8,
    upd(e,dt){if(RM&&!e.kick)return;e.vy+=300*dt;e.y+=e.vy*dt;e.x+=e.vx*dt;if(e.y>e.gy){e.y=e.gy;e.vy=-Math.abs(e.vy)*.7;if(Math.abs(e.vy)<60)e.vy=-90;e.kick=0}if(e.x<20||e.x>R.w-36){e.vx*=-1;e.x=clamp(e.x,20,R.w-36)}e.z=e.gy+16},
    click(e,R){e.vy=-230;e.vx=(Math.random()-.5)*160;e.kick=1;M.snd('boing',1+i*.15);M.emit(R,'star',e.x+8,e.y+8,6)}})});
   K.sign(R,840,RH-12,'WATCH >','https://www.youtube.com/@Langrino','WATCH LANGRINO',{col:'#3a3a8a'})},
  back(R,g,ox,oy,t){// sweeping spotlights
   for(let s=0;s<2;s++){const a=(RM?.3:Math.sin(t*.6+s*2))*.6,x0=s?R.w-40:40,dir=s?-1:1;g.fillStyle='#fff4d0';for(let i=10;i<240;i+=1){const cx=x0+dir*i*Math.cos(.55+a*dir)*1.3,cy=i*Math.sin(.55+a*dir)*.9+4,hw=Math.round(i*.12);for(let j=-hw;j<=hw;j++){const x=Math.round(cx+j+ox),y=Math.round(cy+oy);if(bay(x,y)<.9)continue;g.fillRect(x,y,1,1)}}}}});
}

/* ================= COOPER CITY ================= */
{const SW=226,RD=238,BLD=[];{let x=0,i=0;while(x<1100){const w=40+Math.floor(H(i,1)*40),h=70+Math.floor(H(i,2)*110);if(Math.abs(x+w/2-550)<70){x+=140;i++;continue}BLD.push({x,w,h,c:['#3a4a6a','#5a3a5a','#4a5a5a','#6a4a3a','#3a3a5a'][i%5],i});x+=w+4+Math.floor(H(i,3)*10);i++}}
 K.ext('city',{start:550,top:'#2a1a4a',bot:'#2a2a34',
  bg(p,R){const SK=['#1a1240','#2e1a58','#4a2462','#7a3466','#b84e60','#e8805a','#f8b070'];
   for(let y=0;y<RH;y++)for(let x=0;x<R.w;x++){let c=rp(SK,y/150+(vn(x/90,y/40)-.5)*.08,x,y);if(y>SW-40){c=rp(SK,.9,x,y)}p.px(x,y,c)}
   for(let i=0;i<120;i++){p.px(H(i,1)*R.w,H(i,2)*60,H(i,3)>.8?'#ffffff':'#c8b0e0')}
   p.ell(820,SW-50,26,26,['#ff7a3a','#ffb05a','#ffe08a','#fff4c0'],{b:.2,clip:(x,y)=>y<SW-44});
   // distant skyline
   for(let x=0;x<R.w;x++){const h=30+Math.floor(vn(Math.floor(x/14),5)*50);for(let y=SW-h;y<SW;y++){p.px(x,y,rp(['#2a1a40','#3a2450','#4a3060'],.4-(y-SW+h)/h*.3,x,y));if(H(x>>1,y>>1)>.93&&(x%3)&&(y%3))p.px(x,y,'#ffd890')}}
   // mid buildings
   for(const b of BLD){const y0=SW-b.h;p.rect(b.x,y0,b.w,b.h,ramp(b.c,6),{v:.5,bv:.2,tex:(x,y)=>((x-b.x)%8===0?-.06:0)});for(let y=y0+6;y<SW-8;y+=9)for(let x=b.x+4;x<b.x+b.w-5;x+=7){p.rect(x,y,4,5,['#1a1424','#24203a'],{bv:0})}
    p.rect(b.x-1,y0-3,b.w+2,3,ramp(mix(b.c,'#140c1c',.3)),{v:.5});if(b.i%3===0){p.rect(b.x+b.w/2-1,y0-14,2,11,'#6a6a7a');p.px(b.x+b.w/2,y0-15,'#ff4a3a')}if(b.i%4===1)p.rect(b.x+6,y0-10,12,7,ramp('#7a5a3a'),{v:.5})}
   // plaza + monument pedestal
   p.rect(470,SW-10,160,10,ramp('#a8a0a0',6),{v:.6});p.rect(530,150,40,SW-150,ramp('#c8c0b8',6),{v:.55,tex:(x,y)=>(y%10===0?-.15:0)});p.rect(524,146,52,6,ramp('#e0d8d0',6),{v:.7});p.rect(522,SW-18,56,8,ramp('#b8b0a8',6),{v:.5});M.ftext(p,'COOPER',532,176,'#3a3040');M.ftext(p,'CITY',538,186,'#3a3040');
   // sidewalk + road
   for(let y=SW;y<RH;y++)for(let x=0;x<R.w;x++){let c;if(y<RD-2)c=rp(ramp('#8a8494',5),.55+(x%16===0?-.2:0),x,y);else if(y<RD)c='#5a5468';else{c=rp(['#1a1a24','#22222e','#2a2a38','#34344a'],.4+(vn(x/3,y/3)-.5)*.3,x,y);if(y===RD+16&&x%24<12)c='#f0d060';if(y>RH-6)c=rp(ramp('#8a8494',5),.45,x,y)}p.px(x,y,c)}},
  init(R){R.fw=[];
   R.crest=K.planet(R,{paint:'crest',w:76,h:61,x:550,y:110,name:'COOPER CITY CREST',hitR:30,dt:.06,e:{click(e,R){M.snd('tada',1);for(let k=0;k<4;k++)setTimeout(()=>R.launch(380+Math.random()*340,20+Math.random()*60),k*220);M.emit(R,'gold',550,110,20)}}});
   R.launch=(x,y)=>{R.fw.push({x,y0:SW-10,y,t0:M.now,c:K.pick([['#ff5a6a','#ffd0d8'],['#5ad0ff','#d0f4ff'],['#ffd040','#fff6c0'],['#8aff7a','#e0ffd8'],['#c070ff','#f0d8ff']]),boom:0});M.snd('laser',.5)};
   // buildings with switchable lights
   for(const b of BLD){const pat=Array.from({length:200},(_,k)=>H(b.i,k)>.55);M.ent(R,{x:b.x,y:SW-b.h,w:b.w,h:b.h,box:1,name:'BUILDING',z:-10,mode:0,
    draw(g,X,Y,t,e,sel){g.fillStyle=e.mode===2?'#ff8af0':'#ffd890';let k=0;for(let y=6;y<b.h-8;y+=9)for(let x=4;x<b.w-5;x+=7){k++;let on=e.mode===1?0:e.mode===2?((k+Math.floor(t*4))%3===0):pat[k%200];if(!RM&&e.mode===0&&H(k,Math.floor(t*.3)+b.i)>.97)on=!on;if(on)g.fillRect(X+x,Y+y,4,5)}
     if(sel){g.fillStyle='#fff6c4';g.fillRect(X-1,Y-3,1,b.h+3);g.fillRect(X+b.w,Y-3,1,b.h+3);g.fillRect(X-1,Y-4,b.w+2,1)}},
    click(e,R){e.mode=(e.mode+1)%3;M.snd(e.mode===2?'chime':'thud',e.mode===1?2:1.3);M.emit(R,'star',b.x+b.w/2,SW-b.h,6)}})}
   // billboard
   const bb=K.spr(84,36,p=>{p.rect(10,26,3,10,ramp('#4a4a52'),{v:.5});p.rect(70,26,3,10,ramp('#4a4a52'),{v:.5});p.rect(0,0,84,27,ramp('#e0a838'),{v:.6});p.rect(3,3,78,21,['#1a0e2a','#2a1640'],{bv:0});M.ftext(p,'GAME OF',22,5,'#ffe08a','#5a2a10');M.ftext(p,'WEBSITES',19,14,'#7ad0ff','#102a4a')});
   const tb=BLD.find(b=>b.x>720&&b.h<130)||BLD[BLD.length-3];M.ent(R,{x:tb.x+tb.w/2-42,y:SW-tb.h-36,spr:bb,name:'GAME OF WEBSITES',z:-5,react:'jiggle',click(e,R){M.react(R,e);M.snd('coin');M.emit(R,'star',e.x+42,e.y+12,14);setTimeout(()=>K.open('https://coopercitywebsites.github.io/main/'),160)}});
   // cars
   const car=(c,tp)=>K.spr(32,16,p=>{const C=ramp(c,6);p.rrect(0,6,32,7,2,C,{v:.6});if(tp)p.rrect(6,0,18,8,2,C,{v:.7});else p.rrect(8,1,15,7,3,C,{v:.7});p.rect(tp?8:10,2,6,4,['#2a4a6a','#7ac0e0'],{v:.6});p.rect(tp?16:16,2,6,4,['#2a4a6a','#7ac0e0'],{v:.6});p.disc(7,13,2.5,'#140c1c');p.disc(25,13,2.5,'#140c1c');p.px(7,13,'#8a8a94');p.px(25,13,'#8a8a94');p.px(31,8,'#fff4a0');p.px(0,8,'#ff3a3a')});
   [['#d83a3a',0],['#3a7ad8',1],['#f0c030',0],['#4ab05a',1],['#e8e8f0',0],['#a04ac8',1]].forEach(([c,tp],i)=>{const lane=i%2,sp=car(c,tp);M.ent(R,{spr:sp,name:'CAR',x:i*190,y:lane?RD+2:RD+18,vx:lane?-40-i*4:44+i*4,flip:!!lane,boost:0,z:lane?RD+18:RD+34,
    upd(e,dt){if(RM)return;e.boost=Math.max(0,e.boost-dt);e.x+=e.vx*dt*(1+e.boost*2);if(e.vx>0&&e.x>R.w+20)e.x=-40;if(e.vx<0&&e.x<-40)e.x=R.w+20;if(e.boost>0&&Math.random()<.4)M.emit(R,'smoke',e.x+(e.vx>0?0:32),e.y+10,1)},
    click(e,R){e.boost=1.2;M.snd('honk',1+i*.06);M.say(R,e.x+16,e.y-2,'BEEP BEEP!',.8);M.emit(R,'smoke',e.x+(e.vx>0?0:32),e.y+10,6)}})});
   // balloon
   M.ent(R,{x:300,y:40,spr:K.spr(28,44,p=>{const st=(x)=>((x>>2)&1);p.ell(14,13,13,13,ramp('#e04a4a',6),{b:.1,tex:(x,y)=>st(x)?.0:.18});p.poly([[5,22],[23,22],[17,30],[11,30]],ramp('#e04a4a',6),{v:.4});p.line(11,30,11,36,'#6a4a2a');p.line(17,30,17,36,'#6a4a2a');p.rect(9,36,10,7,ramp('#a8743a'),{v:.6})}),name:'HOT AIR BALLOON',hy:40,vy:0,upd(e,dt,t){e.vy*=.98;e.hy=clamp(e.hy+e.vy*dt+(RM?0:Math.sin(t*.4)*dt*2),8,110);e.y=Math.round(e.hy);if(!RM)e.x+=dt*5;if(e.x>R.w)e.x=-30},
    click(e,R){e.vy=-28;M.snd('whoosh',.6);M.emit(R,'fire',e.x+14,e.y+32,12)}});
   // fountain
   M.ent(R,{x:442,y:SW-12,spr:K.spr(40,14,p=>{p.ell(20,8,19,5,ramp('#a8a0b0',6),{b:.1});p.ell(20,7,15,3,['#2a5a8a','#4a8ac8','#8ad0ff'],{b:.2})}),name:'FOUNTAIN',big:0,upd(e,dt){if(!RM&&Math.random()<.7)M.emit(R,'water',462,SW-14,1,{dir:-Math.PI/2,spread:.4,v:.9})},click(e,R){M.emit(R,'water',462,SW-14,40,{dir:-Math.PI/2,spread:.7,v:1.6});M.snd('splash',1);M.say(R,462,SW-30,'SPLASH!',.8)}});
   // streetlights
   for(let i=0;i<8;i++){const x=70+i*140;if(Math.abs(x-550)<60)continue;M.ent(R,{x:x-4,y:SW-40,spr:K.spr(9,42,p=>{p.rect(3,6,3,36,ramp('#3a3a4a'),{v:.5});p.rect(0,0,9,6,ramp('#4a4a5a'),{v:.6})}),name:'STREETLIGHT',on:1,z:SW,click(e,R){e.on^=1;M.snd('thud',2);if(e.on)M.emit(R,'star',x,SW-36,5)}})}
   // pigeons
   const pig=M.frames(2,8,7,(p,f)=>{p.ell(4,4,3.5,2.5,ramp('#8a8a9a'),{b:.1});p.rect(5,1,2,2,ramp('#7a7a8a'),{});p.px(7,2,'#e0a030');if(f){p.line(1,1,3,3,'#a8a8b8')}p.px(3,6,'#e07a3a');p.px(5,6,'#e07a3a')});
   for(let i=0;i<5;i++)M.ent(R,{fr:pig,name:'PIGEON',x:620+i*16,y:SW+2,hx:620+i*16,st:0,upd(e,dt,t){if(e.st){e.st+=dt;e.y-=40*dt;e.x+=30*dt;e.f=Math.floor(t*14)%2;if(e.st>3){e.st=0;e.x=e.hx;e.y=SW+2}}else e.f=!RM&&Math.sin(t*3+i*2)>.9?1:0},click(e,R){if(e.st)return;R.ents.filter(q=>q.fr===pig).forEach(q=>q.st=.01);M.snd('whoosh',2);M.emit(R,'dust',e.x,e.y,6)}});
   K.visitors(R,4,RD-1,['NICE CITY!','GO COOPER!','LOOK, FIREWORKS!','HI NEIGHBOR!'],{off:3});
   K.sign(R,1040,RD,'VISIT >','https://coopercitywebsites.github.io/','OPEN COOPER CITY WEBSITES',{col:'#2a4a8a'})},
  tap(R,x,y){if(y<SW-40)R.launch(x,y)},
  upd(R,dt){if(!RM&&Math.random()<dt*.15)R.launch(R.cam.x+40+Math.random()*(M.BW-80),20+Math.random()*60);for(const f of R.fw){const a=(M.now-f.t0)/.7;if(a>=1&&!f.boom){f.boom=1;M.emit(R,'star',f.x,f.y,22,{c:f.c,v:1.6});M.emit(R,'spark',f.x,f.y,10,{c:f.c,v:.8});M.snd('pop',.5)}}R.fw=R.fw.filter(f=>!f.boom)},
  back(R,g,ox,oy,t){for(const f of R.fw){const a=Math.min(1,(M.now-f.t0)/.7),y=lerp(f.y0,f.y,1-(1-a)*(1-a));g.fillStyle=f.c[1];g.fillRect(Math.round(f.x+ox),Math.round(y+oy),1,2);g.fillStyle=f.c[0];g.fillRect(Math.round(f.x+ox),Math.round(y+2+oy),1,2)}},
  front(R,g,ox,oy,t){for(const e of R.ents)if(e.name==='STREETLIGHT'&&e.on){const x=e.x+4+ox,y=e.y+6+oy;g.fillStyle='#ffe9a0';g.fillRect(x-3,y,7,1);for(let j=1;j<30;j++)for(let i=-j*.4|0;i<=j*.4;i++){if(bay(x+i,y+j)<.88)continue;g.fillRect(x+i,y+j,1,1)}}}});
}
})();
