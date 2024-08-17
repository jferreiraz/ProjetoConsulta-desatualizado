import React from 'react';
import '../style/Header.css';
import logo from '../image/logo.png';

const HeaderPage = () => {
  return (
    <header className="header">
      <a href="/">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span href="/">Empresas.io</span>
        </div>
      </a>
      <nav>
        <a href="/sobre">Sobre</a>
        <a href="/mapa">Mapa</a>
        <a href="/mapa">Github</a>
        {/* <a href="/pesquisaV2">Pesquisa V2</a> */}
      </nav>
    </header>
  );
};

export default HeaderPage;