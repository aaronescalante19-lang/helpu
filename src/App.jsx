import { useState, useEffect } from "react";
import { supabase } from "./supabase";

// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #0F1B2D; --navy2: #162236; --navy3: #1E2F45; --card: #1A2840; --card2: #223050;
    --coral: #FF6B6B; --mint: #4ECDC4; --amber: #FFB347; --purple: #A78BFA;
    --text: #F0F4FF; --text2: #94A3C0; --text3: #5B6E8A;
    --border: rgba(255,255,255,0.07); --radius: 16px; --radius-sm: 10px;
    --shadow: 0 8px 32px rgba(0,0,0,0.3); --shadow-hover: 0 16px 48px rgba(0,0,0,0.4);
  }
  body { background: var(--navy); color: var(--text); font-family: 'DM Sans', sans-serif; }

  /* LOGIN */
  .login-root { min-height:100vh; display:flex; align-items:center; justify-content:center;
    background: radial-gradient(ellipse at 30% 20%, rgba(78,205,196,0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, rgba(255,107,107,0.12) 0%, transparent 50%), var(--navy);
    position:relative; overflow:hidden; }
  .login-blob { position:absolute; border-radius:50%; filter:blur(80px); opacity:0.3; pointer-events:none; }
  .login-card { background:rgba(26,40,64,0.9); backdrop-filter:blur(20px); border:1px solid var(--border);
    border-radius:24px; padding:48px 40px; width:100%; max-width:440px;
    box-shadow:0 32px 80px rgba(0,0,0,0.5); position:relative; z-index:1; }
  .login-logo { font-family:'Outfit',sans-serif; font-weight:800; font-size:2.2rem;
    background:linear-gradient(135deg,var(--mint),var(--coral)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:4px; }
  .login-sub { color:var(--text2); font-size:0.9rem; margin-bottom:32px; }
  .login-label { font-size:0.8rem; font-weight:600; color:var(--text2); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:6px; display:block; }
  .login-input { width:100%; padding:13px 16px; background:var(--navy3); border:1px solid var(--border);
    border-radius:var(--radius-sm); color:var(--text); font-family:'DM Sans',sans-serif; font-size:0.95rem;
    outline:none; transition:border-color 0.2s,box-shadow 0.2s; margin-bottom:16px; }
  .login-input:focus { border-color:var(--mint); box-shadow:0 0 0 3px rgba(78,205,196,0.15); }
  .login-input::placeholder { color:var(--text3); }
  .login-btn { width:100%; padding:14px; background:linear-gradient(135deg,var(--mint),#38b2ac);
    border:none; border-radius:var(--radius-sm); color:var(--navy); font-family:'Outfit',sans-serif;
    font-weight:700; font-size:1rem; cursor:pointer; transition:transform 0.15s,box-shadow 0.15s; margin-top:8px; }
  .login-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(78,205,196,0.35); }
  .login-btn:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
  .login-btn-alt { width:100%; padding:13px; background:transparent; border:1px solid var(--border);
    border-radius:var(--radius-sm); color:var(--text); font-family:'DM Sans',sans-serif; font-size:0.9rem; cursor:pointer; transition:background 0.2s; }
  .login-btn-alt:hover { background:var(--card); }
  .login-divider { display:flex; align-items:center; gap:12px; margin:20px 0; color:var(--text3); font-size:0.8rem; }
  .login-divider::before,.login-divider::after { content:''; flex:1; height:1px; background:var(--border); }
  .login-note { text-align:center; color:var(--text3); font-size:0.78rem; margin-top:20px; line-height:1.6; }
  .shield-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(78,205,196,0.1);
    border:1px solid rgba(78,205,196,0.2); border-radius:20px; padding:5px 12px; font-size:0.78rem; color:var(--mint); margin-bottom:24px; }
  .err-msg { color:var(--coral); font-size:0.8rem; margin-bottom:8px; background:rgba(255,107,107,0.1); padding:8px 12px; border-radius:8px; }
  .tabs-login { display:flex; gap:4px; background:var(--navy3); border-radius:10px; padding:4px; margin-bottom:24px; }
  .tab-login { flex:1; padding:8px; border-radius:7px; background:transparent; border:none; color:var(--text2);
    font-family:'DM Sans',sans-serif; font-size:0.88rem; cursor:pointer; transition:all 0.2s; }
  .tab-login.active { background:var(--card); color:var(--text); }

  /* APP */
  .app-root { min-height:100vh; display:flex; flex-direction:column; }
  .navbar { background:rgba(15,27,45,0.95); backdrop-filter:blur(12px); border-bottom:1px solid var(--border);
    position:sticky; top:0; z-index:100; padding:0 24px; height:60px; display:flex; align-items:center; justify-content:space-between; }
  .nav-logo { font-family:'Outfit',sans-serif; font-weight:800; font-size:1.4rem;
    background:linear-gradient(135deg,var(--mint),var(--coral)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
  .nav-links { display:flex; gap:4px; }
  .nav-link { padding:7px 16px; border-radius:8px; font-size:0.875rem; font-weight:500; cursor:pointer;
    color:var(--text2); transition:all 0.2s; border:none; background:transparent; font-family:'DM Sans',sans-serif; }
  .nav-link:hover { color:var(--text); background:var(--card); }
  .nav-link.active { color:var(--mint); background:rgba(78,205,196,0.12); }
  .nav-avatar { width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg,var(--coral),#ff9a9e);
    display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.8rem; color:white; cursor:pointer; }
  .nav-right { display:flex; align-items:center; gap:12px; }
  .logout-btn { padding:6px 12px; background:transparent; border:1px solid var(--border); border-radius:8px;
    color:var(--text3); font-size:0.78rem; cursor:pointer; transition:all 0.2s; font-family:'DM Sans',sans-serif; }
  .logout-btn:hover { color:var(--coral); border-color:rgba(255,107,107,0.3); }

  /* LAYOUT */
  .main-layout { display:flex; flex:1; max-width:1280px; margin:0 auto; width:100%; padding:24px 16px; gap:20px; }
  .sidebar { width:260px; flex-shrink:0; display:flex; flex-direction:column; gap:16px; }
  .feed-area { flex:1; min-width:0; display:flex; flex-direction:column; gap:16px; }
  .right-panel { width:240px; flex-shrink:0; display:flex; flex-direction:column; gap:16px; }

  /* CARDS */
  .card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:20px; transition:transform 0.2s,box-shadow 0.2s; }
  .card-title { font-family:'Outfit',sans-serif; font-weight:700; font-size:0.85rem; color:var(--text2);
    letter-spacing:0.08em; text-transform:uppercase; margin-bottom:14px; }

  /* POSTS */
  .post-create { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:16px; }
  .post-create-row { display:flex; align-items:center; gap:12px; }
  .post-textarea { flex:1; background:var(--navy3); border:1px solid var(--border); border-radius:10px;
    padding:11px 14px; color:var(--text); font-family:'DM Sans',sans-serif; font-size:0.9rem; resize:none; outline:none; transition:border-color 0.2s; min-height:44px; }
  .post-textarea:focus { border-color:var(--mint); }
  .post-textarea::placeholder { color:var(--text3); }
  .post-actions { display:flex; gap:8px; margin-top:12px; padding-left:50px; }
  .post-publish-btn { margin-left:auto; padding:7px 20px; background:linear-gradient(135deg,var(--mint),#38b2ac);
    border:none; border-radius:8px; color:var(--navy); font-weight:700; font-size:0.85rem; cursor:pointer; transition:all 0.2s; }
  .post-publish-btn:hover { transform:translateY(-1px); box-shadow:0 4px 16px rgba(78,205,196,0.3); }
  .post-publish-btn:disabled { opacity:0.5; cursor:not-allowed; }
  .post-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; }
  .post-header { padding:16px 16px 12px; display:flex; align-items:center; gap:10px; }
  .post-uname { font-weight:600; font-size:0.9rem; color:var(--text); }
  .post-meta { font-size:0.75rem; color:var(--text3); }
  .post-uni-badge { display:inline-block; background:rgba(78,205,196,0.12); color:var(--mint);
    border-radius:6px; padding:1px 7px; font-size:0.72rem; font-weight:600; margin-left:6px; }
  .post-body { padding:0 16px 14px; font-size:0.9rem; line-height:1.6; color:var(--text); }
  .post-footer { display:flex; gap:8px; padding:12px 16px; border-top:1px solid var(--border); }
  .post-btn { display:flex; align-items:center; gap:5px; padding:6px 14px; border-radius:8px; background:transparent;
    border:1px solid var(--border); color:var(--text2); font-size:0.82rem; cursor:pointer; transition:all 0.2s; font-family:'DM Sans',sans-serif; }
  .post-btn:hover { background:var(--card2); color:var(--text); }
  .post-btn.liked { color:var(--coral); border-color:rgba(255,107,107,0.3); background:rgba(255,107,107,0.08); }
  .comments-section { padding:12px 16px; background:var(--navy3); border-top:1px solid var(--border); display:flex; flex-direction:column; gap:10px; }
  .comment { display:flex; gap:8px; }
  .comment-bubble { background:var(--card2); border-radius:10px; padding:8px 12px; flex:1; }
  .comment-user { font-weight:600; font-size:0.78rem; color:var(--text); margin-bottom:3px; }
  .comment-text { font-size:0.83rem; color:var(--text2); line-height:1.5; }
  .comment-input-row { display:flex; gap:8px; margin-top:4px; }
  .comment-input { flex:1; background:var(--card2); border:1px solid var(--border); border-radius:8px;
    padding:7px 12px; color:var(--text); font-size:0.82rem; outline:none; font-family:'DM Sans',sans-serif; }
  .comment-send { padding:7px 14px; background:var(--mint); border:none; border-radius:8px; color:var(--navy); font-weight:700; font-size:0.8rem; cursor:pointer; }
  .empty-feed { text-align:center; padding:48px 24px; color:var(--text3); }
  .empty-feed-icon { font-size:3rem; margin-bottom:12px; }
  .loading { text-align:center; padding:32px; color:var(--text3); font-size:0.9rem; }

  /* BUDDIES */
  .buddy-mini { display:flex; align-items:center; gap:10px; padding:8px; margin:0 -8px; border-bottom:1px solid var(--border); cursor:pointer; transition:background 0.15s; border-radius:8px; }
  .buddy-mini:hover { background:var(--card2); }
  .buddy-mini:last-child { border-bottom:none; }
  .buddy-name { font-weight:600; font-size:0.88rem; color:var(--text); }
  .buddy-tag { font-size:0.75rem; color:var(--text3); }
  .buddy-match { margin-left:auto; font-size:0.75rem; font-weight:700; color:var(--mint); background:rgba(78,205,196,0.1); padding:2px 7px; border-radius:20px; }
  .buddies-full { display:flex; flex-direction:column; align-items:center; padding:20px; }
  .buddy-card-big { width:100%; max-width:380px; background:var(--card); border:1px solid var(--border);
    border-radius:24px; overflow:hidden; box-shadow:0 24px 64px rgba(0,0,0,0.4); }
  .buddy-card-header { height:220px; display:flex; align-items:center; justify-content:center; position:relative; }
  .buddy-card-body { padding:24px; }
  .buddy-card-name { font-family:'Outfit',sans-serif; font-weight:800; font-size:1.6rem; color:var(--text); }
  .buddy-card-uni { color:var(--mint); font-weight:600; font-size:0.9rem; margin-bottom:4px; }
  .buddy-card-career { color:var(--text2); font-size:0.85rem; margin-bottom:12px; }
  .buddy-card-city { display:inline-flex; align-items:center; gap:5px; background:rgba(255,255,255,0.05);
    border:1px solid var(--border); border-radius:20px; padding:4px 12px; font-size:0.8rem; color:var(--text2); margin-bottom:16px; }
  .buddy-interests { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:20px; }
  .interest-tag { background:var(--card2); border:1px solid var(--border); border-radius:20px; padding:4px 12px; font-size:0.78rem; color:var(--text2); }
  .match-bar { margin-bottom:24px; }
  .match-label { display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.8rem; color:var(--text2); }
  .match-label span:last-child { color:var(--mint); font-weight:700; }
  .match-track { height:6px; background:var(--navy3); border-radius:3px; overflow:hidden; }
  .match-fill { height:100%; border-radius:3px; background:linear-gradient(90deg,var(--mint),var(--purple)); transition:width 0.5s ease; }
  .buddy-actions { display:flex; gap:12px; }
  .buddy-pass { flex:1; padding:13px; background:transparent; border:2px solid var(--border); border-radius:12px; color:var(--text2); font-size:1.2rem; cursor:pointer; transition:all 0.2s; }
  .buddy-pass:hover { border-color:var(--coral); color:var(--coral); }
  .buddy-connect { flex:2; padding:13px; background:linear-gradient(135deg,var(--mint),#38b2ac); border:none; border-radius:12px; color:var(--navy); font-weight:700; font-size:0.9rem; cursor:pointer; transition:all 0.2s; font-family:'Outfit',sans-serif; }
  .buddy-connect:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(78,205,196,0.35); }
  .buddy-counter { font-size:0.8rem; color:var(--text3); margin-top:16px; }

  /* MARKET */
  .tabs { display:flex; gap:4px; padding:4px; background:var(--navy3); border-radius:10px; margin-bottom:20px; }
  .tab-btn { flex:1; padding:9px 16px; border-radius:7px; background:transparent; border:none; color:var(--text2);
    font-family:'DM Sans',sans-serif; font-weight:500; font-size:0.88rem; cursor:pointer; transition:all 0.2s; }
  .tab-btn.active { background:var(--card); color:var(--text); box-shadow:0 2px 8px rgba(0,0,0,0.2); }
  .products-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(175px,1fr)); gap:14px; }
  .product-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; cursor:pointer; transition:transform 0.2s,box-shadow 0.2s; }
  .product-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-hover); }
  .product-img { height:110px; display:flex; align-items:center; justify-content:center; font-size:2.5rem; background:var(--navy3); }
  .product-body { padding:12px; }
  .product-tag { font-size:0.7rem; color:var(--mint); font-weight:600; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px; }
  .product-name { font-weight:600; font-size:0.88rem; color:var(--text); margin-bottom:8px; line-height:1.3; }
  .product-footer { display:flex; align-items:center; justify-content:space-between; }
  .product-price { font-family:'Outfit',sans-serif; font-weight:800; font-size:1.05rem; color:var(--amber); }
  .buy-btn { width:100%; margin-top:10px; padding:8px; background:linear-gradient(135deg,var(--coral),#ff8e8e);
    border:none; border-radius:8px; color:white; font-weight:700; font-size:0.8rem; cursor:pointer; transition:all 0.2s; font-family:'DM Sans',sans-serif; }
  .buy-btn:hover { transform:translateY(-1px); box-shadow:0 4px 14px rgba(255,107,107,0.35); }
  .add-product-form { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:20px; margin-bottom:20px; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
  .form-input { width:100%; padding:10px 14px; background:var(--navy3); border:1px solid var(--border);
    border-radius:8px; color:var(--text); font-family:'DM Sans',sans-serif; font-size:0.88rem; outline:none; }
  .form-input:focus { border-color:var(--mint); }
  .form-input::placeholder { color:var(--text3); }
  .form-submit { padding:10px 20px; background:linear-gradient(135deg,var(--mint),#38b2ac); border:none;
    border-radius:8px; color:var(--navy); font-weight:700; font-size:0.88rem; cursor:pointer; transition:all 0.2s; }

  /* EVENTS */
  .events-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; }
  .event-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; cursor:pointer; transition:transform 0.2s,box-shadow 0.2s; }
  .event-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-hover); }
  .event-header { height:100px; display:flex; align-items:center; justify-content:center; font-size:3rem; position:relative; }
  .event-cat { position:absolute; top:12px; right:12px; background:rgba(0,0,0,0.4); color:white; font-size:0.7rem; font-weight:600; padding:3px 9px; border-radius:20px; backdrop-filter:blur(4px); }
  .event-body { padding:16px; }
  .event-title { font-family:'Outfit',sans-serif; font-weight:700; font-size:0.95rem; color:var(--text); margin-bottom:8px; }
  .event-meta { display:flex; gap:12px; margin-bottom:12px; }
  .event-meta-item { font-size:0.77rem; color:var(--text3); }
  .attend-btn { width:100%; padding:9px; background:linear-gradient(135deg,var(--purple),#818cf8);
    border:none; border-radius:9px; color:white; font-weight:700; font-size:0.85rem; cursor:pointer; transition:all 0.2s; font-family:'DM Sans',sans-serif; }
  .attend-btn:hover { transform:translateY(-1px); }
  .attend-btn.attending { background:linear-gradient(135deg,var(--mint),#38b2ac); }

  /* MISC */
  .section-title { font-family:'Outfit',sans-serif; font-weight:800; font-size:1.3rem; color:var(--text); }
  .section-sub { font-size:0.85rem; color:var(--text3); margin-top:4px; margin-bottom:20px; }
  .page-header { margin-bottom:24px; }
  .toast { position:fixed; bottom:24px; right:24px; background:var(--card2); border:1px solid var(--border);
    border-radius:12px; padding:14px 20px; font-size:0.88rem; color:var(--text); z-index:999;
    box-shadow:var(--shadow); animation:slideIn 0.3s ease; }
  @keyframes slideIn { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  .stat-item { display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid var(--border); }
  .stat-item:last-child { border-bottom:none; }
  .stat-icon { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.9rem; }
  .stat-val { font-family:'Outfit',sans-serif; font-weight:700; font-size:0.95rem; color:var(--text); }
  .stat-lbl { font-size:0.72rem; color:var(--text3); }
  @media(max-width:900px){ .sidebar,.right-panel{display:none} .main-layout{padding:16px} }
`;

// ─── AVATAR ───────────────────────────────────────────────────────────────────
function Avatar({ name = "?", color = "#4ECDC4", size = 40 }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: size * 0.3, color: "#0F1B2D", flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function randomColor(str = "") {
  const colors = ["#FF6B6B","#4ECDC4","#FFE66D","#A8E6CF","#DDA0DD","#F7B731","#FC5C9C","#5C7CFA","#FFB347","#A78BFA"];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return "Hace un momento";
  if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)}h`;
  return `Hace ${Math.floor(diff / 86400)} días`;
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carnet, setCarnet] = useState("");
  const [nombre, setNombre] = useState("");
  const [uni, setUni] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setErr(""); setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        if (!nombre.trim()) throw new Error("Escribe tu nombre completo");
        if (!uni.trim()) throw new Error("Escribe tu universidad o instituto");
        const esInstitucional = email.includes(".edu.pe") || email.includes(".edu.");
        const dni = esInstitucional ? carnet : carnet;
        if (!carnet || carnet.length < 6) throw new Error(esInstitucional ? "El carnet debe tener al menos 6 dígitos" : "El DNI debe tener 8 dígitos");
        const status = esInstitucional ? "aprobado" : "pendiente";
        const { data, error } = await supabase.auth.signUp({ email, password,
          options: { data: { nombre, carnet, universidad: uni } }
        });
        if (error) throw error;
        if (data.user) {
          await supabase.from("profiles").upsert({
            user_id: data.user.id, nombre, universidad: uni,
            carnet, dni: carnet, tipo_correo: esInstitucional ? "institucional" : "personal",
            status
          });
        }
        if (data.user && !data.session) {
          setErr(esInstitucional ? "✅ Revisa tu correo institucional para confirmar tu cuenta" : "✅ Revisa tu correo para confirmar. Tu cuenta será revisada por el administrador.");
          setLoading(false); return;
        }
      }
      onLogin();
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  }

  return (
    <div className="login-root">
      <div className="login-blob" style={{ width:400, height:400, background:"var(--mint)", top:-100, left:-100 }} />
      <div className="login-blob" style={{ width:300, height:300, background:"var(--coral)", bottom:-80, right:-60 }} />
      <div className="login-card">
        <div className="login-logo">Help U</div>
        <div className="login-sub">Tu comunidad universitaria en Lima 🏙️</div>
        <div className="shield-badge">🔒 Solo para estudiantes verificados</div>
        <div className="tabs-login">
          <button className={`tab-login${mode==="login"?" active":""}`} onClick={() => { setMode("login"); setErr(""); }}>Ingresar</button>
          <button className={`tab-login${mode==="register"?" active":""}`} onClick={() => { setMode("register"); setErr(""); }}>Registrarse</button>
        </div>
        {mode === "register" && (
          <>
            <label className="login-label">Nombre completo</label>
            <input className="login-input" placeholder="Ej: Aaron Escalante" value={nombre} onChange={e => setNombre(e.target.value)} />
            <label className="login-label">Universidad o Instituto</label>
            <input className="login-input" placeholder="Ej: PUCP, UPC, TECSUP..." value={uni} onChange={e => setUni(e.target.value)} />
            <label className="login-label">DNI o N° de Carnet Universitario</label>
            <input className="login-input" placeholder="Ej: 12345678 o 20230142" value={carnet} onChange={e => setCarnet(e.target.value)} />
            {!email.includes(".edu") && email.includes("@") && <div style={{ fontSize:"0.75rem", color:"var(--amber)", background:"rgba(255,179,71,0.1)", padding:"8px 12px", borderRadius:8, marginBottom:8 }}>⏳ Con correo personal tu cuenta será revisada por el administrador antes de activarse.</div>}
          </>
        )}
        <label className="login-label">Correo institucional</label>
        <input className="login-input" type="email" placeholder="nombre@universidad.edu.pe" value={email} onChange={e => setEmail(e.target.value)} />
        <label className="login-label">Contraseña</label>
        <input className="login-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        {err && <div className="err-msg">{err}</div>}
        <button className="login-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Cargando..." : mode === "login" ? "Ingresar →" : "Crear cuenta →"}
        </button>
        <div className="login-note">Al ingresar confirmas ser estudiante activo de una universidad o instituto del Perú.</div>
      </div>
    </div>
  );
}

