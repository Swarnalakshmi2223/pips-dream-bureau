import { useEffect, useRef, useState } from 'react';

// Original simple melody (Hz). 0 = rest.
const MELODY = [523.25, 659.25, 783.99, 659.25, 587.33, 659.25, 523.25, 392.0,
                440.0, 523.25, 659.25, 587.33, 523.25, 440.0, 392.0, 0];
const VOLUME = 0.25;

export default function useLullaby() {
  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const timerRef = useRef(null);
  const stepRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const ensureContext = () => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = muted ? 0 : VOLUME;
      master.connect(ctx.destination);
      ctxRef.current = ctx;
      masterRef.current = master;
    }
    return ctxRef.current;
  };

  const playNote = (freq) => {
    if (!freq || !ctxRef.current) return;
    const ctx = ctxRef.current;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    const t = ctx.currentTime;
    osc.type = 'triangle';
    osc.frequency.value = freq;
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.6, t + 0.02);
    env.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
    osc.connect(env);
    env.connect(masterRef.current);
    osc.start(t);
    osc.stop(t + 1);
  };

  const play = async () => {
    const ctx = ensureContext();
    await ctx.resume();
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      playNote(MELODY[stepRef.current % MELODY.length]);
      stepRef.current += 1;
    }, 550);
    setPlaying(true);
  };

  const pause = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setPlaying(false);
  };

  const toggle = () => (playing ? pause() : play());
  const toggleMute = () => setMuted((m) => !m);

  // Apply mute state to the audio graph
  useEffect(() => {
    if (masterRef.current) masterRef.current.gain.value = muted ? 0 : VOLUME;
  }, [muted]);

  // Cleanup on unmount
  useEffect(() => () => {
    clearInterval(timerRef.current);
    ctxRef.current?.close();
  }, []);

  return { playing, muted, toggle, toggleMute };
}