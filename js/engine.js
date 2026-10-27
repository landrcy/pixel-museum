/* PIXEL MUSEUM engine. Everything (scenes, sprites, text, UI) is drawn into ONE low-res canvas that the
   browser upscales by a single integer factor with nearest-neighbour, so every texel on screen is the same size. */
(()=>{'use strict';
const M=window.M=window.M||{};
M.NAME=M.NAME||'PIXEL MUSEUM';
const TAU=Math.PI*2,RM=matchMedia('(prefers-reduced-motion: reduce)').matches,RH=272;
Object.assign(M,{TAU,RM,RH});
/* ---------------- colour + dither ---------------- */
const HC=new Map();
const hx=c=>{let k=HC.get(c);if(!k){const n=parseInt(c.slice(1),16);k=[n>>16&255,n>>8&255,n&255];HC.set(c,k)}return k};
const clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t;
const toHex=k=>'#'+((1<<24)|(clamp(Math.round(k[0]),0,255)<<16)|(clamp(Math.round(k[1]),0,255)<<8)|clamp(Math.round(k[2]),0,255)).toString(16).slice(1);
const mix=(a,b,t)=>{const A=hx(a),B=hx(b);return toHex([A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t,A[2]+(B[2]-A[2])*t])};
const B4=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(v=>(v+.5)/16);
const bay=(x,y)=>B4[((y&3)<<2)|(x&3)];
const H=(a,b=0)=>{let h=(a*374761393+b*668265263)|0;h=Math.imul(h^h>>>13,1274126177);return((h^h>>>16)>>>0)/4294967296};
function vn(x,y){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),w=yf*yf*(3-2*yf);
 return(H(xi,yi)*(1-u)+H(xi+1,yi)*u)*(1-w)+(H(xi,yi+1)*(1-u)+H(xi+1,yi+1)*u)*w}
const fbm=(x,y)=>vn(x,y)*.55+vn(x*2.1,y*2.1)*.3+vn(x*4.3,y*4.3)*.15;
// pick from a dark->light ramp; clean flat bands with a dithered seam between neighbours
function rp(r,v,x,y){const n=r.length-1;v=clamp(v,0,1)*n;let i=Math.floor(v);const f=v-i;if(f>=.7||(f>.3&&(f-.3)/.4>bay(x,y)))i++;return r[i>n?n:i]}
// 5-step hue-shifted ramp from one base colour: shadows lean purple, lights lean warm cream
const ramp=(c,n=5,sh='#1a1030',li='#fff4d8')=>{const o=[];for(let i=0;i<n;i++){const t=i/(n-1);o.push(t<.5?mix(c,sh,(.5-t)*1.5):mix(c,li,(t-.5)*1.3))}return o};
Object.assign(M,{hx,mix,toHex,bay,H,vn,fbm,rp,ramp,clamp,lerp});
/* ---------------- Pix: a sprite canvas painted texel by texel, lit from the upper left ---------------- */
const LX=-.58,LY=-.62,LZ=.53;
class Pix{
 constructor(w,h){this.w=Math.max(1,w|0);this.h=Math.max(1,h|0);this.d=new Uint8ClampedArray(this.w*this.h*4)}
 px(x,y,c){x=Math.floor(x);y=Math.floor(y);if(!c||x<0||y<0||x>=this.w||y>=this.h)return this;const k=typeof c==='string'?hx(c):c,o=(y*this.w+x)*4,d=this.d;d[o]=k[0];d[o+1]=k[1];d[o+2]=k[2];d[o+3]=255;return this}
 has(x,y){return x>=0&&y>=0&&x<this.w&&y<this.h&&this.d[(y*this.w+x)*4+3]>0}
 get(x,y){if(!this.has(x,y))return null;const o=(y*this.w+x)*4,d=this.d;return toHex([d[o],d[o+1],d[o+2]])}
 clr(x,y){if(x>=0&&y>=0&&x<this.w&&y<this.h)this.d[(y*this.w+x)*4+3]=0;return this}
 // flat-ish shape: bevel (top/left lit, bottom/right shaded) + vertical gradient + optional texture
 fill(x0,y0,x1,y1,test,r,o={}){const v0=o.v??.55,gr=o.g??.2,bv=o.bv??.26,hh=Math.max(1,y1-y0);
  for(let y=Math.max(0,Math.floor(y0));y<Math.min(this.h,Math.ceil(y1));y++)for(let x=Math.max(0,Math.floor(x0));x<Math.min(this.w,Math.ceil(x1));x++){if(!test(x,y))continue;
   let v=v0+gr*(.5-(y-y0)/hh);if(bv){const tl=!test(x-1,y)||!test(x,y-1),br=!test(x+1,y)||!test(x,y+1);if(tl&&!br)v+=bv;else if(br&&!tl)v-=bv}
   if(o.tex)v+=o.tex(x,y);this.px(x,y,typeof r==='string'?r:rp(r,v,x,y))}return this}
 rect(x,y,w,h,r,o){return this.fill(x,y,x+w,y+h,(X,Y)=>X>=x&&Y>=y&&X<x+w&&Y<y+h,r,o)}
 rrect(x,y,w,h,rad,r,o){const t=(X,Y)=>{if(X<x||Y<y||X>=x+w||Y>=y+h)return false;const cx=X<x+rad?x+rad:X>=x+w-rad?x+w-rad-1:X,cy=Y<y+rad?y+rad:Y>=y+h-rad?y+h-rad-1:Y;return(X-cx)**2+(Y-cy)**2<=rad*rad+.5};return this.fill(x,y,x+w,y+h,t,r,o)}
 poly(pts,r,o){let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const[a,b]of pts){x0=Math.min(x0,a);y0=Math.min(y0,b);x1=Math.max(x1,a);y1=Math.max(y1,b)}
  const t=(X,Y)=>{const px=X+.5,py=Y+.5;let c=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){const[xi,yi]=pts[i],[xj,yj]=pts[j];if((yi>py)!==(yj>py)&&px<(xj-xi)*(py-yi)/(yj-yi)+xi)c=!c}return c};
  return this.fill(x0,y0,x1+1,y1+1,t,r,o)}
 // sphere-lit ellipse with a dark crescent on the lower right
 ell(cx,cy,rx,ry,r,o={}){const k=o.k??1,b=o.b??0;
  for(let y=Math.floor(cy-ry-1);y<=Math.ceil(cy+ry+1);y++)for(let x=Math.floor(cx-rx-1);x<=Math.ceil(cx+rx+1);x++){const dx=(x+.5-cx)/rx,dy=(y+.5-cy)/ry,r2=dx*dx+dy*dy;if(r2>1)continue;if(o.clip&&!o.clip(x,y,dx,dy))continue;
   if(typeof r==='string'){this.px(x,y,r);continue}
   const nz=Math.sqrt(1-r2);let v=.2+(LX*dx+LY*dy+LZ*nz)*.72*k+b;if(r2>.74&&(dx*.58+dy*.62)>.12)v-=.15;if(o.tex)v+=o.tex(x,y,dx,dy);this.px(x,y,rp(r,v,x,y))}
  if(o.spec&&typeof r!=='string'){const sx=Math.round(cx-rx*.42),sy=Math.round(cy-ry*.45);this.px(sx,sy,o.spec);if(rx>5)this.px(sx+1,sy,o.spec)}return this}
 // vertical cylinder (columns, cans, legs): lit from the left
 cyl(x,y,w,h,r,o={}){const b=o.b??0;for(let Y=Math.max(0,y);Y<Math.min(this.h,y+h);Y++)for(let X=x;X<x+w;X++){const nx=(X+.5-x-w/2)/(w/2),nz=Math.sqrt(Math.max(0,1-nx*nx));let v=.22+(LX*nx+LZ*nz)*.75+b+(o.g?o.g*(.5-(Y-y)/h):0);if(o.tex)v+=o.tex(X,Y);this.px(X,Y,rp(r,v,X,Y))}return this}
 line(x0,y0,x1,y1,c){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);const dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1;let e=dx+dy;for(let i=0;i<999;i++){this.px(x0,y0,c);if(x0===x1&&y0===y1)break;const e2=2*e;if(e2>=dy){e+=dy;x0+=sx}if(e2<=dx){e+=dx;y0+=sy}}return this}
 disc(cx,cy,r,c){for(let y=Math.floor(cy-r);y<=Math.ceil(cy+r);y++)for(let x=Math.floor(cx-r);x<=Math.ceil(cx+r);x++)if((x+.5-cx)**2+(y+.5-cy)**2<=r*r)this.px(x,y,c);return this}
 // stamp a char-map ("." = clear) with a palette object
 map(x,y,rows,pal){rows.forEach((row,j)=>{for(let i=0;i<row.length;i++){const ch=row[i];if(ch!=='.'&&ch!==' '&&pal[ch])this.px(x+i,y+j,pal[ch])}});return this}
 text(s,x,y,c,sh){M.ftext(this,s,x,y,c,sh);return this}
 // 1-texel outline around everything opaque
 ol(c='#140c1c',diag=false){const w=this.w,h=this.h,a=new Uint8Array(w*h);for(let i=0;i<w*h;i++)a[i]=this.d[i*4+3]?1:0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(a[y*w+x])continue;const n=(X,Y)=>X>=0&&Y>=0&&X<w&&Y<h&&a[Y*w+X];if(n(x-1,y)||n(x+1,y)||n(x,y-1)||n(x,y+1)||diag&&(n(x-1,y-1)||n(x+1,y-1)||n(x-1,y+1)||n(x+1,y+1)))this.px(x,y,c)}return this}
 // shade every opaque texel below a line etc.: generic per-texel remap
 each(fn){for(let y=0;y<this.h;y++)for(let x=0;x<this.w;x++){const o=(y*this.w+x)*4;if(this.d[o+3]){const c=fn(x,y,toHex([this.d[o],this.d[o+1],this.d[o+2]]));if(c===null)this.d[o+3]=0;else if(c)this.px(x,y,c)}}return this}
 blit(s,x,y,flip){const w=s.w,h=s.h,src=s.d||s.px;if(!src)return this;for(let j=0;j<h;j++)for(let i=0;i<w;i++){const o=(j*w+(flip?w-1-i:i))*4;if(src[o+3]>40)this.px(x+i,y+j,[src[o],src[o+1],src[o+2]])}return this}
 sp(){const c=document.createElement('canvas');c.width=this.w;c.height=this.h;c.getContext('2d').putImageData(new ImageData(this.d,this.w,this.h),0,0);const m=new Uint8Array(this.w*this.h);for(let i=0;i<m.length;i++)m[i]=this.d[i*4+3]?1:0;return{c,w:this.w,h:this.h,m,d:this.d}}
}
M.Pix=Pix;
M.mk=(w,h,fn,ol)=>{const p=new Pix(w,h);fn(p);if(ol!==false)p.ol(typeof ol==='string'?ol:undefined);return p.sp()};
M.frames=(n,w,h,fn,ol)=>{const a=[];for(let i=0;i<n;i++)a.push(M.mk(w,h,p=>fn(p,i,n),ol));return a};
// a sprite from a canvas (e.g. a planet painter or a png); mask from alpha
M.fromCanvas=(c,s)=>{s=s||{};const w=c.width,h=c.height,d=c.getContext('2d').getImageData(0,0,w,h).data,m=s.m&&s.m.length===w*h?s.m:new Uint8Array(w*h);for(let i=0;i<w*h;i++)m[i]=d[i*4+3]>40?1:0;return Object.assign(s,{c,w,h,m,d,hl:null,wh:null})};
M.img=(src)=>new Promise(res=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=i.width;c.height=i.height;c.getContext('2d').drawImage(i,0,0);res(M.fromCanvas(c))};i.onerror=()=>res(null);i.src=src});
// selection ring + white flash silhouettes (built lazily from the mask)
function ring(s){if(s.hl)return s.hl;const w=s.w+2,h=s.h+2,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d'),im=g.createImageData(w,h),d=im.data,m=(x,y)=>x>=0&&y>=0&&x<s.w&&y<s.h&&s.m[y*s.w+x];
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const X=x-1,Y=y-1;if(m(X,Y))continue;if(m(X-1,Y)||m(X+1,Y)||m(X,Y-1)||m(X,Y+1)){const o=(y*w+x)*4;d[o]=255;d[o+1]=246;d[o+2]=196;d[o+3]=255}}g.putImageData(im,0,0);return s.hl=c}
function white(s){if(s.wh)return s.wh;const c=document.createElement('canvas');c.width=s.w;c.height=s.h;const g=c.getContext('2d'),im=g.createImageData(s.w,s.h),d=im.data;for(let i=0;i<s.m.length;i++)if(s.m[i]){d[i*4]=255;d[i*4+1]=255;d[i*4+2]=255;d[i*4+3]=255}g.putImageData(im,0,0);return s.wh=c}
M.ring=ring;M.white=white;
/* ---------------- 5x7 pixel font (original) ---------------- */
const GL={A:'.###.|#...#|#...#|#####|#...#|#...#|#...#',B:'####.|#...#|#...#|####.|#...#|#...#|####.',C:'.###.|#...#|#....|#....|#....|#...#|.###.',D:'####.|#...#|#...#|#...#|#...#|#...#|####.',
E:'#####|#....|#....|####.|#....|#....|#####',F:'#####|#....|#....|####.|#....|#....|#....',G:'.###.|#...#|#....|#.###|#...#|#...#|.####',H:'#...#|#...#|#...#|#####|#...#|#...#|#...#',I:'###|.#.|.#.|.#.|.#.|.#.|###',
J:'..###|...#.|...#.|...#.|#..#.|#..#.|.##..',K:'#...#|#..#.|#.#..|##...|#.#..|#..#.|#...#',L:'#....|#....|#....|#....|#....|#....|#####',M:'#...#|##.##|#.#.#|#.#.#|#...#|#...#|#...#',N:'#...#|#...#|##..#|#.#.#|#..##|#...#|#...#',
O:'.###.|#...#|#...#|#...#|#...#|#...#|.###.',P:'####.|#...#|#...#|####.|#....|#....|#....',Q:'.###.|#...#|#...#|#...#|#.#.#|#..#.|.##.#',R:'####.|#...#|#...#|####.|#.#..|#..#.|#...#',S:'.####|#....|#....|.###.|....#|....#|####.',
T:'#####|..#..|..#..|..#..|..#..|..#..|..#..',U:'#...#|#...#|#...#|#...#|#...#|#...#|.###.',V:'#...#|#...#|#...#|#...#|#...#|.#.#.|..#..',W:'#...#|#...#|#...#|#.#.#|#.#.#|#.#.#|.#.#.',X:'#...#|#...#|.#.#.|..#..|.#.#.|#...#|#...#',
Y:'#...#|#...#|.#.#.|..#..|..#..|..#..|..#..',Z:'#####|....#|...#.|..#..|.#...|#....|#####','0':'.###.|#...#|#..##|#.#.#|##..#|#...#|.###.','1':'.#.|##.|.#.|.#.|.#.|.#.|###','2':'.###.|#...#|....#|...#.|..#..|.#...|#####',
'3':'####.|....#|....#|.###.|....#|....#|####.','4':'...#.|..##.|.#.#.|#..#.|#####|...#.|...#.','5':'#####|#....|####.|....#|....#|#...#|.###.','6':'..##.|.#...|#....|####.|#...#|#...#|.###.','7':'#####|....#|...#.|..#..|.#...|.#...|.#...',
'8':'.###.|#...#|#...#|.###.|#...#|#...#|.###.','9':'.###.|#...#|#...#|.####|....#|...#.|.##..','!':'#|#|#|#|#|.|#','?':'.###.|#...#|....#|...#.|..#..|.....|..#..','.':'.|.|.|.|.|.|#',',':'..|..|..|..|..|.#|#.',
'-':'....|....|....|####|....|....|....',"'":'#|#|.|.|.|.|.',':':'.|.|#|.|.|#|.','&':'.##..|#..#.|#.#..|.#...|#.#.#|#..#.|.##.#','/':'....#|...#.|...#.|..#..|.#...|.#...|#....','+':'.....|..#..|..#..|#####|..#..|..#..|.....',
'<':'...#|..##|.###|####|.###|..##|...#','>':'#...|##..|###.|####|###.|##..|#...','(':'.#|#.|#.|#.|#.|#.|.#',')':'#.|.#|.#|.#|.#|.#|#.','#':'.#.#.|#####|.#.#.|.#.#.|.#.#.|#####|.#.#.','*':'.....|#.#.#|.###.|#####|.###.|#.#.#|.....',
'=':'....|....|####|....|####|....|....','~':'.....|.....|.#..#|#.##.|.....|.....|.....','"':'#.#|#.#|...|...|...|...|...','♥':'.#.#.|#####|#####|.###.|..#..|.....|.....','♪':'..##|..#.|..#.|..#.|.##.|###.|.#..'};
const FONT={};for(const k in GL){const rows=GL[k].split('|');FONT[k]={w:rows[0].length,r:rows}}
const tw=s=>{let w=0;for(const ch of String(s).toUpperCase()){w+=(ch===' '?3:(FONT[ch]?FONT[ch].w:3))+1}return Math.max(0,w-1)};
// draw text into a Pix (sh = drop shadow colour)
M.ftext=(p,s,x,y,c,sh)=>{for(const pass of sh?[1,0]:[0]){let cx=x;for(const ch of String(s).toUpperCase()){const G=FONT[ch];if(!G){cx+=4;continue}for(let j=0;j<7;j++)for(let i=0;i<G.w;i++)if(G.r[j][i]==='#')p.px(cx+i+pass,y+j+pass,pass?sh:c);cx+=G.w+1}}};
M.tw=tw;
// cached text sprite: o = {c, o: outline colour, sh: shadow colour}
const TC=new Map();
M.txt=(s,c='#fff6dc',ol='#140c1c',sh)=>{const k=s+'|'+c+'|'+ol+'|'+sh;let t=TC.get(k);if(t)return t;const w=tw(s)+(ol?2:0)+(sh?1:0),h=7+(ol?2:0)+(sh?1:0);
 t=M.mk(w,h,p=>{if(sh)M.ftext(p,s,ol?1:0,ol?1:0,c,sh);else M.ftext(p,s,ol?1:0,ol?1:0,c)},ol||false);TC.set(k,t);return t};
