import {useStore} from './store';
let ac:AudioContext|undefined;
export function tone(f:number,d=.5,v=.12){if(useStore.getState().muted)return;ac??=new (window.AudioContext||(window as any).webkitAudioContext)();
const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(v,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+d);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+d)}
export const SONG=[392,392,494,392,392,494,392,494,587,523,494,440,440,392,330,392,440,392,330,294,330,392,262,0];
