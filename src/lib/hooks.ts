import {useEffect,useRef,useState,RefObject} from 'react';
export function useSeen(ref:RefObject<Element>,t=.4){const [s,set]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){set(true);io.disconnect()}},{threshold:t});io.observe(el);return()=>io.disconnect()},[]);return s}
export function useInterval(fn:()=>void,ms:number|null){const f=useRef(fn);f.current=fn;useEffect(()=>{if(ms==null)return;const id=setInterval(()=>f.current(),ms);return()=>clearInterval(id)},[ms])}
