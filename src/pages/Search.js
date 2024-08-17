// Search.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../style/Search.css';
import HeaderPage from '../components/Header.js';
import SearchBar from '../components/SearchBar.js';
import NavbarPage from '../components/Navbar.js';

function Search() {
    return (
        <div>
            <HeaderPage />

            <div className='pagina'>
                <NavbarPage />
            </div>
        </div>

    );
}

export default Search;