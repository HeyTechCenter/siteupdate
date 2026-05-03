const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema(
  {
    title:     { type: String, required: true, trim: true },
    slug:      { type: String, required: true, unique: true, trim: true },
    content:   { type: String, required: true },
    tags:      [{ type: String }],
    thumbnail: { type: String, default: '' },
    author:    { type: String, default: 'HeyTech Center' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BlogPost', BlogPostSchema);