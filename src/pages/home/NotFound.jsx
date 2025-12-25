


// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #f0fdfa 0%, #ccfbf1 100%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", padding: 40 }}>
        {/* Unplugged Cable Animation */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 30 }}>
          {/* Left Plug */}
          <motion.div
            animate={{ x: [-5, -15, -5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="80" height="60" viewBox="0 0 80 60">
              <rect x="0" y="20" width="50" height="20" rx="4" fill="#14b8a6" />
              <rect x="50" y="15" width="15" height="10" fill="#0d9488" />
              <rect x="50" y="35" width="15" height="10" fill="#0d9488" />
              <circle cx="20" cy="30" r="4" fill="#0f766e" />
              <circle cx="35" cy="30" r="4" fill="#0f766e" />
            </svg>
          </motion.div>

          {/* Spark Effect */}
          <motion.div
            style={{ alignSelf: "center" }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30">
              <path
                d="M15 5 L17 12 L24 15 L17 18 L15 25 L13 18 L6 15 L13 12 Z"
                fill="#fbbf24"
              />
            </svg>
          </motion.div>

          {/* Right Socket */}
          <motion.div
            animate={{ x: [5, 15, 5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="80" height="60" viewBox="0 0 80 60">
              <rect x="15" y="20" width="50" height="20" rx="4" fill="#14b8a6" />
              <rect x="0" y="22" width="20" height="6" fill="#0f766e" />
              <rect x="0" y="32" width="20" height="6" fill="#0f766e" />
            </svg>
          </motion.div>
        </div>

        {/* 404 */}
        <motion.h1
          style={{
            fontSize: 90,
            fontWeight: 800,
            color: "#0d9488",
            margin: 0,
            lineHeight: 1,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#0f766e",
            margin: "15px 0",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          style={{
            fontSize: 16,
            color: "#5eead4",
            marginBottom: 35,
            maxWidth: 300,
            marginInline: "auto",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Looks like this page is not found. Let's get you back on track.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <motion.button
              style={{
                padding: "14px 35px",
                fontSize: 16,
                fontWeight: 600,
                color: "#fff",
                background: "#14b8a6",
                border: "none",
                borderRadius: 30,
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(20, 184, 166, 0.3)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(20, 184, 166, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}