/* ---------------- particles ---------------- */
const PT={
 spark:{c:['#fffbe0','#ffd84a','#ff9a2a','#d0441a'],l:[.35,.8],v:[40,100],g:170,s:'px'},
 star:{c:['#ffffff','#fff2a0','#a8ecff','#ffc8f8'],l:[.5,1.1],v:[18,50],g:0,s:'tw',dr:2},
 heart:{c:['#ff5a8a','#ff8ab4','#ff3a6a'],l:[.9,1.4],v:[10,26],g:-34,s:'heart',dr:1.5},
 note:{c:['#ffe066','#7af0ff','#ff8af0','#9aff7a'],l:[.9,1.5],v:[10,26],g:-28,s:'note',dr:1.5},
 bubble:{c:['#c8f6ff'],l:[1.2,2.4],v:[4,14],g:-30,s:'bub',wob:1},
 confetti:{c:['#ff4a6a','#ffd040','#4ad0ff','#7aff7a','#c070ff','#ffffff'],l:[1.1,1.9],v:[50,110],g:110,s:'conf',dr:2.2},
 smoke:{c:['#e0d8e8','#b0a8c0','#807890'],l:[.8,1.5],v:[4,14],g:-14,s:'puff',dr:1},
 steam:{c:['#ffffff','#d8e4f0'],l:[.7,1.2],v:[3,8],g:-22,s:'puff',dr:1},
 drop:{c:['#a8e8ff','#4aa8f0','#2a6ad0'],l:[.5,1],v:[30,70],g:230,s:'px'},
 slime:{c:['#c8ff7a','#7ae03a','#3a9a2a'],l:[.5,1],v:[30,80],g:230,s:'blob'},
 zap:{c:['#ffffff','#b8f4ff','#6ab0ff'],l:[.12,.3],v:[60,130],g:0,s:'px'},
 crumb:{c:['#f0c070','#c88a3a','#8a5420'],l:[.6,1],v:[30,70],g:240,s:'px'},
 ghost:{c:['#eef4ff','#b8c8f0','#8898d0'],l:[.8,1.4],v:[6,16],g:-18,s:'puff',dr:1},
 ink:{c:['#3a2450','#24163a','#140c22'],l:[1,1.8],v:[8,24],g:-4,s:'puff',dr:2},
 gold:{c:['#fffbd0','#ffe050','#e0a020','#a06810'],l:[.6,1.1],v:[40,90],g:200,s:'px'},
 snow:{c:['#ffffff','#e0ecff'],l:[1.5,2.5],v:[3,10],g:12,s:'px',wob:1},
 leaf:{c:['#9ae05a','#5aa83a','#e0c040'],l:[1,1.8],v:[10,30],g:30,s:'conf',dr:1.5,wob:1},
 fire:{c:['#fff4b0','#ffc040','#ff7020','#c02a10'],l:[.35,.7],v:[8,22],g:-60,s:'px'},
 dust:{c:['#d8c8a8','#a89878'],l:[.5,.9],v:[10,30],g:20,s:'px',dr:2},
 water:{c:['#e8fbff','#9ae0ff','#4ab0f0'],l:[.5,.9],v:[40,90],g:240,s:'px'},
 pixel:{c:['#ff5a8a','#ffd040','#4ad0ff','#7aff7a'],l:[.6,1],v:[30,70],g:0,s:'sq',dr:3},
 zzz:{c:['#d8e8ff'],l:[1.4,1.8],v:[6,8],g:-10,s:'z',dr:0}};
