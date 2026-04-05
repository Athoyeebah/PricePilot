import { INDUSTRIES, PRODUCTS } from '../data';
import { S, CardTitle, NavBtns } from './Shared';

// ─── STEP 1: INDUSTRY ────────────────────────────────────────────────────────
export function StepIndustry({ industry, setIndustry, onNext }) {
  return (
    <div style={S.card}>
      <CardTitle icon="🏢">Select Your Business Industry</CardTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px,1fr))', gap: 9 }}>
        {INDUSTRIES.map((ind) => (
          <button key={ind.id} style={S.pill(industry === ind.id, ind.color)} onClick={() => setIndustry(ind.id)}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{ind.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 500, color: industry === ind.id ? ind.color : '#bbb' }}>{ind.name}</div>
          </button>
        ))}
      </div>
      <NavBtns onNext={onNext} disabled={!industry} nextLabel="Choose Product →" />
    </div>
  );
}

// ─── STEP 2: PRODUCT ─────────────────────────────────────────────────────────
export function StepProduct({ industry, indData, product, setProduct, onBack, onNext }) {
  return (
    <div style={S.card}>
      <CardTitle icon="📦">Choose Your Product / Service</CardTitle>
      {indData && (
        <div style={{ background: `${indData.color}10`, border: `1px solid ${indData.color}28`, borderRadius: 8, padding: '9px 14px', marginBottom: 18, fontSize: 11, color: indData.color }}>
          {indData.icon} {indData.name}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: 9 }}>
        {(PRODUCTS[industry] || []).map((p) => (
          <button key={p} style={S.pill(product === p)} onClick={() => setProduct(p)}>
            <div style={{ fontSize: 11, fontWeight: 500, color: product === p ? '#f5c842' : '#bbb' }}>{p}</div>
          </button>
        ))}
      </div>
      <NavBtns onBack={onBack} onNext={onNext} disabled={!product} nextLabel="Pick Strategies →" />
    </div>
  );
}
