import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const DetalhesEmpresa = ({ empresa }) => {
    return (
      <div>
        <h2>Detalhes da Empresa</h2>
        <p><strong>CNPJ Base:</strong> {empresa.cnpj_base}</p>
        <p><strong>Razão Social/Nome Empresarial:</strong> {empresa.razao_social_nome_empresarial}</p>
        <p><strong>Natureza Jurídica:</strong> {empresa.natureza_juridica}</p>
        <p><strong>UF:</strong> {empresa.filial[0].uf}</p>
        {/* Adicione mais informações conforme necessário */}
      </div>
    );
  };
  
  // Componente da página principal
  const PaginaPrincipal = ({ empresas }) => {
    return (
      <div>
        <h2>Empresas</h2>
        <ul>
          {empresas.map((empresa, index) => (
            <li key={index}>
              {empresa.razao_social_nome_empresarial} - <Link to={`/empresa/${empresa.cnpj_base}`}>Ver detalhes</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  // Componente principal que define as rotas
  const App = () => {
    return (
      <Router>
        <Route path="/" exact render={() => <PaginaPrincipal empresas={empresas} />} />
        <Route path="/empresa/:cnpj_base" render={({ match }) => {
          const empresa = empresas.find(empresa => empresa.cnpj_base === match.params.cnpj_base);
          return <DetalhesEmpresa empresa={empresa} />;
        }} />
      </Router>
    );
  };
  