M.PT=PT;
const SH={heart:['.#.#.','#####','.###.','..#..'],note:['.##','.#.','.#.','##.','##.'],z:['###','..#','.#.','###']};
M.emit=(R,type,x,y,n=10,o={})=>{if(!R)return;const T=PT[type]||PT.spark;if(RM)n=Math.min(n,3);const cols=o.c||T.c;for(let i=0;i<n&&R.P.length<700;i++){const a=o.dir!=null?o.dir+(Math.random()-.5)*(o.spread??1.2):Math.random()*TAU,v=lerp(T.v[0],T.v[1],Math.random())*(o.v??1)*(RM?.3:1),l=lerp(T.l[0],T.l[1],Math.random())*(o.l??1);
 R.P.push({x:x+(o.rx?(Math.random()-.5)*o.rx:0),y:y+(o.ry?(Math.random()-.5)*o.ry:0),vx:Math.cos(a)*v,vy:Math.sin(a)*v,g:o.g??T.g,dr:T.dr||0,l,L:l,c:cols[(Math.random()*cols.length)|0],s:o.s||T.s,wob:T.wob?Math.random()*TAU:null,fl:o.floor??null})}};
function stepP(R,dt){const P=R.P;for(let i=P.length-1;i>=0;i--){const p=P[i];p.l-=dt;if(p.l<=0){P[i]=P[P.length-1];P.pop();continue}p.vy+=p.g*dt;if(p.dr){const k=Math.exp(-p.dr*dt);p.vx*=k;p.vy*=k}p.x+=p.vx*dt+(p.wob!=null?Math.sin(p.l*4+p.wob)*dt*6:0);p.y+=p.vy*dt;if(p.fl!=null&&p.y>p.fl){p.y=p.fl;p.vy*=-.35;p.vx*=.6}}}
function drawP(g,R,ox,oy){for(const p of R.P){const x=Math.round(p.x+ox),y=Math.round(p.y+oy),k=p.l/p.L;g.fillStyle=p.c;
 switch(p.s){case'px':g.fillRect(x,y,1,1);break;
  case'tw':if(k>.45){g.fillRect(x-1,y,3,1);g.fillRect(x,y-1,1,3);if(k>.8){g.fillStyle='#ffffff';g.fillRect(x,y,1,1)}}else g.fillRect(x,y,1,1);break;
  case'sq':{const s=k>.5?2:1;g.fillRect(x,y,s,s);break}
  case'conf':((p.l*9|0)&1)?g.fillRect(x,y,2,1):g.fillRect(x,y,1,2);break;
  case'blob':g.fillRect(x,y,2,2);g.fillStyle='#ffffff';g.fillRect(x,y,1,1);break;
  case'bub':{const r=p.L>1.8?2:1;if(r===1){g.fillRect(x-1,y,1,1);g.fillRect(x+1,y,1,1);g.fillRect(x,y-1,1,1);g.fillRect(x,y+1,1,1)}else{g.fillRect(x-1,y-2,3,1);g.fillRect(x-1,y+2,3,1);g.fillRect(x-2,y-1,1,3);g.fillRect(x+2,y-1,1,3);g.fillStyle='#ffffff';g.fillRect(x-1,y-1,1,1)}break}
  case'puff':{const r=Math.round(lerp(3,1,k*k));for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++)if(i*i+j*j<=r*r+.5&&bay(x+i,y+j)<k*1.3)g.fillRect(x+i,y+j,1,1);break}
  default:{const m=SH[p.s];if(!m){g.fillRect(x,y,1,1);break}for(let j=0;j<m.length;j++)for(let i=0;i<m[j].length;i++)if(m[j][i]==='#')g.fillRect(x+i-2,y+j-2,1,1)}}}}
