import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchorCircleCheck, faArrowAltCircleDown, faArrowAltCircleRight, faChevronDown, faChevronRight, faChevronUp, faCoffee, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../style/Navbar.css';
import { Link, useParams } from 'react-router-dom';

import Accordion from 'react-bootstrap/Accordion';

function Navbar() {
  const [showName, setShowName] = useState(false);
  const [showCnpj, setShowCnpj] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showOpeningDate, setShowOpeningDate] = useState(false);
  const [showBranch, setShowBranch] = useState(false);
  const [showCapital, setShowCapital] = useState(false);
  const [showPorte, setShowPorte] = useState(false);
  const [filters, setFilters] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 50;

  const formatCase = (str) => {
    if (typeof str !== 'string') 
      return str;
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  const toggleInput = (field) => {
    setShowName(field === 'name' ? !showName : false);
    setShowCnpj(field === 'cnpj' ? !showCnpj : false);
    setShowLocation(field === 'location' ? !showLocation : false);
    setShowOpeningDate(field === 'openingDate' ? !showOpeningDate : false);
    setShowBranch(field === 'branch' ? !showBranch : false);
    setShowCapital(field === 'capital' ? !showCapital : false);
    setShowPorte(field === 'porte empresa' ? !showPorte : false);
  };


  const addFilter = (type, value) => {
    if (value.trim() === '') return;

    console.log(filters);

    const newFilters = filters.filter((f) => f.type !== type);
    setFilters([...newFilters, { type, value }]);
  };

  const removeFilter = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
    console.log("remove.filter:", filter);
    console.log(filters.find(filter => filter.type === 'CNPJ'));
    //console.log(filters);
    //console.log({type:"nome",value:"nome"});
  };


  const fetchData = async (page = 0) => {
    const queryString = filters.map((filter) => `${filter.type.toLowerCase()}=${filter.value}`).join('&');
    //url abaixo não esta sendo utilizado na atual linha 48 = (deveria ser utilizado em 'const response = await fetch(url);')
    const url = `http://localhost:8000/api/v1/empresas/?${queryString}&pagina=${page}&tamanho=200`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Lança um erro se a resposta não for ok
      }
      const data = await response.json();

      if (data.message && data.message.resposta) {
        const apiData = data.message.resposta;
        console.log('Dados da API:', url, apiData);
        setApiData(apiData);
        setCurrentPage(page);
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

            <div className="iconeLupa">

              <input
                type="text"
                placeholder="Busca por nome ou CNPJ..."
                onChange={(e) => {
                  const value = e.target.value;


                  // Verifica se o valor contém apenas números
                  const isNumber = /^[0-9]+$/.test(value);

                  if (isNumber) {
                    // Se o valor for apenas números, adiciona o filtro CNPJ
                    addFilter('CNPJ', value);
                    //removeFilter({type:"nome",value:value}); // Remove o filtro de nome, se necessário
                    //console.log('t1', isNumber);
                  } else {
                    // Se o valor contém letras, adiciona o filtro nome
                    addFilter('nome', value);
                    //removeFilter({type:"CNPJ",value:value}); // Remove o filtro de CNPJ, se necessário
                    //console.log('t2', isNumber);
                  }

                }}

                onKeyUp={(e) => {
                  const value = e.target.value;

                  if (value === '') {
                    // Se o campo estiver vazio, remove ambos os filtros
                    console.log('entrou value1==""');
                    if (filters.find(filter => filter.type === 'nome') !== '') {
                      removeFilter(filters.find(filter => filter.type === 'nome'));
                    }
                  }
                }}

                onKeyDown={(e) => {
                  const value = e.target.value;


                  // Se o campo estiver vazio, remove ambos os filtros
                  console.log('entrou value2==""');
                  if (filters.find(filter => filter.type === 'cnpj') !== '') {
                    console.log('entrou value3tt==""');
                    removeFilter(filters.find(filter => filter.type === 'CNPJ'));
                    console.log('entrou value4tt==""');

                  }

                }}

              />



              <FontAwesomeIcon className='lupa' icon={faSearch} onClick={() => fetchData()} /></div>

            <div className="filters-container">
              {filters.map((filter, index) => (
                <div key={index} className="filter">
                  <span>{filter.type}: {filter.value} </span>
                  <FontAwesomeIcon icon={faTimes} onClick={() => removeFilter(filter)} />
                </div>
              ))}
            </div>

          </div>


          <div className='campos'>



            <div className="toggle-input" onClick={() => toggleInput('location')}>
              <span>Localização </span>
              <FontAwesomeIcon icon={showLocation ? faChevronUp : faChevronDown} />
            </div>
            {showLocation && (
              <div className="input-container">
                <select name="UF" onChange={(e) => addFilter('UF', e.target.value)} id="UF"><option value="" disabled selected>Selecione UF</option><option value="DF">DF</option><option value="SP">SP</option><option value="MG">MG</option><option value="RJ">RJ</option></select>

                {/*
                <input type="text" placeholder="Digite a UF..." onChange={(e) => addFilter('UF', e.target.value)} />
                <input type="text" placeholder="Digite a cidade..." onChange={(e) => addFilter('Cidade', e.target.value)} />
                <input type="text" placeholder="Digite o bairro..." onChange={(e) => addFilter('Bairro', e.target.value)} />
                */}

                <input type="text" placeholder="Digite o CEP..." onChange={(e) => addFilter('CEP', e.target.value)} />

              </div>
            )}

            <div className="toggle-input" onClick={() => toggleInput('openingDate')}>
              <span>Data de abertura </span>
              <FontAwesomeIcon icon={showOpeningDate ? faChevronUp : faChevronDown} />
            </div>
            {showOpeningDate && (
              <div className="input-container">
                <input type="date" placeholder="Início de atividade..." onChange={(e) => addFilter('Abertura_de', e.target.value)} />
                <input type="date" placeholder="Fim de atividade..." onChange={(e) => addFilter('Abertura_ate', e.target.value)} />

              </div>
            )}

            <div className="toggle-input" onClick={() => toggleInput('branch')}>
              <span>Matriz filial </span>
              <FontAwesomeIcon icon={showBranch ? faChevronUp : faChevronDown} />
            </div>
            {showBranch && (
              <div className="input-container">
                <select name="Matriz/Filial" onChange={(e) => addFilter('Matriz', e.target.value)} id="Matriz">
                  <option value="" disabled selected>Selecione</option>
                  <option value="1">Matriz</option>
                  <option value="2">Filial</option>
                </select>

              </div>
            )}

            <div className="toggle-input" onClick={() => toggleInput('capital')}>
              <span>Capital Social </span>
              <FontAwesomeIcon icon={showCapital ? faChevronUp : faChevronDown} />
            </div>
            {showCapital && (
              <div className="input-container">
                <input type="text" placeholder="Busca por Capital Social Mínimo..." onChange={(e) => addFilter('Capital_min', e.target.value)} />
                <input type="text" placeholder="Busca por Capital Social Máximo..." onChange={(e) => addFilter('Capital_max', e.target.value)} />
              </div>
            )}

            <div className="toggle-input" onClick={() => toggleInput('porte empresa')}>
              <span>Porte Empresa</span>
              <FontAwesomeIcon icon={showPorte ? faChevronUp : faChevronDown} />
            </div>
            {showPorte && (
              <div className="input-container">
                <select name="Porte da empresa" onChange={(e) => addFilter('Porte Empresa', e.target.value)} id="Porte Empresa">
                  <option value="" disabled selected>Selecione</option>
                  <option value="Micro Empresa">Micro Empresa</option>
                  <option value="Empresa de Pequeno Porte">Empresa de Pequeno Porte</option>
                  <option value="Demais">Demais</option>
                  <option value="Não Informado">Não Informado</option>
                </select>
              </div>
            )}






            {/* <span className='tituloFiltros'>Filtros aplicados</span> */}





          </div>




        </nav>
      </div>
      <div className='fullpage'>

        {/* <h2>Resultados da Pesquisa</h2>
  <div>
    <button onClick={() => fetchData(currentPage - 1)} disabled={currentPage === 0}>Página Anterior</button>
    <button onClick={() => fetchData(currentPage + 1)} disabled={currentPage + 1 >= totalPages}>Próxima Página</button>
  </div>
  <div>
    Página {currentPage + 1} de {totalPages}
  </div> */}

        <table>
          <thead>
            <tr>
              <th>Razão Social/Nome Empresarial</th>
              <th>Matriz/Filial</th>
              <th>CNPJ Base</th>
              <th>Natureza Jurídica</th>
              <th>Mais</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((empresa, index) => (
              <tr key={index}>
                <td>{formatCase(empresa.razao_social_nome_empresarial)}</td>
                {/* <td>{empresa.filial.length}</td> */}
                <td>{empresa.identificador_matriz_filial === '1' ? 'Matriz' :
                  empresa.identificador_matriz_filial === '2' ? 'Filial' :
                    'Desconhecido'}</td>
                <td>{empresa.cnpj_base}</td>
                <td>{empresa.natureza_juridica}</td>
                <td>
                  <Link to={`/detalhes/${empresa.cnpj_base}`}>
                    <FontAwesomeIcon icon={faArrowAltCircleRight} style={{ paddingLeft: '10px', color: 'blue', cursor: 'pointer' }} /></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );


}

export default Navbar;
