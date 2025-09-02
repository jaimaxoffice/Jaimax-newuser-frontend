import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SecurityLayer() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // ---- 1) Frame check (runtime, in addition to headers) ----
    function enforceNoIframe() {
      if (window.top !== window.self) {
        try { window.top.location = window.location.href; } catch (e) {
          document.documentElement.innerHTML = "";
        }
      }
    }

    // ---- 2) DevTools detection heuristics ----
    let devtoolsOpen = false;
    let intervalId;

    const checkBySize = () => {
      // Side docked devtools usually shrink inner/outer dimensions
      const threshold = 160; // tweak
      const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
      const heightDiff = Math.abs(window.outerHeight - window.innerHeight);
      return (widthDiff > threshold) || (heightDiff > threshold);
    };

    const checkByDebug = () => {
      // If DevTools are open, this may take longer / trigger breakpoints
      const start = performance.now();
      debugger; // harmless if not paused; can trip when open
      return performance.now() - start > 50; // heuristic threshold
    };

    const runChecks = () => {
      const detected = checkBySize() || checkByDebug();
      if (detected && !devtoolsOpen) {
        devtoolsOpen = true;
        // React: blank out UI or redirect to a safe page
        document.body.innerHTML =
          "<h1 style='color:red;text-align:center;margin-top:20%'>🚫 Developer tools detected</h1>";
        // Or: navigate("/blocked");
      }
    };

    // ---- 3) Block common shortcuts & context menu (cosmetic) ----
    function keyGuard(e) {
      const key = e.key?.toLowerCase();
      // F12
      if (key === "f12") return e.preventDefault();
      // Ctrl+Shift+I/J/C
      if (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) return e.preventDefault();
      // Ctrl+Shift+E (Network conditions)
      if (e.ctrlKey && e.shiftKey && key === "e") return e.preventDefault();
      // Cmd+Alt+I (mac)
      if (e.metaKey && e.altKey && key === "i") return e.preventDefault();
    }
    function contextGuard(e) { e.preventDefault(); }

    // ---- Init ----
    enforceNoIframe();
    window.addEventListener("blur", runChecks);
    window.addEventListener("focus", runChecks);
    window.addEventListener("resize", runChecks);
    window.addEventListener("keydown", keyGuard, true);
    window.addEventListener("contextmenu", contextGuard, true);

    intervalId = setInterval(runChecks, 1000);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("blur", runChecks);
      window.removeEventListener("focus", runChecks);
      window.removeEventListener("resize", runChecks);
      window.removeEventListener("keydown", keyGuard, true);
      window.removeEventListener("contextmenu", contextGuard, true);
    };
  }, [location.pathname]);

  return null;
}