/* ---------------- sound (WebAudio, synthesized) ---------------- */
const AU={ctx:null,sfx:localStorage.getItem('pm-sfx')!=='0',mus:localStorage.getItem('pm-mus')==='1',out:null,mo:null};
M.AU=AU;
function actx(){if(AU.ctx)return AU.ctx;try{const C=window.AudioContext||window.webkitAudioContext;AU.ctx=new C();AU.out=AU.ctx.createGain();AU.out.gain.value=.16;AU.out.connect(AU.ctx.destination);AU.mo=AU.ctx.createGain();AU.mo.gain.value=.07;AU.mo.connect(AU.ctx.destination)}catch(e){}return AU.ctx}
M.unlock=()=>{const c=actx();if(c&&c.state==='suspended')c.resume();if(AU.mus)music(true)};
function tone(type,f0,f1,d,v=1,dl=0,dest){const c=AU.ctx;if(!c)return;const t=c.currentTime+dl,o=c.createOscillator(),gn=c.createGain();o.type=type;o.frequency.setValueAtTime(f0,t);if(f1&&f1!==f0)o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+d);gn.gain.setValueAtTime(.0001,t);gn.gain.exponentialRampToValueAtTime(v,t+.008);gn.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(gn);gn.connect(dest||AU.out);o.start(t);o.stop(t+d+.02)}
let NB=null;function noise(d,v=1,f=1200,q=1,dl=0,f1){const c=AU.ctx;if(!c)return;if(!NB){NB=c.createBuffer(1,c.sampleRate,c.sampleRate);const a=NB.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1}
 const t=c.currentTime+dl,s=c.createBufferSource(),bf=c.createBiquadFilter(),gn=c.createGain();s.buffer=NB;bf.type='bandpass';bf.frequency.setValueAtTime(f,t);if(f1)bf.frequency.exponentialRampToValueAtTime(f1,t+d);bf.Q.value=q;gn.gain.setValueAtTime(.0001,t);gn.gain.exponentialRampToValueAtTime(v,t+.01);gn.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(bf);bf.connect(gn);gn.connect(AU.out);s.start(t);s.stop(t+d+.05)}
const SFX={
 tick:p=>tone('square',1400*p,1400*p,.025,.12),
 blip:p=>tone('square',660*p,990*p,.07,.4),
 pop:p=>{tone('sine',380*p,900*p,.08,.8);noise(.04,.2,3000)},
 boing:p=>tone('triangle',180*p,520*p,.22,.8),
 clang:p=>{[1,2.76,5.4].forEach((m,i)=>tone('square',300*p*m,300*p*m*.98,.35-i*.08,.25/(i+1)));noise(.08,.4,4000)},
 zap:p=>{tone('sawtooth',1600*p,90,.18,.35);noise(.12,.3,5000,2)},
 woof:p=>{tone('square',320*p,140*p,.13,.5);noise(.1,.5,900*p,2)},
 yip:p=>{tone('square',700*p,420*p,.08,.4);tone('square',760*p,480*p,.08,.35,.1)},
 meow:p=>{tone('triangle',600*p,950*p,.12,.6);tone('triangle',950*p,520*p,.25,.6,.12)},
 splash:p=>noise(.35,.8,2400*p,.8,0,400),
 whoosh:p=>noise(.4,.6,400*p,1.5,0,2600*p),
 chime:p=>[1,1.25,1.5,2].forEach((m,i)=>tone('triangle',523*p*m,0,.4,.5,i*.07)),
 creak:p=>{tone('sawtooth',90*p,60*p,.5,.25);tone('sawtooth',140*p,110*p,.4,.12,.1)},
 coin:p=>{tone('square',988*p,0,.07,.35);tone('square',1319*p,0,.25,.35,.07)},
 thud:p=>{tone('sine',140*p,40,.22,1);noise(.06,.4,300)},
 beep:p=>{tone('square',880*p,0,.06,.35);tone('square',1175*p,0,.08,.35,.08)},
 ding:p=>{tone('sine',1320*p,0,.9,.6);tone('sine',2640*p,0,.5,.2)},
 roar:p=>{noise(.6,.9,500*p,.7,0,200);tone('sawtooth',110*p,70*p,.6,.4)},
 boo:p=>{const c=AU.ctx;if(!c)return;const t=c.currentTime,o=c.createOscillator(),l=c.createOscillator(),lg=c.createGain(),gn=c.createGain();o.type='sine';o.frequency.value=330*p;l.frequency.value=7;lg.gain.value=22;l.connect(lg);lg.connect(o.frequency);gn.gain.setValueAtTime(.0001,t);gn.gain.exponentialRampToValueAtTime(.6,t+.15);gn.gain.exponentialRampToValueAtTime(.0001,t+.9);o.connect(gn);gn.connect(AU.out);o.start(t);l.start(t);o.stop(t+1);l.stop(t+1)},
 bubble:p=>tone('sine',300*p,1200*p,.09,.6),
 honk:p=>{tone('square',415*p,0,.16,.35);tone('square',523*p,0,.16,.25)},
 crunch:p=>{for(let i=0;i<4;i++)noise(.05,.6,1800+i*500,1,i*.045)},
 laser:p=>tone('square',1800*p,200*p,.15,.3),
 rumble:p=>{noise(.7,.8,120*p,.8);tone('sine',60*p,35,.7,.7)},
 squish:p=>{tone('sine',200*p,90*p,.15,.8);noise(.08,.3,700)},
 open:p=>{tone('sawtooth',110*p,70*p,.45,.15);[523,659,784,1047].forEach((f,i)=>tone('triangle',f*p,0,.5,.35,.25+i*.07))},
 swish:p=>noise(.18,.5,1500*p,2,0,5000),
 tada:p=>[523,659,784,1047,784,1047].forEach((f,i)=>tone('square',f*p,0,.14,.22,i*.08)),
 type:p=>tone('square',520*p+Math.random()*80,0,.03,.18)};
