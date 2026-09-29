/* ============================================================
   YOUR CHOICE TRADING TERMINAL — Main JavaScript
   ============================================================ */

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ── ACTIVE NAV LINK ──
(function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ── INJECT TRADINGVIEW CHART ──
function injectTVChart(containerId, symbol, interval, style) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'tradingview-widget-container';
  wrap.style.cssText = 'width:100%;height:100%';
  const inner = document.createElement('div');
  inner.className = 'tradingview-widget-container__widget';
  inner.style.cssText = 'width:100%;height:100%';
  wrap.appendChild(inner);
  const sc = document.createElement('script');
  sc.type = 'text/javascript';
  sc.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
  sc.async = true;
  sc.textContent = JSON.stringify({
    autosize: true,
    symbol: symbol,
    interval: interval || 'D',
    timezone: 'Asia/Kolkata',
    theme: 'dark',
    style: style || '1',
    locale: 'en',
    backgroundColor: 'rgba(15,15,26,1)',
    gridColor: 'rgba(30,30,46,0.8)',
    allow_symbol_change: true,
    calendar: false,
    withdateranges: true,
    hide_top_toolbar: false,
    hide_legend: false,
    save_image: true,
    details: true,
    show_popup_button: true,
    popup_width: '1200',
    popup_height: '700',
    studies: ['STD;MACD', 'STD;RSI'],
    support_host: 'https://www.tradingview.com'
  });
  wrap.appendChild(sc);
  c.appendChild(wrap);
}

// ── INJECT MINI OVERVIEW ──
function injectMini(containerId, symbol, color) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'tradingview-widget-container';
  wrap.style.cssText = 'width:100%;height:100%';
  const inner = document.createElement('div');
  inner.className = 'tradingview-widget-container__widget';
  inner.style.cssText = 'width:100%;height:100%';
  wrap.appendChild(inner);
  const sc = document.createElement('script');
  sc.type = 'text/javascript';
  sc.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
  sc.async = true;
  sc.textContent = JSON.stringify({
    symbol: symbol,
    width: '100%',
    height: '100%',
    locale: 'en',
    dateRange: '1D',
    colorTheme: 'dark',
    trendLineColor: color || 'rgba(212,175,55,1)',
    underLineColor: color ? color.replace('1)', '0.12)') : 'rgba(212,175,55,0.12)',
    isTransparent: true,
    autosize: true
  });
  wrap.appendChild(sc);
  c.appendChild(wrap);
}

// ── SYMBOL TAB SWITCHER ──
function initSymTabs(tabClass, chartId, defaultSymbol, defaultInterval) {
  let currentSym = defaultSymbol;
  let currentTF  = defaultInterval || 'D';

  const tabs = document.querySelectorAll('.' + tabClass);
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentSym = tab.dataset.sym;
      // Update label
      const lbl = document.getElementById('chart-sym-label');
      const nm  = document.getElementById('chart-sym-name');
      if (lbl) lbl.textContent = tab.dataset.label || currentSym;
      if (nm)  nm.textContent  = tab.dataset.name  || '';
      injectTVChart(chartId, currentSym, currentTF);
    });
  });

  // TF buttons
  document.querySelectorAll('.tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTF = btn.dataset.tf;
      injectTVChart(chartId, currentSym, currentTF);
    });
  });

  // Initial render
  injectTVChart(chartId, currentSym, currentTF);
}

