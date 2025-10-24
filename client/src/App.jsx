import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import PostList from './pages/PostList.jsx';
import PostView from './pages/PostView.jsx';
import PostForm from './pages/PostForm.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { useApp } from './context/AppContext.jsx';

function PrivateRoute({ children }) {
  const { token } = useApp();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="/posts/:id" element={<PostView />} />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <PostForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <PostForm />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
