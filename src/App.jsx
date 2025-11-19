import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LaudoProvider } from './contexts/LaudoContext';
import Login from './pages/Login';
import Home from './pages/Home';
import NewLaudo from './pages/NewLaudo';
import LaudoDetalhes from './pages/LaudoDetalhes';
import CameraGuiada from './pages/CameraGuiada';
import './App.css';

// Componente de rota protegida
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/" />;
};

// Componente de rota pública (redireciona se já estiver logado)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return user ? <Navigate to="/home" /> : children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-laudo"
        element={
          <ProtectedRoute>
            <NewLaudo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/laudo/:laudoId"
        element={
          <ProtectedRoute>
            <LaudoDetalhes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/laudo/:laudoId/camera"
        element={
          <ProtectedRoute>
            <CameraGuiada />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <LaudoProvider>
          <div className="container">
            <AppRoutes />
          </div>
        </LaudoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
