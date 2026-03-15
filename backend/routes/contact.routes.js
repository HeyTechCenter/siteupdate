const express        = require('express');
const router         = express.Router();
const { sendContact } = require('../controllers/contact.ctrl');

// POST /api/contact
router.post('/', sendContact);

module.exports = router;