// DetalhesEmpresa.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import dados from '../dados/dados.json';
import '../estilo/DetalhesEmpresa.css'; // Importa o arquivo de estilos

function DetalhesEmpresa() {
    const { cnpj } = useParams();

    const detalhesEmpresa = dados.find((empresa) => empresa.message.cnpj_basico === cnpj);

    if (!detalhesEmpresa) {
        return <p>Detalhes não encontrados.</p>;
    }

    const { message } = detalhesEmpresa;

    const campos = Object.keys(message);

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
                        <strong>{campo}:</strong> {message[campo]}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DetalhesEmpresa;
