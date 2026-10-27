/* Clutter for the lobby + corridors: props between doors, lobby paintings, a patrolling floor robot. */
(()=>{'use strict';const{rp,ramp,bay,H,RM,TAU}=M;
const W=2240,L0=840,L1=1400,CX=1120,FLOOR=198,DS=78;const OUT='#140c1c';
const doorX=(wing,i)=>wing==='W'?L0-70-i*DS:L1+22+i*DS;
const GOLD=['#3a2008','#6a4210','#a87020','#e0a838','#ffe08a'],MARB=['#2a2436','#5a5262','#8a828e','#b8b0b4','#e0d8d4','#fffaf2'],WOOD=['#1a0e10','#3a1e16','#5e3420','#86502c','#ae7040','#d0965a'];
const P={
 bust:p=>{p.rect(4,22,16,18,MARB,{v:.55,bv:.25,tex:(x,y)=>(H(x,y)-.5)*.1});p.rect(2,20,20,3,MARB,{v:.7});p.rect(2,39,20,3,MARB,{v:.5});p.ell(12,14,7,6,MARB,{b:.15});p.ell(12,7,5,5.5,MARB,{b:.15});p.px(10,7,MARB[1]);p.px(14,7,MARB[1]);p.rect(11,10,3,1,MARB[2]);p.ell(12,3,5,2.5,MARB,{b:.25})},
 vase:p=>{p.rect(6,26,12,16,WOOD,{v:.5,bv:.25});p.rect(4,24,16,3,WOOD,{v:.7});p.ell(12,16,7,8,['#0e1a4a','#1e3a8a','#3a6ad0','#8ab0ff','#ffffff'],{b:.2,tex:(x,y)=>(y===14||y===19)?.5:0});p.rect(9,5,6,5,['#1e3a8a','#3a6ad0','#8ab0ff'],{v:.6});p.rect(7,4,10,2,['#1e3a8a','#8ab0ff'],{v:.6})},
 case:p=>{p.rect(2,24,22,18,WOOD,{v:.5,bv:.25,tex:(x,y)=>((x-2)%7===0?-.2:0)});p.rect(1,22,24,3,GOLD,{v:.6});p.rect(3,4,20,18,['#2a3a4a','#4a6a7a','#8ab0c0','#d0f0ff'],{v:.35,g:.3,bv:.3,tex:(x,y)=>((x-y)%11===0?.5:0)});p.rect(2,3,22,2,GOLD,{v:.6});p.ell(13,15,4,5,['#4a0a3a','#a02a8a','#ff6ad8','#ffd0f4'],{b:.3})},
 cactus:p=>{const G=['#0e2a16','#1e4a24','#3a7a34','#5aa848','#8ad06a'];p.rrect(8,4,8,26,4,G,{v:.55,tex:(x,y)=>((x-8)%3===1?-.15:0)});p.rrect(2,12,6,10,3,G,{v:.5});p.rrect(16,8,6,12,3,G,{v:.6});p.px(12,3,'#ff6a9a');p.px(11,2,'#ff9ac0');p.rrect(5,28,14,12,2,['#3a1a14','#7a3424','#b85a34','#d8844a'],{v:.55});p.rect(4,27,16,3,['#7a3424','#b85a34','#d8844a'],{v:.7})},
 armor:p=>{const S=['#1a1e2a','#3a4458','#6a7890','#a0aec0','#dce6f0','#ffffff'];p.rrect(7,1,10,11,3,S,{v:.6});p.rect(8,6,8,1,OUT);p.rrect(5,12,14,14,3,S,{v:.55});p.rect(2,13,3,12,S,{v:.5});p.rect(19,13,3,12,S,{v:.65});p.rect(7,26,4,13,S,{v:.5});p.rect(13,26,4,13,S,{v:.6});p.line(21,0,21,40,'#6a4a2a');p.poly([[19,0],[23,0],[21,-6]],S,{v:.7});p.px(12,0,'#d83a3a');p.px(12,-1,'#ff6a5a')},
 crates:p=>{const C=['#3a2410','#6a4220','#9a6a34','#c8944a','#e8b870'];for(const[x,y,w,h]of[[1,22,22,20],[4,6,16,16]]){p.rect(x,y,w,h,C,{v:.55,bv:.25,tex:(X,Y)=>((Y-y)%5===0?-.2:0)});p.line(x+1,y+1,x+w-2,y+h-2,C[1])}p.rect(3,29,18,6,'#e8e0d0');M.ftext(p,'OOPS',4,29,'#c82a2a')},
 cooler:p=>{p.rect(4,18,16,24,['#a8a8b0','#d0d0d8','#f0f0f4'],{v:.6,bv:.25});p.rect(6,22,4,3,'#2a6ad0');p.rect(14,22,4,3,'#d83a3a');p.rrect(5,0,14,18,4,['#2a5a9a','#4a8ad0','#8ac8ff','#d0f0ff'],{v:.55,g:.3,bv:.3});p.rect(8,4,2,10,'#d0f0ff')},
 sign:p=>{const Y=['#6a5008','#c89a10','#ffd030','#fff08a'];p.poly([[3,40],[10,2],[14,2],[21,40]],Y,{v:.6,bv:.25});p.poly([[9,14],[15,14],[12,8]],['#140c1c']);p.rect(11,18,3,9,OUT);p.rect(11,29,3,3,OUT);p.rect(6,36,12,1,'#a88a10')},
 bucket:p=>{p.rect(4,26,16,14,['#2a3a6a','#3a5aa0','#5a8ad0','#8ab8f0'],{v:.55,bv:.25});p.rect(3,25,18,2,['#5a8ad0','#8ab8f0']);p.rect(5,26,14,2,['#4a8ab0','#8ad0f0']);p.line(16,0,13,26,'#a07a4a');p.line(17,0,14,26,'#c89a6a');p.rect(9,38,2,2,OUT);p.rect(16,38,2,2,OUT);
  for(let i=0;i<6;i++)p.rect(9+i,20+(i%2)*2,1,6,'#e8e0c8')},
 umbrellas:p=>{p.rect(5,24,14,18,['#2a2a34','#4a4a5a','#6a6a7a','#9a9aa8'],{v:.55,bv:.25});p.rect(4,23,16,2,['#6a6a7a','#9a9aa8']);for(const[x,c]of[[8,'#d83a3a'],[12,'#3a8ad0'],[16,'#ffd030']]){p.line(x,23,x-1,6,c);p.rect(x-3,4,4,3,ramp(c,4),{v:.6});p.px(x+1,4,'#6a4a2a');p.px(x+2,5,'#6a4a2a')}},
 bench:p=>{p.rect(0,22,26,4,WOOD,{v:.6,bv:.25});p.rect(0,14,26,3,WOOD,{v:.5});p.rect(2,17,2,5,WOOD,{v:.4});p.rect(22,17,2,5,WOOD,{v:.4});p.rect(2,26,3,14,['#140c1c','#3a3448'],{v:.5});p.rect(21,26,3,14,['#140c1c','#3a3448'],{v:.5});p.rect(10,19,6,3,['#d8d0c0','#fff8e8'],{v:.6})},
 donate:p=>{p.rect(3,26,18,16,WOOD,{v:.55,bv:.25});p.rect(4,6,16,20,['#3a4a5a','#6a8aa0','#a8d0e0','#e8f8ff'],{v:.35,g:.3,bv:.3});for(let i=0;i<14;i++)p.px(6+(i*5)%12,24-Math.floor(i/4)*2-(i%2),i%3?'#ffd030':'#5ac06a');p.rect(9,5,6,1,OUT);p.rect(5,30,14,6,'#e8e0d0');M.ftext(p,'TIPS',5,29,'#3a2008')},
 rack:p=>{p.rect(11,6,2,34,['#3a3a44','#8a8a94']);p.rect(5,39,14,3,['#3a3a44','#6a6a74']);const C=[['#ff6a5a','#ffd0a0'],['#4aa8ff','#c8f0ff'],['#5ad06a','#e0ffc0'],['#ffd030','#fff4c0'],['#c06aff','#f0d0ff'],['#ff8ab8','#ffe0f0']];
  for(let r=0;r<3;r++)for(let c=0;c<2;c++){const k=r*2+c,x=c?14:3,y=8+r*10;p.rect(x,y,8,8,['#e8e0d0','#ffffff'],{v:.6});p.rect(x+1,y+1,6,5,C[k],{v:.4,g:.6,bv:0})}},
 coat:p=>{p.rect(11,4,2,36,WOOD,{v:.6});p.rect(6,39,12,3,WOOD,{v:.5});p.line(12,6,5,2,WOOD[3]);p.line(12,6,19,2,WOOD[3]);p.rrect(1,4,8,16,2,['#4a1a2a','#7a2a3a','#a84a5a'],{v:.5});p.ell(18,4,4,2,['#1a1a22','#3a3a44','#5a5a64'],{b:.2});p.rect(15,4,7,1,'#1a1a22');p.rect(17,8,3,12,['#c8a040','#ffd870'],{v:.5})}
};
const PROPS={bust:['MARBLE BUST','clang',['HMPH.','I AM VERY OLD','NO TOUCHING'],'dust'],vase:['ANCIENT VASE','ding',['*WOBBLE*','CAREFUL!'],'star'],case:['GEM CASE','chime',['SHINY!','PRICELESS(ISH)'],'spark'],cactus:['PRICKLY PETE','squish',['OUCH!','HUGS? NO.'],'leaf'],
 armor:['SUIT OF ARMOR','clang',['*RATTLE*','WHO GOES THERE','IT IS EMPTY... OR IS IT'],'spark'],crates:['FRAGILE CRATES','thud',['OOPS','DO NOT STACK','...SORRY'],'dust'],cooler:['WATER COOLER','bubble',['GLUG GLUG','STAY HYDRATED'],'bubble'],
 sign:['WET FLOOR SIGN','boing',['WHOOPS!','SLIPPERY!'],'bubble'],bucket:['MOP BUCKET','splash',['SPLOSH','MOPPED IT MYSELF'],'bubble'],umbrellas:['UMBRELLA STAND','swish',['IT IS NOT RAINING','SPARE?'],'leaf'],
 bench:['BENCH','creak',['*SIT*','AHH, A REST'],'dust'],donate:['TIP JAR','coin',['THANK YOU!','+1 PIXEL'],'gold'],rack:['POSTCARD RACK','swish',['WISH YOU WERE HERE','ONE FOR GRANDMA'],'confetti'],coat:['COAT RACK','thud',['NICE HAT','WHOSE SCARF?'],'dust']};
const SP={};const spr=k=>SP[k]||(SP[k]=M.mk(26,42,P[k]));
function prop(R,k,x,y,z){const[name,snd,lines,fx]=PROPS[k];return M.ent(R,{name,x:Math.round(x-13),y:Math.round(y-42),fr:[spr(k)],z:z??y,react:k==='armor'||k==='vase'?'shake':'jiggle',
 click(e,R){M.react(R,e);M.snd(snd,.9+Math.random()*.2);M.say(R,e.x+13,e.y-2,lines[(Math.random()*lines.length)|0]);M.emit(R,fx,e.x+13,e.y+12,k==='donate'?6:8)}})}
// lobby paintings (original): cat in a ruff, volcano landscape, primary squares, a pear
function painting(k,w,h){return M.mk(w,h,p=>{p.rect(0,0,w,h,GOLD,{v:.6,bv:.35,tex:(x,y)=>((x+y)%4===0?.15:0)});p.rect(3,3,w-6,h-6,OUT);const x0=4,y0=4,iw=w-8,ih=h-8;
 if(k===0){for(let y=0;y<ih;y++)for(let x=0;x<iw;x++)p.px(x0+x,y0+y,rp(['#1a1410','#2a2018','#4a3826','#6a5034'],.3+(1-Math.hypot(x-iw/2,y-ih*.4)/iw)*.6,x,y));const cx=x0+iw/2;
  p.ell(cx,y0+ih-8,13,9,['#1a1a2a','#2a2a4a','#4a3a7a','#6a5aa0'],{b:.1});p.ell(cx,y0+ih-17,10,3,['#c8c0b0','#f4ecdc','#ffffff'],{b:.2,tex:(x,y)=>(x%2?-.2:0)});const F=['#3a1a08','#8a4a10','#d08a30','#f0b860','#ffe0a0'];p.ell(cx,y0+ih-26,8,7,F,{b:.15});
  p.poly([[cx-8,y0+ih-29],[cx-6,y0+ih-38],[cx-2,y0+ih-32]],F,{v:.5});p.poly([[cx+8,y0+ih-29],[cx+6,y0+ih-38],[cx+2,y0+ih-32]],F,{v:.5});p.px(cx-3,y0+ih-27,'#3ae06a');p.px(cx+3,y0+ih-27,'#3ae06a');p.px(cx,y0+ih-24,'#ff8aa0')}
 else if(k===1){for(let y=0;y<ih;y++)for(let x=0;x<iw;x++){const sky=y<ih*.55;p.px(x0+x,y0+y,sky?rp(['#2a1a4a','#7a2a5a','#e0604a','#ffb060'],y/(ih*.55),x,y):rp(['#0e2a1a','#1e4a2a','#3a7a3a'],.3+(y-ih*.55)/ih,x,y))}
  p.poly([[x0+4,y0+ih*.62],[x0+iw/2-3,y0+8],[x0+iw/2+3,y0+8],[x0+iw-4,y0+ih*.62]],['#1a1418','#3a2a2e','#5a4448','#7a6060'],{v:.5});p.rect(x0+iw/2-3,y0+7,6,2,['#ff4a1a','#ffd040']);for(let i=0;i<5;i++)p.px(x0+iw/2-2+i,y0+9+i*2+(i%2),'#ff6a1a')}
 else if(k===2){const C=['#f4ecdc','#d8283a','#2a4ab8','#ffd030','#f4ecdc','#f4ecdc'];p.rect(x0,y0,iw,ih,'#f4ecdc');const xs=[0,Math.round(iw*.38),Math.round(iw*.7),iw],ys=[0,Math.round(ih*.45),Math.round(ih*.8),ih];
  for(let a=0;a<3;a++)for(let b=0;b<3;b++){const c=C[(a*2+b*3)%6];p.rect(x0+xs[a],y0+ys[b],xs[a+1]-xs[a],ys[b+1]-ys[b],ramp(c,4),{v:.6,bv:0,g:.1})}for(const x of xs.slice(1,3))p.rect(x0+x,y0,2,ih,OUT);for(const y of ys.slice(1,3))p.rect(x0,y0+y,iw,2,OUT)}
 else{for(let y=0;y<ih;y++)for(let x=0;x<iw;x++)p.px(x0+x,y0+y,rp(['#2a3a2a','#4a5a3a','#6a7a4a'],.3+y/ih*.4+(bay(x,y)-.5)*.2,x,y));const cx=x0+iw/2,cy=y0+ih*.6;p.ell(cx,cy,8,9,['#3a4a08','#6a8a10','#a8c830','#d8f060','#f8ffb0'],{b:.2});p.ell(cx,cy-9,5,6,['#3a4a08','#6a8a10','#a8c830','#d8f060'],{b:.2});p.line(cx,cy-15,cx+1,cy-19,'#5a3a1a');p.ell(cx+4,cy-17,3,1.5,['#2a5a1a','#4a9a2a'],{})}
 },OUT)}
const def=M.defs.hall;def.init=(orig=>R=>{orig(R);
 // corridor props in the gaps between doors, alternating sets per wing
 const SETW=['bust','cactus','armor','vase','umbrellas','case','bucket','bust','crates','cooler'],SETE=['case','sign','vase','armor','cooler','cactus','crates','bust','umbrellas','bucket'];
 for(let i=0;i<10;i++){prop(R,SETW[i],doorX('W',i)-15,FLOOR+12,FLOOR+12);prop(R,SETE[i],doorX('E',i)+48+15,FLOOR+12,FLOOR+12)}
 // bench + extras at corridor ends
 prop(R,'bench',doorX('W',9)-48,FLOOR+14);prop(R,'sign',doorX('E',9)+100,FLOOR+14);
 // lobby clutter
 prop(R,'coat',CX-140,FLOOR+20);prop(R,'rack',CX+138,FLOOR+20);prop(R,'donate',CX+102,FLOOR+18);prop(R,'bench',L0+130,FLOOR+56);prop(R,'bench',L1-130,FLOOR+56);prop(R,'sign',CX+50,FLOOR+62);
 // lobby paintings
 [[L0+105,0,40,50,'CAT IN A RUFF',['MRRP.','PORTRAIT OF LORD WHISKERS']],[L1-105,1,40,50,'VOLCANO AT DUSK',['RUMBLE...','TOASTY']],[L0+186,2,32,40,'SQUARES NO.4',['VERY MODERN','IS IT UPSIDE DOWN?']],[L1-186,3,32,40,'A PEAR',['JUST A PEAR.','DEEPLY MOVING']]].forEach(([x,k,w,h,name,lines])=>{const s=painting(k,w,h);
  M.ent(R,{name,x:x-w/2,y:k<2?50:56,fr:[s],z:5,react:'shake',click(e,R){M.react(R,e);M.snd(k===1?'rumble':k===0?'meow':'chime');M.say(R,e.x+w/2,e.y-2,lines[(Math.random()*2)|0]);M.emit(R,k===1?'fire':k===2?'confetti':'star',e.x+w/2,e.y+h/2,8)}})});
 // a little floor-cleaning robot that patrols the whole hall
 const BOT=M.frames(2,18,10,(p,f)=>{p.ell(9,6,8.5,4,['#2a2a34','#5a5a6a','#9a9aaa','#d0d0dc'],{b:.2});p.rect(3,6,12,2,'#3a3a44');p.px(9,3,f?'#7aff8a':'#2a8a3a');p.px(10,3,'#ffffff');p.rect(1,8,3,1,f?'#c8c8d0':'#8a8a94');p.rect(14,8,3,1,f?'#8a8a94':'#c8c8d0')});
 M.ent(R,{name:'ROOMBOT',x:CX+200,y:FLOOR+60,fr:BOT,vx:22,z:FLOOR+70,react:'hop',hop:4,upd(e,dt,t){if(RM)return;if(e.spin>M.now){e.flip=Math.floor(M.now*12)%2;return}e.x+=e.vx*dt;e.flip=e.vx<0;e.f=Math.floor(t*4)%2;if(e.x<40||e.x>W-60)e.vx*=-1;if(Math.random()<dt*.05)e.vx*=-1;if(Math.random()<dt*.6)M.emit(R,'dust',e.x+(e.vx>0?0:18),e.y+8,1,{c:['#8a8090']})},
  click(e,R){M.react(R,e);e.spin=M.now+1;M.snd('beep',1.4);M.say(R,e.x+9,e.y-4,['BEEP! CLEANING','YOU STEPPED ON MY FLOOR','BZZT'][(Math.random()*3)|0])}});
})(def.init);
})();
