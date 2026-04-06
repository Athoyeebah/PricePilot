import { useState } from 'react';
import { STRATEGIES, MARKET_DATA, ALERTS } from '../data';
import { calcPrice, marginPct, profitUnit, mColor } from '../utils';
import { S, CardTitle, Tabs, NavBtns } from './Shared';

export function StepCalculate({ industry, product, selected, saved, addSaved, onBack, onNext }) {
  const [tab, setTab] = useState('cost');
  const [cost, setCost] = useState('');
  const [markup, setMarkup] = useState('30');
  const [competitors, setCompetitors] = useState(['', '', '']);
  const [bundleItems, setBundleItems] = useState([{ name: '', cost: '' }]);
  const [names, setNames] = useState({});

  const market = MARKET_DATA[industry];
  const alerts = ALERTS[industry] || [];
  const validComps = competitors.filter((c) => parseFloat(c) > 0).map(Number);
  const avgComp = validComps.length > 0 ? validComps.reduce((a, b) => a + b, 0) / validComps.length : null;
  const bundleTotal = bundleItems.reduce((a, i) => a + (parseFloat(i.cost) || 0), 0);

  const saveScenario = (s) => {
    const price = calcPrice(s, cost, markup, validComps);
    if (!price) return;
    addSaved({
      id: Date.now(),
      name: names[s] || `${product} — ${s}`,
      strategy: s, industry, product,
      cost: parseFloat(cost),
      price: price.toFixed(2),
      margin: marginPct(price, parseFloat(cost)),
      profit: profitUnit(price, parseFloat(cost)),
      timestamp: new Date().toISOString(),
    });
  };

  const alreadySaved = (s) => saved.some((sc) => sc.strategy === s && sc.cost === parseFloat(cost));

  const inputFocus = (e) => (e.target.style.borderColor = '#f5c842');
  const inputBlur = (e) => (e.target.style.borderColor = '#252525');

  return (
    <div>
      {/* Alerts */}
      {alerts.length > 0 && (
        <div style={S.card}>
          <CardTitle icon="🔔">
            Market Alerts{' '}
            <span style={{ display: 'inline-block', background: 'rgba(255,91,91,.12)', border: '1px solid rgba(255,91,91,.25)', color: '#ff5b5b', borderRadius: 4, padding: '2px 8px', fontSize: 9, marginLeft: 8 }}>
              LIVE
            </span>
          </CardTitle>
          {alerts.map((a, i) => (
            <div key={i} style={{ background: 'rgba(255,107,53,.07)', border: '1px solid rgba(255,107,53,.2)', borderRadius: 8, padding: '11px 14px', marginBottom: 9, fontSize: 11, color: '#ff9a70', display: 'flex', gap: 9 }}>
              <span>⚡</span><span>{a}</span>
            </div>
          ))}
        </div>
      )}

      {/* Inputs Card */}
      <div style={{ ...S.card, border: '1px solid rgba(245,200,66,.18)' }}>
        <CardTitle icon="🧮">Pricing Inputs</CardTitle>
        <Tabs
          tabs={[['cost', '📥 Cost & Markup'], ['competitors', '🎯 Competitors'], ['bundle', '📦 Bundle Builder']]}
          active={tab}
          onChange={setTab}
        />

        {/* COST TAB */}
        {tab === 'cost' && (
          <div>
            {market && (
              <div style={{ background: 'rgba(245,200,66,.05)', border: '1px solid rgba(245,200,66,.13)', borderRadius: 9, padding: '12px 16px', marginBottom: 16, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ fontSize: 10, color: '#f5c842', letterSpacing: '.06em' }}>MARKET DATA<br /><span style={{ color: '#444' }}>{industry}</span></div>
                {[['LOW', market.low, '#4ecdc4'], ['AVG', market.avg, '#f5c842'], ['HIGH', market.high, '#ff6b35']].map(([l, v, c]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 9, color: '#444', letterSpacing: '.06em' }}>{l}</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: c }}>${v}</div>
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: 9, color: '#444' }}>YoY TREND</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: market.trend.startsWith('+') ? '#6fcf97' : '#ff5b5b' }}>{market.trend}</div>
                </div>
              </div>
            )}
            {market && (
              <div style={{ background: 'rgba(78,205,196,.04)', border: '1px solid rgba(78,205,196,.13)', borderRadius: 8, padding: '12px 15px', marginBottom: 16, fontSize: 11, color: '#aaa', lineHeight: 1.7 }}>
                <strong style={{ color: '#4ecdc4' }}>💡 AI Insight:</strong> {market.insight}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[['UNIT COST ($)', cost, setCost, 'e.g. 25.00'], ['TARGET MARKUP (%)', markup, setMarkup, 'e.g. 30']].map(([label, val, setter, ph]) => (
                <div key={label}>
                  <div style={{ fontSize: 10, color: '#444', letterSpacing: '.06em', marginBottom: 6 }}>{label}</div>
                  <input style={S.input} type="number" min="0" placeholder={ph} value={val} onChange={(e) => setter(e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMPETITORS TAB */}
        {tab === 'competitors' && (
          <div>
            <div style={{ fontSize: 11, color: '#666', marginBottom: 16, lineHeight: 1.7 }}>
              Enter up to 3 competitor prices. Used to calculate <strong style={{ color: '#f5c842' }}>Competitor-Based</strong> pricing as avg + 2%.
            </div>
            {competitors.map((c, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: '#444', letterSpacing: '.06em', marginBottom: 5 }}>COMPETITOR {i + 1} PRICE ($)</div>
                <input
                  style={S.input} type="number" min="0" placeholder="e.g. 49.99" value={c}
                  onChange={(e) => { const n = [...competitors]; n[i] = e.target.value; setCompetitors(n); }}
                  onFocus={inputFocus} onBlur={inputBlur}
                />
              </div>
            ))}
            {avgComp && (
              <div style={{ background: 'rgba(78,205,196,.07)', border: '1px solid rgba(78,205,196,.2)', borderRadius: 8, padding: '11px 15px', fontSize: 11 }}>
                <span style={{ color: '#4ecdc4' }}>Avg competitor price:</span>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: '#f5c842', marginLeft: 10 }}>${avgComp.toFixed(2)}</span>
                <span style={{ color: '#555', marginLeft: 8, fontSize: 10 }}>→ Your price: ${(avgComp * 1.02).toFixed(2)}</span>
              </div>
            )}
          </div>
        )}

        {/* BUNDLE TAB */}
        {tab === 'bundle' && (
          <div>
            <div style={{ fontSize: 11, color: '#666', marginBottom: 14, lineHeight: 1.7 }}>
              Add individual items to your bundle. Use the total as your cost for Bundle Pricing.
            </div>
            {bundleItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                <input style={{ ...S.input, flex: 2 }} placeholder={`Item ${i + 1} name`} value={item.name}
                  onChange={(e) => { const n = [...bundleItems]; n[i] = { ...n[i], name: e.target.value }; setBundleItems(n); }} />
                <input style={{ ...S.input, flex: 1 }} type="number" placeholder="Cost $" value={item.cost}
                  onChange={(e) => { const n = [...bundleItems]; n[i] = { ...n[i], cost: e.target.value }; setBundleItems(n); }} />
                {bundleItems.length > 1 && (
                  <button onClick={() => setBundleItems((p) => p.filter((_, j) => j !== i))}
                    style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: 14 }}>✕</button>
                )}
              </div>
            ))}
            <button onClick={() => setBundleItems((p) => [...p, { name: '', cost: '' }])}
              style={{ background: 'none', border: '1px dashed #2a2a2a', borderRadius: 7, color: '#555', fontSize: 11, padding: '8px 16px', cursor: 'pointer', marginBottom: 14 }}>
              + Add Item
            </button>
            {bundleTotal > 0 && (
              <div style={{ background: 'rgba(245,200,66,.06)', border: '1px solid rgba(245,200,66,.18)', borderRadius: 8, padding: '11px 15px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <span style={{ color: '#666' }}>Bundle total cost:</span>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: '#f5c842' }}>${bundleTotal.toFixed(2)}</span>
                <button onClick={() => { setCost(bundleTotal.toFixed(2)); setTab('cost'); }}
                  style={{ ...S.btnPrimary, fontSize: 10, padding: '5px 12px' }}>USE AS COST</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {cost && parseFloat(cost) > 0 && (
        <div>
          <div style={{ fontSize: 10, color: '#333', letterSpacing: '.1em', marginBottom: 14 }}>
                {/* LIVE PRICE COMPARISON — {selected.length} STRATEGIES */}
            
          </div>
          {selected.map((s) => {
            const price = calcPrice(s, cost, markup, validComps);
            const m = marginPct(price, parseFloat(cost));
            const pr = profitUnit(price, parseFloat(cost));
            const st = STRATEGIES[s];
            const done = alreadySaved(s);
            return (
              <div key={s} style={{ background: '#101010', border: '1px solid #1a1a1a', borderRadius: 12, padding: '17px 18px', marginBottom: 10, display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <span style={{ fontSize: 16 }}>{st.icon}</span>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13 }}>{s}</span>
                    {s === 'Competitor-Based' && validComps.length > 0 && (
                      <span style={{ background: 'rgba(255,107,53,.1)', border: '1px solid rgba(255,107,53,.25)', borderRadius: 5, padding: '2px 8px', fontSize: 9, color: '#ff9a70' }}>
                        {validComps.length} comp price{validComps.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 10, color: '#555', marginBottom: 12, lineHeight: 1.55 }}>{st.desc}</div>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    {[['PRICE', price != null ? `$${price.toFixed(2)}` : '—', '#f5c842'], ['MARGIN', `${m}%`, mColor(m)], ['PROFIT/UNIT', `$${pr}`, '#4ecdc4']].map(([l, v, c]) => (
                      <div key={l}>
                        <div style={{ fontSize: 9, color: '#444', letterSpacing: '.06em' }}>{l}</div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: c }}>{v}</div>
                      </div>
                    ))}
                    {avgComp && s === 'Competitor-Based' && (
                      <div>
                        <div style={{ fontSize: 9, color: '#444', letterSpacing: '.06em' }}>VS AVG COMP</div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, color: price > avgComp ? '#6fcf97' : '#ff5b5b' }}>
                          {price > avgComp ? '▲' : '▼'}{Math.abs(((price - avgComp) / avgComp) * 100).toFixed(1)}%
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    placeholder="Scenario name (optional)"
                    value={names[s] || ''}
                    onChange={(e) => setNames((p) => ({ ...p, [s]: e.target.value }))}
                    style={{ ...S.input, marginTop: 12, maxWidth: 265, padding: '7px 11px', fontSize: 11, color: '#666' }}
                  />
                </div>
                <button
                  onClick={() => !done && saveScenario(s)}
                  style={{ background: done ? 'rgba(78,205,196,.1)' : '#f5c842', border: done ? '1px solid rgba(78,205,196,.3)' : 'none', borderRadius: 8, color: done ? '#4ecdc4' : '#000', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11, padding: '10px 14px', cursor: done ? 'default' : 'pointer', whiteSpace: 'nowrap' }}
                >
                  {done ? '✓ Saved' : '💾 Save'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      <NavBtns onBack={onBack} onNext={onNext} nextLabel="View Scenarios →" />
    </div>
  );
}
