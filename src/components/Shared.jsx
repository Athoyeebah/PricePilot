import { useEffect } from 'react';

// ─── STYLE TOKENS ─────────────────────────────────────────────────────────────
export const S = {
  card: {
    background: '#141414',
    border: '1px solid #1e1e1e',
    borderRadius: 14,
    padding: '26px 26px',
    marginBottom: 18,
  },
  pill: (on, color = '#f5c842') => ({
    background: on ? `${color}14` : '#0d0d0d',
    border: `1.5px solid ${on ? color : '#222'}`,
    borderRadius: 10,
    padding: '13px 14px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all .18s',
    color: '#f0f0f0',
  }),
  input: {
    background: '#0d0d0d',
    border: '1px solid #252525',
    borderRadius: 8,
    padding: '10px 13px',
    color: '#f0f0f0',
    fontFamily: "'DM Mono', monospace",
    fontSize: 13,
    outline: 'none',
    width: '100%',
    transition: 'border-color .2s',
  },
  btnPrimary: {
    background: '#f5c842',
    border: 'none',
    borderRadius: 8,
    color: '#000',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 12,
    padding: '10px 24px',
    cursor: 'pointer',
  },
  btnGhost: {
    background: 'transparent',
    border: '1px solid #2a2a2a',
    borderRadius: 8,
    color: '#888',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 12,
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

// ─── CARD TITLE ───────────────────────────────────────────────────────────────
export function CardTitle({ icon, children, badge }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 20, color: '#f0f0f0' }}>
      <span>{icon}</span>
      <span>{children}</span>
      {badge && (
        <span style={{ background: 'rgba(78,205,196,.12)', border: '1px solid rgba(78,205,196,.25)', color: '#4ecdc4', borderRadius: 4, padding: '2px 8px', fontSize: 9, letterSpacing: '.06em', fontFamily: "'DM Mono', monospace" }}>
          {badge}
        </span>
      )}
    </div>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────
export function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid #1e1e1e', marginBottom: 20, overflowX: 'auto' }}>
      {tabs.map(([id, label]) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          style={{
            background: 'none', border: 'none', padding: '8px 15px',
            borderBottom: `2px solid ${active === id ? '#f5c842' : 'transparent'}`,
            color: active === id ? '#f5c842' : '#555',
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: -1, transition: 'all .2s',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── NAV BUTTONS ──────────────────────────────────────────────────────────────
export function NavBtns({ onBack, onNext, nextLabel = 'Continue →', disabled, left }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 26, gap: 10 }}>
      <div>{left}</div>
      <div style={{ display: 'flex', gap: 10 }}>
        {onBack && <button style={S.btnGhost} onClick={onBack}>← Back</button>}
        {onNext && (
          <button
            style={{ ...S.btnPrimary, opacity: disabled ? 0.35 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
            onClick={disabled ? undefined : onNext}
            disabled={disabled}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
export function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24,
      background: '#1a1a1a', border: '1px solid #2a2a2a',
      borderRadius: 10, padding: '12px 18px', fontSize: 12,
      color: '#f0f0f0', boxShadow: '0 8px 32px rgba(0,0,0,.6)',
      zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8,
      animation: 'fadeup .3s ease',
    }}>
      ✅ {msg}
    </div>
  );
}
