// Layout.jsx
import Navbar from "./navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div
      style={{
        background:
          "linear-gradient(160deg, var(--clr-bg-from) 0%, var(--clr-bg-mid) 40%, var(--clr-bg-to) 100%)",
        minHeight: "100%",
      }}
    >
      <Navbar />

      {/* Page content will render here */}
      <Outlet />

      <Footer />
    </div>
  );
}