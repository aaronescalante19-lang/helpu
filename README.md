# 🎓 Help U — Tu comunidad universitaria en Lima

Plataforma comunitaria para estudiantes universitarios que llegan a Lima.  
Conecta con buddies, compra/vende entre estudiantes, y descubre eventos culturales.

---

## 🚀 Cómo correrlo localmente

### Requisitos
- [Node.js](https://nodejs.org/) versión 18 o superior
- Una terminal (CMD, PowerShell, o Terminal de Mac/Linux)

### Pasos

```bash
# 1. Entra a la carpeta del proyecto
cd helpu

# 2. Instala las dependencias
npm install

# 3. Corre el servidor de desarrollo
npm run dev
```

Abre tu navegador en → **http://localhost:5173**

---

## 🌐 Publicar en Vercel (gratis)

### Opción A — Desde GitHub (recomendado)

1. Crea cuenta en [github.com](https://github.com)
2. Crea un repositorio nuevo llamado `helpu`
3. Sube el proyecto:
```bash
git init
git add .
git commit -m "🚀 primer commit - Help U"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/helpu.git
git push -u origin main
```
4. Ve a [vercel.com](https://vercel.com) → **Add New Project**
5. Importa tu repositorio de GitHub
6. Clic en **Deploy** → ¡listo! Tendrás una URL pública.

### Opción B — Desde la terminal

```bash
npm install -g vercel
vercel
```

---

## 🗂️ Estructura del proyecto

```
helpu/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx        ← Toda la aplicación
│   └── main.jsx       ← Punto de entrada
├── index.html
├── package.json
├── vite.config.js
└── vercel.json        ← Config para Vercel
```

---

## 🛠️ Próximos pasos (para hacerlo real)

| Feature | Herramienta | Gratis |
|---|---|---|
| Login real con correo | Supabase Auth | ✅ |
| Base de datos de usuarios | Supabase | ✅ |
| Posts y comentarios reales | Supabase Database | ✅ |
| Subida de fotos | Supabase Storage | ✅ |
| Notificaciones | Supabase Realtime | ✅ |
| Dominio personalizado | Vercel + Namecheap | ~$10/año |

### Conectar Supabase (cuando estés listo)

1. Crea cuenta en [supabase.com](https://supabase.com)
2. Crea un proyecto nuevo
3. Crea un archivo `.env` en la raíz:
```
VITE_SUPABASE_URL=https://tuproyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_publica
```
4. Instala el cliente: `npm install @supabase/supabase-js`

---

## 👥 Equipo

Desarrollado con ❤️ para estudiantes universitarios en Lima, Perú.

---

## 📄 Licencia

MIT — libre para usar y modificar.
