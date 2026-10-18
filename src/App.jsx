import { useEffect, useState } from 'react';
import Pip from './components/Pip';
import ControlBar from './components/ControlBar';
import Projects from './components/Projects';
import Story from './components/Story';
import Credits from './components/Credits';
import useLullaby from './hooks/useLullaby';

export default function App() {
  const [theme, setTheme] = useState('night');
  const [secret, setSecret] = useState(false);
  const lullaby = useLullaby();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <a href="#projects" className="skip-link">Skip to projects</a>
      <div className="sky" aria-hidden="true" />
      <ControlBar lullaby={lullaby} theme={theme}
                  onToggleTheme={() => setTheme((t) => (t === 'night' ? 'day' : 'night'))} />
      <main>
        <section className="hero">
          <div className="hero-text">
            <p className="badge">Midnight Nursery · Est. 2026</p>
            <h1>Pip's Dream Bureau</h1>
            <p className="tagline">“I build the dreams you fall asleep inside.”</p>
            <p>
              Hi! I'm Pip, a baby with a skull face and a very big heart. I'm a Junior Dream
              Engineer. I make lullabies, nightlights and bedtime dreams for the neighbourhood.
            </p>
            <p className="hint">Move your mouse (or drag a finger) and watch my eyes. Psst: my cap star is curious.</p>
          </div>
          <Pip onSecret={() => setSecret(true)} />
        </section>

        {secret && (
          <div className="secret" role="status">
            <p>🎉 You found Pip's secret! Pip says: "Sweet dreams, curious friend."</p>
            <button onClick={() => setSecret(false)}>Close</button>
          </div>
        )}

        <Projects lullaby={lullaby} />
        <Story />
      </main>
      <Credits />
    </>
  );
}