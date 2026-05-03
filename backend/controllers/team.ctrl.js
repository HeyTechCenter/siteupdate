const TeamMember = require('../models/TeamMember');

exports.getAllMembers = async (req, res, next) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: 1 });
    res.json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

exports.getMemberById = async (req, res, next) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, error: 'Membre non trouvé.' });
    res.json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};