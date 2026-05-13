import { useState } from "react";
import Navbar from "../components/Navbar";

import karualImg from "../assets/Karual ghata.jpg";
import maharajImg from "../assets/Maharaj.jpg";
import morajeImg from "../assets/Moraje.jpg";
import ramlingImg from "../assets/Ramling.jpg";
import wadaImg from "../assets/wada.jpg";
import sunsetImg from "../assets/Sunset.jpg";

const viewPoints = [
  { id: 1, name: "Karual Ghata", tag: "Trekking", altitude: "830m", desc: "A lush forested ledge offering a sweeping westward view toward the Konkan coast and Arabian Sea on clear days.", image: karualImg },
  { id: 2, name: "Maharaj Point", tag: "Wildlife", altitude: "Forest edge", desc: "On the border of Dajipur Wildlife Sanctuary — views of dense Sahyadri jungle and occasional bison sightings.", image: maharajImg },
  { id: 3, name: "Moraje Point", tag: "Seasonal", altitude: "Monsoon special", desc: "A hidden ledge above the seasonal cascade — best visited July to September when falls are at full force.", image: morajeImg },
  { id: 4, name: "Ramling Point", tag: "Photography", altitude: "Best at sunrise", desc: "The iconic hairpin bend road unfolds in full glory — a photographer's dream at golden hour.", image: ramlingImg },
  { id: 5, name: "Wada Point", tag: "Scenic", altitude: "Monsoon & winter", desc: "Named for thick mist rolling in from the Western Ghats — standing here feels like being above the clouds.", image: wadaImg },
  { id: 6, name: "Sunset Point", tag: "Popular", altitude: "5:30–7:00 PM", desc: "The most visited point — visitors gather to watch the sun dip into the Arabian Sea horizon.", image: sunsetImg },
];

function ViewPointCard({ point }) {
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
        boxShadow: hovered ? "0 12px 32px rgba(14,165,233,0.15)" : "0 2px 8px rgba(14,165,233,0.06)",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={point.image}
          alt={point.name}
          style={{
            width: "100%", height: "220px", objectFit: "cover", display: "block",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        <span style={{
          position: "absolute", top: "14px", left: "14px",
          background: "rgba(3,105,161,0.85)",
          color: "#fff", fontSize: "11px", fontWeight: 600,
          padding: "4px 10px", borderRadius: "4px",
          letterSpacing: "0.5px", textTransform: "uppercase",
        }}>{point.tag}</span>
      </div>
      <div style={{ padding: "20px 22px 24px" }}>
        <p style={{ fontSize: "11px", color: "#0ea5e9", letterSpacing: "1px", textTransform: "uppercase", margin: "0 0 6px" }}>
          📍 {point.altitude}
        </p>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 600, color: "#0c4a6e", margin: "0 0 10px" }}>
          {point.name}
        </h3>
        <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.7", margin: 0 }}>
          {point.desc}
        </p>
      </div>
    </div>
  );
}

function SubviewPoints() {
  return (
    <div style={{ fontFamily: "'Inter', 'Lato', sans-serif", background: "#f0f9ff", margin: 0 }}>
      <Navbar />

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #0c4a6e, #0369a1, #0ea5e9)",
        padding: "140px 24px 80px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "16px" }}>
          Explore
        </p>
        <h1 style={{
          fontFamily: "Georgia, serif", fontSize: "52px",
          fontWeight: 700, color: "#fff", margin: "0 0 18px", lineHeight: 1.15,
        }}>
          Sub View Points
        </h1>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.75)", maxWidth: "480px", margin: "0 auto", lineHeight: "1.7" }}>
          Beyond the main peak, Gaganbawda hides several breathtaking vantage points — each with its own personality and view.
        </p>
      </div>

      {/* Cards */}
      <section style={{ padding: "80px 60px", background: "#f0f9ff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            marginBottom: "60px",
          }}>
            {viewPoints.map((point) => <ViewPointCard key={point.id} point={point} />)}
          </div>

          {/* Info strip */}
          <div style={{
            display: "flex", gap: "40px", justifyContent: "center", flexWrap: "wrap",
            paddingTop: "40px", borderTop: "1px solid #bae6fd",
          }}>
            {[
              { icon: "🚗", text: "Most points accessible by road" },
              { icon: "⏱️", text: "Allow 4–5 hours to cover all" },
              { icon: "🌧️", text: "Best in monsoon & winter" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#0369a1" }}>
                <span style={{ fontSize: "20px" }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map CTA */}
      <section style={{ padding: "80px 60px", background: "linear-gradient(135deg, #0369a1, #0ea5e9)", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "32px", color: "#fff", margin: "0 0 16px" }}>
          Find Your Way There
        </h2>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", marginBottom: "32px" }}>
          All view points are accessible from Gaganbawda village.
        </p>
        <a href="https://maps.google.com/?q=Gaganbawda+viewpoint" target="_blank" rel="noreferrer" style={{
          padding: "14px 36px", borderRadius: "8px",
          background: "#fff", color: "#0369a1",
          fontWeight: 600, fontSize: "14px",
          textDecoration: "none", display: "inline-block",
        }}>
          Open in Google Maps →
        </a>
      </section>
    </div>
  );
}

export default SubviewPoints;