import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const BUDDIES = [
  { id: 1, name: "Valentina Torres", age: 19, uni: "PUCP", career: "Psicología", city: "Arequipa", interests: ["Yoga", "Fotografía", "Museos"], avatar: "VT", color: "#FF6B6B", match: 94 },
  { id: 2, name: "Diego Ríos", age: 20, uni: "UPC", career: "Ing. de Software", city: "Trujillo", interests: ["Brawl Stars", "Guitarra", "Senderismo"], avatar: "DR", color: "#4ECDC4", match: 87 },
  { id: 3, name: "Camila Paredes", age: 18, uni: "USIL", career: "Gastronomía", city: "Cusco", interests: ["Cocina", "Bádminton", "K-pop"], avatar: "CP", color: "#FFE66D", match: 91 },
  { id: 4, name: "Sebastián Quispe", age: 21, uni: "UNFV", career: "Medicina", city: "Piura", interests: ["Fútbol", "Lectura", "Series"], avatar: "SQ", color: "#A8E6CF", match: 78 },
  { id: 5, name: "Lucía Mendoza", age: 19, uni: "UL", career: "Comunicaciones", city: "Chiclayo", interests: ["TikTok", "Pintura", "Café"], avatar: "LM", color: "#DDA0DD", match: 85 },
  { id: 6, name: "Andrés Salas", age: 22, uni: "TECSUP", career: "Mecatrónica", city: "Ica", interests: ["Gaming", "Motos", "Electrónica"], avatar: "AS", color: "#F7B731", match: 72 },
  { id: 7, name: "Fernanda Castro", age: 20, uni: "ISIL", career: "Marketing", city: "Tacna", interests: ["Redes sociales", "Moda", "Vóley"], avatar: "FC", color: "#FC5C9C", match: 89 },
  { id: 8, name: "Mateo Huanca", age: 21, uni: "UNI", career: "Arquitectura", city: "Puno", interests: ["Dibujo", "Escalada", "Jazz"], avatar: "MH", color: "#5C7CFA", match: 83 },
];

const POSTS = [
  {
    id: 1, user: "Valentina Torres", uni: "PUCP", avatar: "VT", color: "#FF6B6B", time: "Hace 12 min",
    content: "¡Acabo de llegar a Lima desde Arequipa! 🎉 Si alguien conoce buenos sitios para comer cerca de Miraflores que no arruinen el bolsillo universitario, ¡comenten! #NuevaEnLima #Arequipeña",
    image: null, likes: 24, comments: [
      { user: "Diego Ríos", avatar: "DR", color: "#4ECDC4", text: "¡Bienvenida! El mercado de Surquillo es increíble y súper barato 🍜", likes: 5 },
      { user: "Camila Paredes", avatar: "CP", color: "#FFE66D", text: "Como estudiante de gastronomía, te recomiendo Huaca Pucllana para el ambiente aunque es un poco más caro. Para el día a día, los menús del centro de Miraflores 👌", likes: 8 },
    ]
  },
  {
    id: 2, user: "Sebastián Quispe", uni: "UNFV", avatar: "SQ", color: "#A8E6CF", time: "Hace 1h",
    content: "Alguien que quiera estudiar en grupo para los exámenes parciales? Busco grupo de estudio en la biblioteca central. Somos 3 de Medicina del 2do ciclo 📚 #GrupoDeEstudio #UNFV",
    image: null, likes: 41, comments: [
      { user: "Lucía Mendoza", avatar: "LM", color: "#DDA0DD", text: "Yo! Aunque soy de Comunicaciones podría ayudar con los cursos de Redacción 😊", likes: 3 },
    ]
  },
  {
    id: 3, user: "Andrés Salas", uni: "TECSUP", avatar: "AS", color: "#F7B731", time: "Hace 3h",
    content: "Vendo mi calculadora científica Casio fx-991LA Plus, casi nueva. La uso desde el primer ciclo pero ya no la necesito. S/. 65 negociables 🤙 #Mercado #TECSUP",
    image: null, likes: 18, comments: []
  }
];

const PRODUCTS_SEGUNDA = [
  { id: 1, name: "Calculadora Casio fx-991", price: 65, seller: "Andrés S.", avatar: "AS", color: "#F7B731", tag: "Tecnología" },
  { id: 2, name: "Libros de Cálculo I y II", price: 40, seller: "Mateo H.", avatar: "MH", color: "#5C7CFA", tag: "Libros" },
  { id: 3, name: "Mochila Samsonite", price: 80, seller: "Fernanda C.", avatar: "FC", color: "#FC5C9C", tag: "Accesorios" },
  { id: 4, name: "Auriculares Sony", price: 55, seller: "Diego R.", avatar: "DR", color: "#4ECDC4", tag: "Tecnología" },
  { id: 5, name: "Mesa de dibujo A2", price: 90, seller: "Valentina T.", avatar: "VT", color: "#FF6B6B", tag: "Arte" },
  { id: 6, name: "Set de colores Faber", price: 35, seller: "Camila P.", avatar: "CP", color: "#FFE66D", tag: "Arte" },
];

