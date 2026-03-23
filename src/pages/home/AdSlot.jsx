import { useEffect, useRef } from "react";

const IS_DEV = import.meta.env.DEV;

const AdSlot = ({ slot, className = "" }) => {
  const insRef = useRef(null);

  useEffect(() => {
  const el = insRef.current;
  if (!el || IS_DEV) return;
  if (el.dataset.adsbygoogleStatus === "done") return;

  const timer = setTimeout(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.warn("AdSense push error:", err);
    }
  }, 300); // small delay helps

  return () => clearTimeout(timer);
}, []);

  if (IS_DEV) {
    return (
      <div className={`w-full max-w-6xl mx-auto px-4 my-10 ${className}`}>
        <div className="w-full min-h-[90px] flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-300 text-gray-400 text-sm">
          Ad Slot · {slot}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-6xl mx-auto px-4 my-10 ${className}`}>
      <ins
  ref={insRef}
  className="adsbygoogle block w-full"
  style={{ display: "block", minHeight: "250px" }}
  data-ad-client="ca-pub-3376275015959269"
  data-ad-slot={slot}
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
    </div>
  );
};

export default AdSlot;