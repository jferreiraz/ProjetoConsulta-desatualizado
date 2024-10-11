import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faChevronDown, faChevronUp, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../style/Navbar.css';
import { Link } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';

//https://mui.com/material-ui/api/menu/

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


function Navbar() {
  const [apiData, setApiData] = useState([]);
  const rows = apiData;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [showLocation, setShowLocation] = useState(false);
  const [showOpeningDate, setShowOpeningDate] = useState(false);
  const [showBranch, setShowBranch] = useState(false);
  const [showCapital, setShowCapital] = useState(false);
  const [showPorte, setShowPorte] = useState(false);

  const [filters, setFilters] = useState([]);
  const [tamanho, setTamanho] = useState(null);
  const [pagina, setPagina] = useState(null);

  const formatCase = (str) => {
    if (typeof str !== 'string')
      return str;
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  const toggleInput = (field) => {
    setShowLocation(field === 'location' ? !showLocation : false);
    setShowOpeningDate(field === 'openingDate' ? !showOpeningDate : false);
    setShowBranch(field === 'branch' ? !showBranch : false);
    setShowCapital(field === 'capital' ? !showCapital : false);
    setShowPorte(field === 'porte empresa' ? !showPorte : false);
  };

  const addFilter = (type, value) => {
    if (value.trim() === '') return;
    const newFilters = filters.filter((f) => f.type !== type);
    setFilters([...newFilters, { type, value }]);
  };

  const removeFilter = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const fetchData = async (newTamanho = tamanho, newPagina = pagina) => {
    const queryString = filters.map((filter) => `${filter.type.toLowerCase()}=${filter.value}`).join('&');

    const tamanhoAtual = newTamanho || tamanho;
    const paginaAtual = newPagina || pagina;

    const queryFilterPage = paginaAtual != null ? `pagina=${paginaAtual}` : '';
    const queryFilterSize = tamanhoAtual != null ? `tamanho=${tamanhoAtual}` : '';

    const url = `http://localhost:8000/api/v1/empresas/?${queryString}&${queryFilterSize}&${queryFilterPage}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.message && data.message.resposta) {
        const apiData = data.message.resposta;
        console.log('Dados da API:', url, apiData);
        setApiData(apiData);
      } else {
        throw new Error('A resposta da API não contém os dados esperados');
      }
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };


  const handleSizeChange = (size) => {
    console.log(`Tamanho página selecionada: ${size}`);
    setTamanho(size);
    fetchData(size, pagina);
  };

  const handlePageChange = (page) => {
    console.log(`Página selecionada: ${page}`);
    setPagina(page);
    fetchData(tamanho, page);
  };


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
                  if (filters.find(filter => filter.type === 'cnpj') !== '') {
                    removeFilter(filters.find(filter => filter.type === 'CNPJ'));
                  }
                }}
              />

              <FontAwesomeIcon className='lupa' icon={faSearch} onClick={() => fetchData()} /></div>

            {/*
            <div className="filters-container">
              {filters.map((filter, index) => (
                <div key={index} className="filter">
                  <span>{filter.type}: {filter.value} </span>
                  <FontAwesomeIcon icon={faTimes} onClick={() => removeFilter(filter)} />
                </div>
              ))}
            </div>
            */}

            {filters.map((filter, index) => (
            <Paper elevation={2}  key={index}>
              <CardActions style={{justifyContent: 'space-between', margin:5}}>
                {filter.type}: {filter.value} 
                <Button  onClick={() => removeFilter(filter)} size="small">Apagar Filtro</Button>
              </CardActions>
            </Paper>
            ))}


          </div>


          <div className='campos'>

            <div className="toggle-input" onClick={() => toggleInput('location')}>
              <span>Localização </span>
              <FontAwesomeIcon icon={showLocation ? faChevronUp : faChevronDown} />
            </div>
            {showLocation && (
              <div className="input-container">
                <select name="UF" onClick={() => fetchData()} onChange={(e) => addFilter('UF', e.target.value)} id="UF"><option value="" disabled selected>Selecione UF</option><option value="DF">DF</option><option value="SP">SP</option><option value="MG">MG</option><option value="RJ">RJ</option></select>

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
                <input type="date" placeholder="Início de atividade..." onClick={() => fetchData()} onChange={(e) => addFilter('Abertura_de', e.target.value)} />
                <input type="date" placeholder="Fim de atividade..." onClick={() => fetchData()} onChange={(e) => addFilter('Abertura_ate', e.target.value)} />

              </div>
            )}

            <div className="toggle-input" onClick={() => toggleInput('branch')}>
              <span>Matriz filial </span>
              <FontAwesomeIcon icon={showBranch ? faChevronUp : faChevronDown} />
            </div>
            {showBranch && (
              <div className="input-container">
                <select name="Matriz/Filial" onClick={() => fetchData()} onChange={(e) => addFilter('Matriz', e.target.value)} id="Matriz">
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
                <select name="Porte da empresa" onClick={() => fetchData()} onChange={(e) => addFilter('Porte_Empresa', e.target.value)} id="Porte_Empresa">
                  <option value="" disabled selected>Selecione</option>
                  <option value="Micro%20Empresa">Micro Empresa</option>
                  <option value="Empresa%20de%20Pequeno%20Porte">Empresa de Pequeno Porte</option>
                  <option value="Demais">Demais</option>
                  <option value="Não%20Informado">Não Informado</option>
                </select>
              </div>
            )}


          </div>

        </nav>
      </div>
      <div className='fullpage'>

        {/*
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiData.map((empresa) => (
                <TableRow
                  key={empresa.razao_social_nome_empresarial}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {empresa.razao_social_nome_empresarial}
                  </TableCell>
                  <TableCell align="right">{empresa.razao_social_nome_empresarial}</TableCell>
                  <TableCell align="right">{empresa.cnpj_base}</TableCell>
                  <TableCell align="right">{empresa.razao_social_nome_empresarial}</TableCell>
                  <TableCell align="right">{empresa.razao_social_nome_empresarial}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        */}


        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Razão Social/Nome Empresarial</TableCell>
                <TableCell align="right">Matriz/Filial</TableCell>
                <TableCell align="right">CNPJ</TableCell>
                <TableCell align="right">Natureza Jurídica</TableCell>
                <TableCell align="right">Mais</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((empresa) => (
                <TableRow key={empresa.razao_social_nome_empresarial}>
                  <TableCell>
                    {empresa.razao_social_nome_empresarial}
                  </TableCell>
                  <TableCell style={{ width: 10 }} align="right">
                    {empresa.identificador_matriz_filial === '1' ? 'Matriz' :
                      empresa.identificador_matriz_filial === '2' ? 'Filial' :
                        'Desconhecido'}
                  </TableCell>
                  <TableCell style={{ width: 10 }} align="right">
                    {empresa.cnpj_base}
                  </TableCell>
                  <TableCell style={{ width: 10 }} align="right">
                    {empresa.natureza_juridica}
                  </TableCell>
                  <TableCell style={{ width: 10 }} align="right">
                    <Link to={`/detalhes/${empresa.cnpj_base}`}>
                      <FontAwesomeIcon icon={faArrowAltCircleRight} style={{ paddingLeft: '10px', color: 'blue', cursor: 'pointer' }} /></Link>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 13 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, { label: 'Todos', value: -1 }]}
                  colSpan={5}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'Quantidade de itens',
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>


        {/*
        <table>

          <thead>
            <tr>


              <Pagination onChange={(event, page) => handlePageChange(page)} count={10} color="primary" />
              <Pagination onChange={(event, size) => handleSizeChange(size)} count={10} color="primary" />
              

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
            {apiData.map((empresa, index) => (
              <tr key={index}>
                <td>{formatCase(empresa.razao_social_nome_empresarial)}</td>
                 <td>{empresa.filial.length}</td> 
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

        */}


      </div>
    </div>
  );
}

export default Navbar;
