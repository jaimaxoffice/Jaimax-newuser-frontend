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
    <div className="w-full flex flex-col items-center gap-6 py-0 ">

      {/* ============================ */}
      {/*        HEADING SECTION       */}
      {/* ============================ */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#aadc32] dark:text-white mb-3">
          Jaimax Global Expansion Map
        </h2>

        <p className="text-white  dark:text-gray-300 text-lg leading-relaxed">
          Jaimax is building one of the fastest-growing crypto ecosystems with a global
          footprint spreading across Asia, Europe, Africa, North America, and Australia.
          This dynamic map highlights our worldwide user base, active countries, and 
          expanding community connections powered by blockchain innovation.
        </p>
      </motion.div>

      {/* ============================ */}
      {/*        WORLD MAP AREA        */}
      {/* ============================ */}

      <div className="w-full aspect-[2/1] bg-white dark:bg-black rounded-lg relative">
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="h-full w-full pointer-events-none select-none"
          alt="world map"
        />

        <svg
          ref={svgRef}
          viewBox="0 0 800 400"
          className="w-full h-full absolute inset-0 pointer-events-none select-none"
        >
          {dots.map((dot, i) => {
            const start = projectPoint(dot.start.lat, dot.start.lng);
            const end = projectPoint(dot.end.lat, dot.end.lng);

            return (
              <motion.path
                key={i}
                d={createCurvedPath(start, end)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: i * 0.5 }}
              />
            );
          })}

          <defs>
            <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {dots.map((dot, i) => (
            <g key={i}>
              {["start", "end"].map((pos) => {
                const p = projectPoint(dot[pos].lat, dot[pos].lng);
                return (
                  <g key={pos}>
                    <circle cx={p.x} cy={p.y} r="2" fill={lineColor} />
                    <circle cx={p.x} cy={p.y} r="2" fill={lineColor} opacity="0.5">
                      <animate attributeName="r" from="2" to="8" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  </g>
                );
              })}
            </g>
          ))}

          {highlightedCountries.map((country, i) => {
            const c = COUNTRY_COORDS[country.toLowerCase()];
            if (!c) return null;

            const { x, y } = projectPoint(c.lat, c.lng);

            return (
              <g key={i}>
                <circle cx={x} cy={y} r="4" fill={lineColor} />
                <circle cx={x} cy={y} r="4" fill={lineColor} opacity="0.5">
                  <animate attributeName="r" from="4" to="20" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                </circle>

                <motion.circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="none"
                  stroke={lineColor}
                  strokeWidth="1"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
