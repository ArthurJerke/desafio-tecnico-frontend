import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Desafio Frontend</h2>

            <nav>
                <Link to="/">Início</Link>
                <Link to="/cep">Buscar CEP</Link>
                <Link to="/noticias">Notícias</Link>
                <Link to="/noticias/nova">Nova notícia</Link>
                <Link to="/noticias/editar/:id">Editar notícia</Link>
                <Link to="/noticias/visualizar/:id">Visualizar notícia</Link>
            </nav>
        </aside>
    );
}

export default Sidebar;