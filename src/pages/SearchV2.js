import React, { useState } from 'react';
import '../style/Search.css';
import HeaderPage from '../components/Header.js';

function SearchV2() {
    const [searchType, setSearchType] = useState('cnpj'); // Estado para armazenar o tipo de pesquisa selecionado

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
    };

    return (
        <div className="search-page">
            <HeaderPage />
            <div className="search-container">
                <div className="search-sidebar">
                    <div className="search-option" onClick={() => handleSearchTypeChange('cnpj')}>CNPJ</div>
                    <div className="search-option" onClick={() => handleSearchTypeChange('nome')}>Nome</div>
                    <div className="search-option" onClick={() => handleSearchTypeChange('cep')}>CEP</div>
                    <div className="search-option" onClick={() => handleSearchTypeChange('cnae')}>CNAE Fiscal</div>
                </div>
                <div className="search-content">
                    <input type="text" placeholder={`Pesquisar por ${searchType}`} />
                    <button>Pesquisar</button>
                </div>
            </div>
        </div>
    );
}

export default SearchV2;
