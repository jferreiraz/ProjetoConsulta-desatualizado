import React, { useState } from 'react';
import dados from '../dados/dados.json';
import '../estilo/Pesquisa.css';
import { useNavigate } from 'react-router-dom'; 

function Pesquisa() {
    const [termoPesquisa, setTermoPesquisa] = useState('');
    const [tipoPesquisa, setTipoPesquisa] = useState('cnpj');
    const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [termoPesquisadoAnterior, setTermoPesquisadoAnterior] = useState('');
    const resultadosPorPagina = 2;
    const navigate = useNavigate(); 

    const handlePesquisar = () => {
        const resultados = dados.filter((empresa) => {
            if (tipoPesquisa === 'cnpj') {
                return empresa.message.cnpj_basico.includes(termoPesquisa);
            } else {
                return empresa.message.nome_fantasia.includes(termoPesquisa);
            }
        });

        setResultadosPesquisa(resultados);
        setTermoPesquisadoAnterior(termoPesquisa);
        setTermoPesquisa('');
        setPaginaAtual(1);
    };

    const obterResultadosPaginaAtual = () => {
        const indiceInicial = (paginaAtual - 1) * resultadosPorPagina;
        const indiceFinal = indiceInicial + resultadosPorPagina;
        return resultadosPesquisa.slice(indiceInicial, indiceFinal);
    };

    const toggleTipoPesquisa = () => {
        setTipoPesquisa(tipoPesquisa === 'cnpj' ? 'nome' : 'cnpj');
    };

    const abrirDetalhesEmpresa = (cnpj) => {
        navigate(`/detalhes/${cnpj}`);
      };

    return (
        <div className="pesquisa-container">
            <h2>Pesquisa</h2>
            <div className="form-group">
                <label>
                    {tipoPesquisa === 'cnpj' ? 'CNPJ:' : 'Nome da Empresa:'}
                </label>
                <input
                    type="text"
                    value={termoPesquisa}
                    onChange={(e) => setTermoPesquisa(e.target.value)}
                />
            </div>
            <div className="button-group">
            <div className="switch-container">
                    <label>Alternar Pesquisa:</label>
                    <div className="switch">
                        <input
                            type="checkbox"
                            id="switchToggle"
                            onChange={toggleTipoPesquisa}
                            checked={tipoPesquisa === 'nome'}
                        />
                        <label htmlFor="switchToggle"></label>
                    </div>
                </div>
                <button onClick={handlePesquisar}>Pesquisar</button>
            </div>

            {obterResultadosPaginaAtual().length > 0 && (
                <div>
                    <h3>Resultados da Pesquisa</h3>
                <p>
                    Pesquisando por: {tipoPesquisa === 'cnpj' ? <strong>CNPJ</strong> : <strong>Nome da Empresa</strong>}  {termoPesquisadoAnterior}
                </p>
                <ul>
                    {obterResultadosPaginaAtual().map((empresa, index) => (
                        <li key={index} className="resultado-item">
                            <div>
                                <p><strong>CNPJ:</strong> {empresa.message.cnpj_basico}</p>
                                <p><strong>Nome:</strong> {empresa.message.nome_fantasia}</p>
                            </div>
                            <button onClick={() => abrirDetalhesEmpresa(empresa.message.cnpj_basico)}>
                                <strong>Ver Detalhes</strong>
                            </button>
                        </li>
                    ))}
                </ul>

                    <div className="pagination">
                        <button
                            onClick={() => setPaginaAtual(paginaAtual - 1)}
                            disabled={paginaAtual === 1}
                        >
                            Anterior
                        </button>
                        <span>Página {paginaAtual}</span>
                        <button
                            onClick={() => setPaginaAtual(paginaAtual + 1)}
                            disabled={paginaAtual * resultadosPorPagina >= resultadosPesquisa.length}
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            )}

            {obterResultadosPaginaAtual().length === 0 && (
                <p>Nenhuma empresa encontrada.</p>
            )}
        </div>
    );
}

export default Pesquisa;
