import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import BuscaCep from './pages/BuscaCep';
import Noticias from './pages/Noticias/Noticias';
import ManterNoticia from './components/ManterNoticia/ManterNoticia';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="cep" element={<BuscaCep />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="noticias/nova" element={<ManterNoticia />} />
          <Route path="noticias/editar/:id" element={<ManterNoticia />} />
          <Route path="noticias/visualizar/:id" element={<ManterNoticia />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);