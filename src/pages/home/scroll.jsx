import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import axios from "axios";

// 🟢 Default data to show instantly (no initial API hit)
const defaultItems = [
  { label: "JAIMAX", value: "$0.01" },
  { label: "BTC", value: "$67,000" },
  { label: "ETH", value: "$3,500" },
  { label: "TSLA", value: "$180.00" },
  { label: "BAYC Floor", value: "23 ETH" },
  { label: "10 % Referral Bonus", value: "" },
];

async function fetchLatest() {
  const jaimax = await axios
    .get("https://api.example.com/jaimax/price")
    .then((r) => r.data.price || 0)
    .catch(() => 0);

  const cg = await axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    )
    .then((r) => r.data)
    .catch(() => ({}));

  const alphaKey = process.env.REACT_APP_ALPHA_KEY;
  const tsla = await axios
    .get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=TSLA&apikey=${alphaKey}`
    )
    .then((r) => r.data["Global Quote"]["05. price"])
    .catch(() => null);

  const apeFloor = await axios
    .get("https://api.opensea.io/api/v1/collection/boredapeyachtclub/stats")
    .then((r) => r.data.stats.floor_price)
    .catch(() => null);

  return [
    { label: "JAIMAX", value: `$${jaimax}` },
    { label: "BTC", value: `$${cg.bitcoin?.usd ?? "—"}` },
    { label: "ETH", value: `$${cg.ethereum?.usd ?? "—"}` },
    { label: "TSLA", value: `$${Number(tsla).toFixed(2) || "—"}` },
    { label: "BAYC Floor", value: `${apeFloor ?? "—"} ETH` },
    { label: "10 % Referral Bonus", value: "" },
  ];
}

export default function RealTimeTicker() {
  const [items, setItems] = useState(defaultItems); // 🟢 Start with default

  useEffect(() => {
    let timerId;
    const load = async () => setItems(await fetchLatest());
    load(); // First fetch after mount
    timerId = setInterval(load, 60_000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <Marquee
      gradient={false}
      speed={150}
      className="w-full bg-[#0d5d65] py-2 text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap"
    >
      {items.map(({ label, value }, i) => (
        <span key={i} className="mx-6 text-white">
          {label}
          {value && (
            <>
              :&nbsp;
              <span className="text-[#b8cc26]">{value}</span>
            </>
          )}
        </span>
      ))}
    </Marquee>
  );
}
