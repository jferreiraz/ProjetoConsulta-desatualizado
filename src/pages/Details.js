import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/Details.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchorCircleCheck, faArrowAltCircleDown, faArrowAltCircleRight, faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faCoffee, faLongArrowLeft, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';


import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import HeaderPage from '../components/Header.js';


import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const formatFieldName = (fieldName) => {
    return fieldName.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

function Details() {
    const { cnpj } = useParams();
    const [detalhesEmpresa, setDetalhesEmpresa] = useState(null);
    const [carregando, setCarregando] = useState(true);

    const [selectedFilial, setSelectedFilial] = useState(null);

    const handleFilialClick = (filial) => {
        setSelectedFilial(filial);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/empresas/?cnpj=${cnpj}`);
                console.log('Resposta da API:', response);

                const data = response.data;
                console.log('Dados retornados:', data);

                if (data.message && data.message.resposta && data.message.resposta.length > 0) {
                    const detalhes = data.message.resposta[0];

                    console.log('Detalhes da empresa encontrados:', detalhes);
                    setDetalhesEmpresa(detalhes);

                } else {
                    throw new Error('A resposta da API não contém os dados esperados');
                }
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            } finally {
                setCarregando(false);
            }
        };

        fetchData();
    }, [cnpj]);

    console.log('Carregando:', carregando);
    console.log('Detalhes da Empresa:', detalhesEmpresa);

    if (carregando) {
        return <p className="carregando-mensagem">Carregando...</p>;
    }

    if (!detalhesEmpresa) {
        return <p>Detalhes não encontrados para o CNPJ {cnpj}.</p>;
    }

    const renderCampo = (campo, valor) => {
        if (Array.isArray(valor)) {
            return (
                <ul>
                    {valor.map((item, idx) => (
                        <li key={idx}>
                            <strong>{campo} {idx + 1}:</strong> {typeof item === 'object' ? JSON.stringify(item) : item}
                        </li>
                    ))}
                </ul>
            );
        } else if (valor && typeof valor === 'object') {
            return (
                <ul>
                    {Object.keys(valor).map((key, idx) => (
                        <li key={idx}>
                            <strong>{key}:</strong> {typeof valor[key] === 'object' ? JSON.stringify(valor[key]) : valor[key]}
                        </li>
                    ))}
                </ul>
            );
        } else {
            return valor;
        }
    };

    const camposEmpresa = Object.entries(detalhesEmpresa).filter(([campo, valor]) => campo !== 'filial');

    return (
        <div>
            <HeaderPage />
            <div className='geral'>

                <div className="detalhes-empresa-container">



                    <div className='back'>
                        <Link style={{ textDecoration: 'none' }} to="/">
                            <FontAwesomeIcon icon={faChevronLeft} style={{ paddingLeft: '10px', color: '#214424', cursor: 'pointer' }} /> <span style={{ paddingLeft: '10px', color: '#213433', cursor: 'pointer' }}>Voltar</span>
                        </Link>
                    </div>


                    <div className='conteudo'>
                        <table>
                            <tbody>
                                {camposEmpresa.map(([campo, valor]) => (
                                    <tr key={campo}>
                                        <td><strong>{formatFieldName(campo)}</strong></td>
                                        <td>{typeof valor === 'object' ? JSON.stringify(valor) : valor}</td>
                                    </tr>
                                ))}
                                <tr><td><strong>Filiais</strong></td>
                                    <td>
                                        {detalhesEmpresa.filial && detalhesEmpresa.filial.length > 0 && (
                                            <div>

                                                {detalhesEmpresa.filial.map((filial, idx) => (
                                                    <lu key={idx}>
                                                        <button onClick={() => handleFilialClick(filial)}>Filial {idx + 1}</button>
                                                    </lu>
                                                ))}

                                            </div>
                                        )}
                                    </td> </tr>
                            </tbody>
                        </table>

                        <div style={{ flex: 1, marginLeft: '20px' }}>
                            <div style={{ border: '5px solid #ccc', borderRadius: '0px', overflow: 'hidden', width: '500px', height: '500px' }}>
                            {!selectedFilial && (
                                <MapContainer
                                    center={[30.8486514, -48.0677645]}
                                    zoom={13}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[-15.8486514, -45.0677645]}>
                                        <Popup>
                                            A pretty CSS3 popup. <br /> Easily customizable.
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                                )}
                            </div>
                        </div>





                    </div>



                    {selectedFilial && (
                        <div className='modal-geral'>
                            <div className="modal" onClick={() => setSelectedFilial(null)}>
                                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ flex: 1 }}>
                                            <h3>Detalhes da Filial</h3>
                                            <table>
                                                <tbody>
                                                    {Object.entries(selectedFilial).map(([campo, valor]) => (
                                                        <tr key={campo}>
                                                            <td><strong>{formatFieldName(campo)}</strong></td>
                                                            <td>{typeof valor === 'object' ? JSON.stringify(valor) : valor}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ flex: 1, marginLeft: '20px' }}>
                                            <div style={{ border: '5px solid #ccc', borderRadius: '0px', overflow: 'hidden', width: '100%', height: '59%', marginTop: '42px' }}>
                                                {selectedFilial && (
                                                    <MapContainer
                                                        center={[-15.8486514, -48.0677645]}
                                                        zoom={13}
                                                        style={{ height: '100%', width: '100%' }}
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
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}




                </div>
            </div>
        </div >
    );





}

export default Details;