M.snd=(k,p=1)=>{if(!AU.sfx||!AU.ctx||AU.ctx.state!=='running')return;const f=SFX[k];if(f)try{f(p)}catch(e){}};
// tiny chiptune: two-voice loop scheduled ahead
const SONG={bpm:96,lead:[72,0,76,79,77,0,76,74,72,74,76,0,74,0,0,0,69,0,72,76,74,0,72,71,72,0,0,0,0,0,0,0, 72,0,76,79,81,0,79,77,76,77,79,0,77,0,0,0,74,0,77,81,79,0,77,76,72,0,0,0,0,0,0,0],
 bass:[48,55,52,55,45,52,48,52,41,48,45,48,43,50,47,50]};
let mT=0,mI=0,mTimer=null;
function music(on){const c=actx();if(!c)return;if(!on){clearInterval(mTimer);mTimer=null;return}if(mTimer)return;mT=c.currentTime+.1;mI=0;
 mTimer=setInterval(()=>{const st=60/SONG.bpm/2;while(mT<c.currentTime+.4){const n=SONG.lead[mI%SONG.lead.length];if(n)tone('square',440*Math.pow(2,(n-69)/12),0,st*.9,.5,mT-c.currentTime,AU.mo);
  if(mI%4===0){const b=SONG.bass[(mI/4|0)%SONG.bass.length];tone('triangle',440*Math.pow(2,(b-69)/12),0,st*3.6,.9,mT-c.currentTime,AU.mo)}
  if(mI%2===0)tone('square',440*Math.pow(2,(SONG.bass[(mI/4|0)%SONG.bass.length]+19-69)/12),0,st*.5,.18,mT-c.currentTime,AU.mo);mT+=st;mI++}},90)}
M.setSfx=v=>{AU.sfx=v;localStorage.setItem('pm-sfx',v?'1':'0');if(v){M.unlock();M.snd('blip')}};
M.setMus=v=>{AU.mus=v;localStorage.setItem('pm-mus',v?'1':'0');M.unlock();music(v)};
/* ---------------- scenes ---------------- */
M.defs={};M.order=[];M.R={};
M.def=(id,d)=>{M.defs[id]=Object.assign({id},d);if(d.wing)M.order.push(id)};
function build(id){const d=M.defs[id];const R={id,def:d,name:d.name,w:Math.max(d.w||480,64),h:RH,top:d.top,bot:d.bot,ents:[],P:[],says:[],cam:{x:0,y:0,vx:0,vy:0,tx:null},t:0,hover:null,focus:null};
 if(d.bg){const p=new Pix(R.w,RH);d.bg(p,R);R.bg=p.sp().c}
 d.init&&d.init(R);R.cam.x=d.start!=null?d.start-160:0;return R}
M.room=id=>M.R[id]||(M.R[id]=build(id));
M.ent=(R,o)=>{const e=Object.assign({x:0,y:0,w:8,h:8,t0:Math.random()*100,an:null,f:0,vis:1},o);if(e.spr&&!o.w){e.w=e.spr.w;e.h=e.spr.h}if(e.fr&&!o.w){e.w=e.fr[0].w;e.h=e.fr[0].h}R.ents.push(e);return e};
M.play=(e,k,d=.5)=>{e.an={k,t0:M.now,d}};
M.say=(R,x,y,s,d=1.2)=>{R.says=R.says.filter(q=>Math.abs(q.x-x)>4||Math.abs(q.y-y)>4);R.says.push({x,y,s,t0:M.now,d})};
// default click reaction
M.react=(R,e,px,py)=>{if(e.react!==false)M.play(e,e.react||'hop',e.rd||.45);e.fl=M.now;const cx=e.x+e.w/2,cy=e.y+e.h*.3;if(e.fx)M.emit(R,e.fx,cx,cy,e.fxn||12,e.fxo||{});if(e.snd)M.snd(e.snd,e.sp||(.9+Math.random()*.2));if(e.say)M.say(R,cx,e.y-2,typeof e.say==='function'?e.say(e):e.say)};
/* ---------------- canvas + loop ---------------- */
const cv=document.getElementById('c'),g=cv.getContext('2d',{alpha:false});
let S=3,BW=320,BH=240,TR=null,DM=null;
function resize(){const w=innerWidth,h=innerHeight;S=clamp(Math.round(h/RH),2,8);while(S>2&&w/S<128)S--;BW=Math.ceil(w/S);BH=Math.ceil(h/S);cv.width=BW;cv.height=BH;cv.style.width=BW*S+'px';cv.style.height=BH*S+'px';g.imageSmoothingEnabled=false;Object.assign(M,{S,BW,BH});DM=null}
addEventListener('resize',resize);resize();M.g=g;
// screen-space layout helpers
const view=R=>{const ox=R.w<BW?Math.floor((BW-R.w)/2):-Math.round(R.cam.x),oy=BH>=RH?Math.floor((BH-RH)/2):-Math.round(R.cam.y);return[ox,oy]};
M.view=view;
function clampCam(R){const mx=Math.max(0,R.w-BW),my=Math.max(0,RH-BH);if(R.cam.x<0){R.cam.x=0;R.cam.vx=0}if(R.cam.x>mx){R.cam.x=mx;R.cam.vx=0}R.cam.y=clamp(R.cam.y,0,my)}
M.centerOn=(R,x,inst)=>{const t=clamp(x-BW/2,0,Math.max(0,R.w-BW));if(inst){R.cam.x=t;R.cam.tx=null}else R.cam.tx=t};
let cur=null;M.cur=()=>cur;
const keys={};let walk=0;M.stats={frames:0,ft:[]};
function entOff(e,t){let dx=0,dy=0,fi=e.f|0;const ti=RM?0:t;
 if(e.idle==='bob')dy=Math.round(Math.sin(ti*(e.bs||2)+e.t0)*(e.ba||1));else if(e.idle==='float')dy=Math.round(Math.sin(ti*(e.bs||1.2)+e.t0)*(e.ba||3)),dx=Math.round(Math.sin(ti*(e.bs||1.2)*.6+e.t0*2)*(e.bx||0));
 if(e.fr&&e.fps&&!e.upd)fi=Math.floor((RM?0:t)*e.fps+e.t0)%e.fr.length;
 if(e.an){const p=(M.now-e.an.t0)/e.an.d;if(p>=1)e.an=null;else if(!RM)switch(e.an.k){case'hop':dy-=Math.round(Math.sin(p*Math.PI)*(e.hop||8));break;case'shake':dx+=Math.round(Math.sin(p*45)*2*(1-p));break;case'jiggle':dy+=Math.round(Math.sin(p*30)*1.5*(1-p));dx+=Math.round(Math.cos(p*30)*1*(1-p));break;case'spin':if(e.fr)fi=Math.floor(p*e.fr.length*2)%e.fr.length;break;case'dip':dy+=Math.round(Math.sin(p*Math.PI)*3);break;case'rise':dy-=Math.round(Math.sin(p*Math.PI)*(e.hop||14));break}}
 if(e.hover&&cur&&(cur.hover===e||cur.focus===e)&&!RM)dy-=1;return[dx,dy,fi]}
function spriteOf(e,fi){return e.fr?e.fr[clamp(fi,0,e.fr.length-1)]:e.spr}
function drawEnts(R,ox,oy,t){const L=R.ents.filter(e=>e.vis&&e.x+e.w+ox>-40&&e.x+ox<BW+40);L.sort((a,b)=>(a.z??a.y+a.h)-(b.z??b.y+b.h));
 for(const e of L){const[dx,dy,fi]=entOff(e,t),x=Math.round(e.x+ox+dx),y=Math.round(e.y+oy+dy);e._dx=dx;e._dy=dy;e._fi=fi;
  const sel=(R.hover===e||R.focus===e)&&(e.click||e.name);
  if(e.draw){e.draw(g,x,y,t,e,sel);continue}const s=spriteOf(e,fi);if(!s)continue;
  if(sel&&!e.noRing)g.drawImage(ring(s),x-1,y-1);if(e.flip){g.save();g.translate(x+s.w,y);g.scale(-1,1);g.drawImage(s.c,0,0);g.restore()}else g.drawImage(s.c,x,y);
  if(e.fl&&M.now-e.fl<.12&&!e.flip){g.globalAlpha=.7;g.drawImage(white(s),x,y);g.globalAlpha=1}}}
