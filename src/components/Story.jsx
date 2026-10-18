import useReveal from '../hooks/useReveal';

const SCENES = [
  { icon: '🌌', title: 'Scene 1: A quiet night', text: 'The Midnight Nursery was too quiet. Little ghosts and creatures could not fall asleep.' },
  { icon: '🔧', title: 'Scene 2: A tiny toolbox', text: 'Pip found a toolbox full of star dust, ribbons and tiny gears. Pip had an idea.' },
  { icon: '🎶', title: 'Scene 3: The first lullaby', text: 'Pip built a music box. One by one, the neighbourhood began to yawn.' },
  { icon: '💤', title: 'Scene 4: Dream Engineer', text: 'Now Pip designs dreams every night. "I build the dreams you fall asleep inside."' },
];

function Scene({ scene, index }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`scene ${visible ? 'visible' : ''} ${index % 2 ? 'right' : ''}`}>
      <div className="scene-icon" aria-hidden="true">{scene.icon}</div>
      <div>
        <h3>{scene.title}</h3>
        <p>{scene.text}</p>
      </div>
    </div>
  );
}

export default function Story() {
  return (
    <section id="story" className="section">
      <h2>Pip's Story</h2>
      {SCENES.map((s, i) => <Scene key={s.title} scene={s} index={i} />)}
    </section>
  );
}