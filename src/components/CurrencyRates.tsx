import { useEffect, useState } from "react";
import "./CurrencyRates.css";

// Shape of the response from https://open.er-api.com/v6/latest/GHS
type ApiResponse = {
  result: "success" | "error";
  time_last_update_utc: string;
  rates: Record<string, number>;
};

type Rate = { code: string; cedisPerUnit: number };

const API_URL = "https://open.er-api.com/v6/latest/GHS";
const REFRESH_MS = 60 * 60 * 1000; // re-check every hour (the API updates daily)

// The currencies to show, in this order
const CODES = ["USD", "EUR", "GBP", "CNY", "ZAR", "NGN"];

export default function CurrencyRates() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [updated, setUpdated] = useState("");
  const [error, setError] = useState(false);

  async function loadRates() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ApiResponse = await res.json();
      if (data.result !== "success") throw new Error("API error");

      // API gives "X per 1 GHS"; flip it to "GHS per 1 X"
      setRates(
        CODES.filter((c) => data.rates[c]).map((c) => ({
          code: c,
          cedisPerUnit: 1 / data.rates[c],
        }))
      );
      setUpdated(
        new Date(data.time_last_update_utc).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        })
      );
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }

  useEffect(() => {
    loadRates();
    const timer = setInterval(loadRates, REFRESH_MS);
    return () => clearInterval(timer);
  }, []);

  // Hide the bar completely if the rates can't load
  if (error || rates.length === 0) return null;

  const format = (n: number) =>
    n.toLocaleString("en-GB", {
      minimumFractionDigits: n < 1 ? 4 : 2,
      maximumFractionDigits: n < 1 ? 4 : 2,
    });

  // One full set of rates plus the "updated" note
  const items = (
    <>
      {rates.map((r) => (
        <li key={r.code}>
          <span className="fx-bar__code">{r.code}</span> {format(r.cedisPerUnit)}
        </li>
      ))}
      <li className="fx-bar__meta">
        Updated {updated} ·{" "}
        <a href="https://www.exchangerate-api.com" target="_blank" rel="noreferrer">
          Exchange Rate API
        </a>
      </li>
    </>
  );

  return (
    <div className="fx-bar" aria-label="Exchange rates in Ghana cedis">
      <span className="fx-bar__label">GH₵ rates</span>
      <div className="fx-bar__window">
        {/* The list is rendered twice so the scroll loops with no gap */}
        <div className="fx-bar__track">
          <ul className="fx-bar__list">{items}</ul>
          <ul className="fx-bar__list" aria-hidden="true">{items}</ul>
        </div>
      </div>
    </div>
  );
}
