const nodemailer      = require('nodemailer');
const ContactMessage  = require('../models/ContactMessage');

exports.sendContact = async (req, res, next) => {
  try {
    const { name, company, email, phone, message } = req.body;

    // ── 1. Validation basique ──────────────────────────────
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error:   'Nom, email et message sont obligatoires.',
      });
    }

    // ── 2. Sauvegarde en base MongoDB ──────────────────────
    const newMessage = await ContactMessage.create({
      name,
      company: company || '',
      email,
      phone:   phone || '',
      message,
    });

    // ── 3. Envoi email via Nodemailer ──────────────────────
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from:    `"HeyTech Center" <${process.env.EMAIL_USER}>`,
      to:      process.env.EMAIL_USER,
      subject: `📩 Nouveau message de ${name} — HeyTech Center`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1A7A4A; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">Nouveau message — HeyTech Center</h2>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Entreprise :</strong> ${company || 'Non renseignée'}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
            <p><strong>Description du projet :</strong></p>
            <p style="background: white; padding: 12px; border-radius: 6px; border-left: 4px solid #1A7A4A;">
              ${message}
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

    // ── 4. Réponse succès ──────────────────────────────────
    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès.',
      data:    newMessage,
    });

  } catch (error) {
    next(error);
  }
};