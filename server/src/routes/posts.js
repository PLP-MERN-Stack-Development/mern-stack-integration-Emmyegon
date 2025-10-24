import express from 'express';
import { body, param, validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Post from '../models/Post.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  const { page = 1, limit = 10, q = '', category } = req.query;
  const filter = {};
  if (q) filter.title = { $regex: q, $options: 'i' };
  if (category) filter.category = category;
  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Post.find(filter).populate('category').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Post.countDocuments(filter),
  ]);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
});

router.get('/:id', [param('id').isMongoId()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const post = await Post.findById(req.params.id).populate('category');
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

router.post(
  '/',
  protect,
  upload.single('image'),
  [body('title').isString().isLength({ min: 3 }), body('content').isString().isLength({ min: 10 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { title, content, category, author } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const post = await Post.create({ title, content, category, imageUrl, author });
    res.status(201).json(post);
  }
);

router.put(
  '/:id',
  protect,
  upload.single('image'),
  [param('id').isMongoId(), body('title').optional().isString(), body('content').optional().isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const updates = { ...req.body };
    if (req.file) updates.imageUrl = `/uploads/${req.file.filename}`;
    const post = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  }
);

router.delete('/:id', protect, [param('id').isMongoId()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json({ message: 'Deleted' });
});

export default router;
