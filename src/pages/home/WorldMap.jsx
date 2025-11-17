import { useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

const COUNTRY_COORDS = {
  india: { lat: 20.5937, lng: 78.9629 },
  china: { lat: 35.8617, lng: 104.1954 },
  germany: { lat: 51.1657, lng: 10.4515 },
  australia: { lat: -25.2744, lng: 133.7751 },
  usa: { lat: 37.0902, lng: -95.7129 },
  brazil: { lat: -14.235, lng: -51.9253 },
  france: { lat: 46.2276, lng: 2.2137 },
  "south africa": { lat: -30.5595, lng: 22.9375 },
  russia: { lat: 61.524, lng: 105.3188 },
  canada: { lat: 56.1304, lng: -106.3468 },
  mexico: { lat: 23.6345, lng: -102.5528 },
  uae: { lat: 23.4241, lng: 53.8478 },
  singapore: { lat: 1.3521, lng: 103.8198 },
  "south korea": { lat: 35.9078, lng: 127.7669 },
};

export default function WorldMap({
  dots = [],
  highlightedCountries = [],
  lineColor = "#e7ea7aff",
}) {
  const svgRef = useRef(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const svgMap = map.getSVG({
    radius: 0.22,
    color: "#ffffff40",
    shape: "circle",
    backgroundColor: "#085056",
  });

  const projectPoint = (lat, lng) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
<div className="w-full flex justify-center items-center px-4 py-10 lg:py-20 bg-[#085056]">
  <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center lg:items-start gap-12">

    {/* ====== LEFT TEXT SECTION ====== */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight 
                     bg-gradient-to-r from-[#b8ff3b] to-[#aadc32] 
                     text-transparent bg-clip-text mb-5">
        Jaimax Global Expansion
      </h2>

      <p className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
        A rapidly growing blockchain ecosystem expanding across Asia, Europe,  
        Africa, North America, and Australia. Explore the global reach and 
        connections powering the Jaimax community worldwide.
      </p>

      {/* Elegant underline accent */}
      <div className="w-28 h-1 bg-gradient-to-r from-[#aadc32] to-[#6cae28] rounded-full mt-5 mx-auto lg:mx-0"></div>
    </motion.div>

    {/* ====== RIGHT MAP SECTION ====== */}
    <div className="w-full lg:w-1/2 relative aspect-[2/1] rounded-xl overflow-hidden ">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full"
        alt="world map"
      />

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {/* Connecting lines */}
        {dots.map((dot, i) => {
          const start = projectPoint(dot.start.lat, dot.start.lng);
          const end = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <motion.path
              key={i}
              d={createCurvedPath(start, end)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: i * 0.5 }}
            />
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="6%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="94%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Pulsing dots */}
        {dots.map((dot, i) => (
          <g key={i}>
            {["start", "end"].map((pos) => {
              const p = projectPoint(dot[pos].lat, dot[pos].lng);
              return (
                <g key={pos}>
                  <circle cx={p.x} cy={p.y} r="2.5" fill={lineColor} />
                  <circle cx={p.x} cy={p.y} r="2.5" fill={lineColor} opacity="0.5">
                    <animate attributeName="r" from="2" to="10" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
          </g>
        ))}

        {/* Highlighted countries */}
        {highlightedCountries.map((country, i) => {
          const c = COUNTRY_COORDS[country.toLowerCase()];
          if (!c) return null;

          const { x, y } = projectPoint(c.lat, c.lng);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill={lineColor} />
              <circle cx={x} cy={y} r="5" fill={lineColor} opacity="0.5">
                <animate attributeName="r" from="5" to="22" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  </div>
</div>

  );
}