import {ReactNode,forwardRef,useState} from 'react';import {toast} from '../lib/store';
export const Win=forwardRef<HTMLElement,{id?:string;title:string;children:ReactNode}>(({id,title,children},ref)=>{const [min,setMin]=useState(false);
return <section className={'win'+(min?' min':'')} id={id} ref={ref}><div className="tb"><span>{title}</span>
<button aria-label={min?'Restore window':'Minimize window'} onClick={()=>setMin(m=>!m)}>_</button><button aria-label="Restore window" onClick={()=>setMin(false)}>□</button>
<button aria-label="Close window" onClick={()=>toast("Pip says: you can't close this one, it's my favourite window!")}>x</button></div><div className="wbody">{children}</div></section>});
