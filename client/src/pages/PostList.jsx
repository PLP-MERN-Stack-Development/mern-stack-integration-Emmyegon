import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi.js';
import { useApp } from '../context/AppContext.jsx';

export default function PostList() {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
  const { loading, error, request } = useApi();
  const { categories } = useApp();
  const q = params.get('q') || '';
  const page = Number(params.get('page') || 1);
  const category = params.get('category') || '';

  useEffect(() => {
    const fetchData = async () => {
      const res = await request('get', `/posts`, null, { params: { q, page, category } });
      setData(res);
    };
    fetchData();
  }, [q, page, category]);

  const onSearch = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const next = new URLSearchParams(params);
    next.set('q', form.get('q'));
    next.set('page', '1');
    setParams(next);
  };

  const onFilter = (e) => {
    const next = new URLSearchParams(params);
    next.set('category', e.target.value);
    next.set('page', '1');
    setParams(next);
  };

  const onDelete = async (id) => {
    const prev = data.items;
    setData((d) => ({ ...d, items: d.items.filter((i) => i._id !== id) }));
    try {
      await request('delete', `/posts/${id}`);
    } catch (e) {
      setData((d) => ({ ...d, items: prev }));
    }
  };

  return (
    <div>
      <form onSubmit={onSearch} className="toolbar">
        <input name="q" placeholder="Search posts" defaultValue={q} />
        <select value={category} onChange={onFilter}>
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="post-list">
        {data.items.map((p) => (
          <li key={p._id}>
            <Link to={`/posts/${p._id}`}>{p.title}</Link>
            {p.category && <span className="pill">{p.category.name}</span>}
            <div className="spacer" />
            <Link to={`/edit/${p._id}`}>Edit</Link>
            <button onClick={() => onDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button disabled={data.page <= 1} onClick={() => setParams({ q, category, page: data.page - 1 })}>
          Prev
        </button>
        <span>
          Page {data.page} / {data.pages}
        </span>
        <button disabled={data.page >= data.pages} onClick={() => setParams({ q, category, page: data.page + 1 })}>
          Next
        </button>
      </div>
    </div>
  );
}
