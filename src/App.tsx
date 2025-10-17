import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, DashboardPage, ConsultaMarcasPage, BusquedaDocumentosPage } from './pages';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/recovery-password" element={<PasswordRecoveryPage />} />
          
          {/* Rutas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Navigate to="/dashboard" replace />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/consulta-marcas" element={
            <ProtectedRoute>
              <Layout>
                <ConsultaMarcasPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/consulta-documentos" element={
            <ProtectedRoute>
              <Layout>
                <BusquedaDocumentosPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
