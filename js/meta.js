/* Room registry: names, wings and door designs. Room contents live in rooms-*.js. */
(()=>{'use strict';const{ramp,TAU}=M;
const R=(id,name,short,wing,door,w)=>M.def(id,{name,short,wing,door,w:w||900,backTo:'hall',top:'#07040c',bot:'#07040c'});
const G=['#3a2008','#6a4210','#a87020','#e0a838','#ffe08a'];
const em={
 glove(p,x,y){p.ell(x+1,y,6,5.5,ramp('#d8283a'),{b:.15,spec:'#ffffff'});p.ell(x-4,y+1,3,3.5,ramp('#d8283a'),{b:.05});p.rect(x-3,y+5,8,4,ramp('#f4f0e8'),{v:.6});p.px(x-2,y+6,'#a8a0a0')},
 mech(p,x,y){const S=ramp('#7a8aa8',6);p.rrect(x-6,y-5,12,11,2,S,{v:.55});p.rect(x-5,y-2,10,3,['#3a1a08','#ff7a1a','#ffd060'],{v:.6});p.rect(x-7,y-1,2,5,S,{v:.4});p.rect(x+5,y-1,2,5,S,{v:.6});p.line(x+3,y-5,x+5,y-8,'#d0dcea');p.px(x+5,y-9,'#ff4a3a');p.rect(x-3,y+3,6,1,'#2a3242')},
 sword(p,x,y){p.line(x-6,y+6,x+5,y-5,'#e8f4ff');p.line(x-5,y+6,x+6,y-5,'#a8b8d0');p.line(x-6,y+5,x+5,y-6,'#ffffff');p.line(x-7,y+3,x-3,y+7,G[3]);p.line(x-8,y+8,x-6,y+6,'#6a3a20');p.px(x-5,y+5,'#7af0ff')},
 dog(p,x,y){const B=ramp('#c8884a');p.ell(x,y+1,6,5.5,B,{b:.15});p.ell(x-5,y+1,2.5,4.5,ramp('#7a4a2a'),{});p.ell(x+5,y+1,2.5,4.5,ramp('#7a4a2a'),{});p.ell(x,y+4,3,2,ramp('#f0d8b0'),{b:.2});p.rect(x-1,y+2,2,2,'#140c1c');p.px(x-3,y,'#140c1c');p.px(x+2,y,'#140c1c');p.px(x,y+6,'#e85a6a')},
 rocket(p,x,y){p.poly([[x-3,y+5],[x-3,y-2],[x,y-8],[x+3,y-2],[x+3,y+5]],ramp('#e8e8f0'),{v:.6});p.poly([[x-3,y+1],[x-6,y+6],[x-3,y+5]],ramp('#d83a3a'),{});p.poly([[x+3,y+1],[x+6,y+6],[x+3,y+5]],ramp('#d83a3a'),{});p.ell(x,y-1,1.6,1.6,ramp('#4ab0ff'),{b:.3});p.px(x,y+6,'#ffd040');p.px(x-1,y+7,'#ff7a20');p.px(x+1,y+7,'#ff7a20');p.px(x,y+8,'#ff7a20')},
 fish(p,x,y){p.ell(x,y,5.5,3.5,ramp('#ff8a2a'),{b:.15});p.poly([[x+4,y],[x+8,y-4],[x+8,y+4]],ramp('#ff6a1a'),{});p.px(x-3,y-1,'#140c1c');p.rect(x-1,y-3,1,7,'#ffffff');p.px(x-5,y-6,'#c8f6ff');p.px(x-6,y-8,'#c8f6ff')},
 dino(p,x,y){const D=ramp('#4ac04a');p.rrect(x-6,y-6,11,8,3,D,{v:.6});p.rect(x-6,y+1,9,3,D,{v:.45});p.rect(x+1,y+2,3,6,D,{v:.4});p.px(x-3,y-4,'#140c1c');p.px(x-4,y-4,'#ffffff');for(let i=0;i<3;i++)p.px(x-5+i*2,y+1,'#ffffff');p.rect(x-5,y-5,5,2,'#140c1c');p.px(x-5,y-5,'#7af0ff')},
 toaster(p,x,y){p.rrect(x-6,y-1,12,8,2,ramp('#a8b0c0',6),{v:.6});p.rect(x-4,y-1,3,1,'#140c1c');p.rect(x+1,y-1,3,1,'#140c1c');p.rrect(x-4,y-7,4,6,1,ramp('#e8b060'),{v:.7});p.px(x-3,y-5,'#140c1c');p.px(x-1,y-5,'#140c1c');p.rect(x+1,y-6,4,4,['#d8e8ff'],{});p.px(x+2,y-5,'#140c1c');p.px(x+4,y-5,'#140c1c')},
 jar(p,x,y){p.rrect(x-5,y-5,10,12,2,['#2a4a5a','#4a7a8a','#7ab0c0'],{v:.4,bv:.3});p.rect(x-4,y-7,8,2,ramp('#8a5a2a'),{v:.6});p.rect(x-3,y+1,6,5,ramp('#4a8a3a'),{v:.5});p.rect(x-2,y-2,4,4,ramp('#c8c0b0'),{v:.6});p.px(x-2,y-3,'#c8c0b0');p.px(x+1,y-3,'#c8c0b0');p.px(x,y-4,'#d8283a');p.px(x-4,y-3,'#ffffff')},
 cat(p,x,y){p.ell(x,y,7.5,7.5,['#2a4a6a','#4a7aa0','#a8d8f0','#ffffff'],{b:-.1});const C=ramp('#f0a040');p.ell(x,y+1,5,4.5,C,{b:.15});p.poly([[x-5,y-1],[x-4,y-6],[x-1,y-3]],C,{});p.poly([[x+5,y-1],[x+4,y-6],[x+1,y-3]],C,{});p.px(x-2,y,'#140c1c');p.px(x+2,y,'#140c1c');p.px(x,y+2,'#ff8aa0');p.px(x-4,y-5,'#ffffff')},
 slime(p,x,y){p.ell(x,y+2,7,5.5,['#1a4a1a','#3a8a2a','#7ae03a','#c8ff7a','#ffffff'],{b:.1,clip:(X,Y)=>Y<=y+6});p.rect(x-7,y+6,14,1,'#3a8a2a');p.rect(x-3,y+1,2,2,'#140c1c');p.rect(x+2,y+1,2,2,'#140c1c');p.px(x-4,y-1,'#ffffff');p.px(x+5,y+7,'#7ae03a')},
 robot(p,x,y){const S=ramp('#8a9ab0',6);p.rrect(x-6,y-5,12,10,2,S,{v:.55});p.rect(x-4,y-3,8,6,['#0a1a1a','#103030'],{bv:0});p.px(x-2,y-1,'#7affd0');p.px(x+2,y-1,'#7affd0');p.rect(x-2,y+1,5,1,'#7affd0');p.line(x,y-5,x,y-8,'#d0dcea');p.px(x,y-9,'#ffd040');p.rect(x-8,y-1,2,3,S,{v:.4});p.rect(x+6,y-1,2,3,S,{v:.6})},
 house(p,x,y){p.rect(x-5,y-6,10,7,ramp('#e8d0a0'),{v:.6});p.poly([[x-7,y+1],[x+7,y+1],[x,y+7]],ramp('#c8402a'),{v:.6});p.rect(x-1,y-6,3,4,ramp('#6a3a20'),{v:.5});p.rect(x-4,y-3,2,2,'#7ad8ff');p.rect(x+3,y-3,2,2,'#7ad8ff');p.rect(x+3,y+2,2,4,ramp('#8a5a4a'),{})},
 donut(p,x,y){p.ell(x,y,7.5,6.5,ramp('#d8a058'),{b:.1});p.ell(x,y-.5,6.5,5.5,ramp('#ff7ab8'),{b:.2,clip:(X,Y)=>((X-x)**2+(Y-y)**2)>4||Y<y-3});p.disc(x,y,2,null);for(let i=0;i<8;i++){const a=i*.8;p.px(x+Math.cos(a)*4.5,y+Math.sin(a)*3.5,['#ffffff','#7af0ff','#ffe060','#7aff7a'][i%4])}p.ell(x,y,2,1.6,'#2a1018')},
 bottle(p,x,y){p.rrect(x-3,y-2,6,9,2,['#1a4a3a','#3a8a6a','#7ad0a0','#c8f8e0'],{v:.5});p.rect(x-1,y-6,2,4,['#2a6a4a','#5aa080'],{});p.rect(x-1,y-7,2,1,'#a06a3a');p.rect(x-2,y,4,4,['#f0e0c0'],{});p.px(x-2,y-1,'#ffffff')}};
M.EMB=em;
// --- west wing: Landry's sites first, then legends ---
R('hub','LANDRCYVERSE','LANDRCYVERSE','W',{leaf:'#1a1a4a',frame:'#3a3060',plate:'#e0a838',bgc:'#05030c',light:'#ffb040',fx:'star',tex:'panel',planet:{paint:'sun',w:22}},1100);
R('void','THE VOID','THE VOID','W',{leaf:'#1a0a2a',frame:'#2a1440',plate:'#9030b8',bgc:'#05020a',light:'#c060f0',fx:'ink',style:'gothic',tex:'panel',planet:{paint:'void',w:24}},900);
R('sea','SEA OF THOUGHT','SEA OF THOUGHT','W',{leaf:'#1e5a6a',frame:'#2a6a7a',plate:'#c8e8f0',bgc:'#0a2a3a',light:'#4ad0ff',fx:'bubble',tex:'planks',planet:{paint:'sea',w:20}},1000);
R('ashaad','THE BINDING OF ASHAAD','ASHAAD','W',{leaf:'#4a2a1a',frame:'#3a2a26',plate:'#6a5448',bgc:'#140c0a',light:'#ff6a2a',fx:'fire',style:'rect',tex:'planks',planet:{paint:'ashaad',w:22,h:20,arg:(e,sel)=>({open:sel?1:0})}},1000);
R('llc','LLC POWERED CHANNELS','LLC CHANNELS','W',{leaf:'#a8202a',frame:'#3a1a24',plate:'#f4f0f0',bgc:'#1a0a10',light:'#ff4a4a',fx:'note',style:'rect',tex:'panel',planet:{paint:'yt',w:20}},960);
R('arena','BALL ARENA','BALL ARENA','W',{leaf:'#2a3a8a',frame:'#3a3a4a',light:'#ffd040',fx:'confetti',style:'rect',tex:'panel',emb:em.glove},900);
R('city','COOPER CITY','COOPER CITY','W',{leaf:'#1e3a7a',frame:'#6a6a7a',plate:'#e0a838',bgc:'#0a1430',light:'#6ab0ff',fx:'star',tex:'panel',planet:{paint:'crest',w:20,h:16}},1100);
R('mecha','MECHA HANGAR','MECHA HANGAR','W',{leaf:'#5a6478',frame:'#3a3a42',plate:'#e0c030',bgc:'#1a1e28',light:'#ff8a20',fx:'spark',style:'slide',tex:'metal',emb:em.mech},1100);
R('swords','MAGIC SWORDS','MAGIC SWORDS','W',{leaf:'#3a3448',frame:'#5a5468',plate:'#7af0ff',bgc:'#0a1a2a',light:'#7af0ff',fx:'star',style:'gothic',tex:'stone',emb:em.sword},1000);
R('dogs','DOG PARK','DOG PARK','W',{leaf:'#b8402a',frame:'#7a5a3a',plate:'#f0e0c0',bgc:'#3a7a3a',light:'#ffe08a',fx:'heart',tex:'planks',emb:em.dog},1100);
// --- east wing: wacky collections ---
R('space','OUTER SPACE','OUTER SPACE','E',{leaf:'#2a3048',frame:'#4a5068',plate:'#d0dcea',bgc:'#05030c',light:'#a0e0ff',fx:'star',style:'slide',tex:'metal',emb:em.rocket},1100);
R('ocean','THE DEEP','THE DEEP','E',{leaf:'#1a4a7a',frame:'#2a4a5a',plate:'#e0a838',bgc:'#0a3a6a',light:'#3ab0ff',fx:'bubble',tex:'planks',emb:em.fish},1100);
R('dino','DINOSAUR DISCO','DINO DISCO','E',{leaf:'#5a1a7a',frame:'#2a1440',plate:'#ff6ad0',bgc:'#1a0a2a',light:'#ff6ad0',fx:'note',style:'rect',tex:'candy',emb:em.dino},1000);
R('toast','HAUNTED TOASTERS','HAUNTED TOASTERS','E',{leaf:'#4a4440',frame:'#2e2a2e',plate:'#8a8a8a',bgc:'#0a140e',light:'#8affc8',fx:'ghost',style:'gothic',tex:'planks',emb:em.toaster},960);
R('jars','TINY KINGDOMS','TINY KINGDOMS','E',{leaf:'#6a4a2a',frame:'#4a3a2a',plate:'#c8e8f0',bgc:'#2a1a10',light:'#ffd8a0',fx:'star',tex:'planks',emb:em.jar},1000);
R('cats','CAT ASTRONAUTS','CAT ASTRONAUTS','E',{leaf:'#d8d8e8',frame:'#5a5a78',plate:'#ff9ad0',bgc:'#0a0a2a',light:'#ffb0e0',fx:'heart',style:'slide',tex:'metal',emb:em.cat},1000);
R('slime','SLIME LAB','SLIME LAB','E',{leaf:'#3a5a4a',frame:'#2a3a3a',plate:'#9aff5a',bgc:'#0a1a0a',light:'#9aff5a',fx:'slime',style:'slide',tex:'metal',emb:em.slime},1000);
R('robots','ROBOT BREAKROOM','ROBOT BREAKROOM','E',{leaf:'#6a7a8a',frame:'#4a4a5a',plate:'#ffd040',bgc:'#1a2028',light:'#ffe8a0',fx:'zap',style:'slide',tex:'metal',emb:em.robot},1000);
R('upside','UPSIDE-DOWN ROOM','UPSIDE-DOWN','E',{leaf:'#7a5aa8',frame:'#4a3a6a',plate:'#ffd040',bgc:'#2a1a4a',light:'#c8a0ff',fx:'confetti',style:'flip',tex:'planks',emb:(p,x,y)=>{em.house(p,x,y)}},900);
R('snack','GIANT SNACK HALL','SNACK HALL','E',{leaf:'#ff7ab8',frame:'#a83a6a',plate:'#fff4e0',bgc:'#7a2a4a',light:'#ff9ad0',fx:'crumb',tex:'candy',emb:em.donut},1100);
})();
