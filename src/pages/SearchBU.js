// Search.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../style/Search.css';
import HeaderPage from '../components/Header.js';
import SearchBar from '../components/SearchBar.js';

function Search() {
    const [termoPesquisa, setTermoPesquisa] = useState('');
    const [tipoPesquisa, setTipoPesquisa] = useState('cnpj');
    const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [/*termoPesquisadoAnterior*/, setTermoPesquisadoAnterior] = useState('');
    const resultadosPorPagina = 10; // Alterado para 5 empresas por página
    const navigate = useNavigate();

    const handlePesquisar = async () => {
        let apiUrl;
        if (tipoPesquisa === 'cnpj') {
            apiUrl = `/api/v1/estabelecimentos/cnpj/${termoPesquisa}`;
        } else {
            apiUrl = `/api/v1/estabelecimentos/nome/${termoPesquisa}`;
        }

        console.log('API URL:', apiUrl);

        try {
            const response = await axios.get(apiUrl);
            const data = response.data;

            console.log('API Response:', data);

            setResultadosPesquisa(data.message);
            setTermoPesquisadoAnterior(termoPesquisa);
            setTermoPesquisa('');
            setPaginaAtual(1); // Reinicia para a primeira página ao realizar uma nova pesquisa
        } catch (error) {
            console.error('Erro ao obter dados da API:', error);
            // Adicione tratamento de erro mais genérico aqui
        }
    };

    const toggleTipoPesquisa = () => {
        setTipoPesquisa(tipoPesquisa === 'cnpj' ? 'nome' : 'cnpj');
    };

    const abrirDetalhesEmpresa = (cnpj) => {
        navigate(`/detalhes/${cnpj}`);
    };

    const obterResultadosPaginaAtual = () => {
        const indiceInicial = (paginaAtual - 1) * resultadosPorPagina;
        const indiceFinal = indiceInicial + resultadosPorPagina;
        return resultadosPesquisa.slice(indiceInicial, indiceFinal);
    };

    return (
        <div>
            <HeaderPage />
        <div className="pesquisa-container">
            <p className='frase'>Consulte abaixo empresas situadas no Brasil por meio do nome ou CNPJ!</p>
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
                    {/*<p>
                        Pesquisando por: {tipoPesquisa === 'cnpj' ? <strong>CNPJ</strong> : <strong>Nome da Empresa</strong>}  {termoPesquisadoAnterior}
                    </p>*/}
                    <ul>
                        {obterResultadosPaginaAtual().map((empresa, index) => (
                            <li key={index} className="resultado-item">
                                <div>
                                    <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
                                    <p><strong>Nome:</strong> {empresa.nome_fantasia}</p>
                                    {/* Adicione outras informações conforme necessário */}
                                </div>
                                <button onClick={() => abrirDetalhesEmpresa(empresa.cnpj)}>
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
        </div>
    );
}

export default Search;