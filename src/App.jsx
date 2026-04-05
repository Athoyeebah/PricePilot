import { useState, useEffect } from 'react';
import { INDUSTRIES } from './data';
import { Toast } from './components/Shared';
import { StepIndustry, StepProduct } from './components/StepSelection';
import { StepStrategies } from './components/StepStrategies';
import { StepCalculate } from './components/StepCalculate';
import { StepScenarios } from './components/StepScenarios';

const STORAGE_KEY = 'pricepilot';
const STEPS = ['Industry', 'Product', 'Strategies', 'Calculate', 'Scenarios'];

export default function App() {
  const [step, setStep]           = useState(0);
  const [industry, setIndustry]   = useState(null);
  const [product, setProduct]     = useState(null);
  const [strategies, setStrategies] = useState([]);
  const [toast, setToast]         = useState(null);
  const [saved, setSaved]         = useState(() => {
    try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : []; }
    catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch { }
  }, [saved]);

  const addSaved  = (sc) => { setSaved((p) => [...p, sc]); setToast('Scenario saved!'); };
  const delSaved  = (id) => setSaved((p) => p.filter((x) => x.id !== id));
  const clearAll  = () => { setSaved([]); setToast('All scenarios cleared'); };
  const restart   = () => { setStep(0); setIndustry(null); setProduct(null); setStrategies([]); };
  const indData   = INDUSTRIES.find((i) => i.id === industry);

  return (
    <div style={{ minHeight: '100vh', background: '#080808', fontFamily: "'DM Mono', monospace", color: '#f0f0f0' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 18px 100px' }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: 'center', padding: '44px 0 28px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 200, background: 'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(245,200,66,.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(245,200,66,.07)', border: '1px solid rgba(245,200,66,.18)', borderRadius: 20, padding: '4px 14px', fontSize: 10, color: '#f5c842', letterSpacing: '.12em', marginBottom: 14 }}>
            ◆ PRICING INTELLIGENCE PLATFORM
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem,6vw,3.8rem)', letterSpacing: -3, lineHeight: 1, color: '#f0f0f0', margin: 0 }}>
            PRICE<span style={{ color: '#f5c842' }}>PILOT</span>
            <span style={{ display: 'inline-block', background: 'rgba(78,205,196,.12)', border: '1px solid rgba(78,205,196,.25)', color: '#4ecdc4', borderRadius: 5, padding: '3px 10px', fontSize: 13, marginLeft: 10, verticalAlign: 'middle', fontFamily: "'DM Mono', monospace", fontWeight: 400, letterSpacing: '.04em' }}>v1.0</span>
          </h1>
          <p style={{ marginTop: 10, color: '#333', fontSize: 10, letterSpacing: '.1em' }}>
            BUILD · CALCULATE · COMPARE · EXPORT · PERSIST
          </p>
        </div>

        {/* ── STEPPER ── */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 36, gap: 0 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                onClick={() => i < step && setStep(i)}
                title={s}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  border: `2px solid ${step === i ? '#f5c842' : i < step ? '#4ecdc4' : '#1e1e1e'}`,
                  background: step === i ? '#f5c842' : i < step ? '#4ecdc4' : 'transparent',
                  color: step === i || i < step ? '#000' : '#333',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                  cursor: i < step ? 'pointer' : 'default',
                  transition: 'all .25s',
                  fontFamily: "'Syne', sans-serif",
                  flexShrink: 0,
                }}
              >
                {i < step ? '✓' : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ width: 28, height: 2, background: i < step ? '#4ecdc4' : '#1e1e1e', transition: 'background .3s' }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: -28, marginBottom: 32, fontSize: 10, color: '#2a2a2a', letterSpacing: '.1em' }}>
          STEP {step + 1} OF {STEPS.length}: {STEPS[step].toUpperCase()}
        </div>

        {/* ── STEPS ── */}
        {step === 0 && <StepIndustry industry={industry} setIndustry={setIndustry} onNext={() => setStep(1)} />}
        {step === 1 && <StepProduct industry={industry} indData={indData} product={product} setProduct={setProduct} onBack={() => setStep(0)} onNext={() => setStep(2)} />}
        {step === 2 && <StepStrategies industry={industry} product={product} selected={strategies} setSelected={setStrategies} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
        {step === 3 && <StepCalculate industry={industry} product={product} selected={strategies} saved={saved} addSaved={addSaved} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
        {step === 4 && <StepScenarios saved={saved} delSaved={delSaved} clearAll={clearAll} onBack={() => setStep(3)} onRestart={restart} />}

        {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      </div>
    </div>
  );
}
