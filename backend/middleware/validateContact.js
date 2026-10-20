// Validation et nettoyage des données du formulaire de contact

// Longueurs maximales autorisées par champ
const MAX_LENGTHS = {
  name:    100,
  company: 150,
  email:   254,
  phone:   30,
  message: 5000,
};

// Libellés affichés dans les messages d'erreur
const LABELS = {
  name:    'Nom',
  company: 'Entreprise',
  email:   'Email',
  phone:   'Téléphone',
  message: 'Message',
};

// Format email simple (une partie locale, un @, un domaine avec un point)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Format téléphone : chiffres, espaces, +, -, ., parenthèses
const PHONE_REGEX = /^[0-9+\-.\s()]*$/;

const validateContact = (req, res, next) => {
  const body = req.body || {};

  // ── Honeypot anti-spam ─────────────────────────────────
  // Le champ "website" est caché aux humains : s'il est rempli, c'est un robot.
  // On répond comme si tout allait bien pour ne pas le renseigner.
  if (body.website) {
    return res.status(201).json({ success: true, message: 'Message envoyé avec succès.' });
  }

  // ── Normalisation : uniquement des chaînes, sans espaces superflus ──
  const data = {};
  for (const field of Object.keys(MAX_LENGTHS)) {
    const value = body[field];
    data[field] = typeof value === 'string' ? value.trim() : '';
  }

  // ── Champs obligatoires ────────────────────────────────
  if (!data.name || !data.email || !data.message) {
    return res.status(400).json({
      success: false,
      error:   'Nom, email et message sont obligatoires.',
    });
  }

  // ── Longueurs ──────────────────────────────────────────
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    if (data[field].length > max) {
      return res.status(400).json({
        success: false,
        error:   `Le champ « ${LABELS[field]} » ne doit pas dépasser ${max} caractères.`,
      });
    }
  }

  // ── Formats ────────────────────────────────────────────
  if (!EMAIL_REGEX.test(data.email)) {
    return res.status(400).json({ success: false, error: 'Adresse email invalide.' });
  }
  if (!PHONE_REGEX.test(data.phone)) {
    return res.status(400).json({ success: false, error: 'Numéro de téléphone invalide.' });
  }

  // Le contrôleur ne reçoit que les champs attendus, déjà nettoyés
  req.contact = data;
  next();
};

module.exports = validateContact;
