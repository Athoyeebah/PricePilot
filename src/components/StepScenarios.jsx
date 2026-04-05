import { useState } from 'react';
import { exportCSV, exportJSON, exportTXT, mColor } from '../utils';
import { S, Tabs, NavBtns } from './Shared';

export function StepScenarios({ saved, delSaved, clearAll, onBack, onRestart }) {
  const [view, setView] = useState('list');
  const best = saved.length > 1 ? saved.reduce((a, b) => (parseFloat(a.margin) > parseFloat(b.margin) ? a : b)) : null;
  const sorted = [...saved].sort((a, b) => parseFloat(b.margin) - parseFloat(a.margin));

  return (
    <div style={S.card}>
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
          📊 Saved Scenarios{' '}
          <span style={{ fontSize: 11, color: '#444', fontWeight: 400 }}>({saved.length})</span>
        </div>
        {saved.length > 0 && (
          <div style={{ display: 'flex', gap: 7 }}>
            {[['📄 CSV', () => exportCSV(saved)], ['📦 JSON', () => exportJSON(saved)], ['📝 TXT', () => exportTXT(saved)]].map(([label, fn]) => (
              <button
                key={label}
                onClick={fn}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#0d0d0d', border: '1px solid #252525', borderRadius: 7, padding: '8px 14px', fontSize: 11, color: '#777', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Storage Notice */}
      <div style={{ background: 'rgba(78,205,196,.04)', border: '1px solid rgba(78,205,196,.13)', borderRadius: 8, padding: '9px 14px', marginBottom: 18, fontSize: 10, color: '#4ecdc4', display: 'flex', gap: 8 }}>
        <span>💾</span>
        <span>Scenarios are <strong>auto-saved to your browser</strong> and persist across visits. Export to keep a permanent copy.</span>
      </div>

      {/* Empty State */}
      {saved.length === 0 && (
        <div style={{ textAlign: 'center', padding: '44px 0', color: '#333' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 12 }}>No scenarios saved yet.</div>
          <div style={{ fontSize: 10, color: '#222', marginTop: 6 }}>Go back to Calculate and save strategies.</div>
        </div>
      )}

      {/* Best Margin Banner */}
      {best && (
        <div style={{ background: 'rgba(111,207,151,.06)', border: '1px solid rgba(111,207,151,.18)', borderRadius: 9, padding: '11px 16px', marginBottom: 18, fontSize: 11 }}>
          🏆 <strong style={{ color: '#6fcf97' }}>Best Margin:</strong>
          <span style={{ color: '#666', marginLeft: 8 }}>
            {best.strategy} — <strong style={{ color: '#6fcf97' }}>{best.margin}%</strong> → ${best.price}
          </span>
        </div>
      )}

      {/* View Tabs */}
      {saved.length > 0 && (
        <Tabs tabs={[['list', '📋 List'], ['compare', '📊 Compare'], ['table', '📑 Table']]} active={view} onChange={setView} />
      )}

      {/* LIST VIEW */}
      {view === 'list' && saved.map((sc) => (
        <div key={sc.id} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 10, padding: '13px 16px', marginBottom: 9, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13 }}>{sc.name}</div>
            <div style={{ fontSize: 10, color: '#444', marginTop: 2 }}>{sc.strategy} · {sc.industry} / {sc.product} · Cost: ${sc.cost}</div>
            {sc.timestamp && <div style={{ fontSize: 9, color: '#333', marginTop: 1 }}>{new Date(sc.timestamp).toLocaleDateString()}</div>}
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: '#f5c842' }}>${sc.price}</div>
              <div style={{ fontSize: 10, color: mColor(sc.margin) }}>▲ {sc.margin}% · +${sc.profit}</div>
            </div>
            <button
              onClick={() => delSaved(sc.id)}
              style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer', fontSize: 15, padding: '4px 8px' }}
              onMouseEnter={(e) => (e.target.style.color = '#ff5b5b')}
              onMouseLeave={(e) => (e.target.style.color = '#333')}
            >✕</button>
          </div>
        </div>
      ))}

      {/* COMPARE VIEW */}
      {view === 'compare' && saved.length > 0 && (
        <div>
          <div style={{ fontSize: 10, color: '#333', letterSpacing: '.07em', marginBottom: 14 }}>MARGIN COMPARISON — HIGH TO LOW</div>
          {sorted.map((sc) => (
            <div key={sc.id} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: '#888' }}>{sc.strategy} <span style={{ color: '#333', fontSize: 9 }}>({sc.name})</span></span>
                <span style={{ color: mColor(sc.margin) }}>{sc.margin}% · <span style={{ color: '#f5c842' }}>${sc.price}</span></span>
              </div>
              <div style={{ height: 7, background: '#141414', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(parseFloat(sc.margin), 100)}%`, background: mColor(sc.margin), borderRadius: 4, transition: 'width .7s ease' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {view === 'table' && saved.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
            <thead>
              <tr>
                {['Name', 'Strategy', 'Cost', 'Price', 'Margin', 'Profit', 'Date'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', color: '#333', fontSize: 9, letterSpacing: '.06em', padding: '7px 10px', borderBottom: '1px solid #1a1a1a' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((sc) => (
                <tr key={sc.id}>
                  <td style={{ padding: '9px 10px', borderBottom: '1px solid #141414', color: '#f0f0f0' }}>{sc.name}</td>
                  <td style={{ padding: '9px 10px', borderBottom: '1px solid #141414', color: '#666' }}>{sc.strategy}</td>
                  <td style={{ padding: '9px 10px', borderBottom: '1px solid #141414' }}>${sc.cost}</td>
                  <td style={{ padding: '9px 10px', borderBottom: '1px solid #141414', color: '#f5c842', fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>${sc.price}</td>
                  <td style={{ padding: '9px 10px', borderBottom: '1px solid #141414', color: mColor(sc.margin) }}>{sc.margin}%</td>
                  <td style={{ padding: '9px 10px', borderBottom: '1px solid #141414', color: '#4ecdc4' }}>${sc.profit}</td>
                  <td style={{ padding: '9px 10px', borderBottom: '1px solid #141414', color: '#333', fontSize: 9 }}>{sc.timestamp ? new Date(sc.timestamp).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NavBtns
        onBack={onBack}
        left={
          <div style={{ display: 'flex', gap: 8 }}>
            {saved.length > 0 && (
              <button style={{ ...S.btnGhost, fontSize: 11, padding: '8px 16px' }} onClick={clearAll}>🗑 Clear All</button>
            )}
            <button style={{ ...S.btnGhost, fontSize: 11, padding: '8px 16px' }} onClick={onRestart}>🔄 New Session</button>
          </div>
        }
      />
    </div>
  );
}
