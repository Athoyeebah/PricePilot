// ─── DATA ────────────────────────────────────────────────────────────────────

export const INDUSTRIES = [
  { id: 'retail',        name: 'Retail',               icon: '🛍️', color: '#f5c842' },
  { id: 'food',          name: 'Food & Beverage',       icon: '🍽️', color: '#ff6b35' },
  { id: 'software',      name: 'Software / SaaS',       icon: '💻', color: '#4ecdc4' },
  { id: 'manufacturing', name: 'Manufacturing',         icon: '🏭', color: '#a78bfa' },
  { id: 'services',      name: 'Professional Services', icon: '🤝', color: '#34d399' },
  { id: 'ecommerce',     name: 'E-Commerce',            icon: '📦', color: '#fb7185' },
  { id: 'health',        name: 'Health & Wellness',     icon: '🏥', color: '#38bdf8' },
  { id: 'fashion',       name: 'Fashion & Apparel',     icon: '👗', color: '#f472b6' },
  { id: 'education',     name: 'Education',             icon: '📚', color: '#facc15' },
  { id: 'entertainment', name: 'Entertainment',         icon: '🎬', color: '#c084fc' },
];

export const PRODUCTS = {
  retail:        ['Electronics', 'Home Goods', 'Beauty Products', 'Sportswear', 'Toys & Games'],
  food:          ['Restaurant Meals', 'Packaged Goods', 'Beverages', 'Catering Services', 'Food Delivery'],
  software:      ['SaaS Subscription', 'Mobile App', 'Enterprise Software', 'API Service', 'Plugin / Add-on'],
  manufacturing: ['Industrial Parts', 'Consumer Goods', 'Raw Materials', 'Custom Orders', 'Assembled Components'],
  services:      ['Consulting', 'Legal Services', 'Accounting', 'Marketing Agency', 'Design Studio'],
  ecommerce:     ['Physical Product', 'Digital Download', 'Subscription Box', 'Marketplace Listing', 'Dropship Item'],
  health:        ['Supplements', 'Fitness Classes', 'Medical Device', 'Therapy Sessions', 'Wellness App'],
  fashion:       ['Luxury Clothing', 'Fast Fashion', 'Accessories', 'Footwear', 'Custom / Bespoke'],
  education:     ['Online Course', 'Tutoring Sessions', 'Certification Program', 'Textbook', 'Live Workshop'],
  entertainment: ['Streaming Service', 'Event Ticket', 'Video Game', 'Music / Album', 'Premium Podcast'],
};

