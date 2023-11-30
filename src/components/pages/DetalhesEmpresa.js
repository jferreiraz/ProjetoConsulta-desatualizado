// DetalhesEmpresa.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../estilo/DetalhesEmpresa.css';

function DetalhesEmpresa() {
    const { cnpj } = useParams();
    const [detalhesEmpresa, setDetalhesEmpresa] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/v1/estabelecimentos/cnpj/${cnpj}`);
                const data = response.data;

                // Ajuste conforme a estrutura do retorno da API
                const detalhes = data.message && data.message.length > 0 ? data.message[0] : null;
                setDetalhesEmpresa(detalhes);
            } catch (error) {
                console.error('Erro ao obter detalhes da empresa:', error);
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
    }, [cnpj]);

    if (carregando) {
        return <p className="carregando-mensagem"></p>;
    }

    if (!detalhesEmpresa) {
        return <p>Detalhes não encontrados para o CNPJ {cnpj}.</p>;
    }

    const campos = Object.keys(detalhesEmpresa);

    return (
        <div className="detalhes-empresa-container">
            <h2>
                Detalhes da Empresa
                <Link to="/">
                    <button>Voltar para a Pesquisa</button>
                </Link>
            </h2>
            <ul>
                {campos.map((campo, index) => (
                    <li key={index}>
                        <strong>{campo}:</strong> {detalhesEmpresa[campo]}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DetalhesEmpresa;
