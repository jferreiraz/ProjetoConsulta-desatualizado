import React, { useState } from 'react';
import '../style/Navbar.css';


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

const queryFilterPage = ""; //var por const
const queryFilterSize = ""; //var por const

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

const fetchData = async (tamanho, pagina) => { // page 0
    const queryString = filters.map((filter) => `${filter.type.toLowerCase()}=${filter.value}`).join('&');
    //url abaixo não esta sendo utilizado na atual linha 48 = (deveria ser utilizado em 'const response = await fetch(url);')

    if (tamanho == null && pagina == null) {
    } if (tamanho == null && pagina != null) {
        var queryFilterPage = "pagina=" + pagina;
        var queryFilterSize = "";
    } if (pagina == null && tamanho != null) {
        var queryFilterPage = "";
        var queryFilterSize = "tamanho=" + tamanho;
    } if (pagina != null && tamanho != null) {
        var queryFilterPage = "tamanho=" + tamanho;
        var queryFilterSize = "&pagina=" + pagina;
    };

    const url = `http://localhost:8000/api/v1/empresas/?${queryString}&${queryFilterPage}${queryFilterSize}`;

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
            //setCurrentPage(page);
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