export const STRATEGIES = {
  'Price Skimming': {
    icon: '📈', group: 'core',
    desc: 'Launch at a high price, reduce over time to capture multiple segments — early adopters then price-sensitive buyers.',
    tips: ['Works best for innovative products', 'Plan price reduction milestones', 'Requires strong brand differentiation'],
    formula: (c) => c / (1 - 0.58),
    best: ['software', 'fashion', 'retail', 'entertainment'],
  },
  'Market Penetration': {
    icon: '🚀', group: 'core',
    desc: 'Enter low to build market share fast. Raise prices once you have a loyal base.',
    tips: ['Ideal for commoditized markets', 'Requires volume to be profitable', 'Watch unit economics carefully'],
    formula: (c) => c * 1.07,
    best: ['food', 'ecommerce', 'retail', 'software'],
  },
  'Premium Pricing': {
    icon: '💎', group: 'core',
    desc: 'Price high to signal exclusivity. The price itself becomes part of the brand identity.',
    tips: ['Needs strong brand story', 'Customer experience must match price', 'Avoid discounting — erodes prestige'],
    formula: (c) => c * 2.1,
    best: ['fashion', 'health', 'software', 'services'],
  },
  'Economy Pricing': {
    icon: '💲', group: 'core',
    desc: 'Compete on the lowest price. Margins are thin — volume is the game.',
    tips: ['Requires operational efficiency', 'Vulnerable to cost increases', 'Hard to move upmarket once positioned'],
    formula: (c) => c * 1.06,
    best: ['retail', 'food', 'ecommerce', 'manufacturing'],
  },
  'Bundle Pricing': {
    icon: '📦', group: 'core',
    desc: 'Group products/services into a package at a discount to boost perceived value and average order size.',
    tips: ['Bundle complementary items', 'Show individual vs bundle savings', 'Clears slow-moving inventory'],
    formula: (c) => c * 1.38,
    best: ['software', 'education', 'services', 'entertainment'],
  },
  'Value-Based': {
    icon: '⭐', group: 'core',
    desc: 'Price based on customer perceived value, not cost. Highest margin potential of any strategy.',
    tips: ['Interview customers on willingness to pay', 'Segment by value perception', 'Communicate ROI clearly'],
    formula: (c, m) => c * (1 + (m || 40) / 100),
    best: ['software', 'services', 'health', 'education'],
  },
  'Dynamic Pricing': {
    icon: '🔄', group: 'core',
    desc: 'Adjust prices in real-time based on demand, time, or competition. Common in travel and e-commerce.',
    tips: ['Use data and algorithms', 'Set floor and ceiling limits', 'Communicate pricing rules to customers'],
    formula: (c) => c * 1.48,
    best: ['entertainment', 'ecommerce', 'food', 'services'],
  },
  'Cost-Plus': {
    icon: '➕', group: 'core',
    desc: 'Add a fixed markup % to total cost. Simple, predictable, and easy to explain to stakeholders.',
    tips: ["Don't ignore overhead costs", 'Review markup vs market regularly', 'Good starting point, not a final strategy'],
    formula: (c, m) => c * (1 + (m || 30) / 100),
    best: ['manufacturing', 'retail', 'food', 'services'],
  },
  'Competitor-Based': {
    icon: '🎯', group: 'core',
    desc: 'Price relative to competitors — at parity, below, or above based on your positioning.',
    tips: ['Monitor prices continuously', 'Differentiate to justify premium', 'Avoid pure price wars'],
    formula: (c, _m, comps) => {
      const avg = comps && comps.length > 0
        ? comps.reduce((a, b) => a + b, 0) / comps.length
        : c * 1.24;
      return avg * 1.02;
    },
    best: ['retail', 'ecommerce', 'food', 'manufacturing'],
  },
  'Everyday Low': {
    icon: '🏷️', group: 'core',
    desc: 'Consistently low prices, all the time — no flash sales, no games. Builds trust.',
    tips: ['Requires supply chain efficiency', 'Invest in low-cost operations', 'Creates loyal, predictable buyers'],
    formula: (c) => c * 1.13,
    best: ['retail', 'food', 'ecommerce', 'manufacturing'],
  },
  'High-Low': {
    icon: '📊', group: 'core',
    desc: 'Price high normally, run frequent promotions to drive traffic and create urgency.',
    tips: ['Anchor regular price visibly', 'Time sales to seasons/events', 'Segment customers who wait for deals'],
    formula: (c) => c * 1.62,
    best: ['retail', 'fashion', 'entertainment', 'ecommerce'],
  },
  'Psychological': {
    icon: '🧠', group: 'psych',
    desc: 'Exploit cognitive biases — charm pricing ($9.99), BOGO, anchoring — to influence buyer behavior.',
    tips: ['Test charm vs round pricing by segment', 'BOGO for high-volume low-margin', 'Prestige needs aspirational brand'],
    formula: (c) => Math.ceil(c * 1.32) - 0.01,
    best: ['retail', 'ecommerce', 'fashion', 'food'],
  },
};

export const PSYCH_TACTICS = [
  { id: 'charm',     name: 'Charm Pricing',    icon: '🪄', example: '$9.99 not $10',      desc: 'Ending prices in .99/.95 makes them feel significantly lower to the brain.' },
  { id: 'prestige',  name: 'Prestige Pricing', icon: '👑', example: '$500 not $499',      desc: 'Round clean numbers signal luxury. Eliminates the "discounted" perception.' },
  { id: 'bogo',      name: 'BOGO',             icon: '2️⃣', example: 'Buy 1 Get 1 Free',   desc: 'Doubles perceived value, clears inventory, drives impulse without explicit discounts.' },
  { id: 'limit',     name: 'Limit Pricing',    icon: '🚧', example: 'Max 2 per customer', desc: 'Low price to block new competitors from entering your market profitably.' },
  { id: 'predatory', name: 'Predatory Pricing',icon: '⚡', example: 'Below-cost entry',   desc: 'Temporarily price below cost to eliminate competition. Legally risky — use with caution.' },
];

