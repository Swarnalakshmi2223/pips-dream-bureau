import {lazy,Suspense,useRef,useState,FormEvent} from 'react';import {Win} from './Win';import {tone} from '../lib/audio';import {useStore,toast} from '../lib/store';import {useInterval} from '../lib/hooks';
const Diorama=lazy(()=>import('./Diorama'));
type D={id:number;x:number;e:string;dur:number};const COL=['#f3a6c0','#a8d8f0','#ffe08a','#b9e6b0','#c7b8f0'];
export function Game(){const {best,setBest}=useStore();const [ds,setDs]=useState<D[]>([]);const [sc,setSc]=useState(0);const [t,setT]=useState(0);const [bl,setBl]=useState<string[]>([]);const n=useRef(0);const scr=useRef(0);scr.current=sc;
useInterval(()=>{const d={id:Date.now()+n.current++,x:Math.random()*85,e:['⭐','🌙','✨'][n.current%3],dur:2+Math.random()*2};setDs(a=>[...a,d]);setTimeout(()=>setDs(a=>a.filter(z=>z.id!==d.id)),4200)},t>0?500:null);
useInterval(()=>{setT(x=>{if(x<=1){if(scr.current>best){setBest(scr.current);toast('New best score: '+scr.current+'!')}return 0}return x-1})},t>0?1000:null);
return <Win id="play2" title="Catch_Dreams.exe"><div className="body"><h2>Rattle &amp; Block Toys: Catch the Dreams</h2><p style={{margin:0}}>Tap the falling dreams before they land. Then stack some blocks.</p>
<div className="game" aria-label="Game area">{ds.map(d=><button key={d.id} className="dr" aria-label="Catch dream" style={{left:d.x+'%',animationDuration:d.dur+'s'}} onClick={()=>{setSc(s=>s+1);tone(600+sc*20,.15);setDs(a=>a.filter(z=>z.id!==d.id))}}>{d.e}</button>)}</div>
<div className="status"><span>Score: <b>{sc}</b> · Time: <b>{t}s</b> · Best: <b>{best}</b></span><button className="btn" onClick={()=>{if(t===0){setSc(0);setT(20)}}} disabled={t>0}>{t>0?'Playing...':'Start 20s'}</button></div>
<div className="inset" style={{display:'grid',gap:10}}><b className="px">Block Stack</b><div className="blocks" aria-label={`Tower of ${bl.length} blocks`}>{bl.map((c,i)=><div key={i} className="blk" style={{background:c,width:80-(i%3)*8}}/>)}</div>
<div className="tools"><button className="btn" disabled={bl.length>=8} onClick={()=>{setBl(b=>[...b,COL[b.length%5]]);tone(330+bl.length*60,.2)}}>+ Add block</button><button className="btn" onClick={()=>{if(bl.length){[400,300,220,160].forEach((f,i)=>setTimeout(()=>tone(f,.25),i*90))}setBl([])}}>💥 Knock over</button><button className="btn" onClick={()=>{[880,988,1175,988,880].forEach((f,i)=>setTimeout(()=>tone(f,.12,.08),i*70))}}>🔔 Shake rattle</button></div></div></div></Win>}
export function Cellar(){const r=useRef<HTMLDivElement>(null);const [found,setF]=useState<number[]>([]);const P=[[14,22],[72,58],[40,78]];
const hit=(k:number)=>{if(found.includes(k))return;const f=[...found,k];setF(f);tone(700+k*150,.3);if(f.length===3){[523,659,784,1047,784,659,523].forEach((q,i)=>setTimeout(()=>tone(q,.4),i*200));toast('Secret lullaby unlocked!')}};
return <Win title="Dream_Cellar.exe"><div className="body"><h2>The Dream Cellar</h2><p style={{margin:0}}>Pip hid 3 stars in the dark. Move your light and tap them. Found: <b>{found.length} / 3</b></p>
<div className="cel" ref={r} onPointerMove={e=>{const b=r.current!.getBoundingClientRect();r.current!.style.setProperty('--x',e.clientX-b.left+'px');r.current!.style.setProperty('--y',e.clientY-b.top+'px')}}><span>Move your light around...</span>
<div>{found.length===3?'You found them all! Sleep tight 🎵':'Pip hid a lullaby here: sleep tight!'}{P.map(([x,y],k)=><button key={k} className="hs" style={{left:x+'%',top:y+'%',opacity:found.includes(k)?.4:1}} aria-label={`Hidden star ${k+1}`} onClick={()=>hit(k)}>⭐</button>)}</div></div></div></Win>}
export function ThreeD(){return <Win id="three" title="Pip_3D.wrl"><div className="body"><h2>Pip Diorama in 3D</h2><p style={{margin:0}}>A tiny 3D nursery. Drag to orbit, tap Pip's frame to make him wave, and flip the sky to night.</p><Suspense fallback={<p>Loading 3D…</p>}><Diorama/></Suspense></div></Win>}
const rule=(q:string,setName:(n:string)=>void,name:string)=>{const s=q.toLowerCase(),m=s.match(/(?:i am|i'm|my name is|call me)\s+([a-z]+)/);if(m){const n=m[1][0].toUpperCase()+m[1].slice(1);setName(n);return `Hi ${n}! I'll remember you. Hehe!`}
const has=(r:RegExp)=>r.test(s);
if(has(/click|where|how.*(play|use)|secret|egg/))return'Click my face on the cloud 5 times. Or find the 3 stars in the Dream Cellar!';
if(has(/song|music|lullaby|sing/))return'Wind the music box in the Lullaby Lab! I hum along off-key.';
if(has(/joke|funny/))return'Why did the ghost sleep well? He had a boo-tiful pillow! Hehe!';
if(has(/lamp|light|lantern/))return'Try the Nightlight Collection and pick a glow. Rose is my favourite!';
if(has(/dream/))return'I build dreams from clouds, moonlight and one very silly hum.';
if(has(/sleep|tired|night/))return'Sleepy? Switch the page to night and listen to the lullaby.';
if(has(/who|what are you|your name/))return'I am Pip, Junior Dream Engineer at the Midnight Nursery!';
if(has(/how are|feel/))return'Sleepy and giggly. The best way to be!';
if(has(/thank/))return'Hehe, you are welcome! Sweet dreams.';if(has(/bye|goodnight/))return'Goodnight'+(name?' '+name:'')+'! I will save you a cloud.';
if(has(/hi|hello|hey/))return`Hiii${name?' '+name:''}! Ask me about songs, lamps or dreams.`;
return['Hehe! Tell me about your favourite dream.','Ooh, tell me more!','I only know sleepy things. Try asking about lullabies.'][s.length%3]};
export function Chat(){const {name,setName}=useStore();const [log,setLog]=useState<string[]>(['Pip: hi hi! Tell me your name?']);const [q,setQ]=useState('');const [typing,setTyping]=useState(false);
const send=(t:string)=>{t=t.trim();if(!t||typing)return;setLog(l=>[...l,'You: '+t]);setQ('');tone(700,.15);setTyping(true);setTimeout(()=>{setLog(l=>[...l,'Pip: '+rule(t,setName,name)]);setTyping(false);tone(880,.15)},600)};
return <Win id="chat" title="Chat_with_Pip.exe"><div className="body"><h2>Talk to Pip</h2><div id="log" aria-live="polite">{log.map((l,i)=><p key={i}>{l}</p>)}{typing&&<p>Pip is typing...</p>}</div>
<div className="tools">{['Who are you?','Play me a song','Tell me a joke','Where do I click?'].map(c=><button key={c} className="chipbtn" onClick={()=>send(c)}>{c}</button>)}</div>
<form onSubmit={(e:FormEvent)=>{e.preventDefault();send(q)}}><input value={q} onChange={e=>setQ(e.target.value)} maxLength={120} aria-label="Message to Pip" placeholder="say hi, or ask about dreams"/><button className="btn">Send</button></form></div></Win>}
export function Guestbook(){const {wishes,wish,name}=useStore();const [t,setT]=useState('');const [n,setN]=useState(name);const [st,setSt]=useState('⭐');
return <Win id="book" title="Guestbook.exe"><div className="body"><h2>Leave a dream wish</h2><p style={{margin:0}}>{wishes.length} {wishes.length===1?'wish':'wishes'} on the wall so far.</p>
<form onSubmit={e=>{e.preventDefault();if(t.trim()){wish(`${st} ${n.trim()||'Sleepy visitor'}: ${t.trim()}`);setT('');tone(784,.4);toast('Wish added to the wall!')}}}>
<select value={st} onChange={e=>setSt(e.target.value)} aria-label="Sticker" className="chipbtn">{['⭐','🌙','☁','🧸','🎵'].map(x=><option key={x}>{x}</option>)}</select>
<input value={n} onChange={e=>setN(e.target.value)} maxLength={20} placeholder="Your name" aria-label="Your name" style={{flex:'0 1 140px'}}/>
<input value={t} onChange={e=>setT(e.target.value)} maxLength={80} placeholder="I wish for a dream about..." aria-label="Your dream wish" required/><button className="btn">Sign</button></form>
<ul id="gb">{[...wishes].reverse().slice(0,8).map((w,i)=><li key={i}>{w}</li>)}</ul><small>Wishes stay on this device. Swap the store action for Firebase/Supabase to share them.</small></div></Win>}
export const Credits=()=><Win title="Credits.txt"><div className="body cred"><ul style={{margin:0,paddingLeft:18}}><li>Pip and all four artworks: official Track 1 Pip Creator Asset Pack (haX.baby).</li><li>Fonts: Pixelify Sans and Nunito (Google Fonts, SIL OFL).</li><li>Music and sounds: Web Audio API, melody written for this site.</li><li>Libraries: React, Vite, Zustand, Framer Motion, three.js, React Three Fiber, drei (all MIT).</li><li>Built with Claude's help; I tested and edited the code myself.</li></ul>
<div className="badges" aria-hidden="true"><span>BEST VIEWED AT BEDTIME</span><span>MADE WITH REACT</span><span>NO GORE, JUST GIGGLES</span><span>LAST UPDATED 19 OCT 2026</span></div></div></Win>;
