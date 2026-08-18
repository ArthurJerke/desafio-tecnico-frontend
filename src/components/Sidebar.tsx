import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Desafio Frontend</h2>

            <nav>
                <Link to="/">Início</Link>
                <Link to="/cep">Buscar CEP</Link>
                <Link to="/noticias">Notícias</Link>
            </nav>
        </aside>
    );
}

export default Sidebar;