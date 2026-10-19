import {useEffect,useRef,useState} from 'react';import {useStore} from '../lib/store';import {tone} from '../lib/audio';import {Win} from './Win';import avatar from '../assets/pip_avatar_cloud.webp';
const LINES=['Pip says: hehe!','Pip says: that tickles!','Pip says: again, again!','Pip says: one more and I nap...'];
export default function Hero(){const {night,name,visits}=useStore();const img=useRef<HTMLImageElement>(null);const [n,setN]=useState(0);const [asleep,setAsleep]=useState(false);const [say,setSay]=useState('');
const greet=name?`Pip says: welcome back, ${name}! Visit #${visits}`:visits>1204?`Pip says: you again! Visit #${visits}`:'Pip says: hi hi hi!';
useEffect(()=>{const t=(x:number)=>{const r=img.current?.getBoundingClientRect();if(!r||!img.current)return;img.current.style.transform=`rotate(${Math.max(-8,Math.min(8,(x-r.left-r.width/2)/40))}deg)`};
const p=(e:PointerEvent)=>t(e.clientX),m=(e:TouchEvent)=>t(e.touches[0].clientX);addEventListener('pointermove',p);addEventListener('touchmove',m,{passive:true});return()=>{removeEventListener('pointermove',p);removeEventListener('touchmove',m)}},[]);
const click=()=>{tone(520+n*60,.2);if(n+1>=5){setN(0);setAsleep(true);[523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,.8),i*250))}else{setN(n+1);setSay(LINES[n])}};
const digits=String(visits).padStart(5,'0').split('');
return <Win title="Welcome.htm"><div className="body hero"><div><span className="uc"><b className="blink">🚧 Always under construction</b></span>
<h1 style={{margin:'14px 0 12px'}}>I build the dreams you fall asleep inside.</h1>
<p>Hi! I'm Pip, Junior Dream Engineer at the Midnight Nursery. I design lullabies, nightlights and bedtime stories for the neighbourhood's sleepy ghosts.</p>
<ul className="chips"><li>🌙 Junior Dream Engineer</li><li>☁ Midnight Nursery</li><li>✨ No gore, just giggles</li><li>🧸 Open for bedtime</li></ul>
<div className="px" style={{fontSize:14}}>Sleepiness meter: {night?'100%':'87%'}</div><div className="meter" role="img" aria-label="Sleepiness meter"><i style={{width:night?'100%':'87%'}}/></div>
<a className="btn" href="#work" style={{textDecoration:'none',display:'inline-block'}}>See my work</a> <a className="btn" href="#chat" style={{textDecoration:'none',display:'inline-block'}}>Say hi to Pip</a></div>
<button className="pipbtn" onClick={click} aria-label="Pip waving on a cloud. Click to say hello"><img ref={img} src={avatar} alt="Pip, a baby with a friendly skull face and star nightcap, waving from a pink cloud" width={360} height={438}/></button></div>
<div className="status"><span>{night?'Pip says: zzz... *sleepy giggle*':say||greet}</span><span>Dreams delivered: <span className="odo" aria-label="visitor counter">{digits.map((d,i)=><b key={i}>{d}</b>)}</span></span></div>
{asleep&&<div id="zz" className="on" role="dialog" aria-label="Secret" onClick={()=>setAsleep(false)}><div>💤 Shhh... Pip fell asleep.<br/><small>(tap to wake him)</small></div></div>}</Win>}
