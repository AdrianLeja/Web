export default function Toast({ message }) {
  return (
    <div className="glass-panel animate-fade-in" style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      padding: '1rem 2rem',
      backgroundColor: 'var(--bg-card)',
      zIndex: 2000,
      borderLeft: '4px solid var(--primary)'
    }}>
      {message}
    </div>
  );
}
