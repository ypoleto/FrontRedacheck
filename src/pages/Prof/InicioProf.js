import '../../css/Inicio.css';
import ListaTurmas from './components/Turmas/ListaTurmas';
import ListaRedacoes from './components/Redacoes/ListaRedacoes';
import ListaPropostas from './components/Redacoes/ListaPropostas';

function Inicio() {
  return (
    <div className="principalProf">
      <div>
        <ListaTurmas />
      </div>
      <div>
        <ListaRedacoes />
      </div>
      <div>
        <ListaPropostas/>
      </div>
    </div>
  );
}

export default Inicio;