function hitEnt(R,X,Y){const L=R.ents.filter(e=>e.vis&&(e.click||e.name)&&!e.nohit);L.sort((a,b)=>(b.z??b.y+b.h)-(a.z??a.y+a.h));
 for(const e of L){const dx=e._dx||0,dy=e._dy||0,x=X-(e.x+dx),y=Y-(e.y+dy);if(e.hitR){const cx=e.w/2,cy=e.h/2;if((x-cx)**2+(y-cy)**2<=e.hitR*e.hitR)return e;continue}
  if(x<0||y<0||x>=e.w||y>=e.h)continue;if(e.box)return e;const s=spriteOf(e,e._fi||0);if(!s||!s.m){return e}const xi=Math.floor(e.flip?s.w-1-x:x),yi=Math.floor(y);
  for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++){const a=xi+i,b=yi+j;if(a>=0&&b>=0&&a<s.w&&b<s.h&&s.m[b*s.w+a])return e}}return null}
/* ---------------- pixel UI ---------------- */
// themed frame: dark wood + brass line
M.frame=(x,y,w,h,o={})=>{const c=o.c||['#140c1c','#5a3a1e','#d8a24a','#2a1a24'];g.fillStyle=c[0];g.fillRect(x+1,y,w-2,h);g.fillRect(x,y+1,w,h-2);g.fillStyle=c[1];g.fillRect(x+1,y+1,w-2,h-2);g.fillStyle=c[2];g.fillRect(x+2,y+2,w-4,h-4);g.fillStyle=o.bg||c[3];g.fillRect(x+3,y+3,w-6,h-6);
 if(o.pat){g.fillStyle=o.pat;for(let j=y+4;j<y+h-4;j+=2)for(let i=x+4+((j>>1)&1);i<x+w-4;i+=4)g.fillRect(i,j,1,1)}g.fillStyle=c[2];[[x+1,y+1],[x+w-2,y+1],[x+1,y+h-2],[x+w-2,y+h-2]].forEach(([a,b])=>g.fillRect(a,b,1,1))};
const ICON={back:['...#...','..##...','.######','#######','.######','..##...','...#...'],
 snd:['...#..#.','..##...#','####.#.#','####.#.#','####.#.#','..##...#','...#..#.'],
 nos:['...#....','..##....','####.#.#','####..#.','####.#.#','..##....','...#....'],
 mus:['..####','..#..#','..#..#','..#..#','###.##','###.##','.#..#.'],
 out:['#####..','#...#..','#.#.#.#','#.#.###','#.#.#.#','#...#..','#####..']};
function icon(k,x,y,c){const m=ICON[k];g.fillStyle=c;for(let j=0;j<m.length;j++)for(let i=0;i<m[j].length;i++)if(m[j][i]==='#')g.fillRect(x+i,y+j,1,1)}
let UI=[];
function button(id,x,y,w,h,drawIn,act,on){const hov=M.uiHover===id;M.frame(x,y,w,h,{c:['#140c1c','#4a2e18',hov?'#ffe08a':'#c8923a','#2a1a24']});drawIn(x,y,hov);UI.push({id,x,y,w,h,act})}
M.button=button;
function drawUI(R,t){UI=[];const pad=3;
 const tb=R.def.backTo;if(tb){const lab=R.def.backLabel||'BACK',w=tw(lab)+18;button('back',pad,pad,w,15,(x,y,h)=>{icon(R.def.backIcon||'back',x+4,y+4,h?'#fff6c0':'#f0d8a0');g.drawImage(M.txt(lab,h?'#fff6c0':'#f0d8a0',null).c,x+13,y+4)},()=>M.back())}
 button('sfx',BW-pad-17,pad,17,15,(x,y,h)=>icon(AU.sfx?'snd':'nos',x+5,y+4,h?'#fff6c0':'#f0d8a0'),()=>M.setSfx(!AU.sfx));
 button('mus',BW-pad-36,pad,17,15,(x,y,h)=>{icon('mus',x+6,y+4,AU.mus?(h?'#fff6c0':'#ffd86a'):'#7a6a5a');if(!AU.mus){g.fillStyle='#d84a3a';for(let i=0;i<9;i++)g.fillRect(x+4+i,y+3+i*.9|0,1,1)}},()=>M.setMus(!AU.mus));
 // edge arrows: walk the hall / room
 if(R.w>BW&&!R.dlg&&!R.def.noArrows){const ay=Math.floor(BH/2)-5,b=RM?0:Math.round(Math.sin(t*5)*1.5),[ox,oy]=view(R);
  const arrow=(dir,x)=>{g.fillStyle='#140c1c';for(let j=0;j<11;j++){const len=6-Math.abs(j-5);g.fillRect(dir<0?x+5-len:x,ay+j,len+1,1)}g.fillStyle=M.uiHover==='a'+dir?'#fff6c0':'#ffd86a';for(let j=1;j<10;j++){const len=5-Math.abs(j-5);g.fillRect(dir<0?x+5-len:x,ay+j,len,1)}UI.push({id:'a'+dir,x:x-3,y:ay-6,w:13,h:23,hold:dir})};
  if(R.cam.x>1)arrow(-1,3-b);if(R.cam.x<R.w-BW-1)arrow(1,BW-9+b)}
 R.def.ui&&R.def.ui(R,g,t)}
M.ui=()=>UI;M.icon=icon;
// name placard above hovered thing
function placard(R,e,ox,oy){const nm=typeof e.name==='function'?e.name(e):e.name;if(!nm)return;const T=M.txt(nm,'#ffe9a8',null),w=T.w+8,h=13;let x=Math.round(e.x+ox+e.w/2-w/2),y=Math.round(e.y+oy+(e._dy||0)-h-3);x=clamp(x,2,BW-w-2);if(y<20)y=Math.min(BH-h-2,Math.round(e.y+oy+e.h+3));if(y<20)y=20;
 M.frame(x,y,w,h,{c:['#140c1c','#4a2e18','#c8923a','#2a1626']});g.drawImage(T.c,x+4,y+3)}
function drawSays(R,ox,oy){R.says=R.says.filter(q=>M.now-q.t0<q.d);for(const q of R.says){const T=M.txt(q.s,'#2a1a2a',null),w=T.w+6,h=11,rise=RM?0:Math.min(2,Math.floor((M.now-q.t0)*20));let x=clamp(Math.round(q.x+ox-w/2),1,BW-w-1),y=Math.round(q.y+oy-h-5-rise);
 g.fillStyle='#140c1c';g.fillRect(x+1,y,w-2,h);g.fillRect(x,y+1,w,h-2);g.fillStyle='#fffaf0';g.fillRect(x+1,y+1,w-2,h-2);g.fillStyle='#d8d0e0';g.fillRect(x+1,y+h-2,w-2,1);const tx=clamp(Math.round(q.x+ox),x+3,x+w-4);g.fillStyle='#140c1c';g.fillRect(tx-1,y+h,3,1);g.fillRect(tx,y+h+1,1,2);g.fillStyle='#fffaf0';g.fillRect(tx,y+h-1,1,2);g.drawImage(T.c,x+3,y+2)}}
/* ---------------- transitions: iris wipe + ordered-dither dissolve ---------------- */

