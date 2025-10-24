import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi.js';
import { useApp } from '../context/AppContext.jsx';

export default function PostForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { categories } = useApp();
  const { loading, error, request } = useApi();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', category: '', author: '' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEdit) {
      request('get', `/posts/${id}`).then((data) =>
        setForm({ title: data.title, content: data.content, category: data.category?._id || '', author: data.author || '' })
      );
    }
  }, [id]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.title.length < 3 || form.content.length < 10) return alert('Please fill title/content');
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append('image', image);

    const method = isEdit ? 'put' : 'post';
    const url = isEdit ? `/posts/${id}` : '/posts';
    const created = await request(method, url, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    navigate(`/posts/${isEdit ? id : created._id}`);
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <label>
        Title
        <input name="title" value={form.title} onChange={onChange} required minLength={3} />
      </label>
      <label>
        Content
        <textarea name="content" value={form.content} onChange={onChange} required minLength={10} rows={8} />
      </label>
      <label>
        Category
        <select name="category" value={form.category} onChange={onChange}>
          <option value="">None</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </label>
      <label>
        Author
        <input name="author" value={form.author} onChange={onChange} />
      </label>
      <label>
        Featured Image
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0])} />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={loading}>{isEdit ? 'Update' : 'Create'} Post</button>
    </form>
  );
}
