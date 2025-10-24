import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Nav() {
  const { token, logout } = useApp();
  const navigate = useNavigate();
  return (
    <header className="nav">
      <Link to="/" className="brand">MERN Blog</Link>
      <nav>
        <Link to="/">Posts</Link>
        {token && <Link to="/create">Create</Link>}
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
        )}
      </nav>
    </header>
  );
}
