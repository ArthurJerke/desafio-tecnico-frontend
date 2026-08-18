import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import * as noticiaService from '../../services/noticiaService'
import './ManterNoticia.css'

function FormularioNoticia() {
    const navigate = useNavigate()
    const { id } = useParams()
    const location = useLocation()
    const isVisualizar = location.pathname.includes('/visualizar/')

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')

    useEffect(() => {
        if (id) {
            noticiaService.buscarNoticia(Number(id))
                .then((noticia) => {
                    setTitulo(noticia.titulo)
                    setDescricao(noticia.descricao)
                })
                .catch((erro) => {
                    console.error("Erro ao carregar notícia:", erro)
                    alert("Não foi possível carregar a notícia para edição.")
                })
        }
    }, [id])

    async function salvar() {
        if (!titulo.trim() || !descricao.trim()) {
            alert("Preencha todos os campos obrigatórios.")
            return
        }

        try {
            const formData = {
                titulo,
                descricao
            }

            if (id) {
                await noticiaService.editarNoticia(Number(id), formData)
            } else {
                await noticiaService.criarNoticia(formData)
            }

            navigate('/noticias')
        } catch (erro) {
            console.error("Erro ao salvar notícia:", erro)
            alert("Não foi possível salvar a notícia.")
        }
    }

    function voltar() {
        navigate('/noticias')
    }

    if (isVisualizar) {
        return (
            <div className="formulario-noticia" style={{ padding: '40px' }}>
                <h1 style={{ marginBottom: '24px', fontSize: '2.2rem', color: '#111' }}>
                    {titulo || 'Carregando...'}
                </h1>
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#444', fontSize: '1.1rem', overflowWrap: 'anywhere' }}>
                    {descricao || 'Carregando...'}
                </p>

                <div className="acoes" style={{ marginTop: '48px', borderTop: '1px solid #eee', paddingTop: '24px' }}>
                    <button type="button" onClick={voltar}>
                        Voltar
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="formulario-noticia">
            <h1>{id ? 'Editar notícia' : 'Nova notícia'}</h1>

            <form onSubmit={(event) => {
                event.preventDefault()
                salvar()
            }}>
                <div className="campo">
                    <label htmlFor="titulo">Título</label>

                    <input
                        id="titulo"
                        type="text"
                        value={titulo}
                        onChange={(event) => setTitulo(event.target.value)}
                        placeholder="Digite o título da notícia"
                    />
                </div>

                <div className="campo">
                    <label htmlFor="descricao">Descrição</label>

                    <textarea
                        id="descricao"
                        value={descricao}
                        onChange={(event) => setDescricao(event.target.value)}
                        placeholder="Digite a descrição da notícia"
                    />
                </div>

                <div className="acoes">
                    <button
                        type="button"
                        onClick={voltar}
                    >
                        Voltar
                    </button>

                    <button type="submit">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormularioNoticia