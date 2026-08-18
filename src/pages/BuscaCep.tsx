import { useState } from 'react';
import { buscarCep } from '../services/cepService';
import type { Cep } from '../types/Cep';

interface Endereco extends Cep {
    numero: string;
    complemento: string;
}

function BuscaCep() {
    const [cep, setCep] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [endereco, setEndereco] = useState<Endereco | null>(null);
    const [enderecos, setEnderecos] = useState<Endereco[]>([]);

    async function handleBuscarCep(event: React.FormEvent) {
        event.preventDefault();

        setErro('');
        setEndereco(null);
        setCarregando(true);

        try {
            const resultado = await buscarCep(cep);

            if (resultado.erro) {
                setErro('CEP não encontrado.');
                return;
            }

            setEndereco({
                ...resultado,
                numero: '',
                complemento: '',
            });
        } catch {
            setErro('Não foi possível buscar o CEP.');
        } finally {
            setCarregando(false);
        }
    }

    function adicionarEndereco(event: React.FormEvent) {
        event.preventDefault();

        if (!endereco) {
            return;
        }

        setEnderecos((lista) => [...lista, endereco]);

        setEndereco(null);

        setCep('');
    }

    function removerEndereco(endereco: Endereco) {
        const listaAtualizada = enderecos.filter((item) => item !== endereco);
        setEnderecos(listaAtualizada);
    }

    return (
        <div className="cep-page">
            <h1>Buscar CEP</h1>

            <form onSubmit={handleBuscarCep} className="cep-search">
                <div className="form-group">
                    <label htmlFor="cep">CEP</label>

                    <input id="cep" value={cep} onChange={(event) => setCep(event.target.value)} placeholder="Ex: 71908-540" />
                </div>

                <button type="submit" disabled={carregando}>
                    {carregando ? 'Buscando...' : 'Buscar CEP'}
                </button>
            </form>

            {erro && <p className="error">{erro}</p>}

            {endereco && (
                <>
                    <form
                        onSubmit={adicionarEndereco}
                        className="cep-form"
                    >
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="cepResultado">CEP</label>
                                <input id="cepResultado" value={endereco.cep} readOnly />
                            </div>

                            <div className="form-group">
                                <label htmlFor="uf">UF</label>

                                <input id="uf" value={endereco.uf} readOnly />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="logradouro">
                                Logradouro
                            </label>

                            <input id="logradouro" value={endereco.logradouro} readOnly />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="numero">Número</label>

                                <input
                                    id="numero"
                                    value={endereco.numero}
                                    onChange={(event) => setEndereco({ ...endereco, numero: event.target.value, })}
                                    placeholder="Ex: 123" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bairro">Bairro</label>

                                <input id="bairro" value={endereco.bairro} readOnly />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="complemento">
                                Complemento
                            </label>

                            <input id="complemento" value={endereco.complemento}
                                onChange={(event) => setEndereco({ ...endereco, complemento: event.target.value, })}
                                placeholder="Ex: Apartamento 101" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cidade">Cidade</label>

                            <input id="cidade" value={endereco.localidade} readOnly />
                        </div>

                        <button type="submit">
                            Adicionar endereço
                        </button>
                    </form>
                </>
            )}

            {enderecos.length > 0 && (
                <section className="enderecos-lista">
                    <h2>Endereços adicionados</h2>

                    {enderecos.map((item, index) => (
                        <div className="endereco-card" key={index}>
                            <div>
                                <strong>{item.logradouro}, {item.numero}</strong>

                                <p>{item.bairro} - {item.localidade}/{item.uf}</p>

                                {item.complemento && (<p>{item.complemento}</p>)}

                                <small>CEP: {item.cep}</small>
                            </div>
                            <div>
                                <button type="button" onClick={() => removerEndereco(item)}>
                                    Remover
                                </button>
                            </div>

                        </div>
                    ))}
                </section>
            )}
        </div>
    );
}

export default BuscaCep;