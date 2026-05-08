// export default function Hero() {
//   return (
//     <section
//       className="relative w-full min-h-[calc(100vh-68px)] flex items-center overflow-hidden"
//       style={{ fontFamily: "var(--font-body)" }}
//     >
//       <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-8 py-16 px-6">
//         {/* ── Left: Copy ── */}
//         <div className="flex-1 max-w-[52%]">
//           <h1
//             className="text-[clamp(2.6rem,4.5vw,4rem)] font-bold leading-[1.08] tracking-tight"
//             style={{ fontFamily: "var(--font-heading)", color: "var(--clr-navy)" }}
//           >
//             Invest in{" "}
//             <em className="not-italic" style={{ color: "var(--clr-orange)" }}>
//               Mining
//             </em>
//             <br />
//             Cryptocurrencies
//             <br />
//             with no Hassle
//           </h1>

//           <p
//             className="mt-5 text-[15px] leading-[1.75] max-w-[400px]"
//             style={{ color: "var(--clr-muted)" }}
//           >
//             You will get periodic mining outputs to your designated wallet. We
//             have the fastest crypto mining hardware running for you!
//           </p>

//           <div className="flex items-center gap-6 mt-8">
//             <a
//               href="#"
//               className="inline-block text-[15px] font-semibold text-white px-8 py-[14px] rounded-[10px] transition-opacity hover:opacity-88"
//               style={{ background: "var(--clr-orange)" }}
//             >
//               Start Mining
//             </a>
//             <a
//               href="#"
//               className="text-[15px] font-semibold underline underline-offset-4 decoration-2 transition-opacity hover:opacity-50"
//               style={{ color: "var(--clr-navy)" }}
//             >
//               Learn More
//             </a>
//           </div>
//         </div>

//         {/* ── Right: Illustration ── */}
//         <div
//           className="flex-1 flex items-end justify-center relative"
//           style={{ height: "420px" }}
//           aria-hidden="true"
//         >
//           {/* Floor shadow */}
//           <div
//             className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[260px] h-4 rounded-full"
//             style={{ background: "rgba(0,0,0,0.12)", filter: "blur(10px)" }}
//           />

//           {/* Rock formation */}
//           <div className="absolute bottom-5 left-1/2 -translate-x-1/2" style={{ width: 260, height: 200 }}>
//             {/* Side rocks */}
//             <div
//               className="absolute bottom-0 left-0 w-[90px] h-[110px]"
//               style={{
//                 background: "linear-gradient(135deg,#23252d,#16181e)",
//                 clipPath: "polygon(0 100%,0 30%,30% 0%,100% 20%,85% 100%)",
//                 borderRadius: "8px",
//               }}
//             />
//             <div
//               className="absolute bottom-0 right-2 w-[70px] h-[90px]"
//               style={{
//                 background: "linear-gradient(135deg,#1e2026,#13141a)",
//                 clipPath: "polygon(20% 0%,100% 10%,100% 100%,0 100%,0 40%)",
//                 borderRadius: "8px",
//               }}
//             />
//             {/* Main rock */}
//             <div
//               className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px] h-[170px]"
//               style={{
//                 background: "linear-gradient(145deg,#2a2d35 0%,#1c1e24 60%,#111315 100%)",
//                 clipPath: "polygon(8% 100%,0% 55%,12% 20%,35% 5%,65% 0%,88% 8%,100% 40%,95% 100%)",
//                 borderRadius: "20px 22px 18px 18px",
//               }}
//             />

//             {/* Bitcoin coin */}
//             <div
//               className="absolute flex items-center justify-center"
//               style={{
//                 bottom: 78, left: "50%", transform: "translateX(-10%)",
//                 width: 68, height: 68, borderRadius: "50%",
//                 background: "linear-gradient(145deg,#2e3038,#1a1c22)",
//                 border: "3px solid #3a3d46",
//                 boxShadow: "inset 0 2px 8px rgba(0,0,0,0.6)",
//               }}
//             >
//               <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#4a4e58", fontFamily: "var(--font-heading)" }}>₿</span>
//             </div>

//             {/* Ethereum coin */}
//             <div
//               className="absolute flex items-center justify-center"
//               style={{
//                 bottom: 48, left: "18%",
//                 width: 50, height: 50, borderRadius: "50%",
//                 background: "linear-gradient(145deg,#252830,#171920)",
//                 border: "3px solid #32353e",
//               }}
//             >
//               <span style={{ fontSize: "1rem", fontWeight: 900, color: "#3e4150", fontFamily: "var(--font-heading)" }}>⟐</span>
//             </div>
//           </div>