const PRODUCTS_EMPREN = [
  { id: 1, name: "Tutorías de Matemáticas", price: 30, seller: "Sebastián Q.", avatar: "SQ", color: "#A8E6CF", tag: "Servicio / hora" },
  { id: 2, name: "Diseño de logos", price: 50, seller: "Mateo H.", avatar: "MH", color: "#5C7CFA", tag: "Diseño" },
  { id: 3, name: "Stickers personalizados", price: 15, seller: "Lucía M.", avatar: "LM", color: "#DDA0DD", tag: "Pack x10" },
  { id: 4, name: "Postres artesanales", price: 8, seller: "Camila P.", avatar: "CP", color: "#FFE66D", tag: "Por unidad" },
  { id: 5, name: "Fotografía de eventos", price: 120, seller: "Fernanda C.", avatar: "FC", color: "#FC5C9C", tag: "Servicio" },
  { id: 6, name: "Clases de guitarra", price: 25, seller: "Diego R.", avatar: "DR", color: "#4ECDC4", tag: "Servicio / hora" },
];

const EVENTS = [
  { id: 1, title: "Tour Gastronómico Lima Centro", date: "Sáb 31 Mayo", time: "10:00 AM", category: "Gastronomía", spots: 18, emoji: "🍜" },
  { id: 2, title: "Tarde de Museos - Larco & MALI", date: "Dom 1 Jun", time: "2:00 PM", category: "Cultura", spots: 25, emoji: "🎨" },
  { id: 3, title: "Junta en el Parque Kennedy", date: "Vie 6 Jun", time: "5:30 PM", category: "Social", spots: 50, emoji: "🌿" },
  { id: 4, title: "Noche de Juegos de Mesa", date: "Sáb 7 Jun", time: "7:00 PM", category: "Entretenimiento", spots: 16, emoji: "🎲" },
  { id: 5, title: "Caminata Cerro San Cristóbal", date: "Dom 8 Jun", time: "8:00 AM", category: "Deporte", spots: 30, emoji: "⛰️" },
  { id: 6, title: "Feria de Emprendimientos PUCP", date: "Lun 9 Jun", time: "11:00 AM", category: "Negocios", spots: 100, emoji: "💼" },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0F1B2D;
    --navy2: #162236;
    --navy3: #1E2F45;
    --card: #1A2840;
    --card2: #223050;
    --coral: #FF6B6B;
    --mint: #4ECDC4;
    --amber: #FFB347;
    --purple: #A78BFA;
    --text: #F0F4FF;
    --text2: #94A3C0;
    --text3: #5B6E8A;
    --border: rgba(255,255,255,0.07);
    --radius: 16px;
    --radius-sm: 10px;
    --shadow: 0 8px 32px rgba(0,0,0,0.3);
    --shadow-hover: 0 16px 48px rgba(0,0,0,0.4);
  }

  body { background: var(--navy); color: var(--text); font-family: 'DM Sans', sans-serif; }

  /* LOGIN */
  .login-root {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: radial-gradient(ellipse at 30% 20%, rgba(78,205,196,0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, rgba(255,107,107,0.12) 0%, transparent 50%),
                var(--navy);
    position: relative; overflow: hidden;
  }
  .login-blob {
    position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.3; pointer-events: none;
  }
  .login-card {
    background: rgba(26,40,64,0.9); backdrop-filter: blur(20px);
    border: 1px solid var(--border); border-radius: 24px;
    padding: 48px 40px; width: 100%; max-width: 440px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5);
    position: relative; z-index: 1;
  }
  .login-logo {
    font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 2.2rem;
    background: linear-gradient(135deg, var(--mint), var(--coral));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    margin-bottom: 4px;
  }
  .login-sub { color: var(--text2); font-size: 0.9rem; margin-bottom: 32px; }
  .login-label { font-size: 0.8rem; font-weight: 600; color: var(--text2); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; display: block; }
  .login-input {
    width: 100%; padding: 13px 16px; background: var(--navy3); border: 1px solid var(--border);
    border-radius: var(--radius-sm); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
  }
  .login-input:focus { border-color: var(--mint); box-shadow: 0 0 0 3px rgba(78,205,196,0.15); }
  .login-input::placeholder { color: var(--text3); }
  .login-btn {
    width: 100%; padding: 14px; background: linear-gradient(135deg, var(--mint), #38b2ac);
    border: none; border-radius: var(--radius-sm); color: var(--navy); font-family: 'Outfit', sans-serif;
    font-weight: 700; font-size: 1rem; cursor: pointer; letter-spacing: 0.02em;
    transition: transform 0.15s, box-shadow 0.15s; margin-top: 8px;
  }
  .login-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(78,205,196,0.35); }
  .login-btn:active { transform: translateY(0); }
  .login-divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; color: var(--text3); font-size: 0.8rem; }
  .login-divider::before, .login-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .login-btn-alt {
    width: 100%; padding: 13px; background: transparent; border: 1px solid var(--border);
    border-radius: var(--radius-sm); color: var(--text); font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; cursor: pointer; transition: background 0.2s, border-color 0.2s;
  }
  .login-btn-alt:hover { background: var(--card); border-color: rgba(255,255,255,0.15); }
  .login-note { text-align: center; color: var(--text3); font-size: 0.78rem; margin-top: 20px; line-height: 1.6; }
  .shield-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(78,205,196,0.1); border: 1px solid rgba(78,205,196,0.2); border-radius: 20px; padding: 5px 12px; font-size: 0.78rem; color: var(--mint); margin-bottom: 24px; }

  /* APP SHELL */
  .app-root { min-height: 100vh; display: flex; flex-direction: column; }
  .navbar {
    background: rgba(15,27,45,0.95); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100;
    padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.4rem; background: linear-gradient(135deg, var(--mint), var(--coral)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .nav-links { display: flex; gap: 4px; }
  .nav-link {
    padding: 7px 16px; border-radius: 8px; font-size: 0.875rem; font-weight: 500; cursor: pointer;
    color: var(--text2); transition: all 0.2s; border: none; background: transparent; font-family: 'DM Sans', sans-serif;
  }
  .nav-link:hover { color: var(--text); background: var(--card); }
  .nav-link.active { color: var(--mint); background: rgba(78,205,196,0.12); }
  .nav-avatar {
    width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, var(--coral), #ff9a9e);
    display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem;
    color: white; cursor: pointer; border: 2px solid rgba(255,107,107,0.4);
  }
  .nav-right { display: flex; align-items: center; gap: 12px; }
  .notif-btn { width: 34px; height: 34px; border-radius: 8px; background: var(--card); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text2); font-size: 1rem; position: relative; }
  .notif-dot { position: absolute; top: 6px; right: 7px; width: 7px; height: 7px; background: var(--coral); border-radius: 50%; border: 1.5px solid var(--navy); }

  /* LAYOUT */
  .main-layout { display: flex; gap: 0; flex: 1; max-width: 1280px; margin: 0 auto; width: 100%; padding: 24px 16px; gap: 20px; }
  .sidebar { width: 260px; flex-shrink: 0; display: flex; flex-direction: column; gap: 16px; }
  .feed-area { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 16px; }
  .right-panel { width: 240px; flex-shrink: 0; display: flex; flex-direction: column; gap: 16px; }

  /* CARDS */
  .card {
    background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px; transition: transform 0.2s, box-shadow 0.2s;
  }
  .card:hover { transform: translateY(-2px); box-shadow: var(--shadow-hover); }
  .card-title { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.85rem; color: var(--text2); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 14px; }

  /* BUDDY MINI */
  .buddy-mini { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.15s; border-radius: 8px; padding: 8px; margin: 0 -8px; }
  .buddy-mini:hover { background: var(--card2); }
  .buddy-mini:last-child { border-bottom: none; }
  .buddy-ava { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem; color: var(--navy); flex-shrink: 0; }
  .buddy-name { font-weight: 600; font-size: 0.88rem; color: var(--text); }
  .buddy-tag { font-size: 0.75rem; color: var(--text3); }
  .buddy-match { margin-left: auto; font-size: 0.75rem; font-weight: 700; color: var(--mint); background: rgba(78,205,196,0.1); padding: 2px 7px; border-radius: 20px; }

  /* POST */
  .post-create { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; }
  .post-create-row { display: flex; align-items: center; gap: 12px; }
  .post-textarea {
    flex: 1; background: var(--navy3); border: 1px solid var(--border); border-radius: 10px;
    padding: 11px 14px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
    resize: none; outline: none; transition: border-color 0.2s; min-height: 44px;
  }
  .post-textarea:focus { border-color: var(--mint); }
  .post-textarea::placeholder { color: var(--text3); }
  .post-actions { display: flex; gap: 8px; margin-top: 12px; padding-left: 50px; }
  .post-action-btn {
    display: flex; align-items: center; gap: 5px; padding: 6px 12px; border-radius: 8px;
    background: var(--card2); border: 1px solid var(--border); color: var(--text2); font-size: 0.8rem;
    cursor: pointer; transition: all 0.2s;
  }
  .post-action-btn:hover { color: var(--text); background: var(--navy3); }
  .post-publish-btn {
    margin-left: auto; padding: 7px 20px; background: linear-gradient(135deg, var(--mint), #38b2ac);
    border: none; border-radius: 8px; color: var(--navy); font-weight: 700; font-size: 0.85rem; cursor: pointer;
    transition: all 0.2s;
  }
  .post-publish-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(78,205,196,0.3); }

  .post-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
  .post-header { padding: 16px 16px 12px; display: flex; align-items: center; gap: 10px; }
  .post-ava { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; color: var(--navy); flex-shrink: 0; }
  .post-uname { font-weight: 600; font-size: 0.9rem; color: var(--text); }
  .post-meta { font-size: 0.75rem; color: var(--text3); }
  .post-uni-badge { display: inline-block; background: rgba(78,205,196,0.12); color: var(--mint); border-radius: 6px; padding: 1px 7px; font-size: 0.72rem; font-weight: 600; margin-left: 6px; }
  .post-body { padding: 0 16px 14px; font-size: 0.9rem; line-height: 1.6; color: var(--text); }
  .post-footer { display: flex; gap: 8px; padding: 12px 16px; border-top: 1px solid var(--border); }
  .post-btn {
    display: flex; align-items: center; gap: 5px; padding: 6px 14px; border-radius: 8px; background: transparent;
    border: 1px solid var(--border); color: var(--text2); font-size: 0.82rem; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .post-btn:hover { background: var(--card2); color: var(--text); }
  .post-btn.liked { color: var(--coral); border-color: rgba(255,107,107,0.3); background: rgba(255,107,107,0.08); }
  .comments-section { padding: 12px 16px; background: var(--navy3); border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 10px; }
  .comment { display: flex; gap: 8px; }
  .comment-ava { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.65rem; color: var(--navy); flex-shrink: 0; margin-top: 2px; }
  .comment-bubble { background: var(--card2); border-radius: 10px; padding: 8px 12px; flex: 1; }
  .comment-user { font-weight: 600; font-size: 0.78rem; color: var(--text); margin-bottom: 3px; }
  .comment-text { font-size: 0.83rem; color: var(--text2); line-height: 1.5; }
  .comment-input-row { display: flex; gap: 8px; margin-top: 4px; }
  .comment-input { flex: 1; background: var(--card2); border: 1px solid var(--border); border-radius: 8px; padding: 7px 12px; color: var(--text); font-size: 0.82rem; outline: none; font-family: 'DM Sans', sans-serif; }
  .comment-send { padding: 7px 14px; background: var(--mint); border: none; border-radius: 8px; color: var(--navy); font-weight: 700; font-size: 0.8rem; cursor: pointer; }

  /* MARKET */
  .tabs { display: flex; gap: 4px; padding: 4px; background: var(--navy3); border-radius: 10px; margin-bottom: 20px; }
  .tab-btn {
    flex: 1; padding: 9px 16px; border-radius: 7px; background: transparent; border: none; color: var(--text2);
    font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.88rem; cursor: pointer; transition: all 0.2s;
  }
  .tab-btn.active { background: var(--card); color: var(--text); box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
  .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(175px, 1fr)); gap: 14px; }
  .product-card {
    background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;
    cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
  }
  .product-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }
  .product-img { height: 110px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; background: var(--navy3); }
  .product-body { padding: 12px; }
  .product-tag { font-size: 0.7rem; color: var(--mint); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
  .product-name { font-weight: 600; font-size: 0.88rem; color: var(--text); margin-bottom: 8px; line-height: 1.3; }
  .product-footer { display: flex; align-items: center; justify-content: space-between; }
  .product-price { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.05rem; color: var(--amber); }
  .product-seller { display: flex; align-items: center; gap: 5px; font-size: 0.72rem; color: var(--text3); }
  .product-seller-ava { width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.55rem; font-weight: 700; color: var(--navy); }
  .buy-btn {
    width: 100%; margin-top: 10px; padding: 8px; background: linear-gradient(135deg, var(--coral), #ff8e8e);
    border: none; border-radius: 8px; color: white; font-weight: 700; font-size: 0.8rem; cursor: pointer;
    transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .buy-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(255,107,107,0.35); }

  /* EVENTS */
  .events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
  .event-card {
    background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;
    cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
  }
  .event-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }
  .event-header { height: 100px; display: flex; align-items: center; justify-content: center; font-size: 3rem; position: relative; }
  .event-cat { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.4); color: white; font-size: 0.7rem; font-weight: 600; padding: 3px 9px; border-radius: 20px; backdrop-filter: blur(4px); }
  .event-body { padding: 16px; }
  .event-title { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.95rem; color: var(--text); margin-bottom: 8px; line-height: 1.3; }
  .event-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .event-meta-item { display: flex; align-items: center; gap: 4px; font-size: 0.77rem; color: var(--text3); }
  .event-spots { font-size: 0.77rem; color: var(--purple); background: rgba(167,139,250,0.1); padding: 2px 8px; border-radius: 20px; margin-bottom: 12px; display: inline-block; }
  .attend-btn {
    width: 100%; padding: 9px; background: linear-gradient(135deg, var(--purple), #818cf8);
    border: none; border-radius: 9px; color: white; font-weight: 700; font-size: 0.85rem; cursor: pointer;
    transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .attend-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(167,139,250,0.35); }
  .attend-btn.attending { background: linear-gradient(135deg, var(--mint), #38b2ac); }

  /* BUDDIES VIEW */
  .buddies-full { display: flex; flex-direction: column; align-items: center; padding: 20px; }
  .buddy-card-big {
    width: 100%; max-width: 380px; background: var(--card); border: 1px solid var(--border);
    border-radius: 24px; overflow: hidden; position: relative;
    box-shadow: 0 24px 64px rgba(0,0,0,0.4);
  }
  .buddy-card-header { height: 220px; display: flex; align-items: center; justify-content: center; position: relative; }
  .buddy-avatar-big { width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; color: var(--navy); border: 4px solid rgba(255,255,255,0.2); }
  .buddy-card-body { padding: 24px; }
  .buddy-card-name { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.6rem; color: var(--text); }
  .buddy-card-uni { color: var(--mint); font-weight: 600; font-size: 0.9rem; margin-bottom: 4px; }
  .buddy-card-career { color: var(--text2); font-size: 0.85rem; margin-bottom: 12px; }
  .buddy-card-city { display: inline-flex; align-items: center; gap: 5px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 20px; padding: 4px 12px; font-size: 0.8rem; color: var(--text2); margin-bottom: 16px; }
  .buddy-interests { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
  .interest-tag { background: var(--card2); border: 1px solid var(--border); border-radius: 20px; padding: 4px 12px; font-size: 0.78rem; color: var(--text2); }
  .match-bar { margin-bottom: 24px; }
  .match-label { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.8rem; color: var(--text2); }
  .match-label span:last-child { color: var(--mint); font-weight: 700; }
  .match-track { height: 6px; background: var(--navy3); border-radius: 3px; overflow: hidden; }
  .match-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--mint), var(--purple)); transition: width 0.5s ease; }
  .buddy-actions { display: flex; gap: 12px; }
  .buddy-pass { flex: 1; padding: 13px; background: transparent; border: 2px solid var(--border); border-radius: 12px; color: var(--text2); font-size: 1.2rem; cursor: pointer; transition: all 0.2s; }
  .buddy-pass:hover { border-color: var(--coral); color: var(--coral); background: rgba(255,107,107,0.08); }
  .buddy-connect { flex: 2; padding: 13px; background: linear-gradient(135deg, var(--mint), #38b2ac); border: none; border-radius: 12px; color: var(--navy); font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif; }
  .buddy-connect:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(78,205,196,0.35); }
  .buddy-counter { font-size: 0.8rem; color: var(--text3); margin-top: 16px; }

  /* MISC */
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .section-title { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.3rem; color: var(--text); }
  .section-sub { font-size: 0.85rem; color: var(--text3); margin-top: 4px; }
  .see-all { font-size: 0.82rem; color: var(--mint); cursor: pointer; font-weight: 600; background: none; border: none; }
  .see-all:hover { text-decoration: underline; }
  .toast {
    position: fixed; bottom: 24px; right: 24px; background: var(--card2); border: 1px solid var(--border);
    border-radius: 12px; padding: 14px 20px; font-size: 0.88rem; color: var(--text); z-index: 999;
    box-shadow: var(--shadow); display: flex; align-items: center; gap: 10px;
    animation: slideIn 0.3s ease;
  }
  @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .page-header { margin-bottom: 24px; }

  /* RIGHT PANEL STATS */
  .stat-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--border); }
  .stat-item:last-child { border-bottom: none; }
  .stat-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; }
  .stat-val { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.95rem; color: var(--text); }
  .stat-lbl { font-size: 0.72rem; color: var(--text3); }

  @media (max-width: 900px) {
    .sidebar, .right-panel { display: none; }
    .main-layout { padding: 16px; }
  }
