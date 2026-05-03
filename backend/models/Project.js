const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    stack:       [{ type: String }],
    image:       { type: String, default: '' },
    category:    { type: String, enum: ['capstone', 'interne', 'client'], default: 'interne' },
    link:        { type: String, default: '#' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);