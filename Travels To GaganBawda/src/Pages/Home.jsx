import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import gaganbawdaImg from "../assets/gaganbawda2.jpg";

const stats = [
  { value: "850m", label: "Altitude" },
  { value: "6+", label: "View Points" },
  { value: "65km", label: "From Kolhapur" },
  { value: "Jun–Feb", label: "Best Season" },
];

const features = [
  { emoji: "🌿", title: "Nature & Forest", desc: "Dense Sahyadri forests, fresh air and breathtaking green landscapes all around." },
  { emoji: "💧", title: "Waterfalls", desc: "Seasonal waterfalls cascade down the ghats, best experienced during monsoon." },
  { emoji: "🥾", title: "Trekking", desc: "Multiple trails for all fitness levels through the Western Ghats wilderness." },
  { emoji: "🛕", title: "Ramling Caves", desc: "Monolithic rock-cut structures, 12 Shivlingas representing 12 Jyotirlingas, lush greenery, and a natural water stream." },
  { emoji: "🌅", title: "Sunset Views", desc: "Watch the sun sink into the Arabian Sea from the iconic Sunset Point." },
  { emoji: "📸", title: "Photography", desc: "Hairpin bends, misty valleys and golden hour light — a photographer's paradise." },
];

function FeatureCard({ emoji, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "32px 28px",
        borderRadius: "16px",
        border: `1.5px solid ${hovered ? "#34d399" : "#e5e7eb"}`,
        background: hovered ? "#f0fdf4" : "#fff",
        transition: "all 0.25s ease",
        cursor: "default",
        boxShadow: hovered ? "0 8px 24px rgba(52,211,153,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ fontSize: "36px", marginBottom: "16px" }}>{emoji}</div>
      <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#1a1a1a", margin: "0 0 10px" }}>{title}</h3>
      <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: "1.7", margin: 0 }}>{desc}</p>
    </div>
  );
}

function Home() {
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#fff", margin: 0, padding: 0 }}>
      <Navbar />

      {/* Hero - Full Screen Image */}
      <section style={{
        height: "100vh",
        backgroundImage: `url(${gaganbawdaImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        padding: "0 24px",
      }}>
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.75) 100%)",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontSize: "12px", letterSpacing: "5px", textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)", marginBottom: "24px", fontWeight: 400,
            fontFamily: "'Lato', sans-serif",
          }}>
            Kolhapur · Maharashtra · India
          </p>
          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "80px",
            fontWeight: 700,
            color: "#fff",
            margin: "0 0 20px",
            lineHeight: 1.05,
            letterSpacing: "-2px",
            textShadow: "0 4px 30px rgba(0,0,0,0.4)",
          }}>
            Welcome to<br />Gaganbawda
          </h1>
          <p style={{
            fontSize: "19px",
            color: "rgba(255,255,255,0.88)",
            marginBottom: "44px",
            maxWidth: "520px",
            margin: "0 auto 44px",
            lineHeight: "1.7",
            fontFamily: "'Lato', sans-serif",
            fontWeight: 300,
          }}>
            Experience nature, waterfalls and breathtaking view points in the heart of the Sahyadris.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/subviewpoints" style={{
              padding: "16px 36px", borderRadius: "8px",
              background: "#fff", color: "#1a1a1a",
              fontWeight: 700, fontSize: "15px",
              textDecoration: "none",
              fontFamily: "'Lato', sans-serif",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              letterSpacing: "0.3px",
            }}>
              Explore View Points →
            </Link>
            <Link to="/booking" style={{
              padding: "16px 36px", borderRadius: "8px",
              background: "transparent", color: "#fff",
              fontWeight: 600, fontSize: "15px",
              textDecoration: "none",
              border: "2px solid rgba(255,255,255,0.7)",
              fontFamily: "'Lato', sans-serif",
              letterSpacing: "0.3px",
              backdropFilter: "blur(4px)",
            }}>
              Book a Tour
            </Link>
          </div>
        </div>

        {/* Stats bar at bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "center",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "22px 56px",
              textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
            }}>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif" }}>{s.value}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px", fontFamily: "'Lato', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "100px 60px", background: "#f9fafb" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "60px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#16a34a", fontWeight: 700, marginBottom: "14px", fontFamily: "'Lato', sans-serif" }}>
              Why Visit
            </p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "42px", color: "#1a1a1a", margin: "0", fontWeight: 600, lineHeight: 1.2 }}>
              What awaits you
            </h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}>
            {features.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: "100px 60px",
        background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${gaganbawdaImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "20px", fontFamily: "'Lato', sans-serif" }}>
          Plan Your Trip
        </p>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "48px", color: "#fff", margin: "0 0 20px", lineHeight: 1.2 }}>
          Ready to explore?
        </h2>
        <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.75)", marginBottom: "40px", maxWidth: "460px", margin: "0 auto 40px", lineHeight: "1.8", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
          Book your tour today and experience the magic of Gaganbawda firsthand.
        </p>
        <Link to="/booking" style={{
          padding: "18px 44px", borderRadius: "8px",
          background: "#fff", color: "#1a1a1a",
          fontWeight: 700, fontSize: "16px",
          textDecoration: "none", display: "inline-block",
          fontFamily: "'Lato', sans-serif",
          letterSpacing: "0.5px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}>
          Book Your Tour →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ background: "#111", padding: "64px 60px 32px" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "48px",
          marginBottom: "48px",
        }}>
          <div>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "20px", color: "#fff", fontWeight: 700, margin: "0 0 16px", letterSpacing: "1px" }}>
              GAGANBAWDA
            </p>
            <p style={{ fontSize: "14px", color: "#9ca3af", lineHeight: "1.9", margin: 0, maxWidth: "300px", fontFamily: "'Lato', sans-serif" }}>
              A scenic mountain pass in the Sahyadri ranges of Maharashtra — where nature, history and adventure meet.
            </p>
          </div>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#6b7280", marginBottom: "20px", fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>
              Pages
            </p>
            {[
              { to: "/", l: "Home" },
              { to: "/about", l: "About" },
              { to: "/subviewpoints", l: "View Points" },
              { to: "/booking", l: "Book Tour" }
            ].map((lnk, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <Link to={lnk.to} style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px", fontFamily: "'Lato', sans-serif" }}
                  onMouseEnter={(e) => e.target.style.color = "#fff"}
                  onMouseLeave={(e) => e.target.style.color = "#9ca3af"}
                >{lnk.l}</Link>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#6b7280", marginBottom: "20px", fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>
              Contact
            </p>
            <p style={{ fontSize: "14px", color: "#9ca3af", lineHeight: "2.1", margin: 0, fontFamily: "'Lato', sans-serif" }}>
              Gaganbawda, Kolhapur<br />
              Maharashtra, India<br />
              info@gaganbawda.com
            </p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #222", paddingTop: "24px", textAlign: "center", fontSize: "13px", color: "#4b5563", fontFamily: "'Lato', sans-serif" }}>
          © 2026 Travels To Gaganbawda · Made with ❤️ in Maharashtra
        </div>
      </footer>
    </div>
  );
}

export default Home;