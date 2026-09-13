import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Checkout } from './pages/Checkout';
import { StudentArea } from './pages/StudentArea';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/minha-area" element={<StudentArea />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;