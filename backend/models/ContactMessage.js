const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Le nom est obligatoire'],
      trim:     true,
    },
    company: {
      type:  String,
      trim:  true,
      default: '',
    },
    email: {
      type:     String,
      required: [true, 'L\'email est obligatoire'],
      trim:     true,
      lowercase: true,
    },
    phone: {
      type:  String,
      trim:  true,
      default: '',
    },
    message: {
      type:     String,
      required: [true, 'La description du projet est obligatoire'],
      trim:     true,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt automatiques
  }
);

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);