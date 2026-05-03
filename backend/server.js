const express    = require('express');
const cors       = require('cors');
const dotenv     = require('dotenv');
const mongoose   = require('mongoose');

dotenv.config();

const app = express();

// ── Middlewares ───────────────────────────────────────────────
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

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
app.listen(PORT, () => {
  console.log(`🚀 Serveur HeyTech démarré sur le port ${PORT}`);
});