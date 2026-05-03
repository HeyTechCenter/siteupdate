const BlogPost = require('../models/BlogPost');

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (err) {
    next(err);
  }
};

exports.getPostBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ success: false, error: 'Article non trouvé.' });
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};