const express    = require('express');
const cors       = require('cors');
const dotenv     = require('dotenv');
const mongoose   = require('mongoose');

dotenv.config();

const app = express();

// Derrière Nginx : récupérer la vraie IP du visiteur (nécessaire au rate limit)
app.set('trust proxy', 1);

// ── Middlewares ───────────────────────────────────────────────
// CORS_ORIGIN peut contenir plusieurs origines séparées par des virgules
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '20kb' }));

// ── Connexion MongoDB ─────────────────────────────────────────
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connecté'))
    .catch((err) => console.error('❌ MongoDB erreur :', err.message));
} else {
  console.warn('⚠️  MONGO_URI non défini — MongoDB non connecté');
}

// ── Routes ────────────────────────────────────────────────────
const projectRoutes = require('./routes/projects.routes');
const teamRoutes    = require('./routes/team.routes');
const blogRoutes    = require('./routes/blog.routes');
const contactRoutes = require('./routes/contact.routes');

app.use('/api/projects', projectRoutes);
app.use('/api/team',     teamRoutes);
app.use('/api/blog',     blogRoutes);
app.use('/api/contact',  contactRoutes);

// ── Route test ────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'HeyTech API is running ✅', version: '1.0.0' });
});

// ── Gestion des erreurs ───────────────────────────────────────
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// ── Démarrage ─────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
// HOST=127.0.0.1 en production : l'API n'est joignable que via Nginx
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`🚀 Serveur HeyTech démarré sur ${HOST}:${PORT}`);
});