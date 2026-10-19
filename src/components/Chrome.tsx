import {useEffect,useState} from 'react';import {useStore} from '../lib/store';import {tone} from '../lib/audio';
const LINKS:[string,string][]=[['meet','Meet Pip'],['work','Projects'],['map','Map'],['booksec','Book'],['play2','Game'],['chat','Chat'],['story','Story'],['book','Guestbook']];
export function Bar(){const {night,muted,chaos,toggle}=useStore();const [open,setOpen]=useState(false);
useEffect(()=>{document.body.classList.toggle('night',night)},[night]);
useEffect(()=>{document.body.classList.toggle('chaos',chaos);const f=()=>document.body.style.setProperty('--c',String((innerWidth%7)-3||2));f();addEventListener('resize',f);return()=>removeEventListener('resize',f)},[chaos]);
return <div className="bar"><div className="wrap"><b>🌙 Pip's Dream Bureau</b>
<button className="btn mb" aria-expanded={open} aria-controls="nv" onClick={()=>setOpen(o=>!o)}>☰ Menu</button>
<nav id="nv" className={open?'open':''} aria-label="Sections">{LINKS.map(([id,l])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)}>{l}</a>)}</nav>
<button className="btn" aria-pressed={night} onClick={()=>{toggle('night');tone(440,.2)}}>☀ Day / Night</button>
<button className="btn" aria-pressed={chaos} onClick={()=>toggle('chaos')}>🌈 Chaos</button>
<button className="btn" aria-pressed={muted} onClick={()=>toggle('muted')}>{muted?'🔇 Sound off':'🔊 Sound on'}</button></div></div>}
export const Marquee=()=><div className="mq" aria-hidden="true"><span>★ Welcome to the Midnight Nursery ★ Best viewed at bedtime ★ Please do not wake the baby ★ Click Pip. Gently. ★</span></div>;
export function Sparkles(){useEffect(()=>{let last=0;const h=(e:PointerEvent)=>{if(Date.now()-last<70)return;last=Date.now();const s=document.createElement('div');s.className='sp';s.textContent=['★','✦','☆'][Math.random()*3|0];s.style.cssText=`left:${e.clientX+6}px;top:${e.clientY+6}px;color:#e8b94a`;document.body.append(s);setTimeout(()=>s.remove(),900)};addEventListener('pointermove',h);return()=>removeEventListener('pointermove',h)},[]);return null}

export function Taskbar(){const [open,setOpen]=useState(false);const [now,setNow]=useState(new Date());const {muted,visits}=useStore();
useEffect(()=>{const id=setInterval(()=>setNow(new Date()),20000);return()=>clearInterval(id)},[]);
return <>{open&&<nav className="smenu" aria-label="Start menu">{LINKS.map(([id,l])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)}>{l}</a>)}</nav>}
<div className="taskbar"><button className="btn" aria-expanded={open} onClick={()=>setOpen(o=>!o)}>🌙 Start</button><span className="sp2"/>
<div className="tray"><span aria-hidden="true">{muted?'🔇':'🔊'}</span><span>{visits} dreams</span><span>{now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span></div></div></>}
export function Toast(){const [m,setM]=useState('');useEffect(()=>{let t:any;const h=(e:any)=>{setM(e.detail);clearTimeout(t);t=setTimeout(()=>setM(''),3500)};addEventListener('pip-toast',h);return()=>removeEventListener('pip-toast',h)},[]);return m?<div className="toast" role="status">{m}</div>:null}
