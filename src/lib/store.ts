import {create} from 'zustand';import {persist} from 'zustand/middleware';
type K='muted'|'night'|'chaos';
type S={muted:boolean;night:boolean;chaos:boolean;visits:number;name:string;best:number;wishes:string[];toggle:(k:K)=>void;setName:(n:string)=>void;setBest:(n:number)=>void;wish:(w:string)=>void;bump:()=>void};
export const useStore=create<S>()(persist((set)=>({muted:false,night:false,chaos:false,visits:1203,name:'',best:0,wishes:['⭐ Pip: please dream of a very large cloud.'],
toggle:k=>set(s=>({[k]:!s[k]}) as Partial<S>),setName:name=>set({name}),setBest:best=>set({best}),wish:w=>set(s=>({wishes:[...s.wishes,w].slice(-40)})),bump:()=>set(s=>({visits:s.visits+1}))}),
{name:'pip-store',partialize:s=>({muted:s.muted,visits:s.visits,name:s.name,best:s.best,wishes:s.wishes})}));
export const toast=(m:string)=>window.dispatchEvent(new CustomEvent('pip-toast',{detail:m}));
