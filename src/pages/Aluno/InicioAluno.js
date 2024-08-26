import '../../css/Inicio.css';
import ListaPropostas from './components/Redacoes/ListaPropostas';
import ListaRedacoes from './components/Redacoes/ListaRedacoes';

function Inicio() {
  return (
    <div>
      <div>
        <ListaPropostas  />
      </div>
      <div>
        <ListaRedacoes />
      </div>
    </div>
  );
}

export default Inicio;
