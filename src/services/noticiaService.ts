import axios from 'axios';
import type { Noticia } from '../types/Noticia';

const api = axios.create({
    baseURL: 'http://localhost:3000/noticias',
});

interface DadosNoticia {
    titulo: string;
    descricao: string;
}

export interface FiltroNoticias {
    titulo?: string;
    descricao?: string;
    pagina?: number;
    limite?: number;
}

export interface RespostaNoticias {
    data: Noticia[];
    meta: {
        total: number;
        pagina: number;
        limite: number;
        totalPaginas: number;
    };
}

export async function buscarNoticias(filtro?: FiltroNoticias): Promise<RespostaNoticias> {
    const response = await api.get<RespostaNoticias>('', { params: filtro });

    return response.data;
}

export async function buscarNoticia(id: number): Promise<Noticia> {
    const response = await api.get<Noticia>(`/${id}`);

    return response.data;
}

export async function criarNoticia(dados: DadosNoticia): Promise<Noticia> {
    const response = await api.post<Noticia>('', dados);

    return response.data;
}

export async function editarNoticia(id: number, dados: DadosNoticia): Promise<Noticia> {
    const response = await api.put<Noticia>(`/${id}`, dados);

    return response.data;
}

export async function excluirNoticia(id: number): Promise<void> {
    await api.delete(`/${id}`);
} 