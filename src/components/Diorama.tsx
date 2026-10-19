import {useRef,useState} from 'react';import {Canvas,useFrame} from '@react-three/fiber';import {OrbitControls,useTexture,Float,Stars,Sparkles,RoundedBox} from '@react-three/drei';import {SRGBColorSpace,Group} from 'three';import {tone} from '../lib/audio';
import avatar from '../assets/pip_avatar_cloud.webp';import lamp from '../assets/pip_dream_lantern.webp';import box from '../assets/pip_lullaby_box.webp';
function Frame({src,h,night,onClick}:{src:string;h:number;night:boolean;onClick?:()=>void}){const t=useTexture(src);t.colorSpace=SRGBColorSpace;const w=h*t.image.width/t.image.height;const [hv,setHv]=useState(false);
return <group onClick={onClick} onPointerOver={()=>{setHv(true);document.body.style.cursor='pointer'}} onPointerOut={()=>{setHv(false);document.body.style.cursor=''}} scale={hv?1.05:1}>
<RoundedBox args={[w+.25,h+.25,.1]} radius={.08} smoothness={3}><meshStandardMaterial color={night?'#3a3566':'#fffaf0'} emissive={night?'#6b64a8':'#000'} emissiveIntensity={night?.4:0}/></RoundedBox>
<mesh position={[0,0,.06]}><planeGeometry args={[w,h]}/><meshBasicMaterial map={t}/></mesh></group>}
function Cloud(){return <group position={[0,-2.3,0]}>{[[0,0,0,1.5],[-1.3,-.1,.2,1.1],[1.3,-.1,.2,1.1],[-.6,.1,.9,1],[.7,.1,.8,1],[0,-.1,-.8,1.2]].map(([x,y,z,s],i)=><mesh key={i} position={[x,y,z]} scale={[s,s*.55,s]}><sphereGeometry args={[1,24,16]}/><meshStandardMaterial color="#fff" emissive="#f3d9ee" emissiveIntensity={.25}/></mesh>)}</group>}
function Rig({spin,night}:{spin:boolean;night:boolean}){const rig=useRef<Group>(null),orb=useRef<Group>(null),pip=useRef<Group>(null),wave=useRef(0);
useFrame((s,dt)=>{if(rig.current)rig.current.rotation.y+=(s.pointer.x*.35-rig.current.rotation.y)*.05;if(orb.current&&spin)orb.current.rotation.y+=dt*.5;
orb.current?.children.forEach(c=>c.quaternion.copy(s.camera.quaternion).premultiply(orb.current!.quaternion.clone().invert()));
if(pip.current){wave.current=Math.max(0,wave.current-dt*2);pip.current.rotation.z=Math.sin(wave.current*18)*.12*wave.current;pip.current.position.y=Math.sin(wave.current*Math.PI)*.4}});
return <group ref={rig}><Cloud/><group ref={pip} position={[0,.2,0]}><Float speed={2} floatIntensity={.4}><Frame src={avatar} h={3} night={night} onClick={()=>{wave.current=1;tone(660,.25);setTimeout(()=>tone(880,.3),120)}}/></Float></group>
<group ref={orb}><group position={[-3,.3,0]}><Float speed={3}><Frame src={lamp} h={1.4} night={night}/></Float></group><group position={[3,.3,0]}><Float speed={2.5}><Frame src={box} h={1.4} night={night}/></Float></group></group>
<mesh position={[3.2,2.6,-2]}><sphereGeometry args={[.5,24,24]}/><meshStandardMaterial color="#ffe08a" emissive="#ffd54a" emissiveIntensity={night?1.2:.4}/></mesh></group>}
export default function Diorama(){const [spin,setSpin]=useState(true);const [night,setNight]=useState(false);const ctl=useRef<any>(null);
return <div className="d3"><div id="c3" style={{height:340}}><Canvas camera={{position:[0,0.6,8],fov:45}} dpr={[1,2]} aria-label="3D nursery diorama of Pip. Drag to rotate.">
<color attach="background" args={[night?'#14112e':'#f6ead2']}/><ambientLight intensity={night?.5:1}/><pointLight position={[0,3,4]} intensity={night?25:12} color="#ffe9a8"/>
{night&&<Stars radius={30} depth={20} count={800} factor={3} fade speed={1}/>}<Sparkles count={40} scale={[8,5,4]} size={3} speed={.4} color={night?'#ffe9a8':'#f3a6c0'}/>
<Rig spin={spin} night={night}/><OrbitControls ref={ctl} enableZoom={false} enablePan={false} autoRotate={spin} autoRotateSpeed={.8} minPolarAngle={1} maxPolarAngle={2}/></Canvas></div>
<div className="tools"><button className="btn" aria-pressed={spin} onClick={()=>setSpin(s=>!s)}>{spin?'⏸ Pause spin':'▶ Spin'}</button><button className="btn" aria-pressed={night} onClick={()=>setNight(n=>!n)}>{night?'☀ Day sky':'🌙 Night sky'}</button><button className="btn" onClick={()=>ctl.current?.reset()}>↺ Reset view</button></div></div>}
