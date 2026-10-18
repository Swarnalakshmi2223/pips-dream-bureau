import { useState } from 'react';
import Window from './Window';

const LAMPS = [
  { id: 'moon', label: 'Crescent Moon Lamp', emoji: '🌙' },
  { id: 'star', label: 'Star Jar Lantern', emoji: '⭐' },
  { id: 'cloud', label: 'Cloud Glow Light', emoji: '☁️' },
];

const SKILLS = [
  { name: 'Lullaby Writing', cm: 90 },
  { name: 'Nightlight Wiring', cm: 75 },
  { name: 'Staying Awake', cm: 20 },
];

export default function Projects({ lullaby }) {
  const [lit, setLit] = useState({});
  const toggleLamp = (id) => setLit((s) => ({ ...s, [id]: !s[id] }));

  return (
    <section id="projects" className="section">
      <h2>Pip's Projects</h2>
      <div className="grid">
        <Window title="lullaby_lab.exe">
          <p>A tiny music box Pip built from triangle waves. Press play and it hums by itself.</p>
          <button className="primary" onClick={lullaby.toggle} aria-pressed={lullaby.playing}>
            {lullaby.playing ? '⏸ Pause music box' : '▶ Wind the music box'}
          </button>
        </Window>

        <Window title="nightlights.gif">
          <p>Tap a lamp to switch it on.</p>
          <div className="lamps">
            {LAMPS.map((l) => (
              <button key={l.id} className={`lamp ${lit[l.id] ? 'on' : ''}`}
                      onClick={() => toggleLamp(l.id)} aria-pressed={!!lit[l.id]} aria-label={l.label}>
                <span aria-hidden="true">{l.emoji}</span>
              </button>
            ))}
          </div>
        </Window>

        <Window title="growth_chart.html">
          <p>Pip's skills, measured like a nursery wall.</p>
          <ul className="chart">
            {SKILLS.map((s) => (
              <li key={s.name}>
                <span>{s.name}</span>
                <div className="bar" role="img" aria-label={`${s.name}: ${s.cm} centimetres`}>
                  <div style={{ width: `${s.cm}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Window>
      </div>
    </section>
  );
}