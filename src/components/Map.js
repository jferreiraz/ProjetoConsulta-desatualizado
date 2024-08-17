import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  return (
    <div style={{ border: '5px solid #ccc', borderRadius: '0px', overflow: 'hidden', width: '90%', margin: 'auto' }}>
    <MapContainer
      center={[-15.8486514, -48.0677645]}
      zoom={13}
      style={{ height: '400px', width: '100%', margin: 0 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-15.8486514, -48.0677645]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  );
};

export default Map;
