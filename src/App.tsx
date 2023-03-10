import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Layout } from './pages/layout';
import { Login } from './pages/login';

export function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
}
