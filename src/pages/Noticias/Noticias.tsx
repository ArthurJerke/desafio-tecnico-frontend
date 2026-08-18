import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as noticiaService from '../../services/noticiaService';
import './Noticias.css';

function Noticias() {
    const navigate = useNavigate();

    const [noticias, setNoticias] = useState<noticiaService.RespostaNoticias>({
        data: [],
        meta: {
            total: 0,
            pagina: 1,
            limite: 10,
            totalPaginas: 0,
        },
    });

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    const [pagina, setPagina] = useState(1);
    const [limite, setLimite] = useState(10);

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    async function carregarNoticias() {
        try {
            setCarregando(true);
            setErro('');

            const resposta = await noticiaService.buscarNoticias({
                titulo: titulo || undefined,
                descricao: descricao || undefined,
                pagina,
                limite,
            });

            setNoticias(resposta);
        } catch (error) {
            console.error(error);
            setErro('Não foi possível carregar as notícias.');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarNoticias();
    }, [pagina, limite]);

    function pesquisar() {
        setPagina(1);
        carregarNoticias();
    }

    function mudarLimite(event: React.ChangeEvent<HTMLSelectElement>) {
        setLimite(Number(event.target.value));
        setPagina(1);
    }

    function excluirNoticia(id: number) {
        if (!confirm('Tem certeza que deseja excluir esta notícia?')) {
            return
        }

        noticiaService.excluirNoticia(id)
            .then(() => {
                carregarNoticias()
            })
            .catch((error) => {
                console.error(error)
                alert('Erro ao excluir notícia.')
            })
    }

    return (
        <div className="noticias-container">
            <h1>Notícias</h1>

            <div className="noticias-filtros">
                <input type="text" placeholder="Filtrar por título" value={titulo} onChange={(event) => setTitulo(event.target.value)} />

                <input type="text" placeholder="Filtrar por descrição" value={descricao} onChange={(event) => setDescricao(event.target.value)} />

                <button onClick={pesquisar}>
                    Pesquisar
                </button>

                <button onClick={() => navigate('/noticias/nova')}>
                    Nova Notícia
                </button>
            </div>

            {carregando && <p>Carregando notícias...</p>}

            {erro && <p>{erro}</p>}

            {!carregando && !erro && (
                <>
                    <div className="noticias-lista">
                        {noticias.data.map((noticia) => (
                            <div className="noticia-card" key={noticia.id}>
                                <h2>{noticia.titulo}</h2>

                                <p className="noticia-descricao">
                                    {noticia.descricao}
                                </p>

                                <div className="noticia-acoes">
                                    <button className="btn-visualizar" onClick={() => navigate(`/noticias/visualizar/${noticia.id}`)}>
                                        Visualizar
                                    </button>

                                    <button className="btn-editar" onClick={() => navigate(`/noticias/editar/${noticia.id}`)}>
                                        Editar
                                    </button>

                                    <button className="btn-excluir" onClick={() => excluirNoticia(noticia.id)}>
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {noticias.data.length === 0 && (
                        <p>Nenhuma notícia encontrada.</p>
                    )}

                    <div className="noticias-paginacao">
                        <div className="noticias-paginacao-controles">
                            <button onClick={() => setPagina((paginaAtual) => paginaAtual - 1)} disabled={pagina <= 1}>
                                Anterior
                            </button>

                            <span>
                                Página {noticias.meta.pagina} de{' '}
                                {noticias.meta.totalPaginas}
                            </span>

                            <button onClick={() => setPagina((paginaAtual) => paginaAtual + 1)} disabled={pagina >= noticias.meta.totalPaginas}>
                                Próxima
                            </button>
                        </div>

                        <div className="noticias-limite">
                            <label htmlFor="limite">Notícias por página:</label>

                            <select id="limite" value={limite} onChange={mudarLimite}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>

                        <span>
                            Total: {noticias.meta.total}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}

export default Noticias;