import { useState, useEffect, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════════
   STUDENT ERP PORTAL — Complete React Application
   All-in-one: Login + Dashboard + CRUD + Reports
   ═══════════════════════════════════════════════ */

// ─── CONSTANTS ──────────────────────────────────
const BRANCHES = [
  "Computer Science", "Information Technology", "Electronics & Communication",
  "Mechanical Engineering", "Civil Engineering", "Electrical Engineering",
  "Biotechnology", "Chemical Engineering",
];

const COURSES = {
  "Computer Science": ["Data Structures", "Algorithms", "DBMS", "Operating Systems", "Web Development", "AI & Machine Learning", "Computer Networks", "Compiler Design"],
  "Information Technology": ["Web Technologies", "Cyber Security", "Cloud Computing", "IoT", "Data Mining", "Software Engineering", "Mobile App Dev"],
  "Electronics & Communication": ["Digital Electronics", "Signal Processing", "VLSI Design", "Microprocessors", "Embedded Systems", "Communication Systems"],
  "Mechanical Engineering": ["Thermodynamics", "Fluid Mechanics", "Machine Design", "CAD/CAM", "Manufacturing Processes", "Heat Transfer"],
  "Civil Engineering": ["Structural Analysis", "Soil Mechanics", "Fluid Mechanics", "Surveying", "Construction Management", "Environmental Engg"],
  "Electrical Engineering": ["Circuit Theory", "Power Systems", "Control Systems", "Electrical Machines", "Power Electronics", "Instrumentation"],
  "Biotechnology": ["Molecular Biology", "Genetic Engineering", "Biochemistry", "Microbiology", "Bioprocess Engineering", "Bioinformatics"],
  "Chemical Engineering": ["Chemical Reaction Engineering", "Transport Phenomena", "Process Control", "Thermodynamics", "Mass Transfer"],
};

const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const BRANCH_COLORS = ["#6366f1","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#14b8a6"];

const SEED_STUDENTS = [
  { id:"STU001", name:"Ananya Sharma", gender:"Female", dob:"2003-04-12", phone:"9876543210", email:"ananya@edu.in", address:"123 MG Road, Pune", branch:"Computer Science", semester:"5th", attendance:88, cgpa:8.6, fees:75000, feesPaid:75000, feesStatus:"Paid", courses:["Data Structures","Algorithms","DBMS","Operating Systems"], exams:[{sub:"Data Structures",marks:85,max:100},{sub:"Algorithms",marks:78,max:100},{sub:"DBMS",marks:91,max:100}], joinDate:"2021-07-15" },
  { id:"STU002", name:"Rahul Patil", gender:"Male", dob:"2003-09-20", phone:"9812345678", email:"rahul@edu.in", address:"45 Shivaji Nagar, Nashik", branch:"Mechanical Engineering", semester:"3rd", attendance:72, cgpa:7.1, fees:65000, feesPaid:30000, feesStatus:"Partial", courses:["Thermodynamics","Fluid Mechanics","Machine Design"], exams:[{sub:"Thermodynamics",marks:60,max:100},{sub:"Fluid Mechanics",marks:71,max:100}], joinDate:"2022-07-20" },
  { id:"STU003", name:"Priya Mehta", gender:"Female", dob:"2001-12-05", phone:"9911223344", email:"priya@edu.in", address:"78 Link Road, Mumbai", branch:"Information Technology", semester:"7th", attendance:94, cgpa:9.1, fees:80000, feesPaid:0, feesStatus:"Unpaid", courses:["Cyber Security","Cloud Computing","IoT","Data Mining"], exams:[{sub:"Cyber Security",marks:92,max:100},{sub:"Cloud Computing",marks:87,max:100}], joinDate:"2020-07-18" },
  { id:"STU004", name:"Arjun Desai", gender:"Male", dob:"2002-06-30", phone:"9977665544", email:"arjun@edu.in", address:"22 Deccan, Pune", branch:"Electronics & Communication", semester:"4th", attendance:65, cgpa:6.8, fees:70000, feesPaid:70000, feesStatus:"Paid", courses:["Digital Electronics","Signal Processing","VLSI Design"], exams:[{sub:"Digital Electronics",marks:55,max:100},{sub:"Signal Processing",marks:63,max:100}], joinDate:"2021-07-10" },
  { id:"STU005", name:"Sneha Kulkarni", gender:"Female", dob:"2002-03-17", phone:"9823456789", email:"sneha@edu.in", address:"9 Baner Road, Pune", branch:"Civil Engineering", semester:"6th", attendance:91, cgpa:8.3, fees:68000, feesPaid:68000, feesStatus:"Paid", courses:["Structural Analysis","Soil Mechanics","Fluid Mechanics"], exams:[{sub:"Structural Analysis",marks:82,max:100},{sub:"Soil Mechanics",marks:79,max:100}], joinDate:"2021-07-22" },
  { id:"STU006", name:"Vikram Singh", gender:"Male", dob:"2004-01-08", phone:"9001234567", email:"vikram@edu.in", address:"56 Koregaon Park, Pune", branch:"Biotechnology", semester:"2nd", attendance:80, cgpa:7.5, fees:72000, feesPaid:36000, feesStatus:"Partial", courses:["Molecular Biology","Biochemistry"], exams:[{sub:"Molecular Biology",marks:74,max:100}], joinDate:"2023-07-15" },
  { id:"STU007", name:"Kavya Nair", gender:"Female", dob:"2003-07-22", phone:"9988776655", email:"kavya@edu.in", address:"34 MG Road, Kochi", branch:"Electrical Engineering", semester:"5th", attendance:85, cgpa:8.0, fees:69000, feesPaid:69000, feesStatus:"Paid", courses:["Circuit Theory","Power Systems","Control Systems"], exams:[{sub:"Circuit Theory",marks:80,max:100},{sub:"Power Systems",marks:76,max:100}], joinDate:"2021-07-14" },
  { id:"STU008", name:"Rohan Sharma", gender:"Male", dob:"2004-03-15", phone:"9112233445", email:"rohan@edu.in", address:"12 Sector 5, Noida", branch:"Chemical Engineering", semester:"1st", attendance:78, cgpa:7.2, fees:71000, feesPaid:0, feesStatus:"Unpaid", courses:["Thermodynamics","Mass Transfer"], exams:[{sub:"Thermodynamics",marks:68,max:100}], joinDate:"2024-07-10" },
];

// ─── HELPERS ─────────────────────────────────────
const initials = (n) => n.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();
const avatarBg = (n) => { const c=["#6366f1","#8b5cf6","#06b6d4","#10b981","#f59e0b","#ef4444","#ec4899","#14b8a6"]; let h=0; for(const x of n) h=(h*31+x.charCodeAt(0))%c.length; return c[h]; };
const nextId = (arr) => { const n=arr.map(s=>parseInt(s.id.replace("STU",""))||0); return "STU"+String(Math.max(0,...n)+1).padStart(3,"0"); };
const grade = (m) => m>=90?"O":m>=80?"A+":m>=70?"A":m>=60?"B+":m>=50?"B":"F";
const gradeColor = (m) => m>=75?"#10b981":m>=60?"#f59e0b":"#ef4444";
const autoStatus = (paid, total) => paid<=0?"Unpaid":paid>=total?"Paid":"Partial";

// ─── GLOBAL STYLES ───────────────────────────────
const GS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #050811; --bg2: #0c1120; --bg3: #101828; --bg4: #141e2e;
    --acc: #6366f1; --acc2: #818cf8; --acc3: #4f46e5;
    --teal: #06b6d4; --green: #10b981; --amber: #f59e0b; --red: #ef4444; --pink: #ec4899;
    --t1: #f8fafc; --t2: #94a3b8; --t3: #475569; --t4: #1e293b;
    --bdr: rgba(255,255,255,0.07); --bdr2: rgba(255,255,255,0.12);
    --font: 'Plus Jakarta Sans', sans-serif; --font2: 'Syne', sans-serif;
  }
  html, body, #root { height: 100%; }
  body { font-family: var(--font); background: var(--bg); color: var(--t1); overflow: hidden; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 2px; }
  input, select, textarea { font-family: var(--font); }
  button { font-family: var(--font); }
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes float { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(1.02); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
  @keyframes modalPop { from { opacity:0; transform:scale(0.94) translateY(12px); } to { opacity:1; transform:scale(1) translateY(0); } }
  @keyframes toastSlide { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
`;

// ─── ATOMIC COMPONENTS ───────────────────────────

const Avatar = ({ name, size = 36 }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.28, flexShrink: 0,
    background: `linear-gradient(135deg, ${avatarBg(name)}, ${avatarBg(name)}bb)`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.33, fontWeight: 700, color: "#fff", fontFamily: "var(--font2)",
    boxShadow: `0 0 0 2px ${avatarBg(name)}33`,
  }}>
    {initials(name)}
  </div>
);

const Badge = ({ children, color = "indigo", size = "sm" }) => {
  const map = {
    indigo: ["rgba(99,102,241,.15)", "#818cf8", "rgba(99,102,241,.25)"],
    green:  ["rgba(16,185,129,.15)", "#34d399", "rgba(16,185,129,.25)"],
    red:    ["rgba(239,68,68,.15)",  "#f87171", "rgba(239,68,68,.25)"],
    amber:  ["rgba(245,158,11,.15)", "#fbbf24", "rgba(245,158,11,.25)"],
    cyan:   ["rgba(6,182,212,.15)",  "#22d3ee", "rgba(6,182,212,.25)"],
    pink:   ["rgba(236,72,153,.15)", "#f472b6", "rgba(236,72,153,.25)"],
    gray:   ["rgba(148,163,184,.1)", "#94a3b8", "rgba(148,163,184,.2)"],
  };
  const [bg, col, bdr] = map[color] || map.indigo;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: size === "xs" ? "2px 7px" : "3px 10px",
      borderRadius: 20, fontSize: size === "xs" ? 10 : 11, fontWeight: 700,
      background: bg, color: col, border: `1px solid ${bdr}`, whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
};

const FeesBadge = ({ s }) =>
  s === "Paid" ? <Badge color="green">✓ Paid</Badge> :
  s === "Unpaid" ? <Badge color="red">✗ Unpaid</Badge> :
  <Badge color="amber">≈ Partial</Badge>;

const AttBadge = ({ v }) =>
  v >= 85 ? <Badge color="green">{v}%</Badge> :
  v >= 75 ? <Badge color="amber">{v}%</Badge> :
  <Badge color="red">{v}%</Badge>;

const ProgressBar = ({ value, max = 100, color = "#6366f1", height = 6 }) => (
  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 999, height, overflow: "hidden", flex: 1, minWidth: 60 }}>
    <div style={{
      height: "100%", width: `${Math.min((value / max) * 100, 100)}%`,
      background: color, borderRadius: 999,
      transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
      boxShadow: `0 0 8px ${color}66`,
    }} />
  </div>
);

const StatCard = ({ label, value, color, icon, sub }) => {
  const gradients = {
    indigo: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    cyan:   "linear-gradient(135deg, #06b6d4, #3b82f6)",
    green:  "linear-gradient(135deg, #10b981, #059669)",
    amber:  "linear-gradient(135deg, #f59e0b, #d97706)",
    pink:   "linear-gradient(135deg, #ec4899, #db2777)",
  };
  const bg = gradients[color] || gradients.indigo;
  return (
    <div style={{
      background: "var(--bg3)", border: "1px solid var(--bdr)", borderRadius: 16,
      padding: "20px", position: "relative", overflow: "hidden",
      animation: "fadeUp 0.4s ease both",
      transition: "border-color 0.2s, transform 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--bdr2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--bdr)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: bg }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>{label}</div>
          <div style={{ fontFamily: "var(--font2)", fontSize: 30, fontWeight: 800, color: "var(--t1)", lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: 11, color: "var(--t3)", marginTop: 6 }}>{sub}</div>}
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: bg,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
          boxShadow: `0 4px 16px ${color === "indigo" ? "#6366f133" : color === "cyan" ? "#06b6d433" : "#10b98133"}`,
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const Btn = ({ children, onClick, variant = "primary", size = "md", disabled = false, style: sx = {} }) => {
  const styles = {
    primary: { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", boxShadow: "0 4px 15px rgba(99,102,241,0.35)" },
    secondary: { background: "var(--bg4)", color: "var(--t2)", border: "1px solid var(--bdr2)" },
    danger: { background: "rgba(239,68,68,.12)", color: "#f87171", border: "1px solid rgba(239,68,68,.25)" },
    success: { background: "rgba(16,185,129,.12)", color: "#34d399", border: "1px solid rgba(16,185,129,.25)" },
    ghost: { background: "transparent", color: "var(--t2)", border: "1px solid var(--bdr)" },
  };
  const sizes = { sm: { padding: "5px 12px", fontSize: 12 }, md: { padding: "8px 16px", fontSize: 13 }, lg: { padding: "12px 24px", fontSize: 14 } };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 10, fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
      transition: "all 0.15s", fontFamily: "var(--font)",
      ...styles[variant], ...sizes[size], ...sx,
    }}
      onMouseEnter={e => { if (!disabled && variant === "primary") { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.45)"; } }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = styles[variant].boxShadow || ""; }}
    >
      {children}
    </button>
  );
};

const FormField = ({ label, children, full }) => (
  <div style={{ gridColumn: full ? "1 / -1" : undefined, display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ fontSize: 10, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</label>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder, type = "text", min, max, step }) => (
  <input
    type={type} value={value} onChange={onChange} placeholder={placeholder}
    min={min} max={max} step={step}
    style={{
      padding: "9px 12px", background: "var(--bg2)", border: "1px solid var(--bdr2)",
      borderRadius: 9, color: "var(--t1)", fontSize: 13, outline: "none", width: "100%",
      transition: "border-color 0.2s, box-shadow 0.2s", fontFamily: "var(--font)",
    }}
    onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; }}
    onBlur={e => { e.target.style.borderColor = "var(--bdr2)"; e.target.style.boxShadow = "none"; }}
  />
);

const Select = ({ value, onChange, children }) => (
  <select value={value} onChange={onChange} style={{
    padding: "9px 12px", background: "var(--bg2)", border: "1px solid var(--bdr2)",
    borderRadius: 9, color: "var(--t1)", fontSize: 13, outline: "none", width: "100%",
    cursor: "pointer", fontFamily: "var(--font)",
  }}>
    {children}
  </select>
);

// ─── TABLE WRAPPER ───────────────────────────────
const Table = ({ children }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      {children}
    </table>
  </div>
);

const Th = ({ children, style: sx = {} }) => (
  <th style={{
    padding: "10px 16px", fontSize: 10, fontWeight: 700, color: "var(--t3)",
    textTransform: "uppercase", letterSpacing: ".06em",
    background: "rgba(255,255,255,0.02)", textAlign: "left",
    borderBottom: "1px solid var(--bdr)", whiteSpace: "nowrap", ...sx,
  }}>{children}</th>
);

const Td = ({ children, style: sx = {} }) => (
  <td style={{
    padding: "12px 16px", color: "var(--t2)",
    borderBottom: "1px solid rgba(255,255,255,0.04)", verticalAlign: "middle", ...sx,
  }}>{children}</td>
);

// ─── TOAST ───────────────────────────────────────
const Toast = ({ msg, type }) => (
  <div style={{
    position: "fixed", bottom: 24, right: 24, zIndex: 9999,
    background: "var(--bg3)", border: `1px solid var(--bdr2)`,
    borderLeft: `4px solid ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#6366f1"}`,
    borderRadius: 12, padding: "14px 18px",
    display: "flex", alignItems: "center", gap: 10,
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    animation: "toastSlide 0.35s cubic-bezier(0.16,1,0.3,1)",
    minWidth: 260, maxWidth: 340,
  }}>
    <span style={{ fontSize: 18 }}>{type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
    <span style={{ fontSize: 13, color: "var(--t1)", fontWeight: 500 }}>{msg}</span>
  </div>
);

