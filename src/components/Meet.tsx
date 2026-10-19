import {useState} from 'react';import {Win} from './Win';import {tone} from '../lib/audio';import portrait from '../assets/pip_portrait.webp';
const FACTS=['Pip has never once been scared of the dark.','Pip hums off-key on purpose. It makes the ghosts giggle.','Pip folds every blanket into a cloud.','Pip counts stars instead of sheep.','Pip once delivered 12 dreams in one night and fell asleep on a chimney.'];
export default function Meet(){const [f,setF]=useState(0);
return <Win id="meet" title="About_Pip.txt"><div className="body g2"><div className="pipbtn" style={{cursor:'default'}}><img src={portrait} alt="Pip holding a glowing lantern and a unicorn music box" width={340} height={510}/></div>
<div style={{display:'grid',gap:12,alignContent:'start'}}><h2>Character Sheet</h2><table className="tbl"><tbody>
<tr><th>Name</th><td>Pip</td></tr><tr><th>Age</th><td>Baby (nobody counts past bedtime)</td></tr>
<tr><th>Is a</th><td>A baby with a smooth round skull face. Friendly, never scary.</td></tr><tr><th>Looks</th><td>Glowing amber eyes, tiny crooked smile, star nightcap with a pink bow.</td></tr>
<tr><th>Voice</th><td>A soft giggle and an off-key hum.</td></tr><tr><th>Mood</th><td>Curious, sleepy, a little clumsy. Hates silence.</td></tr>
<tr><th>Loves</th><td>Lanterns, music boxes, warm clouds, unicorn lullabies.</td></tr><tr><th>Job</th><td>Junior Dream Engineer</td></tr><tr><th>Motto</th><td>“I build the dreams you fall asleep inside.”</td></tr></tbody></table>
<div className="inset"><b className="px">Pip fact #{f+1}</b><p style={{margin:'6px 0 10px'}}>{FACTS[f]}</p><button className="btn" onClick={()=>{setF((f+1)%FACTS.length);tone(660,.15)}}>Another fact!</button></div></div></div></Win>}
