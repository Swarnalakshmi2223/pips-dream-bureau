export default function ControlBar({ lullaby, theme, onToggleTheme }) {
  return (
    <div className="control-bar" role="toolbar" aria-label="Site controls">
      <button onClick={lullaby.toggle} aria-pressed={lullaby.playing}>
        {lullaby.playing ? '⏸ Pause lullaby' : '▶ Play lullaby'}
      </button>
      <button onClick={lullaby.toggleMute} aria-pressed={lullaby.muted}>
        {lullaby.muted ? '🔇 Unmute' : '🔊 Mute'}
      </button>
      <button onClick={onToggleTheme} aria-pressed={theme === 'night'}>
        {theme === 'night' ? '☀️ Day mode' : '🌙 Night mode'}
      </button>
    </div>
  );
}