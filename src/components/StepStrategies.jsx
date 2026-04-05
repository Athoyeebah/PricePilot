import { useState } from 'react';
import { STRATEGIES, PSYCH_TACTICS } from '../data';
import { S, CardTitle, Tabs, NavBtns } from './Shared';

export function StepStrategies({ industry, product, selected, setSelected, onBack, onNext }) {
  const [tab, setTab] = useState('rec');
  const recommended = Object.keys(STRATEGIES).filter((k) => STRATEGIES[k].best?.includes(industry));
  const toggle = (s) => setSelected((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  return (
    <div style={S.card}>
      <CardTitle icon="🎯" badge="AI PICK">Strategy Selection</CardTitle>
      <Tabs
        tabs={[['rec', '✨ Recommended'], ['all', '📋 All Strategies'], ['psych', '🧠 Psychological'], ['guides', '📖 Guides']]}
        active={tab}
        onChange={setTab}
      />

      {/* RECOMMENDED */}
      {tab === 'rec' && (
        <div>
          <div style={{ fontSize: 10, color: '#444', marginBottom: 13, letterSpacing: '.06em' }}>
            TOP PICKS FOR {industry?.toUpperCase()} · {product?.toUpperCase()}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(165px,1fr))', gap: 9 }}>
            {recommended.map((s) => {
              const st = STRATEGIES[s]; const on = selected.includes(s);
              return (
                <button key={s} style={S.pill(on)} onClick={() => toggle(s)}>
                  <div style={{ fontSize: 18, marginBottom: 6 }}>{st.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: on ? '#f5c842' : '#ddd', fontFamily: "'Syne', sans-serif" }}>{s}</div>
                  <div style={{ fontSize: 9, color: '#555', marginTop: 4, lineHeight: 1.45 }}>{st.desc.slice(0, 55)}…</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ALL */}
      {tab === 'all' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px,1fr))', gap: 9 }}>
          {Object.keys(STRATEGIES).map((s) => {
            const st = STRATEGIES[s]; const on = selected.includes(s); const rec = recommended.includes(s);
            return (
              <button key={s} style={{ ...S.pill(on), ...(rec && !on ? { borderColor: 'rgba(245,200,66,.22)' } : {}) }} onClick={() => toggle(s)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18 }}>{st.icon}</span>
                  {rec && <span style={{ fontSize: 8, background: 'rgba(245,200,66,.14)', color: '#f5c842', padding: '1px 5px', borderRadius: 3 }}>REC</span>}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: on ? '#f5c842' : '#ddd', marginTop: 6, fontFamily: "'Syne', sans-serif" }}>{s}</div>
              </button>
            );
          })}
        </div>
      )}

      {/* PSYCHOLOGICAL */}
      {tab === 'psych' && (
        <div>
          {PSYCH_TACTICS.map((pt) => (
            <div key={pt.id} style={{ background: '#0d0d0d', border: '1px solid #1e1e1e', borderLeft: '3px solid #4ecdc4', borderRadius: '0 9px 9px 0', padding: '13px 16px', marginBottom: 10 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: '#4ecdc4' }}>{pt.icon} {pt.name}</div>
              <div style={{ fontSize: 9, color: '#444', margin: '3px 0 6px' }}>e.g. {pt.example}</div>
              <div style={{ fontSize: 11, color: '#777', lineHeight: 1.65 }}>{pt.desc}</div>
            </div>
          ))}
          <button
            onClick={() => toggle('Psychological')}
            style={{
              ...S.btnGhost,
              ...(selected.includes('Psychological') ? { background: '#f5c842', color: '#000', border: 'none' } : { borderColor: '#f5c842', color: '#f5c842' }),
              marginTop: 6,
            }}
          >
            🧠 {selected.includes('Psychological') ? '✓ Added' : 'Add Psychological Pricing'}
          </button>
        </div>
      )}

      {/* GUIDES */}
      {tab === 'guides' && (
        <div>
          {selected.length === 0 && (
            <div style={{ textAlign: 'center', color: '#333', fontSize: 12, padding: '32px 0' }}>Select strategies first.</div>
          )}
          {selected.map((s) => {
            const st = STRATEGIES[s];
            return (
              <div key={s} style={{ background: '#0d0d0d', borderLeft: '3px solid #f5c842', borderRadius: '0 9px 9px 0', padding: '14px 16px', marginBottom: 12 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{st.icon} {s}</div>
                <div style={{ fontSize: 11, color: '#888', lineHeight: 1.7, marginBottom: 10 }}>{st.desc}</div>
                <div>
                  {st.tips.map((t, i) => (
                    <span key={i} style={{ display: 'inline-block', background: '#1a1a1a', border: '1px solid #222', borderRadius: 4, padding: '2px 9px', fontSize: 9, color: '#555', margin: 2 }}>
                      💡 {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <NavBtns onBack={onBack} onNext={onNext} disabled={selected.length === 0} nextLabel={`Calculate (${selected.length}) →`} />
    </div>
  );
}
