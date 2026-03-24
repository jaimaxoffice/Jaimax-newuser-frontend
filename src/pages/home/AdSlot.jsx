import { useEffect, useRef } from "react";

const IS_DEV = import.meta.env.VITE_IS_DEV === "true";

// Tracks whether the AdSense script tag has been injected yet
let scriptInjected = false;

function loadAdSenseScript() {
  return new Promise((resolve) => {
    // Already loaded and ready
    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      return resolve();
    }

    // Script tag already injected but not yet ready — wait for it
    if (scriptInjected) {
      const interval = setInterval(() => {
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
      return;
    }

    // First time: inject the script tag manually
    scriptInjected = true;

    window.adsbygoogle = window.adsbygoogle || [];

    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3376275015959269";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.onload = () => {
      const interval = setInterval(() => {
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    };

    script.onerror = () => {
      console.warn("AdSense script failed to load.");
      resolve(); // Don't block the component
    };

    document.head.appendChild(script);
  });
}

const AdSlot = ({ slot, width = 1000, height = 100, className = "" }) => {
  const insRef = useRef(null);

  useEffect(() => {
    const el = insRef.current;
    if (!el || IS_DEV) return;

    // Prevent double-push on the same <ins> element
    if (el.dataset.adsbygoogleStatus === "done") return;

    loadAdSenseScript().then(() => {
      // Re-check after async gap — component may have unmounted
      if (!insRef.current) return;
      if (insRef.current.dataset.adsbygoogleStatus === "done") return;

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.warn("AdSense push error:", err);
      }
    });
  }, []);

  // ── Dev placeholder ──────────────────────────────────────────────────────
  if (IS_DEV) {
    return (
      <div className={`w-full max-w-6xl mx-auto px-4 my-10 ${className}`}>
        <div
          style={{ width, height }}
          className="flex items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-100 text-gray-400 text-sm"
        >
          Ad Slot · {slot} · {width}×{height}
        </div>
      </div>
    );
  }

  // ── Production slot ───────────────────────────────────────────────────────
  // Mirrors Google's output exactly:
  //   <ins class="adsbygoogle"
  //        style="display:inline-block;width:1000px;height:100px"
  //        data-ad-client="ca-pub-3376275015959269"
  //        data-ad-slot="9597126985">
  //   </ins>
  return (
    <div className={`w-full max-w-6xl mx-auto px-4 my-10 ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "inline-block", width, height }}
        data-ad-client="ca-pub-3376275015959269"
        data-ad-slot={slot}
      />
    </div>
  );
};

export default AdSlot;