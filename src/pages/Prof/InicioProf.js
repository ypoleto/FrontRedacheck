import '../../css/Inicio.css';
import ListaTurmas from './components/Turmas/ListaTurmas';
import ListaRedacoes from './components/Redacoes/ListaRedacoes';
import ListaPropostas from './components/Redacoes/ListaPropostas';

function Inicio() {
  return (
    <div className="principalProf">
      <div className='boxesProf'>
        <ListaTurmas />
        <ListaPropostas />
      </div>
      <div >
        <ListaRedacoes />
      </div>

    </div>
  );
}

export default Inicio;
