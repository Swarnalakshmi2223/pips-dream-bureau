import {useEffect,useRef,useState} from 'react';import {motion} from 'framer-motion';import {Win} from './Win';import {useStore} from '../lib/store';import {tone,SONG} from '../lib/audio';import {useInterval} from '../lib/hooks';
import box from '../assets/pip_lullaby_box.webp';import lamp from '../assets/pip_dream_lantern.webp';
const SKILLS:[string,number][]=[['Lullabies',92],['Nightlights',85],['Giggling',100],['Tidiness',30]];
const LAMPS:[string,string,string][]=[['Moon','none','#f6e7b4'],['Rose','hue-rotate(-35deg) saturate(1.5)','#f3a6c0'],['Mint','hue-rotate(110deg) saturate(1.2)','#a8e6cf'],['Sunset','hue-rotate(-65deg) saturate(1.8)','#ffb38a']];
export default function Projects(){const muted=useStore(s=>s.muted);const [play,setPlay]=useState(false);const [on,setOn]=useState(false);const [li,setLi]=useState(0);const [ms,setMs]=useState(420);const i=useRef(0);
useEffect(()=>{if(muted)setPlay(false)},[muted]);
useInterval(()=>{const n=SONG[i.current++%SONG.length];if(n)tone(n,ms/600)},play?ms:null);
return <Win id="work" title="My_Projects"><div className="body"><h2>Three things I made</h2><div className="g2">
<article className={'inset proj '+(play?'wob':'')}><span className="ch">Project 1 of 3</span><img src={box} alt="Pastel music box with a unicorn and golden winding key" width={300} height={270}/><h3>The Lullaby Lab</h3><p>Wind the key and the box plays my lullaby, synthesized live in your browser.</p>
<div className="viz" aria-hidden="true">{Array.from({length:10}).map((_,k)=><i key={k}/>)}</div>
<label className="range">Tempo <input type="range" min={250} max={700} step={10} value={950-ms} onChange={e=>setMs(950-+e.target.value)} aria-label="Lullaby tempo"/></label>
<ul className="spec"><li>24-note original melody</li><li>Triangle-wave music box voice</li><li>Honours the mute switch</li></ul>
<button className="btn" aria-pressed={play} onClick={()=>setPlay(p=>!p)}>{play?'■ Stop':'▶ Wind the music box'}</button></article>
<article className={'inset proj lamp '+(on?'on':'')}><span className="ch">Project 2 of 3</span><img src={lamp} alt={`${LAMPS[li][0]} crescent moon nightlight lamp with a brass handle`} width={300} height={268} style={on?{filter:`${LAMPS[li][1]} drop-shadow(0 0 24px ${LAMPS[li][2]})`}:undefined}/><h3>Nightlight Collection</h3><p>Every lamp starts dark. Switch it on, then pick a glow: <b>{LAMPS[li][0]}</b> (lamp {li+1} of 4).</p>
<div className="swatches" role="group" aria-label="Lamp colour">{LAMPS.map(([n,,c],k)=><button key={n} className="sw" style={{background:c}} aria-label={n+' glow'} aria-pressed={li===k} onClick={()=>{setLi(k);setOn(true);tone(500+k*100,.25)}}/>)}</div>
<ul className="spec"><li>Brass handle, porcelain moon</li><li>Soft glow, safe for sleepy ghosts</li></ul>
<button className="btn" aria-pressed={on} onClick={()=>{setOn(o=>!o);tone(on?440:880,.3)}}>💡 Switch {on?'off':'on'}</button></article></div>
<article className="inset chart"><span className="ch">Project 3 of 3</span><h3>Pip's Growth Chart</h3><p style={{margin:'4px 0 10px'}}>My skills, measured like a nursery wall (in centimetres of giggles).</p>
<div className="ruler" aria-hidden="true"><span>0</span><span>25</span><span>50</span><span>75</span><span>100 cm</span></div>
{SKILLS.map(([k,v])=><div className="row" key={k}>{k}<motion.div className="fill" initial={{width:0}} whileInView={{width:v+'%'}} viewport={{once:true}} transition={{duration:1.2}}/><span className="cm">{v} cm</span></div>)}</article></div></Win>}