`;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Avatar({ code, color, size = 40, fontSize = "0.8rem" }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize, color: "#0F1B2D", flexShrink: 0 }}>
      {code}
    </div>
  );
}

function PostCard({ post, onLike, onComment }) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [likes, setLikes] = useState(post.likes);

  function handleLike() {
    setLiked(!liked);
    setLikes(l => liked ? l - 1 : l + 1);
  }

  function handleComment() {
    if (!newComment.trim()) return;
    setComments(c => [...c, { user: "Tú", avatar: "TÚ", color: "#FF6B6B", text: newComment, likes: 0 }]);
    setNewComment("");
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <Avatar code={post.avatar} color={post.color} size={40} />
        <div style={{ flex: 1 }}>
          <div className="post-uname">{post.user}<span className="post-uni-badge">{post.uni}</span></div>
          <div className="post-meta">{post.time}</div>
        </div>
        <div style={{ color: "var(--text3)", fontSize: "1.1rem", cursor: "pointer" }}>···</div>
      </div>
      <div className="post-body">{post.content}</div>
      <div className="post-footer">
        <button className={`post-btn${liked ? " liked" : ""}`} onClick={handleLike}>
          {liked ? "❤️" : "🤍"} {likes}
        </button>
        <button className="post-btn" onClick={() => setShowComments(s => !s)}>
          💬 {comments.length}
        </button>
        <button className="post-btn">↗️ Compartir</button>
      </div>
      {showComments && (
        <div className="comments-section">
          {comments.map((c, i) => (
            <div className="comment" key={i}>
              <Avatar code={c.avatar} color={c.color} size={28} fontSize="0.65rem" />
              <div className="comment-bubble">
                <div className="comment-user">{c.user}</div>
                <div className="comment-text">{c.text}</div>
              </div>
            </div>
          ))}
          <div className="comment-input-row">
            <input className="comment-input" placeholder="Escribe un comentario..." value={newComment} onChange={e => setNewComment(e.target.value)} onKeyDown={e => e.key === "Enter" && handleComment()} />
            <button className="comment-send" onClick={handleComment}>→</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Sidebar({ onViewBuddies }) {
  return (
    <div className="sidebar">
      {/* Profile mini */}
      <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "20px" }}>
        <Avatar code="YO" color="#FF6B6B" size={56} fontSize="1rem" />
        <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Mi Perfil</div>
        <div style={{ fontSize: "0.78rem", color: "var(--text3)" }}>PUCP · 1er ciclo</div>
        <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
          {[["12", "Buddies"], ["3", "Eventos"], ["8", "Posts"]].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: "1rem", color: "var(--text)" }}>{val}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text3)" }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Buddies */}
      <div className="card">
        <div className="card-title">Tus Buddies</div>
        {BUDDIES.slice(0, 4).map(b => (
          <div className="buddy-mini" key={b.id}>
            <Avatar code={b.avatar} color={b.color} size={38} fontSize="0.75rem" />
            <div>
              <div className="buddy-name">{b.name.split(" ")[0]}</div>
              <div className="buddy-tag">{b.interests[0]}</div>
            </div>
            <div className="buddy-match">{b.match}%</div>
          </div>
        ))}
        <button onClick={onViewBuddies} style={{ width: "100%", marginTop: 12, padding: "9px", background: "rgba(78,205,196,0.1)", border: "1px solid rgba(78,205,196,0.2)", borderRadius: 8, color: "var(--mint)", fontWeight: 600, fontSize: "0.83rem", cursor: "pointer" }}>
          Ver todos →
        </button>
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="right-panel">
      <div className="card">
        <div className="card-title">Tu actividad</div>
        {[
          ["🔥", "#FF6B6B", "rgba(255,107,107,0.1)", "3", "Días activo"],
          ["🤝", "#4ECDC4", "rgba(78,205,196,0.1)", "7", "Conexiones"],
          ["🗓️", "#A78BFA", "rgba(167,139,250,0.1)", "2", "Eventos próx."],
          ["🛒", "#FFB347", "rgba(255,179,71,0.1)", "5", "Publicaciones"],
        ].map(([icon, clr, bg, val, lbl]) => (
          <div className="stat-item" key={lbl}>
            <div className="stat-icon" style={{ background: bg, color: clr }}>{icon}</div>
            <div>
              <div className="stat-val">{val}</div>
              <div className="stat-lbl">{lbl}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-title">Próximo evento</div>
        <div style={{ background: "var(--navy3)", borderRadius: 10, padding: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: 4 }}>🍜</div>
          <div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: 4 }}>Tour Gastronómico</div>
          <div style={{ fontSize: "0.75rem", color: "var(--text3)", marginBottom: 10 }}>Sáb 31 Mayo · 10:00 AM</div>
          <div style={{ fontSize: "0.75rem", color: "var(--purple)", background: "rgba(167,139,250,0.1)", borderRadius: 20, padding: "3px 10px" }}>18 cupos restantes</div>
        </div>
      </div>
    </div>
  );
}

function FeedView() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState(POSTS);

  function handlePublish() {
    if (!postText.trim()) return;
    setPosts(p => [{
      id: Date.now(), user: "Tú", uni: "PUCP", avatar: "TÚ", color: "#FF6B6B", time: "Ahora mismo",
      content: postText, image: null, likes: 0, comments: []
    }, ...p]);
    setPostText("");
  }

  return (
    <div className="feed-area">
      <div className="post-create">
        <div className="post-create-row">
          <Avatar code="TÚ" color="#FF6B6B" size={40} />
          <textarea className="post-textarea" placeholder="¿Qué está pasando? Comparte con la comunidad..." value={postText} onChange={e => setPostText(e.target.value)} rows={2} />
        </div>
        <div className="post-actions">
          <button className="post-action-btn">📷 Foto</button>
          <button className="post-action-btn">📍 Ubicación</button>
          <button className="post-action-btn">🏷️ Etiquetar</button>
          <button className="post-publish-btn" onClick={handlePublish}>Publicar</button>
        </div>
      </div>
      {posts.map(p => <PostCard key={p.id} post={p} />)}
    </div>
  );
}

function MarketView({ onToast }) {
  const [tab, setTab] = useState("segunda");
  const prods = tab === "segunda" ? PRODUCTS_SEGUNDA : PRODUCTS_EMPREN;
  const emojis = { "Tecnología": "💻", "Libros": "📚", "Accesorios": "🎒", "Arte": "🎨", "Servicio / hora": "⏰", "Diseño": "🎨", "Pack x10": "🌟", "Por unidad": "🍰", "Servicio": "📸" };

  return (
    <div style={{ flex: 1 }}>
      <div className="page-header">
        <div className="section-title">Mercado Universitario</div>
        <div className="section-sub">Compra y vende seguro entre estudiantes verificados</div>
      </div>
      <div className="tabs">
        <button className={`tab-btn${tab === "segunda" ? " active" : ""}`} onClick={() => setTab("segunda")}>🔄 Segunda Mano</button>
        <button className={`tab-btn${tab === "empren" ? " active" : ""}`} onClick={() => setTab("empren")}>💡 Emprendimientos</button>
      </div>
      <div className="products-grid">
        {prods.map(p => (
          <div className="product-card" key={p.id}>
            <div className="product-img">{emojis[p.tag] || "📦"}</div>
            <div className="product-body">
              <div className="product-tag">{p.tag}</div>
              <div className="product-name">{p.name}</div>
              <div className="product-footer">
                <div className="product-price">S/ {p.price}</div>
                <div className="product-seller">
                  <div className="product-seller-ava" style={{ background: p.color }}>{p.avatar}</div>
                  {p.seller}
                </div>
              </div>
              <button className="buy-btn" onClick={() => onToast("🔒 Pago seguro iniciado")}>🔒 Comprar Seguro</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsView({ onToast }) {
  const [attending, setAttending] = useState({});
  const bgColors = ["linear-gradient(135deg,#FF6B6B,#ffa500)", "linear-gradient(135deg,#4ECDC4,#44a8ff)", "linear-gradient(135deg,#A8E6CF,#4ECDC4)", "linear-gradient(135deg,#A78BFA,#818cf8)", "linear-gradient(135deg,#FFB347,#FF6B6B)", "linear-gradient(135deg,#5C7CFA,#A78BFA)"];

  return (
    <div style={{ flex: 1 }}>
      <div className="page-header">
        <div className="section-title">Actividades y Eventos</div>
        <div className="section-sub">Conecta con compañeros y descubre Lima</div>
      </div>
      <div className="events-grid">
        {EVENTS.map((ev, i) => (
          <div className="event-card" key={ev.id}>
            <div className="event-header" style={{ background: bgColors[i] }}>
              <span style={{ fontSize: "3rem" }}>{ev.emoji}</span>
              <span className="event-cat">{ev.category}</span>
            </div>
            <div className="event-body">
              <div className="event-title">{ev.title}</div>
              <div className="event-meta">
                <span className="event-meta-item">📅 {ev.date}</span>
                <span className="event-meta-item">🕐 {ev.time}</span>
              </div>
              <div className="event-spots">👥 {ev.spots} cupos disponibles</div>
              <button
                className={`attend-btn${attending[ev.id] ? " attending" : ""}`}
                onClick={() => { setAttending(a => ({ ...a, [ev.id]: !a[ev.id] })); onToast(attending[ev.id] ? "❌ Cancelaste tu asistencia" : "✅ ¡Te apuntaste al evento!"); }}
              >
                {attending[ev.id] ? "✅ ¡Asistirás!" : "Asistir"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BuddiesView() {
  const [idx, setIdx] = useState(0);
  const [connected, setConnected] = useState([]);
  const buddy = BUDDIES[idx];

  function next(connect) {
    if (connect) setConnected(c => [...c, buddy.id]);
    setIdx(i => (i + 1) % BUDDIES.length);
  }

  return (
    <div className="buddies-full">
      <div style={{ marginBottom: 24, textAlign: "center" }}>
        <div className="section-title">Conoce tus Buddies</div>
        <div style={{ fontSize: "0.85rem", color: "var(--text3)", marginTop: 4 }}>Desliza para conectar con estudiantes de todo el Perú</div>
      </div>
      <div className="buddy-card-big">
        <div className="buddy-card-header" style={{ background: `linear-gradient(135deg, ${buddy.color}40, ${buddy.color}20)` }}>
          <Avatar code={buddy.avatar} color={buddy.color} size={100} fontSize="2rem" />
          <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(78,205,196,0.15)", border: "1px solid rgba(78,205,196,0.3)", borderRadius: 20, padding: "3px 10px", fontSize: "0.78rem", color: "var(--mint)", fontWeight: 600 }}>
            {buddy.match}% match
          </div>
        </div>
        <div className="buddy-card-body">
          <div className="buddy-card-name">{buddy.name}</div>
          <div className="buddy-card-uni">{buddy.uni} · {buddy.career}</div>
          <div className="buddy-card-city">📍 Viene de {buddy.city}</div>
          <div className="buddy-interests">
            {buddy.interests.map(i => <span key={i} className="interest-tag">{i}</span>)}
          </div>
          <div className="match-bar">
            <div className="match-label"><span>Compatibilidad</span><span>{buddy.match}%</span></div>
            <div className="match-track"><div className="match-fill" style={{ width: `${buddy.match}%` }} /></div>
          </div>
          <div className="buddy-actions">
            <button className="buddy-pass" onClick={() => next(false)}>✕</button>
            <button className="buddy-connect" onClick={() => next(true)}>Conectar 🤝</button>
          </div>
        </div>
      </div>
      <div className="buddy-counter">
        {idx + 1} / {BUDDIES.length} perfiles · {connected.length} conexiones nuevas
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [carnet, setCarnet] = useState("");
  const [err, setErr] = useState("");

  function handleSubmit() {
    if (!email.endsWith(".edu.pe") && !email.includes("pucp") && !email.includes("upc") && !email.includes("unmsm") && !email.includes("uni.edu")) {
      if (!email.includes("@")) { setErr("Por favor ingresa un correo institucional válido"); return; }
    }
    if (!carnet || carnet.length < 5) { setErr("El número de carnet debe tener al menos 5 dígitos"); return; }
    setErr("");
    onLogin();
  }

  return (
    <div className="login-root">
      <div className="login-blob" style={{ width: 400, height: 400, background: "var(--mint)", top: -100, left: -100 }} />
      <div className="login-blob" style={{ width: 300, height: 300, background: "var(--coral)", bottom: -80, right: -60 }} />
      <div className="login-card">
        <div className="login-logo">Help U</div>
        <div className="login-sub">Tu comunidad universitaria en Lima 🏙️</div>
        <div className="shield-badge">🔒 Acceso solo para estudiantes verificados</div>

        <label className="login-label">Correo institucional</label>
        <input className="login-input" type="email" placeholder="nombre@universidad.edu.pe" value={email} onChange={e => { setEmail(e.target.value); setErr(""); }} />

        <label className="login-label">Número de carnet universitario</label>
        <input className="login-input" type="text" placeholder="Ej: 20230142" value={carnet} onChange={e => { setCarnet(e.target.value); setErr(""); }} />

        {err && <div style={{ color: "var(--coral)", fontSize: "0.8rem", marginBottom: 8, background: "rgba(255,107,107,0.1)", padding: "8px 12px", borderRadius: 8 }}>{err}</div>}

        <button className="login-btn" onClick={handleSubmit}>Ingresar a la comunidad →</button>
        <div className="login-divider">o</div>
        <button className="login-btn-alt">🏫 Ingresar con Google Institucional</button>
        <div className="login-note">Al ingresar aceptas los Términos de Uso y confirmas ser estudiante activo de una universidad o instituto del Perú. Tus datos están protegidos.</div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState("muro");
  const [toast, setToast] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }

  if (!loggedIn) return (
    <>
      <style>{css}</style>
      <LoginScreen onLogin={() => setLoggedIn(true)} />
    </>
  );

  const navLinks = [
    { id: "muro", label: "Muro" },
    { id: "mercado", label: "Mercado" },
    { id: "eventos", label: "Eventos" },
    { id: "buddies", label: "Comunidad" },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="app-root">
        <nav className="navbar">
          <div className="nav-logo">Help U</div>
          <div className="nav-links">
            {navLinks.map(l => (
              <button key={l.id} className={`nav-link${tab === l.id ? " active" : ""}`} onClick={() => setTab(l.id)}>{l.label}</button>
            ))}
          </div>
          <div className="nav-right">
            <div className="notif-btn">🔔<div className="notif-dot" /></div>
            <div className="nav-avatar">TÚ</div>
          </div>
        </nav>

        {tab === "buddies" ? (
          <div style={{ flex: 1, background: "var(--navy)" }}>
            <BuddiesView />
          </div>
        ) : (
          <div className="main-layout">
            {tab === "muro" && (
              <>
                <Sidebar onViewBuddies={() => setTab("buddies")} />
                <FeedView />
                <RightPanel />
              </>
            )}
            {tab === "mercado" && (
              <>
                <div style={{ width: 0 }} />
                <MarketView onToast={showToast} />
              </>
            )}
            {tab === "eventos" && (
              <>
                <div style={{ width: 0 }} />
                <EventsView onToast={showToast} />
              </>
            )}
          </div>
        )}
      </div>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
