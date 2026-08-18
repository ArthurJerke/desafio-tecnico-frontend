import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Desafio Frontend</h2>

        <nav>
          <a href="/">Início</a>
          <a href="/cep">Buscar CEP</a>
          <a href="/noticias">Notícias</a>
        </nav>
      </aside>

      <main className="content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;