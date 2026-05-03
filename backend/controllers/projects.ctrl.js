const Project = require('../models/Project');

exports.getAllProjects = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Projet non trouvé.' });
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};