// ── CALCULATOR: PIP ──
function calcPip() {
  const pair     = document.getElementById('pip-pair').value;
  const lots     = parseFloat(document.getElementById('pip-lots').value) || 0;
  const pips     = parseFloat(document.getElementById('pip-pips').value) || 0;
  const accCur   = document.getElementById('pip-acc').value;

  // Standard pip values per lot (approximate USD)
  const pipValues = {
    'EURUSD': 10, 'GBPUSD': 10, 'AUDUSD': 10, 'NZDUSD': 10,
    'USDJPY': 9.09, 'USDCHF': 10.9, 'USDCAD': 7.4,
    'XAUUSD': 10, 'XAGUSD': 50, 'BTCUSD': 1, 'ETHUSD': 1,
    'USOIL': 10, 'UKOIL': 10,
  };
  const pipVal   = pipValues[pair] || 10;
  const total    = pipVal * lots * pips;

  document.getElementById('pip-res-pv').textContent  = '$' + pipVal.toFixed(2);
  document.getElementById('pip-res-lots').textContent = lots.toFixed(2);
  document.getElementById('pip-res-pips').textContent = pips.toFixed(1);
  document.getElementById('pip-res-total').textContent = '$' + total.toFixed(2);
  document.getElementById('pip-result').classList.add('show');
}

// ── CALCULATOR: P&L ──
function calcPL() {
  const type    = document.getElementById('pl-type').value;   // buy/sell
  const entry   = parseFloat(document.getElementById('pl-entry').value)  || 0;
  const exit    = parseFloat(document.getElementById('pl-exit').value)   || 0;
  const lots    = parseFloat(document.getElementById('pl-lots').value)   || 0;
  const pair    = document.getElementById('pl-pair').value;

  const pipSizes = { 'XAUUSD': 0.01, 'XAGUSD': 0.001, 'USDJPY': 0.01, 'default': 0.0001 };
  const pipSize  = pipSizes[pair] || pipSizes['default'];
  const pipVals  = { 'EURUSD': 10, 'GBPUSD': 10, 'XAUUSD': 10, 'USDJPY': 9.09, 'default': 10 };
  const pipVal   = pipVals[pair] || pipVals['default'];

  const diff    = type === 'buy' ? exit - entry : entry - exit;
  const pips    = diff / pipSize;
  const pl      = pips * pipVal * lots;

  document.getElementById('pl-res-pips').textContent = pips.toFixed(1);
  document.getElementById('pl-res-pl').textContent   = (pl >= 0 ? '+$' : '-$') + Math.abs(pl).toFixed(2);
  document.getElementById('pl-res-pl').style.color   = pl >= 0 ? 'var(--up)' : 'var(--down)';
  document.getElementById('pl-result').classList.add('show');
}

// ── CALCULATOR: CURRENCY CONVERTER ──
function calcConvert() {
  const amount = parseFloat(document.getElementById('conv-amount').value) || 0;
  const from   = document.getElementById('conv-from').value;
  const to     = document.getElementById('conv-to').value;

  // Approximate rates vs USD (live rates will vary)
  const rates = {
    USD: 1, EUR: 1.09, GBP: 1.27, JPY: 0.0067, CHF: 1.12,
    AUD: 0.65, CAD: 0.74, NZD: 0.61, INR: 0.012, SGD: 0.74,
    XAU: 4297, XAG: 50.5,
  };
  const fromUSD = amount / (rates[from] || 1);
  const result  = fromUSD * (rates[to] || 1);

  document.getElementById('conv-result-val').textContent =
    amount.toLocaleString() + ' ' + from + ' = ' + result.toLocaleString('en', {maximumFractionDigits: 4}) + ' ' + to;
  document.getElementById('conv-result').classList.add('show');
}

// ── CALC TABS ──
function initCalcTabs() {
  document.querySelectorAll('.calc-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.calc-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.panel).classList.add('active');
    });
  });
}

// ── CONTACT FORM ──
function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name    = document.getElementById('c-name').value;
    const email   = document.getElementById('c-email').value;
    const message = document.getElementById('c-message').value;
    // Show success
    document.getElementById('form-success').style.display = 'block';
    form.reset();
    setTimeout(() => document.getElementById('form-success').style.display = 'none', 4000);
  });
}

// ── RUN ON DOM READY ──
document.addEventListener('DOMContentLoaded', () => {
  initCalcTabs();
  initContact();
});
