const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    role:        { type: String, required: true, trim: true },
    specialties: [{ type: String }],
    photo:       { type: String, default: '' },
    linkedin:    { type: String, default: '' },
    github:      { type: String, default: '' },
    department:  { type: String, enum: ['DEV', 'AI & Research', 'Akatsuki'], default: 'DEV' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamMember', TeamMemberSchema);