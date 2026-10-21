const nodemailer      = require('nodemailer');
const mongoose        = require('mongoose');
const ContactMessage  = require('../models/ContactMessage');

// Échappe les caractères HTML pour empêcher l'injection dans l'email
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

exports.sendContact = async (req, res, next) => {
  try {
    // ── 1. Données déjà validées par le middleware validateContact ──
    const { name, company, email, phone, message } = req.contact;

    // ── 2. Sauvegarde en base MongoDB (facultative) ────────
    // Sans connexion MongoDB, le message est seulement envoyé par email
    if (mongoose.connection.readyState === 1) {
      await ContactMessage.create({ name, company, email, phone, message });
    } else {
      console.warn('⚠️  MongoDB non connecté — message envoyé par email uniquement');
    }

    // ── 3. Envoi email via Nodemailer ──────────────────────
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Version échappée de chaque champ pour le HTML
    const safe = {
      name:    escapeHtml(name),
      company: escapeHtml(company || 'Non renseignée'),
      email:   escapeHtml(email),
      phone:   escapeHtml(phone || 'Non renseigné'),
      // Échappement puis conservation des retours à la ligne
      message: escapeHtml(message).replace(/\r?\n/g, '<br />'),
    };

    const mailOptions = {
      from:    `"HeyTech Center" <${process.env.EMAIL_USER}>`,
      to:      process.env.EMAIL_USER,
      replyTo: email,
      // Retours à la ligne retirés du sujet pour éviter l'injection d'en-têtes
      subject: `📩 Nouveau message de ${name.replace(/[\r\n]+/g, ' ')} — HeyTech Center`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1A7A4A; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">Nouveau message — HeyTech Center</h2>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
            <p><strong>Nom :</strong> ${safe.name}</p>
            <p><strong>Entreprise :</strong> ${safe.company}</p>
            <p><strong>Email :</strong> ${safe.email}</p>
            <p><strong>Téléphone :</strong> ${safe.phone}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
            <p><strong>Description du projet :</strong></p>
            <p style="background: white; padding: 12px; border-radius: 6px; border-left: 4px solid #1A7A4A;">
              ${safe.message}
            </p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
            <p style="color: #888; font-size: 12px;">
              Message reçu le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // ── 4. Réponse succès (sans renvoyer les données personnelles) ──
    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès.',
    });

  } catch (error) {
    next(error);
  }
};