// ─── FEED ─────────────────────────────────────────────────────────────────────
function FeedView({ user }) {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  const nombre = user?.user_metadata?.nombre || user?.email?.split("@")[0] || "Usuario";
  const uni = user?.user_metadata?.universidad || "";

  useEffect(() => {
    loadPosts();
    const channel = supabase.channel("posts").on("postgres_changes",
      { event: "*", schema: "public", table: "posts" }, loadPosts).subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  async function loadPosts() {
    const { data } = await supabase.from("posts").select("*, comments(*)").order("created_at", { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  }

  async function publish() {
    if (!text.trim()) return;
    setPublishing(true);
    await supabase.from("posts").insert({ content: text, user_name: nombre, universidad: uni, user_id: user.id });
    setText("");
    setPublishing(false);
  }

  return (
    <div className="feed-area">
      <div className="post-create">
        <div className="post-create-row">
          <Avatar name={nombre} color={randomColor(nombre)} size={40} />
          <textarea className="post-textarea" placeholder="¿Qué está pasando? Comparte con la comunidad..."
            value={text} onChange={e => setText(e.target.value)} rows={2} />
        </div>
        <div className="post-actions">
          <button className="post-publish-btn" onClick={publish} disabled={publishing || !text.trim()}>
            {publishing ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </div>
      {loading ? <div className="loading">Cargando posts...</div> :
        posts.length === 0 ? (
          <div className="empty-feed">
            <div className="empty-feed-icon">📢</div>
            <div>¡Sé el primero en publicar algo!</div>
          </div>
        ) : posts.map(p => <PostCard key={p.id} post={p} user={user} onUpdate={loadPosts} />)
      }
    </div>
  );
}

function PostCard({ post, user, onUpdate }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const nombre = user?.user_metadata?.nombre || user?.email?.split("@")[0] || "Usuario";

  async function handleLike() {
    const newLikes = liked ? likes - 1 : likes + 1;
    setLiked(!liked); setLikes(newLikes);
    await supabase.from("posts").update({ likes: newLikes }).eq("id", post.id);
  }

  async function sendComment() {
    if (!newComment.trim()) return;
    await supabase.from("comments").insert({ post_id: post.id, content: newComment, user_name: nombre, user_id: user.id });
    const { data } = await supabase.from("comments").select("*").eq("post_id", post.id);
    if (data) setComments(data);
    setNewComment("");
  }

  async function loadComments() {
    const { data } = await supabase.from("comments").select("*").eq("post_id", post.id).order("created_at");
    if (data) setComments(data);
    setShowComments(true);
  }

  const color = randomColor(post.user_name || "");

  return (
    <div className="post-card">
      <div className="post-header">
        <Avatar name={post.user_name} color={color} size={40} />
        <div style={{ flex: 1 }}>
          <div className="post-uname">{post.user_name}
            {post.universidad && <span className="post-uni-badge">{post.universidad}</span>}
          </div>
          <div className="post-meta">{timeAgo(post.created_at)}</div>
        </div>
      </div>
      <div className="post-body">{post.content}</div>
      <div className="post-footer">
        <button className={`post-btn${liked ? " liked" : ""}`} onClick={handleLike}>
          {liked ? "❤️" : "🤍"} {likes}
        </button>
        <button className="post-btn" onClick={() => showComments ? setShowComments(false) : loadComments()}>
          💬 {comments.length}
        </button>
      </div>
      {showComments && (
        <div className="comments-section">
          {comments.map((c, i) => (
            <div className="comment" key={i}>
              <Avatar name={c.user_name} color={randomColor(c.user_name)} size={28} />
              <div className="comment-bubble">
                <div className="comment-user">{c.user_name}</div>
                <div className="comment-text">{c.content}</div>
              </div>
            </div>
          ))}
          <div className="comment-input-row">
            <input className="comment-input" placeholder="Escribe un comentario..." value={newComment}
              onChange={e => setNewComment(e.target.value)} onKeyDown={e => e.key === "Enter" && sendComment()} />
            <button className="comment-send" onClick={sendComment}>→</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MARKET ───────────────────────────────────────────────────────────────────
const emojis = { "Tecnología":"💻","Libros":"📚","Accesorios":"🎒","Arte":"🎨","Servicio":"⏰","Diseño":"🎨","Comida":"🍰","Otro":"📦" };

function MarketView({ user, onToast }) {
  const [tab, setTab] = useState("segunda");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(""); const [price, setPrice] = useState(""); const [tag, setTag] = useState("Otro");
  const nombre = user?.user_metadata?.nombre || user?.email?.split("@")[0] || "Usuario";

  useEffect(() => { loadProducts(); }, [tab]);

  async function loadProducts() {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").eq("type", tab).order("created_at", { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  }

  async function addProduct() {
    if (!name.trim() || !price) return;
    await supabase.from("products").insert({ name, price: parseFloat(price), tag, type: tab, seller_name: nombre, user_id: user.id });
    setName(""); setPrice(""); setTag("Otro");
    loadProducts();
    onToast("✅ Producto publicado");
  }

  return (
    <div style={{ flex: 1 }}>
      <div className="page-header">
        <div className="section-title">Mercado Universitario</div>
        <div className="section-sub">Compra y vende seguro entre estudiantes verificados</div>
      </div>
      <div className="tabs">
        <button className={`tab-btn${tab==="segunda"?" active":""}`} onClick={() => setTab("segunda")}>🔄 Segunda Mano</button>
        <button className={`tab-btn${tab==="empren"?" active":""}`} onClick={() => setTab("empren")}>💡 Emprendimientos</button>
      </div>
      <div className="add-product-form">
        <div className="card-title">+ Publicar producto</div>
        <div className="form-row">
          <input className="form-input" placeholder="Nombre del producto" value={name} onChange={e => setName(e.target.value)} />
          <input className="form-input" placeholder="Precio (S/)" type="number" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <select className="form-input" style={{ flex:1 }} value={tag} onChange={e => setTag(e.target.value)}>
            {Object.keys(emojis).map(k => <option key={k}>{k}</option>)}
          </select>
          <button className="form-submit" onClick={addProduct}>Publicar</button>
        </div>
      </div>
      {loading ? <div className="loading">Cargando productos...</div> :
        products.length === 0 ? <div className="empty-feed"><div className="empty-feed-icon">🛒</div><div>No hay productos aún. ¡Sé el primero!</div></div> :
        <div className="products-grid">
          {products.map(p => (
            <div className="product-card" key={p.id}>
              <div className="product-img">{emojis[p.tag] || "📦"}</div>
              <div className="product-body">
                <div className="product-tag">{p.tag}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-footer">
                  <div className="product-price">S/ {p.price}</div>
                  <div style={{ fontSize:"0.72rem", color:"var(--text3)" }}>{p.seller_name}</div>
                </div>
                <button className="buy-btn" onClick={() => onToast("🔒 Contactando al vendedor...")}>🔒 Comprar Seguro</button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

// ─── EVENTS ───────────────────────────────────────────────────────────────────
function EventsView({ onToast }) {
  const [events, setEvents] = useState([]);
  const [attending, setAttending] = useState({});
  const [loading, setLoading] = useState(true);
  const bgs = ["linear-gradient(135deg,#FF6B6B,#ffa500)","linear-gradient(135deg,#4ECDC4,#44a8ff)","linear-gradient(135deg,#A8E6CF,#4ECDC4)","linear-gradient(135deg,#A78BFA,#818cf8)","linear-gradient(135deg,#FFB347,#FF6B6B)","linear-gradient(135deg,#5C7CFA,#A78BFA)"];

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("events").select("*").order("created_at", { ascending: false });
      if (data) setEvents(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div style={{ flex:1 }}>
      <div className="page-header">
        <div className="section-title">Actividades y Eventos</div>
        <div className="section-sub">Conecta con compañeros y descubre Lima</div>
      </div>
      {loading ? <div className="loading">Cargando eventos...</div> :
        events.length === 0 ? (
          <div className="empty-feed">
            <div className="empty-feed-icon">🎉</div>
            <div>No hay eventos aún. ¡El admin creará pronto!</div>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((ev, i) => (
              <div className="event-card" key={ev.id}>
                <div className="event-header" style={{ background: bgs[i % bgs.length] }}>
                  <span style={{ fontSize:"3rem" }}>{ev.emoji || "🎉"}</span>
                  <span className="event-cat">{ev.category}</span>
                </div>
                <div className="event-body">
                  <div className="event-title">{ev.title}</div>
                  <div className="event-meta">
                    <span className="event-meta-item">📅 {ev.date}</span>
                    <span className="event-meta-item">🕐 {ev.time}</span>
                  </div>
                  <div style={{ fontSize:"0.77rem", color:"var(--purple)", background:"rgba(167,139,250,0.1)", borderRadius:20, padding:"3px 10px", marginBottom:12, display:"inline-block" }}>
                    👥 {ev.spots} cupos
                  </div>
                  <button className={"attend-btn" + (attending[ev.id] ? " attending" : "")}
                    onClick={() => { setAttending(a => ({...a,[ev.id]:!a[ev.id]})); onToast(attending[ev.id] ? "❌ Cancelaste" : "✅ ¡Te apuntaste!"); }}>
                    {attending[ev.id] ? "✅ ¡Asistirás!" : "Asistir"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}


// ─── BUDDIES ──────────────────────────────────────────────────────────────────
function BuddiesView({ user }) {
  const [profiles, setProfiles] = useState([]);
  const [idx, setIdx] = useState(0);
  const [connected, setConnected] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("profiles").select("*").neq("user_id", user.id).limit(20);
      if (data && data.length > 0) setProfiles(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="loading" style={{ paddingTop:60 }}>Cargando perfiles...</div>;

  if (profiles.length === 0) return (
    <div className="buddies-full">
      <div className="empty-feed" style={{ marginTop:60 }}>
        <div className="empty-feed-icon">👥</div>
        <div style={{ marginBottom:8 }}>Aún no hay otros estudiantes registrados</div>
        <div style={{ fontSize:"0.8rem" }}>¡Comparte la app para que se unan!</div>
      </div>
    </div>
  );

  const buddy = profiles[idx % profiles.length];
  const nombre = buddy.nombre || buddy.email?.split("@")[0] || "Estudiante";
  const color = randomColor(nombre);
  const match = 70 + (nombre.length * 3 % 28);

  return (
    <div className="buddies-full">
      <div style={{ marginBottom:24, textAlign:"center" }}>
        <div className="section-title">Conoce tus Buddies</div>
        <div style={{ fontSize:"0.85rem", color:"var(--text3)", marginTop:4 }}>Conecta con estudiantes de todo el Perú</div>
      </div>
      <div className="buddy-card-big">
        <div className="buddy-card-header" style={{ background:`linear-gradient(135deg,${color}40,${color}20)` }}>
          <Avatar name={nombre} color={color} size={100} />
          <div style={{ position:"absolute", top:12, right:12, background:"rgba(78,205,196,0.15)", border:"1px solid rgba(78,205,196,0.3)", borderRadius:20, padding:"3px 10px", fontSize:"0.78rem", color:"var(--mint)", fontWeight:600 }}>
            {match}% match
          </div>
        </div>
        <div className="buddy-card-body">
          <div className="buddy-card-name">{nombre}</div>
          <div className="buddy-card-uni">{buddy.universidad || "Universidad"}</div>
          <div className="buddy-card-career">{buddy.carrera || "Estudiante"}</div>
          <div className="buddy-card-city">📍 {buddy.ciudad || "Lima"}</div>
          <div className="match-bar">
            <div className="match-label"><span>Compatibilidad</span><span>{match}%</span></div>
            <div className="match-track"><div className="match-fill" style={{ width:`${match}%` }} /></div>
          </div>
          <div className="buddy-actions">
            <button className="buddy-pass" onClick={() => setIdx(i => i + 1)}>✕</button>
            <button className="buddy-connect" onClick={() => { setConnected(c => c+1); setIdx(i => i+1); }}>Conectar 🤝</button>
          </div>
        </div>
      </div>
      <div className="buddy-counter">{connected} conexiones nuevas hoy</div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ user, onViewBuddies }) {
  const nombre = user?.user_metadata?.nombre || user?.email?.split("@")[0] || "Usuario";
  const uni = user?.user_metadata?.universidad || "";
  return (
    <div className="sidebar">
      <div className="card" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
        <Avatar name={nombre} color={randomColor(nombre)} size={56} />
        <div style={{ fontWeight:700, fontSize:"0.95rem" }}>{nombre}</div>
        <div style={{ fontSize:"0.78rem", color:"var(--text3)" }}>{uni}</div>
      </div>
      <div className="card">
        <div className="card-title">Tu red</div>
        {[["🔥","#FF6B6B","rgba(255,107,107,0.1)","Activo hoy"],["🤝","#4ECDC4","rgba(78,205,196,0.1)","Buddies"],["🗓️","#A78BFA","rgba(167,139,250,0.1)","Eventos"]].map(([icon,clr,bg,lbl]) => (
          <div className="stat-item" key={lbl}>
            <div className="stat-icon" style={{ background:bg, color:clr }}>{icon}</div>
            <div><div className="stat-lbl">{lbl}</div></div>
          </div>
        ))}
        <button onClick={onViewBuddies} style={{ width:"100%", marginTop:12, padding:"9px", background:"rgba(78,205,196,0.1)", border:"1px solid rgba(78,205,196,0.2)", borderRadius:8, color:"var(--mint)", fontWeight:600, fontSize:"0.83rem", cursor:"pointer" }}>
          Ver Buddies →
        </button>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("muro");
  const [toast, setToast] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [userStatus, setUserStatus] = useState("aprobado");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user || null;
      setUser(u);
      if (u) checkAdmin(u.email, u.id, u.user_metadata);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user || null);
      if (session?.user) checkAdmin(session.user.email, session.user.id, session.user.user_metadata);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function checkAdmin(email, userId, metadata) {
    const { data: adminData } = await supabase.from("admin_users").select("*").eq("email", email).single();
    setIsAdmin(!!adminData);
    if (userId) {
      const { data: existing } = await supabase.from("profiles").select("id, status").eq("user_id", userId).single();
      if (!existing) {
        const esInstitucional = email.includes(".edu.pe") || email.includes(".edu.");
        await supabase.from("profiles").insert({
          user_id: userId,
          nombre: metadata?.nombre || email.split("@")[0],
          universidad: metadata?.universidad || "",
          dni: metadata?.carnet || "",
          tipo_correo: esInstitucional ? "institucional" : "personal",
          status: esInstitucional ? "aprobado" : "pendiente"
        });
        if (!esInstitucional) setUserStatus("pendiente");
      } else {
        setUserStatus(existing.status || "aprobado");
      }
    }
  }

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2800); }

  async function logout() { await supabase.auth.signOut(); setUser(null); }

  if (loading) return <><style>{css}</style><div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text3)" }}>Cargando...</div></>;

  if (!user) return <><style>{css}</style><LoginScreen onLogin={() => supabase.auth.getSession().then(({ data }) => setUser(data.session?.user))} /></>;

  const nombre = user.user_metadata?.nombre || user.email?.split("@")[0] || "U";
  const navLinks = [{ id:"muro", label:"Muro" }, { id:"mercado", label:"Mercado" }, { id:"eventos", label:"Eventos" }, { id:"buddies", label:"Comunidad" }];

  if (userStatus === "pendiente") return (
    <>
      <style>{css}</style>
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16, padding:24, background:"var(--navy)" }}>
        <div style={{ fontSize:"3rem" }}>⏳</div>
        <div style={{ fontFamily:"Outfit", fontWeight:800, fontSize:"1.4rem", color:"var(--text)", textAlign:"center" }}>Tu cuenta está en revisión</div>
        <div style={{ color:"var(--text2)", fontSize:"0.9rem", textAlign:"center", maxWidth:360, lineHeight:1.6 }}>
          Registraste tu cuenta con un correo personal. El administrador revisará tu información y te aprobará pronto. Te notificaremos cuando puedas acceder.
        </div>
        <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"12px 20px", fontSize:"0.83rem", color:"var(--text3)" }}>
          📧 {user.email}
        </div>
        <button onClick={logout} style={{ padding:"10px 24px", background:"transparent", border:"1px solid var(--border)", borderRadius:8, color:"var(--text2)", cursor:"pointer", fontSize:"0.85rem" }}>Cerrar sesión</button>
      </div>
    </>
  );

  if (userStatus === "rechazado") return (
    <>
      <style>{css}</style>
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16, padding:24, background:"var(--navy)" }}>
        <div style={{ fontSize:"3rem" }}>❌</div>
        <div style={{ fontFamily:"Outfit", fontWeight:800, fontSize:"1.4rem", color:"var(--text)", textAlign:"center" }}>Cuenta no aprobada</div>
        <div style={{ color:"var(--text2)", fontSize:"0.9rem", textAlign:"center", maxWidth:360, lineHeight:1.6 }}>
          Tu cuenta no fue aprobada por el administrador. Si crees que es un error, contacta a soporte.
        </div>
        <button onClick={logout} style={{ padding:"10px 24px", background:"transparent", border:"1px solid var(--border)", borderRadius:8, color:"var(--text2)", cursor:"pointer", fontSize:"0.85rem" }}>Cerrar sesión</button>
      </div>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className="app-root">
        <nav className="navbar">
          <div className="nav-logo">Help U</div>
          <div className="nav-links">
            {navLinks.map(l => <button key={l.id} className={`nav-link${tab===l.id?" active":""}`} onClick={() => setTab(l.id)}>{l.label}</button>)}
          </div>
          <div className="nav-right">
            <Avatar name={nombre} color={randomColor(nombre)} size={34} />
            {isAdmin && <button onClick={() => setShowAdmin(true)} style={{ padding:"6px 12px", background:"rgba(167,139,250,0.15)", border:"1px solid rgba(167,139,250,0.3)", borderRadius:8, color:"var(--purple)", fontWeight:700, fontSize:"0.78rem", cursor:"pointer" }}>🛡️ Admin</button>}
            <button className="logout-btn" onClick={logout}>Salir</button>
          </div>
        </nav>
        {tab === "buddies" ? <div style={{ flex:1 }}><BuddiesView user={user} /></div> : (
          <div className="main-layout">
            {tab === "muro" && <><Sidebar user={user} onViewBuddies={() => setTab("buddies")} /><FeedView user={user} /><div className="right-panel" /></>}
            {tab === "mercado" && <MarketView user={user} onToast={showToast} />}
            {tab === "eventos" && <EventsView onToast={showToast} />}
          </div>
        )}
      </div>
      {showAdmin && <AdminPanel user={user} onClose={() => setShowAdmin(false)} />}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

// ─── ADMIN PANEL ─────────────────────────────────────────────────────────────
function AdminPanel({ user, onClose }) {
  const [tab, setTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", category: "", spots: "", emoji: "🎉" });

  useEffect(() => { loadAll(); }, [tab]);

  async function loadAll() {
    setLoading(true);
    if (tab === "posts") {
      const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
      if (data) setPosts(data);
    } else if (tab === "products") {
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (data) setProducts(data);
    } else if (tab === "users") {
      const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (data) setUsers(data);
    } else if (tab === "events") {
      const { data } = await supabase.from("events").select("*").order("created_at", { ascending: false });
      if (data) setEvents(data);
    }
    setLoading(false);
  }

  async function deletePost(id) {
    await supabase.from("posts").delete().eq("id", id);
    setPosts(prev => prev.filter(x => x.id !== id));
  }

  async function deleteProduct(id) {
    await supabase.from("products").delete().eq("id", id);
    setProducts(prev => prev.filter(x => x.id !== id));
  }

  async function createEvent() {
    if (!newEvent.title || !newEvent.date) return;
    await supabase.from("events").insert({ ...newEvent, spots: parseInt(newEvent.spots) || 0 });
    setNewEvent({ title: "", date: "", time: "", category: "", spots: "", emoji: "🎉" });
    loadAll();
  }

  async function deleteEvent(id) {
    await supabase.from("events").delete().eq("id", id);
    setEvents(prev => prev.filter(x => x.id !== id));
  }

  const adminTabs = [
    { id: "posts", label: "📝 Posts" },
    { id: "products", label: "🛒 Productos" },
    { id: "events", label: "🎉 Eventos" },
    { id: "users", label: "👥 Usuarios" },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, width: "100%", maxWidth: 800, maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: "1.2rem", color: "var(--text)" }}>🛡️ Panel de Administrador</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text3)", marginTop: 2 }}>Control total de Help U</div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text2)", padding: "6px 12px", cursor: "pointer", fontSize: "0.85rem" }}>✕ Cerrar</button>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, padding: "12px 24px", borderBottom: "1px solid var(--border)" }}>
          {adminTabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: tab === t.id ? "rgba(78,205,196,0.15)" : "transparent", color: tab === t.id ? "var(--mint)" : "var(--text2)", fontWeight: tab === t.id ? 700 : 400, cursor: "pointer", fontSize: "0.83rem" }}>
              {t.label}
            </button>
          ))}
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {loading ? <div style={{ textAlign: "center", color: "var(--text3)", padding: 40 }}>Cargando...</div> : (
            <>
              {/* POSTS */}
              {tab === "posts" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ fontSize: "0.85rem", color: "var(--text3)", marginBottom: 8 }}>{posts.length} posts en total</div>
                  {posts.length === 0 ? <div style={{ textAlign: "center", color: "var(--text3)", padding: 40 }}>No hay posts</div> :
                    posts.map(p => (
                      <div key={p.id} style={{ background: "var(--navy3)", borderRadius: 10, padding: 14, display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text)", marginBottom: 4 }}>{p.user_name} <span style={{ color: "var(--mint)", fontSize: "0.75rem" }}>{p.universidad}</span></div>
                          <div style={{ fontSize: "0.83rem", color: "var(--text2)", lineHeight: 1.5 }}>{p.content}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text3)", marginTop: 4 }}>{timeAgo(p.created_at)} · {p.likes || 0} likes</div>
                        </div>
                        <button onClick={() => deletePost(p.id)} style={{ background: "rgba(255,107,107,0.15)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: 8, color: "var(--coral)", padding: "5px 10px", cursor: "pointer", fontSize: "0.78rem", flexShrink: 0 }}>🗑️ Eliminar</button>
                      </div>
                    ))
                  }
                </div>
              )}
              {/* PRODUCTS */}
              {tab === "products" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ fontSize: "0.85rem", color: "var(--text3)", marginBottom: 8 }}>{products.length} productos en total</div>
                  {products.length === 0 ? <div style={{ textAlign: "center", color: "var(--text3)", padding: 40 }}>No hay productos</div> :
                    products.map(p => (
                      <div key={p.id} style={{ background: "var(--navy3)", borderRadius: 10, padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}>{p.name}</div>
                          <div style={{ fontSize: "0.78rem", color: "var(--text3)", marginTop: 2 }}>S/ {p.price} · {p.tag} · {p.type === "segunda" ? "Segunda Mano" : "Emprendimiento"} · {p.seller_name}</div>
                        </div>
                        <button onClick={() => deleteProduct(p.id)} style={{ background: "rgba(255,107,107,0.15)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: 8, color: "var(--coral)", padding: "5px 10px", cursor: "pointer", fontSize: "0.78rem" }}>🗑️ Eliminar</button>
                      </div>
                    ))
                  }
                </div>
              )}
              {/* EVENTS */}
              {tab === "events" && (
                <div>
                  <div style={{ background: "var(--navy3)", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", marginBottom: 12 }}>+ Crear nuevo evento</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                      <input style={{ padding: "9px 12px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: "0.85rem", outline: "none" }} placeholder="Nombre del evento" value={newEvent.title} onChange={e => setNewEvent(n => ({ ...n, title: e.target.value }))} />
                      <input style={{ padding: "9px 12px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: "0.85rem", outline: "none" }} placeholder="Categoría" value={newEvent.category} onChange={e => setNewEvent(n => ({ ...n, category: e.target.value }))} />
                      <input style={{ padding: "9px 12px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: "0.85rem", outline: "none" }} placeholder="Fecha (ej: Sáb 31 Mayo)" value={newEvent.date} onChange={e => setNewEvent(n => ({ ...n, date: e.target.value }))} />
                      <input style={{ padding: "9px 12px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: "0.85rem", outline: "none" }} placeholder="Hora (ej: 10:00 AM)" value={newEvent.time} onChange={e => setNewEvent(n => ({ ...n, time: e.target.value }))} />
                      <input style={{ padding: "9px 12px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: "0.85rem", outline: "none" }} placeholder="Cupos" type="number" value={newEvent.spots} onChange={e => setNewEvent(n => ({ ...n, spots: e.target.value }))} />
                      <input style={{ padding: "9px 12px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text)", fontSize: "0.85rem", outline: "none" }} placeholder="Emoji (ej: 🎉)" value={newEvent.emoji} onChange={e => setNewEvent(n => ({ ...n, emoji: e.target.value }))} />
                    </div>
                    <button onClick={createEvent} style={{ padding: "9px 20px", background: "linear-gradient(135deg,var(--mint),#38b2ac)", border: "none", borderRadius: 8, color: "var(--navy)", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>Crear Evento</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {events.length === 0 ? <div style={{ textAlign: "center", color: "var(--text3)", padding: 20 }}>No hay eventos creados aún</div> :
                      events.map(ev => (
                        <div key={ev.id} style={{ background: "var(--navy3)", borderRadius: 10, padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
                          <div style={{ fontSize: "1.5rem" }}>{ev.emoji}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}>{ev.title}</div>
                            <div style={{ fontSize: "0.78rem", color: "var(--text3)", marginTop: 2 }}>{ev.date} · {ev.time} · {ev.spots} cupos · {ev.category}</div>
                          </div>
                          <button onClick={() => deleteEvent(ev.id)} style={{ background: "rgba(255,107,107,0.15)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: 8, color: "var(--coral)", padding: "5px 10px", cursor: "pointer", fontSize: "0.78rem" }}>🗑️ Eliminar</button>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
              {/* USERS */}
              {tab === "users" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ fontSize: "0.85rem", color: "var(--text3)", marginBottom: 8 }}>{users.length} usuarios registrados · {users.filter(u => u.status === "pendiente").length} pendientes</div>
                  {users.length === 0 ? <div style={{ textAlign: "center", color: "var(--text3)", padding: 40 }}>No hay usuarios aún</div> :
                    users.map(u => (
                      <div key={u.id} style={{ background: "var(--navy3)", borderRadius: 10, padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
                        <Avatar name={u.nombre || "U"} color={randomColor(u.nombre || "")} size={36} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}>{u.nombre || "Sin nombre"}</div>
                          <div style={{ fontSize: "0.78rem", color: "var(--text3)", marginTop: 2 }}>{u.universidad} · DNI/Carnet: {u.dni || u.carnet} · {u.tipo_correo === "institucional" ? "📧 Correo institucional" : "📱 Correo personal"}</div>
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          {u.status === "pendiente" && <>
                            <button onClick={async () => { await supabase.from("profiles").update({ status: "aprobado" }).eq("id", u.id); loadAll(); }} style={{ background: "rgba(78,205,196,0.15)", border: "1px solid rgba(78,205,196,0.3)", borderRadius: 8, color: "var(--mint)", padding: "5px 10px", cursor: "pointer", fontSize: "0.78rem" }}>✅ Aprobar</button>
                            <button onClick={async () => { await supabase.from("profiles").update({ status: "rechazado" }).eq("id", u.id); loadAll(); }} style={{ background: "rgba(255,107,107,0.15)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: 8, color: "var(--coral)", padding: "5px 10px", cursor: "pointer", fontSize: "0.78rem" }}>❌ Rechazar</button>
                          </>}
                          {u.status !== "pendiente" && (
                            <div style={{ fontSize: "0.72rem", color: u.status === "aprobado" ? "var(--mint)" : "var(--coral)", background: u.status === "aprobado" ? "rgba(78,205,196,0.1)" : "rgba(255,107,107,0.1)", padding: "3px 8px", borderRadius: 20 }}>
                              {u.status === "aprobado" ? "✅ Aprobado" : "❌ Rechazado"}
                            </div>
                          )}
                          <button onClick={async () => { await supabase.from("profiles").delete().eq("id", u.id); loadAll(); }} style={{ background: "rgba(255,107,107,0.15)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: 8, color: "var(--coral)", padding: "5px 8px", cursor: "pointer", fontSize: "0.78rem" }}>🗑️</button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
