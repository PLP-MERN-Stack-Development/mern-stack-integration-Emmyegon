import express from 'express';
import { body, validationResult } from 'express-validator';
import Category from '../models/Category.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.find({}).sort({ name: 1 });
  res.json(categories);
});

router.post('/', [body('name').isString().isLength({ min: 2 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name } = req.body;
  const exists = await Category.findOne({ name });
  if (exists) return res.status(400).json({ message: 'Category exists' });
  const cat = await Category.create({ name });
  res.status(201).json(cat);
});

export default router;
