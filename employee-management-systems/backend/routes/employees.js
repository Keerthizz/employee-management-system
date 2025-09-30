const express = require('express');
const router = express.Router();
const { Employee } = require('../models');
const { authMiddleware, requireRole } = require('../middleware/auth');

// Public (read) for authenticated users
router.get('/', authMiddleware, async (req, res) => {
  const list = await Employee.findAll();
  res.json(list);
});

// Create - admin only
router.post('/', authMiddleware, requireRole('admin'), async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.json(emp);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Update - admin only
router.put('/:id', authMiddleware, requireRole('admin'), async (req, res) => {
  try {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Not found' });
    await emp.update(req.body);
    res.json(emp);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// Delete - admin only
router.delete('/:id', authMiddleware, requireRole('admin'), async (req, res) => {
  try {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Not found' });
    await emp.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;
