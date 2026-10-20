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

  // Erreur par défaut — les détails internes (500) ne sont jamais renvoyés au client
  const status = err.statusCode || err.status || 500;
  res.status(status).json({
    success: false,
    error:   status < 500 && err.message ? err.message : 'Erreur serveur interne.',
  });
};

module.exports = errorHandler;