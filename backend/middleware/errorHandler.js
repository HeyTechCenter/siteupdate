const errorHandler = (err, req, res, next) => {
  console.error('❌ Erreur :', err.message);

  // Erreur Mongoose — champ obligatoire manquant
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error:   messages.join(', '),
    });
  }

  // Erreur Mongoose — ID invalide
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error:   'Identifiant invalide.',
    });
  }

  // Erreur par défaut
  res.status(err.statusCode || 500).json({
    success: false,
    error:   err.message || 'Erreur serveur interne.',
  });
};

module.exports = errorHandler;