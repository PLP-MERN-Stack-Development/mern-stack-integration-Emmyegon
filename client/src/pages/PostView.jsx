import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi.js';

export default function PostView() {
  const { id } = useParams();
  const { loading, error, request } = useApi();
  const [post, setPost] = useState(null);

  useEffect(() => {
    request('get', `/posts/${id}`).then(setPost);
  }, [id]);

  if (loading || !post) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <article className="post">
      <h1>{post.title}</h1>
      {post.imageUrl && <img src={post.imageUrl} alt="featured" />}
      {post.category && <span className="pill">{post.category.name}</span>}
      <p>{post.content}</p>
      <Link to={`/edit/${post._id}`}>Edit</Link>
    </article>
  );
}
