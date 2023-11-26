// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pesquisa from './components/pages/Pesquisa';
import DetalhesEmpresa from './components/pages/DetalhesEmpresa';


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
          <Route path="/" element={<Pesquisa />} />
          <Route path="/detalhes/:cnpj" element={<DetalhesEmpresa />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
