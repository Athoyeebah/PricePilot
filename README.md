# PricePilot v1.0 — Pricing Intelligence Platform

A full-featured React app for building, calculating, and comparing pricing strategies.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✨ Features

### 12 Pricing Strategies
Price Skimming · Market Penetration · Premium Pricing · Economy Pricing · Bundle Pricing ·
Value-Based · Dynamic · Cost-Plus · Competitor-Based · Everyday Low · High-Low · Psychological

### 5 Psychological Subtypes
BOGO · Prestige Pricing · Charm Pricing · Limit Pricing · Predatory Pricing

### Step-by-Step Wizard
1. **Industry** — Choose from 10 industries
2. **Product** — Select your product/service
3. **Strategies** — AI-recommended picks + all 12 strategies + guides
4. **Calculate** — Live price/margin/profit with market data, competitor inputs & bundle builder
5. **Scenarios** — Save, compare, and export your pricing scenarios

### Gap Fixes in v2
- ✅ **Competitor Price Inputs** — Enter up to 3 competitor prices; auto-calculates Competitor-Based pricing
- ✅ **Bundle Builder** — Add multiple items with costs, use total as input cost
- ✅ **Persistent Storage** — Scenarios saved to localStorage, survive page refresh
- ✅ **Export** — Download scenarios as CSV, JSON, or TXT report
- ✅ **Market Alerts** — Industry-specific market insights on the Calculate screen
- ✅ **AI Insight** — Contextual pricing insight per industry
- ✅ **Comparison Views** — List, bar chart, and sortable table views for saved scenarios

---

## 📁 Project Structure

```
src/
  App.jsx                    ← Root component, state management
  data.js                    ← All industries, products, strategies, market data, alerts
  utils.js                   ← calcPrice, margin, profit, export functions
  components/
    Shared.jsx               ← CardTitle, Tabs, NavBtns, Toast, style tokens
    StepSelection.jsx        ← Step 1 (Industry) + Step 2 (Product)
    StepStrategies.jsx       ← Step 3 (Strategy selection + guides)
    StepCalculate.jsx        ← Step 4 (Inputs, results, save)
    StepScenarios.jsx        ← Step 5 (Saved scenarios, export, compare)
public/
  index.html
```

---

## 🛠 Tech Stack

- **React 18** — Hooks-based, no Redux
- **Create React App** — Zero-config build
- **CSS-in-JS** — Inline styles with shared token object (`S`)
- **localStorage** — Browser-based persistence, no backend required
- **Google Fonts** — Syne (display) + DM Mono (body)

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `/build` folder — ready to deploy to Netlify, Vercel, or any static host.
