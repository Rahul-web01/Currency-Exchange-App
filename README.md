<div align="center">

# Live Currency Converter v2

**Convert at live market rates, with a 30-day trend chart.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

## What's new in v2

- **Live market rates** that auto-refresh every 60 seconds, with a countdown and a "Refresh now" button.
- **30-day trend chart** for the selected pair, with percent change, low and high.
- **160+ currencies** with full names, loaded from the API.
- **Banknote-inspired design**: guilloche rosette background, deep teal ink and gold foil accent.
- **Remembers your last pair** and offers one-click common pairs.
- **Accessible**: labelled inputs, visible keyboard focus, live-region rate announcements, reduced-motion support.
- **Resilient**: request cancellation on change, clear error message, automatic retry on the next refresh.

## Data sources

| Purpose | Source | Key needed |
| :--- | :--- | :--- |
| Live rates | open.er-api.com | No |
| 30-day history | frankfurter.app (ECB data) | No |

History covers about 30 major currencies. For other pairs the chart says it's unavailable and conversion still works.

For true intraday or tick data, swap the URL and parsing in `src/hooks/useCurrencyInfo.js` for a paid provider (for example Twelve Data or Alpha Vantage) and keep the API key in a Vercel environment variable.

## Project structure

```text
src/
├── components/
│   ├── InputBox.jsx             # Amount + currency field
│   ├── TrendChart.jsx           # SVG line chart
│   └── GuillocheBackground.jsx  # Banknote-style background
├── hooks/
│   ├── useCurrencyInfo.js       # Live rates + polling
│   └── useRateHistory.js        # 30-day history
├── App.jsx
├── main.jsx
└── index.css
```

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Push to GitHub and import the repo in Vercel. No environment variables are needed for the default data sources.
