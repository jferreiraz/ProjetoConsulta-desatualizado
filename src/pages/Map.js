import React from 'react';
import Map from '../components/Map'
import HeaderPage from '../components/Header.js';

const App = () => {
  return (
    <div style={{ textAlign: 'center' }}>
        <HeaderPage/>
      <h1>Mapa com Leaflet</h1>
      <Map />
    </div>
  );
};

export default App;