//           {/* Pickaxe */}
//           <div
//             className="absolute"
//             style={{
//               top: "2%", left: "50%",
//               width: 200, height: 220,
//               transform: "translateX(-10%) rotate(-10deg)",
//               transformOrigin: "70% 80%",
//             }}
//           >
//             {/* Head */}
//             <div
//               className="absolute"
//               style={{
//                 top: 10, left: 10, width: 140, height: 50,
//                 background: "linear-gradient(135deg,#2e3038 0%,#1e2028 50%,#141619 100%)",
//                 borderRadius: "6px 4px 6px 4px",
//                 transform: "rotate(-5deg)",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.5),inset 0 1px 2px rgba(255,255,255,0.04)",
//               }}
//             >
//               {/* Left blunt */}
//               <div
//                 className="absolute"
//                 style={{
//                   top: 3, left: -18,
//                   borderTop: "22px solid transparent",
//                   borderBottom: "22px solid transparent",
//                   borderRight: "30px solid #1e2028",
//                 }}
//               />
//               {/* Right sharp spike */}
//               <div
//                 className="absolute"
//                 style={{
//                   top: -18, right: -22,
//                   width: 60, height: 86,
//                   background: "linear-gradient(135deg,#2e3038,#1a1c22)",
//                   clipPath: "polygon(0 35%,40% 0%,100% 45%,40% 100%,0 65%)",
//                 }}
//               />
//               {/* Ball joint */}
//               <div
//                 className="absolute"
//                 style={{
//                   top: -10, left: "50%", transform: "translateX(-50%)",
//                   width: 22, height: 22, borderRadius: "50%",
//                   background: "radial-gradient(circle at 35% 35%,#3a3d46,#1c1e24)",
//                   border: "2px solid #2e3038",
//                 }}
//               />
//             </div>
//             {/* Handle */}
//             <div
//               className="absolute"
//               style={{
//                 bottom: 0, right: "30%",
//                 width: 22, height: 160,
//                 background: "linear-gradient(180deg,#2a2d35,#1c1e24)",
//                 borderRadius: 11,
//                 transform: "rotate(8deg)",
//                 boxShadow: "inset -3px 0 6px rgba(0,0,0,0.4)",
//               }}
//             >
//               {/* Collar */}
//               <div
//                 className="absolute"
//                 style={{
//                   top: 130, left: -3,
//                   width: 28, height: 12,
//                   background: "#23252d",
//                   borderRadius: 4,
//                   border: "1px solid #32353e",
//                 }}
//               />
//             </div>
//           </div>

