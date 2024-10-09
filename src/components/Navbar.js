import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchorCircleCheck, faArrowAltCircleDown, faArrowAltCircleRight, faChevronDown, faChevronRight, faChevronUp, faCoffee, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../style/Navbar.css';
import { Link, useParams } from 'react-router-dom';
import './folder.js';

function Navbar() {
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
                  const isNumber = /^[0-9]+$/.test(value);

                  if (isNumber) {
                    addFilter('CNPJ', value);
                  } else {
                    addFilter('nome', value);
                  }
                }}

                onKeyUp={(e) => {
                  const value = e.target.value;

                  if (value === '') {
                    if (filters.find(filter => filter.type === 'nome') !== '') {
                      removeFilter(filters.find(filter => filter.type === 'nome'));
                    }
                  }
                }}

                onKeyDown={(e) => {
                  const value = e.target.value;

                  if (filters.find(filter => filter.type === 'cnpj') !== '') {
                    removeFilter(filters.find(filter => filter.type === 'CNPJ'));
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

{/*
         <h2>Resultados da Pesquisa</h2>
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
              Modo de pesquisa
              <a onClick={(e) => fetchData("25", null)} > 25</a> 
              <a onClick={(e) => fetchData("50", null)} > 50</a> 
              <a onClick={(e) => fetchData("100", null)} > 100</a>

              <a onClick={(e) => fetchData(null,"0")} > 1</a> 
              <a onClick={(e) => fetchData(null,"1")} > 2</a> 
              <a onClick={(e) => fetchData(null,"2")} > 3</a>
            </tr>
          </thead>
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
