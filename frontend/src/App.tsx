import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Checkout } from './pages/Checkout';
import { StudentArea } from './pages/StudentArea';
import { LessonPage } from './pages/LessonPage';
import { Profile } from './pages/Profile';
import { Reembolso } from './pages/Reembolso';
import { Privacidade } from './pages/Privacidade';
import { Termos } from './pages/Termos';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/minha-area" element={<StudentArea />} />
        <Route path="/minha-area/curso/:moduleId/licao/:lessonId" element={<LessonPage />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/reembolso" element={<Reembolso />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/termos" element={<Termos />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;