function dmask(k){if(!DM){DM=[];for(let i=0;i<=16;i++){const c=document.createElement('canvas');c.width=4;c.height=4;const x=c.getContext('2d');x.fillStyle='#000';for(let j=0;j<16;j++)if(B4[j]*16<i)x.fillRect(j&3,j>>2,1,1);DM.push(g.createPattern(c,'repeat'))}}return DM[k]}
function iris(cx,cy,r){g.fillStyle='#07040c';const E=5;for(let y=0;y<BH;y++){const dy=y+.5-cy;const inner=r-E,outer=r+E;if(Math.abs(dy)>=outer){g.fillRect(0,y,BW,1);continue}
  const xo=Math.sqrt(outer*outer-dy*dy),xi=Math.abs(dy)<inner?Math.sqrt(inner*inner-dy*dy):0;g.fillRect(0,y,Math.max(0,Math.floor(cx-xo)),1);g.fillRect(Math.ceil(cx+xo),y,BW,1);
  for(let x=Math.floor(cx-xo);x<Math.ceil(cx+xo);x++){if(xi&&x>cx-xi&&x<cx+xi-1)continue;const d=Math.hypot(x+.5-cx,dy);if((d-inner)/(2*E)>bay(x,y))g.fillRect(x,y,1,1)}}}
// pixel-art cover wipes; k = 0 (clear) .. 1 (fully covered). Everything is 1-texel aligned.
function cover(st,k,cx,cy,col,ph){const D='#07040c';g.fillStyle=D;if(k>=1){g.fillRect(0,0,BW,BH);return}if(k<=0)return;
 if(st==='blocks'||st==='diamond'){const C=12,maxD=Math.hypot(Math.max(cx,BW-cx),Math.max(cy,BH-cy))+C;for(let by=0;by<BH;by+=C)for(let bx=0;bx<BW;bx+=C){const d=Math.hypot(bx+C/2-cx,by+C/2-cy)/maxD*.75+H(bx,by)*.25;const q=clamp((k-d*.5)/.5,0,1);const sz=Math.round(q*(st==='diamond'?C+1:C/2));if(sz<=0)continue;const mx=bx+C/2,my=by+C/2;
   if(st==='blocks'){g.fillStyle=D;g.fillRect(mx-sz,my-sz,sz*2,sz*2);if(sz<C/2){g.fillStyle=col;g.fillRect(mx-sz,my-sz,sz*2,1);g.fillRect(mx-sz,my-sz,1,sz*2)}}
   else{for(let j=-sz;j<sz;j++){const w=sz-Math.abs(j+.5)+.5;const wi=Math.round(w*1.0)*1;if(wi<=0)continue;g.fillStyle=D;g.fillRect(mx-wi,my+j,wi*2,1);if(sz<C+1&&q<1){g.fillStyle=col;g.fillRect(mx-wi,my+j,1,1);g.fillRect(mx+wi-1,my+j,1,1)}}}}
   // diamond cells overlap at full size: fill fully when close to done
   if(st==='diamond'&&k>.9){g.fillStyle=dmask(Math.round((k-.9)*10*16));g.fillRect(0,0,BW,BH)}return}
 if(st==='melt'){const CW=4;for(let x=0;x<BW;x+=CW){const dl=H(x,7)*.35+H(x>>3,9)*.15;const q=clamp((k-dl)/(1-.5),0,1);const h=Math.round(q*q*(BH+12));if(h<=0)continue;const y0=ph==='out'?0:BH-h;g.fillStyle=D;g.fillRect(x,y0,CW,h);g.fillStyle=col;if(h<BH)g.fillRect(x,ph==='out'?h-1:y0,CW,1)}return}
 if(st==='shutter'){const BHt=8;for(let y=0;y<BH;y+=BHt){const row=y/BHt,fromL=row%2===0;const dl=(row%5)*.04;const q=clamp((k-dl)/.8,0,1),w=Math.round(q*BW);if(w<=0)continue;const x0=fromL?0:BW-w;g.fillStyle=D;g.fillRect(x0,y,w,BHt);g.fillStyle=col;if(w<BW){const ex=fromL?w-1:x0;g.fillRect(ex,y,1,BHt);for(let j=0;j<BHt;j+=2)g.fillRect(fromL?ex+1+((j>>1)&1):ex-1-((j>>1)&1),y+j,1,1)}}return}
 g.fillStyle=dmask(Math.round(k*16));g.fillRect(0,0,BW,BH)}
function drawTR(){if(!TR)return;const p=clamp((M.now-TR.t0)/TR.d,0,1);const maxR=Math.hypot(BW,BH);
 const st=TR.style;if(st!=='iris'&&st!=='dissolve'){cover(st,TR.ph==='out'?p:1-p,TR.cx,TR.cy,TR.col||'#ffd86a',TR.ph)}
 else if(TR.ph==='out'){if(st==='iris')iris(TR.cx,TR.cy,maxR*(1-p*p)-4);else{g.fillStyle=dmask(Math.round(p*16));g.fillRect(0,0,BW,BH)}}
 else{if(st==='iris')iris(TR.cx,TR.cy,maxR*p*(2-p)-4);else{g.fillStyle=dmask(Math.round((1-p)*16));g.fillRect(0,0,BW,BH)}}
 if(p>=1){if(TR.ph==='out'){TR.swap();TR={...TR,ph:'in',t0:M.now,d:TR.din,cx:BW/2,cy:BH/2}}else TR=null}}
M.busy=()=>!!TR;
const LIVE=document.getElementById('live');
function enter(id,o){const R=M.room(id);cur=R;R.hover=null;R.focus=null;R.dlg=null;R.P.length=0;R.says.length=0;R.cam.vx=0;R.cam.tx=null;R.entered=M.now;
 if(o.at!=null)M.centerOn(R,o.at,true);else if(R.def.start!=null&&!R.visited)M.centerOn(R,R.def.start,true);R.visited=1;clampCam(R);if(BH<RH)R.cam.y=(RH-BH)/2;
 R.def.enter&&R.def.enter(R,o);if(LIVE)LIVE.textContent=R.name;document.title=(R.def.wing?R.name+' · ':'')+M.NAME}
// go to a scene. o: {from:[sx,sy] screen point, style:'iris'|'dissolve', at: x to centre on, pop}
M.go=(id,o={})=>{if(TR||!M.defs[id])return;const doIt=()=>{enter(id,o);if(!o.pop){const h=id==='entrance'?' ':'#'+id;try{history.pushState({id},'',h==' '?location.pathname+location.search:h)}catch(e){}}};
 if(!cur||o.instant){doIt();return}const f=o.from||[BW/2,BH/2];TR={ph:'out',t0:M.now,d:RM?.12:(o.dout||.55),din:RM?.12:(o.din||.5),style:RM?'dissolve':(o.style||'iris'),col:o.col,cx:f[0],cy:f[1],swap:doIt}};
M.back=()=>{if(!cur)return;const b=cur.def.backTo;if(!b)return;M.snd('swish',.8);const R=cur;M.go(b,{style:'shutter',col:'#ffd86a',at:M.backAt?M.backAt(R.id):undefined,from:[BW/2,BH/2],ret:R.id})};
/* ---------------- input ---------------- */
let ptr=null,lastMove=0;M.uiHover=null;M.touch=false;
const toTex=ev=>{const r=cv.getBoundingClientRect();return[(ev.clientX-r.left)/S,(ev.clientY-r.top)/S]};
const uiAt=(x,y)=>{for(let i=UI.length-1;i>=0;i--){const u=UI[i];if(x>=u.x&&y>=u.y&&x<u.x+u.w&&y<u.y+u.h)return u}return null};
function hoverAt(x,y){const R=cur;if(!R)return;const u=uiAt(x,y);M.uiHover=u?u.id:null;let e=null;if(!u&&!R.dlg){const[ox,oy]=view(R);e=hitEnt(R,x-ox,y-oy)}else if(R.dlg)e=null;
 if(e!==R.hover){R.hover=e;if(e&&e.click&&e.tick!==false)M.snd('tick',1+(e.x%7)/20)}cv.style.cursor=(u||(e&&e.click)||(R.dlg&&R.dlgHit&&R.dlgHit(x,y)))?'pointer':(ptr&&ptr.drag?'grabbing':'grab')}
