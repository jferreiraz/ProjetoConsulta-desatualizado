// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './pages/Search';
import Details from './pages/Details';
import Mapa from './pages/Map';
import SearchV2 from './pages/SearchV2';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>

               <Link to="/">Pesquisa</Link> 

            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/detalhes/:cnpj" element={<Details />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/pesquisaV2" element={<SearchV2 />} />
          <Route path="/sobre" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
