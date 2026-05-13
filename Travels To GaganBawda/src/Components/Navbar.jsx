import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/subviewpoints", label: "View Points" },
];

function Navbar() {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 60px",
      height: "68px",
      backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 100,
      boxSizing: "border-box",
      borderBottom: scrolled ? "1px solid #e5e7eb" : "none",
      transition: "all 0.35s ease",
    }}>
      {/* Brand */}
      <Link to="/" style={{
        textDecoration: "none",
        fontFamily: "Georgia, serif",
        fontSize: "18px",
        fontWeight: 700,
        color: scrolled ? "#1a1a1a" : "#fff",
        letterSpacing: "2px",
        transition: "color 0.35s ease",
      }}>
        GAGANBAWDA
      </Link>

      {/* Links */}
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              onMouseEnter={() => setHovered(link.to)}
              onMouseLeave={() => setHovered(null)}
              style={{
                color: scrolled
                  ? (isActive ? "#1a1a1a" : "#6b7280")
                  : (isActive ? "#fff" : "rgba(255,255,255,0.80)"),
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: isActive ? 600 : 400,
                padding: "6px 16px",
                borderRadius: "6px",
                letterSpacing: "0.5px",
                fontFamily: "'Lato', sans-serif",
                background: hovered === link.to
                  ? (scrolled ? "#f3f4f6" : "rgba(255,255,255,0.12)")
                  : "transparent",
                borderBottom: isActive
                  ? `2px solid ${scrolled ? "#1a1a1a" : "#fff"}`
                  : "2px solid transparent",
                transition: "all 0.25s ease",
              }}
            >
              {link.label}
            </Link>
          );
        })}

        <Link to="/booking"
          onMouseEnter={() => setHovered("booking")}
          onMouseLeave={() => setHovered(null)}
          style={{
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 600,
            padding: "9px 22px",
            borderRadius: "6px",
            marginLeft: "10px",
            background: scrolled ? "#1a1a1a" : "rgba(255,255,255,0.18)",
            color: "#fff",
            border: scrolled ? "none" : "1.5px solid rgba(255,255,255,0.6)",
            letterSpacing: "0.5px",
            fontFamily: "'Lato', sans-serif",
            transition: "all 0.35s ease",
            opacity: hovered === "booking" ? 0.85 : 1,
          }}
        >
          Book Tour
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;