cv.addEventListener('pointerdown',ev=>{M.unlock();M.touch=ev.pointerType!=='mouse';const[x,y]=toTex(ev);ptr={id:ev.pointerId,x0:x,y0:y,x,y,drag:false,t:performance.now(),vx:0};try{cv.setPointerCapture(ev.pointerId)}catch(e){}
 const u=uiAt(x,y);if(u&&u.hold){walk=u.hold;ptr.ui=u}else if(u)ptr.ui=u;if(cur)cur.cam.tx=null;hoverAt(x,y)});
cv.addEventListener('pointermove',ev=>{const[x,y]=toTex(ev);if(!ptr){hoverAt(x,y);return}const R=cur;const dx=x-ptr.x,dy=y-ptr.y,now=performance.now();
 if(!ptr.drag&&!ptr.ui&&Math.hypot(x-ptr.x0,y-ptr.y0)>(M.touch?4:3)&&!(R&&R.dlg))ptr.drag=true;
 if(ptr.drag&&R&&!TR){R.cam.x-=dx;R.cam.y-=dy;const dtm=Math.max(1,now-ptr.t);ptr.vx=lerp(ptr.vx,-dx/dtm*1000,.5);ptr.vy=lerp(ptr.vy||0,-dy/dtm*1000,.5);clampCam(R)}ptr.x=x;ptr.y=y;ptr.t=now;if(!M.touch)hoverAt(x,y)});
function up(ev){if(!ptr)return;const[x,y]=toTex(ev);const R=cur;walk=0;
 if(ptr.drag){if(R&&!RM){R.cam.vx=clamp(ptr.vx,-900,900);if(performance.now()-ptr.t>80)R.cam.vx=0}}
 else if(ptr.ui){const u=uiAt(x,y);if(u&&u.id===ptr.ui.id&&u.act){M.snd('blip');u.act()}}
 else if(R&&!TR)clickAt(x,y);ptr=null;if(M.touch&&R){M.uiHover=null}}
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',()=>{ptr=null;walk=0});
cv.addEventListener('pointerleave',()=>{if(!ptr&&cur){cur.hover=null;M.uiHover=null}});
function clickAt(x,y){const R=cur;if(R.dlg){R.dlgClick&&R.dlgClick(x,y);return}const[ox,oy]=view(R),e=hitEnt(R,x-ox,y-oy);
 if(e){R.hover=e;if(M.touch)R.tapT=M.now;if(e.click)e.click(e,R,x-ox,y-oy);else{M.snd('tick')}}else if(R.def.tap)R.def.tap(R,x-ox,y-oy)}
cv.addEventListener('wheel',ev=>{ev.preventDefault();const R=cur;if(!R||TR||R.dlg)return;const d=(Math.abs(ev.deltaX)>Math.abs(ev.deltaY)?ev.deltaX:ev.deltaY)*(ev.deltaMode===1?16:1);R.cam.tx=null;R.cam.vx=0;R.cam.x+=d/S*.9;clampCam(R)},{passive:false});
addEventListener('keydown',ev=>{const R=cur;keys[ev.key]=1;if(!R||TR)return;M.unlock();
 if(R.dlg&&R.dlgKey&&R.dlgKey(ev)){ev.preventDefault();return}
 if(ev.key==='Escape'){M.back();ev.preventDefault()}
 else if(ev.key==='Tab'){ev.preventDefault();const L=R.ents.filter(e=>e.click&&e.vis).sort((a,b)=>a.x-b.x);if(!L.length)return;let i=L.indexOf(R.focus);i=(i+(ev.shiftKey?-1:1)+L.length)%L.length;R.focus=L[i];R.hover=null;M.centerOn(R,L[i].x+L[i].w/2);M.snd('tick')}
 else if((ev.key==='Enter'||ev.key===' ')&&R.focus){ev.preventDefault();R.focus.click(R.focus,R,R.focus.x+R.focus.w/2,R.focus.y+R.focus.h/2)}
 else if(ev.key==='m'||ev.key==='M')M.setMus(!AU.mus)});
addEventListener('keyup',ev=>{keys[ev.key]=0});
addEventListener('popstate',ev=>{const id=(ev.state&&ev.state.id)||(location.hash.slice(1)||'entrance');if(M.defs[id]&&(!cur||cur.id!==id))M.go(id,{pop:true,style:'dissolve'})});
/* ---------------- loop ---------------- */
let last=performance.now();M.now=last/1000;
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;M.now=now/1000;const t0=performance.now();
 const R=cur;if(R){R.t+=dt;const t=R.t;
  let kx=(keys.ArrowLeft||keys.a||keys.A?-1:0)+(keys.ArrowRight||keys.d||keys.D?1:0)+walk;if(R.dlg)kx=0;
  if(kx){R.cam.tx=null;R.cam.vx=0;R.cam.x+=kx*dt*(RM?160:190)}else if(R.cam.tx!=null){const d=R.cam.tx-R.cam.x;R.cam.x+=RM?d:d*Math.min(1,dt*6);if(Math.abs(d)<.5){R.cam.x=R.cam.tx;R.cam.tx=null}}else if(!ptr||!ptr.drag){R.cam.x+=R.cam.vx*dt;R.cam.vx*=Math.exp(-dt*4.5);if(Math.abs(R.cam.vx)<4)R.cam.vx=0}
  clampCam(R);
  for(const e of R.ents)if(e.upd)e.upd(e,dt,t,R);if(R.ents.some(e=>e.dead))R.ents=R.ents.filter(e=>!e.dead);R.def.upd&&R.def.upd(R,dt,t);stepP(R,dt);
  if(M.touch&&R.tapT&&M.now-R.tapT>1.6){R.hover=null;R.tapT=0}
  const[ox,oy]=view(R);
  g.fillStyle=R.top||'#000';g.fillRect(0,0,BW,oy+RH/2);g.fillStyle=R.bot||'#000';g.fillRect(0,oy+RH/2,BW,BH);
  if(R.w<BW){g.fillStyle='#07040c';g.fillRect(0,0,BW,BH)}
  R.def.sky&&R.def.sky(R,g,ox,oy,t);if(R.bg)g.drawImage(R.bg,ox,oy);R.def.back&&R.def.back(R,g,ox,oy,t);
  drawEnts(R,ox,oy,t);drawP(g,R,ox,oy);R.def.front&&R.def.front(R,g,ox,oy,t);drawSays(R,ox,oy);
  const hv=R.focus||R.hover;if(hv&&hv.name&&!R.dlg&&!TR)placard(R,hv,ox,oy);
  // entering plaque
  if(R.def.wing&&!R.dlg){const age=M.now-R.entered;if(age<2.8){const T=M.txt(R.name,'#ffe9a8',null),w=T.w+12,yy=RM?3:Math.round(age<.35?-18+21*(age/.35):age>2.45?3-21*((age-2.45)/.35):3),x=Math.round(BW/2-w/2);if(x>40||BW>200){M.frame(x,yy,w,15,{c:['#140c1c','#4a2e18','#d8a24a','#2a1626']});g.drawImage(T.c,x+6,yy+4)}}}
  drawUI(R,t);R.def.over&&R.def.over(R,g,t);
 }
 drawTR();const ft=performance.now()-t0;M.stats.frames++;M.stats.ft.push(ft);if(M.stats.ft.length>600)M.stats.ft.shift();requestAnimationFrame(frame)}
M.start=first=>{const h=location.hash.slice(1);const id=M.defs[h]?h:first;if(id!==first&&M.defs[id].backTo){try{history.replaceState({id:first},'',location.pathname+location.search);history.pushState({id},'','#'+id)}catch(e){}}enter(id,{});requestAnimationFrame(frame)};
M.hitEnt=hitEnt;M.clampCam=clampCam;
})();
