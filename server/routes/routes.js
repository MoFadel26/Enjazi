const router  = require('express').Router();
const user = require('../models/userSchema');

/* ----------------------------------------------------
   POST ‑ Add a new project
---------------------------------------------------- */
router.post('/', async (req, res) => {
  try {
    const newProject = await user.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ----------------------------------------------------
   POST ‑ Update a specific project
   (Could also be PUT or PATCH; lab uses POST)
---------------------------------------------------- */
router.post('/:id', async (req, res) => {
  try {
    const updated = await user.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }            // return the modified doc
    );
    if (!updated) return res.status(404).json({ error: 'Project not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ----------------------------------------------------
   GET ‑ All projects
---------------------------------------------------- */
router.get('/', async (_req, res) => {
  const projects = await user.find();
  res.json(projects);
});

/* ----------------------------------------------------
   GET ‑ A specific project by ID
---------------------------------------------------- */
router.get('/:id', async (req, res) => {
  try {
    const project = await user.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* ----------------------------------------------------
   DELETE ‑ A specific project
---------------------------------------------------- */
router.delete('/:id', async (req, res) => {
  try {
    const result = await user.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;