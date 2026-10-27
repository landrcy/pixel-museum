/* Room registry: names, wings and rune-portal door designs. Room contents live in rooms-*.js. */
(()=>{'use strict';const{ramp,TAU}=M;
const R=(id,name,short,wing,door,w,o)=>M.def(id,Object.assign({name,short,wing,door,w:w||900,backTo:'hall',top:'#07040c',bot:'#07040c'},o||{}));
const G=['#3a2008','#6a4210','#a87020','#e0a838','#ffe08a'];
const em={
 glove(p,x,y){p.ell(x+1,y,6,5.5,ramp('#d8283a'),{b:.15,spec:'#ffffff'});p.ell(x-4,y+1,3,3.5,ramp('#d8283a'),{b:.05});p.rect(x-3,y+5,8,4,ramp('#f4f0e8'),{v:.6})},
 mech(p,x,y){const S=ramp('#7a8aa8',6);p.rrect(x-6,y-5,12,11,2,S,{v:.55});p.rect(x-5,y-2,10,3,['#3a1a08','#ff7a1a','#ffd060'],{v:.6});p.rect(x-7,y-1,2,5,S,{v:.4});p.rect(x+5,y-1,2,5,S,{v:.6});p.line(x+3,y-5,x+5,y-8,'#d0dcea');p.px(x+5,y-9,'#ff4a3a')},
 sword(p,x,y){p.line(x-6,y+6,x+5,y-5,'#e8f4ff');p.line(x-5,y+6,x+6,y-5,'#a8b8d0');p.line(x-6,y+5,x+5,y-6,'#ffffff');p.line(x-7,y+3,x-3,y+7,G[3]);p.line(x-8,y+8,x-6,y+6,'#6a3a20');p.px(x-5,y+5,'#ff5a3a')},
 book(p,x,y){p.rect(x-7,y-5,14,10,ramp('#6a2ab0'),{v:.5,bv:.25});p.rect(x-6,y-4,5,8,['#e8e0d0','#ffffff']);p.rect(x+1,y-4,5,8,['#d8d0c0','#f0e8d8']);p.rect(x,y-5,1,10,'#3a1060');p.line(x-5,y-2,x-2,y-2,'#6a4aa8');p.line(x+2,y,x+5,y,'#6a4aa8');p.px(x,y-7,'#ffe08a');p.px(x-1,y-8,'#ffffff');p.px(x+2,y-9,'#7ae0ff')},
 dragon(p,x,y){const D=ramp('#c83a2a');p.poly([[x-7,y+6],[x-4,y-2],[x-1,y-6],[x+4,y-7],[x+7,y-4],[x+4,y-3],[x+2,y+1],[x+5,y+6]],D,{v:.55,bv:.25});p.px(x+3,y-5,'#ffe050');p.poly([[x-1,y-6],[x-3,y-9],[x,y-7]],ramp('#e8d8b0'),{})},
 crystal(p,x,y){p.poly([[x,y-8],[x+4,y-2],[x+2,y+7],[x-2,y+7],[x-4,y-2]],['#3a1a6a','#6a3ac0','#a07af0','#e0c8ff','#ffffff'],{v:.55,bv:.3});p.poly([[x-6,y],[x-4,y-3],[x-3,y+6],[x-6,y+6]],['#0a3a5a','#2a8ad0','#8ae0ff'],{v:.5});p.poly([[x+6,y+1],[x+4,y-2],[x+3,y+6],[x+6,y+6]],['#5a0a4a','#d03ab0','#ff9af0'],{v:.5})},
 torii(p,x,y){const C=ramp('#ff2a6a');p.rect(x-8,y-6,16,2,C,{v:.7});p.rect(x-6,y-3,12,1,C,{v:.5});p.rect(x-5,y-4,2,11,C,{v:.5});p.rect(x+3,y-4,2,11,C,{v:.6});p.rect(x-2,y-1,4,4,['#0a3a3a','#1affd0','#bfffff'],{v:.6})},
 cube(p,x,y){const C=['#0a2a2a','#1a6a6a','#3ac0b0','#9afff0','#ffffff'];p.poly([[x,y-7],[x+7,y-3],[x,y+1],[x-7,y-3]],C,{v:.75});p.poly([[x-7,y-3],[x,y+1],[x,y+8],[x-7,y+4]],C,{v:.45});p.poly([[x+7,y-3],[x,y+1],[x,y+8],[x+7,y+4]],C,{v:.25});p.px(x,y+1,'#ffffff');p.px(x,y-7,'#ffffff')}};
M.EMB=em;
// --- west wing: Landry's websites, each re-imagined as a temple of its own ---
R('hub','LANDRCYVERSE OBSERVATORY','LANDRCYVERSE','W',{leaf:'#2a2448',frame:'#3a3060',plate:'#e0a838',bgc:'#05030c',light:'#ffb040',fx:'star',sd:11,planet:{paint:'sun',w:20}},960);
R('void','THE VOID ABYSS','THE VOID','W',{leaf:'#1a1228',frame:'#2a1a3a',plate:'#9030b8',bgc:'#05020a',light:'#c060f0',fx:'voidp',sd:21,planet:{paint:'void',w:22}},900);
R('sea','SEA OF THOUGHT','SEA OF THOUGHT','W',{leaf:'#1a4a5a',frame:'#2a6a7a',plate:'#c8e8f0',bgc:'#0a2a3a',light:'#4ad0ff',fx:'bubble',sd:31,planet:{paint:'sea',w:20}},960);
R('ashaad','THE BINDING OF ASHAAD','ASHAAD','W',{leaf:'#3a221a',frame:'#3a2a26',plate:'#6a5448',bgc:'#140c0a',light:'#ff6a2a',fx:'ember',sd:41,planet:{paint:'ashaad',w:22,h:20,arg:(e,sel)=>({open:sel?1:0})}},900);
R('llc','LLC BROADCAST SHRINE','LLC CHANNELS','W',{leaf:'#4a1a22',frame:'#3a1a24',plate:'#f4f0f0',bgc:'#1a0a10',light:'#ff4a4a',fx:'note',sd:51,planet:{paint:'yt',w:20}},900);
R('arena','BALL ARENA COLOSSEUM','BALL ARENA','W',{leaf:'#2a3060',frame:'#4a4050',plate:'#e0a838',bgc:'#120a1e',light:'#ffd040',fx:'confetti',sd:61,emb:em.glove},900);
R('city','COOPER SKY CITY','COOPER CITY','W',{leaf:'#1e3a6a',frame:'#5a6a8a',plate:'#e0a838',bgc:'#0a1430',light:'#6ab0ff',fx:'star',sd:71,planet:{paint:'crest',w:20,h:16}},960);
// --- east wing: sci-fi and fantasy vaults ---
R('mecha','MECHA FORGE','MECHA FORGE','E',{leaf:'#4a4a58',frame:'#3a3a46',plate:'#e0c030',bgc:'#1a1e28',light:'#ff8a20',fx:'spark',sd:81,emb:em.mech},1100);
R('swords','HALL OF BLADES & ARMOR','SWORDS & ARMOR','E',{leaf:'#3a3040',frame:'#4a4050',plate:'#a0a8c0',bgc:'#1a0a0a',light:'#ff5a3a',fx:'ember',sd:91,emb:em.sword},1240);
R('books','ARCANE LIBRARY','BOOKS & WANDS','E',{leaf:'#2a1a4a',frame:'#3a2a5a',plate:'#e0a838',bgc:'#120830',light:'#a070ff',fx:'rune',sd:101,emb:em.book},1100);
R('dragon','DRAGON HOARD','DRAGON HOARD','E',{leaf:'#4a1e14',frame:'#4a2a1a',plate:'#e0a838',bgc:'#1a0604',light:'#ffa030',fx:'gold',sd:111,emb:em.dragon},1000);
R('crystal','CRYSTAL CAVERN','CRYSTAL CAVERN','E',{leaf:'#1a2a4a',frame:'#2a2a50',plate:'#8ae0ff',bgc:'#0a0620',light:'#8ae0ff',fx:'shard',sd:121,emb:em.crystal},1000);
R('cyber','NEON CYBER SHRINE','CYBER SHRINE','E',{leaf:'#1a1028',frame:'#2a1a3a',plate:'#ff2a6a',bgc:'#05050e',light:'#ff3a9a',fx:'code',sd:131,emb:em.torii},1000);
R('relic','STARSHIP RELIC VAULT','RELIC VAULT','E',{leaf:'#1a2a30',frame:'#2a3a40',plate:'#3ac0b0',bgc:'#041014',light:'#3affd0',fx:'star',sd:141,emb:em.cube},1000);
})();
