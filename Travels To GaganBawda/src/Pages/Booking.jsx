import { useState } from "react";
import Navbar from "../components/Navbar";

const viewPointOptions = ["Karual Ghata", "Maharaj Point", "Moraje Point", "Ramling Point", "Wada Point", "Sunset Point"];

function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", viewPoint: "", people: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.phone.trim()) e.phone = true;
    if (!form.email.trim()) e.email = true;
    if (!form.date) e.date = true;
    if (!form.viewPoint) e.viewPoint = true;
    if (!form.people) e.people = true;
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setSubmitted(true);
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "12px 16px", fontSize: "15px",
    border: `1.5px solid ${errors[field] ? "#ef4444" : focused === field ? "#0369a1" : "#bae6fd"}`,
    borderRadius: "8px", outline: "none", boxSizing: "border-box",
    background: "#fff", color: "#0c4a6e", fontFamily: "inherit",
    transition: "border-color 0.2s",
  });

  if (submitted) {
    return (
      <div style={{ fontFamily: "'Inter','Lato',sans-serif", minHeight: "100vh", background: "#f0f9ff", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <Navbar />
        <div style={{
          background: "#fff", borderRadius: "16px", padding: "56px 48px",
          textAlign: "center", maxWidth: "480px", width: "100%",
          border: "1.5px solid #bae6fd",
          boxShadow: "0 8px 32px rgba(14,165,233,0.10)",
        }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "28px", color: "#0369a1" }}>✓</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "28px", color: "#0c4a6e", margin: "0 0 12px" }}>Booking Confirmed</h2>
          <p style={{ fontSize: "15px", color: "#64748b", lineHeight: "1.7", margin: "0 0 24px" }}>
            Thank you, <strong style={{ color: "#0369a1" }}>{form.name}</strong>. Your tour to <strong style={{ color: "#0369a1" }}>{form.viewPoint}</strong> on <strong style={{ color: "#0369a1" }}>{form.date}</strong> for <strong style={{ color: "#0369a1" }}>{form.people}</strong> {form.people === "1" ? "person" : "people"} is confirmed. We will reach you on <strong style={{ color: "#0369a1" }}>{form.phone}</strong>.
          </p>
          <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "8px", padding: "14px", marginBottom: "28px", fontSize: "13px", color: "#0369a1" }}>
            Confirmation will be sent to {form.email}
          </div>
          <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", date: "", viewPoint: "", people: "" }); }}
            style={{ padding: "12px 28px", borderRadius: "8px", background: "#0369a1", color: "#fff", border: "none", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
            Book Another Tour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter','Lato',sans-serif", background: "#f0f9ff", minHeight: "100vh", margin: 0 }}>
      <Navbar />

      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "120px 24px 80px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#0369a1", fontWeight: 600, marginBottom: "12px" }}>
          Book Now
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "36px", color: "#0c4a6e", margin: "0 0 8px" }}>
          Plan Your Tour
        </h1>
        <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "40px", lineHeight: "1.6" }}>
          Fill in your details and we will get back to you shortly.
        </p>

        <div style={{ background: "#fff", borderRadius: "14px", padding: "40px", border: "1.5px solid #bae6fd", boxShadow: "0 4px 20px rgba(14,165,233,0.08)" }}>
          {[
            { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
            { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
            { name: "email", label: "Email Address", type: "email", placeholder: "you@email.com" },
            { name: "date", label: "Tour Date", type: "date", placeholder: "" },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0c4a6e", marginBottom: "6px" }}>
                {field.label}
              </label>
              <input
                type={field.type} name={field.name}
                placeholder={field.placeholder} value={form[field.name]}
                onChange={handleChange}
                onFocus={() => setFocused(field.name)}
                onBlur={() => setFocused(null)}
                min={field.type === "date" ? new Date().toISOString().split("T")[0] : undefined}
                style={inputStyle(field.name)}
              />
              {errors[field.name] && <p style={{ fontSize: "12px", color: "#ef4444", margin: "4px 0 0" }}>This field is required</p>}
            </div>
          ))}

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0c4a6e", marginBottom: "6px" }}>View Point</label>
            <select name="viewPoint" value={form.viewPoint} onChange={handleChange}
              onFocus={() => setFocused("viewPoint")} onBlur={() => setFocused(null)}
              style={{ ...inputStyle("viewPoint"), cursor: "pointer" }}>
              <option value="">Select a view point</option>
              {viewPointOptions.map((vp) => <option key={vp} value={vp}>{vp}</option>)}
            </select>
            {errors.viewPoint && <p style={{ fontSize: "12px", color: "#ef4444", margin: "4px 0 0" }}>This field is required</p>}
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#0c4a6e", marginBottom: "6px" }}>Number of People</label>
            <input type="number" name="people" placeholder="How many people?"
              value={form.people} onChange={handleChange}
              onFocus={() => setFocused("people")} onBlur={() => setFocused(null)}
              min="1" max="50" style={inputStyle("people")} />
            {errors.people && <p style={{ fontSize: "12px", color: "#ef4444", margin: "4px 0 0" }}>This field is required</p>}
          </div>

          <button onClick={handleSubmit} style={{
            width: "100%", padding: "14px",
            background: "#0369a1", color: "#fff",
            border: "none", borderRadius: "8px",
            fontSize: "15px", fontWeight: 600,
            cursor: "pointer", letterSpacing: "0.3px", transition: "background 0.2s",
          }}
            onMouseEnter={(e) => e.target.style.background = "#075985"}
            onMouseLeave={(e) => e.target.style.background = "#0369a1"}
          >
            Confirm Booking →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Booking;