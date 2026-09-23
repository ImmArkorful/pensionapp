import { useEffect, useState } from "react";
import "./StockTicker.css";

// ---- Types ----
// One item from https://dev.kwayisi.org/apis/gse/live
// e.g. { "name": "MTNGH", "price": 3.1, "change": 0.05, "volume": 120000 }
type GseQuote = {
  name: string;    // ticker symbol, e.g. "MTNGH"
  price: number;   // latest price in GHS
  change: number;  // change in GHS since the previous close
  volume?: number;
};

// ---- Settings ----
const API_URL = "https://dev.kwayisi.org/apis/gse/live";
const REFRESH_MS = 5 * 60 * 1000; // re-check every 5 minutes

// Leave empty to show every listed company,
// or list the tickers you want, e.g. ["MTNGH", "GCB", "SCB", "EGH", "CAL"]
const FEATURED: string[] = [];

// ---- Component ----
export default function StockTicker() {
  const [quotes, setQuotes] = useState<GseQuote[]>([]);
  const [error, setError] = useState(false);

  async function loadQuotes() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: GseQuote[] = await res.json();

      const cleaned = data
        .filter((q) => typeof q.price === "number" && q.price > 0)
        .filter((q) => FEATURED.length === 0 || FEATURED.includes(q.name))
        .sort((a, b) => a.name.localeCompare(b.name));

      setQuotes(cleaned);
      setError(false);
    } catch (err) {
      console.error("Stock ticker failed to load:", err);
      setError(true);
    }
  }

  useEffect(() => {
    loadQuotes();
    const timer = setInterval(loadQuotes, REFRESH_MS);
    return () => clearInterval(timer);
  }, []);

  // Hide the ticker entirely if there's nothing to show
  if (error || quotes.length === 0) return null;

  const items = (
    <>
      {quotes.map((q) => {
        const prev = q.price - (q.change ?? 0);
        const pct = prev > 0 ? ((q.change ?? 0) / prev) * 100 : 0;
        const direction = q.change > 0 ? "up" : q.change < 0 ? "down" : "flat";
        const arrow = direction === "up" ? "▲" : direction === "down" ? "▼" : "•";

        return (
          <li key={q.name}>
            <span className="stock__name">{q.name}</span>
            <span className="stock__price">{q.price.toFixed(2)}</span>
            <span className={`stock__change stock__change--${direction}`}>
              {arrow} {Math.abs(pct).toFixed(2)}%
            </span>
          </li>
        );
      })}
      <li className="stock__meta">
        Prices in GH₵, delayed · Source: Ghana Stock Exchange via kwayisi.org
      </li>
    </>
  );

  return (
    <div className="stock" aria-label="Ghana Stock Exchange prices">
      <span className="stock__label">GSE</span>
      <div className="stock__window">
        {/* Rendered twice so the scroll loops without a gap */}
        <div className="stock__track">
          <ul className="stock__list">{items}</ul>
          <ul className="stock__list" aria-hidden="true">{items}</ul>
        </div>
      </div>
    </div>
  );
}