export const MARKET_DATA = {
  retail:        { low: 15,  avg: 48,  high: 150,  trend: '+2.3%', insight: 'Retail margins under pressure from e-commerce. Value-based or premium positioning outperforming cost-plus in 2024.' },
  food:          { low: 8,   avg: 24,  high: 80,   trend: '+4.1%', insight: 'Food costs rose ~18% since 2022. Bundle pricing and menu engineering are protecting margins for operators.' },
  software:      { low: 9,   avg: 59,  high: 349,  trend: '+6.8%', insight: 'SaaS shifting to usage-based. Value-based and tiered pricing consistently outperform flat monthly fees.' },
  manufacturing: { low: 30,  avg: 195, high: 1200, trend: '-1.2%', insight: 'Supply chain normalization in 2024. Cost-plus is standard but competitor-based analysis is increasingly important.' },
  services:      { low: 50,  avg: 175, high: 600,  trend: '+5.4%', insight: 'Consulting rates at all-time highs. Value-based pricing capturing 40-60% more revenue vs hourly billing.' },
  ecommerce:     { low: 12,  avg: 42,  high: 250,  trend: '+3.7%', insight: 'Free shipping expectations compress margins. Bundle pricing and AOV optimization are key levers.' },
  health:        { low: 20,  avg: 75,  high: 400,  trend: '+7.2%', insight: 'Wellness market growing rapidly. Premium and outcomes-based pricing command significant premiums.' },
  fashion:       { low: 25,  avg: 110, high: 950,  trend: '+1.8%', insight: 'Fast fashion under sustainability pressure. Premium positioning shows stronger long-term margins.' },
  education:     { low: 19,  avg: 99,  high: 599,  trend: '+9.1%', insight: 'Cohort + community models command 3-5x pricing over self-paced equivalents.' },
  entertainment: { low: 5,   avg: 20,  high: 80,   trend: '-0.8%', insight: 'Streaming saturation causing churn. Bundle pricing and dynamic event pricing are the growth levers.' },
};

export const ALERTS = {
  retail:        ['📢 Retail inflation eased to 2.1% — review if cost-plus markups are still competitive', '🏷️ Competitor analysis shows avg 5% drop in consumer electronics prices YoY'],
  food:          ['🌾 Commodity prices stabilizing — opportunity to recalibrate cost-plus margins', '📦 Delivery app fees averaging 30% — factor into pricing if using third-party delivery'],
  software:      ['💡 Usage-based pricing adoption up 34% in SaaS — consider hybrid model', '🔄 Annual vs monthly pricing gap widening — users pay 20-30% more on annual plans'],
  manufacturing: ['⚙️ Steel prices down 12% Q3 2024 — potential margin expansion opportunity', '🌍 Nearshoring trend reducing logistics costs — update your cost-plus baseline'],
  services:      ['🤝 AI augmentation allowing 40% faster delivery — pricing model review recommended', '📊 Project-based vs retainer: retainers commanding 15% premium on average'],
  health:        ['💊 Supplement market growing 8% YoY — premium positioning window is open', '🏥 Outcome-based pricing gaining traction — consider performance pricing models'],
  fashion:       ['🌱 Sustainable fashion commands 25-40% premium — document your supply chain', '📱 Social commerce driving 22% of fashion sales — price for impulse buy behavior'],
  education:     ['🎓 Cohort enrollment down 8% — bundle with job placement services gaining traction', '💼 B2B upskilling budgets up 31% — enterprise pricing tiers recommended'],
  entertainment: ['🎬 Streaming churn at all-time high — bundle pricing with hardware seeing 60% lower churn', '🎫 Live event prices up 28% — dynamic pricing systems outperforming flat ticket pricing'],
  ecommerce:     ['📦 Avg order value flat — bundle pricing incentives showing +34% AOV improvement', '🔁 Subscription box model growing 15% YoY — consider recurring pricing structures'],
};