//           {/* Flying chips */}
//           {[
//             { w:14, h:10, top:"42%", left:"54%", rot:30 },
//             { w:10, h:8,  top:"37%", left:"60%", rot:-20 },
//             { w:8,  h:7,  top:"46%", left:"63%", rot:50 },
//             { w:6,  h:5,  top:"34%", left:"57%", rot:-40 },
//           ].map((c, i) => (
//             <div
//               key={i}
//               className="absolute"
//               style={{
//                 width: c.w, height: c.h,
//                 top: c.top, left: c.left,
//                 background: "linear-gradient(135deg,#2a2d35,#1c1e24)",
//                 borderRadius: 3,
//                 transform: `rotate(${c.rot}deg)`,
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-128px)] sm:min-h-[calc(100vh-68px)] flex items-center overflow-hidde">
      <div className="max-w-7xl mx-auto w-full flex flex-row items-center justify-between gap-8 py-12 md:py-16 px-4 sm:px-6">

        {/* ── Left: Copy ── */}
        <div className="flex-1 w-full md:max-w-[52%] flex flex-col items-center text-center md:items-start md:text-left" >
          <h1 className="text-[clamp(2rem,7vw,4rem)] font-bold leading-[1.08] tracking-tight text-[#16213e]" style={{fontFamily:"var(--font-heading)"}}>
            Invest in{" "}
            <em className="not-italic text-[#f46b1a]">Mining</em>
            <br />
            Cryptocurrencies
            <br />
            with no Hassle
          </h1>

          <p className="mt-5 text-[14px] sm:text-[15px] leading-[1.75] text-[#16213e]/50 max-w-[400px]">
            You will get periodic mining outputs to your designated wallet. We
            have the fastest crypto mining hardware running for you!
          </p>

          <div className="flex items-center gap-4 sm:gap-6 mt-8">
            <a
              href="#"
              className="inline-block text-[10px] sm:text-[15px] text-white px-4 py-2  rounded-full bg-[#f46b1a] transition-opacity hover:opacity-90 active:scale-95"
            >
              Start Mining
            </a>
            <a
              href="#"
              className="text-[10px] sm:text-[15px] underline underline-offset-4 decoration-1 text-[#16213e] transition-opacity hover:opacity-50"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* ── Right: Illustration ── */}
        <div
          className="flex-1 w-full flex items-end justify-center relative sm:block hidden"
          style={{ height: "clamp(280px, 40vw, 420px)" }}
          aria-hidden="true"
        >
          {/* Floor shadow */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[200px] sm:w-[260px] h-4 rounded-full bg-black/10 blur-[10px]" />

          {/* Rock formation */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[200px] sm:w-[260px] h-[160px] sm:h-[200px]">
            {/* Side rock left */}
            <div
              className="absolute bottom-0 left-0 w-[70px] sm:w-[90px] h-[88px] sm:h-[110px] rounded-lg"
              style={{
                background: "linear-gradient(135deg,#23252d,#16181e)",
                clipPath: "polygon(0 100%,0 30%,30% 0%,100% 20%,85% 100%)",
              }}
            />
            {/* Side rock right */}
            <div
              className="absolute bottom-0 right-2 w-[56px] sm:w-[70px] h-[72px] sm:h-[90px] rounded-lg"
              style={{
                background: "linear-gradient(135deg,#1e2026,#13141a)",
                clipPath: "polygon(20% 0%,100% 10%,100% 100%,0 100%,0 40%)",
              }}
            />
            {/* Main rock */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[190px] sm:w-[240px] h-[136px] sm:h-[170px]"
              style={{
                background: "linear-gradient(145deg,#2a2d35 0%,#1c1e24 60%,#111315 100%)",
                clipPath: "polygon(8% 100%,0% 55%,12% 20%,35% 5%,65% 0%,88% 8%,100% 40%,95% 100%)",
                borderRadius: "20px 22px 18px 18px",
              }}
            />

            {/* Bitcoin coin */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                bottom: 62, left: "50%", transform: "translateX(-10%)",
                width: 54, height: 54, borderRadius: "50%",
                background: "linear-gradient(145deg,#2e3038,#1a1c22)",
                border: "3px solid #3a3d46",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              <span className="text-[1.1rem] sm:text-[1.4rem] font-black text-[#4a4e58]">₿</span>
            </div>

            {/* Ethereum coin */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                bottom: 38, left: "18%",
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(145deg,#252830,#171920)",
                border: "3px solid #32353e",
              }}
            >
              <span className="text-[0.85rem] sm:text-[1rem] font-black text-[#3e4150]">⟐</span>
            </div>
          </div>

          {/* Pickaxe */}
          <div
            className="absolute"
            style={{
              top: "2%", left: "50%",
              width: "clamp(140px, 22vw, 200px)",
              height: "clamp(160px, 25vw, 220px)",
              transform: "translateX(-10%) rotate(-10deg)",
              transformOrigin: "70% 80%",
            }}
          >
            {/* Head */}
            <div
              className="absolute"
              style={{
                top: 10, left: 10, width: "70%", height: 44,
                background: "linear-gradient(135deg,#2e3038 0%,#1e2028 50%,#141619 100%)",
                borderRadius: "6px 4px 6px 4px",
                transform: "rotate(-5deg)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5),inset 0 1px 2px rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="absolute"
                style={{
                  top: 3, left: -18,
                  borderTop: "19px solid transparent",
                  borderBottom: "19px solid transparent",
                  borderRight: "26px solid #1e2028",
                }}
              />
              <div
                className="absolute"
                style={{
                  top: -16, right: -18,
                  width: 52, height: 76,
                  background: "linear-gradient(135deg,#2e3038,#1a1c22)",
                  clipPath: "polygon(0 35%,40% 0%,100% 45%,40% 100%,0 65%)",
                }}
              />
              <div
                className="absolute"
                style={{
                  top: -9, left: "50%", transform: "translateX(-50%)",
                  width: 18, height: 18, borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 35%,#3a3d46,#1c1e24)",
                  border: "2px solid #2e3038",
                }}
              />
            </div>
            {/* Handle */}
            <div
              className="absolute"
              style={{
                bottom: 0, right: "30%",
                width: 18, height: "clamp(120px, 18vw, 160px)",
                background: "linear-gradient(180deg,#2a2d35,#1c1e24)",
                borderRadius: 11,
                transform: "rotate(8deg)",
                boxShadow: "inset -3px 0 6px rgba(0,0,0,0.4)",
              }}
            >
              <div
                className="absolute"
                style={{
                  top: "80%", left: -3,
                  width: 24, height: 10,
                  background: "#23252d",
                  borderRadius: 4,
                  border: "1px solid #32353e",
                }}
              />
            </div>
          </div>

          {/* Flying chips */}
          {[
            { w:14, h:10, top:"42%", left:"54%", rot:30 },
            { w:10, h:8,  top:"37%", left:"60%", rot:-20 },
            { w:8,  h:7,  top:"46%", left:"63%", rot:50 },
            { w:6,  h:5,  top:"34%", left:"57%", rot:-40 },
          ].map((c, i) => (
            <div
              key={i}
              className="absolute rounded-[3px]"
              style={{
                width: c.w, height: c.h,
                top: c.top, left: c.left,
                background: "linear-gradient(135deg,#2a2d35,#1c1e24)",
                transform: `rotate(${c.rot}deg)`,
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}