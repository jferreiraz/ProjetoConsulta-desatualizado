### `git clone https://github.com/jferreiraz/ProjetoConsulta.git`

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Setup proxy

configurar link url de site via:

src/SetupProxy.js

e alterar proxy:"//" em package.json

### Caminhos alterados no sistema (CORS)

Caminhos alterados (Details.js e Navbar.js)

Navbar.js agora:              const url = `http://localhost:8000/api/v1/empresas/?${queryString}&pagina=${page}&tamanho=2&nome=globo`;
Navbar.js antes:              const url = `/api/?${queryString}&pagina=${page}&tamanho=2&nome=globo`;

Details.js agora:                 const response = await axios.get(`http://localhost:8000/api/v1/empresas/?cnpj=${cnpj}`);
Details.js antes:                 const response = await axios.get(`/api/?cnpj=${cnpj}`);

### Ajustes a fazer

1. Alterar a página de detalhes para um modal na página principal
2. Ajustar mapa de acordo com a localização
3. Verificar velocidade de carregamento docker
