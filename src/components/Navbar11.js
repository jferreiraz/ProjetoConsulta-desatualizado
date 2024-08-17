import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../style/Navbar.css'

function Navbar() {
  const [showName, setShowName] = useState(false);
  const [showCnpj, setShowCnpj] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showOpeningDate, setShowOpeningDate] = useState(false);
  const [showBranch, setShowBranch] = useState(false);
  const [showCapital, setShowCapital] = useState(false);
  const [filters, setFilters] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const toggleInput = (field) => {
    setShowName(field === 'name' ? !showName : false);
    setShowCnpj(field === 'cnpj' ? !showCnpj : false);
    setShowLocation(field === 'location' ? !showLocation : false);
    setShowOpeningDate(field === 'openingDate' ? !showOpeningDate : false);
    setShowBranch(field === 'branch' ? !showBranch : false);
    setShowCapital(field === 'capital' ? !showCapital : false);
  };


  const addFilter = (type, value) => {
    if (value.trim() === '') return;

    const newFilters = filters.filter((f) => f.type !== type);
    setFilters([...newFilters, { type, value }]);
  };

  const removeFilter = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const fetchData = async (page = 0) => {
    const queryString = filters.map((filter) => `${filter.type.toLowerCase()}=${filter.value}`).join('&');
    const url = `/api/?${queryString}&pagina=${page}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.message && data.message.resposta) {
        const apiData = data.message.resposta;
        console.log('Dados da API:', apiData);

        setApiData(apiData);
        setCurrentPage(page); // Atualiza a página atual
      } else {
        throw new Error('A resposta da API não contém os dados esperados');
      }
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apiData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(apiData.length / itemsPerPage);

  return (
    <div className='page'>
      <div>
        <nav className="navbar">


          <div className='filtroPesquisa'>
            <span className='tituloFiltros'>Filtros</span>
          </div>


          <div className='campos'>

            <div className="toggle-input" onClick={() => toggleInput('name')}>
              <span>Nome </span>
              <FontAwesomeIcon icon={showName ? faChevronUp : faChevronDown} />
            </div>
            {showName && (
              <div className="input-container">
                <input type="text" placeholder="Busca por nome..." onBlur={(e) => addFilter('nome_empresa', e.target.value)} />
                <button onClick={() => addFilter('nome_empresa', '')}>Adicionar</button>
              </div>
            )}

            <div className="toggle-input" onClick={() => toggleInput('cnpj')}>
              <span>CNPJ </span>
              <FontAwesomeIcon icon={showCnpj ? faChevronUp : faChevronDown} />
            </div>
            {showCnpj && (
              <div className="input-container">
                <input type="text" placeholder="Busca por CNPJ..." onBlur={(e) => addFilter('CNPJ', e.target.value)} />
                <button onClick={() => addFilter('CNPJ', '')}>Adicionar</button>
              </div>
            )}

            <div className="toggle-input" onClick={() => toggleInput('location')}>
              <span>Localização </span>
              <FontAwesomeIcon icon={showLocation ? faChevronUp : faChevronDown} />
            </div>
            {showLocation && (
              <div className="input-container">
                <input type="text" placeholder="Digite a UF..." onBlur={(e) => addFilter('UF', e.target.value)} />
                <input type="text" placeholder="Digite a cidade..." onBlur={(e) => addFilter('Cidade', e.target.value)} />
                <input type="text" placeholder="Digite o bairro..." onBlur={(e) => addFilter('Bairro', e.target.value)} />
                <input type="text" placeholder="Digite o CEP..." onBlur={(e) => addFilter('CEP', e.target.value)} />
                <button onClick={() => addFilter('', '')}>Adicionar</button>
              </div>
            )}

            <div className="toggle-input" onClick={() => toggleInput('openingDate')}>
              <span>Data de abertura </span>
              <FontAwesomeIcon icon={showOpeningDate ? faChevronUp : faChevronDown} />
            </div>
            {showOpeningDate && (
              <div className="input-container">
                <input type="text" placeholder="Início de atividade..." onBlur={(e) => addFilter('Início Atividade', e.target.value)} />
                <input type="text" placeholder="Fim de atividade..." onBlur={(e) => addFilter('Fim Atividade', e.target.value)} />
                <button onClick={() => addFilter('', '')}>Adicionar</button>
              </div>
            )}

            <div className="toggle-input" onClick={() => toggleInput('branch')}>
              <span>Matriz filial </span>
              <FontAwesomeIcon icon={showBranch ? faChevronUp : faChevronDown} />
            </div>
            {showBranch && (
              <div className="input-container">
                <input type="text" placeholder="Busca por Matriz/Filial..." onBlur={(e) => addFilter('Matriz/Filial', e.target.value)} />
                <button onClick={() => addFilter('', '')}>Adicionar</button>
              </div>
            )}

            <div className="toggle-input" onClick={() => toggleInput('capital')}>
              <span>Capital Social </span>
              <FontAwesomeIcon icon={showCapital ? faChevronUp : faChevronDown} />
            </div>
            {showCapital && (
              <div className="input-container">
                <input type="text" placeholder="Busca por Capital Social..." onBlur={(e) => addFilter('Capital Social', e.target.value)} />
                <button onClick={() => addFilter('', '')}>Adicionar</button>
              </div>
            )}


            <span className='tituloFiltros'>Filtros aplicados</span>

            
            <div className="filters-container">
              {filters.map((filter, index) => (
                <div key={index} className="filter">
                  <span>{filter.type}: {filter.value} </span>
                  <FontAwesomeIcon icon={faTimes} onClick={() => removeFilter(filter)} />
                </div>
              ))}
            </div>


          </div>









        </nav>
      </div>


      <div>
        <button onClick={() => fetchData()}>Buscar Dados</button>
        <h2>Resultados da Pesquisa:</h2>
        <ul>
          {currentItems.map((empresa, index) => (
            <li key={index}>
              <strong>CNPJ Base:</strong> {empresa.cnpj_base}<br />
              <strong>Razão Social/Nome Empresarial:</strong> {empresa.razao_social_nome_empresarial}<br />
              <strong>Natureza Jurídica:</strong> {empresa.natureza_juridica}<br />
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => fetchData(currentPage - 1)} disabled={currentPage === 0}>Página Anterior</button>
          <button onClick={() => fetchData(currentPage + 1)} disabled={currentPage + 1 >= totalPages}>Próxima Página</button>
        </div>
        <div>
          Página {currentPage + 1} de {totalPages}
        </div>
      </div>


    </div>

  );


}

export default Navbar;
