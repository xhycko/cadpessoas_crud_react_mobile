import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

// Layout
import Layout from './components/layout/Layout';
import { ToastProvider } from './components/common/Toast';

// Pages
import HomePage from './pages/HomePage';
import ListPessoas from './pages/ListPessoas';
import AddPessoa from './pages/AddPessoa';
import EditPessoa from './pages/EditPessoa';
import HealthCheck from './pages/HealthCheck';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pessoas" element={<ListPessoas />} />
            <Route path="/pessoas/novo" element={<AddPessoa />} />
            <Route path="/pessoas/:id/editar" element={<EditPessoa />} />
            <Route path="/health" element={<HealthCheck />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  );
}

export default App;
