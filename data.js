/* ============================================================
   YOUR CHOICE TRADING TERMINAL — Market Data
   Edit this file to update symbols, names, and defaults
   ============================================================ */

const FOREX_SYMBOLS = [
  { tv: 'FOREXCOM:EURUSD', label: 'EUR/USD', name: 'Euro / US Dollar',       color: 'rgba(212,175,55,1)' },
  { tv: 'FOREXCOM:GBPUSD', label: 'GBP/USD', name: 'Pound / US Dollar',      color: 'rgba(240,192,64,1)' },
  { tv: 'FOREXCOM:USDJPY', label: 'USD/JPY', name: 'US Dollar / Yen',        color: 'rgba(212,175,55,1)' },
  { tv: 'FOREXCOM:USDCHF', label: 'USD/CHF', name: 'US Dollar / Franc',      color: 'rgba(240,192,64,1)' },
  { tv: 'FOREXCOM:AUDUSD', label: 'AUD/USD', name: 'Australian / US Dollar', color: 'rgba(212,175,55,1)' },
  { tv: 'FOREXCOM:USDCAD', label: 'USD/CAD', name: 'US Dollar / CAD',        color: 'rgba(240,192,64,1)' },
  { tv: 'FOREXCOM:NZDUSD', label: 'NZD/USD', name: 'NZ Dollar / US Dollar',  color: 'rgba(212,175,55,1)' },
];

const COMMODITY_SYMBOLS = [
  { tv: 'FOREXCOM:XAUUSD', label: 'XAU/USD',  name: 'Gold Spot',     color: 'rgba(212,175,55,1)' },
  { tv: 'FOREXCOM:XAGUSD', label: 'XAG/USD',  name: 'Silver Spot',   color: 'rgba(192,192,192,1)' },
  { tv: 'FOREXCOM:XPTUSD', label: 'XPT/USD',  name: 'Platinum',      color: 'rgba(229,228,226,1)' },
  { tv: 'TVC:USOIL',       label: 'WTI',      name: 'WTI Crude Oil', color: 'rgba(180,120,60,1)' },
  { tv: 'TVC:UKOIL',       label: 'BRENT',    name: 'Brent Crude',   color: 'rgba(200,140,60,1)' },
];

const CRYPTO_SYMBOLS = [
  { tv: 'BITSTAMP:BTCUSD', label: 'BTC/USD',  name: 'Bitcoin',   color: 'rgba(247,147,26,1)' },
  { tv: 'BITSTAMP:ETHUSD', label: 'ETH/USD',  name: 'Ethereum',  color: 'rgba(98,126,234,1)'  },
  { tv: 'BINANCE:SOLUSDT', label: 'SOL/USDT', name: 'Solana',    color: 'rgba(150,100,255,1)' },
  { tv: 'BINANCE:BNBUSDT', label: 'BNB/USDT', name: 'BNB',       color: 'rgba(243,186,47,1)'  },
  { tv: 'BINANCE:XRPUSDT', label: 'XRP/USDT', name: 'Ripple',    color: 'rgba(0,168,255,1)'   },
];

const INDEX_SYMBOLS = [
  { tv: 'FOREXCOM:SPXUSD', label: 'SPX',      name: 'S&P 500',     color: 'rgba(212,175,55,1)' },
  { tv: 'FOREXCOM:NSXUSD', label: 'NDX',      name: 'NASDAQ 100',  color: 'rgba(0,168,255,1)'  },
  { tv: 'INDEX:DEU40',     label: 'DAX',      name: 'DAX 40',      color: 'rgba(240,192,64,1)' },
  { tv: 'INDEX:UKX',       label: 'FTSE 100', name: 'FTSE 100',    color: 'rgba(212,175,55,1)' },
  { tv: 'INDEX:NKY',       label: 'NIKKEI',   name: 'Nikkei 225',  color: 'rgba(240,100,100,1)'},
];

const CENTRAL_BANKS = [
  { bank: 'Federal Reserve',       country: 'United States', currency: 'USD', rate: '5.25 – 5.50', change: 'hold',  next: 'Nov 2026', flag: '🇺🇸', note: 'Holding — watching inflation data' },
  { bank: 'European Central Bank', country: 'Eurozone',      currency: 'EUR', rate: '4.50',         change: 'down',  next: 'Oct 2026', flag: '🇪🇺', note: 'Cutting cycle underway' },
  { bank: 'Bank of England',       country: 'United Kingdom',currency: 'GBP', rate: '5.25',         change: 'hold',  next: 'Nov 2026', flag: '🇬🇧', note: 'Cautious — sticky services inflation' },
  { bank: 'Bank of Japan',         country: 'Japan',         currency: 'JPY', rate: '0.25',         change: 'up',    next: 'Oct 2026', flag: '🇯🇵', note: 'Gradual normalisation path' },
  { bank: 'Reserve Bank of India', country: 'India',         currency: 'INR', rate: '6.50',         change: 'hold',  next: 'Oct 2026', flag: '🇮🇳', note: 'Inflation focus — monsoon impact' },
  { bank: 'Swiss National Bank',   country: 'Switzerland',   currency: 'CHF', rate: '1.50',         change: 'down',  next: 'Dec 2026', flag: '🇨🇭', note: 'Below 2% CPI target' },
  { bank: 'Bank of Canada',        country: 'Canada',        currency: 'CAD', rate: '4.25',         change: 'down',  next: 'Oct 2026', flag: '🇨🇦', note: 'Rate cut cycle in progress' },
  { bank: 'Reserve Bank of Australia', country: 'Australia', currency: 'AUD', rate: '4.35',         change: 'hold',  next: 'Nov 2026', flag: '🇦🇺', note: 'Elevated rates for longer' },
];
