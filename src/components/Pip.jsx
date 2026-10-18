import { useEffect, useRef, useState } from 'react';

export default function Pip({ onSecret }) {
  const svgRef = useRef(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [taps, setTaps] = useState(0);
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      const el = svgRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const strength = (Math.min(dist, 220) / 220) * 9;
      setLook({ x: (dx / dist) * strength, y: (dy / dist) * strength });
      setMoved(true);
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  const tapStar = () => {
    const next = taps + 1;
    setTaps(next);
    if (next >= 3) {
      setTaps(0);
      onSecret();
    }
  };

  // If no pointer has moved yet (e.g., touch phones), eyes wander gently via CSS.
  const idleClass = moved ? '' : 'idle-look';

  return (
    <svg ref={svgRef} className="pip" viewBox="0 0 200 240" role="img"
         aria-label="Pip, a friendly baby with a round skull face and a starry nightcap, sitting on a cloud">
      {/* cloud */}
      <g fill="#fff" opacity="0.95">
        <ellipse cx="100" cy="212" rx="78" ry="20" />
        <circle cx="52" cy="204" r="18" />
        <circle cx="150" cy="204" r="20" />
        <circle cx="100" cy="196" r="22" />
      </g>
      {/* head */}
      <circle cx="100" cy="122" r="68" fill="#fdf3e3" stroke="#3b2f5c" strokeWidth="4" />
      {/* cheeks */}
      <circle cx="52" cy="140" r="9" fill="#ffb3c7" opacity="0.7" />
      <circle cx="148" cy="140" r="9" fill="#ffb3c7" opacity="0.7" />
      {/* eye sockets */}
      <ellipse cx="72" cy="116" rx="19" ry="23" fill="#2a2147" />
      <ellipse cx="128" cy="116" rx="19" ry="23" fill="#2a2147" />
      {/* glowing pupils */}
      <g className={idleClass} style={{ transform: `translate(${look.x}px, ${look.y}px)`, transition: 'transform 0.08s linear' }}>
        <circle cx="72" cy="116" r="6" fill="#ffe97a" className="glow" />
        <circle cx="128" cy="116" r="6" fill="#ffe97a" className="glow" />
      </g>
      {/* nose + crooked smile */}
      <path d="M95 142 L105 142 L100 152 Z" fill="#2a2147" />
      <path d="M78 164 Q98 178 124 160" fill="none" stroke="#2a2147" strokeWidth="4" strokeLinecap="round" />
      {/* nightcap */}
      <path d="M32 82 Q100 -20 168 82 Q100 62 32 82 Z" fill="#4b3d8f" stroke="#3b2f5c" strokeWidth="4" />
      <rect x="30" y="76" width="140" height="14" rx="7" fill="#ffb3c7" stroke="#3b2f5c" strokeWidth="3" />
      {/* tiny bow */}
      <g fill="#ff7aa2" stroke="#3b2f5c" strokeWidth="2">
        <path d="M150 74 L170 62 L170 86 Z" />
        <path d="M150 74 L130 62 L130 86 Z" />
        <circle cx="150" cy="74" r="5" />
      </g>
      {/* secret star: tap it 3 times (keyboard: Enter/Space) */}
      <g role="button" tabIndex={0} aria-label="Pip's cap star. A curious visitor might tap it a few times."
         className="cap-star" onClick={tapStar}
         onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tapStar(); } }}>
        <polygon points="100,18 106,34 123,34 109,44 114,60 100,50 86,60 91,44 77,34 94,34" fill="#ffe97a" stroke="#3b2f5c" strokeWidth="3" />
      </g>
    </svg>
  );
}