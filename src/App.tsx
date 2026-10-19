import {useEffect} from 'react';import {useStore} from './lib/store';import {Bar,Marquee,Sparkles,Taskbar,Toast} from './components/Chrome';import Hero from './components/Hero';import Meet from './components/Meet';import Projects from './components/Projects';
import {MapRoute,Storybook,Story} from './components/Journey';import {Game,Cellar,ThreeD,Chat,Guestbook,Credits} from './components/Play';
export default function App(){const bump=useStore(s=>s.bump);
useEffect(()=>{if(!sessionStorage.getItem('pip-seen')){sessionStorage.setItem('pip-seen','1');bump()}},[]);
return <><Sparkles/><Bar/><Marquee/><main className="wrap"><Hero/><Meet/><Projects/><MapRoute/><Storybook/><Game/><Cellar/><ThreeD/><Chat/><Story/><Guestbook/><Credits/></main><Taskbar/><Toast/></>}
