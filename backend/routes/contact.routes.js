const express         = require('express');
const rateLimit       = require('express-rate-limit');
const router          = express.Router();
const validateContact = require('../middleware/validateContact');
const { sendContact } = require('../controllers/contact.ctrl');

// Limite : 5 messages par adresse IP toutes les 15 minutes
const contactLimiter = rateLimit({
  windowMs:        15 * 60 * 1000,
  limit:           5,
  standardHeaders: 'draft-8',
  legacyHeaders:   false,
  message: {
    success: false,
    error:   'Trop de messages envoyés. Merci de réessayer dans quelques minutes.',
  },
});

// POST /api/contact
router.post('/', contactLimiter, validateContact, sendContact);

module.exports = router;
