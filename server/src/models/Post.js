import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    imageUrl: { type: String },
    author: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
