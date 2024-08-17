import React, { useState } from 'react';
import '../style/SearchBar.css'; // Estilos CSS para a barra de pesquisa

const SearchBar = () => {
  const [isButton1Active, setIsButton1Active] = useState(true);

  const handleButton1Click = () => {
    setIsButton1Active(true);
  };

  const handleButton2Click = () => {
    setIsButton1Active(false);
  };

  return (
    <div className="search-bar">
      <div className="buttons">
        <button className={isButton1Active ? 'active' : ''} onClick={handleButton1Click}>
          Pesquisa por CNPJ
        </button>
        <button className={!isButton1Active ? 'active' : ''} onClick={handleButton2Click}>
          Pesquisa por Nome da empresa
        </button>
      </div>
      <div className='searchbar-button'>
      <input type="text" className='input-text' placeholder="Pesquisar..." />
        <button className='searchbutton'>
          Pesquisar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