// ─── MODAL ───────────────────────────────────────
const Modal = ({ open, onClose, title, children, width = 580 }) => {
  if (!open) return null;
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)", zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        animation: "fadeIn 0.2s ease",
      }}>
      <div style={{
        background: "var(--bg3)", border: "1px solid var(--bdr2)",
        borderRadius: 20, width: "100%", maxWidth: width, maxHeight: "90vh",
        overflowY: "auto", animation: "modalPop 0.3s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
      }}>
        <div style={{ padding: "22px 26px 18px", borderBottom: "1px solid var(--bdr)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font2)", fontWeight: 700, fontSize: 17, color: "var(--t1)" }}>{title}</span>
          <button onClick={onClose} style={{
            width: 30, height: 30, borderRadius: 8, background: "var(--bg4)", border: "1px solid var(--bdr)",
            cursor: "pointer", color: "var(--t2)", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

// ─── STUDENT FORM MODAL ──────────────────────────
const StudentFormModal = ({ open, onClose, onSave, editing }) => {
  const blank = { name:"", gender:"Male", dob:"", phone:"", email:"", address:"", branch:BRANCHES[0], semester:"1st", attendance:0, cgpa:0, fees:0, feesPaid:0, feesStatus:"Unpaid", courses:[] };
  const [f, setF] = useState(blank);
  useEffect(() => { setF(editing ? { ...blank, ...editing } : blank); }, [editing, open]);
  if (!open) return null;

  const ch = (k, v) => setF(p => ({ ...p, [k]: v }));
  const togCourse = (c) => setF(p => ({ ...p, courses: p.courses.includes(c) ? p.courses.filter(x => x !== c) : [...p.courses, c] }));
  const coursesForBranch = COURSES[f.branch] || [];

  const handleSave = () => {
    if (!f.name.trim() || !f.email.trim()) return alert("Name and Email are required.");
    onSave({ ...f, attendance: +f.attendance, cgpa: +f.cgpa, fees: +f.fees, feesPaid: +f.feesPaid });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={editing ? `Edit — ${editing.name}` : "Add New Student"}>
      <div style={{ padding: "20px 26px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <FormField label="Full Name *"><Input value={f.name} onChange={e => ch("name", e.target.value)} placeholder="e.g. Rohan Sharma" /></FormField>
        <FormField label="Gender"><Select value={f.gender} onChange={e => ch("gender", e.target.value)}>{["Male","Female","Other"].map(g => <option key={g}>{g}</option>)}</Select></FormField>
        <FormField label="Date of Birth"><Input type="date" value={f.dob} onChange={e => ch("dob", e.target.value)} /></FormField>
        <FormField label="Phone"><Input value={f.phone} onChange={e => ch("phone", e.target.value)} placeholder="10-digit mobile" /></FormField>
        <FormField label="Email *" full><Input type="email" value={f.email} onChange={e => ch("email", e.target.value)} placeholder="student@edu.in" /></FormField>
        <FormField label="Address" full><Input value={f.address} onChange={e => ch("address", e.target.value)} placeholder="Full address" /></FormField>
        <FormField label="Branch">
          <Select value={f.branch} onChange={e => { ch("branch", e.target.value); ch("courses", []); }}>
            {BRANCHES.map(b => <option key={b}>{b}</option>)}
          </Select>
        </FormField>
        <FormField label="Semester"><Select value={f.semester} onChange={e => ch("semester", e.target.value)}>{SEMESTERS.map(s => <option key={s}>{s}</option>)}</Select></FormField>
        <FormField label="Attendance (%)"><Input type="number" min="0" max="100" value={f.attendance} onChange={e => ch("attendance", e.target.value)} /></FormField>
        <FormField label="CGPA (0–10)"><Input type="number" min="0" max="10" step="0.1" value={f.cgpa} onChange={e => ch("cgpa", e.target.value)} /></FormField>
        <FormField label="Total Fees (₹)"><Input type="number" min="0" value={f.fees} onChange={e => { ch("fees", e.target.value); ch("feesStatus", autoStatus(+f.feesPaid, +e.target.value)); }} /></FormField>
        <FormField label="Fees Paid (₹)"><Input type="number" min="0" value={f.feesPaid} onChange={e => { ch("feesPaid", e.target.value); ch("feesStatus", autoStatus(+e.target.value, +f.fees)); }} /></FormField>
        <FormField label="Fee Status" full>
          <Select value={f.feesStatus} onChange={e => ch("feesStatus", e.target.value)}>
            {["Paid","Unpaid","Partial"].map(s => <option key={s}>{s}</option>)}
          </Select>
        </FormField>
        <FormField label="Enrolled Courses" full>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
            {coursesForBranch.map(c => (
              <label key={c} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--t2)", cursor: "pointer", padding: "6px 10px", borderRadius: 8, background: f.courses.includes(c) ? "rgba(99,102,241,.12)" : "transparent", border: `1px solid ${f.courses.includes(c) ? "rgba(99,102,241,.3)" : "var(--bdr)"}`, transition: "all 0.15s" }}>
                <input type="checkbox" checked={f.courses.includes(c)} onChange={() => togCourse(c)} style={{ accentColor: "#6366f1", width: 14, height: 14 }} />
                <span style={{ color: f.courses.includes(c) ? "#818cf8" : "var(--t2)" }}>{c}</span>
              </label>
            ))}
          </div>
        </FormField>
      </div>
      <div style={{ padding: "14px 26px 22px", display: "flex", gap: 10, justifyContent: "flex-end", borderTop: "1px solid var(--bdr)" }}>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
        <Btn onClick={handleSave}>✓ Save Student</Btn>
      </div>
    </Modal>
  );
};

// ─── SEARCH BAR ──────────────────────────────────
const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bg2)", border: "1px solid var(--bdr2)", borderRadius: 10, padding: "7px 12px", minWidth: 200 }}>
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style={{ color: "var(--t3)", flexShrink: 0 }}><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" /><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" /></svg>
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ background: "none", border: "none", outline: "none", color: "var(--t1)", fontSize: 13, fontFamily: "var(--font)", width: "100%" }} />
    {value && <button onClick={() => onChange("")} style={{ background: "none", border: "none", color: "var(--t3)", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>}
  </div>
);

const FilterSelect = ({ value, onChange, children }) => (
  <select value={value} onChange={e => onChange(e.target.value)} style={{
    background: "var(--bg2)", border: "1px solid var(--bdr2)", borderRadius: 10,
    color: "var(--t1)", fontSize: 12, padding: "7px 10px", outline: "none", cursor: "pointer", fontFamily: "var(--font)",
  }}>
    {children}
  </select>
);

// ─── SECTION CARD ────────────────────────────────
const Card = ({ children, style: sx = {} }) => (
  <div style={{
    background: "var(--bg3)", border: "1px solid var(--bdr)", borderRadius: 16,
    overflow: "hidden", ...sx,
  }}>
    {children}
  </div>
);

const CardHeader = ({ title, right }) => (
  <div style={{
    padding: "16px 20px", borderBottom: "1px solid var(--bdr)",
    display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
  }}>
    <span style={{ fontFamily: "var(--font2)", fontWeight: 700, fontSize: 15, color: "var(--t1)" }}>{title}</span>
    {right}
  </div>
);

// ════════════════════════════════════════════════
// PAGES
// ════════════════════════════════════════════════

// ─── DASHBOARD PAGE ──────────────────────────────
const DashboardPage = ({ students, onNav }) => {
  const total = students.length;
  const feesDue = students.reduce((a, s) => a + (s.fees - s.feesPaid), 0);
  const avgAtt = total ? Math.round(students.reduce((a, s) => a + s.attendance, 0) / total) : 0;
  const avgCGPA = total ? (students.reduce((a, s) => a + s.cgpa, 0) / total).toFixed(2) : "0.00";
  const paid = students.filter(s => s.feesStatus === "Paid").length;
  const unpaid = students.filter(s => s.feesStatus === "Unpaid").length;
  const partial = total - paid - unpaid;

  const branchDist = {};
  students.forEach(s => { branchDist[s.branch] = (branchDist[s.branch] || 0) + 1; });
  const topBranches = Object.entries(branchDist).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxB = Math.max(...topBranches.map(b => b[1]), 1);

  const recentStudents = [...students].reverse().slice(0, 5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "fadeUp 0.4s ease" }}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
        <StatCard label="Total Students" value={total} color="indigo" icon="🎓" sub={`${BRANCHES.length} branches active`} />
        <StatCard label="Fees Pending" value={`₹${(feesDue / 1000).toFixed(0)}K`} color="amber" icon="💰" sub={`${unpaid} students unpaid`} />
        <StatCard label="Avg Attendance" value={`${avgAtt}%`} color="green" icon="📋" sub={`${students.filter(s => s.attendance < 75).length} below 75%`} />
        <StatCard label="Avg CGPA" value={avgCGPA} color="cyan" icon="⭐" sub="Across all students" />
      </div>

      {/* Mid row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Branch distribution */}
        <Card>
          <CardHeader title="🏛 Branch Distribution" />
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {topBranches.map(([b, c], i) => (
              <div key={b}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: "var(--t2)" }}>{b.split(" ").slice(0, 2).join(" ")}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--t1)" }}>{c}</span>
                </div>
                <ProgressBar value={c} max={maxB} color={BRANCH_COLORS[i % BRANCH_COLORS.length]} height={7} />
              </div>
            ))}
          </div>
        </Card>

        {/* Fee status */}
        <Card>
          <CardHeader title="💳 Fee Collection Status" />
          <div style={{ padding: "16px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 18 }}>
              {[
                { label: "Paid", count: paid, color: "#10b981", bg: "rgba(16,185,129,.1)", bdr: "rgba(16,185,129,.25)" },
                { label: "Unpaid", count: unpaid, color: "#ef4444", bg: "rgba(239,68,68,.1)", bdr: "rgba(239,68,68,.25)" },
                { label: "Partial", count: partial, color: "#f59e0b", bg: "rgba(245,158,11,.1)", bdr: "rgba(245,158,11,.25)" },
              ].map(item => (
                <div key={item.label} style={{ textAlign: "center", padding: "14px 8px", background: item.bg, borderRadius: 12, border: `1px solid ${item.bdr}` }}>
                  <div style={{ fontFamily: "var(--font2)", fontSize: 26, fontWeight: 800, color: item.color }}>{item.count}</div>
                  <div style={{ fontSize: 11, color: "var(--t3)", marginTop: 2 }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 8 }}>Collection Rate</div>
            <ProgressBar value={paid} max={total || 1} color="#10b981" height={8} />
            <div style={{ fontSize: 11, color: "var(--t3)", marginTop: 6 }}>{total ? Math.round(paid / total * 100) : 0}% fully collected</div>
          </div>
        </Card>
      </div>

      {/* Recent students */}
      <Card>
        <CardHeader title="🕐 Recent Students" right={<Btn size="sm" onClick={() => onNav("students")}>View All →</Btn>} />
        <Table>
          <thead>
            <tr>{["Student", "ID", "Branch", "Semester", "Attendance", "CGPA", "Fees"].map(h => <Th key={h}>{h}</Th>)}</tr>
          </thead>
          <tbody>
            {recentStudents.map(s => (
              <tr key={s.id} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                <Td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><Avatar name={s.name} size={32} /><div><div style={{ color: "var(--t1)", fontWeight: 600, fontSize: 13 }}>{s.name}</div><div style={{ fontSize: 11, color: "var(--t3)" }}>{s.email}</div></div></div></Td>
                <Td><Badge>{s.id}</Badge></Td>
                <Td style={{ fontSize: 12 }}>{s.branch.split(" ").slice(0, 2).join(" ")}</Td>
                <Td><Badge color="cyan" size="xs">{s.semester} Sem</Badge></Td>
                <Td><AttBadge v={s.attendance} /></Td>
                <Td style={{ color: "var(--t1)", fontWeight: 700 }}>{s.cgpa}</Td>
                <Td><FeesBadge s={s.feesStatus} /></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

// ─── STUDENTS PAGE ───────────────────────────────
const StudentsPage = ({ students, onAdd, onEdit, onDelete }) => {
  const [query, setQuery] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterFees, setFilterFees] = useState("");
  const [filterSem, setFilterSem] = useState("");

  const filtered = useMemo(() => students.filter(s => {
    const q = query.toLowerCase();
    return (!q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.email.toLowerCase().includes(q))
      && (!filterBranch || s.branch === filterBranch)
      && (!filterFees || s.feesStatus === filterFees)
      && (!filterSem || s.semester === filterSem);
  }), [students, query, filterBranch, filterFees, filterSem]);

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <Card>
        <CardHeader
          title={`👥 Students (${filtered.length})`}
          right={
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <SearchBar value={query} onChange={setQuery} placeholder="Name, ID or email..." />
              <FilterSelect value={filterBranch} onChange={setFilterBranch}>
                <option value="">All Branches</option>
                {BRANCHES.map(b => <option key={b}>{b}</option>)}
              </FilterSelect>
              <FilterSelect value={filterFees} onChange={setFilterFees}>
                <option value="">All Status</option>
                {["Paid", "Unpaid", "Partial"].map(f => <option key={f}>{f}</option>)}
              </FilterSelect>
              <FilterSelect value={filterSem} onChange={setFilterSem}>
                <option value="">All Semesters</option>
                {SEMESTERS.map(s => <option key={s}>{s}</option>)}
              </FilterSelect>
              <Btn onClick={onAdd} size="sm">＋ Add Student</Btn>
            </div>
          }
        />
        <Table>
          <thead>
            <tr>{["Student", "STU ID", "Branch", "Semester", "Courses", "Attendance", "CGPA", "Fees", "Actions"].map(h => <Th key={h}>{h}</Th>)}</tr>
          </thead>
          <tbody>
            {filtered.length ? filtered.map(s => (
              <tr key={s.id} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                <Td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar name={s.name} size={34} />
                    <div>
                      <div style={{ color: "var(--t1)", fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: "var(--t3)" }}>{s.email}</div>
                    </div>
                  </div>
                </Td>
                <Td><Badge>{s.id}</Badge></Td>
                <Td style={{ fontSize: 12, maxWidth: 140 }}>{s.branch}</Td>
                <Td><Badge color="cyan" size="xs">{s.semester}</Badge></Td>
                <Td>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", maxWidth: 160 }}>
                    {s.courses.slice(0, 2).map(c => <Badge key={c} color="gray" size="xs">{c}</Badge>)}
                    {s.courses.length > 2 && <Badge color="gray" size="xs">+{s.courses.length - 2}</Badge>}
                  </div>
                </Td>
                <Td><AttBadge v={s.attendance} /></Td>
                <Td style={{ color: "var(--t1)", fontWeight: 700 }}>{s.cgpa}</Td>
                <Td><FeesBadge s={s.feesStatus} /></Td>
                <Td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Btn variant="ghost" size="sm" onClick={() => onEdit(s)}>✏️</Btn>
                    <Btn variant="danger" size="sm" onClick={() => onDelete(s.id)}>🗑️</Btn>
                  </div>
                </Td>
              </tr>
            )) : (
              <tr><Td style={{ textAlign: "center", padding: 40, color: "var(--t3)" }} colSpan="9">No students found</Td></tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

// ─── FEES PAGE ───────────────────────────────────
const FeesPage = ({ students, onMarkPaid }) => {
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const totalFees = students.reduce((a, s) => a + s.fees, 0);
  const totalPaid = students.reduce((a, s) => a + s.feesPaid, 0);
  const totalDue = totalFees - totalPaid;

  const filtered = useMemo(() => students.filter(s => {
    const q = query.toLowerCase();
    return (!q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q))
      && (!filterStatus || s.feesStatus === filterStatus);
  }), [students, query, filterStatus]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp 0.4s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        <StatCard label="Total Revenue" value={`₹${(totalPaid / 1000).toFixed(0)}K`} color="green" icon="✅" sub="Fees collected so far" />
        <StatCard label="Pending Dues" value={`₹${(totalDue / 1000).toFixed(0)}K`} color="amber" icon="⏳" sub="Outstanding amount" />
        <StatCard label="Total Fees" value={`₹${(totalFees / 1000).toFixed(0)}K`} color="indigo" icon="📊" sub="Cumulative total" />
      </div>

      <Card>
        <CardHeader
          title="💳 Fees Structure"
          right={
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <SearchBar value={query} onChange={setQuery} placeholder="Search student..." />
              <FilterSelect value={filterStatus} onChange={setFilterStatus}>
                <option value="">All Status</option>
                {["Paid", "Unpaid", "Partial"].map(s => <option key={s}>{s}</option>)}
              </FilterSelect>
            </div>
          }
        />
        <Table>
          <thead>
            <tr>{["Student", "STU ID", "Branch", "Total Fees", "Paid", "Due", "Progress", "Status", "Action"].map(h => <Th key={h}>{h}</Th>)}</tr>
          </thead>
          <tbody>
            {filtered.map(s => {
              const due = s.fees - s.feesPaid;
              const pct = s.fees > 0 ? Math.round(s.feesPaid / s.fees * 100) : 0;
              const barColor = pct >= 100 ? "#10b981" : pct > 50 ? "#f59e0b" : "#ef4444";
              return (
                <tr key={s.id}
                  style={{ borderLeft: `3px solid ${s.feesStatus === "Paid" ? "#10b981" : s.feesStatus === "Unpaid" ? "#ef4444" : "#f59e0b"}` }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}
                >
                  <Td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><Avatar name={s.name} size={32} /><span style={{ color: "var(--t1)", fontWeight: 600, fontSize: 13 }}>{s.name}</span></div></Td>
                  <Td><Badge>{s.id}</Badge></Td>
                  <Td style={{ fontSize: 12 }}>{s.branch.split(" ")[0]}</Td>
                  <Td style={{ color: "var(--t1)", fontWeight: 700 }}>₹{s.fees.toLocaleString()}</Td>
                  <Td style={{ color: "#10b981", fontWeight: 700 }}>₹{s.feesPaid.toLocaleString()}</Td>
                  <Td style={{ color: due > 0 ? "#f87171" : "#34d399", fontWeight: 700 }}>₹{due.toLocaleString()}</Td>
                  <Td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120 }}>
                      <ProgressBar value={pct} color={barColor} height={7} />
                      <span style={{ fontSize: 11, color: "var(--t3)", minWidth: 30 }}>{pct}%</span>
                    </div>
                  </Td>
                  <Td><FeesBadge s={s.feesStatus} /></Td>
                  <Td>
                    {s.feesStatus !== "Paid" && (
                      <Btn variant="success" size="sm" onClick={() => onMarkPaid(s.id)}>✓ Mark Paid</Btn>
                    )}
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

// ─── ATTENDANCE PAGE ─────────────────────────────
const AttendancePage = ({ students }) => {
  const critical = students.filter(s => s.attendance < 75);
  const good = students.filter(s => s.attendance >= 75);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp 0.4s ease" }}>
      {critical.length > 0 && (
        <div style={{ padding: "14px 18px", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)", borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22 }}>⚠️</span>
          <div>
            <div style={{ color: "#f87171", fontWeight: 700, fontSize: 14 }}>{critical.length} student{critical.length > 1 ? "s" : ""} below 75% attendance</div>
            <div style={{ color: "var(--t3)", fontSize: 12, marginTop: 2 }}>Immediate action required for academic compliance.</div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        <StatCard label="Good Attendance" value={good.length} color="green" icon="✅" sub="≥ 75%" />
        <StatCard label="At Risk" value={critical.length} color="amber" icon="⚠️" sub="Below 75%" />
        <StatCard label="Avg Attendance" value={`${students.length ? Math.round(students.reduce((a, s) => a + s.attendance, 0) / students.length) : 0}%`} color="cyan" icon="📊" sub="All students" />
      </div>

      <Card>
        <CardHeader title="📋 Attendance Register" right={
          <div style={{ display: "flex", gap: 8 }}>
            <Badge color="green">≥75%: {good.length}</Badge>
            <Badge color="red">&lt;75%: {critical.length}</Badge>
          </div>
        } />
        <Table>
          <thead>
            <tr>{["Student", "STU ID", "Branch", "Semester", "Attendance %", "Status"].map(h => <Th key={h}>{h}</Th>)}</tr>
          </thead>
          <tbody>
            {[...students].sort((a, b) => a.attendance - b.attendance).map(s => (
              <tr key={s.id} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                <Td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><Avatar name={s.name} size={32} /><span style={{ color: "var(--t1)", fontWeight: 600 }}>{s.name}</span></div></Td>
                <Td><Badge>{s.id}</Badge></Td>
                <Td style={{ fontSize: 12 }}>{s.branch}</Td>
                <Td><Badge color="cyan" size="xs">{s.semester} Sem</Badge></Td>
                <Td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 100 }}><ProgressBar value={s.attendance} color={s.attendance >= 75 ? "#10b981" : "#ef4444"} height={7} /></div>
                    <span style={{ fontWeight: 700, color: s.attendance >= 75 ? "#10b981" : "#f87171" }}>{s.attendance}%</span>
                  </div>
                </Td>
                <Td><AttBadge v={s.attendance} /></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

// ─── EXAMS PAGE ──────────────────────────────────
const ExamsPage = ({ students }) => {
  const rows = students.flatMap(s => (s.exams || []).map((e, i) => ({ ...e, s, i })));
  const avgMarks = rows.length ? Math.round(rows.reduce((a, r) => a + r.marks, 0) / rows.length) : 0;
  const passCount = rows.filter(r => r.marks >= 50).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp 0.4s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        <StatCard label="Total Exams" value={rows.length} color="indigo" icon="📝" sub="Across all students" />
        <StatCard label="Avg Marks" value={`${avgMarks}/100`} color="cyan" icon="📊" sub="Overall average" />
        <StatCard label="Pass Rate" value={rows.length ? `${Math.round(passCount / rows.length * 100)}%` : "—"} color="green" icon="✅" sub="Marks ≥ 50" />
      </div>

      <Card>
        <CardHeader title="📝 Exam Results" />
        <Table>
          <thead>
            <tr>{["Student", "STU ID", "Branch", "Subject", "Marks", "Grade", "Performance"].map(h => <Th key={h}>{h}</Th>)}</tr>
          </thead>
          <tbody>
            {rows.length ? rows.map(({ s, sub, marks, max, i }) => (
              <tr key={`${s.id}-${i}`} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                <Td><div style={{ display: "flex", alignItems: "center", gap: 10 }}><Avatar name={s.name} size={32} /><span style={{ color: "var(--t1)", fontWeight: 600 }}>{s.name}</span></div></Td>
                <Td><Badge>{s.id}</Badge></Td>
                <Td style={{ fontSize: 12 }}>{s.branch.split(" ")[0]}</Td>
                <Td style={{ color: "var(--t1)" }}>{sub}</Td>
                <Td><span style={{ color: gradeColor(marks), fontWeight: 700, fontSize: 14 }}>{marks}<span style={{ color: "var(--t3)", fontSize: 11, fontWeight: 400 }}>/{max}</span></span></Td>
                <Td>
                  <span style={{ background: `${gradeColor(marks)}20`, color: gradeColor(marks), border: `1px solid ${gradeColor(marks)}40`, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 800 }}>
                    {grade(marks)}
                  </span>
                </Td>
                <Td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120 }}>
                    <ProgressBar value={marks} max={max} color={gradeColor(marks)} height={6} />
                  </div>
                </Td>
              </tr>
            )) : (
              <tr><Td colSpan="7" style={{ textAlign: "center", padding: 40, color: "var(--t3)" }}>No exam records found</Td></tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

// ─── REPORTS PAGE ────────────────────────────────
const ReportsPage = ({ students }) => {
  const total = students.length;
  const rev = students.reduce((a, s) => a + s.feesPaid, 0);
  const due = students.reduce((a, s) => a + (s.fees - s.feesPaid), 0);
  const avgA = total ? Math.round(students.reduce((a, s) => a + s.attendance, 0) / total) : 0;
  const avgC = total ? (students.reduce((a, s) => a + s.cgpa, 0) / total).toFixed(2) : "0.00";

  const branchDist = {};
  students.forEach(s => { branchDist[s.branch] = (branchDist[s.branch] || 0) + 1; });
  const semDist = {};
  students.forEach(s => { semDist[s.semester] = (semDist[s.semester] || 0) + 1; });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp 0.4s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
        <StatCard label="Students" value={total} color="indigo" icon="🎓" />
        <StatCard label="Avg Attendance" value={`${avgA}%`} color="green" icon="📋" />
        <StatCard label="Avg CGPA" value={avgC} color="cyan" icon="⭐" />
        <StatCard label="Revenue" value={`₹${(rev / 1000).toFixed(0)}K`} color="amber" icon="💰" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Branch */}
        <Card>
          <CardHeader title="🏛 Enrollment by Branch" />
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {BRANCHES.map((b, i) => {
              const c = branchDist[b] || 0;
              return (
                <div key={b}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: "var(--t2)" }}>{b}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--t1)" }}>{c}</span>
                  </div>
                  <ProgressBar value={c} max={Math.max(...Object.values(branchDist), 1)} color={BRANCH_COLORS[i % BRANCH_COLORS.length]} height={7} />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Financial */}
        <Card>
          <CardHeader title="💰 Financial Summary" />
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Total Revenue", value: `₹${rev.toLocaleString()}`, color: "#10b981", bg: "rgba(16,185,129,.08)", bdr: "rgba(16,185,129,.2)" },
              { label: "Outstanding Dues", value: `₹${due.toLocaleString()}`, color: "#f87171", bg: "rgba(239,68,68,.08)", bdr: "rgba(239,68,68,.2)" },
              { label: "Total Billed", value: `₹${(rev + due).toLocaleString()}`, color: "#818cf8", bg: "rgba(99,102,241,.08)", bdr: "rgba(99,102,241,.2)" },
            ].map(item => (
              <div key={item.label} style={{ padding: "16px", background: item.bg, borderRadius: 12, border: `1px solid ${item.bdr}` }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--t3)", marginBottom: 5 }}>{item.label}</div>
                <div style={{ fontFamily: "var(--font2)", fontSize: 24, fontWeight: 800, color: item.color }}>{item.value}</div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 7 }}>Collection Rate</div>
              <ProgressBar value={rev} max={rev + due || 1} color="#10b981" height={8} />
              <div style={{ fontSize: 11, color: "var(--t3)", marginTop: 5 }}>{(rev + due) ? Math.round(rev / (rev + due) * 100) : 0}% collected</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Semester distribution */}
      <Card>
        <CardHeader title="📚 Semester-wise Distribution" />
        <div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 10 }}>
          {SEMESTERS.map((sem, i) => {
            const c = semDist[sem] || 0;
            const maxS = Math.max(...Object.values(semDist), 1);
            return (
              <div key={sem} style={{ textAlign: "center" }}>
                <div style={{ height: 80, display: "flex", alignItems: "flex-end", justifyContent: "center", marginBottom: 8 }}>
                  <div style={{
                    width: "70%", background: `linear-gradient(to top, ${BRANCH_COLORS[i]}, ${BRANCH_COLORS[i]}88)`,
                    borderRadius: "6px 6px 0 0", height: `${Math.max((c / maxS) * 100, 5)}%`,
                    transition: "height 0.6s ease", boxShadow: `0 0 12px ${BRANCH_COLORS[i]}44`,
                  }} />
                </div>
                <div style={{ fontFamily: "var(--font2)", fontSize: 16, fontWeight: 800, color: "var(--t1)" }}>{c}</div>
                <div style={{ fontSize: 10, color: "var(--t3)", marginTop: 2 }}>{sem} Sem</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

// ─── BRANCHES PAGE ───────────────────────────────
const BranchesPage = ({ students }) => {
  const branchDist = {};
  students.forEach(s => { branchDist[s.branch] = (branchDist[s.branch] || 0) + 1; });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp 0.4s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
        {BRANCHES.map((b, i) => {
          const c = BRANCH_COLORS[i % BRANCH_COLORS.length];
          const cnt = branchDist[b] || 0;
          const crs = COURSES[b] || [];
          return (
            <div key={b} style={{
              background: "var(--bg3)", border: "1px solid var(--bdr)", borderTop: `3px solid ${c}`,
              borderRadius: 16, padding: "18px", transition: "border-color 0.2s, transform 0.2s",
              animation: `fadeUp ${0.2 + i * 0.06}s ease both`,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = c; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--bdr)"; e.currentTarget.style.transform = ""; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: "var(--font2)", fontWeight: 700, fontSize: 14, color: "var(--t1)", marginBottom: 3 }}>{b}</div>
                  <div style={{ fontSize: 11, color: "var(--t3)" }}>{crs.length} courses offered</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font2)", fontSize: 28, fontWeight: 800, color: c }}>{cnt}</div>
                  <div style={{ fontSize: 10, color: "var(--t3)" }}>students</div>
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <ProgressBar value={cnt} max={Math.max(...Object.values(branchDist), 1)} color={c} height={5} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {crs.slice(0, 4).map(c2 => (
                  <span key={c2} style={{ background: `${c}15`, color: c, border: `1px solid ${c}30`, padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 600 }}>{c2}</span>
                ))}
                {crs.length > 4 && <span style={{ background: "rgba(255,255,255,0.06)", color: "var(--t3)", border: "1px solid var(--bdr)", padding: "2px 8px", borderRadius: 20, fontSize: 10 }}>+{crs.length - 4} more</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════
// SIDEBAR
// ════════════════════════════════════════════════
const NAV_ITEMS = [
  { id: "dashboard",  label: "Dashboard",  icon: "⊞",  section: "main" },
  { id: "students",   label: "Students",   icon: "👥", section: "main" },
  { id: "fees",       label: "Fees",       icon: "💳", section: "main" },
  { id: "attendance", label: "Attendance", icon: "📋", section: "academic" },
  { id: "exams",      label: "Exams",      icon: "📝", section: "academic" },
  { id: "reports",    label: "Reports",    icon: "📊", section: "academic" },
  { id: "branches",   label: "Branches",   icon: "🏛", section: "settings" },
];

const Sidebar = ({ page, setPage, students, onLogout }) => {
  const unpaid = students.filter(s => s.feesStatus === "Unpaid").length;
  const sections = [
    { key: "main", label: "Main" },
    { key: "academic", label: "Academic" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <aside style={{
      width: 220, minWidth: 220, background: "var(--bg2)", borderRight: "1px solid var(--bdr)",
      display: "flex", flexDirection: "column", height: "100vh", animation: "slideIn 0.3s ease",
    }}>
      {/* Logo */}
      <div style={{ padding: "22px 18px 18px", borderBottom: "1px solid var(--bdr)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(99,102,241,0.4)", flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <polyline points="9,22 9,12 15,12 15,22" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font2)", fontWeight: 800, fontSize: 16, color: "var(--t1)" }}>EduPortal</div>
          <div style={{ fontSize: 10, color: "#6366f1", fontWeight: 600 }}>Student ERP</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
        {sections.map(sec => (
          <div key={sec.key}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "var(--t4)", textTransform: "uppercase", letterSpacing: ".1em", padding: "10px 10px 4px" }}>{sec.label}</div>
            {NAV_ITEMS.filter(n => n.section === sec.key).map(n => {
              const isActive = page === n.id;
              const badge = n.id === "students" ? students.length : n.id === "fees" && unpaid ? unpaid : 0;
              return (
                <div key={n.id} onClick={() => setPage(n.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 9, padding: "9px 12px",
                    borderRadius: 10, marginBottom: 2, cursor: "pointer", fontSize: 13, fontWeight: 500,
                    color: isActive ? "#818cf8" : "var(--t2)",
                    background: isActive ? "rgba(99,102,241,.15)" : "transparent",
                    border: `1px solid ${isActive ? "rgba(99,102,241,.25)" : "transparent"}`,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "var(--t1)"; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--t2)"; } }}
                >
                  <span style={{ fontSize: 15 }}>{n.icon}</span>
                  <span>{n.label}</span>
                  {badge > 0 && (
                    <span style={{ marginLeft: "auto", background: "#6366f1", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 10, minWidth: 18, textAlign: "center" }}>{badge}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: "14px 12px", borderTop: "1px solid var(--bdr)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", fontFamily: "var(--font2)" }}>AD</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--t1)" }}>Admin</div>
            <div style={{ fontSize: 10, color: "var(--t3)" }}>admin@edu.in</div>
          </div>
        </div>
        <button onClick={onLogout} style={{
          width: "100%", padding: "8px", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)",
          borderRadius: 9, color: "#f87171", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font)",
          transition: "background 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,.15)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,.08)"}
        >← Logout</button>
      </div>
    </aside>
  );
};

// ════════════════════════════════════════════════
// LOGIN PAGE
// ════════════════════════════════════════════════
const LoginPage = ({ onLogin }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(() => {
    if (user === "admin" && pass === "admin123") {
      setLoading(true);
      setTimeout(() => onLogin(), 800);
    } else {
      setErr("Invalid credentials. Use admin / admin123");
      setTimeout(() => setErr(""), 3000);
    }
  }, [user, pass, onLogin]);

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
      {/* Animated blobs */}
      {[
        { w: 500, h: 500, bg: "#6366f1", top: -150, left: -150, dur: "14s" },
        { w: 400, h: 400, bg: "#8b5cf6", bottom: -100, right: -100, dur: "10s" },
        { w: 300, h: 300, bg: "#06b6d4", top: "40%", left: "60%", dur: "18s" },
      ].map((o, i) => (
        <div key={i} style={{
          position: "absolute", width: o.w, height: o.h, borderRadius: "50%",
          background: o.bg, opacity: 0.12, filter: "blur(90px)",
          top: o.top, bottom: o.bottom, left: o.left, right: o.right,
          animation: `float ${o.dur} ease-in-out infinite alternate`,
          animationDelay: `${i * 2}s`,
        }} />
      ))}

      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }} />

      {/* Card */}
      <div style={{
        background: "rgba(12,17,32,0.85)", backdropFilter: "blur(24px)",
        border: "1px solid rgba(99,102,241,0.25)", borderRadius: 24, padding: "44px 40px",
        width: "100%", maxWidth: 420, position: "relative", zIndex: 2,
        boxShadow: "0 0 80px rgba(99,102,241,0.12), 0 30px 60px rgba(0,0,0,0.6)",
        animation: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ width: 44, height: 44, borderRadius: 13, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <polyline points="9,22 9,12 15,12 15,22" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font2)", fontWeight: 800, fontSize: 22, color: "var(--t1)" }}>EduPortal</div>
            <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 600, letterSpacing: ".04em" }}>Student ERP System</div>
          </div>
        </div>

        <div style={{ fontFamily: "var(--font2)", fontSize: 26, fontWeight: 800, color: "var(--t1)", marginBottom: 6 }}>Welcome Back</div>
        <div style={{ fontSize: 14, color: "var(--t3)", marginBottom: 28 }}>Sign in to access your portal</div>

        {err && (
          <div style={{ marginBottom: 18, padding: "12px 14px", background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 10, color: "#f87171", fontSize: 13, animation: "fadeIn 0.2s ease" }}>
            {err}
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 7 }}>Username</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--t3)", fontSize: 16 }}>👤</span>
            <input value={user} onChange={e => setUser(e.target.value)} placeholder="Enter username"
              style={{ width: "100%", padding: "12px 14px 12px 40px", background: "rgba(15,23,42,0.8)", border: "1px solid var(--bdr2)", borderRadius: 12, color: "var(--t1)", fontSize: 14, outline: "none", fontFamily: "var(--font)", transition: "all 0.2s" }}
              onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
              onBlur={e => { e.target.style.borderColor = "var(--bdr2)"; e.target.style.boxShadow = "none"; }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 7 }}>Password</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--t3)", fontSize: 16 }}>🔒</span>
            <input value={pass} onChange={e => setPass(e.target.value)} type={showPass ? "text" : "password"} placeholder="Enter password"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ width: "100%", padding: "12px 44px 12px 40px", background: "rgba(15,23,42,0.8)", border: "1px solid var(--bdr2)", borderRadius: 12, color: "var(--t1)", fontSize: 14, outline: "none", fontFamily: "var(--font)", transition: "all 0.2s" }}
              onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
              onBlur={e => { e.target.style.borderColor = "var(--bdr2)"; e.target.style.boxShadow = "none"; }}
            />
            <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--t3)", fontSize: 16 }}>
              {showPass ? "🙈" : "👁"}
            </button>
          </div>
        </div>

        <button onClick={handleLogin} disabled={loading}
          style={{
            width: "100%", padding: "14px", borderRadius: 12, border: "none", cursor: loading ? "wait" : "pointer",
            background: loading ? "rgba(99,102,241,0.5)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", fontFamily: "var(--font2)", fontWeight: 700, fontSize: 15, letterSpacing: ".04em",
            boxShadow: "0 4px 20px rgba(99,102,241,0.35)", transition: "all 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
          onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(99,102,241,0.5)"; } }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.35)"; }}
        >
          {loading ? <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> : null}
          {loading ? "Signing In..." : "Sign In →"}
        </button>

        <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--bdr)", textAlign: "center", fontSize: 12, color: "var(--t4)" }}>
          Demo credentials: <span style={{ color: "#6366f1", fontWeight: 700 }}>admin</span> / <span style={{ color: "#6366f1", fontWeight: 700 }}>admin123</span>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════════
export default function StudentERP() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [students, setStudents] = useState(() => {
    try { return JSON.parse(localStorage.getItem("erp_v3") || "null") || [...SEED_STUDENTS]; }
    catch { return [...SEED_STUDENTS]; }
  });
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try { localStorage.setItem("erp_v3", JSON.stringify(students)); } catch {}
  }, [students]);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleSave = useCallback((data) => {
    if (editing) {
      setStudents(prev => prev.map(s => s.id === editing.id ? { ...s, ...data } : s));
      showToast("Student updated successfully!", "success");
    } else {
      setStudents(prev => {
        const id = nextId(prev);
        return [...prev, { ...data, id, exams: [], joinDate: new Date().toISOString().split("T")[0] }];
      });
      showToast("Student added successfully!", "success");
    }
  }, [editing, showToast]);

  const handleDelete = useCallback((id) => {
    if (!confirm("Delete this student permanently?")) return;
    setStudents(prev => prev.filter(s => s.id !== id));
    showToast("Student deleted.", "error");
  }, [showToast]);

  const handleMarkPaid = useCallback((id) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, feesPaid: s.fees, feesStatus: "Paid" } : s));
    const s = students.find(x => x.id === id);
    showToast(`${s?.name || "Student"} marked as Paid!`, "success");
  }, [students, showToast]);

  const titles = { dashboard: "Dashboard", students: "Students", fees: "Fees Management", attendance: "Attendance", exams: "Exams & Results", reports: "Reports", branches: "Branches" };

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--bg)", overflow: "hidden" }}>
      <Sidebar page={page} setPage={setPage} students={students} onLogout={() => setLoggedIn(false)} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{
          padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(12,17,32,0.95)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--bdr)", flexShrink: 0,
        }}>
          <div style={{ fontFamily: "var(--font2)", fontWeight: 800, fontSize: 18, color: "var(--t1)" }}>{titles[page]}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 12, color: "var(--t3)" }}>{new Date().toLocaleDateString("en-IN", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</div>
            <div style={{ width: 1, height: 20, background: "var(--bdr2)" }} />
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", fontFamily: "var(--font2)" }}>AD</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {page === "dashboard"  && <DashboardPage  students={students} onNav={setPage} />}
          {page === "students"   && <StudentsPage   students={students} onAdd={() => { setEditing(null); setModal(true); }} onEdit={s => { setEditing(s); setModal(true); }} onDelete={handleDelete} />}
          {page === "fees"       && <FeesPage       students={students} onMarkPaid={handleMarkPaid} />}
          {page === "attendance" && <AttendancePage students={students} />}
          {page === "exams"      && <ExamsPage      students={students} />}
          {page === "reports"    && <ReportsPage    students={students} />}
          {page === "branches"   && <BranchesPage   students={students} />}
        </div>
      </div>

      <StudentFormModal open={modal} onClose={() => setModal(false)} onSave={handleSave} editing={editing} />
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}

// ─── STYLES INJECTOR ─────────────────────────────
const styleEl = document.createElement("style");
styleEl.textContent = GS;
document.head.appendChild(styleEl);
