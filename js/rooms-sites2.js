/* Landry's site temples (part 2): LLC BROADCAST SHRINE, BALL ARENA COLOSSEUM, COOPER SKY CITY */
(()=>{'use strict';const{rp,ramp,bay,H,vn,fbm,RM,TAU,clamp,lerp,mix}=M;const K=M.K,PAL=K.PAL,{glowAt,px,sel1}=K.S;

/* ======================= LLC BROADCAST SHRINE ======================= */
{const W=900,FL=170,RD=['#1a0408','#4a0a12','#8a141e','#d8283a','#ff7a7a'],CH=[['LANGRINO','battle','https://www.youtube.com/@Langrino'],['CLUTCHCLIPS','mc','https://www.youtube.com/@clutchclipscrate'],['BOWLFULOFTRIVIA','cosmic','https://www.youtube.com/@bowlfuloftrivia'],['REDDITSTORYADAY','fire','https://www.youtube.com/channel/UCRegZeMyJ1B5B9n64rfgKAw'],['SAT IN A MINUTE','chalk','https://www.youtube.com/channel/UCfDhWTThokF3gKW03iEGijg']];
 K.ext('llc',{top:'#0e0408',bot:'#0e0408',start:450,
  bg(p,R){K.wall(p,0,0,W,FL,['#0e0408','#1e0a10','#2e1218','#42202a','#5a3038'],{v:.35,bh:12,bw:20,sd:51});
   // red lacquer pillars and a giant stone play-triangle relief
   for(const cx of[40,250,650,860])K.pillar(p,cx,14,FL,16,RD,{cap:8,base:8,rune:'#ffe08a',sd:cx});
   p.poly([[400,30],[400,110],[470,70]],['#2a0a10','#3a121a','#4a1a22'],{v:.5,bv:.3});
   K.floor(p,FL,M.RH,['#140608','#2a0e12','#3e161c','#5a2028','#7a3038'],{v:.3,inlay:(x,y)=>(x%60<2&&y>FL+3)?'#8a141e':0})},
  init(R){
   K.planet(R,{paint:'yt',w:52,x:450,y:70,name:'ETERNAL PLAY BUTTON',z:-10,e:{cl:-9,pre(g,X,Y,t,e){glowAt(g,X+26,Y+26,40,'#ff3a3a',.22+.1*Math.sin(t*2))},
    click(e,R){e.cl=M.now;M.snd('tada',1);M.emit(R,'confetti',450,70,30,{v:1.6});M.say(R,450,36,K.pick(['LIKE AND SUBSCRIBE!','SMASH THAT BELL','+1,000,000 VIEWS']),1.4)}}});
   // five CRT monoliths, one per channel (moon on screen); click -> static then the channel's moon; sign below links out
   CH.forEach(([nm,kind,url],i)=>{const x=110+i*170-(i>2?40:0);const cx=i<2?110+i*130:i===2?560:i===3?700:820;const mx=[95,215,560,700,800][i];
    const e=K.planet(R,{paint:'moon',kind,w:20,x:mx,y:FL-44,name:nm+' CRT',z:FL,dt:.1,e:{st:-9,pre(g,X,Y,t,e){g.fillStyle='#2a2a32';g.fillRect(X-8,Y-6,36,34);g.fillStyle='#4a4a56';g.fillRect(X-8,Y-6,36,2);g.fillStyle='#05050a';g.fillRect(X-5,Y-3,30,26);glowAt(g,X+10,Y+10,18,'#8ab0ff',.2)
      ;g.fillStyle='#1a1a22';g.fillRect(X-2,Y+28,24,16);for(let k=0;k<3;k++)px(g,X+2+k*6,Y+32,k===1?'#ff3a3a':'#4a4a56',3,2)},
     post(g,X,Y,t,e){const a=M.now-e.st;if(a<.7){for(let y=-3;y<23;y++)for(let x=-5;x<25;x++)if(H(x+((t*60)|0),y)>.5)px(g,X+x,Y+y,H(x,y+((t*60)|0))>.5?'#e0e0e0':'#5a5a5a')}
      for(let y=-3;y<23;y+=2)px(g,X-5,Y+y,'rgba(0,0,0,.25)',30,1);if(a>.7&&a<2.5)g.drawImage(M.txt(nm,'#ffffff','#000').c,X+10-(M.tw(nm)>>1)-1,Y-16)},
     click(e,R){e.st=M.now;M.snd('glitch',1.2);setTimeout(()=>M.snd('beep',1+i*.1),700)}}});
    K.portalSign(R,mx,FL+28,'WATCH',url,['#ff3a3a','#ffd0d0'],'WATCH '+nm)});
   // play-button plaques: silver/gold/diamond with a shine sweep
   const TIER=[['SILVER',['#3a3a46','#7a7a88','#b0b0bc','#e0e0ea']],['GOLD',PAL.gold.slice(1)],['DIAMOND',['#1a4a6a','#4aa0d0','#9ae0ff','#ffffff']]];
   TIER.forEach(([nm,c],i)=>M.ent(R,{name:nm+' PLAY PLAQUE',x:270+i*36,y:44,w:28,h:34,box:1,z:-5,noNav:1,sh:-9,
    draw(g,X,Y,t,e,sel){g.fillStyle=c[1];g.fillRect(X,Y,28,34);g.fillStyle=c[2];g.fillRect(X+2,Y+2,24,30);g.fillStyle=c[0];g.fillRect(X+6,Y+8,16,12);g.fillStyle=c[3];for(let y=0;y<8;y++)g.fillRect(X+11,Y+10+y,Math.round(4-Math.abs(y-3.5)),1);
     const a=M.now-e.sh,sx=a<.8?a/.8*44-8:((t*.4+i*.3)%3)*20-8;for(let y=0;y<34;y++){const x=Math.round(X+sx-y*.5);if(x>=X&&x<X+28)px(g,x,Y+y,'#ffffff',2,1)}if(a<1.5)glowAt(g,X+14,Y+17,20,c[3],.4);if(sel)sel1(g,X,Y,28)},
    click(e,R){e.sh=M.now;M.snd('chime',1+i*.2);M.emit(R,'star',e.x+14,e.y+17,10,{c:[c[3],'#ffffff']});M.say(R,e.x+14,e.y-6,['100K SUBS','1M SUBS','10M SUBS?!'][i],1)}}));
   // ON AIR sign
   M.ent(R,{name:'ON AIR SIGN',x:520,y:36,w:44,h:16,box:1,z:-5,noNav:1,on:-9,
    draw(g,X,Y,t,e,sel){const on=M.now-e.on<3;g.fillStyle='#1a0a0a';g.fillRect(X,Y,44,16);g.fillStyle=on?'#ff2a2a':'#4a1a1a';g.fillRect(X+2,Y+2,40,12);if(on)glowAt(g,X+22,Y+8,30,'#ff2a2a',.4);g.drawImage(M.txt('ON AIR',on?'#ffffff':'#8a3a3a',false).c,X+9,Y+4);if(sel)sel1(g,X,Y,44)},
    click(e,R){e.on=M.now;M.snd('bell',1);M.say(R,e.x+22,e.y+26,'WE ARE LIVE!',1);for(let i=0;i<6;i++)setTimeout(()=>M.snd('clack',1.5+Math.random()*.5),200+i*90)}});
   // film serpent
   M.ent(R,{name:'FILM SERPENT',x:300,y:110,w:120,h:40,box:1,z:-2,noNav:1,co:-9,
    draw(g,X,Y,t,e,sel){const a=M.now-e.co,coil=a<3?Math.sin(Math.min(1,a)*Math.PI/2)*(a>2.5?(3-a)*2:1):0;const pts=[];for(let s=0;s<40;s++){const u=s/40;let x=X+u*120+Math.sin(t)*6,y=Y+20+Math.sin(u*9-t*3)*10;if(coil){const an=u*TAU*2+t*2,r=6+u*20;x=lerp(x,X+60+Math.cos(an)*r,coil);y=lerp(y,Y+20+Math.sin(an)*r*.6,coil)}pts.push([x,y])}
     for(let s=pts.length-1;s>=0;s--){const[x,y]=pts[s];px(g,x-2,y-3,'#1a1a1a',5,7);if(s%2)px(g,x-1,y-2,'#8ab0ff',3,4);px(g,x-2,y-3,'#e0e0e0',1,1);px(g,x+2,y+3,'#e0e0e0',1,1)}
     const[hx,hy]=pts[pts.length-1];px(g,hx-1,hy-4,'#1a1a1a',8,8);px(g,hx+3,hy-2,'#ff3a3a',2,2);if(sel)sel1(g,X,Y,120)},
    click(e,R){e.co=M.now;M.snd('hiss',1.2);M.snd('servo',.7);M.say(R,e.x+60,e.y-4,'SSSSSUBSCRIBE',1.2)}});
   // camera golem
   const CG=M.mk(28,40,p=>{p.rect(6,14,16,18,PAL.iron,{v:.5,bv:.3});p.rect(2,0,24,14,['#1a1a22','#2e2e3a','#4a4a56'],{v:.5,bv:.3});p.ell(14,7,5,5,['#05050a','#1a2a4a','#4a7ab0','#bcecff'],{b:.3,spec:'#ffffff'});p.rect(4,2,4,2,'#ff3a3a');p.rect(8,32,4,8,PAL.iron,{v:.5});p.rect(16,32,4,8,PAL.iron,{v:.5});p.rect(2,16,4,12,PAL.iron,{v:.6});p.rect(22,16,4,12,PAL.iron,{v:.4})},'#05050a');
   M.ent(R,{name:'CAMERA GOLEM',x:340,y:FL-40,w:28,h:40,box:1,z:FL,sh:-9,
    draw(g,X,Y,t,e,sel){const b=Math.round(Math.sin(t*2));if(sel)g.drawImage(M.ring(CG),X-1,Y-1+b);g.drawImage(CG.c,X,Y+b);if(M.now-e.sh<.3)glowAt(g,X+14,Y+7,40,'#ffffff',.8)},
    click(e,R){e.sh=M.now;M.snd('crack',2);M.flash(R,'#ffffff',.08);M.say(R,e.x+14,e.y-6,K.pick(['SAY CHEESE!','THUMBNAIL FACE!','*CLICK* PERFECT']),1)}});
   K.motes(R,16,0,W,20,FL,['#ff7a7a','#ffe08a'])}
 })}

/* ======================= BALL ARENA COLOSSEUM ======================= */
{const W=900,FL=170,CX=450,ST=PAL.sand;
 K.ext('arena',{top:'#120a1e',bot:'#120a1e',start:450,
  bg(p,R){for(let y=0;y<60;y++)for(let x=0;x<W;x++)p.px(x,y,rp(['#120a1e','#1e1030','#2e1a48','#4a2a5a'],y/60*.8+(fbm(x/50,y/20)-.5)*.2,x,y));
   // colosseum tiers with arches
   for(let t=0;t<3;t++){const y0=24+t*34;for(let y=y0;y<y0+34;y++)for(let x=0;x<W;x++){const ax=(x+t*12)%34,ay=y-y0;const arch=ax>6&&ax<28&&ay>10&&Math.hypot((ax-17)/11,Math.max(0,18-ay)/8)<1;p.px(x,y,arch?rp(['#0a0610','#140c1c'],ay/34,x,y):rp(ST,.4+(ay<3?.3:0)-(ay>31?.2:0)+(fbm(x/6,y/6)-.5)*.2,x,y))}}
   for(let y=128;y<FL;y++)for(let x=0;x<W;x++)p.px(x,y,rp(ST,.55-(y-128)/60+(y===128?.3:0),x,y));
   K.floor(p,FL,M.RH,ST,{v:.45,tw:30})},
  init(R){R.wave=-9;
   const ar=K.planet(R,{paint:'arena',w:150,h:120,x:CX,y:96,name:'THE ETERNAL RING',z:-10,dt:.05,e:{click(e,R){M.snd('ding',1);M.emit(R,'confetti',CX,60,30,{v:1.6});R.wave=M.now;M.say(R,CX,48,'FIGHT! FIGHT! FIGHT!',1.2)}}});
   // ghost crowd (heads in arches, does the wave)
   M.ent(R,{name:'GHOST CROWD',x:0,y:30,w:W,h:96,box:1,z:-20,noNav:1,
    draw(g,X,Y,t,e,sel){for(let t2=0;t2<3;t2++)for(let i=0;i<W/34;i++){const x=X+i*34-t2*12+17,y=Y+t2*34+16;const ph=(M.now-R.wave)*300-(x-X),up=ph>0&&ph<60?Math.round(Math.sin(ph/60*Math.PI)*6):Math.round(Math.sin(t*3+i+t2)*.6);const c=['#a0e0ff','#ffd0a0','#c0ffc0','#ffc0e0'][(i+t2)%4];g.globalAlpha=.75;px(g,x-3,y-up,c,6,7);px(g,x-2,y-up+2,'#000',1,1);px(g,x+1,y-up+2,'#000',1,1);if(up>3){px(g,x-6,y-up-2,c,2,4);px(g,x+4,y-up-2,c,2,4)}g.globalAlpha=1}},
    click(e,R){R.wave=M.now;M.snd('tada',1.2);M.say(R,M.view(R)[0]*-1+128,20,'THE CROWD GOES WILD',1)}});
   // trophy pillar
   M.ent(R,{name:'TROPHY OF CHAMPIONS',x:150,y:FL-60,w:24,h:60,box:1,z:FL,rs:-9,
    draw(g,X,Y,t,e,sel){g.fillStyle=ST[2];g.fillRect(X+4,Y+36,16,24);g.fillStyle=ST[4];g.fillRect(X+2,Y+34,20,3);const a=M.now-e.rs,up=a<3?Math.round(Math.sin(Math.min(1,a*2)*Math.PI/2)*16*(a>2.5?(3-a)*2:1)):0;
     if(up){for(let y=0;y<Y+34;y+=1)if(bay(X,y)<.3)px(g,X+8+((y*3)%8),y,'#ffe08a');glowAt(g,X+12,Y+20-up,22,'#ffd040',.5)}const yy=Y+14-up;g.fillStyle=PAL.gold[3];g.fillRect(X+5,yy,14,10);g.fillStyle=PAL.gold[4];g.fillRect(X+6,yy+1,3,7);g.fillStyle=PAL.gold[2];g.fillRect(X+10,yy+10,4,6);g.fillRect(X+7,yy+16,10,3);px(g,X+2,yy+2,PAL.gold[2],3,5);px(g,X+19,yy+2,PAL.gold[2],3,5);if(sel)sel1(g,X,Y,24)},
    click(e,R){e.rs=M.now;M.snd('power',1.2);setTimeout(()=>{M.snd('tada',1);M.emit(R,'star',e.x+12,e.y,16,{c:['#ffe08a','#ffffff']})},400);M.say(R,e.x+12,e.y-24,'CHAMPION!',1.2)}});
   // glove totem: punch shockwave
   M.ent(R,{name:'GLOVE TOTEM',x:290,y:FL-50,w:30,h:50,box:1,z:FL,pu:-9,
    draw(g,X,Y,t,e,sel){g.fillStyle=PAL.wood[2];g.fillRect(X+10,Y+20,10,30);for(let k=0;k<3;k++)g.drawImage(K.gly(k+60,PAL.wood[4]),X+12,Y+24+k*8);const a=M.now-e.pu,dx=a<.5?Math.round(Math.sin(a/.5*Math.PI)*24):0;
     const gx=X+14+dx,gy=Y+6;g.drawImage(M.EMB?glove():null,gx-6,gy-6);if(a<.8&&a>.2){const r=(a-.2)*80;for(let i=0;i<40;i++){const an=i/40*TAU;px(g,gx+10+Math.cos(an)*r*.4,gy+Math.sin(an)*r,'#ffffff')}}if(sel)sel1(g,X,Y,30)},
    click(e,R){e.pu=M.now;M.snd('whoosh',1.4);setTimeout(()=>{M.snd('thud',.8);M.shake(R,.3,2);M.say(R,e.x+40,e.y-6,'K.O.!',.8)},250)}});
   let GL=null;function glove(){return GL||(GL=M.mk(14,14,p=>M.EMB.glove(p,7,6),'#3a0408').c)}
   // score stone
   M.ent(R,{name:'SCORE STONE',x:600,y:FL-40,w:40,h:40,box:1,z:FL,sc:[0,0],ht:-9,
    draw(g,X,Y,t,e,sel){g.fillStyle=ST[1];g.fillRect(X,Y,40,40);g.fillStyle=ST[3];g.fillRect(X+2,Y+2,36,36);g.fillStyle=ST[2];g.fillRect(X+2,Y+20,36,1);
     const a=M.now-e.ht;g.drawImage(M.txt(String(e.sc[0]),'#d83a3a','#1a0a0a').c,X+6,Y+8-(a<.3&&e.lst===0?2:0));g.drawImage(M.txt(String(e.sc[1]),'#3a7ad8','#1a0a0a').c,X+24,Y+8-(a<.3&&e.lst===1?2:0));
     px(g,X+18,Y+10,'#1a0a0a',3,1);g.drawImage(M.txt('VS',ST[1],false).c,X+14,Y+26);if(a<.4){const k=a/.4;M.line(g,X+20,Y,X+20+Math.sin(a*30)*6,Y+40*k,ST[0])}if(sel)sel1(g,X,Y,40)},
    click(e,R){e.lst=Math.random()<.5?0:1;e.sc[e.lst]=(e.sc[e.lst]+1)%100;e.ht=M.now;M.snd('crack',1.4);M.snd('ding',1.2);M.emit(R,'dust',e.x+20,e.y,8)}});
   // arena gong
   M.ent(R,{name:'BRONZE GONG',x:760,y:FL-56,w:36,h:56,box:1,z:FL,hit:-9,
    draw(g,X,Y,t,e,sel){g.fillStyle=PAL.wood[2];g.fillRect(X+2,Y,3,56);g.fillRect(X+31,Y,3,56);g.fillRect(X,Y,36,3);const a=M.now-e.hit,w=a<2?Math.sin(a*30)*(2-a):0;const cx=X+18+w,cy=Y+24;
     for(let y=-12;y<=12;y++)for(let x=-12;x<=12;x++){const d=Math.hypot(x,y);if(d>12)continue;px(g,cx+x,cy+y,d>11?PAL.gold[1]:d<3?PAL.gold[4]:(x+y<0?PAL.gold[3]:PAL.gold[2]))}if(a<1.5){M.ringFull?0:0;for(let i=0;i<48;i++){const an=i/48*TAU,r=14+a*30;if(bay(i,0)<1-a/1.5)px(g,cx+Math.cos(an)*r,cy+Math.sin(an)*r,'#ffe08a')}}if(sel)sel1(g,X,Y,36)},
    click(e,R){e.hit=M.now;M.snd('gong',1);M.shake(R,.4,1)}});
   // bouncing mascot balls
   [['#d83a3a',200],['#3a7ad8',680],['#e0b030',520]].forEach(([c,x],i)=>{const sp=M.mk(14,14,p=>p.ell(7,7,6,6,ramp(c),{b:.15,spec:'#ffffff'}),'#140c1c');
    M.ent(R,{spr:sp,name:['RED','BLUE','GOLD'][i]+' FIGHTER BALL',x,y:FL-14,vx:(i%2?-1:1)*30,vy:0,
     upd(e,dt){if(RM)return;e.vy+=200*dt;e.x+=e.vx*dt;e.y+=e.vy*dt;if(e.y>FL+10){e.y=FL+10;e.vy=-Math.abs(e.vy)*.6;if(Math.abs(e.vy)<30)e.vy=-90}if(e.x<30||e.x>W-44)e.vx*=-1;e.z=e.y+14},
     click(e,R){e.vy=-220;e.vx*=1.4;M.snd('boing',1+i*.2);M.emit(R,'star',e.x+7,e.y+7,6,{c:[c,'#ffffff']})}})});
   K.portalSign(R,850,FL,'WATCH THE FIGHTS','https://www.youtube.com/@Langrino',['#ffd040','#fff4c0'],'WATCH LANGRINO')}
 })}

/* ======================= COOPER SKY CITY ======================= */
{const W=960,FL=170,SK=['#1a2a6a','#2a4a9a','#4a7ac8','#8ab0e8','#c8e0ff'],IS=['#1a2a1a','#2a4a2a','#3a7a3a','#6ab04a','#a8e070'];
 K.ext('city',{top:'#1a2a6a',bot:'#1a2a6a',start:480,
  bg(p,R){for(let y=0;y<M.RH;y++)for(let x=0;x<W;x++)p.px(x,y,rp(SK,.95-y/M.RH*.8+(fbm(x/60,y/20)-.5)*.1,x,y));
   // clouds
   for(let i=0;i<14;i++){const cx=H(i,1)*W,cy=40+H(i,2)*90,r=10+H(i,3)*18;p.ell(cx,cy,r*2,r*.7,['#8ab0e8','#c8e0ff','#ffffff'],{b:.3})}
   // floating islands with towers
   for(const[ix,iy,iw]of[[120,70,70],[330,110,50],[620,60,80],[850,100,60]]){p.poly([[ix-iw/2,iy],[ix+iw/2,iy],[ix+iw/4,iy+iw*.5],[ix,iy+iw*.7],[ix-iw/4,iy+iw*.45]],['#2a1a10','#4a3020','#6a4a30','#8a6a40'],{v:.5,bv:.3});p.rect(ix-iw/2,iy-3,iw,4,IS,{v:.6});
    for(let k=0;k<3;k++){const bx=ix-iw/3+k*iw/4,bh=10+H(ix,k)*22;p.rect(bx,iy-3-bh,8,bh,['#4a4a6a','#8a8aaa','#c8c8e0','#ffffff'],{v:.55,bv:.3});p.poly([[bx-1,iy-3-bh],[bx+9,iy-3-bh],[bx+4,iy-9-bh]],['#6a1a1a','#a83a2a','#e05a3a'],{v:.6});for(let y=iy-bh;y<iy-5;y+=4)p.px(bx+3,y,'#ffe08a')}}
   // plaza: marble colonnade + balustrade
   const MB=['#4a4a6a','#7a7a9a','#a8a8c8','#d0d0e8','#ffffff'];for(let x=0;x<W;x++){for(let y=FL-14;y<FL;y++){const b=(x%10<2)||y<FL-12||y>FL-3;if(b)p.px(x,y,rp(MB,y<FL-12?.8:.5,x,y))}}
   for(const cx of[40,330,630,920])K.pillar(p,cx,FL-90,FL,12,MB,{cap:7,base:6,rune:'#e0a838',sd:cx});
   K.floor(p,FL,M.RH,['#4a4a6a','#7a7a9a','#a8a8c8','#d0d0e8','#ffffff'],{v:.35,tw:26})},
  init(R){R.night=0;
   K.planet(R,{paint:'crest',w:84,h:67,x:480,y:84,name:'COOPER CITY CREST',z:-10,e:{sp:-9,pre(g,X,Y,t,e){glowAt(g,X+42,Y+34,50,'#ffe08a',.2)},
    click(e,R){M.snd('tada',1);for(let i=0;i<4;i++)setTimeout(()=>{const x=380+Math.random()*200,y=20+Math.random()*40;M.snd('pop',.6+Math.random()*.4);M.emit(R,'star',x,y,18,{c:[K.pick(['#ff5a5a','#ffe08a','#5ac8ff','#a0ff7a']),'#ffffff']})},i*250);M.say(R,480,46,'LONG LIVE COOPER CITY!',1.4)}}});
   // clocktower: toggles day / night
   M.ent(R,{name:'CLOCKTOWER OF AGES',x:200,y:FL-90,w:30,h:90,box:1,z:FL,
    draw(g,X,Y,t,e,sel){g.fillStyle='#8a8aaa';g.fillRect(X+4,Y+20,22,70);g.fillStyle='#c8c8e0';g.fillRect(X+4,Y+20,4,70);g.fillStyle='#a83a2a';for(let y=0;y<16;y++)g.fillRect(X+15-y*.95,Y+4+y,y*1.9+1,1);
     const cx=X+15,cy=Y+32;for(let y=-8;y<=8;y++)for(let x=-8;x<=8;x++){const d=Math.hypot(x,y);if(d<=8)px(g,cx+x,cy+y,d>7?'#3a3a5a':'#fff4d8')}const hr=t*.1,mn=t*1.2;M.line(g,cx,cy,cx+Math.cos(hr)*4,cy+Math.sin(hr)*4,'#1a1a2a');M.line(g,cx,cy,cx+Math.cos(mn)*6,cy+Math.sin(mn)*6,'#a83a2a');
     if(R.night){for(let y=Y+48;y<Y+84;y+=8)px(g,X+12,y,'#ffe08a',6,3)}if(sel)sel1(g,X,Y,30)},
    click(e,R){R.night=R.night?0:1;R.nt=M.now;M.snd('bell',R.night?.7:1.2);M.say(R,e.x+15,e.y-6,R.night?'NIGHT FALLS ON COOPER CITY':'GOOD MORNING, CITIZENS!',1.4)}});
   // sky train
   M.ent(R,{name:'SKY TRAIN',x:0,y:40,w:60,h:10,box:1,z:-8,noNav:1,bs:-9,px:0,
    draw(g,X,Y,t,e,sel){for(let k=0;k<4;k++){const x=X+k*15;g.fillStyle=k===0?'#e05a3a':'#e8e8f0';g.fillRect(x,Y,13,8);g.fillStyle='#3a5a8a';g.fillRect(x+2,Y+2,9,3);if(R.night){g.fillStyle='#ffe08a';g.fillRect(x+2,Y+2,9,3)}}glowAt(g,X+60,Y+4,6,'#ffe08a',.5);if(sel)sel1(g,X,Y,60)},
    upd(e,dt){e.px+=dt*(M.now-e.bs<2?160:40)*(RM?0:1);e.x=Math.round((e.px%(W+200))-100)},
    click(e,R){e.bs=M.now;M.snd('honk',1);M.say(R,e.x+30,e.y-6,'CHOO CHOO! NEXT STOP: THE CLOUDS',1.2)}});
   // hot air balloon
   M.ent(R,{name:'HOT AIR BALLOON',x:720,y:60,w:24,h:36,box:1,z:-6,noNav:1,bn:-9,by:60,
    draw(g,X,Y,t,e,sel){for(let y=0;y<22;y++){const w=Math.round(Math.sqrt(Math.max(0,1-Math.pow((y-10)/12,2)))*12);for(let x=-w;x<w;x++)px(g,X+12+x,Y+y,((x+12)>>2)%2?'#e05a3a':'#ffe08a')}M.line(g,X+4,Y+20,X+9,Y+30,'#5a3a20');M.line(g,X+20,Y+20,X+15,Y+30,'#5a3a20');g.fillStyle=PAL.wood[3];g.fillRect(X+8,Y+30,8,6);
     if(M.now-e.bn<1.5)K.flame(g,X+12,Y+29,2,7,t,undefined,0);if(sel)sel1(g,X,Y,24)},
    upd(e,dt,t){const b=M.now-e.bn<1.5;e.by=b?Math.max(20,e.by-dt*20):Math.min(70,e.by+dt*3);e.y=Math.round(e.by+Math.sin((RM?0:t)*.8)*3)},
    click(e,R){e.bn=M.now;M.snd('whoosh',.6);M.say(R,e.x+12,e.y-6,'UP UP AND AWAY',.9)}});
   // fountain
   M.ent(R,{name:'CRYSTAL FOUNTAIN',x:620,y:FL-24,w:44,h:24,box:1,z:FL,gy:-9,
    draw(g,X,Y,t,e,sel){g.fillStyle='#a8a8c8';g.fillRect(X,Y+12,44,12);g.fillStyle='#d0d0e8';g.fillRect(X,Y+12,44,2);g.fillStyle='#3a7ac8';g.fillRect(X+3,Y+14,38,4);g.fillStyle='#a8a8c8';g.fillRect(X+19,Y+2,6,12);
     const big=M.now-e.gy<2.5,hh=big?60:12;for(let i=0;i<24;i++){const u=((t*1.5+i/24)%1),side=i%2?1:-1;const x=X+22+side*u*(big?16:10),y=Y+2-Math.sin(u*Math.PI)*hh*(1-u*.2)+u*10;px(g,x,y,i%3?'#8ad0ff':'#ffffff')}if(big)glowAt(g,X+22,Y-30,14,'#8ad0ff',.3);if(sel)sel1(g,X,Y,44)},
    click(e,R){e.gy=M.now;M.snd('bubble',1.2);M.say(R,e.x+22,e.y-66,'GEYSER MODE!',1);M.emit(R,'water',e.x+22,e.y,16)}});
   // citizen birds
   for(let i=0;i<3;i++)M.ent(R,{name:'SKY GULL',x:200+i*250,y:30,w:8,h:4,box:1,z:-4,noNav:1,sq:-9,bx:200+i*250,
    draw(g,X,Y,t,e,sel){const f=((t*6+i)|0)%2;px(g,X,Y+(f?0:2),'#ffffff',3,1);px(g,X+4,Y+(f?0:2),'#ffffff',3,1);px(g,X+3,Y+2,'#ffffff',1,1);if(sel)sel1(g,X,Y,8)},
    upd(e,dt,t){const tt=RM?0:t;e.x=Math.round(e.bx+Math.sin(tt*.3+i)*120);e.y=Math.round(30+i*14+Math.sin(tt+i)*6)},
    click(e,R){e.sq=M.now;M.snd('yip',1.6);M.emit(R,'leaf',e.x+4,e.y,4,{c:['#ffffff']});M.say(R,e.x+4,e.y-6,'SQUAWK!',.6)}});
   K.portalSign(R,880,FL,'VISIT COOPER CITY','https://coopercitywebsites.github.io/main/',['#6ab0ff','#e0f0ff'],'OPEN COOPER CITY WEBSITES')},
  front(R,g,ox,oy,t){const k=R.night?Math.min(1,(M.now-(R.nt||0))*1.5):Math.max(0,1-(M.now-(R.nt||-9))*1.5);if(k<=0)return;g.globalAlpha=.55*k;g.fillStyle='#0a0a3a';g.fillRect(0,0,M.BW,M.BH);g.globalAlpha=1;
   if(k>.5)for(let i=0;i<40;i++){const x=Math.round(H(i,1)*M.BW),y=Math.round(H(i,2)*60);if(((t*2+i)|0)%5)px(g,x,y,'#ffffff')}}
 })}
})();
