import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";

import Top1 from "../assets/Top1.jpg";
import Top2 from "../assets/Top2.jpg";
import Top3 from "../assets/Top3.jpg";
import Top4 from "../assets/Top4.jpg";
import Top5 from "../assets/Top5.jpg";
import Top7 from "../assets/Top7.jpg";

const stats = [
  { value: "850m", label: "Altitude" },
  { value: "1000+", label: "Years of History" },
  { value: "65km", label: "From Kolhapur" },
  { value: "Jun–Feb", label: "Best Season" },
];

const attractions = [
  { name: "Waterfalls", tag: "Seasonal", image: Top1 },
  { name: "Konkan Valley Vista", tag: "Popular", image: Top2 },
  { name: "Sunset point", tag: "Photography", image: Top3 },
  { name: "Fog Point", tag: "Scenic", image: Top4 },
  { name: "Leka Views", tag: "Adventure", image: Top5 },
  { name: "Leka Views", tag: "Adventure", image: Top7 },
];

function AttractionCard({ name, tag, image }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        border: `1.5px solid ${hovered ? "#7dd3fc" : "#bae6fd"}`,
        background: "#fff",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(14,165,233,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
        cursor: "default",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        <span style={{
          position: "absolute", top: "10px", left: "10px",
          background: "rgba(3,105,161,0.85)",
          color: "#fff", fontSize: "10px", fontWeight: 700,
          padding: "3px 10px", borderRadius: "4px",
          letterSpacing: "1px", textTransform: "uppercase",
          fontFamily: "'Lato', sans-serif",
        }}>{tag}</span>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <h3 style={{
          fontFamily: "Georgia, serif",
          fontSize: "15px", fontWeight: 600,
          color: "#0c4a6e", margin: 0,
        }}>{name}</h3>
      </div>
    </div>
  );
}

function About() {
  return (
    <div style={{ fontFamily: "'Lato', sans-serif", background: "#f0f9ff", margin: 0 }}>
      <Navbar />

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
      }}>
        <p style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "16px" }}>
          About
        </p>
        <h1 style={{
          fontFamily: "Georgia, serif", fontSize: "56px",
          fontWeight: 700, color: "#fff",
          margin: "0 0 20px", lineHeight: 1.15,
        }}>
          Gaganbawda
        </h1>
        <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.75)", maxWidth: "500px", lineHeight: "1.7", margin: 0 }}>
          A scenic mountain pass nestled in the Sahyadri ranges of Maharashtra — where every view takes your breath away.
        </p>
      </div>

      {/* Stats */}
      <div style={{ background: "#0369a1", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: "28px 56px", textAlign: "center",
            borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
          }}>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif" }}>{s.value}</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", letterSpacing: "1px", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* History & Nature */}
      <section style={{ padding: "100px 60px", background:"rgb(224, 242, 254)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#036aa1", fontWeight: 600, marginBottom: "12px" }}>History</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "32px", color: "#0c4a6e", margin: "0 0 20px", lineHeight: 1.3 }}>
              A Route Through Time
            </h2>
            <p style={{ fontSize: "15px", color: "#64748b", lineHeight: "1.85", marginBottom: "16px" }}>
              The Gaganbawda Ghat has historically been an important route connecting Kolhapur to the Konkan coast. During the reign of Chhatrapati Shivaji Maharaj, this ghat held great strategic importance.
            </p>
            <p style={{ fontSize: "15px", color: "#64748b", lineHeight: "1.85", margin: 0 }}>
              The famous hairpin bends of the ghat road, built during the British era, continue to amaze visitors to this day.
            </p>
          </div>
          
            
            
            
          
        </div>
      </section>

      {/* Top Attractions */}
      <section style={{ padding: "80px 60px", background: "rgb(224, 242, 254)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#0369a1", fontWeight: 600, marginBottom: "12px" }}>
            Must See
          </p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "36px", color: "#0c4a6e", margin: "0 0 48px" }}>
            Top Attractions
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}>
            {attractions.map((a, i) => (
              <AttractionCard key={i} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 60px", background: "linear-gradient(135deg, #0369a1, #0ea5e9)", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "36px", color: "#fff", margin: "0 0 16px" }}>
          Plan Your Visit
        </h2>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", marginBottom: "32px", lineHeight: "1.7" }}>
          Once you visit Gaganbawda, you will always want to come back.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/booking" style={{
            padding: "14px 32px", borderRadius: "8px",
            background: "#fff", color: "#0369a1",
            fontWeight: 600, fontSize: "14px", textDecoration: "none",
          }}>Book a Tour →</Link>
          <a href="https://maps.google.com/?q=Gaganbawda,Maharashtra" target="_blank" rel="noreferrer" style={{
            padding: "14px 32px", borderRadius: "8px",
            background: "transparent", color: "#fff",
            fontWeight: 600, fontSize: "14px", textDecoration: "none",
            border: "1.5px solid rgba(255,255,255,0.5)",
          }}>View on Maps</a>
        </div>
      </section>
    </div>
  );
}

export default About;