import axios from 'axios';
import type { Cep } from '../types/Cep';

const api = axios.create({
    baseURL: 'https://viacep.com.br/ws',
});

export async function buscarCep(cep: string): Promise<Cep> {
    const response = await api.get<Cep>(`/${cep}/json/`);

    return response.data;
}