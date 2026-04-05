// ─── UTILS ───────────────────────────────────────────────────────────────────

import { STRATEGIES } from './data';

export const calcPrice = (strategy, cost, markup, competitors = []) => {
  const c = parseFloat(cost);
  const m = parseFloat(markup) || 30;
  if (!c || c <= 0) return null;
  const comps = competitors.filter((x) => parseFloat(x) > 0).map(Number);
  const fn = STRATEGIES[strategy]?.formula;
  return fn ? Math.max(fn(c, m, comps), c * 1.01) : null;
};

export const marginPct = (price, cost) =>
  price && cost ? (((price - cost) / price) * 100).toFixed(1) : '0.0';

export const profitUnit = (price, cost) =>
  price && cost ? (price - cost).toFixed(2) : '0.00';

export const mColor = (m) => {
  const n = parseFloat(m);
  return n > 45 ? '#6fcf97' : n > 25 ? '#f5c842' : n > 10 ? '#ff9a70' : '#ff5b5b';
};

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

const dl = (content, name, type) => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = name;
  a.click();
};

export const exportCSV = (rows) => {
  const hdr = ['Name', 'Strategy', 'Industry', 'Product', 'Cost', 'Price', 'Margin%', 'Profit', 'Date'];
  const body = rows.map((r) => [
    r.name, r.strategy, r.industry, r.product,
    r.cost, r.price, r.margin, r.profit,
    r.timestamp ? new Date(r.timestamp).toLocaleDateString() : '',
  ]);
  dl([hdr, ...body].map((r) => r.join(',')).join('\n'), 'pricepilot_scenarios.csv', 'text/csv');
};

export const exportJSON = (rows) =>
  dl(JSON.stringify(rows, null, 2), 'pricepilot_scenarios.json', 'application/json');

export const exportTXT = (rows) => {
  const lines = ['PRICEPILOT — PRICING SCENARIOS REPORT', `Generated: ${new Date().toLocaleDateString()}`, '', ''];
  rows.forEach((r, i) => {
    lines.push(`${i + 1}. ${r.name}`);
    lines.push(`   Strategy : ${r.strategy}`);
    lines.push(`   Industry : ${r.industry} / ${r.product}`);
    lines.push(`   Cost     : $${r.cost}`);
    lines.push(`   Price    : $${r.price}`);
    lines.push(`   Margin   : ${r.margin}%`);
    lines.push(`   Profit   : $${r.profit} / unit`);
    lines.push('');
  });
  dl(lines.join('\n'), 'pricepilot_report.txt', 'text/plain');
};
